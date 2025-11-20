import React from 'react';
import type { LogEntry, AnalysisResult } from './types';

// Icon Components
export const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const AlertTriangleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export const ServerIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

export const WifiIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.562a4.5 4.5 0 017.778 0M12 20.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.875 12.125a9.75 9.75 0 0114.25 0M1.625 7.875a14.25 14.25 0 0120.75 0" />
  </svg>
);

export const FileTextIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const HomeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const ANALYSIS_STEPS: Omit<LogEntry, 'id'>[] = [
    { message: 'Establishing secure link to telecom backbone...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-cyan-400" />, delay: 1000 },
    { message: 'Link established. Authenticating credentials...', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-green-400" />, delay: 1200 },
    { message: 'Querying global IMEI registration database...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-cyan-400" />, delay: 1500 },
    { message: 'Cross-referencing hardware signature...', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-green-400" />, delay: 800 },
    { message: 'Scanning for unauthorized IMSI catcher activity (StingRay)...', status: 'running', icon: <WifiIcon className="w-5 h-5 text-cyan-400" />, delay: 2000 },
    { message: 'No active IMSI catchers detected in proximity.', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-green-400" />, delay: 1000 },
    { message: 'Analyzing signal tower triangulation patterns...', status: 'running', icon: <WifiIcon className="w-5 h-5 text-cyan-400" />, delay: 1800 },
    { message: 'Anomaly detected in location data. Investigating...', status: 'failure', icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-400" />, delay: 2200 },
    { message: 'Checking for recent SIM swap fraud indicators...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-cyan-400" />, delay: 1300 },
    { message: 'No recent SIM swap activity found.', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-green-400" />, delay: 500 },
    { message: 'Deep packet inspection for call forwarding malware...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-cyan-400" />, delay: 2500 },
    { message: 'Suspicious outbound data packet signature found!', status: 'failure', icon: <AlertTriangleIcon className="w-5 h-5 text-red-500" />, delay: 1500 },
    { message: 'Compiling report...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-cyan-400" />, delay: 1000 },
];

export const FAKE_RESULT: AnalysisResult = {
    threatLevel: 'High',
    summary: 'Active Call Interception & Device Cloning Detected',
    details: [
        { key: 'Threat Type', value: 'Real-time SS7 Intercept / SIM Clone' },
        { key: 'Attacker Listening Post', value: 'Arkilla Federal Low Cost Housing Estate, Sokoto, NG' },
        { key: 'Source IP Address', value: '105.112.118.42 (Globacom, NG)' },
        { key: 'Cloned Device Signature', value: 'Generic Android 11 (Tecno Spark 8)' },
        { key: 'Carrier Network Anomaly', value: 'MTN NG -> Globacom NG Hand-off rerouted' },
        { key: 'Actionable Intelligence', value: 'Live call data is being exfiltrated to the attacker listening post.'},
        { key: 'Recommendation', value: 'CRITICAL: Cease all communication. Immediately contact carrier to report SS7 hijack. The physical device is compromised and should be surrendered to security.' },
    ],
    victimInfo: {
        name: 'Yusuf Sulaiman Gora',
        imageUrl: 'https://i.imgur.com/O1n3f0z.png',
        device: 'iPhone 13',
        carrier: 'MTN Nigeria / Airtel Nigeria',
        location: { name: 'Sokoto Central City, Sokoto, NG', lat: 13.0623, lon: 5.2339 },
        dob: '15/06/1985',
        address: 'Abdullahi Fodio Road, Sokoto, Sokoto State',
        stateOfOrigin: 'Gwandu, Kebbi State',
        network1: 'MTN NIGERIA',
        network2: 'Airtel Nigeria',
        imei: '35 028316 920782 4',
        imei2: '35 028316 896989 5',
        iccid: '89234010005937785539',
        meid: '35028316920782',
        eid: '89049032007008882600094787264150',
    },
    attackerLocation: { name: 'Arkilla, Sokoto, NG', lat: 13.0451, lon: 5.2018 }
};