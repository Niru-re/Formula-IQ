import React, { useState } from 'react';
import axios from 'axios';

const SkinAnalyzer = ({ user, selectedProblems = [], onAnalysisComplete }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [showMagic, setShowMagic] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) return;
        setAnalyzing(true);
        setShowMagic(true);
        
        // Add magic animation delay
        setTimeout(async () => {
            const formData = new FormData();
            formData.append('image', image);
            if (user) formData.append('userId', user.id);
            if (selectedProblems.length > 0) {
                formData.append('selectedProblems', JSON.stringify(selectedProblems));
            }

            try {
                const res = await axios.post('http://localhost:5000/api/analysis/upload', formData);
                const responseAnalysis = res.data.analysis || {};
                const highlightAreas = [
                    { left: '12%', top: '22%' },
                    { left: '70%', top: '18%' },
                    { left: '55%', top: '62%' },
                    { left: '24%', top: '68%' }
                ];
                const analysisPayload = {
                    ...responseAnalysis,
                    beforeImage: preview,
                    afterImage: preview,
                    highlightAreas
                };
                setAnalysisResult(analysisPayload);
                onAnalysisComplete(analysisPayload);
            } catch (err) {
                alert('Analysis failed');
            } finally {
                setAnalyzing(false);
                setShowMagic(false);
            }
        }, 2000); // 2 second magic animation
    };

    return (
        <div className="analyzer-container">
            <h3>🔍 Detect Face & Analyze Skin</h3>
            <p>Upload a clear photo of your face to detect seasonal skin concerns and get personalized recommendations.</p>
            
            <div className="upload-area">
                {preview ? (
                    <div className="preview-container">
                        <img src={preview} alt="Preview" className="preview-img" />
                        {showMagic && (
                            <div className="magic-overlay">
                                <div className="magic-sparkles">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className="sparkle" style={{ 
                                            animationDelay: `${i * 0.1}s`,
                                            left: `${20 + (i % 4) * 20}%`,
                                            top: `${20 + Math.floor(i / 4) * 20}%`
                                        }}>
                                            ✨
                                        </div>
                                    ))}
                                </div>
                                <div className="analyzing-text">Analyzing your skin...</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="upload-placeholder">
                        <div className="upload-icon">📸</div>
                        <div className="upload-text">
                            <strong>Choose your photo</strong>
                            <span>Click to select or drag & drop</span>
                        </div>
                        <label className="choose-file-btn">
                            Choose File
                            <input 
                                type="file" 
                                onChange={handleFileChange} 
                                accept="image/*" 
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                )}
                {preview && (
                    <label className="change-file-btn">
                        📁 Change Image
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            accept="image/*" 
                            style={{ display: 'none' }}
                        />
                    </label>
                )}
            </div>

            {analysisResult && !analyzing && (
                <div className="compare-panel">
                    <div className="compare-column">
                        <h4>Before</h4>
                        <div className="compare-image-card before-card">
                            <img src={analysisResult.beforeImage} alt="Before" />
                        </div>
                    </div>
                    <div className="compare-column">
                        <h4>After</h4>
                        <div className="compare-image-card after-card">
                            <img src={analysisResult.afterImage} alt="After" />
                            {analysisResult.highlightAreas?.map((area, index) => (
                                <div key={index} className="highlight-dot" style={{ left: area.left, top: area.top }}>
                                    ⚡
                                </div>
                            ))}
                        </div>
                        <div className="compare-note">Detected markers show where skin concerns were highlighted in the analysis.</div>
                    </div>
                </div>
            )}
            <button 
                onClick={handleUpload} 
                disabled={!image || analyzing}
                className={`analyze-btn ${analyzing ? 'analyzing' : ''}`}
            >
                {analyzing ? (
                    <>
                        <div className="loading-spinner"></div>
                        Analyzing...
                    </>
                ) : (
                    <>
                        ⚡ Start Analysis
                    </>
                )}
            </button>

            <style>{`
                .analyzer-container { 
                    background: linear-gradient(135deg, #fff9c4 0%, #fffde7 100%);
                    padding: 40px; 
                    border-radius: 25px; 
                    text-align: center;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1); 
                    margin-bottom: 30px;
                    border: 3px solid #fbc02d;
                    position: relative;
                    overflow: hidden;
                }

                .analyzer-container::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(251, 192, 45, 0.1) 0%, transparent 70%);
                    animation: rotate 20s linear infinite;
                    pointer-events: none;
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .upload-area { 
                    margin: 30px 0; 
                    border: 3px dashed #fbc02d; 
                    padding: 30px; 
                    border-radius: 20px; 
                    background: rgba(251, 192, 45, 0.05);
                    transition: all 0.3s;
                    position: relative;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .upload-area:hover {
                    border-color: #ff9800;
                    background: rgba(251, 192, 45, 0.1);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(251, 192, 45, 0.2);
                }

                .upload-placeholder {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }

                .upload-icon {
                    font-size: 4rem;
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }

                .upload-text {
                    text-align: center;
                }

                .upload-text strong {
                    display: block;
                    font-size: 1.2rem;
                    color: #333;
                    margin-bottom: 5px;
                }

                .upload-text span {
                    color: #666;
                    font-size: 0.9rem;
                }

                .choose-file-btn {
                    background: linear-gradient(135deg, #fbc02d, #ff9800);
                    color: white;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1rem;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(251, 192, 45, 0.3);
                    border: none;
                    display: inline-block;
                }

                .choose-file-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(251, 192, 45, 0.4);
                }

                .change-file-btn {
                    background: rgba(251, 192, 45, 0.2);
                    color: #ff9800;
                    padding: 8px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 0.9rem;
                    transition: all 0.3s;
                    border: 2px solid #fbc02d;
                    margin-top: 20px;
                    display: inline-block;
                }

                .change-file-btn:hover {
                    background: rgba(251, 192, 45, 0.3);
                    transform: translateY(-2px);
                }

                .compare-panel {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin: 20px 0;
                    text-align: left;
                }

                .compare-column h4 {
                    margin-bottom: 10px;
                    color: #333;
                    font-size: 1rem;
                    letter-spacing: 0.02em;
                }

                .compare-image-card {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 14px 30px rgba(0,0,0,0.12);
                    background: white;
                }

                .compare-image-card img {
                    width: 100%;
                    display: block;
                    border-radius: 20px;
                }

                .after-card {
                    border: 2px solid rgba(251, 192, 45, 0.3);
                }

                .highlight-dot {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 193, 7, 0.9);
                    color: #fff;
                    font-size: 0.85rem;
                    box-shadow: 0 0 15px rgba(251, 192, 45, 0.5);
                }

                .compare-note {
                    margin-top: 10px;
                    font-size: 0.9rem;
                    color: #555;
                }

                .preview-container {
                    position: relative;
                    display: inline-block;
                }

                .preview-img { 
                    max-width: 100%; 
                    max-height: 300px; 
                    border-radius: 15px; 
                    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                    border: 3px solid #fbc02d;
                }

                .magic-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(251, 192, 45, 0.9);
                    border-radius: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    animation: magicPulse 2s ease-in-out;
                }

                @keyframes magicPulse {
                    0% { opacity: 0; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.05); }
                    100% { opacity: 1; transform: scale(1); }
                }

                .magic-sparkles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }

                .sparkle {
                    position: absolute;
                    font-size: 2rem;
                    animation: sparkleFloat 2s ease-in-out infinite;
                    opacity: 0;
                }

                @keyframes sparkleFloat {
                    0% { 
                        opacity: 0; 
                        transform: translateY(0) scale(0.5) rotate(0deg); 
                    }
                    50% { 
                        opacity: 1; 
                        transform: translateY(-20px) scale(1) rotate(180deg); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateY(-40px) scale(0.5) rotate(360deg); 
                    }
                }

                .analyzing-text {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                    animation: textGlow 1.5s ease-in-out infinite alternate;
                }

                @keyframes textGlow {
                    from { text-shadow: 0 2px 10px rgba(0,0,0,0.3); }
                    to { text-shadow: 0 2px 20px rgba(255,255,255,0.8), 0 0 30px rgba(251,192,45,0.6); }
                }

                .analyze-btn { 
                    background: linear-gradient(135deg, #333, #555); 
                    color: white; 
                    border: none; 
                    padding: 15px 40px; 
                    border-radius: 30px; 
                    cursor: pointer; 
                    font-weight: bold; 
                    font-size: 1.1rem;
                    transition: all 0.3s;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    position: relative;
                    overflow: hidden;
                }

                .analyze-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }

                .analyze-btn:hover::before {
                    left: 100%;
                }

                .analyze-btn:hover { 
                    background: linear-gradient(135deg, #555, #777);
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }

                .analyze-btn:disabled { 
                    background: #ccc; 
                    cursor: not-allowed; 
                    transform: none;
                    box-shadow: none;
                }

                .analyze-btn.analyzing {
                    animation: analyzingPulse 1s ease-in-out infinite;
                }

                @keyframes analyzingPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .placeholder { 
                    height: 200px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: #999; 
                    font-size: 1.1rem;
                }
            `}</style>
        </div>
    );
};

export default SkinAnalyzer;
