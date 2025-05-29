
import { supabase } from '@/integrations/supabase/client';
import { ArticleFormData, Category, KulinerSubcategory } from '@/types/article';
import { Block } from '@/types/blocks';

// Sample authors with authentic Karo names
const karoAuthors = [
  { name: "Dr. Wandi Sembiring", email: "wandi.sembiring@karoheritage.org" },
  { name: "Mejuah-juah Ginting", email: "mejuah.ginting@karoculture.id" },
  { name: "Beru Sitepu Tarigan", email: "beru.tarigan@karonews.com" },
  { name: "Kaban Purba", email: "kaban.purba@karojournal.id" },
  { name: "Nande Perangin-angin", email: "nande.perangin@karostudies.org" },
  { name: "Tigan Brahmana", email: "tigan.brahmana@karohistory.id" },
  { name: "Mina Sinulingga", email: "mina.sinulingga@karoethnography.org" },
  { name: "Reh Karo-karo", email: "reh.karokaro@traditionalstudies.id" }
];

// Destinasi & Tempat Articles
const destinasiArticles: Omit<ArticleFormData, 'blocks'>[] = [
  {
    title: "Gunung Sibayak: Puncak Spiritual dan Wisata Alam Tanah Karo",
    summary: "Menjelajahi keagungan Gunung Sibayak yang tidak hanya menawarkan panorama alam memukau, tetapi juga memiliki nilai spiritual mendalam bagi masyarakat Karo.",
    content: "Gunung Sibayak, dengan ketinggian 2.094 meter di atas permukaan laut, berdiri megah sebagai salah satu ikon wisata Tanah Karo yang paling terkenal. Gunung berapi aktif ini tidak hanya menawarkan keindahan alam yang memukau, tetapi juga menyimpan nilai spiritual yang mendalam bagi masyarakat Karo. Nama 'Sibayak' sendiri berasal dari bahasa Karo yang berarti 'raja' atau 'yang berkuasa', mencerminkan posisinya sebagai puncak yang dihormati dan diagungkan oleh masyarakat setempat.\n\nBagi para pendaki dan wisatawan, Gunung Sibayak menawarkan pengalaman yang tak terlupakan. Jalur pendakian yang relatif mudah membuatnya cocok untuk pendaki pemula, namun tetap memberikan tantangan yang menarik. Di puncaknya, pengunjung akan dimanjakan dengan pemandangan spektakuler berupa kawah aktif yang mengeluarkan uap panas, serta panorama Kabupaten Karo yang membentang luas. Sunrise dari puncak Sibayak terkenal sangat memukau, dengan hamparan awan yang seolah berada di bawah kaki para pendaki.",
    author: karoAuthors[0].name,
    email: karoAuthors[0].email,
    category: "Destinasi & Tempat" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sibayak.JPG/1024px-Sibayak.JPG",
    mapLocation: {
      name: "Gunung Sibayak",
      latitude: 3.2099,
      longitude: 98.5151,
      address: "Desa Jaranguda, Kecamatan Namanteran, Kabupaten Karo"
    }
  },
  {
    title: "Air Terjun Sipiso-piso: Kemegahan Alami di Tepi Danau Toba",
    summary: "Mengungkap pesona Air Terjun Sipiso-piso yang menjadi salah satu air terjun tertinggi di Indonesia dengan latar belakang Danau Toba yang menakjubkan.",
    content: "Air Terjun Sipiso-piso merupakan salah satu keajaiban alam yang menjadi kebanggaan Kabupaten Karo. Dengan ketinggian mencapai 120 meter, air terjun ini tercatat sebagai salah satu yang tertinggi di Indonesia. Nama 'Sipiso-piso' dalam bahasa Karo berarti 'seperti pisau', merujuk pada bentuk aliran airnya yang tajam dan lurus jatuh dari tebing tinggi menuju Danau Toba.\n\nPemandangan dari Air Terjun Sipiso-piso sungguh memukau. Dari area viewing point, pengunjung dapat menyaksikan kemegahan air terjun yang jatuh bebas dengan latar belakang Danau Toba yang biru membentang. Kabut halus yang dihasilkan oleh tumbukan air di dasar air terjun menciptakan efek pelangi yang indah ketika sinar matahari menyinarinya. Lokasi ini juga menjadi spot favorit para fotografer untuk mengabadikan keindahan alam Sumatera Utara.",
    author: karoAuthors[1].name,
    email: karoAuthors[1].email,
    category: "Destinasi & Tempat" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Sipiso-piso_waterfall.jpg/1024px-Sipiso-piso_waterfall.jpg",
    mapLocation: {
      name: "Air Terjun Sipiso-piso",
      latitude: 2.6854,
      longitude: 98.6354,
      address: "Desa Tongging, Kecamatan Merek, Kabupaten Karo"
    }
  },
  {
    title: "Desa Wisata Lingga: Menelusuri Jejak Peradaban Karo Kuno",
    summary: "Menyelami kearifan lokal dan arsitektur tradisional di Desa Lingga, sebuah desa wisata yang masih mempertahankan keaslian budaya Karo.",
    content: "Desa Lingga, yang terletak di Kecamatan Simpang Empat, Kabupaten Karo, merupakan sebuah desa wisata yang menawarkan pengalaman autentik budaya Karo. Desa ini terkenal karena masih mempertahankan rumah-rumah adat tradisional Karo yang berusia ratusan tahun. Pengunjung dapat menyaksikan secara langsung arsitektur unik rumah adat Siwaluh Jabu yang dihuni oleh delapan keluarga dalam satu bangunan, mencerminkan filosofi kebersamaan masyarakat Karo.\n\nSelain rumah adat, Desa Lingga juga menawarkan berbagai aktivitas wisata budaya. Wisatawan dapat menyaksikan pertunjukan tari tradisional, belajar menenun uis (kain tradisional Karo), dan berinteraksi langsung dengan masyarakat lokal. Suasana pedesaan yang asri dengan hamparan sawah dan kebun sayuran menambah daya tarik tersendiri. Program homestay yang tersedia memungkinkan wisatawan merasakan kehidupan sehari-hari masyarakat Karo dengan segala tradisi dan kearifan lokalnya.",
    author: karoAuthors[2].name,
    email: karoAuthors[2].email,
    category: "Destinasi & Tempat" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/COLLECTIE_TROPENMUSEUM_Bataks_huis_in_dorp_Lingga_Karo_hoogvlakte_TMnr_10011623.jpg/1024px-COLLECTIE_TROPENMUSEUM_Bataks_huis_in_dorp_Lingga_Karo_hoogvlakte_TMnr_10011623.jpg",
    mapLocation: {
      name: "Desa Lingga",
      latitude: 3.2167,
      longitude: 98.3833,
      address: "Desa Lingga, Kecamatan Simpang Empat, Kabupaten Karo"
    }
  },
  {
    title: "Bukit Gundaling: Surga Tersembunyi untuk Pecinta Sunset",
    summary: "Mengeksplorasi keindahan Bukit Gundaling yang menawarkan panorama sunset spektakuler dan udara sejuk khas dataran tinggi Karo.",
    content: "Bukit Gundaling merupakan destinasi wisata yang wajib dikunjungi bagi siapa saja yang berkunjung ke Berastagi. Terletak di ketinggian sekitar 1.400 meter di atas permukaan laut, bukit ini menawarkan panorama alam yang menakjubkan dengan latar belakang Gunung Sinabung dan Gunung Sibayak. Udara sejuk dan segar menjadi daya tarik utama, terutama bagi wisatawan yang ingin melepas penat dari hiruk pikuk kehidupan kota.\n\nKeunikan Bukit Gundaling terletak pada pemandangan sunset yang spektakuler. Ketika sore hari tiba, langit berubah menjadi kanvas alami dengan gradasi warna jingga, merah, dan ungu yang memukau. Hamparan kebun sayuran dan bunga yang tersebar di sekitar bukit menambah keindahan pemandangan. Fasilitas yang tersedia cukup lengkap, mulai dari area parkir, warung-warung yang menjual makanan khas Karo, hingga spot-spot foto yang instagramable untuk mengabadikan momen berharga.",
    author: karoAuthors[3].name,
    email: karoAuthors[3].email,
    category: "Destinasi & Tempat" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Berastagi_view_from_Gundaling_Hill.jpg/1024px-Berastagi_view_from_Gundaling_Hill.jpg",
    mapLocation: {
      name: "Bukit Gundaling",
      latitude: 3.1963,
      longitude: 98.5085,
      address: "Gundaling, Berastagi, Kabupaten Karo"
    }
  },
  {
    title: "Pemandian Air Panas Semangat Gunung: Relaksasi Alami di Kaki Sibayak",
    summary: "Menikmati sensasi berendam di pemandian air panas alami yang dipercaya memiliki khasiat penyembuhan di kaki Gunung Sibayak.",
    content: "Pemandian Air Panas Semangat Gunung merupakan destinasi wisata relaksasi yang unik di Kabupaten Karo. Terletak di kaki Gunung Sibayak, pemandian ini memanfaatkan sumber air panas alami yang berasal dari aktivitas geothermal gunung berapi. Air panas yang mengandung mineral sulfur dipercaya memiliki khasiat terapeutik untuk kesehatan kulit dan dapat membantu meredakan pegal-pegal serta stress.\n\nFasilitas pemandian terdiri dari beberapa kolam dengan suhu yang berbeda-beda, mulai dari yang hangat hingga panas. Pengunjung dapat memilih kolam sesuai dengan preferensi dan kondisi tubuh masing-masing. Suasana alam yang asri dengan pepohonan hijau di sekitar area pemandian menciptakan atmosfer yang menenangkan. Banyak wisatawan yang datang khusus untuk menikmati sensasi berendam sambil menikmati udara sejuk pegunungan, terutama pada pagi atau sore hari ketika suhu udara lebih dingin.",
    author: karoAuthors[4].name,
    email: karoAuthors[4].email,
    category: "Destinasi & Tempat" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hot_springs_in_North_Sumatra.jpg/1024px-Hot_springs_in_North_Sumatra.jpg",
    mapLocation: {
      name: "Pemandian Air Panas Semangat Gunung",
      latitude: 3.2167,
      longitude: 98.5167,
      address: "Semangat Gunung, Merdeka, Berastagi, Kabupaten Karo"
    }
  }
];

