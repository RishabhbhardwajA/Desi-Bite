import { useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import MenuCard from './MenuCard';
import ScrollReveal from './ScrollReveal';
import ItemDetailSheet from './ItemDetailSheet';
import { menuCategories, menuItems } from '../data/content';

export default function MenuSection() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const filteredItems =
        activeCategory === 'All'
            ? menuItems
            : menuItems.filter((item) => item.category === activeCategory);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setSheetOpen(true);
    };

    return (
        <>
            <section id="menu" className="py-20 md:py-28 bg-offwhite">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <ScrollReveal className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cream rounded-full">
                            <UtensilsCrossed className="w-4 h-4 text-golden" />
                            <span className="text-sm font-medium text-coffee uppercase tracking-wider">
                                Our Menu
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-charcoal">
                            Crafted for <span className="text-golden">Every Craving</span>
                        </h2>
                        <p className="mt-4 text-charcoal-light max-w-2xl mx-auto text-base md:text-lg">
                            From artisan coffee to wood-fired pizza — discover flavors that make
                            every visit unforgettable.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1} className="mb-10">
                        <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-2 sm:gap-3 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                            {menuCategories.map((cat) => (
                                <motion.button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${activeCategory === cat
                                        ? 'bg-coffee text-cream shadow-lg shadow-coffee/20'
                                        : 'bg-cream text-coffee hover:bg-cream-dark'
                                        }`}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </div>
                    </ScrollReveal>

                    <motion.div
                        layout
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
                    >
                        {filteredItems.map((item, index) => (
                            <MenuCard key={item.id} item={item} index={index} onItemClick={handleItemClick} />
                        ))}
                    </motion.div>

                    {filteredItems.length === 0 && (
                        <p className="text-center text-charcoal-light py-12 text-lg">
                            No items found in this category.
                        </p>
                    )}
                </div>
            </section>

            <ItemDetailSheet
                item={selectedItem}
                isOpen={sheetOpen}
                onClose={() => setSheetOpen(false)}
            />
        </>
    );
}
