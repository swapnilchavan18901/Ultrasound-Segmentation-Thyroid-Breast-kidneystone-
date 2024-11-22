const { 
    addnewResult,
    getAllResult,
    deleteResultById,
    getResultbyId
} = require('../services/result_services');
const { updateUserResult, getUserProfile } = require('../services/user_services');
const statusCode = require('../utils/status_codes');
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const { bucket } = require('../middlewares/firebase');

const addResult = async (req, res) => {
        try {
          const formData = new FormData();
          formData.append("file", fs.createReadStream(req.file.path)); // "file" matches FastAPI's expected field name
            const response = await axios.post(`http://localhost:8000/predict/${req.body.disease}`, formData, {
              headers: {
                ...formData.getHeaders(), // Add proper headers from FormData
              },
          });
          const { detections, output_image } = response.data;
        //  Decode the Base64 image and save it as a file
        if(detections.length>0){
            const buffer = Buffer.from(output_image, "base64");
            const firebaseFileName1 = `original_images/image${Date.now()}.jpg`;
            const firebaseFileName2 = `processed_images/image2${Date.now()}.jpg`;
            const file1 = bucket.file(firebaseFileName1);
            const file2 = bucket.file(firebaseFileName2);
            await file1.save(fs.createReadStream(req.file.path), {
              metadata: {
                  contentType: "image/jpeg", // Adjust the content type based on the file type
              },
          });
          await file2.save(buffer, {
              metadata: {
                  contentType: "image/jpeg", // Adjust the content type based on the file type
              },
          });
          await file1.makePublic();
          await file2.makePublic();
          const publicUrl1 = file1.publicUrl();
          const publicUrl2= file2.publicUrl();
         const resultData={
            timeStamp:new Date(),
            originalImage:publicUrl1,
            processedImage:publicUrl2,
            confidence:detections[0].confidence,
            classId:detections[0].class_id,
            className:detections[0].class_name
          }
           const data=await addnewResult(resultData);
            await updateUserResult(req.user.userId,data.insertedId)
            res.formatResponse('Result added', 'Result added', statusCode.CREATED);
        }else{
            const firebaseFileName1 = `original_images/image${Date.now()}.jpg`;
            const file1 = bucket.file(firebaseFileName1);
            await file1.save(fs.createReadStream(req.file.path), {
                metadata: {
                    contentType: "image/jpeg", // Adjust the content type based on the file type
                },
            });
            await file1.makePublic();
          const publicUrl1 = file1.publicUrl();
         const resultData={
            timeStamp:new Date(),
            originalImage:publicUrl1,
            processedImage:publicUrl1,
            confidence:1,
            classId:0,
            className:"Normal"
          }
           const data=await addnewResult(resultData);
            await updateUserResult(req.user.userId,data.insertedId)
            res.formatResponse('Result added', 'Result added', statusCode.CREATED);
        }
       
    } catch (err) {
        res.formatError(err.message, 'Error adding results', statusCode.INTERNAL_SERVER_ERROR);
    }
};

const getUserResults = async (req, res) => {
    try {
        const user=await getUserProfile(req.user.userId)
        let data=[]
        for(let i=0;i<user.resultIds.length;i++){
           let result= await getResultbyId(String(user.resultIds[i]));
           data.push(result)
        }
        res.formatResponse(data, 'results fetched successfully', statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'Error registering user.', statusCode.INTERNAL_SERVER_ERROR);
    }
};
const getResultById = async (req, res) => {
    try {
       const data= await getResultbyId(req.params.id);
        res.formatResponse(data, 'results fetched successfully', statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'Error registering user.', statusCode.INTERNAL_SERVER_ERROR);
    }
};

const deleteResult = async (req, res) => {
    try {
       const data= await deleteResultById(req.params.id);
        res.formatResponse(data, 'results fetched successfully', statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'Error registering user.', statusCode.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {  
    addResult,
    getUserResults,
    deleteResult,
    getResultById
};