// Kuliner Karo Articles
const kulinerArticles: Omit<ArticleFormData, 'blocks'>[] = [
  {
    title: "Babi Panggang Karo (BPK): Kuliner Ikonik yang Mendunia",
    summary: "Mengulik sejarah dan cita rasa autentik Babi Panggang Karo yang telah menjadi ikon kuliner Tanah Karo dan dikenal hingga mancanegara.",
    content: "Babi Panggang Karo atau yang akrab disebut BPK merupakan kuliner ikonik yang tidak dapat dipisahkan dari identitas budaya masyarakat Karo. Hidangan ini terdiri dari daging babi yang dipanggang dengan bumbu rempah khas, disajikan bersama darah babi yang dimasak dengan bumbu khusus, serta andaliman yang memberikan sensasi rasa unik. Proses pembuatan BPK memerlukan keahlian khusus, mulai dari pemilihan daging, pengolahan bumbu, hingga teknik memanggang yang tepat.\n\nKeunikan BPK terletak pada perpaduan bumbu rempah yang kompleks, termasuk jahe, kunyit, kemiri, bawang merah, bawang putih, dan andaliman. Darah babi yang diolah menjadi pendamping memiliki tekstur kenyal dengan rasa gurih yang khas. Hidangan ini biasanya disajikan dalam acara-acara adat penting seperti pernikahan, upacara adat, atau perayaan keagamaan. Saat ini, BPK telah dikenal luas hingga ke luar Sumatera Utara dan menjadi daya tarik kuliner bagi wisatawan yang berkunjung ke Tanah Karo.",
    author: karoAuthors[0].name,
    email: karoAuthors[0].email,
    category: "Kuliner Karo" as Category,
    subcategory: "Makanan" as KulinerSubcategory,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Babi_panggang_Karo.jpg/1024px-Babi_panggang_Karo.jpg",
    mapLocation: {
      name: "Berastagi Kuliner Center",
      latitude: 3.1963,
      longitude: 98.5085,
      address: "Jl. Veteran, Berastagi, Kabupaten Karo"
    }
  },
  {
    title: "Terites: Kearifan Lokal dalam Pengawetan Ikan",
    summary: "Mengupas tradisi pembuatan terites, ikan asin khas Karo yang menunjukkan kearifan lokal dalam teknik pengawetan makanan.",
    content: "Terites merupakan salah satu makanan tradisional Karo yang menunjukkan kearifan lokal dalam teknik pengawetan ikan. Makanan ini dibuat dari ikan mas atau ikan nila yang difermentasi dengan garam dan bumbu rempah khusus. Proses fermentasi yang berlangsung selama beberapa hari hingga minggu menghasilkan cita rasa yang unik, dengan aroma yang khas dan rasa yang gurih asin. Terites biasanya dikonsumsi sebagai lauk pendamping nasi atau dijadikan bahan untuk masakan lain.\n\nTradisi pembuatan terites telah diwariskan turun temurun dalam masyarakat Karo. Proses pembuatannya memerlukan ketelatenan dan pengetahuan khusus tentang fermentasi. Ikan yang akan dibuat terites harus segar dan berkualitas baik, kemudian dibersihkan dan dicampur dengan garam serta bumbu rempah seperti kunyit dan jahe. Terites tidak hanya berfungsi sebagai makanan, tetapi juga sebagai cara untuk mengawetkan ikan agar tahan lama, terutama pada masa ketika teknologi pendingin belum tersedia.",
    author: karoAuthors[5].name,
    email: karoAuthors[5].email,
    category: "Kuliner Karo" as Category,
    subcategory: "Makanan" as KulinerSubcategory,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Traditional_fermented_fish.jpg/1024px-Traditional_fermented_fish.jpg",
    mapLocation: {
      name: "Pasar Tradisional Kabanjahe",
      latitude: 3.1000,
      longitude: 98.4833,
      address: "Jl. Jenderal Sudirman, Kabanjahe, Kabupaten Karo"
    }
  },
  {
    title: "Cimpa: Kue Tradisional yang Menyimpan Filosofi Kehidupan",
    summary: "Menelusuri makna filosofis di balik cimpa, kue tradisional Karo yang tidak hanya lezat tetapi juga sarat akan nilai-nilai kehidupan.",
    content: "Cimpa merupakan kue tradisional Karo yang memiliki makna filosofis mendalam dalam budaya masyarakat setempat. Kue ini dibuat dari tepung beras yang dicampur dengan santan kelapa dan gula aren, kemudian dibungkus dengan daun pisang dan dikukus. Bentuknya yang segitiga melambangkan konsep Daliken Si Telu dalam budaya Karo, yaitu tiga pilar kehidupan yang terdiri dari hubungan dengan Tuhan, sesama manusia, dan alam semesta.\n\nProses pembuatan cimpa memerlukan kesabaran dan keahlian khusus. Adonan harus diaduk hingga rata dan memiliki kekentalan yang tepat agar menghasilkan tekstur yang lembut namun tidak mudah hancur. Daun pisang yang digunakan sebagai pembungkus memberikan aroma harum yang khas. Cimpa biasanya disajikan dalam acara-acara adat seperti upacara pernikahan, kelahiran, atau perayaan panen. Kue ini tidak hanya berfungsi sebagai makanan, tetapi juga sebagai simbol persatuan dan kebersamaan dalam masyarakat Karo.",
    author: karoAuthors[6].name,
    email: karoAuthors[6].email,
    category: "Kuliner Karo" as Category,
    subcategory: "Makanan" as KulinerSubcategory,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Traditional_wrapped_cake.jpg/1024px-Traditional_wrapped_cake.jpg",
    mapLocation: {
      name: "Desa Tigapanah",
      latitude: 3.2333,
      longitude: 98.4167,
      address: "Tigapanah, Kecamatan Tigapanah, Kabupaten Karo"
    }
  },
  {
    title: "Tuak Karo: Minuman Tradisional Penuh Berkah",
    summary: "Mengkaji tuak sebagai minuman tradisional Karo yang memiliki nilai sakral dalam upacara adat dan kehidupan sehari-hari masyarakat.",
    content: "Tuak merupakan minuman tradisional yang memiliki tempat istimewa dalam budaya Karo. Minuman fermentasi yang terbuat dari nira aren ini tidak hanya berfungsi sebagai minuman sehari-hari, tetapi juga memiliki nilai sakral dalam berbagai upacara adat. Proses pembuatan tuak dimulai dari penyadapan nira aren segar yang kemudian difermentasi secara alami. Kadar alkohol yang dihasilkan relatif rendah, sekitar 4-6%, sehingga aman dikonsumsi dalam jumlah yang wajar.\n\nDalam tradisi Karo, tuak sering disajikan dalam acara-acara penting seperti upacara pernikahan, ritual adat, atau sebagai minuman penyambut tamu terhormat. Minuman ini dipercaya memiliki khasiat untuk kesehatan, terutama untuk menghangatkan tubuh di iklim dingin dataran tinggi Karo. Penyajian tuak juga mengikuti tata cara adat yang khusus, dengan menggunakan labu atau tempurung kelapa sebagai wadah. Tradisi minum tuak bersama-sama melambangkan persaudaraan dan keakraban dalam masyarakat Karo.",
    author: karoAuthors[1].name,
    email: karoAuthors[1].email,
    category: "Kuliner Karo" as Category,
    subcategory: "Minuman" as KulinerSubcategory,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Palm_wine_traditional.jpg/1024px-Palm_wine_traditional.jpg",
    mapLocation: {
      name: "Desa Dokan",
      latitude: 3.1167,
      longitude: 98.4000,
      address: "Dokan, Kecamatan Merek, Kabupaten Karo"
    }
  },
  {
    title: "Kopi Sidikalang: Warisan Perkebunan yang Mendunia",
    summary: "Menjelajahi sejarah dan keunggulan kopi Sidikalang yang telah menjadi kebanggaan Tanah Karo dan diakui kualitasnya secara internasional.",
    content: "Kopi Sidikalang merupakan salah satu komoditas unggulan dari Kabupaten Dairi yang berbatasan dengan Karo, dan telah menjadi bagian integral dari budaya minum kopi di Tanah Karo. Kopi yang tumbuh di dataran tinggi dengan ketinggian 1.000-1.500 meter ini memiliki karakteristik rasa yang khas, dengan body yang full, acidity yang seimbang, dan aroma yang kuat. Iklim sejuk dan tanah vulkanis di kawasan ini memberikan kondisi ideal untuk pertumbuhan tanaman kopi berkualitas tinggi.\n\nSejarah perkebunan kopi di wilayah ini dimulai sejak masa kolonial Belanda, ketika tanaman kopi pertama kali diperkenalkan di Sumatera Utara. Kopi Sidikalang menggunakan varietas Arabica dan Robusta, dengan teknik pengolahan yang telah diwariskan turun temurun. Proses roasting yang dilakukan dengan cara tradisional menggunakan kayu bakar memberikan karakter rasa yang unik. Saat ini, kopi Sidikalang tidak hanya dinikmati di dalam negeri, tetapi juga diekspor ke berbagai negara dan menjadi salah satu specialty coffee yang diakui dunia internasional.",
    author: karoAuthors[7].name,
    email: karoAuthors[7].email,
    category: "Kuliner Karo" as Category,
    subcategory: "Minuman" as KulinerSubcategory,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Coffee_plantation_Sumatra.jpg/1024px-Coffee_plantation_Sumatra.jpg",
    mapLocation: {
      name: "Perkebunan Kopi Sidikalang",
      latitude: 2.7333,
      longitude: 98.3000,
      address: "Sidikalang, Kabupaten Dairi (berbatasan dengan Karo)"
    }
  }
];

