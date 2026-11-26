import type { Art } from "@/lib/data";

// رسومات عبوات أصلية (SVG) بشكل موحّد لكل الأصناف، من غير شعارات ماركات.

const INK = "#10262A";

function Label({
  x,
  y,
  w,
  h,
  text,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  accent: string;
}) {
  const byWidth = (w - 10) / Math.max(text.length, 2) / 0.62;
  const size = Math.max(9, Math.min(20, byWidth, h * 0.52));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#fff" fillOpacity={0.96} />
      <rect x={x + 8} y={y + h - 6} width={w - 16} height={3} rx={1.5} fill={accent} />
      <text
        x={x + w / 2}
        y={y + h / 2 - 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size}
        fontWeight={800}
        fill={INK}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {text}
      </text>
    </g>
  );
}

function Shape({ art }: { art: Art }) {
  const { color, accent, label } = art;
  const edge = "rgba(16,38,42,.1)";

  switch (art.shape) {
    case "bag":
      return (
        <>
          <path d="M56 56 Q100 46 144 56 L152 166 Q100 176 48 166 Z" fill={color} stroke={edge} />
          <path d="M56 56 Q100 46 144 56 L145 69 Q100 59 55 69 Z" fill={accent} />
          <path d="M59 71 Q68 69 76 68 L72 169 Q61 168 53 166 Z" fill="#fff" opacity=".25" />
          <path d="M130 69 Q139 70 144 71 L150 166 Q141 169 133 170 Z" fill="#000" opacity=".07" />
          <Label x={66} y={94} w={68} h={48} text={label} accent={accent} />
        </>
      );
    case "can":
      return (
        <>
          <rect x={60} y={62} width={80} height={108} rx={9} fill="#CBD5D8" />
          <rect x={60} y={80} width={80} height={74} fill={color} />
          <rect x={60} y={62} width={14} height={108} rx={7} fill="#fff" opacity=".28" />
          <rect x={126} y={62} width={14} height={108} rx={7} fill="#000" opacity=".09" />
          <ellipse cx={100} cy={63} rx={40} ry={9} fill="#E9EEF0" stroke="#B7C3C7" />
          <ellipse cx={100} cy={63} rx={30} ry={6} fill="none" stroke="#B7C3C7" />
          <Label x={68} y={94} w={64} h={44} text={label} accent={accent} />
        </>
      );
    case "flatcan":
      return (
        <>
          <rect x={44} y={106} width={112} height={58} rx={11} fill="#CBD5D8" />
          <rect x={44} y={120} width={112} height={32} fill={color} />
          <rect x={44} y={106} width={16} height={58} rx={8} fill="#fff" opacity=".28" />
          <ellipse cx={100} cy={106} rx={56} ry={13} fill="#E9EEF0" stroke="#B7C3C7" />
          <ellipse cx={100} cy={106} rx={44} ry={9} fill="none" stroke="#B7C3C7" />
          <ellipse cx={120} cy={105} rx={9} ry={3.5} fill="none" stroke="#9FAEB3" strokeWidth={2} />
          <Label x={70} y={122} w={60} h={28} text={label} accent={accent} />
        </>
      );
    case "bottle":
      return (
        <>
          <rect x={88} y={24} width={24} height={15} rx={4} fill={accent} />
          <rect x={91} y={38} width={18} height={16} fill={color} />
          <rect x={91} y={38} width={18} height={16} fill="#000" opacity=".08" />
          <path
            d="M91 52 Q64 64 64 94 L64 160 Q64 172 76 172 L124 172 Q136 172 136 160 L136 94 Q136 64 109 52 Z"
            fill={color}
            stroke={edge}
          />
          <path d="M71 90 Q71 72 84 63 L84 168 L77 168 Q71 168 71 161 Z" fill="#fff" opacity=".3" />
          <path d="M124 70 Q131 80 131 94 L131 162 Q131 168 125 168 L120 168 Z" fill="#000" opacity=".07" />
          <Label x={68} y={104} w={64} h={44} text={label} accent={accent} />
        </>
      );
    case "carton":
      return (
        <>
          <rect x={80} y={36} width={40} height={11} rx={2} fill={accent} />
          <path d="M66 70 L80 46 L120 46 L134 70 Z" fill={color} stroke={edge} />
          <path d="M66 70 L80 46 L120 46 L134 70 Z" fill="#000" opacity=".07" />
          <rect x={66} y={70} width={68} height={100} rx={3} fill={color} stroke={edge} />
          <rect x={66} y={70} width={68} height={20} fill={accent} />
          <rect x={66} y={70} width={11} height={100} fill="#fff" opacity=".3" />
          <rect x={124} y={70} width={10} height={100} fill="#000" opacity=".06" />
          <circle cx={114} cy={58} r={6} fill="#fff" stroke={edge} />
          <Label x={72} y={104} w={56} h={44} text={label} accent={accent} />
        </>
      );
    case "jar":
      return (
        <>
          <rect x={64} y={68} width={72} height={104} rx={15} fill={color} stroke={edge} />
          <rect x={70} y={78} width={10} height={86} rx={5} fill="#fff" opacity=".28" />
          <rect x={58} y={48} width={84} height={24} rx={6} fill={accent} />
          <rect x={58} y={62} width={84} height={5} fill="#000" opacity=".14" />
          <rect x={62} y={52} width={76} height={4} rx={2} fill="#fff" opacity=".3" />
          <Label x={72} y={100} w={56} h={44} text={label} accent={accent} />
        </>
      );
    case "box":
    case "tissue":
      return (
        <>
          <path d="M50 86 L66 68 L162 68 L146 86 Z" fill={color} />
          <path d="M50 86 L66 68 L162 68 L146 86 Z" fill="#fff" opacity=".32" />
          {art.shape === "tissue" && (
            <>
              <ellipse cx={106} cy={77} rx={26} ry={4.5} fill="#000" opacity=".28" />
              <path
                d="M86 77 Q88 44 104 34 Q101 52 118 44 Q113 62 126 77 Z"
                fill="#fff"
                stroke="rgba(16,38,42,.12)"
              />
            </>
          )}
          <path d="M146 86 L162 68 L162 150 L146 168 Z" fill={color} />
          <path d="M146 86 L162 68 L162 150 L146 168 Z" fill="#000" opacity=".2" />
          <rect x={50} y={86} width={96} height={82} rx={3} fill={color} />
          <rect x={50} y={86} width={96} height={15} fill={accent} />
          <rect x={50} y={86} width={10} height={82} fill="#fff" opacity=".18" />
          <Label x={62} y={110} w={72} h={42} text={label} accent={accent} />
        </>
      );
    case "round":
      return (
        <>
          <path d="M38 100 L38 130 A62 22 0 0 0 162 130 L162 100 Z" fill={color} />
          <path d="M38 100 L38 130 A62 22 0 0 0 162 130 L162 100 Z" fill="#000" opacity=".14" />
          <ellipse cx={100} cy={100} rx={62} ry={22} fill="#fff" stroke={color} strokeWidth={5} />
          <path
            d="M100 100 L100 79 M100 100 L154 108 M100 100 L46 108 M100 100 L72 119 M100 100 L128 119 M100 100 L58 87 M100 100 L142 87"
            stroke={color}
            strokeWidth={2}
            opacity=".45"
          />
          <ellipse cx={100} cy={100} rx={15} ry={6} fill={accent} />
          <Label x={70} y={128} w={60} h={24} text={label} accent={accent} />
        </>
      );
    case "tray":
      return (
        <>
          <rect x={34} y={100} width={132} height={64} rx={13} fill="#C9A77A" />
          {[56, 85, 115, 144].map((cx) => (
            <ellipse key={`b${cx}`} cx={cx} cy={102} rx={12} ry={16} fill="#F1DFC4" />
          ))}
          {[56, 85, 115, 144].map((cx) => (
            <g key={`f${cx}`}>
              <ellipse cx={cx} cy={122} rx={13} ry={17} fill="#FBF1E1" />
              <ellipse cx={cx - 4} cy={114} rx={3.5} ry={5} fill="#fff" opacity=".8" />
            </g>
          ))}
          <path d="M34 132 Q100 124 166 132 L166 151 Q166 164 153 164 L47 164 Q34 164 34 151 Z" fill="#B8935F" />
          <path d="M34 132 Q100 124 166 132 L166 138 Q100 130 34 138 Z" fill="#fff" opacity=".22" />
        </>
      );
    case "rolls":
      return (
        <>
          <rect x={42} y={66} width={116} height={106} rx={15} fill={color} opacity=".3" />
          {[66, 100, 134].map((cx) => (
            <g key={cx}>
              <rect x={cx - 15} y={92} width={30} height={64} fill="#fff" />
              <rect x={cx + 6} y={92} width={9} height={64} fill="#000" opacity=".06" />
              <ellipse cx={cx} cy={156} rx={15} ry={6} fill="#fff" />
              <ellipse cx={cx} cy={92} rx={15} ry={6} fill="#F4F6F7" stroke="#D5DDE0" />
              <ellipse cx={cx} cy={92} rx={5} ry={2.2} fill="#C9A77A" />
            </g>
          ))}
          <rect x={42} y={66} width={116} height={106} rx={15} fill="none" stroke={color} strokeWidth={2} />
          <rect x={42} y={66} width={116} height={14} rx={7} fill={color} />
          <Label x={64} y={112} w={72} h={30} text={label} accent={accent} />
        </>
      );
    case "softpack":
      return (
        <>
          <rect x={46} y={56} width={108} height={116} rx={17} fill={color} />
          <rect x={46} y={56} width={17} height={116} rx={8.5} fill="#fff" opacity=".25" />
          <rect x={138} y={56} width={16} height={116} rx={8} fill="#000" opacity=".07" />
          <rect x={82} y={64} width={36} height={10} rx={5} fill="#000" opacity=".2" />
          <circle cx={100} cy={122} r={40} fill={accent} opacity=".4" />
          <Label x={62} y={102} w={76} h={40} text={label} accent={accent} />
        </>
      );
    case "flatpack":
      return (
        <>
          <rect x={36} y={86} width={128} height={78} rx={15} fill={color} />
          <rect x={36} y={86} width={128} height={15} rx={7.5} fill="#fff" opacity=".28" />
          <rect x={68} y={97} width={64} height={25} rx={10} fill="#fff" stroke={accent} strokeWidth={2} />
          <rect x={92} y={105} width={16} height={5} rx={2.5} fill={accent} />
          <Label x={68} y={130} w={64} h={25} text={label} accent={accent} />
        </>
      );
  }
}

export default function PackArt({ art, className = "" }: { art: Art; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
      direction="rtl"
    >
      <rect width={200} height={200} fill={art.bg} />
      <circle cx={100} cy={100} r={80} fill="#fff" opacity=".5" />
      <ellipse cx={100} cy={177} rx={58} ry={7} fill={INK} opacity=".1" />
      <Shape art={art} />
    </svg>
  );
}
