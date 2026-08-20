import { useEffect } from "react";
import { FREE_SHIPPING, SHIPPING_FEE, formatPrice } from "../data/products";
import type { Product } from "../data/products";
import { ArrowRightIcon, BagIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon, XIcon } from "./Icons";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, lines, onClose, onSetQty, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : SHIPPING_FEE;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[85] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* 遮罩 */}
      <button
        className={`absolute inset-0 cursor-default bg-espresso-950/70 backdrop-blur-[2px] transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="关闭咖啡袋"
      />

      {/* 抽屉 */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full flex-col border-l border-espresso-700 bg-espresso-900 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[26.5rem] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="咖啡袋"
      >
        <header className="flex items-center justify-between border-b border-espresso-700 px-6 py-5">
          <h3 className="flex items-center gap-3 font-display text-xl font-semibold text-cream-50">
            你的咖啡袋
            {count > 0 && (
              <span className="rounded-full bg-honey-400 px-2.5 py-0.5 font-mono text-[12px] font-semibold text-espresso-950">
                {count}
              </span>
            )}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full border border-espresso-600 p-2 text-cream-400 transition-all hover:rotate-90 hover:border-honey-500/60 hover:text-honey-300"
            aria-label="关闭"
          >
            <XIcon size={15} />
          </button>
        </header>

        {/* 包邮进度 */}
        {lines.length > 0 && (
          <div className="border-b border-espresso-800 bg-espresso-850/60 px-6 py-4">
            <p className="flex items-center gap-2 text-[12.5px]">
              <TruckIcon size={15} className={subtotal >= FREE_SHIPPING ? "text-honey-300" : "text-cream-400"} />
              {subtotal >= FREE_SHIPPING ? (
                <span className="text-honey-300">已解锁顺丰包邮，豆子们坐着头等舱出发。</span>
              ) : (
                <span className="text-cream-300">
                  再买 <strong className="font-display text-base text-honey-300">{formatPrice(FREE_SHIPPING - subtotal)}</strong> 解锁包邮
                </span>
              )}
            </p>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-espresso-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-honey-600 via-honey-400 to-honey-300 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* 商品列表 */}
        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-espresso-500 text-cream-500">
                <BagIcon size={34} />
              </span>
              <h4 className="mt-6 font-display text-lg font-semibold text-cream-200">袋子还空着</h4>
              <p className="mt-2 text-sm leading-6 text-cream-400">
                去吧台挑几袋豆子吧，
                <br />
                今天下单，最近的烘焙日就能进锅。
              </p>
              <button
                onClick={onClose}
                className="mt-7 flex items-center gap-2 rounded-full bg-honey-400 px-6 py-3 text-sm font-semibold text-espresso-950 transition-all hover:bg-honey-300 active:scale-95"
              >
                去吧台逛逛
                <ArrowRightIcon size={15} strokeWidth={2.2} />
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-espresso-800">
              {lines.map(({ product: p, qty }) => (
                <li key={p.id} className="anim-rise flex gap-4 px-6 py-5">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-xl border border-espresso-700 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="truncate text-[14px] font-medium text-cream-100">{p.name}</h4>
                        <p className="mt-0.5 font-mono text-[11px] text-cream-500">
                          {formatPrice(p.price)} / {p.weight}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(p.id)}
                        className="shrink-0 rounded-full p-1.5 text-cream-500 transition-all hover:bg-espresso-800 hover:text-honey-300 active:scale-90"
                        aria-label={`移除${p.name}`}
                      >
                        <TrashIcon size={15} />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-espresso-600 bg-espresso-850 p-0.5">
                        <button
                          onClick={() => onSetQty(p.id, qty - 1)}
                          className="rounded-full p-1.5 text-cream-300 transition-all hover:bg-espresso-700 hover:text-honey-300 active:scale-90"
                          aria-label="减少一件"
                        >
                          <MinusIcon size={12} />
                        </button>
                        <span key={qty} className="anim-pop w-6 text-center font-mono text-[13px] text-cream-100">
                          {qty}
                        </span>
                        <button
                          onClick={() => onSetQty(p.id, qty + 1)}
                          className="rounded-full p-1.5 text-cream-300 transition-all hover:bg-espresso-700 hover:text-honey-300 active:scale-90"
                          aria-label="增加一件"
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>
                      <p className="font-display text-lg font-semibold text-honey-300">{formatPrice(p.price * qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 底部结算 */}
        {lines.length > 0 && (
          <footer className="space-y-3 border-t border-espresso-700 bg-espresso-850/50 px-6 py-5">
            <div className="space-y-1.5 text-[13.5px]">
              <p className="flex justify-between text-cream-300">
                <span>商品小计</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </p>
              <p className="flex justify-between text-cream-300">
                <span>运费（顺丰）</span>
                <span className="font-mono">{shipping === 0 ? <span className="text-honey-300">免运费</span> : formatPrice(shipping)}</span>
              </p>
            </div>
            <p className="flex items-baseline justify-between border-t border-dashed border-espresso-600 pt-3">
              <span className="text-sm text-cream-200">合计</span>
              <span className="font-display text-[1.7rem] font-semibold text-honey-300">{formatPrice(subtotal + shipping)}</span>
            </p>
            <p className="text-center text-[11px] text-cream-500">演示环境 · 结算为模拟流程，不会产生真实扣款</p>
            <button
              onClick={onCheckout}
              className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-honey-400 py-3.5 text-[15px] font-semibold text-espresso-950 transition-all hover:bg-honey-300 hover:shadow-[0_12px_30px_-8px_rgba(221,149,50,0.6)] active:scale-[0.98]"
            >
              去结算
              <ArrowRightIcon size={17} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
