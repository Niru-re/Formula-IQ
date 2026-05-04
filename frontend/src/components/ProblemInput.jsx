import React, { useState } from 'react';

const problemDatabase = [
    { name: "Acne Breakouts", description: "Inflammation of the skin, often caused by clogged pores.", solution: "Use salicylic acid treatments and oil-free moisturizers", routine: "AM: Cleanse + BHA Treatment + SPF | PM: Double Cleanse + BHA Treatment + Oil Control", do: "Use oil-free products", dont: "Don't pick at acne" },
    { name: "Dry Patches", description: "Rough, scaly areas often due to lack of moisture.", solution: "Hydrate with ceramides and hyaluronic acid", routine: "AM: Cleanse + Hydrate + SPF | PM: Double Cleanse + Barrier Repair + Overnight Mask", do: "Use humidifier in dry environments", dont: "Don't use hot water for cleansing" },
    { name: "Oily T-Zone", description: "Excess sebum production in the forehead, nose, and chin.", solution: "Balance sebum with niacinamide and mattifying products", routine: "AM: Cleanse + Oil Control + SPF | PM: Double Cleanse + Pore Minimizer + Light Hydration", do: "Use blotting papers when needed", dont: "Don't skip moisturizer" },
    { name: "Dark Spots", description: "Hyperpigmentation caused by sun damage or scarring.", solution: "Brighten with vitamin C and gentle exfoliation", routine: "AM: Cleanse + Vitamin C + SPF | PM: Double Cleanse + Brightening Serum + Recovery Cream", do: "Apply SPF daily", dont: "Don't use harsh exfoliants" },
    { name: "Fine Lines", description: "Early signs of aging or dehydration.", solution: "Plump skin with retinoids and peptides", routine: "AM: Cleanse + Anti-Aging Serum + SPF | PM: Double Cleanse + Retinoid + Eye Cream", do: "Stay hydrated", dont: "Don't smoke or expose to pollution" },
    { name: "Redness/Rosacea", description: "Sensitive skin showing flushed appearance.", solution: "Calm with green tea and soothing ingredients", routine: "AM: Gentle Cleanse + Calming Serum + SPF | PM: Gentle Cleanse + Barrier Repair + Soothing Mask", do: "Use fragrance-free products", dont: "Don't use hot showers" },
    { name: "Clogged Pores", description: "Blackheads and whiteheads from buildup.", solution: "Clear pores with AHAs and proper cleansing", routine: "AM: Cleanse + Exfoliate + SPF | PM: Double Cleanse + Pore Clearing Mask + Hydrate", do: "Clean makeup brushes weekly", dont: "Don't sleep with makeup on" },
    { name: "Uneven Texture", description: "Bumpy skin feeling often needing exfoliation.", solution: "Smooth with gentle exfoliation and hydration", routine: "AM: Cleanse + Exfoliate + Hydrate + SPF | PM: Double Cleanse + Smoothing Treatment + Barrier Cream", do: "Exfoliate 2-3 times per week", dont: "Don't over-exfoliate" },
    { name: "Fungal Infections", description: "Itchy, inflamed areas caused by fungal growth like athlete's foot or ringworm.", solution: "Use antifungal creams and keep area dry", routine: "AM: Gentle Cleanse + Antifungal Treatment + Dry Powder | PM: Cleanse + Antifungal Cream + Light Moisturizer", do: "Keep skin dry and clean", dont: "Don't share towels or personal items" },
    { name: "Eczema", description: "Chronic itchy and inflamed skin condition.", solution: "Use fragrance-free emollients and anti-inflammatory ingredients", routine: "AM: Gentle Cleanse + Barrier Cream + SPF | PM: Double Cleanse + Rich Moisturizer + Soothing Serum", do: "Use hypoallergenic products", dont: "Don't scratch or use harsh soaps" },
    { name: "Psoriasis", description: "Rapid skin cell turnover causing thick, scaly patches.", solution: "Exfoliate gently with salicylic acid and hydrate deeply", routine: "AM: Cleanse + Gentle Exfoliate + Hydrate + SPF | PM: Double Cleanse + Intensive Moisturizer + Healing Cream", do: "Stay hydrated and manage stress", dont: "Don't use very hot water" },
    { name: "Keratosis Pilaris", description: "Small bumpy texture on arms and thighs from keratin buildup.", solution: "Exfoliate with AHA/BHA products and moisturize", routine: "AM: Gentle Cleanse + Exfoliating Lotion + SPF | PM: Double Cleanse + AHA Treatment + Nourishing Cream", do: "Use gentle exfoliation regularly", dont: "Don't pick at bumps" },
    { name: "Seborrheic Dermatitis", description: "Oily, inflamed patches often on scalp or face.", solution: "Use antifungal and anti-inflammatory shampoos and creams", routine: "AM: Antifungal Cleanse + Light Moisturizer + SPF | PM: Antifungal Cleanse + Calming Serum + Hydrate", do: "Cleanse regularly", dont: "Don't use very hot water" },
    { name: "Contact Dermatitis", description: "Allergic reaction causing redness, itching, and swelling.", solution: "Identify and avoid triggers, use soothing creams", routine: "AM: Gentle Cleanse + Barrier Cream + SPF | PM: Gentle Cleanse + Soothing Treatment + Recovery Cream", do: "Identify and avoid allergens", dont: "Don't use irritating products" },
    { name: "Hives/Urticaria", description: "Raised red welts on skin from allergic reaction.", solution: "Apply cooling treatments and avoid triggers", routine: "AM: Cool Compress + Soothing Lotion + SPF | PM: Cool Compress + Anti-Itch Serum + Hydrate", do: "Use cool compresses", dont: "Don't scratch or use hot water" },
    { name: "Melasma", description: "Patches of darker skin, usually from sun exposure or hormones.", solution: "Use tyrosinase inhibitors and strong SPF", routine: "AM: Cleanse + Whitening Serum + SPF 50+ | PM: Double Cleanse + Brightening Treatment + Recovery Cream", do: "Apply sunscreen daily", dont: "Don't skip SPF or sun protection" },
    { name: "Scars & Hyperpigmentation", description: "Marks from acne, injury, or surgery.", solution: "Use retinoids, vitamin C, and microneedling treatments", routine: "AM: Cleanse + Vitamin C + SPF | PM: Double Cleanse + Retinoid + Healing Serum", do: "Be consistent with treatments", dont: "Don't pick at healing wounds" },
    { name: "Sensitive Skin", description: "Easily irritated skin prone to redness and reactions.", solution: "Use gentle, fragrance-free, minimal ingredients", routine: "AM: Gentle Cleanse + Soothing Toner + Barrier Cream + SPF | PM: Gentle Cleanse + Hydrating Serum + Recovery Cream", do: "Patch test new products", dont: "Don't use multiple actives at once" },
    { name: "Whiteheads", description: "Closed comedones from trapped sebum and bacteria.", solution: "Use gentle exfoliation and pore-clearing treatments", routine: "AM: Cleanse + Light Exfoliate + Oil Control + SPF | PM: Double Cleanse + Pore Treatment + Light Moisturizer", do: "Use consistent cleansing", dont: "Don't squeeze or pick" },
    { name: "Sunburn", description: "Painful skin damage from excessive UV exposure.", solution: "Use soothing aloe, hydrating products and strong SPF", routine: "AM: Gentle Cleanse + Aloe Gel + Hydrating Serum + SPF 50+ | PM: Gentle Cleanse + Healing Mask + Recovery Cream", do: "Hydrate and wear SPF", dont: "Don't expose to more sun" }
];

