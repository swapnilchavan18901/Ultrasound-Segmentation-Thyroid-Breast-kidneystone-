const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Documentation',
        description: 'API documentation for the Node.js project',
    },
    host: 'localhost:5005', // Change this to your server URL
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    '../routes/auth_routes.js',
    '../routes/admin_routes.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../app'); // Your app's entry point (e.g., app.js)
    process.exit();
});