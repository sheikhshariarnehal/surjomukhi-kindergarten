import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Lock, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  KeyRound, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Directory & Records | Surjomukhi Kindergarten',
  description: 'Access authorized student directory information, grade structure, and student record guidelines at Surjomukhi Kindergarten.',
  keywords: ['students list', 'student directory', 'class lists', 'student records', 'surjomukhi kindergarten'],
};

const classTiers = [
  {
    name: 'Play Group',
    bengali: 'প্লে গ্রুপ',
    ageRange: '2.5 – 3.5 Years',
    capacity: 20,
    sections: 2,
    teacherRatio: '10:1',
    description: 'Foundational sensory exploration, socialization, and play-based cognitive development.'
  },
  {
    name: 'Nursery',
    bengali: 'নার্সারি',
    ageRange: '3.5 – 4.5 Years',
    capacity: 25,
    sections: 2,
    teacherRatio: '12:1',
    description: 'Early literacy, phonetics, numeracy building, and collaborative creative play.'
  },
  {
    name: 'Class One',
    bengali: '১ম শ্রেণি',
    ageRange: '5 – 6 Years',
    capacity: 30,
    sections: 2,
    teacherRatio: '15:1',
    description: 'Formal language introduction, mathematical foundations, and environmental awareness.'
  },
  {
    name: 'Class Two',
    bengali: '২য় শ্রেণি',
    ageRange: '6 – 7 Years',
    capacity: 30,
    sections: 2,
    teacherRatio: '15:1',
    description: 'Reading fluency, bilingual expression, basic logic, and scientific curiosity.'
  },
  {
    name: 'Class Three',
    bengali: '৩য় শ্রেণি',
    ageRange: '7 – 8 Years',
    capacity: 30,
    sections: 2,
    teacherRatio: '15:1',
    description: 'Integrated curriculum focusing on comprehension, problem solving, and social science.'
  },
  {
    name: 'Class Four',
    bengali: '৪র্থ শ্রেণি',
    ageRange: '8 – 9 Years',
    capacity: 35,
    sections: 2,
    teacherRatio: '18:1',
    description: 'Analytical reasoning, advanced grammar, scientific methodology, and ICT basics.'
  },
  {
    name: 'Class Five',
    bengali: '৫ম শ্রেণি (সমাপনী)',
    ageRange: '9 – 10 Years',
    capacity: 35,
    sections: 2,
    teacherRatio: '18:1',
    description: 'Primary completion mastery, leadership development, and high-school readiness.'
  }
];

export default function StudentsListPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Official Student Records
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Student Directory & Records
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Surjomukhi Kindergarten maintains rigorous student privacy standards. Complete student directories, roll numbers, and academic performance profiles are protected and accessible solely via authenticated parent and faculty credentials.
          </p>
        </div>
      </section>

      {/* Restricted Access Verification Portal */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mb-6">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                Student Directory Access Restricted
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                In compliance with student data privacy protocols and institutional child protection policies, full student rosters with personal identifiers are not publicly indexed. Authorized parents, legal guardians, and faculty members may log in to review their respective classroom registries.
              </p>

              {/* Portal Access Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8 text-left">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    Parent & Guardian Portal
                  </div>
                  <p className="text-xs text-slate-600 mb-4">
                    Access your child&apos;s class roll, attendance record, and report card archives.
                  </p>
                  <Link
                    href="/auth/login?role=parent"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Parent Portal Login <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                    <KeyRound className="w-4 h-4 text-emerald-600" />
                    Faculty & Admin Portal
                  </div>
                  <p className="text-xs text-slate-600 mb-4">
                    Faculty access for daily roll calls, grade entry, and institutional record updates.
                  </p>
                  <Link
                    href="/auth/login?role=staff"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Staff Portal Login <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Quick Info Pill */}
              <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-100/80 px-4 py-2 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                For transfer certificates or enrollment confirmation letters, contact the Registrar Desk.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Structure & Capacity Registry */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4" />
                Academic Framework
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Class Tiers & Enrollment Capacity
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
                Surjomukhi Kindergarten maintains strict student-to-teacher ratios to ensure personalized pedagogical care across all sections.
              </p>
            </div>
            <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg whitespace-nowrap">
              Academic Year: <span className="font-semibold text-slate-900">2024–2025</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classTiers.map((tier, idx) => (
              <div 
                key={tier.name}
                className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-6 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        {tier.name}
                        <span className="text-xs font-normal text-slate-500">({tier.bengali})</span>
                      </h3>
                      <p className="text-xs font-medium text-blue-600 mt-0.5">{tier.ageRange}</p>
                    </div>
                    <span className="text-xs font-bold bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                      Tier 0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="block text-slate-400 text-[10px] uppercase font-semibold">Max Cap</span>
                    <span className="font-bold text-slate-900">{tier.capacity}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="block text-slate-400 text-[10px] uppercase font-semibold">Sections</span>
                    <span className="font-bold text-slate-900">{tier.sections}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="block text-slate-400 text-[10px] uppercase font-semibold">Ratio</span>
                    <span className="font-bold text-slate-900">{tier.teacherRatio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification & Registrar Helpdesk */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                <Building2 className="w-4 h-4" />
                Registrar & Records Office
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Need Official Student Records or Certificates?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Our Administrative Office provides student identification letters, testimonial certificates, enrollment verifications, and transfer documents upon formal parent application.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/student/verify-certificate"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Verify Certificate Online
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  Contact Academic Office
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
