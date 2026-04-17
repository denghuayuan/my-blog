import '../load-env.js';

import bcrypt from 'bcryptjs';

import { connectDatabase } from '../config/database.js';
import { env } from '../config/env.js';
import { UserModel } from '../models/user.model.js';

async function seedAdmin() {
  await connectDatabase();

  const existingAdmin = await UserModel.findOne({ email: env.adminEmail });
  const passwordHash = await bcrypt.hash(env.adminPassword, 10);

  if (existingAdmin) {
    existingAdmin.username = env.adminUsername.toLowerCase();
    existingAdmin.displayName = env.adminUsername;
    existingAdmin.bio = existingAdmin.bio || '';
    existingAdmin.role = 'admin';
    existingAdmin.passwordHash = passwordHash;

    await existingAdmin.save();

    console.log(`admin updated: ${existingAdmin.email}`);
    return;
  }

  const adminUser = await UserModel.create({
    username: env.adminUsername.toLowerCase(),
    displayName: env.adminUsername,
    bio: '',
    email: env.adminEmail,
    passwordHash,
    role: 'admin'
  });

  console.log(`admin created: ${adminUser.email}`);
}

seedAdmin()
  .catch((error: unknown) => {
    console.error('failed to seed admin', error);
    process.exit(1);
  })
  .finally(async () => {
    const mongoose = await import('mongoose');
    await mongoose.default.disconnect();
  });