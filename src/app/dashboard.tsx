import React from 'react';
import {
  Phone,
  MapPin,
  Mail,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { ServiceCard } from '@/components/dashboard/ServiceCard';
import { FeatureItem } from '@/components/dashboard/FeatureItem';
import { PricingCard } from '@/components/dashboard/PricingCard';
import { ContactItem } from '@/components/dashboard/ContactItem';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Section 1: Hero / Company Profile (Design 1) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Office Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="relative z-10 text-center text-white px-4">
          <div className="flex justify-center items-center gap-3 mb-8">
            <img src="/assets/images/logo/yayath-logo-new.png" alt="Logo" className="h-12 w-auto" />
            <div className="text-left">
              <h1 className="text-3xl font-bold font-serif">Yayath Spaces</h1>
              <p className="text-xs tracking-widest uppercase opacity-80">Grow Better, Together</p>
            </div>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold font-serif mb-6 tracking-tight">
            COMPANY PROFILE
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-light">
            Managed Offices • Coworking Spaces • Enterprise Workspaces
          </p>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between items-center text-white/60 text-xs">
          <p>© 2026 Yayath Spaces Group. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Yayathspaces.com</span>
            <span>+91 9811823042</span>
            <span>yayathspaces@gmail.com</span>
          </div>
        </div>
      </section>

      {/* Section 2: Key Stats (Design 2) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#D4A017] text-white px-6 py-3 rounded-lg text-2xl font-bold font-serif mb-8">
            Workspaces Built for Business Growth
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            YAYATH SPACES is a Gurugram-based flexible workspace company offering premium managed
            offices for startups, SMEs, consultants, agencies, and enterprise teams.
            We create professionally managed environments where businesses can
            <span className="font-bold text-gray-900"> work, meet, collaborate, and grow </span>
            without the complexity of traditional office leasing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            value="300+"
            label="Flexible Seats"
            description="Scalable capacity for teams of all sizes"
          />
          <StatCard
            value="24x7"
            label="Business Access"
            description="Round-the-clock access for members"
          />
          <StatCard
            value="5+"
            label="Workspace Solutions"
            description="Diverse formats for every work style"
          />
          <StatCard
            value="100%"
            label="Managed Infrastructure"
            description="Fully operated and maintained by us"
          />
        </div>
      </section>

      {/* Section 3: Solutions (Design 3) */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#D4A017] text-white px-6 py-3 rounded-lg text-2xl font-bold font-serif mb-8">
              Our Workspace Solutions
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              From solo professionals to enterprise teams, YAYATH SPACES offers a complete range of
              workspace formats designed to match every business model and growth stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              title="Hot Desk"
              description="Flexible seating for freelancers and mobile professionals."
              image="https://images.unsplash.com/photo-1527192491265-7d605B473491?auto=format&fit=crop&q=80&w=800"
            />
            <ServiceCard
              title="Dedicated Desk"
              description="A reserved workstation with consistency, storage, and a fixed address."
              image="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
            />
            <ServiceCard
              title="Private Cabin"
              description="Secure enclosed offices for growing teams that need privacy."
              image="https://images.unsplash.com/photo-1497366759468-766763d2e14b?auto=format&fit=crop&q=80&w=800"
              highlight
            />
            <ServiceCard
              title="Managed Office"
              description="Fully customized, branded workspaces without lease complexity."
              image="https://images.unsplash.com/photo-1497366759468-766763d2e14b?auto=format&fit=crop&q=80&w=800"
            />
            <ServiceCard
              title="Meeting Room"
              description="AV-enabled spaces for presentations, standups, and boardroom sessions."
              image="https://images.unsplash.com/photo-1431540172169-773736253d71?auto=format&fit=crop&q=80&w=800"
            />
            <ServiceCard
              title="Event Space"
              description="Versatile venue for workshops, launches, networking, and seminars."
              image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Infrastructure (Design 4) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#D4A017] text-white px-6 py-3 rounded-lg text-2xl font-bold font-serif mb-8">
            Ready-to-Move Office Infrastructure
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Our Managed Office solution eliminates the operational burden of running a traditional
            office. From furniture to fiber-optic internet, every element is curated, deployed,
            and maintained by our team — so your leadership can focus entirely on business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureItem text="Fully Furnished" />
          <FeatureItem text="Plug & Play" />
          <FeatureItem text="High-Speed Internet" />
          <FeatureItem text="Reception" />
          <FeatureItem text="Housekeeping" />
          <FeatureItem text="Enterprise Ready" />
          <FeatureItem text="Power Backup" />
          <FeatureItem text="Custom Branding" />
        </div>
      </section>

      {/* Section 5: Amenities (Design 5) */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#D4A017] text-white px-6 py-3 rounded-lg text-2xl font-bold font-serif mb-8">
              Everything Your Team Needs, Included
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 border border-gray-200 rounded-2xl bg-white text-center">
              <h3 className="text-2xl font-bold font-serif mb-2 text-indigo-900">Gbps WiFi</h3>
              <p className="text-gray-600">Fast, reliable internet</p>
            </div>
            <div className="p-8 border border-gray-200 rounded-2xl bg-white text-center">
              <h3 className="text-2xl font-bold font-serif mb-2 text-indigo-900">Reception</h3>
              <p className="text-gray-600">Guest welcome & support Parking</p>
            </div>
            <div className="p-8 border border-gray-200 rounded-2xl bg-white text-center">
              <h3 className="text-2xl font-bold font-serif mb-2 text-indigo-900">Parking</h3>
              <p className="text-gray-600">Dedicated member parking</p>
            </div>
            <div className="p-8 border border-gray-200 rounded-2xl bg-white text-center">
              <h3 className="text-2xl font-bold font-serif mb-2 text-indigo-900">Business Lounge</h3>
              <p className="text-gray-600">Breakout and networking</p>
            </div>
            <div className="p-8 border border-gray-200 rounded-2xl bg-white text-center">
              <h3 className="text-2xl font-bold font-serif mb-2 text-indigo-900">Meeting Rooms</h3>
              <p className="text-gray-600">AV-ready conference spaces Rooms</p>
            </div>
            <div className="p-8 border border-gray-200 rounded-2xl bg-white text-center">
              <h3 className="text-2xl font-bold font-serif mb-2 text-indigo-900">Printing</h3>
              <p className="text-gray-600">Print, scan, copy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Why Choose (Design 6) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#D4A017] text-white px-6 py-3 rounded-lg text-2xl font-bold font-serif mb-8">
            Why Choose YAYATH SPACES
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gold-500 transition-colors">
            <h3 className="text-xl font-bold font-serif mb-2">Prime Location</h3>
            <p className="text-gray-600">Heart of Gurugram business district</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gold-500 transition-colors">
            <h3 className="text-xl font-bold font-serif mb-2">Flexible Terms</h3>
            <p className="text-gray-600">Scale up with ease</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gold-500 transition-colors">
            <h3 className="text-xl font-bold font-serif mb-2">Premium Value</h3>
            <p className="text-gray-600">Luxury feel, smart pricing</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gold-500 transition-colors">
            <h3 className="text-xl font-bold font-serif mb-2">Business Community</h3>
            <p className="text-gray-600">Network with growth-minded teams</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gold-500 transition-colors">
            <h3 className="text-xl font-bold font-serif mb-2">Enterprise Support</h3>
            <p className="text-gray-600">Responsive operational support</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-gold-500 transition-colors">
            <h3 className="text-xl font-bold font-serif mb-2">Professional Experience</h3>
            <p className="text-gray-600">Polished, client-ready workspace</p>
          </div>
        </div>
      </section>

      {/* Section 7: Pricing (Design 7) */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#D4A017] text-white px-6 py-3 rounded-lg text-2xl font-bold font-serif mb-8">
              Flexible Plans for Every Team
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
              Transparent pricing structured around your business needs. <br />
              All plans include shared amenities, high-speed internet, housekeeping, and reception services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard
              title="Hot Desk"
              bestFor="Freelancers & Solopreneurs"
              pricing="₹6,999/Seat"
            />
            <PricingCard
              title="Dedicated Desk"
              bestFor="Independent Professionals"
              pricing="₹9,999/Seat"
            />
            <PricingCard
              title="Private Cabin"
              bestFor="Growing Teams"
              pricing="₹13,999–18,999/Seat"
              featured
            />
            <PricingCard
              title="Managed Office"
              bestFor="Enterprises & Large Teams"
              pricing="₹12,500–20,000/Seat"
            />
            <PricingCard
              title="Meeting Room"
              bestFor="Client & Team Meetings"
              pricing="₹500–1,200/hr"
            />
            <PricingCard
              title="Event Space"
              bestFor="Corporate Events & Workshops"
              pricing="₹6,000–25,000/day"
            />
          </div>

          <div className="mt-16 p-8 bg-[#D4A017] text-white rounded-2xl text-center font-serif text-xl italic">
            Private Cabin is our most popular option for teams of 4–12, with custom branding and priority access.
          </div>
        </div>
      </section>

      {/* Section 8: Contact (Design 8) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <img src="/assets/images/logo/yayath-logo-new.png" alt="Logo" className="h-20 mx-auto mb-4" />
          <h2 className="text-4xl font-bold font-serif text-indigo-900">Get In Touch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ContactItem
            label="Contact Us"
            value="+91 84498 19797, +91 9560380807"
            icon={Phone}
          />
          <ContactItem
            label="Address"
            value="UG-006, MGF Metropolis, Sector 28, Gurugram 122009"
            icon={MapPin}
          />
          <ContactItem
            label="Mail"
            value="yayathspaces@gmail.com"
            icon={Mail}
          />
          <ContactItem
            label="Website"
            value="www.yayathspaces.com"
            icon={Globe}
          />
        </div>
      </section>

      <footer className="py-12 border-t border-gray-200 text-center text-gray-500 text-sm">
        © 2026 Yayath Spaces Group. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
