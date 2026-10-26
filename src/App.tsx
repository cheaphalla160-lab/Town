import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  HelpCircle,
  Trophy,
  Volume2,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Clock,
  Flame,
} from 'lucide-react';
import { HidingSpot, GameSettings, PlayerScore, LocationType } from './types';
import { ALL_HIDING_SPOTS, TOWN_HIDING_SPOTS, CITY_HIDING_SPOTS } from './data/hidingSpots';
import { soundCtrl, speakEnglish } from './utils/audio';
import { TownScene } from './components/TownScene';
import { CityScene } from './components/CityScene';
import { ReadingModal } from './components/ReadingModal';
import { Leaderboard, AVATAR_OPTIONS } from './components/Leaderboard';
import { PhonicsExplorer } from './components/PhonicsExplorer';
import { ClassroomBar } from './components/ClassroomBar';

const INITIAL_SCORES: PlayerScore[] = [
  {
    id: 'score-1',
    name: 'Emma 艾玛',
    avatar: '🐰',
    score: 850,
    roundsPlayed: 6,
    stars: 12,
    accuracy: 100,
    date: 'Today',
  },
  {
    id: 'score-2',
    name: 'Leo 狮狮',
    avatar: '🦁',
    score: 620,
    roundsPlayed: 5,
    stars: 9,
    accuracy: 95,
    date: 'Today',
  },
  {
    id: 'score-3',
    name: 'Panda Team 胖达组',
    avatar: '🐼',
    score: 480,
    roundsPlayed: 4,
    stars: 7,
    accuracy: 90,
    date: 'Today',
  },
];

