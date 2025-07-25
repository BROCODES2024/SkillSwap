import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, MapPin, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { skillCategories, popularSkills } from '../../data/mockData';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSkillsOffered, setSelectedSkillsOffered] = useState([]);
  const [selectedSkillsWanted, setSelectedSkillsWanted] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
<<<<<<< HEAD
    setValue,
    trigger
=======
    setValue
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
  } = useForm();

  const password = watch('password');

  const steps = [
    { id: 1, name: 'Account Details', description: 'Basic information' },
    { id: 2, name: 'Skills & Interests', description: 'What you offer and want' },
    { id: 3, name: 'Availability', description: 'When you\'re available' }
  ];

  const availabilityOptions = [
    { id: 'weekdays', label: 'Weekdays' },
    { id: 'weekends', label: 'Weekends' },
    { id: 'mornings', label: 'Mornings' },
    { id: 'evenings', label: 'Evenings' }
  ];

  const handleSkillToggle = (skill, type) => {
    if (type === 'offered') {
<<<<<<< HEAD
      setSelectedSkillsOffered(prev =>
        prev.includes(skill)
=======
      setSelectedSkillsOffered(prev => 
        prev.includes(skill) 
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
          ? prev.filter(s => s !== skill)
          : [...prev, skill]
      );
    } else {
<<<<<<< HEAD
      setSelectedSkillsWanted(prev =>
        prev.includes(skill)
=======
      setSelectedSkillsWanted(prev => 
        prev.includes(skill) 
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
          ? prev.filter(s => s !== skill)
          : [...prev, skill]
      );
    }
  };

  const handleAvailabilityToggle = (availability) => {
<<<<<<< HEAD
    setSelectedAvailability(prev =>
      prev.includes(availability)
=======
    setSelectedAvailability(prev => 
      prev.includes(availability) 
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
        ? prev.filter(a => a !== availability)
        : [...prev, availability]
    );
  };

<<<<<<< HEAD
  const nextStep = async () => {
    const isValid = await trigger(); // validate current step
    if (!isValid) return;
=======
  const nextStep = () => {
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
<<<<<<< HEAD

    // Manual validation for local state values
    if (selectedSkillsOffered.length === 0) {
      toast.error('Please select at least one skill you can offer.');
      setCurrentStep(2);
      setIsSubmitting(false);
      return;
    }

    if (selectedSkillsWanted.length === 0) {
      toast.error('Please select at least one skill you want to learn.');
      setCurrentStep(2);
      setIsSubmitting(false);
      return;
    }

    if (selectedAvailability.length === 0) {
      toast.error('Please select at least one availability option.');
      setCurrentStep(3);
      setIsSubmitting(false);
      return;
    }

=======
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
    try {
      const userData = {
        ...data,
        skillsOffered: selectedSkillsOffered,
        skillsWanted: selectedSkillsWanted,
        availability: selectedAvailability,
        isPublic: true
      };

      await registerUser(userData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
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
              label="Email address"
              type="email"
              leftIcon={Mail}
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

            <Input
              label="Location (optional)"
              type="text"
              leftIcon={MapPin}
              {...register('location')}
              placeholder="City, State or Country"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                leftIcon={Lock}
                rightIcon={showPassword ? EyeOff : Eye}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number'
                  }
                })}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
<<<<<<< HEAD
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
=======
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                leftIcon={Lock}
                rightIcon={showConfirmPassword ? EyeOff : Eye}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
<<<<<<< HEAD
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
=======
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Skills you can offer
              </label>
              <div className="space-y-3">
                {skillCategories.map((category) => (
                  <div key={category.id}>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      {category.icon} {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills
<<<<<<< HEAD
                        .filter(skill => ['Programming', 'Design', 'Cooking', 'Music', 'Languages', 'Fitness', 'Photography', 'Writing', 'Business', 'Crafts']
                          .includes(category.name) && popularSkills.includes(skill))
=======
                        .filter(skill => 
                          ['Programming', 'Design', 'Cooking', 'Music', 'Languages', 'Fitness', 'Photography', 'Writing', 'Business', 'Crafts']
                          .includes(category.name) && 
                          popularSkills.includes(skill)
                        )
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Skills you want to learn
              </label>
              <div className="space-y-3">
                {skillCategories.map((category) => (
                  <div key={category.id}>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      {category.icon} {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills
<<<<<<< HEAD
                        .filter(skill => ['Programming', 'Design', 'Cooking', 'Music', 'Languages', 'Fitness', 'Photography', 'Writing', 'Business', 'Crafts']
                          .includes(category.name) && popularSkills.includes(skill))
=======
                        .filter(skill => 
                          ['Programming', 'Design', 'Cooking', 'Music', 'Languages', 'Fitness', 'Photography', 'Writing', 'Business', 'Crafts']
                          .includes(category.name) && 
                          popularSkills.includes(skill)
                        )
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
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
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                When are you available for skill swaps?
              </label>
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
                        <Check className="h-5 w-5 text-primary-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Almost done!
              </h4>
              <p className="text-sm text-blue-700">
                Review your information and click "Create Account" to complete your registration.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
<<<<<<< HEAD
=======
        {/* Logo and Title */}
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the Skill Swap community
          </p>
        </div>

<<<<<<< HEAD
=======
        {/* Progress Steps */}
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep >= step.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
<<<<<<< HEAD
                {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
=======
                {currentStep > step.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.id
                )}
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

<<<<<<< HEAD
=======
        {/* Form */}
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}

<<<<<<< HEAD
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}

                {currentStep < steps.length ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto" loading={isSubmitting} disabled={isSubmitting}>
=======
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                )}
                
                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
                    Create Account
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

<<<<<<< HEAD
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
=======
        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default RegisterPage;
=======
export default RegisterPage; 
>>>>>>> d759080e15cca199ff0e7c008979357f35b67d56
