// Import styles
import './style.css'

// Import assets to resolve them via Vite
import heroImg from './assets/hero_sweets.webp'
import heritageImg from './assets/heritage_sweets.webp'
import kunafaImg from './assets/kunafa.webp'
import giftBoxImg from './assets/gift_box.webp'
// Distinct product photos
import baklavaRollsImg from './assets/kol_w_shkor.webp'
import kunafaSmoothImg from './assets/kunafa_smooth.webp'
import maamoulPistachioImg from './assets/maamoul_pistachio.webp'
import maamoulDatesImg from './assets/maamoul_dates.webp'

// Site config (sensitive data - loaded from config.local.js if exists, else config.js)
import { SITE_CONFIG } from './config.js'

// "سامي" الشات بوت الذكي
import { initChatWidget } from './chat-widget.js'

// المصدر الوحيد للأسعار
import { priceById } from './shop-products.js'

// Translations Dictionary (AR/TR)
const TRANSLATIONS = {
  ar: {
    seo_title: 'حلويات الشام | أصالة المذاق الدمشقي العريق',
    brand_name: 'حلويات الشام',
    brand_subtitle: 'الذوق الشامي الأصيل',
    nav_home: 'الرئيسية',
    nav_categories: 'أقسامنا',
    nav_box_builder: 'صندوقك المخصص',
    nav_menu: 'قائمة الحلويات',
    nav_heritage: 'حكايتنا',
    nav_contact: 'تواصل معنا',
    cart_title: 'سلة المشتريات',
    cart_empty_title: 'سلتك فارغة حالياً',
    cart_empty_desc: 'تصفح قائمة الحلويات وأضف ما تشتهيه من أطباقنا الفاخرة.',
    cart_empty_btn: 'تصفح المنتجات',
    cart_subtotal: 'المجموع الفرعي:',
    cart_total_weight: 'الوزن التقريبي الإجمالي:',
    cart_shipping: 'التوصيل:',
    cart_shipping_desc: 'شحن مبرد سريع (حسب العنوان)',
    cart_btn_checkout: 'إتمام الطلب عبر واتساب',
    hero_eyebrow: 'أصالة المذاق الدمشقي العريق',
    hero_title: 'حلويات الشام الطازجة تُصنع <span class="hl-gold">بحبٍ</span> منذ أجيال',
    hero_subtitle: 'نأخذكم في رحلة ساحرة إلى قلب دمشق العريقة مع نكهات تجمع بين عبق التاريخ وسحر الحاضر، محضرة يدوياً بأجود أنواع السمن البلدي والفستق الحلبي المقرمش.',
    hero_btn_menu: 'استكشف القائمة',
    hero_btn_builder: 'صمم علبتك المخصصة',
    hero_badge_text: 'مكونات بلدية طبيعية',
    cat_eyebrow: 'مجموعاتنا المختارة',
    cat_title: 'شاهد روائع مأكولاتنا الشامية',
    bento_tag_popular: 'الأكثر طلباً',
    bento_tag_gift: 'تغليف فاخر',
    bento_title_baklava: 'البقلاوة الملكية المشكلة',
    bento_desc_baklava: 'رقائق العجين الهشة المحشوة بالفستق الحلبي الفاخر والمحلاة بقطرات العسل الصافي.',
    bento_title_kunafa: 'الكنافة النابلسية الساخنة',
    bento_desc_kunafa: 'بالجبنة الغنية الساخنة المقرمشة مع رشة من الفستق الحلبي الزاهي.',
    bento_title_maamoul: 'المعمول الدمشقي الأصيل',
    bento_desc_maamoul: 'مخبوز بالسمن البلدي ورائحة ماء الزهر الفواحة التي تذوب في الفم.',
    bento_title_gifts: 'علب الهدايا والمناسبات',
    bento_desc_gifts: 'علب معدنية وخشبية منسقة بعناية لتكون الهدية الأرقى لأحبائكم في المناسبات والأعياد.',
    bento_btn: 'عرض المجموعة',
    builder_eyebrow: 'صمم على ذوقك',
    builder_title: 'صانع علبة حلويات الشام المخصصة',
    builder_subtitle: 'اختر حجم العلبة التي ترغب بها، وامزج حلوياتك المفضلة بنسب مئوية مخصصة لتخلق علبتك الفريدة.',
    builder_empty_visual: 'العلبة فارغة حالياً. أضف الحلويات لتصميم طلبيتك المخصصة!',
    builder_fill_status: 'نسبة الامتلاء:',
    builder_price: 'السعر التقريبي:',
    builder_size_title: '1. اختر حجم العلبة:',
    size_1kg_title: 'علبة بوزن 1 كغ',
    size_2kg_title: 'علبة بوزن 2 كغ',
    size_1kg_price: '1300 ل.ت',
    size_2kg_price: '2400 ل.ت',
    builder_sweets_title: '2. حدد نسب المكونات (المجموع يجب أن يساوي 100%):',
    builder_add_btn: 'أضف علبتك المخصصة للسلة',
    menu_eyebrow: 'قائمة الطلبات',
    menu_title: 'اختر من أشهى أطباقنا اليوم',
    menu_subtitle: 'نوفر لكم تشكيلة واسعة من الحلويات الطازجة المحضرة يومياً. حدد الفئة واستمتع بالتصفح.',
    filter_all: 'الكل',
    filter_baklava: 'بقلاوة فاخرة',
    filter_kunafa: 'كنافة طازجة',
    filter_maamoul: 'المعمول والشرقيات',
    filter_gifts: 'صناديق الهدايا',
    heritage_eyebrow: 'قصة عراقتنا وأصالتنا',
    heritage_title: 'شغف يتوارثه الأجيال لتقديم المذاق الدمشقي الحقيقي',
    heritage_prose_1: 'في "حلويات الشام"، لا نقوم فقط بصناعة الحلويات، بل نحافظ على إرث ثقافي يمتد لقرون من أسواق دمشق العريقة ومحلاتها التي ملأت رائحة سمنها البلدي وهيلها الأزقة القديمة.',
    heritage_prose_2: 'كل قطعة نقدمها لكم مصنوعة يدوياً بالكامل بدقة متناهية، نستخدم فيها السمن الحيواني النقي 100%، وأفضل حبات الفستق الحلبي الأخضر المنتقى حبة فحبة، وقطرات القطر الممزوج بماء الزهر الدمشقي الطبيعي، لنضمن لكم جودة وطعماً لا ينسى.',
    h_feat_1_title: 'مكونات طبيعية بالكامل',
    h_feat_1_desc: 'خالية من المواد الحافظة والزيوت المهدرجة.',
    h_feat_2_title: 'حرفية يدوية عريقة',
    h_feat_2_desc: 'تُصنع بأيدي أمهر الخبراء الدمشقيين.',
    contact_eyebrow: 'تواصل معنا',
    contact_title: 'نسعد بخدمتكم وتلبية طلباتكم الخاصة',
    contact_subtitle: 'لطلب كميات المناسبات الكبرى، أو للاستفسار عن الشحن والتسليم، يمكنك مراسلتنا مباشرة.',
    form_title: 'أرسل استفسارك',
    form_label_name: 'الاسم الكريم',
    ph_name: 'مثال: أحمد الشامي',
    ph_phone: 'مثال: +90 500 000 00 00',
    ph_message: 'يرجى كتابة تفاصيل طلبك هنا...',
    form_label_phone: 'رقم الجوال (مع رمز البلد)',
    form_label_type: 'نوع الطلب',
    form_opt_1: 'استفسار عام',
    form_opt_2: 'طلب بوفيه مناسبات وأعراس',
    form_opt_3: 'طلب كميات شركات وهدايا',
    form_opt_4: 'اقتراحات وملاحظات',
    form_label_message: 'تفاصيل الاستفسار',
    form_btn: 'إرسال الاستفسار',
    form_success_text: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
    info_title: 'أوقات العمل وفروعنا',
    info_subtitle: 'نستقبلكم يومياً لنقدم لكم طعم السعادة الطازج.',
    info_branch1_title: 'الفرع الأول',
    info_branch2_title: 'الفرع الثاني',
    info_map_link: '📌 عرض الموقع على الخريطة',
    info_hours_title: 'أوقات العمل الرسمية',
    info_contact_title: 'الاتصال والطلب المباشر',
    info_shipping_title: 'الشحن والتوصيل',
    footer_brand_desc: 'نصنع الحلويات الدمشقية بأصالتها ونكهتها العريقة لتصلكم طازجة وفاخرة أينما كنتم.',
    footer_links_title: 'روابط سريعة',
    footer_contact_title: 'تواصل فوري',
    footer_wa: 'واتساب:',
    footer_phone_label: 'الهاتف:',
    footer_insta_label: 'انستغرام:',
    footer_rights: '© 2026 حلويات الشام الفاخرة. جميع الحقوق محفوظة. تم التطوير بكل حب لأصالة المذاق.',
    toast_added: 'تمت إضافة المنتج إلى السلة',
    toast_added_custom: 'تمت إضافة علبتك المخصصة إلى السلة!',
    toast_enquiry_sent: 'تم إرسال استفسارك بنجاح',
    form_kvkk: 'بإرسالك النموذج، توافق على معالجة بياناتك للرد على استفسارك فقط، وفق قانون حماية البيانات الشخصية (KVKK).',
    metric_pistachio: 'الفستق الحلبي',
    metric_sweetness: 'درجة الحلاوة',
    metric_crisp: 'القرمشة',
    modal_calculated_pieces: 'تقريباً',
    modal_desc_label: 'الوصف:',
    modal_ingredients_label: 'المكونات الأساسية:',
    modal_calories_label: 'السعرات الحرارية:',
    modal_weight_label: 'الوزن والكمية:',
    modal_add_btn: 'أضف إلى السلة',
    custom_box_title: 'علبة حلويات الشام المشكلة مخصصة',
    custom_box_item_desc: 'علبة مصممة بنسب مخصصة:',
    sweet_name_pistachio_baklava: 'بقلاوة فستق حلبي فاخرة',
    sweet_name_kol_w_shkor: 'كول وشكور بالفستق',
    sweet_name_maamoul_pistachio: 'معمول فستق حلبي فاخر',
    sweet_name_maamoul_dates: 'معمول بالتمر البلدي (العجوة)',
    sweet_name_kunafa_rough: 'كنافة نابلسية بالجبن (خشنة)',
    sweet_name_kunafa_smooth: 'كنافة نابلسية بالجبن (ناعمة)'
  },
  tr: {
    seo_title: 'Şam Tatlıları | Tarihi Şam Lezzetinin Asaleti',
    brand_name: 'Şam Tatlıları',
    brand_subtitle: 'Otantik Şam Lezzeti',
    nav_home: 'Ana Sayfa',
    nav_categories: 'Kategoriler',
    nav_box_builder: 'Özel Kutun',
    nav_menu: 'Tatlı Menüsü',
    nav_heritage: 'Hikayemiz',
    nav_contact: 'İletişim',
    cart_title: 'Alışveriş Sepeti',
    cart_empty_title: 'Sepetiniz Şu Anda Boş',
    cart_empty_desc: 'Tatlı menümüzü inceleyin ve lüks lezzetlerimizden dilediğinizi ekleyin.',
    cart_empty_btn: 'Ürünleri İncele',
    cart_subtotal: 'Ara Toplam:',
    cart_total_weight: 'Yaklaşık Toplam Ağırlık:',
    cart_shipping: 'Teslimat:',
    cart_shipping_desc: 'Hızlı Soğutmalı Sevkiyat (Adrese göre)',
    cart_btn_checkout: 'WhatsApp ile Sipariş Et',
    hero_eyebrow: 'Tarihi Şam Lezzetinin Asaleti',
    hero_title: 'Taze Şam Tatlıları Nesillerdir <span class="hl-gold">Sevgiyle</span> Üretiliyor',
    hero_subtitle: 'Sizi tarihi Şam pazarının kalbine götürüyoruz. Hakiki sadeyağ ve çıtır çıtır Antep fıstığı ile el yapımı hazırlanan, tarihin kokusunu taşıyan eşsiz lezzetler.',
    hero_btn_menu: 'Menüyü Keşfet',
    hero_btn_builder: 'Kendi Kutunu Tasarla',
    hero_badge_text: 'Doğal Yerel Malzemeler',
    cat_eyebrow: 'Seçkin Koleksiyonlarımız',
    cat_title: 'Şam Tatlılarımızın Eşsiz Çeşitleri',
    bento_tag_popular: 'En Çok Satan',
    bento_tag_gift: 'Lüks Paketleme',
    bento_title_baklava: 'Saray Usulü Karışık Baklava',
    bento_desc_baklava: 'Bol Antep fıstığı ile doldurulmuş çıtır yufka katları ve saf bal damlaları.',
    bento_title_kunafa: 'Sıcak Künefe Çeşitleri',
    bento_desc_kunafa: 'Eriyen zengin akavi peyniri, çıtır kadayıf ve parlak Antep fıstığı tozunun uyumu.',
    bento_title_maamoul: 'Geleneksel Şam Kömbesi (Mamul)',
    bento_desc_maamoul: 'Saf sadeyağ ve çiçek suyu kokusuyla ağızda dağılan otantik kurabiyeler.',
    bento_title_gifts: 'Hediye ve Özel Gün Kutuları',
    bento_desc_gifts: 'Özel gün ve bayramlarda sevdiklerinize en şık hediye olacak ahşap ve metal kutular.',
    bento_btn: 'Koleksiyonu Gör',
    builder_eyebrow: 'Zevkine Göre Tasarla',
    builder_title: 'Özel Karışık Şam Kutusu Tasarımcısı',
    builder_subtitle: 'İstediğiniz kutu boyutunu seçin ve en sevdiğiniz tatlıları özel yüzdelerle karıştırarak benzersiz kutunuzu oluşturun.',
    builder_empty_visual: 'Kutu şu anda boş. Kendi özel siparişinizi tasarlamak için tatlı ekleyin!',
    builder_fill_status: 'Doluluk Oranı:',
    builder_price: 'Yaklaşık Fiyat:',
    builder_size_title: '1. Kutu Boyutunu Seçin:',
    size_1kg_title: '1 kg Ağırlığında Kutu',
    size_2kg_title: '2 kg Ağırlığında Kutu',
    size_1kg_price: '1300 ₺',
    size_2kg_price: '2400 ₺',
    builder_sweets_title: '2. Tatlı Yüzdelerini Belirleyin (Toplam %100 olmalıdır):',
    builder_add_btn: 'Özel Kutunu Sepete Ekle',
    menu_eyebrow: 'Sipariş Listesi',
    menu_title: 'Bugün Enfes Tatlılarımızdan Seçin',
    menu_subtitle: 'Günlük olarak taze hazırlanan geniş tatlı yelpazesi. Kategoriyi seçin ve keşfetmeye başlayın.',
    filter_all: 'Hepsi',
    filter_baklava: 'Lüks Baklava',
    filter_kunafa: 'Taze Künefe',
    filter_maamoul: 'Mamul ve Kurabiye',
    filter_gifts: 'Hediye Kutuları',
    heritage_eyebrow: 'Asaletimiz ve Hikayemiz',
    heritage_title: 'Gerçek Şam Lezzetini Sunmak İçin Nesiller Boyu Süren Tutku',
    heritage_prose_1: '"Şam Tatlıları" olarak sadece tatlı yapmıyoruz; Şam\'ın tarihi çarşılarından bugüne uzanan, sadeyağ ve kakule kokusuyla sokakları dolduran asırlık bir kültürel mirası yaşatıyoruz.',
    heritage_prose_2: 'Sunduğumuz her bir parça el yapımıdır. %100 saf hayvansal sadeyağ, tek tek seçilmiş en kaliteli yeşil Antep fıstıkları ve doğal Şam çiçek suyu şerbeti ile eşsiz bir kalite sunuyoruz.',
    h_feat_1_title: 'Tamamen Doğal Malzemeler',
    h_feat_1_desc: 'Koruyucu madde ve hidrojenize yağ içermez.',
    h_feat_2_title: 'Asırlık El İşçiliği',
    h_feat_2_desc: 'En yetenekli Şamlı ustalar tarafından üretilir.',
    contact_eyebrow: 'Bize Ulaşın',
    contact_title: 'Size Hizmet Vermekten Mutluluk Duyarız',
    contact_subtitle: 'Büyük organizasyon siparişleri, özel kurumsal hediyeler veya sevkiyat sorularınız için bizimle doğrudan iletişime geçebilirsiniz.',
    form_title: 'Sorunuzu Gönderin',
    form_label_name: 'Adınız Soyadınız',
    ph_name: 'Örn: Ahmet Şami',
    ph_phone: 'Örn: +90 500 000 00 00',
    ph_message: 'Lütfen talebinizin detaylarını buraya yazın...',
    form_label_phone: 'Telefon Numaranız (Ülke kodu ile)',
    form_label_type: 'Talep Türü',
    form_opt_1: 'Genel Bilgi',
    form_opt_2: 'Davet ve Düğün Organizasyonu',
    form_opt_3: 'Kurumsal Toplu Siparişler',
    form_opt_4: 'Öneri ve Geri Bildirim',
    form_label_message: 'Mesajınız',
    form_btn: 'Soruyu Gönder',
    form_success_text: 'Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.',
    info_title: 'Çalışma Saatlerimiz ve Şubelerimiz',
    info_subtitle: 'Size her gün taze mutluluk lezzetleri sunuyoruz.',
    info_branch1_title: 'Birinci Şube',
    info_branch2_title: 'İkinci Şube',
    info_map_link: '📌 Konumu Haritada Gör',
    info_hours_title: 'Resmi Çalışma Saatleri',
    info_contact_title: 'Doğrudan Sipariş Hattı',
    info_shipping_title: 'Kargo ve Sevkıyat',
    footer_brand_desc: 'Geleneksel Şam tatlılarını taze ve lüks şekilde dilediğiniz yere ulaştırıyoruz.',
    footer_links_title: 'Hızlı Bağlantılar',
    footer_contact_title: 'Hızlı İletişim',
    footer_wa: 'WhatsApp:',
    footer_phone_label: 'Telefon:',
    footer_insta_label: 'Instagram:',
    footer_rights: '© 2026 Şam Tatlıları. Tüm Hakları Saklıdır. Lezzetin aslıyla sevgiyle üretilmiştir.',
    toast_added: 'Ürün sepete eklendi',
    toast_added_custom: 'Özel kutunuz sepete eklendi!',
    toast_enquiry_sent: 'Mesajınız başarıyla iletildi',
    form_kvkk: 'Formu göndererek, verilerinizin yalnızca talebinize yanıt vermek için işlenmesini KVKK kapsamında kabul etmiş olursunuz.',
    metric_pistachio: 'Antep Fıstığı',
    metric_sweetness: 'Şerbet Oranı',
    metric_crisp: 'Çıtırlık',
    modal_calculated_pieces: 'Yaklaşık',
    modal_desc_label: 'Açıklama:',
    modal_ingredients_label: 'Temel Malzemeler:',
    modal_calories_label: 'Kalori:',
    modal_weight_label: 'Ağırlık ve Miktar:',
    modal_add_btn: 'Sepete Ekle',
    custom_box_title: 'Özel Karışık Şam Kutusu',
    custom_box_item_desc: 'Özel oranlarla tasarlanmış kutu:',
    sweet_name_pistachio_baklava: 'Lüks Fıstıklı Şam Baklavası',
    sweet_name_kol_w_shkor: 'Fıstıklı Saray Dolması (Bülbül Yuvası)',
    sweet_name_maamoul_pistachio: 'Fıstıklı Şam Kömbesi (Mamul)',
    sweet_name_maamoul_dates: 'Hurmalı Geleneksel Mamul',
    sweet_name_kunafa_rough: 'Sıcak Kadayıf Künefe (Peynirli)',
    sweet_name_kunafa_smooth: 'Şam Peynirli İrmik Künefe'
  }
};

