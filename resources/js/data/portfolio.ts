/**
 * Portfolio content, sourced from CV_Fadhil_Rizki_Fauzan.pdf.
 * Facts (names, dates, links, tech) are single sourced; only prose is localised.
 */

export type Locale = 'id' | 'en';

export type Localized = Record<Locale, string>;

export const LOCALES: readonly Locale[] = ['id', 'en'];

export const LOCALE_LABELS: Record<Locale, string> = {
    id: 'ID',
    en: 'EN',
};

export const PROFILE = {
    name: 'Fadhil Rizki Fauzan',
    email: 'rffadhil07@gmail.com',
    phone: '+62 895-2660-7161',
    phoneHref: 'tel:+6289526607161',
    github: 'https://github.com/IniFadhil',
    githubHandle: '@IniFadhil',
    /** Bare login, for the public contribution chart. */
    githubUser: 'IniFadhil',
    cv: '/cv/fadhil-rizki-fauzan.pdf',
} as const;

export const SEO: Record<'title' | 'description', Localized> = {
    title: {
        id: 'Fadhil Rizki Fauzan - Game Developer & Software Developer',
        en: 'Fadhil Rizki Fauzan - Game Developer & Software Developer',
    },
    description: {
        id: 'Portofolio Fadhil Rizki Fauzan, game developer dan software developer asal Subang, Jawa Barat.',
        en: 'Portfolio of Fadhil Rizki Fauzan, a game developer and software developer based in Subang, West Java.',
    },
};