// Sejarah Articles
const sejarahArticles: Omit<ArticleFormData, 'blocks'>[] = [
  {
    title: "Asal Usul Marga Karo: Menelusuri Silsilah Lima Marga Utama",
    summary: "Mengungkap sejarah dan genealogi lima marga utama dalam masyarakat Karo: Ginting, Tarigan, Sembiring, Karo-karo, dan Perangin-angin.",
    content: "Sistem marga dalam masyarakat Karo merupakan warisan nenek moyang yang masih sangat dihormati hingga saat ini. Lima marga utama yang dikenal sebagai 'Merga Silima' terdiri dari Ginting, Tarigan, Sembiring, Karo-karo, dan Perangin-angin. Menurut legenda yang diwariskan secara oral, kelima marga ini berasal dari lima bersaudara yang merupakan keturunan dari nenek moyang yang sama. Setiap marga memiliki sub-marga atau 'anak beru' yang membentuk struktur sosial yang kompleks dan terorganisir.\n\nSejarah mencatat bahwa sistem marga Karo telah ada sejak berabad-abad yang lalu, jauh sebelum kedatangan pengaruh luar ke Tanah Karo. Sistem ini tidak hanya berfungsi sebagai identitas keluarga, tetapi juga mengatur hubungan sosial, pernikahan, dan berbagai aspek kehidupan bermasyarakat. Marga Ginting konon berasal dari kata 'giting' yang berarti keras atau kuat, Tarigan dari 'tarik' yang berarti menarik atau memimpin, Sembiring dari 'biring' yang berarti sisi atau samping, Karo-karo sebagai nama yang paling tua dan menunjukkan identitas asli, serta Perangin-angin yang berkaitan dengan angin atau udara. Pemahaman tentang sejarah marga ini penting untuk memahami struktur sosial dan budaya masyarakat Karo secara keseluruhan.",
    author: karoAuthors[2].name,
    email: karoAuthors[2].email,
    category: "Sejarah" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Batak_genealogy_chart.jpg/1024px-Batak_genealogy_chart.jpg",
    mapLocation: {
      name: "Museum Karo Lingga",
      latitude: 3.2167,
      longitude: 98.3833,
      address: "Desa Lingga, Kecamatan Simpang Empat, Kabupaten Karo"
    }
  },
  {
    title: "Kedatangan Kolonial Belanda di Tanah Karo (1904-1942)",
    summary: "Menelaah periode kolonial Belanda di Karo yang dimulai tahun 1904 dengan ekspedisi militer hingga dampaknya terhadap struktur sosial masyarakat.",
    content: "Kedatangan kolonial Belanda di Tanah Karo pada tahun 1904 menandai babak baru dalam sejarah masyarakat Karo. Ekspedisi militer yang dipimpin oleh Christoffel dan Van Daalen ini bertujuan untuk menguasai daerah dataran tinggi Karo yang strategis. Perlawanan sengit dari masyarakat Karo dipimpin oleh para raja-raja lokal dan tokoh adat, namun akhirnya Belanda berhasil menguasai wilayah ini setelah melalui serangkaian pertempuran yang berlangsung bertahun-tahun.\n\nPeriode kolonial membawa perubahan besar dalam berbagai aspek kehidupan masyarakat Karo. Sistem pemerintahan tradisional yang dipimpin oleh sibayak (raja-raja kecil) mulai terpinggirkan dan digantikan dengan sistem administrasi kolonial. Belanda memperkenalkan tanaman komersial seperti kopi, tembakau, dan kemudian sayuran dataran tinggi yang mengubah pola pertanian tradisional. Infrastruktur seperti jalan raya dan jembatan mulai dibangun untuk memperlancar transportasi hasil perkebunan. Meski membawa modernisasi, era kolonial juga menimbulkan penderitaan bagi masyarakat Karo melalui sistem kerja paksa dan pajak yang memberatkan.",
    author: karoAuthors[3].name,
    email: karoAuthors[3].email,
    category: "Sejarah" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dutch_colonial_expedition_Sumatra.jpg/1024px-Dutch_colonial_expedition_Sumatra.jpg",
    mapLocation: {
      name: "Benteng Belanda Kabanjahe",
      latitude: 3.1000,
      longitude: 98.4833,
      address: "Kabanjahe, Kabupaten Karo"
    }
  },
  {
    title: "Era Revolusi Kemerdekaan di Karo (1945-1950)",
    summary: "Mengulas peran masyarakat Karo dalam mempertahankan kemerdekaan Indonesia dan konflik yang terjadi pada masa revolusi fisik.",
    content: "Proklamasi kemerdekaan Indonesia pada 17 Agustus 1945 disambut dengan antusias oleh masyarakat Karo. Namun, perjuangan untuk mempertahankan kemerdekaan di Tanah Karo tidaklah mudah. Belanda yang ingin kembali menguasai Indonesia melancarkan agresi militer yang juga menyasar wilayah Karo. Para pemuda Karo bergabung dengan Tentara Keamanan Rakyat (TKR) dan kemudian TNI untuk melawan kembalinya penjajah.\n\nSalah satu peristiwa penting dalam sejarah revolusi di Karo adalah pertempuran di Kabanjahe dan sekitarnya pada tahun 1947-1948. Tokoh-tokoh seperti Let. Kol. Ahmad Tahir dan Mayor Djamin Ginting memimpin perlawanan rakyat Karo. Strategi gerilya dilakukan dengan memanfaatkan medan pegunungan yang sulit dijangkau oleh kendaraan lapis baja Belanda. Masyarakat Karo juga menunjukkan solidaritas dengan menyediakan logistik dan informasi untuk para pejuang. Periode ini juga ditandai dengan munculnya kesadaran nasional yang kuat di kalangan masyarakat Karo, yang sebelumnya lebih bersifat kedaerahan.",
    author: karoAuthors[4].name,
    email: karoAuthors[4].email,
    category: "Sejarah" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Indonesian_revolution_Sumatra.jpg/1024px-Indonesian_revolution_Sumatra.jpg",
    mapLocation: {
      name: "Monument Perjuangan Kabanjahe",
      latitude: 3.1000,
      longitude: 98.4833,
      address: "Jl. Veteran, Kabanjahe, Kabupaten Karo"
    }
  },
  {
    title: "Masa Revolusi Sosial di Sumatera Timur (1946): Dampaknya terhadap Masyarakat Karo",
    summary: "Menganalisis peristiwa Revolusi Sosial 1946 di Sumatera Timur dan bagaimana hal ini mempengaruhi struktur sosial politik di Tanah Karo.",
    content: "Revolusi Sosial yang terjadi di Sumatera Timur pada Maret 1946 merupakan peristiwa bersejarah yang juga berdampak signifikan terhadap masyarakat Karo. Peristiwa yang dikenal sebagai 'Revolusi Sosial Sumatera Timur' ini bermula dari ketegangan antara kaum republiken dengan para sultan dan penguasa feodal yang dianggap pro-Belanda. Gelombang revolusi yang dimulai dari Medan kemudian menyebar ke berbagai daerah, termasuk wilayah Karo.\n\nDi Tanah Karo, revolusi sosial ini bermanifestasi dalam bentuk perubahan struktur kepemimpinan tradisional. Beberapa sibayak (raja-raja kecil) yang dianggap berkolaborasi dengan Belanda menghadapi tekanan dari rakyat. Namun, karena sistem kepemimpinan Karo yang lebih demokratis dibandingkan kerajaan-kerajaan Melayu di pesisir, perubahan di Karo relatif tidak seradikal di daerah lain. Banyak pemimpin adat Karo yang justru mendukung kemerdekaan Indonesia sejak awal, sehingga transisi kekuasaan berlangsung lebih mulus. Peristiwa ini menandai berakhirnya era feodalisme di Sumatera Utara dan dimulainya era demokrasi yang lebih modern.",
    author: karoAuthors[5].name,
    email: karoAuthors[5].email,
    category: "Sejarah" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Social_revolution_East_Sumatra.jpg/1024px-Social_revolution_East_Sumatra.jpg",
    mapLocation: {
      name: "Berastagi Historical Site",
      latitude: 3.1963,
      longitude: 98.5085,
      address: "Berastagi, Kabupaten Karo"
    }
  },
  {
    title: "Pembentukan Kabupaten Karo: Dari Afdeeling hingga Otonomi Daerah",
    summary: "Menelusuri evolusi administratif wilayah Karo dari masa kolonial hingga terbentuknya Kabupaten Karo sebagai daerah otonom.",
    content: "Perjalanan pembentukan Kabupaten Karo sebagai entitas administratif modern dimulai dari masa kolonial Belanda ketika wilayah ini diorganisir sebagai 'Afdeeling Karolanden' pada tahun 1906. Sistem pemerintahan kolonial ini menggantikan struktur tradisional yang sebelumnya terdiri dari berbagai kesibayakan (wilayah kekuasaan sibayak) yang tersebar di dataran tinggi Karo. Pusat pemerintahan ditetapkan di Kabanjahe, yang dipilih karena lokasinya yang strategis di tengah-tengah wilayah Karo.\n\nSetelah kemerdekaan Indonesia, status administratif Karo mengalami beberapa kali perubahan. Pada tahun 1946, wilayah ini menjadi bagian dari Kabupaten Deli Serdang, kemudian pada tahun 1956 resmi dibentuk Kabupaten Karo yang terpisah. Pembentukan kabupaten ini didasarkan pada UU No. 7 Tahun 1956 tentang Pembentukan Daerah Otonom Kabupaten dalam Lingkungan Daerah Provinsi Sumatera Utara. Kabanjahe ditetapkan sebagai ibu kota kabupaten, dengan wilayah yang mencakup 17 kecamatan. Pembentukan Kabupaten Karo ini memberikan ruang bagi masyarakat Karo untuk mengembangkan potensi daerahnya secara lebih optimal, sambil tetap mempertahankan nilai-nilai budaya dan adat istiadat yang telah diwariskan nenek moyang.",
    author: karoAuthors[6].name,
    email: karoAuthors[6].email,
    category: "Sejarah" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Indonesian_local_government_building.jpg/1024px-Indonesian_local_government_building.jpg",
    mapLocation: {
      name: "Kantor Bupati Karo",
      latitude: 3.1000,
      longitude: 98.4833,
      address: "Jl. Jenderal Sudirman No. 1, Kabanjahe, Kabupaten Karo"
    }
  }
];

