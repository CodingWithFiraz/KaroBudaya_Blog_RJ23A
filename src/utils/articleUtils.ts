
import { Article, ArticleFormData, Category, KulinerSubcategory, MapLocation } from '@/types/article';
import { Block } from '@/types/blocks';

// In a real application, this would be replaced with API calls to a backend server
// For this demo, we'll use localStorage to persist data

const STORAGE_KEY = 'karo-blog-articles';

export const getAllArticles = (): Article[] => {
  const articles = localStorage.getItem(STORAGE_KEY);
  return articles ? JSON.parse(articles) : [];
};

export const getPublishedArticles = (): Article[] => {
  return getAllArticles().filter(article => !article.isDraft);
};

export const getDraftArticles = (): Article[] => {
  return getAllArticles().filter(article => article.isDraft);
};

export const getArticleById = (id: string): Article | undefined => {
  return getAllArticles().find(article => article.id === id);
};

export const getArticlesByCategory = (category: Category): Article[] => {
  return getPublishedArticles().filter(article => article.category === category);
};

export const getArticlesBySubcategory = (category: Category, subcategory: KulinerSubcategory): Article[] => {
  return getPublishedArticles().filter(
    article => article.category === category && article.subcategory === subcategory
  );
};

export const saveArticle = (articleData: ArticleFormData, isDraft: boolean): Article => {
  const articles = getAllArticles();
  const now = new Date().toISOString();
  
  // Create a new article
  const newArticle: Article = {
    id: crypto.randomUUID(),
    title: articleData.title,
    content: articleData.content,
    author: articleData.author,
    email: articleData.email,
    category: articleData.category,
    subcategory: articleData.subcategory,
    featuredImage: articleData.featuredImageUrl || '',
    mapLocation: articleData.mapLocation,
    publishDate: isDraft ? undefined : now,
    isDraft,
    createdAt: now,
    updatedAt: now,
    summary: articleData.summary,
    blocks: articleData.blocks
  };
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...articles, newArticle]));
  
  // Dispatch a storage event to notify other tabs/windows
  dispatchStorageEvent();
  
  return newArticle;
};

export const updateArticle = (id: string, articleData: ArticleFormData, isDraft: boolean): Article => {
  const articles = getAllArticles();
  const articleIndex = articles.findIndex(article => article.id === id);
  
  if (articleIndex === -1) {
    throw new Error('Article not found');
  }
  
  const now = new Date().toISOString();
  const existingArticle = articles[articleIndex];
  
  // Update the article
  const updatedArticle: Article = {
    ...existingArticle,
    title: articleData.title,
    content: articleData.content,
    author: articleData.author,
    email: articleData.email,
    category: articleData.category,
    subcategory: articleData.subcategory,
    featuredImage: articleData.featuredImageUrl || existingArticle.featuredImage,
    mapLocation: articleData.mapLocation,
    publishDate: isDraft ? existingArticle.publishDate : (existingArticle.publishDate || now),
    isDraft,
    updatedAt: now,
    summary: articleData.summary || existingArticle.summary,
    blocks: articleData.blocks || existingArticle.blocks
  };
  
  // Replace the old article with the updated one
  articles[articleIndex] = updatedArticle;
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  
  // Dispatch a storage event to notify other tabs/windows
  dispatchStorageEvent();
  
  return updatedArticle;
};

export const deleteArticle = (id: string): boolean => {
  const articles = getAllArticles();
  const updatedArticles = articles.filter(article => article.id !== id);
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
  
  // Dispatch a storage event to notify other tabs/windows
  dispatchStorageEvent();
  
  return updatedArticles.length < articles.length;
};

// Convert file to data URL for storage
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Helper function to dispatch a storage event to notify other tabs/windows
const dispatchStorageEvent = () => {
  // Create a temporary iframe to dispatch a storage event
  // This is a workaround since localStorage events don't fire in the same window
  try {
    localStorage.setItem('karo-blog-sync', Date.now().toString());
  } catch (error) {
    console.error('Error dispatching storage event:', error);
  }
};

export const CATEGORIES: Category[] = [
  'Destinasi & Tempat',
  'Kuliner Karo',
  'Sejarah',
  'Budaya'
];

export const KULINER_SUBCATEGORIES: KulinerSubcategory[] = [
  'Makanan',
  'Minuman'
];

