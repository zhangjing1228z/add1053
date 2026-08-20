import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS } from "./data/products";
import type { Product, RoastCat } from "./data/products";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ShopSection from "./components/ShopSection";
import type { SortKey } from "./components/ShopSection";
import StoryBand from "./components/StoryBand";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import type { CartLine } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Toasts from "./components/Toasts";
import type { ToastItem } from "./components/Toasts";

const CART_KEY = "yubei-cart-v1";

function loadCart(): Record<string, number> {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    // 过滤掉已下架的 id
    const valid: Record<string, number> = {};
    for (const [id, qty] of Object.entries(parsed)) {
      if (PRODUCTS.some((p) => p.id === id) && typeof qty === "number" && qty > 0) {
        valid[id] = Math.min(20, qty);
      }
    }
    return valid;
  } catch {
    return {};
  }
}

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>(loadCart);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RoastCat | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [detailId, setDetailId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* 忽略存储异常 */
    }
  }, [cart]);

  const notify = useCallback((msg: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((ts) => [...ts.slice(-2), { id, msg }]);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToasts([]), 2600);
  }, []);

  /* ---------- 筛选与排序 ---------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const hitCat = category === "all" || p.category === category;
      if (!hitCat) return false;
      if (!q) return true;
      const haystack = [p.name, p.enName, p.origin, p.country, p.roastLabel, p.process, ...p.notes]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "score-desc") list = [...list].sort((a, b) => b.score - a.score);
    return list;
  }, [query, category, sort]);

  /* ---------- 购物车 ---------- */
  const lines: CartLine[] = useMemo(
    () =>
      PRODUCTS.filter((p) => cart[p.id])
        .map((p) => ({ product: p, qty: cart[p.id] })),
    [cart],
  );
  const cartCount = lines.reduce((s, l) => s + l.qty, 0);

  const addToCart = useCallback(
    (p: Product, qty = 1) => {
      setCart((c) => ({ ...c, [p.id]: Math.min(20, (c[p.id] ?? 0) + qty) }));
      notify(`已把「${p.name}」装进咖啡袋`);
      setDetailId(null);
    },
    [notify],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => {
      if (qty <= 0) {
        const next = { ...c };
        delete next[id];
        return next;
      }
      return { ...c, [id]: Math.min(20, qty) };
    });
  }, []);

  const removeLine = useCallback(
    (id: string) => {
      const p = PRODUCTS.find((x) => x.id === id);
      setCart((c) => {
        const next = { ...c };
        delete next[id];
        return next;
      });
      if (p) notify(`已移出「${p.name}」`);
    },
    [notify],
  );

  const detail = detailId ? PRODUCTS.find((p) => p.id === detailId) ?? null : null;

  return (
    <div className="min-h-screen">
      <div className="noise-layer" aria-hidden />

      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onAdd={addToCart} onView={(p) => setDetailId(p.id)} />

        <ShopSection
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          filtered={filtered}
          onAdd={addToCart}
          onView={(p) => setDetailId(p.id)}
          onReset={() => {
            setQuery("");
            setCategory("all");
            setSort("featured");
          }}
        />

        <StoryBand />
      </main>

      <Footer notify={notify} />

      <ProductModal product={detail} onClose={() => setDetailId(null)} onAdd={addToCart} />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        onClose={() => setCheckoutOpen(false)}
        onComplete={() => setCart({})}
        notify={notify}
      />

      <Toasts toasts={toasts} />
    </div>
  );
}
