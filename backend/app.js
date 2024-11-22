const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger-output.json'); // Path to generated Swagger output
const responseFormatter = require('./middlewares/response_formatter_middleware');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const authRoutes = require('./routes/auth_routes');
const adminRoutes = require('./routes/admin_routes');
const resultRoutes = require('./routes/results_routes');


const app = express();
app.use(cors());
app.use(express.json());
app.use(responseFormatter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/results', resultRoutes);



const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