// Global State
let currentLang = 'ar';
let refreshCurrentQuote = null; // set by initQuotes; re-renders active quote on language change
let cart = [];
let audioCtx = null;

// Mix Box Builder State
let builderBoxSize = '1kg'; // '1kg' or '2kg'
const BUILDER_SWEETS = [
  { id: 'pistachio_baklava', nameKey: 'sweet_name_pistachio_baklava', color: '#1E3E2F', percent: 0, costFactor: 1.0 },
  { id: 'kol_w_shkor', nameKey: 'sweet_name_kol_w_shkor', color: '#D4AF37', percent: 0, costFactor: 1.1 },
  { id: 'maamoul_pistachio', nameKey: 'sweet_name_maamoul_pistachio', color: '#4E6C50', percent: 0, costFactor: 0.9 },
  { id: 'maamoul_dates', nameKey: 'sweet_name_maamoul_dates', color: '#826F66', percent: 0, costFactor: 0.7 },
  { id: 'kunafa_rough', nameKey: 'sweet_name_kunafa_rough', color: '#E5890A', percent: 0, costFactor: 0.8 },
  { id: 'kunafa_smooth', nameKey: 'sweet_name_kunafa_smooth', color: '#F7C04A', percent: 0, costFactor: 0.85 }
];

// Product Catalog Multi-language Database
const PRODUCTS = [
  {
    id: 'baklava-pistachio-extra',
    category: 'baklava',
    basePrice: 85,
    weightText: { ar: '0.5 كغ', tr: '0.5 kg' },
    piecesText: { ar: '≈ 24-28 قطعة', tr: '≈ 24-28 adet' },
    image: heroImg,
    metrics: { pistachio: 5, sweetness: 3, crisp: 5 },
    translations: {
      ar: {
        name: 'بقلاوة بالفستق الحلبي الفاخرة',
        desc: 'رقائق عجين ذهبية هشة ومقرمشة، محشوة بالكامل بأفخر حبات الفستق الحلبي الأخضر المحمص، ومحلاة بعسل النحل الطبيعي والسمن البلدي النقي.',
        ingredients: 'فستق حلبي أخضر فاخر، طحين قمح ممتاز، سمن حيواني بلدي، عسل طبيعي، ماء زهر.',
        calories: '360 سعرة حرارية لكل 100 غرام'
      },
      tr: {
        name: 'Lüks Antep Fıstıklı Şam Baklavası',
        desc: 'En kaliteli Antep fıstıkları ile doldurulmuş, geleneksel sadeyağ ve doğal bal ile pişirilmiş çıtır yufka katları.',
        ingredients: 'Antep fıstığı, buğday unu, hayvansal sadeyağ, doğal süzme bal, çiçek suyu.',
        calories: '100g için 360 kcal'
      }
    }
  },
  {
    id: 'baklava-kol-w-shkor',
    category: 'baklava',
    basePrice: 90,
    weightText: { ar: '0.5 كغ', tr: '0.5 kg' },
    piecesText: { ar: '≈ 30 قطعة', tr: '≈ 30 adet' },
    image: baklavaRollsImg,
    metrics: { pistachio: 5, sweetness: 4, crisp: 4 },
    translations: {
      ar: {
        name: 'كول وشكور بالفستق (سوار الست)',
        desc: 'قطع دائرية صغيرة مبرومة بعناية فائقة تحاكي السوار، محشوة في قلبها بلب الفستق الحلبي ومسقية بالسمن البلدي والقطر الفواح.',
        ingredients: 'فستق حلبي مبشور، عجين الفيلو، سمن بلدي حيواني، ماء ورد، قطر.',
        calories: '345 سعرة حرارية لكل 100 غرام'
      },
      tr: {
        name: 'Fıstıklı Kol ve Şkür (Bülbül Yuvası)',
        desc: 'İncecik sarılmış halka yufka ortasında bol miktarda çekilmiş fıstık barındıran, tereyağlı geleneksel şerbetli tatlı.',
        ingredients: 'Antep fıstığı, özel baklava yufkası, saf tereyağı, gül suyu, şerbet.',
        calories: '100g için 345 kcal'
      }
    }
  },
  {
    id: 'kunafa-nabulsia-rough',
    category: 'kunafa',
    basePrice: 60,
    weightText: { ar: '0.5 كغ', tr: '0.5 kg' },
    piecesText: { ar: 'طبق عائلي صغير', tr: 'Küçük aile boyu tepsi' },
    image: kunafaImg,
    metrics: { pistachio: 3, sweetness: 4, crisp: 5 },
    translations: {
      ar: {
        name: 'كنافة نابلسية بالجبن (خشنة)',
        desc: 'شعر الكنافة الخشن الذهبي والمقرمش، محشو بجبن العكاوي والموتزاريلا البلدية المذابة والمحلاة بالقطر الساخن والفستق المطحون.',
        ingredients: 'عجين كنافة خشن، جبنة عكاوية محلاة، جبنة موتزاريلا طازجة، سمن بلدي، فستق حلبي، قطر.',
        calories: '310 سعرة حرارية لكل 100 غرام'
      },
      tr: {
        name: 'Peynirli Tel Künefe (Kadayıf)',
        desc: 'Eriyen tuzsuz özel künefe peyniri ile doldurulmuş çıtır tel kadayıf, tereyağı ve sıcak şerbetle servis edilir.',
        ingredients: 'Tel kadayıf, özel künefe peyniri, saf sadeyağ, fıstık içi, şerbet.',
        calories: '100g için 310 kcal'
      }
    }
  },
  {
    id: 'kunafa-nabulsia-smooth',
    category: 'kunafa',
    basePrice: 65,
    weightText: { ar: '0.5 كغ', tr: '0.5 kg' },
    piecesText: { ar: 'طبق عائلي صغير', tr: 'Küçük aile boyu tepsi' },
    image: kunafaSmoothImg,
    metrics: { pistachio: 3, sweetness: 3, crisp: 3 },
    translations: {
      ar: {
        name: 'كنافة نابلسية بالجبن (ناعمة)',
        desc: 'عجينة الكنافة الناعمة المحمصة بالسمن البلدي الفاخر حتى الاحمرار، ممدودة فوق طبقة سميكة من الجبن السوري الفاخر والمطاطي.',
        ingredients: 'فرك الكنافة الناعم، جبن عكاوي وتشيكي محلى، سمن بلدي، فستق مطحون، عطر ماء الزهر.',
        calories: '325 سعرة حرارية لكل 100 غرام'
      },
      tr: {
        name: 'Şam Usulü Yumuşak Peynirli Künefe',
        desc: 'İrmik hamurunun sadeyağ ile kavrulmasıyla elde edilen yumuşak zemin üstüne bol peynirli ve fıstıklı sıcak lezzet.',
        ingredients: 'İrmik kadayıf unu, tuzsuz eriyen peynir, sadeyağ, çiçek suyu, Antep fıstığı.',
        calories: '100g için 325 kcal'
      }
    }
  },
  {
    id: 'maamoul-pistachio',
    category: 'maamoul',
    basePrice: 75,
    weightText: { ar: '0.5 كغ', tr: '0.5 kg' },
    piecesText: { ar: '≈ 20 قطعة', tr: '≈ 20 adet' },
    image: maamoulPistachioImg,
    metrics: { pistachio: 4, sweetness: 2, crisp: 3 },
    translations: {
      ar: {
        name: 'معمول فاخر بالفستق الحلبي',
        desc: 'أقراص المعمول الشامية التقليدية، منقوشة يدوياً ومحضرة من السميد الفاخر المحمص بالسمن البلدي وتذوب غنى بحشوة الفستق العطرة.',
        ingredients: 'سميد فرخة ناعم، فستق حلبي مفروم، ماء زهر، سمن حيواني صافي، سكر ناعم.',
        calories: '330 سعرة حرارية لكل 100 غرام'
      },
      tr: {
        name: 'Lüks Antep Fıstıklı Mamul kurabiyesi',
        desc: 'Saf sadeyağlı semolin hamuru içine gül suyu ile harmanlanmış kıyılmış Antep fıstığı dolgulu geleneksel mamul.',
        ingredients: 'İrmik unu, Antep fıstığı içi, gül suyu, saf hayvansal sadeyağ, pudra şekeri.',
        calories: '100g için 330 kcal'
      }
    }
  },
  {
    id: 'maamoul-dates',
    category: 'maamoul',
    basePrice: 50,
    weightText: { ar: '0.5 كغ', tr: '0.5 kg' },
    piecesText: { ar: '≈ 22 قطعة', tr: '≈ 22 adet' },
    image: maamoulDatesImg,
    metrics: { pistachio: 0, sweetness: 3, crisp: 3 },
    translations: {
      ar: {
        name: 'معمول بالتمر البلدي (العجوة)',
        desc: 'بسكويت المعمول الهش والناعم المحشو بعجينة التمر البلدي (الخلاص) الممزوجة بالهيل واليانسون الفواح ومخبوزة حتى الكمال.',
        ingredients: 'طحين قمح، تمر خلاص منتقى، سمن بلدي، يانسون، هيل مطحون، محلب.',
        calories: '290 سعرة حرارية لكل 100 غرام'
      },
      tr: {
        name: 'Hurmalı Geleneksel Şam Kömbesi (Mamul)',
        desc: 'Ağızda dağılan hamur dokusu içerisinde aromatik kakule ve mahlep ile karıştırılmış kaliteli Medine hurması ezmesi dolgusu.',
        ingredients: 'Buğday unu, saf hurma ezmesi, sadeyağ, anason, kakule, mahlep.',
        calories: '100g için 290 kcal'
      }
    }
  },
  {
    id: 'gift-box-wooden',
    category: 'gifts',
    basePrice: 280,
    weightText: { ar: '2.0 كغ', tr: '2.0 kg' },
    piecesText: { ar: 'علبة خشبية منقوشة', tr: 'Nakışlı ahşap kutu' },
    image: giftBoxImg,
    metrics: { pistachio: 5, sweetness: 4, crisp: 4 },
    translations: {
      ar: {
        name: 'صندوق حلويات الشام الخشبي الملكي',
        desc: 'صندوق فاخر مصنوع من خشب الزان الطبيعي المنقوش، يحتوي على تشكيلة فاخرة من البقلاوة المشكلة والكول وشكور والبلورية بالفستق.',
        ingredients: 'مجموعة مشكلة من أفخر الحلويات الشرقية (بقلاوة، بلورية، عش البلبل، كول وشكور).',
        calories: 'تختلف بحسب مكونات القطع المحددة'
      },
      tr: {
        name: 'Kraliyet Ahşap Şam Karışık Kutusu',
        desc: 'Özel oyma ahşap kutu içerisinde en kaliteli baklava, saray sarması ve fıstıklı kadayıf çeşitlerinin zengin sunumu.',
        ingredients: 'Karışık şerbetli tatlı çeşitleri seçkisi (fıstıklı baklava, bülbül yuvası vb.).',
        calories: 'İçeriğe göre değişiklik gösterir'
      }
    }
  },
  {
    id: 'gift-box-emerald',
    category: 'gifts',
    basePrice: 160,
    weightText: { ar: '1.2 كغ', tr: '1.2 kg' },
    piecesText: { ar: 'علبة هدايا مخملية', tr: 'Kadife hediye kutusu' },
    image: giftBoxImg,
    metrics: { pistachio: 4, sweetness: 3, crisp: 4 },
    translations: {
      ar: {
        name: 'علبة الهدايا المخملية الزمردية',
        desc: 'علبة هدايا باللون الأخضر الزمردي الأنيق والخطوط الذهبية المذهبة، معبأة يدوياً بأصناف المعمول الفاخر والبقلاوة المشكلة الممتازة.',
        ingredients: 'تشكيلة مختارة بعناية من البقلاوة بالفستق واللوز، ومعمول التمر والفستق الحلبي.',
        calories: 'تختلف بحسب مكونات القطع المحددة'
      },
      tr: {
        name: 'Zümrüt Yeşil Lüks Kadife Hediye Kutusu',
        desc: 'Yaldız işlemeli zümrüt yeşili kutu içinde taze Antep fıstıklı mamul ve karışık mini baklava çeşitlerinden oluşan şık hediye.',
        ingredients: 'Özel fıstıklı ve bademli baklavalar, hurmalı mamul kurabiyeleri seçkisi.',
        calories: 'İçeriğe göre değişiklik gösterir'
      }
    }
  }
];

