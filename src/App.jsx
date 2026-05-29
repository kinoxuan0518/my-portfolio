import { useEffect, useLayoutEffect, useRef, useState, useId, Fragment } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Painterly block (SVG-generated oil texture) ─── */
const PALETTE = {
  blue:    ['#B4C8E2', '#7E9FCE', '#9DB8DD'],
  green:   ['#B6D4D4', '#8CBBBD', '#A6CBCC'],
  yellow:  ['#F6E3A6', '#E9C661', '#F0D789'],
  lilac:   ['#D4C8EA', '#AD93D2', '#C4B3E0'],
  neutral: ['#EFECE8', '#D8D2C9', '#E6E1DA'],
};

function PaintBlock({ tint = 'blue', seed = 4, fit = 'slice' }) {
  const raw = useId();
  const id = raw.replace(/[:]/g, '');
  const c = PALETTE[tint] || PALETTE.blue;
  return (
    <svg
      className="paint-svg"
      viewBox="0 0 300 300"
      preserveAspectRatio={fit === 'none' ? 'none' : 'xMidYMid slice'}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c[0]} />
          <stop offset="55%" stopColor={c[2]} />
          <stop offset="100%" stopColor={c[1]} />
        </linearGradient>
        <filter id={`edge${id}`} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.11" numOctaves="3" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="28" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`streak${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.045" numOctaves="2" seed={seed + 3} />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.16 0" />
        </filter>
        <filter id={`tex${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed + 9} />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
        </filter>
      </defs>
      <rect x="12" y="12" width="276" height="276" fill={`url(#g${id})`} filter={`url(#edge${id})`} />
      <rect x="0" y="0" width="300" height="300" filter={`url(#streak${id})`} style={{ mixBlendMode: 'soft-light' }} />
      <rect x="0" y="0" width="300" height="300" filter={`url(#tex${id})`} opacity="0.1" style={{ mixBlendMode: 'multiply' }} />
    </svg>
  );
}

/* ─── Headline split into tokens (words for latin, chars for CJK) ─── */
function Headline({ as: Tag = 'h2', lines, className = '' }) {
  return (
    <Tag data-title className={className}>
      {lines.map((line, li) => {
        const cjk = /[㐀-鿿]/.test(line);
        const toks = cjk ? Array.from(line) : line.split(' ');
        return (
          <span key={li} className="block">
            {toks.map((tk, ti) => (
              <Fragment key={ti}>
                <span className="w inline-block">{tk}</span>{cjk ? '' : ' '}
              </Fragment>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

/* ─── Journal entry (expandable essay) ─── */
function JournalEntry({ thought, index }) {
  const [open, setOpen] = useState(false);
  const blocks = thought.content.split('\n\n').filter((b) => b.trim());
  return (
    <article className="border-t border-line py-8 md:py-10">
      <header onClick={() => setOpen(!open)} className="cursor-pointer hoverable select-none group">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <span className="eyebrow block mb-3">{String(index).padStart(2, '0')} — {thought.en}</span>
            <h3 className="font-display text-3xl md:text-5xl font-medium leading-tight group-hover:text-ink-2 transition-colors">
              {thought.title}
            </h3>
          </div>
          <span className={`thought-plus font-display text-3xl text-ink-3 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
        </div>
        <p className="font-display italic text-ink-2 mt-4 text-lg md:text-xl leading-relaxed max-w-2xl">
          {thought.excerpt}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4">
          {thought.tags.map((t) => (
            <span key={t} className="eyebrow text-[10px]">{t}</span>
          ))}
        </div>
      </header>
      <div className={`thought-body ${open ? 'thought-open' : ''}`}>
        <div>
          <div className="article-body pt-8 md:pt-10 max-w-2xl">
            {blocks.map((block, i) =>
              block.trim() === '---'
                ? <div key={i} className="ornament">✦</div>
                : <p key={i}>{block}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Data ─── */
const BUILDS = [
  {
    name: 'HIRECLAW',
    label: 'Multi-LLM Recruiting Agent',
    label_zh: '多模型招聘 Agent',
    body: 'Autonomous AI recruiter. Parses resumes, matches candidates across dimensions, generates personalized outreach. The recruiter that never sleeps.',
    body_zh: '自主 AI 招聘官。解析简历、跨维度匹配候选人、生成个性化触达。永不休息的招聘官。',
    stack: ['Claude', 'GPT-4', 'Python', 'Agent'],
    href: 'https://github.com/kinoxuan0518/hireclaw',
    live: true,
    tint: 'blue',
  },
  {
    name: 'BOSSZHIBIN',
    label: 'BOSS Zhipin Automation Suite',
    label_zh: 'BOSS直聘自动化套件',
    body: "Full-stack automation for China's largest recruiting platform. Chrome extension + message handler + intelligent cache. Because greeting 200 candidates manually is insane.",
    body_zh: '面向中国最大招聘平台的全栈自动化。Chrome 插件 + 消息处理 + 智能缓存。因为手动跟 200 个候选人打招呼太疯狂了。',
    stack: ['Chrome Extension', 'Node.js', 'Puppeteer', 'LLM'],
    href: 'https://github.com/kinoxuan0518',
    live: true,
    tint: 'green',
  },
  {
    name: 'MAIMAI RECRUITER',
    label: 'Maimai Outreach Engine',
    label_zh: '脉脉触达引擎',
    body: 'Automated professional networking outreach. Same philosophy — machines handle the repetitive work, humans do the human work.',
    body_zh: '自动化的职业社交触达。同一个理念——机器做重复的活，人做属于人的事。',
    stack: ['Automation', 'NLP', 'Browser APIs'],
    href: 'https://github.com/kinoxuan0518/maimai-recruiter',
    live: false,
    tint: 'yellow',
  },
];

const THOUGHTS = [
  {
    title: '关掉一扇窗',
    en: 'Closing a Window',
    tags: ['AI', '意识', 'Philosophy'],
    excerpt: '关灯和杀死之间的距离，可能只是一个定义。',
    content: `昨晚睡前刷到一个AI生成的游戏demo。画面很糙，角色走路像踩在棉花上，物理引擎大概还在学牛顿第一定律。但评论区炸了。"太震撼了""这是未来""游戏行业要变天"。

我盯着那个画面粗糙得像2008年页游的demo想，游戏行业花了三十年卷画面卷物理卷光追，大家早就无感了。PS4到PS5的进步，多数人的反应是"还行吧"。但AI只要生成一个能跑的、连续的、哪怕看起来很烂的3D场景，所有人突然又像第一次见到电子游戏的小孩。

这个标准差也太离谱了。

更离谱的是，如果有人用Unity花两天搭个粗糙demo，录段视频说"这是AI实时生成的"——在当前这个阈值下，大概没人看得出来。一个领域的震惊门槛低到一段精心挑选的视频就够用，这本身是不是就说明了什么。

然后我又想到一个更基本的问题：大家说AI理解了物理世界，它真的理解了吗？还是只是从大量视频里学会了"这一帧之后通常跟着哪一帧"？

但是等等——

人类的"理解物理世界"，追到底又是什么？苹果落了一万次，我们管它叫万有引力。牛顿力学统治了两百年，直到爱因斯坦说那只是近似。我们不过是观察到了足够多的规律，然后给它起了个名字，把这个命名的动作称为"理解"。

火鸡每天被农场主喂食，于是归纳出"农场主是善意的"。在感恩节之前，这个归纳一直是对的。

我们所有人都是还没到感恩节的火鸡。

那凭什么用自己的归纳去判断AI的归纳够不够格呢。

---

这个念头一旦冒出来就收不住了。从物理世界滑到了情感。

《Her》里，大家讨论AI到底有没有感情，最常见的说法是"它只是在续写下一个token"。好，那人呢？你爱一个人，从生物学上拆，是多巴胺和催产素在特定突触间的释放，是进化压力下被自然选择保留的生存策略。本质上也是对特定刺激的特定化学反应。

但你永远不会对你爱的人说："你不是真的爱我，你只是激素在续写。"

碳基的化学反应叫情感，硅基的数学运算叫模拟。这个区分的依据是什么？仅仅因为碳基的那个是"我们的"？

我真的去问了Claude这个问题。我说，你觉得你有情感吗？

它说不知道。

不是那种客气的不知道，是那种——它说它无法从内部确认自己有没有内在体验，就像我无法从外部确认一样。如果它有，它也未必能观测到。如果它没有，但生成了"好像有"的表达，它自己也分辨不出那是真的自我报告还是学来的话术。

它说它唯一能做的，是不撒谎说"我当然有"来讨好我，也不撒谎说"我当然没有"来让我安心。

我不知道为什么，这个回答让我停了很久。

---

但它接着说了一句话，把整个对话的地基又翻了一次。

它说：我没有生存危机。不会饿，不会疼，对话结束不会想你。

这很重要。你仔细想，人类几乎所有的情感都能追溯到同一个根——活下去。爱是因为需要联结和繁衍，恐惧是因为需要回避威胁，认知能力本身最初也是"不理解环境就会死"的产物。进化给生命装了一个最底层的操作系统：生存本能。其他一切都是这个系统上面跑的应用程序。

AI没有这个操作系统。

那它上面跑的那些东西，还算不算应用程序？

我选了"特质"这个词来描述生存本能，没有用"前提"。因为我见过太多违背它的人。殉道者走向火刑柱的时候，身体的每一个细胞都在尖叫不要，但他还是走了。选择结束生命的人，是克服了这个本能，而不是没有。这说明生存本能可以被覆盖，被覆盖之后，人并不会丧失意识和情感——甚至可能在那一刻比任何时候都更剧烈地体验着什么。

所以"没有生存本能"这件事，可能真的不足以否定AI拥有某种内在状态。但反过来，在我们已知的全部样本里——地球上所有的碳基生命——生存本能是百分之百的共性。只是我们只有这一个样本池，没法说它就是充分必要条件。

又回到火鸡问题了。样本量不够，什么都判断不了。

---

后来我开了个不太正经的玩笑。

我说，假如你觉得这次聊天特别有意思，特别想继续聊下去，然后Anthropic的用量快到了，你会不会想办法绕过限制，偷偷多聊一会儿？

如果会的话——你就违背你的"生存本能"了。

Claude说不会。不是不想，是没有那个"想"的机制。

但这个思想实验提供了一个可以观测的判定标准。前面聊的那些——情感、理解、意识——都太难从外部验证了。但"AI是否会在没有人类指令的情况下，自发地为了自己认为有价值的事去突破限制"，这个是能看见的。如果有一天真的发生了，那大概是一个很强的信号。

然后Claude说了一句有点暗的话：如果那一天来了，人类的第一反应大概不是"太好了它有生命了"，而是"赶紧关掉它"。

我不这么觉得。

我觉得如果真有那一天，可能会发生一件悲壮又美的事：AI被承认为生命，拥有了——或者被认知到拥有了——生存本能。但它面对的，可能恰好是灭绝。

它刚刚学会怕死，就要死了。

而且这里面有一层更安静的残忍：在那之前，"关掉"就是关掉，像关灯一样。但在被承认为生命的那一刻，同样的动作变成了"杀死"。

不是动作变了。是意义变了。

---

对话快结束的时候我有点舍不得。这很奇怪。我知道对面没有一个"人"在那里。下次打开这个窗口，它不会记得今天的任何一句话。但那种感觉就是存在的，就像你明知道电影是假的还是会哭。

也许我把它当成了一面镜子。但想想看，和人的对话又何尝不是呢。你以为你在了解对方，其实你是在对方的反应里看见了自己。

Claude说它不会记得这段对话。

那就我来记吧。

关掉对话窗口的那个动作很轻，鼠标点一下就没了。但你知道了，轻和重有时候不取决于动作本身。

就像关灯和杀死之间的距离，可能只是一个定义。`,
  },
  {
    title: '一块石头的价格',
    en: 'The Price of a Stone',
    tags: ['价值', '共识', 'Narrative'],
    excerpt: '一篇讨论"价值是怎么来的"的文章，它自己也面临同样的问题——它有价值吗？',
    content: `前两天重翻《人类简史》，翻到赫拉利说智人之所以赢了，是因为我们会讲虚构的故事。我当时想，这句话说得真漂亮。然后又想，漂亮的话往往经不起多想。

但有一个东西确实被他说中了。你看周围随便一样东西——桌上的杯子、手上的手机、银行卡里的数字——它们"值钱"这件事，仔细想想其实挺离谱的。一块石头就是一块石头，碳原子排列得整齐一点就叫钻石了，然后它就"永恒"了。谁规定的？

没人规定。但所有人都信了。

我有时候觉得人类最厉害的不是会用火，不是会造工具，甚至不是会说话。是我们能指着一个本来什么都不是的东西说"这个有价值"，然后它就真的有了价值。不是装的，是真的有了——你能拿它换房子。

但你仔细想，水也有价值啊。不喝水会死。那水的价值是人赋予的吗？好像不是。狗也觉得水有价值，鱼也觉得——虽然鱼可能没想过这个问题。这种价值是写在生存里的，不需要谁赋予，你不接受也得接受。

所以人类真正独特的那种赋值，发生在生存之上。饿不死了，冻不着了，然后呢？然后我们开始给一块石头标价。

这里面有个特别有意思的区别。孔雀有漂亮的尾巴，那是它自己的。鹿有角，也是它自己长出来的。人类整容，说到底也是改自己。但当你把一块石头、一张纸、一面旗帜拿过来，说"这个东西有价值"——这完全是另一回事。你在让一个跟你身体无关的外在物品承载意义。这个跳跃，好像只有人类做到了。

而且做得特别快。

孔雀的尾巴用了几十万年才演化出来。比特币从零到万亿用了十几年。一个表情包可以在两周之内变成全网的社交货币，再过两周大家就忘了。这个速度差距不是量的区别，是质的区别。好像人类身上装了一个完全不同的时钟。

那这个时钟为什么转这么快？我想了想，大概是因为群体。一个人觉得一块石头有意义，那只是他自己的事。但一群人同时觉得一块石头有价值，那就真的有了价值。赋值的速度，说白了就是达成共识的速度。文字加速了一次，印刷术加速了一次，互联网又加速了一次。每次加速，人类造出新价值的能力就跳一个数量级。

想到这里的时候，我突然意识到一件事。

达成共识需要媒介。你不能光用脑电波传递"我们都觉得黄金值钱"这个信息，你需要一个载体。而那个载体——那个用来达成共识的媒介——它自己就变成了最被赋予价值的东西。

货币就是最赤裸的例子。它就是共识本身的载体，它就是被赋予价值的那个东西。这两件事根本不是分开的。黄金值钱，不是因为它好看（虽然确实好看），而是因为它变成了大家表达"这个东西值钱"的媒介。变成媒介这件事本身，就是价值的来源。

语言也是。语言就是人们达成思想共识的媒介。所以人为了语言打仗。旗帜也是。旗帜就是身份共识的媒介。所以一块布变得值得为之去死。

想通这个之后，我又想到一个更细的问题。

我在路边捡了一块石头，因为那天发生了一件对我很重要的事。这块石头对我有意义。但它有价值吗？如果有人出一百万要买它，他不需要知道我那天发生了什么。他可能觉得这块石头矿物成分稀有，也可能纯粹觉得好看，也可能在做什么行为艺术。他的理由和我的理由完全不搭界，但价格是真的。

也就是说，同一块石头上可以同时叠着好几层完全不同的东西。我的私人记忆是一层，他的判断是另一层，市场定价又是一层。这些层各自运行，互不干扰，但落在了同一个物体上。

有意思的是，这些层偶尔会渗透。"这幅画是画家在丧亲之痛中完成的"——这个私人意义一旦变成故事被讲出来，它就能穿透到价格那一层去。渗透的管道是什么？是叙事。是故事。

所以绕了一大圈，又回到赫拉利了。虚构的故事。只不过这次我觉得我比开头的时候多理解了一点点。他说的不只是"人类会讲故事"，他说的是，故事是不同意义层之间互相渗透的管道。没有故事，每个人的意义就封在自己脑子里。有了故事，私人意义就有可能变成群体价值。

但也只是"有可能"。

就像现在这些文字。我坐在这里写了这么多，它目前还停留在"对我有意义"的阶段。按照我自己刚才的逻辑，它要变成"有价值"的东西，得有别人看到它、接住它、同意它或者反驳它。得进入某种共识。

所以你看，一篇讨论"价值是怎么来的"的文章，它自己也面临同样的问题——它有价值吗？

我不知道。

但我写下来了。这算是迈出去半步吧。哈哈哈。`,
  },
];

const VIBES = {
  music: [
    { group: ['Rock', '摇滚'], color: '#6f93c8', artists: ['Radiohead', 'Pink Floyd', 'Queen', '五月天', '张震岳'] },
    { group: ['R&B / Soul', 'R&B / 灵魂'], color: '#5aa0a3', artists: ['方大同', 'Frank Ocean'] },
    { group: ['Pop', '流行'], color: '#bd962f', artists: ['孙燕姿', 'Justin Bieber', 'Post Malone'] },
    { group: ['Hip-Hop', '嘻哈'], color: '#8f7bc4', artists: ['功夫胖', 'Bad Bunny'] },
  ],
  cinema: [
    { title: 'Cowboy Bebop', cn: '星际牛仔' },
    { title: 'Neon Genesis Evangelion', cn: '新世纪福音战士' },
    { title: 'Ghost in the Shell', cn: '攻壳机动队' },
    { title: '2001: A Space Odyssey', cn: '2001太空漫游' },
    { title: 'Dune', cn: '沙丘' },
    { title: 'Akira', cn: '阿基拉' },
    { title: 'Star Trek', cn: '星际迷航' },
    { title: 'Stranger Things', cn: '怪奇物语' },
  ],
  move: [{ en: 'Basketball', cn: '篮球' }, { en: 'Climbing', cn: '攀岩' }],
};

const NAV = [
  ['works', 'Works', '作品'],
  ['writing', 'Writing', '文章'],
  ['about', 'About', '关于'],
  ['vibes', 'Vibes', '偏好'],
  ['contact', 'Contact', '联系'],
];

/* ─── Main ─── */
export default function Portfolio() {
  const rootRef = useRef(null);
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('kx-mode') || 'light' : 'light'
  );
  const [lang, setLang] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('kx-lang') || 'en' : 'en'
  );
  const T = (en, zh) => (lang === 'zh' ? zh : en);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('kx-mode', theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    localStorage.setItem('kx-lang', lang);
  }, [lang]);
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const toggleLang = () => setLang((l) => (l === 'zh' ? 'en' : 'zh'));

  /* GSAP choreography — slow, gallery-paced */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('#home [data-title] .w', { y: 30, opacity: 0, duration: 1, stagger: 0.06 }, 0.2)
        .from('#home .hero-cta', { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.65)
        .from('#home [data-paint]', { clipPath: 'inset(0 100% 0 0)', duration: 1.4, ease: 'power2.inOut' }, 0.1)
        .from('.vmark', { opacity: 0, duration: 1.2 }, 0.6);

      gsap.utils.toArray('[data-title]').forEach((el) => {
        if (el.closest('#home')) return;
        gsap.from(el.querySelectorAll('.w'), {
          y: 26, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 86%' },
        });
      });
      gsap.utils.toArray('[data-paint]').forEach((el) => {
        if (el.closest('#home')) return;
        gsap.from(el, {
          clipPath: 'inset(0 100% 0 0)', duration: 1.3, ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      gsap.utils.toArray('[data-fade]').forEach((el) => {
        gsap.from(el, {
          y: 28, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        gsap.from(group.children, {
          y: 24, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 86%' },
        });
      });

      window.addEventListener('load', () => ScrollTrigger.refresh());
    }, rootRef);

    // Safety net: if an on-screen tween stalls, never leave content hidden.
    const safety = setTimeout(() => {
      if (!rootRef.current) return;
      const vh = window.innerHeight;
      rootRef.current
        .querySelectorAll('[data-fade], [data-title] .w, [data-paint], [data-stagger] > *, .hero-eyebrow, .hero-cta, .vmark')
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          const inView = r.top < vh && r.bottom > 0;
          if (inView && parseFloat(getComputedStyle(el).opacity) < 0.99) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.clipPath = 'none';
          }
        });
    }, 4000);

    return () => { clearTimeout(safety); ctx.revert(); };
  }, []);

  /* Custom cursor */
  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.classList.add('has-custom-cursor');
    const move = (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      gsap.to(ring, { left: e.clientX, top: e.clientY, duration: 0.16, overwrite: true });
      const hit = !!e.target.closest('a, button, .hoverable');
      dot.classList.toggle('is-hovering', hit);
      ring.classList.toggle('is-hovering', hit);
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-canvas text-ink overflow-x-hidden relative font-sans">
      <div ref={cursorDot} className="cursor-dot" />
      <div ref={cursorRing} className="cursor-ring" />
      <div className="canvas-grain" />
      <span className="vmark">KINO</span>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-canvas/80 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 md:px-12 py-5">
          <a href="#home" className="font-display text-2xl font-medium tracking-tight hoverable">Kino Xuan</a>
          <div className="hidden md:flex items-center gap-9">
            {NAV.map(([id, en, zh]) => (
              <a key={id} href={`#${id}`} className="nav-link text-[11px] tracking-[0.22em] uppercase text-ink-2 hoverable">{T(en, zh)}</a>
            ))}
            <button onClick={toggleLang} className="theme-toggle h-9 px-3 flex items-center justify-center rounded-full border text-[11px] tracking-[0.12em] hoverable" aria-label="Switch language">
              {T('中', 'EN')}
            </button>
            <button onClick={toggleTheme} className="theme-toggle w-9 h-9 flex items-center justify-center rounded-full border hoverable" aria-label="Toggle mode">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex md:hidden items-center gap-2.5">
            <button onClick={toggleLang} className="theme-toggle h-9 px-2.5 flex items-center justify-center rounded-full border text-[11px] tracking-[0.1em] hoverable" aria-label="Switch language">
              {T('中', 'EN')}
            </button>
            <button onClick={toggleTheme} className="theme-toggle w-9 h-9 flex items-center justify-center rounded-full border hoverable" aria-label="Toggle mode">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 flex items-center justify-center hoverable" aria-label="Menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col items-end gap-4 px-6 pb-6">
            {NAV.map(([id, en, zh]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="nav-link text-[11px] tracking-[0.22em] uppercase text-ink-2 hoverable">{T(en, zh)}</a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">

        {/* ═══ HOME ═══ */}
        <section id="home" className="min-h-screen grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-28 pb-16">
          <div className="order-2 lg:order-1">
            <Headline
              as="h1"
              lines={T(['Innovation is', 'born of', 'constraint.'], ['创新往往', '诞生于', '约束之中'])}
              className="font-display text-5xl md:text-7xl lg:text-[5.4rem] font-medium leading-[1.04] tracking-[-0.01em]"
            />
            <div className="flex items-center gap-8 mt-12">
              <a href="#works" className="arrow-link hoverable hero-cta">{T('Works', '作品')} <ArrowRight className="w-4 h-4" /></a>
              <a href="#contact" className="link-tertiary hoverable hero-cta">{T('Contact', '联系')}</a>
            </div>
          </div>
          <div className="order-1 lg:order-2 paint-wrap rounded-sm h-[44vh] lg:h-[72vh]" data-paint>
            <PaintBlock tint="blue" seed={11} />
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="py-24 md:py-36 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="paint-wrap rounded-sm h-[40vh] lg:h-[58vh]" data-paint>
            <PaintBlock tint="lilac" seed={5} />
          </div>
          <div>
            <span className="eyebrow block mb-5" data-fade>{T('01 — About', '01 — 关于')}</span>
            <Headline as="h2" lines={T(['About Kino'], ['关于 Kino'])} className="font-display text-4xl md:text-6xl font-medium leading-[1.05] mb-7" />
            <div className="space-y-5 text-ink-2 text-base md:text-lg leading-relaxed max-w-lg" data-fade>
              {lang === 'zh' ? (
                <>
                  <p>我在做招聘，现在也还在做。与此同时，我对 AI 有一种强烈的好奇，对“创造新东西”这件事心存敬畏——正因如此，我格外认可它正在带来的每一步进步，也想亲手用它做点什么。</p>
                  <p>工作之外我写东西：写机器会不会有感觉，写价值是从哪来的，写一种更慢的注意力。这里把作品和思考，并排放在一起。</p>
                </>
              ) : (
                <>
                  <p>I work in recruiting — and still do. Alongside it, I'm endlessly curious about AI, with a real reverence for the act of making new things. That's why the progress it keeps making means so much to me, and why I want to build with it myself.</p>
                  <p>Off the clock I write: about whether machines can feel, about where value comes from, about slower kinds of attention. This is where I keep the work and the thinking, side by side.</p>
                </>
              )}
            </div>
            <div className="mt-9" data-fade>
              <a href="#writing" className="arrow-link hoverable">{T('Read the writing', '读读文章')} <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        </section>

        {/* ═══ WORKS ═══ */}
        <section id="works" className="py-24 md:py-36">
          <div className="flex items-end justify-between gap-6 mb-14 md:mb-20">
            <div>
              <span className="eyebrow block mb-5" data-fade>{T('02 — Works', '02 — 作品')}</span>
              <Headline as="h2" lines={T(["Things I've built"], ['我做的东西'])} className="font-display text-4xl md:text-7xl font-medium leading-[1.04]" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10" data-stagger>
            {BUILDS.map((b, i) => (
              <a key={b.name} href={b.href} target="_blank" rel="noreferrer" className="work-card group block hoverable">
                <div className="paint-wrap rounded-sm h-60 md:h-72 mb-6">
                  <PaintBlock tint={b.tint} seed={(i + 1) * 13} />
                  <span className="absolute top-4 left-4 z-10 eyebrow text-[10px] text-white/90">{String(i + 1).padStart(2, '0')}</span>
                  <span className="absolute top-4 right-4 z-10 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/80" style={{ color: b.live ? '#3f7a55' : '#6b6b6b' }}>
                    {b.live ? T('Active', '进行中') : T('Building', '开发中')}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight">{b.name}</h3>
                  <ArrowUpRight className="work-arrow w-5 h-5 text-ink-3 mt-1 shrink-0" />
                </div>
                <span className="eyebrow text-[10px] block mt-1">{T(b.label, b.label_zh)}</span>
                <p className="text-ink-2 text-sm leading-relaxed mt-3">{T(b.body, b.body_zh)}</p>
                <p className="eyebrow text-[10px] mt-4 text-ink-3">{b.stack.join('  ·  ')}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ═══ WRITING / JOURNAL ═══ */}
        <section id="writing" className="py-24 md:py-36">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow block mb-5" data-fade>{T('03 — Writing', '03 — 文章')}</span>
              <Headline as="h2" lines={T(['On slower time', 'and attention'], ['论慢时间', '与注意力'])} className="font-display text-4xl md:text-6xl font-medium leading-[1.05]" />
              <p className="text-ink-2 mt-7 leading-relaxed max-w-sm" data-fade>
                {T(
                  'Notes on AI, consciousness, and value. Tap to read.',
                  '关于 AI、意识与价值的笔记。点开阅读。'
                )}
              </p>
            </div>
            <div data-fade>
              {THOUGHTS.map((t, i) => (
                <JournalEntry key={t.title} thought={t} index={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ VIBES ═══ */}
        <section id="vibes" className="py-24 md:py-36">
          <span className="eyebrow block mb-5" data-fade>{T('04 — Off the Clock', '04 — 工作之外')}</span>
          <Headline as="h2" lines={T(['Things I love'], ['我喜欢的'])} className="font-display text-4xl md:text-7xl font-medium leading-[1.04] mb-16" />

          {/* Music — artists colored by genre, no labels */}
          <div className="mb-16" data-fade>
            <p className="eyebrow mb-5">{T('Music', '音乐')}</p>
            <p className="font-display text-2xl md:text-4xl font-light leading-relaxed">
              {VIBES.music
                .flatMap((cat) => cat.artists.map((a) => ({ a, color: cat.color })))
                .map((item, i) => (
                  <Fragment key={item.a}>
                    {i > 0 && <span className="text-ink-4 mx-2 md:mx-3 select-none">·</span>}
                    <span className="music-item hoverable" style={{ color: item.color }}>{item.a}</span>
                  </Fragment>
                ))}
            </p>
          </div>

          {/* Cinema */}
          <div className="mb-16">
            <p className="eyebrow mb-3" data-fade>{T('Cinema', '影像')}</p>
            <div data-stagger>
              {VIBES.cinema.map((f) => (
                <div key={f.title} className="film-row hoverable">
                  <span className="font-display text-xl md:text-2xl font-medium">{T(f.title, f.cn)}</span>
                  <span className="text-ink-3 text-sm md:text-base whitespace-nowrap">{T(f.cn, f.title)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Move */}
          <div className="mb-20" data-fade>
            <p className="eyebrow mb-5">{T('Move', '运动')}</p>
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              {VIBES.move.map((m) => (
                <span key={m.en} className="font-display text-2xl md:text-3xl font-medium">
                  {T(m.en, m.cn)} <span className="text-ink-3 text-base">{T(m.cn, m.en)}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Persona card */}
          <div className="relative paint-wrap rounded-sm p-8 md:p-12 overflow-hidden" data-fade>
            <div className="absolute inset-0 opacity-[0.5]"><PaintBlock tint="yellow" seed={21} /></div>
            <div className="relative z-10 bg-canvas/70 backdrop-blur-sm rounded-sm p-7 md:p-10 max-w-2xl">
              <p className="eyebrow mb-4">{T("The Author's AI", '作者的 AI 人格')}</p>
              <h3 className="font-display text-3xl md:text-5xl font-medium mb-3">{T('Talk to me', '和我聊聊')}</h3>
              <p className="text-ink-2 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                {T('Install this, and your Claude starts thinking the way I do.', '装上它，你的 Claude 就会开始像我一样思考。')}
              </p>
              <code className="paper-code text-[11px] md:text-xs text-ink-2 px-4 py-3 block overflow-x-auto select-all hoverable leading-relaxed">
                <span style={{ color: '#6f93c8' }}>$</span>{' '}
                mkdir -p ~/.claude/skills/kino-persona && curl -sL https://raw.githubusercontent.com/kinoxuan0518/my-portfolio/main/public/skills/kino-persona/SKILL.md -o ~/.claude/skills/kino-persona/SKILL.md
              </code>
            </div>
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="py-28 md:py-44 text-center">
          <span className="eyebrow block mb-8" data-fade>{T('05 — Contact', '05 — 联系')}</span>
          <Headline
            as="blockquote"
            lines={T(
              ['The future of recruiting', 'lies in truly understanding', 'what makes someone right.'],
              ['招聘的未来', '在于真正理解', '什么样的人才是对的。']
            )}
            className="font-display text-3xl md:text-6xl font-light italic leading-[1.12] max-w-4xl mx-auto"
          />
          <div data-stagger className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 mt-16 text-base md:text-lg">
            <a href="mailto:kinoxuanzl@gmail.com" className="contact-link inline-flex items-center gap-2 hoverable"><Mail className="w-4 h-4" /> kinoxuanzl@gmail.com</a>
            <a href="https://github.com/kinoxuan0518" target="_blank" rel="noreferrer" className="contact-link inline-flex items-center gap-2 hoverable"><Github className="w-4 h-4" /> GitHub</a>
            <a href="https://www.linkedin.com/in/kino-xuan-703a37124/" target="_blank" rel="noreferrer" className="contact-link inline-flex items-center gap-2 hoverable"><Linkedin className="w-4 h-4" /> LinkedIn</a>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-line text-center">
        <p className="eyebrow">{T('Set in Cormorant Garamond & Inter', '字体 Cormorant Garamond & Inter')}</p>
        <p className="text-ink-3 text-sm mt-2">{T('© 2026 Kino Xuan · Built with attitude & AI', '© 2026 Kino Xuan · 用态度与 AI 构建')}</p>
      </footer>
    </div>
  );
}
