import { Product, ComponentOption, DiscountOffer } from '../types';

export const STORE_PRODUCTS: Product[] = [
  // --- TAYYOR GAMING PC'LAR (PREBUILTS) ---
  {
    id: 'pc-starter',
    name: 'Forge Starter V2',
    category: 'prebuilt',
    subCategory: 'Gaming PC',
    priceUSD: 849,
    image: 'https://images.unsplash.com/photo-1587202374404-00657ed4d00e?auto=format&fit=crop&w=800&q=80',
    specs: ['AMD Ryzen 5 7600 (5.1 GHz)', 'NVIDIA RTX 4060 8GB GDDR6', '16GB DDR5 5600MHz Kingston', '1TB NVMe M.2 Gen4 SSD', '650W 80+ Bronze Modular PSU', 'Forge AirFlow Glass Case'],
    popular: false,
    badge: 'Best Value',
    inStock: true,
    rating: 4.8,
    description: '1080p va 1440p gaming uchun mukammal boshlang\'ich tizim. CS2, Dota 2, Cyberpunk 2077 da yuqori FPS.',
    brand: 'PC Forge'
  },
  {
    id: 'pc-pro',
    name: 'Forge Pro Streamer',
    category: 'prebuilt',
    subCategory: 'Gaming PC',
    priceUSD: 1699,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80',
    specs: ['Intel Core i7-14700K (5.6 GHz)', 'NVIDIA RTX 4070 Ti Super 16GB', '32GB DDR5 6000MHz RGB', '2TB Samsung 990 PRO Gen4', '850W 80+ Gold DeepCool', '360mm ARGB Liquid AIO Cooler'],
    popular: true,
    badge: 'Xit Sotuv',
    inStock: true,
    rating: 4.9,
    description: 'Oqimli translyatsiyalar (streaming), 1440p ultra grafikalar va montaj uchun professional yechim.',
    brand: 'PC Forge'
  },
  {
    id: 'pc-beast',
    name: 'Forge Beast Titan 4090',
    category: 'prebuilt',
    subCategory: 'Workstation & Gaming',
    priceUSD: 3499,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    specs: ['AMD Ryzen 9 7950X3D (16 Core)', 'NVIDIA RTX 4090 24GB ROG Strix', '64GB DDR5 6400MHz Corsair Dominator', '4TB NVMe Gen5 Crucial T700', '1200W 80+ Platinum ATX 3.0', 'Custom Hard-Tube Liquid Loop'],
    popular: false,
    badge: 'Ultra Monster',
    inStock: true,
    rating: 5.0,
    description: 'Hech qanday cheklovlarsiz 4K Ultra Ray-Tracing o\'yinlar, AI treningi va 3D renderlash flagmani.',
    brand: 'PC Forge'
  },
  {
    id: 'pc-cyber-white',
    name: 'Forge Frost Apex (White Edition)',
    category: 'prebuilt',
    subCategory: 'Gaming PC',
    priceUSD: 2199,
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80',
    specs: ['Intel Core i7-14700KF', 'NVIDIA RTX 4080 Super 16GB White', '32GB DDR5 6000 White RGB', '2TB Gen4 Kingston Fury', 'Lian Li O11 Dynamic EVO White', 'NZXT Kraken 360 RGB LCD'],
    popular: true,
    badge: 'Snow White',
    inStock: true,
    rating: 4.9,
    description: 'Yorqin oq estetikaga ega, temperli panoramik shisha korpusli va LCD displeyli sovitkichli tizim.',
    brand: 'PC Forge'
  },

  // --- NOUTBUKLAR (LAPTOPS) ---
  {
    id: 'lap-rog-scar',
    name: 'ASUS ROG Strix SCAR 18',
    category: 'laptop',
    subCategory: 'Gaming Laptop',
    priceUSD: 2899,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    specs: ['18" QHD+ 240Hz Nebula HDR Mini LED', 'Intel Core i9-14900HX (24 Core)', 'NVIDIA RTX 4090 Laptop 16GB (175W)', '32GB DDR5 5600MHz (up to 64GB)', '2TB PCIe 4.0 NVMe SSD', 'Conductonaut Extreme Liquid Metal'],
    popular: true,
    badge: 'Flagman',
    inStock: true,
    rating: 4.9,
    description: 'Dunyoning eng qudratli gaming noutbuklaridan biri. Stol usti PC darajasidagi cheksiz quvvat.',
    brand: 'ASUS ROG'
  },
  {
    id: 'lap-legion-pro',
    name: 'Lenovo Legion Pro 7i Gen 9',
    category: 'laptop',
    subCategory: 'Gaming Laptop',
    priceUSD: 2249,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    specs: ['16" WQXGA 240Hz 500 nits IPS', 'Intel Core i9-14900HX', 'NVIDIA RTX 4080 Laptop 12GB', '32GB DDR5 RAM', '1TB NVMe M.2 SSD', 'Coldfront 5.0 bug\' kamerali sovutish'],
    popular: false,
    badge: 'Top Tanlov',
    inStock: true,
    rating: 4.8,
    description: 'AI quvvatlangan Legion Coldfront sovitish tizimi va o\'ta aniq PureSight Gaming displeyi.',
    brand: 'Lenovo'
  },
  {
    id: 'lap-razer-blade',
    name: 'Razer Blade 16 Dual-Mode',
    category: 'laptop',
    subCategory: 'Premium Laptop',
    priceUSD: 3199,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    specs: ['16" Dual-Mode Mini-LED (4K 120Hz / FHD+ 240Hz)', 'Intel Core i9-14900HX', 'NVIDIA RTX 4080 12GB', '32GB DDR5 5600MHz', '2TB NVMe SSD', 'CNC alyuminiy unibody qora korpus'],
    popular: false,
    badge: 'Ultra Slim',
    inStock: true,
    rating: 4.9,
    description: 'Anodlangan aerokosmik alyuminiy korpus, er-xotin ekran rejimi va zamonaviy ixcham shakl.',
    brand: 'Razer'
  },
  {
    id: 'lap-macbook-pro',
    name: 'Apple MacBook Pro 16" M3 Max',
    category: 'laptop',
    subCategory: 'Creator Laptop',
    priceUSD: 3499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    specs: ['16.2" Liquid Retina XDR 120Hz ProMotion', 'Apple M3 Max (16-core CPU, 40-core GPU)', '48GB Birlashgan Yuqori Tezlikdagi Xotira', '1TB Superfast SSD', '22 soatgacha batareya quvvati', 'Space Black rangida'],
    popular: true,
    badge: 'Pro Creator',
    inStock: true,
    rating: 5.0,
    description: 'Dasturchilar, 8K video montajchilari va musiqa prodyuserlari uchun avtonom qudrat manbai.',
    brand: 'Apple'
  },

  // --- KOMPONENTLAR (HARDWARE COMPONENTS) ---
  {
    id: 'comp-rtx-4090',
    name: 'ASUS ROG Strix GeForce RTX 4090 24GB',
    category: 'component',
    subCategory: 'GPU',
    priceUSD: 1999,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    specs: ['24GB GDDR6X 384-bit', 'Ada Lovelace arxitekturasi', 'DLSS 3.5 & 3-avlod RT yadrolari', 'Axial-tech fanlar va 3.5 slot sovutgich'],
    popular: true,
    badge: 'Flagman GPU',
    inStock: true,
    rating: 5.0,
    description: 'Dunyoning eng qudratli grafik kartasi. Ekstremal overkloklash va 4K/8K gaming uchun.',
    brand: 'ASUS ROG'
  },
  {
    id: 'comp-i9-14900ks',
    name: 'Intel Core i9-14900KS Special Edition',
    category: 'component',
    subCategory: 'CPU',
    priceUSD: 689,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    specs: ['24 yadro (8P + 16E), 32 oqim', '6.2 GHz gacha rekord chastota', '36MB Intel Smart Cache', 'LGA1700 soket'],
    popular: false,
    badge: 'Record Breaker',
    inStock: true,
    rating: 4.8,
    description: 'Dunyodagi eng tezkor zavod chastotali protsessor. Maksimal gaming va hisoblash kuchi.',
    brand: 'Intel'
  },
  {
    id: 'comp-ryzen-7800x3d',
    name: 'AMD Ryzen 7 7800X3D Processor',
    category: 'component',
    subCategory: 'CPU',
    priceUSD: 449,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    specs: ['8 yadro, 16 oqim, 5.0 GHz boost', '96MB 3D V-Cache texnologiyasi', 'AM5 soket, 120W TDP', 'Dunyoning #1 Gaming CPUsi'],
    popular: true,
    badge: 'Best Gaming CPU',
    inStock: true,
    rating: 5.0,
    description: 'O\'yinlarda eng yuqori va barqaror FPS ko\'rsatuvchi 3D V-Cache keshiga ega protsessor.',
    brand: 'AMD'
  },
  {
    id: 'comp-ram-corsair-ddr5',
    name: 'Corsair Dominator Titanium 64GB DDR5 (2x32GB)',
    category: 'component',
    subCategory: 'RAM',
    priceUSD: 319,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80',
    specs: ['6400 MT/s CL32', 'Eksklyuziv iCUE RGB yoritgich', 'DHX patentli sovutish texnologiyasi', 'Intel XMP 3.0 & AMD EXPO'],
    popular: false,
    badge: 'Premium DDR5',
    inStock: true,
    rating: 4.9,
    description: 'Premium alyuminiy sovutgichli, eng barqaror va past kechikishli (low-latency) tezkor xotira.',
    brand: 'Corsair'
  },
  {
    id: 'comp-ssd-samsung-990',
    name: 'Samsung 990 PRO 2TB NVMe M.2 with Heatsink',
    category: 'component',
    subCategory: 'Storage',
    priceUSD: 189,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    specs: ['O\'qish: 7450 MB/s, Yozish: 6900 MB/s', 'PCIe 4.0 x4, NVMe 2.0', 'RGB yoritgichli Heatsink sovutgich', 'PS5 va PC bilan to\'liq mos'],
    popular: true,
    badge: 'Fastest Gen4',
    inStock: true,
    rating: 4.9,
    description: 'O\'yinlar va og\'ir dasturlarni soniyalar ichida yuklovchi ishonchli Samsung xotira drayveri.',
    brand: 'Samsung'
  },

  // --- PERIFERIYA & AKSESSUARLAR (PERIPHERALS) ---
  {
    id: 'peri-rog-oled-monitor',
    name: 'ASUS ROG Swift OLED PG27AQDM 27" 240Hz',
    category: 'peripheral',
    subCategory: 'Monitor',
    priceUSD: 799,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    specs: ['27" QHD (2560x1440) OLED panel', '240Hz yangilanish, 0.03ms javob vaqti', '99% DCI-P3 ranglar qamrovi', 'G-Sync Compatible & Maxsus Heatsink'],
    popular: true,
    badge: 'OLED 240Hz',
    inStock: true,
    rating: 4.9,
    description: 'Haqiqiy chuqur qora ranglar, soniyaning mingdan bir ulushidagi javob tezligi va 240Hz silliqlik.',
    brand: 'ASUS ROG'
  },
  {
    id: 'peri-wooting-keyboard',
    name: 'Wooting 60HE+ Rapid Trigger Keyboard',
    category: 'peripheral',
    subCategory: 'Keyboard',
    priceUSD: 199,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    specs: ['Lekker Hall-Effect Magnitli switchlar', '0.1mm Rapid Trigger tezkor javob', 'To\'liq dasturlanuvchi RGB', 'PBT Double-shot qopqoqlar'],
    popular: true,
    badge: 'Esports Standard',
    inStock: true,
    rating: 5.0,
    description: 'Kibersport olamida inqilob yasagan magnitli analog klaviatura. Harakatni lahzada to\'xtatish imkoni.',
    brand: 'Wooting'
  },
  {
    id: 'peri-superlight-mouse',
    name: 'Logitech G PRO X SUPERLIGHT 2 Dex',
    category: 'peripheral',
    subCategory: 'Mouse',
    priceUSD: 159,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    specs: ['60 gramm o\'ta yengil vazn', 'HERO 2 sensori (32,000 DPI)', 'LIGHTFORCE optik-mexanik switchlar', 'LIGHTSPEED simsiz ulanish, 95 soat batareya'],
    popular: true,
    badge: 'Pro Choice',
    inStock: true,
    rating: 4.9,
    description: 'G\'oliblar tanlovi: simsiz erkinlik, piksel darajasidagi aniqlik va yengil ergonimik shakl.',
    brand: 'Logitech G'
  },
  {
    id: 'peri-steelseries-headset',
    name: 'SteelSeries Arctis Nova Pro Wireless',
    category: 'peripheral',
    subCategory: 'Headset',
    priceUSD: 349,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    specs: ['Faol shovqinni bekor qilish (ANC)', 'Cheksiz o\'yin uchun almashtiriluvchi 2 ta batareya', 'Hi-Res fazoviy 360° audio drayverlari', 'Simsiz 2.4GHz + Bluetooth bir vaqtda'],
    popular: false,
    badge: 'Audiophile Gaming',
    inStock: true,
    rating: 4.8,
    description: 'Raqibning har bir qadam tovushini eshiting. Yuqori aniqlikdagi studiya darajasidagi ovoz.',
    brand: 'SteelSeries'
  }
];

