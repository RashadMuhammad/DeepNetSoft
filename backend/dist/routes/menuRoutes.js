"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_1 = __importDefault(require("../models/menu"));
const router = express_1.default.Router();
// Get all menus
router.get("/", async (req, res) => {
    try {
        const menus = await menu_1.default.find();
        res.json(menus);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get a specific menu
router.get("/:id", async (req, res) => {
    try {
        const menu = await menu_1.default.findById(req.params.id);
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
});
// Create a new menu
router.post("/", async (req, res) => {
    const menu = new menu_1.default({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.name.toLowerCase().replace(/\s+/g, "-"),
    });
    try {
        const newMenu = await menu.save();
        res.status(201).json(newMenu);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update a menu
router.put("/:id", async (req, res) => {
    try {
        const menu = await menu_1.default.findById(req.params.id);
        if (menu) {
            if (req.body.name) {
                menu.name = req.body.name;
                menu.slug = req.body.name.toLowerCase().replace(/\s+/g, "-");
            }
            if (req.body.description) {
                menu.description = req.body.description;
            }
            const updatedMenu = await menu.save();
            res.json(updatedMenu);
        }
        else {
            res.status(404).json({ message: "Menu not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a menu
router.delete("/:id", async (req, res) => {
    try {
        const menu = await menu_1.default.findById(req.params.id);
        if (menu) {
            await menu.deleteOne();
            res.json({ message: "Menu deleted" });
        }
        else {
            res.status(404).json({ message: "Menu not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
