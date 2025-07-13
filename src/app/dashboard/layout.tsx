// src/app/dashboard/layout.tsx
import type { Metadata } from 'next';
import Sidebar from './Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard | DigitalNest',
  description: 'Panel de control para tu tienda',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white flex flex-col">
      <div className="flex flex-col sm:flex-row flex-1">
        <Sidebar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  );
}