// --- PC BUILDER KONFIGURATORI UCHUN QISMLAR ---
export const BUILDER_COMPONENTS: { [key in ComponentOption['category']]: ComponentOption[] } = {
  cpu: [
    {
      id: 'b-cpu-1',
      category: 'cpu',
      name: 'AMD Ryzen 5 7600',
      brand: 'AMD',
      priceUSD: 199,
      wattage: 65,
      socket: 'AM5',
      specs: '6 Yadro / 12 Oqim / 5.1 GHz / 38MB Kesh',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
      tier: 'Starter'
    },
    {
      id: 'b-cpu-2',
      category: 'cpu',
      name: 'AMD Ryzen 7 7800X3D',
      brand: 'AMD',
      priceUSD: 449,
      wattage: 120,
      socket: 'AM5',
      specs: '8 Yadro / 16 Oqim / 5.0 GHz / 96MB 3D V-Cache',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-cpu-3',
      category: 'cpu',
      name: 'Intel Core i7-14700K',
      brand: 'Intel',
      priceUSD: 399,
      wattage: 253,
      socket: 'LGA1700',
      specs: '20 Yadro (8P+12E) / 28 Oqim / 5.6 GHz / 33MB',
      image: 'https://images.unsplash.com/photo-1587202374404-00657ed4d00e?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-cpu-4',
      category: 'cpu',
      name: 'Intel Core i9-14900KS',
      brand: 'Intel',
      priceUSD: 689,
      wattage: 320,
      socket: 'LGA1700',
      specs: '24 Yadro (8P+16E) / 32 Oqim / 6.2 GHz Rekord',
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80',
      tier: 'Extreme'
    }
  ],
  gpu: [
    {
      id: 'b-gpu-1',
      category: 'gpu',
      name: 'GeForce RTX 4060 8GB OC',
      brand: 'NVIDIA',
      priceUSD: 299,
      wattage: 115,
      specs: '8GB GDDR6 / DLSS 3 / 1080p Ultra Gaming',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80',
      tier: 'Starter'
    },
    {
      id: 'b-gpu-2',
      category: 'gpu',
      name: 'GeForce RTX 4070 Super 12GB',
      brand: 'NVIDIA',
      priceUSD: 599,
      wattage: 220,
      specs: '12GB GDDR6X / DLSS 3.5 / 1440p Max FPS',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-gpu-3',
      category: 'gpu',
      name: 'GeForce RTX 4080 Super 16GB',
      brand: 'NVIDIA',
      priceUSD: 999,
      wattage: 320,
      specs: '16GB GDDR6X / 4K Ray-Tracing / 10,240 CUDA',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-gpu-4',
      category: 'gpu',
      name: 'ROG Strix RTX 4090 24GB OC',
      brand: 'ASUS ROG',
      priceUSD: 1999,
      wattage: 450,
      specs: '24GB GDDR6X / AI & 4K Extreme / 16,384 CUDA',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      tier: 'Extreme'
    }
  ],
  motherboard: [
    {
      id: 'b-mb-1',
      category: 'motherboard',
      name: 'MSI B650 Gaming Plus WiFi (AM5)',
      brand: 'MSI',
      priceUSD: 169,
      wattage: 50,
      socket: 'AM5',
      ramType: 'DDR5',
      specs: 'PCIe 4.0 / WiFi 6E / 2.5G LAN / DDR5-6400+',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
      tier: 'Starter'
    },
    {
      id: 'b-mb-2',
      category: 'motherboard',
      name: 'ASUS ROG STRIX Z790-F Gaming WiFi II',
      brand: 'ASUS ROG',
      priceUSD: 369,
      wattage: 65,
      socket: 'LGA1700',
      ramType: 'DDR5',
      specs: 'PCIe 5.0 / WiFi 7 / 16+1+2 quvvat bosqichlari / DDR5-8000+',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-mb-3',
      category: 'motherboard',
      name: 'ASUS ROG Crosshair X670E Hero (AM5)',
      brand: 'ASUS ROG',
      priceUSD: 599,
      wattage: 70,
      socket: 'AM5',
      ramType: 'DDR5',
      specs: 'Dual PCIe 5.0 / USB4 / Polymo RGB / Ekstremal OC',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
      tier: 'Extreme'
    }
  ],
  ram: [
    {
      id: 'b-ram-1',
      category: 'ram',
      name: 'Kingston Fury Beast 16GB (2x8GB) DDR5',
      brand: 'Kingston',
      priceUSD: 69,
      wattage: 15,
      ramType: 'DDR5',
      specs: '5600 MT/s CL36 / Low Profile qora radiator',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80',
      tier: 'Starter'
    },
    {
      id: 'b-ram-2',
      category: 'ram',
      name: 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5',
      brand: 'G.Skill',
      priceUSD: 139,
      wattage: 20,
      ramType: 'DDR5',
      specs: '6000 MT/s CL30 / Brilliant RGB / Intel XMP 3.0',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-ram-3',
      category: 'ram',
      name: 'Corsair Dominator Titanium 64GB (2x32GB) DDR5',
      brand: 'Corsair',
      priceUSD: 319,
      wattage: 25,
      ramType: 'DDR5',
      specs: '6600 MT/s CL32 / Custom Top Bars / Premium ICs',
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80',
      tier: 'Extreme'
    }
  ],
  storage: [
    {
      id: 'b-ssd-1',
      category: 'storage',
      name: 'Kingston NV2 1TB M.2 NVMe',
      brand: 'Kingston',
      priceUSD: 65,
      wattage: 5,
      specs: 'PCIe 4.0 / 3500 MB/s o\'qish tezligi',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
      tier: 'Starter'
    },
    {
      id: 'b-ssd-2',
      category: 'storage',
      name: 'Samsung 990 PRO 2TB NVMe Gen4',
      brand: 'Samsung',
      priceUSD: 179,
      wattage: 8,
      specs: '7450 MB/s o\'qish / 6900 MB/s yozish / DRAM kesh',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-ssd-3',
      category: 'storage',
      name: 'Crucial T700 4TB NVMe Gen5 (Heatsink)',
      brand: 'Crucial',
      priceUSD: 469,
      wattage: 12,
      specs: '12,400 MB/s o\'qish / 11,800 MB/s yozish / Gen5 flagman',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80',
      tier: 'Extreme'
    }
  ],
  cooler: [
    {
      id: 'b-cool-1',
      category: 'cooler',
      name: 'DeepCool AK620 Digital Air Cooler',
      brand: 'DeepCool',
      priceUSD: 69,
      wattage: 5,
      specs: 'Dual-Tower / Haqiqiy vaqt harorat ekrani / 260W TDP',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      tier: 'Starter'
    },
    {
      id: 'b-cool-2',
      category: 'cooler',
      name: 'Arctic Liquid Freezer III 360 ARGB',
      brand: 'Arctic',
      priceUSD: 129,
      wattage: 15,
      specs: '360mm radiator / VRM fan / Qalin 38mm radiator',
      image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-cool-3',
      category: 'cooler',
      name: 'NZXT Kraken Elite 360 RGB with 2.36" LCD',
      brand: 'NZXT',
      priceUSD: 289,
      wattage: 20,
      specs: '640x640 LCD ekran / GIF & Harorat / F120 RGB Core fanlar',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80',
      tier: 'Extreme'
    }
  ],
  psu: [
    {
      id: 'b-psu-1',
      category: 'psu',
      name: 'MSI MAG A650BN 650W',
      brand: 'MSI',
      priceUSD: 65,
      wattage: 650,
      specs: '80+ Bronze / DC to DC / 120mm jim fan',
      image: 'https://images.unsplash.com/photo-1587202374404-00657ed4d00e?auto=format&fit=crop&w=400&q=80',
      tier: 'Starter'
    },
    {
      id: 'b-psu-2',
      category: 'psu',
      name: 'Corsair RM850x Shift 850W ATX 3.0',
      brand: 'Corsair',
      priceUSD: 159,
      wattage: 850,
      specs: '80+ Gold / To\'liq modular / Yon kabellar / PCIe 5.0 12VHPWR',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-psu-3',
      category: 'psu',
      name: 'Seasonic Vertex GX-1200 1200W ATX 3.0',
      brand: 'Seasonic',
      priceUSD: 249,
      wattage: 1200,
      specs: '80+ Gold / Yaponiya kondensatorlari / 12V-2x6 kabel / 10 yil kafolat',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80',
      tier: 'Extreme'
    }
  ],
  case: [
    {
      id: 'b-case-1',
      category: 'case',
      name: 'Montech AIR 903 MAX (Black)',
      brand: 'Montech',
      priceUSD: 75,
      wattage: 0,
      specs: '4 ta 140mm ARGB fan / Mesh old panel / Type-C port',
      image: 'https://images.unsplash.com/photo-1587202374404-00657ed4d00e?auto=format&fit=crop&w=400&q=80',
      tier: 'Starter'
    },
    {
      id: 'b-case-2',
      category: 'case',
      name: 'NZXT H9 Flow Dual-Chamber Panoramic',
      brand: 'NZXT',
      priceUSD: 159,
      wattage: 0,
      specs: 'Uzluksiz temperli shisha burchak / 10 ta fan sig\'imi / Yuqori havo oqimi',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80',
      tier: 'Pro'
    },
    {
      id: 'b-case-3',
      category: 'case',
      name: 'Lian Li O11 Dynamic EVO RGB (White)',
      brand: 'Lian Li',
      priceUSD: 179,
      wattage: 0,
      specs: 'Dual-mode teskari yig\'ish / Lazer ARGB chiziq / 3x 360mm radiator',
      image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=400&q=80',
      tier: 'Extreme'
    }
  ]
};

