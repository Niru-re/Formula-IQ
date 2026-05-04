import React, { useState } from 'react';

const QuickResultSummary = ({ results, selectedProblems = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const renderAnalysisContent = () => {
        const analysis = results || {};
        const recommendations = analysis?.recommendations || [];
        const routine = analysis?.routine || {};
        const expertTips = analysis?.expertTips || {};
        const detectedIssues = analysis?.detectedIssues || [];
        const describedProblems = selectedProblems.map(problem => problem.name);
        const allIssues = [...new Set([...detectedIssues, ...describedProblems])];

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h3>✨ Your Personalized Skin Analysis</h3>
                    <button className="close-btn" onClick={closeModal}>×</button>
                </div>

                <div className="analysis-tabs">
                    <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                        📊 Overview
                    </button>
                    <button className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
                        🧴 Recommended Products
                    </button>
                    <button className={`tab-btn ${activeTab === 'routine' ? 'active' : ''}`} onClick={() => setActiveTab('routine')}>
                        🗓️ Routine
                    </button>
                    <button className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`} onClick={() => setActiveTab('tips')}>
                        💡 Expert Tips
                    </button>
                </div>

                <div className="modal-body analysis-modal-body">
                    {activeTab === 'overview' && (
                        <div className="tab-content">
                            <div className="health-score-display">
                                <div className="score-circle">
                                    <span className="score-number">{Math.round(analysis?.score || 0)}%</span>
                                    <span className="score-label">Health Score</span>
                                </div>
                                <div className="score-description">
                                    <p>Your skin is performing at {Math.round(analysis?.score || 0)}% capacity. Here's what we detected:</p>
                                </div>
                            </div>

                            {analysis.beforeImage && analysis.afterImage && (
                                <div className="image-compare-panel">
                                    <div className="compare-card">
                                        <h5>Before</h5>
                                        <img src={analysis.beforeImage} alt="Before" />
                                    </div>
                                    <div className="compare-card">
                                        <h5>After</h5>
                                        <div className="compare-after-wrapper">
                                            <img src={analysis.afterImage} alt="After" />
                                            {(analysis.highlightAreas || []).map((area, idx) => (
                                                <span key={idx} className="compare-spot" style={{ left: area.left, top: area.top }}>⚡</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="detected-issues-grid">
                                <h4>🎯 Detected Issues:</h4>
                                <div className="issues-list">
                                    {allIssues.map((issue, idx) => (
                                        <span key={idx} className="issue-badge">{issue}</span>
                                    ))}
                                </div>
                            </div>

                            {describedProblems.length > 0 && (
                                <div className="detected-issues-grid">
                                    <h4>📌 Your Stated Concerns:</h4>
                                    <div className="issues-list">
                                        {describedProblems.map((issue, idx) => (
                                            <span key={idx} className="issue-badge">{issue}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="result-sections-grid">
                                <div className="res-section">
                                    <strong>📸 Analysis Details:</strong>
                                    <p>Based on advanced image analysis combining multiple skin metrics</p>
                                    <small>Variance: {analysis?.variance} | Edge Density: {analysis?.edgeDensity} | Red Density: {analysis?.redDensity}</small>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="tab-content">
                            <h4>🧴 Recommended Products for Your Skin</h4>
                            <p style={{ marginBottom: '20px', color: '#666' }}>These products are specifically chosen based on your detected issues and skin type:</p>
                            <div className="products-grid">
                                {recommendations.length > 0 ? (
                                    recommendations.map((product, idx) => (
                                        <div key={idx} className="product-card">
                                            <div className="product-icon">{product.image}</div>
                                            <h5>{product.name}</h5>
                                            <p className="product-category">{product.category}</p>
                                            <p className="product-description">{product.description}</p>
                                            <p className="product-price">{product.price}</p>
                                            <p className="product-for">For: {product.issues?.join(', ') || 'General skin support'}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No specific products recommended at this time.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'routine' && (
                        <div className="tab-content">
                            <h4>🗓️ Your Personalized Skincare Routine</h4>
                            
                            {routine.morning && (
                                <div className="routine-section">
                                    <h5>☀️ Morning Routine</h5>
                                    <ol className="routine-steps">
                                        {routine.morning.map((step, idx) => (
                                            <li key={idx}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            )}

                            {routine.evening && (
                                <div className="routine-section">
                                    <h5>🌙 Evening Routine</h5>
                                    <ol className="routine-steps">
                                        {routine.evening.map((step, idx) => (
                                            <li key={idx}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'tips' && (
                        <div className="tab-content">
                            <h4>💡 Expert Skincare & Lifestyle Tips</h4>
                            
                            {expertTips.skinTypeSpecific && (
                                <div className="tips-section">
                                    <h5>🧬 Skin Type Specific:</h5>
                                    <ul className="tips-list">
                                        {expertTips.skinTypeSpecific.map((tip, idx) => (
                                            <li key={idx}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {expertTips.lifestyle && (
                                <div className="tips-section">
                                    <h5>🌟 Lifestyle Tips:</h5>
                                    <ul className="tips-list">
                                        {expertTips.lifestyle.map((tip, idx) => (
                                            <li key={idx}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <style>{`
                    .analysis-tabs {
                        display: flex;
                        gap: 10px;
                        margin-bottom: 20px;
                        flex-wrap: wrap;
                    }
                    .tab-btn {
                        padding: 8px 16px;
                        background: #fff9c4;
                        border: 2px solid #fbc02d;
                        border-radius: 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .tab-btn.active {
                        background: #fbc02d;
                        color: white;
                    }
                    .tab-content { animation: fadeIn 0.3s; }
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    .health-score-display { display: flex; gap: 20px; align-items: center; margin-bottom: 20px; }
                    .score-circle { 
                        width: 120px; height: 120px; 
                        border-radius: 50%; 
                        background: linear-gradient(135deg, #fbc02d, #ff9800);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        flex-shrink: 0;
                    }
                    .score-number { font-size: 2.5rem; font-weight: bold; }
                    .score-label { font-size: 0.85rem; }
                    .detected-issues-grid { margin: 20px 0; }
                    .issues-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
                    .issue-badge { 
                        background: #ffe082;
                        color: #333;
                        padding: 6px 12px;
                        border-radius: 15px;
                        font-size: 0.85rem;
                        font-weight: 500;
                    }
                    .products-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 15px;
                        margin-top: 15px;
                    }
                    .product-card {
                        background: #fff9c4;
                        padding: 15px;
                        border-radius: 12px;
                        text-align: center;
                    }
                    .product-icon { font-size: 2rem; margin-bottom: 10px; }
                    .product-card h5 { margin: 10px 0 5px 0; color: #333; }
                    .product-category { color: #fbc02d; font-weight: 600; font-size: 0.85rem; }
                    .product-description { font-size: 0.85rem; color: #666; margin: 8px 0; }
                    .product-price { font-weight: bold; color: #ff9800; }
                    .product-for { font-size: 0.75rem; color: #999; margin-top: 8px; }
                    .routine-section { margin: 20px 0; }
                    .routine-section h5 { color: #fbc02d; margin-bottom: 10px; }
                    .routine-steps { padding-left: 20px; line-height: 1.8; }
                    .routine-steps li { margin-bottom: 8px; }
                    .tips-section { margin: 20px 0; }
                    .tips-section h5 { color: #fbc02d; margin-bottom: 10px; }
                    .tips-list { padding-left: 20px; line-height: 1.8; }
                    .tips-list li { margin-bottom: 10px; }
                    .image-compare-panel {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 16px;
                        margin: 20px 0;
                    }
                    .compare-card {
                        background: #fff;
                        padding: 14px;
                        border-radius: 18px;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
                        text-align: center;
                    }
                    .compare-card h5 {
                        margin-bottom: 12px;
                        color: #fbc02d;
                    }
                    .compare-card img {
                        width: 100%;
                        border-radius: 16px;
                        display: block;
                    }
                    .compare-after-wrapper {
                        position: relative;
                    }
                    .compare-spot {
                        position: absolute;
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        background: rgba(251, 192, 45, 0.95);
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: translate(-50%, -50%);
                        box-shadow: 0 0 18px rgba(251, 192, 45, 0.35);
                    }
                `}</style>
            </div>
        );
    };

    const renderContent = () => {
        // If analysis results exist, show the enhanced analysis
        if (results) {
            return renderAnalysisContent();
        }

        // If no problems selected, use default results
        if (selectedProblems.length === 0) {
            return (
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>✨ Your Skin Checkup Result</h3>
                        <button className="close-btn" onClick={closeModal}>×</button>
                    </div>
                    
                    <div className="modal-body">
                        <div className="result-sections-grid">
                            <div className="res-section">
                                <strong>💡 Expert Tip:</strong>
                                <p>{results?.tip || "Stay consistent with your routine for best results."}</p>
                            </div>
                            <div className="res-section">
                                <strong>🧴 Top Product:</strong>
                                <p>{results?.recommendedProduct || "Gentle Cleanser"}</p>
                            </div>
                            <div className="res-section">
                                <strong>⚙️ Solution:</strong>
                                <p>{results?.solution || "Focus on barrier repair."}</p>
                            </div>
                            <div className="res-section">
                                <strong>🗓️ Routine:</strong>
                                <p>{results?.routine || "AM: Cleanse + SPF | PM: Double Cleanse + Hydrate"}</p>
                            </div>
                            <div className="res-section full-width">
                                <div className="suggestion-box">
                                    <div className="do">
                                        <strong>✅ Do:</strong>
                                        <span>{results?.do || "Drink 3L water daily"}</span>
                                    </div>
                                    <div className="dont">
                                        <strong>❌ Don't:</strong>
                                        <span>{results?.dont || "Don't touch your face often"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // If problems selected, customize results based on problems
        const primaryProblem = selectedProblems[0]; // Use first problem as primary
        const allSolutions = selectedProblems.map(p => p.solution).join(" + ");
        const allRoutines = selectedProblems.map(p => p.routine).join(" | ");
        const allDos = selectedProblems.map(p => p.do).join(" + ");
        const allDonts = selectedProblems.map(p => p.dont).join(" + ");

        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h3>✨ Your Personalized Skin Checkup Result</h3>
                    <button className="close-btn" onClick={closeModal}>×</button>
                </div>
                
                <div className="modal-body">
                    <div className="selected-problems-summary">
                        <h4>🎯 Problems Identified:</h4>
                        <div className="problems-list">
                            {selectedProblems.map((problem, i) => (
                                <span key={i} className="problem-tag">{problem.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="result-sections-grid">
                        <div className="res-section">
                            <strong>💡 Expert Tip:</strong>
                            <p>Address your {selectedProblems.length > 1 ? 'multiple concerns' : primaryProblem.name.toLowerCase()} with targeted care.</p>
                        </div>
                        <div className="res-section">
                            <strong>🧴 Top Product:</strong>
                            <p>{results?.recommendedProduct || "Multi-purpose Treatment"}</p>
                        </div>
                        <div className="res-section">
                            <strong>⚙️ Solution:</strong>
                            <p>{allSolutions || "Comprehensive skin care approach"}</p>
                        </div>
                        <div className="res-section">
                            <strong>🗓️ Routine:</strong>
                            <p>{allRoutines || "AM: Cleanse + SPF | PM: Double Cleanse + Hydrate"}</p>
                        </div>
                        <div className="res-section full-width">
                            <div className="suggestion-box">
                                <div className="do">
                                    <strong>✅ Do:</strong>
                                    <span>{allDos || "Follow your personalized routine"}</span>
                                </div>
                                <div className="dont">
                                    <strong>❌ Don't:</strong>
                                    <span>{allDonts || "Avoid triggers for your skin type"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="card dashboard-top-block result-block" onClick={openModal}>
                <h3 style={{ color: '#fbc02d', cursor: 'pointer' }}>
                    📊 Checkup Result
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px' }}>
                    {results ? 'Click to view your personalized results' : 'Complete analysis to see results'}
                </p>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container animate-modal" onClick={(e) => e.stopPropagation()}>
                        {results ? renderContent() : (
                            <div className="modal-content empty-modal">
                                <div className="modal-header">
                                    <h3>📊 Checkup Result</h3>
                                    <button className="close-btn" onClick={closeModal}>×</button>
                                </div>
                                <div className="modal-body">
                                    <p>Complete a skin analysis to see your personalized results here!</p>
                                    <div className="placeholder-blocks">
                                        <div className="placeholder-line"></div>
                                        <div className="placeholder-line short"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                .result-block { 
                    background: linear-gradient(135deg, #ffd54f 0%, #ffb74d 50%, #ffa726 100%);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 3px solid #ff9800;
                    position: relative;
                    overflow: hidden;
                }
                .result-block::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(135deg, #ffeb3b, #ffc107, #ff9800, #ff5722);
                    border-radius: 20px;
                    opacity: 0;
                    z-index: -1;
                    transition: opacity 0.3s;
                }
                .result-block:hover {
                    transform: translateY(-8px) scale(1.05) rotateY(5deg);
                    box-shadow: 0 20px 40px rgba(255, 152, 0, 0.4), 0 0 30px rgba(255, 193, 7, 0.3);
                    border-color: #ff5722;
                }
                .result-block:hover h3,
                .result-block:hover p {
                    color: #d84315;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                }

                .modal-container {
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                .modal-content {
                    background: linear-gradient(135deg, #fff 0%, #f0f8ff 100%);
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    border: 3px solid #fbc02d;
                    overflow: hidden;
                }

                .empty-modal {
                    background: linear-gradient(135deg, #fff 0%, #ffebee 100%);
                }

                .modal-header {
                    background: linear-gradient(135deg, #fbc02d 0%, #ff9800 100%);
                    color: white;
                    padding: 20px 25px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-header h3 {
                    margin: 0;
                    font-size: 1.5rem;
                }

                .close-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 24px;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s;
                }

                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .modal-body {
                    padding: 25px;
                }

                .result-sections-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    font-size: 0.9rem;
                }

                .res-section {
                    background: linear-gradient(135deg, #fffde7 0%, #fff9c4 100%);
                    padding: 15px;
                    border-radius: 12px;
                    border: 2px solid #fbc02d;
                    transition: transform 0.3s;
                }

                .res-section:hover { transform: translateY(-3px); }

                .full-width { grid-column: span 2; }

                .suggestion-box {
                    display: flex;
                    justify-content: space-between;
                    gap: 15px;
                }

                .do, .dont {
                    flex: 1;
                    padding: 12px;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    border: 2px solid;
                }

                .do { 
                    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
                    border-color: #4caf50;
                    color: #2e7d32;
                }

                .dont { 
                    background: linear-gradient(135deg, #ffeeb3 0%, #ffcc80 100%);
                    border-color: #ff9800;
                    color: #f57c00;
                }

                .selected-problems-summary {
                    background: linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%);
                    padding: 15px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    border: 2px solid #ba68c8;
                }

                .selected-problems-summary h4 {
                    margin: 0 0 10px 0;
                    color: #7b1fa2;
                    font-size: 1.1rem;
                }

                .problems-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .problem-tag {
                    background: linear-gradient(135deg, #ba68c8 0%, #9c27b0 100%);
                    color: white;
                    padding: 4px 10px;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .animate-modal {
                    animation: modalAppear 0.4s ease-out;
                }

                @keyframes modalAppear {
                    from { 
                        opacity: 0; 
                        transform: scale(0.8) translateY(-20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1) translateY(0); 
                    }
                }
            `}</style>
        </>
    );
};

export default QuickResultSummary;
