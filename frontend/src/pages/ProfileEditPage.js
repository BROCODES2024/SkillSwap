import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { 
  User, 
  MapPin, 
  Camera, 
  X, 
  Plus,
  Eye,
  EyeOff,
  Save,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { skillCategories, popularSkills } from '../data/mockData';
import toast from 'react-hot-toast';

const ProfileEditPage = () => {
  const { user, updateProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [selectedSkillsOffered, setSelectedSkillsOffered] = useState(user?.skillsOffered || []);
  const [selectedSkillsWanted, setSelectedSkillsWanted] = useState(user?.skillsWanted || []);
  const [selectedAvailability, setSelectedAvailability] = useState(user?.availability || []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      location: user?.location || '',
      bio: user?.bio || ''
    }
  });

  const availabilityOptions = [
    { id: 'weekdays', label: 'Weekdays' },
    { id: 'weekends', label: 'Weekends' },
    { id: 'mornings', label: 'Mornings' },
    { id: 'evenings', label: 'Evenings' }
  ];

  const handleSkillToggle = (skill, type) => {
    if (type === 'offered') {
      setSelectedSkillsOffered(prev => 
        prev.includes(skill) 
          ? prev.filter(s => s !== skill)
          : [...prev, skill]
      );
    } else {
      setSelectedSkillsWanted(prev => 
        prev.includes(skill) 
          ? prev.filter(s => s !== skill)
          : [...prev, skill]
      );
    }
  };

  const handleAddCustomSkill = (type) => {
    if (newSkill.trim() && !selectedSkillsOffered.includes(newSkill) && !selectedSkillsWanted.includes(newSkill)) {
      if (type === 'offered') {
        setSelectedSkillsOffered(prev => [...prev, newSkill.trim()]);
      } else {
        setSelectedSkillsWanted(prev => [...prev, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const handleAvailabilityToggle = (availability) => {
    setSelectedAvailability(prev => 
      prev.includes(availability) 
        ? prev.filter(a => a !== availability)
        : [...prev, availability]
    );
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const profileData = {
        ...data,
        skillsOffered: selectedSkillsOffered,
        skillsWanted: selectedSkillsWanted,
        availability: selectedAvailability
      };

      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-gray-600 mt-2">
          Update your profile information and skills
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
                      alt={user?.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
                    <p className="text-sm text-gray-600">
                      Upload a new profile photo to personalize your account
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    type="text"
                    leftIcon={User}
                    error={errors.name?.message}
                    {...register('name', {
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                    placeholder="Enter your full name"
                  />

                  <Input
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    placeholder="Enter your email"
                  />
                </div>

                <Input
                  label="Location"
                  type="text"
                  leftIcon={MapPin}
                  {...register('location')}
                  placeholder="City, State or Country"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    {...register('bio')}
                    rows={4}
                    className="w-full input"
                    placeholder="Tell others about yourself and your interests..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Skills Offered */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Skills you can offer
                  </h4>
                  <div className="space-y-3">
                    {skillCategories.map((category) => (
                      <div key={category.id}>
                        <h5 className="text-sm font-medium text-gray-600 mb-2">
                          {category.icon} {category.name}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {popularSkills
                            .filter(skill => 
                              ['Programming', 'Design', 'Cooking', 'Music', 'Languages', 'Fitness', 'Photography', 'Writing', 'Business', 'Crafts']
                              .includes(category.name) && 
                              popularSkills.includes(skill)
                            )
                            .slice(0, 5)
                            .map((skill) => (
                              <Badge
                                key={skill}
                                variant={selectedSkillsOffered.includes(skill) ? 'primary' : 'secondary'}
                                onClick={() => handleSkillToggle(skill, 'offered')}
                                className="cursor-pointer"
                              >
                                {skill}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Custom Skill Input */}
                  <div className="mt-4 flex space-x-2">
                    <Input
                      placeholder="Add custom skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAddCustomSkill('offered')}
                      disabled={!newSkill.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Selected Skills */}
                  {selectedSkillsOffered.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Selected Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkillsOffered.map((skill) => (
                          <Badge
                            key={skill}
                            variant="primary"
                            removable
                            onRemove={() => handleSkillToggle(skill, 'offered')}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills Wanted */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Skills you want to learn
                  </h4>
                  <div className="space-y-3">
                    {skillCategories.map((category) => (
                      <div key={category.id}>
                        <h5 className="text-sm font-medium text-gray-600 mb-2">
                          {category.icon} {category.name}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {popularSkills
                            .filter(skill => 
                              ['Programming', 'Design', 'Cooking', 'Music', 'Languages', 'Fitness', 'Photography', 'Writing', 'Business', 'Crafts']
                              .includes(category.name) && 
                              popularSkills.includes(skill)
                            )
                            .slice(0, 5)
                            .map((skill) => (
                              <Badge
                                key={skill}
                                variant={selectedSkillsWanted.includes(skill) ? 'success' : 'secondary'}
                                onClick={() => handleSkillToggle(skill, 'wanted')}
                                className="cursor-pointer"
                              >
                                {skill}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Selected Skills */}
                  {selectedSkillsWanted.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Selected Skills:</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkillsWanted.map((skill) => (
                          <Badge
                            key={skill}
                            variant="success"
                            removable
                            onRemove={() => handleSkillToggle(skill, 'wanted')}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Availability Section */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Select when you're available for skill swaps
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {availabilityOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleAvailabilityToggle(option.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-colors ${
                          selectedAvailability.includes(option.id)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.label}</span>
                          {selectedAvailability.includes(option.id) && (
                            <CheckCircle className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <img
                    src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-medium text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.location}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="text-left">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Skills Offered ({selectedSkillsOffered.length})
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedSkillsOffered.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="primary" size="sm">
                            {skill}
                          </Badge>
                        ))}
                        {selectedSkillsOffered.length > 3 && (
                          <Badge variant="secondary" size="sm">
                            +{selectedSkillsOffered.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-left">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Skills Wanted ({selectedSkillsWanted.length})
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedSkillsWanted.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="success" size="sm">
                            {skill}
                          </Badge>
                        ))}
                        {selectedSkillsWanted.length > 3 && (
                          <Badge variant="secondary" size="sm">
                            +{selectedSkillsWanted.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Card>
              <CardContent className="p-6">
                <Button
                  type="submit"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditPage; 