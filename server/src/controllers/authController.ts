import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Missing credentials" });
    }
    const existingUser = await User.findOne({ where: { email } }); // change to fit mongodb
    if (existingUser) {
      return res.status(409).json({
        msg: "There's already an account with this email",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10); //salt?

    const user = await User.create({ name, email, password });

    res.status(201).json({ name: user.name, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({ name: user.name, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
