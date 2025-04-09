"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_1 = __importDefault(require("../models/menu"));
const router = express_1.default.Router();
// Get all menus
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menus = yield menu_1.default.find();
        res.json(menus);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Get a specific menu
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield menu_1.default.findById(req.params.id);
        if (menu) {
            res.json(menu);
        }
        else {
            res.status(404).json({ message: "Menu not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Create a new menu
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = new menu_1.default({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.name.toLowerCase().replace(/\s+/g, "-"),
    });
    try {
        const newMenu = yield menu.save();
        res.status(201).json(newMenu);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Update a menu
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield menu_1.default.findById(req.params.id);
        if (menu) {
            if (req.body.name) {
                menu.name = req.body.name;
                menu.slug = req.body.name.toLowerCase().replace(/\s+/g, "-");
            }
            if (req.body.description) {
                menu.description = req.body.description;
            }
            const updatedMenu = yield menu.save();
            res.json(updatedMenu);
        }
        else {
            res.status(404).json({ message: "Menu not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Delete a menu
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield menu_1.default.findById(req.params.id);
        if (menu) {
            yield menu.deleteOne();
            res.json({ message: "Menu deleted" });
        }
        else {
            res.status(404).json({ message: "Menu not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
