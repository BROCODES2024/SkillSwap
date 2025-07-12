import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Calendar,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const AdminAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalUsers: 1247,
      activeUsers: 892,
      totalSwaps: 3456,
      completedSwaps: 2891,
      pendingSwaps: 565,
      successRate: 83.7
    },
    trends: {
      userGrowth: [
        { month: 'Jan', users: 120, swaps: 89 },
        { month: 'Feb', users: 145, swaps: 112 },
        { month: 'Mar', users: 178, swaps: 156 },
        { month: 'Apr', users: 203, swaps: 189 },
        { month: 'May', users: 245, swaps: 234 },
        { month: 'Jun', users: 289, swaps: 278 }
      ]
    },
    topSkills: [
      { skill: 'JavaScript', requests: 156, successRate: 89 },
      { skill: 'Python', requests: 134, successRate: 92 },
      { skill: 'Graphic Design', requests: 123, successRate: 85 },
      { skill: 'Cooking', requests: 98, successRate: 78 },
      { skill: 'Photography', requests: 87, successRate: 82 }
    ],
    topCategories: [
      { category: 'Technology', swaps: 456, growth: 12.5 },
      { category: 'Creative Arts', swaps: 389, growth: 8.3 },
      { category: 'Language', swaps: 234, growth: 15.7 },
      { category: 'Fitness', swaps: 198, growth: 6.2 },
      { category: 'Cooking', swaps: 167, growth: 9.8 }
    ]
  };

  const exportReport = () => {
    // Mock export functionality
    console.log('Exporting analytics report...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform performance and user insights</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <Button onClick={exportReport} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+8.3% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalSwaps.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+15.7% from last month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.successRate}%</p>
                <p className="text-xs text-green-600 mt-1">+2.1% from last month</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analyticsData.trends.userGrowth.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="w-8 bg-blue-500 rounded-t" style={{ height: `${(data.users / 300) * 200}px` }}></div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Monthly user registration and swap activity
            </div>
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Most Requested Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                    <Badge variant="secondary">{skill.requests} requests</Badge>
                  </div>
                  <span className="text-sm text-green-600">{skill.successRate}% success</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Total Swaps</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Growth</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topCategories.map((category, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{category.category}</td>
                    <td className="py-3 px-4 text-gray-600">{category.swaps.toLocaleString()}</td>
                    <td className="py-3 px-4 text-green-600">+{category.growth}%</td>
                    <td className="py-3 px-4">
                      <Badge variant={category.growth > 10 ? "success" : "secondary"}>
                        {category.growth > 10 ? "High Growth" : "Stable"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Platform Activity</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New user registered", user: "john.doe@example.com", time: "2 minutes ago", type: "registration" },
              { action: "Swap request completed", user: "sarah.smith@example.com", time: "15 minutes ago", type: "swap" },
              { action: "Skill category added", user: "admin", time: "1 hour ago", type: "admin" },
              { action: "User profile updated", user: "mike.wilson@example.com", time: "2 hours ago", type: "profile" },
              { action: "Swap request sent", user: "emma.brown@example.com", time: "3 hours ago", type: "swap" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'registration' ? 'bg-blue-500' :
                    activity.type === 'swap' ? 'bg-green-500' :
                    activity.type === 'admin' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">by {activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalyticsPage; 