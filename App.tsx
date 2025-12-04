
import React, { useState, useRef, useEffect } from 'react';
import type { LogEntry, AnalysisResult, PhoneNumberInputProps, AnalysisLogProps, ResultsDisplayProps, VictimInfoDisplayProps, VictimInfo, Location, CloningHistoryItem, CallLogItem, NetworkPacket, ImeiTrackingResult } from './types';
import { ANALYSIS_STEPS, FAKE_RESULT, FAKE_IMEI_RESULT } from './constants';
import { SearchIcon, AlertTriangleIcon, FileTextIcon, ActivityIcon, ServerIcon, MapPinIcon } from './constants';

declare const L: any;

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ inputValue, setInputValue, onAnalyze, isAnalyzing, error, mode }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 bg-black/50 p-2 border border-lime-500/30 focus-within:ring-2 focus-within:ring-lime-500 transition-all duration-300">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={mode === 'PHONE' ? "> enter target number..." : "> enter 15-digit IMEI..."}
          disabled={isAnalyzing}
          className="flex-grow bg-transparent p-2 text-lg text-lime-300 placeholder-lime-900 focus:outline-none"
        />
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="flex items-center justify-center gap-2 bg-lime-900/50 text-lime-400 font-bold py-2 px-6 border border-lime-500 hover:bg-lime-800/50 disabled:bg-gray-800 disabled:border-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300 group"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Executing...
            </>
          ) : (
            <>
              <SearchIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {mode === 'PHONE' ? 'Analyze' : 'Track'}
            </>
          )}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
};

