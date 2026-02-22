import { motion } from 'framer-motion';
import { heroContent, menuItems } from '../data/content';

// Pick a nice spread of food items for the marquee
const marqueeRow1 = [...menuItems.slice(0, 10), ...menuItems.slice(0, 10)];
const marqueeRow2 = [...menuItems.slice(10), ...menuItems.slice(0, 3), ...menuItems.slice(10), ...menuItems.slice(0, 3)];

export default function Hero() {
    const handleScroll = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/images/hero-bg.jpg')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-coffee/85 via-coffee/65 to-coffee/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-coffee/40 to-transparent" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-golden/10 blur-xl"
                />
                <motion.div
                    animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full bg-cream/10 blur-2xl"
                />
                <motion.div
                    animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute top-1/2 right-1/6 w-24 h-24 rounded-full bg-golden/8 blur-2xl"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-block mb-6 px-5 py-2 bg-golden/20 border border-golden/30 rounded-full text-golden text-sm font-medium tracking-wider uppercase"
                    >
                        ☕ Café & Fast Food
                    </motion.span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-cream leading-tight whitespace-pre-line"
                >
                    {heroContent.headline.split('\n').map((line, i) => (
                        <span key={i}>
                            {i === 1 ? (
                                <>
                                    <br />
                                    <span className="text-golden">{line}</span>
                                </>
                            ) : (
                                line
                            )}
                        </span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-6 text-base sm:text-lg md:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed"
                >
                    {heroContent.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-8 flex flex-row items-center justify-center gap-3 sm:gap-4 px-2"
                >
                    <a
                        href="#menu"
                        onClick={(e) => handleScroll(e, '#menu')}
                        className="flex-1 sm:flex-none text-center px-5 sm:px-8 py-3 sm:py-4 bg-golden text-coffee font-bold text-sm sm:text-base rounded-full hover:bg-golden-light hover:shadow-xl hover:shadow-golden/30 transition-all duration-300 active:scale-95"
                    >
                        {heroContent.ctaPrimary}
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => handleScroll(e, '#contact')}
                        className="flex-1 sm:flex-none text-center px-5 sm:px-8 py-3 sm:py-4 border-2 border-cream/40 text-cream font-semibold text-sm sm:text-base rounded-full hover:bg-cream/10 hover:border-cream/60 transition-all duration-300 active:scale-95"
                    >
                        {heroContent.ctaSecondary}
                    </a>
                </motion.div>
            </div>

            {/* Hero food image */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
                className="relative z-10 mt-8 sm:mt-12 px-4 sm:px-8 max-w-3xl mx-auto w-full"
            >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 ring-2 ring-golden/30">
                    <img
                        src="/images/hero-food.png"
                        alt="Desi Bites food spread"
                        className="w-full h-40 sm:h-56 md:h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee/40 via-transparent to-coffee/20" />
                </div>
            </motion.div>

            {/* Marquee */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="relative z-10 w-full mt-12 sm:mt-16 pb-8"
            >
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-coffee/90 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-coffee/90 to-transparent z-20 pointer-events-none" />

                {/* Row 1 — scrolls left */}
                <div className="overflow-hidden mb-3 sm:mb-4">
                    <div className="marquee-track-left flex gap-3 sm:gap-4 w-max">
                        {marqueeRow1.map((item, i) => (
                            <div
                                key={`r1-${i}`}
                                className="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 cursor-default"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-golden/40 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <span className="text-cream/90 text-xs sm:text-sm font-medium whitespace-nowrap">
                                    {item.name}
                                </span>
                                <span className="text-golden text-xs font-bold whitespace-nowrap">
                                    ₹{item.price}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 — scrolls right */}
                <div className="overflow-hidden">
                    <div className="marquee-track-right flex gap-3 sm:gap-4 w-max">
                        {marqueeRow2.map((item, i) => (
                            <div
                                key={`r2-${i}`}
                                className="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 cursor-default"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-golden/40 flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <span className="text-cream/90 text-xs sm:text-sm font-medium whitespace-nowrap">
                                    {item.name}
                                </span>
                                <span className="text-golden text-xs font-bold whitespace-nowrap">
                                    ₹{item.price}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
