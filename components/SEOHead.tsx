import { useEffect } from 'react';

interface SEOHeadProps {
    title: string;
    description: string;
    canonicalPath?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonicalPath }) => {
    useEffect(() => {
        // Set document title
        document.title = title;

        // Set or update meta description
        let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;

        // Set or update canonical link
        if (canonicalPath) {
            let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                document.head.appendChild(canonical);
            }
            canonical.href = `https://corered.co.ke${canonicalPath}`;
        }

        // Cleanup on unmount
        return () => {
            document.title = 'Derrick Ndaire | CodeRed Innovations';
        };
    }, [title, description, canonicalPath]);

    return null;
};

export default SEOHead;
