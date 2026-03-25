'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, UserRound, GraduationCap, MapPin, Phone, Star, Search, Filter, Mail, Briefcase } from "lucide-react";
import { fetchDoctors, createDoctor } from '@/lib/api';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await fetchDoctors();
      setDoctors(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCreateDoctor = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    await createDoctor(data);
    setIsDialogOpen(false);
    loadDoctors();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <UserRound className="w-8 h-8 text-emerald-600" />
            Medical Specialists
          </h2>
          <p className="text-slate-500 font-medium">Manage and view our team of expert healthcare professionals.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger 
            render={
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl px-6 h-12 shadow-lg shadow-emerald-100 flex items-center gap-2 group transition-all">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Add Specialist
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-3xl p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">Register Specialist</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateDoctor} className="space-y-6 pt-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Full Name</Label>
                <Input name="name" placeholder="Dr. Jane Smith" required className="rounded-xl border-slate-200 h-11" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">Specialization</Label>
                  <Input name="specialization" placeholder="Cardiologist" required className="rounded-xl border-slate-200 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">Experience (Years)</Label>
                  <Input name="experience" type="number" placeholder="10" required className="rounded-xl border-slate-200 h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Contact Email</Label>
                <Input name="email" type="email" placeholder="jane.smith@hospital.com" required className="rounded-xl border-slate-200 h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Phone Number</Label>
                <Input name="phone" placeholder="+1 (555) 000-0000" required className="rounded-xl border-slate-200 h-11" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">Availability Summary</Label>
                <Input name="availability" placeholder="Mon-Fri, 9am - 5pm" required className="rounded-xl border-slate-200 h-11" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl text-lg font-bold shadow-lg shadow-emerald-100 transition-all mt-4">
                Add Specialist
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <p className="col-span-full text-center text-slate-400 py-20 font-medium">Fetching specialist profiles...</p>
        ) : doctors.length === 0 ? (
          <p className="col-span-full text-center text-slate-400 py-20 font-medium">No specialists found.</p>
        ) : (
          doctors.map((doctor: any) => (
            <Card key={doctor.id} className="border-none shadow-sm shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-100 transition-all group overflow-hidden bg-white/50 backdrop-blur-sm rounded-3xl">
              <div className="h-2 bg-emerald-500 w-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="text-center pb-2 pt-8">
                <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-50 rotate-3 group-hover:rotate-0">
                  <UserRound className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">{doctor.name}</CardTitle>
                <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mt-1">{doctor.specialization}</p>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-8">
                <div className="flex flex-col gap-3 py-4 border-y border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>{doctor.experience} Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Highly Recommended</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{doctor.email}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-black text-slate-300 tracking-tighter">Availability</p>
                  <p className="text-xs text-slate-600 font-bold bg-slate-50 p-2 rounded-lg border border-slate-100">{doctor.availability}</p>
                </div>
                <Button variant="outline" className="w-full border-emerald-100 text-emerald-700 hover:bg-emerald-50 rounded-xl font-bold h-10 text-xs mt-2 group/btn">
                  View Full Profile
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
