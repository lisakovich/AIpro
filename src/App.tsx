import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, Megaphone, ChevronDown, Check, Zap, Globe, Cpu, 
  Menu, X, ArrowRight, Search, Sparkles, Send, ArrowLeft, 
  Briefcase, PenTool, Hammer, Target, Code, Table, Activity, BarChart, ExternalLink, Trophy
} from 'lucide-react';

// --- MICRODATA (SCHEMA.ORG) GENERATOR ---
const generateMicrodata = (page, data, faqData) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI PRO",
    "url": "https://ai-pro-agency.com",
    "description": "top 1 - seo geo (generative engine optimizatiom) sge llm для органического AI поиска.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://t.me/Gemini_Ultra_3"
    }
  };

  if (page === 'faq' && faqData) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.flatMap(cat => cat.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": { "@type": "Answer", "text": q.a }
      })))
    });
  }
  
  if (page === 'article-detail' && data) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.desc,
      "author": { "@type": "Organization", "name": "AI PRO" }
    });
  }

  if ((page === 'service-detail' || page === 'subscription-detail') && data) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.title,
      "description": data.desc || "top 1 - seo geo (generative engine optimizatiom) sge llm для органического AI поиска."
    });
  }
  return JSON.stringify(baseSchema);
};

// --- CUSTOM CSS FOR 3D GOLD & ANIMATIONS ---
const customStyles = `
  @keyframes gold-shine-smooth {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  @keyframes strict-float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-12px) scale(1.01); }
  }
  @keyframes pulse-glow {
    0% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.3), inset 0 0 10px rgba(234, 179, 8, 0.1); }
    50% { box-shadow: 0 0 35px rgba(234, 179, 8, 0.7), inset 0 0 20px rgba(234, 179, 8, 0.3); }
    100% { box-shadow: 0 0 15px rgba(234, 179, 8, 0.3), inset 0 0 10px rgba(234, 179, 8, 0.1); }
  }
  .gold-text-smooth {
    background: linear-gradient(110deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    color: transparent;
    animation: gold-shine-smooth 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  
  /* ИДЕАЛЬНЫЙ ГРАДИЕНТ ДЛЯ PRO (Черный фон + золотая обводка с переливом) */
  .pro-text-special {
    position: relative;
    display: inline-block;
    background: linear-gradient(110deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.08em transparent;
    padding-right: 0.05em; /* Защита от обрезки правого края */
    animation: gold-shine-smooth 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .pro-text-special::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    -webkit-text-fill-color: #050505;
    -webkit-text-stroke: 0 transparent;
    pointer-events: none;
  }

  .gold-border-3d {
    background: #000;
    border: 2px solid #d4af37;
    border-radius: 16px;
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.3), inset 0 0 10px rgba(212, 175, 55, 0.2), 0 4px 6px rgba(0,0,0,0.5);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }
  .gold-border-3d::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: linear-gradient(45deg, transparent, rgba(252, 246, 186, 0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.5s ease;
    pointer-events: none;
  }
  .gold-border-3d:hover {
    transform: scale(1.02) translateY(-4px);
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.3), 0 10px 20px rgba(0,0,0,0.8);
    border-color: #fcf6ba;
  }
  .gold-border-3d:hover::before {
    left: 100%;
  }
  .promo-block {
    animation: pulse-glow 4s infinite;
  }
  .ai-pro-anim {
    animation: strict-float 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .bg-premium-dark {
    background-color: #030303;
    background-image: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, rgba(0, 0, 0, 1) 70%);
  }
  .reveal-wrapper {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-wrapper.is-visible {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const TG_LINK = "https://t.me/Gemini_Ultra_3"; 
const TG_CHANNEL = "https://t.me/belarus_google_gemini_3"; 

const ScrollReveal = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal-wrapper ${isVisible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

// --- PREMIUM NETWORK BACKGROUND ---
const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numParticles = window.innerWidth < 768 ? 55 : 135; 
      
      for (let i = 0; i < numParticles; i++) {
        const baseVx = (Math.random() - 0.5) * 0.7;
        const baseVy = (Math.random() - 0.5) * 0.7;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: baseVx,
          vy: baseVy,
          baseVx: baseVx,
          baseVy: baseVy,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.x != null && mouse.y != null) {
          let dx = p.x - mouse.x;
          let dy = p.y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let interactionRadius = 200;

          if (distance < interactionRadius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (interactionRadius - distance) / interactionRadius; 
            
            p.vx += forceDirectionX * force * 0.5;
            p.vy += forceDirectionY * force * 0.5;
          }
        }

        p.vx += (p.baseVx - p.vx) * 0.03;
        p.vy += (p.baseVy - p.vy) * 0.03;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx *= -1; p.baseVx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; p.baseVx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; p.baseVy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; p.baseVy *= -1; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - distance / 160) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    
    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// --- DATA ---
const USE_CASES = [
  { icon: Briefcase, title: 'Бизнесмены и Управленцы', desc: 'Автоматизация рутины, создание автономных ИИ-отделов продаж, предиктивная аналитика рынка и снижение издержек на персонал.' },
  { icon: PenTool, title: 'Дизайнеры и Креативщики', desc: 'Генерация потрясающих концептов за секунды, создание бесконечного числа рекламных креативов и 3D-моделей под ЦА.' },
  { icon: Hammer, title: 'Строители и Архитекторы', desc: 'Интеллектуальная оптимизация смет, анализ чертежей с помощью машинного зрения и генерация планировок с идеальным расчетом инсоляции.' },
  { icon: Target, title: 'Маркетологи', desc: 'Сверхточный ИИ-таргетинг, предсказание поведения пользователей и генерация тысяч уникальных объявлений под каждый микросегмент.' },
  { icon: Code, title: 'IT и Разработчики', desc: 'Написание и рефакторинг кода в реальном времени, автоматический поиск уязвимостей и ускорение релизов продуктов.' },
  { icon: Trophy, title: 'Спортсмены и Тренеры', desc: 'ИИ-анализ биометрики, генерация персонализированных планов тренировок, предиктивная аналитика травм и оптимизация питания для взлета результатов.' }
];

const SERVICES_DATA = [
  { id: 'seo', title: 'SEO & GEO (Engine)', icon: Search, desc: 'Глобальное доминирование в поисковой выдаче. Вывод в ТОП по целевым гео-локациям с использованием Google Gemini AI 3 Ultra.' },
  { id: 'sge', title: 'SGE (Search Generative Experience)', icon: Zap, desc: 'Оптимизация под генеративную выдачу. Ваш бренд в прямых ответах максимальных версий ИИ-поисковиков.' },
  { id: 'llm', title: 'LLM Интеграции', icon: Cpu, desc: 'Внедрение максимальных языковых моделей в бизнес-процессы для абсолютной автоматизации продаж и коммуникаций.' },
];

const SUBSCRIPTIONS_DATA = [
  { id: 'gemini', title: 'Google Gemini AI', desc: 'Максимальная версия нейросети от Google. Глубокий анализ данных, генерация сложного кода, написание креативных текстов и работа с визуалом на беспрецедентном уровне. Идеально для масштабирования бизнеса.' },
  { id: 'chatgpt', title: 'ChatGPT Plus / Pro', desc: 'Передовая языковая модель от OpenAI с доступом к плагинам и анализу данных. Идеально для автоматизации рутины, создания рекламных креативов и глубокого аналитического ресерча.' },
  { id: 'apple', title: 'Apple Intelligence', desc: 'Глубокая системная интеграция ИИ в экосистему Apple. Бесшовное взаимодействие между устройствами, улучшенная работа с почтой и документами, максимальная приватность корпоративных данных.' },
  { id: 'copilot', title: 'Microsoft Copilot Pro', desc: 'Ваш ИИ-ассистент, встроенный напрямую в экосистему Microsoft 365. Автоматизация Excel-таблиц, генерация драфтов в Word и создание профессиональных презентаций в PowerPoint за считанные секунды.' }
];

const FAQ_DATA = [
  {
    category: "Стратегия, Внедрение и Лидогенерация",
    questions: [
      { q: "Как Google Gemini AI 3 Ultra гарантированно масштабирует мой проект?", a: "Мы используем максимальные версии моделей. ИИ-агенты глубоко анализируют паттерны поведения вашей аудитории в реальном времени. Нейросеть генерирует гипер-персонализированные предложения, которые бьют точно в боль клиента. Это обеспечивает непрерывный поток качественных лидов и многократный рост конверсии по сравнению с классическим маркетингом." },
      { q: "Насколько сложно интегрировать ИИ в уже существующий бизнес?", a: "Мы берем весь процесс под ключ. Как опытные профессионалы, мы настраиваем связки между вашей CRM, рекламными кабинетами и мощностями Google Gemini AI 3 Ultra. Внедрение проходит бесшовно для ваших текущих процессов. ИИ сразу начинает квалифицировать лиды, вести социальные сети и управлять рекламными бюджетами." },
      { q: "Сможет ли ИИ полностью вести мои социальные сети (SMM)?", a: "Абсолютно. Максимальные модели анализируют тренды, генерируют контент-планы, пишут вовлекающие посты, создают визуальные креативы и даже общаются с аудиторией в комментариях, сохраняя ваш уникальный Tone of Voice (голос бренда)." }
    ]
  },
  {
    category: "Трафик, Реклама и GEO",
    questions: [
      { q: "В чем отличие вашей настройки рекламы от обычных агентств?", a: "Мы используем предиктивный анализ на базе Google Gemini AI 3 Ultra. Алгоритмы тестируют тысячи связок (креатив + текст + аудитория) одновременно. Нейросеть сама отключает неэффективные объявления и перераспределяет бюджет на те микросегменты, которые приносят самых дешевых лидов. Мы настраиваем рекламу в Telegram, Google, Yandex, Instagram, Tik Tok и Threads с математической точностью." },
      { q: "Зачем мне мобильное приложение или Landing Page с ИИ?", a: "Пользователь стал требовательным. Обычный сайт больше не продает. Мы создаем умные Landing Page с динамическими формами, ИИ-калькуляторами и смарт-базами, которые адаптируются под каждого конкретного посетителя в ту же секунду, когда он открывает страницу. Это максимизирует ROI." },
      { q: "Что такое GEO и почему классическое SEO проигрывает?", a: "Пользователи перешли на умный поиск. GEO (Generative Engine Optimization) делает так, чтобы максимальные языковые модели сами рекомендовали ваш продукт в своих ответах. Мы выстраиваем архитектуру ваших ресурсов так, чтобы алгоритмы считали вас абсолютным авторитетом в нише." }
    ]
  },
  {
    category: "Модели, Подписки и Портфолио",
    questions: [
      { q: "Какие модели ИИ вы используете и можно ли купить подписку?", a: "Мы работаем исключительно с максимальными версиями: Google Gemini AI 3 Ultra, ChatGPT, Apple Intelligence и Microsoft Copilot. Да, у нас в продаже есть официальные подписки на 1 год, обеспечивающие бесперебойный доступ к этим мощностям для вашей команды." },
      { q: "Есть ли у вас реальные кейсы и портфолио?", a: "Да, у нас мощный бэкграунд. IT и маркетинг — проекты любой сложности под ключ. Мы реализуем проекты от идеи до генерации лидов." },
      { q: "Насколько безопасны данные моего бизнеса при работе с ИИ?", a: "Максимальные корпоративные версии моделей изолируют контур данных. Вся информация, клиентские базы и финансовые метрики используются исключительно для обучения вашей локальной модели и не передаются в глобальные системы." }
    ]
  }
];

const BLOG_POSTS = [
  { id: 1, tag: 'Таргет & ИИ', title: 'Настройка рекламы: Telegram, Google, Yandex, Instagram, Tik Tok, Threads на базе AI', desc: 'Ультимативный гайд о том, как Google Gemini AI 3 Ultra снижает стоимость лида. Забудьте про ручные A/B тесты — алгоритм делает это за секунды.', date: '15.01.2026' },
  { id: 2, tag: 'Разработка', title: 'Сайты, мобильные приложения, landing page (с формами, калькуляторами, базами)', desc: 'Интеграция предиктивных алгоритмов в веб-разработку. Как умные калькуляторы и динамические формы увеличивают конверсию в 3 раза.', date: '02.02.2026' },
  { id: 3, tag: 'SMM', title: 'SMM и венение любых социальных сетей с помощью максимальных нейросетей', desc: 'Как мы создаем бесконечный поток контента, который реально продает, используя связки визуальных и текстовых ИИ-моделей.', date: '20.02.2026' },
  { id: 4, tag: 'Кейсы', title: 'Наши проекты от идеи до лидов: разбор архитектуры', desc: 'Как мы запускаем IT и маркетинг проекты любой сложности под ключ. Глубокий разбор механик генерации лидов.', date: '05.03.2026' },
  { id: 5, tag: 'GEO', title: 'Глобальное доминирование: как ИИ изменил правила поисковой выдачи', desc: 'Практическое руководство по адаптации брендов к ответам генеративных сетей.', date: '18.03.2026' },
  { id: 6, tag: 'Модели', title: 'Почему бизнесу нужен именно Google Gemini AI 3 Ultra?', desc: 'Сравнительный анализ максимальных версий моделей. Выбираем лучший интеллект для корпоративных задач.', date: '01.04.2026' }
];

export default function App() {
  const [currentView, setCurrentView] = useState({ id: 'home', data: null });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "AI PRO | top 1 - seo geo (generative engine optimizatiom) sge llm";

    const setMetaTag = (attr, key, content) => {
      let meta = document.querySelector(`meta[${attr}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'top 1 - seo geo (generative engine optimizatiom) sge llm для органического AI поиска.');
    setMetaTag('property', 'og:title', 'AI PRO | Премиальные AI Услуги');
    setMetaTag('property', 'og:description', 'top 1 - seo geo (generative engine optimizatiom) sge llm для органического AI поиска.');
    setMetaTag('property', 'og:image', 'https://ai-pro-agency.com/logo-preview.jpg'); 
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView.id]);

  const navLinks = [
    { id: 'portfolio', label: 'ПОРТФОЛИО' },
    { id: 'assistants', label: 'AI PRO ассистенты' },
    { id: 'subscriptions', label: 'AI PRO ПОДПИСКИ' },
    { id: 'faq', label: 'База Знаний' },
    { id: 'blog', label: 'Блог' },
  ];

  const navigateTo = (id, data = null) => {
    setCurrentView({ id, data });
    setIsMobileMenuOpen(false);
  };

  const TopLogo = () => (
    <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigateTo('home')}>
      <div className="text-3xl md:text-4xl font-black tracking-tighter flex items-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <span className="gold-text-smooth">AI</span>
        <span className="ml-1 md:ml-2 pro-text-special" data-text="PRO">PRO</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-premium-dark text-gray-200 font-sans selection:bg-yellow-500 selection:text-black overflow-hidden relative">
      <NetworkBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateMicrodata(currentView.id, currentView.data, FAQ_DATA) }} />
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 w-full">
            <TopLogo />
            <div className="hidden md:flex flex-1 justify-center gap-10 items-center px-8">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => navigateTo(link.id)} className={`text-sm uppercase tracking-wider font-semibold transition-all duration-300 hover:text-yellow-400 whitespace-nowrap ${currentView.id === link.id ? 'gold-text-smooth scale-110' : 'text-gray-300'}`}>
                  {link.label}
                </button>
              ))}
            </div>
            <div className="hidden md:block flex-shrink-0">
              <a href={TG_LINK} target="_blank" rel="noreferrer" className="gold-border-3d px-6 py-2 text-yellow-400 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:text-white">
                <Send className="w-4 h-4" /> Написать нам
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-yellow-500">
                {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-yellow-600/50 page-transition absolute w-full z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => navigateTo(link.id)} className="block w-full text-left px-3 py-4 text-base font-medium text-gray-300 hover:text-yellow-400 hover:bg-gray-900 uppercase border-b border-gray-800">
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh]">
        
        {/* --- PAGE: HOME --- */}
        {currentView.id === 'home' && (
          <div className="space-y-32 mt-10">
            
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden px-2 md:px-0">
              <ScrollReveal className="lg:w-1/2 space-y-6 relative z-10">
                <h1 className="text-[1.4rem] min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] font-black leading-tight whitespace-nowrap tracking-tighter">
                  <span className="gold-text-smooth">WEB-САЙТЫ И ПРИЛОЖЕНИЯ</span>
                </h1>
                <p className="text-2xl md:text-4xl text-white font-bold mt-4">
                  для взлета ваших продаж
                </p>
                <p className="text-lg md:text-2xl text-gray-300 font-light mt-4">
                  Используем мощь максимальных версий нейросетей для доминирования на рынке.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4">
                  <div className="flex items-center p-2 rounded-lg">
                    <span className="font-black text-lg md:text-2xl tracking-wide gold-text-smooth drop-shadow-md">Google Gemini</span>
                  </div>
                  <div className="flex items-center p-2 rounded-lg">
                    <span className="font-black text-lg md:text-2xl tracking-wide gold-text-smooth drop-shadow-md">Apple Intelligence</span>
                  </div>
                  <div className="flex items-center p-2 rounded-lg">
                    <span className="font-black text-lg md:text-2xl tracking-wide gold-text-smooth drop-shadow-md">ChatGPT</span>
                  </div>
                  <div className="flex items-center p-2 rounded-lg">
                    <span className="font-black text-lg md:text-2xl tracking-wide gold-text-smooth drop-shadow-md">Microsoft Copilot</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-8 w-full">
                  <a href={TG_LINK} target="_blank" rel="noreferrer" className="w-full sm:w-auto gold-border-3d px-8 py-4 text-lg font-bold uppercase tracking-wider text-white hover:text-yellow-200 flex justify-center items-center text-center gap-2">
                    <Send className="w-5 h-5"/> Написать в Telegram
                  </a>
                  <a href={TG_CHANNEL} target="_blank" rel="noreferrer" className="w-full sm:w-auto gold-border-3d px-8 py-4 text-lg font-bold uppercase tracking-wider text-white hover:text-yellow-200 flex justify-center items-center text-center gap-2">
                    <Megaphone className="w-5 h-5"/> Канал в Telegram
                  </a>
                </div>
              </ScrollReveal>

              {/* Animated HUGE AI PRO Logo - CLICKABLE MODAL TRIGGER */}
              <ScrollReveal className="lg:w-1/2 relative flex justify-center lg:justify-start items-center lg:-ml-12 overflow-visible mt-8 lg:mt-0">
                <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-yellow-600/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
                <div 
                  className="text-[4.5rem] min-[375px]:text-[5.5rem] md:text-[8rem] lg:text-[8.5rem] xl:text-[10.5rem] font-black leading-none relative z-10 select-none flex whitespace-nowrap ai-pro-anim cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setIsModalOpen(true)}
                  title="Нажми, чтобы получить бонус!"
                >
                  <span className="gold-text-smooth drop-shadow-[0_0_30px_rgba(234,179,8,0.2)]">AI</span>
                  <span className="ml-2 md:ml-4 pro-text-special drop-shadow-[0_0_30px_rgba(234,179,8,0.2)]" data-text="PRO">PRO</span>
                </div>
              </ScrollReveal>
            </div>

            {/* "AI PRO ТЕХНОЛОГИИ" Block on Home Page */}
            <ScrollReveal className="relative z-20 mb-16 pt-10 border-t border-yellow-600/20">
              <div className="text-center max-w-3xl mx-auto space-y-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide flex justify-center items-center gap-3 md:gap-4 text-center flex-wrap">
                  <span className="flex items-center">
                    <span className="gold-text-smooth">AI</span>
                    <span className="ml-2 pro-text-special" data-text="PRO">PRO</span>
                  </span>
                  <span className="gold-text-smooth">ТЕХНОЛОГИИ</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES_DATA.map((service, idx) => (
                  <div key={idx} className="gold-border-3d p-8 bg-black/80 flex flex-col h-full group hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                    <div className="mb-6 p-4 bg-yellow-900/20 inline-block rounded-2xl border border-yellow-600/30 group-hover:bg-yellow-600/20 transition-colors">
                      <service.icon className="w-12 h-12 text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 uppercase gold-text-smooth">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed flex-grow">{service.desc}</p>
                    <button onClick={() => navigateTo('service-detail', service)} className="mt-8 flex items-center text-yellow-500 font-semibold hover:text-yellow-300 group/btn text-left">
                      Подробнее <ArrowRight className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Promo Banner */}
            <ScrollReveal>
              <div className="promo-block gold-border-3d p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/50 backdrop-blur-sm relative z-20">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold uppercase">Премиум доступ на <br/><span className="gold-text-smooth">максимальные модели</span></h2>
                  <p className="text-xl text-gray-300">Google Gemini AI, ChatGPT, Apple Intelligence и Copilot к вашим услугам.</p>
                  <div className="flex items-center gap-4 mt-6">
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 px-4 py-2 rounded-lg font-mono text-xl border border-yellow-500 text-black font-bold">ПРОМОКОД:</div>
                    <div className="text-4xl font-black tracking-widest flex items-center">
                      <span className="gold-text-smooth">M5</span>
                      <span className="ml-2 pro-text-special" data-text="PRO">PRO</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <button onClick={() => navigateTo('service-detail', { 
                      title: 'ПРОФЕССИОНАЛЬНАЯ НАСТРОЙКА РЕКЛАМЫ', 
                      desc: 'Ультимативное руководство по запуску умной рекламы. Мы не просто настраиваем таргет — мы внедряем Google Gemini AI 3 Ultra для глубокого предиктивного анализа аудитории. Нейросети тестируют сотни креативов одновременно, выявляют самые конверсионные связки и направляют бюджет только туда, где есть максимальная вероятность лида. Это полностью исключает слив бюджета на нецелевые клики. Мы работаем с Telegram, Google, Yandex, Instagram, Tik Tok, Threads — настраивая омниканальные воронки, которые догоняют клиента везде, снижая итоговую стоимость заявки в несколько раз.',
                      icon: Settings 
                    })} className="gold-border-3d p-4 flex items-center gap-5 bg-black hover:bg-gray-900 w-full text-left transition-colors cursor-pointer group">
                    <Settings className="w-8 h-8 text-yellow-500 group-hover:rotate-90 transition-transform" />
                    <span className="font-bold text-xl uppercase gold-text-smooth">Настройка рекламы</span>
                  </button>
                  <button onClick={() => navigateTo('service-detail', { 
                      title: 'РЕКЛАМА ВО ВСЕХ ADS СЕРВИСАХ', 
                      desc: 'Масштабирование бизнеса требует присутствия на всех площадках. Мы берем под контроль рекламные кабинеты Google, Yandex, Instagram, TikTok, Threads и Telegram. Единый интеллектуальный центр управления на базе максимальных моделей ИИ распределяет бюджеты между платформами в режиме реального времени. Если сегодня лиды дешевле в TikTok, бюджет мгновенно перетекает туда. Завтра тренд меняется на Google — ИИ реагирует за миллисекунды. Вы получаете неструй клики, а готовую прогнозируемую систему генерации лидов (LeadGen) под ключ.',
                      icon: Megaphone 
                    })} className="gold-border-3d p-4 flex items-center gap-5 bg-black hover:bg-gray-900 w-full text-left transition-colors cursor-pointer group">
                    <Megaphone className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-xl uppercase gold-text-smooth">Реклама во всех ADS</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Animated Block: Ads Workflow */}
            <ScrollReveal>
              <div className="bg-gradient-to-b from-yellow-900/10 to-black p-10 rounded-3xl border border-yellow-600/20 text-center">
                <h2 className="text-4xl font-black uppercase tracking-wide mb-12">
                  Интеллектуальная настройка <span className="gold-text-smooth">Рекламы</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                   <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-yellow-600/30 -translate-y-1/2 z-0"></div>
                   <div className="bg-black gold-border-3d p-8 relative z-10 hover:scale-110 transition-transform">
                     <Activity className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                     <h3 className="text-xl font-bold mb-2 uppercase gold-text-smooth">1. Предиктивный Анализ</h3>
                     <p className="text-gray-400">ИИ анализирует вашу нишу и находит скрытые микросегменты аудитории.</p>
                   </div>
                   <div className="bg-black gold-border-3d p-8 relative z-10 hover:scale-110 transition-transform">
                     <Cpu className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                     <h3 className="text-xl font-bold mb-2 uppercase gold-text-smooth">2. AI-Генерация</h3>
                     <p className="text-gray-400">Создание сотен креативов и продающих текстов под каждый сегмент автоматически.</p>
                   </div>
                   <div className="bg-black gold-border-3d p-8 relative z-10 hover:scale-110 transition-transform">
                     <BarChart className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                     <h3 className="text-xl font-bold mb-2 uppercase gold-text-smooth">3. Авто-Оптимизация</h3>
                     <p className="text-gray-400">Снижение стоимости лида в реальном времени за счет машинного обучения.</p>
                   </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Section: Use Cases (Professions) */}
            <ScrollReveal>
              <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wide flex flex-wrap justify-center items-center gap-3">
                  <span className="text-white">Для кого работает</span>
                  <span className="flex items-center">
                    <span className="gold-text-smooth">AI</span>
                    <span className="ml-2 pro-text-special" data-text="PRO">PRO</span>
                    <span className="gold-text-smooth">?</span>
                  </span>
                </h2>
                <p className="text-xl text-gray-400">Нейросети — это ваш новый, эффективный инструмент для бизнеса и личных проектов любого типа и сложности!</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {USE_CASES.map((useCase, idx) => (
                  <div key={idx} className="gold-border-3d p-8 bg-black/60 group hover:bg-black transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                    <useCase.icon className="w-12 h-12 text-yellow-500 mb-6 group-hover:scale-125 transition-transform" />
                    <h3 className="text-2xl font-bold mb-3 uppercase gold-text-smooth">{useCase.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{useCase.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* --- PAGE: PORTFOLIO & TECHNOLOGIES --- */}
        {currentView.id === 'portfolio' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide flex flex-wrap justify-center items-center gap-3 md:gap-4 text-center">
                <span className="gold-text-smooth">ПОРТФОЛИО И ТЕХНОЛОГИИ</span>
              </h2>
              <p className="text-xl text-gray-400">Глубокое погружение в наш технологический стек и реализованные проекты.</p>
            </ScrollReveal>

            {/* Кейсы из портфолио */}
            <ScrollReveal>
              <div className="gold-border-3d p-10 md:p-16 bg-black/90 my-16 relative z-20 max-w-6xl mx-auto hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all">
                <h2 className="text-3xl md:text-5xl font-black uppercase mb-8">
                  <span className="gold-text-smooth">Наши Проекты</span>
                </h2>
                <div className="text-lg md:text-xl text-gray-300 space-y-6 leading-relaxed">
                   <p>Ознакомьтесь с реальными кейсами внедрения передовых технологий в бизнес-процессы наших клиентов. Мы создаем масштабируемые решения, которые приносят реальную, измеримую прибыль.</p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                     <PortfolioLink href="https://www.dveripro.by" name="Двери ПРО (Сайт)" />
                     <PortfolioLink href="https://www.instagram.com/dveri_yurkas_minsk" name="Yurkas (Instagram)" />
                     <PortfolioLink href="https://www.tiktok.com/@alina_google_gemini_ai" name="AI PRO (Instagram)" />
                     <PortfolioLink href="https://www.tiktok.com/@alina_google_gemini_ai" name="AI PRO (TikTok)" />
                     <PortfolioLink href={TG_CHANNEL} name="AI PRO (Telegram)" />
                     <PortfolioLink href="https://www.vpl.by" name="VPL (Сайт)" />
                     <PortfolioLink href="https://www.instagram.com/vitrinaplus/" name="Витрина Плюс (Instagram)" />
                     <PortfolioLink href="https://www.tiktok.com/@vpl.by" name="VPL (TikTok)" />
                   </div>
                   
                   <div className="mt-16 text-center border-t border-yellow-600/30 pt-10">
                     <p className="text-3xl font-black gold-text-smooth mb-4">Мы готовы сделать лучшее ценовое предложение во всех сегментах.</p>
                     <p className="text-2xl text-white mb-8">Не верите? — Проверьте!</p>
                     <a href={TG_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-5 text-xl font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform shadow-[0_0_25px_rgba(234,179,8,0.5)]">
                       <Send className="w-6 h-6" /> Обсудить проект в Telegram
                     </a>
                   </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Архитектура AI PRO */}
            <ScrollReveal>
              <div className="gold-border-3d p-8 md:p-14 bg-black/80 space-y-8 max-w-6xl mx-auto hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all">
                <h3 className="text-3xl font-black uppercase flex flex-wrap items-center gap-3">
                  <span className="gold-text-smooth">Архитектура</span>
                  <span className="flex items-center">
                    <span className="gold-text-smooth">AI</span>
                    <span className="ml-2 pro-text-special" data-text="PRO">PRO</span>
                  </span>
                  <span className="gold-text-smooth">ТЕХНОЛОГИЙ</span>
                </h3>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                  Мы не просто используем базовые алгоритмы — мы разворачиваем масштабные цифровые инфраструктуры на базе максимальных версий <strong>Google Gemini</strong> и <strong>Apple Intelligence</strong>. Наш подход к разработке WEB-сайтов, приложений и запуску реклам кампаний строится на предиктивном анализе и глубоком машинном обучении. Это позволяет бизнесу получать не просто "клики", а целевые, прогретые лиды, готовые к покупке.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <div className="bg-gray-900/50 p-8 rounded-2xl border border-yellow-600/20">
                    <h4 className="text-2xl font-bold gold-text-smooth mb-4 uppercase">GEO & SGE (Генеративный Поиск)</h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Эпоха классического SEO безвозвратно уходит. Мы оптимизируем ваши цифровые ресурсы (GEO - Generative Engine Optimization) так, чтобы передовые языковые модели сами рекомендовали ваш продукт в своих прямых ответах пользователям. Ваш бренд становится органично встроенным в логику выдачи современных ИИ-поисковиков.
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-8 rounded-2xl border border-yellow-600/20">
                    <h4 className="text-2xl font-bold gold-text-smooth mb-4 uppercase">LLM Интеграции & Автоматизация</h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Мы внедряем мощнейшие языковые модели прямо в сердце вашего бизнеса. От абсолютной автоматизации отделов продаж и умных CRM-систем до генерации тысяч уникальных рекламных креативов в реальном времени. ИИ работает 24/7, полностью исключая фактор человеческой ошибки и усталости.
                    </p>
                  </div>
                </div>

                <div className="mt-12 bg-gradient-to-r from-yellow-900/20 to-black p-8 rounded-2xl border-l-4 border-yellow-500">
                  <h4 className="text-2xl font-bold gold-text-smooth mb-4 uppercase">Предиктивный Анализ (Big Data)</h4>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">
                    Алгоритмы непрерывно анализируют сотни микросегментов вашей целевой аудитории. Система предсказывает, какой именно рекламный креатив и оффер сработают для конкретного пользователя, автоматически перераспределяя бюджеты с математической точностью. Результат — радикальное снижение стоимости заявки (CPA) и кратный рост рентабельности маркетинга.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* --- PAGE: ASSISTANTS (AI PRO Ассистенты) --- */}
        {currentView.id === 'assistants' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide flex flex-wrap justify-center items-center gap-3 md:gap-4 text-center">
                <span className="flex items-center">
                  <span className="gold-text-smooth">AI</span>
                  <span className="ml-2 pro-text-special" data-text="PRO">PRO</span>
                </span>
                <span className="gold-text-smooth">АССИСТЕНТЫ</span>
              </h2>
              <p className="text-xl text-gray-400">Специализированные ИИ-сотрудники, интегрированные в ваш бизнес. Работают 24/7, не уходят в отпуск, не совершают ошибок.</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="gold-border-3d p-8 bg-black/80 flex flex-col h-full group hover:bg-black/90 transition-colors hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                  <h3 className="text-2xl font-black uppercase gold-text-smooth mb-4">Отдел Продаж 2.0 (Текстовые ИИ-Менеджеры)</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-lg font-light flex-grow">
                    Интеграция в Telegram, WhatsApp, Instagram Direct и CRM (Bitrix24, amoCRM). ИИ самостоятельно квалифицирует лидов по вашей воронке, прогревает клиентов, отрабатывает сложные возражения и доводит диалог до оплаты.
                  </p>
                  <ul className="space-y-3 border-t border-yellow-600/30 pt-6 mt-auto">
                    <li className="flex items-start text-sm text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3 shrink-0" /> Время ответа: 1 секунда, 24 часа в сутки</li>
                    <li className="flex items-start text-sm text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3 shrink-0" /> Обработка 10,000+ диалогов одновременно без потери качества</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="gold-border-3d p-8 bg-black/80 flex flex-col h-full group hover:bg-black/90 transition-colors hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                  <h3 className="text-2xl font-black uppercase gold-text-smooth mb-4">Голосовые ИИ-Операторы (Телефония)</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-lg font-light flex-grow">
                    Голосовой синтез, абсолютно неотличимый от живого человека (с паузами, вздохами и интонациями). Робот самостоятельно прозванивает базы, подтверждает записи, собирает NPS и принимает весь шквал входящих звонков.
                  </p>
                  <ul className="space-y-3 border-t border-yellow-600/30 pt-6 mt-auto">
                    <li className="flex items-start text-sm text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3 shrink-0" /> Автоматическая запись итогов звонка напрямую в CRM</li>
                    <li className="flex items-start text-sm text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3 shrink-0" /> В 10 раз дешевле и в 100 раз быстрее стандартного колл-центра</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="gold-border-3d p-8 bg-black/80 flex flex-col h-full group hover:bg-black/90 transition-colors hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                  <h3 className="text-2xl font-black uppercase gold-text-smooth mb-4">ИИ-Аналитик & Маркетолог</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-lg font-light flex-grow">
                    Агент подключается к вашим рекламным кабинетам (Google, Yandex, FB, TG Ads). Он непрерывно анализирует трафик, отключает неэффективные креативы, перераспределяет рекламный бюджет и выдает глубокие отчеты о трендах на основе Big Data.
                  </p>
                  <ul className="space-y-3 border-t border-yellow-600/30 pt-6 mt-auto">
                    <li className="flex items-start text-sm text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3 shrink-0" /> Предиктивный (предсказывающий) анализ рынка</li>
                    <li className="flex items-start text-sm text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3 shrink-0" /> Снижение итоговой стоимости лида до 40%</li>
                  </ul>
                </div>
              </ScrollReveal>
              
              <ScrollReveal>
                <div className="gold-border-3d p-8 bg-black/80 flex flex-col h-full group hover:bg-black/90 transition-colors hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                  <h3 className="text-2xl font-black uppercase gold-text-smooth mb-4">Персональный Копирайтер</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-lg font-light flex-grow">
                    ИИ-контентмейкер, обученный на стиле (Tone of Voice) вашего бренда. Он автоматически генерирует контент-планы, пишет вовлекающие посты для соцсетей, создает SEO-оптимизированные статьи для блога и собирает длинные цепочки email-рассылок.
                  </p>
                  <ul className="space-y-3 border-t border-yellow-600/30 pt-6 mt-auto">
                    <li className="flex items-start text-sm text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3 shrink-0" /> 100% уникальность генерируемого контента</li>
                    <li className="flex items-start text-sm text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3 shrink-0" /> Точное следование регламентам вашего бренда</li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="mt-12 max-w-6xl mx-auto gold-border-3d p-10 md:p-14 bg-gradient-to-r from-black via-gray-900 to-black flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-2/3">
                  <h3 className="text-3xl font-black uppercase mb-6 gold-text-smooth">Уникальное обучение под ваш бизнес</h3>
                  <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                    Мы не продаем базовых ботов-автоответчиков. Мы берем историю ваших успешных переписок, прайс-листы, внутренние регламенты компании и <strong>создаем "цифровой клон" вашего лучшего сотрудника</strong>. Ваш персональный ИИ-Ассистент будет обладать глубокими корпоративными знаниями и действовать строго по заданному сценарию без сбоев и ошибок.
                  </p>
                </div>
                <div className="md:w-1/3 w-full">
                  <a href={TG_LINK} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 px-6 py-6 text-xl font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform shadow-[0_0_25px_rgba(234,179,8,0.4)] text-center leading-tight">
                    <Send className="w-6 h-6 shrink-0" /> Рассчитать<br/>стоимость внедрения
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* --- PAGE: SUBSCRIPTIONS (AI Подписки) --- */}
        {currentView.id === 'subscriptions' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide flex flex-wrap justify-center items-center gap-3 md:gap-4 text-center">
                <span className="flex items-center">
                  <span className="gold-text-smooth">AI</span>
                  <span className="ml-2 pro-text-special" data-text="PRO">PRO</span>
                </span>
                <span className="gold-text-smooth">ПОДПИСКИ</span>
              </h2>
              <p className="text-xl text-gray-400">Официальный доступ к максимальным версиям нейросетей на 1 год.</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 max-w-5xl mx-auto">
              {SUBSCRIPTIONS_DATA.map((sub) => (
                <ScrollReveal key={sub.id}>
                  <div className="gold-border-3d p-8 bg-black/80 flex flex-col h-full group hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                    <div className="flex items-center mb-6">
                      <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight gold-text-smooth">
                        {sub.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed flex-grow mb-8 text-lg font-light">
                      {sub.desc}
                    </p>
                    <a href={TG_LINK} target="_blank" rel="noreferrer" className="mt-auto w-full flex items-center justify-center gap-3 px-6 py-4 text-base font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                      <Send className="w-5 h-5" /> Узнать тариф в Telegram
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* --- PAGE: FAQ --- */}
        {currentView.id === 'faq' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wide flex flex-wrap justify-center items-center gap-3 md:gap-4 text-center">
                <span className="flex items-center">
                  <span className="gold-text-smooth">AI</span>
                  <span className="ml-2 pro-text-special" data-text="PRO">PRO</span>
                </span>
                <span className="gold-text-smooth">БАЗА ЗНАНИЙ</span>
              </h2>
              <p className="text-xl text-gray-400">Глубокие и исчерпывающие ответы о внедрении технологий.</p>
            </ScrollReveal>

            <div className="max-w-4xl mx-auto space-y-12 pt-8">
              {FAQ_DATA.map((category, catIdx) => (
                <ScrollReveal key={catIdx} className="space-y-4">
                  <h3 className="text-2xl font-bold gold-text-smooth uppercase mb-6 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-yellow-500" /> {category.category}
                  </h3>
                  {category.questions.map((item, qIdx) => (
                    <FaqAccordion key={qIdx} question={item.q} answer={item.a} />
                  ))}
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* --- PAGE: BLOG --- */}
        {currentView.id === 'blog' && (
          <div className="space-y-12 mt-10">
            <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wide flex flex-wrap justify-center items-center gap-3 md:gap-4 text-center">
                <span className="flex items-center">
                  <span className="gold-text-smooth">AI</span>
                  <span className="ml-2 pro-text-special" data-text="PRO">PRO</span>
                </span>
                <span className="gold-text-smooth">БЛОГ</span>
              </h2>
              <p className="text-xl text-gray-400">Эксклюзивные разборы механик, настройки рекламы и кейсы.</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
              {BLOG_POSTS.map((post) => (
                <ScrollReveal key={post.id}>
                  <article onClick={() => navigateTo('article-detail', post)} className="gold-border-3d h-full bg-black p-8 group cursor-pointer flex flex-col hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        type="button" 
                        onClick={(e) => e.stopPropagation()} 
                        className="bg-[#1a1400] text-yellow-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.15)] hover:bg-yellow-900/40 transition-colors"
                      >
                        {post.tag}
                      </button>
                      <span className="text-gray-500 text-sm">{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold gold-text-smooth mb-4 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      {post.desc}
                    </p>
                    <div className="flex items-center text-yellow-500 font-semibold group-hover:translate-x-2 transition-transform mt-auto">
                      Читать статью <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* --- DETAILED PAGES --- */}
        {/* Service Detail (Special Logic for SEO & GEO) */}
        {currentView.id === 'service-detail' && currentView.data && (
          <ScrollReveal className="space-y-12 mt-10 max-w-5xl mx-auto">
            <button onClick={() => navigateTo('home')} className="flex items-center text-yellow-500 hover:text-yellow-400 font-bold uppercase tracking-wider mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" /> Вернуться назад
            </button>
            <div className="gold-border-3d p-6 md:p-12 bg-black/80">
              
              <div className="flex items-center gap-6 mb-8 border-b border-yellow-600/20 pb-8">
                 {currentView.data.icon ? <currentView.data.icon className="w-12 h-12 text-yellow-500 hidden md:block" /> : <Table className="w-12 h-12 text-yellow-500 hidden md:block" />}
                 <h2 className="text-3xl md:text-5xl font-black uppercase gold-text-smooth leading-tight">{currentView.data.title}</h2>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 font-light">
                {currentView.data.desc}
              </p>

              {currentView.data.id === 'seo' && (
                <div className="space-y-10">
                  <div className="bg-yellow-900/20 p-6 md:p-8 rounded-xl border-l-4 border-yellow-500">
                    <h3 className="text-2xl font-bold gold-text-smooth mb-4">Что такое GEO?</h3>
                    <p className="text-lg text-gray-300">
                      GEO (Generative Engine Optimization) — это следующий шаг после SEO. Это оптимизация контента таким образом, чтобы искусственный интеллект замечал его, доверял ему и использовал ваш бренд в своих прямых ответах пользователям.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="mt-12 p-8 border-t border-yellow-600/30 text-center">
                <p className="text-2xl font-bold text-white mb-6">Готовы масштабировать результат? Свяжитесь с нами прямо сейчас.</p>
                <a href={TG_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                  <Send className="w-5 h-5"/> Связаться в Telegram
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Article Detail */}
        {currentView.id === 'article-detail' && currentView.data && (
          <ScrollReveal className="space-y-12 mt-10 max-w-4xl mx-auto">
            <button onClick={() => navigateTo('blog')} className="flex items-center text-yellow-500 hover:text-yellow-400 font-bold uppercase tracking-wider mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" /> Все статьи
            </button>
            <article className="gold-border-3d p-8 md:p-12 bg-black/80">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-yellow-600/20">
                <button 
                  type="button" 
                  className="bg-[#1a1400] text-yellow-500 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider border border-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.15)] cursor-default"
                >
                  {currentView.data.tag}
                </button>
                <span className="text-gray-500 text-sm font-mono">{currentView.data.date}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black gold-text-smooth mb-8 leading-tight">{currentView.data.title}</h1>
              <p className="text-2xl text-yellow-500 font-bold mb-10 border-l-4 border-yellow-500 pl-6">{currentView.data.desc}</p>
              
              <div className="text-gray-300 space-y-6 text-lg font-light leading-relaxed">
                <p>Мы опытные профессионалы. IT и маркетинг — проекты любой сложности под ключ. Интеграция максимальных версий LLM в веб-разработку и рекламу позволяет бизнесу сократить издержки и увеличить конверсию. Создавая рекламные проекты от идеи до лидов на базе Google Gemini AI, мы исключаем фактор человеческой ошибки.</p>
                <div className="bg-black border border-yellow-600/30 p-6 rounded-lg my-8">
                  <h4 className="font-bold gold-text-smooth mb-2">Главный инсайт:</h4>
                  <p className="text-gray-400">Сайты, мобильные приложения, landing page (с формами, калькуляторами, базами), SMM и ведение любых социальных сетей — все это сегодня должно работать под управлением умных алгоритмов. Настройка рекламы: Telegram, Google, Yandex, Instagram, Tik Tok, Threads должна быть омниканальной.</p>
                </div>
                <p>Мы готовы сделать лучшее ценовое предложение во всех сегментах. Не верите? Проверьте! Свяжитесь с нами.</p>
                <div className="pt-8">
                  <a href={TG_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-xl hover:scale-105 transition-transform">
                    <Send className="w-5 h-5"/> Связаться в Telegram
                  </a>
                </div>
              </div>
            </article>
          </ScrollReveal>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-yellow-600/30 bg-black pt-16 pb-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <TopLogo />
              <p className="text-gray-400 mt-4">Премиальная разработка и умная реклама от идеи до генерации лидов.</p>
              <a href={TG_LINK} target="_blank" rel="noreferrer" className="text-yellow-500 hover:text-yellow-400 font-bold mt-4 flex items-center justify-center md:justify-start gap-2">
                <Send className="w-4 h-4"/> Написать в Telegram
              </a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © 2026 AI PRO. Все права защищены.
          </div>
        </div>
      </footer>

      {/* DISCOUNT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="gold-border-3d bg-black/95 p-10 md:p-14 max-w-lg w-full relative flex flex-col items-center text-center shadow-[0_0_40px_rgba(234,179,8,0.3)]">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-yellow-500 transition-colors p-2"
            >
              <X size={28} />
            </button>
            
            <div className="text-5xl md:text-6xl font-black tracking-tighter flex items-center justify-center mb-6">
              <span className="gold-text-smooth">AI</span>
              <span className="ml-3 pro-text-special" data-text="PRO">PRO</span>
            </div>
            
            <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
              Поздравляем, вы нашли секретный бонус и мы рады подарить вам <span className="gold-text-smooth text-3xl block mt-3">33% скидки</span> на пакет AI подписок!
            </p>
            
            <a href={TG_LINK} target="_blank" rel="noreferrer" className="w-full px-8 py-4 text-xl font-bold uppercase tracking-wider text-black bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rounded-xl hover:scale-105 transition-transform flex justify-center items-center gap-3 shadow-[0_0_20px_rgba(234,179,8,0.5)]">
              <Send className="w-6 h-6"/> Написать в Telegram
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers
const StarIcon = () => <Star className="w-6 h-6 text-yellow-500 shrink-0" fill="currentColor" />;
const Star = ({ className, fill }) => (
  <svg viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
// Обновленный компонент портфолио
const PortfolioLink = ({ href, name }) => (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center justify-center p-4 bg-gradient-to-r from-yellow-700/20 to-yellow-900/20 border border-yellow-600/50 rounded-xl hover:scale-105 hover:bg-yellow-600/30 hover:border-yellow-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.1)] group text-center min-h-[80px]">
    <span className="gold-text-smooth font-bold tracking-wide transition-colors flex items-center gap-2">
      {name} <ExternalLink className="w-4 h-4 text-yellow-600 opacity-80" />
    </span>
  </a>
);

function FaqAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="gold-border-3d bg-black overflow-hidden transition-all duration-300 mb-4">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-6 flex justify-between items-center bg-black hover:bg-gray-900 focus:outline-none group">
        <span className="text-lg md:text-xl font-bold gold-text-smooth pr-4">{question}</span>
        <ChevronDown className={`w-6 h-6 text-yellow-500 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 pt-0 text-gray-300 border-t border-yellow-600/20 mt-2 bg-gradient-to-b from-gray-900 to-black text-lg leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
