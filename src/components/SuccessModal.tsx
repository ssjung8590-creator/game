import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";
import { GameSettings, Level } from "../types";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: Level;
  onNextLevel: (() => void) | null;
  onReplay: () => void;
  settings: GameSettings;
}

export default function SuccessModal({
  isOpen,
  onClose,
  level,
  onNextLevel,
  onReplay,
  settings,
}: SuccessModalProps) {
  if (!isOpen) return null;

  const fontClass = {
    normal: {
      title: "text-2xl",
      desc: "text-base",
      sub: "text-sm",
      button: "text-sm py-3",
    },
    large: {
      title: "text-3xl",
      desc: "text-lg",
      sub: "text-base",
      button: "text-lg py-4",
    },
    "extra-large": {
      title: "text-4xl",
      desc: "text-xl",
      sub: "text-lg",
      button: "text-xl py-5",
    },
  }[settings.textSize];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 50 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-emerald-50 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border-4 border-emerald-300 pointer-events-auto"
        >
          {/* Top Celebration Banner */}
          <div className="bg-emerald-600 px-6 py-6 text-center text-white relative">
            <div className="absolute top-4 right-4 text-emerald-300/30">
              <Award className="w-24 h-24 stroke-[1.5]" />
            </div>
            
            <motion.div
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block bg-white/20 p-3 rounded-full mb-3"
            >
              <span className="text-5xl" role="img" aria-label="celebrate">🎉</span>
            </motion.div>
            
            <h2 className={`${fontClass.title} font-serif font-black tracking-tight`}>
              미션 완벽 성공!
            </h2>
            <p className="text-emerald-100 font-bold mt-1 text-sm sm:text-base">
              참 잘하셨습니다! 귀여운 구석구석 다 찾아내셨어요!
            </p>
          </div>

          {/* Level Breakdown & Educational Review */}
          <div className="p-6 md:p-8 space-y-5">
            <div className="text-center">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">클리어한 무대</span>
              <h3 className="text-xl font-bold text-slate-800 mt-0.5">{level.title}</h3>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100 space-y-3.5">
              <div className="text-sm font-bold text-slate-500 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>기억 쑥쑥! 내가 발견한 틀린 그림들:</span>
              </div>
              
              <ul className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {level.differences.map((diff, index) => (
                  <li key={diff.id} className="flex items-start gap-2 text-slate-700">
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <strong className={`${fontClass.sub} text-slate-900 font-extrabold`}>
                        {diff.name}
                      </strong>
                      <p className={`${fontClass.sub} text-slate-600 text-xs mt-0.5 leading-relaxed`}>
                        {diff.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-center text-emerald-800 bg-emerald-100/60 font-bold py-1 px-3 rounded-full">
              💡 번갈아 관찰하며 찾는 과정이 어르신 뇌혈류를 고르게 도웁니다. 🧠
            </p>
          </div>

          {/* Action buttons */}
          <div className="bg-emerald-100/50 p-5 border-t border-emerald-200 flex flex-col sm:flex-row gap-3">
            
            <button
              id="replay-level"
              onClick={onReplay}
              className={`${fontClass.button} bg-white hover:bg-slate-50 text-slate-700 font-bold border-2 border-slate-200 flex-1 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer`}
            >
              <RefreshCw className="w-5 h-5 text-slate-400" />
              <span>다시 해보기</span>
            </button>

            {onNextLevel ? (
              <button
                id="next-level"
                onClick={onNextLevel}
                className={`${fontClass.button} bg-emerald-600 hover:bg-emerald-700 text-white font-black flex-[1.5] rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer`}
              >
                <span>다음 단계 가기</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            ) : (
              <button
                id="close-success"
                onClick={onClose}
                className={`${fontClass.button} bg-blue-600 hover:bg-blue-700 text-white font-black flex-[1.5] rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer`}
              >
                <span>메인 화면으로</span>
              </button>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
