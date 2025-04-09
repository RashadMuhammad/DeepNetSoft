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
const menuItem_1 = __importDefault(require("../models/menuItem"));
const router = express_1.default.Router();
// Get all menu items
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItems = yield menuItem_1.default.find();
        res.json(menuItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Get menu items by menu ID
router.get("/menu/:menuId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItems = yield menuItem_1.default.find({ menuId: req.params.menuId });
        res.json(menuItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Get a specific menu item
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItem = yield menuItem_1.default.findById(req.params.id);
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
}));
// Create a new menu item
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menuItem = new menuItem_1.default({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        menuId: req.body.menuId,
    });
    try {
        const newMenuItem = yield menuItem.save();
        res.status(201).json(newMenuItem);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Update a menu item
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItem = yield menuItem_1.default.findById(req.params.id);
        if (menuItem) {
            if (req.body.name)
                menuItem.name = req.body.name;
            if (req.body.description)
                menuItem.description = req.body.description;
            if (req.body.price)
                menuItem.price = req.body.price;
            if (req.body.menuId)
                menuItem.menuId = req.body.menuId;
            const updatedMenuItem = yield menuItem.save();
            res.json(updatedMenuItem);
        }
        else {
            res.status(404).json({ message: "Menu item not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Delete a menu item
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItem = yield menuItem_1.default.findById(req.params.id);
        if (menuItem) {
            yield menuItem.deleteOne();
            res.json({ message: "Menu item deleted" });
        }
        else {
            res.status(404).json({ message: "Menu item not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
