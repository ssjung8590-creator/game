import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Volume2, Sparkles, Check, Play, Square, RefreshCcw, AlertCircle } from "lucide-react";
import { Difference, GameSettings, Level } from "../types";
import { sfx } from "../utils/audio";
import { speak, stopSpeaking } from "../utils/speech";

interface GameBoardProps {
  key?: string | number;
  level: Level;
  settings: GameSettings;
  onUpdateFruitsFound: (levelId: number, foundCount: number) => void;
  onLevelCleared: () => void;
  onReplayLevel: () => void;
}

interface IncorrectClick {
  id: number;
  x: number;
  y: number;
}

export default function GameBoard({
  level,
  settings,
  onUpdateFruitsFound,
  onLevelCleared,
  onReplayLevel,
}: GameBoardProps) {
  const [differences, setDifferences] = useState<Difference[]>([]);
  const [activeHintId, setActiveHintId] = useState<string | null>(null);
  const [incorrectClicks, setIncorrectClicks] = useState<IncorrectClick[]>([]);
  
  // Timer State for Challenge Mode
  const [timeLeft, setTimeLeft] = useState<number>(120); // 120 seconds default
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Read voice guide on level load
  useEffect(() => {
    // Deep clone level differences to avoid mutation issues
    const clonedDiffs = level.differences.map(d => ({ ...d, found: false }));
    setDifferences(clonedDiffs);
    setActiveHintId(null);
    setIncorrectClicks([]);
    setTimeLeft(125); // 125 seconds for extra margin
    setIsGameOver(false);

    // Speak initial level entrance
    if (settings.isVoiceEnabled) {
      speak(`${level.title}. ${level.description}. 아래 준비된 그림에서 서로 다른 곳을 고르세요.`, true);
    }

    return () => {
      stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [level, settings.isVoiceEnabled]);

  // Set up timer (only in Challenge Mode)
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!settings.isHealingMode && !isGameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsGameOver(true);
            sfx.playIncorrect(); // soft warnings
            speak("앗, 제한 시간이 완료되었습니다! 다시 한번 천천히 도전해보세요.", settings.isVoiceEnabled);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [settings.isHealingMode, isGameOver]);

  const speakGuide = () => {
    speak(level.voiceGuide, true);
  };

  /**
   * Universal coordinate interpreter. Map viewport client point on absolute target bounding client rect
   * to high-precision 0-100 coordinates.
   */
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isGameOver) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Check if the click lies near any unfound differences
    let matchFound = false;

    const updatedDiffs = differences.map((diff) => {
      if (diff.found) return diff;

      // Distance checking
      const dx = clickX - diff.x;
      const dy = clickY - diff.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Simple click validation (easy generous radius check)
      if (distance <= diff.radius) {
        matchFound = true;
        sfx.playCorrect();
        
        // Voice out encouragement
        speak(`좋습니다! ${diff.name}을 찾으셨습니다!`, settings.isVoiceEnabled);
        
        // Clear active hint if it was this difference
        if (activeHintId === diff.id) {
          setActiveHintId(null);
        }

        return { ...diff, found: true };
      }
      return diff;
    });

    if (matchFound) {
      setDifferences(updatedDiffs);
      
      const foundCount = updatedDiffs.filter(d => d.found).length;
      onUpdateFruitsFound(level.id, foundCount);

      // Verify level cleared
      if (foundCount === updatedDiffs.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => {
          sfx.playLevelComplete();
          onLevelCleared();
        }, 800);
      }
    } else {
      // Click was inaccurate (missed)
      sfx.playIncorrect();
      
      // Temporary visually floating "X" mark over the incorrect spot
      const nextId = Date.now();
      setIncorrectClicks((prev) => [...prev, { id: nextId, x: clickX, y: clickY }]);
      setTimeout(() => {
        setIncorrectClicks((prev) => prev.filter(c => c.id !== nextId));
      }, 800);
    }
  };

  /**
   * Provide a cozy hint to seniors without any strict penalties
   */
  const handleGetHint = () => {
    if (isGameOver) return;

    // Find first non-found difference
    const nextUnfound = differences.find(d => !d.found);
    if (nextUnfound) {
      sfx.playHint();
      setActiveHintId(nextUnfound.id);
      speak(`힌트를 드리겠습니다. ${nextUnfound.name} 근처를 유심히 관찰해 보세요!`, settings.isVoiceEnabled);

      // Auto clear hint indicator after 4.5 seconds to avoid cluttering but give plenty time
      setTimeout(() => {
        setActiveHintId(curr => curr === nextUnfound.id ? null : curr);
      }, 4500);
    }
  };

  const handleResetChallenge = () => {
    onReplayLevel();
  };

  // Font/Theme Scale modifiers
  const currentFonts = {
    normal: {
      stepTitle: "text-lg font-bold",
      stepDesc: "text-sm",
      btnText: "text-base py-3 px-6",
      indicator: "text-base py-1 px-3.5",
      sideItem: "text-sm",
    },
    large: {
      stepTitle: "text-xl font-extrabold",
      stepDesc: "text-base",
      btnText: "text-lg py-4 px-8",
      indicator: "text-lg py-1.5 px-4.5",
      sideItem: "text-base",
    },
    "extra-large": {
      stepTitle: "text-2xl font-black",
      stepDesc: "text-lg",
      btnText: "text-xl py-5 px-10",
      indicator: "text-xl py-2 px-6",
      sideItem: "text-lg",
    },
  }[settings.textSize];

  const totalDifferences = level.differences.length;
  const foundDifferencesCount = differences.filter(d => d.found).length;

  return (
    <div className="space-y-6">
      
      {/* Level Audio Guide Speaker & Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="bg-amber-600 text-white p-2.5 rounded-full shadow-inner shrink-0">
            <Volume2 className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="text-amber-800 font-bold text-xs sm:text-sm">어르신과 함께 가르쳐 주는 다정한 도우미</span>
            <p className={`${currentFonts.stepDesc} font-medium text-amber-950`}>
              "{level.description}"
            </p>
          </div>
        </div>

        <button
          id="btn-speak-guide"
          onClick={speakGuide}
          className="bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-200 font-black rounded-xl px-4 py-2 transition-all flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap shrink-0 text-sm sm:text-base"
        >
          <Volume2 className="w-5 h-5 text-amber-800" />
          <span>목소리 안내 다시 듣기</span>
        </button>

      </div>

      {/* Grid of Two Images (Left/Right) & Side Checkpoints - Restructured for Full Width Pictures! */}
      <div className="space-y-6">
        
        {/* Play Scenes (Spans 100% width on widescreen, achieving 35%+ size increase!) */}
        <div className="bg-white p-3 sm:p-5 rounded-3xl border-4 border-[#eae4d8] shadow-sm space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LEFT CONTAINER */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-3">
                <span className="bg-amber-50/70 text-amber-900 font-black px-4 py-1.5 rounded-full text-base border border-amber-200/60">
                  왼쪽 그림 (원본)
                </span>
                <span className="text-sm font-semibold text-slate-400">기준이 되는 그림입니다</span>
              </div>
              
              <div
                id="image-container-left"
                onClick={handleImageClick}
                className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-inner bg-[#f3f9fc] border-2 border-slate-200/80 cursor-crosshair transition-all hover:shadow-lg"
              >
                {/* SVG Render */}
                {level.renderLeft({ differences })}

                {/* Overlaid Rings for FOUND items */}
                {differences.map((diff) => {
                  if (!diff.found) return null;
                  return (
                    <motion.div
                      key={`ring-left-${diff.id}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.95 }}
                      className="absolute border-[4px] border-emerald-400 bg-emerald-400/10 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        left: `${diff.x}%`,
                        top: `${diff.y}%`,
                        width: `${diff.radius * 2.1}%`,
                        height: `${diff.radius * 2.8}%`,
                      }}
                    >
                      {/* Check mark badge inside found ring */}
                      <span className="bg-emerald-500 text-white rounded-full p-0.5 text-[10px]">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                    </motion.div>
                  );
                })}

                {/* Pulsing GLOWING Yellow Circle for Hints */}
                {activeHintId && (
                  (() => {
                    const hintDiff = differences.find(d => d.id === activeHintId);
                    if (!hintDiff) return null;
                    return (
                      <div
                        className="absolute border-4 border-dashed border-amber-400 bg-amber-400/20 rounded-full animate-ping -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                          left: `${hintDiff.x}%`,
                          top: `${hintDiff.y}%`,
                          width: `${hintDiff.radius * 2.5}%`,
                          height: `${hintDiff.radius * 3.3}%`,
                        }}
                      />
                    );
                  })()
                )}

                {/* Incorrect clicks feedback ripples */}
                <AnimatePresence>
                  {incorrectClicks.map((click) => (
                    <motion.div
                      key={`incorrect-left-${click.id}`}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute border-4 border-rose-400 bg-rose-400/20 rounded-full text-rose-500 font-extrabold text-xl flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        left: `${click.x}%`,
                        top: `${click.y}%`,
                        width: "44px",
                        height: "44px",
                      }}
                    >
                      ❌
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT CONTAINER */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-3">
                <span className="bg-amber-100/80 text-amber-950 font-black px-4 py-1.5 rounded-full text-base border-2 border-amber-200 flex items-center gap-1">
                  오른쪽 그림 (틀린그림찾기 🎯)
                </span>
                <span className="text-sm font-semibold text-amber-800">여기에서 다른 부분을 터치해보세요</span>
              </div>
              
              <div
                id="image-container-right"
                onClick={handleImageClick}
                className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-inner bg-[#f3f9fc] border-2 border-slate-200/80 cursor-crosshair transition-all hover:shadow-lg"
              >
                {/* SVG Render */}
                {level.renderRight({ differences })}

                {/* Overlaid Rings for FOUND items */}
                {differences.map((diff) => {
                  if (!diff.found) return null;
                  return (
                    <motion.div
                      key={`ring-right-${diff.id}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.95 }}
                      className="absolute border-[4px] border-emerald-400 bg-emerald-400/10 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        left: `${diff.x}%`,
                        top: `${diff.y}%`,
                        width: `${diff.radius * 2.1}%`,
                        height: `${diff.radius * 2.8}%`,
                      }}
                    >
                      <span className="bg-emerald-500 text-white rounded-full p-0.5 text-[10px]">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                    </motion.div>
                  );
                })}

                {/* Hint pulsing */}
                {activeHintId && (
                  (() => {
                    const hintDiff = differences.find(d => d.id === activeHintId);
                    if (!hintDiff) return null;
                    return (
                      <div
                        className="absolute border-4 border-dashed border-amber-400 bg-amber-400/20 rounded-full animate-ping -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                          left: `${hintDiff.x}%`,
                          top: `${hintDiff.y}%`,
                          width: `${hintDiff.radius * 2.5}%`,
                          height: `${hintDiff.radius * 3.3}%`,
                        }}
                      />
                    );
                  })()
                )}

                {/* Incorrect click ripples */}
                <AnimatePresence>
                  {incorrectClicks.map((click) => (
                    <motion.div
                      key={`incorrect-right-${click.id}`}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute border-4 border-rose-400 bg-rose-400/20 rounded-full text-rose-500 font-extrabold text-xl flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{
                        left: `${click.x}%`,
                        top: `${click.y}%`,
                        width: "44px",
                        height: "44px",
                      }}
                    >
                      ❌
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Guidelines on page helper */}
          <div className="text-center font-bold text-[#8c7e6c] text-sm sm:text-base pt-2 border-t border-dashed border-[#eadfc8]/50">
            ⭐️ 마우스 왼쪽 버튼이나 스마트폰 손가락 터치로 다른 부분을 직접 눌러 맞추어 보세요.
          </div>

        </div>

        {/* Level Control/Status Row (Stacked Below for 100% Horizontal View) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Stats Header (Span 5/12) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border-2 border-[#eae4d8] shadow-sm space-y-5">
            
            {/* Find Count Star */}
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">찾은 개수</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-4xl font-extrabold text-amber-950">{foundDifferencesCount}</span>
                <span className="text-lg font-bold text-amber-800">/ {totalDifferences}</span>
                <span className="text-2xl ml-2 text-amber-500">🌟</span>
              </div>
              
              {/* Star-like checklist bars */}
              <div className="flex gap-1.5 mt-2.5">
                {level.differences.map((diff, index) => {
                  const isFound = differences.find(d => d.id === diff.id)?.found;
                  return (
                    <div
                      key={diff.id}
                      className={`h-3 rounded-full flex-1 transition-all ${
                        isFound ? "bg-emerald-500 scale-y-110 shadow-sm" : "bg-slate-200"
                      }`}
                      title={`${index + 1}번째 틀린그림`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Timers/Healing indicators */}
            {settings.isHealingMode ? (
              <div className="bg-emerald-50/70 text-emerald-950 font-extrabold text-sm p-3.5 rounded-xl border border-emerald-100 flex items-center gap-2.5">
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="font-extrabold text-emerald-900 leading-none">편안한 힐링 모드 실행 중</p>
                  <span className="text-[11px] font-semibold text-emerald-700/80">시간 부담 없이 편안하게 보세요.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 block uppercase">남은 시간</span>
                <div className={`p-3 rounded-xl border flex items-center justify-between font-mono font-black text-xl transition-all ${
                  timeLeft <= 25 
                    ? "bg-rose-50 border-rose-200 text-rose-700 animate-pulse"
                    : "bg-orange-50 border-orange-200 text-orange-800"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏱️</span>
                    <span>
                      {Math.floor(timeLeft / 60)}분 {String(timeLeft % 60).padStart(2, "0")}초
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Hint & Help Button */}
            <button
              id="btn-trigger-hint"
              onClick={handleGetHint}
              disabled={foundDifferencesCount === totalDifferences || isGameOver}
              className={`w-full ${currentFonts.btnText} font-black rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                foundDifferencesCount === totalDifferences
                  ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-700"
              }`}
            >
              <HelpCircle className="w-6 h-6 shrink-0 text-white animate-pulse" />
              <span>전구 켬! 힌트 보기</span>
            </button>

          </div>

          {/* List of Found checklist descriptions (Span 7/12) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border-2 border-[#eae4d8] shadow-sm space-y-3">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>내가 맞춘 것들:</span>
            </h4>

            <div className="space-y-2 max-h-[220px] overflow-y-auto">
              {differences.map((diff, index) => {
                return (
                  <div
                    key={diff.id}
                    className={`p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 ${
                      diff.found
                        ? "bg-emerald-50/70 border-emerald-200/60 text-emerald-950"
                        : "bg-slate-100/50 border-slate-200/50 text-slate-400 opacity-60"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      diff.found ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-400"
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-extrabold block">
                        {diff.found ? diff.name : "과연 아랫 그림은 무엇이 다를까요?"}
                      </span>
                      {diff.found && (
                        <span className="text-[11px] leading-relaxed block text-slate-600 mt-1">
                          {diff.description}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Game Over modal in Challenge mode */}
      <AnimatePresence>
        {isGameOver && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white max-w-md w-full rounded-3xl p-6 border-4 border-orange-300 shadow-2xl space-y-6 text-center"
            >
              <div className="inline-block bg-orange-100 p-4 rounded-full text-orange-600">
                <AlertCircle className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800">아쉽게 시간 종료!</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  시간 도전에 성공하지 못해 아쉽습니다. 하지만 포기하지 마세요! 다시 한번 시작해 보시거나, 편안한 힐링 모드로 바꿔서 즐기실 수 있습니다.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  id="gameover-retry-challenge"
                  onClick={handleResetChallenge}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <RefreshCcw className="w-5 h-5" />
                  <span>이 단계 다시 도전하기</span>
                </button>

                <button
                  id="gameover-exit-healing"
                  onClick={() => {
                    settings.isHealingMode = true;
                    setIsGameOver(false);
                  }}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-extrabold py-3 rounded-2xl flex items-center justify-center gap-2 border-2 border-emerald-200 transition-all cursor-pointer"
                >
                  <span>🌱 스트레스 없는 '힐링 모드'로 변경</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
