'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Filter, MoreVertical, FileText, UserPlus, Phone, Mail, Calendar, Users } from "lucide-react";
import { fetchPatients, createPatient } from '@/lib/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCreatePatient = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    await createPatient(data);
    setIsDialogOpen(false);
    loadPatients();
  };

  const filteredPatients = patients.filter((p: { name: string; email: string }) => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Patient Directory
          </h2>
          <p className="text-slate-500 text-sm">Manage and monitor all registered patients in the system.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger 
            render={
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-12 shadow-lg shadow-blue-100 flex items-center gap-2 group">
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Register Patient
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[550px] border-none shadow-2xl rounded-3xl p-8 overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Patient Registration</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreatePatient} className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required className="rounded-xl border-slate-200 h-11 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required className="pl-10 rounded-xl border-slate-200 h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" required className="pl-10 rounded-xl border-slate-200 h-11" />
                </div>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address" className="text-sm font-semibold text-slate-700">Residential Address</Label>
                <Input id="address" name="address" placeholder="123 Medical St, Health City" required className="rounded-xl border-slate-200 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-sm font-semibold text-slate-700">Date of Birth</Label>
                <Input id="dob" name="dob" type="date" required className="rounded-xl border-slate-200 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-semibold text-slate-700">Gender</Label>
                <select name="gender" className="w-full rounded-xl border-slate-200 h-11 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup" className="text-sm font-semibold text-slate-700">Blood Group</Label>
                <Input id="bloodGroup" name="bloodGroup" placeholder="O+" required className="rounded-xl border-slate-200 h-11 uppercase" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalHistory" className="text-sm font-semibold text-slate-700">Initial Medical Notes</Label>
                <Input id="medicalHistory" name="medicalHistory" placeholder="Any allergies..." className="rounded-xl border-slate-200 h-11" />
              </div>
              <div className="col-span-2 pt-4">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-lg font-bold shadow-lg shadow-blue-100 transition-all">
                  Register Now
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            placeholder="Search patients by name or email..." 
            className="pl-11 rounded-xl border-none bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500 h-11" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-xl border-slate-200 h-11 flex items-center gap-2 text-slate-600 hover:bg-slate-50">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 text-slate-600 uppercase">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-5 pl-8 font-bold">Patient Details</TableHead>
              <TableHead className="font-bold text-center">Contact</TableHead>
              <TableHead className="font-bold text-center">Gender</TableHead>
              <TableHead className="font-bold text-center">Blood Group</TableHead>
              <TableHead className="text-right pr-8 font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-slate-400 font-medium">
                  {loading ? "Loading patient records..." : "No patients found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient: any) => (
                <TableRow key={patient.id} className="hover:bg-blue-50/30 group transition-colors">
                  <TableCell className="py-4 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{patient.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">ID: {patient.id.slice(-8)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs font-semibold text-slate-700">{patient.phone}</span>
                      <span className="text-[10px] text-slate-400">{patient.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      patient.gender === 'MALE' ? 'bg-blue-50 text-blue-600' : 
                      patient.gender === 'FEMALE' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {patient.gender}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-black text-blue-900 text-sm">
                    {patient.bloodGroup}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white rounded-lg text-blue-600 border border-slate-100 shadow-sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white rounded-lg text-slate-400 border border-slate-100 shadow-sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
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