// Sample data for articles
const destinasiBlocks: Block[] = [
  {
    id: "dest1-p1",
    type: "paragraph",
    content: "Kabupaten Karo, yang terletak di dataran tinggi Sumatera Utara, menawarkan pesona alam yang luar biasa dengan pemandangan gunung berapi, danau, dan air terjun yang menakjubkan."
  },
  {
    id: "dest1-h1",
    type: "heading",
    content: "Keindahan Gunung Sibayak",
    level: 2
  },
  {
    id: "dest1-p2",
    type: "paragraph",
    content: "Gunung Sibayak adalah salah satu gunung berapi aktif yang menjadi tujuan pendakian populer di Indonesia. Dengan ketinggian sekitar 2.094 meter di atas permukaan laut, gunung ini menawarkan panorama matahari terbit yang spektakuler dan aktivitas panas bumi yang menarik."
  },
  {
    id: "dest1-img1",
    type: "image",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sibayak.JPG/1024px-Sibayak.JPG",
    alt: "Gunung Sibayak",
    caption: "Pemandangan Gunung Sibayak dari kejauhan"
  },
  {
    id: "dest1-q1",
    type: "quote",
    content: "Sibayak adalah saksi bisu perjalanan budaya Karo dari masa ke masa. Asapnya yang mengepul seolah menceritakan kisah panjang tanah Karo.",
    citation: "Penulis Lokal Karo"
  }
];

const kulinerBlocks: Block[] = [
  {
    id: "kul1-p1",
    type: "paragraph",
    content: "Masakan tradisional Karo dikenal dengan cita rasa yang kuat dan penggunaan rempah-rempah lokal yang melimpah. Berbagai hidangan khas ini telah menjadi bagian penting dari identitas budaya suku Karo."
  },
  {
    id: "kul1-h1",
    type: "heading",
    content: "Babi Panggang Karo (BPK)",
    level: 2
  },
  {
    id: "kul1-p2",
    type: "paragraph",
    content: "Babi Panggang Karo atau yang sering disingkat BPK adalah salah satu makanan khas yang paling populer dari tanah Karo. Hidangan ini terdiri dari potongan daging babi yang dipanggang dengan bumbu khusus, disajikan dengan darah babi yang dimasak bersama rempah, serta sayuran berupa batang kincung (kecombrang) yang diiris halus."
  },
  {
    id: "kul1-img1",
    type: "image",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Babi_panggang_Karo.jpg",
    alt: "Babi Panggang Karo",
    caption: "Hidangan Babi Panggang Karo dengan lauk pendamping"
  },
  {
    id: "kul1-q1",
    type: "quote",
    content: "BPK bukanlah sekadar makanan, tapi filosofi hidup masyarakat Karo yang menghargai kelezatan, kebersamaan, dan tradisi.",
    citation: "Chef Karo"
  }
];

const sejarahBlocks: Block[] = [
  {
    id: "sej1-p1",
    type: "paragraph",
    content: "Sejarah Suku Karo bisa dilacak hingga ratusan tahun yang lalu, dengan catatan-catatan tertua berasal dari zaman kolonial Belanda ketika mereka pertama kali mencapai dataran tinggi Karo pada tahun 1900-an."
  },
  {
    id: "sej1-h1",
    type: "heading",
    content: "Rumah Adat dan Struktur Sosial",
    level: 2
  },
  {
    id: "sej1-p2",
    type: "paragraph",
    content: "Masyarakat Karo tradisional hidup dalam rumah adat yang disebut Siwaluh Jabu, yang berarti 'delapan pintu'. Rumah ini dihuni oleh delapan keluarga yang berbeda marga namun hidup bersama dalam satu atap, menunjukkan sistem kekerabatan yang kuat dalam budaya Karo."
  },
  {
    id: "sej1-img1",
    type: "image",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/COLLECTIE_TROPENMUSEUM_Bataks_huis_in_dorp_Lingga_Karo_hoogvlakte_TMnr_10011623.jpg",
    alt: "Rumah Adat Karo Siwaluh Jabu",
    caption: "Rumah Adat Karo Siwaluh Jabu pada masa kolonial Belanda"
  },
  {
    id: "sej1-q1",
    type: "quote",
    content: "Struktur rumah adat Karo adalah cerminan dari falsafah hidup suku Karo yang memegang teguh nilai kebersamaan, gotong royong, dan kekeluargaan dalam kehidupan sehari-hari.",
    citation: "Antropolog Budaya Karo"
  }
];

