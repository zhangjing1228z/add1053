import { ROASTERY_IMAGE } from "../data/products";
import { useReveal } from "../hooks/useReveal";
import { BeanIcon, FlameIcon } from "./Icons";

const STATS = [
  { num: "6", label: "座合作庄园" },
  { num: "≤12kg", label: "每一锅的克制" },
  { num: "4–7", label: "天养豆期" },
];

const SCHEDULE = [
  { day: "周三", desc: "浅烘日 · 花果酸香批次", tone: "text-honey-300" },
  { day: "周六", desc: "深烘日 · 醇厚浓香批次", tone: "text-cream-200" },
];

export default function StoryBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="story" ref={ref} className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(46rem 30rem at 12% 30%, rgba(221,149,50,0.08), transparent 60%)" }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12">
        {/* 图 */}
        <div className="reveal relative lg:col-span-7">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-t-[7rem] rounded-b-2xl border border-honey-600/30" aria-hidden />
          <div className="relative overflow-hidden rounded-b-2xl rounded-t-[7rem]">
            <img
              src={ROASTERY_IMAGE}
              alt="屿焙烘焙所内景：老式滚筒烘焙机与麻袋生豆"
              className="aspect-[16/11] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-espresso-950/55 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-cream-50/20 bg-espresso-950/70 px-4 py-2 text-xs text-cream-100 backdrop-blur">
              <FlameIcon size={14} className="text-honey-300" />
              Probat 1968 老炉 · 仍在服役
            </span>
          </div>
        </div>

        {/* 文 */}
        <div className="lg:col-span-5">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.3em] text-honey-400">
            The Roastery · 烘焙所
          </p>
          <h2 className="reveal mt-4 font-display text-3xl font-semibold leading-snug text-cream-50 sm:text-4xl">
            小批量，
            <br />
            是对豆子最基本的尊重。
          </h2>
          <p className="reveal mt-6 text-[15px] leading-7 text-cream-300">
            我们不用工业流水线对待咖啡。每一锅不超过 12 公斤，烘焙师守在炉边听一爆的节奏、
            看豆色的转变，按杯测结果微调曲线——同一支豆子，每个月的味道都可能有些许不同，
            这正是小批量烘焙诚实的地方。
          </p>
          <p className="reveal mt-4 text-[15px] leading-7 text-cream-300">
            生豆来自六座我们亲自拜访过的庄园，按公平贸易价格直接签约。烘焙完成后养豆 4 到 7 天，
            排气稳定了才打包发出。
          </p>

          <div className="reveal mt-9 grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-espresso-700 bg-espresso-850/80 p-4 text-center">
                <p className="font-display text-2xl font-semibold text-honey-300">{s.num}</p>
                <p className="mt-1 text-xs text-cream-400">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-6 rounded-xl border border-espresso-700 bg-espresso-850/80 p-5">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-cream-400">
              <BeanIcon size={14} className="text-honey-400" /> 烘焙日历
            </p>
            <ul className="mt-3 space-y-2.5">
              {SCHEDULE.map((s) => (
                <li key={s.day} className="flex items-baseline gap-3 text-sm">
                  <span className={`font-display text-lg font-semibold ${s.tone}`}>{s.day}</span>
                  <span className="h-px flex-1 bg-espresso-700" />
                  <span className="text-cream-300">{s.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
