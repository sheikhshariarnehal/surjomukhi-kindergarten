import AboutUsClient from './AboutUsClient';

// Static data for better SEO and performance - moved to const to avoid Next.js export restrictions
const staticData = {
  contactInfo: {
    en: [
      { label: 'Address', value: 'Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320', icon: '📍', color: 'from-blue-500 to-blue-600' },
      { label: 'Phone', value: '01954113374', icon: '📞', color: 'from-green-500 to-green-600' },
      { label: 'Email', value: 'info.surjamukhikindergarten@gmail.com', icon: '✉️', color: 'from-purple-500 to-purple-600' },
      { label: 'Website', value: 'www.surjamukhikindergarten.com', icon: '🌐', color: 'from-orange-500 to-orange-600' },
    ],
    bn: [
      { label: 'ঠিকানা', value: 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ, ঢাকা-১৩২০', icon: '📍', color: 'from-blue-500 to-blue-600' },
      { label: 'ফোন', value: '০১৯৫৪১১৩৩৭৪', icon: '📞', color: 'from-green-500 to-green-600' },
      { label: 'ইমেইল', value: 'info.surjamukhikindergarten@gmail.com', icon: '✉️', color: 'from-purple-500 to-purple-600' },
      { label: 'ওয়েবসাইট', value: 'www.surjamukhikindergarten.com', icon: '🌐', color: 'from-orange-500 to-orange-600' },
    ],
  },
  schoolIdeals: {
    en: [
      { title: 'Education is the backbone of the nation', description: 'Expand quality education as the foundation of nation building', icon: '🎓', color: 'from-blue-400 to-blue-600' },
      { title: 'Peace is the supreme virtue', description: 'Nurture peaceful and service-minded citizens through education', icon: '☮️', color: 'from-green-400 to-green-600' },
      { title: 'Spirit of unity and progress', description: 'Engage learners in progressing toward an advanced society', icon: '🤝', color: 'from-purple-400 to-purple-600' },
    ],
    bn: [
      { title: 'শিক্ষাই জাতির মেরুদণ্ড', description: 'জাতি গঠনের ভিত্তি হিসেবে মানসম্পন্ন শিক্ষা সম্প্রসারণ করা', icon: '🎓', color: 'from-blue-400 to-blue-600' },
      { title: 'শান্তিই পরম ধর্ম', description: 'শিক্ষার মাধ্যমে শান্তিপ্রিয় ও সেবাপরায়ণ নাগরিক গড়ে তোলা', icon: '☮️', color: 'from-green-400 to-green-600' },
      { title: 'ঐক্য ও অগ্রগতির চেতনা', description: 'উন্নত সমাজের দিকে অগ্রসর হওয়ার জন্য শিক্ষার্থীদের সম্পৃক্ত করা', icon: '🤝', color: 'from-purple-400 to-purple-600' },
    ],
  },
  facilities: {
    en: [
      { title: 'Playground', description: 'Approximately 100 yards × 60 yards playground', icon: '⚽', color: 'from-green-400 to-green-500' },
      { title: 'Library', description: 'Well-equipped library for students', icon: '📚', color: 'from-blue-400 to-blue-500' },
      { title: 'Safe Environment', description: 'Safe and healthy environment for children', icon: '🛡️', color: 'from-red-400 to-red-500' },
      { title: 'Modern Classrooms', description: 'Classrooms with modern educational materials', icon: '🏫', color: 'from-yellow-400 to-yellow-500' },
      { title: 'Administrative Office', description: 'Well-organized administrative office', icon: '🏢', color: 'from-purple-400 to-purple-500' },
      { title: 'Document Storage', description: 'Secure document storage facility', icon: '📁', color: 'from-indigo-400 to-indigo-500' },
    ],
    bn: [
      { title: 'খেলার মাঠ', description: 'প্রায় ১০০ গজ × ৬০ গজ বিস্তৃত খেলার মাঠ', icon: '⚽', color: 'from-green-400 to-green-500' },
      { title: 'গ্রন্থাগার', description: 'শিক্ষার্থীদের জন্য সমৃদ্ধ গ্রন্থাগার', icon: '📚', color: 'from-blue-400 to-blue-500' },
      { title: 'নিরাপদ পরিবেশ', description: 'শিশুদের জন্য নিরাপদ ও স্বাস্থ্যকর পরিবেশ', icon: '🛡️', color: 'from-red-400 to-red-500' },
      { title: 'আধুনিক শ্রেণীকক্ষ', description: 'আধুনিক শিক্ষা উপকরণসহ শ্রেণীকক্ষ', icon: '🏫', color: 'from-yellow-400 to-yellow-500' },
      { title: 'প্রশাসনিক অফিস', description: 'সুসংগঠিত প্রশাসনিক কার্যালয়', icon: '🏢', color: 'from-purple-400 to-purple-500' },
      { title: 'নথি সংরক্ষণাগার', description: 'নিরাপদ নথিপত্র সংরক্ষণাগার', icon: '📁', color: 'from-indigo-400 to-indigo-500' },
    ],
  },
  governance: {
    en: [
      { position: 'President', role: 'Representative from founders/patrons', icon: '👑' },
      { position: 'Head Teacher', role: 'Member-Secretary', icon: '🎯' },
      { position: 'Teacher Representative', role: 'Elected representative (1 member)', icon: '👨‍🏫' },
      { position: 'Guardian Representatives', role: '2 members (1 male, 1 female)', icon: '👪' },
      { position: 'Retired Government Officer', role: 'Advisory member', icon: '🏛️' },
    ],
    bn: [
      { position: 'সভাপতি', role: 'প্রতিষ্ঠাতা/পৃষ্ঠপোষক প্রতিনিধি', icon: '👑' },
      { position: 'প্রধান শিক্ষক', role: 'সদস্য-সচিব', icon: '🎯' },
      { position: 'শিক্ষক প্রতিনিধি', role: 'নির্বাচিত প্রতিনিধি (১ জন)', icon: '👨‍🏫' },
      { position: 'অভিভাবক প্রতিনিধি', role: '২ জন (১ পুরুষ, ১ মহিলা)', icon: '👪' },
      { position: 'অবসরপ্রাপ্ত সরকারি কর্মকর্তা', role: 'উপদেষ্টা সদস্য', icon: '🏛️' },
    ],
  },
  missionItems: {
    en: [
      { text: 'Ensure modern, value-based, culturally rooted education', icon: '🎯' },
      { text: 'Foster creativity, moral character, and civic values', icon: '✨' },
      { text: 'Promote sports and cultural practice as integral parts of education', icon: '🎨' },
    ],
    bn: [
      { text: 'আধুনিক, মূল্যবোধভিত্তিক, সাংস্কৃতিকভাবে প্রোথিত শিক্ষা নিশ্চিত করা', icon: '🎯' },
      { text: 'সৃজনশীলতা, নৈতিক চরিত্র এবং নাগরিক মূল্যবোধ বিকাশ করা', icon: '✨' },
      { text: 'খেলাধুলা এবং সাংস্কৃতিক চর্চাকে শিক্ষার অবিচ্ছেদ্য অংশ হিসেবে প্রসার করা', icon: '🎨' },
    ],
  },
  visionItems: {
    en: [
      { text: 'Build a progressive society through creative education', icon: '🌟' },
      { text: 'Become a reliable and model local educational institution', icon: '🏆' },
      { text: 'Ensure participation of underserved groups and support meritorious students in need', icon: '🤲' },
    ],
    bn: [
      { text: 'সৃজনশীল শিক্ষার মাধ্যমে একটি প্রগতিশীল সমাজ গঠন করা', icon: '🌟' },
      { text: 'একটি নির্ভরযোগ্য এবং আদর্শ স্থানীয় শিক্ষা প্রতিষ্ঠান হয়ে ওঠা', icon: '🏆' },
      { text: 'সুবিধাবঞ্চিত গোষ্ঠীর অংশগ্রহণ নিশ্চিত করা এবং মেধাবী অভাবী শিক্ষার্থীদের সহায়তা করা', icon: '🤲' },
    ],
  },
};

export default function AboutUsPage() {
  return (
    <main 
      className="min-h-screen bg-gray-50"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <AboutUsClient staticData={staticData} />
    </main>
  );
}
