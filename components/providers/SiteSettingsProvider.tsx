'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface SiteSettings {
  siteName: string;
  tagline: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  booking: {
    bookingPhone: string;
    reservationsEmail: string;
    diningEmail: string;
    eventsEmail: string;
  };
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
  announcement: {
    text: string;
    link: string;
    isActive: boolean;
  };
  showEvents: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

const defaultSettings: SiteSettings = {
  siteName: 'Neoprime',
  tagline: 'Luxury Redefined',
  contact: {
    phone: '+44 (0) 191 234 5678',
    email: 'hello@neoprimehotels.com',
    address: '1 Neoprime Square, Newcastle upon Tyne, NE1 4AD, United Kingdom',
  },
  booking: {
    bookingPhone: '+44 (0) 191 234 5679',
    reservationsEmail: 'reservations@neoprimehotels.com',
    diningEmail: 'dining@neoprimehotels.com',
    eventsEmail: 'events@neoprimehotels.com',
  },
  social: {
    instagram: 'https://instagram.com/neoprimehotels',
    facebook: 'https://facebook.com/neoprimehotels',
    twitter: 'https://twitter.com/neoprimehotels',
    linkedin: 'https://linkedin.com/company/neoprimehotels',
    youtube: '',
  },
  announcement: {
    text: '',
    link: '',
    isActive: false,
  },
  showEvents: true,
  seo: {
    metaTitle: 'Neoprime Hotel | Luxury Accommodation',
    metaDescription: 'Experience unparalleled luxury at Neoprime Hotel.',
  },
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  isLoading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
});

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.settings) {
          setSettings({
            ...defaultSettings,
            ...data.settings,
            contact: { ...defaultSettings.contact, ...data.settings.contact },
            booking: { ...defaultSettings.booking, ...data.settings.booking },
            social: { ...defaultSettings.social, ...data.settings.social },
            announcement: { ...defaultSettings.announcement, ...data.settings.announcement },
            seo: { ...defaultSettings.seo, ...data.settings.seo },
          });
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}

// Convenience hooks
export function useBookingPhone() {
  const { settings } = useSiteSettings();
  return settings.booking.bookingPhone || settings.contact.phone;
}

export function useContactInfo() {
  const { settings } = useSiteSettings();
  return settings.contact;
}

export function useBookingInfo() {
  const { settings } = useSiteSettings();
  return settings.booking;
}

export function useSocialLinks() {
  const { settings } = useSiteSettings();
  return settings.social;
}

export function useAnnouncement() {
  const { settings } = useSiteSettings();
  return settings.announcement;
}
