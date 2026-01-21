import { primarySummary, primaryRecentReferrals, secondarySummary, secondaryRecentReferrals, } from "./referral.dashboard.service.js";
export const primaryDashboard = async (req, res) => {
    const hospitalId = req.user.userId;
    const [summary, recent] = await Promise.all([
        primarySummary(hospitalId),
        primaryRecentReferrals(hospitalId),
    ]);
    res.json({ summary, recent });
};
export const secondaryDashboard = async (req, res) => {
    const hospitalId = req.user.userId;
    const [summary, recent] = await Promise.all([
        secondarySummary(hospitalId),
        secondaryRecentReferrals(hospitalId),
    ]);
    res.json({ summary, recent });
};
