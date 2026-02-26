import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const PAGES_DIR = path.join(ROOT, 'pages');
const COMPONENTS_DIR = path.join(ROOT, 'components');
const INDEX_HTML = path.join(ROOT, 'index.html');

// Helper: read file content
function readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
}

// Helper: list files in a directory
function listFiles(dir: string, ext: string): string[] {
    return fs.readdirSync(dir).filter(f => f.endsWith(ext));
}

// ============================
// 1. ROBOTS.TXT & SITEMAP
// ============================
describe('Robots & Sitemap', () => {
    it('robots.txt exists and allows crawling', () => {
        const robotsPath = path.join(PUBLIC, 'robots.txt');
        expect(fs.existsSync(robotsPath)).toBe(true);

        const content = readFile(robotsPath);
        expect(content).toContain('User-agent: *');
        expect(content).toContain('Allow: /');
        expect(content).toContain('Sitemap:');
    });

    it('sitemap.xml exists and contains all routes', () => {
        const sitemapPath = path.join(PUBLIC, 'sitemap.xml');
        expect(fs.existsSync(sitemapPath)).toBe(true);

        const content = readFile(sitemapPath);
        const routes = ['/', '/about', '/services', '/portfolio', '/contact', '/blog', '/shop'];
        routes.forEach(route => {
            expect(content).toContain(route);
        });
    });

    it('sitemap.xml is valid XML with urlset', () => {
        const content = readFile(path.join(PUBLIC, 'sitemap.xml'));
        expect(content).toContain('<?xml');
        expect(content).toContain('<urlset');
        expect(content).toContain('</urlset>');
    });
});