// Prices come from the single source of truth (shop-products.js) so the site,
// the bot, and the demo brain can never drift apart. Update prices THERE only.
PRODUCTS.forEach((p) => {
  const shared = priceById(p.id);
  if (shared != null) p.basePrice = shared;
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Bind images
  const heroImgEl = document.getElementById('hero-img-element');
  if (heroImgEl) heroImgEl.src = heroImg;

  const heritageImgEl = document.getElementById('heritage-img-element');
  if (heritageImgEl) heritageImgEl.src = heritageImg;

  // Set background images for Bento placeholders
  const bentoBaklava = document.getElementById('bento-img-baklava');
  if (bentoBaklava) bentoBaklava.style.backgroundImage = `url(${heroImg})`;

  const bentoKunafa = document.getElementById('bento-img-kunafa');
  if (bentoKunafa) bentoKunafa.style.backgroundImage = `url(${kunafaImg})`;

  const bentoMaamoul = document.getElementById('bento-img-maamoul');
  if (bentoMaamoul) bentoMaamoul.style.backgroundImage = `url(${maamoulPistachioImg})`;

  const bentoGifts = document.getElementById('bento-img-gifts');
  if (bentoGifts) bentoGifts.style.backgroundImage = `url(${giftBoxImg})`;

  // Set initial language from local storage
  const savedLang = localStorage.getItem('taj_alsham_lang');
  if (savedLang === 'ar' || savedLang === 'tr') {
    currentLang = savedLang;
  }
  updateLanguageUI();

  // Initialize systems
  initCart();
  initBoxBuilder();
  initFilters();
  initModals();
  initQuotes();
  initForms();
  initScrollHighlight();
  initHamburgerMenu();
  initScrollReveal();
  initNavbarScroll();
  initChatWidget();
  initKeyboardClose();
});