const AnalysisLog: React.FC<AnalysisLogProps> = ({ logs }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const statusColorMap = {
    running: 'text-blue-400',
    success: 'text-lime-400',
    failure: 'text-yellow-400'
  };

  return (
    <div ref={logContainerRef} className="w-full max-w-2xl mx-auto h-72 bg-black/50 p-4 border border-lime-500/30 overflow-y-auto scrollbar-thin scrollbar-thumb-lime-700 scrollbar-track-black">
      <div className="space-y-2">
        {logs.map(log => (
          <div key={log.id} className="flex items-center gap-3 animate-fadeIn">
            <div className={`flex-shrink-0 ${statusColorMap[log.status] || 'text-lime-600'}`}>
              {log.icon}
            </div>
            <p className="flex-grow text-sm">{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onShowLogs }) => {
  if (!result) return null;

  const threatColor = {
    'High': 'border-red-500/50 bg-red-900/30 text-red-400',
    'Medium': 'border-yellow-500/50 bg-yellow-900/30 text-yellow-400',
    'Low': 'border-lime-500/50 bg-green-900/30 text-lime-400',
    'None': 'border-blue-500/50 bg-blue-900/30 text-blue-400',
  };

  return (
    <div className={`w-full h-full p-6 border ${threatColor[result.threatLevel]} animate-fadeIn`}>
      <div className="flex items-center gap-4 mb-4">
        <AlertTriangleIcon className="w-10 h-10 text-red-400" />
        <div>
          <h2 className="text-2xl font-bold text-lime-200">{result.summary}</h2>
          <p className="text-lg">Threat Level: <span className="font-bold">{result.threatLevel}</span></p>
        </div>
      </div>
      <div className="space-y-3 mt-6">
        {result.details.map((detail, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <p className="font-bold text-lime-600 md:col-span-1">{detail.key}:</p>
            <p className="text-lime-200 md:col-span-2">{detail.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-4 border-t border-lime-500/20 flex justify-center">
        <button
          onClick={onShowLogs}
          className="flex items-center justify-center gap-2 bg-lime-900/50 text-lime-400 font-bold py-2 px-6 border border-lime-500 hover:bg-lime-800/50 transition-all duration-300 group"
        >
          <FileTextIcon className="w-5 h-5" />
          View Detailed Logs
        </button>
      </div>
    </div>
  );
};

const VictimInfoDisplay: React.FC<VictimInfoDisplayProps> = ({ victimInfo, phoneNumber }) => {
  return (
    <div className="w-full h-full p-6 border border-lime-500/30 bg-black/30 animate-fadeIn">
      <h2 className="text-xl font-bold text-lime-400 mb-4">Subject Information</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <img 
            src={victimInfo.imageUrl} 
            alt="Subject Avatar" 
            className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-lime-500/50 object-cover mx-auto sm:mx-0 flex-shrink-0"
            loading="lazy"
            decoding="async"
        />
        <div className="text-sm space-y-2 flex-grow text-center sm:text-left">
            <h3 className="text-2xl font-bold text-lime-200">{victimInfo.name}</h3>
            <p className="text-lime-600">{phoneNumber}</p>
            <div className="pt-2">
              <p><span className="font-bold text-lime-600">Device: </span>{victimInfo.device}</p>
              <p><span className="font-bold text-lime-600">Carrier: </span>{victimInfo.carrier}</p>
              <p><span className="font-bold text-lime-600">Location: </span>{victimInfo.location.name}</p>
              <p><span className="font-bold text-lime-600">DOB: </span>{victimInfo.dob}</p>
              <p><span className="font-bold text-lime-600">Address: </span>{victimInfo.address}</p>
              <p><span className="font-bold text-lime-600">Origin: </span>{victimInfo.stateOfOrigin}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const DeviceInfoDisplay: React.FC<{ victimInfo: VictimInfo }> = ({ victimInfo }) => {
  return (
    <div className="w-full h-full p-6 border border-lime-500/30 bg-black/30 animate-fadeIn">
      <h2 className="text-xl font-bold text-lime-400 mb-4">Device Information</h2>
      <div className="text-sm space-y-4">
        <div>
            <h3 className="text-lime-600 font-bold mb-2 border-b border-lime-500/30 pb-1">Primary</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                <span className="text-lime-700">Network</span><span className="col-span-2 text-lime-200">{victimInfo.network1}</span>
                <span className="text-lime-700">Carrier</span><span className="col-span-2 text-lime-200">{victimInfo.carrier.split('/')[0]?.trim()}</span>
                <span className="text-lime-700">IMEI</span><span className="col-span-2 text-lime-200">{victimInfo.imei}</span>
                <span className="text-lime-700">ICCID</span><span className="col-span-2 text-lime-200">{victimInfo.iccid}</span>
                <span className="text-lime-700">MEID</span><span className="col-span-2 text-lime-200">{victimInfo.meid}</span>
            </div>
        </div>
         <div>
            <h3 className="text-lime-600 font-bold mb-2 border-b border-lime-500/30 pb-1">Secondary</h3>
             <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                <span className="text-lime-700">Network</span><span className="col-span-2 text-lime-200">{victimInfo.network2}</span>
                <span className="text-lime-700">Carrier</span><span className="col-span-2 text-lime-200">{victimInfo.carrier.split('/')[1]?.trim()}</span>
                <span className="text-lime-700">IMEI2</span><span className="col-span-2 text-lime-200">{victimInfo.imei2}</span>
            </div>
        </div>
        <div>
            <h3 className="text-lime-600 font-bold mb-2 border-b border-lime-500/30 pb-1">Identifiers</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                 <span className="text-lime-700">EID</span><span className="col-span-2 text-lime-200 break-all">{victimInfo.eid}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const CloningHistoryDisplay: React.FC<{ history: CloningHistoryItem[] }> = ({ history }) => {
    return (
        <div className="w-full p-6 border border-lime-500/30 bg-black/30 animate-fadeIn mt-6">
            <h2 className="text-xl font-bold text-lime-400 mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Device Cloning History
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-lime-600 uppercase bg-lime-900/20">
                        <tr>
                            <th className="px-4 py-2">Timestamp (UTC)</th>
                            <th className="px-4 py-2">Detected IMEI Fragment</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-lime-500/10">
                        {history.map((item, index) => (
                            <tr key={index} className="hover:bg-lime-900/10 transition-colors">
                                <td className="px-4 py-2 text-lime-200">{item.timestamp}</td>
                                <td className="px-4 py-2 text-lime-200 font-mono">{item.detectedImei}</td>
                                <td className="px-4 py-2 text-lime-200">{item.location}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-0.5 text-xs font-bold border ${item.status.includes('Active') ? 'text-red-400 border-red-400 bg-red-900/30' : 'text-lime-400 border-lime-400 bg-lime-900/30'}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CallLogsDisplay: React.FC<{ logs: CallLogItem[] }> = ({ logs }) => {
    const [copiedInfo, setCopiedInfo] = useState<{id: number, field: 'hash' | 'number'} | null>(null);

    const handleCopy = (text: string, id: number, field: 'hash' | 'number') => {
        navigator.clipboard.writeText(text);
        setCopiedInfo({ id, field });
        setTimeout(() => setCopiedInfo(null), 1500);
    };

    return (
        <div className="w-full p-6 border border-lime-500/30 bg-black/30 animate-fadeIn mt-6">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-lime-400">Intercepted Call Metadata</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-900/30 border border-yellow-500/50 text-yellow-500 text-xs">
                    <AlertTriangleIcon className="w-4 h-4" />
                    <span>ENCRYPTION DETECTED</span>
                </div>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-3 mb-4 text-xs text-red-300 flex items-start gap-3">
                 <div className="mt-0.5"><AlertTriangleIcon className="w-5 h-5" /></div>
                 <div>
                     <p className="font-bold">WARNING: RESTRICTED ACCESS</p>
                     <p>Service provider utilizes advanced Grade-3 Encryption Tunneling (GPRS/5G-NSA). Direct unmasked call log retrieval is blocked by carrier security layers. Displaying partially recovered hashes and masked endpoints only.</p>
                 </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left font-mono">
                    <thead className="text-xs text-lime-600 uppercase bg-lime-900/20">
                        <tr>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Duration</th>
                            <th className="px-4 py-2">Remote Hash</th>
                            <th className="px-4 py-2">Masked Endpoint</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-lime-500/10">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-lime-900/10 transition-colors">
                                <td className={`px-4 py-2 font-bold ${log.type === 'missed' ? 'text-red-400' : log.type === 'incoming' ? 'text-blue-400' : 'text-lime-400'}`}>
                                    {log.type.toUpperCase()}
                                </td>
                                <td className="px-4 py-2 text-lime-200">{log.timestamp}</td>
                                <td className="px-4 py-2 text-lime-200">{log.duration}</td>
                                <td 
                                    className="px-4 py-2 text-gray-500 cursor-pointer hover:text-lime-400 hover:bg-lime-900/20 transition-all relative group"
                                    onClick={() => handleCopy(log.hash, log.id, 'hash')}
                                    title="Click to copy hash"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{log.hash}</span>
                                        <span className="opacity-0 group-hover:opacity-100 text-[10px] text-lime-600 border border-lime-600 px-1 rounded">CPY</span>
                                    </div>
                                    {copiedInfo?.id === log.id && copiedInfo?.field === 'hash' && (
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lime-900 text-lime-400 text-xs px-2 py-1 border border-lime-500 z-10 shadow-lg whitespace-nowrap">
                                            COPIED
                                        </div>
                                    )}
                                </td>
                                <td 
                                    className="px-4 py-2 text-lime-200 cursor-pointer hover:text-lime-400 hover:bg-lime-900/20 transition-all relative group"
                                    onClick={() => handleCopy(log.maskedNumber, log.id, 'number')}
                                    title="Click to copy number"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{log.maskedNumber}</span>
                                        <span className="opacity-0 group-hover:opacity-100 text-[10px] text-lime-600 border border-lime-600 px-1 rounded">CPY</span>
                                    </div>
                                     {copiedInfo?.id === log.id && copiedInfo?.field === 'number' && (
                                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-lime-900 text-lime-400 text-xs px-2 py-1 border border-lime-500 z-10 shadow-lg whitespace-nowrap">
                                            COPIED
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const NetworkTrafficDisplay: React.FC<{ traffic: NetworkPacket[], onSelectPacket: (packet: NetworkPacket) => void }> = ({ traffic, onSelectPacket }) => {
    return (
        <div className="w-full p-6 border border-lime-500/30 bg-black/30 animate-fadeIn mt-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-lime-400 flex items-center gap-2">
                    <ServerIcon className="w-5 h-5" />
                    Live Network Packet Capture
                </h2>
                <div className="flex items-center gap-2">
                     <span className="text-xs text-lime-600 uppercase">Interface:</span>
                     <span className="text-xs text-lime-200 bg-lime-900/30 px-2 py-0.5 border border-lime-500/30">wlan0mon (Promiscuous)</span>
                </div>
            </div>

            {/* Visualizer Simulation */}
            <div className="h-24 w-full bg-black/50 border border-lime-900 mb-4 flex items-end gap-[2px] p-1 overflow-hidden">
                {Array.from({ length: 60 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="bg-lime-500/40 w-full"
                        style={{ 
                            height: `${Math.random() * 100}%`,
                            animation: `pulse-height ${0.5 + Math.random()}s infinite alternate`
                        }} 
                    />
                ))}
            </div>

            <div className="overflow-x-auto max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-lime-700 scrollbar-track-black border border-lime-500/20">
                <table className="w-full text-xs text-left font-mono">
                    <thead className="text-lime-600 uppercase bg-lime-900/20 sticky top-0">
                        <tr>
                            <th className="px-2 py-1">Time</th>
                            <th className="px-2 py-1">Source</th>
                            <th className="px-2 py-1">Destination</th>
                            <th className="px-2 py-1">Protocol</th>
                            <th className="px-2 py-1">Len</th>
                            <th className="px-2 py-1">Info</th>
                            <th className="px-2 py-1">Payload Snippet</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-lime-500/10 cursor-pointer">
                        {traffic.map((packet) => (
                            <tr key={packet.id} onClick={() => onSelectPacket(packet)} className="hover:bg-lime-900/40 transition-colors border-b border-lime-900/10 group">
                                <td className="px-2 py-1 text-lime-200/70 group-hover:text-white">{packet.time}</td>
                                <td className="px-2 py-1 text-lime-400">{packet.source}</td>
                                <td className="px-2 py-1 text-red-400">{packet.destination}</td>
                                <td className={`px-2 py-1 font-bold ${packet.protocol === 'RTP' ? 'text-yellow-400' : packet.protocol === 'SS7/MAP' ? 'text-purple-400' : 'text-blue-400'}`}>
                                    {packet.protocol}
                                </td>
                                <td className="px-2 py-1 text-gray-400">{packet.length}</td>
                                <td className="px-2 py-1 text-lime-100">{packet.info}</td>
                                <td className="px-2 py-1 text-gray-500 break-all">{packet.payload}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <style>{`
                @keyframes pulse-height {
                    0% { opacity: 0.3; transform: scaleY(0.5); }
                    100% { opacity: 0.8; transform: scaleY(1); }
                }
            `}</style>
        </div>
    );
};

const ThreatMap: React.FC<{ victimLocation: Location; attackerLocation: Location }> = ({ victimLocation, attackerLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || typeof L === 'undefined') return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: false,
    });

    const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
    }).addTo(map);
    
    if (tileLayer.getContainer()) {
      (tileLayer.getContainer() as HTMLElement).style.filter = 'grayscale(1) brightness(0.6) invert(1)';
    }

    const createPulseIcon = (color: string) => L.divIcon({
        className: 'custom-pulse-icon',
        html: `<div class="pulse-ring" style="background-color: ${color};"></div><div class="pulse-dot" style="background-color: ${color};"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });

    const victimIcon = createPulseIcon('#39ff14');
    const attackerIcon = createPulseIcon('#ef4444');

    L.marker([victimLocation.lat, victimLocation.lon], { icon: victimIcon })
        .addTo(map)
        .bindPopup(`<b>${victimLocation.name}</b><br>Lat: ${victimLocation.lat.toFixed(4)}<br>Lon: ${victimLocation.lon.toFixed(4)}`);

    L.marker([attackerLocation.lat, attackerLocation.lon], { icon: attackerIcon })
        .addTo(map)
        .bindPopup(`<b>${attackerLocation.name}</b><br>Lat: ${attackerLocation.lat.toFixed(4)}<br>Lon: ${attackerLocation.lon.toFixed(4)}`);

    const latlngs = [
        [victimLocation.lat, victimLocation.lon],
        [attackerLocation.lat, attackerLocation.lon]
    ];
    L.polyline(latlngs, { color: '#f43f5e', weight: 2, opacity: 0.8, dashArray: '8, 8' }).addTo(map);

    map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });

    return () => {
      map.remove();
    };
  }, [victimLocation, attackerLocation]);

  return (
    <div className="w-full h-full p-6 border border-lime-500/30 bg-black/30 animate-fadeIn">
      <h2 className="text-xl font-bold text-lime-400 mb-4">Threat Vector Map</h2>
      <div className="relative aspect-square bg-black/30 overflow-hidden border border-lime-500/30">
        <div ref={mapContainerRef} className="w-full h-full" id="map" />
      </div>
    </div>
  );
};

const MovementMap: React.FC<{ history: ImeiTrackingResult['locationHistory'] }> = ({ history }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainerRef.current || typeof L === 'undefined') return;

        const map = L.map(mapContainerRef.current, {
            zoomControl: true,
            attributionControl: false,
        });

        const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 18,
        }).addTo(map);

        if (tileLayer.getContainer()) {
            (tileLayer.getContainer() as HTMLElement).style.filter = 'grayscale(1) brightness(0.6) invert(1)';
        }

        const latlngs = history.map(h => [h.lat, h.lon]);

        const createNumberedIcon = (num: number, isLast: boolean) => L.divIcon({
            className: 'custom-numbered-icon',
            html: `<div class="number-marker ${isLast ? 'last-marker' : ''}">${num}</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });

        history.forEach((loc, index) => {
             L.marker([loc.lat, loc.lon], { icon: createNumberedIcon(index + 1, index === history.length - 1) })
                .addTo(map)
                .bindPopup(`<b>${loc.locationName}</b><br>${loc.timestamp}<br>Lat: ${loc.lat.toFixed(4)}`);
        });

        L.polyline(latlngs, { color: '#39ff14', weight: 3, opacity: 0.8 }).addTo(map);
        
        if (latlngs.length > 0) {
             map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] });
        }

        return () => {
            map.remove();
        };
    }, [history]);

    return (
        <div className="w-full h-full p-6 border border-lime-500/30 bg-black/30 animate-fadeIn">
            <h2 className="text-xl font-bold text-lime-400 mb-4">Geospatial Movement History</h2>
            <div className="relative aspect-square bg-black/30 overflow-hidden border border-lime-500/30">
                <div ref={mapContainerRef} className="w-full h-full" id="map-history" />
            </div>
             <style>{`
                .number-marker {
                    background-color: #000;
                    color: #39ff14;
                    border: 1px solid #39ff14;
                    border-radius: 50%;
                    width: 24px; height: 24px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12px; font-weight: bold;
                }
                .last-marker {
                    background-color: #39ff14;
                    color: #000;
                    box-shadow: 0 0 10px #39ff14;
                }
            `}</style>
        </div>
    );
};

const DetailedLogsModal: React.FC<{ logs: LogEntry[]; onClose: () => void }> = ({ logs, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div className="w-full max-w-3xl bg-black border border-lime-500/50 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-lime-500/30 flex justify-between items-center">
          <h2 className="text-xl font-bold text-lime-400">Analysis Log Details</h2>
          <button onClick={onClose} className="text-lime-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="p-4 h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-lime-700 scrollbar-track-black">
           {logs.map(log => (
              <div key={log.id} className="flex items-start gap-3 mb-2">
                <div className="flex-shrink-0 text-lime-700 pt-1">
                  {log.icon}
                </div>
                <p className="flex-grow text-sm text-lime-400">{log.message}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const PacketInspectorModal: React.FC<{ packet: NetworkPacket; onClose: () => void }> = ({ packet, onClose }) => {
     useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
         <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
             <div className="w-full max-w-4xl bg-black border border-lime-500 shadow-[0_0_20px_rgba(57,255,20,0.2)] flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                 <div className="p-3 border-b border-lime-500/30 bg-lime-900/10 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-lime-400 font-mono">Packet Inspector: Frame #{packet.id}</h2>
                    <button onClick={onClose} className="text-lime-400 hover:text-white text-xl font-mono">[X]</button>
                 </div>
                 <div className="flex-grow overflow-y-auto p-4 font-mono text-sm space-y-4">
                     {/* Packet Summary */}
                     <div className="grid grid-cols-2 gap-4 border-b border-lime-500/20 pb-4">
                         <div><span className="text-lime-600">Time:</span> <span className="text-lime-200">{packet.time}</span></div>
                         <div><span className="text-lime-600">Protocol:</span> <span className="text-lime-200">{packet.protocol}</span></div>
                         <div><span className="text-lime-600">Source:</span> <span className="text-lime-200">{packet.source}</span></div>
                         <div><span className="text-lime-600">Destination:</span> <span className="text-lime-200">{packet.destination}</span></div>
                         <div className="col-span-2"><span className="text-lime-600">Info:</span> <span className="text-lime-200">{packet.info}</span></div>
                     </div>

                     {/* Headers */}
                     <div>
                         <h3 className="text-lime-500 mb-2 border-l-4 border-lime-500 pl-2">Protocol Headers</h3>
                         <div className="bg-gray-900/50 p-3 border border-lime-900/50">
                             {Object.entries(packet.headers).map(([key, value]) => (
                                 <div key={key} className="grid grid-cols-3 gap-2">
                                     <span className="text-lime-700 font-bold">{key}:</span>
                                     <span className="col-span-2 text-lime-200">{value}</span>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Hex Dump */}
                     <div>
                         <h3 className="text-lime-500 mb-2 border-l-4 border-lime-500 pl-2">Payload (Hex/ASCII)</h3>
                         <div className="bg-black p-4 border border-lime-900/50 font-mono text-xs overflow-x-auto whitespace-pre text-gray-400">
                             {packet.hexDump}
                         </div>
                     </div>
                 </div>
             </div>
         </div>
    );
};

const ImeiResultsDisplay: React.FC<{ result: ImeiTrackingResult }> = ({ result }) => {
    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            <div className="flex flex-col gap-6">
                <div className="w-full p-6 border border-lime-500/30 bg-black/30">
                    <h2 className="text-xl font-bold text-lime-400 mb-4">Device Fingerprint</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-lime-500/10 pb-1">
                            <span className="text-lime-600 font-bold">Model</span>
                            <span className="text-lime-200">{result.deviceModel}</span>
                        </div>
                        <div className="flex justify-between border-b border-lime-500/10 pb-1">
                            <span className="text-lime-600 font-bold">IMEI</span>
                            <span className="text-lime-200">{result.imei}</span>
                        </div>
                        <div className="flex justify-between border-b border-lime-500/10 pb-1">
                            <span className="text-lime-600 font-bold">Status</span>
                            <span className="text-lime-400 font-bold bg-lime-900/20 px-2 border border-lime-500/30">{result.status}</span>
                        </div>
                         <div className="flex justify-between border-b border-lime-500/10 pb-1">
                            <span className="text-lime-600 font-bold">Battery</span>
                            <span className="text-lime-200">{result.batteryLevel}</span>
                        </div>
                         <div className="flex justify-between border-b border-lime-500/10 pb-1">
                            <span className="text-lime-600 font-bold">Last Active</span>
                            <span className="text-lime-200">{result.lastActive}</span>
                        </div>
                         <div className="mt-4 pt-4">
                             <h3 className="text-lime-500 font-bold mb-2">Hardware Info</h3>
                             <p><span className="text-lime-700">Manufacturer:</span> {result.hardwareInfo.manufacturer}</p>
                             <p><span className="text-lime-700">S/N:</span> {result.hardwareInfo.serialNumber}</p>
                             <p><span className="text-lime-700">Production:</span> {result.hardwareInfo.productionDate}</p>
                             <p><span className="text-lime-700">Bootloader:</span> {result.hardwareInfo.bootloaderStatus}</p>
                         </div>
                    </div>
                </div>

                <div className="w-full p-6 border border-lime-500/30 bg-black/30 flex-grow">
                     <h2 className="text-xl font-bold text-lime-400 mb-4 flex items-center gap-2">
                         <ActivityIcon className="w-5 h-5" />
                         Ping History
                     </h2>
                     <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="text-lime-600 uppercase bg-lime-900/20">
                                <tr>
                                    <th className="px-2 py-2">Time</th>
                                    <th className="px-2 py-2">Location</th>
                                    <th className="px-2 py-2">Method</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-lime-500/10">
                                {result.locationHistory.map((item) => (
                                    <tr key={item.id} className="hover:bg-lime-900/10">
                                        <td className="px-2 py-2 text-lime-200">{item.timestamp}</td>
                                        <td className="px-2 py-2 text-lime-200">{item.locationName}</td>
                                        <td className="px-2 py-2 text-gray-500">{item.trigger}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </div>
            </div>
            
            <div className="flex flex-col gap-6">
                <MovementMap history={result.locationHistory} />
            </div>
        </div>
    );
};

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchMode, setSearchMode] = useState<'PHONE' | 'IMEI'>('PHONE');
  const [analysisLogs, setAnalysisLogs] = useState<LogEntry[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [imeiResults, setImeiResults] = useState<ImeiTrackingResult | null>(null);
  const [error, setError] = useState<string>('');
  const [showLogsModal, setShowLogsModal] = useState<boolean>(false);
  const [selectedPacket, setSelectedPacket] = useState<NetworkPacket | null>(null);

  const handleStartAnalysis = async () => {
    if (!inputValue.trim()) {
      setError('Input cannot be empty.');
      return;
    }
    
    if (searchMode === 'PHONE' && !/^\+?[0-9\s-()]{7,20}$/.test(inputValue)) {
         setError('Please enter a valid phone number.');
         return;
    }

     if (searchMode === 'IMEI' && !/^[0-9\s]{14,20}$/.test(inputValue)) {
         setError('Please enter a valid 15-digit IMEI.');
         return;
    }

    setError('');
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisLogs([]);
    setResults(null);
    setImeiResults(null);
    
    const initialLog: LogEntry = { 
        id: -1, 
        message: searchMode === 'PHONE' ? `Starting interception analysis for ${inputValue}...` : `Initiating global tracking for IMEI ${inputValue}...`, 
        status: 'running', 
        icon: <SearchIcon className="w-5 h-5"/> 
    };
    const allLogs = [initialLog];

    let cumulativeDelay = 1500;
    for (const [index, step] of ANALYSIS_STEPS.entries()) {
      setTimeout(() => {
         const newLog = { ...step, id: index };
         setAnalysisLogs(prev => [...prev, newLog]);
         allLogs.push(newLog);
      }, cumulativeDelay);
      cumulativeDelay += step.delay;
    }

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      if (searchMode === 'PHONE') {
          setResults(FAKE_RESULT);
      } else {
          setImeiResults(FAKE_IMEI_RESULT);
      }
      setAnalysisLogs(allLogs); 
    }, cumulativeDelay + 1000);
  };

  return (
    <div className="min-h-screen bg-black text-lime-400 flex flex-col items-center p-4 selection:bg-lime-300 selection:text-lime-900">
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-lime-400 drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
          Device Integrity Analyzer
        </h1>
        <p className="text-lime-600 mt-2">BackTrack OS v22.5<span className="blinking-cursor">_</span></p>
      </div>

      <div className="w-full space-y-6">
        {/* Search Mode Toggle */}
        <div className="flex justify-center gap-4 mb-4">
            <button 
                onClick={() => { setSearchMode('PHONE'); setInputValue(''); setAnalysisComplete(false); }}
                className={`px-4 py-2 border ${searchMode === 'PHONE' ? 'bg-lime-900/50 border-lime-500 text-lime-200' : 'border-lime-900/30 text-lime-800'}`}
            >
                Phone Intercept
            </button>
            <button 
                onClick={() => { setSearchMode('IMEI'); setInputValue(''); setAnalysisComplete(false); }}
                className={`px-4 py-2 border ${searchMode === 'IMEI' ? 'bg-lime-900/50 border-lime-500 text-lime-200' : 'border-lime-900/30 text-lime-800'}`}
            >
                IMEI Geo-Tracking
            </button>
        </div>

        <PhoneNumberInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAnalyze={handleStartAnalysis}
          isAnalyzing={isAnalyzing}
          error={error}
          mode={searchMode}
        />

        {(isAnalyzing || analysisLogs.length > 0 && !analysisComplete) && (
          <AnalysisLog logs={analysisLogs} />
        )}
        
        {analysisComplete && searchMode === 'PHONE' && results && (
           <>
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <VictimInfoDisplay victimInfo={results.victimInfo} phoneNumber={inputValue} />
                <DeviceInfoDisplay victimInfo={results.victimInfo} />
              </div>
              <div className="flex flex-col gap-6">
                <ResultsDisplay result={results} onShowLogs={() => setShowLogsModal(true)} />
                <ThreatMap victimLocation={results.victimInfo.location} attackerLocation={results.attackerLocation} />
              </div>
            </div>
            
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 gap-6">
               <CloningHistoryDisplay history={results.cloningHistory} />
               <NetworkTrafficDisplay traffic={results.networkTraffic} onSelectPacket={setSelectedPacket} />
               <CallLogsDisplay logs={results.callLogs} />
            </div>
          </>
        )}

        {analysisComplete && searchMode === 'IMEI' && imeiResults && (
            <ImeiResultsDisplay result={imeiResults} />
        )}

        {showLogsModal && <DetailedLogsModal logs={analysisLogs} onClose={() => setShowLogsModal(false)} />}
        {selectedPacket && <PacketInspectorModal packet={selectedPacket} onClose={() => setSelectedPacket(null)} />}

      </div>

      <footer className="mt-12 text-center text-xs text-lime-800/70">
          <p>&copy; 2024 Corporate Security Division</p>
      </footer>
       <style>{`
        .leaflet-pane, .leaflet-tile, .leaflet-marker-icon, .leaflet-marker-shadow, .leaflet-tile-container, .leaflet-pane > svg, .leaflet-pane > canvas, .leaflet-zoom-box, .leaflet-image-layer, .leaflet-layer {
            z-index: 1 !important;
        }
        .leaflet-popup-pane, .leaflet-control { z-index: 2 !important; }
        .leaflet-popup-content-wrapper {
            background: #050505;
            color: #39ff14;
            border: 1px solid #39ff14;
            border-radius: 0;
        }
        .leaflet-popup-content { font-family: 'Share Tech Mono', monospace; }
        .leaflet-popup-tip { background: #050505; border-top-color: #39ff14; }
        .leaflet-container a.leaflet-popup-close-button { color: #39ff14; }
        .custom-pulse-icon { position: relative; }
        .pulse-dot {
            width: 12px; height: 12px;
            position: absolute; top: 6px; left: 6px;
            border-radius: 50%;
            border: 2px solid black;
        }
        .pulse-ring {
            width: 24px; height: 24px; border-radius: 50%;
            position: absolute; top: 0; left: 0;
            animation: pulse-animation 1.5s infinite;
        }
        @keyframes pulse-animation {
            0% { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default App;
