const connectDB = require('../config/db');
const { createCollections } = require('../models');

const migrate = async () => {
    const db = await connectDB();
    await createCollections(db);
    console.log('Migration completed successfully.');
    process.exit();
};

migrate().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});