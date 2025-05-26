from flask import Flask, request, render_template
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask import jsonify  # Import jsonify for proper JSON response

import numpy as np
import os

# Initialize Flask application
app = Flask(__name__, template_folder='templates')  # Ensure 'templates' folder exists
UPLOAD_FOLDER = os.path.abspath('uploads')  # Use absolute path
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Define your class labels
class_labels = ["Adenocarcinoma", "Large cell carcinoma", "Normal", "Squamous cell carcinoma"]

# Load the pre-trained model from the local file
model = load_model('best_model.keras')  # Ensure 'best_model.keras' exists



def prepare_image(file_path):
    target_size = (224, 224)  # Match model input size
    img = image.load_img(file_path, target_size=target_size)
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize
    return img

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({'error': 'No files uploaded'}), 400

    file = request.files['files']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    img = prepare_image(file_path)
    prediction = model.predict(img)

    # Get class label and confidence
    class_label = np.argmax(prediction)
    class_name = class_labels[class_label]
    confidence = prediction[0][class_label] * 100  # Convert to percentage

    # Debugging
    print(f"Predicted class: {class_name} with {confidence:.2f}% confidence")

    return jsonify({'prediction': class_name, 'confidence': f"{confidence:.2f}%"})  # Return JSON response

if __name__ == '__main__':
    # Create the upload folder if it doesn't exist
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
        print(f"✅ Created upload folder: {app.config['UPLOAD_FOLDER']}")

    app.run(debug=True)
