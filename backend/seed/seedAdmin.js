import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ecommerce.com' });
    if (existingAdmin) {
      console.log('Admin user already exists: admin@ecommerce.com');
    } else {
      await User.create({
        name: 'Admin',
        email: 'admin@ecommerce.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@ecommerce.com / admin123');
    }

    console.log('Admin seed complete.');
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Admin seed error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