// وصولية: إغلاق السلة والمودال والقائمة الجوّالة بزر Escape
function initKeyboardClose() {
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const cart = document.getElementById('cart-drawer');
    const modal = document.getElementById('product-modal');
    const mobileNav = document.getElementById('mobile-nav-menu');
    const hamburger = document.getElementById('hamburger-btn');
    let closed = false;
    [cart, modal, mobileNav].forEach((el) => {
      if (el && el.classList.contains('active')) {
        el.classList.remove('active');
        closed = true;
      }
    });
    // أعد زر الهامبرغر لحالته الطبيعية إذا كانت القائمة مفتوحة
    if (closed && hamburger) hamburger.classList.remove('active');
    if (closed) playUISound('close');
  });
}

// Synthesize soft, premium haptic UI sounds (Halal Chimes & Clicks)
function playUISound(type) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'click') {
    // Soft wooden-style block click
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(950, now);
    osc1.frequency.exponentialRampToValueAtTime(150, now + 0.05);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc1.start(now);
    osc1.stop(now + 0.06);
  } 
  else if (type === 'add') {
    // High-pitched crystal bell chime
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(1046.50, now); // C6
    osc2.frequency.setValueAtTime(1318.51, now); // E6

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.36);
    osc2.stop(now + 0.36);
  }
  else if (type === 'close') {
    // Low sweeping pitch click
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(350, now);
    osc1.frequency.linearRampToValueAtTime(150, now + 0.12);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc1.start(now);
    osc1.stop(now + 0.13);
  }
  else if (type === 'success') {
    // Happy double chime arpeggio
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(783.99, now + 0.08); // G5
    osc1.frequency.setValueAtTime(1046.50, now + 0.16); // C6

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc1.start(now);
    osc1.stop(now + 0.46);
  }
}

