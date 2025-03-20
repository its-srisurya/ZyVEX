import { Metadata } from 'next';

export const metadata = {
  title: 'About'
};

export default function AboutLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
} 