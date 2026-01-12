'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';

export default function StudentRulesPage() {
  const { language } = useTranslation();

  const ruleCategories = [
    {
      title: language === 'bn' ? 'সাধারণ আচরণ' : 'General Conduct',
      icon: '🤝',
      rules: [
        language === 'bn' ? 'সকল শিক্ষার্থী, শিক্ষক ও কর্মচারীদের সাথে সম্মান ও দয়ার সাথে আচরণ করুন' : 'Treat all students, teachers, and staff with respect and kindness',
        language === 'bn' ? 'সর্বদা ভদ্র ভাষা ও সুন্দর আচরণ ব্যবহার করুন' : 'Use polite language and good manners at all times',
        language === 'bn' ? 'শিক্ষক ও বিদ্যালয়ের কর্মচারীদের নির্দেশনা তৎক্ষণাৎ মেনে চলুন' : 'Follow instructions from teachers and school staff promptly',
        language === 'bn' ? 'শান্তিপূর্ণ ও ইতিবাচক বিদ্যালয় পরিবেশ বজায় রাখতে সাহায্য করুন' : 'Help maintain a peaceful and positive school environment',
        language === 'bn' ? 'যেকোনো সমস্যা বা উদ্বেগ অবিলম্বে শিক্ষকদের কাছে রিপোর্ট করুন' : 'Report any problems or concerns to teachers immediately'
      ]
    },
    {
      title: language === 'bn' ? 'শ্রেণীকক্ষের আচরণ' : 'Classroom Behavior',
      icon: '📚',
      rules: [
        language === 'bn' ? 'শিক্ষক বা সহপাঠীরা কথা বলার সময় মনোযোগ দিয়ে শুনুন' : 'Listen carefully when teachers or classmates are speaking',
        language === 'bn' ? 'কথা বলার বা প্রশ্ন করার আগে হাত তুলুন' : 'Raise your hand before speaking or asking questions',
        language === 'bn' ? 'আপনার কাজের জায়গা পরিষ্কার ও সুশৃঙ্খল রাখুন' : 'Keep your workspace clean and organized',
        language === 'bn' ? 'সহপাঠীদের সাথে খেলনা ও উপকরণ ভাগাভাগি করুন' : 'Share toys and materials with classmates',
        language === 'bn' ? 'সকল শ্রেণী কার্যক্রমে সক্রিয়ভাবে অংশগ্রহণ করুন' : 'Participate actively in all classroom activities'
      ]
    },
    {
      title: language === 'bn' ? 'নিরাপত্তা নিয়ম' : 'Safety Rules',
      icon: '🛡️',
      rules: [
        language === 'bn' ? 'হলওয়ে ও শ্রেণীকক্ষে হাঁটুন, দৌড়াবেন না' : 'Walk, don\'t run, in hallways and classrooms',
        language === 'bn' ? 'হাত, পা ও বস্তু নিজের কাছে রাখুন' : 'Keep hands, feet, and objects to yourself',
        language === 'bn' ? 'খেলার মাঠের সরঞ্জাম সঠিক ও নিরাপদভাবে ব্যবহার করুন' : 'Use playground equipment properly and safely',
        language === 'bn' ? 'সর্বদা আপনার ক্লাস ও শিক্ষকের সাথে থাকুন' : 'Stay with your class and teacher at all times',
        language === 'bn' ? 'যেকোনো আঘাত বা অনিরাপদ পরিস্থিতি অবিলম্বে রিপোর্ট করুন' : 'Report any injuries or unsafe situations immediately'
      ]
    },
    {
      title: language === 'bn' ? 'ব্যক্তিগত স্বাস্থ্যবিধি' : 'Personal Hygiene',
      icon: '🧼',
      rules: [
        language === 'bn' ? 'খাওয়ার আগে ও টয়লেট ব্যবহারের পর হাত ধুয়ে নিন' : 'Wash hands before eating and after using the restroom',
        language === 'bn' ? 'কাশি বা হাঁচির সময় মুখ ঢেকে রাখুন' : 'Cover your mouth when coughing or sneezing',
        language === 'bn' ? 'আপনার পোশাক পরিষ্কার ও পরিপাটি রাখুন' : 'Keep your uniform clean and neat',
        language === 'bn' ? 'সম্ভব হলে খাওয়ার পর দাঁত ব্রাশ করুন' : 'Brush your teeth after meals when possible',
        language === 'bn' ? 'টিস্যু নিয়ে আসুন এবং প্রয়োজনে ব্যবহার করুন' : 'Bring tissues and use them when needed'
      ]
    },
    {
      title: language === 'bn' ? 'শিশু সুরক্ষা' : 'Child Protection',
      icon: '🛡️',
      rules: [
        language === 'bn' ? 'যেকোনো অস্বস্তিকর পরিস্থিতি অবিলম্বে শিক্ষকদের জানান' : 'Report any uncomfortable situations to teachers immediately',
        language === 'bn' ? 'কেউ আপনাকে অনুপযুক্ত স্পর্শ করলে "না" বলুন এবং শিক্ষকদের জানান' : 'Say "no" if someone touches you inappropriately and tell teachers',
        language === 'bn' ? 'আমাদের বিশেষ সুরক্ষা কমিটি আপনার নিরাপত্তার জন্য কাজ করে' : 'Our special protection committee works for your safety',
        language === 'bn' ? 'সকল শিক্ষার্থীর সমান অধিকার ও সম্মান রয়েছে' : 'All students have equal rights and respect',
        language === 'bn' ? 'বিদ্যালয় একটি নিরাপদ ও সহায়ক পরিবেশ' : 'School is a safe and supportive environment'
      ]
    },
    {
      title: language === 'bn' ? 'মেধাবৃত্তি ও পুরস্কার' : 'Scholarships & Awards',
      icon: '🏆',
      rules: [
        language === 'bn' ? 'মেধাবৃত্তি অভ্যন্তরীণ প্রতিযোগিতামূলক পরীক্ষার মাধ্যমে প্রদান করা হয়' : 'Merit scholarships are awarded through internal competitive examinations',
        language === 'bn' ? 'স্বাস্থ্যকর প্রতিযোগিতা উৎসাহিত করার জন্য পুরস্কার দেওয়া হয়' : 'Awards are given to encourage healthy competition',
        language === 'bn' ? 'সকল শিক্ষার্থী পুরস্কারের জন্য যোগ্য' : 'All students are eligible for awards',
        language === 'bn' ? 'একাডেমিক ও সাংস্কৃতিক উভয় ক্ষেত্রে পুরস্কার রয়েছে' : 'Awards are available in both academic and cultural fields',
        language === 'bn' ? 'নিয়মিত অংশগ্রহণ ও ভালো আচরণ পুরস্কৃত হয়' : 'Regular participation and good behavior are rewarded'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'bn' ? 'নিয়মাবলী ও বিধিবিধান' : 'Rules & Regulations'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {language === 'bn'
                ? 'সবাই একসাথে নিরাপদে শিখতে, খেলতে ও বেড়ে উঠতে সাহায্যকারী সহজ নিয়মাবলী।'
                : 'Simple rules to help everyone learn, play, and grow together safely.'
              }
            </p>
        </div>
      </section>

      {/* Rules Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ruleCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{category.icon}</span>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start text-sm text-gray-700">
                        <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Golden Rules */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Golden Rules</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These are our most important rules that every student should remember.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-yellow-50 rounded-lg">
              <div className="text-6xl mb-4">💛</div>
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Be Kind</h3>
              <p className="text-yellow-700">Treat everyone with kindness and respect, just like you want to be treated.</p>
            </div>
            <div className="text-center p-8 bg-yellow-50 rounded-lg">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Be Safe</h3>
              <p className="text-yellow-700">Follow safety rules to keep yourself and your friends safe and happy.</p>
            </div>
            <div className="text-center p-8 bg-yellow-50 rounded-lg">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Be Your Best</h3>
              <p className="text-yellow-700">Try your best in everything you do and help others do their best too.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consequences and Rewards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🌟</span>
                When You Follow the Rules
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-green-700">You get praise and encouragement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-green-700">You might get a special sticker or certificate</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-green-700">You help make school a happy place</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-green-700">Your parents will be proud of you</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🤔</span>
                When Rules Are Broken
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-orange-700">Your teacher will talk with you about the rule</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-orange-700">You might need to take a quiet break</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-orange-700">You&apos;ll get help to make better choices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-orange-700">Your parents might be called to help</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Success */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Following Rules</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here are some helpful tips to remember our school rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <div className="text-3xl mb-4">👂</div>
              <h4 className="font-bold text-amber-800 mb-2">Listen Carefully</h4>
              <p className="text-amber-700 text-sm">Pay attention when teachers explain the rules</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <div className="text-3xl mb-4">🤔</div>
              <h4 className="font-bold text-amber-800 mb-2">Think First</h4>
              <p className="text-amber-700 text-sm">Think about the rules before you act</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <div className="text-3xl mb-4">🙋</div>
              <h4 className="font-bold text-amber-800 mb-2">Ask Questions</h4>
              <p className="text-amber-700 text-sm">Ask your teacher if you don&apos;t understand a rule</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-lg">
              <div className="text-3xl mb-4">👥</div>
              <h4 className="font-bold text-amber-800 mb-2">Help Friends</h4>
              <p className="text-amber-700 text-sm">Remind your friends about the rules too</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Follow the Rules Together!
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            When we all follow the rules, our school becomes a wonderful place to learn and grow.
          </p>
          <Link
            href="/contact"
            className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Questions? Contact Us
          </Link>
        </div>
      </section>
      </div>
  );
}
