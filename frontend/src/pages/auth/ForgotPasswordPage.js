import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await forgotPassword(data.email);
      setIsEmailSent(true);
      toast.success('Password reset email sent successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-success-600 rounded-lg flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent you a password reset link
            </p>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to your email address. 
                Please check your inbox and follow the instructions to reset your password.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try another email
                </Button>
                
                <Link
                  to="/login"
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot your password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <Button
                type="submit"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Send reset link
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 