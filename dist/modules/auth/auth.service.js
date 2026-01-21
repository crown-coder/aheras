import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../../config/db.js";
import { users, hospitalProfiles } from "../../config/schema.js";
const JWT_SECRET = process.env.JWT_SECRET;
export const registerHospital = async (data) => {
    // check if user exists
    const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email));
    if (existing.length > 0) {
        throw new Error("Email already in use");
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    // create user
    const [user] = await db
        .insert(users)
        .values({
        email: data.email,
        passwordHash,
        hospitalType: data.hospitalType,
    })
        .returning();
    // create hospital profile
    await db.insert(hospitalProfiles).values({
        userId: user.id,
        hospitalName: data.hospitalName,
        address: data.address,
        phone: data.phone,
    });
    return user;
};
export const loginHospital = async (email, password) => {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({
        userId: user.id,
        hospitalType: user.hospitalType,
    }, JWT_SECRET, { expiresIn: "1d" });
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            hospitalType: user.hospitalType,
        },
    };
};
