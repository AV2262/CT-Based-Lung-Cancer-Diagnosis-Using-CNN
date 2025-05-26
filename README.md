# 🩻 CT-Based Lung Cancer Diagnosis Using CNN

A deep learning-based project for automatic classification of lung cancer using CT scan images. This system uses Convolutional Neural Networks (CNNs) to identify and differentiate between multiple types of lung cancer, aiming to assist medical professionals in early and accurate diagnosis.

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Dataset Information](#dataset-information)
- [Model Architectures](#model-architectures)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Instructions](#usage-instructions)
- [Evaluation & Metrics](#evaluation--metrics)
- [Results & Visualizations](#results--visualizations)
- [Flask Web App](#flask-web-app)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## 📖 Project Overview

Lung cancer is one of the deadliest forms of cancer. Early detection can significantly increase the survival rate. This project applies CNN models to classify lung CT scan images into the following categories:

- **Adenocarcinoma**
- **Large Cell Carcinoma**
- **Squamous Cell Carcinoma**
- **Normal**

The project uses multiple pretrained CNN architectures with fine-tuning and comparative evaluation to determine the best-performing model.

---

## 📂 Dataset Information

- **Source:** https://www.kaggle.com/datasets/mohamedhanyyy/chest-ctscan-images
- **Categories:** 4 (Adenocarcinoma, Large Cell Carcinoma, Squamous Cell Carcinoma, Normal)
- **Dataset Structure:**


- **Image Format:** `.jpg` or `.png`
- **Total Images:** 1000

> *Note:* Due to size constraints, the dataset is not included in the repository. Contact the author or refer to the dataset source for access.

---

## 🧠 Model Architectures

This project explores and compares the performance of various CNN models:

### 📊 Model Comparison Table

| 🧠 Model        | ⚙️ Framework | 📥 Pretrained | 🧩 Custom Layers | 🔍 Description |
|----------------|--------------|----------------|------------------|----------------|
| **ResNet50**   | Keras        | ✅ Yes         | ✅ Yes           | Deep residual network with skip connections; avoids vanishing gradient issues |
| **VGG16**      | Keras        | ✅ Yes         | ✅ Yes           | 16-layer CNN known for simplicity and depth; uses stacked 3×3 filters |
| **DenseNet121**| Keras        | ✅ Yes         | ✅ Yes           | Dense connectivity between layers; efficient in parameter usage and gradient flow |
| **MobileNetV2**| Keras        | ✅ Yes         | ✅ Yes           | Lightweight and fast; designed for mobile/edge devices using depthwise separable convolutions |
| **AlexNet**    | PyTorch      | ✅ Yes         | ✅ Yes           | Classic 8-layer CNN; one of the earliest deep learning models to win ImageNet |

---

## 📁 Project Structure

```text
CT-Based-Lung-Cancer-Diagnosis-Using-CNN/
├── dataset/
│ ├── train/
│ ├── valid/
│ └── test/
├── models/
│ ├── resnet50_model.h5
│ ├── alexnet_model.pth
│ └── ...
├── flask_app/
│ ├── app.py
│ ├── templates/
│ └── static/
├── notebooks/
│ └── EDA_and_Model_Training.ipynb
├── utils/
│ └── preprocessing.py
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CT-Based-Lung-Cancer-Diagnosis-Using-CNN.git
cd CT-Based-Lung-Cancer-Diagnosis-Using-CNN
```
### 2. Create a Virtual Environment
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
### 3. Install Dependencies
```
pip install -r requirements.txt
```
---

### ▶️ Usage Instructions

### 1. Prepare Dataset
- Download the dataset from Kaggle.
- Extract it and organize it into train/, valid/, and test/ subdirectories under /dataset.

### 2. Run Model Training
```
python train_model.py --model resnet50
```
### 3. Evaluate a Model
```
python evaluate_model.py --model densenet121
```
### 4. Save Best Model
The best-performing model will be saved as:
```
models/best_model.keras
```
---
### 📈 Evaluation & Metrics  
We use the following metrics for evaluation:  
✅ Accuracy  
🧠 Precision  
📉 Recall  
🎯 F1 Score  
📊 Confusion Matrix  
🧪 ROC Curve  

---
### 🧪 Sample Performance Table
| Model       | Train Acc | Val Acc | Test Acc | Precision | Recall | F1-Score |
| ----------- | --------- | ------- | -------- | --------- | ------ | -------- |
| ResNet50    | 96.3%     | 94.8%   | 93.5%    | 0.93      | 0.92   | 0.92     |
| DenseNet121 | 97.2%     | 95.3%   | 94.7%    | 0.95      | 0.93   | 0.94     |
| VGG16       | 95.1%     | 93.6%   | 91.2%    | 0.90      | 0.88   | 0.89     |
| MobileNetV2 | 94.5%     | 92.4%   | 90.8%    | 0.89      | 0.88   | 0.88     |
| AlexNet     | 92.6%     | 91.0%   | 89.3%    | 0.87      | 0.85   | 0.86     |


---
### 📊 Results & Visualizations
- Training vs Validation Accuracy and Loss
- Confusion Matrix for each model
- ROC Curve
- Grad-CAM Heatmaps (optional)
- Prediction Confidence Visuals  
  
<p align="center"> <img src=""E:\CAPSTONE SEM IV\Lung Cancer Detection Using CNN\imgs\cm densenet.png"" width="400"/> </p>

---
### 🌐 Flask Web App

A simple Flask app is provided to test predictions on CT images via browser upload.

Steps to Run:
```
cd flask_app
python app.py
```
Then open your browser at: http://localhost:5000

---

### 🔮 Future Enhancements
- Add Grad-CAM for visual explanations
- Include ensemble methods
- Improve web UI for better interactivity
- Dockerize the Flask app for deployment
- Integrate with cloud services for real-time usage
---
### 📄 License
- This project is licensed under the MIT License.
- Feel free to use, modify, and distribute with proper attribution.
---

### 🙋‍♀️ Author  
👩‍💻 Anjali — Final year MCA student, VIT Vellore  
🎓 Passionate about AI in healthcare  


🔗 [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/-anjali-verma/)



---