// --- LANGUAGE STATE & TRANSLATION ENGINE ---
function populateConfigData() {
  // Branches
  // Helper: pick the right language from a string or {ar,tr} object
  const L = (v) => (v && typeof v === 'object') ? (v[currentLang] ?? v.ar) : v;

  const branch1Addr = document.getElementById('branch1-address');
  const branch1Map = document.getElementById('branch1-map');
  if (branch1Addr && SITE_CONFIG.branches[0]) {
    branch1Addr.textContent = L(SITE_CONFIG.branches[0].address);
  }
  if (branch1Map && SITE_CONFIG.branches[0]) {
    branch1Map.href = SITE_CONFIG.branches[0].mapUrl;
  }

  const branch2Addr = document.getElementById('branch2-address');
  const branch2Map = document.getElementById('branch2-map');
  if (branch2Addr && SITE_CONFIG.branches[1]) {
    branch2Addr.textContent = L(SITE_CONFIG.branches[1].address);
  }
  if (branch2Map && SITE_CONFIG.branches[1]) {
    branch2Map.href = SITE_CONFIG.branches[1].mapUrl;
  }

  // Hours
  const hoursText = document.getElementById('hours-text');
  if (hoursText) {
    hoursText.textContent = L(SITE_CONFIG.hours);
  }

  // Phone & WhatsApp (labels follow the active language)
  const phoneLabel = currentLang === 'ar' ? 'الهاتف' : 'Telefon';
  const waLabel = currentLang === 'ar' ? 'واتساب' : 'WhatsApp';
  const phoneText = document.getElementById('phone-text');
  const whatsappText = document.getElementById('whatsapp-text');
  if (phoneText) {
    phoneText.textContent = `${phoneLabel}: ${SITE_CONFIG.phone}`;
  }
  if (whatsappText) {
    whatsappText.textContent = `${waLabel}: ${SITE_CONFIG.whatsapp}`;
  }

  // Shipping
  const shippingText = document.getElementById('shipping-text');
  if (shippingText) {
    shippingText.textContent = L(SITE_CONFIG.shipping);
  }

  // Footer contacts
  const footerWa = document.getElementById('footer-wa');
  const footerPhone = document.getElementById('footer-phone');
  const footerInsta = document.getElementById('footer-insta');
  const footerInstaIcon = document.getElementById('footer-insta-icon');
  const footerFbIcon = document.getElementById('footer-fb-icon');
  const footerWaIcon = document.getElementById('footer-wa-icon');

  if (footerWa) {
    footerWa.textContent = SITE_CONFIG.whatsapp;
    footerWa.href = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, '')}`;
  }
  if (footerPhone) {
    footerPhone.textContent = SITE_CONFIG.phone;
    footerPhone.href = `tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`;
  }
  if (footerInsta) {
    footerInsta.textContent = SITE_CONFIG.instagram;
    footerInsta.href = SITE_CONFIG.instagramUrl;
  }
  if (footerInstaIcon) {
    footerInstaIcon.href = SITE_CONFIG.instagramUrl;
  }
  if (footerFbIcon) {
    footerFbIcon.href = SITE_CONFIG.facebookUrl;
  }
  if (footerWaIcon) {
    footerWaIcon.href = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, '')}`;
  }
}

function updateLanguageUI() {
  // Update HTML tag attributes
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  // Translate all DOM elements containing data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[currentLang][key]) {
      // Use innerHTML only if key has html tags or formatting
      if (key.includes('prose') || key.includes('title') || key.includes('subtitle') || key.includes('desc')) {
        el.innerHTML = TRANSLATIONS[currentLang][key];
      } else {
        el.textContent = TRANSLATIONS[currentLang][key];
      }
    }
  });

  // Translate input/textarea placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (TRANSLATIONS[currentLang][key]) {
      el.setAttribute('placeholder', TRANSLATIONS[currentLang][key]);
    }
  });

  // Update SEO Document Title
  document.title = TRANSLATIONS[currentLang].seo_title;

  // Toggle button label
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.textContent = currentLang === 'ar' ? 'Türkçe' : 'العربية';
  }

  // Populate config data (runs on every language change to ensure DOM is ready)
  populateConfigData();

  // Re-render components with active language
  renderProductsGrid(getActiveCategoryFilter());
  updateCartUI();
  renderBoxBuilderUI();
  if (refreshCurrentQuote) refreshCurrentQuote();
}

// Setup Language Switcher Button Listener
const langToggleBtn = document.getElementById('lang-toggle-btn');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'tr' : 'ar';
    localStorage.setItem('taj_alsham_lang', currentLang);
    playUISound('click');
    updateLanguageUI();
  });
}

function getActiveCategoryFilter() {
  const activeTab = document.querySelector('.filter-tab.active');
  return activeTab ? activeTab.getAttribute('data-filter') : 'all';
}

// Language-aware units
function priceUnit() { return currentLang === 'ar' ? 'ل.ت' : '₺'; }
function weightUnit() { return currentLang === 'ar' ? 'كغ' : 'kg'; }
function fmtPrice(n) { return `${n} ${priceUnit()}`; }

