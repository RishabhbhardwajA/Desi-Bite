import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = useCallback((product) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const updateQuantity = useCallback((id, delta) => {
        setItems((prev) =>
            prev
                .map((i) =>
                    i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
                )
                .filter((i) => i.quantity > 0)
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const getItemQuantity = useCallback((id) => {
        const item = items.find((i) => i.id === id);
        return item ? item.quantity : 0;
    }, [items]);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                setIsOpen,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                getItemQuantity,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
