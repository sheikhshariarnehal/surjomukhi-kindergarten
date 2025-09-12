import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rules & Regulations - Surjomukhi Kindergarten',
  description: 'Student rules and regulations for Surjomukhi Kindergarten.',
  keywords: ['student rules', 'regulations', 'code of conduct', 'school policies'],
};

export default function StudentRulesPage() {
  const ruleCategories = [
    {
      title: 'General Conduct',
      icon: '🤝',
      rules: [
        'Treat all students, teachers, and staff with respect and kindness',
        'Use polite language and good manners at all times',
        'Follow instructions from teachers and school staff promptly',
        'Help maintain a peaceful and positive school environment',
        'Report any problems or concerns to teachers immediately'
      ]
    },
    {
      title: 'Classroom Behavior',
      icon: '📚',
      rules: [
        'Listen carefully when teachers or classmates are speaking',
        'Raise your hand before speaking or asking questions',
        'Keep your workspace clean and organized',
        'Share toys and materials with classmates',
        'Participate actively in all classroom activities'
      ]
    },
    {
      title: 'Safety Rules',
      icon: '🛡️',
      rules: [
        'Walk, don\'t run, in hallways and classrooms',
        'Keep hands, feet, and objects to yourself',
        'Use playground equipment properly and safely',
        'Stay with your class and teacher at all times',
        'Report any injuries or unsafe situations immediately'
      ]
    },
    {
      title: 'Personal Hygiene',
      icon: '🧼',
      rules: [
        'Wash hands before eating and after using the restroom',
        'Cover your mouth when coughing or sneezing',
        'Keep your uniform clean and neat',
        'Brush your teeth after meals when possible',
        'Bring tissues and use them when needed'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><a href="/student" className="text-gray-500 hover:text-gray-700">Student</a></li>
              <li><span className="text-gray-400">/</span></li>
              <li><span className="text-gray-900 font-medium">Rules & Regulations</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Rules & Regulations</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Simple rules to help everyone learn, play, and grow together safely.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our School Rules
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our rules are designed to create a safe, happy, and respectful environment where every child 
              can learn and grow. These simple guidelines help us all work together as a school family.
            </p>
          </div>
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
                  <span className="text-orange-700">You'll get help to make better choices</span>
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
              <p className="text-amber-700 text-sm">Ask your teacher if you don't understand a rule</p>
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
            Let's Follow the Rules Together!
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            When we all follow the rules, our school becomes a wonderful place to learn and grow.
          </p>
          <a
            href="/contact"
            className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Questions? Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
