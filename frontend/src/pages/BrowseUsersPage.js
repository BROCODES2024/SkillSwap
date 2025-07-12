import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  Star, 
  Users, 
  X,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { mockUsers, skillCategories } from '../data/mockData';
import { filterUsers, sortUsers, debounce } from '../utils/helpers';

const BrowseUsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    location: '',
    availability: []
  });
  const [sortBy, setSortBy] = useState('name');

  const availabilityOptions = [
    { id: 'weekdays', label: 'Weekdays' },
    { id: 'weekends', label: 'Weekends' },
    { id: 'mornings', label: 'Mornings' },
    { id: 'evenings', label: 'Evenings' }
  ];

  // Debounced search function
  const debouncedSearch = debounce((searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, 300);

  // Apply filters and sorting
  useEffect(() => {
    let result = filterUsers(users, filters);
    result = sortUsers(result, sortBy);
    setFilteredUsers(result);
  }, [users, filters, sortBy]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleAvailabilityToggle = (availability) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(availability)
        ? prev.availability.filter(a => a !== availability)
        : [...prev.availability, availability]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      location: '',
      availability: []
    });
  };

  const UserCard = ({ user }) => (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={user.profilePhoto}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-primary-600 rounded-full p-1">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {user.name}
              </h3>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{user.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{user.location}</span>
            </div>
            
            <div className="space-y-2">
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Skills Offered
                </h4>
                <div className="flex flex-wrap gap-1">
                  {user.skillsOffered.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="primary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                  {user.skillsOffered.length > 3 && (
                    <Badge variant="secondary" size="sm">
                      +{user.skillsOffered.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Skills Wanted
                </h4>
                <div className="flex flex-wrap gap-1">
                  {user.skillsWanted.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="success" size="sm">
                      {skill}
                    </Badge>
                  ))}
                  {user.skillsWanted.length > 3 && (
                    <Badge variant="secondary" size="sm">
                      +{user.skillsWanted.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>{user.totalSwaps} swaps</span>
              </div>
              
              <div className="flex space-x-2">
                <Link to={`/profile/${user.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
                <Button size="sm">
                  Send Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const UserListItem = ({ user }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.profilePhoto}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-primary-600 rounded-full p-1">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user.location}</span>
                  <span className="mx-2">•</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{user.rating} ({user.totalSwaps} swaps)</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link to={`/profile/${user.id}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
                <Button size="sm">
                  Send Request
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-3">
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Skills Offered:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skillsOffered.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="primary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Skills Wanted:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skillsWanted.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="success" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Users</h1>
        <p className="text-gray-600 mt-2">
          Find people to swap skills with
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search by name or skills..."
              leftIcon={Search}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="ml-2"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full input"
                >
                  <option value="all">All Categories</option>
                  {skillCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Input
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full input"
                >
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                  <option value="swaps">Total Swaps</option>
                  <option value="joinDate">Join Date</option>
                </select>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAvailabilityToggle(option.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filters.availability.includes(option.id)
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {filteredUsers.length} users found
              </div>
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredUsers.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredUsers.map((user) => (
            viewMode === 'grid' ? (
              <UserCard key={user.id} user={user} />
            ) : (
              <UserListItem key={user.id} user={user} />
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
          <div className="mt-6">
            <Button onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseUsersPage; 