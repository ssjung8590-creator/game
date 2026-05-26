import React, { useState } from "react";
import { Sparkles, Trophy, Heart, Coffee } from "lucide-react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import HowToPlayModal from "./components/HowToPlayModal";
import SuccessModal from "./components/SuccessModal";
import { levels } from "./data/levels";
import { GameSettings } from "./types";

export default function App() {
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [keyBumper, setKeyBumper] = useState<number>(0); // Bumper to trigger level re-renders
  const [levelFruitsFound, setLevelFruitsFound] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
  });

  const [settings, setSettings] = useState<GameSettings>({
    isHealingMode: true, // Defaulting to Healing mode (infinite time) for stress-free play
    isVoiceEnabled: true, // Comforting Korean speaking assistant on by default
    textSize: "large", // Prominent text is extremely helpful for elders
    soundVolume: 50,
  });

  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(true); // Guide pops up on initial load
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);

  const currentLevel = levels.find((l) => l.id === currentLevelId) || levels[0];

  const handleSelectLevel = (id: number) => {
    setCurrentLevelId(id);
    setKeyBumper((prev) => prev + 1);
    setIsSuccessOpen(false);
  };

  const handleUpdateFruitsFound = (levelId: number, foundCount: number) => {
    setLevelFruitsFound((prev) => ({
      ...prev,
      [levelId]: foundCount,
    }));
  };

  const handleLevelCleared = () => {
    setIsSuccessOpen(true);
  };

  const handleReplayLevel = () => {
    setLevelFruitsFound((prev) => ({
      ...prev,
      [currentLevelId]: 0,
    }));
    setKeyBumper((prev) => prev + 1);
    setIsSuccessOpen(false);
  };

  const handleNextLevel = () => {
    if (currentLevelId < levels.length) {
      const nextId = currentLevelId + 1;
      setCurrentLevelId(nextId);
      setKeyBumper((prev) => prev + 1);
      setIsSuccessOpen(false);
    }
  };

  const hasNextLevel = currentLevelId < levels.length;

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col font-sans text-slate-900 overflow-x-hidden antialiased">
      
      {/* Top Accessible Header bar */}
      <Header
        levels={levels}
        currentLevelId={currentLevelId}
        onSelectLevel={handleSelectLevel}
        levelFruitsFound={levelFruitsFound}
        settings={settings}
        onUpdateSettings={setSettings}
        onShowHowToPlay={() => setIsHowToPlayOpen(true)}
      />

      {/* Main Interactive Play Area */}
      <main className="flex-grow max-w-[1440px] w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        
        {/* Dynamic gameboard instance */}
        <GameBoard
          key={`${currentLevelId}-${keyBumper}`} // Unique keys prevent stale difference states on level switch
          level={currentLevel}
          settings={settings}
          onUpdateFruitsFound={handleUpdateFruitsFound}
          onLevelCleared={handleLevelCleared}
          onReplayLevel={handleReplayLevel}
        />

        {/* Support Banner / Care Slogans */}
        <section className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-100 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-amber-200 p-3 rounded-full shrink-0">
              <span className="text-3xl">💆</span>
            </div>
            <div>
              <h3 className="font-bold text-amber-950 text-base sm:text-lg">
                매일 매일 똑똑해지는 두뇌 훈련 카드 🧠
              </h3>
              <p className="text-amber-800 text-xs sm:text-sm font-medium mt-1 leading-relaxed">
                두 그림의 서로 다른 점을 집중에서 세밀하게 찾아볼 때, 두뇌 전두엽의 미세 말초신경이 기분 좋게 자극받습니다. 천천히 무리하지 않고 놀이로 즐기시는 것이 가장 좋습니다.
              </p>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <span className="bg-amber-100 text-amber-900 text-xs font-black py-1.5 px-3 rounded-xl border border-amber-200 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              정서 안정
            </span>
            <span className="bg-amber-100 text-amber-900 text-xs font-black py-1.5 px-3 rounded-xl border border-amber-200 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              성취감 고취
            </span>
            <span className="bg-amber-100 text-amber-900 text-xs font-black py-1.5 px-3 rounded-xl border border-amber-200 flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5 text-amber-600" />
              집중력 향상
            </span>
          </div>
        </section>

      </main>

      {/* Comforting Silver Support Center footer */}
      <footer className="bg-slate-900 border-t-8 border-amber-600/20 text-slate-400 py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="flex justify-center items-center gap-2">
            <span className="bg-slate-800 text-slate-300 font-bold text-xs px-2.5 py-1 rounded-md border border-slate-700">
              청춘 건강 도우미
            </span>
            <p className="font-serif font-black text-slate-100 text-sm sm:text-base">
              👵 실버 청춘 틀린그림찾기 👴
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            어르신의 침침한 눈과 흔들리는 손가락을 위해 터치 판정을 넉넉하고 크게 만들어 놓았습니다. 소리를 키우시면 언제나 차분히 읽어드리니 쉽고 재미있게 두뇌 놀이를 즐겨 보세요.
          </p>
          <div className="text-[11px] text-slate-500 pt-1">
            © 2026 실버 두뇌 정성 케어 서비스. 복사 및 나눔 환영 🌸
          </div>
        </div>
      </footer>

      {/* Accessible Game Guide/How-To Overlay Modals */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        settings={settings}
      />

      {/* Win Celebration overlay popup with full level review descriptions */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        level={currentLevel}
        onNextLevel={hasNextLevel ? handleNextLevel : null}
        onReplay={handleReplayLevel}
        settings={settings}
      />

    </div>
  );
}
