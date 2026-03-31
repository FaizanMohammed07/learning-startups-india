// Sample course data - Replace with your actual data from database
export const courses = [
  {
    id: 1,
    slug: 'complete-web-development-bootcamp',
    title: 'Complete Web Development Bootcamp 2024',
    subtitle: 'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB',
    instructor: {
      name: 'Dr. Angela Yu',
      title: 'Lead Instructor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      bio: 'Developer and Lead Instructor with 10+ years of experience',
      students: 125000,
      courses: 12,
      rating: 4.8
    },
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg', // Sample video
    rating: 4.7,
    reviewsCount: 45234,
    studentsEnrolled: 125000,
    students: '125,000',
    duration: '52 hours',
    lectures: 380,
    level: 'All Levels',
    language: 'English',
    lastUpdated: 'October 2024',
    category: 'Web Development',
    bestseller: true,
    discount: 90,
    price: 499,
    originalPrice: 4999,
    tags: ['Web Development', 'JavaScript', 'React', 'Node.js', 'Full Stack'],
    description: `
      <p>Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer.</p>
      <p>With over 50 hours of HD video tutorials and building over 15 real-world projects, this is one of the most comprehensive web development courses available online.</p>
      <h3>What You'll Learn:</h3>
      <ul>
        <li>Build 15+ real-world web applications and websites</li>
        <li>Master front-end development with HTML5, CSS3, and JavaScript</li>
        <li>Learn modern frameworks like React and Node.js</li>
        <li>Understand databases with MongoDB and SQL</li>
        <li>Deploy your applications to production</li>
      </ul>
    `,
    whatYouWillLearn: [
      'Build fully-fledged websites and web apps for your startup or business',
      'Master frontend development with React and modern JavaScript',
      'Build backend APIs with Node.js and Express',
      'Learn professional developer best practices',
      'Build a portfolio of 15+ real-world projects',
      'Work with databases like MongoDB and PostgreSQL',
      'Master Git, GitHub and version control',
      'Deploy your applications to the cloud'
    ],
    requirements: [
      'No programming experience needed - I\'ll teach you everything you need to know',
      'A computer with access to the internet',
      'No paid software required - all tools used are free',
      'Willingness to learn and practice coding'
    ],
    targetAudience: [
      'Anyone who wants to learn to code and build websites',
      'Entrepreneurs looking to build their own startup',
      'Students who want to learn web development',
      'Anyone looking to switch careers into tech'
    ],
    modules: [
      {
        id: 1,
        title: 'Introduction to Web Development',
        lectures: 12,
        duration: '1h 30m',
        lessons: [
          { id: 1, title: 'Welcome to the Course', duration: '5:23', type: 'video', preview: true },
          { id: 2, title: 'How the Internet Works', duration: '8:45', type: 'video', preview: true },
          { id: 3, title: 'Setting Up Your Development Environment', duration: '12:30', type: 'video', preview: false },
          { id: 4, title: 'Your First HTML Page', duration: '15:20', type: 'video', preview: false },
          { id: 5, title: 'HTML Elements and Structure', duration: '18:45', type: 'video', preview: false },
          { id: 6, title: 'Quiz: HTML Basics', duration: '10 questions', type: 'quiz', preview: false }
        ]
      },
      {
        id: 2,
        title: 'HTML5 - The Foundation',
        lectures: 25,
        duration: '3h 45m',
        lessons: [
          { id: 1, title: 'HTML5 Semantic Elements', duration: '12:30', type: 'video', preview: false },
          { id: 2, title: 'Forms and Input Types', duration: '18:45', type: 'video', preview: false },
          { id: 3, title: 'HTML5 Media Elements', duration: '15:20', type: 'video', preview: false },
          { id: 4, title: 'Building Your First Website', duration: '25:30', type: 'video', preview: false },
          { id: 5, title: 'Project: Personal Portfolio', duration: '45:00', type: 'project', preview: false }
        ]
      },
      {
        id: 3,
        title: 'CSS3 - Styling Your Websites',
        lectures: 35,
        duration: '5h 20m',
        lessons: [
          { id: 1, title: 'CSS Basics and Selectors', duration: '14:30', type: 'video', preview: false },
          { id: 2, title: 'The Box Model', duration: '16:45', type: 'video', preview: false },
          { id: 3, title: 'Flexbox Layout', duration: '22:30', type: 'video', preview: false },
          { id: 4, title: 'CSS Grid', duration: '28:15', type: 'video', preview: false },
          { id: 5, title: 'Responsive Design', duration: '20:30', type: 'video', preview: false },
          { id: 6, title: 'CSS Animations', duration: '18:45', type: 'video', preview: false }
        ]
      },
      {
        id: 4,
        title: 'JavaScript - Programming Fundamentals',
        lectures: 45,
        duration: '7h 30m',
        lessons: [
          { id: 1, title: 'JavaScript Basics', duration: '15:30', type: 'video', preview: false },
          { id: 2, title: 'Variables and Data Types', duration: '18:45', type: 'video', preview: false },
          { id: 3, title: 'Functions and Scope', duration: '22:30', type: 'video', preview: false },
          { id: 4, title: 'Arrays and Objects', duration: '25:15', type: 'video', preview: false },
          { id: 5, title: 'DOM Manipulation', duration: '28:30', type: 'video', preview: false }
        ]
      },
      {
        id: 5,
        title: 'React - Modern Frontend Development',
        lectures: 50,
        duration: '8h 45m',
        lessons: [
          { id: 1, title: 'Introduction to React', duration: '12:30', type: 'video', preview: false },
          { id: 2, title: 'Components and Props', duration: '18:45', type: 'video', preview: false },
          { id: 3, title: 'State and Lifecycle', duration: '22:30', type: 'video', preview: false },
          { id: 4, title: 'Hooks in React', duration: '25:15', type: 'video', preview: false },
          { id: 5, title: 'Building a React App', duration: '45:00', type: 'project', preview: false }
        ]
      },
      {
        id: 6,
        title: 'Node.js and Express - Backend Development',
        lectures: 40,
        duration: '6h 30m',
        lessons: [
          { id: 1, title: 'Introduction to Node.js', duration: '15:30', type: 'video', preview: false },
          { id: 2, title: 'Express Framework', duration: '20:45', type: 'video', preview: false },
          { id: 3, title: 'RESTful APIs', duration: '25:30', type: 'video', preview: false },
          { id: 4, title: 'Authentication and Security', duration: '28:15', type: 'video', preview: false }
        ]
      },
      {
        id: 7,
        title: 'Databases - MongoDB and SQL',
        lectures: 30,
        duration: '5h 15m',
        lessons: [
          { id: 1, title: 'Introduction to Databases', duration: '12:30', type: 'video', preview: false },
          { id: 2, title: 'MongoDB Basics', duration: '18:45', type: 'video', preview: false },
          { id: 3, title: 'SQL and PostgreSQL', duration: '22:30', type: 'video', preview: false },
          { id: 4, title: 'Database Design', duration: '25:15', type: 'video', preview: false }
        ]
      },
      {
        id: 8,
        title: 'Final Projects and Deployment',
        lectures: 20,
        duration: '4h 30m',
        lessons: [
          { id: 1, title: 'Building a Full-Stack Application', duration: '60:00', type: 'project', preview: false },
          { id: 2, title: 'Deploying to Heroku', duration: '18:45', type: 'video', preview: false },
          { id: 3, title: 'Deploying to Netlify', duration: '15:30', type: 'video', preview: false },
          { id: 4, title: 'Course Completion and Next Steps', duration: '10:15', type: 'video', preview: false }
        ]
      }
    ],
    features: [
      { icon: '📱', text: 'Mobile-friendly content' },
      { icon: '🎓', text: 'Certificate of completion' },
      { icon: '♾️', text: 'Lifetime access' },
      { icon: '📝', text: '15+ coding exercises' },
      { icon: '🏆', text: 'Real-world projects' },
      { icon: '💬', text: 'Q&A support' }
    ],
    reviews: [
      {
        id: 1,
        user: 'Rahul Sharma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        rating: 5,
        date: '2 weeks ago',
        comment: 'This course is absolutely amazing! I went from zero coding knowledge to building my own web applications. The instructor explains everything clearly and the projects are very practical.'
      },
      {
        id: 2,
        user: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        rating: 5,
        date: '1 month ago',
        comment: 'Best investment I\'ve made in my career. Got a job as a junior developer within 3 months of completing this course. Highly recommended!'
      },
      {
        id: 3,
        user: 'Amit Kumar',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        rating: 4,
        date: '2 months ago',
        comment: 'Great course with comprehensive content. The only improvement would be to add more advanced topics, but overall excellent value for money.'
      }
    ]
  },
  {
    id: 2,
    slug: 'python-data-science-machine-learning',
    title: 'Python for Data Science and Machine Learning',
    subtitle: 'Learn Python, NumPy, Pandas, Matplotlib, Scikit-Learn, and TensorFlow',
    instructor: {
      name: 'Jose Portilla',
      title: 'Data Science Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Data Scientist and Instructor with expertise in Python and ML',
      students: 98000,
      courses: 8,
      rating: 4.9
    },
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
    price: 599,
    originalPrice: 5999,
    rating: 4.8,
    reviewsCount: 32145,
    studentsEnrolled: 98000,
    students: '98,000',
    duration: '45 hours',
    lectures: 320,
    level: 'Beginner to Advanced',
    language: 'English',
    lastUpdated: 'September 2024',
    category: 'Data Science',
    bestseller: false,
    discount: 90,
    tags: ['Python', 'Data Science', 'Machine Learning', 'AI'],
    description: `
      <p>Master Python for Data Science and Machine Learning with this comprehensive bootcamp.</p>
      <p>Learn to use NumPy, Pandas, Matplotlib, Scikit-Learn, and TensorFlow to build real-world projects.</p>
    `,
    whatYouWillLearn: [
      'Master Python programming from scratch',
      'Use NumPy for numerical computing',
      'Analyze data with Pandas',
      'Create visualizations with Matplotlib and Seaborn',
      'Build machine learning models with Scikit-Learn',
      'Deep learning with TensorFlow and Keras',
      'Work on real-world data science projects',
      'Deploy ML models to production'
    ],
    requirements: [
      'Basic computer skills',
      'No prior programming experience required',
      'Willingness to learn mathematics concepts'
    ],
    targetAudience: [
      'Anyone interested in Data Science',
      'Professionals looking to transition into AI/ML',
      'Students pursuing data-related careers'
    ],
    modules: [
      {
        id: 1,
        title: 'Python Basics',
        lectures: 20,
        duration: '3h 30m',
        lessons: [
          { id: 1, title: 'Introduction to Python', duration: '10:23', type: 'video', preview: true },
          { id: 2, title: 'Variables and Data Types', duration: '15:45', type: 'video', preview: true }
        ]
      },
      {
        id: 2,
        title: 'NumPy for Numerical Computing',
        lectures: 25,
        duration: '4h 15m',
        lessons: [
          { id: 1, title: 'NumPy Arrays', duration: '18:30', type: 'video', preview: false }
        ]
      }
    ],
    features: [
      { icon: '📊', text: 'Real datasets' },
      { icon: '🎓', text: 'Certificate included' },
      { icon: '♾️', text: 'Lifetime access' },
      { icon: '💻', text: 'Coding exercises' }
    ],
    reviews: []
  },
  {
    id: 3,
    slug: 'digital-marketing-masterclass',
    title: 'Complete Digital Marketing Masterclass',
    subtitle: 'SEO, Social Media, Email Marketing, and More',
    instructor: {
      name: 'Phil Ebiner',
      title: 'Marketing Expert',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      bio: 'Digital Marketing Consultant with 15+ years experience',
      students: 75000,
      courses: 15,
      rating: 4.7
    },
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    videoUrl: 'https://www.youtube.com/embed/nU-IIXBWlS4',
    price: 399,
    originalPrice: 3999,
    rating: 4.6,
    reviewsCount: 28456,
    studentsEnrolled: 75000,
    students: '75,000',
    duration: '38 hours',
    lectures: 280,
    level: 'All Levels',
    language: 'English',
    lastUpdated: 'October 2024',
    category: 'Business',
    bestseller: false,
    discount: 90,
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing'],
    description: `
      <p>Master all aspects of digital marketing in this comprehensive course.</p>
    `,
    whatYouWillLearn: [
      'SEO and search engine marketing',
      'Social media marketing strategies',
      'Email marketing campaigns',
      'Content marketing and copywriting',
      'Google Analytics and data analysis',
      'Paid advertising (Google Ads, Facebook Ads)'
    ],
    requirements: [
      'Basic computer and internet skills',
      'No prior marketing experience needed'
    ],
    targetAudience: [
      'Entrepreneurs and business owners',
      'Marketing professionals',
      'Anyone wanting to start a marketing career'
    ],
    modules: [
      {
        id: 1,
        title: 'Introduction to Digital Marketing',
        lectures: 15,
        duration: '2h 30m',
        lessons: [
          { id: 1, title: 'What is Digital Marketing?', duration: '12:23', type: 'video', preview: true }
        ]
      }
    ],
    features: [
      { icon: '📈', text: 'Marketing templates' },
      { icon: '🎓', text: 'Certificate' },
      { icon: '♾️', text: 'Lifetime access' }
    ],
    reviews: []
  },
  {
    id: 3,
    slug: 'react-complete-guide',
    title: 'React - The Complete Guide 2024',
    subtitle: 'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!',
    instructor: {
      name: 'Maximilian Schwarzmüller',
      title: 'React Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Professional Web Developer and Instructor',
      students: 89000,
      courses: 8,
      rating: 4.9
    },
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    rating: 4.8,
    reviewsCount: 32145,
    studentsEnrolled: 89000,
    students: '89,000',
    duration: '48 hours',
    lectures: 490,
    level: 'Beginner',
    language: 'English',
    lastUpdated: 'November 2024',
    category: 'Web Development',
    bestseller: true,
    discount: 85,
    price: 599,
    originalPrice: 3999,
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'Redux'],
    description: 'Master React.js and build amazing user interfaces with this comprehensive course.',
    whatYouWillLearn: [
      'Build powerful, fast, user-friendly and reactive web apps',
      'Provide amazing user experiences by leveraging the power of JavaScript',
      'Apply for high-paid jobs or work as a freelancer in one the most-demanded sectors',
      'Learn all about React Hooks and React Components'
    ],
    sections: [
      {
        id: 1,
        title: 'Getting Started',
        lectures: 12,
        duration: '1h 45m',
        lessons: [
          { id: 1, title: 'What is React?', duration: '8:30', type: 'video', preview: true },
          { id: 2, title: 'Setting up React', duration: '12:45', type: 'video', preview: false }
        ]
      }
    ],
    features: [
      { icon: '⚛️', text: 'React 18 features' },
      { icon: '🎓', text: 'Certificate of completion' },
      { icon: '♾️', text: 'Lifetime access' },
      { icon: '📱', text: 'Mobile-friendly' }
    ],
    reviews: []
  },
  {
    id: 4,
    slug: 'python-data-science',
    title: 'Python for Data Science and Machine Learning',
    subtitle: 'Learn how to use NumPy, Pandas, Seaborn , Matplotlib , Plotly , Scikit-Learn , Machine Learning, Tensorflow',
    instructor: {
      name: 'Jose Portilla',
      title: 'Data Science Expert',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      bio: 'Head of Data Science at Pierian Data Inc.',
      students: 156000,
      courses: 15,
      rating: 4.7
    },
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    rating: 4.6,
    reviewsCount: 28934,
    studentsEnrolled: 156000,
    students: '156,000',
    duration: '25 hours',
    lectures: 165,
    level: 'Intermediate',
    language: 'English',
    lastUpdated: 'October 2024',
    category: 'Data Science',
    bestseller: false,
    discount: 75,
    price: 799,
    originalPrice: 3199,
    tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas', 'NumPy'],
    description: 'Learn how to use Python for Data Science and Machine Learning with this comprehensive bootcamp!',
    whatYouWillLearn: [
      'Use Python for Data Science and Machine Learning',
      'Use Spark for Big Data Analysis',
      'Implement Machine Learning Algorithms',
      'Learn to use NumPy for Numerical Data'
    ],
    sections: [],
    features: [
      { icon: '🐍', text: 'Python 3.9+' },
      { icon: '📊', text: 'Real datasets' },
      { icon: '🤖', text: 'ML algorithms' },
      { icon: '🎓', text: 'Certificate' }
    ],
    reviews: []
  },
  {
    id: 5,
    slug: 'flutter-mobile-development',
    title: 'Flutter & Dart - The Complete Guide',
    subtitle: 'A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps',
    instructor: {
      name: 'Academind by Maximilian',
      title: 'Mobile Development Expert',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'Professional Mobile App Developer',
      students: 67000,
      courses: 6,
      rating: 4.8
    },
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    rating: 4.7,
    reviewsCount: 15678,
    studentsEnrolled: 67000,
    students: '67,000',
    duration: '42 hours',
    lectures: 320,
    level: 'All Levels',
    language: 'English',
    lastUpdated: 'September 2024',
    category: 'Mobile Development',
    bestseller: false,
    discount: 80,
    price: 699,
    originalPrice: 3499,
    tags: ['Flutter', 'Dart', 'Mobile', 'iOS', 'Android'],
    description: 'Learn Flutter and Dart from the ground up, step-by-step',
    whatYouWillLearn: [
      'Build native iOS and Android apps with just one codebase',
      'Use features like Google Maps, the device camera, authentication and much more!',
      'Learn all the basics without any boring theory or unnecessary details',
      'Build engaging native mobile apps for both Android and iOS'
    ],
    sections: [],
    features: [
      { icon: '📱', text: 'Cross-platform' },
      { icon: '🎯', text: 'Native performance' },
      { icon: '🔥', text: 'Hot reload' },
      { icon: '🎓', text: 'Certificate' }
    ],
    reviews: []
  },
  {
    id: 6,
    slug: 'ui-ux-design-masterclass',
    title: 'UI/UX Design Masterclass',
    subtitle: 'Learn User Interface Design and User Experience Design from scratch with Figma, Adobe XD',
    instructor: {
      name: 'Daniel Walter Scott',
      title: 'UX/UI Design Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Certified Adobe Expert & UX Designer',
      students: 45000,
      courses: 12,
      rating: 4.9
    },
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    rating: 4.8,
    reviewsCount: 8934,
    studentsEnrolled: 45000,
    students: '45,000',
    duration: '32 hours',
    lectures: 180,
    level: 'Beginner',
    language: 'English',
    lastUpdated: 'November 2024',
    category: 'Design',
    bestseller: true,
    discount: 70,
    price: 899,
    originalPrice: 2999,
    tags: ['UI Design', 'UX Design', 'Figma', 'Adobe XD', 'Prototyping'],
    description: 'Complete UI/UX Design course with real-world projects and industry best practices',
    whatYouWillLearn: [
      'Design beautiful user interfaces for web and mobile',
      'Create user-centered designs that convert',
      'Master Figma and Adobe XD',
      'Build a professional design portfolio'
    ],
    sections: [],
    features: [
      { icon: '🎨', text: 'Design tools' },
      { icon: '📐', text: 'Wireframing' },
      { icon: '🔄', text: 'Prototyping' },
      { icon: '🎓', text: 'Certificate' }
    ],
    reviews: []
  }
];

// Helper function to get course by slug
export function getCourseBySlug(slug) {
  return courses.find(course => course.slug === slug);
}

// Helper function to get all courses
export function getAllCourses() {
  return courses;
}

// Helper function to get courses by category
export function getCoursesByCategory(category) {
  return courses.filter(course => course.category === category);
}
