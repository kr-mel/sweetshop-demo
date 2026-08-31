# حلويات الشام · Şam Tatlıları

متجر حلويات شامية فاخر — موقع واجهة سريع، ثنائي اللغة (عربي / تركي)، متجاوب.
A premium Damascus sweet-shop storefront — fast, bilingual (Arabic / Turkish), responsive.

## ✨ المميزات / Features

- **ثنائي اللغة + RTL** — تبديل فوري بين العربية (RTL) والتركية (LTR).
- **قائمة منتجات** بصور حقيقية + فلاتر (بقلاوة، كنافة، معمول، صناديق هدايا).
- **صانع علبة مخصصة** — اختر الحجم وامزج الحلويات بنسب مئوية.
- **سلة تسوّق** مع حفظ محلي وإتمام الطلب عبر **واتساب**.
- **فرعان** مع روابط خرائط جوجل.
- هوية دمشقية فاخرة: نقش زخرفي، لمسات ذهبية، خطوط Amiri / Reem Kufi / Cairo.

## 🚀 التشغيل / Getting started

```bash
npm install
npm run dev        # خادم التطوير / dev server
npm run build      # بناء الإنتاج إلى dist/
npm run preview    # معاينة بناء الإنتاج
```

## ⚙️ الإعداد / Configuration

أنشئ ملف `src/config.local.js` من `src/config.js` وعدّل القيم:

```js
// src/config.local.js
export const SITE_CONFIG = {
  shopName: 'اسم المحل',
  shopSubtitle: 'الشعار',
  branches: [
    { name: 'الفرع الأول', address: 'العنوان', mapUrl: 'رابط_الخرائط', phone: 'الهاتف' },
    { name: 'الفرع الثاني', address: 'العنوان', mapUrl: 'رابط_الخرائط', phone: 'الهاتف' }
  ],
  phone: '+90 xxx xxx xx xx',
  whatsapp: '+90 xxx xxx xx xx',
  instagram: '@handle',
  instagramUrl: 'https://instagram.com/handle',
  facebookUrl: 'https://facebook.com/page',
  hours: 'أوقات العمل',
  shipping: 'معلومات الشحن',
  seoTitle: 'عنوان SEO',
  seoDescription: 'وصف SEO',
  seoKeywords: 'كلمات مفتاحية',
  boxSizes: [
    { id: '1kg', label: 'علبة 1 كغ', price: 1300 },
    { id: '2kg', label: 'علبة 2 كغ', price: 2400 }
  ]
};
```

الملف `config.local.js` في `.gitignore` ولا يرفع للـ Git.

## 🌐 النشر / Deployment

عند الدفع إلى `main` يبني المشروع وينشره تلقائياً على **GitHub Pages**
عبر `.github/workflows/deploy.yml`. الـ `base` نسبي فيعمل على أي مضيف ثابت.

## 📄 أرصدة الصور

انظر [`IMAGE-CREDITS.md`](IMAGE-CREDITS.md).