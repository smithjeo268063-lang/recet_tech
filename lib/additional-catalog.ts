import type { Product } from "@/lib/site-data";

const catalogGroups = [
  {
    category: "Mobile Phones",
    products: `
Apple iPhone 16 Pro Max
Apple iPhone 16 Pro
Apple iPhone 16 Plus
Apple iPhone 16
Apple iPhone 15 Pro Max
Apple iPhone 15 Pro
Apple iPhone 15
Samsung Galaxy S25 Ultra
Samsung Galaxy S25+
Samsung Galaxy S25
Samsung Galaxy S24 Ultra
Samsung Galaxy A56 5G
Samsung Galaxy A36 5G
Google Pixel 9 Pro XL
Google Pixel 9 Pro
Google Pixel 9
Xiaomi Redmi Note 14 Pro+
Xiaomi 14T Pro
Tecno Camon 40 Pro
Infinix Note 50 Pro`,
  },
  {
    category: "Laptops and Computers",
    products: `
Apple MacBook Air M4 13-inch
Apple MacBook Air M4 15-inch
Apple MacBook Pro M4 14-inch
Apple MacBook Pro M4 Pro 16-inch
Dell XPS 13
Dell XPS 15
Dell Latitude 7440
Dell Inspiron 15 3530
HP Spectre x360 14
HP EliteBook 840 G11
HP ProBook 450 G10
HP Pavilion 15
Lenovo ThinkPad X1 Carbon Gen 12
Lenovo ThinkPad T14 Gen 5
Lenovo IdeaPad Slim 5
ASUS Zenbook 14 OLED
ASUS ROG Zephyrus G16
Acer Aspire 5`,
  },
  {
    category: "Tablets and iPads",
    products: `
Apple iPad Pro M4 13-inch
Apple iPad Pro M4 11-inch
Apple iPad Air M3 13-inch
Apple iPad Air M3 11-inch
Apple iPad 10th Generation
Apple iPad mini A17 Pro
Samsung Galaxy Tab S10 Ultra
Samsung Galaxy Tab S10+
Samsung Galaxy Tab S10 FE
Samsung Galaxy Tab S9 FE
Samsung Galaxy Tab A9+
Xiaomi Pad 7 Pro
Xiaomi Pad 7
Lenovo Tab P12
Lenovo Tab M11
OnePlus Pad 2
Huawei MatePad 11.5`,
  },
  {
    category: "Phone Accessories",
    products: `
iPhone 16 Pro Max Silicone Case
iPhone 16 Pro Clear MagSafe Case
Samsung Galaxy S25 Ultra Protective Case
Samsung Galaxy A56 Leather Case
Universal Transparent Phone Case
MagSafe Magnetic Phone Case
Privacy Screen Protector for iPhone
Tempered Glass Screen Protector
Camera Lens Protector
Anti-Spy Screen Protector
Magnetic Phone Ring Holder
Foldable Phone Stand
Universal Phone Grip Holder
Waterproof Phone Pouch
Selfie Stick with Bluetooth Remote
Smartphone Cooling Fan
Phone Gaming Trigger Buttons
Universal Phone Lanyard`,
  },
  {
    category: "Laptop Accessories",
    products: `
Wireless Laptop Mouse
Logitech MX Master 3S Mouse
Logitech Pebble M350S Mouse
Mechanical USB Keyboard
Wireless Bluetooth Keyboard
Laptop Cooling Pad
Adjustable Laptop Stand
Aluminium Laptop Riser
USB-C Laptop Docking Station
Laptop Sleeve 13-inch
Laptop Sleeve 15.6-inch
Laptop Backpack
External Laptop Webcam
Laptop Privacy Screen
USB Fingerprint Reader
Laptop Cleaning Kit`,
  },
  {
    category: "Chargers and Adapters",
    products: `
Apple 20W USB-C Power Adapter
Apple 30W USB-C Power Adapter
Apple 35W Dual USB-C Adapter
Apple 70W USB-C Power Adapter
Samsung 25W Super Fast Charger
Samsung 45W Super Fast Charger
Anker 30W Nano Charger
Anker 65W GaN Charger
Anker 100W GaN Charger
UGREEN 65W USB-C Charger
UGREEN 100W Desktop Charger
Oraimo 20W Fast Charger
Oraimo 33W Fast Charger
Baseus 65W GaN Charger
Universal Laptop Power Adapter
USB-C to HDMI Adapter
Multi-Port USB Charging Station`,
  },
  {
    category: "Cables and Connectors",
    products: `
Apple USB-C to USB-C Cable
Apple USB-C to Lightning Cable
Samsung USB-C Charging Cable
Anker PowerLine III USB-C Cable
UGREEN 100W USB-C Cable
Baseus 100W USB-C Cable
Oraimo USB-C Cable
Micro USB Charging Cable
Lightning to USB-A Cable
USB-C to Lightning Cable
HDMI 2.1 Cable
DisplayPort Cable
USB-C to HDMI Cable
USB-C to Ethernet Adapter
USB-C to USB-A Adapter
3-in-1 Multi-Charging Cable`,
  },
  {
    category: "Power Banks and Batteries",
    products: `
Anker 10,000mAh Power Bank
Anker 20,000mAh Power Bank
Anker Prime 27,650mAh Power Bank
Oraimo Toast 10,000mAh Power Bank
Oraimo Traveler 20,000mAh Power Bank
Oraimo PowerJet 27,000mAh Power Bank
Baseus 10,000mAh Magnetic Power Bank
Baseus 20,000mAh Fast-Charging Power Bank
UGREEN 20,000mAh Power Bank
Xiaomi 10,000mAh Power Bank
Xiaomi 20,000mAh Power Bank
Samsung 10,000mAh Wireless Power Bank
Apple MagSafe Battery Pack
Romoss 20,000mAh Power Bank
Romoss 30,000mAh Power Bank
Rechargeable AA Battery Pack
Rechargeable AAA Battery Pack`,
  },
  {
    category: "Audio Devices",
    products: `
Apple AirPods Pro 2
Apple AirPods 4
Apple AirPods Max
Samsung Galaxy Buds3 Pro
Samsung Galaxy Buds3
Sony WH-1000XM5 Headphones
Sony WH-CH720N Headphones
JBL Tune 770NC Headphones
JBL Live 770NC Headphones
JBL Flip 7 Speaker
JBL Charge 6 Speaker
JBL Go 4 Speaker
JBL Xtreme 4 Speaker
Anker Soundcore Liberty 4 NC
Anker Soundcore Space One
Oraimo FreePods 4
Oraimo FreePods Neo
Beats Studio Pro
Beats Solo 4
Bose QuietComfort Ultra Headphones`,
  },
  {
    category: "Smartwatches and Wearables",
    products: `
Apple Watch Series 10
Apple Watch Series 11
Apple Watch Ultra 2
Apple Watch SE 2nd Generation
Samsung Galaxy Watch Ultra
Samsung Galaxy Watch 7
Samsung Galaxy Watch FE
Google Pixel Watch 3
Huawei Watch GT 5 Pro
Huawei Watch Fit 3
Xiaomi Smart Band 9
Xiaomi Watch S4
Amazfit GTR 4
Amazfit Balance
Oraimo Watch 5 Lite
Fitbit Charge 6`,
  },
  {
    category: "Gaming Gadgets",
    products: `
Sony PlayStation 5 Slim
Sony PlayStation 5 Pro
Microsoft Xbox Series X
Microsoft Xbox Series S
Nintendo Switch OLED
Nintendo Switch 2
PlayStation DualSense Wireless Controller
Xbox Wireless Controller
PlayStation Pulse Elite Headset
Logitech G29 Racing Wheel
Logitech G923 Racing Wheel
Razer BlackWidow V4 Keyboard
Razer DeathAdder V3 Mouse
Logitech G502 X Gaming Mouse
SteelSeries Arctis Nova 7 Headset
Meta Quest 3 VR Headset
HyperX Cloud III Gaming Headset
Gaming Laptop Cooling Pad`,
  },
  {
    category: "Storage Devices",
    products: `
Samsung T7 Shield 1TB SSD
Samsung T9 2TB SSD
SanDisk Extreme Portable SSD 1TB
SanDisk Extreme Portable SSD 2TB
Crucial X9 Pro 1TB SSD
Crucial X10 Pro 2TB SSD
Kingston XS1000 1TB SSD
Kingston XS2000 2TB SSD
WD My Passport 1TB HDD
WD My Passport 2TB HDD
Seagate Expansion 2TB HDD
Seagate Backup Plus 4TB HDD
SanDisk Ultra 128GB Flash Drive
SanDisk Ultra 256GB Flash Drive
Kingston DataTraveler 128GB
Samsung EVO Plus 256GB microSD
SanDisk Extreme 512GB microSD`,
  },
  {
    category: "Networking Devices",
    products: `
TP-Link Archer AX55 Wi-Fi 6 Router
TP-Link Archer AX73 Wi-Fi 6 Router
TP-Link Deco X20 Mesh Wi-Fi System
TP-Link Deco X50 Mesh Wi-Fi System
TP-Link Archer C6 AC1200 Router
ASUS RT-AX86U Pro Router
ASUS RT-AX58U Router
Netgear Nighthawk RAX50 Router
Netgear Orbi RBK752 Mesh System
Huawei 4G LTE CPE Router
Huawei 5G CPE Pro Router
ZTE 5G Indoor Router
MikroTik hAP ax3 Router
Ubiquiti UniFi U6+ Access Point
TP-Link TL-SG108 8-Port Gigabit Switch`,
  },
  {
    category: "Cameras and Photography Accessories",
    products: `
Sony Alpha A7 IV Camera
Sony Alpha A6700 Camera
Canon EOS R6 Mark II
Canon EOS R50
Nikon Z6 III
Nikon Z50 II
Fujifilm X-T5
Fujifilm X-S20
DJI Osmo Pocket 3
DJI Osmo Action 5 Pro
GoPro HERO13 Black
Sigma 24-70mm f/2.8 DG DN Lens
Sony FE 50mm f/1.8 Lens
Canon RF 50mm f/1.8 Lens
DJI RS 4 Gimbal
DJI Mini 4 Pro Drone
Godox SL60IID Video Light
Rode Wireless PRO Microphone`,
  },
  {
    category: "Smart Home Gadgets",
    products: `
Amazon Echo Dot 5th Generation
Amazon Echo Show 8
Google Nest Hub 2nd Generation
Google Nest Mini
Apple HomePod mini
Philips Hue Smart Bulb
TP-Link Tapo Smart Bulb
TP-Link Tapo Smart Plug
Xiaomi Smart LED Light Strip
Xiaomi Smart Air Purifier 4
Ring Video Doorbell
TP-Link Tapo C220 Security Camera
EZVIZ Indoor Security Camera
Google Nest Cam
Aqara Smart Door Sensor
Xiaomi Smart Temperature and Humidity Sensor`,
  },
  {
    category: "UK Used Phones",
    products: `
UK Used iPhone 16 Pro Max
UK Used iPhone 16 Pro
UK Used iPhone 16 Plus
UK Used iPhone 16
UK Used iPhone 15 Pro Max
UK Used iPhone 15 Pro
UK Used iPhone 15 Plus
UK Used iPhone 15
UK Used iPhone 14 Pro Max
UK Used iPhone 14 Pro
UK Used iPhone 14
UK Used iPhone 13 Pro Max
UK Used iPhone 13 Pro
UK Used iPhone 13
UK Used Samsung Galaxy S24 Ultra
UK Used Samsung Galaxy S23 Ultra
UK Used Samsung Galaxy S23+
UK Used Samsung Galaxy S22 Ultra
UK Used Google Pixel 8 Pro
UK Used Google Pixel 7 Pro`,
  },
  {
    category: "UK Used Laptops",
    products: `
UK Used MacBook Air M1
UK Used MacBook Air M2
UK Used MacBook Air M3
UK Used MacBook Pro M1 Pro
UK Used MacBook Pro M2 Pro
UK Used MacBook Pro M3 Pro
UK Used Dell Latitude 5420
UK Used Dell Latitude 5430
UK Used Dell Latitude 5440
UK Used Dell XPS 13
UK Used HP EliteBook 840 G8
UK Used HP EliteBook 840 G9
UK Used HP EliteBook 840 G10
UK Used HP ProBook 450 G8
UK Used Lenovo ThinkPad T14 Gen 2
UK Used Lenovo ThinkPad T14 Gen 3
UK Used Lenovo ThinkPad X1 Carbon Gen 9
UK Used Microsoft Surface Laptop 5`,
  },
] as const;