const budayaBlocks: Block[] = [
  {
    id: "bud1-p1",
    type: "paragraph",
    content: "Kekayaan budaya Suku Karo tercermin dalam berbagai aspek kehidupan, mulai dari adat istiadat, ritual, hingga kesenian yang masih hidup dan berkembang hingga saat ini."
  },
  {
    id: "bud1-h1",
    type: "heading",
    content: "Gendang Lima Sedalanen",
    level: 2
  },
  {
    id: "bud1-p2",
    type: "paragraph",
    content: "Salah satu bentuk kesenian tradisional yang paling penting dalam budaya Karo adalah musik Gendang Lima Sedalanen. Ansambel musik ini terdiri dari lima instrumen utama: gendang singindungi (gendang induk), gendang singanaki (gendang anak), sarune (alat tiup mirip serunai), penganak (gong kecil), dan gung (gong besar)."
  },
  {
    id: "bud1-img1",
    type: "image",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/91/COLLECTIE_TROPENMUSEUM_Een_groep_Karo_Batakkers_met_muziekinstrumenten_waaronder_een_keteng-keteng_TMnr_10005035.jpg",
    alt: "Pemain Musik Tradisional Karo",
    caption: "Pemain musik tradisional Karo dengan berbagai instrumen"
  },
  {
    id: "bud1-q1",
    type: "quote",
    content: "Dalam setiap getaran gendang dan tiupan sarune, tersimpan jiwa dan semangat masyarakat Karo yang pantang menyerah menghadapi tantangan hidup.",
    citation: "Maestro Musik Tradisional Karo"
  }
];

