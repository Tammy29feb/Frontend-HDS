'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarDays, Plus, Clock, User, UserRound, CheckCircle2, XCircle, AlertCircle, Calendar as CalendarIcon, MoreVertical } from "lucide-react";
import { fetchAppointments, createAppointment, fetchPatients, fetchDoctors } from '@/lib/api';
import { format } from 'date-fns';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [appts, pts, drs] = await Promise.all([
        fetchAppointments(),
        fetchPatients(),
        fetchDoctors()
      ]);
      setAppointments(appts);
      setPatients(pts);
      setDoctors(drs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    await createAppointment(data);
    setIsDialogOpen(false);
    loadData();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1 text-slate-800">
          <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-amber-600" />
            Clinical Appointments
          </h2>
          <p className="text-slate-500 font-medium text-sm">Schedule and manage medical consultations for all departments.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger 
            render={
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl px-6 h-12 shadow-lg shadow-amber-100 flex items-center gap-2 group transform hover:translate-y-[-2px] transition-all">
                <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Book New Appointment
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-3xl p-8 bg-white/95 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">New Appointment Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateAppointment} className="space-y-6 pt-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Select Patient</Label>
                <select name="patientId" className="w-full rounded-xl border-slate-200 h-11 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50" required>
                  <option value="">Choose Patient...</option>
                  {patients.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Assigned Doctor</Label>
                <select name="doctorId" className="w-full rounded-xl border-slate-200 h-11 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50" required>
                  <option value="">Choose Doctor...</option>
                  {doctors.map((d: any) => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label className="text-sm font-semibold text-slate-700">Appointment Date & Time</Label>
                  <Input name="date" type="datetime-local" required className="rounded-xl border-slate-200 h-11 px-4 bg-slate-50 font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Reason for Visit</Label>
                <Input name="reason" placeholder="Routine checkup, symptoms, etc." required className="rounded-xl border-slate-200 h-11 bg-slate-50 font-medium" />
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 h-12 rounded-xl text-lg font-bold shadow-lg shadow-amber-100 transition-all mt-4">
                Confirm Booking
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 text-slate-600 uppercase">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-6 pl-8 font-extrabold text-xs tracking-widest">Appointment ID</TableHead>
              <TableHead className="font-extrabold text-xs tracking-widest">Patient</TableHead>
              <TableHead className="font-extrabold text-xs tracking-widest text-center">Assigned Specialist</TableHead>
              <TableHead className="font-extrabold text-xs tracking-widest text-center">Scheduled Time</TableHead>
              <TableHead className="font-extrabold text-xs tracking-widest text-center">Current Status</TableHead>
              <TableHead className="text-right pr-8 font-extrabold text-xs tracking-widest">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-60 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 bg-slate-50 rounded-full">
                      <CalendarIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-bold">{loading ? "Synchronizing appointments..." : "No appointments scheduled."}</p>
                    <p className="text-xs text-slate-300">Click 'Book New Appointment' to add one.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appt: any) => (
                <TableRow key={appt.id} className="hover:bg-amber-50/30 group transition-all duration-300">
                  <TableCell className="py-5 pl-8 font-bold text-slate-400 text-xs">
                    #{appt.id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shadow-sm">
                        {appt.patient.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800 text-sm">{appt.patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-100/50 shadow-sm">
                      <UserRound className="w-3.5 h-3.5" />
                      <span className="text-xs font-black uppercase tracking-tight">{appt.doctor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-slate-600 text-sm">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="flex items-center gap-1.5"><CalendarIcon className="w-3 h-3 text-amber-500" /> {format(new Date(appt.date), 'MMM dd, yyyy')}</span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"><Clock className="w-2.5 h-2.5" /> {format(new Date(appt.date), 'hh:mm a')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 mx-auto w-fit ${
                      appt.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700 shadow-sm shadow-emerald-50' : 
                      appt.status === 'CANCELLED' ? 'bg-rose-100 text-rose-700 shadow-sm shadow-rose-50' : 
                      'bg-amber-100 text-amber-700 shadow-sm shadow-amber-50'
                    }`}>
                      {appt.status === 'CONFIRMED' ? <CheckCircle2 className="w-3 h-3" /> : 
                       appt.status === 'CANCELLED' ? <XCircle className="w-3 h-3" /> : 
                       <AlertCircle className="w-3 h-3" />}
                      {appt.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white rounded-lg text-slate-400 border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
