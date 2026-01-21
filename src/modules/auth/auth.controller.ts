import { Request, Response } from "express";
import { registerHospital, loginHospital } from "./auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerHospital(req.body);

    res.status(201).json({
      message: "Hospital registered successfully",
      userId: user.id,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginHospital(email, password);

    res.json(result);
  } catch (error: any) {
    res.status(401).json({
      error: error.message,
    });
  }
};
