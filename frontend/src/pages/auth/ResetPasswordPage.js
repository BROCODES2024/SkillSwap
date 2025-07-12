import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await resetPassword(token, data.password);
      setIsSuccess(true);
      toast.success('Password reset successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-success-600 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Password reset successful</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your password has been updated successfully
            </p>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-6">
                You can now sign in with your new password.
              </p>
              
              <Button
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Sign in
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-error-600 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Invalid reset link</h2>
            <p className="mt-2 text-sm text-gray-600">
              This password reset link is invalid or has expired
            </p>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 mb-6">
                Please request a new password reset link.
              </p>
              
              <Link
                to="/forgot-password"
                className="inline-block w-full"
              >
                <Button className="w-full">
                  Request new link
                </Button>
              </Link>
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
          <h2 className="text-3xl font-bold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative">
                <Input
                  label="New Password"
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
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm New Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  leftIcon={Lock}
                  rightIcon={showConfirmPassword ? EyeOff : Eye}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Reset password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 