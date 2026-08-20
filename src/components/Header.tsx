import { BagIcon, LogoMark, TruckIcon } from "./Icons";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

const NAV = [
  { label: "咖啡吧台", href: "#shop" },
  { label: "烘焙故事", href: "#story" },
  { label: "门店信息", href: "#footer" },
];

export default function Header({ cartCount, onCartOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-[70]">
      {/* 公告条 */}
      <div className="bg-honey-400 text-espresso-950">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2.5 px-4 py-1.5 text-[12px] font-medium tracking-wide">
          <TruckIcon size={14} strokeWidth={2} />
          <span>
            每周三、周六新鲜烘焙 · 满 <strong className="font-bold">¥99</strong> 顺丰包邮 · 下单后 48h 内发货
          </span>
        </div>
      </div>

      <div className="border-b border-espresso-700/70 bg-espresso-900/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="group flex items-center gap-3 text-cream-100">
            <LogoMark size={38} className="text-honey-400 transition-transform duration-500 group-hover:rotate-[18deg]" />
            <span className="leading-tight">
              <span className="block font-display text-[22px] font-semibold tracking-wide">屿焙</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-cream-400">
                Yubei Roasters
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative text-sm text-cream-300 transition-colors hover:text-honey-300"
              >
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-honey-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 rounded-full border border-espresso-600 bg-espresso-800/80 px-4 py-2 text-sm text-cream-100 transition-all duration-300 hover:border-honey-500/70 hover:bg-espresso-700 active:scale-95"
            aria-label="打开咖啡袋"
          >
            <BagIcon size={17} className="text-honey-300" />
            <span className="hidden sm:inline">咖啡袋</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="anim-pop absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-honey-400 px-1 font-mono text-[11px] font-semibold text-espresso-950"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
