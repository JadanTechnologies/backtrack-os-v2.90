
import React, { useState, useRef, useEffect } from 'react';
import type { LogEntry, AnalysisResult, PhoneNumberInputProps, AnalysisLogProps, ResultsDisplayProps, VictimInfoDisplayProps, VictimInfo, Location } from './types';
import { ANALYSIS_STEPS, FAKE_RESULT } from './constants';
import { SearchIcon, AlertTriangleIcon, FileTextIcon } from './constants';

declare const L: any;

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ phoneNumber, setPhoneNumber, onAnalyze, isAnalyzing, error }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 bg-black/50 p-2 border border-lime-500/30 focus-within:ring-2 focus-within:ring-lime-500 transition-all duration-300">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="> enter target number..."
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
              Analyze
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


function App() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [analysisLogs, setAnalysisLogs] = useState<LogEntry[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [showLogsModal, setShowLogsModal] = useState<boolean>(false);

  const handleStartAnalysis = async () => {
    if (!phoneNumber.trim() || !/^\+?[0-9\s-()]{7,20}$/.test(phoneNumber)) {
      setError('Please enter a valid phone number.');
      return;
    }
    setError('');
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisLogs([]);
    setResults(null);
    
    const initialLog: LogEntry = { id: -1, message: `Starting analysis for ${phoneNumber}...`, status: 'running', icon: <SearchIcon className="w-5 h-5"/> };
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
      setResults(FAKE_RESULT);
      setAnalysisLogs(allLogs); // Set the full log history for the modal
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
        <PhoneNumberInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onAnalyze={handleStartAnalysis}
          isAnalyzing={isAnalyzing}
          error={error}
        />

        {(isAnalyzing || analysisLogs.length > 0 && !analysisComplete) && (
          <AnalysisLog logs={analysisLogs} />
        )}
        
        {analysisComplete && results && (
           <>
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <VictimInfoDisplay victimInfo={results.victimInfo} phoneNumber={phoneNumber} />
                <DeviceInfoDisplay victimInfo={results.victimInfo} />
              </div>
              <div className="flex flex-col gap-6">
                <ResultsDisplay result={results} onShowLogs={() => setShowLogsModal(true)} />
                <ThreatMap victimLocation={results.victimInfo.location} attackerLocation={results.attackerLocation} />
              </div>
            </div>
            {showLogsModal && <DetailedLogsModal logs={analysisLogs} onClose={() => setShowLogsModal(false)} />}
          </>
        )}
      </div>

      <footer className="mt-12 text-center text-xs text-lime-800/70">
          <p>&copy; 2024 Corporate Security Division</p>
      </footer>
    </div>
  );
}

export default App;