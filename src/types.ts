import React from 'react';

export interface Difference {
  id: string;
  name: string; // The Korean name of the difference, e.g., "나비 색상"
  description: string; // Dynamic narrative description, e.g., "왼쪽은 파란 나비인데, 오른쪽은 분홍 나비예요!"
  x: number; // Percentage coordinate X (0-100) or pixel value
  y: number; // Percentage coordinate Y (0-100) or pixel value
  radius: number; // Detection radius in percentage units or pixel bounds
  found: boolean;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  voiceGuide: string;
  difficulty: "매우 쉬움" | "쉬움" | "보통";
  differences: Difference[];
  renderLeft: (props: { differences: Difference[] }) => React.ReactNode;
  renderRight: (props: { differences: Difference[] }) => React.ReactNode;
}

export interface GameSettings {
  isHealingMode: boolean; // Healing mode has no timer
  isVoiceEnabled: boolean; // Read aloud text using Web Speech API
  textSize: "normal" | "large" | "extra-large"; // UI text size adjustments
  soundVolume: number; // 0 to 100
}
