import { useState } from "react";
import { ChatIcon, ClockIcon, LogoMark, PhoneIcon, PinIcon, QrIcon, StarIcon } from "./Icons";

interface FooterProps {
  notify: (msg: string) => void;
}

const LINKS = [
  { label: "咖啡吧台", href: "#shop" },
  { label: "烘焙故事", href: "#story" },
  { label: "回到顶部", href: "#top" },
];

export default function Footer({ notify }: FooterProps) {
  const [email, setEmail] = useState("");

  const subscribe = () => {
    if (!email.trim() || !email.includes("@")) {
      notify("请填写有效的邮箱地址");
      return;
    }
    setEmail("");
    notify("订阅成功！新豆上架会第一时间通知你");
  };

  return (
    <footer id="footer" className="relative scroll-mt-24 border-t border-espresso-700 bg-espresso-950/70">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12">
        {/* 品牌 */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <LogoMark size={40} className="text-honey-400" />
            <div className="leading-tight">
              <p className="font-display text-2xl font-semibold text-cream-50">屿焙</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream-400">Yubei Roasters</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-[13.5px] leading-6 text-cream-400">
            一间只有十二平米烘焙间的独立咖啡品牌。六座庄园、一台老炉、两个较真的烘焙师，
            以及每一锅都不肯将就的小批量。
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: <ChatIcon size={16} />, label: "微信公众号" },
              { icon: <QrIcon size={16} />, label: "小红书" },
              { icon: <StarIcon size={16} />, label: "大众点评" },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => notify(`「${s.label}」为演示占位入口`)}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso-600 text-cream-400 transition-all duration-300 hover:-translate-y-1 hover:border-honey-500/70 hover:text-honey-300"
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* 导航 */}
        <div className="md:col-span-2">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-cream-500">导航</p>
          <ul className="mt-4 space-y-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group flex items-center gap-2 text-sm text-cream-300 transition-colors hover:text-honey-300">
                  <span className="h-px w-3 bg-espresso-500 transition-all duration-300 group-hover:w-5 group-hover:bg-honey-400" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 门店 */}
        <div className="md:col-span-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-cream-500">烘焙所 & 门店</p>
          <ul className="mt-4 space-y-3.5 text-[13.5px] text-cream-300">
            <li className="flex items-start gap-2.5">
              <PinIcon size={15} className="mt-0.5 shrink-0 text-honey-400" />
              上海市静安区愚园路 1287 弄 · 屿焙烘焙所
            </li>
            <li className="flex items-start gap-2.5">
              <ClockIcon size={15} className="mt-0.5 shrink-0 text-honey-400" />
              周二至周日 10:00 – 20:00（周一烘炉休息）
            </li>
            <li className="flex items-start gap-2.5">
              <PhoneIcon size={15} className="mt-0.5 shrink-0 text-honey-400" />
              <span className="font-mono text-[13px]">021 - 6248 - 1287</span>
            </li>
          </ul>
        </div>

        {/* 订阅 */}
        <div className="md:col-span-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-cream-500">新豆预告</p>
          <p className="mt-4 text-[13.5px] leading-6 text-cream-400">
            每季新豆到港前，订阅者可以先于上架 48 小时预订。
          </p>
          <div className="mt-4 flex overflow-hidden rounded-full border border-espresso-600 bg-espresso-850 transition-all focus-within:border-honey-500/70">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && subscribe()}
              placeholder="your@email.com"
              className="w-full bg-transparent px-4 py-2.5 text-sm text-cream-100 placeholder:text-cream-500 outline-none"
              aria-label="订阅邮箱"
            />
            <button
              onClick={subscribe}
              className="shrink-0 bg-honey-400 px-5 text-[13px] font-semibold text-espresso-950 transition-colors hover:bg-honey-300"
            >
              订阅
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-espresso-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <p className="text-[12px] text-cream-500">© 2026 屿焙咖啡 YUBEI ROASTERS · 本站为前端演示项目，商品与交易均为模拟</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream-500">Roasted with patience in Shanghai</p>
        </div>
      </div>
    </footer>
  );
}
