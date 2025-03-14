const userModel = require("../model/user.model");
const menuModel = require("../model/menu.model");

// Function to handle placing an order
const addOrder = async (req, res) => {
  const { userId, menuId } = req.body;

  try {
    // Find the user by userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the menu item by menuId
    const menuItem = await menuModel.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Check if the user already has this menu item in their orders
    const existingOrderIndex = user.orders.findIndex(order => order.menu.toString() === menuItem._id.toString());

    if (existingOrderIndex !== -1) {
      // If order exists, alert the user to increase quantity
      return res.status(200).json({
        message: `You have already ordered ${menuItem.name}. Please increase the quantity instead.`,
      });
    } else {
      // If order doesn't exist, create a new order
      const newOrder = {
        menu: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        image: menuItem.image,
        quantity: 1, // Starting quantity as 1
      };

      user.orders.push(newOrder);
      await user.save(); // Save the user with the updated orders

      return res.status(201).json({
        message: "Order placed successfully",
        order: newOrder,
      });
    }
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add this function to the userController
// In your userController.js
const getUserOrder = async (req, res) => {
  const userId = req.params.userId; // Extract userId from the URL params
  try {
    const user = await userModel.findById(userId).populate('orders.menu');
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ orders: user.orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params; 
  try {
    const user = await userModel.findById(req.user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orderIndex = user.orders.findIndex(order => order._id.toString() === orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ error: "Order not found" });
    }

    user.orders.splice(orderIndex, 1);
    await user.save();
    res.status(200).json({ message: "Order deleted successfully" });
    
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const orderController = {
  addOrder,
  getUserOrder,
  deleteOrder
};

module.exports = orderController;


