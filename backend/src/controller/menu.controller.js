const menuModel = require("../model/menu.model");

const getAllMenu = async (req, res) => {
  try {
    const { category, search } = req.query;

    // Build the query object
    const query = {};

    if (category && ["Appetizer", "Main Course", "Dessert", "Beverage", "Drinks", "Other"].includes(category)) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search for name
    }

    const menu = await menuModel.find(query); // Fetch the filtered menus
    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error while fetching all menu items." });
  }
};



const createMenu = async (req, res) => {
  const {
    name,
    category,
    price,
    image,
    isAvailable = true, // Default value if not provided
    createdBy,
  } = req.body;

  try {
    // Create a new menu item without 'createdAt' because MongoDB will set this automatically
    const newMenu = await menuModel.create({
      name,
      category,
      price,
      image,
      isAvailable,
      createdBy,
    });

    res.status(201).json(newMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error while creating the menu item." });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await menuModel
      .findById(req.params.id)
      .populate("createdBy", "username role email"); // Populating user data

    if (!menu) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error while fetching the menu item." });
  }
};

const updateMenu = async (req, res) => {
  const {
    name,
    category,
    price,
    image
  } = req.body;

  try {
    const updatedMenu = await menuModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price,
        image
      },
      { new: true }
    );
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu item not found." });
    }
    res.status(200).json(updatedMenu);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error while updating the menu item." });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await menuModel.findByIdAndDelete(req.params.id);
    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu item not found." });
    }
    res.status(204).json("menu deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error while deleting the menu item." });
  }
};

const menuController = {
  getAllMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};

module.exports = menuController;
