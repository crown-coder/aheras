import { createReferral, getIncomingReferrals, getOutgoingReferrals, updateReferralStatus, } from "./referral.service.js";
/* =========================
   PRIMARY
========================= */
export const create = async (req, res) => {
    try {
        const referral = await createReferral(req.user.userId, req.body);
        res.status(201).json(referral);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const outgoing = async (req, res) => {
    const referrals = await getOutgoingReferrals(req.user.userId);
    res.json(referrals);
};
/* =========================
   SECONDARY
========================= */
export const incoming = async (req, res) => {
    const referrals = await getIncomingReferrals(req.user.userId);
    res.json(referrals);
};
export const accept = async (req, res) => {
    const referral = await updateReferralStatus(req.user.userId, Number(req.params.id), "ACCEPTED");
    if (!referral) {
        return res
            .status(404)
            .json({ error: "Referral not found or already handled" });
    }
    res.json(referral);
};
export const reject = async (req, res) => {
    const referral = await updateReferralStatus(req.user.userId, Number(req.params.id), "REJECTED");
    if (!referral) {
        return res
            .status(404)
            .json({ error: "Referral not found or already handled" });
    }
    res.json(referral);
};