const brandPrefixes: [string, string][] = [
  ["Samsung", "Samsung"],
  ["Apple", "Apple"],
  ["iPhone", "Apple"],
  ["iPad", "Apple"],
  ["MacBook", "Apple"],
  ["AirPods", "Apple"],
  ["Apple Watch", "Apple"],
  ["HomePod", "Apple"],
  ["Google", "Google"],
  ["Pixel", "Google"],
  ["Xiaomi", "Xiaomi"],
  ["Redmi", "Xiaomi"],
  ["Tecno", "Tecno"],
  ["Infinix", "Infinix"],
  ["Dell", "Dell"],
  ["HP", "HP"],
  ["Lenovo", "Lenovo"],
  ["ASUS", "ASUS"],
  ["Acer", "Acer"],
  ["OnePlus", "OnePlus"],
  ["Huawei", "Huawei"],
  ["Logitech", "Logitech"],
  ["Apple", "Apple"],
  ["Anker", "Anker"],
  ["UGREEN", "UGREEN"],
  ["Oraimo", "Oraimo"],
  ["Baseus", "Baseus"],
  ["Romoss", "Romoss"],
  ["Sony", "Sony"],
  ["PlayStation", "Sony"],
  ["JBL", "JBL"],
  ["Beats", "Beats"],
  ["Bose", "Bose"],
  ["Amazfit", "Amazfit"],
  ["Fitbit", "Fitbit"],
  ["Microsoft", "Microsoft"],
  ["Xbox", "Microsoft"],
  ["Nintendo", "Nintendo"],
  ["Razer", "Razer"],
  ["SteelSeries", "SteelSeries"],
  ["Meta", "Meta"],
  ["HyperX", "HyperX"],
  ["SanDisk", "SanDisk"],
  ["Crucial", "Crucial"],
  ["Kingston", "Kingston"],
  ["WD ", "Western Digital"],
  ["Seagate", "Seagate"],
  ["TP-Link", "TP-Link"],
  ["ASUS", "ASUS"],
  ["Netgear", "Netgear"],
  ["ZTE", "ZTE"],
  ["MikroTik", "MikroTik"],
  ["Ubiquiti", "Ubiquiti"],
  ["Canon", "Canon"],
  ["Nikon", "Nikon"],
  ["Fujifilm", "Fujifilm"],
  ["DJI", "DJI"],
  ["GoPro", "GoPro"],
  ["Sigma", "Sigma"],
  ["Godox", "Godox"],
  ["Rode", "Rode"],
  ["Amazon", "Amazon"],
  ["Philips", "Philips"],
  ["Ring", "Ring"],
  ["EZVIZ", "EZVIZ"],
  ["Aqara", "Aqara"],
];

