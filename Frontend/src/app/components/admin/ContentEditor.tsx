import { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Search, Globe, FileText } from 'lucide-react';

export function ContentEditor() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('home');
  const [isSaving, setIsSaving] = useState(false);

  // Content structure matching your LanguageContext
  const [content, setContent] = useState({
    home: {
      'home.hero.title': { en: 'Fragrance… An Unforgettable Canvas', ar: 'العطر… لوحة لا تُنسى' },
      'home.hero.subtitle': { en: 'A curated collection of scents crafted like art.', ar: 'مجموعة منسقة من العطور المصنوعة كأعمال فنية' },
      'home.cta.explore': { en: 'Explore the Exhibition', ar: 'استكشف المعرض' },
      'home.cta.shop': { en: 'Shop Collection', ar: 'تسوق المجموعة' },
      'home.featured.title': { en: 'Current Exhibition', ar: 'المعرض الحالي' },
      'home.featured.subtitle': { en: 'Our most celebrated fragrances, each a work of art.', ar: 'عطورنا الأكثر شهرة، كل منها عمل فني' },
      'home.notes.title': { en: 'The Notes Wall', ar: 'جدار النوتات' },
      'home.notes.subtitle': { en: 'Explore our fragrances by their essence', ar: 'استكشف عطورنا حسب جوهرها' },
    },
    shop: {
      'shop.title': { en: 'The Collection', ar: 'المجموعة' },
      'shop.subtitle': { en: 'A curated selection of our finest fragrance artworks', ar: 'مجموعة منسقة من أرقى أعمالنا الفنية العطرية' },
      'shop.filter': { en: 'Filter', ar: 'تصفية' },
      'shop.category': { en: 'Category', ar: 'الفئة' },
    },
    product: {
      'product.details': { en: 'Artwork Details', ar: 'تفاصيل العمل الفني' },
      'product.composition': { en: 'Composition Notes', ar: 'نوتات التركيب' },
      'product.selectSize': { en: 'Select Size', ar: 'اختر الحجم' },
      'product.addToCollection': { en: 'Add to Collection', ar: 'أضف إلى المجموعة' },
    },
    about: {
      'about.hero.title': { en: 'The Art of Scent', ar: 'فن العطر' },
      'about.hero.text1': { en: 'Founded in Dubai, Kahramana represents the intersection of Arabic perfume heritage and contemporary artistry.', ar: 'تأسست كهرمانة في دبي، وتمثل نقطة التقاء التراث العطري العربي والفن المعاصر.' },
      'about.story.title': { en: 'Born from Passion', ar: 'ولدت من الشغف' },
    },
    contact: {
      'contact.hero.title': { en: 'Get in Touch', ar: 'تواصل معنا' },
      'contact.visit.title': { en: 'Visit Our Gallery', ar: 'زر معرضنا' },
      'contact.location': { en: 'Location', ar: 'الموقع' },
      'contact.address1': { en: 'Dubai Mall, Fashion Avenue', ar: 'دبي مول، شارع الموضة' },
    },
    cart: {
      'cart.title': { en: 'Shopping Cart', ar: 'سلة التسوق' },
      'cart.empty': { en: 'Your cart is empty', ar: 'سلتك فارغة' },
      'cart.checkout': { en: 'Proceed to Checkout', ar: 'متابعة الدفع' },
    },
    checkout: {
      'checkout.title': { en: 'Checkout', ar: 'إتمام الطلب' },
      'checkout.contactInfo': { en: 'Contact Information', ar: 'معلومات التواصل' },
      'checkout.shippingAddress': { en: 'Shipping Address', ar: 'عنوان الشحن' },
      'checkout.paymentMethod': { en: 'Payment Method', ar: 'طريقة الدفع' },
    }
  });

  const sections = [
    { id: 'home', label: 'Home Page' },
    { id: 'shop', label: 'Shop Page' },
    { id: 'product', label: 'Product Pages' },
    { id: 'about', label: 'About Page' },
    { id: 'contact', label: 'Contact Page' },
    { id: 'cart', label: 'Cart' },
    { id: 'checkout', label: 'Checkout' },
  ];

  const handleUpdate = (section: string, key: string, lang: 'en' | 'ar', value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: {
          ...(prev[section as keyof typeof prev] as any)[key],
          [lang]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would send to backend:
    // await fetch('/api/content', {
    //   method: 'PUT',
    //   body: JSON.stringify(content)
    // });
    
    console.log('Saving content:', content);
    alert('Content saved successfully!');
    setIsSaving(false);
  };

  const currentSectionData = content[selectedSection as keyof typeof content] || {};
  const filteredEntries = Object.entries(currentSectionData).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display mb-2">Content & Translations</h1>
          <p className="text-[#6B6B6B]">Edit all website text in English and Arabic</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border-2 border-[#E8E5E0] p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search content keys..."
            className="w-full pl-12 pr-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Section Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-[#E8E5E0] p-4 sticky top-24">
            <h3 className="text-sm uppercase tracking-wider text-[#6B6B6B] mb-4">Sections</h3>
            <div className="space-y-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedSection === section.id
                      ? 'bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white'
                      : 'hover:bg-[#FAF7F1] text-[#6B6B6B]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.label}</span>
                  </div>
                  <p className="text-xs mt-1 opacity-75">
                    {Object.keys(content[section.id as keyof typeof content] || {}).length} keys
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="bg-white border-2 border-[#E8E5E0] p-12 text-center">
              <p className="text-[#6B6B6B]">No content found</p>
            </div>
          ) : (
            filteredEntries.map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border-2 border-[#E8E5E0] p-6"
              >
                <div className="mb-4">
                  <code className="text-sm text-[#EC4899] font-mono bg-[#FAF7F1] px-2 py-1">
                    {key}
                  </code>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* English */}
                  <div>
                    <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                      <Globe className="w-4 h-4" />
                      English
                    </label>
                    <textarea
                      value={value.en}
                      onChange={(e) => handleUpdate(selectedSection, key, 'en', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Arabic */}
                  <div>
                    <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                      <Globe className="w-4 h-4" />
                      Arabic
                    </label>
                    <textarea
                      value={value.ar}
                      onChange={(e) => handleUpdate(selectedSection, key, 'ar', e.target.value)}
                      rows={3}
                      dir="rtl"
                      className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors resize-none font-arabic"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-2 border-blue-200 p-6">
        <h3 className="font-display text-lg mb-2">💡 How to Use</h3>
        <ul className="text-sm text-[#6B6B6B] space-y-1">
          <li>• Select a section from the left sidebar to edit its content</li>
          <li>• Edit both English and Arabic translations for each text field</li>
          <li>• Use the search bar to quickly find specific content keys</li>
          <li>• Click "Save All Changes" to update the website content</li>
          <li>• Changes will be reflected immediately on the live website after saving</li>
        </ul>
      </div>
    </div>
  );
}
