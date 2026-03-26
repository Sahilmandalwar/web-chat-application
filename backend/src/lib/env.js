import dotenv from "dotenv";
dotenv.config();

const envObj = process.env;

export const ENV = {
    PORT: envObj.PORT,
    PONODE_ENVRT: envObj.NODE_ENV,
    MONGO_URI: envObj.MONGO_URI,
    JWT_SECRET: envObj.JWT_SECRET,
    RESEND_API_KEY: envObj.RESEND_API_KEY,
    EMAIL_FROM_NAME: envObj.EMAIL_FROM_NAME,
    EMAIL_FROM: envObj.EMAIL_FROM,
    CLIENT_URL: envObj.CLIENT_URL,
    CLOUDINARY_CLOUD_NAME: envObj.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: envObj.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: envObj.CLOUDINARY_API_SECRET,
}