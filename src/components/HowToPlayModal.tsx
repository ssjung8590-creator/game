import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Eye, HelpCircle, Heart, Speaker } from "lucide-react";
import { GameSettings } from "../types";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
}

export default function HowToPlayModal({ isOpen, onClose, settings }: HowToPlayModalProps) {
  if (!isOpen) return null;

  const fontClass = {
    normal: {
      title: "text-2xl",
      body: "text-base",
      sub: "text-sm",
      button: "text-base py-3",
    },
    large: {
      title: "text-3xl",
      body: "text-lg",
      sub: "text-base",
      button: "text-lg py-4",
    },
    "extra-large": {
      title: "text-4xl",
      body: "text-xl",
      sub: "text-lg",
      button: "text-xl py-5",
    },
  }[settings.textSize];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-amber-50 w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden border-4 border-amber-200 pointer-events-auto"
        >
          {/* Top Banner */}
          <div className="bg-amber-100 px-6 py-5 border-b-2 border-amber-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌸</span>
              <h2 className={`${fontClass.title} font-serif font-black text-amber-950`}>
                게임 방법 안내
              </h2>
            </div>
            <button
              id="modal-close"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-amber-200/50 text-amber-900 transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Guidelines Body */}
          <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <p className={`${fontClass.body} text-slate-800 leading-relaxed font-medium`}>
              자녀들이나 친구분들처럼 누구든지 손쉽게 즐길 수 있는 틀린그림찾기입니다. 아래 순서대로 편안하게 따라 하시면 두뇌 나이가 훨씬 젊어집니다!
            </p>

            {/* Instruction Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Step 1 */}
              <div className="bg-white p-5 rounded-2xl border-2 border-amber-100 flex items-start gap-3.5">
                <div className="bg-amber-100 text-amber-950 font-black rounded-xl w-10 h-10 flex items-center justify-center text-lg shrink-0">
                  1
                </div>
                <div>
                  <h4 className={`${fontClass.body} font-black text-amber-950 flex items-center gap-1.5 mb-1`}>
                    <Eye className="w-5 h-5 text-amber-700" /> 두 그림 비교하기
                  </h4>
                  <p className={`${fontClass.sub} text-slate-700 leading-relaxed`}>
                    좌우에 놓인 똑 닮은 두 그림을 살펴보세요. 미세하게 달라진 곳들이 있어요!
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-5 rounded-2xl border-2 border-amber-100 flex items-start gap-3.5">
                <div className="bg-amber-100 text-amber-950 font-black rounded-xl w-10 h-10 flex items-center justify-center text-lg shrink-0">
                  2
                </div>
                <div>
                  <h4 className={`${fontClass.body} font-black text-amber-950 flex items-center gap-1.5 mb-1`}>
                     선택하여 터치하기
                  </h4>
                  <p className={`${fontClass.sub} text-slate-700 leading-relaxed`}>
                    다른 부분을 찾으셨나요? 왼쪽이나 오른쪽 그림상에 그 자리를 그냥 가볍게 <strong>툭! 터치(클릭)</strong>하세요.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-5 rounded-2xl border-2 border-amber-100 flex items-start gap-3.5">
                <div className="bg-amber-100 text-amber-950 font-black rounded-xl w-10 h-10 flex items-center justify-center text-lg shrink-0">
                  3
                </div>
                <div>
                  <h4 className={`${fontClass.body} font-black text-amber-950 flex items-center gap-1.5 mb-1`}>
                    <HelpCircle className="w-5 h-5 text-amber-700" /> 막힐 때는 힌트 누르기
                  </h4>
                  <p className={`${fontClass.sub} text-slate-700 leading-relaxed`}>
                    어렵다면 하단의 <strong>'힌트 보기'</strong> 버튼을 누르세요. 반짝거려 친절하게 한 자리를 가르쳐 줍니다!
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-5 rounded-2xl border-2 border-amber-100 flex items-start gap-3.5">
                <div className="bg-amber-100 text-amber-950 font-black rounded-xl w-10 h-10 flex items-center justify-center text-lg shrink-0">
                  4
                </div>
                <div>
                  <h4 className={`${fontClass.body} font-black text-amber-950 flex items-center gap-1.5 mb-1`}>
                    <Heart className="w-5 h-5 text-amber-700" /> 두 가지 게임 모드
                  </h4>
                  <p className={`${fontClass.sub} text-slate-700 leading-relaxed`}>
                    시간 제한이 없이 편한 <strong>'🌱 힐링 모드'</strong>와, 조금 더 짜릿하게 두뇌를 훈련하는 <strong>'⏱️ 도전 모드'</strong>가 있습니다.
                  </p>
                </div>
              </div>

            </div>

            {/* Extra accessibility tip */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-emerald-900 flex gap-3 items-center">
              <Speaker className="w-7 h-7 text-emerald-700 shrink-0" />
              <p className={`${fontClass.sub} font-bold`}>
                어르신들의 안전한 경험을 위해 다른 부위를 잘못 터치해도 따로 벌점을 주지 않습니다. 소리 설명 기능을 켜시면 다정한 음성 안내를 함께 들으실 수 있습니다!
              </p>
            </div>
          </div>

          {/* Close Action Buttons */}
          <div className="bg-amber-100 p-4 border-t-2 border-amber-200 flex justify-end">
            <button
              id="modal-confirm"
              onClick={onClose}
              className={`${fontClass.button} bg-amber-600 hover:bg-amber-700 text-white font-extrabold w-full rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer`}
            >
              <Check className="w-6 h-6" />
              <span>알겠습니다. 게임 시작하기!</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
