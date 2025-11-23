
import type React from 'react';

export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export interface VictimInfo {
  name: string;
  imageUrl: string;
  device: string;
  carrier: string;
  location: Location;
  dob: string;
  address: string;
  stateOfOrigin: string;
  network1: string;
  network2: string;
  imei: string;
  imei2: string;
  iccid: string;
  meid: string;
  eid: string;
}

export interface LogEntry {
  id: number;
  message: string;
  status: 'running' | 'success' | 'failure';
  icon: React.ReactNode;
  delay?: number;
}

export interface CloningHistoryItem {
  timestamp: string;
  detectedImei: string;
  status: string;
  location: string;
}

export interface CallLogItem {
  id: number;
  type: 'incoming' | 'outgoing' | 'missed';
  timestamp: string;
  duration: string;
  hash: string;
  maskedNumber: string;
}

export interface AnalysisResult {
  threatLevel: 'High' | 'Medium' | 'Low' | 'None';
  summary: string;
  details: { key: string; value: string }[];
  victimInfo: VictimInfo;
  attackerLocation: Location;
  cloningHistory: CloningHistoryItem[];
  callLogs: CallLogItem[];
}

export interface PhoneNumberInputProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  error: string;
}

export interface AnalysisLogProps {
  logs: LogEntry[];
}

export interface ResultsDisplayProps {
  result: AnalysisResult | null;
  onShowLogs: () => void;
}

export interface VictimInfoDisplayProps {
  victimInfo: VictimInfo;
  phoneNumber: string;
}
