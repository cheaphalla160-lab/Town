import React from 'react';
import { HidingSpot } from '../types';
import { ClownFigure } from './ClownFigure';

interface CitySceneProps {
  currentSpot: HidingSpot | null;
  onClownClick: () => void;
  isFound: boolean;
  onSceneClick: () => void;
}

export const CityScene: React.FC<CitySceneProps> = ({
  currentSpot,
  onClownClick,
  isFound,
  onSceneClick,
}) => {
  const isClownHere = currentSpot && currentSpot.location === 'city';

  return (
    <div
      onClick={onSceneClick}
      className="relative w-full h-full min-h-[460px] md:min-h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-300 bg-gradient-to-b from-indigo-200 via-sky-100 to-slate-200 cursor-pointer select-none transition-all duration-300 group"
      role="region"
      aria-label="City Scene"
    >
      {/* Title Badge: Clear pedagogical label */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border-2 border-indigo-400">
        <span className="text-2xl">🏙️</span>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-2xl tracking-wide text-indigo-900 uppercase font-fredoka">
              City
            </span>
            <span className="text-sm font-semibold text-indigo-600">城市</span>
          </div>
          <p className="text-[11px] text-indigo-700/80 font-medium">Tall skyscrapers, metro, taxi & buses</p>
        </div>
      </div>

      {/* SVG City Scenery Layer */}
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="citySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c7d2fe" />
            <stop offset="60%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <linearGradient id="glassTower1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="towerPurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="towerOrange" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
          <linearGradient id="doubleDecker" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Sky Background */}
        <rect width="500" height="500" fill="url(#citySky)" />

        {/* Modern Airplane in sky */}
        <g transform="translate(340, 45) scale(0.65)" className="animate-float">
          <ellipse cx="60" cy="20" rx="35" ry="8" fill="#ffffff" stroke="#94a3b8" />
          <polygon points="50,16 65,3 75,16" fill="#38bdf8" />
          <polygon points="50,24 65,37 75,24" fill="#38bdf8" />
          <polygon points="25,18 20,8 32,18" fill="#f43f5e" />
        </g>

        {/* Distant Silhouette Skyscrapers */}
        <g fill="#cbd5e1" opacity="0.6">
          <rect x="20" y="160" width="40" height="200" />
          <rect x="70" y="130" width="55" height="230" />
          <polygon points="97,90 85,130 110,130" />
          <rect x="140" y="180" width="45" height="180" />
          <rect x="330" y="140" width="60" height="220" />
          <rect x="410" y="170" width="50" height="190" />
        </g>

        {/* High Skyscraper 1 (Blue Glass Tower with Spire) */}
        <g id="skyscraper-blue" transform="translate(80, 100)">
          {/* Spire Antenna */}
          <line x1="45" y1="0" x2="45" y2="40" stroke="#64748b" strokeWidth="3" />
          <circle cx="45" cy="0" r="4" fill="#ef4444" className="animate-ping" />
          {/* Tower Body */}
          <rect x="5" y="40" width="80" height="260" rx="4" fill="url(#glassTower1)" stroke="#1e3a8a" strokeWidth="2.5" />
          {/* Grid Windows */}
          {[60, 85, 110, 135, 160, 185, 210, 235].map((y) => (
            <g key={y}>
              <rect x="15" y={y} width="14" height="16" rx="2" fill="#fef08a" opacity="0.85" />
              <rect x="38" y={y} width="14" height="16" rx="2" fill="#bae6fd" opacity="0.9" />
              <rect x="61" y={y} width="14" height="16" rx="2" fill="#fef08a" opacity="0.85" />
            </g>
          ))}
        </g>

        {/* City Clock Tower */}
        <g id="clock-tower" transform="translate(360, 110)">
          <polygon points="35,0 20,40 50,40" fill="#475569" />
          <rect x="10" y="40" width="50" height="250" fill="#64748b" stroke="#334155" strokeWidth="2.5" />
          {/* Clock Face */}
          <circle cx="35" cy="65" r="18" fill="#ffffff" stroke="#334155" strokeWidth="2" />
          <line x1="35" y1="65" x2="35" y2="54" stroke="#1e293b" strokeWidth="2" />
          <line x1="35" y1="65" x2="43" y2="65" stroke="#1e293b" strokeWidth="2" />
          <circle cx="35" cy="65" r="2.5" fill="#ef4444" />
          {/* Windows */}
          {[105, 140, 175, 210].map((y) => (
            <rect key={y} x="25" y={y} width="20" height="22" rx="3" fill="#fef9c3" stroke="#334155" strokeWidth="1" />
          ))}
        </g>

        {/* City Mall Billboard Building */}
        <g id="mall-building" transform="translate(190, 160)">
          <rect x="0" y="20" width="140" height="200" rx="3" fill="url(#towerPurple)" stroke="#3b0764" strokeWidth="2.5" />
          {/* Glowing Billboard */}
          <rect x="15" y="32" width="110" height="36" rx="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
          <text x="70" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            CITY MALL
          </text>
          <text x="70" y="64" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">
            ★★ OPEN 24H ★★
          </text>
          {/* Mall windows */}
          {[82, 115, 148].map((y) => (
            <g key={y}>
              <rect x="15" y={y} width="26" height="20" rx="2" fill="#bae6fd" />
              <rect x="57" y={y} width="26" height="20" rx="2" fill="#bae6fd" />
              <rect x="99" y={y} width="26" height="20" rx="2" fill="#fef08a" />
            </g>
          ))}
        </g>

        {/* Central Plaza Fountain */}
        <g id="city-fountain" transform="translate(210, 310)">
          {/* Base Pool */}
          <ellipse cx="60" cy="40" rx="50" ry="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
          <ellipse cx="60" cy="38" rx="42" ry="12" fill="#0284c7" />
          {/* Pedestal */}
          <rect x="52" y="15" width="16" height="25" fill="#94a3b8" rx="2" />
          <ellipse cx="60" cy="15" rx="22" ry="6" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          {/* Water Spurt */}
          <path d="M 60 15 Q 50 -15 35 15" stroke="#bae6fd" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
          <path d="M 60 15 Q 70 -15 85 15" stroke="#bae6fd" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
          <path d="M 60 15 Q 60 -25 60 5" stroke="#ffffff" strokeWidth="3" fill="none" />
          {/* Water drops */}
          <circle cx="38" cy="10" r="2.5" fill="#e0f2fe" />
          <circle cx="82" cy="10" r="2.5" fill="#e0f2fe" />
        </g>

        {/* Asphalt City Road */}
        <rect x="0" y="390" width="500" height="110" fill="#334155" />
        {/* Yellow Double Center Lines */}
        <line x1="0" y1="445" x2="500" y2="445" stroke="#facc15" strokeWidth="3" strokeDasharray="15 10" />
        <line x1="0" y1="450" x2="500" y2="450" stroke="#facc15" strokeWidth="3" strokeDasharray="15 10" />

        {/* Zebra Pedestrian Crosswalk */}
        <g fill="#ffffff">
          {[160, 185, 210, 235, 260, 285].map((x) => (
            <rect key={x} x={x} y="400" width="14" height="40" rx="2" />
          ))}
        </g>

        {/* Metro Subway Station Entrance */}
        <g id="metro-entrance" transform="translate(140, 335)">
          <rect x="0" y="0" width="75" height="35" rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          {/* Roundel Metro Sign */}
          <circle cx="37" cy="-8" r="12" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <rect x="20" y="-12" width="34" height="8" rx="2" fill="#1d4ed8" />
          <text x="37" y="-6" fill="#ffffff" fontSize="7" fontWeight="extrabold" textAnchor="middle">
            METRO
          </text>
          {/* Stairs going down */}
          <line x1="10" y1="12" x2="65" y2="12" stroke="#64748b" strokeWidth="2" />
          <line x1="15" y1="18" x2="60" y2="18" stroke="#475569" strokeWidth="2" />
          <line x1="20" y1="24" x2="55" y2="24" stroke="#334155" strokeWidth="2" />
        </g>

        {/* Red Double-Decker City Bus */}
        <g id="double-decker-bus" transform="translate(320, 375)">
          <rect x="0" y="0" width="125" height="60" rx="8" fill="url(#doubleDecker)" stroke="#7f1d1d" strokeWidth="2.5" />
          {/* Top Floor Windows */}
          <rect x="8" y="7" width="22" height="15" rx="3" fill="#e0f2fe" stroke="#450a0a" strokeWidth="1.5" />
          <rect x="36" y="7" width="22" height="15" rx="3" fill="#e0f2fe" stroke="#450a0a" strokeWidth="1.5" />
          <rect x="64" y="7" width="22" height="15" rx="3" fill="#e0f2fe" stroke="#450a0a" strokeWidth="1.5" />
          <rect x="92" y="7" width="26" height="15" rx="3" fill="#e0f2fe" stroke="#450a0a" strokeWidth="1.5" />
          {/* Bottom Floor Windows & Door */}
          <rect x="8" y="27" width="22" height="16" rx="3" fill="#e0f2fe" stroke="#450a0a" strokeWidth="1.5" />
          <rect x="36" y="27" width="22" height="16" rx="3" fill="#e0f2fe" stroke="#450a0a" strokeWidth="1.5" />
          <rect x="64" y="27" width="22" height="16" rx="3" fill="#e0f2fe" stroke="#450a0a" strokeWidth="1.5" />
          <rect x="94" y="26" width="24" height="28" rx="2" fill="#78716c" stroke="#450a0a" strokeWidth="1.5" />
          {/* Wheels */}
          <circle cx="28" cy="60" r="11" fill="#0f172a" />
          <circle cx="28" cy="60" r="5" fill="#94a3b8" />
          <circle cx="98" cy="60" r="11" fill="#0f172a" />
          <circle cx="98" cy="60" r="5" fill="#94a3b8" />
          {/* Route Number Badge */}
          <rect x="98" y="2" width="20" height="6" rx="1.5" fill="#fbbf24" />
          <text x="108" y="6.5" fill="#000000" fontSize="5" fontWeight="bold" textAnchor="middle">
            NO. 88
          </text>
        </g>

        {/* Yellow City Taxi */}
        <g id="yellow-taxi" transform="translate(30, 415)">
          <rect x="0" y="8" width="75" height="24" rx="4" fill="#eab308" stroke="#a16207" strokeWidth="2" />
          <path d="M 15 8 L 24 -4 L 54 -4 L 62 8 Z" fill="#eab308" stroke="#a16207" strokeWidth="2" />
          {/* Taxi Roof Sign */}
          <rect x="32" y="-10" width="16" height="6" rx="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
          <text x="40" y="-5.5" fill="#000000" fontSize="4.5" fontWeight="bold" textAnchor="middle">
            TAXI
          </text>
          {/* Windows */}
          <polygon points="26,-1 20,7 34,7 34,-1" fill="#e0f2fe" />
          <polygon points="38,-1 38,7 52,7 48,-1" fill="#e0f2fe" />
          {/* Wheels */}
          <circle cx="18" cy="32" r="8" fill="#1e293b" />
          <circle cx="18" cy="32" r="3.5" fill="#94a3b8" />
          <circle cx="58" cy="32" r="8" fill="#1e293b" />
          <circle cx="58" cy="32" r="3.5" fill="#94a3b8" />
        </g>
      </svg>

      {/* CLOWN HIDING SPOT (If Clown is in City) */}
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
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold text-indigo-950 bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-indigo-300">
        <span className="flex items-center gap-1.5">
          <span>🚦</span>
          <span>Look closely near skyscrapers, the metro station, and buses!</span>
        </span>
        <span className="text-indigo-800 font-bold hidden sm:inline">
          {isClownHere ? '👀 Small hint: Someone is peeking here!' : 'Bustling & lively'}
        </span>
      </div>
    </div>
  );
};
