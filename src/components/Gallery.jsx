import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { galleryImages } from '../data/content';

export default function Gallery() {
    // Create masonry-like heights — use smaller heights on mobile
    const heights = ['h-40 sm:h-64', 'h-52 sm:h-80', 'h-36 sm:h-56', 'h-44 sm:h-72', 'h-52 sm:h-80', 'h-36 sm:h-56', 'h-40 sm:h-64', 'h-44 sm:h-72'];

    return (
        <section className="py-20 md:py-28 bg-offwhite">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cream rounded-full">
                        <Camera className="w-4 h-4 text-golden" />
                        <span className="text-sm font-medium text-coffee uppercase tracking-wider">
                            Gallery
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-charcoal">
                        A Feast for <span className="text-golden">the Eyes</span>
                    </h2>
                </ScrollReveal>

                {/* Masonry Grid */}
                <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
                    {galleryImages.map((img, i) => (
                        <ScrollReveal key={img.id} delay={i * 0.08}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className={`relative ${heights[i % heights.length]} rounded-2xl overflow-hidden group cursor-pointer break-inside-avoid`}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.classList.add('bg-gradient-to-br', 'from-cream', 'to-cream-dark');
                                    }}
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-coffee/0 group-hover:bg-coffee/40 transition-all duration-300 flex items-end">
                                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-cream text-sm font-medium">{img.alt}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
