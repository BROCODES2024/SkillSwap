import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  MessageSquare, 
  Clock,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  Award,
  Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockUsers, mockSwapRequests } from '../data/mockData';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const UserProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapForm, setSwapForm] = useState({
    skillOffered: '',
    skillWanted: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundUser = mockUsers.find(u => u.id === parseInt(userId));
    setUser(foundUser);
  }, [userId]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;
  const hasExistingRequest = mockSwapRequests.some(
    request => 
      (request.fromUserId === currentUser?.id && request.toUserId === user.id) ||
      (request.fromUserId === user.id && request.toUserId === currentUser?.id)
  );

  const handleSwapRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this to the server
      const newRequest = {
        id: mockSwapRequests.length + 1,
        fromUserId: currentUser.id,
        toUserId: user.id,
        fromUser: currentUser,
        toUser: user,
        skillOffered: swapForm.skillOffered,
        skillWanted: swapForm.skillWanted,
        message: swapForm.message,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockSwapRequests.push(newRequest);
      
      toast.success('Swap request sent successfully!');
      setShowSwapModal(false);
      setSwapForm({ skillOffered: '', skillWanted: '', message: '' });
    } catch (error) {
      toast.error('Failed to send swap request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SwapRequestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Send Swap Request</h3>
        
        <form onSubmit={handleSwapRequest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill you can offer
            </label>
            <select
              value={swapForm.skillOffered}
              onChange={(e) => setSwapForm(prev => ({ ...prev, skillOffered: e.target.value }))}
              className="w-full input"
              required
            >
              <option value="">Select a skill</option>
              {currentUser?.skillsOffered?.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill you want to learn
            </label>
            <select
              value={swapForm.skillWanted}
              onChange={(e) => setSwapForm(prev => ({ ...prev, skillWanted: e.target.value }))}
              className="w-full input"
              required
            >
              <option value="">Select a skill</option>
              {user?.skillsOffered?.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (optional)
            </label>
            <textarea
              value={swapForm.message}
              onChange={(e) => setSwapForm(prev => ({ ...prev, message: e.target.value }))}
              className="w-full input"
              rows={3}
              placeholder="Tell them why you'd like to swap skills..."
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowSwapModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="flex-1"
            >
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={user.profilePhoto}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-primary-600 rounded-full p-2">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              {user.isVerified && (
                <Badge variant="primary" size="sm">
                  Verified
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span>{user.rating} ({user.totalSwaps} swaps)</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined {formatDate(user.joinDate)}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{user.bio}</p>
            
            {!isOwnProfile && (
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowSwapModal(true)}
                  disabled={hasExistingRequest}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {hasExistingRequest ? 'Request Sent' : 'Send Swap Request'}
                </Button>
                <Button variant="outline">
                  <Heart className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Section */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Skills Offered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill) => (
                      <Badge key={skill} variant="primary" size="lg">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Skills Wanted
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill) => (
                      <Badge key={skill} variant="success" size="lg">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Section */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.availability.map((time) => (
                  <Badge key={time} variant="secondary" size="lg">
                    <Clock className="h-3 w-3 mr-1" />
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSwapRequests
                  .filter(request => request.fromUserId === user.id || request.toUserId === user.id)
                  .slice(0, 5)
                  .map((request) => (
                    <div key={request.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <img
                        src={request.fromUserId === user.id ? request.toUser?.profilePhoto : request.fromUser?.profilePhoto}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {request.fromUserId === user.id ? request.toUser?.name : request.fromUser?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {request.skillOffered} ↔ {request.skillWanted}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(request.createdAt)}
                        </p>
                      </div>
                      <Badge variant={request.status === 'completed' ? 'success' : 'warning'}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{user.email}</span>
                </div>
                {user.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{user.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Swaps</span>
                  <span className="font-semibold">{user.totalSwaps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{user.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-semibold">{formatDate(user.joinDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {!isOwnProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowSwapModal(true)}
                    disabled={hasExistingRequest}
                    className="w-full"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {hasExistingRequest ? 'Request Already Sent' : 'Send Swap Request'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Follow User
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && <SwapRequestModal />}
    </div>
  );
};

export default UserProfilePage; 