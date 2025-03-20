import { Metadata } from 'next';

export const metadata = {
  title: 'Dashboard'
};

export default function DashboardLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
} 