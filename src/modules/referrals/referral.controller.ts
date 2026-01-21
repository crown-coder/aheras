import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import {
  createReferral,
  getIncomingReferrals,
  getOutgoingReferrals,
  updateReferralStatus,
} from "./referral.service";

/* =========================
   PRIMARY
========================= */

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const referral = await createReferral(req.user!.userId, req.body);

    res.status(201).json(referral);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const outgoing = async (req: AuthRequest, res: Response) => {
  const referrals = await getOutgoingReferrals(req.user!.userId);
  res.json(referrals);
};

/* =========================
   SECONDARY
========================= */

export const incoming = async (req: AuthRequest, res: Response) => {
  const referrals = await getIncomingReferrals(req.user!.userId);
  res.json(referrals);
};

export const accept = async (req: AuthRequest, res: Response) => {
  const referral = await updateReferralStatus(
    req.user!.userId,
    Number(req.params.id),
    "ACCEPTED",
  );

  if (!referral) {
    return res
      .status(404)
      .json({ error: "Referral not found or already handled" });
  }

  res.json(referral);
};

export const reject = async (req: AuthRequest, res: Response) => {
  const referral = await updateReferralStatus(
    req.user!.userId,
    Number(req.params.id),
    "REJECTED",
  );

  if (!referral) {
    return res
      .status(404)
      .json({ error: "Referral not found or already handled" });
  }

  res.json(referral);
};
