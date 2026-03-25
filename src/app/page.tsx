'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserRound, CalendarDays, Activity, TrendingUp, ArrowUpRight } from "lucide-react";
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
          icon={<Users className="w-5 h-5" />} 
          trend="+12% from last month" 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Doctors" 
          value={stats.doctors.toString()} 
          icon={<UserRound className="w-5 h-5" />} 
          trend="2 new this week" 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Appointments" 
          value={stats.appointments.toString()} 
          icon={<CalendarDays className="w-5 h-5" />} 
          trend="+5% from yesterday" 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Active Consultations" 
          value="24" 
          icon={<Activity className="w-5 h-5" />} 
          trend="Current capacity: 85%" 
          color="bg-rose-500" 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm shadow-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg font-semibold">
              <span>Patient Inflow Overview</span>
              <button className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium">
                View Weekly Report <ArrowUpRight className="w-3 h-3" />
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-end gap-2 px-8 pb-8 pt-4">
            {/* Mock Chart Visualization */}
            {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-blue-100 rounded-t-lg transition-all duration-500 group-hover:bg-blue-500 cursor-pointer" 
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-slate-400 font-medium">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-sm shadow-blue-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-slate-800">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ActivityItem 
              title="New Patient Registered" 
              desc="Sarah Jenkins has been added to the system." 
              time="2 mins ago" 
              icon={<Users className="w-4 h-4" />} 
              color="text-blue-600 bg-blue-50"
            />
            <ActivityItem 
              title="Appointment Confirmed" 
              desc="Dr. Michael Smith confirmed appointment with John Doe." 
              time="15 mins ago" 
              icon={<CalendarDays className="w-4 h-4" />} 
              color="text-emerald-600 bg-emerald-50"
            />
            <ActivityItem 
              title="System Maintenance" 
              desc="Database optimization completed successfully." 
              time="1 hour ago" 
              icon={<Activity className="w-4 h-4" />} 
              color="text-amber-600 bg-amber-50"
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
    <Card className="border-none shadow-sm shadow-blue-100 hover:shadow-md transition-shadow group overflow-hidden">
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase">{value}</p>
          </div>
          <div className={`${color} p-3 rounded-2xl text-white shadow-lg shadow-blue-100 w-12 h-12 flex items-center justify-center shrink-0`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp className="w-3 h-3" />
          <span>{trend}</span>
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50/50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>
      </CardContent>
    </Card>
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
    <div className="flex gap-4">
      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500 leading-snug">{desc}</p>
        <p className="text-[10px] font-medium text-slate-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
