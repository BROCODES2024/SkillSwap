# Skill Swap Platform

A modern web application that enables users to exchange skills with others in their community. Share what you know, learn what you need!

## 🎯 Problem Statement

In today's interconnected world, everyone has unique skills and knowledge to share, but finding the right person to learn from or teach can be challenging. Traditional learning platforms often require monetary transactions, creating barriers for skill exchange. Our Skill Swap Platform solves this by creating a community-driven ecosystem where users can:

- **Connect** with others who have complementary skills
- **Exchange** knowledge without financial barriers
- **Build** meaningful relationships through skill sharing
- **Grow** their expertise through mutual learning

## ✨ Features

### User Features
- **Profile Management**
  - Basic info: Name, location (optional), profile photo (optional)
  - List of skills offered and wanted
  - Availability settings (weekends, evenings, etc.)
  - Public/private profile toggle

- **Skill Discovery**
  - Browse users by skill categories
  - Search functionality (e.g., "Photoshop", "Excel", "Cooking")
  - Filter by location and availability

- **Swap Management**
  - Send and receive swap requests
  - Accept or reject swap offers
  - View current and pending swap requests
  - Delete pending requests if not accepted
  - Rate and provide feedback after completed swaps

### Admin Features
- **Content Moderation**
  - Review and reject inappropriate skill descriptions
  - Ban users who violate platform policies
  - Monitor platform activity

- **Analytics & Reporting**
  - Monitor pending, accepted, and cancelled swaps
  - Download user activity reports
  - View feedback logs and swap statistics

- **Communication**
  - Send platform-wide messages
  - Feature updates and downtime alerts

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization

### Additional Tools
- **Git** - Version control
- **Docker** - Containerization
- **Postman** - API testing
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skill-swap-platform.git
   cd skill-swap-platform
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend environment variables
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB service
   mongod
   ```

5. **Run the application**
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend development server
   cd frontend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
skill-swap-platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript type definitions
│   └── public/             # Static assets
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── config/             # Configuration files
├── docs/                   # Documentation
└── README.md              # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/search` - Search users by skills

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Swap Requests
- `POST /api/swaps/request` - Create swap request
- `GET /api/swaps/pending` - Get pending requests
- `PUT /api/swaps/:id/accept` - Accept swap request
- `PUT /api/swaps/:id/reject` - Reject swap request
- `DELETE /api/swaps/:id` - Delete swap request

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/ban` - Ban user
- `POST /api/admin/messages` - Send platform message
- `GET /api/admin/reports` - Download reports

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run all tests
npm run test:all
```

## 📦 Deployment

### Using Docker
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
```bash
# Build frontend for production
cd frontend
npm run build

# Start production server
cd backend
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead** - [Your Name]
- **Frontend Developer** - [Team Member]
- **Backend Developer** - [Team Member]
- **UI/UX Designer** - [Team Member]

## 📞 Support

- **Email**: support@skillswapplatform.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/skill-swap-platform/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/skill-swap-platform/wiki)

## 🗺️ Roadmap

### Phase 1 (MVP) ✅
- [x] User authentication and profiles
- [x] Basic skill listing and search
- [x] Swap request functionality
- [x] Admin dashboard

### Phase 2 (Enhancement) 🚧
- [ ] Real-time messaging
- [ ] Video call integration
- [ ] Skill verification system
- [ ] Advanced search filters

### Phase 3 (Advanced Features) 📋
- [ ] Mobile application
- [ ] AI-powered skill matching
- [ ] Community forums
- [ ] Certification system

---

**Made with ❤️ by the Skill Swap Platform Team** 