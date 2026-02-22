import { motion } from 'framer-motion';
import { Tag, Clock, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { specialOffers } from '../data/content';

const badgeIcon = {
    'Limited Time': <Clock className="w-3.5 h-3.5" />,
    'Best Seller': <Sparkles className="w-3.5 h-3.5" />,
    'Weekend Special': <Tag className="w-3.5 h-3.5" />,
};

export default function SpecialOffers() {
    return (
        <section id="offers" className="py-20 md:py-28 bg-coffee relative overflow-hidden">
            
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-golden/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-cream/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-golden/20 border border-golden/30 rounded-full">
                        <Tag className="w-4 h-4 text-golden" />
                        <span className="text-sm font-medium text-golden uppercase tracking-wider">
                            Special Offers
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-cream">
                        Deals You <span className="text-golden">Can't Resist</span>
                    </h2>
                    <p className="mt-4 text-cream/60 max-w-xl mx-auto">
                        Grab these limited-time combos and save big on your favorites.
                    </p>
                </ScrollReveal>

                <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0 scrollbar-hide">
                    {specialOffers.map((offer, i) => (
                        <ScrollReveal key={offer.id} delay={i * 0.15} className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center shrink-0 md:shrink">
                            <motion.div
                                whileHover={{ y: -6 }}
                                className="group relative bg-gradient-to-br from-coffee-light/50 to-coffee-dark/50 rounded-2xl overflow-hidden border border-cream/10 hover:border-golden/30 transition-all duration-300 h-full"
                            >
                                {/* Image */}
                                <div className="h-36 sm:h-48 overflow-hidden bg-coffee-light">
                                    <img
                                        src={offer.image}
                                        alt={offer.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/50 to-transparent" />
                                </div>

                                {/* Badge */}
                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-golden text-coffee text-[10px] sm:text-xs font-bold rounded-full">
                                    {badgeIcon[offer.badge] || <Tag className="w-3.5 h-3.5" />}
                                    {offer.badge}
                                </div>

                                {/* Discount */}
                                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-red-500/90 text-white text-[10px] sm:text-xs font-bold rounded-full">
                                    {offer.discount}
                                </div>

                                {/* Content */}
                                <div className="relative p-4 sm:p-6 -mt-6 sm:-mt-8">
                                    <h3 className="text-base sm:text-xl font-display font-bold text-cream mb-1.5 sm:mb-2 group-hover:text-golden transition-colors">
                                        {offer.title}
                                    </h3>
                                    <p className="text-cream/60 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-5">
                                        {offer.description}
                                    </p>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-2.5 sm:py-3 bg-golden text-coffee font-bold text-xs sm:text-sm rounded-xl hover:bg-golden-light transition-all duration-300 hover:shadow-lg hover:shadow-golden/20"
                                    >
                                        Claim Offer
                                    </motion.button>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
