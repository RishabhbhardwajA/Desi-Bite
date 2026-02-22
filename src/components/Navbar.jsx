import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Coffee } from 'lucide-react';
import { navLinks, brandName } from '../data/content';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems, setIsOpen: setCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-coffee/60 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => handleLinkClick(e, '#home')}
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-golden flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Coffee className="w-5 h-5 md:w-6 md:h-6 text-coffee" />
                        </div>
                        <span className="text-xl md:text-2xl font-display font-bold text-cream">
                            {brandName}
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="text-cream/80 hover:text-golden transition-colors text-sm font-medium tracking-wide uppercase"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                        {/* Cart */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative text-cream hover:text-golden transition-colors p-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {totalItems > 0 && (
                                <motion.span
                                    key={totalItems}
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-golden text-coffee text-xs font-bold rounded-full flex items-center justify-center"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>

                        <a
                            href="#menu"
                            onClick={(e) => handleLinkClick(e, '#menu')}
                            className="hidden md:inline-flex px-5 py-2.5 bg-golden text-coffee font-semibold text-sm rounded-full hover:bg-golden-light hover:shadow-lg hover:shadow-golden/30 transition-all duration-300 active:scale-95"
                        >
                            Order Now
                        </a>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-cream hover:text-golden transition-colors p-1"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-coffee/98 backdrop-blur-md border-t border-cream/10 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="block py-3 px-4 text-cream/80 hover:text-golden hover:bg-cream/5 rounded-lg transition-colors text-base font-medium"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#menu"
                                onClick={(e) => handleLinkClick(e, '#menu')}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="block mt-4 py-3 text-center bg-golden text-coffee font-bold rounded-full hover:bg-golden-light transition-all"
                            >
                                Order Now
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
