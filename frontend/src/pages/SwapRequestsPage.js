import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Inbox, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  MessageSquare,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { mockSwapRequests, mockUsers } from '../data/mockData';
import { formatDate, getStatusColor, getStatusText } from '../utils/helpers';
import toast from 'react-hot-toast';

const SwapRequestsPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Get user's swap requests
    const userRequests = mockSwapRequests.filter(
      request => request.fromUserId === user?.id || request.toUserId === user?.id
    );
    setRequests(userRequests);
  }, [user]);

  useEffect(() => {
    let filtered = requests;

    // Filter by tab (sent/received)
    if (activeTab === 'sent') {
      filtered = filtered.filter(request => request.fromUserId === user?.id);
    } else {
      filtered = filtered.filter(request => request.toUserId === user?.id);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(request => {
        const otherUser = request.fromUserId === user?.id ? request.toUser : request.fromUser;
        return otherUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               request.skillOffered.toLowerCase().includes(searchTerm.toLowerCase()) ||
               request.skillWanted.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    setFilteredRequests(filtered);
  }, [requests, activeTab, statusFilter, searchTerm, user]);

  const handleAcceptRequest = async (requestId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update request status
      const requestIndex = mockSwapRequests.findIndex(r => r.id === requestId);
      if (requestIndex !== -1) {
        mockSwapRequests[requestIndex].status = 'accepted';
        mockSwapRequests[requestIndex].updatedAt = new Date().toISOString();
      }
      
      // Update local state
      setRequests(prev => prev.map(r => 
        r.id === requestId ? { ...r, status: 'accepted', updatedAt: new Date().toISOString() } : r
      ));
      
      toast.success('Swap request accepted!');
    } catch (error) {
      toast.error('Failed to accept request');
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update request status
      const requestIndex = mockSwapRequests.findIndex(r => r.id === requestId);
      if (requestIndex !== -1) {
        mockSwapRequests[requestIndex].status = 'rejected';
        mockSwapRequests[requestIndex].updatedAt = new Date().toISOString();
      }
      
      // Update local state
      setRequests(prev => prev.map(r => 
        r.id === requestId ? { ...r, status: 'rejected', updatedAt: new Date().toISOString() } : r
      ));
      
      toast.success('Swap request rejected');
    } catch (error) {
      toast.error('Failed to reject request');
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove request from mock data
      const requestIndex = mockSwapRequests.findIndex(r => r.id === requestId);
      if (requestIndex !== -1) {
        mockSwapRequests.splice(requestIndex, 1);
      }
      
      // Update local state
      setRequests(prev => prev.filter(r => r.id !== requestId));
      
      toast.success('Request deleted');
    } catch (error) {
      toast.error('Failed to delete request');
    }
  };

  const handleCompleteSwap = async (requestId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update request status
      const requestIndex = mockSwapRequests.findIndex(r => r.id === requestId);
      if (requestIndex !== -1) {
        mockSwapRequests[requestIndex].status = 'completed';
        mockSwapRequests[requestIndex].completedAt = new Date().toISOString();
      }
      
      // Update local state
      setRequests(prev => prev.map(r => 
        r.id === requestId ? { ...r, status: 'completed', completedAt: new Date().toISOString() } : r
      ));
      
      toast.success('Swap completed!');
    } catch (error) {
      toast.error('Failed to complete swap');
    }
  };

  const RequestCard = ({ request }) => {
    const isSent = request.fromUserId === user?.id;
    const otherUser = isSent ? request.toUser : request.fromUser;
    const canAccept = !isSent && request.status === 'pending';
    const canReject = !isSent && request.status === 'pending';
    const canDelete = isSent && request.status === 'pending';
    const canComplete = request.status === 'accepted';

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <img
              src={otherUser?.profilePhoto}
              alt={otherUser?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {otherUser?.name}
                </h3>
                <Badge variant={getStatusColor(request.status)}>
                  {getStatusText(request.status)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-medium">{request.skillOffered}</span>
                  <span>↔</span>
                  <span className="font-medium">{request.skillWanted}</span>
                </div>
                
                {request.message && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    "{request.message}"
                  </p>
                )}
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Sent {formatDate(request.createdAt)}</span>
                  {request.updatedAt && request.updatedAt !== request.createdAt && (
                    <span>Updated {formatDate(request.updatedAt)}</span>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-4">
                {canAccept && (
                  <Button
                    size="sm"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                )}
                
                {canReject && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRejectRequest(request.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                )}
                
                {canDelete && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                )}
                
                {canComplete && (
                  <Button
                    size="sm"
                    onClick={() => handleCompleteSwap(request.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Complete
                  </Button>
                )}
                
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
              
              {/* Rating Section for Completed Swaps */}
              {request.status === 'completed' && !request.rating && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800 mb-2">
                    Rate your experience with {otherUser?.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-yellow-400 hover:text-yellow-500"
                      >
                        <Star className="h-5 w-5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const tabs = [
    { id: 'received', label: 'Received', icon: Inbox, count: requests.filter(r => r.toUserId === user?.id).length },
    { id: 'sent', label: 'Sent', icon: Send, count: requests.filter(r => r.fromUserId === user?.id).length }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Swap Requests</h1>
        <p className="text-gray-600 mt-2">
          Manage your skill swap requests and connections
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <Badge variant="secondary" size="sm">
                    {tab.count}
                  </Badge>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search requests..."
            leftIcon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Inbox className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No {activeTab} requests
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'received' 
                ? 'You don\'t have any incoming swap requests.'
                : 'You haven\'t sent any swap requests yet.'
              }
            </p>
            {activeTab === 'sent' && (
              <div className="mt-6">
                <Button>
                  Browse Users
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SwapRequestsPage; 