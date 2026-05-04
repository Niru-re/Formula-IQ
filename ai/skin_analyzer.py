import cv2
import numpy as np
import sys
import json
import os

def analyze_skin(image_path):
    # Ensure path is handled correctly across OS
    image_path = os.path.abspath(image_path)
    image = cv2.imread(image_path)
    if image is None:
        return {"error": f"Image not found at {image_path}"}

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Texture analysis using Laplacian variance
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()
    
    # Edge detection for pores/wrinkles
    edges = cv2.Canny(gray, 50, 150)
    edge_density = np.sum(edges > 0) / (gray.shape[0] * gray.shape[1])
    
    # Color analysis for redness/inflammation
    # Red hue is around 0-10 in HSV
    red_mask = cv2.inRange(hsv, np.array([0, 50, 50]), np.array([10, 255, 255]))
    red_density = np.sum(red_mask > 0) / (hsv.shape[0] * hsv.shape[1])
    
    # Brightness analysis for dark spots/hyperpigmentation
    brightness = np.mean(gray) / 255.0
    
    # Contrast analysis for uneven texture
    contrast = np.std(gray) / 255.0
    
    # Detected issues based on analysis
    detected_issues = []
    
    # Issue detection logic
    if variance < 80:
        detected_issues.append("Dullness")
    if variance < 60:
        detected_issues.append("Dry Patches")
    
    if edge_density > 0.08:
        detected_issues.append("Visible Pores")
    if edge_density > 0.12:
        detected_issues.append("Fine Lines")
    
    if red_density > 0.15:
        detected_issues.append("Redness/Rosacea")
    if red_density > 0.08:
        detected_issues.append("Acne Breakouts")
    
    if brightness < 0.4:
        detected_issues.append("Dark Spots")
    if brightness < 0.3:
        detected_issues.append("Melasma")
    
    if contrast < 0.2:
        detected_issues.append("Uneven Texture")
    
    if edge_density > 0.05 and variance > 100:
        detected_issues.append("Clogged Pores")
    
    if red_density < 0.05 and brightness < 0.35 and contrast < 0.15:
        detected_issues.append("Hyperpigmentation")
    
    # Health score calculation (0-100)
    # Lower variance and moderate edge density are ideal
    variance_score = min(100, (variance / 150) * 100)
    edge_score = max(0, 100 - (edge_density * 800))
    red_score = max(0, 100 - (red_density * 400))
    brightness_score = min(100, brightness * 150)
    contrast_score = (contrast * 150)
    
    score = (variance_score * 0.2 + edge_score * 0.2 + red_score * 0.3 + brightness_score * 0.15 + contrast_score * 0.15)
    score = max(0, min(100, score))
    
    # If no issues detected, add generic good health
    if len(detected_issues) == 0:
        detected_issues = ["Healthy Skin", "Well-Maintained"]

    return {
        "score": round(score, 2),
        "detectedIssues": list(set(detected_issues)),  # Remove duplicates
        "variance": round(variance, 2),
        "edgeDensity": round(edge_density, 4),
        "redDensity": round(red_density, 4),
        "brightness": round(brightness, 2),
        "contrast": round(contrast, 2)
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        result = analyze_skin(sys.argv[1])
        print(json.dumps(result))
    else:
        print(json.dumps({"error": "No image path provided"}))
