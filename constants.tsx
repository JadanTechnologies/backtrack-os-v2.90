
import React from 'react';
import type { LogEntry, AnalysisResult, ImeiTrackingResult } from './types';

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

export const ActivityIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export const MapPinIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ANALYSIS_STEPS: Omit<LogEntry, 'id'>[] = [
    { message: 'Establishing secure link to telecom backbone...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-blue-400" />, delay: 1000 },
    { message: 'Link established. Authenticating credentials...', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-lime-400" />, delay: 1200 },
    { message: 'Querying global IMEI registration database...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-blue-400" />, delay: 1500 },
    { message: 'Cross-referencing hardware signature...', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-lime-400" />, delay: 800 },
    { message: 'Scanning for unauthorized IMSI catcher activity (StingRay)...', status: 'running', icon: <WifiIcon className="w-5 h-5 text-blue-400" />, delay: 2000 },
    { message: 'No active IMSI catchers detected in proximity.', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-lime-400" />, delay: 1000 },
    { message: 'Analyzing signal tower triangulation patterns...', status: 'running', icon: <WifiIcon className="w-5 h-5 text-blue-400" />, delay: 1800 },
    { message: 'Anomaly detected in location data. Investigating...', status: 'failure', icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-400" />, delay: 2200 },
    { message: 'Checking for recent SIM swap fraud indicators...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-blue-400" />, delay: 1300 },
    { message: 'No recent SIM swap activity found.', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-lime-400" />, delay: 500 },
    { message: 'Deep packet inspection for call forwarding malware...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-blue-400" />, delay: 2500 },
    { message: 'Suspicious outbound data packet signature found!', status: 'failure', icon: <AlertTriangleIcon className="w-5 h-5 text-red-500" />, delay: 1500 },
    { message: 'Attempting to decrypt historical voice logs...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-blue-400" />, delay: 2000 },
    { message: 'Decryption failed: Carrier-Grade NAT/Encryption detected.', status: 'failure', icon: <AlertTriangleIcon className="w-5 h-5 text-yellow-400" />, delay: 1000 },
    { message: 'Retrieving partial hash fragments...', status: 'success', icon: <ShieldCheckIcon className="w-5 h-5 text-lime-400" />, delay: 800 },
    { message: 'Compiling report...', status: 'running', icon: <ServerIcon className="w-5 h-5 text-blue-400" />, delay: 1000 },
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
        imageUrl: 'data:image/jpeg;base64,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',
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
    attackerLocation: { name: 'Arkilla, Sokoto, NG', lat: 13.0451, lon: 5.2018 },
    cloningHistory: [
        { timestamp: '2023-10-27 03:45:12 UTC', detectedImei: '35044872...', status: 'Blocked', location: 'Lagos, NG' },
        { timestamp: '2023-11-15 14:22:09 UTC', detectedImei: '35928109...', status: 'Successful', location: 'Abuja, NG' },
        { timestamp: '2024-01-05 09:11:45 UTC', detectedImei: '86429004...', status: 'Successful', location: 'Sokoto, NG' },
        { timestamp: '2024-02-18 22:30:01 UTC', detectedImei: '35028316...', status: 'Active (Current)', location: 'Sokoto, NG' },
    ],
    callLogs: [
        { id: 1, type: 'outgoing', timestamp: '2024-02-20 09:15', duration: '4m 12s', hash: '0x4F9A...2B', maskedNumber: '+234 803 *** *121' },
        { id: 2, type: 'incoming', timestamp: '2024-02-20 10:42', duration: '0m 45s', hash: '0x1C3D...9A', maskedNumber: '+234 812 *** *992' },
        { id: 3, type: 'missed', timestamp: '2024-02-20 12:01', duration: '0s', hash: '0x8E22...1F', maskedNumber: '+234 907 *** *554' },
        { id: 4, type: 'outgoing', timestamp: '2024-02-20 14:20', duration: '12m 01s', hash: '0xB77A...00', maskedNumber: '+234 706 *** *001' },
        { id: 5, type: 'incoming', timestamp: '2024-02-20 16:55', duration: '2m 33s', hash: '0x991C...4D', maskedNumber: '+234 805 *** *888' },
        { id: 6, type: 'incoming', timestamp: '2024-02-20 18:10', duration: '1m 15s', hash: '0x22A1...88', maskedNumber: '+234 901 *** *234' },
        { id: 7, type: 'outgoing', timestamp: '2024-02-20 19:45', duration: '8m 22s', hash: '0x55F3...9C', maskedNumber: '+234 802 *** *777' },
    ],
    networkTraffic: [
        { 
            id: 1, 
            time: '14:22:01.442', 
            source: '10.122.5.110', 
            destination: '105.112.118.42', 
            protocol: 'SS7/MAP', 
            length: 128, 
            info: 'updateLocation (Main_Process)', 
            payload: '0x8A 01 02 ...',
            headers: { 'TransactionID': '0x1A2B', 'Component': 'Invoke', 'OpCode': 'updateLocation' },
            hexDump: '0000   8a 01 02 4b 12 30 9a cd   ef 01 23 45 67 89 ab cd\n0010   00 11 22 33 44 55 66 77   88 99 aa bb cc dd ee ff'
        },
        { 
            id: 2, 
            time: '14:22:01.551', 
            source: '105.112.118.42', 
            destination: '10.122.5.110', 
            protocol: 'SS7/MAP', 
            length: 64, 
            info: 'insertSubscriberData', 
            payload: '0x11 22 33 ...',
            headers: { 'TransactionID': '0x1A2B', 'Component': 'ReturnResult', 'OpCode': 'insertSubscriberData' },
            hexDump: '0000   11 22 33 44 55 66 77 88   99 aa bb cc dd ee ff 00\n0010   10 20 30 40 50 60 70 80   90 a0 b0 c0 d0 e0 f0 00'
        },
        { 
            id: 3, 
            time: '14:23:12.105', 
            source: '192.168.1.101', 
            destination: '105.112.118.42', 
            protocol: 'SIP/2.0', 
            length: 540, 
            info: 'INVITE sip:target@attacker.net', 
            payload: 'INVITE sip...',
            headers: { 'Via': 'SIP/2.0/UDP 192.168.1.101', 'From': '<sip:victim@provider.net>', 'To': '<sip:target@attacker.net>', 'Call-ID': 'a84b4c76e66710' },
            hexDump: '0000   49 4e 56 49 54 45 20 73   69 70 3a 74 61 72 67 65   INVITE sip:targe\n0010   74 40 61 74 74 61 63 6b   65 72 2e 6e 65 74 20 53   t@attacker.net S'
        },
        { 
            id: 4, 
            time: '14:23:12.210', 
            source: '105.112.118.42', 
            destination: '192.168.1.101', 
            protocol: 'SIP/2.0', 
            length: 320, 
            info: '200 OK', 
            payload: 'SIP/2.0 200...',
            headers: { 'Via': 'SIP/2.0/UDP 105.112.118.42', 'From': '<sip:target@attacker.net>', 'To': '<sip:victim@provider.net>', 'Status': '200 OK' },
            hexDump: '0000   53 49 50 2f 32 2e 30 20   32 30 30 20 4f 4b 0d 0a   SIP/2.0 200 OK..\n0010   43 6f 6e 74 65 6e 74 2d   4c 65 6e 67 74 68 3a 20   Content-Length: '
        },
        { 
            id: 5, 
            time: '14:23:12.255', 
            source: '192.168.1.101', 
            destination: '105.112.118.42', 
            protocol: 'RTP', 
            length: 1400, 
            info: 'Audio Payload (G.711 PCMU)', 
            payload: '0x80 00 01...',
            headers: { 'Version': '2', 'Padding': 'No', 'Extension': 'No', 'Marker': 'No', 'PayloadType': '0 (PCMU)' },
            hexDump: '0000   80 00 00 01 00 00 00 a0   12 34 56 78 9a bc de f0\n0010   ff ff ff ff ff ff ff ff   ff ff ff ff ff ff ff ff'
        },
        { 
            id: 8, 
            time: '14:24:05.112', 
            source: '10.122.5.110', 
            destination: '105.112.118.42', 
            protocol: 'TCP', 
            length: 82, 
            info: 'Push Data [ACK] Seq=1', 
            payload: '0x00 00 00...',
            headers: { 'SrcPort': '443', 'DstPort': '52110', 'Seq': '1', 'Ack': '102', 'Flags': 'ACK, PSH' },
            hexDump: '0000   00 00 00 00 00 00 00 00   00 00 00 00 08 00 45 00\n0010   00 52 1a 2b 40 00 40 06   2a 3b 0a 7a 05 6e 69 70'
        },
    ]
};

export const FAKE_IMEI_RESULT: ImeiTrackingResult = {
    deviceModel: 'iPhone 13 Pro Max',
    imei: '35 028316 920782 4',
    status: 'Active',
    batteryLevel: '82%',
    lastActive: 'Just now',
    hardwareInfo: {
        manufacturer: 'Apple Inc.',
        serialNumber: 'F2LXV1...',
        productionDate: '2021-09-15',
        bootloaderStatus: 'Secure Enclave: OK',
    },
    locationHistory: [
        {
            id: 1,
            timestamp: '08:15:22',
            locationName: 'Sokoto Central Market',
            lat: 13.0605,
            lon: 5.2301,
            accuracy: '±5m',
            trigger: 'Tower Triangulation'
        },
        {
            id: 2,
            timestamp: '09:45:10',
            locationName: 'Sultan\'s Palace Area',
            lat: 13.0450,
            lon: 5.2402,
            accuracy: '±3m',
            trigger: 'GPS Pinging'
        },
        {
            id: 3,
            timestamp: '11:20:55',
            locationName: 'Giginya Memorial Stadium',
            lat: 13.0305,
            lon: 5.2108,
            accuracy: '±8m',
            trigger: 'WiFi Handshake'
        },
        {
            id: 4,
            timestamp: '12:55:01',
            locationName: 'Arkilla Federal Low Cost',
            lat: 13.0401,
            lon: 5.2005,
            accuracy: '±2m',
            trigger: 'GPS Pinging'
        },
        {
            id: 5,
            timestamp: '14:10:44',
            locationName: 'Usmanu Danfodiyo University Teaching Hospital',
            lat: 13.0750,
            lon: 5.2050,
            accuracy: '±10m',
            trigger: 'Tower Triangulation'
        }
    ]
};
