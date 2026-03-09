'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  BedDouble, 
  Tag, 
  FileText, 
  Image, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  ChevronRight,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: Home },
  { label: 'Rooms', href: '/admin/rooms', icon: BedDouble },
  { label: 'Offers', href: '/admin/offers', icon: Tag },
  { label: 'Spaces', href: '/admin/spaces', icon: Building },
  { label: 'Blog / Press', href: '/admin/posts', icon: FileText },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Check if on login page
  const isLoginPage = pathname === '/admin/login';

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoginPage && status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router, isLoginPage]);

  // Skip layout for login page - after all hooks
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="min-h-screen bg-[#0f1115] flex">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-luxury-black border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <path
                  d="M10 8 L10 32 L17 32 L17 22 L23 32 L30 32 L30 8 L23 8 L23 18 L17 8 Z"
                  fill="none"
                  stroke="#C6A56A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <span className="text-white font-sans text-lg tracking-[0.2em] uppercase font-light block">
                  Neoprime
                </span>
                <span className="text-gold text-[9px] tracking-[0.3em] uppercase">
                  Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                        isActive 
                          ? 'bg-gold/10 text-gold border-l-2 border-gold' 
                          : 'text-text-muted hover:text-white hover:bg-white/5'
                      )}
                    >
                      <item.icon size={20} />
                      <span className="font-sans text-sm">{item.label}</span>
                      {isActive && <ChevronRight size={16} className="ml-auto" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold text-sm font-sans uppercase">
                  {session.user.name?.[0] || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-sans truncate">
                  {session.user.name}
                </p>
                <p className="text-text-muted text-xs capitalize">
                  {session.user.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-2 text-text-muted hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
              <span className="font-sans text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-luxury-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2 -ml-2"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <Link 
                href="/" 
                target="_blank"
                className="text-text-muted hover:text-gold text-sm font-sans transition-colors"
              >
                View Site →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
