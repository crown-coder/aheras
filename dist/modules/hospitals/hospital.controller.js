import { db } from "../../config/db.js";
import { users, hospitalProfiles } from "../../config/schema.js";
import { eq } from "drizzle-orm";
export const getSecondaryHospitals = async (req, res) => {
    const hospitals = await db
        .select({
        id: users.id,
        name: hospitalProfiles.hospitalName,
    })
        .from(users)
        .innerJoin(hospitalProfiles, eq(users.id, hospitalProfiles.userId))
        .where(eq(users.hospitalType, "SECONDARY"));
    res.json(hospitals);
};
