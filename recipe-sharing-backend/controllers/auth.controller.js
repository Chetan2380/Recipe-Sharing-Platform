import User from "../models/auth.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
      const { name, email, password } = req.body.userData;
      if (!name || !email || !password) {
        return res.json({ success: false, error: "All fields are required." });
      }

      const isEmailExist = await User.findOne({ email: email });
      console.log(isEmailExist, "isEmailExist");
      if (isEmailExist) {
        return res.json({
          success: false,
          error: "Email is exists, please use another one.",
        });
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name: name,
        email: email,
        password: encryptedPassword,
      });
  
      const responseFromDb = await newUser.save();
  
      return res.json({
        success: true,
        message: "Registeration Successfull.",
      });
    } catch (error) {
      console.log(error, "error");
      return res.json({ error: error, success: false });
    }
};

export const Login = async (req, res) => {
    try {
      const { email, password } = req.body?.userData;
      if (!email || !password) {
        return res.json({ success: false, error: "All fields are required." });
      }
  
      const isUserExists = await User.findOne({ email: email });
      if (!isUserExists) {
        return res.json({ success: false, error: "Email not found." });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isUserExists.password
      );
      console.log(isPasswordCorrect, "isPasswordCorrect");
      if (!isPasswordCorrect) {
        return res.json({ success: false, error: "Password is wrong." });
      }
      const userData = {
        name: isUserExists.name,
        email: isUserExists.email,
        role: "user",
        userId : isUserExists._id
      };
  
      const token = await jwt.sign(
        { userId: isUserExists._id },
        process.env.JWT_SECRET
      );
  
      res.cookie("token", token,{ 
        httpOnly: true, 
        secure: true, 
        sameSite: 'None' 
      });
      return res.json({
        success: true,
        message: "Login successfull.",
        userData,
      });
    } catch (error) {
      return res.json({ success: falsse, error: error });
    }
  };

  export const getCurrentUser = async (req, res) => {
    try {
      const token = req.cookies.token;
      // console.log(token, "token");
      const data = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(data, "data");
      if (data?.adminId) {
        const admin = await Admin.findById(data?.adminId);
        if (!admin) {
          return res.json({ success: false });
        }
        const adminData = {
          name: admin.name,
          email: admin.email,
          role: "admin",
          userId: admin._id,
        };
        return res.json({ success: true, userData: adminData });
      } else {
        const user = await User.findById(data?.userId);
        if (!user) {
          return res.json({ success: false });
        }
        const userData = {
          name: user.name,
          email: user.email,
          role: "user",
          userId: user._id,
        };
        return res.json({ success: true, userData });
      }
    } catch (error) {
      return res.json({ success: false, error });
    }
  };

  export const updateProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        const { name, email } = req.body;
        if (!name || !email) {
            return res.json({ success: false, error: "All fields are required." });
        }

        const data = await jwt.verify(token, process.env.JWT_SECRET);
        if (!data?.userId) {
            return res.json({ success: false, error: "User not found." });
        }

        const updatedUser = await User.findByIdAndUpdate(data.userId, { name, email }, { new: true });
        if (!updatedUser) {
            return res.json({ success: false, error: "User update failed." });
        }

        return res.json({ success: true, message: "Profile updated successfully." });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        return res.json({ success: false, error });
    }
};


export const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'name _id'); 
        res.json({ success: true, users });
    } catch (error) {
        console.log(error, "error");
        return res.json({ success: false, error: error.message });
    }
};
