import { useState, useEffect } from 'react';

export interface GeoRegion {
    country: string;
    region: string;         // e.g. "Nairobi County"
    city: string;           // e.g. "Nairobi"
    countryCode: string;    // e.g. "KE"
    continent: string;      // e.g. "Africa"
    loading: boolean;
    error: boolean;
}

const DEFAULT: GeoRegion = {
    country: 'Kenya',
    region: '',
    city: 'Nairobi',
    countryCode: 'KE',
    continent: 'Africa',
    loading: false,
    error: false,
};

// Cache in sessionStorage to avoid hammering the free API on re-renders
const CACHE_KEY = 'crt_geo_region';

export function useGeoRegion(): GeoRegion {
    const [geo, setGeo] = useState<GeoRegion>({ ...DEFAULT, loading: true });

    useEffect(() => {
        // Try cache first
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                setGeo({ ...JSON.parse(cached), loading: false });
                return;
            } catch { /* ignore */ }
        }

        fetch('https://ipapi.co/json/')
            .then(r => r.json())
            .then(data => {
                const result: GeoRegion = {
                    country: data.country_name ?? 'Kenya',
                    region: data.region ?? '',
                    city: data.city ?? 'Nairobi',
                    countryCode: data.country_code ?? 'KE',
                    continent: data.continent_code ?? 'AF',
                    loading: false,
                    error: false,
                };
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(result));
                setGeo(result);
            })
            .catch(() => {
                setGeo({ ...DEFAULT, loading: false, error: true });
            });
    }, []);

    return geo;
}
