// Skill Categories
export const skillCategories = [
  { id: 1, name: 'Programming', icon: '💻', color: 'primary' },
  { id: 2, name: 'Design', icon: '🎨', color: 'success' },
  { id: 3, name: 'Cooking', icon: '👨‍🍳', color: 'warning' },
  { id: 4, name: 'Music', icon: '🎵', color: 'secondary' },
  { id: 5, name: 'Languages', icon: '🗣️', color: 'primary' },
  { id: 6, name: 'Fitness', icon: '💪', color: 'success' },
  { id: 7, name: 'Photography', icon: '📸', color: 'secondary' },
  { id: 8, name: 'Writing', icon: '✍️', color: 'warning' },
  { id: 9, name: 'Business', icon: '💼', color: 'primary' },
  { id: 10, name: 'Crafts', icon: '🧶', color: 'success' },
];

// Popular Skills
export const popularSkills = [
  'JavaScript', 'React', 'Python', 'Photoshop', 'Illustrator', 'Cooking', 'Guitar', 'Spanish', 'French', 'Yoga', 'Photography', 'Content Writing', 'Excel', 'PowerPoint', 'Knitting', 'Woodworking', 'Piano', 'Singing', 'Dancing', 'Swimming', 'Running', 'Weight Training', 'Meditation', 'Mindfulness', 'Public Speaking', 'Project Management', 'Data Analysis', 'UI/UX Design', 'Graphic Design', 'Video Editing'
];

// Mock Users
export const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    location: 'New York, NY',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['JavaScript', 'React', 'UI/UX Design', 'Content Writing'],
    skillsWanted: ['Cooking', 'Photography', 'Spanish'],
    availability: ['weekends', 'evenings'],
    isPublic: true,
    rating: 4.8,
    totalSwaps: 12,
    joinDate: '2023-01-15',
    bio: 'Frontend developer passionate about creating beautiful user experiences. Love learning new skills and meeting creative people!',
    isVerified: true,
    isAdmin: false
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    location: 'San Francisco, CA',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Python', 'Data Analysis', 'Excel', 'Public Speaking'],
    skillsWanted: ['Guitar', 'Cooking', 'Photography'],
    availability: ['weekdays', 'evenings'],
    isPublic: true,
    rating: 4.6,
    totalSwaps: 8,
    joinDate: '2023-02-20',
    bio: 'Data scientist by day, aspiring musician by night. Always excited to learn new things and share knowledge!',
    isVerified: true,
    isAdmin: false
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@email.com',
    location: 'Los Angeles, CA',
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Spanish', 'Cooking', 'Photography', 'Yoga'],
    skillsWanted: ['JavaScript', 'Graphic Design', 'Piano'],
    availability: ['weekends', 'mornings'],
    isPublic: true,
    rating: 4.9,
    totalSwaps: 15,
    joinDate: '2022-11-10',
    bio: 'Multilingual teacher and food enthusiast. Love sharing my culture through cooking and language!',
    isVerified: true,
    isAdmin: false
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@email.com',
    location: 'Seattle, WA',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Guitar', 'Piano', 'Music Production', 'Korean'],
    skillsWanted: ['Web Development', 'Fitness Training', 'Cooking'],
    availability: ['weekends', 'evenings'],
    isPublic: true,
    rating: 4.7,
    totalSwaps: 10,
    joinDate: '2023-03-05',
    bio: 'Professional musician and music producer. Passionate about teaching music and learning new skills!',
    isVerified: true,
    isAdmin: false
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    location: 'Chicago, IL',
    profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Graphic Design', 'Illustrator', 'Knitting', 'Crafts'],
    skillsWanted: ['Python', 'Photography', 'Meditation'],
    availability: ['weekdays', 'weekends'],
    isPublic: true,
    rating: 4.5,
    totalSwaps: 6,
    joinDate: '2023-04-12',
    bio: 'Creative designer and craft enthusiast. Love making things with my hands and learning new creative skills!',
    isVerified: false,
    isAdmin: false
  },
  {
    id: 6,
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    location: 'Austin, TX',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Fitness Training', 'Running', 'Nutrition', 'Meditation'],
    skillsWanted: ['Guitar', 'Spanish', 'Cooking'],
    availability: ['mornings', 'weekends'],
    isPublic: true,
    rating: 4.8,
    totalSwaps: 14,
    joinDate: '2022-12-03',
    bio: 'Personal trainer and wellness coach. Passionate about helping others achieve their fitness goals!',
    isVerified: true,
    isAdmin: false
  },
  {
    id: 7,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    location: 'Miami, FL',
    profilePhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Spanish', 'Cooking', 'Dancing', 'Salsa'],
    skillsWanted: ['Web Development', 'Photography', 'Yoga'],
    availability: ['evenings', 'weekends'],
    isPublic: true,
    rating: 4.6,
    totalSwaps: 9,
    joinDate: '2023-01-28',
    bio: 'Dance instructor and cooking enthusiast. Love sharing Latin culture through dance and food!',
    isVerified: true,
    isAdmin: false
  },
  {
    id: 8,
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    location: 'Denver, CO',
    profilePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Photography', 'Video Editing', 'Hiking', 'Outdoor Skills'],
    skillsWanted: ['JavaScript', 'Cooking', 'Guitar'],
    availability: ['weekends', 'mornings'],
    isPublic: true,
    rating: 4.4,
    totalSwaps: 7,
    joinDate: '2023-02-14',
    bio: 'Outdoor photographer and adventure enthusiast. Love capturing nature and learning new skills!',
    isVerified: false,
    isAdmin: false
  },
  {
    id: 9,
    name: 'Sophie Brown',
    email: 'sophie.brown@email.com',
    location: 'Portland, OR',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Content Writing', 'Blogging', 'Social Media', 'French'],
    skillsWanted: ['Graphic Design', 'Photography', 'Cooking'],
    availability: ['weekdays', 'evenings'],
    isPublic: true,
    rating: 4.7,
    totalSwaps: 11,
    joinDate: '2023-03-18',
    bio: 'Content creator and writer. Passionate about storytelling and connecting with people through words!',
    isVerified: true,
    isAdmin: false
  },
  {
    id: 10,
    name: 'Admin User',
    email: 'admin@skillswap.com',
    location: 'San Francisco, CA',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skillsOffered: ['Project Management', 'Data Analysis', 'Public Speaking'],
    skillsWanted: ['Cooking', 'Photography', 'Guitar'],
    availability: ['weekdays', 'evenings'],
    isPublic: true,
    rating: 4.9,
    totalSwaps: 20,
    joinDate: '2022-01-01',
    bio: 'Platform administrator and community manager. Dedicated to building a thriving skill-sharing community!',
    isVerified: true,
    isAdmin: true
  }
];

