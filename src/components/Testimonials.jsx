import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { testimonials } from '../data/content';

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    const next = useCallback(
        () => setCurrent((prev) => (prev + 1) % testimonials.length),
        []
    );
    const prev = useCallback(
        () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length),
        []
    );

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const t = testimonials[current];

    return (
        <section className="py-20 md:py-28 bg-cream/40 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-full border border-cream-dark/20">
                        <Quote className="w-4 h-4 text-golden" />
                        <span className="text-sm font-medium text-coffee uppercase tracking-wider">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-charcoal">
                        Loved by <span className="text-golden">Our Guests</span>
                    </h2>
                </ScrollReveal>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-coffee/5 border border-cream-dark/20 text-center"
                        >
                            <Quote className="w-10 h-10 text-golden/30 mx-auto mb-6" />

                            <p className="text-lg md:text-xl text-charcoal leading-relaxed italic max-w-2xl mx-auto">
                                "{t.text}"
                            </p>

                            {/* Rating */}
                            <div className="flex items-center justify-center gap-1 mt-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < t.rating
                                                ? 'fill-golden text-golden'
                                                : 'fill-cream-dark text-cream-dark'
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="mt-6 flex flex-col items-center gap-3">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-golden/30 bg-cream">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-golden/20 text-coffee font-bold text-lg">${t.name[0]}</div>`;
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-charcoal text-base">
                                        {t.name}
                                    </h4>
                                    <p className="text-sm text-charcoal-light">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full bg-white border border-cream-dark/30 flex items-center justify-center hover:bg-coffee hover:text-cream hover:border-coffee transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === current
                                            ? 'w-8 bg-golden'
                                            : 'w-2 bg-cream-dark hover:bg-golden/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full bg-white border border-cream-dark/30 flex items-center justify-center hover:bg-coffee hover:text-cream hover:border-coffee transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
