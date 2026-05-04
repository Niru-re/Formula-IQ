import React, { useState, useEffect } from 'react';

const seasonalData = {
    Winter: {
        color: '#8ec5fc',
        gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        icon: '❄️',
        commonProblems: ['Dryness', 'Flaky Skin', 'Redness', 'Dehydration'],
        tips: ['Moisturize heavily with ceramide creams', 'Use cream-based cleansers', 'Don\'t skip SPF even if it\'s cloudy'],
        solution: 'Focus on barrier repair and deep hydration.',
        routine: 'AM: Gentle Cleanse -> Hyaluronic Acid -> Rich Moisturizer -> SPF. PM: Oil Cleanse -> Cream Cleanse -> Night Mask.',
        products: [
            { name: 'Ceramide Cream', type: 'Moisturizer', price: '$22' },
            { name: 'Lipid Balm', type: 'Body Care', price: '$18' },
            { name: 'Gentle Milk Cleanser', type: 'Cleanser', price: '$15' }
        ]
    },
    Summer: {
        color: '#fbc2eb',
        gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        icon: '☀️',
        commonProblems: ['Excess Oil', 'Sunburn', 'Clogged Pores', 'Hyper-pigmentation'],
        tips: ['Stay hydrated with water-based products', 'Use lightweight gels', 'Reapply SPF every 2 hours outdoors'],
        solution: 'Focus on oil control and high UV protection.',
        routine: 'AM: Foaming Wash -> Vitamin C -> Gel Moisturizer -> SPF 50+. PM: Double Cleanse -> BHA Exfoliant -> Light Lotion.',
        products: [
            { name: 'Mattifying SPF', type: 'Protection', price: '$25' },
            { name: 'Salicylic Acid Gel', type: 'Treatment', price: '$19' },
            { name: 'Cooling Mist', type: 'Body Care', price: '$12' }
        ]
    },
    Monsoon: {
        color: '#84fab0',
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        icon: '🌧️',
        commonProblems: ['Humidity Breakouts', 'Fungal Infections', 'Dullness', 'Sticky Texture'],
        tips: ['Deep cleanse twice daily', 'Use water-resistant SPF', 'Exfoliate weekly to remove dead skin'],
        solution: 'Focus on anti-bacterial care and exfoliation.',
        routine: 'AM: Tea Tree Wash -> Niacinamide -> Light Moisturizer -> Waterproof SPF. PM: Deep Cleanse -> Clay Mask -> Soothing Gel.',
        products: [
            { name: 'Clay Mask', type: 'Treatment', price: '$16' },
            { name: 'Anti-Bacterial Wash', type: 'Cleanser', price: '$14' },
            { name: 'pH Balanced Toner', type: 'Toner', price: '$13' }
        ]
    },
    Spring: {
        color: '#fa709a',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        icon: '🌸',
        commonProblems: ['Seasonal Allergies', 'Sensitivity', 'Uneven Texture', 'Pollen Irritation'],
        tips: ['Gentle exfoliation to renew skin', 'Switch to lighter creams', 'Use antioxidant serums to fight pollen damage'],
        solution: 'Focus on soothing and renewal.',
        routine: 'AM: Soothing Wash -> Antioxidant Serum -> Light Cream -> SPF. PM: Gentle Cleanse -> Peptides -> Calming Mask.',
        products: [
            { name: 'Soothing Mist', type: 'Body Care', price: '$14' },
            { name: 'Antioxidant Serum', type: 'Treatment', price: '$28' },
            { name: 'Barrier Repair Gel', type: 'Moisturizer', price: '$21' }
        ]
    }
};

