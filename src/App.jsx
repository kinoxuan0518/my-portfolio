import { useEffect, useLayoutEffect, useRef, useState, useCallback, Fragment } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Wave Text: ink letters lift & warm toward the cursor ─── */
function WaveText({ text, className = '' }) {
  const charsRef = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const activeRef = useRef(false);

  const RADIUS = 140;
  const STRENGTH = -14;
  const SCALE_BOOST = 0.05;

  const animate = useCallback(() => {
    if (activeRef.current) {
      const chars = charsRef.current;
      const { x: mx, y: my } = mouseRef.current;
      for (let i = 0; i < chars.length; i++) {
        const el = chars[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        const p = Math.max(0, 1 - dist / RADIUS);
        const ease = p * p * (3 - 2 * p); // smoothstep
        el.style.transform = `translateY(${ease * STRENGTH}px) scale(${1 + ease * SCALE_BOOST})`;
        el.style.color = ease > 0.12 ? 'rgb(var(--c-accent))' : '';
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const timer = setTimeout(() => { activeRef.current = true; }, 1400);
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <span className={`hero-name ${className}`}>
      {text.split('').map((ch, i) => (
        <span key={i} ref={(el) => (charsRef.current[i] = el)} className="wave-char">
          <span className="char-inner">{ch}</span>
        </span>
      ))}
    </span>
  );
}

/* ─── Masked words for title reveal ─── */
function MaskWords({ text, className = '' }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={i}>
      <span className="tw-mask">
        <span className={`tw ${className}`}>{w}</span>
      </span>{' '}
    </Fragment>
  ));
}

/* ─── Thought Card (expandable essay) ─── */
function ThoughtCard({ thought }) {
  const [open, setOpen] = useState(false);
  const blocks = thought.content.split('\n\n').filter((b) => b.trim());

  return (
    <article className="border-t border-ink/15 py-8 md:py-10">
      <header
        onClick={() => setOpen(!open)}
        className="cursor-pointer hoverable select-none group"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 className="font-display text-2xl md:text-4xl font-medium leading-tight group-hover:text-seal transition-colors">
              {thought.title}
            </h3>
            <span className="kicker block mt-2">{thought.en}</span>
          </div>
          <span className={`thought-plus font-display text-2xl text-seal shrink-0 ${open ? 'rotate-45' : ''}`}>
            +
          </span>
        </div>
        <p className="font-serif italic text-ink-soft mt-4 text-base md:text-lg leading-relaxed">
          “{thought.excerpt}”
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4">
          {thought.tags.map((t) => (
            <span key={t} className="kicker text-[10px]">{t}</span>
          ))}
        </div>
      </header>

      <div className={`thought-body ${open ? 'thought-open' : ''}`}>
        <div>
          <div className="article-body pt-8 md:pt-10 max-w-2xl">
            {blocks.map((block, i) =>
              block.trim() === '---' ? (
                <div key={i} className="ornament">✦</div>
              ) : (
                <p key={i}>{block}</p>
              )
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
    body: 'Autonomous AI recruiter. Parses resumes, matches candidates across dimensions, generates personalized outreach. The recruiter that never sleeps.',
    stack: ['Claude', 'GPT-4', 'Python', 'Agent'],
    href: 'https://github.com/kinoxuan0518/hireclaw',
    live: true,
  },
  {
    name: 'BOSSZHIBIN',
    label: 'BOSS Zhipin Automation Suite',
    body: "Full-stack automation for China's largest recruiting platform. Chrome extension + message handler + intelligent cache. Because greeting 200 candidates manually is insane.",
    stack: ['Chrome Extension', 'Node.js', 'Puppeteer', 'LLM'],
    href: 'https://github.com/kinoxuan0518',
    live: true,
  },
  {
    name: 'MAIMAI RECRUITER',
    label: 'Maimai Outreach Engine',
    body: 'Automated professional networking outreach. Same philosophy — machines handle the repetitive work, humans do the human work.',
    stack: ['Automation', 'NLP', 'Browser APIs'],
    href: 'https://github.com/kinoxuan0518/maimai-recruiter',
    live: false,
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
    '方大同', 'Frank Ocean', 'Radiohead', 'Pink Floyd', 'Queen',
    'Post Malone', '五月天', '孙燕姿', 'Justin Bieber',
    '功夫胖', 'Bad Bunny', '张震岳',
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
  move: [
    { en: 'Basketball', cn: '篮球' },
    { en: 'Climbing', cn: '攀岩' },
  ],
};

const NAV = [
  ['builds', 'Work'],
  ['thoughts', 'Thoughts'],
  ['vibes', 'Vibes'],
  ['signal', 'Contact'],
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

  /* Theme → <html> + storage */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('kx-mode', theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  /* GSAP entrance + scroll choreography */
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.hero-name .char-inner', { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.05 }, 0.15)
        .from('.hero-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.1 }, 0.5)
        .from('.hero-kicker', { opacity: 0, y: 12, duration: 0.9, ease: 'power2.out' }, 0.75);

      gsap.utils.toArray('[data-title]').forEach((el) => {
        gsap.from(el.querySelectorAll('.tw'), {
          y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
      gsap.utils.toArray('[data-rule]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        });
      });
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
      gsap.utils.toArray('[data-stagger]').forEach((group) => {
        gsap.from(group.children, {
          y: 22, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: group, start: 'top 86%' },
        });
      });

      window.addEventListener('load', () => ScrollTrigger.refresh());
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* Custom ink cursor */
  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.classList.add('has-custom-cursor');
    const move = (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      gsap.to(ring, { left: e.clientX, top: e.clientY, duration: 0.15, overwrite: true });
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
    <div ref={rootRef} className="min-h-screen bg-paper text-ink overflow-x-hidden relative">
      <div ref={cursorDot} className="cursor-dot" />
      <div ref={cursorRing} className="cursor-ring" />

      <div className="wash wash-1" />
      <div className="wash wash-2" />
      <div className="grain" />

      {/* ─── NAV / masthead ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-paper/80 backdrop-blur-md border-b border-ink/10">
        <div className="flex justify-between items-center px-6 md:px-10 py-4">
          <a href="#top" className="font-display text-lg md:text-xl font-medium tracking-tight hoverable">
            Kino&nbsp;Xuan
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="nav-link text-[11px] tracking-[0.28em] uppercase text-ink-soft hoverable">
                {label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="theme-toggle w-8 h-8 flex items-center justify-center rounded-full border hoverable"
              aria-label="Toggle reading mode"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="theme-toggle w-8 h-8 flex items-center justify-center rounded-full border hoverable"
              aria-label="Toggle reading mode"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 flex items-center justify-center hoverable" aria-label="Menu">
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col items-end gap-4 px-6 pb-6">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="nav-link text-[11px] tracking-[0.28em] uppercase text-ink-soft hoverable">
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="top" className="min-h-screen flex flex-col justify-center items-center text-center relative select-none px-4">
        <h1 className="font-display font-medium leading-[0.82] tracking-[-0.02em]">
          <span className="block text-[19vw] md:text-[13vw]"><WaveText text="Kino" /></span>
          <span className="block text-[19vw] md:text-[13vw] italic"><WaveText text="Xuan" /></span>
        </h1>
        <div className="hero-rule rule rule-seal w-24 md:w-32 mt-10 mb-6" />
        <p className="hero-kicker kicker">recruiter · ai · writer</p>
      </section>

      {/* ═══ WORK ═══ */}
      <section id="builds" className="py-24 md:py-40 px-6 md:px-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          <p className="kicker mb-5" data-reveal>01 — Selected Work</p>
          <h2 data-title className="font-display text-[2.4rem] md:text-7xl font-medium leading-[1.08] tracking-[-0.01em]">
            <MaskWords text="Things I've" />
            <MaskWords text="shipped" className="italic text-seal" />
          </h2>
          <div data-rule className="rule mt-8 mb-2" />

          <div data-stagger>
            {BUILDS.map((b, i) => (
              <a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                className="build-row grid grid-cols-[2rem_1fr_auto] md:grid-cols-[3rem_1fr_auto] gap-4 md:gap-8 items-baseline py-7 md:py-9 border-t border-ink/10 last:border-b hoverable"
              >
                <span className="build-index font-display text-base md:text-xl text-ink-ghost">0{i + 1}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="build-name font-display text-2xl md:text-4xl font-medium leading-none">{b.name}</h3>
                    <span className="flex items-center gap-1.5 kicker text-[10px]">
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: b.live ? 'rgb(var(--c-accent))' : 'rgb(var(--c-muted-3))' }} />
                      {b.live ? 'Active' : 'Building'}
                    </span>
                  </div>
                  <p className="font-serif italic text-ink-soft mt-1.5 text-sm md:text-base">{b.label}</p>
                  <p className="font-serif text-ink-2 mt-3 max-w-2xl leading-relaxed text-[15px] md:text-base">{b.body}</p>
                  <p className="kicker text-[10px] mt-4">{b.stack.join('   ·   ')}</p>
                </div>
                <ArrowUpRight className="build-arrow w-5 h-5 text-ink-ghost self-start mt-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THOUGHTS ═══ */}
      <section id="thoughts" className="py-24 md:py-40 px-6 md:px-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          <p className="kicker mb-5" data-reveal>02 — Writing</p>
          <h2 data-title className="font-display text-[2.4rem] md:text-7xl font-medium leading-[1.08] tracking-[-0.01em]">
            <MaskWords text="Questions that" />
            <MaskWords text="won't shut up" className="italic text-seal" />
          </h2>
          <div data-rule className="rule mt-8" />
          {THOUGHTS.map((t) => (
            <ThoughtCard key={t.title} thought={t} />
          ))}
        </div>
      </section>

      {/* ═══ VIBES ═══ */}
      <section id="vibes" className="py-24 md:py-40 px-6 md:px-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          <p className="kicker mb-5" data-reveal>03 — Off the Clock</p>
          <h2 data-title className="font-display text-[2.4rem] md:text-7xl font-medium leading-[1.08] tracking-[-0.01em]">
            <MaskWords text="Things I" />
            <MaskWords text="love" className="italic text-seal" />
          </h2>
          <div data-rule className="rule mt-8 mb-16" />

          {/* Music */}
          <div className="mb-16" data-reveal>
            <p className="kicker mb-5">Music</p>
            <p className="font-display text-xl md:text-3xl font-light leading-relaxed">
              {VIBES.music.map((a, i) => (
                <Fragment key={a}>
                  {i > 0 && <span className="text-ink-ghost mx-2 md:mx-3 select-none">·</span>}
                  <span className="music-item hoverable">{a}</span>
                </Fragment>
              ))}
            </p>
          </div>

          {/* Cinema */}
          <div className="mb-16">
            <p className="kicker mb-3" data-reveal>Cinema</p>
            <div data-stagger>
              {VIBES.cinema.map((f) => (
                <div key={f.title} className="film-row hoverable">
                  <span className="font-display text-lg md:text-2xl font-medium">{f.title}</span>
                  <span className="font-serif italic text-ink-faint text-sm md:text-base whitespace-nowrap">{f.cn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Move */}
          <div className="mb-20" data-reveal>
            <p className="kicker mb-5">Move</p>
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              {VIBES.move.map((m) => (
                <span key={m.en} className="font-display text-xl md:text-2xl font-medium">
                  {m.en} <span className="font-serif italic text-ink-faint text-base">{m.cn}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Talk to my AI — colophon */}
          <div data-reveal>
            <div className="colophon rounded-md p-8 md:p-12 hoverable">
              <p className="kicker mb-4">The Author's AI</p>
              <h3 className="font-display text-3xl md:text-5xl font-medium mb-3">Talk to me</h3>
              <p className="font-serif italic text-ink-soft text-base md:text-lg max-w-md mb-8 leading-relaxed">
                Install this, and your Claude starts thinking the way I do.
              </p>
              <code className="paper-code text-[11px] md:text-xs text-ink-2 px-4 py-3 block overflow-x-auto select-all hoverable leading-relaxed">
                <span className="text-seal">$</span>{' '}
                mkdir -p ~/.claude/skills/kino-persona && curl -sL https://raw.githubusercontent.com/kinoxuan0518/my-portfolio/main/public/skills/kino-persona/SKILL.md -o ~/.claude/skills/kino-persona/SKILL.md
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIGNAL / CONTACT ═══ */}
      <section id="signal" className="py-28 md:py-48 px-6 md:px-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote data-reveal className="font-display text-2xl md:text-5xl font-light italic leading-snug mb-16">
            “The future of recruiting isn't better job boards. It's{' '}
            <span className="text-seal not-italic font-medium">AI agents</span> that understand what makes someone{' '}
            <span className="text-seal not-italic font-medium">right</span>.”
          </blockquote>
          <div data-stagger className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 font-serif text-base md:text-lg">
            <a href="mailto:kinoxuanzl@gmail.com" className="contact-link inline-flex items-center gap-2 hoverable">
              <Mail className="w-4 h-4" /> kinoxuanzl@gmail.com
            </a>
            <a href="https://github.com/kinoxuan0518" target="_blank" rel="noreferrer" className="contact-link inline-flex items-center gap-2 hoverable">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/kino-xuan-703a37124/" target="_blank" rel="noreferrer" className="contact-link inline-flex items-center gap-2 hoverable">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ═══ COLOPHON / FOOTER ═══ */}
      <footer className="py-12 px-6 border-t border-ink/10 text-center">
        <p className="kicker">Set in Fraunces &amp; Newsreader</p>
        <p className="font-serif italic text-ink-faint text-sm mt-2">© 2026 Kino Xuan · Built with attitude &amp; AI</p>
      </footer>
    </div>
  );
}
