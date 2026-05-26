import React from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX, Type, Sparkles, BookOpen, Clock, Heart } from "lucide-react";
import { GameSettings, Level } from "../types";

interface HeaderProps {
  levels: Level[];
  currentLevelId: number;
  onSelectLevel: (id: number) => void;
  levelFruitsFound: { [key: number]: number }; // Count of found differences
  settings: GameSettings;
  onUpdateSettings: (settings: GameSettings) => void;
  onShowHowToPlay: () => void;
}

export default function Header({
  levels,
  currentLevelId,
  onSelectLevel,
  levelFruitsFound,
  settings,
  onUpdateSettings,
  onShowHowToPlay,
}: HeaderProps) {
  const textClass = {
    normal: {
      title: "text-2xl font-bold",
      subtitle: "text-sm",
      button: "text-sm px-3 py-1.5",
      badge: "text-xs px-2 py-0.5",
    },
    large: {
      title: "text-3xl font-extrabold",
      subtitle: "text-base",
      button: "text-base px-4 py-2",
      badge: "text-sm px-2.5 py-1",
    },
    "extra-large": {
      title: "text-4xl font-black",
      subtitle: "text-lg",
      button: "text-lg px-5 py-2.5",
      badge: "text-base px-3 py-1.5",
    },
  }[settings.textSize];

  const toggleTextSize = () => {
    let nextSize: "normal" | "large" | "extra-large" = "large";
    if (settings.textSize === "normal") nextSize = "large";
    else if (settings.textSize === "large") nextSize = "extra-large";
    else nextSize = "normal";
    onUpdateSettings({ ...settings, textSize: nextSize });
  };

  const toggleVoice = () => {
    onUpdateSettings({ ...settings, isVoiceEnabled: !settings.isVoiceEnabled });
  };

  const toggleMode = () => {
    onUpdateSettings({ ...settings, isHealingMode: !settings.isHealingMode });
  };

  return (
    <header className="bg-white border-b-4 border-amber-100 shadow-sm sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Main Title Left */}
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2.5 rounded-full border border-amber-200">
              <span className="text-3xl" role="img" aria-label="elderly">👵</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`${textClass.title} text-amber-950 font-serif tracking-tight leading-tight`}>
                  청춘 틀린그림찾기
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-bold border border-emerald-200">
                  어르신 두뇌 활력
                </span>
              </div>
              <p className={`${textClass.subtitle} text-amber-800 font-medium`}>
                크고 선명한 그림으로 즐겁게 집중하는 실버 치매 예방 게임
              </p>
            </div>
          </div>

          {/* Controls Right */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-start md:justify-end">
            
            {/* Play Guide */}
            <button
              id="btn-how-to-play"
              onClick={onShowHowToPlay}
              className={`${textClass.button} bg-amber-50 hover:bg-amber-100 text-amber-950 font-semibold rounded-xl border-2 border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer`}
            >
              <BookOpen className="w-5 h-5 text-amber-800" />
              <span>게임 방법</span>
            </button>

            {/* Mode Switcher */}
            <button
              id="btn-mode-toggle"
              onClick={toggleMode}
              className={`${textClass.button} flex items-center gap-1.5 rounded-xl border-2 transition-all font-semibold cursor-pointer ${
                settings.isHealingMode
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100"
                  : "bg-orange-50 border-orange-200 text-orange-900 hover:bg-orange-100"
              }`}
            >
              {settings.isHealingMode ? (
                <>
                  <Heart className="w-5 h-5 text-emerald-600 fill-emerald-500" />
                  <span>🌱 힐링 모드 (시간무제한)</span>
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span>⏱️ 도전 모드 (시간 제한)</span>
                </>
              )}
            </button>

            {/* Text Size (Presbyopia Care Button) */}
            <button
              id="btn-text-size-toggle"
              onClick={toggleTextSize}
              className={`${textClass.button} bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-900 font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer`}
              title="글자를 더 크게 봅니다"
            >
              <Type className="w-5 h-5 text-blue-700" />
              <span>글자 크기: </span>
              <strong className="underline decoration-wavy underline-offset-4">
                {settings.textSize === "normal" && "보통"}
                {settings.textSize === "large" && "크게"}
                {settings.textSize === "extra-large" && "아주 크게!"}
              </strong>
            </button>

            {/* Voice Assistance Button */}
            <button
              id="btn-voice-toggle"
              onClick={toggleVoice}
              className={`${textClass.button} border-2 font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                settings.isVoiceEnabled
                  ? "bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100"
                  : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {settings.isVoiceEnabled ? (
                <>
                  <Volume2 className="w-5 h-5 text-purple-700 animate-pulse" />
                  <span>소리 설명: 켜짐</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-5 h-5 text-gray-400" />
                  <span>소리 설명: 꺼짐</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Level Navigation Bar */}
        <div className="mt-4 pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-900 text-sm sm:text-base">단계 선택:</span>
            <div className="flex gap-2">
              {levels.map((lvl) => {
                const isSelected = lvl.id === currentLevelId;
                const foundCount = levelFruitsFound[lvl.id] || 0;
                const totalCount = lvl.differences.length;
                const isCleared = foundCount === totalCount;

                return (
                  <button
                    id={`btn-lvl-${lvl.id}`}
                    key={lvl.id}
                    onClick={() => onSelectLevel(lvl.id)}
                    className={`relative px-3.5 py-1.5 rounded-xl border-2 font-bold text-sm sm:text-base flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-600 text-white border-amber-700 shadow-sm scale-105"
                        : "bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-200"
                    }`}
                  >
                    <span>{lvl.id}단계</span>
                    {isCleared ? (
                      <span className="text-green-600 font-extrabold" title="참 잘하셨어요!">💮 완벽!</span>
                    ) : (
                      <span className="text-amber-800 text-xs sm:text-sm font-semibold">
                        ({foundCount}/{totalCount} 발견)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simple encouraging words */}
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className={settings.textSize === "normal" ? "text-xs" : "text-sm"}>
              틀려도 괜찮아요! 한 단계씩 쉽고 편안하게 찾아보세요 🌸
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}
