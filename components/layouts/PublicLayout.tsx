import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import { SiteSettingsProvider } from '@/components/providers/SiteSettingsProvider';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsProvider>
      <Navbar />
      {children}
      <Footer />
    </SiteSettingsProvider>
  );
}
