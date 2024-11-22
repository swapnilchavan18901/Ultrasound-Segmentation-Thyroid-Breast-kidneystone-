const express = require('express');
const { addResult, deleteResult, getUserResults,getResultById } = require('../controllers/results_controller');
const { authenticateToken } = require('../middlewares/auth_middleware');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.delete('/',authenticateToken, deleteResult);
router.get('/',authenticateToken, getUserResults);
router.get('/:id',authenticateToken, getResultById);
router.post('/',authenticateToken,upload.single("image"), addResult);
module.exports = router;