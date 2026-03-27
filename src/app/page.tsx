'use client';
import React from 'react';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  UserRound, 
  CalendarDays, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  Plus, 
  Clock, 
  ShieldAlert, 
  ChevronRight,
  Database,
  MessageSquare,
  ClipboardList
} from "lucide-react";
import { fetchStats } from '@/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats().then(data => {
      setStats(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
        <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Patients" 
          value={stats.patients.toString()} 
          icon={<Users className="w-5 h-5 text-primary" />} 
          trend="+12% from last month" 
          color="border-primary/20 bg-primary/5" 
        />
        <StatCard 
          title="Total Doctors" 
          value={stats.doctors.toString()} 
          icon={<UserRound className="w-5 h-5 text-emerald-400" />} 
          trend="2 new this week" 
          color="border-emerald-500/20 bg-emerald-500/5" 
        />
        <StatCard 
          title="Appointments" 
          value={stats.appointments.toString()} 
          icon={<CalendarDays className="w-5 h-5 text-amber-400" />} 
          trend="+5% from yesterday" 
          color="border-amber-500/20 bg-amber-500/5" 
        />
        <StatCard 
          title="Active Consultations" 
          value="24" 
          icon={<Activity className="w-5 h-5 text-rose-400" />} 
          trend="Current capacity: 85%" 
          color="border-rose-500/20 bg-rose-500/5" 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Quick Actions - NEW */}
        <Card className="md:col-span-12 lg:col-span-3 border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <QuickActionButton icon={<Plus />} label="Add Patient" color="bg-primary" />
            <QuickActionButton icon={<CalendarDays />} label="Schedule" color="bg-emerald-500" />
            <QuickActionButton icon={<ClipboardList />} label="Reports" color="bg-amber-500" />
            <QuickActionButton icon={<Database />} label="Inventory" color="bg-rose-500" />
          </CardContent>
        </Card>

        {/* Charts Section */}
        <Card className="md:col-span-12 lg:col-span-6 border border-white/5 bg-white/[0.02] backdrop-blur-md overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg font-semibold relative z-10">
              <span className="text-slate-200">Patient Inflow Overview</span>
              <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 font-medium transition-colors">
                View Weekly Report <ArrowUpRight className="w-3 h-3" />
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] flex items-end gap-3 px-8 pb-8 pt-4 relative z-10">
            {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-slate-800/50 rounded-t-lg transition-all duration-500 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] cursor-pointer" 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-[10px] text-slate-500 font-bold tracking-tighter uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Medical Alerts - NEW */}
        <Card className="md:col-span-12 lg:col-span-3 border border-rose-500/20 bg-rose-500/5 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Medical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertItem title="Critical Temp" patient="Room 402" icon={<Activity />} />
            <AlertItem title="Late Meds" patient="Room 215" icon={<Clock />} />
            <AlertItem title="New Allergy" patient="Room 108" icon={<ShieldAlert />} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Upcoming Appointments - NEW */}
        <Card className="col-span-4 border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Appointments
            </CardTitle>
            <button className="text-xs text-slate-500 hover:text-primary flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AppointmentRow name="Alice Walker" doctor="Dr. Smith" time="10:30 AM" status="Confirmed" />
              <AppointmentRow name="Robert Fox" doctor="Dr. Chen" time="11:15 AM" status="Pending" />
              <AppointmentRow name="Emily Blunt" doctor="Dr. Wilson" time="12:00 PM" status="Ongoing" />
              <AppointmentRow name="James Dean" doctor="Dr. House" time="01:30 PM" status="Pending" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-200">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ActivityItem 
              title="New Patient Registered" 
              desc="Sarah Jenkins has been added." 
              time="2 mins ago" 
              icon={<Users className="w-4 h-4" />} 
              color="text-primary bg-primary/10 border border-primary/20"
            />
            <ActivityItem 
              title="Appointment Confirmed" 
              desc="Dr. Smith confirmed John Doe." 
              time="15 mins ago" 
              icon={<CalendarDays className="w-4 h-4" />} 
              color="text-emerald-400 bg-emerald-400/10 border border-emerald-400/20"
            />
            <ActivityItem 
              title="System Maintenance" 
              desc="Optimization completed." 
              time="1 hour ago" 
              icon={<Activity className="w-4 h-4" />} 
              color="text-amber-400 bg-amber-400/10 border border-amber-400/20"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <Card className={`border ${color.split(' ')[0]} ${color.split(' ')[1]} backdrop-blur-md overflow-hidden group hover:scale-[1.02] transition-all duration-300`}>
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
            <p className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{value}</p>
          </div>
          <div className={`p-3 rounded-2xl shadow-inner flex items-center justify-center shrink-0`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-tighter">
          <TrendingUp className="w-3 h-3" />
          <span>{trend}</span>
        </div>
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
      </CardContent>
    </Card>
  );
}

function QuickActionButton({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <button className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10 transition-all group w-full text-left">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center scale-90 group-hover:scale-100 transition-transform shadow-lg shadow-black/20`}>
        {React.isValidElement(icon) ? React.cloneElement(icon as any, { className: "w-5 h-5 text-white" }) : icon}
      </div>
      <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

function AlertItem({ title, patient, icon }: { title: string; patient: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
      <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
        {React.isValidElement(icon) ? React.cloneElement(icon as any, { className: "w-4 h-4" }) : icon}
      </div>
      <div>
        <p className="text-xs font-bold text-rose-300">{title}</p>
        <p className="text-[10px] text-slate-500 font-medium">{patient}</p>
      </div>
    </div>
  );
}

function AppointmentRow({ name, doctor, time, status }: { name: string; doctor: string; time: string; status: string }) {
  const statusColor = status === 'Confirmed' ? 'text-emerald-400 bg-emerald-400/10' : status === 'Ongoing' ? 'text-primary bg-primary/10' : 'text-slate-400 bg-slate-400/10';
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-white/5">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-200 group-hover:text-primary transition-colors">{name}</p>
          <p className="text-xs text-slate-500">{doctor}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-slate-300">{time}</p>
        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${statusColor}`}>{status}</span>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  desc: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

function ActivityItem({ title, desc, time, icon, color }: ActivityItemProps) {
  return (
    <div className="flex gap-4 group">
      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-bold text-slate-200 group-hover:text-primary transition-colors">{title}</p>
        <p className="text-xs text-slate-500 leading-snug">{desc}</p>
        <p className="text-[10px] font-bold text-slate-600 mt-1 uppercase tracking-tighter">{time}</p>
      </div>
    </div>
  );
}
