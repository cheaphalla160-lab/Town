import React, { useState } from 'react';
import { Trophy, Medal, Star, Plus, Trash2, UserCheck, X } from 'lucide-react';
import { PlayerScore } from '../types';
import { soundCtrl } from '../utils/audio';

interface LeaderboardProps {
  scores: PlayerScore[];
  currentPlayer: { name: string; avatar: string };
  onSelectPlayer: (player: { name: string; avatar: string }) => void;
  onClearScores: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AVATAR_OPTIONS = [
  { emoji: '🐰', label: 'Bunny 兔兔' },
  { emoji: '🦁', label: 'Leo 小狮子' },
  { emoji: '🐼', label: 'Panda 胖达' },
  { emoji: '🐻', label: 'Teddy 小熊' },
  { emoji: '🐱', label: 'Kitty 咪咪' },
  { emoji: '🦊', label: 'Fox 小狐狸' },
  { emoji: '🐶', label: 'Puppy 汪汪' },
  { emoji: '🐵', label: 'Monkey 淘淘' },
  { emoji: '🦄', label: 'Unicorn 独角兽' },
  { emoji: '🚀', label: 'Rocket 小宇航员' },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({
  scores,
  currentPlayer,
  onSelectPlayer,
  onClearScores,
  isOpen,
  onClose,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0].emoji);

  if (!isOpen) return null;

  const handleCreatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    soundCtrl.playSuccessDing();
    onSelectPlayer({
      name: newName.trim(),
      avatar: selectedAvatar,
    });
    setNewName('');
    setIsAddingNew(false);
  };

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-5 text-amber-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/80 p-2.5 rounded-2xl shadow">
              <Trophy className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold font-fredoka flex items-center gap-2">
                <span>Star Leaderboard</span>
                <span>小红花光荣榜</span>
              </h2>
              <p className="text-xs text-amber-900/80 font-medium">
                Celebrating great readers & quick clown finders!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundCtrl.playClick();
              onClose();
            }}
            className="bg-white/70 hover:bg-white text-slate-700 p-2 rounded-full transition-all cursor-pointer shadow"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Player Bar */}
        <div className="bg-amber-50 px-5 py-3 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{currentPlayer.avatar}</span>
            <div>
              <div className="text-xs font-bold text-amber-800">Current Player 当前答题同学:</div>
              <div className="text-sm font-extrabold text-slate-800">{currentPlayer.name}</div>
            </div>
          </div>

          <button
            onClick={() => {
              soundCtrl.playClick();
              setIsAddingNew(!isAddingNew);
            }}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Switch / New 换同学</span>
          </button>
        </div>

        {/* Add / Switch Student Form Modal */}
        {isAddingNew && (
          <form
            onSubmit={handleCreatePlayer}
            className="bg-yellow-50 p-4 border-b border-yellow-200 animate-fadeIn"
          >
            <h4 className="text-xs font-bold text-slate-700 mb-2">
              Select Avatar & Enter Student Name 选择萌宠头像与姓名:
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  type="button"
                  key={av.emoji}
                  onClick={() => {
                    soundCtrl.playClick();
                    setSelectedAvatar(av.emoji);
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                    selectedAvatar === av.emoji
                      ? 'bg-amber-400 border-2 border-amber-600 scale-110 shadow'
                      : 'bg-white hover:bg-amber-100 border border-slate-200'
                  }`}
                  title={av.label}
                >
                  {av.emoji}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Student Name (e.g. Lucas, Amy, Group 1)..."
                maxLength={20}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow cursor-pointer transition-all"
              >
                Set Player 选定
              </button>
            </div>
          </form>
        )}

        {/* Ranking List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
          {sortedScores.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-medium">
              <Star className="w-10 h-10 mx-auto text-amber-300 mb-2 animate-bounce" />
              <p>No scores yet! Play a round to get on the board!</p>
            </div>
          ) : (
            sortedScores.map((item, index) => {
              const isFirst = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    isFirst
                      ? 'bg-amber-100/70 border-amber-300 shadow-sm'
                      : isSecond
                      ? 'bg-slate-100 border-slate-300'
                      : isThird
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className="w-8 h-8 flex items-center justify-center font-extrabold text-sm rounded-xl">
                      {isFirst ? (
                        <Medal className="w-6 h-6 text-amber-500 fill-amber-400" />
                      ) : isSecond ? (
                        <Medal className="w-6 h-6 text-slate-400 fill-slate-300" />
                      ) : isThird ? (
                        <Medal className="w-6 h-6 text-amber-700 fill-amber-600" />
                      ) : (
                        <span className="text-slate-500 font-fredoka">#{index + 1}</span>
                      )}
                    </div>

                    {/* Avatar & Name */}
                    <span className="text-2xl">{item.avatar}</span>
                    <div>
                      <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.name === currentPlayer.name && (
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>{item.roundsPlayed} rounds</span>
                        <span>•</span>
                        <span>{item.accuracy}% accuracy</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stars & Points */}
                  <div className="text-right">
                    <div className="font-extrabold text-lg text-amber-600 font-fredoka">
                      {item.score} <span className="text-xs font-normal text-slate-500">pts</span>
                    </div>
                    <div className="text-xs text-amber-500 font-bold flex items-center justify-end gap-0.5">
                      <span>⭐</span>
                      <span>{item.stars}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Reset */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Tip: Tap "Switch" when a new student steps up!</span>
          <button
            onClick={() => {
              if (confirm('Clear all leaderboard records? 清空排行榜吗？')) {
                onClearScores();
              }
            }}
            className="flex items-center gap-1 text-rose-500 hover:text-rose-700 transition-colors font-medium cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Board</span>
          </button>
        </div>
      </div>
    </div>
  );
};
