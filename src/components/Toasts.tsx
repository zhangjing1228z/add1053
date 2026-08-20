import { BeanIcon, CheckIcon } from "./Icons";

export interface ToastItem {
  id: string;
  msg: string;
}

export default function Toasts({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="anim-rise flex w-auto max-w-full items-center gap-2.5 rounded-full border border-honey-500/40 bg-espresso-800/95 px-5 py-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-honey-400 text-espresso-950">
            {t.msg.startsWith("下单") || t.msg.startsWith("订阅") ? <CheckIcon size={13} strokeWidth={2.6} /> : <BeanIcon size={13} filled />}
          </span>
          <p className="text-[13.5px] leading-5 text-cream-100">{t.msg}</p>
        </div>
      ))}
    </div>
  );
}
