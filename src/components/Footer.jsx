import { Coffee, Instagram, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';
import { brandName, footerContent } from '../data/content';

const socialIcons = {
    Instagram,
    Facebook,
    Twitter,
    Youtube,
};

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="bg-coffee text-cream/70 relative">
            {/* Top divider */}
            <div className="h-1 bg-gradient-to-r from-golden/0 via-golden to-golden/0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-full bg-golden flex items-center justify-center">
                                <Coffee className="w-5 h-5 text-coffee" />
                            </div>
                            <span className="text-xl font-display font-bold text-cream">
                                {brandName}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-md">
                            {footerContent.description}
                        </p>

                        {/* Social */}
                        <div className="flex items-center gap-3 mt-6">
                            {footerContent.socialLinks.map((link) => {
                                const Icon = socialIcons[link.platform] || Instagram;
                                return (
                                    <a
                                        key={link.platform}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-golden hover:text-coffee transition-all duration-300"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-cream font-display font-bold text-base mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {footerContent.quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleLinkClick(e, link.href)}
                                        className="text-sm hover:text-golden transition-colors hover:pl-1 duration-200 inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hours + CTA */}
                    <div>
                        <h4 className="text-cream font-display font-bold text-base mb-4">
                            Opening Hours
                        </h4>
                        <div className="text-sm space-y-1.5">
                            <p>Mon – Fri: 7AM – 11PM</p>
                            <p>Sat – Sun: 8AM – 12AM</p>
                        </div>
                        <a
                            href="#menu"
                            onClick={(e) => handleLinkClick(e, '#menu')}
                            className="inline-block mt-5 px-5 py-2.5 bg-golden text-coffee font-semibold text-sm rounded-full hover:bg-golden-light transition-all duration-300 hover:shadow-lg hover:shadow-golden/20"
                        >
                            Order Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-cream/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-cream/50">{footerContent.copyright}</p>
                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-golden hover:text-coffee transition-all duration-300"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
