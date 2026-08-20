import { formatPrice } from "../data/products";
import type { Product } from "../data/products";
import { BeanIcon, CupIcon, PlusIcon } from "./Icons";

interface ProductCardProps {
  product: Product;
  onAdd: (p: Product) => void;
  onView: (p: Product) => void;
}

const ROAST_COLORS: Record<string, string> = {
  light: "#f2c472",
  medium: "#dd9532",
  dark: "#8f5a1a",
};

export default function ProductCard({ product: p, onAdd, onView }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-b-2xl rounded-t-[42%] border border-espresso-700 bg-espresso-850 transition-all duration-500 hover:-translate-y-1.5 hover:border-honey-500/60 hover:shadow-[0_26px_50px_-22px_rgba(0,0,0,0.85)] sm:rounded-t-[46%]">
      {/* 拱形图窗 */}
      <button
        onClick={() => onView(p)}
        className="relative block w-full cursor-pointer overflow-hidden text-left"
        aria-label={`查看${p.name}风味详情`}
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-espresso-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-200 backdrop-blur">
          {p.roastLabel}
        </span>
        {p.tag && (
          <span className="absolute bottom-4 left-5 rounded-full bg-honey-400 px-3 py-1 text-[11px] font-semibold text-espresso-950 shadow-lg">
            {p.tag}
          </span>
        )}
        <span className="absolute bottom-4 right-4 flex translate-y-2 items-center gap-1.5 rounded-full border border-cream-50/25 bg-espresso-950/70 px-3.5 py-1.5 text-xs text-cream-100 opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <CupIcon size={13} /> 风味详情
        </span>
      </button>

      {/* 信息 */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-0.5" aria-label={`烘焙度 ${p.roast}/5`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <BeanIcon
                key={i}
                size={13}
                filled={i <= p.roast}
                className={i <= p.roast ? "text-honey-400" : "text-espresso-600"}
              />
            ))}
          </span>
          <span className="font-mono text-[11px] text-cream-400">
            SCA <span className="text-cream-200">{p.score}</span>
          </span>
        </div>

        <button onClick={() => onView(p)} className="mt-3 text-left">
          <h3 className="font-display text-xl font-semibold leading-snug text-cream-50 transition-colors group-hover:text-honey-200">
            {p.name}
          </h3>
          <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream-500">{p.enName}</p>
        </button>

        <p className="mt-2.5 text-[13px] leading-relaxed text-cream-300">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
            style={{ background: ROAST_COLORS[p.category] }}
          />
          {p.notes.join(" · ")}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="leading-none">
            <span className="font-display text-[26px] font-semibold text-honey-300">{formatPrice(p.price)}</span>
            <span className="ml-1.5 font-mono text-[11px] text-cream-500">/ {p.weight}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView(p)}
              className="rounded-full border border-espresso-600 p-2.5 text-cream-300 transition-all hover:border-honey-500/60 hover:text-honey-300 active:scale-90"
              aria-label={`${p.name}详情`}
            >
              <CupIcon size={16} />
            </button>
            <button
              onClick={() => onAdd(p)}
              className="flex items-center gap-1.5 rounded-full bg-honey-400 px-4 py-2.5 text-[13px] font-semibold text-espresso-950 transition-all duration-300 hover:bg-honey-300 hover:shadow-[0_8px_20px_-6px_rgba(221,149,50,0.6)] active:scale-95"
            >
              <PlusIcon size={14} strokeWidth={2.6} />
              加入袋子
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
