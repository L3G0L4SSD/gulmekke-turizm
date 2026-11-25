/**
 * GÜL MEKKE MÜKERREM TURİZM
 * Resmi Kurumsal Yapılandırma ve Gerçek Broşür Fiyat Yönetimi
 */

export const COMPANY_CONFIG = {
  name: "GÜL MEKKE MÜKERREM TURİZM",
  shortName: "Gül Mekke Turizm",
  slogan: "Kadim Bir Gelenek",
  tagline: "Kutsal Topraklara Güvenilir, Manevi ve Huzurlu Bir Vuslat",
  description: "Hac ve Umre organizasyonlarında kadim bir gelenek. Mahbes bölgesi ve Kâbeye 250 metre Sunrise Ajyad Hotel programlarımızda 1.200 $'dan başlayan şok Umre fiyatları, 2, 3 ve 4 kişilik oda seçenekleri ve anlaşmalı bankalarla taksit imkanları.",
  logoUrl: "/assets/images/logo.jpg",
  website: "www.gulmekketurizm.com",
  instagramUrl: "https://www.instagram.com/gulmekketurizm/",
  instagramHandle: "@gulmekketurizm",
  instagramHandleAlt: "@gulmekketur",

  // Yasal Akreditasyonlar & Güven Sinyalleri
  credentials: {
    tursab: {
      title: "TÜRSAB A Grubu Seyahat Acentesi",
      no: "T.C. Kültür ve Turizm Bakanlığı",
      description: "Resmi Belgeli ve Güvenilir Turizm Acentesi"
    },
    diyanet: {
      title: "Diyanet İşleri Başkanlığı",
      no: "Sözleşmeli Yetkili Acente",
      description: "Hac ve Umre Hizmetleri Genel Müdürlüğü Akreditasyonu"
    },
    nusuk: {
      title: "Suudi Arabistan Hac Bakanlığı (Nusuk)",
      no: "Resmi Vize ve Tur Yetkilendirmesi",
      description: "Doğrudan Suudi Arabistan Entegratörü"
    },
    odeme: {
      title: "Kolay Ödeme & Taksit İmkanı",
      no: "Anlaşmalı Bankalarla Vade Farksız",
      description: "2, 3 ve 4 Kişilik Oda Seçeneklerinde Esnek Ödeme"
    }
  },

  // Faaliyet ve Hizmet Alanları
  activities: [
    "HAC & UMRE TURLARI",
    "EKONOMİK UMRE",
    "YURT İÇİ & YURT DIŞI TURLARI"
  ],

  // İletişim Bilgileri (Broşür Gerçek Verileri)
  contact: {
    primaryPhone: "0532 430 82 44",
    secondaryPhone: "0534 773 30 44",
    callCenter: "0850 259 14 86",
    whatsapp: "+90 532 430 82 44",
    whatsappSecondary: "+90 534 773 30 44",
    whatsappMessage: "Selamünaleyküm Gül Mekke Turizm yetkilisi, güncel broşürünüzdeki 1.200 $'dan başlayan Umre tur programlarınız, oda fiyatları ve taksit seçenekleri hakkında bilgi almak istiyorum.",
    email: "bilgi@gulmekketurizm.com",
    instagram: "https://www.instagram.com/gulmekketurizm/",
    instagramAlt: "https://www.instagram.com/gulmekketur/",
    address: "Uğur Mumcu Mahallesi Atatürk Bulvarı No:16 Daire:3 Sultangazi / İSTANBUL, Turkey 34000 (Merkez Müftülüğün Karşısı)",
    addresses: [
      {
        city: "Merkez Ofis (Sultangazi)",
        address: "Uğur Mumcu Mahallesi Atatürk Bulvarı No:16 Daire:3 Sultangazi / İSTANBUL, Turkey 34000 (Merkez Müftülüğün Karşısı)",
        phone: "0532 430 82 44"
      },
      {
        city: "Çağrı Merkezi",
        address: "7/24 Kesintisiz Bilgi ve Destek Hattı",
        phone: "0850 259 14 86"
      },
      {
        city: "Mobil Danışma & Kayıt",
        address: "WhatsApp & Hızlı Rezervasyon Koordinasyonu",
        phone: "0534 773 30 44"
      }
    ]
  },

  // Oda Seçenekleri (Broşürdeki 2, 3 ve 4 Kişilik Fiyat Skalası)
  roomTypes: [
    {
      id: "4-kisilik",
      title: "4 Kişilik Oda (Quad)",
      badge: "1.200 $'dan Başlayan Fiyatlar",
      desc: "Geniş ve ferah oda düzeni. Broşürümüzün en ekonomik ve bütçe dostu tercihi.",
      priceTag: "1.200 $"
    },
    {
      id: "3-kisilik",
      title: "3 Kişilik Oda (Triple)",
      badge: "1.300 $'dan Başlayan Fiyatlar",
      desc: "Çekirdek aileler ve arkadaş grupları için ideal konfor ve ferahlık dengesi.",
      priceTag: "1.300 $"
    },
    {
      id: "2-kisilik",
      title: "2 Kişilik Özel Oda (Double)",
      badge: "1.350 $'dan Başlayan Fiyatlar",
      desc: "Eşler ve baş başa seyahat edenler için tam bağımsız, huzurlu ve özel konaklama.",
      priceTag: "1.350 $"
    }
  ],

  // Broşürdeki 6 Gerçek Umre Paketi (Apple "Explore the lineup" Standartlarında)
  packages: [
    {
      id: "mahbes-15-gunluk",
      badge: "Şok Fiyat",
      name: "15 Günlük Umre",
      region: "Mahbes Bölgesi",
      duration: "15 Günlük Program",
      bgTint: "#edf5f0",
      image: "/assets/images/kaaba_4k_wide.jpg",
      caption: "Mahbes Bölgesi. 15 gün doya doya ibadet ve mukaddes mekan ziyaretleri.",
      roomPricing: {
        quad: "1.200 $",
        triple: "1.300 $",
        double: "1.350 $"
      },
      startingPrice: "1.200 $",
      highlights: [
        "Gidiş-Dönüş Uçak Bileti ve Vize İşlemleri Dahil",
        "Mekke ve Medine Mukaddes Mekan Ziyaretleri",
        "Tecrübeli Din Görevlileri ile Manevi Rehberlik",
        "Anlaşmalı Bankalarla Vade Farksız Taksit İmkanı"
      ]
    },
    {
      id: "mahbes-20-gunluk",
      badge: "Geniş Vakit",
      name: "20 Günlük Umre",
      region: "Mahbes Bölgesi",
      duration: "20 Günlük Program",
      bgTint: "#f6f4ed",
      image: "/assets/images/medina_4k_wide.jpg",
      caption: "Mahbes Bölgesi. 20 gün kesintisiz nafile tavaflar, huşu ve geniş zaman.",
      roomPricing: {
        quad: "1.250 $",
        triple: "1.350 $",
        double: "1.400 $"
      },
      startingPrice: "1.250 $",
      highlights: [
        "20 Gün Boyunca Doya Doya İbadet ve Ziyaret",
        "Gidiş-Dönüş Uçak Bileti ve Vize İşlemleri Dahil",
        "Klimalı Konforlu Otobüslerle Transferler",
        "Anlaşmalı Bankalarla Vade Farksız Taksit İmkanı"
      ]
    },
    {
      id: "ramazan-35-gunluk",
      badge: "İtikaf & Kadir Gecesi",
      name: "35 Günlük Ramazan",
      region: "Mahbes Bölgesi",
      duration: "35 Günlük Ramazan Programı",
      bgTint: "#f4f1ea",
      image: "/assets/images/kaaba_night.jpg",
      caption: "Ramazan ayı boyu Beytullah'ta teravih, hatim ve Kadir Gecesi itikafı.",
      roomPricing: {
        quad: "1.850 $",
        triple: "1.900 $",
        double: "2.050 $"
      },
      startingPrice: "1.850 $",
      highlights: [
        "Ramazan-ı Şerif'in Manevi İklimi ve Kadir Gecesi",
        "Beytullah'ta Teravih, Hatim ve İtikaf İmkânı",
        "İftar ve Sahur Organizasyonları",
        "Anlaşmalı Bankalarla Vade Farksız Taksit İmkanı"
      ]
    },
    {
      id: "ocak-15-gunluk",
      badge: "Sömestr Özel",
      name: "15 Günlük Ocak Ayı",
      region: "Mahbes Bölgesi",
      duration: "15 Günlük Ocak Turu",
      bgTint: "#edf3f7",
      image: "/assets/images/medina_nabawi.jpg",
      caption: "Ocak tatilinde aileniz ve evlatlarınızla maneviyat dolu kış umresi.",
      roomPricing: {
        quad: "1.250 $",
        triple: "1.300 $",
        double: "1.400 $"
      },
      startingPrice: "1.250 $",
      highlights: [
        "Ocak Ayı Sömestr ve Tatil Dönemine Özel Tarihler",
        "Gidiş-Dönüş Uçak Bileti ve Vize İşlemleri Dahil",
        "Mekke ve Medine Mukaddes Ziyaretler",
        "Anlaşmalı Bankalarla Vade Farksız Taksit İmkanı"
      ]
    },
    {
      id: "ocak-20-gunluk",
      badge: "Kış Dönemi",
      name: "20 Günlük Ocak Ayı",
      region: "Mahbes Bölgesi",
      duration: "20 Günlük Ocak Turu",
      bgTint: "#f3edf7",
      image: "/assets/images/medina_4k.jpg",
      caption: "Serin kış günlerinde 20 gün boyunca huzurlu ve ferah ibadet takvimi.",
      roomPricing: {
        quad: "1.300 $",
        triple: "1.400 $",
        double: "1.450 $"
      },
      startingPrice: "1.300 $",
      highlights: [
        "Kış Mevsiminde 20 Gün Rahat ve Ferah İbadet",
        "Gidiş-Dönüş Uçak Bileti ve Vize İşlemleri Dahil",
        "Klimalı Lüks Otobüslerle Şehir ve Ziyaret Transferleri",
        "Anlaşmalı Bankalarla Vade Farksız Taksit İmkanı"
      ]
    },
    {
      id: "sunrise-ajyad-15-gunluk",
      badge: "Kâbeye 250m VIP",
      name: "Sunrise Ajyad Hotel",
      region: "Kâbeye Yakınlığı 250 Metre",
      duration: "15 Günlük Program",
      bgTint: "#fbf5e6",
      image: "/assets/images/kaaba_4k.jpg",
      caption: "Kâbe-i Muazzama'ya yalnızca 250 metre mesafede; servissiz 3 dakikada Harem.",
      roomPricing: {
        quad: "1.600 $",
        triple: "1.650 $",
        double: "1.750 $"
      },
      startingPrice: "1.600 $",
      highlights: [
        "Kâbe-i Muazzama'ya Yalnızca 250 Metre Mesafede",
        "Servissiz, Yürüyerek 3-4 Dakikada Harem-i Şerif",
        "Yaşlı ve Yürüme Güçlüğü Çeken Misafirlerimiz İçin İdeal",
        "Anlaşmalı Bankalarla Vade Farksız Taksit İmkanı"
      ]
    }
  ],

  // Kutsal Yolculuk Aşamaları (Yatay İnteraktif Slider)
  journeySteps: [
    {
      step: "01",
      title: "İhram ve Mikat Sınırı",
      subtitle: "Dünyadan Tecelliye",
      tag: "ADIM I • DÜNYADAN TECELLİYE",
      image: "/assets/images/kaaba_night.jpg",
      description: "Gül Mekke Turizm kafilemizle Mikat hizasında dualarla bürünülen ihram örtüsü; gönülleri arındıran, zengin-fakir ayrımını ortadan kaldıran ilk mukaddes basamak."
    },
    {
      step: "02",
      title: "Beytullah ile İlk Buluşma",
      subtitle: "Gözyaşları ve Heyecan",
      tag: "ADIM II • GÖZLERİN BULUŞMASI",
      image: "/assets/images/kaaba_4k_wide.jpg",
      description: "Bab-üs Selam kapısından Harem-i Şerif'e girip Kâbe-i Muazzama'yı ilk gördüğünüz an. Gül Mekke hocalarımızın telbiyeleri eşliğinde kalbin en samimi duaları."
    },
    {
      step: "03",
      title: "Tavaf: Kâinatın Kalbinde Dönüş",
      subtitle: "Aşk ile Yedi Şavt",
      tag: "ADIM III • AŞK İLE YEDİ ŞAVT",
      image: "/assets/images/kaaba_4k.jpg",
      description: "Hacerü'l-Esved hizasından başlayıp Kâbe'nin etrafında dönen milyonlarca kardeşimizle omuz omuza, günahlardan arınma ve yenilenme vakti."
    },
    {
      step: "04",
      title: "Safa ile Merve: Sa'y İbadeti",
      subtitle: "Hacer Validemizin İzinde",
      tag: "ADIM IV • BİR ANNENİN ADANMIŞLIĞI",
      image: "/assets/images/kiswah_gold.jpg",
      description: "Zemzem ikramından sonra Safa ve Merve tepeleri arasındaki arayış ve teslimiyet yürüyüşü. Duaların kabul olduğu, rahmetin tecelli ettiği mukaddes durak."
    },
    {
      step: "05",
      title: "Medine-i Münevvere & Ravza",
      subtitle: "Gül Kokulu Beldeye Selam",
      tag: "ADIM V • HUZUR ŞEHRİ",
      image: "/assets/images/medina_nabawi.jpg",
      description: "Mescid-i Nebevi'de, Cennet Bahçesi'nde (Ravza-i Mutahhara) Peygamber Efendimiz'e (s.a.v.) sunulan salat ve selamların huzur dolu atmosferi."
    }
  ],

  // Hizmet Ayrıcalıkları
  services: [
    {
      icon: "Hotel",
      title: "1.200 $'dan Başlayan Fiyatlar",
      desc: "Broşürümüzdeki şok Umre fiyatları ile 2, 3 ve 4 kişilik oda seçeneklerinde her bütçeye uygun mukaddes yolculuk."
    },
    {
      icon: "CreditCard",
      title: "Kolay Taksit İmkanı",
      desc: "Anlaşmalı banka kartlarına vade farksız taksit seçenekleri ile ödemenizi rahatça planlayabilirsiniz."
    },
    {
      icon: "Users",
      title: "Kadim Tecrübeli Rehber Kadrosu",
      desc: "Yıllardır kutsal beldelerde hizmet veren ilahiyatçı hocalarımız eşliğinde şuurlu ve edep dolu bir ibadet."
    },
    {
      icon: "Sparkles",
      title: "Kâbeye 250m Sunrise Ajyad Hotel",
      desc: "Ecyad bölgesinde Kâbe'ye yalnızca 250 metre yürüme mesafesinde 3 yıldızlı seçkin konaklama imkanı."
    }
  ]
};
