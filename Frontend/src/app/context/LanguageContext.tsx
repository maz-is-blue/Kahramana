import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.menu': 'Menu',
    'header.cart': 'Cart',
    'nav.exhibition': 'Exhibition',
    'nav.collection': 'Collection',
    'nav.about': 'About',
    'nav.visit': 'Visit',
    
    // Home Page
    'home.subtitle': 'Kahramana Exhibition 2026',
    'home.hero.title': 'Fragrance… An Unforgettable Canvas',
    'home.hero.subtitle': 'A curated collection of scents crafted like art.',
    'home.cta.explore': 'Explore the Exhibition',
    'home.cta.shop': 'Shop Collection',
    'home.featured.label': 'Featured',
    'home.featured.title': 'Current Exhibition',
    'home.featured.subtitle': 'Our most celebrated fragrances, each a work of art.',
    'home.featured.viewAll': 'View Full Collection',
    'home.notes.label': 'Scent Library',
    'home.notes.title': 'The Notes Wall',
    'home.notes.subtitle': 'Explore our fragrances by their essence',
    'home.notes.artworks': 'artworks',
    'home.story.label': 'About',
    'home.story.title': 'The Art of',
    'home.story.subtitle': 'Perfume Making',
    'home.story.text1': 'At Kahramana, we approach perfumery as an art form. Each fragrance is a carefully composed piece, blending the finest ingredients to create olfactory masterpieces.',
    'home.story.cta': 'Discover Our Story',
    'home.limited.label': 'Limited Collection',
    'home.limited.title': 'Rare Editions',
    'home.limited.text': 'Exclusive artworks available for a limited time only. Each piece is numbered and accompanied by a certificate of authenticity.',
    'home.limited.cta': 'View Limited Editions',
    'home.testimonials.label': 'Testimonials',
    'home.testimonials.title': 'Visitor Reflections',
    'home.journal.label': 'Insights',
    'home.journal.title': 'The Kahramana Journal',
    'home.journal.subtitle': 'Thoughts on fragrance, artistry, and the poetics of scent',
    'home.journal.readMore': 'Read More',
    
    // Shop Page
    'shop.label': 'Gallery',
    'shop.title': 'The Collection',
    'shop.subtitle': 'A curated selection of our finest fragrance artworks',
    'shop.filter': 'Filter',
    'shop.category': 'Category',
    'shop.notes': 'Notes',
    'shop.intensity': 'Intensity',
    'shop.artworks': 'Artworks',
    'shop.close': 'Close',
    'shop.category.all': 'All Artworks',
    'shop.category.oud': 'Oud',
    'shop.category.amber': 'Amber',
    'shop.category.musk': 'Musk',
    'shop.category.floral': 'Floral',
    'shop.category.spicy': 'Spicy',
    'shop.notes.all': 'All Notes',
    'shop.intensity.all': 'All',
    'shop.intensity.light': 'Light',
    'shop.intensity.moderate': 'Moderate',
    'shop.intensity.strong': 'Strong',
    
    // Product Card
    'product.new': 'New',
    'product.scentNotes': 'Scent Notes',
    'product.viewArtwork': 'View Artwork',
    
    // Product Detail
    'product.home': 'Home',
    'product.artworkNo': 'Artwork No.',
    'product.details': 'Artwork Details',
    'product.composition': 'Composition Notes',
    'product.top': 'Top',
    'product.heart': 'Heart',
    'product.base': 'Base',
    'product.selectSize': 'Select Size',
    'product.quantity': 'Quantity',
    'product.addToCollection': 'Add to Collection',
    'product.relatedLabel': 'You May Also Like',
    'product.relatedTitle': 'Related Artworks',
    
    // About Page
    'about.label': 'About Kahramana',
    'about.hero.title': 'The Art of Scent',
    'about.hero.text1': 'Founded in Dubai, Kahramana represents the intersection of Arabic perfume heritage and contemporary artistry. We create fragrances as if they were works of art.',
    'about.story.label': 'Our Story',
    'about.story.title': 'Born from Passion',
    'about.story.text1': 'Kahramana was founded by master perfumer Layla Al-Rashid, whose lifelong passion for fragrance began in the souks of Dubai. Inspired by the amber stone – known in Arabic as "kahramana" – she envisioned creating perfumes that captured both the warmth of tradition and the brilliance of innovation.',
    'about.story.text2': 'Each fragrance in our collection is a carefully composed artwork. We work with the finest natural ingredients sourced from around the world, blending them with traditional Arabic essences like oud, amber, and musk.',
    'about.story.text3': 'Our atelier is a space where art and science converge. Every bottle that leaves our workshop is a testament to the craft of perfumery – an olfactory experience designed to create lasting memories.',
    'about.values.label': 'Our Philosophy',
    'about.values.title': 'Core Values',
    'about.value1.title': 'Artistry',
    'about.value1.text': 'We approach perfumery as an art form, creating olfactory masterpieces that transcend time.',
    'about.value2.title': 'Heritage',
    'about.value2.text': 'Rooted in Arabic perfume tradition, we honor centuries of fragrance craftsmanship.',
    'about.value3.title': 'Quality',
    'about.value3.text': 'Only the finest natural ingredients are selected for our compositions.',
    'about.value4.title': 'Innovation',
    'about.value4.text': 'Blending traditional methods with contemporary artistry to create unique scents.',
    'about.process.label': 'Our Process',
    'about.process.title': 'The Making of an Artwork',
    'about.process.step1.title': 'Ingredient Selection',
    'about.process.step1.text': 'Sourcing the finest natural essences from trusted suppliers worldwide.',
    'about.process.step2.title': 'Composition',
    'about.process.step2.text': 'Carefully blending notes to create harmonious and unique fragrances.',
    'about.process.step3.title': 'Maturation',
    'about.process.step3.text': 'Allowing fragrances to mature and develop complexity over time.',
    'about.process.step4.title': 'Refinement',
    'about.process.step4.text': 'Perfecting every detail until the composition achieves artistry.',
    'about.founder.label': 'Founder',
    'about.founder.name': 'Layla Al-Rashid',
    'about.founder.quote': '"For me, creating a perfume is like painting with scent. Each note is a brushstroke, each composition a canvas. I want people to experience our fragrances not just as perfumes, but as artworks that evoke emotion and memory."',
    'about.founder.title': 'Master Perfumer & Creative Director',
    
    // Contact Page
    'contact.label': 'Visit',
    'contact.hero.title': 'Get in Touch',
    'contact.hero.subtitle': 'We welcome you to visit our gallery or reach out with any inquiries about our collection.',
    'contact.form.title': 'Send a Message',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.namePlaceholder': 'Enter your name',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.messagePlaceholder': 'Tell us how we can help...',
    'contact.visit.title': 'Visit Our Gallery',
    'contact.location': 'Location',
    'contact.address1': 'Dubai Mall, Fashion Avenue',
    'contact.address2': 'Dubai, United Arab Emirates',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.hours': 'Gallery Hours',
    'contact.hours.weekday': 'Sunday – Thursday',
    'contact.hours.weekend': 'Friday – Saturday',
    'contact.hours.weekdayTime': '10:00 AM – 9:00 PM',
    'contact.hours.weekendTime': '10:00 AM – 10:00 PM',
    'contact.private.title': 'Private Consultations',
    'contact.private.text': 'Book a private session with our perfume curator to discover your signature scent.',
    'contact.private.cta': 'Schedule Appointment',
    
    // Footer
    'footer.join': 'Join Our Gallery',
    'footer.joinText': 'Receive invitations to new exhibitions and exclusive first looks at our latest artworks.',
    'footer.emailPlaceholder': 'Your email address',
    'footer.subscribe': 'Subscribe',
    'footer.about': 'A curated collection of luxury Arabic perfumes, crafted like art.',
    'footer.explore': 'Explore',
    'footer.information': 'Information',
    'footer.connect': 'Connect',
    'footer.shipping': 'Shipping & Returns',
    'footer.care': 'Care Guide',
    'footer.faq': 'FAQs',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.rights': 'All rights reserved.',
    
    // Products
    'product.amberNights': 'Amber Nights',
    'product.oudRoyal': 'Oud Royal',
    'product.roseMystique': 'Rose Mystique',
    'product.muskNoir': 'Musk Noir',
    'product.saffronGold': 'Saffron Gold',
    'product.whiteLotus': 'White Lotus',
    
    // Notes
    'note.oud': 'Oud',
    'note.amber': 'Amber',
    'note.rose': 'Rose',
    'note.musk': 'Musk',
    'note.jasmine': 'Jasmine',
    'note.sandalwood': 'Sandalwood',
    'note.saffron': 'Saffron',
    'note.vanilla': 'Vanilla',
    'note.tobacco': 'Tobacco',
    'note.patchouli': 'Patchouli',
    'note.vetiver': 'Vetiver',
    'note.leather': 'Leather',
    'note.lotus': 'Lotus',
    'note.waterNotes': 'Water Notes',
    'note.whiteMusk': 'White Musk',
    'note.bergamot': 'Bergamot',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Proceed to Checkout',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.subtitle': 'Complete your purchase',
    'checkout.emptyMessage': 'Add items to your cart to continue',
    'checkout.contactInfo': 'Contact Information',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone Number',
    'checkout.shippingAddress': 'Shipping Address',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.state': 'State / Province',
    'checkout.zipCode': 'ZIP / Postal Code',
    'checkout.selectCountry': 'Select Country',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.cardNumber': 'Card Number',
    'checkout.cardName': 'Name on Card',
    'checkout.giftWrap': 'Gift wrap this order',
    'checkout.giftMessage': 'Gift message (optional)',
    'checkout.orderSummary': 'Order Summary',
    'checkout.shipping': 'Shipping',
    'checkout.tax': 'Tax',
    'checkout.total': 'Total',
    'checkout.placeOrder': 'Place Order',
    'checkout.processing': 'Processing...',
    'checkout.securePayment': 'Secure SSL Payment',
    
    // Order Confirmation
    'confirmation.title': 'Order Confirmed!',
    'confirmation.thankYou': 'Thank you for your purchase',
    'confirmation.orderNumber': 'Order Number',
    'confirmation.whatNext': 'What Happens Next?',
    'confirmation.emailSent': 'Confirmation Email Sent',
    'confirmation.emailSentDesc': 'Check your inbox for order details',
    'confirmation.processing': 'Processing Your Order',
    'confirmation.processingDesc': 'We\'re preparing your artwork',
    'confirmation.shipping': 'Shipping & Delivery',
    'confirmation.shippingDesc': 'Estimated delivery by',
    'confirmation.orderDetails': 'Order Details',
    'confirmation.shippingAddress': 'Shipping Address',
    'confirmation.downloadReceipt': 'Download Receipt',
    'confirmation.continueShopping': 'Continue Shopping',
    'confirmation.needHelp': 'Need help with your order?',
    'confirmation.contactSupport': 'Contact Support',
    
    // Product
    'product.size': 'Size',
    'product.qty': 'Qty',
  },
  ar: {
    // Header
    'header.menu': 'القائمة',
    'header.cart': 'السلة',
    'nav.exhibition': 'المعرض',
    'nav.collection': 'المجموعة',
    'nav.about': 'عن كهرمانة',
    'nav.visit': 'زيارة',
    
    // Home Page
    'home.subtitle': 'معرض كهرمانة ٢٠٢٦',
    'home.hero.title': 'العطر… لوحة لا تُنسى',
    'home.hero.subtitle': 'مجموعة منسقة من العطور المصنوعة كأعمال فنية',
    'home.cta.explore': 'استكشف المعرض',
    'home.cta.shop': 'تسوق المجموعة',
    'home.featured.label': 'مميز',
    'home.featured.title': 'المعرض الحالي',
    'home.featured.subtitle': 'عطورنا الأكثر شهرة، كل منها عمل فني',
    'home.featured.viewAll': 'عرض المجموعة الكاملة',
    'home.notes.label': 'مكتبة العطور',
    'home.notes.title': 'جدار النوتات',
    'home.notes.subtitle': 'استكشف عطورنا حسب جوهرها',
    'home.notes.artworks': 'أعمال فنية',
    'home.story.label': 'عن',
    'home.story.title': 'فن',
    'home.story.subtitle': 'صناعة العطور',
    'home.story.text1': 'في كهرمانة، نتعامل مع صناعة العطور كفن. كل عطر هو قطعة مؤلفة بعناية، تمزج أجود المكونات لخلق روائع عطرية.',
    'home.story.cta': 'اكتشف قصتنا',
    'home.limited.label': 'مجموعة محدودة',
    'home.limited.title': 'إصدارات نادرة',
    'home.limited.text': 'أعمال فنية حصرية متاحة لفترة محدودة فقط. كل قطعة مرقمة ومصحوبة بشهادة أصالة.',
    'home.limited.cta': 'عرض الإصدارات المحدودة',
    'home.testimonials.label': 'الشهادات',
    'home.testimonials.title': 'تأملات الزوار',
    'home.journal.label': 'رؤى',
    'home.journal.title': 'مجلة كهرمانة',
    'home.journal.subtitle': 'أفكار حول العطور والفن وشعرية الرائحة',
    'home.journal.readMore': 'اقرأ المزيد',
    
    // Shop Page
    'shop.label': 'المعرض',
    'shop.title': 'المجموعة',
    'shop.subtitle': 'مجموعة منسقة من أرقى أعمالنا الفنية العطرية',
    'shop.filter': 'تصفية',
    'shop.category': 'الفئة',
    'shop.notes': 'النوتات',
    'shop.intensity': 'الكثافة',
    'shop.artworks': 'أعمال فنية',
    'shop.close': 'إغلاق',
    'shop.category.all': 'جميع الأعمال',
    'shop.category.oud': 'عود',
    'shop.category.amber': 'عنبر',
    'shop.category.musk': 'مسك',
    'shop.category.floral': 'زهري',
    'shop.category.spicy': 'توابل',
    'shop.notes.all': 'جميع النوتات',
    'shop.intensity.all': 'الكل',
    'shop.intensity.light': 'خفيف',
    'shop.intensity.moderate': 'متوسط',
    'shop.intensity.strong': 'قوي',
    
    // Product Card
    'product.new': 'جديد',
    'product.scentNotes': 'نوتات العطر',
    'product.viewArtwork': 'عرض العمل الفني',
    
    // Product Detail
    'product.home': 'الرئيسية',
    'product.artworkNo': 'عمل فني رقم',
    'product.details': 'تفاصيل العمل الفني',
    'product.composition': 'نوتات التركيب',
    'product.top': 'رأس',
    'product.heart': 'قلب',
    'product.base': 'قاعدة',
    'product.selectSize': 'اختر الحجم',
    'product.quantity': 'الكمية',
    'product.addToCollection': 'أضف إلى المجموعة',
    'product.relatedLabel': 'قد يعجبك أيضاً',
    'product.relatedTitle': 'أعمال فنية ذات صلة',
    
    // About Page
    'about.label': 'عن كهرمانة',
    'about.hero.title': 'فن العطر',
    'about.hero.text1': 'تأسست كهرمانة في دبي، وتمثل نقطة التقاء التراث العطري العربي والفن المعاصر. نصنع العطور كما لو كانت أعمالاً فنية.',
    'about.story.label': 'قصتنا',
    'about.story.title': 'ولدت من الشغف',
    'about.story.text1': 'أسست كهرمانة العطارة الرئيسية ليلى الرشيد، التي بدأ شغفها مدى الحياة بالعطور في أسواق دبي. مستوحاة من حجر العنبر - المعروف بالعربية باسم "كهرمانة" - تصورت إنشاء عطور تجسد دفء التقليد وتألق الابتكار.',
    'about.story.text2': 'كل عطر في مجموعتنا هو عمل فني مؤلف بعناية. نعمل مع أجود المكونات الطبيعية من جميع أنحاء العالم، نمزجها مع الجواهر العربية التقليدية مثل العود والعنبر والمسك.',
    'about.story.text3': 'مشغلنا هو مساحة يلتقي فيها الفن والعلم. كل زجاجة تغادر ورشتنا هي شهادة على حرفة صناعة العطور - تجربة عطرية مصممة لخلق ذكريات دائمة.',
    'about.values.label': 'فلسفتنا',
    'about.values.title': 'القيم الأساسية',
    'about.value1.title': 'الفن',
    'about.value1.text': 'نتعامل مع صناعة العطور كفن، نخلق روائع عطرية تتجاوز الزمن.',
    'about.value2.title': 'التراث',
    'about.value2.text': 'متجذرون في تقليد العطور العربية، نكرم قرون من حرفية العطور.',
    'about.value3.title': 'الجودة',
    'about.value3.text': 'يتم اختيار أجود المكونات الطبيعية فقط لتركيباتنا.',
    'about.value4.title': 'الابتكار',
    'about.value4.text': 'مزج الطرق التقليدية مع الفن المعاصر لخلق روائح فريدة.',
    'about.process.label': 'عمليتنا',
    'about.process.title': 'صنع عمل فني',
    'about.process.step1.title': 'اختيار المكونات',
    'about.process.step1.text': 'الحصول على أجود الجواهر الطبيعية من موردين موثوقين حول العالم.',
    'about.process.step2.title': 'التأليف',
    'about.process.step2.text': 'مزج النوتات بعنا��ة لخلق عطور متناغمة وفريدة.',
    'about.process.step3.title': 'النضج',
    'about.process.step3.text': 'السماح للعطور بالنضج وتطوير التعقيد بمرور الوقت.',
    'about.process.step4.title': 'التنقيح',
    'about.process.step4.text': 'إتقان كل التفاصيل حتى يصل التركيب إلى الفن.',
    'about.founder.label': 'المؤسس',
    'about.founder.name': 'ليلى الرشيد',
    'about.founder.quote': '"بالنسبة لي، صنع العطر يشبه الرسم بالعطر. كل نوتة هي ضربة فرشاة، كل تركيبة هي لوحة قماشية. أريد من الناس أن يختبروا عطورنا ليس فقط كعطور، ولكن كأعمال فنية تثير العاطفة والذاكرة."',
    'about.founder.title': 'عطار رئيسي ومدير إبداعي',
    
    // Contact Page
    'contact.label': 'زيارة',
    'contact.hero.title': 'تواصل معنا',
    'contact.hero.subtitle': 'نرحب بزيارتك لمعرضنا أو التواصل معنا بأي استفسارات حول مجموعتنا.',
    'contact.form.title': 'أرسل رسالة',
    'contact.form.name': 'اسمك',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.message': 'الرسالة',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.form.namePlaceholder': 'أدخل اسمك',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.messagePlaceholder': 'أخبرنا كيف يمكننا المساعدة...',
    'contact.visit.title': 'زر معرضنا',
    'contact.location': 'الموقع',
    'contact.address1': 'دبي مول، شارع الموضة',
    'contact.address2': 'دبي، الإمارات العربية المتحدة',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.hours': 'ساعات المعرض',
    'contact.hours.weekday': 'الأحد – الخميس',
    'contact.hours.weekend': 'الجمعة – السبت',
    'contact.hours.weekdayTime': '٠٩:٠٠ ص – ٠٩:٠٠ م',
    'contact.hours.weekendTime': '٠٩:٠٠ ص – ٠٩:٠٠ م',
    'contact.private.title': 'استشارات خاصة',
    'contact.private.text': 'احجز جلسة خاصة مع منسق العطور لدينا لاكتشاف عطرك المميز.',
    'contact.private.cta': 'حدد موعد',
    
    // Footer
    'footer.join': 'انضم إلى معرضنا',
    'footer.joinText': 'احصل على دعوات للمعارض الجديدة ونظرات حصرية أولى على أحدث أعمالنا.',
    'footer.emailPlaceholder': 'عنوان بريدك الإلكتروني',
    'footer.subscribe': 'اشترك',
    'footer.about': 'مجموعة منسقة من العطور العربية الفاخرة، مصنوعة كأعمال فنية',
    'footer.explore': 'استكشف',
    'footer.information': 'معلومات',
    'footer.connect': 'تواصل',
    'footer.shipping': 'الشحن والإرجاع',
    'footer.care': 'دليل العناية',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'الشروط',
    'footer.rights': 'جميع الحقوق محفوظة.',
    
    // Products
    'product.amberNights': 'ليالي العنبر',
    'product.oudRoyal': 'عود ملكي',
    'product.roseMystique': 'الوردة الغامضة',
    'product.muskNoir': 'المسك الأسود',
    'product.saffronGold': 'الزعفران الذهبي',
    'product.whiteLotus': 'اللوتس الأبيض',
    
    // Notes
    'note.oud': 'عود',
    'note.amber': 'عنبر',
    'note.rose': 'ورد',
    'note.musk': 'مسك',
    'note.jasmine': 'ياسمين',
    'note.sandalwood': 'صندل',
    'note.saffron': 'زعفران',
    'note.vanilla': 'فانيليا',
    'note.tobacco': 'تبغ',
    'note.patchouli': 'باتشولي',
    'note.vetiver': 'فيتيفر',
    'note.leather': 'جلد',
    'note.lotus': 'لوتس',
    'note.waterNotes': 'نوتات مائية',
    'note.whiteMusk': 'مسك أبيض',
    'note.bergamot': 'برغموت',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.continueShopping': 'متابعة التسوق',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.checkout': 'متابعة الدفع',
    
    // Checkout
    'checkout.title': 'إتمام الطلب',
    'checkout.subtitle': 'أكمل عملية الشراء',
    'checkout.emptyMessage': 'أضف عناصر إلى سلتك للمتابعة',
    'checkout.contactInfo': 'معلومات التواصل',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.phone': 'رقم الهاتف',
    'checkout.shippingAddress': 'عنوان الشحن',
    'checkout.firstName': 'الاسم الأول',
    'checkout.lastName': 'اسم العائلة',
    'checkout.address': 'العنوان',
    'checkout.city': 'المدينة',
    'checkout.state': 'الولاية / المحافظة',
    'checkout.zipCode': 'الرمز البريدي',
    'checkout.selectCountry': 'اختر الدولة',
    'checkout.paymentMethod': 'طريقة الدفع',
    'checkout.cardNumber': 'رقم البطاقة',
    'checkout.cardName': 'الاسم على البطاقة',
    'checkout.giftWrap': 'تغليف الهدية لهذا الطلب',
    'checkout.giftMessage': 'رسالة ال��دية (اختياري)',
    'checkout.orderSummary': 'ملخص الطلب',
    'checkout.shipping': 'الشحن',
    'checkout.tax': 'الضريبة',
    'checkout.total': 'الإجمالي',
    'checkout.placeOrder': 'تأكيد الطلب',
    'checkout.processing': 'جاري المعالجة...',
    'checkout.securePayment': 'دفع آمن بتقنية SSL',
    
    // Order Confirmation
    'confirmation.title': 'تم تأكيد الطلب!',
    'confirmation.thankYou': 'شكراً لك على عملية الشراء',
    'confirmation.orderNumber': 'رقم الطلب',
    'confirmation.whatNext': 'ما الذي سيحدث بعد ذلك؟',
    'confirmation.emailSent': 'تم إرسال رسالة التأكيد',
    'confirmation.emailSentDesc': 'تحقق من بريدك للحصول على تفاصيل الطلب',
    'confirmation.processing': 'معالجة طلبك',
    'confirmation.processingDesc': 'نحن نحضر عملك الفني',
    'confirmation.shipping': 'الشحن والتوصيل',
    'confirmation.shippingDesc': 'تاريخ التسليم المتوقع',
    'confirmation.orderDetails': 'تفاصيل الطلب',
    'confirmation.shippingAddress': 'عنوان الشحن',
    'confirmation.downloadReceipt': 'تنزيل الإيصال',
    'confirmation.continueShopping': 'متابعة التسوق',
    'confirmation.needHelp': 'هل تحتاج مساعدة بخصوص طلبك؟',
    'confirmation.contactSupport': 'اتصل بالدعم',
    
    // Product
    'product.size': 'الحجم',
    'product.qty': 'الكمية',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Update document direction and font
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add language class to body for styling
    document.body.classList.remove('lang-en', 'lang-ar');
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}