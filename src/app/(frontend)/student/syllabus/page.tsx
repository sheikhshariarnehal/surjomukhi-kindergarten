import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  Download, 
  FileText, 
  CheckCircle2, 
  BrainCircuit, 
  Users, 
  Activity, 
  HeartHandshake, 
  Eye, 
  FolderKanban, 
  Target, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Syllabus & Curriculum | Surjomukhi Kindergarten',
  description: 'Explore and download the official academic syllabus and curriculum frameworks across all classes at Surjomukhi Kindergarten.',
  keywords: ['syllabus', 'curriculum', 'course outline', 'kindergarten syllabus', 'academic program'],
};

const syllabusData = [
  {
    class: 'Play Group',
    bengali: 'প্লে গ্রুপ',
    age: '2.5 – 3.5 Years',
    termCount: '3 Academic Terms',
    fileSize: '1.2 MB PDF',
    subjects: [
      'Basic Sensory & Motor Coordination',
      'Phonetic Rhymes & Bengali Alphabet Sounds',
      'Object Recognition & Color Identification',
      'Social Interaction & Guided Free Play'
    ],
    downloadLink: '/downloads/playgroup-syllabus.pdf'
  },
  {
    class: 'Nursery',
    bengali: 'নার্সারি',
    age: '3.5 – 4.5 Years',
    termCount: '3 Academic Terms',
    fileSize: '1.4 MB PDF',
    subjects: [
      'Pre-Reading & Letter Formation (EN & BN)',
      'Foundational Number Sense (1–50 / ১–৫০)',
      'Creative Arts, Craft & Tactile Drawing',
      'Basic Moral Habits & Daily Etiquette'
    ],
    downloadLink: '/downloads/nursery-syllabus.pdf'
  },
  {
    class: 'Class One',
    bengali: '১ম শ্রেণি',
    age: '5 – 6 Years',
    termCount: '3 Academic Terms',
    fileSize: '1.8 MB PDF',
    subjects: [
      'Bengali & English Language Arts',
      'Elementary Mathematics & Mental Arithmetic',
      'Introductory Environmental Studies',
      'General Knowledge & Religious Studies'
    ],
    downloadLink: '/downloads/class-one-syllabus.pdf'
  },
  {
    class: 'Class Two',
    bengali: '২য় শ্রেণি',
    age: '6 – 7 Years',
    termCount: '3 Academic Terms',
    fileSize: '1.9 MB PDF',
    subjects: [
      'Sentence Building & Reading Comprehension',
      'Addition, Subtraction & Word Problems',
      'Living World & Physical Environment',
      'Spelling Bee & Handwriting Precision'
    ],
    downloadLink: '/downloads/class-two-syllabus.pdf'
  },
  {
    class: 'Class Three',
    bengali: '৩য় শ্রেণি',
    age: '7 – 8 Years',
    termCount: '3 Academic Terms',
    fileSize: '2.1 MB PDF',
    subjects: [
      'Bengali Grammar, Vocabulary & Composition',
      'English Grammar & Paragraph Writing',
      'Elementary Science (Living Things, Matter)',
      'Bangladesh Studies & Social Environment'
    ],
    downloadLink: '/downloads/class-three-syllabus.pdf'
  },
  {
    class: 'Class Four',
    bengali: '৪র্থ শ্রেণি',
    age: '8 – 9 Years',
    termCount: '3 Academic Terms',
    fileSize: '2.4 MB PDF',
    subjects: [
      'Analytical Mathematics (Fractions, Geometry)',
      'General Science with Laboratory Demos',
      'Bangladesh and Global Studies',
      'ICT Basics & Computational Logic'
    ],
    downloadLink: '/downloads/class-four-syllabus.pdf'
  },
  {
    class: 'Class Five',
    bengali: '৫ম শ্রেণি (সমাপনী)',
    age: '9 – 10 Years',
    termCount: '3 Academic Terms',
    fileSize: '2.6 MB PDF',
    subjects: [
      'Primary Completion Standard Curriculum',
      'Advanced Mathematics & Problem Solving',
      'Integrated Science & Environmental Inquiry',
      'Moral Studies, Civics & Digital Literacy'
    ],
    downloadLink: '/downloads/class-five-syllabus.pdf'
  }
];

export default function SyllabusPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            Official Curriculum Framework
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Academic Syllabus & Syllabi
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our curriculum is structured to blend national foundational standards with modern developmental benchmarks. Browse class outlines or download the complete PDF syllabi for lesson planning and home study routines.
          </p>
        </div>
      </section>

      {/* Curriculum Overview Banner */}
      <section className="py-8 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">3-Term Structured Division</h4>
                <p className="text-xs text-slate-500">First Term, Mid-Term, & Final Summative</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Bilingual Learning Competency</h4>
                <p className="text-xs text-slate-500">Structured Bengali & English foundations</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Holistic Milestone Focus</h4>
                <p className="text-xs text-slate-500">Cognitive, social, and emotional growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus by Class */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Class-by-Class Outline</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Download Class Syllabi
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
                Select a class tier to inspect core subject divisions or download the verified syllabus PDF file.
              </p>
            </div>
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-xs"
            >
              <FileText className="w-4 h-4" />
              All Downloads Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusData.map((item, idx) => (
              <div 
                key={item.class}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-1">
                        <span>Tier 0{idx + 1}</span>
                        <span>•</span>
                        <span>{item.age}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {item.class}
                        <span className="text-xs font-normal text-slate-500 ml-1.5">({item.bengali})</span>
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                      {item.fileSize}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Core Subject Modules:
                    </h4>
                    <ul className="space-y-2">
                      {item.subjects.map((subject, sIdx) => (
                        <li key={sIdx} className="flex items-start text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{subject}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={item.downloadLink}
                    download
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    Download Syllabus PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developmental Objectives */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Pedagogical Philosophy</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Core Developmental Pillars
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Every subject module is structured to support comprehensive growth across these four essential dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Cognitive Growth</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Critical thinking, pattern identification, foundational mathematics, and structured inquiry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Social Interaction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Team collaboration, empathetic communication, group sharing, and courteous interpersonal behavior.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Physical Development</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fine motor precision, active outdoor coordination, posture alignment, and sensory health.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-12 h-12 rounded-xl bg-rose-100/80 text-rose-700 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Emotional Wellbeing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Self-regulation, resilience, artistic confidence, and ethical responsibility in school and home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Framework */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Evaluation Methodology</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Assessment & Progress Tracking
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Continuous, supportive, and stress-free evaluation methods to nurture ongoing student confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Observation-Based Diagnostics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous qualitative assessment of participation, problem solving, and social adaptability in daily classroom activities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
                <FolderKanban className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Portfolio Review & Projects</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Archived collections of artwork, handwriting samples, worksheets, and project tasks reviewed during parent-teacher conferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Milestone Competency Tests</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured term assessments for Class 1 to 5 to evaluate comprehension, arithmetic fluency, and language proficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 lg:py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Questions Regarding the Academic Syllabus?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Our Academic Coordinators and subject teachers are available to discuss learning expectations and textbook lists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/academic/subjects"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
                Explore Subject Catalog
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                Contact Academic Office
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
