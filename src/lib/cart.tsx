"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  slug: string;
  name: string;
  size: string;
  priceCop: number;
  qty: number;
  image: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "chamoy_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed.filter((item) => item?.slug && item.qty > 0));
      }
    } catch {
      // carrito corrupto: empezar vacío
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // sin storage disponible: el carrito vive en memoria
    }
  }, [items, hydrated]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((current) => {
      const index = current.findIndex((i) => i.slug === item.slug && i.size === item.size);
      if (index >= 0) {
        const next = [...current];
        next[index] = { ...next[index], qty: Math.min(99, next[index].qty + qty) };
        return next;
      }
      return [...current, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((i) => !(i.slug === slug && i.size === size))
        : current.map((i) => (i.slug === slug && i.size === size ? { ...i, qty: Math.min(99, qty) } : i))
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setItems((current) => current.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.priceCop, 0);
    return { items, count, subtotal, isOpen, open, close, add, setQty, remove, clear };
  }, [items, isOpen, open, close, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}

export function formatCop(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}