// --- PRODUCT CATALOG GRID RENDERER ---
function renderProductsGrid(filterCategory = 'all') {
  const container = document.getElementById('products-grid-container');
  if (!container) return;

  const filteredProducts = filterCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filterCategory);

  container.innerHTML = '';

  filteredProducts.forEach(product => {
    const trans = product.translations[currentLang];
    
    // Generate Stars HTML for metrics
    const starHtml = '💚'.repeat(product.metrics.pistachio) + '⬜'.repeat(5 - product.metrics.pistachio);
    const sweetnessText = getSweetnessMetricText(product.metrics.sweetness);
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="double-bezel-outer">
        <div class="double-bezel-inner product-inner">
          <div class="product-img-wrapper">
            <img src="${product.image}" alt="${trans.name}" class="product-img" loading="lazy" />
            <span class="product-tag">${translateCategory(product.category)}</span>
          </div>
          <div class="product-info">
            <div class="product-header-row">
              <h3 class="product-title">${trans.name}</h3>
              <span class="product-price">${fmtPrice(product.basePrice)}</span>
            </div>
            <p class="product-desc">${trans.desc}</p>
            
            <!-- Unique Visual Metrics Scales -->
            <div class="product-metrics">
              <div class="metric-row">
                <span class="metric-label">${TRANSLATIONS[currentLang].metric_pistachio}:</span>
                <span class="metric-value-stars">${starHtml}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">${TRANSLATIONS[currentLang].metric_sweetness}:</span>
                <span>${sweetnessText}</span>
              </div>
            </div>

            <div class="product-meta-row">
              <div class="p-meta-item">
                <span>⚖</span>
                <span>${product.weightText[currentLang]}</span>
              </div>
              <div class="p-meta-item">
                <span>🍬</span>
                <span>${product.piecesText[currentLang]}</span>
              </div>
            </div>
            <div class="product-actions">
              <button class="btn-add-to-cart" data-id="${product.id}">
                <span data-i18n="modal_add_btn">${TRANSLATIONS[currentLang].modal_add_btn}</span>
                <span>🛒</span>
              </button>
              <button class="btn-quick-view" data-id="${product.id}" aria-label="عرض سريع / Hızlı Gör">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    card.querySelector('.btn-add-to-cart').addEventListener('click', () => {
      addToCart(product.id, product.weightText[currentLang]);
    });

    card.querySelector('.btn-quick-view').addEventListener('click', () => {
      openQuickView(product.id);
    });

    container.appendChild(card);
  });
}

function getSweetnessMetricText(val) {
  if (currentLang === 'ar') {
    if (val >= 5) return '🍯 مركزة جداً';
    if (val >= 3) return '🍯 معتدلة';
    return '🍯 خفيفة';
  } else {
    if (val >= 5) return '🍯 Çok Yoğun';
    if (val >= 3) return '🍯 Orta Şerbetli';
    return '🍯 Hafif Şerbetli';
  }
}

function translateCategory(cat) {
  switch (cat) {
    case 'baklava': return TRANSLATIONS[currentLang].filter_baklava;
    case 'kunafa': return TRANSLATIONS[currentLang].filter_kunafa;
    case 'maamoul': return TRANSLATIONS[currentLang].filter_maamoul;
    case 'gifts': return TRANSLATIONS[currentLang].filter_gifts;
    default: return 'حلويات';
  }
}

// --- MIXED BOX BUILDER (صانع العلبة المخصصة) ---
function initBoxBuilder() {
  const sizeButtons = document.querySelectorAll('.btn-size');
  const addToCartBtn = document.getElementById('builder-add-to-cart-btn');

  // Box size selections
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      builderBoxSize = btn.getAttribute('data-size');
      playUISound('click');
      updateBuilderCalculations();
    });
  });

  // Add to cart listener
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addCustomBoxToCart();
    });
  }

  renderBoxBuilderUI();
}

function renderBoxBuilderUI() {
  const sweetsListContainer = document.getElementById('builder-sweets-items');
  if (!sweetsListContainer) return;

  sweetsListContainer.innerHTML = '';

  BUILDER_SWEETS.forEach(sweet => {
    const sweetName = TRANSLATIONS[currentLang][sweet.nameKey];
    const itemEl = document.createElement('div');
    itemEl.className = 'builder-sweet-item';
    itemEl.innerHTML = `
      <div class="sweet-info-block">
        <div class="sweet-color-indicator" style="background-color: ${sweet.color}"></div>
        <span class="sweet-name-span">${sweetName}</span>
      </div>
      <div class="sweet-control-block">
        <button class="btn-builder-adjust btn-builder-minus" data-id="${sweet.id}" aria-label="تقليل">-</button>
        <span class="sweet-builder-pct ${sweet.percent > 0 ? 'has-value' : ''}" id="pct-${sweet.id}">${sweet.percent}%</span>
        <button class="btn-builder-adjust btn-builder-plus" data-id="${sweet.id}" aria-label="زيادة">+</button>
      </div>
    `;

    // Connect adjustments
    itemEl.querySelector('.btn-builder-minus').addEventListener('click', () => adjustSweetPercent(sweet.id, -10));
    itemEl.querySelector('.btn-builder-plus').addEventListener('click', () => adjustSweetPercent(sweet.id, 10));

    sweetsListContainer.appendChild(itemEl);
  });

  updateBuilderCalculations();
}

function adjustSweetPercent(sweetId, change) {
  const currentTotal = BUILDER_SWEETS.reduce((sum, s) => sum + s.percent, 0);
  const targetSweet = BUILDER_SWEETS.find(s => s.id === sweetId);

  if (!targetSweet) return;

  const newPercent = targetSweet.percent + change;

  // Prevent values below 0
  if (newPercent < 0) return;

  // Prevent going above 100% total
  if (currentTotal + change > 100) {
    return;
  }

  targetSweet.percent = newPercent;
  playUISound('click');
  
  // Re-render UI readouts
  const pctEl = document.getElementById(`pct-${sweetId}`);
  if (pctEl) {
    pctEl.textContent = `${newPercent}%`;
    if (newPercent > 0) pctEl.classList.add('has-value');
    else pctEl.classList.remove('has-value');
  }

  updateBuilderCalculations();
}

function updateBuilderCalculations() {
  const currentTotal = BUILDER_SWEETS.reduce((sum, s) => sum + s.percent, 0);
  const totalPercentEl = document.getElementById('builder-total-percent');
  const progressBar = document.getElementById('builder-progress-bar');
  const calculatedPriceEl = document.getElementById('builder-calculated-price');
  const platterCircle = document.getElementById('platter-circle-visual');
  const platterEmptyMsg = document.getElementById('platter-empty-msg');
  const addToCartBtn = document.getElementById('builder-add-to-cart-btn');

  // Update percentages displays
  if (totalPercentEl) totalPercentEl.textContent = `${currentTotal}%`;
  if (progressBar) progressBar.style.width = `${currentTotal}%`;

  // Calculate pricing based on size + cost factors of sweets loaded
  const baseBoxPrice = builderBoxSize === '1kg' ? 150 : 280;
  let blendedFactor = 0;
  
  BUILDER_SWEETS.forEach(s => {
    if (s.percent > 0) {
      blendedFactor += (s.costFactor * (s.percent / 100));
    }
  });

  // If empty, blended factor default is 1.0
  if (currentTotal === 0) blendedFactor = 1.0;
  
  const finalPrice = Math.round(baseBoxPrice * blendedFactor);
  if (calculatedPriceEl) {
    calculatedPriceEl.textContent = fmtPrice(finalPrice);
  }

  // Update visual platter using Conic Gradient
  if (platterCircle) {
    if (currentTotal === 0) {
      platterCircle.style.background = 'var(--bg-secondary)';
      if (platterEmptyMsg) platterEmptyMsg.classList.remove('hidden');
    } else {
      if (platterEmptyMsg) platterEmptyMsg.classList.add('hidden');
      
      // Construct conic gradient css string
      let gradientSegments = [];
      let lastPct = 0;

      BUILDER_SWEETS.forEach(sweet => {
        if (sweet.percent > 0) {
          const nextPct = lastPct + sweet.percent;
          gradientSegments.push(`${sweet.color} ${lastPct}% ${nextPct}%`);
          lastPct = nextPct;
        }
      });

      // If not fully 100%, fill remaining with empty grey color
      if (lastPct < 100) {
        gradientSegments.push(`var(--bg-secondary) ${lastPct}% 100%`);
      }

      platterCircle.style.background = `conic-gradient(${gradientSegments.join(', ')})`;
    }
  }

  // Check if capacity is exactly 100%
  if (currentTotal === 100) {
    addToCartBtn.disabled = false;
    totalPercentEl.style.color = '#2e7d32'; // Green
  } else {
    addToCartBtn.disabled = true;
    if (totalPercentEl) totalPercentEl.style.color = 'var(--color-primary)';
  }

  // Disable plus buttons if total is already 100%
  const plusButtons = document.querySelectorAll('.btn-builder-plus');
  plusButtons.forEach(btn => {
    btn.disabled = currentTotal >= 100;
  });
}

