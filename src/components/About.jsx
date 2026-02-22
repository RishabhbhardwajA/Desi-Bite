import { Coffee, Flame, Leaf, Award, Clock, Heart } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { aboutContent } from '../data/content';

const iconMap = {
    Coffee,
    Flame,
    Leaf,
    Award,
    Clock,
    Heart,
};

export default function About() {
    return (
        <section id="about" className="py-20 md:py-28 bg-cream/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    <ScrollReveal direction="left">
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-coffee/10">
                                <img
                                    src="/images/hero-bg.jpg"
                                    alt="Desi Bites café interior"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.classList.add('bg-gradient-to-br', 'from-cream', 'to-cream-dark');
                                        e.target.parentElement.innerHTML =
                                            '<div class="flex items-center justify-center h-full text-6xl">☕</div>';
                                    }}
                                />
                            </div>
                            
                            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-5 border border-cream-dark/20">
                                <div className="text-3xl font-display font-bold text-coffee">5+</div>
                                <div className="text-sm text-charcoal-light">Years of</div>
                                <div className="text-sm font-semibold text-golden">Excellence</div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div>
                        <ScrollReveal>
                            <span className="text-sm font-medium text-golden uppercase tracking-wider">
                                {aboutContent.title}
                            </span>
                            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-charcoal leading-tight">
                                {aboutContent.subtitle}
                            </h2>
                            <p className="mt-6 text-charcoal-light leading-relaxed text-base md:text-lg">
                                {aboutContent.story}
                            </p>
                        </ScrollReveal>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {aboutContent.highlights.map((item, i) => {
                                const Icon = iconMap[item.icon] || Coffee;
                                return (
                                    <ScrollReveal key={i} delay={i * 0.1}>
                                        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-cream-dark/20 hover:shadow-md hover:border-golden/30 transition-all duration-300 group">
                                            <div className="w-10 h-10 rounded-lg bg-golden/10 flex items-center justify-center shrink-0 group-hover:bg-golden/20 transition-colors">
                                                <Icon className="w-5 h-5 text-golden" />
                                            </div>
                                            <span className="text-sm font-medium text-charcoal">
                                                {item.text}
                                            </span>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