export default function App() {
  // Game Settings
  const [settings, setSettings] = useState<GameSettings>({
    speedSeconds: 3.0,
    speedPreset: 'normal',
    autoAdvanceAfterRead: false,
    classroomMode: false,
    soundFxEnabled: true,
    bgmEnabled: false,
    voiceRate: 0.95,
  });

  // Active student/player
  const [currentPlayer, setCurrentPlayer] = useState<{ name: string; avatar: string }>({
    name: 'Star Student 阳光小学员',
    avatar: '🐰',
  });

  // Game state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSpot, setCurrentSpot] = useState<HidingSpot | null>(null);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  // Time remaining in current spot (for progress bar)
  const [timeRemainingPercent, setTimeRemainingPercent] = useState<number>(100);

  // Modal states
  const [isFound, setIsFound] = useState<boolean>(false);
  const [showReadingModal, setShowReadingModal] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showPhonics, setShowPhonics] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Hint / feedback notification message
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Stored leaderboard
  const [leaderboardScores, setLeaderboardScores] = useState<PlayerScore[]>(() => {
    try {
      const stored = localStorage.getItem('clown_game_leaderboard');
      return stored ? JSON.parse(stored) : INITIAL_SCORES;
    } catch {
      return INITIAL_SCORES;
    }
  });

  // Save leaderboard on change
  useEffect(() => {
    try {
      localStorage.setItem('clown_game_leaderboard', JSON.stringify(leaderboardScores));
    } catch {
      // ignore
    }
  }, [leaderboardScores]);

  // Spawn clown in a new random spot
  const spawnClown = useCallback(() => {
    setIsFound(false);
    setTimeRemainingPercent(100);

    // Pick a random spot different from the current one
    const available = ALL_HIDING_SPOTS.filter((s) => !currentSpot || s.id !== currentSpot.id);
    const nextSpot = available[Math.floor(Math.random() * available.length)];
    setCurrentSpot(nextSpot);
    soundCtrl.playPop();
  }, [currentSpot]);

  // Initial spawn
  useEffect(() => {
    spawnClown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown timer for clown staying in one spot
  useEffect(() => {
    if (!isPlaying || isFound || showReadingModal || !currentSpot) return;

    const totalMs = settings.speedSeconds * 1000;
    const intervalMs = 50;
    let elapsedMs = 0;

    const timer = setInterval(() => {
      elapsedMs += intervalMs;
      const remaining = Math.max(0, 100 - (elapsedMs / totalMs) * 100);
      setTimeRemainingPercent(remaining);

      if (elapsedMs >= totalMs) {
        clearInterval(timer);
        // Clown moved without being found
        soundCtrl.playWhoosh();
        setFeedbackMsg('Whoosh! The clown moved to another place! 小丑换了个新地方藏起来了！');
        setTimeout(() => setFeedbackMsg(null), 1800);
        setStreak(0);
        spawnClown();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, isFound, showReadingModal, currentSpot, settings.speedSeconds, spawnClown]);

  // When student successfully finds and clicks on the clown
  const handleClownFound = () => {
    if (isFound || showReadingModal) return;

    setIsFound(true);
    setTotalAttempts((prev) => prev + 1);
    setCorrectCount((prev) => prev + 1);

    // Calculate score
    const speedBonus = Math.round(timeRemainingPercent);
    const streakMultiplier = 1 + streak * 0.2;
    const pointsEarned = Math.round((100 + speedBonus) * streakMultiplier);

    setScore((prev) => prev + pointsEarned);
    setStreak((prev) => prev + 1);
    setStars((prev) => prev + 1);

    // Show Reading Modal after a brief celebration moment
    setTimeout(() => {
      setShowReadingModal(true);
    }, 450);
  };

  // When student clicks on wrong empty area of scene
  const handleEmptySceneClick = (clickedLocation: LocationType) => {
    if (isFound || showReadingModal || !currentSpot) return;

    soundCtrl.playClick();
    if (currentSpot.location === clickedLocation) {
      setFeedbackMsg(`👀 You are in the right place (${clickedLocation.toUpperCase()})! Look closer!`);
    } else {
      setFeedbackMsg(
        `🔎 Not here! The clown is hiding in the other side (${currentSpot.location === 'town' ? 'TOWN 🏡' : 'CITY 🏙️'})!`
      );
    }
    setTimeout(() => setFeedbackMsg(null), 2000);
  };

  // Advance to next round from reading modal
  const handleNextRound = () => {
    setShowReadingModal(false);
    setRoundNumber((prev) => prev + 1);
    spawnClown();

    // Update active player's score on leaderboard
    updatePlayerScore(score + 100, stars + 1, roundNumber + 1);
  };

  // Bonus score from reading aloud
  const handleBonusScore = (bonus: number) => {
    setScore((prev) => prev + bonus);
    setStars((prev) => prev + 1);
    updatePlayerScore(score + bonus, stars + 1, roundNumber);
  };

  const updatePlayerScore = (latestScore: number, latestStars: number, rounds: number) => {
    setLeaderboardScores((prev) => {
      const existingIdx = prev.findIndex((p) => p.name === currentPlayer.name);
      const acc = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 100;
      const updatedEntry: PlayerScore = {
        id: existingIdx >= 0 ? prev[existingIdx].id : `score-${Date.now()}`,
        name: currentPlayer.name,
        avatar: currentPlayer.avatar,
        score: Math.max(latestScore, existingIdx >= 0 ? prev[existingIdx].score : latestScore),
        roundsPlayed: rounds,
        stars: latestStars,
        accuracy: acc,
        date: 'Today',
      };

      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = updatedEntry;
        return next;
      } else {
        return [updatedEntry, ...prev];
      }
    });
  };

  const handleRestartGame = () => {
    soundCtrl.playClick();
    setScore(0);
    setStreak(0);
    setStars(0);
    setRoundNumber(1);
    setTotalAttempts(0);
    setCorrectCount(0);
    spawnClown();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800 flex flex-col font-sans selection:bg-yellow-200">
      {/* Top Classroom Navigation Bar */}
      <ClassroomBar
        settings={settings}
        onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onRestart={handleRestartGame}
        score={score}
        streak={streak}
        stars={stars}
        round={roundNumber}
        currentPlayer={currentPlayer}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenPhonics={() => setShowPhonics(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Main Classroom Game Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-5 flex flex-col gap-3">
        {/* Guiding Question & Action Prompt Bar */}
        <div className="bg-white rounded-3xl p-3 md:p-4 shadow-lg border-2 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-inner border border-amber-200 animate-wiggle">
              🤡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-2xl font-extrabold text-slate-800 font-fredoka tracking-wide">
                  Where is the <span className="text-amber-600 underline decoration-wavy">clown</span>?
                </h1>
                <span className="text-xs md:text-sm font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Town or City?
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                小丑在 <strong>Town (小镇)</strong> 还是在 <strong>City (城市)</strong>？快快找到他并点一点！
              </p>
            </div>
          </div>

          {/* Timer & Quick Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Speed countdown bar */}
            <div className="flex flex-col items-end min-w-[140px] md:min-w-[170px]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Hiding Time 躲藏倒计时:</span>
                <span className="text-amber-600 font-fredoka">
                  {((settings.speedSeconds * timeRemainingPercent) / 100).toFixed(1)}s
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                <div
                  className={`h-full transition-all duration-75 rounded-full ${
                    timeRemainingPercent > 50
                      ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                      : timeRemainingPercent > 20
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                      : 'bg-gradient-to-r from-rose-500 to-red-600 animate-pulse'
                  }`}
                  style={{ width: `${timeRemainingPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Word Helper buttons */}
            <button
              onClick={() => {
                soundCtrl.playClick();
                speakEnglish('town', { rate: 0.85 });
              }}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              title="Hear: town"
            >
              <span>🏡</span>
              <span>town</span>
              <Volume2 className="w-3 h-3 text-emerald-700" />
            </button>

            <button
              onClick={() => {
                soundCtrl.playClick();
                speakEnglish('city', { rate: 0.85 });
              }}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border border-indigo-300 px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              title="Hear: city"
            >
              <span>🏙️</span>
              <span>city</span>
              <Volume2 className="w-3 h-3 text-indigo-700" />
            </button>
          </div>
        </div>

        {/* Dynamic Feedback Toast */}
        {feedbackMsg && (
          <div className="w-full bg-amber-500 text-white font-bold text-center py-2 px-4 rounded-2xl shadow-md text-sm md:text-base animate-bounce flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 fill-white" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* 50/50 Split Interactive Scenes: Town on Left, City on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
          {/* LEFT HALF: TOWN (小镇) */}
          <div className="flex flex-col h-full">
            <TownScene
              currentSpot={currentSpot}
              onClownClick={handleClownFound}
              isFound={isFound}
              onSceneClick={() => handleEmptySceneClick('town')}
            />
          </div>

          {/* RIGHT HALF: CITY (城市) */}
          <div className="flex flex-col h-full">
            <CityScene
              currentSpot={currentSpot}
              onClownClick={handleClownFound}
              isFound={isFound}
              onSceneClick={() => handleEmptySceneClick('city')}
            />
          </div>
        </div>

        {/* Classroom Quick Help Footer */}
        <footer className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-800 flex items-center gap-1">
              <span>💡</span>
              <span>Teacher Tips 教学小贴士:</span>
            </span>
            <span>
              1. 提示孩子留意 <strong>-own</strong> 拼读规律（cl<strong>own</strong> &amp; t<strong>own</strong> 押韵相同）；
            </span>
            <span className="hidden md:inline">
              2. 找到后全班大声跟读句子：<strong>"The clown is in the town / city!"</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPhonics(true)}
              className="text-teal-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Phonics Flashcards 自然拼读卡</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Star Leaderboard 光荣榜</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Follow-along English Reading Modal */}
      {currentSpot && (
        <ReadingModal
          isOpen={showReadingModal}
          location={currentSpot.location}
          spotFeature={currentSpot.hidingFeature}
          onNextRound={handleNextRound}
          onBonusScore={handleBonusScore}
          classroomMode={settings.classroomMode}
        />
      )}

      {/* Leaderboard Modal */}
      <Leaderboard
        scores={leaderboardScores}
        currentPlayer={currentPlayer}
        onSelectPlayer={(p) => setCurrentPlayer(p)}
        onClearScores={() => setLeaderboardScores([])}
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />

      {/* Phonics & Vocabulary Explorer Modal */}
      <PhonicsExplorer
        isOpen={showPhonics}
        onClose={() => setShowPhonics(false)}
      />
    </div>
  );
}