// ============================
// 2. INDEX.HTML SEO & SECURITY
// ============================
describe('index.html Meta Tags & Security', () => {
    const html = readFile(INDEX_HTML);

    it('has a title tag under 60 characters', () => {
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        expect(titleMatch).not.toBeNull();
        expect(titleMatch![1].length).toBeLessThanOrEqual(60);
    });

    it('has a meta description', () => {
        expect(html).toContain('name="description"');
    });

    it('has viewport meta tag', () => {
        expect(html).toContain('name="viewport"');
    });

    it('has theme-color meta tag', () => {
        expect(html).toContain('name="theme-color"');
    });

    it('has robots meta tag allowing indexing', () => {
        expect(html).toContain('name="robots"');
        expect(html).toContain('index, follow');
    });

    it('has X-Content-Type-Options security header', () => {
        expect(html).toContain('X-Content-Type-Options');
        expect(html).toContain('nosniff');
    });

    it('has X-Frame-Options security header', () => {
        expect(html).toContain('X-Frame-Options');
        expect(html).toContain('SAMEORIGIN');
    });

    it('has referrer policy', () => {
        expect(html).toContain('name="referrer"');
    });

    it('has Open Graph tags', () => {
        expect(html).toContain('og:title');
        expect(html).toContain('og:description');
        expect(html).toContain('og:type');
    });

    it('has GA4 tracking script', () => {
        expect(html).toContain('googletagmanager.com/gtag');
        expect(html).toContain('gtag(');
    });

    it('has JSON-LD structured data', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type"');
        expect(html).toContain('Derrick Ndaire');
    });

    it('has skip-to-content accessibility link', () => {
        expect(html).toContain('skip-link');
        expect(html).toContain('#main-content');
    });

    it('has focus-visible CSS for accessibility', () => {
        expect(html).toContain('focus-visible');
    });

    it('does NOT have duplicate script tags for index.tsx', () => {
        const scriptMatches = html.match(/src=["'].*?index\.tsx["']/g);
        expect(scriptMatches).not.toBeNull();
        expect(scriptMatches!.length).toBe(1);
    });

    it('all external scripts use HTTPS (no mixed content)', () => {
        const httpMatches = html.match(/src=["']http:\/\//g);
        expect(httpMatches).toBeNull();
    });
});

// ============================
// 3. PAGE FILES SEO CHECKS
// ============================
describe('Page-Level SEO', () => {
    const pageFiles = listFiles(PAGES_DIR, '.tsx');

    pageFiles.forEach(file => {
        describe(`${file}`, () => {
            const content = readFile(path.join(PAGES_DIR, file));

            it('imports and uses SEOHead component', () => {
                expect(content).toContain('SEOHead');
                expect(content).toContain('title=');
                expect(content).toContain('description=');
            });

            it('has exactly one H1 element', () => {
                const h1Matches = content.match(/<h1[\s>]/g);
                expect(h1Matches).not.toBeNull();
                expect(h1Matches!.length).toBe(1);
            });

            it('H1 appears before any H2', () => {
                const h1Index = content.indexOf('<h1');
                const h2Index = content.indexOf('<h2');
                if (h2Index >= 0) {
                    expect(h1Index).toBeLessThan(h2Index);
                }
            });
        });
    });
});

// ============================
// 4. IMAGE ACCESSIBILITY & PERFORMANCE
// ============================
describe('Image Accessibility & Lazy Loading', () => {
    const allFiles = [
        ...listFiles(PAGES_DIR, '.tsx').map(f => path.join(PAGES_DIR, f)),
        ...listFiles(COMPONENTS_DIR, '.tsx').map(f => path.join(COMPONENTS_DIR, f)),
    ];

    allFiles.forEach(filePath => {
        const fileName = path.basename(filePath);
        const content = readFile(filePath);

        // Find all img tags
        const imgTags = content.match(/<img[\s\S]*?\/>/g);
        if (imgTags) {
            it(`${fileName}: all <img> tags have alt attributes`, () => {
                imgTags.forEach((tag: string) => {
                    expect(tag).toContain('alt=');
                });
            });
        }
    });

    // Check lazy loading on off-screen images (About gallery, Portfolio, Shop)
    ['About.tsx', 'Portfolio.tsx', 'Shop.tsx'].forEach(file => {
        it(`${file} has loading="lazy" on images`, () => {
            const content = readFile(path.join(PAGES_DIR, file));
            const imgTags = content.match(/<img[\s\S]*?\/>/g) || [];
            const lazyImages = imgTags.filter((tag: string) => tag.includes('loading="lazy"'));
            expect(lazyImages.length).toBeGreaterThan(0);
        });
    });
});

// ============================
// 5. ACCESSIBILITY CHECKS
// ============================
describe('Accessibility', () => {
    it('Header has role="navigation" and aria-label', () => {
        const header = readFile(path.join(COMPONENTS_DIR, 'Header.tsx'));
        expect(header).toContain('role="navigation"');
        expect(header).toContain('aria-label');
    });

    it('Header mobile menu button has aria-expanded', () => {
        const header = readFile(path.join(COMPONENTS_DIR, 'Header.tsx'));
        expect(header).toContain('aria-expanded');
    });

    it('Header has aria-current for active page', () => {
        const header = readFile(path.join(COMPONENTS_DIR, 'Header.tsx'));
        expect(header).toContain('aria-current');
    });

    it('Footer has role="contentinfo"', () => {
        const footer = readFile(path.join(COMPONENTS_DIR, 'Footer.tsx'));
        expect(footer).toContain('role="contentinfo"');
    });

    it('Footer external links have rel="noopener noreferrer"', () => {
        const footer = readFile(path.join(COMPONENTS_DIR, 'Footer.tsx'));
        expect(footer).toContain('rel="noopener noreferrer"');
    });

    it('Services tab buttons have aria-selected', () => {
        const services = readFile(path.join(PAGES_DIR, 'Services.tsx'));
        expect(services).toContain('role="tablist"');
        expect(services).toContain('aria-selected');
    });

    it('Shop filter buttons have aria-pressed', () => {
        const shop = readFile(path.join(PAGES_DIR, 'Shop.tsx'));
        expect(shop).toContain('aria-pressed');
    });

    it('Shop add-to-cart buttons have descriptive aria-label', () => {
        const shop = readFile(path.join(PAGES_DIR, 'Shop.tsx'));
        expect(shop).toContain('aria-label=');
        expect(shop).toContain('Add');
        expect(shop).toContain('to cart');
    });

    it('Contact form inputs all have associated labels', () => {
        const contact = readFile(path.join(PAGES_DIR, 'Contact.tsx'));
        const labelMatches = contact.match(/htmlFor=/g);
        expect(labelMatches).not.toBeNull();
        expect(labelMatches!.length).toBeGreaterThanOrEqual(4); // name, phone, email, message
    });
});

// ============================
// 6. BRANDING & EXTERNAL LINKS
// ============================
describe('Branding & Social', () => {
    it('Footer contains GitHub link', () => {
        const footer = readFile(path.join(COMPONENTS_DIR, 'Footer.tsx'));
        expect(footer).toContain('github.com');
    });

    it('Footer contains LinkedIn link', () => {
        const footer = readFile(path.join(COMPONENTS_DIR, 'Footer.tsx'));
        expect(footer).toContain('linkedin.com');
    });

    it('index.html has JSON-LD with sameAs social links', () => {
        const html = readFile(INDEX_HTML);
        expect(html).toContain('sameAs');
        expect(html).toContain('linkedin.com');
        expect(html).toContain('github.com');
    });
});

// ============================
// 7. UNIQUE IDS ON INTERACTIVE ELEMENTS
// ============================
describe('Unique IDs on Interactive Elements', () => {
    it('Header nav links have unique IDs', () => {
        const header = readFile(path.join(COMPONENTS_DIR, 'Header.tsx'));
        expect(header).toContain('id={`nav-');
    });

    it('Home page CTAs have unique IDs', () => {
        const home = readFile(path.join(PAGES_DIR, 'Home.tsx'));
        expect(home).toContain('id="cta-consultation"');
        expect(home).toContain('id="cta-case-studies"');
    });

    it('Contact form has unique ID', () => {
        const contact = readFile(path.join(PAGES_DIR, 'Contact.tsx'));
        expect(contact).toContain('id="contact-form"');
        expect(contact).toContain('id="contact-submit"');
    });
});

// ============================
// 8. SEOHead COMPONENT VALIDATION
// ============================
describe('SEOHead Component', () => {
    it('SEOHead component exists', () => {
        const seoHeadPath = path.join(COMPONENTS_DIR, 'SEOHead.tsx');
        expect(fs.existsSync(seoHeadPath)).toBe(true);
    });

    it('SEOHead sets document.title', () => {
        const content = readFile(path.join(COMPONENTS_DIR, 'SEOHead.tsx'));
        expect(content).toContain('document.title');
    });

    it('SEOHead sets meta description', () => {
        const content = readFile(path.join(COMPONENTS_DIR, 'SEOHead.tsx'));
        expect(content).toContain('meta[name="description"]');
    });

    it('SEOHead sets canonical link', () => {
        const content = readFile(path.join(COMPONENTS_DIR, 'SEOHead.tsx'));
        expect(content).toContain('link[rel="canonical"]');
    });
});