// Budaya Articles
const budayaArticles: Omit<ArticleFormData, 'blocks'>[] = [
  {
    title: "Gendang Lima Sedalanen: Harmoni Musik Tradisional Karo",
    summary: "Menyelami filosofi dan makna dari ansambel musik tradisional Gendang Lima Sedalanen yang menjadi jiwa dalam setiap upacara adat Karo.",
    content: "Gendang Lima Sedalanen merupakan ansambel musik tradisional yang menjadi jiwa dari berbagai upacara adat masyarakat Karo. Nama 'Lima Sedalanen' berarti lima dalam satu kesatuan, merujuk pada lima instrumen utama yang membentuk ansambel ini: gendang singanaki (gendang anak), gendang singindungi (gendang induk), sarune (alat musik tiup mirip serunai), penganak (gong kecil), dan gung (gong besar). Setiap instrumen memiliki peran dan makna filosofis yang mendalam dalam kosmologi masyarakat Karo.\n\nMusik Gendang Lima Sedalanen tidak hanya berfungsi sebagai hiburan, tetapi juga sebagai media komunikasi spiritual dengan leluhur dan sebagai pengatur ritme dalam berbagai upacara adat. Setiap lagu atau 'gending' memiliki fungsi spesifik, seperti gending penyambutan tamu, gending untuk upacara pernikahan, atau gending untuk ritual keagamaan. Para pemain musik tradisional ini disebut 'pengendang' dan biasanya mewarisi kemampuan ini secara turun temurun. Proses pembelajaran musik tradisional ini tidak hanya mempelajari teknik bermain, tetapi juga memahami nilai-nilai filosofis dan spiritual yang terkandung di dalamnya.",
    author: karoAuthors[0].name,
    email: karoAuthors[0].email,
    category: "Budaya" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/COLLECTIE_TROPENMUSEUM_Een_groep_Karo_Batakkers_met_muziekinstrumenten_waaronder_een_keteng-keteng_TMnr_10005035.jpg/1024px-COLLECTIE_TROPENMUSEUM_Een_groep_Karo_Batakkers_met_muziekinstrumenten_waaronder_een_keteng-keteng_TMnr_10005035.jpg",
    mapLocation: {
      name: "Gedung Budaya Karo",
      latitude: 3.1000,
      longitude: 98.4833,
      address: "Kabanjahe, Kabupaten Karo"
    }
  },
  {
    title: "Uis Karo: Filosofi dan Keindahan Tenun Tradisional",
    summary: "Mengungkap makna filosofis dan teknik pembuatan uis, kain tenun tradisional Karo yang sarat akan simbolisme dan nilai estetika.",
    content: "Uis merupakan kain tenun tradisional Karo yang tidak hanya berfungsi sebagai pakaian, tetapi juga sebagai simbol status sosial dan media ekspresi seni. Proses pembuatan uis memerlukan keahlian khusus yang biasanya diturunkan dari ibu kepada anak perempuan. Benang yang digunakan dulunya berasal dari kapas lokal yang dipintal secara manual, kemudian diwarnai dengan pewarna alami dari tumbuhan seperti mengkudu, kunyit, dan indigo. Motif dan warna uis memiliki makna simbolis yang berkaitan dengan status sosial, usia, dan fungsi penggunaan.\n\nSetiap jenis uis memiliki nama dan fungsi yang berbeda-beda. Uis gara adalah uis yang digunakan untuk upacara pernikahan, dengan motif dan warna yang melambangkan kesuburan dan kemakmuran. Uis abit godang digunakan dalam upacara adat besar, sedangkan uis pementing dikenakan oleh perempuan yang sudah menikah. Proses tenun uis dilakukan dengan menggunakan alat tenun tradisional yang disebut 'sorha'. Pembuatan satu lembar uis bisa memakan waktu berminggu-minggu hingga berbulan-bulan, tergantung pada kompleksitas motif dan ukuran kain. Saat ini, uis Karo tidak hanya digunakan dalam upacara adat, tetapi juga diadaptasi menjadi fashion modern yang tetap mempertahankan nilai-nilai tradisional.",
    author: karoAuthors[1].name,
    email: karoAuthors[1].email,
    category: "Budaya" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Traditional_Karo_weaving.jpg/1024px-Traditional_Karo_weaving.jpg",
    mapLocation: {
      name: "Sentra Tenun Uis Tigapanah",
      latitude: 3.2333,
      longitude: 98.4167,
      address: "Tigapanah, Kecamatan Tigapanah, Kabupaten Karo"
    }
  },
  {
    title: "Upacara Ertutur: Tradisi Lisan yang Menjaga Memori Kolektif",
    summary: "Mengenal tradisi ertutur sebagai sistem pewarisan nilai-nilai budaya melalui tuturan lisan yang masih hidup dalam masyarakat Karo.",
    content: "Ertutur merupakan tradisi lisan yang menjadi fondasi penting dalam sistem pewarisan nilai-nilai budaya masyarakat Karo. Tradisi ini melibatkan penyampaian berbagai pengetahuan, sejarah, nilai moral, dan kebijaksanaan hidup melalui cerita, petuah, dan nasihat yang disampaikan oleh generasi tua kepada generasi muda. Ertutur biasanya dilakukan dalam berbagai momen, mulai dari keseharian keluarga hingga upacara adat yang formal.\n\nKonten ertutur sangat beragam, mencakup sejarah nenek moyang, genealogi marga, pengetahuan tentang alam, tata cara adat, hingga nilai-nilai moral dan etika kehidupan. Para penutur atau 'pertutur' biasanya adalah orang-orang yang dihormati karena pengetahuan dan kebijaksanaannya, seperti ketua adat, tetua kampung, atau orang tua yang berpengalaman. Dalam penyampaiannya, ertutur sering kali menggunakan bahasa kiasan, peribahasa, dan metafora yang kaya makna. Tradisi ini tidak hanya berfungsi sebagai sarana pendidikan informal, tetapi juga sebagai mekanisme kontrol sosial dan penguatan identitas budaya. Di era modern ini, ertutur menghadapi tantangan dari berbagai media modern, sehingga diperlukan upaya untuk melestarikan dan mendokumentasikan tradisi berharga ini.",
    author: karoAuthors[7].name,
    email: karoAuthors[7].email,
    category: "Budaya" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Elder_telling_stories.jpg/1024px-Elder_telling_stories.jpg",
    mapLocation: {
      name: "Rumah Adat Desa Lingga",
      latitude: 3.2167,
      longitude: 98.3833,
      address: "Desa Lingga, Kecamatan Simpang Empat, Kabupaten Karo"
    }
  },
  {
    title: "Sistem Kekerabatan Rakut Sitelu: Pilar Harmoni Sosial Karo",
    summary: "Menganalisis konsep Rakut Sitelu sebagai sistem kekerabatan yang mengatur hubungan sosial dan menjaga keharmonisan dalam masyarakat Karo.",
    content: "Rakut Sitelu merupakan sistem kekerabatan yang menjadi pilar utama dalam mengatur kehidupan sosial masyarakat Karo. Konsep yang berarti 'ikatan tiga' ini merujuk pada tiga elemen penting dalam hubungan kekerabatan: kalimbubu (pihak pemberi anak gadis), senina (saudara semarga), dan anak beru (pihak penerima anak gadis). Ketiga elemen ini membentuk jaringan hubungan yang kompleks namun harmonis, di mana setiap pihak memiliki hak dan kewajiban yang jelas dalam berbagai aspek kehidupan sosial.\n\nDalam praktiknya, Rakut Sitelu mengatur berbagai aspek kehidupan, mulai dari upacara pernikahan, kelahiran, kematian, hingga dalam pengambilan keputusan penting dalam komunitas. Kalimbubu memiliki posisi yang dihormati karena dianggap sebagai sumber berkat, senina berperan sebagai partner dalam berbagai kegiatan sosial, sedangkan anak beru memiliki kewajiban untuk melayani dan menghormati kalimbubu. Sistem ini menciptakan keseimbangan sosial dan mencegah konflik karena setiap pihak memahami posisi dan perannya masing-masing. Rakut Sitelu juga berfungsi sebagai sistem jaminan sosial tradisional, di mana anggota komunitas saling membantu dalam kesulitan. Meskipun modernisasi telah membawa perubahan, konsep Rakut Sitelu masih tetap relevan dan dipraktikkan dalam masyarakat Karo kontemporer.",
    author: karoAuthors[2].name,
    email: karoAuthors[2].email,
    category: "Budaya" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Karo_kinship_diagram.jpg/1024px-Karo_kinship_diagram.jpg",
    mapLocation: {
      name: "Balai Adat Karo",
      latitude: 3.1000,
      longitude: 98.4833,
      address: "Jl. Jenderal Ahmad Yani, Kabanjahe, Kabupaten Karo"
    }
  },
  {
    title: "Upacara Kerja Tahun: Ritual Agraris yang Menghubungkan Manusia dengan Alam",
    summary: "Menelaah upacara Kerja Tahun sebagai ritual agraris yang mencerminkan hubungan harmonious antara masyarakat Karo dengan alam sekitarnya.",
    content: "Upacara Kerja Tahun merupakan ritual agraris yang mencerminkan hubungan harmonis antara masyarakat Karo dengan alam sekitarnya. Upacara ini dilakukan sebagai bentuk syukur atas hasil panen yang melimpah dan permohonan berkat untuk musim tanam berikutnya. Tradisi ini menunjukkan pemahaman mendalam masyarakat Karo tentang siklus alam dan pentingnya menjaga keseimbangan ekologis untuk keberlanjutan kehidupan.\n\nPelaksanaan Kerja Tahun melibatkan seluruh komunitas desa dengan serangkaian ritual yang telah diwariskan turun temurun. Upacara dimulai dengan pembersihan lahan dan persiapan alat-alat pertanian, dilanjutkan dengan ritual penyembahan kepada Dibata (Tuhan) dan para leluhur. Sesajen berupa hasil bumi seperti beras, sayuran, dan buah-buahan dipersembahkan sebagai tanda terima kasih. Musik tradisional dan tarian adat menyertai jalannya upacara, menciptakan suasana sakral dan meriah. Setelah ritual inti, dilakukan makan bersama yang melibatkan seluruh warga desa sebagai simbol kebersamaan dan persatuan. Upacara Kerja Tahun tidak hanya berfungsi sebagai ritual keagamaan, tetapi juga sebagai mekanisme penguatan solidaritas sosial dan pelestarian kearifan lokal dalam bidang pertanian.",
    author: karoAuthors[3].name,
    email: karoAuthors[3].email,
    category: "Budaya" as Category,
    featuredImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Agricultural_ceremony_Indonesia.jpg/1024px-Agricultural_ceremony_Indonesia.jpg",
    mapLocation: {
      name: "Desa Sukawali",
      latitude: 3.1500,
      longitude: 98.4500,
      address: "Sukawali, Kecamatan Simpang Empat, Kabupaten Karo"
    }
  }
];

