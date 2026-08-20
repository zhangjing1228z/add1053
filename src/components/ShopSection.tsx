import { CATEGORY_META, PRODUCTS } from "../data/products";
import type { Product, RoastCat } from "../data/products";
import { useReveal } from "../hooks/useReveal";
import ProductCard from "./ProductCard";
import { BeanIcon, ChevronDownIcon, CupIcon, SearchIcon, XIcon } from "./Icons";

export type SortKey = "featured" | "price-asc" | "price-desc" | "score-desc";

interface ShopSectionProps {
  query: string;
  setQuery: (v: string) => void;
  category: RoastCat | "all";
  setCategory: (v: RoastCat | "all") => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  filtered: Product[];
  onAdd: (p: Product) => void;
  onView: (p: Product) => void;
  onReset: () => void;
}

const CAT_DOT: Record<string, string> = {
  all: "#e8d5ba",
  light: "#f2c472",
  medium: "#dd9532",
  dark: "#8f5a1a",
};

const countBy = (key: RoastCat | "all") =>
  key === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === key).length;

export default function ShopSection({
  query,
  setQuery,
  category,
  setCategory,
  sort,
  setSort,
  filtered,
  onAdd,
  onView,
  onReset,
}: ShopSectionProps) {
  const ref = useReveal<HTMLElement>(0.1, [filtered.length, category, sort, query]);

  const searchBox = (extra?: string) => (
    <div className={`relative ${extra ?? ""}`}>
      <SearchIcon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cream-500" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜豆子、产地或风味，如「肯尼亚 / 黑加仑」"
        className="w-full rounded-full border border-espresso-600 bg-espresso-850 py-2.5 pl-11 pr-9 text-sm text-cream-100 placeholder:text-cream-500 outline-none transition-all focus:border-honey-500/70 focus:ring-2 focus:ring-honey-500/20"
        aria-label="搜索商品"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-cream-500 transition-colors hover:text-honey-300"
          aria-label="清空搜索"
        >
          <XIcon size={13} />
        </button>
      )}
    </div>
  );

  const sortSelect = (extra?: string) => (
    <div className={`relative ${extra ?? ""}`}>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortKey)}
        className="w-full cursor-pointer appearance-none rounded-full border border-espresso-600 bg-espresso-850 py-2.5 pl-4 pr-9 text-sm text-cream-200 outline-none transition-all focus:border-honey-500/70"
        aria-label="排序方式"
      >
        <option value="featured">推荐排序</option>
        <option value="price-asc">价格 低 → 高</option>
        <option value="price-desc">价格 高 → 低</option>
        <option value="score-desc">杯测分 高 → 低</option>
      </select>
      <ChevronDownIcon size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-cream-500" />
    </div>
  );

  return (
    <section id="shop" ref={ref} className="relative scroll-mt-28 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 标题行 */}
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-honey-400">The Counter · 咖啡吧台</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-cream-50 sm:text-[2.6rem] sm:leading-tight">
              挑一袋合口味的豆子
            </h2>
          </div>
          <p className="pb-1 text-sm text-cream-400">
            {query || category !== "all" ? (
              <>
                为你筛出 <span className="font-display text-lg font-semibold text-honey-300">{filtered.length}</span> 款
                <span className="mx-1.5 text-espresso-500">/</span>共 {PRODUCTS.length} 款在售
              </>
            ) : (
              <>
                全部 <span className="font-display text-lg font-semibold text-honey-300">{PRODUCTS.length}</span> 款在售批次
              </>
            )}
          </p>
        </div>

        <div className="mt-10 gap-10 lg:grid lg:grid-cols-[15.5rem_1fr]">
          {/* 桌面侧栏 */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div>
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.25em] text-cream-500">搜索 Search</p>
                {searchBox()}
              </div>

              <div>
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.25em] text-cream-500">烘焙度 Roast</p>
                <div className="space-y-2">
                  {CATEGORY_META.map((c) => {
                    const active = category === c.key;
                    return (
                      <button
                        key={c.key}
                        onClick={() => setCategory(c.key)}
                        className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                          active
                            ? "border-honey-500/70 bg-espresso-800 shadow-[inset_0_0_0_1px_rgba(221,149,50,0.25)]"
                            : "border-espresso-700 bg-espresso-850/60 hover:border-espresso-500 hover:bg-espresso-850"
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125"
                          style={{ background: CAT_DOT[c.key] }}
                        />
                        <span className="min-w-0 flex-1">
                          <span className={`block text-sm font-medium ${active ? "text-honey-200" : "text-cream-200"}`}>
                            {c.label}
                          </span>
                          <span className="block truncate text-[11px] text-cream-500">{c.hint}</span>
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[11px] ${
                            active ? "bg-honey-400 text-espresso-950" : "bg-espresso-700 text-cream-400"
                          }`}
                        >
                          {countBy(c.key)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.25em] text-cream-500">排序 Sort</p>
                {sortSelect()}
              </div>

              <div className="rounded-xl border border-espresso-700 bg-espresso-850/80 p-4">
                <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream-500">
                  <CupIcon size={14} className="text-honey-400" /> 吧台冲煮参数
                </p>
                <ul className="mt-3 space-y-2 font-mono text-[12px] text-cream-300">
                  <li className="flex justify-between border-b border-dashed border-espresso-700 pb-2">
                    <span>手冲</span>
                    <span className="text-cream-400">1:15 · 92°C · 2:00</span>
                  </li>
                  <li className="flex justify-between border-b border-dashed border-espresso-700 pb-2">
                    <span>法压</span>
                    <span className="text-cream-400">1:14 · 94°C · 4:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>意式</span>
                    <span className="text-cream-400">1:2 · 93°C · 28s</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* 移动端控制 */}
          <div className="space-y-4 lg:hidden">
            {searchBox()}
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
              {CATEGORY_META.map((c) => {
                const active = category === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setCategory(c.key)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-all ${
                      active
                        ? "border-honey-500 bg-honey-400 font-semibold text-espresso-950"
                        : "border-espresso-600 bg-espresso-850 text-cream-300"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: active ? "#1c120c" : CAT_DOT[c.key] }} />
                    {c.label}
                    <span className="font-mono text-[11px] opacity-70">{countBy(c.key)}</span>
                  </button>
                );
              })}
            </div>
            {sortSelect("w-44")}
          </div>

          {/* 商品网格 */}
          <div className="mt-10 lg:mt-0">
            {filtered.length > 0 ? (
              <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                    <ProductCard product={p} onAdd={onAdd} onView={onView} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="reveal in flex flex-col items-center rounded-2xl border border-dashed border-espresso-600 bg-espresso-850/40 px-6 py-20 text-center">
                <BeanIcon size={44} className="text-espresso-500" />
                <h3 className="mt-5 font-display text-xl font-semibold text-cream-200">没有找到匹配的豆子</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-cream-400">
                  试试换个关键词，比如「日晒」「耶加雪菲」，或者清空筛选条件看看全部批次。
                </p>
                <button
                  onClick={onReset}
                  className="mt-6 flex items-center gap-2 rounded-full bg-honey-400 px-6 py-2.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-honey-300 active:scale-95"
                >
                  <XIcon size={14} strokeWidth={2.4} /> 清空搜索与筛选
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
