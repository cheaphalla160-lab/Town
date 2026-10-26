import React, { useState } from 'react';
import { soundCtrl } from '../utils/audio';

interface ClownFigureProps {
  onClick: () => void;
  scale?: number;
  isFound?: boolean;
}

export const ClownFigure: React.FC<ClownFigureProps> = ({ onClick, scale = 1, isFound = false }) => {
  const [isHonking, setIsHonking] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHonking(true);
    soundCtrl.playClownHorn();
    setTimeout(() => setIsHonking(false), 600);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Cute Clown! Click me!"
      className={`relative cursor-pointer select-none group transition-transform duration-300 hover:scale-110 active:scale-95 ${
        isFound ? 'animate-bounce' : 'animate-clown-appear'
      } ${isHonking ? 'animate-honk' : ''}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Speech tag or attention pulse */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-0.5 rounded-full shadow-md border-2 border-white whitespace-nowrap animate-bounce flex items-center gap-1 z-20">
        <span>🤡</span>
        <span>Clown!</span>
      </div>

      {/* SVG Cartoon Clown */}
      <svg
        viewBox="0 0 140 180"
        className="w-24 h-32 md:w-28 md:h-36 drop-shadow-xl overflow-visible"
      >
        <defs>
          <filter id="clown-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.4" />
          </filter>
          <linearGradient id="hatGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>

        {/* Floating Balloons behind clown */}
        <g className="animate-float origin-bottom">
          {/* Balloon strings */}
          <path d="M 105 85 Q 115 50 120 15" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
          <path d="M 105 85 Q 100 45 95 10" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
          <path d="M 105 85 Q 110 40 110 -5" stroke="#94a3b8" strokeWidth="1.5" fill="none" />

          {/* Balloon 1: Red */}
          <ellipse cx="120" cy="15" rx="14" ry="18" fill="#ef4444" />
          <polygon points="118,33 122,33 120,36" fill="#dc2626" />
          <ellipse cx="116" cy="10" rx="3.5" ry="7" fill="#ffffff" opacity="0.45" />

          {/* Balloon 2: Yellow */}
          <ellipse cx="95" cy="10" rx="13" ry="17" fill="#fbbf24" />
          <polygon points="93,27 97,27 95,30" fill="#d97706" />
          <ellipse cx="91" cy="6" rx="3" ry="6" fill="#ffffff" opacity="0.45" />

          {/* Balloon 3: Lime Green */}
          <ellipse cx="110" cy="-5" rx="13" ry="17" fill="#10b981" />
          <polygon points="108,12 112,12 110,15" fill="#059669" />
          <ellipse cx="106" cy="-9" rx="3" ry="6" fill="#ffffff" opacity="0.45" />
        </g>

        {/* Clown Body / Costume */}
        <path
          d="M 35 120 C 35 100, 105 100, 105 120 L 115 170 C 115 175, 25 175, 25 170 Z"
          fill="url(#bodyGrad)"
          stroke="#1e293b"
          strokeWidth="3"
        />

        {/* Big Yellow Buttons on Costume */}
        <circle cx="70" cy="130" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <circle cx="70" cy="150" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />

        {/* Big Rainbow Ruffled Collar */}
        <g stroke="#1e293b" strokeWidth="2">
          <circle cx="46" cy="102" r="14" fill="#fbbf24" />
          <circle cx="62" cy="106" r="14" fill="#f43f5e" />
          <circle cx="78" cy="106" r="14" fill="#38bdf8" />
          <circle cx="94" cy="102" r="14" fill="#a855f7" />
        </g>

        {/* Clown Curly Hair - Left */}
        <g fill="#f97316" stroke="#c2410c" strokeWidth="2">
          <circle cx="34" cy="64" r="11" />
          <circle cx="28" cy="74" r="10" />
          <circle cx="32" cy="84" r="9" />
        </g>

        {/* Clown Curly Hair - Right */}
        <g fill="#06b6d4" stroke="#0891b2" strokeWidth="2">
          <circle cx="106" cy="64" r="11" />
          <circle cx="112" cy="74" r="10" />
          <circle cx="108" cy="84" r="9" />
        </g>

        {/* Clown Face */}
        <circle
          cx="70"
          cy="72"
          r="34"
          fill="#fffbeb"
          stroke="#1e293b"
          strokeWidth="3.5"
        />

        {/* Rosy Cheeks */}
        <circle cx="48" cy="76" r="8" fill="#f43f5e" opacity="0.35" />
        <circle cx="92" cy="76" r="8" fill="#f43f5e" opacity="0.35" />

        {/* Smiling Eyes */}
        <ellipse cx="54" cy="64" rx="4.5" ry="6.5" fill="#0f172a" />
        <circle cx="56" cy="62" r="2" fill="#ffffff" />
        <ellipse cx="86" cy="64" rx="4.5" ry="6.5" fill="#0f172a" />
        <circle cx="88" cy="62" r="2" fill="#ffffff" />

        {/* Eye makeup triangles */}
        <polygon points="54,52 50,56 58,56" fill="#3b82f6" />
        <polygon points="86,52 82,56 90,56" fill="#3b82f6" />

        {/* Squeaky Red Clown Nose! */}
        <circle
          cx="70"
          cy="73"
          r="10"
          fill="#ef4444"
          stroke="#b91c1c"
          strokeWidth="2.5"
          className="transition-transform hover:scale-125"
        />
        <circle cx="67" cy="70" r="3" fill="#ffffff" opacity="0.8" />

        {/* Big Red Smile with white painted makeup */}
        <path
          d="M 46 78 Q 70 102 94 78"
          stroke="#dc2626"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 52 80 Q 70 94 88 80"
          fill="#ffffff"
          stroke="#dc2626"
          strokeWidth="1.5"
        />

        {/* Cone Party Hat */}
        <polygon
          points="70,10 44,50 96,50"
          fill="url(#hatGrad)"
          stroke="#1e293b"
          strokeWidth="3"
        />
        {/* Hat Polka Dots */}
        <circle cx="68" cy="30" r="3" fill="#fef08a" />
        <circle cx="58" cy="42" r="3.5" fill="#fef08a" />
        <circle cx="80" cy="38" r="3.5" fill="#fef08a" />

        {/* Hat Pompom on top */}
        <circle
          cx="70"
          cy="10"
          r="8"
          fill="#facc15"
          stroke="#ca8a04"
          strokeWidth="2"
        />

        {/* Waving Hand Left */}
        <g className="animate-wiggle origin-right">
          <ellipse cx="26" cy="115" rx="9" ry="8" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
          <circle cx="21" cy="111" r="3" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="24" cy="107" r="3" fill="#ffffff" stroke="#1e293b" strokeWidth="1.5" />
        </g>

        {/* Hand Right holding balloons */}
        <ellipse cx="106" cy="98" rx="8" ry="7" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
      </svg>
    </div>
  );
};
