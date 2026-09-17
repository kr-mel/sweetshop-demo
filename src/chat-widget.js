// "سامي" — شات ويدجت حلويات الشام
// يحكي مع Cloudflare Worker (SITE_CONFIG.chatApiUrl) اللي يكلّم Gemini.
import { SITE_CONFIG } from './config.js'
import { menuText } from './shop-products.js'

// نصوص الويدجت بثلاث لغات
const UI = {
  ar: {
    title: 'سامي · حلويات الشام',
    status: 'يردّ عادةً خلال لحظات',
    open: 'تحدّث معنا',
    placeholder: 'اكتب رسالتك…',
    send: 'إرسال',
    greeting: 'أهلاً وسهلاً! 🌰 أنا سامي من حلويات الشام. كيف فيني أساعدك اليوم؟ بتحب تعرف عن البقلاوة، الكنافة، أو علب الهدايا؟',
    error: 'عذراً، صار خطأ مؤقت. جرّب مرة ثانية 🙏',
    offline: 'هذا عرض تجريبي — الطلب والتواصل غير مفعّلين في هذه النسخة.',
  },
  tr: {
    title: 'Sami · Şam Tatlıları',
    status: 'Genellikle hemen yanıtlar',
    open: 'Bize yazın',
    placeholder: 'Mesajınızı yazın…',
    send: 'Gönder',
    greeting: 'Hoş geldiniz! 🌰 Ben Şam Tatlıları’ndan Sami. Size nasıl yardımcı olabilirim? Baklava, künefe veya hediye kutuları hakkında bilgi almak ister misiniz?',
    error: 'Üzgünüm, geçici bir hata oluştu. Lütfen tekrar deneyin 🙏',
    offline: 'Bu bir demo — sipariş ve iletişim bu sürümde etkin değildir.',
  },
  en: {
    title: 'Sami · Şam Tatlıları',
    status: 'Usually replies in moments',
    open: 'Chat with us',
    placeholder: 'Type your message…',
    send: 'Send',
    greeting: 'Welcome! 🌰 I’m Sami from Şam Tatlıları. How can I help you today? Want to know about our baklava, kunafa, or gift boxes?',
    error: 'Sorry, a temporary error occurred. Please try again 🙏',
    offline: 'This is a demo — ordering and contact are disabled in this version.',
  },
}

function detectLang() {
  const docLang = document.documentElement.lang
  if (docLang === 'tr') return 'tr'
  if (docLang === 'en') return 'en'
  return 'ar'
}

// ── الدماغ التجريبي (يعمل بدون سيرفر، للعرض على العميل) ──────────
// يردّ على الأسئلة الشائعة من معرفة محلية. يُستبدل تلقائياً بـ Gemini
// عند ضبط SITE_CONFIG.chatApiUrl.
const MENU_INTRO = {
  ar: 'قائمتنا الفاخرة 🌰:\n',
  tr: 'Lüks menümüz 🌰:\n',
  en: 'Our luxury menu 🌰:\n',
}

const DEMO_KB = {
  // قائمة الأسعار تُبنى من المصدر الموحّد shop-products.js (صفر تكرار)
  products: {
    ar: MENU_INTRO.ar + menuText('ar'),
    tr: MENU_INTRO.tr + menuText('tr'),
    en: MENU_INTRO.en + menuText('en'),
  },
  hours: {
    ar: 'مواعيد العمل هنا تجريبية للعرض فقط 🕖',
    tr: 'Çalışma saatleri yalnızca gösterim amaçlıdır 🕖',
    en: 'Opening hours here are for demo purposes only 🕖',
  },
  location: {
    ar: 'هذا عرض تجريبي 📍 لا يوجد عنوان أو موقع حقيقي.',
    tr: 'Bu bir demo 📍 gerçek adres veya konum yoktur.',
    en: 'This is a demo 📍 no real address or location.',
  },
  delivery: {
    ar: 'عنا توصيل محلي وشحن مبرّد للحفاظ على الجودة (وصف تجريبي للعرض) 🚚',
    tr: 'Yerel teslimat ve soğuk zincir kargo (gösterim amaçlı açıklama) 🚚',
    en: 'Local delivery and refrigerated shipping (demo description) 🚚',
  },
}

const DEMO_INTENTS = [
  { key: 'hours', words: ['دوام', 'ساعات', 'وقت', 'مفتوح', 'بتفتح', 'بتسكر', 'saat', 'açık', 'kaçta', 'hour', 'open', 'close'] },
  { key: 'location', words: ['وين', 'عنوان', 'فرع', 'مكان', 'موقع', 'nerede', 'adres', 'şube', 'konum', 'where', 'address', 'branch', 'location'] },
  { key: 'delivery', words: ['توصيل', 'شحن', 'يوصل', 'kargo', 'teslimat', 'gönder', 'delivery', 'ship', 'shipping'] },
  // أي سؤال عن منتج/سعر يعرض القائمة الكاملة (من المصدر الموحّد)
  { key: 'products', words: ['منتج', 'قائمة', 'منيو', 'شو عندكم', 'ايش', 'بقلاوة', 'بقلاوه', 'كنافة', 'كنافه', 'معمول', 'هدية', 'هدايا', 'علبة', 'صندوق', 'سوار', 'تمر', 'menü', 'ürün', 'fiyat', 'baklava', 'künefe', 'kunafa', 'mamul', 'maamoul', 'hediye', 'kutu', 'bülbül', 'سعر', 'اسعار', 'بكم', 'كم', 'price', 'menu', 'products', 'list', 'gift', 'box'] },
]

