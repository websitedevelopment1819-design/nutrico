// ============================================================
//  NUTRICO – Brand & Product Data
//  Edit this file to update all prices, descriptions & info.
// ============================================================

export const BRAND = {
  name: 'NUTRICO',
  tagline: 'Desi Ingredients. Modern Nutrition.',
  description:
    'NUTRICO combines traditional Indian ingredients and modern nutritional convenience. Our goal is to make everyday wellness easier through thoughtfully formulated nutrition powders.',
  instagram: 'https://www.instagram.com/nutrico.in',
};

// ── PACKAGING OPTIONS ──────────────────────────────────────
// Each option is reused across products unless overridden.
// `id` is used as the cart key suffix.
export const PACKAGING_TYPES = {
  sachet:  { id: 'sachet',  label: 'Trial Sachet', weight: '~8g', servings: '1 serving',  note: 'Try before you commit' },
  pouch10: { id: 'pouch10', label: 'Pack of 10 Sachets', weight: '10 × ~8g', servings: '10 servings', note: 'Best for gifting' },
  pouch100:{ id: 'pouch100',label: '100g Zip Pouch', weight: '100g', servings: '~12 servings', note: 'Most popular' },
};

// ── PRODUCTS ───────────────────────────────────────────────
// price fields per packaging: sachet | pouch10 | pouch100
// ↓ Edit these values – they drive the entire store.
export const PRODUCTS = [
  {
    id: 'digestease',
    name: 'DigestEase',
    subtitle: 'Digestive Wellness Powder',
    shortDesc: 'A gentle blend of traditional Indian botanicals to support everyday digestive comfort.',
    description:
      'DigestEase is a carefully crafted digestive wellness powder combining time-honoured Indian herbs. Formulated to gently support your digestive system as part of a balanced diet and healthy lifestyle.',
    prices: {
      sachet:   15,   // ← Edit: Trial Sachet price
      pouch10:  99,   // ← Edit: Pack of 10 Sachets price
      pouch100: 129,  // ← Edit: 100g Zip Pouch price
    },
    color: '#2D5A3D',
    bgColor: '#EAF2EC',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1611072337226-1ea9e4af4b27?w=700&q=80',
    ingredients: [
      { name: 'Ajwain (Carom Seeds)', benefit: 'Traditionally used to support digestive comfort' },
      { name: 'Saunf (Fennel Seeds)', benefit: 'Known for its soothing digestive properties' },
      { name: 'Jeera (Cumin)', benefit: 'A classical ingredient in Indian digestive wellness' },
      { name: 'Ginger Extract', benefit: 'Widely used in traditional Indian wellness practices' },
      { name: 'Triphala Blend', benefit: 'A classic Ayurvedic combination of three fruits' },
      { name: 'Pudina (Mint) Extract', benefit: 'Known for its cooling and refreshing qualities' },
    ],
    benefits: [
      'Supports everyday digestive comfort',
      'Made with traditional Indian botanicals',
      'Easy to mix – dissolves in water or warm milk',
      'No artificial colours or flavours',
      'Suitable for daily use as part of a balanced diet',
    ],
    usage: 'Mix 1 sachet (or 1 scoop ≈ 8g) in a glass of warm water or warm milk. Best consumed after meals. Consult a healthcare professional before use if you have a medical condition.',
    tags: ['Digestive', 'Herbal', 'Traditional'],
  },
  {
    id: 'fibrefit',
    name: 'FibreFit',
    subtitle: 'Daily Fiber Mix',
    shortDesc: 'A wholesome mix of dietary fibres to support your daily gut health goals.',
    description:
      'FibreFit is a daily dietary fibre mix blended from whole food sources. Designed to help you meet your daily fibre intake conveniently, as part of a balanced diet.',
    prices: {
      sachet:   15,   // ← Edit
      pouch10:  99,   // ← Edit
      pouch100: 119,  // ← Edit
    },
    color: '#8B6914',
    bgColor: '#FDF6E3',
    emoji: '🌾',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=700&q=80',
    ingredients: [
      { name: 'Psyllium Husk (Isabgol)', benefit: 'A well-known source of soluble dietary fibre' },
      { name: 'Oat Fibre', benefit: 'Contributes to daily fibre intake' },
      { name: 'Flaxseed (Alsi)', benefit: 'A source of dietary fibre and omega-3 fatty acids' },
      { name: 'Chia Seeds', benefit: 'Rich in dietary fibre' },
      { name: 'Apple Fibre', benefit: 'A natural source of dietary fibre' },
      { name: 'Inulin (Chicory Root)', benefit: 'A prebiotic fibre source' },
    ],
    benefits: [
      'Contributes to your daily dietary fibre intake',
      'Blend of soluble and insoluble fibre sources',
      'Mixes easily into water, juice or smoothies',
      'Free from artificial additives',
      'Suitable for daily use as part of a balanced diet',
    ],
    usage: 'Mix 1 sachet (or 1 scoop ≈ 8g) in 200ml of water or juice. Stir well and drink immediately. Increase water intake throughout the day.',
    tags: ['Fibre', 'Gut Health', 'Daily Wellness'],
  },
  {
    id: 'ironrich',
    name: 'IronRich',
    subtitle: 'Iron-Rich Nutrition Mix',
    shortDesc: 'A thoughtfully formulated nutrition mix with iron-rich whole food ingredients.',
    description:
      'IronRich is a nutrition mix crafted with ingredients traditionally known for their iron content. Designed to complement your diet, not replace it.',
    prices: {
      sachet:   15,   // ← Edit
      pouch10:  109,  // ← Edit
      pouch100: 149,  // ← Edit
    },
    color: '#8B3A3A',
    bgColor: '#FBEAEA',
    emoji: '🫘',
    image: 'https://images.unsplash.com/photo-1612257416648-95c0fd4a5071?w=700&q=80',
    ingredients: [
      { name: 'Moringa (Drumstick Leaf) Powder', benefit: 'Moringa leaves are known to contain iron' },
      { name: 'Spinach (Palak) Powder', benefit: 'Spinach is a well-known dietary source of iron' },
      { name: 'Beetroot Powder', benefit: 'A traditionally valued root vegetable' },
      { name: 'Sesame Seeds (Til)', benefit: 'Known to contain iron and other minerals' },
      { name: 'Amaranth (Rajgira) Powder', benefit: 'A traditional Indian grain with mineral content' },
      { name: 'Vitamin C (from Amla Extract)', benefit: 'Vitamin C contributes to normal iron absorption' },
    ],
    benefits: [
      'Made with ingredients known for their iron content',
      'Includes Vitamin C to support iron absorption',
      'Whole food ingredient blend',
      'No synthetic colours or artificial flavours',
      'Best used as a dietary supplement alongside a balanced diet',
    ],
    usage: 'Mix 1 sachet (or 1 scoop ≈ 8g) in 200ml water, juice or a smoothie. Consume once daily. This product is a food supplement and does not replace a varied and balanced diet.',
    tags: ['Iron', 'Nutrition', 'Whole Food'],
  },
  {
    id: 'boneboost',
    name: 'BoneBoost',
    subtitle: 'Calcium-Rich Nutrition Mix',
    shortDesc: 'A calcium-rich blend to support your bone health goals naturally.',
    description:
      'BoneBoost is a nutrition mix crafted with calcium-rich whole food ingredients. Formulated to help you conveniently include more calcium-containing foods in your diet.',
    prices: {
      sachet:   15,   // ← Edit
      pouch10:  109,  // ← Edit
      pouch100: 139,  // ← Edit
    },
    color: '#5A4A7C',
    bgColor: '#F0EEF8',
    emoji: '🦴',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=700&q=80',
    ingredients: [
      { name: 'Ragi (Finger Millet) Powder', benefit: 'Ragi is one of the richest plant sources of calcium' },
      { name: 'Sesame Seed (Til) Powder', benefit: 'Sesame is known for its calcium content' },
      { name: 'Moringa Leaf Powder', benefit: 'Moringa leaves contain calcium among other minerals' },
      { name: 'Ashwagandha Extract', benefit: 'A traditional Indian adaptogen' },
      { name: 'Vitamin D3 (from Lichen)', benefit: 'Vitamin D contributes to normal calcium absorption' },
      { name: 'Magnesium (from Natural Source)', benefit: 'Magnesium contributes to normal bone health' },
    ],
    benefits: [
      'Rich in calcium from whole food sources',
      'Includes Vitamin D3 to support calcium absorption',
      'Naturally formulated without synthetic calcium powders',
      'Ragi-based for an authentic Indian nutrition approach',
      'Suitable as a daily dietary supplement',
    ],
    usage: 'Mix 1 sachet (or 1 scoop ≈ 8g) in warm milk or water. Best consumed in the morning. This product is a food supplement and does not replace a varied and balanced diet.',
    tags: ['Calcium', 'Bone Health', 'Ragi'],
  },
];

