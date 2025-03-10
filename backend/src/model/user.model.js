const mongoose = require("mongoose");
const { Schema } = mongoose;

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    orders: [
        {
            menu: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Menu" 
            },
            name: String,
            price: Number,
            quantity: { 
                type: Number, 
                default: 1 
            },
            image: { 
                type: String, 
                required: true 
            }, 
            date: { 
                type: Date, 
                default: Date.now 
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model("User", userSchema);