// --- OMAD G'ILDIRAGI YUTUQLARI (LUCKY WHEEL PRIZES) ---
export const LUCKY_WHEEL_SLICES: DiscountOffer[] = [
  {
    code: 'FORGE10',
    percent: 10,
    name: '10% Chegirma',
    description: 'Barcha tovarlar va shaxsiy PC buyurtmalari uchun 10% chegirma!'
  },
  {
    code: 'LUCKY15',
    percent: 15,
    name: '15% Chegirma',
    description: 'Barcha noutbuklar va gaming PC\'larga 15% foydali chegirma!'
  },
  {
    code: 'PROGIFT',
    percent: 12,
    name: 'Bepul Yetkazish + 12%',
    description: 'O\'zbekiston bo\'ylab tezyurar bepul yetkazib berish va 12% chegirma!'
  },
  {
    code: 'CYBER20',
    percent: 20,
    name: '20% Mega Chegirma',
    description: 'Bugungi eng katta sovg\'a — butun savatchangiz uchun 20% kiber chegirma!'
  },
  {
    code: 'BONUS8',
    percent: 8,
    name: '8% Eksklyuziv',
    description: 'Barcha yangi mahsulotlar va butlovchi qismlarga 8% chegirma!'
  },
  {
    code: 'TITAN25',
    percent: 25,
    name: '25% Super Jackpot',
    description: 'Qoyilmaqom omad! Savatchangizga rekord 25% super chegirma qo\'llandi!'
  }
];

export const BRANDS = [
  'NVIDIA',
  'AMD RYZEN',
  'INTEL CORE',
  'ASUS ROG',
  'MSI GAMING',
  'CORSAIR',
  'SAMSUNG',
  'LENOVO LEGION',
  'RAZER',
  'LOGITECH G',
  'WOOTING',
  'LIAN LI'
];
