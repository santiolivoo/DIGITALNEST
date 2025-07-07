// src/app/dashboard/layout.tsx
import type { Metadata } from 'next';
import Header from './Header';

export const metadata: Metadata = {
  title: 'Dashboard | DIGITALNEST',
  description: 'Panel de control para tu tienda',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
