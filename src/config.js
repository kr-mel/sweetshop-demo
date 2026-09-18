// Portfolio demo configuration — placeholder data only (no real business info).
// This is a personal showcase project; contact details below are fictional.

export const SITE_CONFIG = {
  // Shop info
  shopName: 'حلويات الشام',
  shopSubtitle: 'الذوق الشامي الأصيل',

  // Branches (demo / placeholder)
  branches: [
    {
      name: { ar: 'الفرع الأول', tr: 'Birinci Şube' },
      address: {
        ar: 'شارع تجريبي، وسط المدينة (عرض توضيحي)',
        tr: 'Örnek Cadde, Şehir Merkezi (demo)'
      },
      mapUrl: '#',
      phone: '+90 500 000 00 00'
    },
    {
      name: { ar: 'الفرع الثاني', tr: 'İkinci Şube' },
      address: {
        ar: 'شارع تجريبي آخر، المدينة (عرض توضيحي)',
        tr: 'Başka Örnek Cadde, Şehir (demo)'
      },
      mapUrl: '#',
      phone: ''
    }
  ],

  // Contact (demo / placeholder)
  phone: '+90 500 000 00 00',
  whatsapp: '+90 500 000 00 00',
  instagram: '@demo.sweets',
  instagramUrl: '#',
  facebookUrl: '#',

  // Hours (demo)
  hours: {
    ar: 'يومياً · مواعيد تجريبية للعرض',
    tr: 'Her gün · gösterim amaçlı örnek saatler'
  },

  // Shipping
  shipping: {
    ar: 'توصيل محلي سريع، وشحن مبرد وآمن لجميع المناطق للمحافظة على الجودة.',
    tr: 'Hızlı yerel teslimat ve kaliteyi korumak için tüm bölgelere güvenli soğutmalı kargo.'
  },

  // SEO
  seoTitle: 'حلويات الشام | أصالة المذاق الدمشقي العريق',
  seoDescription: 'موقع تجريبي لعرض المهارات — حلويات شرقية دمشقية فاخرة: بقلاوة بالفستق الحلبي، كنافة نابلسية، معمول فاخر.',
  seoKeywords: 'حلويات الشام, بقلاوة شامية, كنافة نابلسية, معمول فستق, حلويات دمشقية, حلويات شرقية فاخرة, portfolio demo',

  // Box builder pricing
  boxSizes: [
    { id: '1kg', label: 'علبة بوزن 1 كغ', price: 1300 },
    { id: '2kg', label: 'علبة بوزن 2 كغ', price: 2400 }
  ],

  // بوت سامي متصل بـ Worker آمن (المفتاح محفوظ كـ secret على السيرفر، لا يظهر هنا).
  // بيانات تجريبية فقط — لا يسرّب أي رقم/عنوان حقيقي. الدماغ المحلي احتياطي إن تعذّر.
  chatApiUrl: 'https://sami-agent-api.vercel.app/api/chat'
};

export default SITE_CONFIG;
