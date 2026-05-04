import React from 'react';

const AffiliateModal = ({ product, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container affiliate-modal-container" onClick={e => e.stopPropagation()}>
                <div className="modal-content animate-modal affiliate-modal-content">
                    <div className="modal-header affiliate-modal-header">
                        <h3>🛒 Purchase {product.name}</h3>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>

                    <div className="modal-body affiliate-modal-body">
                        <div className="affiliate-product-display">
                            <div className="product-showcase">
                                <div className="product-emoji-large">{product.image || product.emoji}</div>
                                <div className="product-details">
                                    <h4>{product.name}</h4>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-meta">
                                        <span className="category">{product.category}</span>
                                        <span className="price">{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="affiliate-section">
                            <h4>🔗 Affiliate Purchase Links</h4>
                            <p className="affiliate-note">
                                Support us by purchasing through our affiliate partners. These links help maintain and improve our skin analysis services.
                            </p>

                            <div className="affiliate-links">
                                <div className="affiliate-platform">
                                    <div className="platform-header">
                                        <span className="platform-icon">🛍️</span>
                                        <span className="platform-name">Amazon Affiliate</span>
                                    </div>
                                    <div className="affiliate-url">
                                        <input
                                            type="text"
                                            value="[AFFILIATE_URL_PLACEHOLDER_AMAZON]"
                                            readOnly
                                            className="url-input"
                                        />
                                        <button
                                            className="copy-btn"
                                            onClick={() => navigator.clipboard.writeText('[AFFILIATE_URL_PLACEHOLDER_AMAZON]')}
                                        >
                                            📋 Copy
                                        </button>
                                    </div>
                                </div>

                                <div className="affiliate-platform">
                                    <div className="platform-header">
                                        <span className="platform-icon">💄</span>
                                        <span className="platform-name">Beauty Platform Affiliate</span>
                                    </div>
                                    <div className="affiliate-url">
                                        <input
                                            type="text"
                                            value="[AFFILIATE_URL_PLACEHOLDER_BEAUTY]"
                                            readOnly
                                            className="url-input"
                                        />
                                        <button
                                            className="copy-btn"
                                            onClick={() => navigator.clipboard.writeText('[AFFILIATE_URL_PLACEHOLDER_BEAUTY]')}
                                        >
                                            📋 Copy
                                        </button>
                                    </div>
                                </div>

                                <div className="affiliate-platform">
                                    <div className="platform-header">
                                        <span className="platform-icon">🏪</span>
                                        <span className="platform-name">Nayaka Affiliate</span>
                                    </div>
                                    <div className="affiliate-url">
                                        <input
                                            type="text"
                                            value="[AFFILIATE_URL_PLACEHOLDER_NAYAKA]"
                                            readOnly
                                            className="url-input"
                                        />
                                        <button
                                            className="copy-btn"
                                            onClick={() => navigator.clipboard.writeText('[AFFILIATE_URL_PLACEHOLDER_NAYAKA]')}
                                        >
                                            📋 Copy
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="affiliate-benefits">
                                <h5>✨ Why Choose Affiliate Purchase?</h5>
                                <ul>
                                    <li>Support our free skin analysis service</li>
                                    <li>Get expert-recommended products</li>
                                    <li>Access to premium beauty brands</li>
                                    <li>Track your purchases and reviews</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .affiliate-modal-container {
                    max-width: 600px;
                    width: 90vw;
                }

                .affiliate-modal-header {
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                    color: white;
                    padding: 20px 25px;
                    border-radius: 15px 15px 0 0;
                }

                .affiliate-modal-header h3 {
                    margin: 0;
                    font-size: 1.4rem;
                }

                .affiliate-modal-body {
                    padding: 25px;
                }

                .affiliate-product-display {
                    margin-bottom: 30px;
                    padding: 20px;
                    background: linear-gradient(135deg, #fff9c4 0%, #fffde7 100%);
                    border-radius: 15px;
                    border: 2px solid #fbc02d;
                }

                .product-showcase {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .product-emoji-large {
                    font-size: 4rem;
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }

                .product-details h4 {
                    margin: 0 0 10px 0;
                    color: #333;
                    font-size: 1.3rem;
                }

                .product-description {
                    margin: 0 0 15px 0;
                    color: #666;
                    line-height: 1.5;
                }

                .product-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .category {
                    background: #fbc02d;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                }

                .price {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #ff6b9d;
                }

                .affiliate-section h4 {
                    color: #ff6b9d;
                    margin-bottom: 15px;
                    text-align: center;
                }

                .affiliate-note {
                    background: #fff8e1;
                    padding: 15px;
                    border-radius: 10px;
                    border-left: 4px solid #fbc02d;
                    margin-bottom: 25px;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                .affiliate-links {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .affiliate-platform {
                    background: white;
                    border: 2px solid #f0f0f0;
                    border-radius: 12px;
                    padding: 20px;
                    transition: all 0.3s;
                }

                .affiliate-platform:hover {
                    border-color: #ff6b9d;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(255, 107, 157, 0.1);
                }

                .platform-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .platform-icon {
                    font-size: 1.5rem;
                }

                .platform-name {
                    font-weight: bold;
                    color: #333;
                }

                .affiliate-url {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                .url-input {
                    flex: 1;
                    padding: 10px 15px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-family: monospace;
                    font-size: 0.9rem;
                    background: #f9f9f9;
                    color: #666;
                }

                .copy-btn {
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s;
                }

                .copy-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
                }

                .affiliate-benefits {
                    background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
                    padding: 20px;
                    border-radius: 12px;
                    border: 2px solid #4caf50;
                }

                .affiliate-benefits h5 {
                    color: #2e7d32;
                    margin: 0 0 15px 0;
                    text-align: center;
                }

                .affiliate-benefits ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .affiliate-benefits li {
                    padding: 8px 0;
                    position: relative;
                    padding-left: 25px;
                    color: #333;
                }

                .affiliate-benefits li:before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: #4caf50;
                    font-weight: bold;
                }

                .close-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                }

                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default AffiliateModal;