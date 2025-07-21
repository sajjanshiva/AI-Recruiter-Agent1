import React from 'react';
import {
  BadgeCheck,
  Lightbulb,
  ShieldCheck,
  Search,
  Users,
  CalendarCheck,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <BadgeCheck className="w-6 h-6 text-black" />,
    title: 'Instant Interview Link Generation',
    description: 'Generate a unique interview link directly from a job description—no manual setup required.',
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-black" />,
    title: 'Voice-Driven AI Interviews',
    description: 'Conduct seamless interviews using voice interaction for a more natural and dynamic experience.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-black" />,
    title: 'Automated Feedback Collection',
    description: 'Automatically collect, analyze, and present candidate feedback to help recruiters make better decisions.',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      
      {/* 🌟 Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Intervu.AI</h1>
          <nav className="hidden md:flex space-x-8 text-gray-700 text-sm font-medium">
            <a href="#" className="hover:text-black">Home</a>
            <a href="#" className="hover:text-black">Features</a>
            <a href="#" className="hover:text-black">Pricing</a>
            <a href="#" className="hover:text-black">Contact</a>
          </nav>
        </div>
      </header>

      {/* 💥 Hero Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-black mb-4">Smarter Hiring with Intervu.AI</h2>
        <p className="text-gray-600 mb-6 text-lg">Automate your hiring process with AI-driven resume screening, ranking, and smart suggestions.</p>
        <Link href={'/auth'}>
          <button className="bg-black text-white px-6 py-2 rounded-full shadow hover:bg-gray-800 transition">Get Started</button>
        </Link>
      </section>

      {/* ✨ Features */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* 📈 Additional Sections */}
      <section className="py-12 px-4 bg-gray-100 text-center">
        <h3 className="text-2xl font-bold text-black mb-2">Boost Your Recruitment Process</h3>
        <p className="text-gray-700 max-w-xl mx-auto mb-4">Our AI engine streamlines candidate sorting, improves decision-making, and reduces hiring time.</p>
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-black" />
            <span>Resume Screening</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-black" />
            <span>Candidate Ranking</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-black" />
            <span>Interview Scheduling</span>
          </div>
        </div>
      </section>

      {/* 📞 CTA */}
      <section className="py-12 px-4 text-center">
        <h3 className="text-2xl font-bold mb-2">Ready to Simplify Hiring?</h3>
        <p className="text-gray-600 mb-4">Start using AiCruiter today and experience the future of recruitment.</p>
        <button className="bg-black text-white px-6 py-2 rounded-full shadow hover:bg-gray-800 transition">Try for Free</button>
      </section>
    </div>
  );
};

export default HomePage;
