import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Heart
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exam Schedule & Assessment Calendar | Surjomukhi Kindergarten',
  description: 'Official examination dates, term assessment schedules, and evaluation guidelines for all classes at Surjomukhi Kindergarten.',
  keywords: ['exam schedule', 'assessment dates', 'test schedule', 'term examination', 'kindergarten evaluation'],
};

const termsData = [
  {
    term: 'First Term Assessment',
    bengali: '১ম সাময়িক মূল্যায়ন',
    period: 'March 18 – March 28, 2025',
    timing: '09:00 AM – 11:30 AM',
    classes: ['Play Group', 'Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    type: 'Continuous & Formative Evaluation',
    status: 'Upcoming',
    description: 'Initial term diagnostic tracking early concept grasp, handwriting, spelling, and basic arithmetic skills.',
    downloadUrl: '/downloads/first-term-routine-2025.pdf'
  },
  {
    term: 'Mid-Year Comprehensive Assessment',
    bengali: 'অর্ধ-বার্ষিক মূল্যায়ন',
    period: 'July 12 – July 24, 2025',
    timing: '09:00 AM – 12:00 PM',
    classes: ['Play Group', 'Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    type: 'Mid-Year Summative Evaluation',
    status: 'Scheduled',
    description: 'Comprehensive mid-session evaluations, oral presentations, portfolio reviews, and written examinations.',
    downloadUrl: '/downloads/mid-year-routine-2025.pdf'
  },
  {
    term: 'Annual Final Examination & Review',
    bengali: 'বার্ষিক পরীক্ষা ও সমাপনী মূল্যায়ন',
    period: 'November 22 – December 04, 2025',
    timing: '09:00 AM – 12:30 PM',
    classes: ['Play Group', 'Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    type: 'Final Comprehensive Summative',
    status: 'Scheduled',
    description: 'Year-end mastery assessment determining class promotion, awards, and merit scholarship standings.',
    downloadUrl: '/downloads/final-exam-routine-2025.pdf'
  }
];

export default function ExamSchedulePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Evaluation Calendar 2025
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Exam Schedule & Assessment Calendar
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Surjomukhi Kindergarten implements a balanced evaluation framework designed to celebrate learning milestones without inducing exam anxiety. Review scheduled dates and download verified class routines.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-gray-200/80 border-t border-gray-100 pt-8 max-w-4xl mx-auto text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">3 Terms</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">Assessment Cycles</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">9:00 AM</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">Morning Session Start</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">Play – Gr 5</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">Covered Classes</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">PDF</div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">Verified Routines</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Term Schedules */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Term Examination Cycles
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
                ২০২৫ শিক্ষাবর্ষের সকল সাময়িক ও সমাপনী মূল্যায়নের সুনির্দিষ্ট সময়সূচি ও বিস্তারিত বিবরণ।
              </p>
            </div>
            <Link
              href="/academic/calendar"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white border border-slate-200/90 hover:border-slate-300 px-4 py-2 rounded-xl shadow-xs transition-all"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              Full Academic Calendar
            </Link>
          </div>

          <div className="space-y-6">
            {termsData.map((term, index) => {
              const isUpcoming = term.status === 'Upcoming';

              return (
                <div 
                  key={term.term}
                  className={`bg-white rounded-2xl border transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between ${
                    isUpcoming 
                      ? 'border-blue-300/80 shadow-sm bg-gradient-to-br from-blue-50/20 via-white to-slate-50/30' 
                      : 'border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                    <div className="flex-1">
                      {/* Badge Row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                          isUpcoming
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          Term Cycle 0{index + 1}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                          {term.type}
                        </span>
                        {isUpcoming && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Next Assessment
                          </span>
                        )}
                      </div>

                      {/* Titles */}
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {term.term}
                      </h3>
                      <div className="text-sm font-semibold text-blue-700 mt-0.5 mb-2">
                        {term.bengali}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                        {term.description}
                      </p>
                    </div>

                    {/* Right Metadata Block & Action */}
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-end xl:items-center gap-3.5 flex-shrink-0">
                      <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3.5 space-y-1.5 min-w-[200px]">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>{term.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>{term.timing}</span>
                        </div>
                      </div>

                      <a
                        href={term.downloadUrl}
                        download
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-5 py-3 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Routine PDF</span>
                      </a>
                    </div>
                  </div>

                  {/* Participating Classes Row */}
                  <div className="pt-4 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                      Participating Classes:
                    </span>
                    {term.classes.map((cls) => (
                      <span 
                        key={cls}
                        className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Age-Appropriate Framework */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Evaluation Methodology</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Age-Appropriate Assessment Methods
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Our evaluation techniques adapt to the developmental readiness of each grade level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-md mb-3">
                <Heart className="w-3.5 h-3.5" />
                Play Group & Nursery
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Formal Exams (Play-Based)</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Early childhood evaluations avoid sitting written tests. Children are evaluated through informal play, interactive story-telling, object sorting, and motor activity observation.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Sensory & fine-motor coordination
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Socialization and sharing habits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Spoken Bengali & phonetic recognition
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                Class 1 & Class 2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Continuous Formative Tests</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Short, gentle worksheet assessments combined with oral reading, handwriting exercises, and creative drawing tasks to assess foundational comprehension.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Bilingual spelling & sentence reading
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Basic arithmetic & counting accuracy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Classroom project participation
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-md mb-3">
                <Award className="w-3.5 h-3.5" />
                Class 3, 4 & 5
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Structured Summative Exams</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Structured syllabus examinations assessing reasoning, science concept application, social studies, and primary completion readiness.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Analytical problem-solving tests
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Written composition & creative essays
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  General knowledge & science lab checks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines & Policies */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Parent & Student Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Ensure your child arrives at least 15 minutes before the scheduled exam start time.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Keep exam stationery (pencils, sharpener, eraser, ruler) organized in a clear pouch.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Encourage regular rest and healthy breakfast on examination mornings.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Admit cards must be brought daily for Class 3, 4, and 5 examinations.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Absence & Make-up Policy
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>If a child falls ill on exam day, do not send them to school. Safety and recovery come first.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Submit a doctor&apos;s prescription or medical notice to the Headmistress within 48 hours.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Alternative continuous evaluation scores will be computed so the student is not penalized.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Helpdesk */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Questions Regarding the Examination Schedule?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Contact our Academic Coordinator or visit the Administration Office during school hours for detailed queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <HelpCircle className="w-4 h-4" />
                Contact Examination Desk
              </Link>
              <Link
                href="/student/syllabus"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                View Academic Syllabus
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
