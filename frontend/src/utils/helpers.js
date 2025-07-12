import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format date to readable string
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

// Format date for input fields
export function formatDateForInput(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

// Get initials from name
export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Generate random ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
export function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      length: password.length < minLength,
      uppercase: !hasUpperCase,
      lowercase: !hasLowerCase,
      numbers: !hasNumbers,
      special: !hasSpecialChar
    }
  };
}

// Filter users by search criteria
export function filterUsers(users, filters) {
  return users.filter(user => {
    // Search by name or skills
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = user.name.toLowerCase().includes(searchLower);
      const skillsMatch = [...user.skillsOffered, ...user.skillsWanted]
        .some(skill => skill.toLowerCase().includes(searchLower));
      
      if (!nameMatch && !skillsMatch) return false;
    }
    
    // Filter by location
    if (filters.location && user.location) {
      if (!user.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
    }
    
    // Filter by availability
    if (filters.availability && filters.availability.length > 0) {
      const hasMatchingAvailability = filters.availability.some(avail => 
        user.availability.includes(avail)
      );
      if (!hasMatchingAvailability) return false;
    }
    
    // Filter by skill category
    if (filters.category && filters.category !== 'all') {
      const categorySkills = getCategorySkills(filters.category);
      const hasCategorySkill = [...user.skillsOffered, ...user.skillsWanted]
        .some(skill => categorySkills.includes(skill));
      if (!hasCategorySkill) return false;
    }
    
    return true;
  });
}

// Get skills by category
export function getCategorySkills(category) {
  const categoryMap = {
    'Programming': ['JavaScript', 'React', 'Python', 'Java', 'C++', 'HTML', 'CSS', 'Node.js', 'SQL'],
    'Design': ['Photoshop', 'Illustrator', 'UI/UX Design', 'Graphic Design', 'Figma', 'Sketch'],
    'Cooking': ['Cooking', 'Baking', 'Meal Prep', 'Cuisine', 'Recipe Development'],
    'Music': ['Guitar', 'Piano', 'Singing', 'Music Production', 'Drums', 'Violin'],
    'Languages': ['Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Korean'],
    'Fitness': ['Yoga', 'Running', 'Weight Training', 'Swimming', 'Meditation', 'Nutrition'],
    'Photography': ['Photography', 'Video Editing', 'Photo Editing', 'Lightroom'],
    'Writing': ['Content Writing', 'Blogging', 'Copywriting', 'Creative Writing'],
    'Business': ['Project Management', 'Data Analysis', 'Public Speaking', 'Excel', 'PowerPoint'],
    'Crafts': ['Knitting', 'Woodworking', 'Painting', 'Drawing', 'Sewing', 'Pottery']
  };
  
  return categoryMap[category] || [];
}

// Sort users by different criteria
export function sortUsers(users, sortBy) {
  const sortedUsers = [...users];
  
  switch (sortBy) {
    case 'rating':
      return sortedUsers.sort((a, b) => b.rating - a.rating);
    case 'swaps':
      return sortedUsers.sort((a, b) => b.totalSwaps - a.totalSwaps);
    case 'name':
      return sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    case 'joinDate':
      return sortedUsers.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
    default:
      return sortedUsers;
  }
}

// Calculate average rating
export function calculateAverageRating(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

// Get status color for swap requests
export function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'error';
    case 'completed':
      return 'primary';
    default:
      return 'secondary';
  }
}

// Get status text for swap requests
export function getStatusText(status) {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'accepted':
      return 'Accepted';
    case 'rejected':
      return 'Rejected';
    case 'completed':
      return 'Completed';
    default:
      return 'Unknown';
  }
}

// Debounce function for search inputs
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// JWT token helpers (stored in memory, not localStorage)
let authToken = null;

export const tokenStorage = {
  get: () => authToken,
  set: (token) => {
    authToken = token;
  },
  remove: () => {
    authToken = null;
  }
}; 