function demoReply(text, lang) {
  const q = text.toLowerCase()
  for (const intent of DEMO_INTENTS) {
    if (intent.words.some((w) => q.includes(w.toLowerCase()))) {
      return DEMO_KB[intent.key][lang] || DEMO_KB[intent.key].ar
    }
  }
  return null // لا تطابق → تُعرض رسالة العرض التجريبي
}

export function initChatWidget() {
  let lang = detectLang()
  let t = UI[lang]
  let open = false
  let busy = false
  const history = [] // [{role:'user'|'model', text}]

  // ── بناء العناصر ──────────────────────────────────────────
  const root = document.createElement('div')
  root.className = 'sami-widget'
  root.dir = lang === 'ar' ? 'rtl' : 'ltr'
  root.innerHTML = `
    <button class="sami-fab" aria-label="${t.open}">
      <svg class="sami-fab-chat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <svg class="sami-fab-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="sami-panel" role="dialog" aria-label="${t.title}">
      <div class="sami-head">
        <div class="sami-avatar">س</div>
        <div class="sami-head-info">
          <strong class="sami-title">${t.title}</strong>
          <span class="sami-status"><i></i>${t.status}</span>
        </div>
      </div>
      <div class="sami-messages" aria-live="polite"></div>
      <form class="sami-input">
        <input type="text" class="sami-field" placeholder="${t.placeholder}" autocomplete="off" maxlength="1000" />
        <button type="submit" class="sami-send" aria-label="${t.send}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </form>
    </div>
  `
  document.body.appendChild(root)

  const fab = root.querySelector('.sami-fab')
  const panel = root.querySelector('.sami-panel')
  const messages = root.querySelector('.sami-messages')
  const form = root.querySelector('.sami-input')
  const field = root.querySelector('.sami-field')

  // ── دوال مساعدة ───────────────────────────────────────────
  function scrollDown() {
    messages.scrollTop = messages.scrollHeight
  }

  // تنسيق آمن: نهرب HTML أولاً (منع XSS) ثم نحوّل ماركداون البوت البسيط
  // (**عريض**، *مائل*، أسطر جديدة) لأن Gemini يرجّع ماركداون يظهر خاماً لولا ذلك.
  function escapeHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  function formatReply(text) {
    let s = escapeHtml(text)
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    s = s.replace(/^\s*[*-]\s+/gm, '• ') // عناصر القوائم → نقاط
    s = s.replace(/\n/g, '<br>')
    return s
  }

  function addMessage(text, who) {
    const el = document.createElement('div')
    el.className = `sami-msg sami-msg-${who}`
    if (who === 'bot') {
      el.innerHTML = formatReply(text)
    } else {
      el.textContent = text
    }
    messages.appendChild(el)
    scrollDown()
    return el
  }

  function addTyping() {
    const el = document.createElement('div')
    el.className = 'sami-msg sami-msg-bot sami-typing'
    el.innerHTML = '<span></span><span></span><span></span>'
    messages.appendChild(el)
    scrollDown()
    return el
  }

  function toggle(force) {
    open = typeof force === 'boolean' ? force : !open
    root.classList.toggle('sami-open', open)
    if (open) {
      if (!messages.dataset.greeted) {
        addMessage(t.greeting, 'bot')
        messages.dataset.greeted = '1'
      }
      setTimeout(() => field.focus(), 300)
    }
  }

  async function send(text) {
    if (busy || !text.trim()) return
    busy = true
    addMessage(text, 'user')
    history.push({ role: 'user', text })
    field.value = ''

    // نسخة بورتفوليو تجريبية: دماغ محلي فقط، بدون رقم/واتساب/تواصل حقيقي.
    if (!SITE_CONFIG.chatApiUrl) {
      const typing = addTyping()
      await new Promise((r) => setTimeout(r, 600)) // إحساس طبيعي بالكتابة
      typing.remove()
      const answer = demoReply(text, lang)
      const reply = answer || t.offline
      addMessage(reply, 'bot')
      history.push({ role: 'model', text: reply })
      busy = false
      return
    }

    const typing = addTyping()
    try {
      const res = await fetch(SITE_CONFIG.chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
      })
      const data = await res.json()
      typing.remove()
      const reply = data.reply || data.error || t.error
      addMessage(reply, 'bot')
      history.push({ role: 'model', text: reply })
    } catch {
      typing.remove()
      addMessage(t.error, 'bot')
    } finally {
      busy = false
    }
  }

  // ── الأحداث ───────────────────────────────────────────────
  fab.addEventListener('click', () => toggle())
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    send(field.value)
  })

  // وصولية: إغلاق الشات بزر Escape وإعادة التركيز للزر العائم
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      toggle(false)
      fab.focus()
    }
  })

  // تحديث اللغة عند تبديلها في الموقع
  const langObserver = new MutationObserver(() => {
    const newLang = detectLang()
    if (newLang !== lang) {
      lang = newLang
      t = UI[lang]
      root.dir = lang === 'ar' ? 'rtl' : 'ltr'
      root.querySelector('.sami-title').textContent = t.title
      root.querySelector('.sami-status').innerHTML = `<i></i>${t.status}`
      field.placeholder = t.placeholder
      fab.setAttribute('aria-label', t.open)
    }
  })
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })
}
