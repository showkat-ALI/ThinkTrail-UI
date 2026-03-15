import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Define role types
export type UserRole = 'superAdmin' | 'admin' | 'instructor' | 'faculty' | 'student' | 'admitted';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles: UserRole[];
}

/**
 * ProtectedRoute component - Guard against unauthorized access
 * 
 * Usage:
 * <ProtectedRoute requiredRoles={['admin', 'superAdmin']}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
export const ProtectedRoute = ({
  children,
  requiredRoles,
}: ProtectedRouteProps): ReactNode => {
  const navigate = useNavigate();
  
  // Get user from localStorage or Redux store
  const userString = localStorage.getItem('user');
  const userRoles: UserRole[] = userString ? JSON.parse(userString).roles : [];
  const isAuthenticated = !!userString && userString !== 'undefined';

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate('/signin', { replace: true });
    return null;
  }

  // Check if user has required role
  const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

  // If role mismatch, redirect to not-found or dashboard
  if (!hasRequiredRole) {
    console.warn(
      `Access denied: User roles [${userRoles.join(', ')}] cannot access resource requiring [${requiredRoles.join(', ')}]`
    );
    navigate('/not-found', { replace: true });
    return null;
  }

  // If authorized, render children
  return children;
};

/**
 * Hook to check if current user has required roles
 * 
 * Usage:
 * const canEditCourse = useAuthorize(['instructor', 'admin']);
 * if (canEditCourse) {
 *   // Show edit button
 * }
 */
export const useAuthorize = (requiredRoles: UserRole[]): boolean => {
  const userString = localStorage.getItem('user');
  const userRoles: UserRole[] = userString ? JSON.parse(userString).roles : [];

  return requiredRoles.some((role) => userRoles.includes(role));
};

/**
 * Hook to get current user's roles
 * 
 * Usage:
 * const { roles, userId } = useAuthUser();
 */
export const useAuthUser = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  return {
    userId: user?.userId || null,
    roles: user?.roles || [],
    email: user?.email || null,
    isAuthenticated: !!user,
  };
};

/**
 * Hook to check if user can perform action on specific resource
 * Example: Can user edit this assignment/course?
 * 
 * Usage:
 * const canGrade = useResourceAuthorize('assignment', assignmentCreatorId);
 */
export const useResourceAuthorize = (
  resourceType: 'assignment' | 'course' | 'module' | 'quiz',
  resourceOwnerId?: string,
): boolean => {
  const { roles, userId } = useAuthUser();

  const isAdmin = roles.includes('admin') || roles.includes('superAdmin');
  const isOwner = userId === resourceOwnerId;

  switch (resourceType) {
    case 'assignment':
    case 'quiz':
    case 'module':
      // Instructor can edit own, admin can edit any
      return (roles.includes('instructor') && isOwner) || isAdmin;
    case 'course':
      // Instructor can edit assigned courses, admin can edit any
      return (roles.includes('instructor') && isOwner) || isAdmin;
    default:
      return false;
  }
};
