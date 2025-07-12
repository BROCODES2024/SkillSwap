import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Star, 
  MessageSquare, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { mockUsers, mockSwapRequests, mockAnalytics } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingActions, setPendingActions] = useState([]);

  useEffect(() => {
    // Calculate statistics
    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.filter(user => user.totalSwaps > 0).length;
    const totalSwaps = mockSwapRequests.length;
    const completedSwaps = mockSwapRequests.filter(req => req.status === 'completed').length;
    const pendingSwaps = mockSwapRequests.filter(req => req.status === 'pending').length;
    const averageRating = mockUsers.reduce((acc, user) => acc + user.rating, 0) / mockUsers.length;

    setStats({
      totalUsers,
      activeUsers,
      totalSwaps,
      completedSwaps,
      pendingSwaps,
      averageRating: averageRating.toFixed(1)
    });

    // Get recent activity
    const recent = mockSwapRequests
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    setRecentActivity(recent);

    // Get pending actions
    const pending = [
      { id: 1, type: 'user_verification', title: 'New user verification requests', count: 3 },
      { id: 2, type: 'content_moderation', title: 'Content review needed', count: 7 },
      { id: 3, type: 'support_tickets', title: 'Support tickets', count: 12 }
    ];
    setPendingActions(pending);
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Swaps',
      value: stats.totalSwaps,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Avg Rating',
      value: stats.averageRating,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: '+0.2',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage users, verify accounts, and handle bans',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500'
    },
    {
      title: 'Analytics',
      description: 'View detailed platform analytics and reports',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-green-500'
    },
    {
      title: 'Content Moderation',
      description: 'Review and moderate user-generated content',
      icon: Shield,
      href: '/admin/moderation',
      color: 'bg-purple-500'
    },
    {
      title: 'Platform Settings',
      description: 'Configure platform settings and features',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Platform overview and management tools
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
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
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`h-4 w-4 ${
                        stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                      }`} />
                      <span className={`text-sm ml-1 ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.title}
                      to={action.href}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg"
                  >
                    <img
                      src={activity.fromUser?.profilePhoto}
                      alt={activity.fromUser?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.fromUser?.name} → {activity.toUser?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.skillOffered} ↔ {activity.skillWanted}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'success' : 'warning'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{action.title}</p>
                      <p className="text-xs text-gray-500">Requires attention</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="warning" size="sm">
                        {action.count}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Health */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Status</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Load</span>
                  <span className="text-sm font-medium">23%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUsers.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <img
                      src={user.profilePhoto}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Joined {formatDate(user.joinDate)}
                      </p>
                    </div>
                    {user.isVerified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full">
                    View All Users
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

export default AdminDashboardPage; 