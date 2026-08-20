import { useEffect, useState } from "react";
import { formatPrice } from "../data/products";
import type { Product } from "../data/products";
import {
  BagIcon,
  BeanIcon,
  CupIcon,
  DropIcon,
  LeafIcon,
  MinusIcon,
  MountainIcon,
  PinIcon,
  PlusIcon,
  StarIcon,
  XIcon,
} from "./Icons";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [barsIn, setBarsIn] = useState(false);

  useEffect(() => {
    setQty(1);
    setBarsIn(false);
    if (product) {
      const t = window.setTimeout(() => setBarsIn(true), 120);
      return () => window.clearTimeout(t);
    }
  }, [product?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;
  const p = product;

  const specs = [
    { icon: <PinIcon size={15} />, label: "产地", value: p.origin },
    { icon: <DropIcon size={15} />, label: "处理法", value: p.process },
    { icon: <MountainIcon size={15} />, label: "海拔", value: p.altitude },
    { icon: <LeafIcon size={15} />, label: "品种", value: p.varietal },
    { icon: <StarIcon size={15} />, label: "生产者", value: p.producer },
    { icon: <BeanIcon size={15} />, label: "烘焙度", value: `${p.roastLabel}（${p.roast}/5）` },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <button
        className="anim-backdrop absolute inset-0 cursor-default bg-espresso-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="关闭详情"
      />

      <div className="anim-rise relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-b-3xl rounded-t-[3rem] border border-espresso-600 bg-espresso-900 shadow-2xl md:flex-row md:rounded-[2rem]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-espresso-600 bg-espresso-900/90 p-2.5 text-cream-300 transition-all hover:rotate-90 hover:border-honey-500/60 hover:text-honey-300"
          aria-label="关闭"
        >
          <XIcon size={16} />
        </button>

        {/* 图 */}
        <div className="relative shrink-0 md:w-[44%]">
          <img src={p.image} alt={p.name} className="h-56 w-full object-cover md:h-full md:min-h-[560px]" />
          <span className="absolute inset-0 bg-gradient-to-t from-espresso-950/50 via-transparent to-transparent md:bg-gradient-to-r" />
          {p.tag && (
            <span className="absolute bottom-4 left-4 rounded-full bg-honey-400 px-3 py-1 text-[11px] font-semibold text-espresso-950">
              {p.tag}
            </span>
          )}
          <span className="absolute bottom-4 right-4 rounded-full border border-cream-50/25 bg-espresso-950/70 px-3 py-1 font-mono text-[11px] text-cream-100 backdrop-blur">
            SCA {p.score} 分
          </span>
        </div>

        {/* 详情 */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-honey-500/50 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-honey-300">
              {p.roastLabel}
            </span>
            <span className="rounded-full border border-espresso-600 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cream-400">
              {p.weight}
            </span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-cream-50 sm:text-3xl">{p.name}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cream-500">{p.enName}</p>
          <p className="mt-4 text-[14.5px] leading-7 text-cream-300">{p.desc}</p>

          {/* 风味标签 */}
          <div className="mt-5 flex flex-wrap gap-2">
            {p.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-honey-500/35 bg-honey-500/10 px-3.5 py-1.5 text-[13px] text-honey-200"
              >
                {n}
              </span>
            ))}
          </div>

          {/* 规格 */}
          <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 rounded-2xl border border-espresso-700 bg-espresso-850/70 p-5 sm:grid-cols-2">
            {specs.map((s) => (
              <div key={s.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 text-honey-400">{s.icon}</span>
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-500">{s.label}</dt>
                  <dd className="mt-0.5 text-[13px] leading-5 text-cream-200">{s.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          {/* 风味档案 */}
          <div className="mt-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-cream-500">风味档案 Profile</p>
            <div className="mt-3.5 space-y-3">
              {p.profile.map((row, i) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-[12.5px] text-cream-300">{row.label}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-espresso-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-honey-600 to-honey-300 transition-all duration-700 ease-out"
                      style={{ width: barsIn ? `${row.value}%` : "0%", transitionDelay: `${i * 90}ms` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right font-mono text-[11px] text-cream-500">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-[13.5px] leading-7 text-cream-400">{p.longDesc}</p>

          <div className="mt-5 flex items-start gap-2.5 rounded-xl border-l-2 border-honey-500 bg-espresso-850/80 p-4">
            <CupIcon size={17} className="mt-0.5 shrink-0 text-honey-400" />
            <p className="text-[13px] leading-6 text-cream-300">{p.brew}</p>
          </div>

          {/* 购买行 */}
          <div className="sticky bottom-0 -mx-6 mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-espresso-700 bg-espresso-900/95 px-6 py-4 backdrop-blur sm:-mx-8 sm:px-8">
            <p className="leading-none">
              <span className="font-display text-3xl font-semibold text-honey-300">{formatPrice(p.price * qty)}</span>
              {qty > 1 && <span className="ml-2 font-mono text-[11px] text-cream-500">{qty} × {formatPrice(p.price)}</span>}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full border border-espresso-600 bg-espresso-850 p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="rounded-full p-2 text-cream-300 transition-all hover:bg-espresso-700 hover:text-honey-300 active:scale-90 disabled:opacity-30 disabled:hover:bg-transparent"
                  aria-label="减少数量"
                >
                  <MinusIcon size={14} />
                </button>
                <span key={qty} className="anim-pop w-7 text-center font-mono text-sm text-cream-100">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="rounded-full p-2 text-cream-300 transition-all hover:bg-espresso-700 hover:text-honey-300 active:scale-90"
                  aria-label="增加数量"
                >
                  <PlusIcon size={14} />
                </button>
              </div>
              <button
                onClick={() => onAdd(p, qty)}
                className="flex items-center gap-2 rounded-full bg-honey-400 px-6 py-3 text-sm font-semibold text-espresso-950 transition-all hover:bg-honey-300 hover:shadow-[0_10px_26px_-8px_rgba(221,149,50,0.65)] active:scale-95"
              >
                <BagIcon size={16} strokeWidth={2} />
                加入咖啡袋
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
