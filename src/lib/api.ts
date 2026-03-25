const API_BASE_URL = 'http://44.192.72.206:5000/api';

export const fetchStats = async () => {
  const res = await fetch(`${API_BASE_URL}/stats`);
  return res.json();
};

export const fetchPatients = async () => {
  const res = await fetch(`${API_BASE_URL}/patients`);
  return res.json();
};

export const createPatient = async (data: any) => {
  const res = await fetch(`${API_BASE_URL}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchDoctors = async () => {
  const res = await fetch(`${API_BASE_URL}/doctors`);
  return res.json();
};

export const createDoctor = async (data: any) => {
  const res = await fetch(`${API_BASE_URL}/doctors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchAppointments = async () => {
  const res = await fetch(`${API_BASE_URL}/appointments`);
  return res.json();
};

export const createAppointment = async (data: any) => {
  const res = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};
