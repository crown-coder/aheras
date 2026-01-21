import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

/* =========================
   ENUMS
========================= */

export const hospitalTypeEnum = pgEnum("hospital_type", [
  "PRIMARY",
  "SECONDARY",
]);

export const referralStatusEnum = pgEnum("referral_status", [
  "PENDING",
  "ACCEPTED",
  "REJECTED",
]);

/* =========================
   USERS (Hospital Accounts)
========================= */

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  hospitalType: hospitalTypeEnum("hospital_type").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   HOSPITAL PROFILE
========================= */

export const hospitalProfiles = pgTable("hospital_profiles", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id),

  hospitalName: text("hospital_name").notNull(),
  address: text("address"),
  phone: text("phone"),
});

/* =========================
   PATIENTS
========================= */

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),

  hospitalId: integer("hospital_id")
    .notNull()
    .references(() => users.id),

  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  gender: text("gender"),
  dateOfBirth: date("date_of_birth"),

  createdAt: timestamp("created_at").defaultNow(),
});

/* =========================
   REFERRALS
========================= */

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),

  patientId: integer("patient_id")
    .notNull()
    .references(() => patients.id),

  fromHospitalId: integer("from_hospital_id")
    .notNull()
    .references(() => users.id),

  toHospitalId: integer("to_hospital_id")
    .notNull()
    .references(() => users.id),

  reason: text("reason"),

  status: referralStatusEnum("status").notNull().default("PENDING"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

/* =========================
   REFERRAL STATUS HISTORY (OPTIONAL)
========================= */

export const referralStatusHistory = pgTable("referral_status_history", {
  id: serial("id").primaryKey(),

  referralId: integer("referral_id")
    .notNull()
    .references(() => referrals.id),

  status: referralStatusEnum("status").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
