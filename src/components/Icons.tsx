import React from "react";

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const base = (
  { size = 20, className, strokeWidth = 1.7 }: IconProps,
  children: React.ReactNode,
  filled = false,
) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const BeanIcon = (p: IconProps & { filled?: boolean }) =>
  base(
    p,
    <>
      <path d="M12 3c4.4 0 7.6 3.7 7.6 9S16.4 21 12 21s-7.6-3.7-7.6-9S7.6 3 12 3Z" />
      <path d="M12 3c-2.2 3-2.2 6 0 9s2.2 6 0 9" />
    </>,
    p.filled,
  );

export const SearchIcon = (p: IconProps) =>
  base(
    p,
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.6 15.6 4.6 4.6" />
    </>,
  );

export const BagIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M5.5 8.2h13l-.9 11.2a1.8 1.8 0 0 1-1.8 1.6H8.2a1.8 1.8 0 0 1-1.8-1.6L5.5 8.2Z" />
      <path d="M8.7 10.5V6.8a3.3 3.3 0 0 1 6.6 0v3.7" />
    </>,
  );

export const PlusIcon = (p: IconProps) => base(p, <path d="M12 5v14M5 12h14" />);
export const MinusIcon = (p: IconProps) => base(p, <path d="M5 12h14" />);
export const XIcon = (p: IconProps) => base(p, <path d="m6 6 12 12M18 6 6 18" />);

export const ArrowRightIcon = (p: IconProps) =>
  base(p, <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />);

export const ArrowDownIcon = (p: IconProps) =>
  base(p, <path d="M12 4v15M6.5 13.5 12 19l5.5-5.5" />);

export const ChevronDownIcon = (p: IconProps) => base(p, <path d="m6 9.5 6 6 6-6" />);

export const TrashIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M4.5 6.5h15M9.5 6V4.6A1.6 1.6 0 0 1 11.1 3h1.8a1.6 1.6 0 0 1 1.6 1.6V6" />
      <path d="M6.5 6.5 7.3 19a1.8 1.8 0 0 0 1.8 1.7h5.8A1.8 1.8 0 0 0 16.7 19l.8-12.5" />
      <path d="M10 10.5v6M14 10.5v6" />
    </>,
  );

export const CheckIcon = (p: IconProps) => base(p, <path d="m5 12.5 4.5 4.5L19 7.5" />);

export const TruckIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M2.8 6h11.4v10H2.8z" />
      <path d="M14.2 9.5h3.8l3 3.4V16h-6.8" />
      <circle cx="7" cy="17.6" r="1.9" />
      <circle cx="17" cy="17.6" r="1.9" />
    </>,
  );

export const FlameIcon = (p: IconProps) =>
  base(
    p,
    <path d="M12 3.5c.6 2.8 2.4 4.2 3.8 5.9a6.8 6.8 0 0 1-1 10.1 7 7 0 0 1-9.4-.9C3.6 16.5 4 13 6.6 10.8c.3 1.3 1 2.2 2.1 2.7-.5-3.5.9-7.5 3.3-10Z" />,
  );

export const LeafIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M19.5 4.5C12 4.5 5.8 8.6 5.8 15.4c0 1.4.3 2.6.7 3.6C7.6 13.6 12.4 9.6 17 8.4c-4 2.3-8 6.4-9.3 11.1 5.6.8 11.8-2.8 11.8-15Z" />
    </>,
  );

export const MountainIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="m3 19 6.5-11 3.5 5.5L15.5 10 21 19H3Z" />
      <path d="m8 12.8 1.5 1.7 1.6-1.7" />
    </>,
  );

export const DropIcon = (p: IconProps) =>
  base(p, <path d="M12 3.5s6 6.2 6 10.3a6 6 0 0 1-12 0C6 9.7 12 3.5 12 3.5Z" />);

export const CupIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M4.5 9h12.5v5.2a5 5 0 0 1-5 5H9.5a5 5 0 0 1-5-5V9Z" />
      <path d="M17 10h1.3a2.6 2.6 0 0 1 0 5.2H17" />
      <path d="M8.5 3.5c-.7 1-.7 1.7 0 2.7M12.5 3.5c-.7 1-.7 1.7 0 2.7" />
    </>,
  );

export const PinIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M12 21s-6.8-5.6-6.8-10.8a6.8 6.8 0 0 1 13.6 0C18.8 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>,
  );

export const ClockIcon = (p: IconProps) =>
  base(
    p,
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3 2.2" />
    </>,
  );

export const PhoneIcon = (p: IconProps) =>
  base(
    p,
    <path d="M5.5 4h3l1.5 4-2 1.5a12.5 12.5 0 0 0 6.5 6.5L16 14l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4Z" />,
  );

export const ChatIcon = (p: IconProps) =>
  base(
    p,
    <path d="M4 5.5h16v11H10l-4.5 3.5v-3.5H4v-11ZM8 9.5h.01M12 9.5h.01M16 9.5h.01" />,
  );

export const QrIcon = (p: IconProps) =>
  base(
    p,
    <>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
      <path d="M14 14h2.5v2.5H14zM17.5 17.5H20V20h-2.5zM14 20h.01M20 14h.01" />
    </>,
  );

export const CardIcon = (p: IconProps) =>
  base(
    p,
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 14.5h4" />
    </>,
  );

export const StarIcon = (p: IconProps) =>
  base(
    p,
    <path d="m12 4 2.3 4.9 5.2.7-3.8 3.7.9 5.3L12 16l-4.6 2.6.9-5.3-3.8-3.7 5.2-.7L12 4Z" />,
  );

export const SparkIcon = (p: IconProps) =>
  base(p, <path d="M12 3.5 13.8 10 20.5 12l-6.7 2-1.8 6.5L10.2 14 3.5 12l6.7-2L12 3.5Z" />);

export const SpinnerIcon = ({ size = 20, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={`animate-spin ${className ?? ""}`}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.4" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

/** 品牌标识：咖啡豆 + 蒸汽 */
export const LogoMark = ({ size = 34, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
    <circle cx="20" cy="22" r="14.5" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
    <path
      d="M20 11.5c5.4 0 9.2 4.5 9.2 10.5s-3.8 10.5-9.2 10.5-9.2-4.5-9.2-10.5 3.8-10.5 9.2-10.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path d="M20 11.5c-2.7 3.6-2.7 7.2 0 10.5s2.7 6.9 0 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 5.5c-.8 1.2-.8 2 0 3.2M21 4c-.8 1.2-.8 2 0 3.2M26 5.5c-.8 1.2-.8 2 0 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
  </svg>
);
