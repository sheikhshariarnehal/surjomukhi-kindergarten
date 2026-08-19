import { ClassDetailData } from '@/components/academic/ClassDetailView';

export const classesDataMap: Record<string, ClassDetailData> = {
  'play-group': {
    slug: 'play-group',
    nameEn: 'Play Group',
    nameBn: 'প্লে গ্রুপ',
    tagEn: 'Early Childhood Tier',
    tagBn: 'প্রাক-প্রাথমিক পর্যায়',
    ageEn: '3 – 4 Years',
    ageBn: '৩ – ৪ বছর',
    maxCapacity: '18 Children / Section',
    teacherRatio: '1:9 (Teacher + Care Assistant)',
    durationEn: '8:30 AM – 11:30 AM (Half Day)',
    durationBn: 'সকাল ৮:৩০ – বেলা ১১:৩০',
    heroDescEn: 'A gentle, caring introduction to school life where toddlers learn through sensory play, joyful rhymes, creative curiosity, and early social interaction.',
    heroDescBn: 'খেলাধুলা, মজার ছড়া, ছবি আঁকা এবং আনন্দঘন পরিবেশের মাধ্যমে শিশুদের বিদ্যালয় জীবনের সাথে প্রথম পরিচয় ও সামাজিক বিকাশ।',
    overviewTitleEn: 'Nurturing Joyful First Steps in Learning',
    overviewTitleBn: 'আনন্দময় প্রারম্ভিক বিকাশ ও সামাজিকীকরণ',
    overviewDescEn: 'Our Play Group provides a safe, welcoming environment designed specifically for early toddlers. We prioritize emotional security, oral vocabulary, motor coordination, and sharing habits without any academic pressure.',
    overviewDescBn: 'প্লে গ্রুপে শিশুদের কোনো ধরনের পরীক্ষার চাপ বা কঠোর শৃঙ্খলার মধ্যে না রেখে খেলাধুলা ও স্নেহের পরশে কথা বলা, সহপাঠীদের সাথে মেলামেশা ও প্রাথমিক নিয়মকানুনের শিক্ষা দেওয়া হয়।',
    highlightsEn: [
      'Gentle transition from home to school environment',
      'Sensory and manipulative block exploration',
      'Oral vocabulary building, rhymes & storytelling',
      'Fine and gross motor coordination exercises',
      'Guided social sharing, turn-taking, and empathy',
      'Healthy self-help and hygiene habit formation'
    ],
    highlightsBn: [
      'পারিবারিক পরিবেশ থেকে বিদ্যালয়ে সহজ ও আনন্দময় স্থানান্তর',
      'রং, আকার ও খেলনা সামগ্রীর মাধ্যমে ইন্দ্রিয় উদ্দীপনা',
      'মৌখিক শব্দভাণ্ডার বৃদ্ধি, মিষ্টি ছড়া ও গল্পের আসর',
      'হাতের পেশী ও শারীরিক ভারসাম্য রক্ষার খেলা',
      'সহপাঠীদের সাথে খেলনা ভাগাভাগি ও মিলেমিশে থাকার অভ্যাস',
      'স্বাস্থ্যসম্মত পরিচ্ছন্নতা ও নিজের কাজ নিজে করার প্রাথমিক শিক্ষা'
    ],
    curriculum: [
      {
        titleEn: 'Social & Emotional Growth',
        titleBn: 'সামাজিক ও মানসিক বিকাশ',
        descEn: 'Circle time, sharing toys, expressing emotions, and building first friendships.',
        descBn: 'দলগত খেলা, আবেগ প্রকাশ, সহমর্মিতা এবং সহপাঠীদের সাথে বন্ধুত্ব গড়ে তোলা।',
        iconName: 'social'
      },
      {
        titleEn: 'Oral Language & Rhymes',
        titleBn: 'মৌখিক ভাষা ও ছড়া শিক্ষা',
        descEn: 'Interactive listening, nursery rhymes in Bangla and English, and picture story sessions.',
        descBn: 'বাংলা ও ইংরেজি শ্রুতিমধুর ছড়া, ছবির মাধ্যমে গল্প বলা এবং স্পষ্ট উচ্চারণ।',
        iconName: 'languages'
      },
      {
        titleEn: 'Sensory & Motor Exploration',
        titleBn: 'শারীরিক সমন্বয় ও মোটর দক্ষতা',
        descEn: 'Clay molding, soft ball throwing, obstacle walks, and paper tearing/pasting.',
        descBn: 'ক্লে মডেলিং, নরম বল ধরা, ছোট ছোট শারীরিক খেলা ও হাতের পেশির নিয়ন্ত্রণ।',
        iconName: 'motor'
      },
      {
        titleEn: 'Creative Arts & Music',
        titleBn: 'সৃজনশীল চিত্রাঙ্কন ও সঙ্গীত',
        descEn: 'Finger painting, rhythm clapping, basic percussion, and dramatic role play.',
        descBn: 'হাতের আঙুল দিয়ে রং করা, তালের সাথে তালি বাজানো ও আনন্দঘন অভিনয়।',
        iconName: 'creative'
      },
      {
        titleEn: 'Foundational Numbers & Shapes',
        titleBn: 'সংখ্যা ও আকারের প্রাথমিক ধারণা',
        descEn: 'Visual shape identification, primary color sorting, and counting blocks 1 to 10.',
        descBn: 'মৌলিক রং চেনা, আকার সাজানো এবং ১ থেকে ১০ পর্যন্ত বস্তু গণনা।',
        iconName: 'math'
      },
      {
        titleEn: 'Nature & Surroundings',
        titleBn: 'প্রকৃতি ও পরিবেশ পরিচিতি',
        descEn: 'Observing campus plants, animal sounds, weather changes, and gentle environmental care.',
        descBn: 'ক্যাম্পাসের ফুল-গাছ চেনা, পশুপাখির ডাক অনুকরণ ও প্রকৃতির প্রতি ভালোবাসা।',
        iconName: 'science'
      }
    ],
    schedule: [
      { time: '08:30 – 08:50 AM', activityEn: 'Warm Arrival & Free Interactive Play', activityBn: 'স্নেহময় অভ্যর্থনা ও মুক্ত খেলা' },
      { time: '08:50 – 09:20 AM', activityEn: 'Morning Circle, Welcome Songs & Rhymes', activityBn: 'মর্নিং সার্কেল ও সমবেত ছড়া গান' },
      { time: '09:20 – 09:55 AM', activityEn: 'Sensory & Fine Motor Activity Station', activityBn: 'ইন্দ্রিয়ভিত্তিক ও হাতের কাজের সেশন' },
      { time: '09:55 – 10:20 AM', activityEn: 'Nutritious Snack Break & Hygiene Habit', activityBn: 'টিফিন বিরতি ও হাত ধোয়ার অভ্যাস' },
      { time: '10:20 – 10:55 AM', activityEn: 'Creative Art, Colors & Storytelling', activityBn: 'চিত্রাঙ্কন, রং খেলা ও গল্পের আসর' },
      { time: '10:55 – 11:30 AM', activityEn: 'Outdoor Sandpit/Garden Play & Dismissal', activityBn: 'সুরক্ষিত আউটডোর খেলা ও বিদায়' }
    ],
    syllabusPdfUrl: '/downloads/play-group-syllabus-2025.pdf'
  },

  'nursery': {
    slug: 'nursery',
    nameEn: 'Nursery',
    nameBn: 'নার্সারি',
    tagEn: 'Foundational Early Years',
    tagBn: 'ভিত্তি পর্যায়',
    ageEn: '4 – 5 Years',
    ageBn: '৪ – ৫ বছর',
    maxCapacity: '20 Children / Section',
    teacherRatio: '1:10',
    durationEn: '8:30 AM – 12:00 PM',
    durationBn: 'সকাল ৮:৩০ – দুপুর ১২:০০',
    heroDescEn: 'Building core foundational skills in alphabet recognition, phonics, number concepts, bilingual confidence, and classroom independence.',
    heroDescBn: 'বাংলা ও ইংরেজি বর্ণমালা, শব্দ গঠন, সংখ্যা গণনা ও সৃজনশীল কাজের মাধ্যমে প্রাথমিক শিক্ষার মজবুত ভিত্তি গঠন।',
    overviewTitleEn: 'Structured Pre-Literacy and Numeracy Discovery',
    overviewTitleBn: 'বর্ণমালা ও সংখ্যার মজবুত বুনিয়াদ গঠন',
    overviewDescEn: 'Nursery transitions students into structured learning routines. Children learn pre-writing pencil grip, phonetic sounds, basic numeral values, and self-expression through guided activities.',
    overviewDescBn: 'নার্সারিতে শিশুদের সঠিক নিয়মে পেন্সিল ধরা, বর্ণ চেনা, সুন্দর হস্তাক্ষর ও সংখ্যা ধারণার সূচনা ঘটে শিশুবান্ধব ও প্রেরণাদায়ী আবহে।',
    highlightsEn: [
      'Bangla Swarabarna & Byanjanbarna phonics',
      'English uppercase & lowercase alphabet writing',
      'Numeracy counting 1 to 50 & basic quantity matching',
      'Pencil grip perfection and stroke control',
      'Classroom discipline, active listening, and etiquette',
      'Guided art, craft, and paper folding projects'
    ],
    highlightsBn: [
      'বাংলা স্বরবর্ণ ও ব্যঞ্জনবর্ণের সঠিক উচ্চারণ ও চেনা',
      'ইংরেজি বর্ণমালার ক্যাপিটাল ও স্মল লেটার লিখন',
      '১ থেকে ৫০ পর্যন্ত সংখ্যা গণনা ও বস্তু গণনা',
      'সঠিকভাবে পেন্সিল ধরা ও সরল রেখাচিত্র অনুশীলন',
      'শ্রেণিকক্ষের শৃঙ্খলা ও মনোযোগ ধরে রাখার দক্ষতা',
      'রংতুলি ও কাগজ ভাঁজের মাধ্যমে সৃজনশীল শিল্পকর্ম'
    ],
    curriculum: [
      {
        titleEn: 'Bangla Pre-Literacy',
        titleBn: 'বাংলা বর্ণমালা ও ভাষা',
        descEn: 'Letter recognition, phonetic pronunciation, tracing strokes, and oral storytelling.',
        descBn: 'স্বরবর্ণ ও ব্যঞ্জনবর্ণ পরিচিতি, সঠিক উচ্চারণ এবং সুন্দর করে হাত ঘোরানো।',
        iconName: 'languages'
      },
      {
        titleEn: 'English Phonics & Alphabet',
        titleBn: 'ইংরেজি বর্ণ ও ফনিক্স',
        descEn: 'A to Z letters, sound associations, sight words, and simple conversational phrases.',
        descBn: 'A-Z বর্ণ লিখন, ফনিক্স সাউন্ড এবং প্রাত্যহিক জীবনের সহজ ইংরেজি বাক্য।',
        iconName: 'languages'
      },
      {
        titleEn: 'Foundational Mathematics',
        titleBn: 'প্রাথমিক গণিত ও সংখ্যাজ্ঞান',
        descEn: 'Counting 1-50, before/after numbers, shape identification, and size comparisons.',
        descBn: '১-৫০ পর্যন্ত গণনা, ছোট-বড় তুলনা এবং মৌলিক জ্যামিতিক আকার পরিচিতি।',
        iconName: 'math'
      },
      {
        titleEn: 'General Knowledge & Science',
        titleBn: 'সাধারণ জ্ঞান ও বিজ্ঞান চেতনা',
        descEn: 'Human body parts, animals, seasons, family members, and healthy daily habits.',
        descBn: 'মানবদেহ, চারপাশের পশুপাখি, ঋতু পরিবর্তন এবং পরিচ্ছন্নতা সচেতনতা।',
        iconName: 'science'
      },
      {
        titleEn: 'Visual Arts & Craftwork',
        titleBn: 'চারু ও কারুকলা',
        descEn: 'Coloring within boundaries, craft paper work, and clay modeling.',
        descBn: 'সীমার ভেতরে নিখুঁত রং করা, কাগজ কেটে নকশা ও মাটির খেলনা তৈরি।',
        iconName: 'creative'
      },
      {
        titleEn: 'Physical Movement & Rhymes',
        titleBn: 'শারীরিক কসরত ও ব্যায়াম',
        descEn: 'Coordinated drills, action rhymes, balance beams, and playful teamwork.',
        descBn: 'ছন্দের তালে ব্যায়াম, শারীরিক ভারসাম্য খেলা ও দলগত আনন্দ কার্যক্রম।',
        iconName: 'motor'
      }
    ],
    schedule: [
      { time: '08:30 – 08:45 AM', activityEn: 'Assembly, National Anthem & Daily Routine', activityBn: 'প্রাতঃকালীন সমাবেশ ও জাতীয় সঙ্গীত' },
      { time: '08:45 – 09:30 AM', activityEn: 'Bangla Reading & Handwriting Workshop', activityBn: 'বাংলা পঠন ও হস্তলিপি অনুশীলন' },
      { time: '09:30 – 10:15 AM', activityEn: 'English Phonics & Conversation Session', activityBn: 'ইংরেজি ফনিক্স ও মৌখিক কথোপকথন' },
      { time: '10:15 – 10:40 AM', activityEn: 'Nutritious Tiffin Break & Outdoor Play', activityBn: 'টিফিন বিরতি ও আনন্দময় খেলাধুলা' },
      { time: '10:40 – 11:20 AM', activityEn: 'Mathematics & Number Block Activities', activityBn: 'গণিত ও সংখ্যা ব্লক কার্যক্রম' },
      { time: '11:20 – 12:00 PM', activityEn: 'Drawing, Crafting & Supervised Departure', activityBn: 'চিত্রাঙ্কন, হস্তশিল্প ও নিরাপদ বিদায়' }
    ],
    syllabusPdfUrl: '/downloads/nursery-syllabus-2025.pdf'
  },

  'one': {
    slug: 'one',
    nameEn: 'Class One',
    nameBn: '১ম শ্রেণি',
    tagEn: 'Primary Inception Tier',
    tagBn: 'প্রাথমিক সূচনা পর্যায়',
    ageEn: '5 – 6 Years',
    ageBn: '৫ – ৬ বছর',
    maxCapacity: '24 Students / Section',
    teacherRatio: '1:12',
    durationEn: '8:30 AM – 1:00 PM',
    durationBn: 'সকাল ৮:৩০ – দুপুর ১:০০',
    heroDescEn: 'Formal national primary schooling begins with structured lessons in fluent reading, sentence construction, basic arithmetic, and environmental science.',
    heroDescBn: 'জাতীয় শিক্ষাক্রমের আলোকে বাংলা ও ইংরেজি পঠন, লিখন, সহজ গণিত ও পরিবেশ বিজ্ঞানের সুসংগঠিত সূচনা।',
    overviewTitleEn: 'Fostering Confidence in Formal Primary Education',
    overviewTitleBn: 'প্রাথমিক শিক্ষার আনুষ্ঠানিক সূচনা ও আত্মবিশ্বাস',
    overviewDescEn: 'Class One marks the start of formal primary education. Students cultivate independent reading habits, sentence writing skills, arithmetic operations, and civic morality.',
    overviewDescBn: '১ম শ্রেণিতে শিক্ষার্থীরা সাবলীল বাক্য গঠন, যোগ-বিয়োগের ভিত্তি, বিজ্ঞান জিজ্ঞাসা ও নৈতিক অনুশাসনের মধ্য দিয়ে প্রাতিষ্ঠানিক শিক্ষায় প্রবেশ করে।',
    highlightsEn: [
      'National curriculum textbook syllabus mastery',
      'Fluent reading in Bangla & English with comprehension',
      'Addition, subtraction, and word arithmetic foundations',
      'Environmental science experiments & nature journals',
      'Good manners, civic values, and religious studies',
      'Weekly art, music, physical fitness & sports periods'
    ],
    highlightsBn: [
      'জাতীয় শিক্ষাক্রমের পাঠ্যপুস্তকের পূর্ণাঙ্গ পাঠদান',
      'বাংলা ও ইংরেজি অনুচ্ছেদ সাবলীলভাবে পড়ার ও লেখার দক্ষতা',
      'যোগ, বিয়োগ ও সহজ ডাকের অংকের ধারণা',
      'পরিবেশ বিজ্ঞান ও চারপাশের প্রকৃতি পর্যবেক্ষণ',
      'শিষ্টাচার, দেশপ্রেম ও ধর্মীয় নৈতিক মূল্যবোধ',
      'সাপ্তাহিক চারুকলা, সঙ্গীত ও শরীরচর্চা ক্লাস'
    ],
    curriculum: [
      {
        titleEn: 'Bangla Language & Literature',
        titleBn: 'আমার বাংলা বই ও ব্যাকরণ',
        descEn: 'Story reading, spelling, sentence making, handwriting drills, and simple essays.',
        descBn: 'গল্প ও কবিতা পাঠ, বানান শুদ্ধিকরণ, বাক্য গঠন ও সুন্দর হাতের লেখা।',
        iconName: 'languages'
      },
      {
        titleEn: 'English for Today & Grammar',
        titleBn: 'English for Today ও বেসিক গ্রামার',
        descEn: 'Vocabulary expansion, introductory grammar, simple sentences, and dialogue.',
        descBn: 'শব্দভাণ্ডার বৃদ্ধি, পার্টস অব স্পিচ পরিচিতি এবং দৈনন্দিন স্পোকেন ইংলিশ।',
        iconName: 'languages'
      },
      {
        titleEn: 'Primary Mathematics',
        titleBn: 'প্রাথমিক গণিত',
        descEn: 'Numbers up to 100, 2-digit addition and subtraction, times tables (1 to 5), and basic geometric shapes.',
        descBn: '১-১০০ সংখ্যা, যোগ-বিয়োগ, ১-৫ এর নামতা ও সহজ জ্যামিতিক নকশা।',
        iconName: 'math'
      },
      {
        titleEn: 'Environmental Science',
        titleBn: 'পরিবেশ ও প্রাথমিক বিজ্ঞান',
        descEn: 'Plants, animals, water cycle, seasons, cleanliness, and human senses.',
        descBn: 'উদ্ভিদ ও প্রাণিজগৎ, পানির গুরুত্ব, ঋতু বৈচিত্র্য ও স্বাস্থ্যবিধি।',
        iconName: 'science'
      },
      {
        titleEn: 'Moral & Religious Studies',
        titleBn: 'ধর্ম ও নৈতিক শিক্ষা',
        descEn: 'Moral parables, truthfulness, kindness to elders, and core religious values.',
        descBn: 'নৈতিক অনুশাসন, সত্যবাদিতা, গুরুজনদের শ্রদ্ধা ও ধর্মীয় রীতিনীতি।',
        iconName: 'social'
      },
      {
        titleEn: 'Art, Craft & Physical Fitness',
        titleBn: 'চারু-কারু ও শরীরচর্চা',
        descEn: 'Drawing scenes, flag colors, physical PT drills, and collaborative classroom games.',
        descBn: 'প্রাকৃতিক দৃশ্যের ছবি আঁকা, জাতীয় পতাকা ও নিয়মিত পিটি সমাবেশ।',
        iconName: 'creative'
      }
    ],
    schedule: [
      { time: '08:30 – 08:50 AM', activityEn: 'Morning Assembly, National Anthem & PT', activityBn: 'প্রাতঃকালীন সমাবেশ ও শরীরচর্চা' },
      { time: '08:50 – 09:35 AM', activityEn: 'Period 1: Bangla Reading & Spelling', activityBn: '১ম পিরিয়ড: বাংলা সাহিত্য ও বানান' },
      { time: '09:35 – 10:20 AM', activityEn: 'Period 2: English Grammar & Conversation', activityBn: '২য় পিরিয়ড: ইংরেজি গ্রামার ও রিডিং' },
      { time: '10:20 – 11:05 AM', activityEn: 'Period 3: Primary Mathematics & Numeracy', activityBn: '৩য় পিরিয়ড: প্রাথমিক গণিত ও সমাধান' },
      { time: '11:05 – 11:30 AM', activityEn: 'Tiffin Break & Supervised Playground Time', activityBn: 'টিফিন বিরতি ও খেলাধুলা' },
      { time: '11:30 – 12:15 PM', activityEn: 'Period 4: Environmental Studies & Science', activityBn: '৪র্থ পিরিয়ড: পরিবেশ বিজ্ঞান' },
      { time: '12:15 – 01:00 PM', activityEn: 'Period 5: Art / Moral Studies & Class Wrap-up', activityBn: '৫ম পিরিয়ড: চারুকলা / ধর্ম ও নৈতিক শিক্ষা' }
    ],
    syllabusPdfUrl: '/downloads/class-1-syllabus-2025.pdf'
  },

  'two': {
    slug: 'two',
    nameEn: 'Class Two',
    nameBn: '২য় শ্রেণি',
    tagEn: 'Skill Advancement Tier',
    tagBn: 'দক্ষতা উন্নয়ন পর্যায়',
    ageEn: '6 – 7 Years',
    ageBn: '৬ – ৭ বছর',
    maxCapacity: '24 Students / Section',
    teacherRatio: '1:12',
    durationEn: '8:30 AM – 1:30 PM',
    durationBn: 'সকাল ৮:৩০ – দুপুর ১:৩০',
    heroDescEn: 'Advancing literacy comprehension, multiplication tables, short essay writing, experimental science inquiry, and peer teamwork.',
    heroDescBn: 'বাংলা ও ইংরেজি রিডিং ফ্লুয়েন্সি, নামতা ও গুণ-ভাগ, অনুচ্ছেদ রচনা এবং বিজ্ঞানের সহজ পরীক্ষা-নিরীক্ষা।',
    overviewTitleEn: 'Advancing Literacy, Arithmetic and Scientific Thinking',
    overviewTitleBn: 'জ্ঞান ও বুদ্ধিবৃত্তিক সক্ষমতার সার্বিক বিকাশ',
    overviewDescEn: 'Class Two strengthens analytical skills. Students engage with paragraph construction, times tables up to 10, measurement concepts, and interactive science topics.',
    overviewDescBn: '২য় শ্রেণিতে শিক্ষার্থীরা স্বতঃস্ফূর্তভাবে বই পড়ার অভ্যাস গড়ে তোলে এবং গণিতের জটিল ধাপসমূহ সহজভাবে সমাধান করতে শেখে।',
    highlightsEn: [
      'Multiplication & division introductory concepts',
      'Creative paragraph writing in Bangla & English',
      'Times tables mastery up to 10',
      'Basic units of measurement (length, weight, time, currency)',
      'Science exploration with hands-on classroom specimens',
      'Team quizzes, spelling bees, and recitation'
    ],
    highlightsBn: [
      'গুণ ও ভাগের প্রাথমিক নিয়ম ও বাস্তব সমস্যা সমাধান',
      'বাংলা ও ইংরেজিতে সহজ অনুচ্ছেদ লেখার দক্ষতা',
      '১ থেকে ১০ পর্যন্ত নামতার পূর্ণাঙ্গ আয়ত্তকরণ',
      'পরিমাপ, ওজন, সময় ও বাংলাদেশি মুদ্রার হিসাব',
      'ব্যবহারিক বিজ্ঞানের সহজ ধারণা ও প্রকৃতি পাঠ',
      'দলগত কুইজ, বিতর্ক ও সুন্দর আবৃত্তি চর্চা'
    ],
    curriculum: [
      {
        titleEn: 'Bangla Literature & Creative Writing',
        titleBn: 'বাংলা সাহিত্য ও অনুচ্ছেদ রচনা',
        descEn: 'Reading comprehension, poem recitation, grammar fundamentals, and short narrative essays.',
        descBn: 'গদ্য-পদ্য পাঠ, ব্যাকরণের মৌলিক ধারণা ও সৃজনশীল অনুচ্ছেদ লিখন।',
        iconName: 'languages'
      },
      {
        titleEn: 'English Language Skills',
        titleBn: 'ইংরেজি ভাষা ও গ্রামার',
        descEn: 'Tenses, prepositions, sentence structuring, and conversational roleplay.',
        descBn: 'টেন্স, প্রিপজিশন, বাক্য তৈরি ও পারস্পরিক ইংরেজি কথোপকথন।',
        iconName: 'languages'
      },
      {
        titleEn: 'Intermediate Mathematics',
        titleBn: 'গণিত ও হিসাব সমাধান',
        descEn: 'Addition/subtraction with carrying, times tables 1-10, division, and word problems.',
        descBn: 'হাতে রেখে যোগ-বিয়োগ, গুণ ও ভাগ এবং বাস্তব জীবনের সমস্যার সমাধান।',
        iconName: 'math'
      },
      {
        titleEn: 'General Science & Environment',
        titleBn: 'সাধারণ বিজ্ঞান ও পরিবেশ',
        descEn: 'Living vs. non-living things, air & water pollution, soil, and simple machines.',
        descBn: 'জীব ও জড়, পরিবেশ দূষণ প্রতিরোধ, মাটি ও সহজ যন্ত্রপাতির ব্যবহার।',
        iconName: 'science'
      },
      {
        titleEn: 'Social & Cultural Studies',
        titleBn: 'সমাজ ও সংস্কৃতি পরিচিতি',
        descEn: 'Our community helpers, national symbols, historical dates, and traffic safety.',
        descBn: 'সমাজের সেবকগণ, জাতীয় প্রতীকসমূহ, ঐতিহাসিক দিবস ও ট্রাফিক সচেতনতা।',
        iconName: 'social'
      },
      {
        titleEn: 'Computer & Visual Arts',
        titleBn: 'কম্পিউটার ও চারুকলা',
        descEn: 'Computer parts identification, drawing with geometric shapes, and craftwork.',
        descBn: 'কম্পিউটারের বিভিন্ন যন্ত্রাংশ পরিচিতি ও স্কেচিং কৌশল।',
        iconName: 'tech'
      }
    ],
    schedule: [
      { time: '08:30 – 08:50 AM', activityEn: 'Assembly, Pledge & Physical Exercises', activityBn: 'সমাবেশ, শপথ ও পিটি' },
      { time: '08:50 – 09:35 AM', activityEn: 'Period 1: Bangla Reading & Vocabulary', activityBn: '১ম পিরিয়ড: বাংলা পাঠ ও ব্যাকরণ' },
      { time: '09:35 – 10:20 AM', activityEn: 'Period 2: English Grammar & Writing', activityBn: '২য় পিরিয়ড: ইংরেজি গ্রামার ও রাইটিং' },
      { time: '10:20 – 11:05 AM', activityEn: 'Period 3: Mathematics & Problem Solving', activityBn: '৩য় পিরিয়ড: গণিত ও সমস্যা সমাধান' },
      { time: '11:05 – 11:35 AM', activityEn: 'Tiffin Break & Healthy Refreshment', activityBn: 'টিফিন বিরতি ও সুস্থ বিনোদন' },
      { time: '11:35 – 12:20 PM', activityEn: 'Period 4: General Science & Experiments', activityBn: '৪র্থ পিরিয়ড: বিজ্ঞান ও পরিবেশ' },
      { time: '12:20 – 01:00 PM', activityEn: 'Period 5: Bangladesh Studies & Moral Education', activityBn: '৫ম পিরিয়ড: সমাজ ও নৈতিক শিক্ষা' },
      { time: '01:00 – 01:30 PM', activityEn: 'Period 6: Computer / Art & Supervised Dismissal', activityBn: '৬ষ্ঠ পিরিয়ড: কম্পিউটার / চারুকলা ও ছুটি' }
    ],
    syllabusPdfUrl: '/downloads/class-2-syllabus-2025.pdf'
  },

  'three': {
    slug: 'three',
    nameEn: 'Class Three',
    nameBn: '৩য় শ্রেণি',
    tagEn: 'Intermediate Primary Tier',
    tagBn: 'মাধ্যমিক পূর্ব পর্যায়',
    ageEn: '7 – 8 Years',
    ageBn: '৭ – ৮ বছর',
    maxCapacity: '25 Students / Section',
    teacherRatio: '1:13',
    durationEn: '8:30 AM – 2:00 PM',
    durationBn: 'সকাল ৮:৩০ – দুপুর ২:০০',
    heroDescEn: 'Developing critical analytical thinking, advanced grammar, fractions, Bangladesh studies, scientific inquiry, and structured homework responsibility.',
    heroDescBn: 'বিশ্লেষণধর্মী চিন্তাভাবনা, ইংরেজি গ্রামার, ভগ্নাংশ ও জ্যামিতি, বাংলাদেশ পরিচিতি এবং দায়িত্বশীল অধ্যবসায়।',
    overviewTitleEn: 'Cultivating Analytical Inquiry and Subject Mastery',
    overviewTitleBn: 'বিষয়ভিত্তিক গভীর জ্ঞান ও বিশ্লেষণাত্মক মেধার বিকাশ',
    overviewDescEn: 'Class Three expands academic depth across 6 national curriculum subjects. Students engage in project-based tasks, fractions, scientific method, and historical knowledge.',
    overviewDescBn: '৩য় শ্রেণিতে শিক্ষার্থীরা পূর্ণাঙ্গ জাতীয় শিক্ষাক্রম অনুসারে প্রতিটি বিষয়ে গভীর মনোনিবেশ করে এবং বিজ্ঞান ও সমাজচিন্তায় পারদর্শী হয়।',
    highlightsEn: [
      'Comprehensive 6-subject curriculum mastery',
      'Introduction to fractions, geometry, and word problem logic',
      'English essay writing, dialogues, and reading comprehension',
      'Bangladesh and Global Studies with map skills',
      'Elementary Science experiments in the campus lab',
      'Introduction to digital literacy and ICT basics'
    ],
    highlightsBn: [
      'জাতীয় শিক্ষাক্রমের পূর্ণাঙ্গ ৬টি বিষয়ের সমন্বিত পাঠদান',
      'ভগ্নাংশ, জ্যামিতিক কোণ ও জটিল গাণিতিক যুক্তি সমাধান',
      'ইংরেজিতে অনুচ্ছেদ রচনা, কথোপকথন ও প্যাসেজ বোধগম্যতা',
      'বাংলাদেশ ও বিশ্বপরিচয় এবং মানচিত্রের ব্যবহার',
      'প্রাথমিক বিজ্ঞানের ব্যবহারিক ক্লাস ও ল্যাব পরিচিতি',
      'কম্পিউটার ও ডিজিটাল সাক্ষরতার প্রাথমিক পাঠ'
    ],
    curriculum: [
      {
        titleEn: 'Bangla Literature & Grammar',
        titleBn: 'বাংলা সাহিত্য ও ব্যাকরণ',
        descEn: 'Textbook prose/poetry, sandhi, opposites, homonyms, and structured essay writing.',
        descBn: 'গদ্য-পদ্য বিশ্লেষণ, বিপরীত শব্দ, সন্ধি ও নিয়মমাফিক রচনা লিখন।',
        iconName: 'languages'
      },
      {
        titleEn: 'English Language & Composition',
        titleBn: 'ইংরেজি ভাষা ও কম্পোজিশন',
        descEn: 'Parts of speech, sentence transformation, reading comprehension, and guided letters.',
        descBn: 'পার্টস অব স্পিচ, প্যাসেজ রিডিং, বাক্য রূপান্তর ও দরখাস্ত লিখন।',
        iconName: 'languages'
      },
      {
        titleEn: 'Mathematics & Geometry',
        titleBn: 'গণিত ও জ্যামিতি',
        descEn: 'Fractions, unit conversions, geometry angles, triangles, and multi-step word problems.',
        descBn: 'সাধারণ ভগ্নাংশ, পরিমাপের রূপান্তর, কোণ-ত্রিভুজ ও প্রশ্নের অংক।',
        iconName: 'math'
      },
      {
        titleEn: 'Elementary Science',
        titleBn: 'প্রাথমিক বিজ্ঞান',
        descEn: 'Energy sources, healthy nutrition, hygiene, matter states, and ecosystem observation.',
        descBn: 'শক্তির উৎস, সুষম খাদ্য, পদার্থের অবস্থা ও পরিবেশগত ভারসাম্য।',
        iconName: 'science'
      },
      {
        titleEn: 'Bangladesh & Global Studies',
        titleBn: 'বাংলাদেশ ও বিশ্বপরিচয়',
        descEn: 'Geography of Bangladesh, cultural heritage, liberation war basics, and citizen duties.',
        descBn: 'বাংলাদেশের ভৌগোলিক পরিচয়, মুক্তিযুদ্ধ, ঐতিহ্য ও সুনাগরিকের দায়িত্ব।',
        iconName: 'social'
      },
      {
        titleEn: 'Religion & Moral Values',
        titleBn: 'ধর্ম ও নৈতিক শিক্ষা',
        descEn: 'Spiritual texts, ethical conduct, tolerance, and respect for all communities.',
        descBn: 'ধর্মীয় বিধিবিধান, পরমতসহিষ্ণুতা, সত্যের পথে চলা ও মানবিক গুণাবলী।',
        iconName: 'social'
      }
    ],
    schedule: [
      { time: '08:30 – 08:50 AM', activityEn: 'Assembly, National Anthem & Daily Briefing', activityBn: 'জাতীয় পতাকা উত্তোলন ও সমাবেশ' },
      { time: '08:50 – 09:35 AM', activityEn: 'Period 1: Mathematics & Logical Arithmetic', activityBn: '১ম পিরিয়ড: গণিত ও সমস্যা সমাধান' },
      { time: '09:35 – 10:20 AM', activityEn: 'Period 2: English Language & Comprehension', activityBn: '২য় পিরিয়ড: ইংরেজি ভাষা ও ব্যাকরণ' },
      { time: '10:20 – 11:05 AM', activityEn: 'Period 3: Bangla Prose, Poetry & Writing', activityBn: '৩য় পিরিয়ড: বাংলা সাহিত্য ও ব্যাকরণ' },
      { time: '11:05 – 11:35 AM', activityEn: 'Tiffin Break & Campus Playground Time', activityBn: 'টিফিন বিরতি ও মুক্ত আলোচনা' },
      { time: '11:35 – 12:20 PM', activityEn: 'Period 4: Elementary Science & Lab Inquiry', activityBn: '৪র্থ পিরিয়ড: প্রাথমিক বিজ্ঞান' },
      { time: '12:20 – 01:05 PM', activityEn: 'Period 5: Bangladesh & Global Studies', activityBn: '৫ম পিরিয়ড: বাংলাদেশ ও বিশ্বপরিচয়' },
      { time: '01:05 – 02:00 PM', activityEn: 'Period 6: Religion / ICT / Weekly Co-Curricular', activityBn: '৬ষ্ঠ পিরিয়ড: ধর্ম / আইসিটি / সহশিক্ষা' }
    ],
    syllabusPdfUrl: '/downloads/class-3-syllabus-2025.pdf'
  },

  'four': {
    slug: 'four',
    nameEn: 'Class Four',
    nameBn: '৪র্থ শ্রেণি',
    tagEn: 'Upper Primary Mastery Tier',
    tagBn: 'উচ্চ প্রাথমিক পর্যায়',
    ageEn: '8 – 9 Years',
    ageBn: '৮ – ৯ বছর',
    maxCapacity: '25 Students / Section',
    teacherRatio: '1:13',
    durationEn: '8:30 AM – 2:00 PM',
    durationBn: 'সকাল ৮:৩০ – দুপুর ২:০০',
    heroDescEn: 'Preparing for advanced primary scholarship standards with deep mathematical reasoning, creative essay writing, scientific inquiry, and leadership habits.',
    heroDescBn: 'উন্নত গণিত সমাধান, ইংরেজি প্রবন্ধ লিখন, বিজ্ঞান ল্যাব অনুসন্ধান এবং নেতৃত্বের গুণাবলীর বিকাশ।',
    overviewTitleEn: 'Striving for Academic Rigor and Independent Inquiry',
    overviewTitleBn: 'মেধা ও সৃজনশীলতার পূর্ণাঙ্গ স্ফুরণ',
    overviewDescEn: 'Class Four students master advanced syllabus competencies in preparation for graduating primary school. Emphasis is placed on structured homework, research projects, and exam techniques.',
    overviewDescBn: '৪র্থ শ্রেণিতে শিক্ষার্থীরা জটিল গাণিতিক ধারণা, ইংরেজি ভাষা দক্ষতা ও বিজ্ঞানভিত্তিক অনুসন্ধানে সর্বোচ্চ আত্মবিশ্বাস অর্জন করে।',
    highlightsEn: [
      'Advanced arithmetic: GCD/LCM, decimals, and geometry proofs',
      'English structured essay, letter, and formal dialogue writing',
      'Bangla grammar, essay composition, and reading fluency',
      'Science experimental investigations and nature documentation',
      'Civic awareness, human rights, and environment protection',
      'Active participation in debate, recitation, and sports tournaments'
    ],
    highlightsBn: [
      'লসাগু, গসাগু, দশমিক ভগ্নাংশ, ক্ষেত্রফল ও জ্যামিতিক চিত্রাঙ্কন',
      'ইংরেজিতে ফরমাল লেটার, অনুচ্ছেদ ও তাৎক্ষণিক স্পোকেন চর্চা',
      'বাংলা ব্যাকরণ, ভাবসম্প্রসারণ ও সারমর্ম লিখন',
      'ব্যবহারিক বিজ্ঞানের গভীর নিরীক্ষা ও প্রজেক্ট তৈরি',
      'মানবাধিকার, পরিবেশ সংরক্ষণ ও সামাজিক দায়িত্ববোধ',
      'বিতর্ক, উপস্থিত বক্তৃতা, দেয়ালিকা ও ক্রীড়া প্রতিযোগিতায় অংশগ্রহণ'
    ],
    curriculum: [
      {
        titleEn: 'Bangla Literature & Grammar Masterclass',
        titleBn: 'বাংলা সাহিত্য, ব্যাকরণ ও রচনা',
        descEn: 'Extensive comprehension, proverbs, idioms, formal applications, and creative composition.',
        descBn: 'বাগধারা, ভাবসম্প্রসারণ, আবেদনপত্র ও বিষয়ভিত্তিক বিস্তারিত রচনা।',
        iconName: 'languages'
      },
      {
        titleEn: 'Advanced English Skills',
        titleBn: 'উন্নত ইংরেজি ভাষা ও ব্যাকরণ',
        descEn: 'Tense mastery, active/passive introduction, story writing from prompts, and unseen comprehension.',
        descBn: 'টেন্সের সঠিক ব্যবহার, আনসিন প্যাসেজ সমাধান ও গল্প লিখন।',
        iconName: 'languages'
      },
      {
        titleEn: 'Comprehensive Mathematics',
        titleBn: 'উচ্চতর প্রাথমিক গণিত',
        descEn: 'LCM, HCF, decimals, unitary method, geometric properties of quadrilaterals, and perimeter calculations.',
        descBn: 'ঐকিক নিয়ম, লসাগু-গসাগু, ক্ষেত্রফল, চতুর্ভুজ ও বৃত্তের মৌলিক ধারণা।',
        iconName: 'math'
      },
      {
        titleEn: 'Scientific Inquiry & Lab Practice',
        titleBn: 'প্রাথমিক বিজ্ঞান ও ব্যবহারিক',
        descEn: 'Ecosystems, solar system, diseases & prevention, conservation of resources, and laboratory observation.',
        descBn: 'সৌরজগৎ, রোগ প্রতিরোধ ব্যবস্থা, প্রাকৃতিক সম্পদ সংরক্ষণ ও ল্যাব পরীক্ষা।',
        iconName: 'science'
      },
      {
        titleEn: 'Bangladesh & Global Studies',
        titleBn: 'বাংলাদেশ ও বিশ্বপরিচয়',
        descEn: 'Ancient history of Bengal, administrative structure, continents, and international organizations.',
        descBn: 'প্রাচীন বাংলার ইতিহাস, প্রশাসনিক কাঠামো, মহাদেশ পরিচিতি ও জাতিসংঘ।',
        iconName: 'social'
      },
      {
        titleEn: 'ICT Literacy & Creative Arts',
        titleBn: 'তথ্য ও যোগাযোগ প্রযুক্তি এবং চারুকলা',
        descEn: 'Computer software basics, typing, landscape sketching, and handicraft models.',
        descBn: 'কম্পিউটার টাইপিং, অপারেটিং সিস্টেম ও চারুকলার সূক্ষ্ম কলাকৌশল।',
        iconName: 'tech'
      }
    ],
    schedule: [
      { time: '08:30 – 08:50 AM', activityEn: 'Assembly, Drill & Student Thought for the Day', activityBn: 'প্রাতঃকালীন সমাবেশ ও নীতিবাক্য' },
      { time: '08:50 – 09:35 AM', activityEn: 'Period 1: Mathematics & Problem Solving', activityBn: '১ম পিরিয়ড: গণিত ও সমস্যা সমাধান' },
      { time: '09:35 – 10:20 AM', activityEn: 'Period 2: English Composition & Grammar', activityBn: '২য় পিরিয়ড: ইংরেজি ব্যাকরণ ও কম্পোজিশন' },
      { time: '10:20 – 11:05 AM', activityEn: 'Period 3: Bangla Prose, Poetry & Writing', activityBn: '৩য় পিরিয়ড: বাংলা সাহিত্য ও ব্যাকরণ' },
      { time: '11:05 – 11:35 AM', activityEn: 'Tiffin Break & Healthy Refreshment', activityBn: 'টিফিন বিরতি ও সুস্থ বিনোদন' },
      { time: '11:35 – 12:20 PM', activityEn: 'Period 4: Elementary Science & Lab Work', activityBn: '৪র্থ পিরিয়ড: প্রাথমিক বিজ্ঞান ও ল্যাব' },
      { time: '12:20 – 01:05 PM', activityEn: 'Period 5: Bangladesh & Global Studies', activityBn: '৫ম পিরিয়ড: বাংলাদেশ ও বিশ্বপরিচয়' },
      { time: '01:05 – 02:00 PM', activityEn: 'Period 6: Religion / ICT / Co-Curricular Clubs', activityBn: '৬ষ্ঠ পিরিয়ড: ধর্ম / আইসিটি / ক্লাব কার্যক্রম' }
    ],
    syllabusPdfUrl: '/downloads/class-4-syllabus-2025.pdf'
  },

  'five': {
    slug: 'five',
    nameEn: 'Class Five',
    nameBn: '৫ম শ্রেণি',
    tagEn: 'Graduating Senior Tier',
    tagBn: 'সমাপনী পর্যায়',
    ageEn: '9 – 10 Years',
    ageBn: '৯ – ১০ বছর',
    maxCapacity: '25 Students / Section',
    teacherRatio: '1:13',
    durationEn: '8:30 AM – 2:30 PM',
    durationBn: 'সকাল ৮:৩০ – দুপুর ২:৩০',
    heroDescEn: 'The graduating culmination of kindergarten schooling. Comprehensive syllabus mastery, merit scholarship exam mentoring, leadership readiness, and secondary school transition.',
    heroDescBn: 'প্রাথমিক শিক্ষা সমাপনী, মেধা বৃত্তি পরীক্ষার বিশেষ মেন্টরিং, উচ্চ বিদ্যালয়ে উত্তরণের পূর্ণ প্রস্তুতি ও নেতৃত্বের স্ফুরণ।',
    overviewTitleEn: 'Excellence, Leadership, and Secondary Transition Readiness',
    overviewTitleBn: 'মেধাবৃত্তি প্রস্তুতি, নেতৃত্ব ও উজ্জ্বল ভবিষ্যতের সূচনা',
    overviewDescEn: 'Class Five represents the pinnacle of our academic programs. We provide rigorous preparation for primary graduation and merit scholarships while shaping articulate, morally upright young leaders.',
    overviewDescBn: '৫ম শ্রেণিতে শিক্ষার্থীরা সম্পূর্ণ পাঠ্যক্রম নিখুঁতভাবে সমাপ্ত করে। বিশেষ মক টেস্ট, গাইডেন্স ও মেন্টরিংয়ের মাধ্যমে তাদের মেধার সর্বোত্তম বিকাশ নিশ্চিত করা হয়।',
    highlightsEn: [
      'Complete primary completion syllabus mastery',
      'Special merit scholarship mentoring and regular mock tests',
      'Advanced mathematical reasoning, unitary method & algebra basics',
      'Fluent English comprehension, creative essay & formal writing',
      'Scientific project presentations & lab research',
      'Student prefect leadership, mentoring younger peers, and public speaking'
    ],
    highlightsBn: [
      'প্রাথমিক সমাপনী শিক্ষাক্রমের শতভাগ নির্ভুল প্রস্তুতি',
      'সরকারি ও সাধারণ বৃত্তি পরীক্ষার বিশেষ মডেল টেস্ট ও নিবিড় মেন্টরিং',
      'ঐকিক নিয়ম, শতকরা, লাভ-ক্ষতি, জ্যামিতি ও ক্ষেত্রফল হিসাব',
      'ইংরেজিতে স্বতঃস্ফূর্ত ভাব প্রকাশ, চিঠি ও কম্পোজিশন লিখন',
      'বিজ্ঞান প্রজেক্ট প্রদর্শনী ও ল্যাব ভিত্তিক পরীক্ষণ',
      'ক্যাম্পাস প্রিফেক্টশিপ, জুনিয়রদের মেন্টরিং ও বিতর্ক উপস্থাপনা'
    ],
    curriculum: [
      {
        titleEn: 'Bangla Masterclass & Creative Writing',
        titleBn: 'বাংলা ভাষা, সাহিত্য ও ভাবসম্প্রসারণ',
        descEn: 'National curriculum literature, comprehensive grammar, formal essays, letters, and summary writing.',
        descBn: 'পূর্ণাঙ্গ সাহিত্য পাঠ, সমাস, সন্ধি, সারমর্ম, প্রতিবেদন ও ভাবসম্প্রসারণ।',
        iconName: 'languages'
      },
      {
        titleEn: 'English Advanced Proficiency',
        titleBn: 'ইংরেজি ব্যাকরণ ও অ্যাডভান্সড রাইটিং',
        descEn: 'Unseen comprehension, question-answering, letter/email writing, and fluent conversational presentation.',
        descBn: 'প্যাসেজ সমাধান, ফর্মাল ও ইনফর্মাল লেটার এবং সাবলীল উপস্থাপনা।',
        iconName: 'languages'
      },
      {
        titleEn: 'Primary Mathematics Mastery',
        titleBn: 'পূর্ণাঙ্গ প্রাথমিক গণিত ও সমাধান',
        descEn: 'Four operations, fractions, percentages, profit-loss, time calculations, circles, and area measurement.',
        descBn: 'চার প্রক্রিয়া, শতকরা, লাভ-ক্ষতি, গড়, সময় এবং ক্ষেত্রফল ও বৃত্তের জ্যামিতি।',
        iconName: 'math'
      },
      {
        titleEn: 'Elementary Science Laboratory',
        titleBn: 'প্রাথমিক বিজ্ঞান ও ব্যবহারিক পরীক্ষণ',
        descEn: 'Matter and energy, genetics & reproduction in nature, climate change, and ICT tools in science.',
        descBn: 'পদার্থ ও শক্তি, জলবায়ু পরিবর্তন, মহাবিশ্ব ও বৈজ্ঞানিক তথ্য বিশ্লেষণ।',
        iconName: 'science'
      },
      {
        titleEn: 'Bangladesh & Global Studies',
        titleBn: 'বাংলাদেশ ও বিশ্বপরিচয় (পূর্ণাঙ্গ)',
        descEn: '1971 Liberation War history, democratic values, natural disasters management, and regional geography.',
        descBn: '১৯৭১-এর মুক্তিযুদ্ধের ইতিহাস, গণতান্ত্রিক মূল্যবোধ ও দুর্যোগ ব্যবস্থাপনা।',
        iconName: 'social'
      },
      {
        titleEn: 'Religion, Ethics & Leadership',
        titleBn: 'ধর্ম, নৈতিক শিক্ষা ও নেতৃত্ব',
        descEn: 'Religious scripture values, community responsibility, ethical dilemmas, and civic integrity.',
        descBn: 'ধর্মীয় অনুশাসন, মানবিক মূল্যবোধ, সততা ও ভবিষ্যৎ নেতৃত্ব প্রস্তুতি।',
        iconName: 'social'
      }
    ],
    schedule: [
      { time: '08:30 – 08:50 AM', activityEn: 'Morning Assembly, National Anthem & Daily Briefing', activityBn: 'প্রাতঃকালীন সমাবেশ ও জাতীয় সঙ্গীত' },
      { time: '08:50 – 09:35 AM', activityEn: 'Period 1: Mathematics & Scholarship Problem Solving', activityBn: '১ম পিরিয়ড: গণিত ও বৃত্তি প্রস্তুতি' },
      { time: '09:35 – 10:20 AM', activityEn: 'Period 2: English Language & Advanced Composition', activityBn: '২য় পিরিয়ড: ইংরেজি ব্যাকরণ ও কম্পোজিশন' },
      { time: '10:20 – 11:05 AM', activityEn: 'Period 3: Bangla Prose, Poetry & Creative Essays', activityBn: '৩য় পিরিয়ড: বাংলা সাহিত্য ও ব্যাকরণ' },
      { time: '11:05 – 11:35 AM', activityEn: 'Tiffin Break & Healthy Refreshment', activityBn: 'টিফিন বিরতি ও বিনোদন' },
      { time: '11:35 – 12:20 PM', activityEn: 'Period 4: Elementary Science & Lab Inquiry', activityBn: '৪র্থ পিরিয়ড: প্রাথমিক বিজ্ঞান ও ল্যাব' },
      { time: '12:20 – 01:05 PM', activityEn: 'Period 5: Bangladesh & Global Studies', activityBn: '৫ম পিরিয়ড: বাংলাদেশ ও বিশ্বপরিচয়' },
      { time: '01:05 – 01:50 PM', activityEn: 'Period 6: Religion & Moral Education', activityBn: '৬ষ্ঠ পিরিয়ড: ধর্ম ও নৈতিক শিক্ষা' },
      { time: '01:50 – 02:30 PM', activityEn: 'Period 7: Scholarship Mock Drill / Co-Curricular & Dismissal', activityBn: '৭ম পিরিয়ড: বিশেষ মেন্টরিং / সহশিক্ষা ও ছুটি' }
    ],
    syllabusPdfUrl: '/downloads/class-5-syllabus-2025.pdf'
  }
};
