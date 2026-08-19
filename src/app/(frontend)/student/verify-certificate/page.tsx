'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  FileText,
  GraduationCap,
  Award,
  BadgeCheck,
  Phone,
  Mail,
  Building2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function VerifyCertificatePage() {
  const [certNumber, setCertNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [issueYear, setIssueYear] = useState('2024');
  const [certType, setCertType] = useState('completion');
  const [securityCode, setSecurityCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'verified' | 'not_found'>('idle');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNumber.trim()) return;

    setStatus('searching');
    setTimeout(() => {
      // Demo validation mock
      if (certNumber.toLowerCase().includes('smk') || certNumber.length >= 6) {
        setStatus('verified');
      } else {
        setStatus('not_found');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Institutional Credential Authentication
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Verify Official Certificates
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Verify the authenticity of completion certificates, transfer letters, and achievement credentials issued by the Surjomukhi Kindergarten Academic Council.
          </p>
        </div>
      </section>

      {/* Verification Portal Form */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Certificate Verification Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Enter the unique certificate serial number and issuance credentials from the printed document.
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Certificate Number / Serial *
                  </label>
                  <input
                    type="text"
                    required
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    placeholder="e.g. SMK-2024-0482"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Found on the top-right header of official certificates.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="As printed on certificate"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Year of Issuance *
                  </label>
                  <select
                    value={issueYear}
                    onChange={(e) => setIssueYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                  >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Certificate Category *
                  </label>
                  <select
                    value={certType}
                    onChange={(e) => setCertType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
                  >
                    <option value="completion">Primary Completion Certificate</option>
                    <option value="transfer">Official Transfer Certificate (TC)</option>
                    <option value="character">Character & Testimonial Certificate</option>
                    <option value="achievement">Merit & Cultural Award Certificate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Security Hash Code (Optional)
                </label>
                <input
                  type="text"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  placeholder="Security alphanumeric barcode code"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'searching'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold text-sm transition-colors shadow-xs disabled:opacity-50"
                >
                  {status === 'searching' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating against Academic Ledger...
                    </>
                  ) : (
                    <>
                      <BadgeCheck className="w-4 h-4" />
                      Verify Certificate Now
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Verification Result Feedback */}
            {status === 'verified' && (
              <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Authentic Document Confirmed
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      Certificate #{certNumber.toUpperCase()} is Verified & Valid
                    </h4>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200/60">
                        <span className="block text-slate-400 font-medium">Student</span>
                        <span className="font-bold text-slate-900">{studentName || 'Sheikh Ahsan'}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200/60">
                        <span className="block text-slate-400 font-medium">Year</span>
                        <span className="font-bold text-slate-900">{issueYear}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200/60">
                        <span className="block text-slate-400 font-medium">Status</span>
                        <span className="font-bold text-emerald-700">Official / Sealed</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200/60">
                        <span className="block text-slate-400 font-medium">Issuer</span>
                        <span className="font-bold text-slate-900">Academic Board</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {status === 'not_found' && (
              <div className="mt-8 p-6 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      No Matching Record Found in Online Ledger
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Please re-verify the certificate number format. Older records (prior to 2021) may require manual archival retrieval from the Principal&apos;s Records Desk.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3-Step Verification Process */}
      <section className="py-12 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Protocol</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              How the Verification Protocol Operates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Input Credential Details</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter the official serial number, candidate name, and issuance academic year printed on the original paper certificate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Database Cross-Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The institutional portal cross-references the student ledger archive, matching watermark serials and academic signatures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Instant Verification Report</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive instant confirmation of credential validity for secondary school admissions, employer checks, or immigration records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Catalog */}
      <section className="py-12 lg:py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Credentials</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Types of Certificates Issued
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Primary Completion</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Awarded upon successful completion of Class 5 curriculum and high school readiness.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Transfer Certificate</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official document issued when a student relocates to another recognized educational institution.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Character Testimonial</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certifies conduct, attendance discipline, and moral standing signed by the Principal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Merit & Honor Award</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recognizes top academic ranks, spelling bee triumphs, and athletic achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manual Verification Helpdesk */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                <Building2 className="w-4 h-4" />
                Records & Verification Desk
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Need Manual Archival Verification or Duplicate Issue?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Institutions, secondary schools, and alumni requiring sealed physical duplicate certificates or formal verification endorsements may contact the Registrar Office directly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <Phone className="w-4 h-4 text-blue-400 mb-2" />
                  <span className="block text-slate-400 font-medium">Telephone Inquiries</span>
                  <span className="font-bold text-white text-sm">+880 1712-345678</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <Mail className="w-4 h-4 text-blue-400 mb-2" />
                  <span className="block text-slate-400 font-medium">Verification Email</span>
                  <span className="font-bold text-white text-sm">verify@surjomukhi.edu.bd</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                  <Building2 className="w-4 h-4 text-blue-400 mb-2" />
                  <span className="block text-slate-400 font-medium">Office Hours</span>
                  <span className="font-bold text-white text-sm">Sat – Thu, 8:30 AM – 2 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