// Mock Swap Requests
export const mockSwapRequests = [
  {
    id: 1,
    fromUserId: 2,
    toUserId: 1,
    fromUser: mockUsers[1],
    toUser: mockUsers[0],
    skillOffered: 'Python',
    skillWanted: 'JavaScript',
    message: 'I\'d love to learn JavaScript for web development. I can teach you Python in return!',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    fromUserId: 3,
    toUserId: 4,
    fromUser: mockUsers[2],
    toUser: mockUsers[3],
    skillOffered: 'Spanish',
    skillWanted: 'Guitar',
    message: 'I can help you with Spanish conversation and grammar. Would love to learn guitar basics!',
    status: 'accepted',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    completedAt: '2024-01-20T16:00:00Z',
    rating: 5,
    feedback: 'Amazing experience! Sarah is a great teacher and very patient.'
  },
  {
    id: 3,
    fromUserId: 5,
    toUserId: 6,
    fromUser: mockUsers[4],
    toUser: mockUsers[5],
    skillOffered: 'Graphic Design',
    skillWanted: 'Fitness Training',
    message: 'I can help you with logo design and branding. Looking to get into fitness!',
    status: 'rejected',
    createdAt: '2024-01-08T11:45:00Z',
    updatedAt: '2024-01-09T13:30:00Z',
    rejectionReason: 'Currently too busy with other commitments'
  },
  {
    id: 4,
    fromUserId: 7,
    toUserId: 8,
    fromUser: mockUsers[6],
    toUser: mockUsers[7],
    skillOffered: 'Cooking',
    skillWanted: 'Photography',
    message: 'I can teach you authentic Latin cooking. Would love to learn photography!',
    status: 'pending',
    createdAt: '2024-01-18T16:20:00Z',
    updatedAt: '2024-01-18T16:20:00Z'
  },
  {
    id: 5,
    fromUserId: 9,
    toUserId: 1,
    fromUser: mockUsers[8],
    toUser: mockUsers[0],
    skillOffered: 'Content Writing',
    skillWanted: 'UI/UX Design',
    message: 'I can help you with blog writing and content strategy. Looking to learn design basics!',
    status: 'accepted',
    createdAt: '2024-01-05T09:10:00Z',
    updatedAt: '2024-01-06T15:45:00Z',
    completedAt: '2024-01-15T14:30:00Z',
    rating: 4,
    feedback: 'Great session! Sophie is very knowledgeable about content strategy.'
  }
];

// Mock Notifications
export const mockNotifications = [
  {
    id: 1,
    userId: 1,
    type: 'swap_request',
    title: 'New Swap Request',
    message: 'Michael Chen wants to swap Python for JavaScript',
    isRead: false,
    createdAt: '2024-01-15T10:30:00Z',
    relatedId: 1
  },
  {
    id: 2,
    userId: 1,
    type: 'swap_accepted',
    title: 'Swap Accepted',
    message: 'Sophie Brown accepted your swap request',
    isRead: true,
    createdAt: '2024-01-06T15:45:00Z',
    relatedId: 5
  },
  {
    id: 3,
    userId: 1,
    type: 'rating_received',
    title: 'New Rating',
    message: 'You received a 5-star rating from Emma Rodriguez',
    isRead: false,
    createdAt: '2024-01-20T16:00:00Z',
    relatedId: 2
  }
];

// Mock Analytics Data
export const mockAnalytics = {
  totalUsers: 1250,
  totalSwaps: 3420,
  activeUsers: 890,
  averageRating: 4.7,
  topSkills: [
    { skill: 'JavaScript', count: 156 },
    { skill: 'Cooking', count: 142 },
    { skill: 'Photography', count: 128 },
    { skill: 'Spanish', count: 115 },
    { skill: 'Guitar', count: 98 }
  ],
  monthlyStats: [
    { month: 'Jan', users: 120, swaps: 45 },
    { month: 'Feb', users: 135, swaps: 52 },
    { month: 'Mar', users: 148, swaps: 61 },
    { month: 'Apr', users: 162, swaps: 68 },
    { month: 'May', users: 175, swaps: 74 },
    { month: 'Jun', users: 189, swaps: 81 }
  ]
}; 