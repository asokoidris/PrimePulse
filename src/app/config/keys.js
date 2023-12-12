import dotenv from 'dotenv';
dotenv.config();

const Port = process.env.PORT;

const keys = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  domain: process.env.DOMAIN || `http://localhost:${Port}`,
  BCRYPT: process.env.BCRYPT || 10,
  adminUrl: process.env.ADMIN_URL || 'admin',
  jwt: {
    refresh: process.env.JWT_REFRESH_TOKEN || 'refreshToken',
    secret: process.env.JWT_SECRET || 'secret',
    expires: process.env.JWT_EXPIRES || '5d',
    refreshExpires: process.env.JWT_REFRESH_EXPIRES || '30s',
  },
  secretToken: {
    maxTrials: process.env.TOKEN_CODE_MAX_TRIALS || 3,
    expiryTime: process.env.TOKEN_CODE_EXPIRY || Date.now() + 10 * 60 * 1000, // 10 minutes
  },
  database: {
    redis: {
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    },
    mongoDb: {
      development: {
        connectionString:
          process.env.MONGO_URI_DEV ||
          'mongodb://localhost:27017/myPitchHubDev',
      },
      test: {
        connectionString:
          process.env.MONGO_URI_TEST ||
          'mongodb://localhost:27017/myPitchHubTest',
      },
      staging: {
        connectionString:
          process.env.MONGO_URI_STAGING ||
          'mongodb://localhost:27017/myPitchHubStaging',
      },
      production: {
        connectionString:
          process.env.MONGO_URI_PROD ||
          'mongodb://localhost:27017/myPitchHubProd',
      },
    },
  },
  email: {
    nodemailer: {
      password: process.env.NODEMAILER_PASSWORD || 'password',
      email: process.env.NODEMAILER_EMAIL || 'email',
    },
  },
  sms: {
    twilio: {
      authToken: process.env.TWILIO_AUTH_TOKEN || 'authToken',
      accountSid: process.env.TWILIO_ACCOUNT_SID || 'accountSid',
      twilioPhone: process.env.TWILIO_PHONE || 'twilioPhone',
      twilioPhoneSid: process.env.TWILIO_PHONE_SID || 'twilioPhoneSid',
    },
  },
  uploads: {
    directory: 'uploads',
    maximumFileSize: 10 * 1024 * 1024, // 10 MB,
    uploadUrlPath: '/uploads',
  },
  kycVerification: {
    youVerifyApiKey: process.env.YOUVERIFY_API_KEY || 'youVerifyApiKey',
    VERIFY_ME: process.env.VERIFY_ME || 'verifyMe',
  },
  superAdmin: {
    id: process.env.SUPER_ADMIN_ID || '6149e9b688fbf648c3e358ed',
    email: process.env.SUPER_ADMIN_EMAIL || 'mypitchhub@gmail.com',
    phone: process.env.SUPER_ADMIN_PHONE || '08012345678',
    password: process.env.SUPER_ADMIN_PASSWORD || 'password',
    role: process.env.SUPER_ADMIN_ROLE || 'SuperAdmin',
  },
  cors_allowed_origins: process.env.CORS_ALLOWED_ORIGINS || '*',
};

export default keys;
