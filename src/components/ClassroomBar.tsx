import React from 'react';
import {
  Music,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Trophy,
  BookOpen,
  Gauge,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { GameSettings } from '../types';
import { soundCtrl } from '../utils/audio';

interface ClassroomBarProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  score: number;
  streak: number;
  stars: number;
  round: number;
  currentPlayer: { name: string; avatar: string };
  onOpenLeaderboard: () => void;
  onOpenPhonics: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const ClassroomBar: React.FC<ClassroomBarProps> = ({
  settings,
  onUpdateSettings,
  isPlaying,
  onTogglePlay,
  onRestart,
  score,
  streak,
  stars,
  round,
  currentPlayer,
  onOpenLeaderboard,
  onOpenPhonics,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const handleToggleBgm = () => {
    const isNowOn = soundCtrl.toggleBgm();
    onUpdateSettings({ bgmEnabled: isNowOn });
  };

  const handleSpeedPreset = (preset: GameSettings['speedPreset'], seconds: number) => {
    soundCtrl.playClick();
    onUpdateSettings({ speedPreset: preset, speedSeconds: seconds });
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-md px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo & Player */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-fredoka font-extrabold text-base md:text-lg px-3 py-1.5 rounded-2xl shadow-sm">
            <span className="text-2xl animate-bounce">🤡</span>
            <span className="tracking-wide">Where is the Clown?</span>
          </div>

          {/* Current Student Badge */}
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
            title="Click to view leaderboard or switch student"
          >
            <span className="text-base">{currentPlayer.avatar}</span>
            <span className="max-w-[80px] truncate">{currentPlayer.name}</span>
            <span className="text-[10px] text-amber-600 bg-amber-200/80 px-1 py-0.2 rounded font-semibold">
              Round {round}
            </span>
          </button>
        </div>

        {/* Live Classroom Stats: Stars, Score, Streak */}
        <div className="flex items-center gap-2 md:gap-3 bg-amber-50/80 border border-amber-200/80 px-3 py-1 rounded-2xl">
          <div className="flex items-center gap-1 text-amber-600 font-extrabold text-sm md:text-base font-fredoka">
            <span className="text-lg">⭐</span>
            <span>{stars}</span>
            <span className="text-[10px] text-amber-700/70 font-sans hidden sm:inline">stars</span>
          </div>
          <span className="text-amber-300">|</span>
          <div className="flex items-center gap-1 text-slate-800 font-extrabold text-sm md:text-base font-fredoka">
            <span className="text-amber-500">🏆</span>
            <span>{score}</span>
            <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">pts</span>
          </div>
          {streak > 1 && (
            <>
              <span className="text-amber-300">|</span>
              <div className="flex items-center gap-1 text-rose-600 font-extrabold text-xs md:text-sm font-fredoka animate-pulse">
                <span>🔥</span>
                <span>{streak}x Combo</span>
              </div>
            </>
          )}
        </div>

        {/* Speed Adjustment Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-600 px-1 flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Speed:</span>
          </span>

          <button
            onClick={() => handleSpeedPreset('gentle', 4.5)}
            className={`px-2 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              settings.speedPreset === 'gentle'
                ? 'bg-emerald-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
            title="Gentle (4.5s) - Best for beginners"
          >
            🐌 Slow
          </button>

          <button
            onClick={() => handleSpeedPreset('normal', 3.0)}
            className={`px-2 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              settings.speedPreset === 'normal'
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
            title="Normal (3.0s) - Standard exploration"
          >
            🐢 Normal
          </button>

          <button
            onClick={() => handleSpeedPreset('fast', 2.0)}
            className={`px-2 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              settings.speedPreset === 'fast'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
            title="Fast (2.0s) - Quick challenge"
          >
            🐇 Fast
          </button>

          <button
            onClick={() => handleSpeedPreset('turbo', 1.2)}
            className={`px-2 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              settings.speedPreset === 'turbo'
                ? 'bg-rose-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
            title="Turbo (1.2s) - Master flash challenge"
          >
            ⚡ Turbo
          </button>
        </div>

        {/* Quick Utilities: Audio, Phonics, Leaderboard, Fullscreen */}
        <div className="flex items-center gap-1.5">
          {/* Pause / Resume */}
          <button
            onClick={() => {
              soundCtrl.playClick();
              onTogglePlay();
            }}
            className={`p-2 rounded-xl border transition cursor-pointer shadow-xs ${
              isPlaying
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-emerald-500 text-white border-emerald-600 animate-pulse'
            }`}
            title={isPlaying ? 'Pause game' : 'Resume game'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* BGM Toggle */}
          <button
            onClick={handleToggleBgm}
            className={`p-2 rounded-xl border transition cursor-pointer shadow-xs flex items-center gap-1 ${
              settings.bgmEnabled
                ? 'bg-amber-400 hover:bg-amber-500 border-amber-500 text-amber-950 font-bold'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-400'
            }`}
            title="Toggle joyful background music"
          >
            <Music className={`w-4 h-4 ${settings.bgmEnabled ? 'animate-bounce' : ''}`} />
            <span className="text-xs font-bold hidden xl:inline">BGM</span>
          </button>

          {/* Phonics Explorer Button */}
          <button
            onClick={() => {
              soundCtrl.playClick();
              onOpenPhonics();
            }}
            className="flex items-center gap-1 bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-800 px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
            title="View Phonics breakdown for clown, town, and city"
          >
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span className="hidden sm:inline">Phonics 词汇卡</span>
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={() => {
              soundCtrl.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm"
            title="View classroom leaderboard"
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Leaderboard 榜单</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              soundCtrl.playClick();
              onToggleFullscreen();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 transition cursor-pointer shadow-xs"
            title={isFullscreen ? 'Exit fullscreen' : 'Smartboard Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