// Function to create blocks from content
const createBlocksFromContent = (title: string, content: string, imageUrl?: string): Block[] => {
  const blocks: Block[] = [];
  
  // Add main heading
  blocks.push({
    id: `${Date.now()}-heading`,
    type: 'heading',
    content: title,
    level: 1
  });
  
  // Add image if provided
  if (imageUrl) {
    blocks.push({
      id: `${Date.now()}-image`,
      type: 'image',
      url: imageUrl,
      alt: title,
      caption: `Gambar ilustrasi: ${title}`
    });
  }
  
  // Split content into paragraphs and create blocks
  const paragraphs = content.split('\n\n');
  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim()) {
      blocks.push({
        id: `${Date.now()}-paragraph-${index}`,
        type: 'paragraph',
        content: paragraph.trim()
      });
    }
  });
  
  return blocks;
};

export const generateKaroArticles = async () => {
  const allArticles = [
    ...destinasiArticles,
    ...kulinerArticles, 
    ...sejarahArticles,
    ...budayaArticles
  ];
  
  console.log('Starting to generate Karo articles...');
  
  for (const articleData of allArticles) {
    try {
      // Create blocks from content
      const blocks = createBlocksFromContent(
        articleData.title, 
        articleData.content, 
        articleData.featuredImageUrl
      );
      
      // Prepare article data for Supabase
      const supabaseData = {
        title: articleData.title,
        content: articleData.content,
        summary: articleData.summary,
        author: articleData.author,
        email: articleData.email,
        category: articleData.category,
        subcategory: articleData.subcategory || null,
        featured_image_url: articleData.featuredImageUrl,
        map_location: articleData.mapLocation ? JSON.stringify(articleData.mapLocation) : null,
        publish_date: new Date().toISOString(),
        is_draft: false,
        blocks: JSON.stringify(blocks)
      };
      
      // Insert into Supabase
      const { error } = await supabase
        .from('articles')
        .insert(supabaseData);
      
      if (error) {
        console.error('Error inserting article:', error);
      } else {
        console.log(`✅ Successfully created article: ${articleData.title}`);
      }
      
      // Add small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`Error creating article "${articleData.title}":`, error);
    }
  }
  
  console.log('Finished generating Karo articles!');
};