export const SECTIONS = [
    { id: 'tentang', hash: '#tentang' },
    { id: 'perkakas', hash: '#perkakas' },
    { id: 'pengalaman', hash: '#pengalaman' },
    { id: 'proyek', hash: '#proyek' },
    { id: 'sertifikasi', hash: '#sertifikasi' },
    { id: 'aktivitas', hash: '#aktivitas' },
    { id: 'kontak', hash: '#kontak' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

type Copy = {
    nav: Record<SectionId, string>;
    sections: string;
    status: string;
    contact: string;
    hireMe: string;
    /** The skills filter tabs: the "all" tab, then one label per group key. */
    filterAll: string;
    filters: Record<SkillKey, string>;
    downloadCv: string;
    exploreProjects: string;
    copyEmail: string;
    copiedEmail: string;
    language: string;
    projectLink: string;
    mockupPending: string;
    /** The opening screen. */
    introLabel: string;
    loadingLabel: string;
    continueLabel: string;
    continueHint: string;
};

export const UI: Record<Locale, Copy> = {
    id: {
        nav: {
            tentang: 'Tentang',
            perkakas: 'Keahlian',
            pengalaman: 'Pengalaman',
            proyek: 'Proyek',
            sertifikasi: 'Pencapaian',
            aktivitas: 'Aktivitas',
            kontak: 'Kontak',
        },
        sections: 'Bagian halaman',
        status: 'Terbuka untuk peluang',
        contact: 'Hubungi saya',
        hireMe: 'Hire Me',
        filterAll: 'Semua',
        filters: {
            bahasa: 'Bahasa',
            frontend: 'Frontend',
            backend: 'Backend',
            game: 'Game Dev',
            tools: 'Perkakas',
        },
        downloadCv: 'Unduh CV',
        exploreProjects: 'Jelajahi proyek saya',
        copyEmail: 'Salin email',
        copiedEmail: 'Tersalin',
        language: 'Bahasa',
        projectLink: 'Buka proyek di tab baru',
        mockupPending: 'Mockup menyusul',
        introLabel: 'Layar pembuka',
        loadingLabel: 'Memuat',
        continueLabel: 'Lanjutkan',
        continueHint: 'atau tekan Enter',
    },
    en: {
        nav: {
            tentang: 'About',
            perkakas: 'Skills',
            pengalaman: 'Experience',
            proyek: 'Work',
            sertifikasi: 'Awards',
            aktivitas: 'Activity',
            kontak: 'Contact',
        },
        sections: 'Sections',
        status: 'Open to opportunities',
        contact: 'Get in touch',
        hireMe: 'Hire Me',
        filterAll: 'All',
        filters: {
            bahasa: 'Languages',
            frontend: 'Frontend',
            backend: 'Backend',
            game: 'Game Dev',
            tools: 'Tools',
        },
        downloadCv: 'Download CV',
        exploreProjects: 'Explore my projects',
        copyEmail: 'Copy email',
        copiedEmail: 'Copied',
        language: 'Language',
        projectLink: 'Open project in a new tab',
        mockupPending: 'Mockup coming soon',
        introLabel: 'Opening screen',
        loadingLabel: 'Loading',
        continueLabel: 'Continue',
        continueHint: 'or press Enter',
    },
};

export type AuthCopy = {
    pageTitle: string;
    note: string;
    back: string;
    eyebrow: string;
    welcome: string;
    lead: string;
    email: string;
    password: string;
    remember: string;
    forgot: string;
    submit: string;
    passkey: string;
    passkeyLoading: string;
    passkeySeparator: string;
    noAccount: string;
    signUp: string;
    /** The gold sidebar: a short wordmark line and the three guarantees. */
    brandLine: string;
    panelTitle: string;
    panelLead: string;
    points: string[];
    /** The monochrome hero panel. */
    heroCaption: string;
    /** The sign in card. */
    formTitle: string;
    formLead: string;
    showPassword: string;
    hidePassword: string;
    secureNote: string;
    errors: {
        emailRequired: string;
        emailInvalid: string;
        passwordRequired: string;
    };
};

/** Login screen copy. The auth layout chrome reads from here too, so the
 *  language switch flips the whole screen. */
export const AUTH: Record<Locale, AuthCopy> = {
    id: {
        pageTitle: 'Masuk',
        note: 'Ruang kerja untuk merawat isi portofolio: proyek, kemampuan, dan pengalaman.',
        back: 'Kembali ke portofolio',
        eyebrow: 'Area terbatas',
        welcome: 'Selamat datang kembali',
        lead: 'Masuk untuk melanjutkan mengelola portofolio Fadhil Rizki Fauzan.',
        email: 'Alamat email',
        password: 'Password',
        remember: 'Ingat saya',
        forgot: 'Lupa password?',
        submit: 'Masuk',
        passkey: 'Masuk dengan passkey',
        passkeyLoading: 'Memverifikasi...',
        passkeySeparator: 'atau lanjut dengan email',
        noAccount: 'Belum punya akun?',
        signUp: 'Daftar',
        brandLine: 'Portofolio developer',
        panelTitle: 'Ruang kerja portofolio',
        panelLead:
            'Semua isi portofolio ini dirawat dari satu tempat: proyek, kemampuan, pengalaman, dan pencapaian.',
        points: [
            'Kelola daftar proyek dan tautannya',
            'Perbarui kemampuan dan pengalaman',
            'Kelola sertifikasi dan pencapaian',
        ],
        heroCaption: 'Portofolio Fadhil Rizki Fauzan',
        formTitle: 'Masuk ke ruang kerja',
        formLead: 'Gunakan email dan kata sandi akun Anda.',
        showPassword: 'Tampilkan kata sandi',
        hidePassword: 'Sembunyikan kata sandi',
        secureNote: 'Koneksi aman. Sesi berakhir otomatis saat Anda keluar.',
        errors: {
            emailRequired: 'Email wajib diisi.',
            emailInvalid: 'Format email tidak valid.',
            passwordRequired: 'Password wajib diisi.',
        },
    },
    en: {
        pageTitle: 'Log in',
        note: 'The workspace for keeping the portfolio content in shape: work, skills, and experience.',
        back: 'Back to portfolio',
        eyebrow: 'Restricted area',
        welcome: 'Welcome back',
        lead: 'Log in to keep managing the portfolio of Fadhil Rizki Fauzan.',
        email: 'Email address',
        password: 'Password',
        remember: 'Remember me',
        forgot: 'Forgot your password?',
        submit: 'Log in',
        passkey: 'Sign in with a passkey',
        passkeyLoading: 'Authenticating...',
        passkeySeparator: 'or continue with email',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
        brandLine: 'Developer portfolio',
        panelTitle: 'Portfolio workspace',
        panelLead:
            'Everything on this portfolio is maintained from one place: work, skills, experience, and achievements.',
        points: [
            'Manage the project list and its links',
            'Keep skills and experience current',
            'Maintain certifications and achievements',
        ],
        heroCaption: 'Portfolio of Fadhil Rizki Fauzan',
        formTitle: 'Sign in to the workspace',
        formLead: 'Use your account email and password.',
        showPassword: 'Show password',
        hidePassword: 'Hide password',
        secureNote: 'Secure connection. The session ends when you sign out.',
        errors: {
            emailRequired: 'Email is required.',
            emailInvalid: 'Enter a valid email address.',
            passwordRequired: 'Password is required.',
        },
    },
};

export const HERO = {
    /** The deck cover wordmark, with the full name beneath it. */
    wordmark: {
        id: 'Portofolio',
        en: 'Portfolio',
    } satisfies Localized,
    avatar: '/images/hero-character.png',
    avatarAlt: {
        id: 'Ilustrasi 3D Fadhil Rizki Fauzan',
        en: '3D illustration of Fadhil Rizki Fauzan',
    } satisfies Localized,
    /** Shown when the hero character is clicked. */
    avatarPhoto: '/images/hero-portrait.png',
    avatarPhotoAlt: {
        id: 'Foto Fadhil Rizki Fauzan',
        en: 'Photo of Fadhil Rizki Fauzan',
    } satisfies Localized,
    eyebrow: {
        id: 'Mahasiswa S1 Teknik Informatika, Universitas Pasundan • Subang, Jawa Barat, Indonesia',
        en: 'Informatics Engineering undergraduate, Universitas Pasundan • Subang, West Java, Indonesia',
    } satisfies Localized,
    lead: {
        id: 'Saya membangun aplikasi web dan game, dari portal informasi pemerintah sampai e-commerce penyewaan alat musik. Fokus pada kode yang rapi dan antarmuka yang jelas dipakai.',
        en: 'I build web applications and games, from a government information portal to a music instrument rental store. Focused on readable code and interfaces that are clear to use.',
    } satisfies Localized,
    location: {
        id: 'Subang, Jawa Barat, Indonesia',
        en: 'Subang, West Java, Indonesia',
    } satisfies Localized,
    /** The two labels flanking the hero wordmark, as on the deck cover. */
    roles: ['Game Developer', 'Software Developer'],
    /** The illustration card in the hero's right column. */
    profileCard: {
        badge: 'DEV.AVATAR',
        caption: {
            id: 'Full Stack Web & Game Enthusiast',
            en: 'Full Stack Web & Game Enthusiast',
        } satisfies Localized,
    },
    facts: [
        { value: '3.48', label: { id: 'IPK / 4.00', en: 'GPA / 4.00' } },
        { value: '8+', label: { id: 'Proyek', en: 'Projects' } },
        { value: '2', label: { id: 'Sertifikasi', en: 'Certifications' } },
    ] satisfies { value: string; label: Localized }[],
};

/** The name in two parts, for the hero headline and the opening screen. */
export const NAME = {
    parts: {
        id: ['Fadhil Rizki', 'Fauzan'],
        en: ['Fadhil Rizki', 'Fauzan'],
    } satisfies Record<Locale, readonly [string, string]>,
};

export const ABOUT = {
    kicker: { id: 'Tentang', en: 'About' },
    title: { id: 'Tentang Saya', en: 'About Me' },
    /** `**bold**` lifts a phrase to strong sand, `__accent__` to the teal accent. */
    lead: {
        id: 'Mahasiswa S1 Teknik Informatika Universitas Pasundan dengan **IPK 3.48/4.00** dan minat besar pada bidang __Full Stack Web Development__ serta __Game Development__.',
        en: 'Informatics Engineering undergraduate at Universitas Pasundan with a **3.48/4.00 GPA** and a strong interest in __full stack web development__ and __game development__.',
    } satisfies Localized,
    body: {
        id: 'Memiliki pengalaman langsung di **Dinas Komunikasi dan Informatika Kabupaten Subang**, membangun portal informasi dan layanan administrasi surat berbasis web. Terbiasa mengerjakan pengembangan web menggunakan HTML, CSS, JavaScript, Bootstrap, dan PHP Native, serta framework modern seperti Laravel dan React.js, didukung pengalaman proyek pribadi mulai dari website e-commerce, website berbasis database, hingga game edukasi.',
        en: 'I have hands on experience at the **Subang Regency Office of Communication and Informatics**, where I built an information portal and a web based letter administration service. I work with HTML, CSS, JavaScript, Bootstrap, and PHP Native, along with modern frameworks such as Laravel and React.js, backed by personal projects ranging from an e-commerce site and a database driven website to an educational game.',
    } satisfies Localized,
    note: {
        id: 'Selalu termotivasi untuk terus belajar dan mengembangkan keterampilan demi memberikan solusi inovatif yang memenuhi kebutuhan pengguna.',
        en: 'I keep learning so the solutions I build actually fit what users need.',
    } satisfies Localized,
};

export type Project = {
    id: string;
    title: string;
    /** Two or three sentences: the whole text the panel shows. */
    description: Localized;
    tech: string[];
    link: { label: string; url: string } | null;
    /** A rendered device mockup with a transparent background, under public/. */
    mockup: string | null;
};

export const WORKS = {
    kicker: { id: 'Proyek Terpilih', en: 'Selected projects' },
    title: {
        id: 'Beberapa Hal Yang Sudah Saya Bangun',
        en: 'A Few Things I Have Built',
    },
    lead: {
        id: 'Pekerjaan pengembangan software, situs web, dan game dari 2022 sampai 2025, termasuk portal informasi dan layanan publik Desa Kasomalang Kulon.',
        en: 'Software, web, and game development work from 2022 to 2025, including the public information and service portal for Desa Kasomalang Kulon.',
    },
    more: {
        id: 'Masih ada beberapa eksperimen lain yang belum saya tulis di sini.',
        en: 'A few more experiments are not listed here yet.',
    },
    viewGithub: { id: 'Lihat semua di GitHub', en: 'See everything on GitHub' },
    galleryLabel: { id: 'Galeri proyek', en: 'Project gallery' },
    prevLabel: { id: 'Proyek sebelumnya', en: 'Previous project' },
    nextLabel: { id: 'Proyek berikutnya', en: 'Next project' },
    slideOf: { id: 'dari', en: 'of' },
    /** Ordered by recency. The number shown is derived from this order. */
    items: [
        {
            id: 'smart-desa',
            title: 'Smart Desa',
            description: {
                id: 'Portal resmi desa yang menyatukan informasi dan layanan publik. Warga mengajukan surat keterangan dengan NIK dan memantau sendiri sampai selesai, sementara perangkat desa mengelola konten dan permohonan dari satu dashboard.',
                en: 'An official village portal that brings public information and services together. Residents request certificates with their national ID and track them to completion, while village staff run content and requests from a single dashboard.',
            },
            tech: ['Laravel 12', 'MySQL', 'Tailwind CSS'],
            link: null,
            mockup: '/images/projects/smart-desa.webp',
        },
        {
            id: 'symphonia',
            title: 'Symphonia',
            description: {
                id: 'Platform yang mempertemukan pemilik instrumen dengan musisi dan komunitas yang membutuhkan alat musik. Reservasi, transaksi, peminjaman, dan pengembalian berjalan dalam satu alur, sehingga siklus sewa tercatat rapi di satu tempat.',
                en: 'A platform that connects instrument owners with musicians and communities in need of an instrument. Reservations, payments, loans, and returns run as one flow, so every rental cycle is recorded in one place.',
            },
            tech: ['Laravel 11'],
            link: null,
            mockup: null,
        },
        {
            id: 'body-explorer',
            title: 'Body Explorer',
            description: {
                id: 'Game edukasi yang mengenalkan bagian tubuh manusia lewat permainan drag-and-drop. Anak menyeret tiap bagian ke posisi yang tepat di atas ilustrasi tubuh, sehingga nama dan letaknya terlatih tanpa terasa seperti menghafal.',
                en: 'An educational game that introduces the parts of the human body through drag-and-drop play. Children drag each part onto the right spot on an illustration, so names and locations stick without feeling like memorisation.',
            },
            tech: ['Adobe Animate', 'Canva'],
            link: null,
            mockup: null,
        },
        {
            id: 'campusnews',
            title: 'CampusNews',
            description: {
                id: 'Portal artikel yang mengulas perkembangan teknologi informasi, lengkap dengan pencarian kata kunci dan pengurutan konten. Penulis dan pengelola mengatur publikasi lewat dashboard administrator, termasuk laporan PDF sebagai rekap.',
                en: 'An article portal covering developments in information technology, with keyword search and sortable content. Writers and managers handle publication through an administrator dashboard, including PDF reports as a recap.',
            },
            tech: ['HTML', 'PHP', 'Bootstrap'],
            link: null,
            mockup: null,
        },
        {
            id: 'website-portofolio',
            title: 'Website Portofolio',
            description: {
                id: 'Situs pribadi yang merangkum profil, keterampilan, pengalaman, pencapaian, dan proyek yang pernah saya kerjakan. Semuanya disusun agar mudah ditelusuri, sehingga pengunjung dapat menilai kompetensi dan hasil karya dari satu sumber.',
                en: 'A personal site that gathers my profile, skills, experience, achievements, and the projects I have worked on. Everything is arranged to be easy to browse, so visitors can judge my competence and output from a single source.',
            },
            tech: ['HTML', 'CSS', 'JavaScript'],
            link: null,
            mockup: null,
        },
        {
            id: 'spacedash',
            title: 'SpaceDash: Alien Shooter',
            description: {
                id: 'Bagian dari seri Absolute Zero Mini Games: pemain membawa pesawat melawan gelombang alien di luar angkasa. Permainan menuntut kewaspadaan dan keputusan cepat untuk bertahan selama mungkin.',
                en: 'Part of the Absolute Zero Mini Games series: players take a ship into space against waves of aliens. It calls for alertness and quick decisions to survive as long as possible.',
            },
            tech: [],
            link: {
                label: 'github.com',
                url: 'https://github.com/DikiFaturrohman/absolute-zero-mini-games',
            },
            mockup: null,
        },
    ] satisfies Project[],
};

/** The filter tabs on the skills section. `all` plus one per group key. */
export type SkillKey = 'bahasa' | 'frontend' | 'backend' | 'game' | 'tools';

export const SKILL_FILTERS: readonly SkillKey[] = [
    'bahasa',
    'frontend',
    'backend',
    'game',
    'tools',
];

export const CAPABILITIES = {
    kicker: { id: 'Kemampuan', en: 'Skills' },
    title: { id: 'Perkakas Yang Saya Pakai', en: 'Tools I Work With' },
    lead: {
        id: 'Teknologi, pustaka, dan lingkungan pengembangan yang sering saya gunakan.',
        en: 'The technology, libraries, and development environments I reach for most.',
    } satisfies Localized,
    groups: [
        {
            key: 'bahasa',
            label: { id: 'Bahasa Pemrograman', en: 'Programming languages' },
            items: ['PHP', 'JavaScript', 'Kotlin', 'Java', 'C#', 'Python'],
        },
        {
            key: 'frontend',
            label: { id: 'Frontend', en: 'Frontend' },
            items: [
                'HTML',
                'CSS',
                'JavaScript',
                'React.js',
                'Bootstrap',
                'Tailwind CSS',
            ],
        },
        {
            key: 'backend',
            label: { id: 'Backend', en: 'Backend' },
            items: ['PHP Native', 'Laravel', 'RESTful API'],
        },
        {
            key: 'frontend',
            label: { id: 'Mobile', en: 'Mobile' },
            items: ['Kotlin', 'Android', 'XML layouts'],
        },
        {
            key: 'game',
            label: { id: 'Game Development', en: 'Game development' },
            items: ['Unity', 'Godot', 'Scratch', 'Adobe Animate'],
        },
        {
            key: 'backend',
            label: { id: 'Database', en: 'Database' },
            items: ['MySQL'],
        },
        {
            key: 'tools',
            label: { id: 'Perkakas Harian', en: 'Everyday tools' },
            items: [
                'Git',
                'GitHub',
                'VS Code',
                'Figma',
                'Canva',
                'Microsoft Office',
            ],
        },
    ] satisfies { key: SkillKey; label: Localized; items: string[] }[],
};

/** Verifiable only: the two certifications on the CV and the current GPA. */
export type AchievementKind = 'certification' | 'academic';

export const ACHIEVEMENTS = {
    kicker: { id: 'Pencapaian', en: 'Awards' },
    title: {
        id: 'Sertifikasi dan Pencapaian',
        en: 'Certifications and Achievements',
    },
    lead: {
        id: 'Sertifikasi resmi dan capaian akademik yang bisa diverifikasi.',
        en: 'Formal certifications and academic results that can be verified.',
    },
    labels: {
        certification: { id: 'Sertifikasi', en: 'Certification' },
        academic: { id: 'Akademik', en: 'Academic' },
    } satisfies Record<AchievementKind, Localized>,
    items: [
        {
            kind: 'certification',
            title: { id: 'TOEFL PBT 467', en: 'TOEFL PBT 467' },
            issuer: 'Universitas Pasundan',
            period: { id: '2024', en: '2024' },
        },
        {
            kind: 'certification',
            title: { id: 'Introduction to Java', en: 'Introduction to Java' },
            issuer: 'Sololearn',
            period: { id: '2023', en: '2023' },
        },
        {
            kind: 'academic',
            title: { id: 'IPK 3.48 / 4.00', en: 'GPA 3.48 / 4.00' },
            issuer: 'Universitas Pasundan',
            period: { id: '2022 - Sekarang', en: '2022 - Present' },
        },
    ] satisfies {
        kind: AchievementKind;
        title: Localized;
        issuer: string;
        period: Localized;
    }[],
};

/**
 * Coding activity. The chart is the live public contribution calendar for
 * PROFILE.githubUser, so nothing here is a stored number that can go stale.
 * ponytail: a keyless third party image. Swap for the GitHub GraphQL API with a
 * token when exact counts (commits, PRs, streaks) are wanted.
 */
export const ACTIVITY = {
    kicker: { id: 'Aktivitas Coding', en: 'Coding activity' },
    title: { id: 'Jejak di GitHub', en: 'Trace on GitHub' },
    lead: {
        id: 'Kalender kontribusi publik akun GitHub saya, dimuat langsung dari alur pengerjaan kode.',
        en: 'The public contribution calendar of my GitHub account, loaded straight from the code trail.',
    } satisfies Localized,
    chartUrl: `https://ghchart.rshah.org/${PROFILE.githubUser}`,
    chartAlt: {
        id: `Kalender kontribusi GitHub ${PROFILE.githubUser}`,
        en: `GitHub contribution calendar for ${PROFILE.githubUser}`,
    } satisfies Localized,
    unavailable: {
        id: 'Kalender sedang tidak bisa dimuat. Buka profil GitHub untuk melihat aktivitas terbaru.',
        en: 'The calendar could not be loaded. Open the GitHub profile to see recent activity.',
    } satisfies Localized,
    profileLabel: {
        id: 'Buka profil GitHub',
        en: 'Open the GitHub profile',
    } satisfies Localized,
    less: { id: 'Kurang', en: 'Less' } satisfies Localized,
    more: { id: 'Banyak', en: 'More' } satisfies Localized,
};

export const JOURNEY = {
    kicker: { id: 'Pengalaman', en: 'Experience' },
    title: { id: 'Perjalanan Sejauh Ini', en: 'The Road So Far' },
    workLabel: { id: 'Pengalaman Kerja', en: 'Work experience' },
    educationLabel: { id: 'Pendidikan Formal', en: 'Formal education' },
    gpaLabel: { id: 'Indeks Prestasi Kumulatif', en: 'Cumulative GPA' },
    /** The stack tags under the work entry. */
    tags: ['Laravel', 'PHP', 'MySQL', 'Smart Desa'],
    items: [
        {
            role: 'Web Developer',
            org: 'Dinas Komunikasi dan Informatika Kabupaten Subang',
            kind: { id: 'Magang / Proyek', en: 'Internship / Project' },
            period: null,
            points: [
                {
                    id: 'Membangun portal informasi dinas untuk mendukung penyampaian informasi kepada masyarakat.',
                    en: 'Built the office information portal that publishes information to the public.',
                },
                {
                    id: 'Mengembangkan modul layanan administrasi surat pada Website Smart Desa agar pengelolaan dan pelayanan surat berjalan digital.',
                    en: 'Developed the letter administration module on the Smart Desa website to digitise letter handling.',
                },
                {
                    id: 'Menerapkan aplikasi menggunakan Laravel, PHP, dan MySQL.',
                    en: 'Implemented the applications with Laravel, PHP, and MySQL.',
                },
            ],
        },
    ] satisfies {
        role: string;
        org: string;
        kind: Localized;
        period: Localized | null;
        points: Localized[];
    }[],
    education: {
        role: {
            id: 'S1 Teknik Informatika',
            en: 'BSc Informatics Engineering',
        },
        org: 'Universitas Pasundan',
        period: { id: '2022 - Sekarang', en: '2022 - Present' },
        note: { id: 'IPK 3.48/4.00', en: 'GPA 3.48/4.00' },
        body: {
            id: 'Mempelajari fondasi rekayasa perangkat lunak, algoritma, struktur data, arsitektur basis data relasional, pemrograman berorientasi objek, serta pengembangan sistem berbasis web dan game interaktif.',
            en: 'Coursework in software engineering foundations, algorithms, data structures, relational database architecture, object oriented programming, and the development of web and interactive game systems.',
        } satisfies Localized,
    },
};

export const CONTACT = {
    kicker: { id: 'Kontak', en: 'Contact' },
    title: {
        id: 'Mari Bangun Sesuatu',
        en: "Let's Build Something",
    },
    lead: {
        id: 'Terbuka untuk magang, kerja sama proyek, dan posisi penuh waktu di bidang web atau game development. Ceritakan proyek atau ide yang sedang Anda kerjakan, saya senang mendiskusikannya.',
        en: 'Open to internships, project work, and full time roles in web or game development. Tell me about the project or idea you are working on, and I would be glad to talk it through.',
    },
    labels: {
        email: { id: 'Email', en: 'Email' },
        phone: { id: 'Telepon / WhatsApp', en: 'Phone / WhatsApp' },
        location: { id: 'Lokasi', en: 'Location' },
        github: { id: 'GitHub', en: 'GitHub' },
    },
    boxTitle: {
        id: 'Siap untuk memulai kolaborasi?',
        en: 'Ready to start something together?',
    } satisfies Localized,
    boxLead: {
        id: 'Kirim pesan langsung melalui email atau salin kontak untuk memulai percakapan cepat.',
        en: 'Send a message straight to my inbox, or copy the address to start a quick conversation.',
    } satisfies Localized,
    mailto: {
        id: `mailto:${PROFILE.email}?subject=Pertanyaan%20proyek`,
        en: `mailto:${PROFILE.email}?subject=Project%20inquiry`,
    } satisfies Localized,
};

export const FOOTER = {
    credit: {
        id: 'Dibuat dengan pendekatan modern • Laravel, Tailwind CSS, & Responsive Design.',
        en: 'Built the modern way • Laravel, Tailwind CSS, & Responsive Design.',
    },
};
