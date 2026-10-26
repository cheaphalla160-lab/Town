import React from 'react';
import { Volume2, Sparkles, X, BookOpen, Layers } from 'lucide-react';
import { soundCtrl, speakEnglish } from '../utils/audio';

interface PhonicsExplorerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhonicsExplorer: React.FC<PhonicsExplorerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const playWord = (word: string, tip?: string) => {
    soundCtrl.playClick();
    speakEnglish(word, { rate: 0.85, pitch: 1.15 });
  };

  const playBlend = (prefix: string, rime: string, full: string) => {
    soundCtrl.playClick();
    speakEnglish(`${prefix}... ${rime}... ${full}!`, { rate: 0.8, pitch: 1.15 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm">
              <BookOpen className="w-7 h-7 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold font-fredoka flex items-center gap-2">
                <span>Word & Phonics Corner</span>
                <span>核心词汇与自然拼读</span>
              </h2>
              <p className="text-xs text-white/90">
                Master the magic connection between <span className="font-bold underline">clown</span>,{' '}
                <span className="font-bold underline">town</span>, and{' '}
                <span className="font-bold underline">city</span>!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundCtrl.playClick();
              onClose();
            }}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {/* Section 1: The Rhyme Twins clown & town */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 font-extrabold text-base md:text-lg mb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Phonics Rhyme Family: "-own" [aʊn] 韵律家族</span>
            </div>
            <p className="text-xs md:text-sm text-slate-600 mb-4">
              Look! Both <strong>clown</strong> and <strong>town</strong> end with the same{' '}
              <span className="bg-amber-200 text-amber-950 font-bold px-1.5 py-0.5 rounded">
                -own [aʊn]
              </span>{' '}
              sound! They rhyme!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Word Card: Clown */}
              <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 shadow-md flex flex-col items-center text-center">
                <span className="text-4xl mb-1">🤡</span>
                <div className="text-2xl font-extrabold text-amber-900 font-fredoka flex items-center gap-1">
                  <span className="text-rose-500">cl</span>
                  <span className="text-amber-600 underline">own</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 mb-2">/klaʊn/ • 小丑</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => playWord('clown')}
                    className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Pronounce</span>
                  </button>
                  <button
                    onClick={() => playBlend('cl', 'own', 'clown')}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    Blend: cl + own
                  </button>
                </div>
              </div>

              {/* Word Card: Town */}
              <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200 shadow-md flex flex-col items-center text-center">
                <span className="text-4xl mb-1">🏡</span>
                <div className="text-2xl font-extrabold text-emerald-900 font-fredoka flex items-center gap-1">
                  <span className="text-emerald-500">t</span>
                  <span className="text-amber-600 underline">own</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 mb-2">/taʊn/ • 小镇</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => playWord('town')}
                    className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Pronounce</span>
                  </button>
                  <button
                    onClick={() => playBlend('t', 'own', 'town')}
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    Blend: t + own
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: City vs Town Meaning Comparison */}
          <div className="bg-gradient-to-br from-indigo-50 to-sky-50 border-2 border-indigo-300 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-base md:text-lg mb-3">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>City vs Town: What's the Difference? 城市与小镇有何不同？</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Town Card */}
              <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-lg text-emerald-800 font-fredoka flex items-center gap-1.5">
                    <span>🏡</span>
                    <span>Town (小镇)</span>
                  </span>
                  <button
                    onClick={() => playWord('town')}
                    className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <span>🌱</span>
                    <span>Small and cozy (小巧温馨)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>🏠</span>
                    <span>Cottages & houses with gardens</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>🌳</span>
                    <span>Lots of trees, farms & open space</span>
                  </li>
                </ul>
              </div>

              {/* City Card */}
              <div className="bg-white rounded-2xl p-4 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-lg text-indigo-900 font-fredoka flex items-center gap-1.5">
                    <span>🏙️</span>
                    <span>City (大城市)</span>
                  </span>
                  <button
                    onClick={() => playWord('city')}
                    className="p-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-lg cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <span>🏬</span>
                    <span>Big and busy (宏大繁华)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>🏢</span>
                    <span>Skyscrapers & shopping malls</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>🚇</span>
                    <span>Subway, taxis & heavy traffic</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2 rounded-xl text-sm shadow cursor-pointer transition-all"
          >
            Ready to Play! 返回游戏
          </button>
        </div>
      </div>
    </div>
  );
};
