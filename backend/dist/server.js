"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const menuItemRoutes_1 = __importDefault(require("./routes/menuItemRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number.parseInt(process.env.PORT || "5000", 10);
const CLIENT_URL = process.env.CLIENT_URL;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
(0, connectDB_1.default)();
// Routes
app.use("/api/menus", menuRoutes_1.default);
app.use("/api/menu-items", menuItemRoutes_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
