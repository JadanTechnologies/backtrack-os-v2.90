
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

export interface NetworkPacket {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
  payload: string; // Hex snippet
  headers: Record<string, string>; // Detailed headers
  hexDump: string; // Full hex view
}

export interface LocationHistoryItem {
  id: number;
  timestamp: string;
  lat: number;
  lon: number;
  locationName: string;
  accuracy: string;
  trigger: 'Tower Triangulation' | 'GPS Pinging' | 'WiFi Handshake';
}

export interface ImeiTrackingResult {
  deviceModel: string;
  imei: string;
  status: 'Active' | 'Inactive' | 'Blacklisted';
  batteryLevel: string;
  lastActive: string;
  locationHistory: LocationHistoryItem[];
  hardwareInfo: {
    manufacturer: string;
    serialNumber: string;
    productionDate: string;
    bootloaderStatus: string;
  };
}

export interface AnalysisResult {
  threatLevel: 'High' | 'Medium' | 'Low' | 'None';
  summary: string;
  details: { key: string; value: string }[];
  victimInfo: VictimInfo;
  attackerLocation: Location;
  cloningHistory: CloningHistoryItem[];
  callLogs: CallLogItem[];
  networkTraffic: NetworkPacket[];
}

export interface PhoneNumberInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  error: string;
  mode: 'PHONE' | 'IMEI';
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
