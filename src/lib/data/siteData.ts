import { 
  FaUsers,  FaNewspaper, FaStar, FaImages, 
   FaPhone, 
  FaHouse, 
  FaDiagramProject, FaBullhorn, FaChartPie,
  
} from 'react-icons/fa6';

export const siteData = {
  about: {
    title: 'من نحن',
    description: 'مؤسسة إنسان للأعمال الإنسانية مؤسسة وطنية إنسانية تنموية غير حكومية مرخصة برقم (88) من مكتب الشؤون الاجتماعية والعمل في محافظة الضالع في تاريخ 13/01/2022م.',
    intro: 'ننطلق في مؤسسة إنسان للأعمال الإنسانية من إيماننا العميق بإمكانيات المجتمع الذاتية وطاقات أفراده وخصوصاً الشباب وقدرتهم على إحداث تغيير حقيقي ومستدام إذا ما تم استثمارها بفاعلية. ونعمل على تحويل هذا الإيمان إلى خطوات إجرائية فعلية من خلال عملنا في التنمية والاستجابة الإنسانية بالشراكة مع المنظمات الدولية والإقليمية والوطنية والقطاع الحكومي والخاص والخبراء والمكونات الشبابية الطوعية.',
    vision: 'بناء وتكريم الأفراد والمجتمعات إنسانياً وتمكينهم تنموياً',
    mission: 'نبادر لتمكين المجتمع والعائلات والأفراد من خلال برامج الاستجابة الإنسانية والتنمية المستدامة باحترافية وشراكات فاعلة.',
    values: ['التعلم', 'الإحترافية', 'المبادرة', 'المساءلة', 'الحيادية', 'الاستدامة', 'الاستقلالية', 'المرونة'],
    structure: 'الهيكل التنظيمي للمؤسسة يتكون من مجلس الإدارة، الإدارة التنفيذية، والقطاعات البرامجية والدعم.',
    locations: [
      { city: 'الضالع', type: 'المكتب الرئيسي', address: 'الضالع - اليمن' },
      { city: 'صنعاء', type: 'مكتب فرعي', address: 'صنعاء - اليمن' },
      { city: 'مأرب', type: 'مكتب ميداني', address: 'مأرب - اليمن' },
      { city: 'تعز', type: 'مكتب ميداني', address: 'تعز - اليمن' }
    ]
  },
  programs: [
    { id: 'food-security', name: 'الأمن الغذائي', icon: 'FaWheatAwn', description: 'تعزيز الأمن الغذائي وتحسين سبل العيش المستدام.', projects: 24, families: 41612, individuals: 254048, locations: ['الضالع', 'مأرب', 'صنعاء', 'تعز'], color: '#1A5F7A' },
    { id: 'shelter', name: 'المأوى والمواد غير الغذائية', icon: 'FaHouseChimney', description: 'الاستجابة بكفاءة لاحتياجات النازحين واللاجئين والعائدين.', projects: 3, families: 800, individuals: 5600, locations: ['الضالع'], color: '#159C4B' },
    { id: 'education', name: 'التعليم', icon: 'FaBook', description: 'المساهمة في خفض معدلات الأمية والانقطاع من التعليم.', projects: 11, families: 0, individuals: 10640, locations: ['الضالع'], color: '#D4621A' },
    { id: 'health', name: 'الصحة', icon: 'FaHeartPulse', description: 'رفع مستوى الخدمات الصحية وتحسين معيشة السكان.', projects: 0, families: 0, individuals: 0, locations: [], color: '#EF4444' },
    { id: 'water', name: 'المياه والإصحاح البيئي', icon: 'FaDroplet', description: 'تحسين مستوى الوصول إلى المياه الآمنة والصرف الصحي.', projects: 11, families: 3915, individuals: 21161, locations: ['الضالع'], color: '#3B82F6' },
    { id: 'protection', name: 'الحماية', icon: 'FaShieldHalved', description: 'الحفاظ على كرامة الإنسان وصون حقوقه الأساسية.', projects: 8, families: 500, individuals: 2352, locations: ['الضالع', 'صنعاء'], color: '#8B5CF6' },
    { id: 'livelihood', name: 'التمكين وسبل العيش', icon: 'FaBriefcase', description: 'تنفيذ برامج تمكين وتدريب وتأهيل.', projects: 0, families: 0, individuals: 0, locations: [], color: '#F59E0B' }
  ],
  stats: { projects: 57, families: 46827, individuals: 293801, volunteers: 500, locations: 5 },
  navigation: {
    main: [
      { name: 'الرئيسية', href: '/', icon: FaHouse },
      { name: 'من نحن', href: '/about', icon: FaUsers, children: [
        { name: 'عن المنظمة', href: '/about' },
        { name: 'هيكل المنظمة', href: '/about/structure' },
        { name: 'أين نعمل', href: '/about/locations' }
      ]},
      { name: 'البرامج', href: '/programs', icon: FaDiagramProject },
      { name: 'المشاريع', href: '/projects', icon: FaStar },
      { name: 'الأخبار', href: '/media/news', icon: FaNewspaper },
      { name: 'الإعلام', href: '/media', icon: FaImages, children: [
        { name: 'قصص النجاح', href: '/media/success-stories' },
        { name: 'معرض الصور', href: '/media/gallery' },
        { name: 'الفيديو', href: '/media/videos' },
        { name: 'إنفوجرافيك', href: '/media/infographics' }
      ]},
      { name: 'إعلانات', href: '/announcements', icon: FaBullhorn, children: [
        { name: 'وظائف', href: '/media/jobs' },
        { name: 'مناقصات', href: '/media/tenders' },
        { name: 'عمالة بالأجر اليومي', href: '/media/daily-work' }
      ]},
      { name: 'تقارير وإحصائيات', href: '/reports', icon: FaChartPie, children: [
        { name: 'تقارير', href: '/reports' },
        { name: 'حصادنا', href: '/reports/annual' },
        { name: 'الأدلة والسياسات', href: '/reports/policies' },
        { name: 'الإحصائيات', href: '/reports/statistics' }
      ]},
      { name: 'للتواصل', href: '/contact', icon: FaPhone, children: [
        { name: 'تواصل معنا', href: '/contact' },
        { name: 'الشكاوى والمقترحات', href: '/contact/complaints' },
        { name: 'ساهم معنا', href: '/contact/contribute' },
        { name: 'اتصل بنا', href: '/contact/call' }
      ]}
    ]
  }
};
