export type RoastCat = "light" | "medium" | "dark";

export interface Product {
  id: string;
  name: string;
  enName: string;
  origin: string;
  country: string;
  price: number;
  weight: string;
  roast: 1 | 2 | 3 | 4 | 5;
  roastLabel: string;
  category: RoastCat;
  process: string;
  varietal: string;
  altitude: string;
  producer: string;
  notes: string[];
  desc: string;
  longDesc: string;
  brew: string;
  profile: { label: string; value: number }[];
  image: string;
  tag?: string;
  score: number;
}

export const CATEGORY_META: { key: RoastCat | "all"; label: string; hint: string }[] = [
  { key: "all", label: "全部豆子", hint: "在售的全部批次" },
  { key: "light", label: "浅烘焙", hint: "花果酸香 · 适合手冲" },
  { key: "medium", label: "中烘焙", hint: "均衡甜感 · 手冲意式皆宜" },
  { key: "dark", label: "深烘焙", hint: "醇厚低酸 · 意式与奶咖" },
];

export const FREE_SHIPPING = 99;
export const SHIPPING_FEE = 10;

export const PRODUCTS: Product[] = [
  {
    id: "ethiopia-yirgacheffe",
    name: "耶加雪菲 · 科契尔 G1",
    enName: "Ethiopia Yirgacheffe Kochere",
    origin: "埃塞俄比亚 · 耶加雪菲产区",
    country: "埃塞俄比亚",
    price: 88,
    weight: "227g",
    roast: 1,
    roastLabel: "浅烘焙",
    category: "light",
    process: "水洗处理",
    varietal: "原生种 Heirloom",
    altitude: "1,900 – 2,100 m",
    producer: "科契尔处理厂 · 周边 580 户小农",
    notes: ["佛手柑", "茉莉花", "柠檬茶"],
    desc: "耶加雪菲的经典面孔，入口像一杯加了佛手柑的柠檬茶，尾韵是干净的茉莉花香。",
    longDesc:
      "科契尔位于耶加雪菲的核心地带，高海拔让小农庭院里的原生种缓慢成熟，积累出细腻的花果酸质。水洗处理让风味干净透亮，我们以极浅的烘焙度保留它的产地性格——入口是佛手柑与柠檬茶般的明亮酸质，中段浮现茉莉花香，尾韵带着红茶般的回甘。这是一支适合慢慢喝的早晨咖啡。",
    brew: "推荐手冲：15g 粉 / 225g 水，92°C，总时长 2:00 – 2:20。",
    profile: [
      { label: "酸质", value: 92 },
      { label: "甜感", value: 74 },
      { label: "苦度", value: 12 },
      { label: "醇厚度", value: 46 },
      { label: "香气", value: 95 },
    ],
    image: "https://image.qwenlm.ai/generated-images/31218c08-0014-4053-b024-9c113e780968/_result.png",
    tag: "本周主打",
    score: 87.5,
  },
  {
    id: "kenya-aa-neri",
    name: "肯尼亚 AA · 涅里",
    enName: "Kenya AA Nyeri",
    origin: "肯尼亚 · 涅里产区",
    country: "肯尼亚",
    price: 98,
    weight: "200g",
    roast: 2,
    roastLabel: "浅中烘焙",
    category: "light",
    process: "水洗 · 双重发酵",
    varietal: "SL28 / SL34",
    altitude: "1,700 – 1,850 m",
    producer: "涅里小型处理站联盟",
    notes: ["黑加仑", "乌梅", "红糖"],
    desc: "教科书级的肯尼亚：黑加仑果汁般的浓郁酸质，扎实饱满，冷下来像一杯冰镇乌梅汤。",
    longDesc:
      "涅里红土火山土壤孕育的 SL28 与 SL34，是肯尼亚风味的代名词。双重水洗发酵带来极高的干净度，黑加仑与番茄般的多汁酸质在杯中层层展开，中段转为乌梅与深色浆果，尾韵是持久的红糖甜。它不是一眼惊艳的花香型，而是结构饱满、越喝越上头的果汁型选手。",
    brew: "推荐手冲：16g 粉 / 220g 水，93°C，三段式注水突出果汁感。",
    profile: [
      { label: "酸质", value: 88 },
      { label: "甜感", value: 70 },
      { label: "苦度", value: 18 },
      { label: "醇厚度", value: 62 },
      { label: "香气", value: 80 },
    ],
    image: "https://image.qwenlm.ai/generated-images/e0520dcf-2c73-4131-abd4-01fdc174e4a7/_result.png",
    score: 88,
  },
  {
    id: "colombia-huila",
    name: "哥伦比亚 · 慧兰樱桃庄园",
    enName: "Colombia Huila Finca Cereza",
    origin: "哥伦比亚 · 慧兰省",
    country: "哥伦比亚",
    price: 78,
    weight: "227g",
    roast: 3,
    roastLabel: "中烘焙",
    category: "medium",
    process: "水洗处理",
    varietal: "卡杜拉 Caturra",
    altitude: "1,550 – 1,750 m",
    producer: "樱桃庄园 · 第三代庄园主 Don Elías",
    notes: ["焦糖", "榛果", "红苹果"],
    desc: "平衡感的典范：焦糖与榛果的甜感打底，红苹果酸质点亮整体，怎么冲都不容易出错。",
    longDesc:
      "樱桃庄园是慧兰省一座经营了三代人的家庭庄园，Don Elías 坚持只采全红果，并在庄园内完成脱皮与发酵。这支卡杜拉在中烘焙下呈现出教科书般的平衡：入口是焦糖与烤榛果的圆润甜感，中段有红苹果般清爽的酸，尾韵带一点可可的微苦。无论手冲、法压还是摩卡壶，它都稳定好喝。",
    brew: "全能选手：手冲 1:15，法压 1:14，摩卡壶也表现出色。",
    profile: [
      { label: "酸质", value: 62 },
      { label: "甜感", value: 85 },
      { label: "苦度", value: 32 },
      { label: "醇厚度", value: 68 },
      { label: "香气", value: 70 },
    ],
    image: "https://image.qwenlm.ai/generated-images/8ec9d161-ed4b-4102-973d-197c9228bb11/_result.png",
    score: 86,
  },
  {
    id: "brazil-cerrado",
    name: "巴西 · 喜拉多日晒",
    enName: "Brazil Cerrado Natural",
    origin: "巴西 · 喜拉多产区",
    country: "巴西",
    price: 68,
    weight: "227g",
    roast: 4,
    roastLabel: "中深烘焙",
    category: "dark",
    process: "日晒处理",
    varietal: "黄波旁 Yellow Bourbon",
    altitude: "900 – 1,200 m",
    producer: "圣安东尼奥家族农场",
    notes: ["榛果", "牛奶巧克力", "奶油"],
    desc: "口粮豆的正确打开方式：日晒带来的奶油甜感，加奶就是一杯高级的拿铁底。",
    longDesc:
      "喜拉多平坦的高原与干燥气候，让整串咖啡果得以在非洲棚架上缓慢日晒。黄波旁在日晒中吸足了果肉糖分，烘焙到中深后释放出浓郁的榛果、牛奶巧克力与奶油香气，几乎感受不到酸。它油脂丰厚、甜感扎实，做奶咖时能稳稳托住牛奶的甜，是无数家庭咖啡机的常驻嘉宾。",
    brew: "推荐意式：18g 粉萃 36g 液，加奶后坚果甜感加倍。",
    profile: [
      { label: "酸质", value: 22 },
      { label: "甜感", value: 78 },
      { label: "苦度", value: 52 },
      { label: "醇厚度", value: 84 },
      { label: "香气", value: 66 },
    ],
    image: "https://image.qwenlm.ai/generated-images/bd234465-2cfa-4197-9850-8b4c1f5cc0e3/_result.png",
    tag: "回购之王",
    score: 84.5,
  },
  {
    id: "sumatra-mandheling",
    name: "苏门答腊 · 曼特宁 G1",
    enName: "Sumatra Mandheling G1",
    origin: "印度尼西亚 · 北苏门答腊",
    country: "印度尼西亚",
    price: 72,
    weight: "227g",
    roast: 5,
    roastLabel: "深烘焙",
    category: "dark",
    process: "湿刨法 Giling Basah",
    varietal: "铁皮卡 Typica",
    altitude: "1,100 – 1,500 m",
    producer: "林东产区小农合作社",
    notes: ["草本", "黑巧克力", "焦糖尾韵"],
    desc: "老派而迷人：草本与雪松的深沉气息，黑巧克力的浓厚口感，冷天里的安全感。",
    longDesc:
      "湿刨法是苏门答腊独有的处理智慧——在高湿环境中提前刨去羊皮纸，造就了曼特宁标志性的深绿色豆表与低沉醇厚的风味。深烘焙后，草本、雪松与香料气息扑面而来，入口是黑巧克力般的浓稠，尾韵却意外地留着焦糖甜。它几乎不酸，适合偏爱厚重口感、习惯加奶或长时间保温的朋友。",
    brew: "推荐法压壶或虹吸壶，1:13 浓一点更有层次。",
    profile: [
      { label: "酸质", value: 10 },
      { label: "甜感", value: 58 },
      { label: "苦度", value: 72 },
      { label: "醇厚度", value: 95 },
      { label: "香气", value: 60 },
    ],
    image: "https://image.qwenlm.ai/generated-images/f9beb92c-60ec-40e0-817a-f72f009d9683/_result.png",
    score: 84,
  },
  {
    id: "yunnan-baoshan",
    name: "云南 · 保山日晒花酿",
    enName: "Yunnan Baoshan Natural",
    origin: "中国 · 云南保山潞江坝",
    country: "中国云南",
    price: 58,
    weight: "200g",
    roast: 3,
    roastLabel: "中烘焙",
    category: "medium",
    process: "慢速日晒 · 厌氧静置",
    varietal: "卡蒂姆 Catimor",
    altitude: "1,200 – 1,450 m",
    producer: "潞江坝 · 木棉合作社",
    notes: ["甘蔗", "烤杏仁", "乌龙茶感"],
    desc: "国产之光：潞江坝河谷的甘蔗甜与乌龙茶韵，价格却只有进口豆的一半。",
    longDesc:
      "潞江坝干热河谷的光照与昼夜温差，让咖啡果缓慢积累糖分。木棉合作社采用慢速日晒结合短时厌氧静置，放大了这支卡蒂姆的发酵果甜：入口是清亮的甘蔗甜，中段有烤杏仁的油脂香，尾韵带着类似东方美人的乌龙茶感。近几年云南精品批次进步飞快，这支豆子值得你重新认识国产咖啡。",
    brew: "推荐手冲或聪明杯，91°C 突出茶感与甜度。",
    profile: [
      { label: "酸质", value: 48 },
      { label: "甜感", value: 82 },
      { label: "苦度", value: 26 },
      { label: "醇厚度", value: 56 },
      { label: "香气", value: 74 },
    ],
    image: "https://image.qwenlm.ai/generated-images/6804877b-11e1-4b46-ac85-1046887cb454/_result.png",
    tag: "国产之光",
    score: 85,
  },
];

export const ROASTERY_IMAGE =
  "https://image.qwenlm.ai/generated-images/f201028f-6914-4867-8398-b486abd50830/_result.png";

export const formatPrice = (n: number) => `¥${n.toFixed(n % 1 === 0 ? 0 : 2)}`;