function addCustomBoxToCart() {
  const totalPercent = BUILDER_SWEETS.reduce((sum, s) => sum + s.percent, 0);
  if (totalPercent !== 100) return;

  const baseBoxPrice = builderBoxSize === '1kg' ? 150 : 280;
  let blendedFactor = 0;
  BUILDER_SWEETS.forEach(s => blendedFactor += (s.costFactor * (s.percent / 100)));
  const finalPrice = Math.round(baseBoxPrice * blendedFactor);

  // Compile detailed description of sweets composition
  const compositionAr = BUILDER_SWEETS
    .filter(s => s.percent > 0)
    .map(s => `${s.percent}% ${TRANSLATIONS.ar[s.nameKey]}`)
    .join('، ');

  const compositionTr = BUILDER_SWEETS
    .filter(s => s.percent > 0)
    .map(s => `%${s.percent} ${TRANSLATIONS.tr[s.nameKey]}`)
    .join(', ');

  const customId = `custom-box-${builderBoxSize}-${Date.now()}`;
  const boxWeightText = builderBoxSize === '1kg' ? (currentLang === 'ar' ? '1 كغ مخصص' : '1 kg Özel') : (currentLang === 'ar' ? '2 كغ مخصص' : '2 kg Özel');

  const customItem = {
    id: customId,
    name: TRANSLATIONS[currentLang].custom_box_title,
    price: finalPrice,
    size: boxWeightText,
    quantity: 1,
    image: giftBoxImg,
    composition: { ar: compositionAr, tr: compositionTr },
    isCustomBox: true
  };

  cart.push(customItem);
  saveCart();
  updateCartUI();
  playUISound('add');
  showToast(TRANSLATIONS[currentLang].toast_added_custom);

  // Reset builder percentages after success
  BUILDER_SWEETS.forEach(s => s.percent = 0);
  renderBoxBuilderUI();
}

// --- E-COMMERCE SHOPPING CARTdrawer ---
function initCart() {
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const btnBrowseSweets = document.getElementById('btn-browse-sweets');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', () => {
      cartDrawer.classList.add('active');
      playUISound('click');
      // وصولية: انقل التركيز لزر الإغلاق ليصل إليه مستخدم الكيبورد
      if (cartCloseBtn) setTimeout(() => cartCloseBtn.focus(), 100);
    });
  }

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', () => {
      cartDrawer.classList.remove('active');
      playUISound('close');
    });
  }

  if (cartDrawer) {
    cartDrawer.addEventListener('click', (e) => {
      if (e.target === cartDrawer) {
        cartDrawer.classList.remove('active');
        playUISound('close');
      }
    });
  }

  if (btnBrowseSweets) {
    btnBrowseSweets.addEventListener('click', () => {
      cartDrawer.classList.remove('active');
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }

  // Load cart from local storage
  const savedCart = localStorage.getItem('taj_alsham_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      updateCartUI();
    } catch (e) {
      cart = [];
    }
  }
}

function addToCart(productId, size = '0.5 كغ', quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const trans = product.translations[currentLang];
  let price = product.basePrice;
  if (size.includes('1.0') || size === '1.0 kg' || size === '1 كغ' || size === '1 kg') {
    price = Math.round(product.basePrice * 1.8);
  } else if (size.includes('2.0') || size === '2.0 kg' || size === '2 كغ' || size === '2 kg') {
    price = Math.round(product.basePrice * 3.4);
  }

  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: trans.name,
      price: price,
      size: size,
      quantity: quantity,
      image: product.image,
      isCustomBox: false
    });
  }

  saveCart();
  updateCartUI();
  playUISound('add');
  showToast(TRANSLATIONS[currentLang].toast_added + `: ${trans.name}`);
}

function removeFromCart(id, size) {
  cart = cart.filter(item => !(item.id === id && item.size === size));
  saveCart();
  updateCartUI();
  playUISound('close');
}

function updateQuantity(id, size, change) {
  const item = cart.find(item => item.id === id && item.size === size);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(id, size);
  } else {
    saveCart();
    updateCartUI();
    playUISound('click');
  }
}

function saveCart() {
  localStorage.setItem('taj_alsham_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartActiveContent = document.getElementById('cart-active-content');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalWeightEl = document.getElementById('cart-total-weight');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate total weight
  let totalWeight = 0;
  cart.forEach(item => {
    let weightVal = 0.5;
    if (item.size.includes('1.0') || item.size.includes('1 كغ') || item.size.includes('1 kg')) weightVal = 1.0;
    else if (item.size.includes('2.0') || item.size.includes('2 كغ') || item.size.includes('2 kg')) weightVal = 2.0;
    else if (item.size.includes('1.2')) weightVal = 1.2;
    totalWeight += (weightVal * item.quantity);
  });

  if (cartBadge) {
    cartBadge.textContent = totalItems;
  }

  // Keep totals language-aware even when the cart is empty
  if (cartSubtotalEl) cartSubtotalEl.textContent = fmtPrice(subtotal);
  if (cartTotalWeightEl) cartTotalWeightEl.textContent = `${totalWeight.toFixed(1)} ${weightUnit()}`;

  if (totalItems === 0) {
    if (cartEmptyState) cartEmptyState.classList.remove('hidden');
    if (cartActiveContent) cartActiveContent.classList.add('hidden');
  } else {
    if (cartEmptyState) cartEmptyState.classList.add('hidden');
    if (cartActiveContent) cartActiveContent.classList.remove('hidden');

    // Render items
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';
      cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        
        let descHtml = '';
        if (item.isCustomBox) {
          descHtml = `<p class="cart-item-size" style="font-size:0.75rem; color:#854d0e;">${item.composition[currentLang]}</p>`;
        }

        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-size">${TRANSLATIONS[currentLang].modal_weight_label} ${item.size}</p>
            ${descHtml}
            <span class="cart-item-price">${fmtPrice(item.price * item.quantity)}</span>
          </div>
          <div class="cart-item-actions">
            <div class="qty-selector">
              <button class="qty-btn btn-minus">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn btn-plus">+</button>
            </div>
            <button class="btn-remove-item">${currentLang === 'ar' ? 'إزالة' : 'Çıkar'}</button>
          </div>
        `;

        itemEl.querySelector('.btn-minus').addEventListener('click', () => updateQuantity(item.id, item.size, -1));
        itemEl.querySelector('.btn-plus').addEventListener('click', () => updateQuantity(item.id, item.size, 1));
        itemEl.querySelector('.btn-remove-item').addEventListener('click', () => removeFromCart(item.id, item.size));

        cartItemsContainer.appendChild(itemEl);
      });
    }

    if (cartSubtotalEl) cartSubtotalEl.textContent = fmtPrice(subtotal);
    if (cartTotalWeightEl) cartTotalWeightEl.textContent = `${totalWeight.toFixed(1)} ${weightUnit()}`;
  }
}

function handleCheckout() {
  if (cart.length === 0) return;

  // نسخة بورتفوليو تجريبية: لا يوجد إرسال طلب حقيقي ولا رسالة واتساب.
  // نُظهر إشعاراً توضيحياً فقط ونفرّغ السلة.
  const demoMsg = currentLang === 'ar'
    ? '🛈 عرض تجريبي — إتمام الطلب غير مفعّل في هذه النسخة.'
    : '🛈 Demo — sipariş tamamlama bu sürümde etkin değildir.';
  showToast(demoMsg);
}

// --- PRODUCT DETAIL MODAL Quick View ---
function initModals() {
  const modal = document.getElementById('product-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      playUISound('close');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        playUISound('close');
      }
    });
  }
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const container = document.getElementById('modal-content-container');
  const modal = document.getElementById('product-modal');
  const trans = product.translations[currentLang];

  // Size Options HTML
  let sizeOptionsHtml = '';
  if (product.category === 'gifts') {
    sizeOptionsHtml = `<button class="option-pill active" data-size="${product.weightText[currentLang]}">${product.weightText[currentLang]}</button>`;
  } else {
    const sizeHalf = currentLang === 'ar' ? '0.5 كغ (نصف كيلو)' : '0.5 kg (Yarım kilo)';
    const sizeFull = currentLang === 'ar' ? '1.0 كغ (كيلو كامل)' : '1.0 kg (Tam kilo)';
    const sizeDouble = currentLang === 'ar' ? '2.0 كغ (علبة كبيرة)' : '2.0 kg (Büyük kutu)';
    
    sizeOptionsHtml = `
      <button class="option-pill active" data-size="0.5 كغ">${sizeHalf}</button>
      <button class="option-pill" data-size="1.0 كغ">${sizeFull}</button>
      <button class="option-pill" data-size="2.0 كغ">${sizeDouble}</button>
    `;
  }

  container.innerHTML = `
    <div class="modal-grid">
      <div class="modal-visual">
        <img src="${product.image}" alt="${trans.name}" />
      </div>
      <div class="modal-details">
        <span class="eyebrow-pill">${translateCategory(product.category)}</span>
        <h3>${trans.name}</h3>
        
        <div class="modal-price-row">
          <span id="modal-calculated-price" class="modal-price">${fmtPrice(product.basePrice)}</span>
          <span class="text-muted" id="modal-calculated-pieces">(${TRANSLATIONS[currentLang].modal_calculated_pieces} ${product.piecesText[currentLang]})</span>
        </div>

        <p class="modal-desc"><strong style="color:var(--color-primary);">${TRANSLATIONS[currentLang].modal_desc_label}</strong> ${trans.desc}</p>
        
        <div class="modal-options">
          <h4 class="options-title">${TRANSLATIONS[currentLang].modal_weight_label}</h4>
          <div class="option-pills" id="modal-size-options">
            ${sizeOptionsHtml}
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 2rem;">
          <h4 class="options-title" style="margin-bottom: 0.25rem;">${TRANSLATIONS[currentLang].modal_ingredients_label}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${trans.ingredients}</p>
        </div>

        <div class="form-group" style="margin-bottom: 2rem;">
          <h4 class="options-title" style="margin-bottom: 0.25rem;">${TRANSLATIONS[currentLang].modal_calories_label}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${trans.calories}</p>
        </div>

        <div style="margin-top: auto; display: flex; gap: 1rem;">
          <button id="modal-btn-add-to-cart" class="btn btn-primary" style="flex-grow: 1;">
            <span data-i18n="modal_add_btn">${TRANSLATIONS[currentLang].modal_add_btn}</span>
            <span class="btn-icon-circle">🛒</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach interactive logic for size selection in modal
  const sizePills = container.querySelectorAll('.option-pill');
  let selectedSize = product.weightText[currentLang];

  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSize = pill.getAttribute('data-size');
      playUISound('click');
      
      // Update price calculation in UI
      const calculatedPriceEl = document.getElementById('modal-calculated-price');
      const calculatedPiecesEl = document.getElementById('modal-calculated-pieces');
      let newPrice = product.basePrice;
      let piecesText = product.piecesText[currentLang];

      if (selectedSize.includes('1.0') || selectedSize === '1 كغ') {
        newPrice = Math.round(product.basePrice * 1.8);
        piecesText = currentLang === 'ar' ? '≈ 48-56 قطعة' : '≈ 48-56 adet';
      } else if (selectedSize.includes('2.0') || selectedSize === '2 كغ') {
        newPrice = Math.round(product.basePrice * 3.4);
        piecesText = currentLang === 'ar' ? '≈ 95-110 قطعة' : '≈ 95-110 adet';
      }

      calculatedPriceEl.textContent = fmtPrice(newPrice);
      if (product.category !== 'gifts') {
        calculatedPiecesEl.textContent = `(${TRANSLATIONS[currentLang].modal_calculated_pieces} ${piecesText})`;
      }
    });
  });

  // Attach add to cart inside modal
  const modalAddBtn = document.getElementById('modal-btn-add-to-cart');
  modalAddBtn.addEventListener('click', () => {
    addToCart(product.id, selectedSize);
    modal.classList.remove('active');
  });

  modal.classList.add('active');
  playUISound('click');
}

