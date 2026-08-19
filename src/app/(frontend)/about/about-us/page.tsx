import AboutUsClient from './AboutUsClient';

const staticData = {
  contactInfo: {
    en: [
      { label: 'Address', value: 'Salauddin Complex, Aona Bazar, Nawabganj, Dhaka-1320', icon: 'map-pin' },
      { label: 'Phone', value: '01819198965 / 01711528045', icon: 'phone' },
      { label: 'Email', value: 'info.surjamukhikindergarten@gmail.com', icon: 'mail' },
      { label: 'Website', value: 'www.surjamukhikindergarten.com', icon: 'globe' },
    ],
    bn: [
      { label: 'ঠিকানা', value: 'সালাউদ্দিন কমপ্লেক্স, আওনা বাজার, নবাবগঞ্জ, ঢাকা-১৩২০', icon: 'map-pin' },
      { label: 'ফোন', value: '০১৮১৯১৯৮৯৬৫ / ০১৭১১৫২৮০৪৫', icon: 'phone' },
      { label: 'ইমেইল', value: 'info.surjamukhikindergarten@gmail.com', icon: 'mail' },
      { label: 'ওয়েবসাইট', value: 'www.surjamukhikindergarten.com', icon: 'globe' },
    ],
  },
  schoolIdeals: {
    en: [
      { title: 'Education is the Backbone of the Nation', description: 'Expanding quality education as the foundational bedrock of character and nation building.', icon: 'graduation-cap' },
      { title: 'Peace is the Supreme Virtue', description: 'Nurturing peaceful, empathetic, and service-minded young citizens through moral learning.', icon: 'heart' },
      { title: 'Spirit of Unity & Progress', description: 'Inspiring students to collaborate and advance toward an enlightened, progressive society.', icon: 'users' },
    ],
    bn: [
      { title: 'শিক্ষাই জাতির মেরুদণ্ড', description: 'জাতি গঠনের ভিত্তি হিসেবে মানসম্পন্ন শিক্ষা সম্প্রসারণ ও মানবিক মূল্যবোধ গঠন।', icon: 'graduation-cap' },
      { title: 'শান্তিই পরম ধর্ম', description: 'শিক্ষার মাধ্যমে শান্তিপ্রিয়, পরোপকারী ও সেবাপরায়ণ নাগরিক গড়ে তোলা।', icon: 'heart' },
      { title: 'ঐক্য ও অগ্রগতির চেতনা', description: 'উন্নত সমাজের দিকে অগ্রসর হওয়ার জন্য শিক্ষার্থীদের নৈতিক ঐক্য ও সৃজনশীলতায় সম্পৃক্ত করা।', icon: 'users' },
    ],
  },
  facilities: {
    en: [
      { title: 'Spacious Playground', description: 'Approximately 100 yards × 60 yards open field for athletic events, morning assemblies, and recreation.', icon: 'activity' },
      { title: 'Rich Library', description: 'Curated children’s books, reference resources, and reading programs promoting early literacy.', icon: 'book-open' },
      { title: 'Safe & Secure Campus', description: 'Healthy, enclosed learning environment with active safety supervision and sanitization.', icon: 'shield-check' },
      { title: 'Modern Classrooms', description: 'Bright, child-friendly classrooms equipped with contemporary learning and visual aids.', icon: 'layout' },
      { title: 'Administrative Office', description: 'Well-organized administration handling admissions, records, and parent consultations.', icon: 'briefcase' },
      { title: 'Student Safety Committee', description: 'Dedicated oversight committee ensuring a respectful, harassment-free environment for all children.', icon: 'users' },
    ],
    bn: [
      { title: 'প্রশস্ত খেলার মাঠ', description: 'প্রায় ১০০ গজ × ৬০ গজ বিস্তৃত খেলার মাঠ যা ক্রীড়া ও শারীরিক বিকাশে সহায়ক।', icon: 'activity' },
      { title: 'সমৃদ্ধ পাঠাগার', description: 'শিক্ষার্থীদের জন্য বয়সোপযোগী বই ও পড়ার অনুকূল পরিবেশ।', icon: 'book-open' },
      { title: 'নিরাপদ পরিবেশ', description: 'শিশুদের জন্য নিরাপদ, স্বাস্থ্যকর ও সুরক্ষিত প্রাতিষ্ঠানিক পরিবেশ।', icon: 'shield-check' },
      { title: 'আধুনিক শ্রেণীকক্ষ', description: 'আধুনিক শিক্ষা উপকরণ ও শিশুবান্ধব পরিবেশে সজ্জিত শ্রেণীকক্ষ।', icon: 'layout' },
      { title: 'প্রশাসনিক কার্যালয়', description: 'সুসংগঠিত প্রশাসনিক অফিস যা অভিভাবক ও শিক্ষার্থীদের সেবা নিশ্চিত করে।', icon: 'briefcase' },
      { title: 'নিরাপত্তা কমিটি', description: 'শিক্ষার্থীদের সার্বিক নিরাপত্তা ও শিশুবান্ধব পরিবেশ রক্ষায় নিবেদিত কমিটি।', icon: 'users' },
    ],
  },
  governance: {
    en: [
      { position: 'President', role: 'Representative from Founders & Patrons' },
      { position: 'Head Teacher', role: 'Member-Secretary & Academic Head' },
      { position: 'Teacher Representative', role: 'Elected Faculty Representative' },
      { position: 'Guardian Representatives', role: '2 Elected Guardian Members (1 Male, 1 Female)' },
      { position: 'Advisory Member', role: 'Distinguished Retired Educationist / Government Officer' },
    ],
    bn: [
      { position: 'সভাপতি', role: 'প্রতিষ্ঠাতা ও পৃষ্ঠপোষক প্রতিনিধি' },
      { position: 'প্রধান শিক্ষক', role: 'সদস্য-সচিব ও একাডেমিক প্রধান' },
      { position: 'শিক্ষক প্রতিনিধি', role: 'নির্বাচিত শিক্ষক প্রতিনিধি' },
      { position: 'অভিভাবক প্রতিনিধি', role: '২ জন নির্বাচিত প্রতিনিধি (১ পুরুষ, ১ মহিলা)' },
      { position: 'উপদেষ্টা সদস্য', role: 'বিশিষ্ট অবসরপ্রাপ্ত শিক্ষাবিদ / সরকারি কর্মকর্তা' },
    ],
  },
  missionItems: {
    en: [
      'Deliver modern, value-based, and culturally rooted primary education.',
      'Foster creativity, strong moral character, and responsible civic values in every child.',
      'Integrate physical education, cultural arts, and academic excellence seamlessly.',
    ],
    bn: [
      'আধুনিক, মূল্যবোধভিত্তিক ও সাংস্কৃতিকভাবে প্রোথিত প্রাথমিক শিক্ষা নিশ্চিত করা।',
      'প্রতিটি শিশুর মাঝে সৃজনশীলতা, নৈতিক চরিত্র ও নাগরিক মূল্যবোধ বিকাশ করা।',
      'খেলাধুলা, সাংস্কৃতিক চর্চা এবং একাডেমিক উৎকর্ষকে শিক্ষার অবিচ্ছেদ্য অংশ করা।',
    ],
  },
  visionItems: {
    en: [
      'Build an enlightened and progressive society through creative, accessible primary education.',
      'Establish Surjomukhi Kindergarten as a benchmark educational institution in Nawabganj.',
      'Support underprivileged meritorious students to ensure inclusive educational opportunity for all.',
    ],
    bn: [
      'সৃজনশীল ও সহজলভ্য শিক্ষার মাধ্যমে একটি প্রগতিশীল ও আলোকিত সমাজ গঠন করা।',
      'নবাবগঞ্জ অঞ্চলে সূর্যমুখী কিন্ডারগার্টেনকে একটি আদর্শ মডেল শিক্ষা প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত করা।',
      'মেধাবী সুবিধাবঞ্চিত শিক্ষার্থীদের সহায়তা দিয়ে সবার জন্য অন্তর্ভুক্তিমূলক শিক্ষা নিশ্চিত করা।',
    ],
  },
};

export default function AboutUsPage() {
  return (
    <main 
      className="min-h-screen bg-slate-50/50"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <AboutUsClient staticData={staticData} />
    </main>
  );
}
