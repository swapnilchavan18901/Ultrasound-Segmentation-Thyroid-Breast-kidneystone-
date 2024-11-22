import base64
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from PIL import Image
import numpy as np
import io

app = FastAPI()

# Load the thyroid YOLO model
MODEL_PATH1 = "./models/thyroid.pt"
model1 = YOLO(MODEL_PATH1)
confidence_threshold = 0.5  # Default confidence
# Load the breast YOLO model
MODEL_PATH2 = "./models/breast.pt"
model2 = YOLO(MODEL_PATH2)
# Load the kidneystone YOLO model
MODEL_PATH3 = "./models/kidneystone.pt"
model3 = YOLO(MODEL_PATH3)


@app.post("/predict/thyroid")
async def predict(file: UploadFile = File(...), confidence: float = confidence_threshold):
    """
    Perform inference on an uploaded image and return detections + image.
    """
    try:
        # Read the uploaded file
        img = Image.open(file.file)
        img_array = np.array(img)

        # Set model confidence threshold
        model1.conf = confidence

        # Run YOLO inference
        results = model1(img_array)
        boxes = results[0].boxes.xyxy.tolist()  # Bounding box coordinates
        confidences = results[0].boxes.conf.tolist()  # Confidence scores
        class_ids = results[0].boxes.cls.tolist()  # Class IDs

        # Get class names
        class_names = [model1.names[int(cls)] for cls in class_ids]

        # Format results
        detections = [
            {
                "bounding_box": {
                    "x1": box[0],
                    "y1": box[1],
                    "x2": box[2],
                    "y2": box[3],
                },
                "confidence": conf,
                "class_id": int(cls),
                "class_name": class_name,
            }
            for box, conf, cls, class_name in zip(boxes, confidences, class_ids, class_names)
        ]

        # Prepare the processed image
        res_plotted = results[0].plot()[:, :, ::-1]  # Convert to RGB format
        output_image = Image.fromarray(res_plotted)

        # Encode the image to Base64
        buffered = io.BytesIO()
        output_image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {
            "detections": detections,
            "output_image": img_str,
            "message": "Inference successful!",
        }
    except Exception as e:
        return JSONResponse(
            content={"error": str(e), "message": "Error during inference."}, status_code=500
        )


@app.post("/predict/kidneystone")
async def predict(file: UploadFile = File(...), confidence: float = confidence_threshold):
    """
    Perform inference on an uploaded image and return detections + image.
    """
    try:
        # Read the uploaded file
        img = Image.open(file.file)
        img_array = np.array(img)

        # Set model confidence threshold
        model3.conf = confidence

        # Run YOLO inference
        results = model3(img_array)
        boxes = results[0].boxes.xyxy.tolist()  # Bounding box coordinates
        confidences = results[0].boxes.conf.tolist()  # Confidence scores
        class_ids = results[0].boxes.cls.tolist()  # Class IDs

        # Get class names
        class_names = [model3.names[int(cls)] for cls in class_ids]

        # Format results
        detections = [
            {
                "bounding_box": {
                    "x1": box[0],
                    "y1": box[1],
                    "x2": box[2],
                    "y2": box[3],
                },
                "confidence": conf,
                "class_id": int(cls),
                "class_name": class_name,
            }
            for box, conf, cls, class_name in zip(boxes, confidences, class_ids, class_names)
        ]

        # Prepare the processed image
        res_plotted = results[0].plot()[:, :, ::-1]  # Convert to RGB format
        output_image = Image.fromarray(res_plotted)

        # Encode the image to Base64
        buffered = io.BytesIO()
        output_image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {
            "detections": detections,
            "output_image": img_str,
            "message": "Inference successful!",
        }
    except Exception as e:
        return JSONResponse(
            content={"error": str(e), "message": "Error during inference."}, status_code=500
        )




@app.post("/predict/breast")
async def predict(file: UploadFile = File(...), confidence: float = confidence_threshold):
    """
    Perform inference on an uploaded image and return detections + image.
    """
    try:
        # Read the uploaded file
        img = Image.open(file.file)
        img_array = np.array(img)

        # Set model confidence threshold
        model2.conf = confidence

        # Run YOLO inference
        results = model2(img_array)
        boxes = results[0].boxes.xyxy.tolist()  # Bounding box coordinates
        confidences = results[0].boxes.conf.tolist()  # Confidence scores
        class_ids = results[0].boxes.cls.tolist()  # Class IDs

        # Get class names
        class_names = [model2.names[int(cls)] for cls in class_ids]

        # Format results
        detections = [
            {
                "bounding_box": {
                    "x1": box[0],
                    "y1": box[1],
                    "x2": box[2],
                    "y2": box[3],
                },
                "confidence": conf,
                "class_id": int(cls),
                "class_name": class_name,
            }
            for box, conf, cls, class_name in zip(boxes, confidences, class_ids, class_names)
        ]

        # Prepare the processed image
        res_plotted = results[0].plot()[:, :, ::-1]  # Convert to RGB format
        output_image = Image.fromarray(res_plotted)

        # Encode the image to Base64
        buffered = io.BytesIO()
        output_image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {
            "detections": detections,
            "output_image": img_str,
            "message": "Inference successful!",
        }
    except Exception as e:
        return JSONResponse(
            content={"error": str(e), "message": "Error during inference."}, status_code=500
        )
