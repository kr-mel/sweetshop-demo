// ✦ المصدر الوحيد لأسعار وأسماء المنتجات (Single Source of Truth)
// يُستورد من: الموقع (main.js)، ودماغ سامي التجريبي (chat-widget.js)،
// والـ Worker (worker/src/index.js). غيّر السعر هنا فقط ⇒ يتحدّث في كل مكان.
// ملاحظة: ملف بيانات نقي بلا DOM ولا صور، حتى يعمل بالمتصفح وبالـ Worker معاً.

export const SHOP_PRODUCTS = [
  { id: 'baklava-pistachio-extra', price: 85, ar: 'بقلاوة بالفستق الحلبي الفاخرة', tr: 'Lüks Antep Fıstıklı Şam Baklavası', en: 'Premium Pistachio Baklava' },
  { id: 'baklava-kol-w-shkor',     price: 90, ar: 'كول وشكور بالفستق (سوار الست)', tr: 'Fıstıklı Kol ve Şkür (Bülbül Yuvası)', en: 'Pistachio Bülbül Yuvası Rolls' },
  { id: 'kunafa-nabulsia-rough',   price: 60, ar: 'كنافة نابلسية بالجبن (خشنة)', tr: 'Peynirli Tel Künefe (Kadayıf)', en: 'Nabulsi Cheese Kunafa (coarse)' },
  { id: 'kunafa-nabulsia-smooth',  price: 65, ar: 'كنافة نابلسية بالجبن (ناعمة)', tr: 'Şam Usulü Yumuşak Peynirli Künefe', en: 'Nabulsi Cheese Kunafa (smooth)' },
  { id: 'maamoul-pistachio',       price: 75, ar: 'معمول فاخر بالفستق الحلبي', tr: 'Lüks Antep Fıstıklı Mamul', en: 'Premium Pistachio Maamoul' },
  { id: 'maamoul-dates',           price: 50, ar: 'معمول بالتمر البلدي (العجوة)', tr: 'Hurmalı Geleneksel Mamul', en: 'Date Maamoul' },
  { id: 'gift-box-wooden',         price: 280, ar: 'صندوق حلويات الشام الخشبي الملكي', tr: 'Kraliyet Ahşap Şam Karışık Kutusu', en: 'Royal Wooden Mixed Gift Box' },
  { id: 'gift-box-emerald',        price: 160, ar: 'علبة الهدايا المخملية الزمردية', tr: 'Zümrüt Yeşil Lüks Kadife Hediye Kutusu', en: 'Emerald Velvet Gift Box' },
]

export const BOX_SIZES = [
  { id: '1kg', price: 1300, ar: 'علبة مشكّلة 1 كغ', tr: 'Karışık kutu 1 kg', en: 'Build-your-own box 1 kg' },
  { id: '2kg', price: 2400, ar: 'علبة مشكّلة 2 كغ', tr: 'Karışık kutu 2 kg', en: 'Build-your-own box 2 kg' },
]

// سعر منتج حسب الـ id (يستعمله الموقع لتغذية basePrice)
export function priceById(id) {
  const p = SHOP_PRODUCTS.find((x) => x.id === id)
  return p ? p.price : null
}

// نص قائمة جاهز بلغة معيّنة (يستعمله سامي + الدماغ التجريبي)
export function menuText(lang = 'ar') {
  const L = ['ar', 'tr', 'en'].includes(lang) ? lang : 'ar'
  const lines = SHOP_PRODUCTS.map((p) => `• ${p[L]} — ${p.price}₺`)
  const box = BOX_SIZES.map((b) => `${b[L]} ${b.price}₺`).join(' · ')
  return lines.join('\n') + `\n• ${box}`
}
