import express, { Request, Response } from "express";
import Menu from "../models/menu";

const router = express.Router();

// Get all menus
router.get("/", async (req: Request, res: Response) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get a specific menu
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (menu) {
      res.json(menu);
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Create a new menu
router.post("/", async (req: Request, res: Response) => {
  const menu = new Menu({
    name: req.body.name,
    description: req.body.description,
    slug: req.body.name.toLowerCase().replace(/\s+/g, "-"),
  });

  try {
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Update a menu
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findById(req.params.id);

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
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Delete a menu
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (menu) {
      await menu.deleteOne();
      res.json({ message: "Menu deleted" });
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
