import { eq, count, sql } from "drizzle-orm";
import { db } from "../../config/db.js";
import { referrals, patients, hospitalProfiles } from "../../config/schema.js";
/* =========================
   PRIMARY DASHBOARD
========================= */
// Summary counts
export const primarySummary = async (hospitalId) => {
    const [result] = await db
        .select({
        total: count(),
        pending: sql `COUNT(*) FILTER (WHERE ${referrals.status} = 'PENDING')`,
        accepted: sql `COUNT(*) FILTER (WHERE ${referrals.status} = 'ACCEPTED')`,
        rejected: sql `COUNT(*) FILTER (WHERE ${referrals.status} = 'REJECTED')`,
    })
        .from(referrals)
        .where(eq(referrals.fromHospitalId, hospitalId));
    return result;
};
// Recent outgoing referrals
export const primaryRecentReferrals = async (hospitalId, limit = 10) => {
    return db
        .select({
        referralId: referrals.id,
        status: referrals.status,
        createdAt: referrals.createdAt,
        patientName: sql `${patients.firstName} || ' ' || ${patients.lastName}`,
        toHospital: hospitalProfiles.hospitalName,
    })
        .from(referrals)
        .innerJoin(patients, eq(referrals.patientId, patients.id))
        .innerJoin(hospitalProfiles, eq(referrals.toHospitalId, hospitalProfiles.userId))
        .where(eq(referrals.fromHospitalId, hospitalId))
        .orderBy(sql `${referrals.createdAt} DESC`)
        .limit(limit);
};
/* =========================
   SECONDARY DASHBOARD
========================= */
// Summary counts
export const secondarySummary = async (hospitalId) => {
    const [result] = await db
        .select({
        total: count(),
        pending: sql `COUNT(*) FILTER (WHERE ${referrals.status} = 'PENDING')`,
        accepted: sql `COUNT(*) FILTER (WHERE ${referrals.status} = 'ACCEPTED')`,
        rejected: sql `COUNT(*) FILTER (WHERE ${referrals.status} = 'REJECTED')`,
    })
        .from(referrals)
        .where(eq(referrals.toHospitalId, hospitalId));
    return result;
};
// Recent incoming referrals
export const secondaryRecentReferrals = async (hospitalId, limit = 10) => {
    return db
        .select({
        referralId: referrals.id,
        status: referrals.status,
        createdAt: referrals.createdAt,
        patientName: sql `${patients.firstName} || ' ' || ${patients.lastName}`,
        fromHospital: hospitalProfiles.hospitalName,
    })
        .from(referrals)
        .innerJoin(patients, eq(referrals.patientId, patients.id))
        .innerJoin(hospitalProfiles, eq(referrals.fromHospitalId, hospitalProfiles.userId))
        .where(eq(referrals.toHospitalId, hospitalId))
        .orderBy(sql `${referrals.createdAt} DESC`)
        .limit(limit);
};
