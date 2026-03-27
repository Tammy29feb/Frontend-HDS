import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  CalendarDays, 
  Settings, 
  Hospital, 
  BarChart3, 
  Database, 
  MessageSquare 
} from "lucide-react";

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
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col sticky top-0 h-screen">
            <div className="p-6 flex items-center gap-2 text-primary font-bold text-2xl">
              <Hospital className="w-8 h-8" />
              <span>MediCare</span>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              <SidebarLink href="/" icon={<LayoutDashboard />} label="Dashboard" />
              <SidebarLink href="/patients" icon={<Users />} label="Patients" />
              <SidebarLink href="/doctors" icon={<UserRound />} label="Doctors" />
              <SidebarLink href="/appointments" icon={<CalendarDays />} label="Appointments" />
              
              <div className="pt-2 pb-2">
                <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Analytics & Management</p>
                <SidebarLink href="/reports" icon={<BarChart3 />} label="Reports" />
                <SidebarLink href="/inventory" icon={<Database />} label="Inventory" />
                <SidebarLink href="/messages" icon={<MessageSquare />} label="Messages" />
              </div>

              <div className="pt-4 border-t border-sidebar-border">
                <SidebarLink href="/settings" icon={<Settings />} label="Settings" />
              </div>
            </nav>
            <div className="p-4 border-t border-sidebar-border">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
                  JS
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">John Smith</p>
                  <p className="text-xs text-muted-foreground">System Admin</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-background">
            <header className="h-16 border-b border-border bg-background/60 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-between px-8">
              <h1 className="text-xl font-semibold text-foreground">Hospital Administration</h1>
              <div className="flex items-center gap-4">
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-secondary">
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
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all group font-medium"
    >
      <div className="flex items-center justify-center">
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<any>, {
              className: "w-5 h-5 group-hover:scale-110 transition-transform",
            })
          : icon}
      </div>
      <span className="text-sm">{label}</span>
    </Link>
  );
}
