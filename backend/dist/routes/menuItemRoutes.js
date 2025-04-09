"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menuItem_1 = __importDefault(require("../models/menuItem"));
const router = express_1.default.Router();
// Get all menu items
router.get("/", async (req, res) => {
    try {
        const menuItems = await menuItem_1.default.find();
        res.json(menuItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get menu items by menu ID
router.get("/menu/:menuId", async (req, res) => {
    try {
        const menuItems = await menuItem_1.default.find({ menuId: req.params.menuId });
        res.json(menuItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get a specific menu item
router.get("/:id", async (req, res) => {
    try {
        const menuItem = await menuItem_1.default.findById(req.params.id);
        if (menuItem) {
            res.json(menuItem);
        }
        else {
            res.status(404).json({ message: "Menu item not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create a new menu item
router.post("/", async (req, res) => {
    const menuItem = new menuItem_1.default({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        menuId: req.body.menuId,
    });
    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update a menu item
router.put("/:id", async (req, res) => {
    try {
        const menuItem = await menuItem_1.default.findById(req.params.id);
        if (menuItem) {
            if (req.body.name)
                menuItem.name = req.body.name;
            if (req.body.description)
                menuItem.description = req.body.description;
            if (req.body.price)
                menuItem.price = req.body.price;
            if (req.body.menuId)
                menuItem.menuId = req.body.menuId;
            const updatedMenuItem = await menuItem.save();
            res.json(updatedMenuItem);
        }
        else {
            res.status(404).json({ message: "Menu item not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a menu item
router.delete("/:id", async (req, res) => {
    try {
        const menuItem = await menuItem_1.default.findById(req.params.id);
        if (menuItem) {
            await menuItem.deleteOne();
            res.json({ message: "Menu item deleted" });
        }
        else {
            res.status(404).json({ message: "Menu item not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
