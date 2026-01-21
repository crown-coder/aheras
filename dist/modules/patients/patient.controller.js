import { createPatient, getPatientsByHospital, getPatientById, updatePatient, deletePatient, } from "./patient.service.js";
export const create = async (req, res) => {
    try {
        const patient = await createPatient(req.user.userId, req.body);
        res.status(201).json(patient);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getAll = async (req, res) => {
    const patients = await getPatientsByHospital(req.user.userId);
    res.json(patients);
};
export const getOne = async (req, res) => {
    const patient = await getPatientById(req.user.userId, Number(req.params.id));
    if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
};
export const update = async (req, res) => {
    const patient = await updatePatient(req.user.userId, Number(req.params.id), req.body);
    if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
};
export const remove = async (req, res) => {
    const patient = await deletePatient(req.user.userId, Number(req.params.id));
    if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted" });
};