// Sample articles generator
export const initializeSampleArticles = () => {
  const currentArticles = getAllArticles();
  
  // Only initialize if there are no articles yet
  if (currentArticles.length === 0) {
    const sampleArticles: Article[] = [];
    const categories: Category[] = CATEGORIES;
    const authors = [
      { name: "Wandi Sembiring", email: "wandi@karonews.com" },
      { name: "Mejuah-juah Ginting", email: "mejuah@karonews.com" },
      { name: "Beru Tarigan", email: "beru@karonews.com" },
      { name: "Malem Ukur Karo", email: "malem@karonews.com" },
      { name: "Tigan Purba", email: "tigan@karonews.com" }
    ];
    
    // Function to generate a random date within the last 6 months
    const getRandomDate = () => {
      const now = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const randomTimestamp = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
      return new Date(randomTimestamp).toISOString();
    };
    
    // Generate 10 articles for each category
    categories.forEach(category => {
      for (let i = 0; i < 10; i++) {
        const authorIndex = Math.floor(Math.random() * authors.length);
        const author = authors[authorIndex];
        const createdAt = getRandomDate();
        const isEven = i % 2 === 0;
        
        let title = "";
        let summary = "";
        let blocks: Block[] = [];
        let featuredImage = "";
        
        // Generate different content based on category
        switch (category) {
          case 'Destinasi & Tempat':
            const destinations = [
              "Gunung Sibayak", "Air Terjun Sipiso-piso", "Danau Toba", 
              "Bukit Gundaling", "Desa Lingga", "Pemandian Air Panas Semangat Gunung",
              "Taman Simalem", "Gunung Sinabung", "Desa Dokan", "Taman Alam Lumbini"
            ];
            title = `Menjelajahi Keindahan ${destinations[i]} yang Memukau`;
            summary = `Eksplorasi wisata alam di ${destinations[i]}, salah satu destinasi paling menakjubkan di Tanah Karo dengan pemandangan yang memikat dan pengalaman budaya yang autentik.`;
            featuredImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sibayak.JPG/1024px-Sibayak.JPG";
            blocks = JSON.parse(JSON.stringify(destinasiBlocks));
            blocks[1].content = `Keindahan ${destinations[i]}`;
            break;
            
          case 'Kuliner Karo':
            const foods = ["Babi Panggang Karo", "Arsik", "Tasak Telu", "Cimpa", "Terites", 
                        "Cipera", "Pagit-pagit", "Lemang", "Gulai Ayam Karo", "Sup Gevro"];
            const subcategory = i < 5 ? "Makanan" : "Minuman";
            title = `Mencicipi Kelezatan ${foods[i]} yang Menggugah Selera`;
            summary = `Mengulik rahasia di balik cita rasa ${foods[i]}, hidangan tradisional yang menjadi kebanggaan kuliner masyarakat Karo dengan rempah-rempah khas pegunungan.`;
            featuredImage = "https://upload.wikimedia.org/wikipedia/commons/7/79/Babi_panggang_Karo.jpg";
            blocks = JSON.parse(JSON.stringify(kulinerBlocks));
            blocks[1].content = foods[i];
            break;
            
          case 'Sejarah':
            const historicalEvents = [
              "Kedatangan Belanda di Tanah Karo", "Revolusi Sosial di Karo", 
              "Perjuangan Kemerdekaan Rakyat Karo", "Asal-usul Marga Karo", 
              "Pembentukan Kabupaten Karo", "Perang Batak", 
              "Perkembangan Agama di Tanah Karo", "Karo Pada Masa Kolonial",
              "Tradisi Tutur Karo", "Sejarah Rumah Adat Karo"
            ];
            title = `Mengungkap Sejarah ${historicalEvents[i]} yang Terlupakan`;
            summary = `Menelusuri jejak sejarah tentang ${historicalEvents[i]} yang menjadi bagian penting dari perjalanan masyarakat Karo dalam membentuk identitasnya saat ini.`;
            featuredImage = "https://upload.wikimedia.org/wikipedia/commons/c/c9/COLLECTIE_TROPENMUSEUM_Bataks_huis_in_dorp_Lingga_Karo_hoogvlakte_TMnr_10011623.jpg";
            blocks = JSON.parse(JSON.stringify(sejarahBlocks));
            blocks[1].content = historicalEvents[i];
            break;
            
          case 'Budaya':
            const culturalAspects = [
              "Ertutur dalam Budaya Karo", "Upacara Kerja Tahun", 
              "Tari Lima Sedalanen", "Uis Karo", "Gendang Karo", 
              "Ritual Rebu", "Sistem Marga Karo", "Upacara Cawir Metua",
              "Perkawinan Adat Karo", "Filosofi Rakut Sitelu"
            ];
            title = `Memahami Makna ${culturalAspects[i]} dalam Kehidupan Masyarakat Karo`;
            summary = `Mendalami filosofi dan praktik ${culturalAspects[i]} yang masih dilestarikan hingga kini sebagai warisan budaya tak ternilai bagi masyarakat Karo.`;
            featuredImage = "https://upload.wikimedia.org/wikipedia/commons/9/91/COLLECTIE_TROPENMUSEUM_Een_groep_Karo_Batakkers_met_muziekinstrumenten_waaronder_een_keteng-keteng_TMnr_10005035.jpg";
            blocks = JSON.parse(JSON.stringify(budayaBlocks));
            blocks[1].content = culturalAspects[i];
            break;
        }
        
        // Create the article object
        const article: Article = {
          id: crypto.randomUUID(),
          title,
          content: blocks.filter(b => b.type === "paragraph").map(b => b.content).join("\n\n"),
          author: author.name,
          email: author.email,
          category,
          subcategory: category === "Kuliner Karo" ? (i < 5 ? "Makanan" : "Minuman") : undefined,
          featuredImage,
          publishDate: createdAt,
          isDraft: false,
          createdAt,
          updatedAt: createdAt,
          summary,
          blocks,
          views: Math.floor(Math.random() * 1000),
          likes: Math.floor(Math.random() * 100)
        };
        
        sampleArticles.push(article);
      }
    });
    
    // Add a special journalistic style article
    const journalisticArticle: Article = {
      id: crypto.randomUUID(),
      title: "Festival Budaya Karo 2023 Menarik Ribuan Pengunjung",
      content: "KABANJAHE - Festival Budaya Karo yang digelar selama tiga hari di Kabanjahe berhasil menarik perhatian ribuan pengunjung dari berbagai daerah. Acara yang berlangsung dari tanggal 15 hingga 17 Juli 2023 ini menampilkan berbagai pertunjukan seni, kuliner, dan kerajinan tradisional Karo.\n\nBupati Karo, dalam sambutannya, menyatakan bahwa festival ini merupakan bagian dari upaya pemerintah daerah untuk melestarikan budaya Karo dan sekaligus mempromosikan pariwisata di kabupaten tersebut. \"Festival ini adalah bukti bahwa budaya Karo masih hidup dan berkembang,\" ujarnya.",
      author: "Tim Redaksi KaroNews",
      email: "redaksi@karonews.com",
      category: "Budaya",
      featuredImage: "https://upload.wikimedia.org/wikipedia/commons/9/91/COLLECTIE_TROPENMUSEUM_Een_groep_Karo_Batakkers_met_muziekinstrumenten_waaronder_een_keteng-keteng_TMnr_10005035.jpg",
      publishDate: new Date().toISOString(),
      isDraft: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      summary: "Festival Budaya Karo 2023 yang digelar di Kabanjahe berhasil menarik ribuan pengunjung dan menampilkan kekayaan budaya Karo kepada masyarakat luas.",
      blocks: [
        {
          id: "journ-p1",
          type: "paragraph",
          content: "KABANJAHE - Festival Budaya Karo yang digelar selama tiga hari di Kabanjahe berhasil menarik perhatian ribuan pengunjung dari berbagai daerah. Acara yang berlangsung dari tanggal 15 hingga 17 Juli 2023 ini menampilkan berbagai pertunjukan seni, kuliner, dan kerajinan tradisional Karo."
        },
        {
          id: "journ-p2",
          type: "paragraph",
          content: "Bupati Karo, dalam sambutannya, menyatakan bahwa festival ini merupakan bagian dari upaya pemerintah daerah untuk melestarikan budaya Karo dan sekaligus mempromosikan pariwisata di kabupaten tersebut. \"Festival ini adalah bukti bahwa budaya Karo masih hidup dan berkembang,\" ujarnya."
        },
        {
          id: "journ-h1",
          type: "heading",
          content: "Pertunjukan Seni Memukau",
          level: 2
        },
        {
          id: "journ-p3",
          type: "paragraph",
          content: "Pertunjukan tari tradisional Lima Sedalanen menjadi salah satu acara yang paling diminati oleh pengunjung. Sebanyak 50 penari dari berbagai desa di Kabupaten Karo berpartisipasi dalam pertunjukan tersebut."
        },
        {
          id: "journ-p4",
          type: "paragraph",
          content: "\"Kami sangat terkesan dengan pertunjukan tari ini. Gerakannya sangat dinamis dan kostumnya sangat indah,\" kata Budi Santoso, salah satu pengunjung dari Medan."
        },
        {
          id: "journ-img1",
          type: "image",
          url: "https://upload.wikimedia.org/wikipedia/commons/9/91/COLLECTIE_TROPENMUSEUM_Een_groep_Karo_Batakkers_met_muziekinstrumenten_waaronder_een_keteng-keteng_TMnr_10005035.jpg",
          alt: "Pertunjukan Musik Tradisional Karo",
          caption: "Pertunjukan musik tradisional pada Festival Budaya Karo 2023"
        },
        {
          id: "journ-h2",
          type: "heading",
          content: "Kuliner Tradisional Laris Manis",
          level: 2
        },
        {
          id: "journ-p5",
          type: "paragraph",
          content: "Stand kuliner tradisional Karo seperti Babi Panggang Karo (BPK), Terites, dan Cimpa menjadi incaran pengunjung. Beberapa stand bahkan kehabisan stok sebelum acara berakhir pada hari terakhir."
        },
        {
          id: "journ-p6",
          type: "paragraph",
          content: "Menurut Friska Br Ginting, salah satu penjual kuliner tradisional, omzetnya selama festival ini naik hingga lima kali lipat dibandingkan hari biasa. \"Ini sangat membantu ekonomi kami para pelaku UMKM,\" ungkapnya."
        },
        {
          id: "journ-h3",
          type: "heading",
          content: "Dampak Ekonomi",
          level: 2
        },
        {
          id: "journ-p7",
          type: "paragraph",
          content: "Dinas Pariwisata Kabupaten Karo mencatat bahwa festival ini berhasil mendatangkan lebih dari 10.000 pengunjung. Hal ini berdampak positif pada ekonomi lokal, terutama sektor perhotelan dan kuliner."
        },
        {
          id: "journ-p8",
          type: "paragraph",
          content: "Hotel dan penginapan di sekitar lokasi festival dilaporkan fully booked selama pelaksanaan acara. Beberapa wisatawan bahkan harus mencari penginapan hingga ke kecamatan tetangga."
        },
        {
          id: "journ-q1",
          type: "quote",
          content: "Festival Budaya Karo tahun ini melampaui ekspektasi kami. Ini membuktikan bahwa budaya tradisional masih memiliki daya tarik yang kuat di era digital ini.",
          citation: "Kepala Dinas Pariwisata Kabupaten Karo"
        },
        {
          id: "journ-p9",
          type: "paragraph",
          content: "Berdasarkan kesuksesan acara tahun ini, panitia berencana untuk menyelenggarakan festival serupa tahun depan dengan skala yang lebih besar dan melibatkan lebih banyak desa adat di Kabupaten Karo."
        }
      ],
      views: 1523,
      likes: 287
    };
    
    sampleArticles.push(journalisticArticle);
    
    // Save all sample articles
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleArticles));
    
    console.log(`✅ Successfully initialized ${sampleArticles.length} sample articles`);
  }
};
