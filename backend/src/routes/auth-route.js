import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user-model.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";


const router = express.Router();

/*
---------------------------------------------------
EMAIL SIGNUP
POST /api/auth/signup
---------------------------------------------------
*/

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password,confirmPassword } = req.body;

    if (!fullName || !email || !password ||!confirmPassword) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    if(password !==confirmPassword){
      return res.status(400).json({
        message:"password and confirm password didn't match"
      })
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{
      expiresIn:"7d"
    })
    res.cookie("token",token,{
      maxAge:60*60*24,
      httpOnly:true,
      secure:false
    })
    res.status(201).json({
      message: "Signup successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
---------------------------------------------------
EMAIL LOGIN
POST /api/auth/login
---------------------------------------------------
*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Use Google login for this account",
      });
    }
   


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

   
    const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{
      expiresIn:"7d"
    })
    res.cookie("token",token,{
      maxAge:60*60*24,
      httpOnly:true,
      secure:false
    })

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
---------------------------------------------------
GOOGLE LOGIN
GET /api/auth/google
---------------------------------------------------
*/

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

/*
---------------------------------------------------
GOOGLE CALLBACK
GET /api/auth/google/callback
---------------------------------------------------
*/

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/",
  }),
  async (req, res) => {
    try {
      const user = req.user;

     
    const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{
      expiresIn:"30d"
    })
    res.cookie("token",token,{
      maxAge:60*60*24,
      httpOnly:true,
      secure:false
    })

      res.redirect("http://localhost:5173/home");
    } catch (err) {
      res.redirect("http://localhost:5173/");
    }
  },
);

/*
---------------------------------------------------
LOGOUT
GET /api/auth/logout
---------------------------------------------------
*/

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.json({
    message: "Logged out successfully",
  });
});

export default router;
