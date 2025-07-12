import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Clock, 
  Star, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Award,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockUsers, mockSwapRequests, mockNotifications } from '../data/mockData';
import { formatDate, getStatusColor, getStatusText } from '../utils/helpers';

const DashboardPage = () => {
  const { user } = useAuth();
  const [recentRequests, setRecentRequests] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Get user's recent swap requests
    const userRequests = mockSwapRequests.filter(
      request => request.fromUserId === user?.id || request.toUserId === user?.id
    ).slice(0, 5);
    setRecentRequests(userRequests);

    // Get suggested users based on skills
    const suggestions = mockUsers
      .filter(u => u.id !== user?.id)
      .filter(u => {
        const hasMatchingSkills = u.skillsOffered.some(skill => 
          user?.skillsWanted.includes(skill)
        );
        return hasMatchingSkills;
      })
      .slice(0, 6);
    setSuggestedUsers(suggestions);

    // Get user's notifications
    const userNotifications = mockNotifications.filter(
      notification => notification.userId === user?.id
    ).slice(0, 5);
    setNotifications(userNotifications);
  }, [user]);

  const stats = [
    {
      title: 'Total Swaps',
      value: user?.totalSwaps || 0,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Average Rating',
      value: user?.rating || 0,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Pending Requests',
      value: recentRequests.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Active Connections',
      value: suggestedUsers.length,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your skill swaps today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Swap Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {recentRequests.length > 0 ? (
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.fromUserId === user?.id ? request.toUser?.profilePhoto : request.fromUser?.profilePhoto}
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {request.fromUserId === user?.id ? request.toUser?.name : request.fromUser?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {request.skillOffered} ↔ {request.skillWanted}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(request.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                        <Link
                          to={`/profile/${request.fromUserId === user?.id ? request.toUserId : request.fromUserId}`}
                        >
                          <Button variant="ghost" size="sm">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by browsing users and sending swap requests.
                  </p>
                  <div className="mt-6">
                    <Link to="/browse">
                      <Button>Browse Users</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.location}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {user?.rating} ({user?.totalSwaps} swaps)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Offered</h4>
                  <div className="flex flex-wrap gap-1">
                    {user?.skillsOffered?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="primary" size="sm">
                        {skill}
                      </Badge>
                    ))}
                    {user?.skillsOffered?.length > 3 && (
                      <Badge variant="secondary" size="sm">
                        +{user.skillsOffered.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Wanted</h4>
                  <div className="flex flex-wrap gap-1">
                    {user?.skillsWanted?.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="success" size="sm">
                        {skill}
                      </Badge>
                    ))}
                    {user?.skillsWanted?.length > 3 && (
                      <Badge variant="secondary" size="sm">
                        +{user.skillsWanted.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Link to="/profile/edit">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Users */}
          <Card>
            <CardHeader>
              <CardTitle>People You Might Like</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedUsers.map((suggestedUser) => (
                  <div
                    key={suggestedUser.id}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={suggestedUser.profilePhoto}
                      alt={suggestedUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {suggestedUser.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {suggestedUser.location}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">
                          {suggestedUser.rating}
                        </span>
                      </div>
                    </div>
                    <Link to={`/profile/${suggestedUser.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Link to="/browse">
                  <Button variant="outline" className="w-full">
                    Browse All Users
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/browse">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Find Skill Partners
                  </Button>
                </Link>
                <Link to="/swap-requests">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Swap Requests
                  </Button>
                </Link>
                <Link to="/profile/edit">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    Update Skills
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 