const ProblemInput = ({ selectedProblems = [], onProblemSelect }) => {
    const [inputText, setInputText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        setInputText("");
        setSuggestions([]);
    };
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);

        const normalized = text.toLowerCase().trim();
        if (normalized.length > 0) {
            const filtered = problemDatabase.filter(p => {
                const query = normalized;
                const name = p.name.toLowerCase();
                const description = p.description.toLowerCase();
                const keywords = `${p.name} ${p.description}`.toLowerCase();

                return (
                    name.includes(query) ||
                    description.includes(query) ||
                    keywords.split(/\s+/).some(word => word.startsWith(query))
                );
            });

            setSuggestions(filtered.length > 0 ? filtered : problemDatabase);
        } else {
            setSuggestions([]);
        }
    };

    const toggleProblemSelection = (problem) => {
        const isSelected = selectedProblems.some(p => p.name === problem.name);
        if (isSelected) {
            onProblemSelect(selectedProblems.filter(p => p.name !== problem.name));
        } else {
            onProblemSelect([...selectedProblems, problem]);
        }
    };

    const removeSelectedProblem = (problemName) => {
        onProblemSelect(selectedProblems.filter(p => p.name !== problemName));
    };

    return (
        <>
            <div className="card dashboard-top-block problem-input-block" onClick={openModal}>
                <h3 style={{ color: '#fbc02d', cursor: 'pointer' }}>
                    🔍 Describe Your Problem
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px' }}>
                    Click to describe your skin concerns
                </p>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container animate-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>🔍 Describe Your Problem</h3>
                                <button className="close-btn" onClick={closeModal}>×</button>
                            </div>
                            
                            <div className="modal-body">
                                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                                    Tell us what's bothering your skin today:
                                </p>
                                
                                <div className="input-wrapper">
                                    <textarea 
                                        placeholder="E.g., I have some red bumps on my chin..."
                                        value={inputText}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {selectedProblems.length > 0 && (
                                    <div className="selected-problems-container animate-fade">
                                        <p><strong>Selected Problems ({selectedProblems.length}):</strong></p>
                                        <div className="selected-problems-list">
                                            {selectedProblems.map((problem, i) => (
                                                <div key={i} className="selected-problem-item">
                                                    <span>{problem.name}</span>
                                                    <button 
                                                        className="remove-problem-btn"
                                                        onClick={() => removeSelectedProblem(problem.name)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {inputText.length === 0 && suggestions.length === 0 && (
                                    <div className="empty-state">
                                        <p>💡 Start typing to see related skin concerns</p>
                                        <small>Type keywords like "acne", "dry", "fungal", "eczema", etc.</small>
                                    </div>
                                )}

                                {suggestions.length > 0 && (
                                    <div className="suggestions-container animate-fade">
                                        <p className="section-label"><strong>Related Skin Issues:</strong> Choose the concerns that match your skin.</p>
                                        <div className="suggestion-list">
                                            {suggestions.map((p, i) => {
                                                const isSelected = selectedProblems.some(sp => sp.name === p.name);
                                                return (
                                                    <div 
                                                        key={i} 
                                                        className={`suggestion-item ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => toggleProblemSelection(p)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <div className="suggestion-header">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={isSelected}
                                                                onChange={() => toggleProblemSelection(p)}
                                                                style={{ marginRight: '10px' }}
                                                            />
                                                            <strong>{p.name}</strong>
                                                        </div>
                                                        <span>{p.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .problem-input-block { 
                    background: linear-gradient(135deg, #e91e63 0%, #c2185b 50%, #880e4f 100%);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 3px solid #ad1457;
                    position: relative;
                    overflow: hidden;
                }
                .problem-input-block::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(135deg, #ff1493, #e91e63, #c2185b, #880e4f);
                    border-radius: 20px;
                    opacity: 0;
                    z-index: -1;
                    transition: opacity 0.3s;
                }
                .problem-input-block:hover {
                    transform: translateY(-8px) scale(1.05) rotateY(-5deg);
                    box-shadow: 0 20px 40px rgba(233, 30, 99, 0.4), 0 0 30px rgba(240, 64, 87, 0.3);
                    border-color: #ff1493;
                    color: white;
                }
                .problem-input-block:hover h3,
                .problem-input-block:hover p {
                    color: white;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                .modal-content {
                    background: linear-gradient(135deg, #fff 0%, #f3e5f5 100%);
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    border: 3px solid #ba68c8;
                    overflow: hidden;
                }

                .modal-header {
                    background: linear-gradient(135deg, #ba68c8 0%, #9c27b0 100%);
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

                .input-wrapper { margin-bottom: 15px; }
                textarea {
                    width: 100%;
                    height: 100px;
                    padding: 15px;
                    border-radius: 12px;
                    border: 2px solid #e1bee7;
                    font-family: inherit;
                    resize: none;
                    transition: border-color 0.3s, box-shadow 0.3s;
                    box-sizing: border-box;
                    background: #fafafa;
                }
                textarea:focus {
                    outline: none;
                    border-color: #ba68c8;
                    box-shadow: 0 0 15px rgba(186, 104, 200, 0.2);
                    background: #fff;
                }

                .empty-state {
                    margin-top: 30px;
                    padding: 25px;
                    text-align: center;
                    background: linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%);
                    border-radius: 12px;
                    border: 2px dashed #ba68c8;
                }

                .empty-state p {
                    margin: 0 0 8px 0;
                    font-size: 1rem;
                    color: #4a148c;
                    font-weight: 500;
                }

                .empty-state small {
                    display: block;
                    color: #7b1fa2;
                    font-size: 0.8rem;
                }

                .suggestions-container {
                    margin-top: 20px;
                    text-align: left;
                    font-size: 0.85rem;
                }

                .section-label {
                    margin: 0 0 10px 0;
                    color: #4a148c;
                    font-size: 0.95rem;
                }

                .suggestion-list {
                    max-height: 200px;
                    overflow-y: auto;
                    margin-top: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .suggestion-item {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e8eaf6 100%);
                    padding: 12px 15px;
                    border-radius: 10px;
                    border-left: 4px solid #ba68c8;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.2s;
                }

                .suggestion-item:hover {
                    transform: translateX(5px);
                }

                .selected-problems-container {
                    margin-bottom: 20px;
                    text-align: left;
                    font-size: 0.85rem;
                }

                .selected-problems-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 10px;
                }

                .selected-problem-item {
                    background: linear-gradient(135deg, #ba68c8 0%, #9c27b0 100%);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .remove-problem-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    transition: background 0.3s;
                }

                .remove-problem-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .suggestion-item.selected {
                    background: linear-gradient(135deg, #ba68c8 0%, #9c27b0 100%);
                    color: white;
                    border-left-color: #fff;
                }

                .suggestion-item.selected strong,
                .suggestion-item.selected span {
                    color: white;
                }

                .suggestion-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 3px;
                }
                
                .animate-fade { 
                    animation: fadeIn 0.3s ease-out; 
                }
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translateY(5px); } 
                    to { opacity: 1; transform: translateY(0); } 
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

export default ProblemInput;