function getBrand(title: string) {
  const withoutUsedPrefix = title.replace(/^UK Used /i, "");
  const match = brandPrefixes.find(([prefix]) =>
    withoutUsedPrefix.toLowerCase().startsWith(prefix.toLowerCase()),
  );
  return match?.[1] ?? "Generic";
}

function createSlug(title: string) {
  return title
    .replace(/\+/g, " Plus ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCatalogProductSummary(category: string) {
  const summaries: Record<string, string> = {
    "Phone Accessories": "Practical protection and everyday add-ons designed to make your phone easier to use.",
    "Laptop Accessories": "Useful add-ons to improve comfort, connectivity, and everyday laptop use.",
    "Chargers and Adapters": "A charging essential for keeping compatible devices powered at home, at work, or on the go.",
    "Cables and Connectors": "A connectivity essential for linking compatible devices and keeping your setup ready to use.",
    "Power Banks and Batteries": "Portable power for keeping compatible devices and accessories ready when you are away from an outlet.",
    "Audio Devices": "Audio gear for listening, calls, and entertainment at home or on the go.",
  };

  return summaries[category] ?? `${category} selected for practical everyday use. Contact our team for product specifications, current price, and availability.`;
}

let nextCatalogProductId = 100000;

export const additionalCatalogProducts: Omit<Product, "images" | "specifications">[] =
  catalogGroups.flatMap(({ category, products }) =>
    products
      .split("\n")
      .map((title) => title.trim())
      .filter(Boolean)
      .map((title) => {
        const isUkUsed = category.startsWith("UK Used");

        return {
          id: nextCatalogProductId++,
          slug: createSlug(title),
          title,
          category,
          brand: getBrand(title),
          price: 0,
          compareAt: 0,
          rating: 0,
          reviews: 0,
          image: "",
          summary: getCatalogProductSummary(category),
          tags: [category],
          features: [],
          inventory: 0,
          isFeatured: false,
          isNew: false,
          isDeal: false,
          isUkUsed,
          isPublished: true,
        };
      }),
  );
