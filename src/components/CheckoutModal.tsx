import { useEffect, useRef, useState } from "react";
import { FREE_SHIPPING, SHIPPING_FEE, formatPrice } from "../data/products";
import type { CartLine } from "./CartDrawer";
import { CardIcon, ChatIcon, CheckIcon, QrIcon, SpinnerIcon, XIcon } from "./Icons";

type Phase = "form" | "processing" | "done";

interface CheckoutModalProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onComplete: () => void;
  notify: (msg: string) => void;
}

const PAY_METHODS = [
  { key: "wechat", label: "微信支付", desc: "推荐", icon: <ChatIcon size={19} /> },
  { key: "alipay", label: "支付宝", desc: "扫码支付", icon: <QrIcon size={19} /> },
  { key: "card", label: "银行卡", desc: "借记卡 / 信用卡", icon: <CardIcon size={19} /> },
];

export default function CheckoutModal({ open, lines, onClose, onComplete, notify }: CheckoutModalProps) {
  const [phase, setPhase] = useState<Phase>("form");
  const [snapshot, setSnapshot] = useState<CartLine[]>([]);
  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pay, setPay] = useState("wechat");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setPhase("form");
      setSnapshot(lines);
      setErrors({});
    }
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "processing") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, phase, onClose]);

  if (!open) return null;

  const subtotal = snapshot.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const count = snapshot.reduce((s, l) => s + l.qty, 0);

  const submit = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "请填写收货人姓名";
    if (!/^1\d{10}$/.test(phone.trim())) errs.phone = "请填写 11 位手机号";
    if (address.trim().length < 5) errs.address = "请填写完整的收货地址";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      notify("请先完善收货信息");
      return;
    }
    setPhase("processing");
    timer.current = window.setTimeout(() => {
      setOrderNo(`YB${Date.now().toString().slice(-9)}`);
      setPhase("done");
    }, 1700);
  };

  const finish = () => {
    onComplete();
    setName("");
    setPhone("");
    setAddress("");
    setNote("");
    onClose();
    notify("下单成功！豆子们将在最近的烘焙日进锅 🫘");
  };

  const inputCls = (err?: string) =>
    `w-full rounded-xl border bg-espresso-850 px-4 py-2.5 text-sm text-cream-100 placeholder:text-cream-500 outline-none transition-all ${
      err ? "border-red-400/70 focus:border-red-400" : "border-espresso-600 focus:border-honey-500/70 focus:ring-2 focus:ring-honey-500/15"
    }`;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <button
        className="anim-backdrop absolute inset-0 cursor-default bg-espresso-950/85 backdrop-blur-sm"
        onClick={() => phase !== "processing" && onClose()}
        aria-label="关闭结算"
      />

      <div className="anim-rise relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.6rem] border border-espresso-600 bg-espresso-900 shadow-2xl">
        {phase === "form" && (
          <div className="grid md:grid-cols-[1.2fr_1fr]">
            {/* 表单 */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-cream-50">模拟结算</h3>
                  <p className="mt-1 text-[12.5px] text-cream-400">演示环境，填写信息即可完成下单，不会真实扣款。</p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-espresso-600 p-2 text-cream-400 transition-all hover:rotate-90 hover:border-honey-500/60 hover:text-honey-300"
                  aria-label="关闭"
                >
                  <XIcon size={15} />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="co-name" className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream-500">
                      收货人 *
                    </label>
                    <input id="co-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="怎么称呼你" className={inputCls(errors.name)} />
                    {errors.name && <p className="mt-1 text-[11.5px] text-red-300">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="co-phone" className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream-500">
                      手机号 *
                    </label>
                    <input id="co-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="用于接收烘焙进度" maxLength={11} className={inputCls(errors.phone)} />
                    {errors.phone && <p className="mt-1 text-[11.5px] text-red-300">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="co-addr" className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream-500">
                    收货地址 *
                  </label>
                  <textarea
                    id="co-addr"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="省市区 + 详细地址，顺丰冷链直达"
                    rows={2}
                    className={`${inputCls(errors.address)} resize-none`}
                  />
                  {errors.address && <p className="mt-1 text-[11.5px] text-red-300">{errors.address}</p>}
                </div>

                <div>
                  <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream-500">支付方式</p>
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {PAY_METHODS.map((m) => {
                      const active = pay === m.key;
                      return (
                        <button
                          key={m.key}
                          onClick={() => setPay(m.key)}
                          className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                            active
                              ? "border-honey-500/80 bg-honey-500/10 shadow-[inset_0_0_0_1px_rgba(221,149,50,0.3)]"
                              : "border-espresso-600 bg-espresso-850 hover:border-espresso-500"
                          }`}
                          aria-pressed={active}
                        >
                          <span className={active ? "text-honey-300" : "text-cream-400"}>{m.icon}</span>
                          <span className="min-w-0">
                            <span className={`block text-[13px] font-medium ${active ? "text-honey-200" : "text-cream-200"}`}>{m.label}</span>
                            <span className="block truncate text-[10.5px] text-cream-500">{m.desc}</span>
                          </span>
                          <span
                            className={`ml-auto h-3.5 w-3.5 shrink-0 rounded-full border-2 transition-all ${
                              active ? "border-honey-400 bg-honey-400" : "border-espresso-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="co-note" className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-cream-500">
                    订单备注（选填）
                  </label>
                  <input id="co-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="例如：需要代磨粉 / 请附手写卡片" className={inputCls()} />
                </div>

                <button
                  onClick={submit}
                  className="w-full rounded-full bg-honey-400 py-3.5 text-[15px] font-semibold text-espresso-950 transition-all hover:bg-honey-300 hover:shadow-[0_12px_30px_-8px_rgba(221,149,50,0.6)] active:scale-[0.98]"
                >
                  确认下单 · {formatPrice(total)}
                </button>
              </div>
            </div>

            {/* 摘要 */}
            <div className="border-t border-espresso-700 bg-espresso-850/70 p-6 sm:p-8 md:border-l md:border-t-0">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-cream-500">订单摘要</p>
              <ul className="mt-4 space-y-3">
                {snapshot.map(({ product: p, qty }) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-11 w-11 rounded-lg border border-espresso-700 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] text-cream-200">{p.name}</p>
                      <p className="font-mono text-[11px] text-cream-500">× {qty}</p>
                    </div>
                    <span className="font-mono text-[12.5px] text-cream-300">{formatPrice(p.price * qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-1.5 border-t border-dashed border-espresso-600 pt-4 text-[13px] text-cream-300">
                <p className="flex justify-between">
                  <span>商品小计（{count} 件）</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </p>
                <p className="flex justify-between">
                  <span>运费</span>
                  <span className="font-mono">{shipping === 0 ? <span className="text-honey-300">免运费</span> : formatPrice(shipping)}</span>
                </p>
                <p className="flex items-baseline justify-between pt-2 text-cream-100">
                  <span>应付合计</span>
                  <span className="font-display text-2xl font-semibold text-honey-300">{formatPrice(total)}</span>
                </p>
              </div>
              <p className="mt-4 rounded-lg border border-espresso-700 bg-espresso-900/70 p-3 text-[11.5px] leading-5 text-cream-400">
                下单后排入最近的烘焙日（周三 / 周六），烘焙完成后养豆 4–7 天，顺丰发出。
              </p>
            </div>
          </div>
        )}

        {phase === "processing" && (
          <div className="flex flex-col items-center px-8 py-24 text-center">
            <SpinnerIcon size={42} className="text-honey-400" />
            <p className="mt-6 font-display text-xl font-semibold text-cream-50">正在连接支付网关…</p>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.2em] text-cream-500">Simulating payment · please wait</p>
            <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-espresso-700">
              <div className="h-full w-full origin-left animate-pulse rounded-full bg-gradient-to-r from-honey-600 to-honey-300" />
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="flex flex-col items-center px-8 py-16 text-center sm:py-20">
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden>
              <circle cx="44" cy="44" r="38" stroke="#dd9532" strokeWidth="2.5" className="circle-draw" strokeLinecap="round" />
              <path d="M28 45.5 39 56.5 61 33" stroke="#f2c472" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
            </svg>
            <h3 className="mt-6 font-display text-3xl font-semibold text-cream-50">下单成功！</h3>
            <p className="mt-3 text-sm leading-6 text-cream-300">
              共 {count} 件商品 · 实付 <strong className="font-display text-lg text-honey-300">{formatPrice(total)}</strong>
              <br />
              我们将在最近的烘焙日新鲜烘焙，养豆后顺丰发出。
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-full border border-espresso-600 bg-espresso-850 px-5 py-2.5">
              <CheckIcon size={15} className="text-honey-400" />
              <span className="font-mono text-[13px] tracking-wide text-cream-200">订单号 {orderNo}</span>
            </div>
            <button
              onClick={finish}
              className="mt-8 rounded-full bg-honey-400 px-8 py-3.5 text-[15px] font-semibold text-espresso-950 transition-all hover:bg-honey-300 hover:shadow-[0_12px_30px_-8px_rgba(221,149,50,0.6)] active:scale-95"
            >
              继续逛逛
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
