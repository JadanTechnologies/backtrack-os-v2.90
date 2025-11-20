import React, { useState, useRef, useEffect } from 'react';
import type { LogEntry, AnalysisResult, PhoneNumberInputProps, AnalysisLogProps, ResultsDisplayProps, VictimInfoDisplayProps, VictimInfo, Location } from './types';
import { ANALYSIS_STEPS, FAKE_RESULT } from './constants';
import { SearchIcon, AlertTriangleIcon, FileTextIcon, HomeIcon } from './constants';

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ phoneNumber, setPhoneNumber, onAnalyze, isAnalyzing, error }) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-lg border border-slate-700 focus-within:ring-2 focus-within:ring-cyan-500 transition-all duration-300">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+1 (555) 123-4567"
          disabled={isAnalyzing}
          className="flex-grow bg-transparent p-2 text-lg text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 group"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
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
    running: 'text-cyan-400',
    success: 'text-green-400',
    failure: 'text-yellow-400'
  };

  return (
    <div ref={logContainerRef} className="w-full max-w-2xl mx-auto h-72 bg-black/50 p-4 rounded-lg border border-slate-700 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
      <div className="space-y-2">
        {logs.map(log => (
          <div key={log.id} className="flex items-center gap-3 animate-fadeIn">
            <div className={`flex-shrink-0 ${statusColorMap[log.status] || 'text-slate-400'}`}>
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
    'High': 'border-red-500 bg-red-900/30 text-red-300',
    'Medium': 'border-yellow-500 bg-yellow-900/30 text-yellow-300',
    'Low': 'border-green-500 bg-green-900/30 text-green-300',
    'None': 'border-blue-500 bg-blue-900/30 text-blue-300',
  };

  return (
    <div className={`w-full h-full p-6 rounded-lg border ${threatColor[result.threatLevel]} animate-fadeIn`}>
      <div className="flex items-center gap-4 mb-4">
        <AlertTriangleIcon className="w-10 h-10 text-red-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">{result.summary}</h2>
          <p className="text-lg">Threat Level: <span className="font-bold">{result.threatLevel}</span></p>
        </div>
      </div>
      <div className="space-y-3 mt-6">
        {result.details.map((detail, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <p className="font-bold text-slate-400 md:col-span-1">{detail.key}:</p>
            <p className="text-white md:col-span-2">{detail.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-4 border-t border-slate-700/50 flex justify-center">
        <button
          onClick={onShowLogs}
          className="flex items-center justify-center gap-2 bg-slate-700 text-slate-300 font-bold py-2 px-6 rounded-md hover:bg-slate-600 transition-all duration-300 group"
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
    <div className="w-full h-full p-6 rounded-lg border border-slate-700 bg-slate-800/50 animate-fadeIn">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">Subject Information</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <img src={victimInfo.imageUrl} alt="Subject Avatar" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-slate-600 object-cover mx-auto sm:mx-0 flex-shrink-0" />
        <div className="text-sm space-y-2 flex-grow text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white">{victimInfo.name}</h3>
            <p className="text-slate-400">{phoneNumber}</p>
            <div className="pt-2">
              <p><span className="font-bold text-slate-400">Device: </span>{victimInfo.device}</p>
              <p><span className="font-bold text-slate-400">Carrier: </span>{victimInfo.carrier}</p>
              <p><span className="font-bold text-slate-400">Location: </span>{victimInfo.location.name}</p>
              <p><span className="font-bold text-slate-400">DOB: </span>{victimInfo.dob}</p>
              <p><span className="font-bold text-slate-400">Address: </span>{victimInfo.address}</p>
              <p><span className="font-bold text-slate-400">Origin: </span>{victimInfo.stateOfOrigin}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const DeviceInfoDisplay: React.FC<{ victimInfo: VictimInfo }> = ({ victimInfo }) => {
  return (
    <div className="w-full h-full p-6 rounded-lg border border-slate-700 bg-slate-800/50 animate-fadeIn">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">Device Information</h2>
      <div className="text-sm space-y-4">
        <div>
            <h3 className="text-slate-400 font-bold mb-2 border-b border-slate-700 pb-1">Primary</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                <span className="text-slate-500">Network</span><span className="col-span-2 text-white">{victimInfo.network1}</span>
                <span className="text-slate-500">Carrier</span><span className="col-span-2 text-white">{victimInfo.carrier.split('/')[0]?.trim()}</span>
                <span className="text-slate-500">IMEI</span><span className="col-span-2 text-white">{victimInfo.imei}</span>
                <span className="text-slate-500">ICCID</span><span className="col-span-2 text-white">{victimInfo.iccid}</span>
                <span className="text-slate-500">MEID</span><span className="col-span-2 text-white">{victimInfo.meid}</span>
            </div>
        </div>
         <div>
            <h3 className="text-slate-400 font-bold mb-2 border-b border-slate-700 pb-1">Secondary</h3>
             <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                <span className="text-slate-500">Network</span><span className="col-span-2 text-white">{victimInfo.network2}</span>
                <span className="text-slate-500">Carrier</span><span className="col-span-2 text-white">{victimInfo.carrier.split('/')[1]?.trim()}</span>
                <span className="text-slate-500">IMEI2</span><span className="col-span-2 text-white">{victimInfo.imei2}</span>
            </div>
        </div>
        <div>
            <h3 className="text-slate-400 font-bold mb-2 border-b border-slate-700 pb-1">Identifiers</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                 <span className="text-slate-500">EID</span><span className="col-span-2 text-white break-all">{victimInfo.eid}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const ThreatMap: React.FC<{ victimLocation: Location; attackerLocation: Location }> = ({ victimLocation, attackerLocation }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const MAP_BOUNDS = {
    topLeft: { lat: 13.10, lon: 5.18 },
    bottomRight: { lat: 13.00, lon: 5.28 }
  };
  const MAP_WIDTH = 800;
  const MAP_HEIGHT = 800;

  const project = (lat: number, lon: number) => {
      const y = ((MAP_BOUNDS.topLeft.lat - lat) / (MAP_BOUNDS.topLeft.lat - MAP_BOUNDS.bottomRight.lat)) * MAP_HEIGHT;
      const x = ((lon - MAP_BOUNDS.topLeft.lon) / (MAP_BOUNDS.bottomRight.lon - MAP_BOUNDS.topLeft.lon)) * MAP_WIDTH;
      return { x, y };
  };

  const VICTIM_POS = project(victimLocation.lat, victimLocation.lon);
  const ATTACKER_POS = project(attackerLocation.lat, attackerLocation.lon);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsPanning(true);
    setStartPoint({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isPanning) return;
    const x = e.clientX - startPoint.x;
    const y = e.clientY - startPoint.y;
    setTransform({ ...transform, x, y });
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
      e.preventDefault();
      if (!svgRef.current) return;

      const scaleFactor = 1.1;
      const { scale } = transform;
      const newScale = e.deltaY > 0 ? scale / scaleFactor : scale * scaleFactor;
      
      const clampedScale = Math.min(Math.max(0.5, newScale), 5);

      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;

      const pointX = (mouseX - transform.x) / scale;
      const pointY = (mouseY - transform.y) / scale;

      setTransform({
          scale: clampedScale,
          x: mouseX - pointX * clampedScale,
          y: mouseY - pointY * clampedScale,
      });
  };

  const zoom = (direction: 'in' | 'out') => {
      const scaleFactor = 1.2;
      const { scale } = transform;
      const newScale = direction === 'in' ? scale * scaleFactor : scale / scaleFactor;
      const clampedScale = Math.min(Math.max(0.5, newScale), 5);
      if (!svgRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const centerX = svgRect.width / 2;
      const centerY = svgRect.height / 2;
      const pointX = (centerX - transform.x) / scale;
      const pointY = (centerY - transform.y) / scale;
      setTransform({
          scale: clampedScale,
          x: centerX - pointX * clampedScale,
          y: centerY - pointY * clampedScale,
      });
  }

  const resetTransform = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div className="w-full h-full p-6 rounded-lg border border-slate-700 bg-slate-800/50 animate-fadeIn">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">Threat Vector Map</h2>
      <div className="relative aspect-square bg-black/30 rounded-md overflow-hidden border border-slate-700 select-none">
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
            <button onClick={() => zoom('in')} className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600 rounded text-xl font-bold">+</button>
            <button onClick={() => zoom('out')} className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600 rounded text-xl font-bold">-</button>
            <button onClick={resetTransform} className="w-8 h-8 bg-slate-700/50 hover:bg-slate-600 rounded p-1.5"><HomeIcon /></button>
        </div>
        
        <svg 
            ref={svgRef} 
            className={`w-full h-full ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            preserveAspectRatio="xMidYMid slice"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onWheel={handleWheel}
        >
            <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
                <image href="https://i.imgur.com/vHqXFSO.jpeg" x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} />
                
                <line 
                    x1={VICTIM_POS.x} y1={VICTIM_POS.y} 
                    x2={ATTACKER_POS.x} y2={ATTACKER_POS.y}
                    stroke="#f43f5e" 
                    strokeWidth={1.5 / transform.scale} 
                    strokeDasharray={`${4 / transform.scale}, ${4 / transform.scale}`}
                >
                    <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
                </line>

                <g 
                    transform={`translate(${VICTIM_POS.x}, ${VICTIM_POS.y})`}
                    onMouseEnter={() => setHoveredLocation(victimLocation.name)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    className="transition-transform duration-200 hover:scale-125"
                >
                    <circle r={5 / transform.scale} fill="#22c55e" stroke="#fff" strokeWidth={1 / transform.scale}/>
                    {hoveredLocation === victimLocation.name && (
                        <text x="0" y={-10 / transform.scale} textAnchor="middle" fill="#fff" fontSize={10 / transform.scale} className="font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {victimLocation.name}
                        </text>
                    )}
                </g>
                <g 
                    transform={`translate(${ATTACKER_POS.x}, ${ATTACKER_POS.y})`}
                    onMouseEnter={() => setHoveredLocation(attackerLocation.name)}
                    onMouseLeave={() => setHoveredLocation(null)}
                     className="transition-transform duration-200 hover:scale-125"
                >
                    <circle r={5 / transform.scale} fill="#ef4444" stroke="#fff" strokeWidth={1 / transform.scale}/>
                     {hoveredLocation === attackerLocation.name && (
                        <text x="0" y={16 / transform.scale} textAnchor="middle" fill="#fff" fontSize={10 / transform.scale} className="font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {attackerLocation.name}
                        </text>
                    )}
                </g>
            </g>
        </svg>
      </div>
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-cyan-400">Analysis Log Details</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>
        <div className="p-4 h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
           {logs.map(log => (
              <div key={log.id} className="flex items-center gap-3 mb-2">
                <div className="flex-shrink-0 text-slate-500">
                  {log.icon}
                </div>
                <p className="flex-grow text-sm text-slate-300">{log.message}</p>
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
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center justify-center p-4 selection:bg-cyan-300 selection:text-cyan-900">
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
          Device Integrity Analyzer
        </h1>
        <p className="text-slate-400 mt-2">BackTrack OS v22.5</p>
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

      <footer className="mt-12 text-center text-xs text-slate-600">
          <p>&copy; 2024 Corporate Security Division</p>
      </footer>
    </div>
  );
}

export default App;