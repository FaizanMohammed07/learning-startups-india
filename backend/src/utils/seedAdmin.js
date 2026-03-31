const bcrypt = require('bcryptjs');
const { User } = require('../modules/users/user.model');
const env = require('../config/env');

async function seedAdmin() {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    console.log('[Seed] No ADMIN_EMAIL/ADMIN_PASSWORD in env, skipping admin seed.');
    return;
  }

  try {
    const existing = await User.findOne({ email: env.ADMIN_EMAIL });
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        await existing.save();
        console.log(`[Seed] Promoted ${env.ADMIN_EMAIL} to admin.`);
      }
      return;
    }

    const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 10);
    await User.create({
      email: env.ADMIN_EMAIL,
      passwordHash,
      fullName: 'System Admin',
      role: 'admin',
      provider: 'email',
      isActive: true,
    });
    console.log(`[Seed] Admin user created: ${env.ADMIN_EMAIL}`);
  } catch (err) {
    console.error('[Seed] Failed to seed admin:', err.message);
  }
}

module.exports = { seedAdmin };