// ── COMBO PACK ─────────────────────────────────────────────
export const COMBO_PACK = {
  id: 'combo-all-four',
  name: 'Complete Wellness Pack',
  subtitle: 'All Four Products',
  description: 'One of each: DigestEase + FibreFit + IronRich + BoneBoost. Try the full NUTRICO range.',
  price: 399,          // ← Edit: Combo pack price
  productIds: ['digestease', 'fibrefit', 'ironrich', 'boneboost'],
  packagingType: 'sachet', // combo uses trial sachets
  image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700&q=80',
  savings: null,       // calculated dynamically
  color: '#2D5A3D',
  bgColor: '#EAF2EC',
  emoji: '🎁',
  tags: ['Best Value', 'All Products', 'Gift Pack'],
};

// ── INGREDIENTS GALLERY ────────────────────────────────────
export const INGREDIENTS_GALLERY = [
  {
    name: 'Moringa', hindi: 'Sahjan',
    image: 'https://images.unsplash.com/photo-1622728192617-57ca72c70153?w=500&q=80',
    description: 'Known as the "miracle tree", moringa leaves have been used in traditional Indian wellness for centuries. Rich in minerals and plant compounds.',
    products: ['IronRich', 'BoneBoost'],
  },
  {
    name: 'Ragi', hindi: 'Finger Millet',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6962b3?w=500&q=80',
    description: 'A staple grain in South India, Ragi is celebrated for its calcium content. It has been a cornerstone of traditional Indian nutrition for generations.',
    products: ['BoneBoost'],
  },
  {
    name: 'Psyllium Husk', hindi: 'Isabgol',
    image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=500&q=80',
    description: 'Isabgol has been used in traditional Indian wellness practices for generations. One of the best-known natural sources of soluble dietary fibre.',
    products: ['FibreFit'],
  },
  {
    name: 'Amla', hindi: 'Indian Gooseberry',
    image: 'https://images.unsplash.com/photo-1631165842776-6b5f76c8d500?w=500&q=80',
    description: 'Amla, or Indian gooseberry, is one of the richest natural sources of Vitamin C. Treasured in Ayurveda as a rejuvenating ingredient.',
    products: ['IronRich'],
  },
  {
    name: 'Ajwain', hindi: 'Carom Seeds',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
    description: 'A beloved spice in every Indian kitchen, Ajwain has been used for centuries as a digestive aid. Its essential oils give it a distinct, warm aroma.',
    products: ['DigestEase'],
  },
  {
    name: 'Triphala', hindi: 'Three Fruits Blend',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&q=80',
    description: 'One of the most revered classical combinations in Ayurveda – a blend of three dried fruits: Amalaki, Bibhitaki and Haritaki.',
    products: ['DigestEase'],
  },
  {
    name: 'Flaxseed', hindi: 'Alsi',
    image: 'https://images.unsplash.com/photo-1611271017308-31780af65b11?w=500&q=80',
    description: 'Flaxseeds, known as Alsi in India, are a rich plant source of dietary fibre and omega-3 fatty acids. A small seed with impressive nutritional properties.',
    products: ['FibreFit'],
  },
  {
    name: 'Beetroot', hindi: 'Chukandar',
    image: 'https://images.unsplash.com/photo-1593100126453-19b562a800c1?w=600&q=80',
    description: 'A vibrant root vegetable known for its deep red colour and earthy flavour. A wonderful whole-food ingredient in wellness formulations.',
    products: ['IronRich'],
  },
];

