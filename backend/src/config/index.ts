import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DB_URI || 'your-database-uri',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'your-secret-key',
    NODE_ENV: "development"
};

export default config;