// Category Tabs Filters
function initFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');
      
      // Animate transition grid
      const grid = document.getElementById('products-grid-container');
      grid.style.opacity = '0';
      grid.style.transform = 'translateY(15px)';
      grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      playUISound('click');

      setTimeout(() => {
        renderProductsGrid(filterValue);
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 300);
    });
  });

  // Bento category links
  const bentoLinks = document.querySelectorAll('.bento-link');
  bentoLinks.forEach(link => {
    link.addEventListener('click', () => {
      const category = link.getAttribute('data-category');
      const matchingTab = document.querySelector(`.filter-tab[data-filter="${category}"]`);
      if (matchingTab) {
        matchingTab.click();
      }
    });
  });
}

// Toast System
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Quotes Slider
const QUOTES_AR = [
  {
    text: '"الحلويات تذكرني بأسواق الشام القديمة، السمن البلدي طعمه واضح جداً وجودة الفستق لا يعلى عليها. فعلاً أفضل بقلاوة تذوقتها خارج سوريا."',
    author: 'أبو مازن الدمشقي — خبير تذوق حلويات'
  },
  {
    text: '"اشتريت صندوق الهدايا الملكي لتقديمه كهدية لضيوفنا في عرس ابني، الجميع كان يسأل عن مصدر هذه الحلويات الفاخرة. بيّضتوا وجهنا."',
    author: 'أم أحمد الهاشم — سيدة أعمال'
  },
  {
    text: '"الكنافة النابلسية طازجة والجبنة تمط بشكل خيالي، الحلاوة متوازنة وليست ثقيلة. خدمة التوصيل المبرد كانت سريعة جداً ووصلت دافئة."',
    author: 'طارق عبد الله — عميل دائم'
  }
];

const QUOTES_TR = [
  {
    text: '"Şam tatlıları bana eski Şam çarşılarını hatırlatıyor. Hakiki sadeyağ lezzeti ve Antep fıstığının kalitesi inanılmaz. Suriye dışında yediğim en iyi baklava."',
    author: 'Ebu Mazen Ed-Dımaşki — Gurme'
  },
  {
    text: '"Oğlumun düğününde misafirlerimize ikram etmek için kraliyet ahşap kutusunu sipariş ettim, herkes bu nefis tatlıların kaynağını sordu. Çok teşekkürler."',
    author: 'Ümmü Ahmed El-Haşim — İş Kadını'
  },
  {
    text: '"Sıcak kadayıf künefesi nefisti ve peyniri harika erimişti. Şerbet dengesi yerindeydi, ağır değildi. Soğutmalı lojistik kargo da hızlı ulaştı."',
    author: 'Tarık Abdullah — Sürekli Müşteri'
  }
];

function initQuotes() {
  const quoteText = document.getElementById('current-quote');
  const quoteAuthor = document.getElementById('current-author');
  const dots = document.querySelectorAll('#quote-dots .dot');

  let currentIdx = 0;
  let intervalId = null;

  function setQuote(idx) {
    currentIdx = idx;
    dots.forEach(d => d.classList.remove('active'));
    if (dots[idx]) dots[idx].classList.add('active');

    if (quoteText && quoteAuthor) {
      quoteText.style.opacity = '0';
      quoteAuthor.style.opacity = '0';
      quoteText.style.transform = 'translateY(10px)';
      quoteText.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      quoteAuthor.style.transition = 'opacity 0.4s ease';

      setTimeout(() => {
        const quotesDb = currentLang === 'ar' ? QUOTES_AR : QUOTES_TR;
        quoteText.textContent = quotesDb[idx].text;
        quoteAuthor.textContent = quotesDb[idx].author;
        
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
        quoteText.style.transform = 'translateY(0)';
      }, 450);
    }
  }

  // Allow language toggle to re-render the visible quote immediately
  refreshCurrentQuote = () => setQuote(currentIdx);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'));
      setQuote(idx);
      resetAutoSlider();
      playUISound('click');
    });
  });

  function startAutoSlider() {
    intervalId = setInterval(() => {
      let nextIdx = (currentIdx + 1) % QUOTES_AR.length;
      setQuote(nextIdx);
    }, 8000);
  }

  function resetAutoSlider() {
    if (intervalId) clearInterval(intervalId);
    startAutoSlider();
  }

  startAutoSlider();
}

// Contact Form Handler
function initForms() {
  const form = document.getElementById('enquiry-form');
  const successMsg = document.getElementById('form-success-msg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      
      const loadingText = currentLang === 'ar' ? 'جاري الإرسال...' : 'Gönderiliyor...';
      submitBtn.innerHTML = `<span>${loadingText}</span>`;
      playUISound('click');

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Show success msg
        if (successMsg) successMsg.classList.remove('hidden');
        form.reset();

        setTimeout(() => {
          if (successMsg) successMsg.classList.add('hidden');
        }, 5000);

        playUISound('success');
        showToast(TRANSLATIONS[currentLang].toast_enquiry_sent);
      }, 1500);
    });
  }
}

// Highlight active section on scroll
function initScrollHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Mobile Hamburger Navigation Menu Morph and Expand
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileNavMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileNavMenu.classList.toggle('active');
      playUISound('click');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileNavMenu.classList.remove('active');
      });
    });
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section-header, .bento-item, .builder-container, .heritage-container, .testimonials-container, .contact-container, .footer-container');
  
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}
