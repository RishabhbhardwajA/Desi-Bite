import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Star, ShoppingBag, Plus, Minus, X, ChevronUp, ChevronLeft, ChevronRight, MessageCircle, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useRef } from 'react';
import { menuItems } from '../data/content';

// Fake reviews for each item
const fakeReviews = [
    { name: 'Aarav M.', rating: 5, text: 'Absolutely delicious! Best I\'ve ever had. Will definitely order again.', time: '2 days ago' },
    { name: 'Sneha R.', rating: 4, text: 'Really good taste and fresh ingredients. Portion size could be a bit bigger though.', time: '1 week ago' },
    { name: 'Karan P.', rating: 5, text: 'My go-to order every weekend. Never disappoints! 🔥', time: '2 weeks ago' },
    { name: 'Meera S.', rating: 4, text: 'Love the flavors! Delivery was quick and the food was still warm.', time: '3 weeks ago' },
    { name: 'Rohit K.', rating: 5, text: 'Perfect quality and taste. The best café food in Delhi, hands down.', time: '1 month ago' },
];

// Build extra gallery images from other items in same category or related
function getGalleryImages(item) {
    const images = [item.image];
    // Add images from same category
    const sameCategory = menuItems.filter(m => m.category === item.category && m.id !== item.id);
    sameCategory.forEach(m => images.push(m.image));
    // Add a couple from other categories for variety
    const others = menuItems.filter(m => m.category !== item.category).slice(0, 2);
    others.forEach(m => images.push(m.image));
    // Cap at 5
    return images.slice(0, 5);
}

export default function ItemDetailSheet({ item, isOpen, onClose }) {
    const { addItem, getItemQuantity, updateQuantity } = useCart();
    const qty = item ? getItemQuantity(item.id) : 0;
    const [sheetHeight, setSheetHeight] = useState('peek');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (!item) return null;

    const galleryImages = getGalleryImages(item);
    const itemReviews = fakeReviews.map((r, i) => ({
        ...r,
        id: `${item.id}-review-${i}`,
    }));

    const handleAdd = () => {
        addItem(item);
    };

    const handleDragEnd = (_, info) => {
        if (info.offset.y < -50) {
            setSheetHeight('full');
        } else if (info.offset.y > 80) {
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setSheetHeight('peek');
            setActiveImageIndex(0);
        }, 300);
    };

    const nextImage = (e) => {
        e?.stopPropagation();
        setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: sheetHeight === 'full' ? '0%' : '35%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="fixed inset-x-0 bottom-0 z-[56] bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ height: '100dvh', touchAction: 'none' }}
                    >
                        
                        <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0">
                            <div className="w-10 h-1.5 bg-cream-dark/50 rounded-full" />
                        </div>

                        {sheetHeight === 'peek' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center justify-center gap-1 pb-2 text-charcoal-light/60"
                            >
                                <ChevronUp className="w-4 h-4 animate-bounce" />
                                <span className="text-xs font-medium">Swipe up for reviews</span>
                            </motion.div>
                        )}

                        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-28">
                            
                            <div className="relative -mx-5 h-52 sm:h-72 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImageIndex}
                                        src={galleryImages[activeImageIndex]}
                                        alt={`${item.name} - Photo ${activeImageIndex + 1}`}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                                {/* Close button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md z-10"
                                >
                                    <X className="w-4 h-4 text-charcoal" />
                                </button>

                                {/* Badge */}
                                {item.badge && (
                                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-golden text-coffee text-xs font-bold rounded-full shadow-md z-10">
                                        {item.badge}
                                    </div>
                                )}

                                {galleryImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
                                        >
                                            <ChevronLeft className="w-4 h-4 text-charcoal" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
                                        >
                                            <ChevronRight className="w-4 h-4 text-charcoal" />
                                        </button>
                                    </>
                                )}

                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                                    {galleryImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(i); }}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImageIndex ? 'bg-golden w-5' : 'bg-white/70'}`}
                                        />
                                    ))}
                                </div>

                                <div className="absolute top-3 right-14 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                                    {activeImageIndex + 1}/{galleryImages.length}
                                </div>
                            </div>

                            <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                                {galleryImages.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImageIndex(i)}
                                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 ${i === activeImageIndex ? 'border-golden shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Item Info */}
                            <div className="pt-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-display font-bold text-charcoal">
                                            {item.name}
                                        </h2>
                                        <p className="text-charcoal-light/70 text-xs mt-0.5">{item.category}</p>
                                    </div>
                                    <div className="text-2xl font-display font-bold text-golden shrink-0">
                                        ₹{item.price}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1.5 mt-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-golden text-golden' : 'fill-cream-dark/40 text-cream-dark/40'}`}
                                        />
                                    ))}
                                    <span className="text-sm font-semibold text-charcoal ml-1">{item.rating}</span>
                                    <span className="text-xs text-charcoal-light/60">({Math.floor(Math.random() * 200 + 50)} ratings)</span>
                                </div>

                                {/* Description */}
                                <p className="mt-4 text-charcoal-light/80 text-sm leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="mt-6 flex items-center gap-3">
                                    {qty > 0 ? (
                                        <div className="flex items-center gap-3 bg-cream/80 rounded-xl px-2 py-1.5">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm hover:bg-cream-dark transition-colors"
                                            >
                                                <Minus className="w-4 h-4 text-charcoal" />
                                            </button>
                                            <span className="text-lg font-bold text-charcoal w-6 text-center">{qty}</span>
                                            <button
                                                onClick={handleAdd}
                                                className="w-9 h-9 rounded-lg bg-golden flex items-center justify-center shadow-sm hover:bg-golden-light transition-colors"
                                            >
                                                <Plus className="w-4 h-4 text-coffee" />
                                            </button>
                                        </div>
                                    ) : null}
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleAdd}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-coffee to-coffee-light text-cream font-bold text-sm rounded-xl hover:from-golden hover:to-golden-light hover:text-coffee transition-all duration-300 hover:shadow-lg hover:shadow-golden/20"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        {qty > 0 ? `Add More (₹${item.price})` : `Add to Cart — ₹${item.price}`}
                                    </motion.button>
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div className="mt-8 border-t border-cream-dark/20 pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MessageCircle className="w-5 h-5 text-golden" />
                                    <h3 className="text-lg font-display font-bold text-charcoal">Customer Reviews</h3>
                                    <span className="text-xs bg-cream/80 px-2 py-0.5 rounded-full text-charcoal-light font-medium">{itemReviews.length}</span>
                                </div>

                                <div className="space-y-4">
                                    {itemReviews.map((review) => (
                                        <motion.div
                                            key={review.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="bg-cream/40 rounded-xl p-4 border border-cream-dark/10"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-golden to-golden-dark rounded-full flex items-center justify-center">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-charcoal">{review.name}</p>
                                                        <p className="text-[10px] text-charcoal-light/60">{review.time}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} className="w-3 h-3 fill-golden text-golden" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-charcoal-light/80 leading-relaxed">{review.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