const ProcessingStep = ({ season, solution, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing analysis...');

    useEffect(() => {
        const stages = [
            { p: 20, s: 'Fetching seasonal data...' },
            { p: 40, s: 'Mapping skin concerns...' },
            { p: 70, s: 'Generating product matches...' },
            { p: 90, s: 'Finalizing your routine...' },
            { p: 100, s: 'Ready!' }
        ];

        let currentStage = 0;
        const interval = setInterval(() => {
            if (currentStage < stages.length) {
                setProgress(stages[currentStage].p);
                setStatus(stages[currentStage].s);
                currentStage++;
            } else {
                clearInterval(interval);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="step-content animate-fade">
            <h2>⚙️ Smart Processing</h2>
            <div className="processing-container">
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%`, background: '#fbc02d' }}></div>
                </div>
                <p className="status-text" style={{ color: '#fbc02d' }}>{status}</p>
                
                <div className="scanning-visual" style={{ border: '1px solid #fff9c4', background: '#fffde7' }}>
                    <div className="scan-line" style={{ background: 'rgba(251, 192, 45, 0.4)' }}></div>
                    <div className="data-points">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="data-point" style={{ 
                                left: `${Math.random() * 100}%`, 
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                background: '#fbc02d'
                            }}></div>
                        ))}
                    </div>
                </div>
            </div>

            {progress === 100 && (
                <div className="strategy-reveal animate-fade" style={{ background: '#fff9c4', border: '1px solid #fbc02d' }}>
                    <h3 style={{ color: '#333' }}>Analysis Complete!</h3>
                    <p><strong>Proposed Strategy:</strong> {solution}</p>
                    <button className="next-btn" onClick={onComplete}>Show My Results →</button>
                </div>
            )}

            <style>{`
                .processing-container { margin: 30px 0; }
                .progress-track { 
                    height: 10px; background: #eee; border-radius: 5px; 
                    overflow: hidden; margin-bottom: 15px; 
                }
                .progress-fill { 
                    height: 100%; background: #333; transition: width 0.5s ease;
                }
                .status-text { font-weight: bold; color: #666; font-family: monospace; }
                
                .scanning-visual {
                    height: 150px; background: #f8f9fa; border-radius: 12px;
                    position: relative; overflow: hidden; margin: 20px 0;
                    border: 1px solid #eee;
                }
                .scan-line {
                    position: absolute; top: 0; left: 0; width: 100%; height: 2px;
                    background: rgba(51, 51, 51, 0.3);
                    animation: scan 2s linear infinite;
                }
                @keyframes scan { from { top: 0; } to { top: 100%; } }
                
                .data-point {
                    position: absolute; width: 4px; height: 4px; background: #333;
                    border-radius: 50%; opacity: 0;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(2); }
                }
                .strategy-reveal { margin-top: 20px; padding: 20px; background: #e9ecef; border-radius: 12px; }
            `}</style>
        </div>
    );
};

const SeasonalBlocks = ({ activeSeason = 'Winter', detectedIssues = [] }) => {
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [step, setStep] = useState(0); // 0: Grid, 1: Problem, 2: Process, 3: Result

    const handleSeasonClick = (season) => {
        setSelectedSeason(season);
        setStep(1);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    const reset = () => {
        setStep(0);
        setSelectedSeason(null);
    };

    if (selectedSeason && step > 0) {
        const data = seasonalData[selectedSeason];
        return (
            <div className="seasonal-interactive-overlay">
                <div className="interactive-card" style={{ border: '3px solid #fbc02d' }}>
                    <button className="close-btn" onClick={reset} style={{ color: '#fbc02d' }}>×</button>
                    
                    <div className="step-indicator">
                        <div className={`dot ${step >= 1 ? 'active' : ''}`} style={{ background: step >= 1 ? '#fbc02d' : '#eee' }}></div>
                        <div className={`line ${step >= 2 ? 'active' : ''}`} style={{ background: step >= 2 ? '#fbc02d' : '#eee' }}></div>
                        <div className={`dot ${step >= 2 ? 'active' : ''}`} style={{ background: step >= 2 ? '#fbc02d' : '#eee' }}></div>
                        <div className={`line ${step >= 3 ? 'active' : ''}`} style={{ background: step >= 3 ? '#fbc02d' : '#eee' }}></div>
                        <div className={`dot ${step >= 3 ? 'active' : ''}`} style={{ background: step >= 3 ? '#fbc02d' : '#eee' }}></div>
                    </div>

                    {step === 1 && (
                        <div className="step-content animate-fade">
                            <h2 style={{ color: '#fbc02d' }}>{data.icon} {selectedSeason} Problems</h2>
                            <p>Common issues during this season include:</p>
                            <div className="problem-list">
                                {data.commonProblems.map(p => (
                                    <div key={p} className="problem-item" style={{ background: '#fff9c4', border: '1px solid #fbc02d' }}>{p}</div>
                                ))}
                            </div>
                            {detectedIssues.length > 0 && selectedSeason === activeSeason && (
                                <div className="personal-insight" style={{ background: '#fffde7', borderLeft: '4px solid #fbc02d' }}>
                                    <strong style={{ color: '#fbc02d' }}>AI Detection for You:</strong>
                                    <p>{detectedIssues.join(', ')}</p>
                                </div>
                            )}
                            <button className="next-btn" onClick={nextStep} style={{ background: '#fbc02d' }}>Process My Solution →</button>
                        </div>
                    )}

                    {step === 2 && (
                        <ProcessingStep 
                            season={selectedSeason} 
                            solution={data.solution} 
                            onComplete={nextStep} 
                        />
                    )}

                    {step === 3 && (
                        <div className="step-content animate-fade results-step">
                            <h2 style={{ color: '#fbc02d' }}>✨ Your {selectedSeason} Result</h2>
                            
                            <div className="results-grid">
                                <div className="result-section" style={{ background: '#fff9c4' }}>
                                    <h3 style={{ color: '#fbc02d' }}>💡 Expert Tips</h3>
                                    <ul>
                                        {data.tips.map((t, i) => <li key={i}>{t}</li>)}
                                    </ul>
                                </div>

                                <div className="result-section" style={{ background: '#fff9c4' }}>
                                    <h3 style={{ color: '#fbc02d' }}>🗓️ Daily Routine</h3>
                                    <p className="routine-text">{data.routine}</p>
                                </div>

                                <div className="result-section full-width" style={{ background: '#fff9c4' }}>
                                    <h3 style={{ color: '#fbc02d' }}>🛍️ Recommended Products</h3>
                                    <div className="mini-product-grid">
                                        {data.products.map(p => (
                                            <div key={p.name} className="mini-product-card" style={{ background: 'white', border: '1px solid #fbc02d' }}>
                                                <strong style={{ color: '#333' }}>{p.name}</strong>
                                                <span style={{ color: '#fbc02d' }}>{p.type} • {p.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <button className="next-btn" onClick={reset} style={{ background: '#fbc02d' }}>Back to Overview</button>
                        </div>
                    )}
                </div>

                <style>{`
                    .seasonal-interactive-overlay {
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
                        z-index: 1000; padding: 20px; backdrop-filter: blur(5px);
                        perspective: 2000px;
                    }
                    .interactive-card {
                        background: #fff; width: 100%; max-width: 700px; border-radius: 20px;
                        padding: 40px; position: relative; max-height: 90vh; overflow-y: auto;
                        box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                        animation: unfold 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                        transform-origin: center;
                    }
                    @keyframes unfold {
                        0% { transform: rotateX(-90deg) scale(0.5); opacity: 0; }
                        100% { transform: rotateX(0deg) scale(1); opacity: 1; }
                    }
                    .close-btn {
                        position: absolute; top: 15px; right: 20px; font-size: 30px;
                        background: none; border: none; cursor: pointer; color: #999;
                        transition: transform 0.3s;
                    }
                    .close-btn:hover { transform: rotate(90deg) scale(1.2); }
                    
                    .step-indicator { display: flex; align-items: center; justify-content: center; margin-bottom: 30px; }
                    .dot { width: 15px; height: 15px; border-radius: 50%; background: #eee; }
                    .line { width: 50px; height: 2px; background: #eee; }
                    .dot.active, .line.active { background: #333; }
                    
                    .animate-fade { animation: fadeIn 0.5s ease; }
                    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                    .problem-list { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; justify-content: center; }
                    .problem-item { 
                        background: #f0f0f0; padding: 10px 20px; border-radius: 30px; font-weight: bold; 
                        transition: transform 0.3s;
                    }
                    .problem-item:hover { transform: translateZ(20px) scale(1.1); }
                    
                    .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left; }
                    .result-section { background: #f9f9f9; padding: 15px; border-radius: 12px; transition: transform 0.3s; }
                    .result-section:hover { transform: translateZ(10px); }
                    .full-width { grid-column: span 2; }
                    .mini-product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 10px; }
                    .mini-product-card { 
                        background: #fff; padding: 10px; border-radius: 8px; border: 1px solid #eee; 
                        display: flex; flex-direction: column; transition: transform 0.3s;
                    }
                    .mini-product-card:hover { transform: rotateY(10deg); }
                    
                    .next-btn {
                        background: #333; color: #fff; border: none; padding: 15px 40px;
                        border-radius: 30px; font-size: 1rem; cursor: pointer; margin-top: 30px;
                        transition: all 0.2s;
                    }
                    .personal-insight { background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="seasonal-blocks-container">
            <div className="section-header">
                <h2>Seasonal Skin Blocks</h2>
                <p>Click a season to discover your personalized solution path.</p>
            </div>
            
            <div className="blocks-grid">
                {Object.entries(seasonalData).map(([season, data]) => (
                    <div 
                        key={season} 
                        className={`season-card ${activeSeason === season ? 'is-active' : ''}`}
                        onClick={() => handleSeasonClick(season)}
                        style={{ 
                            '--season-color': data.color,
                            '--season-gradient': data.gradient
                        }}
                    >
                        <div className="card-depth-layer"></div>
                        <div className="card-content-layer">
                            <div className="card-icon">{data.icon}</div>
                            <h3>{season}</h3>
                            <p>Explore {season} Routine</p>
                            {activeSeason === season && <span className="current-badge">Current Season</span>}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .seasonal-blocks-container { padding: 60px 20px; text-align: center; perspective: 1000px; }
                .section-header { margin-bottom: 50px; }
                .section-header h2 { font-size: 2.5rem; color: #333; margin-bottom: 10px; }
                
                .blocks-grid { 
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
                    gap: 40px; max-width: 1100px; margin: 0 auto; 
                }

                .season-card {
                    position: relative;
                    height: 250px;
                    cursor: pointer;
                    transform-style: preserve-3d;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .card-depth-layer {
                    position: absolute;
                    top: 10px; left: 10px;
                    width: 100%; height: 100%;
                    background: rgba(0,0,0,0.1);
                    border-radius: 24px;
                    transform: translateZ(-20px);
                    transition: all 0.4s;
                }

                .card-content-layer {
                    position: absolute;
                    width: 100%; height: 100%;
                    background: var(--season-gradient);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 
                        inset 0 2px 5px rgba(255,255,255,0.5),
                        0 5px 15px rgba(0,0,0,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 20px;
                    transform: translateZ(0);
                    transition: all 0.4s;
                }

                .season-card:hover {
                    transform: rotateX(10deg) rotateY(-10deg) translateY(-10px);
                }

                .season-card:hover .card-content-layer {
                    box-shadow: 
                        -5px 5px 0 var(--season-color),
                        -10px 10px 0 rgba(0,0,0,0.05),
                        0 20px 40px rgba(0,0,0,0.15);
                }

                .season-card:active {
                    transform: scale(0.95) translateZ(-10px);
                }

                .card-icon { 
                    font-size: 50px; margin-bottom: 15px; 
                    filter: drop-shadow(0 5px 10px rgba(0,0,0,0.2));
                    transition: transform 0.4s;
                }
                .season-card:hover .card-icon { transform: scale(1.2) translateZ(30px); }
                
                .season-card h3 { font-size: 1.8rem; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
                .season-card p { opacity: 0.9; font-weight: 500; margin-top: 5px; }

                .current-badge {
                    position: absolute; top: 15px; right: 15px;
                    background: rgba(255,255,255,0.3);
                    padding: 5px 12px; border-radius: 12px;
                    font-size: 0.7rem; font-weight: bold;
                    backdrop-filter: blur(4px);
                    border: 1px solid rgba(255,255,255,0.4);
                }
            `}</style>
        </div>
    );
};

export default SeasonalBlocks;
