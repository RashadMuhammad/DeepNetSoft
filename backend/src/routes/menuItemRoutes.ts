import express, { type Request, type Response, type Router } from "express";
import MenuItem from "../models/menuItem";

const router: Router = express.Router();

// Get all menu items
router.get("/", async (req: Request, res: Response) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get menu items by menu ID
router.get("/menu/:menuId", async (req: Request, res: Response) => {
  try {
    const menuItems = await MenuItem.find({ menuId: req.params.menuId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get a specific menu item
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ message: "Menu item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Create a new menu item
router.post("/", async (req: Request, res: Response) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    menuId: req.body.menuId,
  });

  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Update a menu item
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (menuItem) {
      if (req.body.name) menuItem.name = req.body.name;
      if (req.body.description) menuItem.description = req.body.description;
      if (req.body.price) menuItem.price = req.body.price;
      if (req.body.menuId) menuItem.menuId = req.body.menuId;

      const updatedMenuItem = await menuItem.save();
      res.json(updatedMenuItem);
    } else {
      res.status(404).json({ message: "Menu item not found" });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Delete a menu item
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (menuItem) {
      await menuItem.deleteOne();
      res.json({ message: "Menu item deleted" });
    } else {
      res.status(404).json({ message: "Menu item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
