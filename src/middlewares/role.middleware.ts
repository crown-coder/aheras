import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware.js";

export const requireHospitalType =
  (type: "PRIMARY" | "SECONDARY") =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.user.hospitalType !== type) {
      return res.status(403).json({
        error: `Access restricted to ${type} hospitals`,
      });
    }

    next();
  };
