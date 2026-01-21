export const requireHospitalType = (type) => (req, res, next) => {
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
