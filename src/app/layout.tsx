import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, UserRound, CalendarDays, Settings, Hospital } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediCare | Hospital Management",
  description: "A premium hospital management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen">
            <div className="p-6 flex items-center gap-2 text-blue-600 font-bold text-2xl">
              <Hospital className="w-8 h-8" />
              <span>MediCare</span>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              <SidebarLink href="/" icon={<LayoutDashboard />} label="Dashboard" />
              <SidebarLink href="/patients" icon={<Users />} label="Patients" />
              <SidebarLink href="/doctors" icon={<UserRound />} label="Doctors" />
              <SidebarLink href="/appointments" icon={<CalendarDays />} label="Appointments" />
              <div className="pt-4 border-t border-slate-100">
                <SidebarLink href="/settings" icon={<Settings />} label="Settings" />
              </div>
            </nav>
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <p className="text-sm font-semibold">John Smith</p>
                  <p className="text-xs text-slate-500 underline">Admin</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
              <h1 className="text-xl font-semibold text-slate-800">Hospital Administration</h1>
              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </header>
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all group font-medium"
    >
      {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5 group-hover:scale-110 transition-transform" })}
      <span>{label}</span>
    </Link>
  );
}