// ── BRAND VALUES ───────────────────────────────────────────
export const VALUES = [
  { icon: '🌿', title: 'Rooted in Tradition',    description: 'We draw inspiration from centuries of Indian botanical wisdom.' },
  { icon: '🔬', title: 'Thoughtfully Formulated', description: 'Every product combines traditional ingredients with contemporary nutritional thinking.' },
  { icon: '✨', title: 'Clean & Transparent',     description: 'No artificial colours, flavours or unnecessary additives. You deserve to know what you consume.' },
  { icon: '🇮🇳', title: 'Proudly Indian',          description: 'From the ingredients we source to the brand we are building – NUTRICO is inspired by and made for India.' },
  { icon: '♻️', title: 'Conscious Packaging',     description: 'We are working towards more sustainable packaging choices, because wellness extends to our planet too.' },
  { icon: '💚', title: 'Wellness for Everyone',   description: 'Everyday wellness should be accessible, not complicated. Simple ingredients, honest products.' },
];

// ── RAZORPAY CONFIG (frontend-safe settings only) ─────────
// ⚠️  Never put your secret key here. Only the public key ID.
// Replace with your live key when going live.
export const RAZORPAY_CONFIG = {
  key_id: 'rzp_test_XXXXXXXXXXXXXXXX', // ← Replace with your Razorpay Test Key ID
  currency: 'INR',
  name: 'NUTRICO',
  description: 'Wellness Nutrition Order',
  image: 'https://nutrico.in/logo.png', // ← Replace with your logo URL
  theme: { color: '#2D5A3D' },
};
