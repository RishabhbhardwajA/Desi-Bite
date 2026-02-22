import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Smartphone, Banknote, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function PaymentModal({ total, onClose, onSuccess }) {
    const [step, setStep] = useState('method'); // method -> details -> processing -> success
    const [method, setMethod] = useState('');

    const paymentMethods = [
        { id: 'upi', label: 'UPI / Google Pay', icon: <Smartphone className="w-5 h-5" />, color: 'bg-purple-500' },
        { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" />, color: 'bg-blue-500' },
        { id: 'cod', label: 'Cash on Delivery', icon: <Banknote className="w-5 h-5" />, color: 'bg-green-500' },
    ];

    const handlePay = () => {
        setStep('processing');
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onSuccess();
            }, 2500);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-cream-dark/20 bg-gradient-to-r from-coffee to-coffee-light">
                    <h3 className="font-display font-bold text-cream text-lg">
                        {step === 'success' ? 'Order Confirmed!' : 'Payment'}
                    </h3>
                    {step !== 'processing' && step !== 'success' && (
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            <X className="w-4 h-4 text-cream" />
                        </button>
                    )}
                </div>

                <div className="p-5">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Choose Payment Method */}
                        {step === 'method' && (
                            <motion.div
                                key="method"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-3"
                            >
                                <p className="text-charcoal-light text-sm mb-4">Choose payment method</p>
                                {paymentMethods.map((pm) => (
                                    <button
                                        key={pm.id}
                                        onClick={() => { setMethod(pm.id); setStep('details'); }}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${method === pm.id
                                            ? 'border-golden bg-golden/5'
                                            : 'border-cream-dark/20 hover:border-golden/50'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 ${pm.color} rounded-xl flex items-center justify-center text-white`}>
                                            {pm.icon}
                                        </div>
                                        <span className="font-semibold text-charcoal">{pm.label}</span>
                                    </button>
                                ))}

                                <div className="pt-3 flex items-center justify-between text-sm">
                                    <span className="text-charcoal-light">Total Amount</span>
                                    <span className="font-display font-bold text-golden text-xl">₹{total}</span>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Payment Details */}
                        {step === 'details' && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                {method === 'upi' && (
                                    <>
                                        <p className="text-charcoal-light text-sm">Enter your UPI ID</p>
                                        <input
                                            type="text"
                                            placeholder="yourname@upi"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-cream-dark/20 focus:border-golden focus:outline-none text-charcoal font-medium transition-colors"
                                        />
                                    </>
                                )}
                                {method === 'card' && (
                                    <>
                                        <p className="text-charcoal-light text-sm">Enter card details</p>
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            maxLength={19}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-cream-dark/20 focus:border-golden focus:outline-none text-charcoal font-medium transition-colors"
                                        />
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                className="flex-1 px-4 py-3 rounded-xl border-2 border-cream-dark/20 focus:border-golden focus:outline-none text-charcoal font-medium transition-colors"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                maxLength={3}
                                                className="w-24 px-4 py-3 rounded-xl border-2 border-cream-dark/20 focus:border-golden focus:outline-none text-charcoal font-medium transition-colors"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Card Holder Name"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-cream-dark/20 focus:border-golden focus:outline-none text-charcoal font-medium transition-colors"
                                        />
                                    </>
                                )}
                                {method === 'cod' && (
                                    <div className="text-center py-4">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Banknote className="w-8 h-8 text-green-600" />
                                        </div>
                                        <p className="text-charcoal font-medium">Pay ₹{total} at the time of delivery</p>
                                        <p className="text-charcoal-light text-sm mt-1">Keep exact change ready for a smooth handoff</p>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => setStep('method')}
                                        className="flex-1 py-3 border-2 border-cream-dark/30 text-charcoal font-semibold rounded-xl hover:bg-cream/50 transition-all"
                                    >
                                        Back
                                    </button>
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handlePay}
                                        className="flex-[2] py-3 bg-golden text-coffee font-bold rounded-xl hover:bg-golden-light transition-all hover:shadow-lg hover:shadow-golden/20"
                                    >
                                        {method === 'cod' ? 'Place Order' : `Pay ₹${total}`}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Processing */}
                        {step === 'processing' && (
                            <motion.div
                                key="processing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-10"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-14 h-14 border-4 border-cream-dark/20 border-t-golden rounded-full mx-auto"
                                />
                                <p className="mt-5 text-charcoal font-medium">Processing your payment...</p>
                                <p className="text-charcoal-light text-sm mt-1">Please wait, don't close this window</p>
                            </motion.div>
                        )}

                        {/* Step 4: Success */}
                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.2 }}
                                >
                                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h4 className="mt-4 text-xl font-display font-bold text-charcoal">Payment Successful!</h4>
                                    <p className="text-charcoal-light mt-2">Your order of <span className="font-bold text-golden">₹{total}</span> has been placed</p>
                                    <p className="text-sm text-charcoal-light/70 mt-1">Order #DB{Math.floor(Math.random() * 90000) + 10000}</p>
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Estimated delivery: 30-40 mins
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function CartSidebar() {
    const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, totalItems, totalPrice } =
        useCart();
    const [showPayment, setShowPayment] = useState(false);

    const handlePaymentSuccess = () => {
        setShowPayment(false);
        clearCart();
        setIsOpen(false);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-offwhite z-[70] shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-cream-dark/30 bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-coffee rounded-xl flex items-center justify-center">
                                        <ShoppingBag className="w-5 h-5 text-cream" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-charcoal text-lg">Your Cart</h3>
                                        <p className="text-xs text-charcoal-light">
                                            {totalItems} {totalItems === 1 ? 'item' : 'items'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-9 h-9 rounded-full bg-cream flex items-center justify-center hover:bg-cream-dark transition-colors"
                                >
                                    <X className="w-4 h-4 text-charcoal" />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mb-4">
                                            <ShoppingBag className="w-8 h-8 text-coffee/40" />
                                        </div>
                                        <p className="text-charcoal-light font-medium">Your cart is empty</p>
                                        <p className="text-sm text-charcoal-light/70 mt-1">
                                            Add items from the menu to get started
                                        </p>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="mt-6 px-6 py-2.5 bg-golden text-coffee font-semibold text-sm rounded-full hover:bg-golden-light transition-all"
                                        >
                                            Browse Menu
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 80 }}
                                                className="flex gap-4 bg-white p-3 rounded-xl border border-cream-dark/20 shadow-sm"
                                            >
                                                {/* Image */}
                                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-cream shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream to-cream-dark text-2xl">${item.category === 'Coffee & Beverages' ? '☕' :
                                                                item.category === 'Pizza' ? '🍕' :
                                                                    item.category === 'Burgers' ? '🍔' :
                                                                        item.category === 'Sandwiches' ? '🥪' :
                                                                            item.category === 'Fries & Sides' ? '🍟' : '🍰'
                                                                }</div>`;
                                                        }}
                                                    />
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-display font-bold text-charcoal text-sm truncate">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-golden font-bold text-sm mt-1">
                                                        ₹{item.price * item.quantity}
                                                    </p>

                                                    {/* Quantity controls */}
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="w-7 h-7 rounded-lg bg-cream flex items-center justify-center hover:bg-cream-dark transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm font-bold text-charcoal w-5 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="w-7 h-7 rounded-lg bg-cream flex items-center justify-center hover:bg-cream-dark transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>

                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="ml-auto w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                                                        >
                                                            <Trash2 className="w-3 h-3 text-red-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}

                                        {/* Clear cart */}
                                        <button
                                            onClick={clearCart}
                                            className="text-xs text-red-400 hover:text-red-500 font-medium transition-colors"
                                        >
                                            Clear all items
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Footer - Checkout */}
                            {items.length > 0 && (
                                <div className="p-5 border-t border-cream-dark/30 bg-white space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-charcoal-light text-sm">Subtotal</span>
                                        <span className="font-bold text-charcoal">₹{totalPrice}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-charcoal-light text-sm">Delivery</span>
                                        <span className="text-sm text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="h-px bg-cream-dark/30" />
                                    <div className="flex items-center justify-between">
                                        <span className="font-display font-bold text-charcoal text-lg">Total</span>
                                        <span className="font-display font-bold text-golden text-xl">
                                            ₹{totalPrice}
                                        </span>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setShowPayment(true)}
                                        className="w-full py-3.5 bg-gradient-to-r from-coffee to-coffee-light text-cream font-bold rounded-xl hover:from-golden hover:to-golden-light hover:text-coffee transition-all hover:shadow-lg hover:shadow-golden/20"
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Payment Modal */}
            <AnimatePresence>
                {showPayment && (
                    <PaymentModal
                        total={totalPrice}
                        onClose={() => setShowPayment(false)}
                        onSuccess={handlePaymentSuccess}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
