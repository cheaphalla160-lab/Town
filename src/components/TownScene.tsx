import React from 'react';
import { HidingSpot } from '../types';
import { ClownFigure } from './ClownFigure';

interface TownSceneProps {
  currentSpot: HidingSpot | null;
  onClownClick: () => void;
  isFound: boolean;
  onSceneClick: () => void;
}

export const TownScene: React.FC<TownSceneProps> = ({
  currentSpot,
  onClownClick,
  isFound,
  onSceneClick,
}) => {
  const isClownHere = currentSpot && currentSpot.location === 'town';

  return (
    <div
      onClick={onSceneClick}
      className="relative w-full h-full min-h-[460px] md:min-h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 bg-gradient-to-b from-sky-200 via-emerald-100 to-green-200 cursor-pointer select-none transition-all duration-300 group"
      role="region"
      aria-label="Town Scene"
    >
      {/* Title Badge: Clear pedagogical label */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border-2 border-emerald-400">
        <span className="text-2xl">🏡</span>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-2xl tracking-wide text-emerald-800 uppercase font-fredoka">
              Town
            </span>
            <span className="text-sm font-semibold text-emerald-600">小镇</span>
          </div>
          <p className="text-[11px] text-emerald-700/80 font-medium">Quiet houses, green trees & windmill</p>
        </div>
      </div>

      {/* SVG Scenery Layer */}
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="townSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="60%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>
          <linearGradient id="hillGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        {/* Sky Background */}
        <rect width="500" height="500" fill="url(#townSky)" />

        {/* Sun */}
        <circle cx="440" cy="65" r="38" fill="#fde047" opacity="0.9" />
        <circle cx="440" cy="65" r="48" fill="#fef08a" opacity="0.35" />

        {/* Gentle Drifting Clouds */}
        <g fill="#ffffff" opacity="0.85" className="animate-cloud-slow">
          <ellipse cx="90" cy="60" rx="35" ry="16" />
          <ellipse cx="120" cy="55" rx="25" ry="14" />
          <ellipse cx="70" cy="64" rx="22" ry="12" />
        </g>
        <g fill="#ffffff" opacity="0.7" className="animate-cloud-fast">
          <ellipse cx="280" cy="85" rx="30" ry="14" />
          <ellipse cx="305" cy="80" rx="20" ry="12" />
        </g>

        {/* Rolling Green Hills in Background */}
        <path d="M -50 320 Q 120 220 300 300 T 550 270 L 550 500 L -50 500 Z" fill="#bbf7d0" />
        <path d="M -30 350 Q 180 280 380 360 T 550 340 L 550 500 L -30 500 Z" fill="url(#hillGreen)" />

        {/* Rustic Dutch Windmill */}
        <g id="windmill" transform="translate(60, 160)">
          {/* Base */}
          <polygon points="40,20 15,140 65,140" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
          <polygon points="40,20 20,40 60,40" fill="#b45309" />
          <rect x="33" y="105" width="14" height="22" rx="3" fill="#78350f" />
          <circle cx="40" cy="40" r="6" fill="#451a03" />

          {/* Rotating Sails */}
          <g className="animate-spin origin-[40px_40px]" style={{ animationDuration: '14s' }}>
            <line x1="40" y1="40" x2="40" y2="-20" stroke="#78350f" strokeWidth="3" />
            <line x1="40" y1="40" x2="40" y2="100" stroke="#78350f" strokeWidth="3" />
            <line x1="40" y1="40" x2="-20" y2="40" stroke="#78350f" strokeWidth="3" />
            <line x1="40" y1="40" x2="100" y2="40" stroke="#78350f" strokeWidth="3" />
            {/* Sail cloth */}
            <polygon points="40,-20 40,25 55,5" fill="#f8fafc" stroke="#94a3b8" />
            <polygon points="40,100 40,55 25,75" fill="#f8fafc" stroke="#94a3b8" />
            <polygon points="-20,40 25,40 5,25" fill="#f8fafc" stroke="#94a3b8" />
            <polygon points="100,40 55,40 75,55" fill="#f8fafc" stroke="#94a3b8" />
          </g>
        </g>

        {/* Cozy Cottage House */}
        <g id="cottage" transform="translate(230, 200)">
          {/* Chimney with smoke */}
          <rect x="80" y="-18" width="14" height="28" fill="#991b1b" stroke="#450a0a" strokeWidth="1.5" />
          <circle cx="87" cy="-26" r="6" fill="#cbd5e1" opacity="0.6" className="animate-bounce" />
          <circle cx="92" cy="-36" r="8" fill="#e2e8f0" opacity="0.4" />

          {/* House body */}
          <rect x="15" y="25" width="95" height="75" rx="3" fill="#ffedd5" stroke="#7c2d12" strokeWidth="2.5" />
          {/* Triangular Roof */}
          <polygon points="62.5,-12 5,30 120,30" fill="url(#roofGrad)" stroke="#7f1d1d" strokeWidth="2.5" />
          {/* Door */}
          <rect x="50" y="60" width="25" height="40" rx="3" fill="#9a3412" stroke="#431407" strokeWidth="2" />
          <circle cx="70" cy="80" r="2" fill="#fef08a" />
          {/* Windows with panes */}
          <rect x="23" y="42" width="20" height="20" rx="2" fill="#bae6fd" stroke="#475569" strokeWidth="1.5" />
          <line x1="33" y1="42" x2="33" y2="62" stroke="#475569" strokeWidth="1.5" />
          <line x1="23" y1="52" x2="43" y2="52" stroke="#475569" strokeWidth="1.5" />
          <rect x="82" y="42" width="20" height="20" rx="2" fill="#bae6fd" stroke="#475569" strokeWidth="1.5" />
        </g>

        {/* Town Bakery Shop */}
        <g id="bakery" transform="translate(130, 290)">
          <rect x="0" y="20" width="105" height="65" fill="#fef9c3" stroke="#854d0e" strokeWidth="2" rx="4" />
          {/* Striped Awning */}
          <path d="M -5 20 Q 50 10 110 20 L 105 38 Q 50 30 -10 38 Z" fill="#ef4444" />
          <polygon points="5,20 18,20 12,37 -1,37" fill="#ffffff" />
          <polygon points="30,20 45,20 38,36 24,36" fill="#ffffff" />
          <polygon points="60,20 75,20 68,36 53,36" fill="#ffffff" />
          <polygon points="90,20 103,20 96,36 83,36" fill="#ffffff" />
          {/* Signboard */}
          <rect x="28" y="4" width="50" height="15" rx="3" fill="#78350f" />
          <text x="53" y="15" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
            BAKERY
          </text>
          {/* Bread window */}
          <rect x="10" y="45" width="40" height="32" rx="2" fill="#bfdbfe" stroke="#475569" strokeWidth="1.5" />
          <circle cx="22" cy="62" r="6" fill="#d97706" />
          <circle cx="36" cy="60" r="7" fill="#b45309" />
          <rect x="62" y="48" width="25" height="37" fill="#92400e" rx="2" />
        </g>

        {/* Big Leafy Oak Tree */}
        <g id="oak-tree" transform="translate(370, 230)">
          {/* Trunk */}
          <path d="M 45 60 Q 40 100 25 150 L 65 150 Q 50 100 45 60 Z" fill="#78350f" />
          {/* Foliage */}
          <circle cx="25" cy="45" r="32" fill="#15803d" />
          <circle cx="65" cy="45" r="32" fill="#16a34a" />
          <circle cx="45" cy="20" r="35" fill="#22c55e" />
          {/* Apples */}
          <circle cx="30" cy="30" r="4.5" fill="#ef4444" />
          <circle cx="55" cy="40" r="4.5" fill="#ef4444" />
          <circle cx="42" cy="12" r="4.5" fill="#ef4444" />
        </g>

        {/* Cobblestone Town Road */}
        <path d="M 0 420 Q 250 390 500 430 L 500 500 L 0 500 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="3" />
        {/* Cobblestone details */}
        <g fill="#cbd5e1" opacity="0.6">
          <ellipse cx="60" cy="445" rx="10" ry="5" />
          <ellipse cx="120" cy="455" rx="12" ry="6" />
          <ellipse cx="210" cy="440" rx="14" ry="7" />
          <ellipse cx="320" cy="460" rx="11" ry="5" />
          <ellipse cx="440" cy="445" rx="13" ry="6" />
        </g>

        {/* Yellow Town School Bus */}
        <g id="school-bus" transform="translate(290, 395)">
          {/* Bus Body */}
          <rect x="0" y="0" width="95" height="38" rx="6" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
          {/* Black stripe */}
          <rect x="0" y="24" width="95" height="5" fill="#1e293b" />
          {/* Bus Windows */}
          <rect x="6" y="6" width="16" height="14" rx="2" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
          <rect x="26" y="6" width="16" height="14" rx="2" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
          <rect x="46" y="6" width="16" height="14" rx="2" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
          <rect x="66" y="6" width="22" height="14" rx="2" fill="#e0f2fe" stroke="#334155" strokeWidth="1.5" />
          {/* Wheels */}
          <circle cx="22" cy="38" r="9" fill="#1e293b" />
          <circle cx="22" cy="38" r="4" fill="#94a3b8" />
          <circle cx="75" cy="38" r="9" fill="#1e293b" />
          <circle cx="75" cy="38" r="4" fill="#94a3b8" />
          {/* Bus Lights */}
          <circle cx="92" cy="20" r="3" fill="#ef4444" />
          <circle cx="3" cy="20" r="3" fill="#fef08a" />
        </g>

        {/* Fluffy White Sheep in Town Meadow */}
        <g id="sheep" transform="translate(60, 420)">
          {/* Legs */}
          <rect x="12" y="22" width="3" height="10" fill="#334155" rx="1.5" />
          <rect x="24" y="22" width="3" height="10" fill="#334155" rx="1.5" />
          {/* Body wool */}
          <circle cx="12" cy="14" r="9" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="22" cy="12" r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="28" cy="16" r="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Sheep Face */}
          <ellipse cx="6" cy="14" rx="6" ry="5" fill="#475569" />
          <ellipse cx="6" cy="10" rx="2.5" ry="4" fill="#475569" transform="rotate(-20 6 10)" />
          <circle cx="4" cy="13" r="1" fill="#ffffff" />
        </g>

        {/* Picket Fence & Wildflowers */}
        <g transform="translate(15, 380)">
          <line x1="0" y1="15" x2="80" y2="15" stroke="#ffffff" strokeWidth="3" />
          <line x1="0" y1="28" x2="80" y2="28" stroke="#ffffff" strokeWidth="3" />
          {[5, 20, 35, 50, 65, 80].map((x) => (
            <polygon key={x} points={`${x},5 ${x + 6},5 ${x + 3},0`} fill="#ffffff" />
          ))}
          {[5, 20, 35, 50, 65, 80].map((x) => (
            <rect key={x} x={x} y={5} width="6" height="35" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.5" />
          ))}
          {/* Flowers */}
          <circle cx="10" cy="42" r="4" fill="#f43f5e" />
          <circle cx="10" cy="42" r="1.5" fill="#facc15" />
          <circle cx="45" cy="40" r="4.5" fill="#38bdf8" />
          <circle cx="45" cy="40" r="1.8" fill="#ffffff" />
          <circle cx="75" cy="43" r="4" fill="#fbbf24" />
          <circle cx="75" cy="43" r="1.5" fill="#b45309" />
        </g>
      </svg>

      {/* CLOWN HIDING SPOT (If Clown is in Town) */}
      {isClownHere && currentSpot && (
        <div
          className="absolute z-20 transition-all duration-500 ease-out"
          style={{
            left: `${currentSpot.xPercent}%`,
            top: `${currentSpot.yPercent}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ClownFigure
            onClick={onClownClick}
            scale={currentSpot.scale || 1}
            isFound={isFound}
          />
        </div>
      )}

      {/* Subtle Bottom Help Bar */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold text-emerald-900 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-emerald-300">
        <span className="flex items-center gap-1.5">
          <span>🌾</span>
          <span>Look closely around cottages, trees and the windmill!</span>
        </span>
        <span className="text-emerald-700 font-bold hidden sm:inline">
          {isClownHere ? '👀 Small hint: Someone is peeking here!' : 'Quiet & peaceful'}
        </span>
      </div>
    </div>
  );
};
