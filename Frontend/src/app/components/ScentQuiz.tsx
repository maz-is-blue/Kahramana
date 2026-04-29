import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { GalleryButton } from '@/app/components/GalleryButton';

interface QuizQuestion {
  id: string;
  question: string;
  questionAr: string;
  options: Array<{ value: string; label: string; labelAr: string; image?: string }>;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'preference',
    question: 'What type of scents do you usually prefer?',
    questionAr: 'ما نوع الروائح التي تفضلها عادة؟',
    options: [
      { value: 'fresh', label: 'Fresh & Clean', labelAr: 'منعش ونظيف' },
      { value: 'floral', label: 'Floral & Romantic', labelAr: 'زهري ورومانسي' },
      { value: 'woody', label: 'Woody & Earthy', labelAr: 'خشبي وترابي' },
      { value: 'oriental', label: 'Oriental & Spicy', labelAr: 'شرقي وحار' },
    ],
  },
  {
    id: 'occasion',
    question: 'When will you wear this fragrance most?',
    questionAr: 'متى ستستخدم هذا العطر غالباً؟',
    options: [
      { value: 'daily', label: 'Daily Wear', labelAr: 'استخدام يومي' },
      { value: 'office', label: 'Office/Professional', labelAr: 'العمل/المهني' },
      { value: 'evening', label: 'Evening Events', labelAr: 'المناسبات المسائية' },
      { value: 'special', label: 'Special Occasions', labelAr: 'المناسبات الخاصة' },
    ],
  },
  {
    id: 'intensity',
    question: 'How strong do you like your fragrance?',
    questionAr: 'ما مدى قوة العطر التي تفضلها؟',
    options: [
      { value: 'subtle', label: 'Subtle & Light', labelAr: 'خفيف ولطيف' },
      { value: 'moderate', label: 'Moderate', labelAr: 'متوسط' },
      { value: 'bold', label: 'Bold & Intense', labelAr: 'قوي ومكثف' },
    ],
  },
  {
    id: 'personality',
    question: 'Which word best describes your style?',
    questionAr: 'أي كلمة تصف أسلوبك بشكل أفضل؟',
    options: [
      { value: 'classic', label: 'Classic & Timeless', labelAr: 'كلاسيكي وخالد' },
      { value: 'modern', label: 'Modern & Minimalist', labelAr: 'عصري وبسيط' },
      { value: 'bold', label: 'Bold & Daring', labelAr: 'جريء وشجاع' },
      { value: 'romantic', label: 'Romantic & Elegant', labelAr: 'رومانسي وأنيق' },
    ],
  },
];

const recommendations: { [key: string]: string } = {
  'fresh-daily-subtle-modern': 'white-lotus',
  'fresh-office-subtle-modern': 'white-lotus',
  'floral-daily-moderate-romantic': 'rose-mystique',
  'floral-evening-moderate-romantic': 'rose-mystique',
  'woody-office-moderate-classic': 'musk-noir',
  'woody-evening-bold-bold': 'oud-royal',
  'oriental-special-bold-bold': 'oud-royal',
  'oriental-evening-bold-classic': 'saffron-gold',
  'oriental-daily-bold-modern': 'amber-nights',
  default: 'oud-royal',
};

export function ScentQuiz() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState<string>('');

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendation
      const answerKey = Object.values(answers).join('-');
      const recommended = recommendations[answerKey] || recommendations.default;
      setRecommendedProduct(recommended);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendedProduct('');
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];

  return (
    <div className="min-h-screen bg-[#FAF7F1] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-sm tracking-wider text-amber-900">
                    {language === 'en' ? 'SCENT DISCOVERY' : 'اكتشاف العطر'}
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Playfair Display' }}>
                  {language === 'en' ? 'Find Your Signature Scent' : 'اكتشف عطرك المميز'}
                </h1>
                <p className="text-lg text-[#101010]/60 max-w-2xl mx-auto">
                  {language === 'en'
                    ? 'Answer a few questions to discover the perfect fragrance that matches your personality and style.'
                    : 'أجب عن بعض الأسئلة لاكتشاف العطر المثالي الذي يناسب شخصيتك وأسلوبك.'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-[#101010]/60">
                    {language === 'en' ? 'Question' : 'السؤال'} {currentQuestion + 1} {language === 'en' ? 'of' : 'من'}{' '}
                    {quizQuestions.length}
                  </span>
                  <span className="text-sm text-[#101010]/60">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-[#101010]/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-12"
              >
                <h2 className="text-3xl mb-8" style={{ fontFamily: 'Playfair Display' }}>
                  {language === 'en' ? currentQ.question : currentQ.questionAr}
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {currentQ.options.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(currentQ.id, option.value)}
                      className={`p-6 text-left border-2 transition-all ${
                        currentAnswer === option.value
                          ? 'border-[#101010] bg-[#101010] text-[#FAF7F1]'
                          : 'border-[#101010]/20 hover:border-[#101010]/40 bg-white/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">
                          {language === 'en' ? option.label : option.labelAr}
                        </span>
                        {currentAnswer === option.value && <Check className="w-5 h-5" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`flex items-center gap-2 px-6 py-3 border border-[#101010]/20 transition-colors ${
                    currentQuestion === 0
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:border-[#101010] hover:bg-[#101010] hover:text-[#FAF7F1]'
                  }`}
                >
                  <ChevronLeft className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  {language === 'en' ? 'Previous' : 'السابق'}
                </button>

                <button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className={`flex items-center gap-2 px-8 py-3 transition-all ${
                    currentAnswer
                      ? 'bg-[#101010] text-[#FAF7F1] hover:bg-[#101010]/90'
                      : 'bg-[#101010]/20 text-[#101010]/40 cursor-not-allowed'
                  }`}
                >
                  {currentQuestion === quizQuestions.length - 1
                    ? language === 'en'
                      ? 'See Results'
                      : 'عرض النتائج'
                    : language === 'en'
                    ? 'Next'
                    : 'التالي'}
                  <ChevronRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {/* Results */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-sm tracking-wider text-amber-900">
                  {language === 'en' ? 'YOUR PERFECT MATCH' : 'تطابقك المثالي'}
                </span>
              </div>

              <h2 className="text-5xl lg:text-6xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
                {language === 'en' ? 'We Found Your Scent!' : 'وجدنا عطرك!'}
              </h2>

              <p className="text-lg text-[#101010]/60 mb-12 max-w-2xl mx-auto">
                {language === 'en'
                  ? 'Based on your preferences, we recommend this exquisite fragrance that perfectly matches your personality and style.'
                  : 'بناءً على تفضيلاتك، نوصي بهذا العطر الرائع الذي يتناسب تماماً مع شخصيتك وأسلوبك.'}
              </p>

              <div className="flex gap-6 justify-center">
                <GalleryButton onClick={() => navigate(`/product/${recommendedProduct}`)}>
                  {language === 'en' ? 'View Your Match' : 'عرض تطابقك'}
                </GalleryButton>
                <button
                  onClick={handleRestart}
                  className="px-8 py-3 border border-[#101010]/20 hover:border-[#101010] transition-colors"
                >
                  {language === 'en' ? 'Retake Quiz' : 'إعادة الاختبار'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
