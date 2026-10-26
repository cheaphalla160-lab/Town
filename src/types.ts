export type LocationType = 'town' | 'city';

export interface HidingSpot {
  id: string;
  name: string;
  location: LocationType;
  xPercent: number; // 5% to 90%
  yPercent: number; // 15% to 80%
  scale?: number;
  rotation?: number;
  hidingFeature: string; // e.g. "behind the windmill", "behind the skyscraper"
}

export interface GameSettings {
  speedSeconds: number; // time clown stays in one spot before moving
  speedPreset: 'gentle' | 'normal' | 'fast' | 'turbo' | 'custom';
  autoAdvanceAfterRead: boolean;
  classroomMode: boolean; // extra large text, smartboard friendly
  soundFxEnabled: boolean;
  bgmEnabled: boolean;
  voiceRate: number;
}

export interface PlayerScore {
  id: string;
  name: string;
  avatar: string;
  score: number;
  roundsPlayed: number;
  stars: number;
  accuracy: number;
  date: string;
}

export interface RoundResult {
  roundNumber: number;
  targetLocation: LocationType;
  spot: HidingSpot;
  found: boolean;
  timeTakenMs: number;
  readPracticed: boolean;
  sentence: string;
}
