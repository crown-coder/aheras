import { eq, and } from "drizzle-orm";
import { db } from "../../config/db.js";
import { referrals, patients } from "../../config/schema.js";

/* =========================
   CREATE REFERRAL (PRIMARY)
========================= */
export const createReferral = async (
  fromHospitalId: number,
  data: {
    patientId: number;
    toHospitalId: number;
    reason?: string;
  },
) => {
  // Ensure patient belongs to primary hospital
  const [patient] = await db
    .select()
    .from(patients)
    .where(
      and(
        eq(patients.id, data.patientId),
        eq(patients.hospitalId, fromHospitalId),
      ),
    );

  if (!patient) {
    throw new Error("Patient not found or not owned by hospital");
  }

  const [referral] = await db
    .insert(referrals)
    .values({
      patientId: data.patientId,
      fromHospitalId,
      toHospitalId: data.toHospitalId,
      reason: data.reason,
      status: "PENDING",
    })
    .returning();

  return referral;
};

/* =========================
   GET REFERRALS
========================= */

// Outgoing (Primary)
export const getOutgoingReferrals = async (hospitalId: number) => {
  return db
    .select()
    .from(referrals)
    .where(eq(referrals.fromHospitalId, hospitalId));
};

// Incoming (Secondary)
export const getIncomingReferrals = async (hospitalId: number) => {
  return db
    .select()
    .from(referrals)
    .where(eq(referrals.toHospitalId, hospitalId));
};

/* =========================
   UPDATE REFERRAL STATUS
========================= */
export const updateReferralStatus = async (
  toHospitalId: number,
  referralId: number,
  status: "ACCEPTED" | "REJECTED",
) => {
  const [referral] = await db
    .update(referrals)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(referrals.id, referralId),
        eq(referrals.toHospitalId, toHospitalId),
        eq(referrals.status, "PENDING"),
      ),
    )
    .returning();

  return referral;
};
