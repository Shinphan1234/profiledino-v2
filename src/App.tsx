/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ArrowRight,
  Phone,
  ShoppingBag,
  ExternalLink,
  Send,
  MessageSquare,
  Globe,
  Sparkles,
  User,
  Zap,
  CheckCircle2,
  Lock,
  ChevronDown,
  Contact,
  Info
} from "lucide-react";

// --- Custom Typewriter Hook ---
// It uses setTimeout and setInterval to iteratively build a string slice by slice.
// It returns an object: { displayed: string, done: boolean }.
function useTypewriter(text: string, speed: number = 38, startDelay: number = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);

    let intervalId: any = null;
    let index = 0;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        if (index <= text.length) {
          setDisplayed(text.slice(0, index));
        } else {
          setDone(true);
          clearInterval(intervalId);
          isFirstRender.current = false;
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// Translations dictionary to support dynamic language toggle (Vietnamese is primary, with English, Japanese, and Korean)
interface Translation {
  navAbout: string;
  navServices: string;
  navShop: string;
  navContact: string;
  ctaText: string;
  typewriterText: string;
  headlineSubtitle: string;
  descriptionMain: string;
  descriptionSub: string;
  servicesTitle: string;
  servicesSubtitle: string;
  emptySelection: string;
  activeSelectionPrefix: string;
  ctaGo: string;
  personalTitle: string;
  personalBadge: string;
  personalBio: string;
  personalExp: string;
  personalTech: string;
  contactHeader: string;
  placeholderName: string;
  placeholderMessage: string;
  btnSendZalo: string;
  btnSendForm: string;
  formSuccess: string;
  directCall: string;
  quickContactTitle: string;
}

const translations: Record<"vi" | "en" | "ja" | "ko", Translation> = {
  vi: {
    navAbout: "Giới thiệu",
    navServices: "Dịch vụ",
    navShop: "Cửa hàng \u2197",
    navContact: "Liên hệ",
    ctaText: "Liên hệ Hotline / Zalo",
    typewriterText: "CHÚNG TÔI RẤT MUỐN\nLẮNG NGHE TỪ BẠN!",
    headlineSubtitle: "(WE'D LOVE TO HEAR FROM YOU!)",
    descriptionMain: "Nhằm mang lại giải pháp công nghệ cao & thương hiệu đột phá cho ý tưởng của bạn.",
    descriptionSub: "Dù bạn có câu hỏi, phản hồi hay ý tưởng dự án, hãy để lại lời nhắn cá nhân và chúng tôi sẽ hỗ trợ nhanh chóng.",
    servicesTitle: "Bạn quan tâm dịch vụ nào?",
    servicesSubtitle: "Chọn tất cả những hạng mục phù hợp",
    emptySelection: "Vui lòng click chọn các dịch vụ ở trên để tiếp tục.",
    activeSelectionPrefix: "Sẵn sàng gửi yêu cầu về:",
    ctaGo: "Bắt đầu ngay",
    personalTitle: "Về tôi \u2014 Phat Datt",
    personalBadge: "Lập trình viên & Thiết kế thương hiệu số",
    personalBio: "Xin chào! Tôi kiến tạo những giao diện kỹ thuật số tinh tế, hiệu năng vượt trội và các hệ thống thương hiệu đồng bộ. Với định hướng thiết kế duy mỹ kết hợp nền tảng kỹ thuật vững chắc, tôi đồng hành cùng sự phát triển bền vững của dự án số.",
    personalExp: "Kinh nghiệm thực chiến \u2022 Giải pháp tối ưu \u2022 Tư vấn miễn phí",
    personalTech: "Công nghệ: React, Node, Tailwind, Cloud Architect, UX/UI Design",
    contactHeader: "Gửi tin nhắn trực tiếp",
    placeholderName: "Tên của bạn hoặc Doanh nghiệp",
    placeholderMessage: "Hãy mô tả hoặc ghi nhận yêu cầu của bạn tại đây...",
    btnSendZalo: "Gửi qua Zalo Chat (Pre-filled)",
    btnSendForm: "Xác nhận & Gửi yêu cầu",
    formSuccess: "Yêu cầu của bạn đã được gửi thành công! Tôi sẽ liên hệ lại ngay qua số điện thoại 0768850193 hoặc Zalo. Xin cảm ơn!",
    directCall: "Gọi điện thoại trực tiếp",
    quickContactTitle: "Thông tin liên hệ nhanh"
  },
  en: {
    navAbout: "About",
    navServices: "Services",
    navShop: "Dino Shop \u2197",
    navContact: "Inquire",
    ctaText: "Get in touch on Zalo",
    typewriterText: "WE'D LOVE TO\nHEAR FROM YOU!",
    headlineSubtitle: "(CHÚNG TÔI RẤT MUỐN LẮNG NGHE TỪ BẠN!)",
    descriptionMain: "Crafting elite digital architectures and remarkable interactive branding solutions.",
    descriptionSub: "Whether you have questions, feedback, or a visionary custom project in mind, let me know and I will support you promptly.",
    servicesTitle: "What sort of service?",
    servicesSubtitle: "Select all that apply",
    emptySelection: "Please click to select services above.",
    activeSelectionPrefix: "Ready to inquire about:",
    ctaGo: "Let's Go",
    personalTitle: "About Me \u2014 Phat Datt",
    personalBadge: "Full-Stack Developer & Brand Architect",
    personalBio: "Hello! I architect beautiful, high-performance web experiences and highly coherent brand identities. By combining standard-compliant software engineering with deliberate visual aesthetics, I build digital assets that scale.",
    personalExp: "Hands-on Experience \u2022 Clean Execution \u2022 Strategic Tech Consult",
    personalTech: "Tech Stack: React, Node, Tailwind, Cloud, Analytics & UX/UI Architecture",
    contactHeader: "Get in touch directly",
    placeholderName: "Your name or company",
    placeholderMessage: "Describe your requirement or project detail...",
    btnSendZalo: "Send live via Zalo (Pre-filled)",
    btnSendForm: "Submit Inquiry Form",
    formSuccess: "Your inquiry has been submitted successfully! I will reach out shortly. You can also dial 0768850193 for instant help. Thank you!",
    directCall: "Direct phone call",
    quickContactTitle: "Quick Channels"
  },
  ja: {
    navAbout: "自己紹介",
    navServices: "サービス",
    navShop: "Dino Shop \u2197",
    navContact: "お問い合わせ",
    ctaText: "Zaloでお問い合わせ",
    typewriterText: "ご連絡を心より\nお待ちしております！",
    headlineSubtitle: "(WE'D LOVE TO HEAR FROM YOU!)",
    descriptionMain: "高品質なテクノロジーソリューションとインパクトのあるデジタルブランド開発。",
    descriptionSub: "ご質問、フィードバック、新規プロジェクトのご相談など、お気軽にお問い合わせください。迅速に対応いたします。",
    servicesTitle: "どのようなサービスをお探しですか？",
    servicesSubtitle: "該当するものをすべて選択してください",
    emptySelection: "上のサービスをクリックして選択してください。",
    activeSelectionPrefix: "お問い合わせの準備完了：",
    ctaGo: "スタート",
    personalTitle: "自己紹介 \u2014 Phat Datt",
    personalBadge: "フルスタックエンジニア & ブランド設計者",
    personalBio: "こんにちは！私は洗練されたデジタルインターフェース、優れたパフォーマンス、そして一貫したブランドアイデンティティを提供します。美学と技術の融合により、最高品質のモダンなウェブシステムを構築します。",
    personalExp: "実戦経験 \u2022 最適なソリューション \u2022 無料相談",
    personalTech: "技術スタック：React、Node、Tailwind、クラウド、UX/UI設計",
    contactHeader: "メッセージを送信する",
    placeholderName: "お名前または会社名",
    placeholderMessage: "要件やプロジェクトの詳細を記述してください...",
    btnSendZalo: "Zaloチャットで送信（自動入力）",
    btnSendForm: "問い合わせフォームを送信",
    formSuccess: "お問い合わせが正常に送信されました！すぐに返信いたします。お急ぎの場合は0768850193までお電話ください。ありがとうございました！",
    directCall: "直接お電話",
    quickContactTitle: "クイック連絡先"
  },
  ko: {
    navAbout: "소개",
    navServices: "서비스",
    navShop: "Dino Shop \u2197",
    navContact: "문의하기",
    ctaText: "Zalo 문의하기",
    typewriterText: "언제든 편하게\n문의해주세요!",
    headlineSubtitle: "(WE'D LOVE TO HEAR FROM YOU!)",
    descriptionMain: "고성능 기술 솔루션과 가치 있는 디지털 브랜드 디자인을 제공합니다.",
    descriptionSub: "궁금한 점이나 피드백, 새로운 프로젝트 협업 문의 등 편하게 남겨주시면 정성껏 답변해 드리겠습니다.",
    servicesTitle: "어떤 서비스가 필요하십니까?",
    servicesSubtitle: "해당하는 항목을 모두 선택하세요",
    emptySelection: "위의 서비스를 클릭하여 선택해 주세요.",
    activeSelectionPrefix: "문의 준비 완료:",
    ctaGo: "시작하기",
    personalTitle: "소개 \u2014 Phat Datt",
    personalBadge: "풀스택 개발자 & 브랜드 아키텍트",
    personalBio: "안녕하세요! 탁월한 성능의 디지털 인터페이스와 일관성 있는 브랜드 정체성을 구축하는 개발자 Phat Datt입니다. 세련된 디자인 감각과 단단한 엔지니어링 역량을 바탕으로 혁신적인 가치를 실현합니다.",
    personalExp: "실전 경험 \u2022 최적의 솔루션 \u2022 무료 컨설팅",
    personalTech: "기술 스택: React, Node, Tailwind, 클라우드, UX/UI 디자인",
    contactHeader: "직접 문의하기",
    placeholderName: "성함 또는 회사명",
    placeholderMessage: "프로젝트 요구사항을 자세히 기재해 주세요...",
    btnSendZalo: "Zalo 채팅으로 보내기 (자동 완성)",
    btnSendForm: "문의 등록하기",
    formSuccess: "문의가 접수되었습니다! 곧 연락드리겠습니다. 0768850193으로 직접 전화 문의도 가능합니다. 감사합니다!",
    directCall: "직접 전화 연결",
    quickContactTitle: "빠른 문의 채널"
  }
};

const SERVICE_EXPLANATIONS: Record<"vi" | "en" | "ja" | "ko", Record<string, { title: string; desc: string }>> = {
  vi: {
    Brand: {
      title: "Thiết kế Thương hiệu (Brand Design)",
      desc: "Kiến tạo hệ thống nhận diện thương hiệu độc bản cao cấp (bao gồm logo, cẩm nang thương hiệu, hệ màu sắc, font chữ chuẩn). Giúp doanh nghiệp định vị phong cách chuyên nghiệp, gia tăng uy tín và ghi dấu dấu ấn sâu sắc trong tâm trí khách hàng."
    },
    Digital: {
      title: "Giải pháp Kỹ thuật số (Digital Solutions)",
      desc: "Phát triển các trang web cao cấp, landing page tối ưu chuyển đổi và ứng dụng web vận hành siêu tốc. Chú trọng thiết kế giao diện tinh tế, trải nghiệm người dùng (UX/UI) mượt mà kết hợp các công nghệ tối tân nhất."
    },
    Campaign: {
      title: "Chiến dịch Truyền thông (Campaigns)",
      desc: "Lên kế hoạch tiếp thị số, tối ưu hóa công cụ tìm kiếm (SEO), thiết lập chiến dịch quảng cáo và sản xuất các ấn phẩm truyền thông độc đáo. Giúp tối đa hóa lưu lượng truy cập chất lượng và đưa thương hiệu tiếp cận khách hàng tiềm năng."
    }
  },
  en: {
    Brand: {
      title: "Brand Design (Thiết kế Thương hiệu)",
      desc: "Developing bespoke brand identity guidelines, visual guidelines, custom logos, color palettes, and typographic scales. Position your business as an industry leader with a highly cohesive, high-end design presence."
    },
    Digital: {
      title: "Digital Solutions (Giải pháp Kỹ thuật số)",
      desc: "Building fast, dynamic, responsive web platforms, campaign landing pages, and interactive web software. Focuses on premium aesthetics, seamless UX/UI, clean codebases, and state-of-the-art framework integration."
    },
    Campaign: {
      title: "Campaigns (Chiến dịch Truyền thông)",
      desc: "Strategic creative marketing campaigns, high-impact social assets, conversion SEO, and copy assets. Maximize brand outreach, boost natural visitor traffic, and run ads targeting ready-to-buy clients."
    }
  },
  ja: {
    Brand: {
      title: "ブランド設計・デザイン (Brand Design)",
      desc: "ロゴデザイン、ブランド規定、色彩体系、タイポグラフィの策定など、独自のブランドアイデンティティを構築します。一貫した高品質デザインにより、競合と差別化された絶対的な信頼性を確立します。"
    },
    Digital: {
      title: "デジタル開発ソリューション (Digital Solutions)",
      desc: "超高速で動作するプレミアムなWebサイト、ランディングページ、インタラクティブなWebアプリを開発。洗練されたUX/UI、モダンなコード、快適なレスポンシブ操作を提供します。"
    },
    Campaign: {
      title: "広告・キャンペーン設計 (Campaigns)",
      desc: "SEO最適化、検索連動・SNS広告、および訴求力の高いビジュアルツールの立案。ターゲット層に的確に魅力を届ける集客・マーケティングを行います。"
    }
  },
  ko: {
    Brand: {
      title: "브랜드 디자인 (Brand Design)",
      desc: "맞춤형 심볼 로고, 브랜드 가이드북, 표준 전용 색상 및 타이포그래피 시스템을 제작합니다. 통일감 있는 프리미엄 시각 연출을 통해 비즈니스의 격조와 신뢰도를 획기적으로 상승시킵니다."
    },
    Digital: {
      title: "디지털 솔루션 개발 (Digital Solutions)",
      desc: "초고속 로딩 속도의 브랜드 웹사이트, 랜딩 페이지, 직관적인 고성능 웹 서비스 개발을 설계·구축합니다. 감각적인 UX/UI 구현과 안정적인 코드가 조화를 이룹니다."
    },
    Campaign: {
      title: "마케팅 캠페인 수립 (Campaigns)",
      desc: "검색 광고 노출(SEO), 최적의 디지털 타겟 광고 설계 및 홍보용 디지털 자산 제작을 전담합니다. 실제 구매 결정으로 직결되는 가치 있는 핵심 트래픽 유입에 초점을 맞춥니다."
    }
  }
};

export default function App() {
  // Primary language default is Vietnamese ('vi') as requested
  const [lang, setLang] = useState<"vi" | "en" | "ja" | "ko">("vi");
  const t = translations[lang];

  // Mobile navigation drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Selected services state
  const [services, setServices] = useState<string[]>([]);

  // Form contact states
  const [senderName, setSenderName] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showInquiryPanel, setShowInquiryPanel] = useState(false);

  // Reference for scrolling to page anchors
  const introRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);

  // Run typewriter hook on the headline string
  const { displayed, done } = useTypewriter(t.typewriterText, 38, 600);

  // Desktop Mouse Scrubbing & Mobile Autoplay playback hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Desktop Mouse Scrubbing Logic
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const deltaRatio = deltaX / window.innerWidth;
      // Calculate target scrub time based on delta, speed multiplier (0.8), and duration
      const scrubTimeDelta = deltaRatio * 0.8 * duration;
      let targetTime = video.currentTime + scrubTimeDelta;

      // Clamp time between 0 and duration
      if (targetTime < 0) targetTime = 0;
      if (targetTime > duration) targetTime = duration;

      video.currentTime = targetTime;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      prevXRef.current = e.clientX;
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleSeeked = () => {
      // Seeked event listener to ensure smooth tracking
    };
    video.addEventListener("seeked", handleSeeked);

    // Initial setup: mobile autoplay vs desktop manual scrubbing
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.play().catch((err) => console.log("Autoplay deferred:", err));
    } else {
      video.pause();
    }

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        if (video.paused) {
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.play().catch(() => {});
        }
      } else {
        video.pause();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // Handler to toggle selection in services state array (Brand, Digital, Campaign, Other)
  const toggleService = (serviceName: string) => {
    if (services.includes(serviceName)) {
      setServices(services.filter((s) => s !== serviceName));
    } else {
      setServices([...services, serviceName]);
    }
  };

  // Helper handling smooth scroll to local anchors
  const scrollToSection = (targetRef: React.RefObject<HTMLDivElement | null>) => {
    setIsMobileMenuOpen(false);
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Pre-filled dynamic Zalo link generator
  const getZaloLink = () => {
    const defaultText = `Xin chào! Tôi quan tâm đến các dịch vụ của bạn. `;
    const servicesText = services.length > 0 
      ? `Tôi muốn đăng ký dịch vụ: ${services.join(", ")}. ` 
      : ``;
    const messagePart = senderMessage ? `Nội dung nhắn: ${senderMessage}` : ``;
    const fullText = encodeURIComponent(`${defaultText}${servicesText}${messagePart}`);
    return `https://zalo.me/0768850193?text=${fullText}`;
  };

  // Basic custom form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSenderName("");
      setSenderMessage("");
      setServices([]);
      setShowInquiryPanel(false);
    }, 8000);
  };

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      
      {/* 3. Background Video Component (with Native Mouse Scrubbing on Desktop, Autoplay on Mobile) */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-right-bottom transition-opacity duration-700"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
        />
        {/* Subtle dark ambient vignette for enhanced screen legibility */}
        <div className="absolute inset-0 bg-radial-[circle_at_30%_50%] from-transparent via-white/10 to-white/70 lg:to-white/20 mix-blend-multiply pointer-events-none" />
      </div>

      {/* 4. Interactive Navbar */}
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent backdrop-blur-md lg:backdrop-blur-none bg-white/40 lg:bg-transparent border-b border-neutral-100 lg:border-none">
        {/* Logo block (Left side) */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="flex flex-row items-center gap-3 cursor-pointer group"
        >
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Dino&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1 group-hover:rotate-45 transition-transform duration-300">
            &#10033;
          </span>
        </div>

        {/* Desktop Nav Links (Center) - High-end, custom typography dividers */}
        <nav className="hidden md:flex flex-row items-center text-[23px] text-black font-normal">
          <button 
            onClick={() => scrollToSection(introRef)} 
            className="hover:opacity-60 transition-opacity cursor-pointer"
          >
            {t.navAbout}
          </button>
          <span className="opacity-40">,&nbsp;</span>
          
          <button 
            onClick={() => scrollToSection(servicesRef)} 
            className="hover:opacity-60 transition-opacity cursor-pointer"
          >
            {t.navServices}
          </button>
          <span className="opacity-40">,&nbsp;</span>

          <a 
            href="https://shopdino.id.vn/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-60 transition-opacity flex items-center gap-1 cursor-pointer font-medium text-emerald-900"
          >
            {t.navShop}
          </a>
          <span className="opacity-40">,&nbsp;</span>

          <button 
            onClick={() => scrollToSection(contactRef)} 
            className="hover:opacity-60 transition-opacity cursor-pointer"
          >
            {t.navContact}
          </button>
        </nav>

        {/* Desktop CTA + Language Selector (Right side) */}
        <div className="hidden md:flex flex-row items-center gap-6">
          {/* Active styling language toggle (4 languages) */}
          <div className="flex bg-neutral-100/80 p-0.5 rounded-lg border border-neutral-200 text-[10px]">
            {(["vi", "en", "ja", "ko"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded-md transition-all font-semibold uppercase ${
                  lang === l ? "bg-white text-black shadow-xs font-bold" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {l === "vi" ? "TIẾNG VIỆT" : l === "en" ? "EN" : l === "ja" ? "日本語" : "한국어"}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection(contactRef)}
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity font-medium"
          >
            {t.ctaText}
          </button>
        </div>

        {/* Mobile Hamburger menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Direct 4-language switcher pills for instant mobile action */}
          <div className="flex bg-neutral-900/90 p-0.5 rounded-full border border-neutral-800 text-[10px]">
            {(["vi", "en", "ja", "ko"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded-full transition-all font-bold uppercase text-[9px] ${
                  lang === l ? "bg-emerald-600 text-white font-extrabold shadow-xs" : "text-neutral-400 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            id="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col gap-[5px] p-2 focus:outline-none relative z-20"
            aria-label="Toggle Mobile Menu"
          >
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Full-screen Overlay */}
      <div
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-all duration-500 lg:hidden flex flex-col justify-center items-center px-8 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 text-center text-2xl font-medium tracking-tight text-neutral-900 mb-8">
          <button
            onClick={() => scrollToSection(introRef)}
            className="py-2 hover:text-emerald-800 transition-colors"
          >
            {t.navAbout}
          </button>
          <button
            onClick={() => scrollToSection(servicesRef)}
            className="py-2 hover:text-emerald-800 transition-colors"
          >
            {t.navServices}
          </button>
          <a
            href="https://shopdino.id.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 hover:text-emerald-800 transition-colors text-emerald-700 font-bold flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-5 h-5 inline" /> {t.navShop}
          </a>
          <button
            onClick={() => scrollToSection(contactRef)}
            className="py-2 hover:text-emerald-800 transition-colors"
          >
            {t.navContact}
          </button>
        </div>

        <div className="w-full max-w-xs border-t border-neutral-100 pt-6 flex flex-col items-center gap-4">
          <p className="text-xs text-neutral-400 font-mono tracking-wider uppercase">Quick Connect</p>
          <a
            href="https://zalo.me/0768850193"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl text-center font-semibold bg-[#1C2E1E] text-white hover:bg-opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
          >
            <MessageSquare className="w-4 h-4" /> Zalo: 0768850193
          </a>
          <a
            href="tel:0768850193"
            className="w-full py-3 px-4 rounded-xl text-center font-semibold bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4 text-emerald-700 animate-pulse" /> Hotline: 0768850193
          </a>

          {/* Quick toggle inside mobile drawer with 4 languages support */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="text-xs text-neutral-400">Language:</span>
            {(["vi", "en", "ja", "ko"] as const).map((l, idx) => (
              <React.Fragment key={l}>
                {idx > 0 && <span className="text-xs text-neutral-300">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`text-xs font-bold ${
                    lang === l ? "text-emerald-700 underline" : "text-neutral-500"
                  }`}
                >
                  {l === "vi" ? "Tiếng Việt" : l === "en" ? "English" : l === "ja" ? "日本語" : "한국어"}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Content Layout Container */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        
        {/* Overarching layout engine */}
        <main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 py-12 pt-28 lg:pt-32 flex-1 flex flex-col justify-center">
          
          {/* Header Row: Showcase Tag line and Live clocks to make screen look complete */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-neutral-200 pb-4 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span className="text-xs font-medium uppercase tracking-widest text-[#4D6D47]">
                {lang === "vi" ? "Trang giới thiệu & liên hệ cá nhân chính thức" 
                 : lang === "en" ? "Official Personal Bio & Contact Page"
                 : lang === "ja" ? "公式個人プロフィール＆お問い合わせページ"
                 : "공식 개인 프로필 및 문의 페이지"}
              </span>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              UTC: 2026-06-15 | PHAT DATT
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left side: Main Typewriter Content, Bio Description, and Contact status */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center">
              
              {/* Typewriter Hook and Headline */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.02 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <span className="block text-xs uppercase tracking-[0.25em] text-neutral-400 font-bold mb-4">
                  {lang === "vi" ? "✦ KHÔNG GIAN SÁNG TẠO SỐ" 
                   : lang === "en" ? "✦ DIGITAL CREATIVE SPACE"
                   : lang === "ja" ? "✦ デジタルクリエイティブスペース"
                   : "✦ 디지털 크리에이티브 스페이스"}
                </span>

                <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-1.5 select-none w-full whitespace-pre-wrap">
                  {displayed}
                  {!done && (
                    <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
                  )}
                </h1>
                
                {/* Under Vietnamese mode (primary), we also load minor english subtitles nicely */}
                <p className="text-neutral-400 text-sm italic font-medium tracking-wide mb-6">
                  {t.headlineSubtitle}
                </p>
              </motion.div>

              {/* 7. Secondary Description Text */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.02 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                {(t.descriptionMain || t.descriptionSub) ? (
                  <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-8 max-w-2xl">
                    {t.descriptionMain && <strong>{t.descriptionMain}</strong>}
                    {t.descriptionMain && t.descriptionSub && <br />}
                    {t.descriptionSub && (
                      <span className="text-neutral-500 text-base block mt-2 font-normal">
                        {t.descriptionSub}
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-sm border border-dashed border-neutral-200 bg-neutral-50/50 p-4 rounded-xl text-neutral-400 mb-8 max-w-2xl">
                    {lang === "vi" ? "● Phần nội dung mô tả giới thiệu chung (Chỉnh sửa nội dung trong translations.lang.description)" : lang === "en" ? "● Global introduction description section (Edit content in translations.lang.description)" : lang === "ja" ? "● グローバル紹介用の説明セクション (translations.lang.description で編集してください)" : "● 글로벌 비즈니스 소개 문구 섹션 (translations.lang.description 에서 편리하게 편집 가능합니다)"}
                  </p>
                )}

                {/* DIRECT QUICK ACTIONS GRID: Shop link Dino and Instant Zalo/Phone channels */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-12 max-w-2xl">
                  
                  {/* Shop Dino Promotion Button card */}
                  <a
                    href="https://shopdino.id.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-emerald-50/20 border border-emerald-100 hover:border-emerald-300 hover:shadow-xs transition-all relative group overflow-hidden"
                  >
                    <div className="absolute right-2.5 top-2.5 opacity-10 group-hover:opacity-20 transition-opacity">
                      <ShoppingBag className="w-12 h-12 text-emerald-900" />
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-600 animate-pulse" />
                      <span>SHOP DINO LIVE</span>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 mb-0.5 group-hover:text-emerald-950 flex items-center gap-1">
                      shopdino.id.vn <ExternalLink className="w-3.5 h-3.5 inline opacity-60" />
                    </p>
                    <span className="text-xs text-neutral-500">
                      {lang === "vi" ? "Ghé cửa hàng quà tặng cực ưu đãi" 
                       : lang === "en" ? "Visit our premium gift store"
                       : lang === "ja" ? "プレミアムギフトショップを訪問"
                       : "프리미엄 기프트 샵 방문하기"}
                    </span>
                  </a>

                  {/* Zalo quick contact card */}
                  <a
                    href="https://zalo.me/0768850193"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-[#E8F3FF]/40 border border-[#CDE1F7] hover:border-[#96C1F2] hover:shadow-xs transition-all relatve group"
                  >
                    <span className="text-[#0D62F3] text-xs font-bold tracking-wider uppercase mb-1 block">
                      ZALO CHAT
                    </span>
                    <p className="text-sm font-bold text-neutral-900 mb-0.5">
                      0768850193
                    </p>
                    <span className="text-xs text-neutral-500 block">
                      {lang === "vi" ? "Phản hồi chỉ sau 5 phút" 
                       : lang === "en" ? "Average reply within 5 mins"
                       : lang === "ja" ? "平均5分以内にご返信"
                       : "평균 5분 이내 신속 답변"}
                    </span>
                  </a>

                  {/* Hot Phone Call dialer */}
                  <a
                    href="tel:0768850193"
                    className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#ECE9E0] hover:border-amber-400 hover:shadow-xs transition-all group"
                  >
                    <span className="text-amber-800 text-xs font-bold tracking-wider uppercase mb-1 block flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-600 animate-bounce" /> HOTLINE
                    </span>
                    <p className="text-sm font-bold text-neutral-900 mb-0.5">
                      0768850193
                    </p>
                    <span className="text-xs text-neutral-500 block">
                      {lang === "vi" ? "Hỗ trợ điện thoại 24/7" 
                       : lang === "en" ? "Voice call line active 24/7"
                       : lang === "ja" ? "24時間年中無休の電話対応"
                       : "365일 24시간 전화 상담 지원"}
                    </span>
                  </a>

                </div>
              </motion.div>

              {/* 8. Interactive Multi-Select Service Pills Section */}
              <motion.div
                ref={servicesRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.05 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl mb-12 scroll-mt-24"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-medium tracking-tight text-neutral-900 mb-1">
                    {t.servicesTitle}
                  </h3>
                  <p className="text-sm text-neutral-400 uppercase tracking-widest font-mono">
                    ✦ {t.servicesSubtitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 mb-6">
                  {["Brand", "Digital", "Campaign", "Other"].map((serviceOption) => {
                    const isSelected = services.includes(serviceOption);
                    return (
                      <motion.button
                        key={serviceOption}
                        onClick={() => toggleService(serviceOption)}
                        className={`px-5 py-3 rounded-full text-base font-semibold cursor-pointer transition-all duration-200 flex items-center ${
                          isSelected
                            ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform scale-102"
                            : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
                        }`}
                        whileTap={{ scale: 0.97 }}
                        type="button"
                      >
                        <AnimatePresence mode="wait">
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="inline-flex mr-2 text-emerald-400"
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <span>{serviceOption}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Custom Elegant Explanations Panel revealing selected items dynamically */}
                <div className="space-y-3 mb-6">
                  <AnimatePresence initial={false}>
                    {["Brand", "Digital", "Campaign"].map((itemKey) => {
                      const isSelected = services.includes(itemKey);
                      if (!isSelected) return null;
                      const expl = SERVICE_EXPLANATIONS[lang]?.[itemKey];
                      if (!expl) return null;
                      return (
                        <motion.div
                          key={`explain-${itemKey}`}
                          initial={{ opacity: 0, height: 0, y: -8 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -8 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/60 text-xs sm:text-sm text-[#4D6D47] flex gap-3 items-start shadow-xs">
                            <Info className="w-4.5 h-4.5 text-emerald-800 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-emerald-950 font-bold block mb-1">
                                {expl.title}
                              </strong>
                              <p className="leading-relaxed font-normal">
                                {expl.desc}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Contingent Feedback Status Banner */}
                <div className="min-h-[50px] relative">
                  <AnimatePresence mode="wait">
                    {services.length === 0 ? (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 0.5, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="italic text-xs text-neutral-500 font-sans pl-2"
                      >
                        ● {t.emptySelection}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="active-banner"
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#FAFBF9] border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs"
                      >
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#4D6D47] font-bold block mb-1">
                            {t.activeSelectionPrefix}
                          </span>
                          <span className="text-base font-semibold text-neutral-900">
                            {services.join(", ")}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setShowInquiryPanel(true);
                            // Smooth scroll directly to inquiry fields
                            setTimeout(() => {
                              if (contactRef.current) {
                                contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                              }
                            }, 100);
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1C2E1E] text-white hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider"
                        >
                          <span className="text-white uppercase text-xs">{t.ctaGo}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

            </div>

          </div>

          {/* SECTION: Giới thiệu cá nhân (Personal Spotlight Section) */}
          <motion.div 
            ref={introRef} 
            id="intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.6 }}
            className="mt-16 sm:mt-24 pt-16 border-t border-dashed border-neutral-200 scroll-mt-24"
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-emerald-800" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#4D6D47]">
                  {lang === "vi" ? "HỒ SƠ CÁ NHÂN CHUYÊN NGHIỆP" 
                   : lang === "en" ? "EXECUTIVE PORTFOLIO BIOGRAPHY"
                   : lang === "ja" ? "プロフェッショナルプロフィール"
                   : "프로페셔널 포트폴리오"}
                </h2>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 mb-6">
                {t.personalTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Showcase Avatar badge / representation of Dino Phat Datt */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#FAFBF9] rounded-3xl border border-neutral-150 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 text-neutral-200 pointer-events-none text-8xl font-black select-none">
                    D®
                  </div>
                  
                  <div className="w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center text-white mb-4 relative z-5 border-4 border-white shadow-md">
                    <span className="text-2xl font-bold font-mono tracking-tighter">DINO</span>
                  </div>

                  <h4 className="font-bold text-neutral-900 text-lg text-center mb-1">Phat Datt</h4>
                  <p className="text-xs text-neutral-500 font-mono mb-4 text-center">Web Tech & Brand Specialist</p>

                  <div className="w-full space-y-2 mt-2">
                    <a
                      href="https://shopdino.id.vn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-white border border-neutral-200 hover:border-emerald-700 hover:text-emerald-700 text-neutral-700 text-xs text-center rounded-xl font-medium transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Visit Shop Dino
                    </a>
                    
                    <a
                      href="https://zalo.me/0768850193"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-[#E9F2FE] text-[#0A5CE5] hover:bg-[#D5E6FC] text-xs text-center rounded-xl font-medium transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Zalo chat ngay
                    </a>
                  </div>
                </div>

                {/* Right text profile content */}
                <div className="md:col-span-8 space-y-5 text-[#5A635A]">
                  <span className="inline-block py-1 px-3.5 bg-emerald-50 text-[#1C2E1E] text-xs font-semibold rounded-full border border-emerald-100">
                    ✦ {t.personalBadge}
                  </span>

                  {t.personalBio ? (
                    <p className="text-base sm:text-lg leading-relaxed font-normal">
                      {t.personalBio}
                    </p>
                  ) : (
                    <p className="text-sm border border-dashed border-neutral-200 bg-white p-4 rounded-xl text-neutral-400 italic">
                      {lang === "vi" ? "● Phần giới thiệu cá nhân / Tiểu sử tóm tắt (Chỉnh sửa nội dung trong translations.lang.personalBio)" : lang === "en" ? "● Professional portfolio bio autobiography section (Edit content in translations.lang.personalBio)" : lang === "ja" ? "● 自己紹介セクション (translations.lang.personalBio で編集してください)" : "● 개인 약력 및 프로필 설명란 (translations.lang.personalBio 에서 직접 편집이 가능합니다)"}
                    </p>
                  )}

                  <p className="text-sm font-semibold text-[#1C2E1E] bg-[#FAFBF9] border-l-4 border-[#1C2E1E] p-3 rounded-r-xl italic">
                    ⭐ {t.personalExp}
                  </p>

                  <div className="pt-4 border-t border-neutral-100">
                    <h5 className="text-xs text-neutral-400 font-mono tracking-wider uppercase mb-2">Core Tech Competencies</h5>
                    <p className="text-xs leading-relaxed font-mono text-neutral-600 bg-[#FAFBF9] p-3 rounded-xl border border-neutral-100">
                      {t.personalTech}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* SECTION: Contact Form & Message Channels */}
          <motion.div
            ref={contactRef}
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.6 }}
            className="mt-16 sm:mt-24 pt-16 border-t border-dashed border-neutral-200 mb-12 scroll-mt-24"
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Contact className="w-5 h-5 text-emerald-800" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#4D6D47]">
                  {lang === "vi" ? "LIÊN HỆ TRỰC TIẾP" 
                   : lang === "en" ? "DIRECT CONNECT CHANNELS"
                   : lang === "ja" ? "直接お問い合わせ"
                   : "다이렉트 문의 채널"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Left hand direct contact values */}
                <div className="md:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-2xl font-medium text-neutral-900 mb-2">
                      {t.quickContactTitle}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {lang === "vi" ? "Liên hệ trực tiếp qua Hotline/Zalo hoặc ghé thăm gian hàng Dino Shop của tôi để nhận nhiều ưu đãi sản phẩm số chất lượng cao."
                       : lang === "en" ? "Reach out via Phone/Zalo chat or check out my Dino gift shop for stellar physical & digital collectibles."
                       : lang === "ja" ? "HotlineまたはZaloチャットから直接お問い合わせいただくか、高品質なデジタル製品とギフトを揃えたDino Shopをご覧ください。"
                       : "핫라인 또는 Zalo 채팅으로 직접 문의하거나, 고품질 디지털 상품과 선물이 가득한 Dino Shop을 방문해 보세요."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Hotline Phone Block */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFBF9] border border-neutral-150 hover:bg-white hover:shadow-xs transition-all">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#1C2E1E] shrink-0">
                        <Phone className="w-5 h-5 text-emerald-900" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 font-mono block">HOTLINE TELEPHONE</span>
                        <a href="tel:0768850193" className="text-base font-bold text-neutral-900 hover:text-emerald-800 transition-colors">
                          0768850193
                        </a>
                      </div>
                    </div>

                    {/* Zalo Messenger Block */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFBF9] border border-neutral-150 hover:bg-white hover:shadow-xs transition-all">
                      <div className="w-10 h-10 rounded-full bg-[#E5F1FF] flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5 text-[#0A5CE5]" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 font-mono block">ZALO MASS MESSANGER</span>
                        <a href="https://zalo.me/0768850193" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-neutral-900 hover:text-emerald-800 transition-colors">
                          0768850193 (Phat Datt)
                        </a>
                      </div>
                    </div>

                    {/* Shop Dino URL Block */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFBF9] border border-neutral-150 hover:bg-white hover:shadow-xs transition-all">
                      <div className="w-10 h-10 rounded-full bg-[#E8F8F0] flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-5 h-5 text-[#107C41]" />
                      </div>
                      <div>
                        <span className="text-xs text-neutral-400 font-mono block">DINO GIFT SHOP OFFICIAL</span>
                        <a href="https://shopdino.id.vn/" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-emerald-900 hover:underline flex items-center gap-1">
                          shopdino.id.vn <ExternalLink className="w-3.5 h-3.5 inline opacity-80" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50/50 rounded-2xl border border-yellow-105 text-xs text-neutral-600 space-y-1.5 animate-pulse">
                    <p className="font-semibold text-yellow-905">
                      {lang === "vi" ? "🔒 Xác minh bảo mật" 
                       : lang === "en" ? "🔒 Secure Verification" 
                       : lang === "ja" ? "🔒 安全な通信保護" 
                       : "🔒 안전한 보안 연결"}
                    </p>
                    <p>
                      {lang === "vi" ? "Mọi thông tin liên hệ và lịch sử đăng ký dịch vụ của khách hàng đều được xử lý bí mật tuyệt đối." 
                       : lang === "en" ? "All client communications and services selection records are securely handled. Your details are strictly end-to-end confidential." 
                       : lang === "ja" ? "お客様の機密データやサービス選択ログは暗号化され、エンドツーエンドで徹底的に安全に保護されます。" 
                       : "모든 클라이언트 문의 및 서비스 선택 내역은 암호화 환경에서 종단간으로 철저히 비밀로 보장됩니다."}
                    </p>
                  </div>
                </div>

                {/* Right hand beautiful interactive form */}
                <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-neutral-150 shadow-xs relative">
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-800" />
                    {t.contactHeader}
                  </h3>

                  {services.length > 0 && (
                    <div className="mb-4 p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
                      <span className="text-neutral-400 block font-semibold uppercase tracking-wider mb-1">
                        Selected Services:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {services.map((item) => (
                          <span key={item} className="px-2 py-0.5 rounded-md bg-[#1C2E1E] text-white font-mono text-[11px]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        {lang === "vi" ? "Họ và tên của bạn" : "Your name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder={t.placeholderName}
                        className="w-full p-3 rounded-xl border border-neutral-200 focus:border-[#1C2E1E] focus:outline-none text-sm bg-neutral-50 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                        {lang === "vi" ? "Lời nhắn / Yêu cầu" : "Brief notes"}
                      </label>
                      <textarea
                        rows={4}
                        value={senderMessage}
                        onChange={(e) => setSenderMessage(e.target.value)}
                        placeholder={t.placeholderMessage}
                        className="w-full p-3 rounded-xl border border-neutral-200 focus:border-[#1C2E1E] focus:outline-none text-sm bg-neutral-50 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      {/* Form action to copy to Zalo chat */}
                      <a
                        href={getZaloLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl text-center font-bold bg-[#0A5CE5] text-white hover:bg-[#084EC4] active:scale-98 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                      >
                        <MessageSquare className="w-4 h-4 text-white animate-pulse" />
                        {t.btnSendZalo}
                      </a>

                      <button
                        type="submit"
                        disabled={!senderName}
                        className="py-3 px-4 rounded-xl font-bold bg-[#1C2E1E] text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {t.btnSendForm}
                      </button>
                    </div>
                  </form>

                  {/* Form Submitted Success State overlay */}
                  <AnimatePresence>
                    {formSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/98 z-10 rounded-3xl flex flex-col justify-center items-center p-8 text-center"
                      >
                        <CheckCircle2 className="w-14 h-14 text-emerald-600 mb-4 animate-bounce" />
                        <h4 className="text-xl font-bold text-neutral-900 mb-2">
                          {lang === "vi" ? "Gửi thông tin thành công!" : "Submission received!"}
                        </h4>
                        <p className="text-sm text-neutral-500 max-w-sm mb-6">
                          {t.formSuccess}
                        </p>
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="px-4 py-2 rounded-xl bg-neutral-150 text-neutral-800 hover:bg-neutral-200 text-xs font-semibold uppercase tracking-wider"
                        >
                          {lang === "vi" ? "Đóng" : "Close"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>
            </div>
          </motion.div>

          {/* Minimalist Footing line representing personal trademark */}
          <footer className="mt-20 pt-8 border-t border-neutral-100 text-xs text-neutral-400 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p>© 2026 Dino Space / Phat Datt. All Rights Reserved.</p>
              <div className="flex items-center gap-4">
                <a href="https://shopdino.id.vn/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-800 font-semibold underline">Dino Shop</a>
                <span>•</span>
                <span>Zalo/Phone: 0768850193</span>
              </div>
            </div>
          </footer>

        </main>
      </div>

    </div>
  );
}
