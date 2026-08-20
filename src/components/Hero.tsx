import { PRODUCTS, formatPrice } from "../data/products";
import type { Product } from "../data/products";
import { ArrowDownIcon, ArrowRightIcon, BeanIcon, PlusIcon, SparkIcon } from "./Icons";

interface HeroProps {
  onAdd: (p: Product, qty?: number) => void;
  onView: (p: Product) => void;
}

const META = [
  { num: "6", unit: "座", label: "合作庄园直采" },
  { num: "2", unit: "次/周", label: "新鲜烘焙日" },
  { num: "86+", unit: "分", label: "杯测均分" },
];

const TICKER = PRODUCTS.map((p) => ({ title: p.name, notes: p.notes.join(" / ") }));

export default function Hero({ onAdd, onView }: HeroProps) {
  const featured = PRODUCTS[0];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* 背景层 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52rem 34rem at 78% 18%, rgba(221,149,50,0.14), transparent 62%), radial-gradient(40rem 30rem at 8% 88%, rgba(143,90,26,0.12), transparent 60%)",
        }}
      />
      <p
        aria-hidden
        className="outline-text pointer-events-none absolute -right-6 top-6 hidden select-none font-display text-[11rem] font-black italic leading-none lg:block xl:text-[13rem]"
      >
        Roast
      </p>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        {/* 左：文案 */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <div className="flex items-center gap-3">
            <span className="anim-dot h-2.5 w-2.5 rounded-full bg-honey-400" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream-400">
              独立精品烘焙所 · Since 2019
            </span>
          </div>

          <h1 className="mt-6 font-display text-[2.9rem] font-semibold leading-[1.08] text-cream-50 sm:text-6xl lg:text-[4.2rem]">
            <span className="mask-line">
              <span style={{ animationDelay: "0.08s" }}>好豆子，</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "0.24s" }}>
                会自己<em className="not-italic text-honey-300">讲故事</em>。
              </span>
            </span>
          </h1>

          <p className="mt-4 font-display text-base italic text-cream-400 sm:text-lg">
            From seed to cup — small batch, honest roast.
          </p>

          <p className="mt-6 max-w-md text-[15px] leading-7 text-cream-300">
            六座庄园直采，从埃塞俄比亚的花果香到苏门答腊的草本低沉。每周三、周六小批量新鲜烘焙，
            养豆完成后第一时间发出——你喝到的每一杯，离烘焙炉都不超过两周。
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="group flex items-center gap-2.5 rounded-full bg-honey-400 px-7 py-3.5 text-[15px] font-semibold text-espresso-950 shadow-[0_10px_30px_-8px_rgba(221,149,50,0.55)] transition-all duration-300 hover:bg-honey-300 hover:shadow-[0_14px_36px_-8px_rgba(221,149,50,0.7)] active:scale-95"
            >
              进入吧台挑豆
              <ArrowRightIcon size={17} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#story"
              className="group flex items-center gap-2 text-sm text-cream-300 transition-colors hover:text-honey-300"
            >
              认识烘焙所
              <ArrowDownIcon size={15} className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 divide-x divide-espresso-700">
            {META.map((m) => (
              <div key={m.label} className="px-4 first:pl-0">
                <dt className="order-2 mt-1 text-xs text-cream-400">{m.label}</dt>
                <dd className="font-display text-3xl font-semibold text-cream-50">
                  {m.num}
                  <span className="ml-1 text-sm font-normal text-honey-300">{m.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 右：主打豆拱形橱窗 */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-6">
          <div className="pointer-events-none absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-honey-500/15 blur-3xl" />

          {/* 蒸汽 */}
          <svg
            aria-hidden
            width="110"
            height="64"
            viewBox="0 0 110 64"
            fill="none"
            className="absolute left-1/2 top-[-42px] z-10 -translate-x-1/2"
          >
            {[
              { d: "M22 58c-6-12 7-16 2-28", delay: "0s" },
              { d: "M55 62c-7-14 8-18 2-32", delay: "0.9s" },
              { d: "M88 58c-6-12 7-16 2-28", delay: "1.7s" },
            ].map((s) => (
              <path
                key={s.d}
                d={s.d}
                stroke="#e8d5ba"
                strokeWidth="2.6"
                strokeLinecap="round"
                opacity="0.5"
                className="steam-wisp"
                style={{ animationDelay: s.delay }}
              />
            ))}
          </svg>

          <button
            onClick={() => onView(featured)}
            className="group relative block w-full cursor-pointer overflow-hidden rounded-b-[2rem] rounded-t-full border border-espresso-600/80 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.8)]"
            aria-label={`查看${featured.name}详情`}
          >
            <img
              src={featured.image}
              alt={featured.name}
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 rounded-b-[2rem] rounded-t-full ring-1 ring-inset ring-cream-50/10" />
            <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-espresso-950/60 to-transparent" />
          </button>

          {/* 风味浮动标签 */}
          {featured.notes.map((n, i) => (
            <span
              key={n}
              className="anim-floaty absolute rounded-full border border-honey-500/40 bg-espresso-850/90 px-3.5 py-1.5 text-xs text-honey-200 shadow-lg backdrop-blur"
              style={{
                animationDelay: `${i * 1.1}s`,
                ...(i === 0 && { left: "-6%", top: "24%" }),
                ...(i === 1 && { right: "-7%", top: "38%" }),
                ...(i === 2 && { left: "-4%", top: "56%" }),
              }}
            >
              {n}
            </span>
          ))}

          {/* 旋转徽章 */}
          <div className="absolute -right-6 -top-6 hidden h-28 w-28 sm:block">
            <svg viewBox="0 0 100 100" className="anim-spin-slow h-full w-full">
              <defs>
                <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fill="#d2b795" fontSize="8.6" letterSpacing="2.4" fontFamily="IBM Plex Mono, monospace">
                <textPath href="#badge-circle">FRESH ROASTED WEEKLY · SMALL BATCH ·</textPath>
              </text>
            </svg>
            <BeanIcon size={26} filled className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-honey-400" />
          </div>

          {/* 主打信息卡 */}
          <div className="absolute -bottom-8 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-espresso-600 bg-espresso-850/95 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <button onClick={() => onView(featured)} className="min-w-0 text-left">
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-honey-400">
                  <SparkIcon size={12} /> 本周主打
                </span>
                <span className="mt-1 block truncate font-display text-lg font-semibold text-cream-50 hover:text-honey-200">
                  {featured.name}
                </span>
                <span className="text-xs text-cream-400">
                  {featured.notes.join(" · ")} · {featured.weight}
                </span>
              </button>
              <button
                onClick={() => onAdd(featured)}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-honey-400 px-4 py-2.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-honey-300 active:scale-95"
                aria-label={`将${featured.name}加入咖啡袋`}
              >
                <PlusIcon size={15} strokeWidth={2.4} />
                {formatPrice(featured.price)}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
}

function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative border-y border-espresso-700 bg-espresso-950/70 py-3.5">
      <div className="overflow-hidden" aria-hidden={false}>
        <div className="anim-marquee flex w-max items-center hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-5 font-display text-sm italic text-cream-300">
                {t.title}
                <span className="mx-2.5 text-honey-400">—</span>
                <span className="text-cream-400">{t.notes}</span>
              </span>
              <SparkIcon size={13} className="shrink-0 text-honey-500/80" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
