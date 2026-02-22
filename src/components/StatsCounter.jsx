import { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Users, UtensilsCrossed, Clock, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const stats = [
    { icon: Users, value: 15000, suffix: '+', label: 'Happy Customers' },
    { icon: UtensilsCrossed, value: 50, suffix: '+', label: 'Menu Items' },
    { icon: Clock, value: 5, suffix: '+', label: 'Years of Excellence' },
    { icon: Star, value: 4.9, suffix: '★', label: 'Average Rating', decimal: true },
];

function AnimatedNumber({ value, decimal = false, suffix = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const springValue = useSpring(0, { duration: 2000, bounce: 0 });
    const display = useTransform(springValue, (v) =>
        decimal ? v.toFixed(1) : Math.floor(v).toLocaleString()
    );

    if (isInView) {
        springValue.set(value);
    }

    return (
        <span ref={ref} className="flex items-baseline gap-1">
            <motion.span>{display}</motion.span>
            <span className="text-golden">{suffix}</span>
        </span>
    );
}

export default function StatsCounter() {
    return (
        <section className="py-16 md:py-20 bg-coffee relative overflow-hidden">
            
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-golden/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cream/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                            <div className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-2xl bg-golden/10 flex items-center justify-center mb-4">
                                    <stat.icon className="w-6 h-6 text-golden" />
                                </div>
                                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-cream">
                                    <AnimatedNumber
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        decimal={stat.decimal}
                                    />
                                </div>
                                <p className="mt-2 text-cream/60 text-sm font-medium">{stat.label}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
