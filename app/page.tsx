import PublicLayout from "@/components/layouts/PublicLayout";
import {
  Hero,
  OfferTeaser,
  IntroSection,
  FeatureCards,
  RoomSection,
  DiningSection,
  LocationSection,
  MeetingsSection,
  SpecialOffers,
  EventsSection,
  GallerySection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        {/* Hero Section */}
        <Hero />

        {/* Current Offer Teaser - Dynamic from CMS */}
        <OfferTeaser />

        {/* Intro Section - Bold Design, Warm Hospitality, Unmistakably Neoprime */}
        <IntroSection />

        {/* Feature Cards - Sleep, Dine, Drink */}
        <FeatureCards />

        {/* Rooms and Suites */}
        <RoomSection />

        {/* Drink and Dine */}
        <DiningSection />

        {/* Location - How to Find Us */}
        <LocationSection />

        {/* Meetings & Private Dining */}
        <MeetingsSection />

        {/* Special Offers */}
        <SpecialOffers />

        {/* Upcoming Events - Dynamic */}
        <EventsSection />

        {/* Experience Gallery */}
        <GallerySection />

        {/* CTA Section */}
        <CTASection />
      </main>
    </PublicLayout>
  );
}
