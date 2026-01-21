import { eq, and } from "drizzle-orm";
import { db } from "../../config/db.js";
import { patients } from "../../config/schema.js";

export const createPatient = async (
  hospitalId: number,
  data: {
    firstName: string;
    lastName: string;
    gender?: string;
    dateOfBirth?: string;
  },
) => {
  const [patient] = await db
    .insert(patients)
    .values({
      hospitalId,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
    })
    .returning();

  return patient;
};

export const getPatientsByHospital = async (hospitalId: number) => {
  return db.select().from(patients).where(eq(patients.hospitalId, hospitalId));
};

export const getPatientById = async (hospitalId: number, patientId: number) => {
  const [patient] = await db
    .select()
    .from(patients)
    .where(
      and(eq(patients.id, patientId), eq(patients.hospitalId, hospitalId)),
    );

  return patient;
};

export const updatePatient = async (
  hospitalId: number,
  patientId: number,
  data: Partial<{
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
  }>,
) => {
  const [patient] = await db
    .update(patients)
    .set(data)
    .where(and(eq(patients.id, patientId), eq(patients.hospitalId, hospitalId)))
    .returning();

  return patient;
};

export const deletePatient = async (hospitalId: number, patientId: number) => {
  const [patient] = await db
    .delete(patients)
    .where(and(eq(patients.id, patientId), eq(patients.hospitalId, hospitalId)))
    .returning();

  return patient;
};
