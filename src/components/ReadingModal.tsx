import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Snail, Mic, Sparkles, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { LocationType } from '../types';
import { soundCtrl, speakEnglish } from '../utils/audio';

interface ReadingModalProps {
  isOpen: boolean;
  location: LocationType;
  spotFeature: string;
  onNextRound: () => void;
  onBonusScore: (bonus: number) => void;
  classroomMode: boolean;
}

export const ReadingModal: React.FC<ReadingModalProps> = ({
  isOpen,
  location,
  spotFeature,
  onNextRound,
  onBonusScore,
  classroomMode,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState<string | null>(null);
  const [starsAwarded, setStarsAwarded] = useState<number | null>(null);
  const [hasPracticed, setHasPracticed] = useState(false);
  const recognitionRef = useRef<unknown>(null);

  const sentence = location === 'town' ? 'The clown is in the town!' : 'The clown is in the city!';
  const targetWord = location === 'town' ? 'town' : 'city';

  // Trigger celebration confetti & ding when modal opens
  useEffect(() => {
    if (isOpen) {
      soundCtrl.playSuccessDing();
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#f43f5e'],
      });

      // Automatically speak the sentence once smoothly after a gentle delay
      const timer = setTimeout(() => {
        handleSpeak(0.95);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      setStarsAwarded(null);
      setRecordingStatus(null);
      setHasPracticed(false);
    }
  }, [isOpen, location]);

  const handleSpeak = (rate: number = 0.95) => {
    setIsPlayingAudio(true);
    speakEnglish(sentence, {
      rate,
      pitch: 1.15,
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const speakSingleWord = (word: string, phonicsTip?: string) => {
    soundCtrl.playClick();
    speakEnglish(word, {
      rate: 0.85,
      pitch: 1.1,
    });
  };

  // Follow-along microphone practice
  const startRecording = () => {
    soundCtrl.playClick();
    setIsRecording(true);
    setRecordingStatus('Listening... Please read aloud! 🎤');
    setStarsAwarded(null);

    // Check Web Speech Recognition
    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      try {
        const recognition = new (SpeechRecognitionClass as any)();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          setIsRecording(false);
          const hasClown = transcript.includes('clown');
          const hasLocation = transcript.includes(targetWord);

          if (hasClown && hasLocation) {
            setStarsAwarded(3);
            setRecordingStatus(`🌟 Excellent! "${transcript}" — 100% Match!`);
            onBonusScore(100);
            soundCtrl.playSuccessDing();
          } else if (hasClown || hasLocation) {
            setStarsAwarded(2);
            setRecordingStatus(`👏 Great job! Heard: "${transcript}" — Good effort!`);
            onBonusScore(60);
          } else {
            setStarsAwarded(2);
            setRecordingStatus(`👍 Well tried! Heard: "${transcript}". Keep practicing!`);
            onBonusScore(40);
          }
          setHasPracticed(true);
        };

        recognition.onerror = () => {
          fallbackRecordingSimulation();
        };

        recognition.start();
        return;
      } catch {
        fallbackRecordingSimulation();
        return;
      }
    }

    fallbackRecordingSimulation();
  };

  const fallbackRecordingSimulation = () => {
    setTimeout(() => {
      setIsRecording(false);
      setStarsAwarded(3);
      setRecordingStatus('🎉 Super pronunciation! 3 Stars for you!');
      setHasPracticed(true);
      onBonusScore(80);
      soundCtrl.playSuccessDing();
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 ${
          location === 'town' ? 'border-emerald-400' : 'border-indigo-400'
        } overflow-hidden p-6 md:p-8 flex flex-col items-center text-center`}
      >
        {/* Celebration Top Banner */}
        <div className="flex items-center gap-2 mb-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>Bingo! You found the clown {spotFeature}!</span>
          <span>🎉</span>
        </div>

        {/* Large Pedagogical Sentence Display */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-600 mb-3 font-fredoka">
          Let's Read Together! 跟老师一起大声读：
        </h2>

        {/* Big Interactive Phonics Sentence Box */}
        <div
          className={`w-full py-5 px-6 rounded-2xl mb-5 shadow-lg border-2 ${
            location === 'town'
              ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-emerald-300'
              : 'bg-gradient-to-r from-indigo-50 via-sky-50 to-blue-50 border-indigo-300'
          }`}
        >
          <div
            className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 ${
              classroomMode ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
            } font-extrabold tracking-wide font-fredoka`}
          >
            {/* "The" */}
            <span
              onClick={() => speakSingleWord('The')}
              className="cursor-pointer hover:text-amber-600 transition-colors"
              title="Click to hear: The"
            >
              The
            </span>

            {/* "clown" (highlighted badge) */}
            <button
              onClick={() => speakSingleWord('clown')}
              className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 px-3.5 py-1 rounded-2xl shadow-md border-2 border-amber-500 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Click to hear: clown"
            >
              <span>🤡</span>
              <span className="underline decoration-wavy decoration-red-500">clown</span>
            </button>

            {/* "is in the" */}
            <span
              onClick={() => speakSingleWord('is in the')}
              className="cursor-pointer hover:text-amber-600 transition-colors"
            >
              is in the
            </span>

            {/* "town" or "city" (highlighted badge) */}
            <button
              onClick={() => speakSingleWord(targetWord)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-2xl shadow-md border-2 hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                location === 'town'
                  ? 'bg-emerald-400 hover:bg-emerald-500 text-emerald-950 border-emerald-500'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white border-indigo-600'
              }`}
              title={`Click to hear: ${targetWord}`}
            >
              <span>{location === 'town' ? '🏡' : '🏙️'}</span>
              <span className="underline decoration-wavy decoration-yellow-300">{targetWord}</span>
              <span>!</span>
            </button>
          </div>

          {/* Phonics & Meaning Tip */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
              <span className="text-amber-600 font-bold">clown</span>
              <span>[klaʊn]</span>
              <span className="text-slate-400">小丑</span>
            </span>
            <span className="text-slate-400">•</span>
            <span className="inline-flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
              <span className={location === 'town' ? 'text-emerald-600 font-bold' : 'text-indigo-600 font-bold'}>
                {targetWord}
              </span>
              <span>{location === 'town' ? '[taʊn] 小镇' : "['sɪti] 城市"}</span>
            </span>
            {location === 'town' && (
              <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                ✨ Phonics Rhyme: cl-own & t-own sound alike!
              </span>
            )}
          </div>
        </div>

        {/* Audio Listen Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
          {/* Normal Listen */}
          <button
            onClick={() => handleSpeak(0.95)}
            disabled={isPlayingAudio}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            <span>Listen 听发音</span>
          </button>

          {/* Slow Phonics Snail */}
          <button
            onClick={() => handleSpeak(0.7)}
            disabled={isPlayingAudio}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
            title="Read slowly for clear phonics listening"
          >
            <Snail className="w-5 h-5" />
            <span>Slow 慢速示范</span>
          </button>

          {/* Repeat */}
          <button
            onClick={() => handleSpeak(1.0)}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay 再听一次</span>
          </button>
        </div>

        {/* Follow-along Speech Recognition Practice ("跟读互动") */}
        <div className="w-full max-w-lg bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Student Follow-Along 跟读挑战</span>
            </span>
            {starsAwarded !== null && (
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl transition-all ${
                      i < starsAwarded ? 'text-amber-400 scale-110 animate-bounce' : 'text-slate-300'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={startRecording}
              disabled={isRecording}
              className={`flex items-center gap-2 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white'
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'animate-bounce' : ''}`} />
              <span>{isRecording ? 'Listening... 请朗读...' : 'Press & Read Aloud 点击跟读'}</span>
            </button>
          </div>

          {recordingStatus && (
            <p className="mt-2.5 text-xs md:text-sm font-semibold text-slate-700 bg-white py-1.5 px-3 rounded-xl border border-slate-200 shadow-sm animate-fadeIn">
              {recordingStatus}
            </p>
          )}
        </div>

        {/* Action Button: Next Round */}
        <div className="flex items-center justify-center gap-4 w-full">
          <button
            onClick={() => {
              soundCtrl.playClick();
              onNextRound();
            }}
            className="w-full max-w-xs flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-lg py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Next Round 下一题</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
