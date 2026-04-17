export const env = {
  port: Number(process.env.PORT || 3000),
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@example.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'change-this-password',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
  jwtAccessExpiresInSeconds: Number(
    process.env.JWT_ACCESS_EXPIRES_IN_SECONDS || 60 * 60 * 24 * 7
  )
};