import type React from 'react';

export interface VictimInfo {
  name: string;
  imageUrl: string;
  device: string;
  carrier: string;
  location: string;
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

export interface AnalysisResult {
  threatLevel: 'High' | 'Medium' | 'Low' | 'None';
  summary: string;
  details: { key: string; value: string }[];
  victimInfo: VictimInfo;
  attackerLocation: string;
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