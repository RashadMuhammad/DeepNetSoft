"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DBURI = process.env.MONGODB_URI;
if (!DBURI) {
    throw new Error("MONGO_URI is not defined in the .env file");
}
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(DBURI);
        console.log("MongoDB Connected SuccessFully✅");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
        }
        else {
            console.error("Unknown error occurred during MongoDB connection");
        }
        process.exit(1);
    }
};
exports.default = connectDB;
