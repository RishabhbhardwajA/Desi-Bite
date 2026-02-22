import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Check, Flame, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function MenuCard({ item, index, onItemClick }) {
    const { addItem, getItemQuantity, updateQuantity } = useCart();
    const [added, setAdded] = useState(false);
    const qty = getItemQuantity(item.id);

    const handleAdd = (e) => {
        e.stopPropagation();
        addItem(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    const handleMinus = (e) => {
        e.stopPropagation();
        updateQuantity(item.id, -1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            onClick={() => onItemClick?.(item)}
            className="group card-glow bg-white rounded-2xl overflow-hidden border border-cream-dark/20 hover:border-golden/30 transition-all duration-400 cursor-pointer"
        >
            
            <div className="relative h-36 sm:h-56 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div
                    className="w-full h-full items-center justify-center bg-gradient-to-br from-cream to-cream-dark hidden"
                >
                    <span className="text-4xl">
                        {item.category === 'Coffee & Beverages' && '☕'}
                        {item.category === 'Pizza' && '🍕'}
                        {item.category === 'Burgers' && '🍔'}
                        {item.category === 'Sandwiches' && '🥪'}
                        {item.category === 'Fries & Sides' && '🍟'}
                        {item.category === 'Desserts' && '🍰'}
                    </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Price badge */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-coffee/90 backdrop-blur-sm text-golden font-bold text-xs sm:text-sm px-3 sm:px-3.5 py-1.5 rounded-full shadow-lg shadow-coffee/30 border border-golden/20">
                    ₹{item.price}
                </div>

                {item.badge && (
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1 bg-golden text-coffee font-bold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">
                        {item.badge.includes('Popular') && <Flame className="w-3 h-3" />}
                        {item.badge}
                    </div>
                )}

                <AnimatePresence>
                    {qty > 0 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full shadow-lg text-xs font-bold"
                        >
                            <Check className="w-3 h-3" />
                            {qty} added
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="p-3.5 sm:p-5">
                <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
                    <h3 className="text-sm sm:text-lg font-display font-bold text-charcoal group-hover:text-coffee transition-colors duration-300 leading-snug">
                        {item.name}
                    </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-0.5 sm:gap-1 mb-2.5 sm:mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(item.rating)
                                ? 'fill-golden text-golden'
                                : 'fill-cream-dark/50 text-cream-dark/50'
                                }`}
                        />
                    ))}
                    <span className="text-[10px] sm:text-xs text-charcoal-light ml-1.5 font-semibold bg-cream/80 px-1.5 py-0.5 rounded-md">
                        {item.rating}
                    </span>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-light/80 leading-relaxed mb-3.5 sm:mb-4 line-clamp-2 hidden sm:block">
                    {item.description}
                </p>

                {qty > 0 ? (
                    <div className="flex items-center justify-between bg-cream/60 rounded-xl px-1.5 py-1" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleMinus}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center shadow-sm hover:bg-cream-dark transition-colors"
                        >
                            <Minus className="w-3.5 h-3.5 text-charcoal" />
                        </button>
                        <span className="text-base sm:text-lg font-bold text-charcoal">{qty}</span>
                        <button
                            onClick={handleAdd}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-golden flex items-center justify-center shadow-sm hover:bg-golden-light transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5 text-coffee" />
                        </button>
                    </div>
                ) : (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdd}
                        className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 ${added
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                            : 'bg-gradient-to-r from-coffee to-coffee-light text-cream hover:from-golden hover:to-golden-light hover:text-coffee hover:shadow-lg hover:shadow-golden/20'
                            } group/btn`}
                    >
                        {added ? (
                            <>
                                <Check className="w-4 h-4" />
                                Added!
                            </>
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                                Add to Cart
                            </>
                        )}
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
}
