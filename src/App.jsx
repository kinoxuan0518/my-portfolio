import React, { useState, useEffect } from 'react';
import { Terminal, MapPin, Zap, Cpu, Orbit, Star, Radio, Binary, Activity, User, Mail, Linkedin, Dumbbell, Mountain, Search, ExternalLink, Code, Globe, Image as ImageIcon, Film, Disc, Aperture } from 'lucide-react';

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' or 'cn'

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // 核心影视数据 (保持数据源独立，方便修改)
  const sciFiCollection = [
    { id: "LOG_01", title: "Cowboy Bebop", cnTitle: "星际牛仔", year: "1998", type: "ANIME", tags: ["NOIR", "SPACE"] },
    { id: "LOG_02", title: "Neon Genesis Evangelion", cnTitle: "新世纪福音战士", year: "1995", type: "ANIME", tags: ["MECHA", "PSYCHO"] },
    { id: "LOG_03", title: "Ghost in the Shell", cnTitle: "攻壳机动队", year: "1995", type: "MOVIE", tags: ["CYBERPUNK", "PHIL"] },
    { id: "LOG_04", title: "2001: A Space Odyssey", cnTitle: "2001太空漫游", year: "1968", type: "MOVIE", tags: ["ORIGIN", "AI"] },
    { id: "LOG_05", title: "Dune", cnTitle: "沙丘", year: "2021", type: "MOVIE", tags: ["EPIC", "SPICE"] },
    { id: "LOG_06", title: "Akira", cnTitle: "阿基拉", year: "1988", type: "MOVIE", tags: ["NEO-TOKYO", "POWER"] },
    { id: "LOG_07", title: "Star Trek", cnTitle: "星际迷航", year: "1966", type: "SERIES", tags: ["EXPLORE", "LOGIC"] },
    { id: "LOG_08", title: "Stranger Things", cnTitle: "怪奇物语", year: "2016", type: "SERIES", tags: ["RETRO", "MYSTERY"] },
  ];

  // 多语言内容配置
  const content = {
    en: {
      signal: "SIGNAL",
      online: "ONLINE",
      connecting: "CONNECTING...",
      hero_tag: "BLACK LAKE TECHNOLOGIES",
      hero_intro: "HI, I'M",
      hero_role: "HRBP & Talent Architect",
      hero_role_desc: "at an Industrial Tech Unicorn.",
      hero_desc_1: "Navigating the entropy of organizations with a ",
      hero_desc_bold: "Physics Background",
      hero_desc_2: ". Applying system theory to solve complex organizational problems.",
      hero_quote: "\"Belief: Doing something real for Chinese Manufacturing.\" 💡",
      btn_email: "SEND TRANSMISSION",
      btn_linkedin: "LINKEDIN",
      btn_xhs: "XIAOHONGSHU",
      
      id_card: {
        id: "ID: KINO-95",
        class_type: "CLASS: ARCHITECT",
        state: "STATE: RECRUITING",
        sys: "SYS: BLACKLAKE_OS"
      },

      section_obj: "CURRENT OBJECTIVES",
      obj_1_title: "HRBP @ Product & Engineering",
      obj_1_desc: "Co-building strategy, organization, and culture with the R&D team. Ensuring the human system runs as efficiently as the code.",
      obj_2_title: "Talent Architect",
      obj_2_desc: "Focusing on AI talent acquisition and cultivation. Designing technical growth paths for the next generation of engineers.",
      obj_3_title: "Recruitment Expert",
      obj_3_desc: "Scouting top-tier engineers and filling critical gaps in the Artificial Intelligence sector.",
      obj_4_title: "Org Development",
      obj_4_desc: "Driving efficiency, optimizing processes, and enhancing cross-functional collaboration protocols.",

      mission_title: "MISSION: JOIN THE CREW",
      mission_desc: "If you want to build products that truly impact the future of Chinese manufacturing in a high-growth industrial tech unicorn, initiate contact immediately.",
      mission_footer: "Also hiring: Product Managers, Designers, Data Specialists related to Industrial Intelligence.",
      
      metrics_title: "PHYSICAL METRICS",
      sport_1: "Basketball",
      sport_2: "Badminton",
      sport_3: "Climbing",
      sport_tag_1: "INTENSITY",
      sport_tag_2: "AGILITY",
      sport_tag_3: "ENDURANCE",
      sport_quote: "\"Sports make thinking more flexible.\"",

      matrix_title: "CAPABILITY MATRIX",
      skills: [
        { name: "Org Strategy", level: 90, type: "Work", desc: "Product & Eng Org Dev" },
        { name: "Talent Arch", level: 95, type: "Work", desc: "AI Talent Acquisition" },
        { name: "System Thinking", level: 85, type: "Physics", desc: "Physics -> Management" },
        { name: "Energy (ENFP)", level: 98, type: "Soft Skill", desc: "High Entropy Output" },
      ],

      hiring: [
        { category: "R&D CORE", roles: ["Frontend", "Backend", "Mobile", "Testing"] },
        { category: "AI / ALGO", roles: ["LLM", "RL", "Pre-training", "Alignment", "Agent"] },
        { category: "SYSTEMS", roles: ["HPC", "Heterogeneous Sys", "Framework Dev"] }
      ],

      visual_archives: "VISUAL ARCHIVES // SCI-FI LOGS",

      footer_copy: "© 2025 KINO XUAN. BRIDGING TALENT AND TECHNOLOGY.",
      footer_sys: "SYSTEM STATUS: READY FOR CONNECTION."
    },
    cn: {
      signal: "信号",
      online: "在线",
      connecting: "连接中...",
      hero_tag: "黑湖科技 BLACK LAKE",
      hero_intro: "你好，我是",
      hero_role: "HRBP & 人才架构师",
      hero_role_desc: "任职于工业科技独角兽企业。",
      hero_desc_1: "以",
      hero_desc_bold: "物理学背景",
      hero_desc_2: "应对组织熵增。应用系统论思维解决复杂的组织问题。",
      hero_quote: "“信念：为中国制造做点实事。” 💡",
      btn_email: "发送信号 (邮件)",
      btn_linkedin: "领英页面",
      btn_xhs: "小红书",

      id_card: {
        id: "编号: KINO-95",
        class_type: "职能: 架构师",
        state: "状态: 招聘中",
        sys: "系统: 黑湖_OS"
      },

      section_obj: "当前目标 / OBJECTIVES",
      obj_1_title: "HRBP @ 产研团队",
      obj_1_desc: "与研发团队共建战略、组织与文化。确保“人”的系统像代码一样高效运行。",
      obj_2_title: "人才架构师",
      obj_2_desc: "专注 AI 人才引进与培养。为下一代工程师设计技术成长路径。",
      obj_3_title: "招聘专家",
      obj_3_desc: "搜寻顶尖工程师，填补人工智能领域的关键缺口。",
      obj_4_title: "组织发展 (OD)",
      obj_4_desc: "推动效能提升，优化流程，增强跨职能协作协议。",

      mission_title: "任务：加入船队",
      mission_desc: "如果你希望在一家高速成长的工业科技独角兽企业，做真正影响中国制造未来的产品与技术，请立即发起联络。",
      mission_footer: "同时招聘：与工业智能相关的产品经理、设计师、数据专家。",

      metrics_title: "体能参数",
      sport_1: "篮球",
      sport_2: "羽毛球",
      sport_3: "攀岩",
      sport_tag_1: "高强度",
      sport_tag_2: "敏捷性",
      sport_tag_3: "耐力",
      sport_quote: "“运动让思维更敏捷。”",

      matrix_title: "能力矩阵",
      skills: [
        { name: "组织战略", level: 90, type: "Work", desc: "产研组织发展" },
        { name: "人才架构", level: 95, type: "Work", desc: "AI 人才获取" },
        { name: "系统思维", level: 85, type: "Physics", desc: "物理学 -> 管理学" },
        { name: "能量 (ENFP)", level: 98, type: "Soft Skill", desc: "高能输出 / 活力" },
      ],

      hiring: [
        { category: "研发核心", roles: ["前端", "后端", "移动端", "测试"] },
        { category: "AI / 算法", roles: ["大模型", "强化学习", "预训练", "对齐", "智能体"] },
        { category: "系统架构", roles: ["高性能计算", "异构系统", "框架开发"] }
      ],

      visual_archives: "影像档案 / 收藏列表",

      footer_copy: "© 2025 KINO XUAN. 搭建人才与科技的桥梁。",
      footer_sys: "系统状态：准备连接。"
    }
  };

  const t = content[lang];

  // 用户核心数据 (不随语言变化的静态数据)
  const profile = {
    name: "KINO XUAN",
    email: "xuanzhenglong@blacklake.cn",
    xiaohongshu: "@杏仁王子",
    linkedin: "https://www.linkedin.com/in/kino-xuan-703a37124/"
  };

  // 图标映射
  const hiringIcons = [
    <Code className="w-4 h-4 text-emerald-400" />,
    <Cpu className="w-4 h-4 text-purple-400" />,
    <Terminal className="w-4 h-4 text-amber-400" />
  ];

  return (
    <div className={`min-h-screen bg-[#080808] text-amber-50 font-mono selection:bg-amber-500/30 selection:text-amber-100 overflow-x-hidden transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 动态背景层 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,15,10,0.5),_rgba(5,5,5,1))]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] bg-repeat z-10"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        
        {/* 顶部状态栏 & 语言切换 */}
        <div className="flex justify-between items-center border-b border-amber-900/30 pb-4 mb-12 text-xs tracking-widest text-amber-700/80">
          <div className="flex items-center gap-2">
            <Radio className={`w-3 h-3 ${glitch ? 'text-red-500' : 'text-green-500'} animate-pulse`} />
            <span>{t.signal}: {glitch ? t.connecting : t.online}</span>
          </div>
          
          <div className="flex items-center gap-6">
             <button 
               onClick={() => setLang(l => l === 'en' ? 'cn' : 'en')}
               className="flex items-center gap-2 px-3 py-1 bg-amber-900/20 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black transition-all rounded cursor-pointer group"
             >
               <Globe className="w-3 h-3 group-hover:animate-spin" />
               <span className="font-bold">{lang === 'en' ? 'CN' : 'EN'}</span>
             </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-24 items-start">
          
          {/* 左侧：文字信息 */}
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-900/20 border border-amber-900/40 text-amber-500 text-xs font-bold tracking-wider animate-pulse">
              <Zap className="w-3 h-3" />
              <span>{t.hero_tag}</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-600 ${glitch ? 'blur-[1px] translate-x-1' : ''}`}>
              {t.hero_intro} <br/>
              <span className="text-amber-500">{profile.name}</span>.
            </h1>
            
            <p className="text-lg text-amber-200/60 max-w-xl leading-relaxed">
              <strong className="text-amber-100">{t.hero_role}</strong> {t.hero_role_desc}
              <br/><br/>
              {t.hero_desc_1} <span className="text-amber-400">{t.hero_desc_bold}</span> {t.hero_desc_2}
              <br/><br/>
              <span className="italic text-sm opacity-70">{t.hero_quote}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 text-xs font-bold tracking-widest">
               <a href={`mailto:${profile.email}`} className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-black transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
                <Mail className="w-4 h-4" />
                {t.btn_email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 border border-amber-600/50 text-amber-500 hover:bg-amber-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Linkedin className="w-4 h-4" />
                {t.btn_linkedin}
              </a>
            </div>
            
            <div className="pt-2 text-xs text-amber-800/80 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>{t.btn_xhs}: {profile.xiaohongshu}</span>
            </div>
          </div>

          {/* 右侧：Hero 头像/照片展示区 */}
          <div className="md:col-span-5 relative group mt-8 md:mt-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-rose-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-amber-900/50 bg-black">
              <img 
                src="/me.png"   // <--- 重点是这里，必须和你在 public 文件夹里的文件名一模一样
                alt="Kino Xuan" 
                className="w-full h-full object-cover transition-all duration-700"
              />
              
              {/* HUD 覆盖层 */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                   <div className="w-8 h-8 border-t-2 border-l-2 border-amber-500/50"></div>
                   <div className="text-[10px] text-amber-500/80 text-right">
                     {t.id_card.id}<br/>
                     {t.id_card.class_type}
                   </div>
                </div>
                <div className="flex justify-between items-end">
                   <div className="text-[10px] text-amber-500/80">
                     {t.id_card.state}<br/>
                     {t.id_card.sys}
                   </div>
                   <div className="w-8 h-8 border-b-2 border-r-2 border-amber-500/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 核心职责 / 我在做什么 */}
        <div className="mb-24">
            <div className="flex items-center gap-2 mb-8 border-b border-amber-900/30 pb-2">
                <Activity className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-amber-100 tracking-[0.2em]">{t.section_obj}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-amber-900/30 bg-[#0c0c0c] rounded hover:bg-amber-900/10 transition-colors group">
                    <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" /> {t.obj_1_title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {t.obj_1_desc}
                    </p>
                </div>
                
                <div className="p-6 border border-amber-900/30 bg-[#0c0c0c] rounded hover:bg-amber-900/10 transition-colors group">
                    <h3 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> {t.obj_2_title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {t.obj_2_desc}
                    </p>
                </div>

                <div className="p-6 border border-amber-900/30 bg-[#0c0c0c] rounded hover:bg-amber-900/10 transition-colors group">
                    <h3 className="text-rose-400 font-bold mb-2 flex items-center gap-2">
                        <Search className="w-4 h-4" /> {t.obj_3_title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {t.obj_3_desc}
                    </p>
                </div>

                <div className="p-6 border border-amber-900/30 bg-[#0c0c0c] rounded hover:bg-amber-900/10 transition-colors group">
                    <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
                        <Orbit className="w-4 h-4" /> {t.obj_4_title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {t.obj_4_desc}
                    </p>
                </div>
            </div>
        </div>

        {/* 招聘布告栏 */}
        <div className="mb-24 relative overflow-hidden rounded-xl border border-amber-500/30 bg-amber-950/10 p-8">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Binary className="w-32 h-32 text-amber-500" />
            </div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-500 mb-2">
                    ⚡ {t.mission_title}
                </h2>
                <p className="text-amber-200/70 mb-8 max-w-2xl">
                    {t.mission_desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {t.hiring.map((target, idx) => (
                        <div key={idx} className="bg-black/40 backdrop-blur border border-amber-500/20 p-5 rounded hover:border-amber-500/60 transition-all">
                            <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold tracking-wider text-sm border-b border-amber-500/10 pb-2">
                                {hiringIcons[idx]} {target.category}
                            </div>
                            <ul className="space-y-2">
                                {target.roles.map((role, rIdx) => (
                                    <li key={rIdx} className="text-xs text-gray-300 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                                        {role}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-xs text-amber-600/80">
                     <ExternalLink className="w-3 h-3" />
                     <span>{t.mission_footer}</span>
                </div>
            </div>
        </div>

        {/* 个人爱好与物理特质 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 items-stretch">
             {/* Left Panel: Physical Metrics */}
             <div className="md:col-span-1 p-6 border border-amber-900/30 bg-[#0c0c0c] rounded flex flex-col">
                 <h2 className="text-lg font-bold text-amber-100 tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-500" /> {t.metrics_title}
                 </h2>
                 <div className="space-y-4 flex-1">
                     <div className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-amber-900/20 rounded hover:border-amber-500/30 transition-colors">
                         <span className="flex items-center gap-2 text-sm text-gray-400"><Dumbbell className="w-3 h-3 text-amber-500"/> {t.sport_1}</span>
                         <span className="text-[10px] text-amber-600 border border-amber-900/50 px-2 py-0.5 rounded">{t.sport_tag_1}</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-amber-900/20 rounded hover:border-amber-500/30 transition-colors">
                         <span className="flex items-center gap-2 text-sm text-gray-400"><Zap className="w-3 h-3 text-amber-500"/> {t.sport_2}</span>
                         <span className="text-[10px] text-amber-600 border border-amber-900/50 px-2 py-0.5 rounded">{t.sport_tag_2}</span>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-[#0a0a0a] border border-amber-900/20 rounded hover:border-amber-500/30 transition-colors">
                         <span className="flex items-center gap-2 text-sm text-gray-400"><Mountain className="w-3 h-3 text-amber-500"/> {t.sport_3}</span>
                         <span className="text-[10px] text-amber-600 border border-amber-900/50 px-2 py-0.5 rounded">{t.sport_tag_3}</span>
                     </div>
                 </div>
                 <p className="mt-6 text-xs text-amber-800/60 italic border-t border-amber-900/20 pt-4">
                    {t.sport_quote}
                 </p>
             </div>

             {/* Right Panel: Capability Matrix */}
             <div className="md:col-span-2 p-6 border border-amber-900/30 bg-[#0c0c0c] rounded flex flex-col">
                 <h2 className="text-lg font-bold text-amber-100 tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-500" /> {t.matrix_title}
                 </h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 flex-1">
                    {t.skills.map((skill, idx) => (
                      <div key={idx} className="group">
                        <div className="flex justify-between text-xs mb-2 text-amber-100/60">
                          <span className="font-bold tracking-wider">{skill.name}</span>
                          <span className="text-amber-500">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-amber-900/20 rounded-full overflow-hidden mb-2">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:bg-amber-400 ${skill.type === 'Physics' ? 'bg-cyan-600' : skill.type === 'Work' ? 'bg-emerald-600' : 'bg-rose-600'}`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="text-[10px] text-gray-500 text-right font-mono">{skill.desc}</div>
                      </div>
                    ))}
                 </div>
             </div>
        </div>

        {/* 影像档案 (Visual Archives) - 更新后 */}
        <div className="mb-24">
             <h2 className="text-lg font-bold text-amber-100 tracking-[0.2em] mb-8 flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-500" /> {t.visual_archives}
             </h2>
             
             {/* 科幻电影列表网格 */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sciFiCollection.map((item, index) => (
                  <div key={index} className="group relative border border-amber-900/30 bg-[#0c0c0c] rounded-lg p-4 hover:border-amber-500/50 hover:bg-amber-900/10 transition-all duration-300 flex flex-col h-full">
                    {/* 装饰性角标 */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-900 group-hover:border-amber-500/50 transition-colors"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-900 group-hover:border-amber-500/50 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-900 group-hover:border-amber-500/50 transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-900 group-hover:border-amber-500/50 transition-colors"></div>

                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] text-amber-700 font-mono border border-amber-900/30 px-1 rounded">{item.id}</span>
                      <Disc className={`w-4 h-4 text-amber-900 group-hover:text-amber-500 group-hover:animate-spin transition-colors duration-700`} />
                    </div>

                    <h3 className="text-amber-100 font-bold text-sm leading-tight mb-1 group-hover:text-amber-400 transition-colors">
                      {lang === 'cn' ? item.cnTitle : item.title}
                    </h3>
                    <div className="text-[10px] text-gray-500 font-mono mb-4">{item.year} // {item.type}</div>

                    <div className="mt-auto flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[8px] bg-amber-900/20 text-amber-600 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
        </div>

        {/* 底部 Footer */}
        <footer className="border-t border-amber-900/30 pt-12 pb-6 text-center text-xs text-amber-800/60">
           <p className="mb-2">{t.footer_copy}</p>
           <p className="font-mono opacity-50">{t.footer_sys}</p>
        </footer>

      </div>
    </div>
  );
};

export default Portfolio;