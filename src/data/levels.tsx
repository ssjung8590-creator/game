import React from "react";
import { Level } from "../types";

export const levels: Level[] = [
  {
    id: 1,
    title: "봄날의 따뜻한 정원",
    description: "아름다운 봄꽃과 파란 하늘아래 나무들이 자라는 정원입니다. 양쪽 그림에서 조금씩 달라진 5곳을 찾아보세요.",
    voiceGuide: "첫 번째 단계, 봄날의 따뜻한 정원입니다. 어르신들의 눈 건강에 좋은 따스한 정원에서 서로 다른 다섯 장소를 터치하여 찾아보세요.",
    difficulty: "매우 쉬움",
    differences: [
      {
        id: "garden_butterfly",
        name: "하늘의 나비 색깔",
        description: "왼쪽은 예쁜 파란 나비인데, 오른쪽은 고운 분홍 나비가 날아다녀요!",
        x: 35,
        y: 25,
        radius: 8,
        found: false
      },
      {
        id: "garden_tulip",
        name: "왼쪽 구퉁이 튤립",
        description: "왼쪽 꽃밭에는 화사한 노란 튤립이 피었는데, 오른쪽 정원에는 정열적인 빨간 튤립이 피어있네요!",
        x: 18,
        y: 80,
        radius: 8,
        found: false
      },
      {
        id: "garden_cloud",
        name: "오른쪽 상단 뭉게구름",
        description: "시원한 하늘 위의 풍성하던 오른쪽 흰 구름이, 오른쪽 그림에는 어딜 갔는지 사려졌어요!",
        x: 82,
        y: 18,
        radius: 9,
        found: false
      },
      {
        id: "garden_apple",
        name: "나무의 과일 종류",
        description: "왼쪽 나무에는 맛있는 빨간 사과가 열렸는데, 오른쪽 나무에는 아삭한 초록 배가 주렁주렁 열렸어요!",
        x: 65,
        y: 50,
        radius: 8,
        found: false
      },
      {
        id: "garden_fence_bird",
        name: "울타리 위의 꼬마새",
        description: "왼쪽 울타리 위에서 지저귀는 귀여운 빨간 참새가 오른쪽 그림에는 날아가고 없어요!",
        x: 48,
        y: 64,
        radius: 7,
        found: false
      }
    ],
    // Render the LEFT image svg
    renderLeft: ({ differences }) => {
      // Find butterfly and other elements found state to conditionally render if needed
      // (though standard game keep them different after finding to show the differences)
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #bae6fd, #e0f2fe)" }}>
          <defs>
            <linearGradient id="hill-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="hill-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
            <linearGradient id="tree-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>

          {/* Sun */}
          <circle cx="60" cy="60" r="25" fill="#f97316" filter="drop-shadow(0 0 8px rgba(249,115,22,0.4))" />
          <circle cx="60" cy="60" r="20" fill="#facc15" />

          {/* Left Cloud */}
          <g fill="#ffffff" opacity="0.9">
            <circle cx="150" cy="50" r="20" />
            <circle cx="180" cy="45" r="25" />
            <circle cx="210" cy="50" r="18" />
            <rect x="150" y="50" width="60" height="20" rx="10" />
          </g>

          {/* Right Cloud (This is the one that disappears on the right) */}
          <g fill="#ffffff" opacity="0.9">
            <circle cx="400" cy="65" r="22" />
            <circle cx="430" cy="55" r="26" />
            <circle cx="370" cy="70" r="18" />
            <rect x="370" y="65" width="60" height="20" rx="10" />
          </g>

          {/* Far Hills */}
          <path d="M-50 220 Q120 150 280 200 T600 210 L600 375 L-50 375 Z" fill="url(#hill-grad-1)" opacity="0.8" />

          {/* Tree Trunk */}
          <rect x="300" y="160" width="45" height="150" fill="#78350f" rx="5" />
          {/* Tree Canopy */}
          <circle cx="320" cy="140" r="65" fill="url(#tree-grad)" />
          <circle cx="270" cy="120" r="45" fill="url(#tree-grad)" opacity="0.9" />
          <circle cx="370" cy="110" r="50" fill="url(#tree-grad)" opacity="0.95" />

          {/* Apple (Left is Red Apple) */}
          <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            {/* Red Apple leaf/stem */}
            <path d="M325 180 Q328 170 330 172" stroke="#15803d" strokeWidth="2" fill="none" />
            <ellipse cx="328" cy="171" rx="4" ry="2" fill="#22c55e" transform="rotate(-15 328 171)" />
            {/* Red Apple Body */}
            <circle cx="325" cy="185" r="12" fill="#ef4444" />
            <circle cx="321" cy="183" r="3" fill="#fca5a5" opacity="0.6" />
          </g>

          {/* Fences */}
          <g stroke="#b45309" strokeWidth="5" strokeLinecap="round">
            <line x1="0" y1="260" x2="500" y2="260" />
            {/* vertical bars */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={i} x1={40 + i * 52} y1="230" x2={40 + i * 52} y2="290" />
            ))}
          </g>

          {/* Near Hill */}
          <path d="M-50 280 Q180 240 380 280 T600 300 L600 375 L-50 375 Z" fill="url(#hill-grad-2)" />

          {/* Little bird on fence (Left has active red bird) */}
          <g transform="translate(240, 222)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            {/* Tail */}
            <path d="M -10 15 L -18 20 L -12 8 Z" fill="#b91c1c" />
            {/* Body */}
            <ellipse cx="0" cy="10" rx="11" ry="8" fill="#ef4444" />
            {/* Head */}
            <circle cx="10" cy="5" r="7" fill="#ef4444" />
            {/* Beak */}
            <polygon points="17,3 21,5 17,7" fill="#f59e0b" />
            {/* Eye */}
            <circle cx="8" cy="4" r="1" fill="#000000" />
            {/* Wing */}
            <path d="M -2 10 Q -6 6 2 4 Z" fill="#991b1b" />
            {/* Leg */}
            <line x1="-1" y1="17" x2="-3" y2="23" stroke="#451a03" strokeWidth="1.5" />
            <line x1="2" y1="17" x2="2" y2="23" stroke="#451a03" strokeWidth="1.5" />
          </g>

          {/* Tulip flowers on foreground (Left has yellow tulip) */}
          <g transform="translate(80, 290)">
            {/* Stem & Leaves */}
            <path d="M10 30 Q8 10 10 0" stroke="#166534" strokeWidth="3" fill="none" />
            <path d="M0 25 Q15 20 8 10" stroke="#166534" strokeWidth="2" fill="none" />
            {/* Tulip Head - Yellow */}
            <path d="M4 2 C4 -5 16 -5 16 2 C16 10 4 10 4 2" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <path d="M10 -2 L10 6" stroke="#ca8a04" strokeWidth="1" />
          </g>

          {/* Decor Flowers (other tulips) */}
          <g transform="translate(140, 310)">
            <path d="M10 20 Q12 10 10 0" stroke="#166534" strokeWidth="3" fill="none" />
            <path d="M4 2 C4 -5 16 -5 16 2 C16 10 4 10 4 2" fill="#a855f7" stroke="#7e22ce" strokeWidth="1" />
          </g>
          <g transform="translate(380, 315)">
            <path d="M10 20 Q5 10 10 0" stroke="#166534" strokeWidth="3" fill="none" />
            <path d="M4 2 C4 -5 16 -5 16 2 C16 10 4 10 4 2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
          </g>

          {/* Blue Butterfly on left sky */}
          <g transform="translate(175, 90)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.15))">
            {/* Wings */}
            <ellipse cx="-10" cy="-6" rx="11" ry="7" fill="#60a5fa" transform="rotate(-15 -10 -6)" />
            <ellipse cx="10" cy="-6" rx="11" ry="7" fill="#60a5fa" transform="rotate(15 10 -6)" />
            <ellipse cx="-7" cy="5" rx="7" ry="5" fill="#2563eb" transform="rotate(-10 -7 5)" />
            <ellipse cx="7" cy="5" rx="7" ry="5" fill="#2563eb" transform="rotate(10 7 5)" />
            {/* Body */}
            <rect x="-2" y="-12" width="4" height="24" rx="2" fill="#1e293b" />
            {/* Antennae */}
            <path d="M-1 -12 Q-5 -20 -10 -18" stroke="#1e293b" strokeWidth="1.5" fill="none" />
            <path d="M1 -12 Q5 -20 10 -18" stroke="#1e293b" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      );
    },
    // Render the RIGHT image svg
    renderRight: ({ differences }) => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #bae6fd, #e0f2fe)" }}>
          <defs>
            <linearGradient id="hill-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="hill-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
            <linearGradient id="tree-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>

          {/* Sun */}
          <circle cx="60" cy="60" r="25" fill="#f97316" filter="drop-shadow(0 0 8px rgba(249,115,22,0.4))" />
          <circle cx="60" cy="60" r="20" fill="#facc15" />

          {/* Left Cloud */}
          <g fill="#ffffff" opacity="0.9">
            <circle cx="150" cy="50" r="20" />
            <circle cx="180" cy="45" r="25" />
            <circle cx="210" cy="50" r="18" />
            <rect x="150" y="50" width="60" height="20" rx="10" />
          </g>

          {/* Right Cloud -> MISSING DIFFERENCE #3 */}
          {/* We just do not render or draw a small faint mini cloud instead of none, to make it neat! */}
          <g fill="#ffffff" opacity="0.25">
             {/* Barely visible wisp, completely different */}
             <circle cx="410" cy="65" r="5" />
          </g>

          {/* Far Hills */}
          <path d="M-50 220 Q120 150 280 200 T600 210 L600 375 L-50 375 Z" fill="url(#hill-grad-1)" opacity="0.8" />

          {/* Tree Trunk */}
          <rect x="300" y="160" width="45" height="150" fill="#78350f" rx="5" />
          {/* Tree Canopy */}
          <circle cx="320" cy="140" r="65" fill="url(#tree-grad)" />
          <circle cx="270" cy="120" r="45" fill="url(#tree-grad)" opacity="0.9" />
          <circle cx="370" cy="110" r="50" fill="url(#tree-grad)" opacity="0.95" />

          {/* Green Pear (Right has Green Pear instead of Red Apple) -> DIFFERENCE #4 */}
          <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            {/* Green leaf */}
            <path d="M325 180 Q328 170 330 172" stroke="#15803d" strokeWidth="2" fill="none" />
            <ellipse cx="328" cy="171" rx="4" ry="2" fill="#16a34a" transform="rotate(-15 328 171)" />
            {/* Pear Body shape */}
            <path d="M325 174 C318 174 316 182 316 188 C316 198 320 202 325 202 C330 202 334 198 334 188 C334 182 332 174 325 174 Z" fill="#4ade80" />
            <ellipse cx="325" cy="190" rx="9" ry="11" fill="#4ade80" />
            {/* Spot shine */}
            <circle cx="322" cy="184" r="2.5" fill="#ffffff" opacity="0.5" />
          </g>

          {/* Fences */}
          <g stroke="#b45309" strokeWidth="5" strokeLinecap="round">
            <line x1="0" y1="260" x2="500" y2="260" />
            {/* vertical bars */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={i} x1="40 + i * 52" y1="230" x2="40 + i * 52" y2="290" />
            ))}
          </g>

          {/* Near Hill */}
          <path d="M-50 280 Q180 240 380 280 T600 300 L600 375 L-50 375 Z" fill="url(#hill-grad-2)" />

          {/* Little bird -> MISSING DIFFERENCE #5 */}
          {/* Red bird is completely gone on the right side! */}

          {/* Tulip flower on foreground (Right has RED tulip instead of Yellow) -> DIFFERENCE #2 */}
          <g transform="translate(80, 290)">
            {/* Stem & Leaves */}
            <path d="M10 30 Q8 10 10 0" stroke="#166534" strokeWidth="3" fill="none" />
            <path d="M0 25 Q15 20 8 10" stroke="#166534" strokeWidth="2" fill="none" />
            {/* Tulip Head - Red */}
            <path d="M4 2 C4 -5 16 -5 16 2 C16 10 4 10 4 2" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <path d="M10 -2 L10 6" stroke="#b91c1c" strokeWidth="1" />
          </g>

          {/* Decor Flowers (same) */}
          <g transform="translate(140, 310)">
            <path d="M10 20 Q12 10 10 0" stroke="#166534" strokeWidth="3" fill="none" />
            <path d="M4 2 C4 -5 16 -5 16 2 C16 10 4 10 4 2" fill="#a855f7" stroke="#7e22ce" strokeWidth="1" />
          </g>
          <g transform="translate(380, 315)">
            <path d="M10 20 Q5 10 10 0" stroke="#166534" strokeWidth="3" fill="none" />
            <path d="M4 2 C4 -5 16 -5 16 2 C16 10 4 10 4 2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
          </g>

          {/* Pink Butterfly on right sky (instead of Blue) -> DIFFERENCE #1 */}
          <g transform="translate(175, 90)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.15))">
            {/* Wings */}
            <ellipse cx="-10" cy="-6" rx="11" ry="7" fill="#f472b6" transform="rotate(-15 -10 -6)" />
            <ellipse cx="10" cy="-6" rx="11" ry="7" fill="#f472b6" transform="rotate(15 10 -6)" />
            <ellipse cx="-7" cy="5" rx="7" ry="5" fill="#db2777" transform="rotate(-10 -7 5)" />
            <ellipse cx="7" cy="5" rx="7" ry="5" fill="#db2777" transform="rotate(10 7 5)" />
            {/* Body */}
            <rect x="-2" y="-12" width="4" height="24" rx="2" fill="#1e293b" />
            {/* Antennae */}
            <path d="M-1 -12 Q-5 -20 -10 -18" stroke="#1e293b" strokeWidth="1.5" fill="none" />
            <path d="M1 -12 Q5 -20 10 -18" stroke="#1e293b" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      );
    }
  },
  {
    id: 2,
    title: "싱그러운 과일 바구니",
    description: "새콤달콤 알록달록한 생과일들이 가득한 바구니입니다. 바구니 근처에서 눈을 크게 뜨고 달라진 5곳을 클릭해보세요.",
    voiceGuide: "두 번째 단계, 싱그러운 과일 바구니입니다. 사과, 오렌지, 바나나, 포도가 들어있는 예쁜 바구니에서 틀린그림 5곳을 찾아보세요.",
    difficulty: "쉬움",
    differences: [
      {
        id: "basket_leaf",
        name: "오렌지의 초록 잎사귀",
        description: "왼쪽 귤은 상큼한 나뭇잎이 한 장 달려있는데, 오른쪽 귤은 떨어졌는지 잎사귀가 없어요!",
        x: 23,
        y: 73,
        radius: 8,
        found: false
      },
      {
        id: "basket_grape_count",
        name: "포도 송이 크기",
        description: "왼쪽 보라색 포도는 더 커다란 8송이인데, 오른쪽은 송이가 유독 자그마해요!",
        x: 52,
        y: 72,
        radius: 8,
        found: false
      },
      {
        id: "basket_banana_tip",
        name: "바나나 줄기 끝",
        description: "왼쪽 바나나는 싱싱하고 깨끗한데, 오른쪽 바나나 꼭지 부분은 검게 익은 반점이 나있어요!",
        x: 74,
        y: 70,
        radius: 8,
        found: false
      },
      {
        id: "basket_apple_bite",
        name: "사과 한 입 베어물기",
        description: "우와! 누가 오른쪽 빨간 사과만 아삭하게 한 입 베어먹었어요! 한 입 파인 자국을 찾아보세요.",
        x: 50,
        y: 43,
        radius: 8,
        found: false
      },
      {
        id: "basket_bug",
        name: "바구니 손잡이 무당벌레",
        description: "바구니 손잡이에 기어가던 노란색 꼬마 무당벌레가 오른쪽 바구니에서는 마실을 갔나 봐요!",
        x: 35,
        y: 28,
        radius: 7,
        found: false
      }
    ],
    renderLeft: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #fef3c7, #fef08a)" }}>
          {/* Table Surface */}
          <path d="M-50 250 H550 V400 H-50 Z" fill="#b45309" />
          <path d="M-50 250 Q250 270 550 250 L550 265 Q250 285 -50 265 Z" fill="#78350f" opacity="0.3" />

          {/* Wall background pattern (Soft stripe) */}
          <g stroke="#fef9c3" strokeWidth="4" opacity="0.4">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1={40 + i * 40} y1="0" x2={40 + i * 40} y2="250" />
            ))}
          </g>

          {/* Basket Back Shadow */}
          <ellipse cx="250" cy="235" rx="140" ry="30" fill="#451a03" opacity="0.4" />

          {/* Basket Back Rim (behind fruits) */}
          <path d="M120 220 Q250 250 380 220" fill="none" stroke="#78350f" strokeWidth="15" strokeLinecap="round" />

          {/* Fruits */}
          {/* Fruit 1: Orange (Left - with Green Leaf) */}
          <g transform="translate(115, 275)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))">
            {/* Green Leaf */}
            <path d="M5 -25 Q15 -42 -5 -40 Q-3 -30 5 -25" fill="#166534" />
            <line x1="5" y1="-25" x2="-2" y2="-36" stroke="#14532d" strokeWidth="1.5" />
            {/* Stem */}
            <line x1="0" y1="-25" x2="5" y2="-12" stroke="#78350f" strokeWidth="3" />
            {/* Orange body */}
            <circle cx="0" cy="0" r="32" fill="#f97316" />
            {/* Texture dots */}
            <circle cx="-12" cy="-10" r="1" fill="#ea580c" />
            <circle cx="12" cy="5" r="1" fill="#ea580c" />
            <circle cx="0" cy="15" r="1" fill="#ea580c" />
            <circle cx="-10" cy="12" r="1" fill="#ea580c" />
            <circle cx="10" cy="-12" r="1" fill="#ea580c" />
            {/* Brightness */}
            <ellipse cx="-10" cy="-10" rx="8" ry="4" fill="#ffedd5" opacity="0.4" transform="rotate(-30 -10 -10)" />
          </g>

          {/* Fruit 2: Banana (Yellow backdrop, goes behind grape & apple) */}
          <g transform="translate(370, 260)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.25))">
            {/* Unpeeled clean yellow Banana curve */}
            <path d="M-10 -70 Q50 -50 40 40 Q5 -10 -40 -35 Z" fill="#eab308" />
            {/* Tips and stem */}
            <path d="M-10 -70 C-15 -65 -15 -75 -10 -70" fill="#451a03" stroke="#451a03" strokeWidth="5" />
            <path d="M40 40 C43 45 35 45 40 40" fill="#451a03" stroke="#451a03" strokeWidth="5" />
            {/* Inner Banana streak */}
            <path d="M-4 -60 Q35 -40 28 25" stroke="#ca8a04" strokeWidth="2.5" fill="none" opacity="0.5" />
          </g>

          {/* Fruit 3: Purple Grapes */}
          <g transform="translate(260, 270)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
            {/* Grape Stem */}
            <path d="M0 -30 Q-10 -40 -5 -48" stroke="#451a03" strokeWidth="4" fill="none" />
            {/* Berries (Left is 8-berry cluster, full and big) */}
            <circle cx="15" cy="5" r="16" fill="#7e22ce" />
            <circle cx="-15" cy="5" r="16" fill="#6b21a8" />
            <circle cx="0" cy="15" r="16" fill="#581c87" />
            <circle cx="20" cy="-12" r="15" fill="#a855f7" />
            <circle cx="-20" cy="-12" r="15" fill="#7e22ce" />
            <circle cx="0" cy="-15" r="17" fill="#8b5cf6" />
            <circle cx="-5" cy="28" r="14" fill="#4c1d95" />
            <circle cx="12" cy="24" r="13" fill="#3b0764" />

            {/* Little grape shine dots */}
            <circle cx="4" cy="-22" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="21" cy="-18" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="-16" cy="-17" r="3" fill="#ffffff" opacity="0.5" />
          </g>

          {/* Fruit 4: Red Apple (Left - Whole Apple) */}
          <g transform="translate(250, 160)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
            {/* Apple Stem */}
            <path d="M0 -30 Q5 -45 15 -42" stroke="#451a03" strokeWidth="3.5" fill="none" />
            {/* Leaf */}
            <path d="M5 -38 Q20 -44 14 -32 Z" fill="#15803d" />
            {/* Apple body (whole on left) */}
            <path d="M-30 -20 C-35 15 -15 35 0 30 C15 35 35 15 30 -20 C25 -38 10 -35 0 -28 C-10 -35 -25 -38 -30 -20 Z" fill="#dc2626" />
            {/* Yellow speckles / shine */}
            <ellipse cx="-12" cy="-15" rx="7" ry="12" fill="#fca5a5" opacity="0.4" transform="rotate(-20 -12 -15)" />
            <circle cx="15" cy="5" r="2" fill="#facc15" opacity="0.5" />
            <circle cx="-15" cy="10" r="2" fill="#facc15" opacity="0.5" />
          </g>

          {/* Basket Front and Handle */}
          {/* Basket Handle */}
          <path d="M140 210 C140 80 360 80 360 210" fill="none" stroke="#92400e" strokeWidth="18" strokeLinecap="round" />
          <path d="M140 210 C140 80 360 80 360 210" fill="none" stroke="#d97706" strokeWidth="8" strokeLinecap="round" strokeDasharray="12 12" />

          {/* Cute Yellow Ladybug walking on the basket handle (Left - Ladybug here!) */}
          <g transform="translate(175, 105) rotate(-35)" filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.25))">
            {/* Body */}
            <ellipse cx="0" cy="0" rx="9" ry="7" fill="#facc15" />
            {/* Head */}
            <circle cx="9" cy="0" r="3.5" fill="#1e293b" />
            {/* Center line */}
            <line x1="-9" y1="0" x2="9" y2="0" stroke="#1e293b" strokeWidth="1.5" />
            {/* Dots */}
            <circle cx="-4" cy="-3" r="1.5" fill="#1e293b" />
            <circle cx="2" cy="-3" r="1.5" fill="#1e293b" />
            <circle cx="-4" cy="3" r="1.5" fill="#1e293b" />
            <circle cx="2" cy="3" r="1.5" fill="#1e293b" />
          </g>

          {/* Basket Front (Woven design overlay) */}
          <path d="M110 210 Q250 250 390 210 L370 290 Q250 325 130 290 Z" fill="#92400e" />
          <path d="M110 210 Q250 250 390 210" fill="none" stroke="#d97706" strokeWidth="8" />
          {/* Wicker cross hatch details using simple lines */}
          <g stroke="#78350f" strokeWidth="4" opacity="0.6">
            <path d="M130 230 Q250 260 370 230" fill="none" />
            <path d="M140 260 Q250 290 360 260" fill="none" />
            <path d="M150 290 Q250 315 350 290" fill="none" />
            <line x1="160" y1="220" x2="180" y2="300" />
            <line x1="210" y1="225" x2="230" y2="310" />
            <line x1="260" y1="225" x2="270" y2="312" />
            <line x1="310" y1="222" x2="310" y2="305" />
            <line x1="360" y1="215" x2="340" y2="295" />
          </g>
          {/* Rim light highlight */}
          <path d="M110 210 Q250 248 390 210" fill="none" stroke="#fef3c7" strokeWidth="3" opacity="0.3" />
        </svg>
      );
    },
    renderRight: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #fef3c7, #fef08a)" }}>
          {/* Table Surface */}
          <path d="M-50 250 H550 V400 H-50 Z" fill="#b45309" />
          <path d="M-50 250 Q250 270 550 250 L550 265 Q250 285 -50 265 Z" fill="#78350f" opacity="0.3" />

          {/* Wall background pattern (Soft stripe) */}
          <g stroke="#fef9c3" strokeWidth="4" opacity="0.4">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1={40 + i * 40} y1="0" x2={40 + i * 40} y2="250" />
            ))}
          </g>

          {/* Basket Back Shadow */}
          <ellipse cx="250" cy="235" rx="140" ry="30" fill="#451a03" opacity="0.4" />

          {/* Basket Back Rim */}
          <path d="M120 220 Q250 250 380 220" fill="none" stroke="#78350f" strokeWidth="15" strokeLinecap="round" />

          {/* Fruits */}
          {/* Fruit 1: Orange (Right - NO leaf) -> DIFFERENCE #1 */}
          <g transform="translate(115, 275)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))">
            {/* Stem is still there, but leaf is gone! */}
            <line x1="0" y1="-22" x2="3" y2="-12" stroke="#78350f" strokeWidth="3" />
            {/* Orange body */}
            <circle cx="0" cy="0" r="32" fill="#f97316" />
            {/* Texture dots */}
            <circle cx="-12" cy="-10" r="1" fill="#ea580c" />
            <circle cx="12" cy="5" r="1" fill="#ea580c" />
            <circle cx="0" cy="15" r="1" fill="#ea580c" />
            <circle cx="-10" cy="12" r="1" fill="#ea580c" />
            <circle cx="10" cy="-12" r="1" fill="#ea580c" />
            {/* Brightness */}
            <ellipse cx="-10" cy="-10" rx="8" ry="4" fill="#ffedd5" opacity="0.4" transform="rotate(-30 -10 -10)" />
          </g>

          {/* Fruit 2: Banana (Right has a black aging spot on the stem/꼭지!) -> DIFFERENCE #3 */}
          <g transform="translate(370, 260)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.25))">
            <path d="M-10 -70 Q50 -50 40 40 Q5 -10 -40 -35 Z" fill="#eab308" />
            {/* Main stem has huge dark brown spot on top neck */}
            <path d="M-10 -70 C-15 -65 -15 -75 -10 -70" fill="#451a03" stroke="#451a03" strokeWidth="5" />
            {/* Big black spot on upper tip */}
            <ellipse cx="-1" cy="-52" rx="6" ry="12" fill="#451a03" transform="rotate(25 -1 -52)" />
            <path d="M40 40 C43 45 35 45 40 40" fill="#451a03" stroke="#451a03" strokeWidth="5" />
            {/* Inner Banana streak */}
            <path d="M-4 -60 Q35 -40 28 25" stroke="#ca8a04" strokeWidth="2.5" fill="none" opacity="0.5" />
          </g>

          {/* Fruit 3: Purple Grapes (Right has smaller, 6-berry cluster - missing 2 background grape spheres!) -> DIFFERENCE #2 */}
          <g transform="translate(260, 270)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
            {/* Grape Stem */}
            <path d="M0 -30 Q-10 -40 -5 -48" stroke="#451a03" strokeWidth="4" fill="none" />
            {/* Berries (Right is smaller, missing the left lower grapes!) */}
            <circle cx="15" cy="5" r="16" fill="#7e22ce" />
            {/* Leftmost berry at (-15, 5) is missing/shrunk! */}
            <circle cx="0" cy="15" r="16" fill="#581c87" />
            <circle cx="20" cy="-12" r="15" fill="#a855f7" />
            <circle cx="-16" cy="-14" r="11" fill="#7e22ce" opacity="0.8" /> {/* smaller */}
            <circle cx="0" cy="-15" r="17" fill="#8b5cf6" />
            <circle cx="-5" cy="28" r="14" fill="#4c1d95" />
            {/* Lower Grape is smaller or missing */}

            {/* Little grape shine dots */}
            <circle cx="4" cy="-22" r="3" fill="#ffffff" opacity="0.6" />
            <circle cx="21" cy="-18" r="3" fill="#ffffff" opacity="0.6" />
          </g>

          {/* Fruit 4: Red Apple (Right - Bitten Apple!) -> DIFFERENCE #4 */}
          <g transform="translate(250, 160)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
            {/* Apple Stem */}
            <path d="M0 -30 Q5 -45 15 -42" stroke="#451a03" strokeWidth="3.5" fill="none" />
            {/* Leaf */}
            <path d="M5 -38 Q20 -44 14 -32 Z" fill="#15803d" />
            {/* Apple body with a clear circular BITE out of the lower-right side! */}
            {/* We code this by using a clipPath or shape operations: we draw subtraction bites. */}
            <path d="M-30 -20 C-35 15 -15 35 0 30 C10 30 18 20 20 12 C14 10 13 -1 18 -6 C14 -10 16 -18 21 -20 C25 -38 10 -35 0 -28 C-10 -35 -25 -38 -30 -20 Z" fill="#dc2626" />
            {/* Highlight the inner white flesh of the apple bite */}
            <path d="M20 12 C14 10 13 -1 18 -6 C14 -10 16 -18 21 -20 Q24 -15 25 -8 T21 12 Z" fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
            {/* Seeds visible in the bite */}
            <circle cx="20" cy="-7" r="1.5" fill="#451a03" />

            {/* Yellow speckles / shine */}
            <ellipse cx="-12" cy="-15" rx="7" ry="12" fill="#fca5a5" opacity="0.4" transform="rotate(-20 -12 -15)" />
            <circle cx="-15" cy="10" r="2" fill="#facc15" opacity="0.5" />
          </g>

          {/* Basket Front and Handle */}
          <path d="M140 210 C140 80 360 80 360 210" fill="none" stroke="#92400e" strokeWidth="18" strokeLinecap="round" />
          <path d="M140 210 C140 80 360 80 360 210" fill="none" stroke="#d97706" strokeWidth="8" strokeLinecap="round" strokeDasharray="12 12" />

          {/* Cute Yellow Ladybug -> MISSING DIFFERENCE #5 */}
          {/* Ladybug at (175, 105) is completely gone! */}

          {/* Basket Front (Woven design overlay) */}
          <path d="M110 210 Q250 250 390 210 L370 290 Q250 325 130 290 Z" fill="#92400e" />
          <path d="M110 210 Q250 250 390 210" fill="none" stroke="#d97706" strokeWidth="8" />
          {/* Wicker cross hatch details using simple lines */}
          <g stroke="#78350f" strokeWidth="4" opacity="0.6">
            <path d="M130 230 Q250 260 370 230" fill="none" />
            <path d="M140 260 Q250 290 360 260" fill="none" />
            <path d="M150 290 Q250 315 350 290" fill="none" />
            <line x1="160" y1="220" x2="180" y2="300" />
            <line x1="210" y1="225" x2="230" y2="310" />
            <line x1="260" y1="225" x2="270" y2="312" />
            <line x1="310" y1="222" x2="310" y2="305" />
            <line x1="360" y1="215" x2="340" y2="295" />
          </g>
          <path d="M110 210 Q250 248 390 210" fill="none" stroke="#fef3c7" strokeWidth="3" opacity="0.3" />
        </svg>
      );
    }
  },
  {
    id: 3,
    title: "평화로운 시골 풍경",
    description: "멀리 보이는 산과 따스한 시골 집, 정겨운 허수아비가 서 있는 가을 들판입니다. 5곳의 틀린 부분을 터치해보세요.",
    voiceGuide: "마지막 단계, 평화로운 시골 풍경입니다. 맑은 가을날, 귀여운 집과 허수아비가 지키고 있는 들판에서 서로 다른 다섯 자소를 맞추어 보세요.",
    difficulty: "보통",
    differences: [
      {
        id: "rural_smoke",
        name: "굴뚝에서 나오는 연기",
        description: "왼쪽 집의 빨간 굴뚝에선 뽀송뽀송한 따뜻한 하얀 불 연기가 피어오르는데, 오른쪽 집엔 연기가 안 나요!",
        x: 23,
        y: 26,
        radius: 8,
        found: false
      },
      {
        id: "rural_window",
        name: "집 창문의 불빛",
        description: "왼쪽 집 창문은 방에 불을 켜두어 노란빛인데, 오른쪽 집 창문은 외출하셨는지 깜깜한 불이 꺼진 상태예요!",
        x: 33,
        y: 65,
        radius: 8,
        found: false
      },
      {
        id: "rural_sunflower",
        name: "울타리 옆 해바라기",
        description: "빳빳하게 고개를 세우고 하늘을 바라보던 해바라기가, 오른쪽에서는 고개를 힘없이 푹 숙이고 자고 있어요!",
        x: 75,
        y: 68,
        radius: 8,
        found: false
      },
      {
        id: "rural_dragonfly",
        name: "날아다니는 고추잠자리",
        description: "하늘에 유유히 날아가는 붉은 고추잠자리가 한 마리 보였는데, 오른쪽 하늘에는 아무것도 없어요!",
        x: 78,
        y: 20,
        radius: 8,
        found: false
      },
      {
        id: "rural_hat",
        name: "허수아비 모자 색깔",
        description: "왼쪽 허수아비는 가을 들판과 어울리는 주황모자를 썼는데, 오른쪽 허수아비는 아주 세련된 파란 선원 모자를 쓰고 있네요!",
        x: 52,
        y: 48,
        radius: 9,
        found: false
      }
    ],
    renderLeft: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #bae6fd, #e0f2fe)" }}>
          {/* Mountains in background */}
          <path d="M-50 200 L120 120 L280 180 L420 130 L550 210 L550 375 L-50 375 Z" fill="#a1a1aa" opacity="0.4" />
          <path d="M-50 200 L100 130 L220 170 L340 100 L550 220 L550 375 L-50 375 Z" fill="#ca8a04" opacity="0.2" /> {/* Autumn tree color hill */}

          {/* Cozy House Background */}
          {/* House body */}
          <rect x="60" y="180" width="130" height="90" fill="#fef3c7" stroke="#78350f" strokeWidth="4" rx="4" />
          {/* Triangular Roof */}
          <polygon points="50,183 125,120 200,183" fill="#ea580c" stroke="#78350f" strokeWidth="4" strokeLinejoin="round" />
          {/* Red Chimney */}
          <rect x="80" y="130" width="20" height="40" fill="#dc2626" stroke="#78350f" strokeWidth="4" />
          {/* Chimney Top Rim */}
          <rect x="76" y="126" width="28" height="10" fill="#991b1b" stroke="#78350f" strokeWidth="3" />

          {/* Left Chimney Smoke (Active Left) */}
          <g fill="#ffffff" opacity="0.8">
            <circle cx="90" cy="105" r="10" />
            <circle cx="106" cy="95" r="14" />
            <circle cx="125" cy="88" r="16" />
          </g>

          {/* Window - Lit Yellow/Orange (Left Active) */}
          <rect x="135" y="210" width="35" height="35" fill="#fbbf24" stroke="#78350f" strokeWidth="3" rx="2" />
          {/* Window cross grids */}
          <line x1="152.5" y1="210" x2="152.5" y2="245" stroke="#78350f" strokeWidth="2.5" />
          <line x1="135" y1="227.5" x2="170" y2="227.5" stroke="#78350f" strokeWidth="2.5" />

          {/* Front Door */}
          <rect x="80" y="210" width="30" height="60" fill="#b45309" stroke="#78350f" strokeWidth="3" rx="2" />
          <circle cx="86" cy="240" r="3" fill="#fbbf24" />

          {/* Ground */}
          <path d="M-50 260 H550 V400 H-50 Z" fill="#eab308" /> {/* Golden Autumn Fields */}
          <path d="M-10 260 Q180 280 380 260 T600 270 L600 300 Q250 285 -50 300 Z" fill="#d97706" opacity="0.3" />

          {/* Scarecrow (Center-ish) */}
          <g transform="translate(260, 230)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))">
            {/* Wooden cross post */}
            <rect x="-4" y="0" width="8" height="90" fill="#78350f" />
            <rect x="-45" y="18" width="90" height="6" fill="#78350f" />
            
            {/* Straw sleeves */}
            <path d="M-40 22 L-30 22" stroke="#eab308" strokeWidth="8" strokeLinecap="round" />
            <path d="M30 22 L40 22" stroke="#eab308" strokeWidth="8" strokeLinecap="round" />
            
            {/* Shirt - Green */}
            <path d="M-30 20 L30 20 L22 65 L-22 65 Z" fill="#16a34a" stroke="#14532d" strokeWidth="3" />
            {/* Red button patch */}
            <rect x="-6" y="32" width="12" height="12" fill="#ef4444" rx="1" />
            <line x1="-3" y1="38" x2="3" y2="38" stroke="#ffffff" />
            <line x1="0" y1="35" x2="0" y2="41" stroke="#ffffff" />

            {/* Straw collar */}
            <path d="M-10 20 L10 20 L0 25 Z" fill="#facc15" />

            {/* Head - Burlap sack */}
            <circle cx="0" cy="2" r="16" fill="#fed7aa" stroke="#ca8a04" strokeWidth="3" />
            {/* Smiley eyes/mouth */}
            <path d="M-7 -2 Q-5 -5 -3 -2" stroke="#451a03" strokeWidth="2.5" fill="none" />
            <path d="M3 -2 Q5 -5 7 -2" stroke="#451a03" strokeWidth="2.5" fill="none" />
            <path d="M-6 6 Q0 12 6 6" stroke="#dc2626" strokeWidth="2.5" fill="none" />
            {/* Round red cheeks */}
            <circle cx="-9" cy="4" r="3.5" fill="#fca5a5" />
            <circle cx="9" cy="4" r="3.5" fill="#fca5a5" />

            {/* Hat - Left has ORANGE-BROWN Sun Hat */}
            <polygon points="-24,-8 24,-8 14,-26 -14,-26" fill="#c2410c" stroke="#78350f" strokeWidth="2" />
            <ellipse cx="0" cy="-6" rx="26" ry="4" fill="#ea580c" stroke="#78350f" strokeWidth="2.5" />
          </g>

          {/* Sunflower plants (Right margin) */}
          {/* Sunflower (Left has Upright Sunflower) */}
          <g transform="translate(375, 255)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            {/* Stem */}
            <path d="M0 60 Q-5 30 0 0" stroke="#166534" strokeWidth="4.5" fill="none" />
            {/* Leaves */}
            <path d="M-2 40 Q-20 30 -10 20 Z" fill="#15803d" />
            {/* Flower yellow petals */}
            <circle cx="0" cy="0" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
            {/* Inner seed grid */}
            <circle cx="0" cy="0" r="13" fill="#451a03" />
            <circle cx="0" cy="0" r="10" fill="#78350f" stroke="#eab308" strokeWidth="1" strokeDasharray="3 3" />
          </g>

          {/* Little decor flowers */}
          <g transform="translate(430, 290)">
            <path d="M0 30 L0 0" stroke="#166534" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#ec4899" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>

          {/* Red Dragonfly in left sky (Left Active) */}
          <g transform="translate(390, 75)" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.15))">
            {/* Long thin tail */}
            <rect x="-30" y="-1.5" width="32" height="3" rx="1.5" fill="#ef4444" />
            {/* Head */}
            <circle cx="4" cy="0" r="3.5" fill="#dc2626" />
            <circle cx="4" cy="-2" r="1.5" fill="#000000" />
            <circle cx="4" cy="2" r="1.5" fill="#000000" />
            {/* Transparent Wings */}
            <ellipse cx="-8" cy="-8" rx="14" ry="4" fill="#ffffff" opacity="0.65" transform="rotate(-35 -8 -8)" stroke="#ea580c" strokeWidth="0.5" />
            <ellipse cx="-8" cy="8" rx="14" ry="4" fill="#ffffff" opacity="0.65" transform="rotate(35 -8 8)" stroke="#ea580c" strokeWidth="0.5" />
          </g>
        </svg>
      );
    },
    renderRight: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #bae6fd, #e0f2fe)" }}>
          {/* Mountains in background */}
          <path d="M-50 200 L120 120 L280 180 L420 130 L550 210 L550 375 L-50 375 Z" fill="#a1a1aa" opacity="0.4" />
          <path d="M-50 200 L100 130 L220 170 L340 100 L550 220 L550 375 L-50 375 Z" fill="#ca8a04" opacity="0.2" />

          {/* Cozy House Background */}
          {/* House body */}
          <rect x="60" y="180" width="130" height="90" fill="#fef3c7" stroke="#78350f" strokeWidth="4" rx="4" />
          {/* Triangular Roof */}
          <polygon points="50,183 125,120 200,183" fill="#ea580c" stroke="#78350f" strokeWidth="4" strokeLinejoin="round" />
          {/* Red Chimney */}
          <rect x="80" y="130" width="20" height="40" fill="#dc2626" stroke="#78350f" strokeWidth="4" />
          {/* Chimney Top Rim */}
          <rect x="76" y="126" width="28" height="10" fill="#991b1b" stroke="#78350f" strokeWidth="3" />

          {/* Left Chimney Smoke -> GONE IN RIGHT -> DIFFERENCE #1 */}
          {/* We render no smoke circles at all! */}

          {/* Window - DARK PLUM/NAVY (Right - Turn Off Light) -> DIFFERENCE #2 */}
          <rect x="135" y="210" width="35" height="35" fill="#312e81" stroke="#78350f" strokeWidth="3" rx="2" />
          {/* Window cross grids */}
          <line x1="152.5" y1="210" x2="152.5" y2="245" stroke="#78350f" strokeWidth="2.5" />
          <line x1="135" y1="227.5" x2="170" y2="227.5" stroke="#78350f" strokeWidth="2.5" />

          {/* Front Door */}
          <rect x="80" y="210" width="30" height="60" fill="#b45309" stroke="#78350f" strokeWidth="3" rx="2" />
          <circle cx="86" cy="240" r="3" fill="#fbbf24" />

          {/* Ground */}
          <path d="M-50 260 H550 V400 H-50 Z" fill="#eab308" />
          <path d="M-10 260 Q180 280 380 260 T600 270 L600 300 Q250 285 -50 300 Z" fill="#d97706" opacity="0.3" />

          {/* Scarecrow (Right has BLUE Sailor/Stripe Hat) -> DIFFERENCE #5 */}
          <g transform="translate(260, 230)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))">
            {/* Wooden cross post */}
            <rect x="-4" y="0" width="8" height="90" fill="#78350f" />
            <rect x="-45" y="18" width="90" height="6" fill="#78350f" />
            
            {/* Straw sleeves */}
            <path d="M-40 22 L-30 22" stroke="#eab308" strokeWidth="8" strokeLinecap="round" />
            <path d="M30 22 L40 22" stroke="#eab308" strokeWidth="8" strokeLinecap="round" />
            
            {/* Shirt - Green */}
            <path d="M-30 20 L30 20 L22 65 L-22 65 Z" fill="#16a34a" stroke="#14532d" strokeWidth="3" />
            <rect x="-6" y="32" width="12" height="12" fill="#ef4444" rx="1" />
            <line x1="-3" y1="38" x2="3" y2="38" stroke="#ffffff" />
            <line x1="0" y1="35" x2="0" y2="41" stroke="#ffffff" />

            {/* Straw collar */}
            <path d="M-10 20 L10 20 L0 25 Z" fill="#facc15" />

            {/* Head - Burlap sack */}
            <circle cx="0" cy="2" r="16" fill="#fed7aa" stroke="#ca8a04" strokeWidth="3" />
            <path d="M-7 -2 Q-5 -5 -3 -2" stroke="#451a03" strokeWidth="2.5" fill="none" />
            <path d="M3 -2 Q5 -5 7 -2" stroke="#451a03" strokeWidth="2.5" fill="none" />
            <path d="M-6 6 Q0 12 6 6" stroke="#dc2626" strokeWidth="2.5" fill="none" />
            <circle cx="-9" cy="4" r="3.5" fill="#fca5a5" />
            <circle cx="9" cy="4" r="3.5" fill="#fca5a5" />

            {/* Hat - Sky Blue Sailor Hat */}
            <path d="M -23 -8 L 23 -8 L 16 -24 L -16 -24 Z" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="2" />
            <rect x="-14" y="-19" width="28" height="4" fill="#ffffff" />
            <ellipse cx="0" cy="-6" rx="25" ry="3" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
          </g>

          {/* Sunflower plants (Right has DROOPING Sunflower) -> DIFFERENCE #3 */}
          <g transform="translate(375, 255)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            {/* Drooping Stem */}
            <path d="M0 60 Q20 30 -5 -2" stroke="#166534" strokeWidth="4.5" fill="none" />
            {/* Leaves */}
            <path d="M8 40 Q25 35 15 25 Z" fill="#15803d" />
            {/* Drooping face (tilted way forward/down) */}
            <g transform="translate(-10, -5) rotate(45)">
              <circle cx="0" cy="0" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
              <circle cx="0" cy="0" r="13" fill="#451a03" />
              <circle cx="0" cy="0" r="10" fill="#78350f" stroke="#eab308" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          </g>

          {/* Little decor flowers */}
          <g transform="translate(430, 290)">
            <path d="M0 30 L0 0" stroke="#166534" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#ec4899" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>

          {/* Dragonfly -> MISSING IN RIGHT -> DIFFERENCE #4 */}
          {/* Completely empty sky! */}
        </svg>
      );
    }
  },
  {
    id: 4,
    title: "따뜻한 시골 아랫목방",
    description: "겨울철 따스한 구들장 아랫목에 고소한 군고구마와 따끈한 주전자가 놓인 방입니다. 달라진 5곳을 터치해보세요.",
    voiceGuide: "네 번째 단계, 따뜻한 시골 아랫목방입니다. 고소한 군고구마와 따스한 주전자, 전통 꽃무늬 베개가 있는 아랫목방에서 서로 다른 다섯 곳을 터치해 보세요.",
    difficulty: "쉬움",
    differences: [
      {
        id: "room_potatoes",
        name: "군고구마 접시 개수",
        description: "왼쪽 바구니엔 맛있는 군고구마가 3개 담겨있는데, 오른쪽 바구니엔 아쉽게도 2개밖에 없어요!",
        x: 28,
        y: 83,
        radius: 8,
        found: false
      },
      {
        id: "room_pillow",
        name: "목베개 꽃무늬 색깔",
        description: "왼쪽 꽃무늬 베개는 단아한 분홍색을 띠고 있는데, 오른쪽 베개는 산뜻한 하늘민트색을 띠고 있네요!",
        x: 76,
        y: 69,
        radius: 8,
        found: false
      },
      {
        id: "room_moon",
        name: "벽 족자 속 달의 모양",
        description: "왼쪽 동양화 족자 속 달은 풍성한 보름달인데, 오른쪽 족자 속의 달은 예쁜 반달(초승달)로 변했어요!",
        x: 50,
        y: 29,
        radius: 8,
        found: false
      },
      {
        id: "room_teapot_steam",
        name: "주전자의 김 여부",
        description: "오른쪽 주전자는 식어버렸는지 따끈한 하얀 김이 모락모락 피어나지 않고 조용합니다!",
        x: 50,
        y: 61,
        radius: 8,
        found: false
      },
      {
        id: "room_cup_color",
        name: "보리찻잔의 그릇 색깔",
        description: "왼쪽 찻그릇은 고상한 연청자빛 하늘색 찻잔인데, 오른쪽 그릇은 따스한 살구 주황빛 은은한 잔으로 되어있네요!",
        x: 39,
        y: 73,
        radius: 8,
        found: false
      }
    ],
    renderLeft: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #fafaf9, #e7e5e4)" }}>
          {/* Wall Structure - Traditional Hanji Room layout */}
          <rect x="0" y="0" width="500" height="25" fill="#78350f" />
          <rect x="40" y="25" width="20" height="350" fill="#78350f" opacity="0.85" />
          <rect x="440" y="25" width="20" height="350" fill="#78350f" opacity="0.85" />
          
          {/* Paper Floor Line (Wall Bottom wood border) */}
          <rect x="0" y="250" width="500" height="15" fill="#a16207" />
          
          {/* Yellow Paper Floor "Aretmok Jangpan" */}
          <path d="M0 265 H500 V375 H0 Z" fill="#fef3c7" />
          <path d="M0 265 Q250 280 500 265 L500 270 Q250 286 0 270 Z" fill="#ca8a04" opacity="0.2" />

          {/* Oriental Moon Landscape Scroll Hanging on Wall */}
          <g filter="drop-shadow(0 4pt 6pt rgba(0,0,0,0.15))" transform="translate(0, 5)">
            {/* Scroll Silk Background */}
            <rect x="210" y="40" width="80" height="120" fill="#e2e8f0" stroke="#78350f" strokeWidth="2" rx="1" />
            <rect x="216" y="46" width="68" height="108" fill="#ffffff" />
            {/* Hanging Thread */}
            <path d="M210 40 L250 20 L290 40" stroke="#78350f" strokeWidth="2.5" fill="none" />
            {/* Scroll Mountains inside painting */}
            <path d="M216 130 L235 110 L250 125 L272 105 L284 125 L284 154 L216 154 Z" fill="#cbd5e1" />
            {/* Full Moon (Left - Yellow Full Moon) */}
            <circle cx="250" cy="80" r="14" fill="#fbbf24" />
          </g>

          {/* Sweet potato basket on floor */}
          <g transform="translate(140, 310)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))">
            {/* Basket under shadow */}
            <ellipse cx="0" cy="18" rx="28" ry="10" fill="#451a03" opacity="0.4" />
            {/* Basket */}
            <ellipse cx="0" cy="12" rx="24" ry="12" fill="#d97706" stroke="#92400e" strokeWidth="2" />
            {/* Three Gun-goguma (Left is 3 sweet potatoes) */}
            <ellipse cx="-10" cy="-2" rx="12" ry="7" fill="#7c2d12" transform="rotate(-15 -10 -2)" />
            <ellipse cx="8" cy="2" rx="11" ry="6" fill="#7c2d12" transform="rotate(20 8 2)" />
            <ellipse cx="-2" cy="7" rx="13" ry="7.5" fill="#9a3412" transform="rotate(5 -2 7)" />
            {/* Roasted cracks details */}
            <ellipse cx="-4" cy="7" rx="6" ry="2.5" fill="#fbbf24" opacity="0.8" />
            <circle cx="-5" cy="7" r="1" fill="#ea580c" />
          </g>

          {/* Cozy Low Tea Table (소반) */}
          <g transform="translate(250, 275)" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.2))">
            {/* Shadow of Table Legs */}
            <ellipse cx="0" cy="35" rx="55" ry="12" fill="#451a03" opacity="0.3" />
            {/* Carved Table legs */}
            <path d="M-55 20 L-62 42 H-50 L-45 20 Z" fill="#58290a" />
            <path d="M55 20 L62 42 H50 L45 20 Z" fill="#58290a" />
            <path d="M-15 20 L-10 44 H10 L15 20 Z" fill="#451a03" />
            {/* Soban Top Plate */}
            <ellipse cx="0" cy="18" rx="65" ry="16" fill="#78350f" />
            <ellipse cx="0" cy="15" rx="61" ry="14" fill="#92400e" />
            
            {/* Tea Cup - Sky Blue (Left) */}
            <g transform="translate(-25, 3)" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.15))">
              <path d="M-12 0 L12 0 L8 12 L-8 12 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="12" ry="3.5" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1" />
              {/* Green Tea Leaf inside cup */}
              <ellipse cx="2" cy="0" rx="3.5" ry="1.5" fill="#22c55e" transform="rotate(25 2 0)" />
            </g>

            {/* Brass Teapot (주전자) */}
            <g transform="translate(20, -10)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))">
              {/* Spout */}
              <path d="M-20 10 Q-32 -5 -35 5 Q-30 18 -15 14" fill="#d97706" />
              {/* Handle */}
              <path d="M-5 -12 Q0 -34 16 -30 Q28 -24 20 -5" fill="none" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" />
              {/* Pot Main sphere */}
              <circle cx="2" cy="10" r="18" fill="#f59e0b" />
              <ellipse cx="2" cy="10" rx="18" ry="14" fill="#facc15" />
              {/* Pot Lid */}
              <path d="M-10 -2 Q2 -8 14 -2 Z" fill="#d97706" />
              <circle cx="2" cy="-6" r="3.5" fill="#92400e" />
            </g>

            {/* 3 Hot Steam Lines wavy above teapot (Left is Active Steam) */}
            <g fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" transform="translate(5, -35)">
              <path d="M0 0 Q-5 -10 0 -20 Q5 -30 0 -40" />
              <path d="M12 2 Q7 -8 12 -18 Q17 -28 12 -38" />
              <path d="M-12 -2 Q-17 -12 -12 -22 Q-7 -32 -12 -42" />
            </g>
          </g>

          {/* Traditional Cylinder Flower Pillow "목베개" on right floor */}
          <g transform="translate(380, 260)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.18))">
            {/* Pillow Body - Left is Rose/Pink with embroidery */}
            <rect x="-35" y="-12" width="70" height="24" rx="12" fill="#ec4899" />
            {/* Center Yellow stripe */}
            <rect x="-10" y="-12" width="20" height="24" fill="#facc15" opacity="0.7" />
            {/* Wooden/Carved Round Ends */}
            <ellipse cx="-35" cy="0" rx="5" ry="12" fill="#be185d" />
            <ellipse cx="35" cy="0" rx="5" ry="12" fill="#be185d" />
            {/* Floral embroidery detail on center stripe */}
            <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
          </g>
        </svg>
      );
    },
    renderRight: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #fafaf9, #e7e5e4)" }}>
          {/* Wall Structure - Traditional Hanji Room layout */}
          <rect x="0" y="0" width="500" height="25" fill="#78350f" />
          <rect x="40" y="25" width="20" height="350" fill="#78350f" opacity="0.85" />
          <rect x="440" y="25" width="20" height="350" fill="#78350f" opacity="0.85" />
          
          {/* Paper Floor Line */}
          <rect x="0" y="250" width="500" height="15" fill="#a16207" />
          
          {/* Yellow Paper Floor */}
          <path d="M0 265 H500 V375 H0 Z" fill="#fef3c7" />
          <path d="M0 265 Q250 280 500 265 L500 270 Q250 286 0 270 Z" fill="#ca8a04" opacity="0.2" />

          {/* Oriental Moon Landscape Scroll -> Right has CRESCENT Moon, DIFFERENT #3 */}
          <g filter="drop-shadow(0 4pt 6pt rgba(0,0,0,0.15))" transform="translate(0, 5)">
            <rect x="210" y="40" width="80" height="120" fill="#e2e8f0" stroke="#78350f" strokeWidth="2" rx="1" />
            <rect x="216" y="46" width="68" height="108" fill="#ffffff" />
            <path d="M210 40 L250 20 L290 40" stroke="#78350f" strokeWidth="2.5" fill="none" />
            <path d="M216 130 L235 110 L250 125 L272 105 L284 125 L284 154 L216 154 Z" fill="#cbd5e1" />
            
            {/* Crescent Moon (Instead of Full Moon) */}
            <path d="M242 70 A14 14 0 1 0 266 84 A11 11 0 1 1 242 70" fill="#fbbf24" />
          </g>

          {/* Sweet potato basket -> Missing 1 sweet potato! 2 potatoes now, DIFFERENCE #1 */}
          <g transform="translate(140, 310)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))">
            <ellipse cx="0" cy="18" rx="28" ry="10" fill="#451a03" opacity="0.4" />
            <ellipse cx="0" cy="12" rx="24" ry="12" fill="#d97706" stroke="#92400e" strokeWidth="2" />
            
            {/* Only two sweet potatoes rendered */}
            <ellipse cx="6" cy="1" rx="11" ry="6" fill="#7c2d12" transform="rotate(22 6 1)" />
            <ellipse cx="-4" cy="6" rx="13" ry="7" fill="#9a3412" transform="rotate(2 -4 6)" />
            <ellipse cx="-5" cy="6" rx="6" ry="2.5" fill="#fbbf24" opacity="0.8" />
          </g>

          {/* Cozy Low Tea Table */}
          <g transform="translate(250, 275)" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.2))">
            <ellipse cx="0" cy="35" rx="55" ry="12" fill="#451a03" opacity="0.3" />
            <path d="M-55 20 L-62 42 H-50 L-45 20 Z" fill="#58290a" />
            <path d="M55 20 L62 42 H50 L45 20 Z" fill="#58290a" />
            <path d="M-15 20 L-10 44 H10 L15 20 Z" fill="#451a03" />
            <ellipse cx="0" cy="18" rx="65" ry="16" fill="#78350f" />
            <ellipse cx="0" cy="15" rx="61" ry="14" fill="#92400e" />
            
            {/* Tea Cup - Orange bowl instead of Sky Blue, DIFFERENT #5 */}
            <g transform="translate(-25, 3)" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.15))">
              <path d="M-12 0 L12 0 L8 12 L-8 12 Z" fill="#ffedd5" stroke="#f97316" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="12" ry="3.5" fill="#fdba74" stroke="#f97316" strokeWidth="1" />
              <ellipse cx="2" cy="0" rx="3.5" ry="1.5" fill="#22c55e" transform="rotate(25 2 0)" />
            </g>

            {/* Brass Teapot */}
            <g transform="translate(20, -10)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))">
              <path d="M-20 10 Q-32 -5 -35 5 Q-30 18 -15 14" fill="#d97706" />
              <path d="M-5 -12 Q0 -34 16 -30 Q28 -24 20 -5" fill="none" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="2" cy="10" r="18" fill="#f59e0b" />
              <ellipse cx="2" cy="10" rx="18" ry="14" fill="#facc15" />
              <path d="M-10 -2 Q2 -8 14 -2 Z" fill="#d97706" />
              <circle cx="2" cy="-6" r="3.5" fill="#92400e" />
            </g>

            {/* NO Steam Lines wavy above teapot -> DIFFERENT #4 */}
            {/* Deleted all steam rendering! */}
          </g>

          {/* Traditional Pillow -> Right has MINT-GREEN/BLUE instead of PINK, DIFFERENT #2 */}
          <g transform="translate(380, 260)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.18))">
            <rect x="-35" y="-12" width="70" height="24" rx="12" fill="#0d9488" /> {/* Mint-teal */}
            <rect x="-10" y="-12" width="20" height="24" fill="#facc15" opacity="0.7" />
            <ellipse cx="-35" cy="0" rx="5" ry="12" fill="#115e59" />
            <ellipse cx="35" cy="0" rx="5" ry="12" fill="#115e59" />
            <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="2.5" fill="#f43f5e" />
          </g>
        </svg>
      );
    }
  },
  {
    id: 5,
    title: "시원한 여름 바닷가",
    description: "새파란 파도가 넘실거리는 모래사장에 시원한 수박 에이드와 비치볼이 놓인 그림입니다. 5곳을 클릭해보세요.",
    voiceGuide: "다섯 번째 단계, 시원한 여름 바닷가입니다. 은빛 모래밭 위에 놓인 수박 화채와 튜브, 비치볼, 그리고 갈매기가 나는 바다에서 틀린 다섯 군데를 클릭해 보세요.",
    difficulty: "보통",
    differences: [
      {
        id: "beach_sailboat",
        name: "바다 돛단배의 돛 색상",
        description: "왼쪽 바다 멀리엔 귀여운 빨간색 돛단배가 흘러가는데, 오른쪽 그림엔 노란 돛단배가 흘러가고 있어요!",
        x: 76,
        y: 37,
        radius: 8,
        found: false
      },
      {
        id: "beach_starfish",
        name: "모래밭 수줍은 불가사리",
        description: "왼쪽 모래밭 구석엔 고운 분홍색 별 모양 불가사리가 쉬고 있는데, 오른쪽 그림엔 파란색 신비로운 불가사리가 있어요!",
        x: 20,
        y: 83,
        radius: 8,
        found: false
      },
      {
        id: "beach_ade_lemon",
        name: "음료수 컵 위의 노란 레몬",
        description: "오른쪽 시원한 수박주스 잔에는 왼쪽과 달리 새콤한 노란 동그라미 레몬 슬라이스가 쏙 빠져있답니다!",
        x: 44,
        y: 69,
        radius: 8,
        found: false
      },
      {
        id: "beach_ball",
        name: "동그란 비치볼 색상 무늬",
        description: "왼쪽 비치볼 무늬는 빨강과 노랑의 강렬한 무늬인데, 오른쪽 비치볼 무늬는 보라와 초록의 차분한 무늬예요!",
        x: 63,
        y: 81,
        radius: 8,
        found: false
      },
      {
        id: "beach_seagulls",
        name: "하늘 갈매기 마리 수",
        description: "왼쪽 맑은 구름 사이로 날아오르는 갈매기는 총 3마리인데, 오른쪽 하늘에는 2마리밖에 보이지 않아요!",
        x: 26,
        y: 21,
        radius: 8,
        found: false
      }
    ],
    renderLeft: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #38bdf8, #bae6fd)" }}>
          {/* Sunny rays background hints */}
          <circle cx="450" cy="50" r="30" fill="#facc15" opacity="0.6" filter="drop-shadow(0 0 10px rgba(250,204,21,0.5))" />
          
          {/* Seagulls flying high (Left is 3 birds) */}
          <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none">
            {/* Seagull 1 */}
            <path d="M110 70 Q120 62 130 70 Q140 62 150 70" />
            {/* Seagull 2 */}
            <path d="M145 92 Q152 86 160 92 Q168 86 175 92" />
            {/* Seagull 3 */}
            <path d="M85 85 Q92 78 100 85 Q108 78 116 85" />
          </g>

          {/* White Clouds */}
          <g fill="#ffffff" opacity="0.75" transform="translate(30, 0)">
            <ellipse cx="280" cy="70" rx="35" ry="12" />
            <circle cx="265" cy="62" r="16" />
          </g>

          {/* Deep Turquoise Ocean in center */}
          <path d="M-50 130 H550 V240 L-50 250 Z" fill="#0284c7" />
          {/* Waves detailing */}
          <path d="M0 135 C120 120 250 150 380 135 T550 135 L550 170 C380 185 250 155 120 170 Z" fill="#38bdf8" opacity="0.3" />
          <path d="M-50 160 Q200 130 550 170" fill="none" stroke="#e0f2fe" strokeWidth="3" opacity="0.6" strokeDasharray="30 15" />

          {/* Red Sailboat in right center ocean (Left - Red) */}
          <g transform="translate(380, 140)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))">
            <path d="M-15 0 C-15 10 15 10 15 0 Z" fill="#78350f" />
            {/* Mast */}
            <line x1="0" y1="0" x2="0" y2="-18" stroke="#451a03" strokeWidth="1.5" />
            {/* Red Sail */}
            <polygon points="0,-18 0,-2 -14,-4" fill="#ef4444" />
          </g>

          {/* Shore Wet Sand wave line */}
          <path d="M-50 230 Q250 210 550 235 L550 375 H-50 Z" fill="#fef08a" />
          <path d="M-50 230 Q250 210 550 235" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
          
          {/* Dry sandy beach */}
          <path d="M-55 242 Q250 220 555 248 L555 375 H-55 Z" fill="#fef3c7" />

          {/* Starfish - Left has pink starfish */}
          <g transform="translate(100, 310) scale(1.1)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            <polygon points="0,-12 3,-3 12,-3 5,2 8,11 0,6 -8,11 -5,2 -12,-3 -3,-3" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Watermelon Ade/Drink cup in sand */}
          <g transform="translate(220, 260)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
            {/* Straw */}
            <line x1="5" y1="-25" x2="16" y2="-42" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            {/* Lemon wheel on glass rim (Left has lemon) */}
            <circle cx="-14" cy="-18" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="-14" cy="-18" r="5" fill="#fef08a" />
            <line x1="-14" y1="-26" x2="-14" y2="-10" stroke="#ca8a04" strokeWidth="0.75" />
            <line x1="-22" y1="-18" x2="-6" y2="-18" stroke="#ca8a04" strokeWidth="0.75" />

            {/* Glass body */}
            <path d="M-15 -20 L15 -20 L10 20 C9 25 -9 25 -10 20 Z" fill="#ffffff" opacity="0.4" />
            <path d="M-13 -10 L13 -10 L9 18 C8 22 -8 22 -9 18 Z" fill="#f43f5e" /> {/* Watermelon red drink */}
            {/* Little watermelon seeds in glass */}
            <circle cx="-3" cy="2" r="1.5" fill="#1e293b" />
            <circle cx="4" cy="9" r="1.5" fill="#1e293b" />
            <circle cx="-2" cy="12" r="1.5" fill="#1e293b" />
          </g>

          {/* Playball / Beach ball - Left is Yellow and Red striped */}
          <g transform="translate(315, 305)" filter="drop-shadow(0 5px 8px rgba(0,0,0,0.25))">
            <circle cx="0" cy="0" r="25" fill="#f59e0b" />
            {/* Curved Red stripe left */}
            <path d="M-25 0 A25 25 0 0 1 25 0 Z" fill="#ef4444" transform="rotate(-40)" />
            {/* Center stripe */}
            <path d="M-25 0 A25 25 0 0 1 25 0 Z" fill="#ffffff" transform="rotate(20)" />
            {/* Smaller center clip circle to make balls shiny */}
            <circle cx="2" cy="2" r="25" fill="none" stroke="#2563eb" strokeWidth="0.5" opacity="0.1" />
            <circle cx="-8" cy="-8" r="6" fill="#ffffff" opacity="0.4" />
          </g>

          {/* Sandcastle on right edge */}
          <g transform="translate(420, 275)" fill="#eab308" opacity="0.9">
            <rect x="-24" y="10" width="48" height="30" rx="3" />
            <rect x="-14" y="-12" width="28" height="22" rx="2" />
            <polygon points="-24,10 -14,-12 14,-12 24,10" />
            {/* Tiny flags */}
            <line x1="0" y1="-12" x2="0" y2="-28" stroke="#78350f" strokeWidth="1.5" />
            <polygon points="0,-28 10,-24 0,-20" fill="#dc2626" />
          </g>
        </svg>
      );
    },
    renderRight: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #38bdf8, #bae6fd)" }}>
          {/* Sunny rays background hints */}
          <circle cx="450" cy="50" r="30" fill="#facc15" opacity="0.6" filter="drop-shadow(0 0 10px rgba(250,204,21,0.5))" />
          
          {/* Seagulls flying high -> Missing 1 bird, DIFFERENT #5 */}
          <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none">
            {/* Seagull 1 */}
            <path d="M110 70 Q120 62 130 70 Q140 62 150 70" />
            {/* Seagull 2 */}
            <path d="M145 92 Q152 86 160 92 Q168 86 175 92" />
            {/* Seagull 3 is completely gone! */}
          </g>

          {/* White Clouds */}
          <g fill="#ffffff" opacity="0.75" transform="translate(30, 0)">
            <ellipse cx="280" cy="70" rx="35" ry="12" />
            <circle cx="265" cy="62" r="16" />
          </g>

          {/* Deep Turquoise Ocean in center */}
          <path d="M-50 130 H550 V240 L-50 250 Z" fill="#0284c7" />
          {/* Waves detailing */}
          <path d="M0 135 C120 120 250 150 380 135 T550 135 L550 170 C380 185 250 155 120 170 Z" fill="#38bdf8" opacity="0.3" />
          <path d="M-50 160 Q200 130 550 170" fill="none" stroke="#e0f2fe" strokeWidth="3" opacity="0.6" strokeDasharray="30 15" />

          {/* Yellow Sailboat (Instead of Red Sailboat), DIFFERENT #1 */}
          <g transform="translate(380, 140)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))">
            <path d="M-15 0 C-15 10 15 10 15 0 Z" fill="#78350f" />
            <line x1="0" y1="0" x2="0" y2="-18" stroke="#451a03" strokeWidth="1.5" />
            {/* Yellow Sail */}
            <polygon points="0,-18 0,-2 -14,-4" fill="#fbbf24" />
          </g>

          {/* Shore Wet Sand wave line */}
          <path d="M-50 230 Q250 210 550 235 L550 375 H-50 Z" fill="#fef08a" />
          <path d="M-50 230 Q250 210 550 235" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
          
          {/* Dry sandy beach */}
          <path d="M-55 242 Q250 220 555 248 L555 375 H-55 Z" fill="#fef3c7" />

          {/* Starfish -> Blue starfish on right, DIFFERENT #2 */}
          <g transform="translate(100, 310) scale(1.1)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            <polygon points="0,-12 3,-3 12,-3 5,2 8,11 0,6 -8,11 -5,2 -12,-3 -3,-3" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Watermelon Ade/Drink cup -> NO Lemon on Rim, DIFFERENT #3 */}
          <g transform="translate(220, 260)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
            <line x1="5" y1="-25" x2="16" y2="-42" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            
            {/* Left lemon slice completely missing! */}

            {/* Glass body */}
            <path d="M-15 -20 L15 -20 L10 20 C9 25 -9 25 -10 20 Z" fill="#ffffff" opacity="0.4" />
            <path d="M-13 -10 L13 -10 L9 18 C8 22 -8 22 -9 18 Z" fill="#f43f5e" />
            <circle cx="-3" cy="2" r="1.5" fill="#1e293b" />
            <circle cx="4" cy="9" r="1.5" fill="#1e293b" />
            <circle cx="-2" cy="12" r="1.5" fill="#1e293b" />
          </g>

          {/* Beach ball -> Purple and Green striped, DIFFERENT #4 */}
          <g transform="translate(315, 305)" filter="drop-shadow(0 5px 8px rgba(0,0,0,0.25))">
            <circle cx="0" cy="0" r="25" fill="#22c55e" /> {/* green background */}
            <path d="M-25 0 A25 25 0 0 1 25 0 Z" fill="#a855f7" transform="rotate(-40)" /> {/* purple stripe */}
            <path d="M-25 0 A25 25 0 0 1 25 0 Z" fill="#ffffff" transform="rotate(20)" />
            <circle cx="2" cy="2" r="25" fill="none" stroke="#2563eb" strokeWidth="0.5" opacity="0.1" />
            <circle cx="-8" cy="-8" r="6" fill="#ffffff" opacity="0.4" />
          </g>

          {/* Sandcastle on right edge */}
          <g transform="translate(420, 275)" fill="#eab308" opacity="0.9">
            <rect x="-24" y="10" width="48" height="30" rx="3" />
            <rect x="-14" y="-12" width="28" height="22" rx="2" />
            <polygon points="-24,10 -14,-12 14,-12 24,10" />
            <line x1="0" y1="-12" x2="0" y2="-28" stroke="#78350f" strokeWidth="1.5" />
            <polygon points="0,-28 10,-24 0,-20" fill="#dc2626" />
          </g>
        </svg>
      );
    }
  },
  {
    id: 6,
    title: "정겨운 마당과 장독대",
    description: "은은한 고추잠자리가 날아다니고 처마밑에 풍경이 달린 마당 옆 옹기 장독대입니다. 달라진 5곳을 찾아보세요.",
    voiceGuide: "여섯 번째 단계, 정겨운 한옥 마당 옆 장독대입니다. 옹기종기 놓여있는 예쁜 검은 항아리, 처마 밑 물고기 종, 다소곳이 피어난 마당 화분에서 다른 곳 다섯 군데를 클릭해 보세요.",
    difficulty: "보통",
    differences: [
      {
        id: "jar_flower_drawing",
        name: "커다란 장독의 흰 들꽃 무늬",
        description: "왼쪽 가장 커다랗고 둥글둥글한 정면 대형 장독 정중앙엔 고운 하얀 들꽃 그림이 그려져 있는데, 오른쪽 장독엔 무늬가 지워져 흔적이 없어요!",
        x: 50,
        y: 82,
        radius: 8,
        found: false
      },
      {
        id: "jar_dragonfly",
        name: "하늘 고추잠자리 비행",
        description: "왼쪽 기와 아래 가을 하늘 높이 기분 좋게 비행하던 빨간 고추잠자리가, 오른쪽 그림에는 보이지 않고 멀리 날아가버렸어요!",
        x: 78,
        y: 29,
        radius: 8,
        found: false
      },
      {
        id: "jar_windchime",
        name: "처마의 매달린 은색 풍경 물고기",
        description: "왼쪽 장식 처마 끝에 매달려 귀여운 바람소리를 전하는 은빛 종의 아랫부분 귀여운 물고기 추(종이)가 오른쪽 그림에는 뚝 떨어져 없어요!",
        x: 16,
        y: 20,
        radius: 8,
        found: false
      },
      {
        id: "jar_mini_potted",
        name: "담장 위 미니 다육화분 꽃 색상",
        description: "왼쪽 가구 돌담 위 다육 미니화분에는 노란 야생화 꽃이 소박하게 피어있는데, 오른쪽 미니화분에는 보라색 꽃이 살며시 피어있네요!",
        x: 27,
        y: 57,
        radius: 8,
        found: false
      },
      {
        id: "jar_brick_leaves",
        name: "기와 틈새 담쟁이 잎사귀 수",
        description: "왼쪽 서까레 기와 틈새에 싱그럽게 매달린 담쟁이 잎사귀는 총 4잎사귀인데, 오른쪽 기와 벽 틈새에는 3잎사귀만 오밀조밀 달려있어요!",
        x: 42,
        y: 16,
        radius: 8,
        found: false
      }
    ],
    renderLeft: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #bae6fd, #e0f2fe)" }}>
          {/* Hanok Dark Tiled Roof (기와지붕 - top structural layout) */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.18))">
            <path d="M-10 40 L300 0 L510 30 L510 -10 L-10 -10 Z" fill="#3f3f46" />
            {/* Wooden beam supporters */}
            <rect x="0" y="30" width="16" height="30" fill="#78350f" />
            <rect x="110" y="16" width="18" height="32" fill="#78350f" />
            <rect x="230" y="5" width="20" height="32" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <rect x="350" y="10" width="18" height="32" fill="#78350f" />
            {/* Dark Tiled lines */}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={i} x1={-10 + i * 36} y1="12" x2={i * 36} y2="40" stroke="#18181b" strokeWidth="4.5" />
            ))}
          </g>

          {/* Ivy leaves on the roof center (Left has 4 leaves) */}
          <g transform="translate(210, 60)" fill="#16a34a">
            <path d="M-8 -5 Q0 -25 5 -10" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            <path d="M5 -15 L18 -32 L8 -12 Z" />
            <path d="M-15 -18 Q-2 -32 -4 -5" />
            <path d="M-22 2 L-34 -14 L-15 -4 M-15 -4 Z" />
          </g>

          {/* Wind Chime / "Pung-Gyeong" with Fish plate under roof left (Left is Whole chime with fish) */}
          <g transform="translate(80, 75)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.25))">
            {/* Hanging chain */}
            <line x1="0" y1="-30" x2="0" y2="0" stroke="#451a03" strokeWidth="2" />
            {/* Copper bell */}
            <path d="M-12 12 Q0 -5 12 12 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
            <line x1="0" y1="12" x2="0" y2="24" stroke="#78350f" strokeWidth="2.5" />
            {/* Fish clapper swinging path (Left includes fish shape) */}
            <path d="M-14 34 C-6 28 8 28 14 34 L12 40 C6 35 -6 35 -12 40 Z" fill="#d97706" />
            {/* Fish eye */}
            <circle cx="-6" cy="33" r="1.2" fill="#1e293b" />
          </g>

          {/* Stone wall (장독대 돌담) background */}
          <g transform="translate(0, 160)" fill="#d4d4d8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))">
            <path d="M0 60 Q250 40 500 60 L500 130 H0 Z" fill="#a1a1aa" />
            {/* Pebble borders */}
            <circle cx="50" cy="85" r="22" fill="#71717a" opacity="0.6" />
            <circle cx="110" cy="78" r="18" fill="#52525b" opacity="0.6" />
            <circle cx="160" cy="95" r="25" fill="#71717a" opacity="0.6" />
            <circle cx="230" cy="88" r="21" fill="#71717a" opacity="0.6" />
            <circle cx="290" cy="82" r="17" fill="#52525b" opacity="0.6" />
            <circle cx="360" cy="98" r="23" fill="#71717a" opacity="0.6" />
            <circle cx="430" cy="86" r="19" fill="#52525b" opacity="0.6" />
          </g>

          {/* Yellow wild flower pot sitting on the stone wall around (135, 215) -> Left is Yellow flower */}
          <g transform="translate(135, 215)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.15))">
            {/* Red Pot */}
            <path d="M-12 0 L12 0 L8 18 L-8 18 Z" fill="#b45309" />
            {/* Green Stem */}
            <line x1="0" y1="0" x2="0" y2="-12" stroke="#166534" strokeWidth="2.5" />
            {/* Flower yellow petals */}
            <circle cx="0" cy="-15" r="6" fill="#facc15" />
            <circle cx="0" cy="-15" r="2.5" fill="#ea580c" />
          </g>

          {/* Dirt Ground surface */}
          <path d="M-10 260 C120 250 380 250 510 260 L510 375 H-10 Z" fill="#e7e5e4" />
          <path d="M-10 260 Q250 280 510 260" fill="none" stroke="#d6d3d1" strokeWidth="6" opacity="0.4" />

          {/* Charcoal Jars (옹기 장독) clustered together */}
          {/* Jar 1: Medium Jar Left */}
          <g transform="translate(370, 290)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.22))">
            {/* Shadow */}
            <ellipse cx="0" cy="45" rx="25" ry="9" fill="#1c1917" opacity="0.3" />
            {/* Neck rim */}
            <ellipse cx="0" cy="-30" rx="16" ry="6" fill="#3f3f46" />
            <ellipse cx="0" cy="-34" rx="18" ry="4" fill="#27272a" />
            {/* Body */}
            <ellipse cx="0" cy="10" rx="28" ry="36" fill="#27272a" />
            {/* Highlights */}
            <ellipse cx="-12" cy="-4" rx="4" ry="16" fill="#d4d4d8" opacity="0.1" transform="rotate(-15 -12 -4)" />
          </g>

          {/* Jar 2: Gigantic Jar Center (Left with White Flower Painted) */}
          <g transform="translate(250, 310)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.25))">
            {/* Shadow */}
            <ellipse cx="0" cy="52" rx="38" ry="10" fill="#1c1917" opacity="0.35" />
            {/* Neck rim */}
            <ellipse cx="0" cy="-44" rx="24" ry="8" fill="#3f3f46" />
            <ellipse cx="0" cy="-48" rx="26" ry="5.5" fill="#18181b" />
            {/* Body */}
            <ellipse cx="0" cy="12" rx="44" ry="48" fill="#1e1b4b" />
            <ellipse cx="0" cy="12" rx="42" ry="46" fill="#27272a" />
            {/* Shiny vertical line */}
            <ellipse cx="-18" cy="-8" rx="6" ry="24" fill="#f4f4f5" opacity="0.12" transform="rotate(-18 -18 -8)" />
            
            {/* Decorative white/yellow wild daisy painted on jar (Left has this!) */}
            <g transform="translate(8, 6)">
              {/* Petals */}
              <circle cx="0" cy="-10" r="5" fill="#f8fafc" />
              <circle cx="-10" cy="0" r="5" fill="#f8fafc" />
              <circle cx="10" cy="0" r="5" fill="#f8fafc" />
              <circle cx="0" cy="10" r="5" fill="#f8fafc" />
              <circle cx="-7" cy="-7" r="5" fill="#e2e8f0" />
              <circle cx="7" cy="-7" r="5" fill="#e2e8f0" />
              <circle cx="-7" cy="7" r="5" fill="#e2e8f0" />
              <circle cx="7" cy="7" r="5" fill="#e2e8f0" />
              {/* Center yellow pistil */}
              <circle cx="0" cy="0" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
            </g>
          </g>

          {/* Jar 3: Small Jar Right */}
          <g transform="translate(190, 325)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.22))">
            <ellipse cx="0" cy="35" rx="18" ry="6" fill="#1c1917" opacity="0.3" />
            <ellipse cx="0" cy="-22" rx="12" ry="4" fill="#3f3f46" />
            <ellipse cx="0" cy="-25" rx="14" ry="3" fill="#18181b" />
            <ellipse cx="0" cy="10" rx="19" ry="25" fill="#27272a" />
          </g>

          {/* Red Dragonfly hovering in the upper right sky (Left has it active) */}
          <g transform="translate(390, 110)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            {/* Red Tail */}
            <rect x="-24" y="-1" width="26" height="2" fill="#ef4444" rx="1" />
            {/* Bulbous Head */}
            <circle cx="3" cy="0" r="2.8" fill="#dc2626" />
            <circle cx="3" cy="-1.5" r="1" fill="#000000" />
            <circle cx="3" cy="1.5" r="1" fill="#000000" />
            {/* Wings */}
            <ellipse cx="-6" cy="-6" rx="11" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(-30 -6 -6)" stroke="#ef4444" strokeWidth="0.5" />
            <ellipse cx="-6" cy="6" rx="11" ry="3" fill="#ffffff" opacity="0.6" transform="rotate(30 -6 6)" stroke="#ef4444" strokeWidth="0.5" />
          </g>
        </svg>
      );
    },
    renderRight: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #bae6fd, #e0f2fe)" }}>
          {/* Hanok Dark Tiled Roof */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.18))">
            <path d="M-10 40 L300 0 L510 30 L510 -10 L-10 -10 Z" fill="#3f3f46" />
            <rect x="0" y="30" width="16" height="30" fill="#78350f" />
            <rect x="110" y="16" width="18" height="32" fill="#78350f" />
            <rect x="230" y="5" width="20" height="32" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <rect x="350" y="10" width="18" height="32" fill="#78350f" />
            {/* Dark Tiled lines */}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={i} x1={-10 + i * 36} y1="12" x2={i * 36} y2="40" stroke="#18181b" strokeWidth="4.5" />
            ))}
          </g>

          {/* Ivy leaves -> Missing 1 leaf! Only 3 leaves here, DIFFERENT #5 */}
          <g transform="translate(210, 60)" fill="#16a34a">
            <path d="M-8 -5 Q0 -25 5 -10" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            <path d="M5 -15 L18 -32 L8 -12 Z" />
            {/* Leftmost ivy leaf details removed */}
            <path d="M-15 -18 Q-2 -32 -4 -5" />
          </g>

          {/* Wind Chime -> Right is MISSING the swinging fish plate! DIFFERENT #3 */}
          <g transform="translate(80, 75)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.25))">
            <line x1="0" y1="-30" x2="0" y2="0" stroke="#451a03" strokeWidth="2" />
            <path d="M-12 12 Q0 -5 12 12 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
            {/* Hanging chain without any fish tail leaf! */}
            <line x1="0" y1="12" x2="0" y2="18" stroke="#78350f" strokeWidth="2.5" />
          </g>

          {/* Stone wall background */}
          <g transform="translate(0, 160)" fill="#d4d4d8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))">
            <path d="M0 60 Q250 40 500 60 L500 130 H0 Z" fill="#a1a1aa" />
            <circle cx="50" cy="85" r="22" fill="#71717a" opacity="0.6" />
            <circle cx="110" cy="78" r="18" fill="#52525b" opacity="0.6" />
            <circle cx="160" cy="95" r="25" fill="#71717a" opacity="0.6" />
            <circle cx="230" cy="88" r="21" fill="#71717a" opacity="0.6" />
            <circle cx="290" cy="82" r="17" fill="#52525b" opacity="0.6" />
            <circle cx="360" cy="98" r="23" fill="#71717a" opacity="0.6" />
            <circle cx="430" cy="86" r="19" fill="#52525b" opacity="0.6" />
          </g>

          {/* Wild flower pot -> Right flower pot has VIOLET petals instead of Yellow, DIFFERENT #4 */}
          <g transform="translate(135, 215)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.15))">
            <path d="M-12 0 L12 0 L8 18 L-8 18 Z" fill="#b45309" />
            <line x1="0" y1="0" x2="0" y2="-12" stroke="#166534" strokeWidth="2.5" />
            {/* Flower violet petals */}
            <circle cx="0" cy="-15" r="6" fill="#a855f7" />
            <circle cx="0" cy="-15" r="2.5" fill="#e9d5ff" />
          </g>

          {/* Dirt Ground surface */}
          <path d="M-10 260 C120 250 380 250 510 260 L510 375 H-10 Z" fill="#e7e5e4" />
          <path d="M-10 260 Q250 280 510 260" fill="none" stroke="#d6d3d1" strokeWidth="6" opacity="0.4" />

          {/* Charcoal Jars (옹기 장독) */}
          <g transform="translate(370, 290)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.22))">
            <ellipse cx="0" cy="45" rx="25" ry="9" fill="#1c1917" opacity="0.3" />
            <ellipse cx="0" cy="-30" rx="16" ry="6" fill="#3f3f46" />
            <ellipse cx="0" cy="-34" rx="18" ry="4" fill="#27272a" />
            <ellipse cx="0" cy="10" rx="28" ry="36" fill="#27272a" />
            <ellipse cx="-12" cy="-4" rx="4" ry="16" fill="#d4d4d8" opacity="0.1" transform="rotate(-15 -12 -4)" />
          </g>

          {/* Gigantic Jar Center -> Right is PLAIN charter jar, NO PAINTED FLOWER, DIFFERENT #1 */}
          <g transform="translate(250, 310)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.25))">
            <ellipse cx="0" cy="52" rx="38" ry="10" fill="#1c1917" opacity="0.35" />
            <ellipse cx="0" cy="-44" rx="24" ry="8" fill="#3f3f46" />
            <ellipse cx="0" cy="-48" rx="26" ry="5.5" fill="#18181b" />
            <ellipse cx="0" cy="12" rx="44" ry="48" fill="#1e1b4b" />
            <ellipse cx="0" cy="12" rx="42" ry="46" fill="#27272a" />
            <ellipse cx="-18" cy="-8" rx="6" ry="24" fill="#f4f4f5" opacity="0.12" transform="rotate(-18 -18 -8)" />
            
            {/* Painted flower is completely gone from the jar body! */}
          </g>

          {/* Jar 3: Small Jar Right */}
          <g transform="translate(190, 325)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.22))">
            <ellipse cx="0" cy="35" rx="18" ry="6" fill="#1c1917" opacity="0.3" />
            <ellipse cx="0" cy="-22" rx="12" ry="4" fill="#3f3f46" />
            <ellipse cx="0" cy="-25" rx="14" ry="3" fill="#18181b" />
            <ellipse cx="0" cy="10" rx="19" ry="25" fill="#27272a" />
          </g>

          {/* Dragonfly -> GONE IN RIGHT -> DIFFERENT #2 */}
          {/* Completely empty right sky! */}
        </svg>
      );
    }
  },
  {
    id: 7,
    title: "눈 덮인 겨울 초가집",
    description: "새하얀 눈이 내려앉은 아담한 전통 초가집 마당에서 강아지가 놀고 감나무가 자란 그림입니다. 다름 5곳을 클릭해보세요.",
    voiceGuide: "일곱 번째 단계, 눈 덮인 겨울 초가집 마당입니다. 하얀 눈사람, 소복한 눈길, 나뭇가지 까치밥 감을 살펴보며 달라진 5곳을 터치해보세요.",
    difficulty: "보통",
    differences: [
      {
        id: "winter_magpie_persimmon",
        name: "감나무 위 새들을 위한 까치밥 감",
        description: "왼쪽 감나무 꼭대기에는 새들을 위해 아꼈던 고운 주황 단감(까치밥)이 3개 남아있는데, 오른쪽 기와 감나무에는 2개만 아쉽게 남아있어요!",
        x: 82,
        y: 29,
        radius: 8,
        found: false
      },
      {
        id: "winter_snowman_nose",
        name: "눈사람의 귀여운 주황색 당근 코",
        description: "오른쪽 눈사람은 귀여운 주황색 당근코가 간데없이 뚝 떨어졌는지 평평해서 동그라미 얼굴만 허전하게 남았어요!",
        x: 23,
        y: 73,
        radius: 8,
        found: false
      },
      {
        id: "winter_puppy_scarf",
        name: "아기 바둑이의 빨간 목도리",
        description: "왼쪽 바둑이는 칼바람을 마다 않고 예쁜 빨간 목도리를 칭칭 감고 감상 중인데, 오른쪽 바둑이는 목도리가 없어 추워 보여요!",
        x: 48,
        y: 83,
        radius: 8,
        found: false
      },
      {
        id: "winter_sparrow",
        name: "볏짚 단 위의 오동통 꼬마 참새",
        description: "왼쪽 바구니 볏짚 단 위에 도란도란 지저귀는 노란 참새가 단짝 2마리인데, 오른쪽에는 한 마리만 홀로 쓸쓸히 남았어요!",
        x: 63,
        y: 57,
        radius: 8,
        found: false
      },
      {
        id: "winter_chimney_smoke",
        name: "굴뚝 연기의 몽실몽실 뭉게구름 모양",
        description: "왼쪽 아늑한 초가집 굴뚝 구름 연기는 뭉게뭉게 동그랗게 뿜어오르는데, 오른쪽 연기는 일자로 단순하고 평범한 일직선 흐름이에요!",
        x: 42,
        y: 40,
        radius: 8,
        found: false
      }
    ],
    renderLeft: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #dbeafe, #eff6ff)" }}>
          {/* Drifting Snowflakes */}
          <g fill="#ffffff" opacity="0.6">
            <circle cx="50" cy="50" r="3" />
            <circle cx="120" cy="90" r="2.5" />
            <circle cx="280" cy="40" r="4.2" />
            <circle cx="340" cy="80" r="3.5" />
            <circle cx="180" cy="120" r="2" />
            <circle cx="450" cy="110" r="3" />
          </g>

          {/* Mountains in snow */}
          <path d="M-50 180 L180 110 L310 160 L450 110 L550 190 L550 375 L-50 375 Z" fill="#e2e8f0" />
          <path d="M-50 180 L140 120 L240 150 M240 150 L380 90 L550 195" fill="none" stroke="#cbd5e1" strokeWidth="3" />

          {/* Cozy Thatched-roof House (초가집) */}
          <g filter="drop-shadow(0 3px 5px rgba(0,0,0,0.12))">
            {/* Straw Wall */}
            <rect x="150" y="150" width="160" height="90" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
            <rect x="175" y="175" width="45" height="45" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
            {/* Window Grid */}
            <line x1="197.5" y1="175" x2="197.5" y2="220" stroke="#78350f" strokeWidth="1.5" />
            <line x1="175" y1="197.5" x2="220" y2="197.5" stroke="#78350f" strokeWidth="1.5" />
            
            {/* Clay/brick Chimney */}
            <rect x="270" y="115" width="16" height="40" fill="#a1a1aa" stroke="#52525b" strokeWidth="2.5" />

            {/* Puffing Cloud Smoke (Left is Rounded Spirals) */}
            <g fill="#ffffff" opacity="0.75" transform="translate(255, 60)">
              <circle cx="20" cy="40" r="11" />
              <circle cx="10" cy="25" r="16" />
              <circle cx="25" cy="15" r="20" />
            </g>

            {/* Straw Thatch-Roof with heavy snow layer */}
            <polygon points="135,152 230,95 325,152" fill="#eab308" stroke="#ca8a04" strokeWidth="3" strokeLinejoin="round" />
            {/* Snow thick blanket curve overlapping the roof */}
            <path d="M132 150 C132 150 180 110 230 110 C280 110 328 150 328 150 C328 150 310 135 230 135 C150 135 132 150 132 150 Z" fill="#ffffff" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.08))" />
          </g>

          {/* White Snowy Ground */}
          <path d="M-20 230 C200 215 350 215 520 230 L520 375 H-20 Z" fill="#ffffff" />
          {/* Snowy lawn curves shadows */}
          <path d="M-20 240 Q250 255 520 240" fill="none" stroke="#e0e7ff" strokeWidth="6" strokeLinecap="round" opacity="0.8" />

          {/* White cute SNOWMAN on left foreground */}
          <g transform="translate(115, 275)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.12))">
            {/* Body */}
            <circle cx="0" cy="20" r="24" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Head */}
            <circle cx="0" cy="-12" r="15" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Coal Eyes */}
            <circle cx="-5" cy="-15" r="2" fill="#1e293b" />
            <circle cx="5" cy="-15" r="2" fill="#1e293b" />
            {/* Snowman Red Bucket Hat */}
            <polygon points="-12,-24 12,-24 8,-38 -8,-38" fill="#ef4444" />
            {/* Carrot Orange nose (Left has Carrot nose) */}
            <polygon points="0,-12 12,-10 0,-8" fill="#f97316" />
            {/* Sweet smile dots */}
            <circle cx="-5" cy="-8" r="1" fill="#475569" />
            <circle cx="0" cy="-6" r="1" fill="#475569" />
            <circle cx="5" cy="-8" r="1" fill="#475569" />
          </g>

          {/* Sweet puppy "Baduki" sitting in center yard */}
          <g transform="translate(240, 310)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.15))">
            {/* Tails */}
            <path d="M-15 15 C-24 18 -20 5 -14 6 C-14 6 -15 15 -15 15 Z" fill="#d97706" />
            {/* Feet */}
            <ellipse cx="-8" cy="21" rx="4" ry="3" fill="#ffffff" stroke="#71717a" strokeWidth="0.5" />
            <ellipse cx="8" cy="21" rx="4" ry="3" fill="#ffffff" stroke="#71717a" strokeWidth="0.5" />
            {/* Puppy Body sphere */}
            <ellipse cx="0" cy="11" rx="14" ry="11" fill="#f59e0b" />
            <circle cx="-4" cy="9" r="4.5" fill="#1e293b" /> {/* black spot */}
            {/* Puppy Head */}
            <circle cx="6" cy="1" r="9.5" fill="#f59e0b" />
            <circle cx="3" cy="-1" r="3.5" fill="#1e293b" /> {/* black spot over ear */}
            {/* Nose snout */}
            <ellipse cx="11" cy="4" rx="3.5" ry="2.5" fill="#ffffff" />
            <circle cx="12" cy="2.5" r="1.5" fill="#000000" />
            {/* Cute black eyes */}
            <circle cx="6" cy="-2.5" r="1.2" fill="#1e293b" />

            {/* Knitted Cozy Red Scarf wrapped around neck (Left is Active Scarf!) */}
            <path d="M -3 6 L 12 7 Q 15 14 12 16 Q 8 18 2 11 Z" fill="#ef4444" />
            <rect x="0" y="8" width="6" height="11" fill="#dc2626" rx="1" transform="rotate(35 0 8)" />
          </g>

          {/* Persimmon Tree on Right edge holding red sweet persimmons */}
          <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.15))">
            {/* Main Branch */}
            <path d="M490 260 Q440 180 430 110 T400 30" stroke="#713f12" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M430 150 Q360 130 315 135" stroke="#713f12" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M410 90 Q380 75 350 85" stroke="#713f12" strokeWidth="3" strokeLinecap="round" fill="none" />
            
            {/* Snow piling on tree branches */}
            <path d="M430 148 Q360 128 315 133" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M410 88 Q380 73 350 83" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Sparrows (Left has 2 sparrows sitting on the branch) */}
            <g transform="translate(315, 215)" filter="drop-shadow(0 1.5px 2px rgba(0,0,0,0.12))">
              {/* Straw heap on ground */}
              <ellipse cx="0" cy="15" rx="18" ry="6" fill="#eab308" />
              {/* Sparrow 1 */}
              <g transform="translate(-6, 2)">
                <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#ca8a04" />
                <circle cx="4" cy="-3" r="3.5" fill="#ca8a04" />
                <polygon points="6,-4 9,-3 6,-2" fill="#f59e0b" />
                <path d="M-6 0 L-10 -3" stroke="#854d0e" strokeWidth="1.5" />
              </g>
              {/* Sparrow 2 */}
              <g transform="translate(10, 4) rotate(-10)">
                <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#ca8a04" />
                <circle cx="4" cy="-3" r="3.5" fill="#ca8a04" />
                <polygon points="6,-4 9,-3 6,-2" fill="#f59e0b" />
              </g>
            </g>

            {/* Persimmons "Kka-chi-bap" on upper branches (Left has 3 sweet persimmons) */}
            <g transform="translate(410, 110)">
              {/* Persimmon 1 */}
              <circle cx="-15" cy="-45" r="7.5" fill="#ea580c" />
              <polygon points="-15,-52 -13,-48 -17,-48" fill="#15803d" />
              {/* Persimmon 2 */}
              <circle cx="10" cy="-60" r="7" fill="#ea580c" />
              <polygon points="10,-67 12,-63 8,-63" fill="#15803d" />
              {/* Persimmon 3 */}
              <circle cx="-42" cy="-28" r="8" fill="#ea580c" />
              <polygon points="-42,-35 -40,-31 -44,-31" fill="#15803d" stroke="#166534" strokeWidth="0.5" />
            </g>
          </g>
        </svg>
      );
    },
    renderRight: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #dbeafe, #eff6ff)" }}>
          {/* Drifting Snowflakes */}
          <g fill="#ffffff" opacity="0.6">
            <circle cx="50" cy="50" r="3" />
            <circle cx="120" cy="90" r="2.5" />
            <circle cx="280" cy="40" r="4.2" />
            <circle cx="340" cy="80" r="3.5" />
            <circle cx="180" cy="120" r="2" />
            <circle cx="450" cy="110" r="3" />
          </g>

          {/* Mountains in snow */}
          <path d="M-50 180 L180 110 L310 160 L450 110 L550 190 L550 375 L-50 375 Z" fill="#e2e8f0" />
          <path d="M-50 180 L140 120 L240 150 M240 150 L380 90 L550 195" fill="none" stroke="#cbd5e1" strokeWidth="3" />

          {/* Cozy Thatched-roof House */}
          <g filter="drop-shadow(0 3px 5px rgba(0,0,0,0.12))">
            {/* Straw Wall */}
            <rect x="150" y="150" width="160" height="90" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
            <rect x="175" y="175" width="45" height="45" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
            <line x1="197.5" y1="175" x2="197.5" y2="220" stroke="#78350f" strokeWidth="1.5" />
            <line x1="175" y1="197.5" x2="220" y2="197.5" stroke="#78350f" strokeWidth="1.5" />
            
            {/* Clay/brick Chimney */}
            <rect x="270" y="115" width="16" height="40" fill="#a1a1aa" stroke="#52525b" strokeWidth="2.5" />

            {/* Straight Flat Chimney Smoke -> GONE IN SPIRALS -> DIFFERENT #5 */}
            <g fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.65" transform="translate(270, 60)">
              <line x1="8" y1="50" x2="8" y2="10" />
              <line x1="14" y1="45" x2="18" y2="18" />
            </g>

            {/* Straw Thatch-Roof with heavy snow layer */}
            <polygon points="135,152 230,95 325,152" fill="#eab308" stroke="#ca8a04" strokeWidth="3" strokeLinejoin="round" />
            <path d="M132 150 C132 150 180 110 230 110 C280 110 328 150 328 150 C328 150 310 135 230 135 C150 135 132 150 132 150 Z" fill="#ffffff" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.08))" />
          </g>

          {/* White Snowy Ground */}
          <path d="M-20 230 C200 215 350 215 520 230 L520 375 H-20 Z" fill="#ffffff" />
          <path d="M-20 240 Q250 255 520 240" fill="none" stroke="#e0e7ff" strokeWidth="6" strokeLinecap="round" opacity="0.8" />

          {/* Snowman -> NO Orange carrot nose on right, DIFFERENT #2 */}
          <g transform="translate(115, 275)" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.12))">
            <circle cx="0" cy="20" r="24" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="0" cy="-12" r="15" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="-5" cy="-15" r="2" fill="#1e293b" />
            <circle cx="5" cy="-15" r="2" fill="#1e293b" />
            <polygon points="-12,-24 12,-24 8,-38 -8,-38" fill="#ef4444" />
            
            {/* Carrot nose is completely gone! */}

            <circle cx="-5" cy="-8" r="1" fill="#475569" />
            <circle cx="0" cy="-6" r="1" fill="#475569" />
            <circle cx="5" cy="-8" r="1" fill="#475569" />
          </g>

          {/* Puppy "Baduki" -> Right puppy has NO Cozy Red Scarf, DIFFERENT #3 */}
          <g transform="translate(240, 310)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.15))">
            <path d="M-15 15 C-24 18 -20 5 -14 6 C-14 6 -15 15 -15 15 Z" fill="#d97706" />
            <ellipse cx="-8" cy="21" rx="4" ry="3" fill="#ffffff" stroke="#71717a" strokeWidth="0.5" />
            <ellipse cx="8" cy="21" rx="4" ry="3" fill="#ffffff" stroke="#71717a" strokeWidth="0.5" />
            <ellipse cx="0" cy="11" rx="14" ry="11" fill="#f59e0b" />
            <circle cx="-4" cy="9" r="4.5" fill="#1e293b" />
            <circle cx="6" cy="1" r="9.5" fill="#f59e0b" />
            <circle cx="3" cy="-1" r="3.5" fill="#1e293b" />
            <ellipse cx="11" cy="4" rx="3.5" ry="2.5" fill="#ffffff" />
            <circle cx="12" cy="2.5" r="1.5" fill="#000000" />
            <circle cx="6" cy="-2.5" r="1.2" fill="#1e293b" />

            {/* Red scarf elements deleted completely! */}
          </g>

          {/* Persimmon Tree */}
          <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.15))">
            <path d="M490 260 Q440 180 430 110 T400 30" stroke="#713f12" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M430 150 Q360 130 315 135" stroke="#713f12" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M410 90 Q380 75 350 85" stroke="#713f12" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M430 148 Q360 128 315 133" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M410 88 Q380 73 350 83" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Sparrows -> Right has ONLY 1 sparrow instead of 2, DIFFERENT #4 */}
            <g transform="translate(315, 215)" filter="drop-shadow(0 1.5px 2px rgba(0,0,0,0.12))">
              <ellipse cx="0" cy="15" rx="18" ry="6" fill="#eab308" />
              {/* Only Sparrow 1 remains */}
              <g transform="translate(-6, 2)">
                <ellipse cx="0" cy="0" rx="6" ry="4.5" fill="#ca8a04" />
                <circle cx="4" cy="-3" r="3.5" fill="#ca8a04" />
                <polygon points="6,-4 9,-3 6,-2" fill="#f59e0b" />
                <path d="M-6 0 L-10 -3" stroke="#854d0e" strokeWidth="1.5" />
              </g>
              {/* Sparrow 2 is completely removed! */}
            </g>

            {/* Ripe Persimmons -> Right has ONLY 2 sweet persimmons (3rd left is gone), DIFFERENT #1 */}
            <g transform="translate(410, 110)">
              <circle cx="-15" cy="-45" r="7.5" fill="#ea580c" />
              <polygon points="-15,-52 -13,-48 -17,-48" fill="#15803d" />
              <circle cx="10" cy="-60" r="7" fill="#ea580c" />
              <polygon points="10,-67 12,-63 8,-63" fill="#15803d" />
              
              {/* 3rd Persimmon on lower branch is deleted! */}
            </g>
          </g>
        </svg>
      );
    }
  },
  {
    id: 8,
    title: "푸른 밤하늘 추석 달맞이",
    description: "휘영청 엄청 밝고 둥그런 보름달 속에 방아 찧는 토끼와 알록달록 맛있는 송편 접시가 놓인 그림입니다. 5곳을 찾아보세요.",
    voiceGuide: "마지막 여덟 번째 단계, 은은한 추석 한가위 달맞이입니다. 보름달 속 귀여운 토끼, 고운 오색 송편 접시 등을 둘러보며 달라진 5곳을 맞추어 보세요.",
    difficulty: "보통",
    differences: [
      {
        id: "chuseok_rabbit_pestle",
        name: "달 속 토끼의 손에 든 물건",
        description: "왼쪽 구름 보름달 속 꼬마 토끼는 한옥 대형 절구공이를 쥐고 즐겁게 찧고 있는데, 오른쪽 달 속 토끼는 나물대신 고운 진분홍 예쁜 꽃가지를 들고 춤추고 있어요!",
        x: 50,
        y: 20,
        radius: 8,
        found: false
      },
      {
        id: "chuseok_songpyeon",
        name: "오색 송편 접시 중앙 송편 색깔",
        description: "왼쪽 정갈한 나무접시 정중앙에 놓인 맛난 큰송편은 예쁜 분홍 송편인데, 오른쪽 접시 정중앙 송편은 향긋한 초록 쑥송편이 놓여있네요!",
        x: 50,
        y: 77,
        radius: 8,
        found: false
      },
      {
        id: "chuseok_stars",
        name: "밤하늘 우측 상단 유인 은하수 별자리",
        description: "왼쪽 밤하늘 오른쪽 상단 귀퉁이에는 곱게 반짝이는 아담한 아기별이 3개 보였는데, 오른쪽 컴컴한 하늘에는 아기별이 2개만 반짝거려요!",
        x: 83,
        y: 16,
        radius: 8,
        found: false
      },
      {
        id: "chuseok_persimmon_color",
        name: "지붕 옆 감나무 단감의 어스름 색깔",
        description: "왼쪽 기와 지붕 옆 감나무 가지에는 탐스럽게 익은 주황 단감들이 매달려 있는데, 오른쪽 감나무 가지에는 아직 덜 익은 청황색 땡감이 매달려 있어요!",
        x: 18,
        y: 33,
        radius: 8,
        found: false
      },
      {
        id: "chuseok_grass_flower",
        name: "가을 들판 솔밭 하얀 들꽃",
        description: "왼쪽 쓸쓸한 솔잎 언덕 아래쪽에는 예쁜 하얀 들꽃 3송이가 지천으로 피어있는데, 오른쪽 들판 기슭에는 들꽃들이 마실을 갔는지 없답니다!",
        x: 20,
        y: 87,
        radius: 8,
        found: false
      }
    ],
    renderLeft: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #020617, #1e1b4b)" }}>
          {/* Constellation Stars in upper sky (Left has 3 stars at upper right) */}
          <g fill="#fef08a">
            <circle cx="410" cy="50" r="3.5" filter="drop-shadow(0 0 3px #facc15)" />
            <circle cx="430" cy="65" r="2.5" filter="drop-shadow(0 0 3px #facc15)" />
            <circle cx="395" cy="72" r="3" filter="drop-shadow(0 0 3px #facc15)" />
            
            <circle cx="70" cy="60" r="2" opacity="0.5" />
            <circle cx="120" cy="45" r="1.5" opacity="0.4" />
          </g>

          {/* Wispy Night Clouds */}
          <g fill="#475569" opacity="0.3">
            <ellipse cx="100" cy="110" rx="80" ry="12" />
            <ellipse cx="380" cy="130" rx="90" ry="15" />
          </g>

          {/* Giant full glowing moon centered (Location 250, 75 approx -> x: 50, y: 20%) */}
          <g filter="drop-shadow(0 0 25px rgba(253,224,71,0.5))">
            <circle cx="250" cy="75" r="55" fill="#fef08a" />
            <circle cx="250" cy="75" r="50" fill="#fef08a" opacity="0.9" />
            
            {/* Jade Rabbit Silhouette "달 속의 옥토끼" */}
            <g transform="translate(230, 55)" fill="#ca8a04" opacity="0.6">
              {/* Mortar box (절구통) */}
              <path d="M15 25 L35 25 L31 42 L19 42 Z" />
              {/* Rabbit Body */}
              <ellipse cx="6" cy="30" rx="8" ry="11" transform="rotate(-10 6 30)" />
              {/* Rabbit Head */}
              <circle cx="6" cy="14" r="6" />
              <ellipse cx="4" cy="5" rx="2.5" ry="7" transform="rotate(-15 4 5)" />
              <ellipse cx="8" cy="5" rx="2" ry="6.5" transform="rotate(5 8 5)" />
              {/* Pestle (절구공이 - Left holds golden stick pestle) */}
              <rect x="18" y="5" width="4" height="28" rx="1" fill="#78350f" transform="rotate(35 18 5)" />
            </g>
          </g>

          {/* Persimmon branch on left side around (x: 18, y: 33) -> Left has Orange Persimmons */}
          <g stroke="#451a03" strokeWidth="3" fill="none" transform="translate(0, -10)">
            <path d="M-10 130 C40 120 70 140 100 130" />
            <path d="M50 125 C70 100 90 95 110 100" />
            
            {/* Leaves */}
            <path d="M60 115 Q82 104 74 122 Z" fill="#065f46" stroke="none" />
            <path d="M90 120 Q105 106 102 128 Z" fill="#065f46" stroke="none" />

            {/* Fruits - Ripe Orange Sweet Persimmons */}
            <g fill="#f97316" stroke="none">
              <circle cx="45" cy="132" r="7.5" fill="#ea580c" />
              <polygon points="45,124 47,128 43,128" fill="#15803d" />
              <circle cx="95" cy="136" r="8" fill="#f97316" />
              <polygon points="95,128 97,132 93,132" fill="#15803d" />
              <circle cx="102" cy="105" r="6" fill="#f97316" />
            </g>
          </g>

          {/* Ground Hills - dark green silhouvettes */}
          <path d="M-20 250 Q180 230 350 248 T520 245 L520 375 H-20 Z" fill="#064e3b" />
          <path d="M-20 262 Q250 240 520 265 L520 375 H-20 Z" fill="#022c22" />

          {/* Left has 3 mini white flowers at the bottom grass hills (Location 100, 325 -> x: 20%) */}
          <g fill="#ffffff" transform="translate(100, 325)">
            <circle cx="-12" cy="3" r="3.5" />
            <circle cx="0" cy="0" r="3.5" />
            <circle cx="12" cy="5" r="3.5" />
            <circle cx="0" cy="0" r="1" fill="#facc15" />
            <circle cx="-12" cy="3" r="1" fill="#facc15" />
            <circle cx="12" cy="5" r="1" fill="#facc15" />
          </g>

          {/* Traditional wooden round bowl holding sweet Songpyeon on center grass foreground */}
          <g transform="translate(250, 290)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.4))">
            {/* Wooden Plate Shadow */}
            <ellipse cx="0" cy="22" rx="42" ry="10" fill="#020617" opacity="0.5" />
            {/* Soban / Plate base */}
            <ellipse cx="0" cy="12" rx="38" ry="14" fill="#5c2e0b" stroke="#3b1e06" strokeWidth="2" />
            <ellipse cx="0" cy="8" rx="34" ry="12" fill="#7c4214" />

            {/* Crescent Songpyeons inside flat bowl plate */}
            {/* Green Songpyeon on left */}
            <path d="M-22 2 C-26 -10 -8 -12 -8 0 C-8 8 -18 8 -22 2 Z" fill="#86efac" stroke="#166534" strokeWidth="1" transform="rotate(-15 -15 0)" />
            {/* Yellow Songpyeon on right */}
            <path d="M12 -4 C8 -16 26 -12 24 -2 C24 6 16 6 12 -4 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" transform="rotate(25 18 0)" />
            
            {/* Center Songpyeon - Pink (Left has Pink center songpyeon) */}
            <path d="M-10 -2 C-12 -15 12 -15 10 -2 C10 8 -2 8 -10 -2 Z" fill="#fbcfe8" stroke="#be185d" strokeWidth="1" />
          </g>
        </svg>
      );
    },
    renderRight: () => {
      return (
        <svg viewBox="0 0 500 375" className="w-full h-full select-none" style={{ background: "linear-gradient(to bottom, #020617, #1e1b4b)" }}>
          {/* Constellation Stars in upper sky -> Right has ONLY 2 stars at upper right, DIFFERENT #3 */}
          <g fill="#fef08a">
            <circle cx="410" cy="50" r="3.5" filter="drop-shadow(0 0 3px #facc15)" />
            <circle cx="430" cy="65" r="2.5" filter="drop-shadow(0 0 3px #facc15)" />
            {/* 3rd star at (395, 72) is removed completely! */}
            
            <circle cx="70" cy="60" r="2" opacity="0.5" />
            <circle cx="120" cy="45" r="1.5" opacity="0.4" />
          </g>

          {/* Wispy Night Clouds */}
          <g fill="#475569" opacity="0.3">
            <ellipse cx="100" cy="110" rx="80" ry="12" />
            <ellipse cx="380" cy="130" rx="90" ry="15" />
          </g>

          {/* Giant full glowing moon centered -> Right has Rabbit with a flower blossom instead of Pestle!, DIFFERENT #1 */}
          <g filter="drop-shadow(0 0 25px rgba(253,224,71,0.5))">
            <circle cx="250" cy="75" r="55" fill="#fef08a" />
            <circle cx="250" cy="75" r="50" fill="#fef08a" opacity="0.9" />
            
            <g transform="translate(230, 55)" fill="#ca8a04" opacity="0.6">
              {/* Mortar box (절구통) */}
              <path d="M15 25 L35 25 L31 42 L19 42 Z" />
              {/* Rabbit Body */}
              <ellipse cx="6" cy="30" rx="8" ry="11" transform="rotate(-10 6 30)" />
              {/* Rabbit Head */}
              <circle cx="6" cy="14" r="6" />
              <ellipse cx="4" cy="5" rx="2.5" ry="7" transform="rotate(-15 4 5)" />
              <ellipse cx="8" cy="5" rx="2" ry="6.5" transform="rotate(5 8 5)" />
              
              {/* Flowers Blossom twig in hand instead of golden wooden style pestle! */}
              <line x1="16" y1="20" x2="25" y2="8" stroke="#10b981" strokeWidth="2.2" />
              <circle cx="25" cy="8" r="4" fill="#ec4899" />
              <circle cx="22" cy="13" r="3" fill="#f472b6" />
            </g>
          </g>

          {/* Persimmon branch on left side -> Right has GREEN unripened Persimmons, DIFFERENT #4 */}
          <g stroke="#451a03" strokeWidth="3" fill="none" transform="translate(0, -10)">
            <path d="M-10 130 C40 120 70 140 100 130" />
            <path d="M50 125 C70 100 90 95 110 100" />
            
            <path d="M60 115 Q82 104 74 122 Z" fill="#065f46" stroke="none" />
            <path d="M90 120 Q105 106 102 128 Z" fill="#065f46" stroke="none" />

            {/* Unripened Yellow Green Persimmons */}
            <g fill="#eab308" stroke="none">
              <circle cx="45" cy="132" r="7.5" fill="#ca8a04" /> {/* yellow branch */}
              <polygon points="45,124 47,128 43,128" fill="#15803d" />
              <circle cx="95" cy="136" r="8" fill="#84cc16" /> {/* green check */}
              <polygon points="95,128 97,132 93,132" fill="#15803d" />
              <circle cx="102" cy="105" r="6" fill="#ca8a04" />
            </g>
          </g>

          {/* Ground Hills */}
          <path d="M-20 250 Q180 230 350 248 T520 245 L520 375 H-20 Z" fill="#064e3b" />
          <path d="M-20 262 Q250 240 520 265 L520 375 H-20 Z" fill="#022c22" />

          {/* Right is MISSING the 3 mini white flowers on the bottom grass hills! DIFFERENT #5 */}
          {/* Completely empty grass in right foreground */}

          {/* Songpyeon plate -> Right has GREEN center songpyeon instead of Pink, DIFFERENT #2 */}
          <g transform="translate(250, 290)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.4))">
            <ellipse cx="0" cy="22" rx="42" ry="10" fill="#020617" opacity="0.5" />
            <ellipse cx="0" cy="12" rx="38" ry="14" fill="#5c2e0b" stroke="#3b1e06" strokeWidth="2" />
            <ellipse cx="0" cy="8" rx="34" ry="12" fill="#7c4214" />

            {/* Crescent Songpyeons */}
            <path d="M-22 2 C-26 -10 -8 -12 -8 0 C-8 8 -18 8 -22 2 Z" fill="#86efac" stroke="#166534" strokeWidth="1" transform="rotate(-15 -15 0)" />
            <path d="M12 -4 C8 -16 26 -12 24 -2 C24 6 16 6 12 -4 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" transform="rotate(25 18 0)" />
            
            {/* Center Songpyeon - Green ssup (Instead of Pink) */}
            <path d="M-10 -2 C-12 -15 12 -15 10 -2 C10 8 -2 8 -10 -2 Z" fill="#4ade80" stroke="#15803d" strokeWidth="1" />
          </g>
        </svg>
      );
    }
  }
];

