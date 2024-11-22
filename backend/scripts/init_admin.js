const bcrypt = require('bcryptjs');
const { getUserCollection } = require('../models/user_model');
const connectDB = require('../config/db');

const createAdmin = async () => {
    const db = await connectDB();
    const users = await getUserCollection(db);
    const hashedPassword = await bcrypt.hash('capeadmin@123', 10); // Change this to a secure password
    const adminUser = {
        email: 'admin@cape.com',
        password: hashedPassword,
        role: 'Admin',
        isVerified: true,
    };
    await users.insertOne(adminUser);
    console.log('Admin user created');
    process.exit();
};

createAdmin().catch(err => {
    console.error('Error creating admin user:', err);
    process.exit(1);
});