'use client'
import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, FileText, User, LogOut, CheckSquare, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">StudyFlow</span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link href="/subjects" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                <span>Materias</span>
              </Link>
              <Link href="/tasks" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                <CheckSquare className="h-4 w-4" />
                <span>Tareas</span>
              </Link>
              <Link href="/notes" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                <FileText className="h-4 w-4" />
                <span>Notas</span>
              </Link>
            </div>
          )}

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 hidden lg:block">Hola, {user.name}</span>
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center space-x-1">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden lg:block">Salir</span>
                </Button>
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          {user && (
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Abrir menú principal</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          )}

          {/* Mobile Login Button */}
          {!user && (
            <div className="md:hidden">
              <Link href="/login" className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2 mb-4">
              {/* User info */}
              <div className="flex items-center px-3 py-3 border-b border-gray-200">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1 pt-2">
                <Link 
                  href="/dashboard" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/subjects" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Materias</span>
                </Link>
                <Link 
                  href="/tasks" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  <CheckSquare className="h-5 w-5" />
                  <span>Tareas</span>
                </Link>
                <Link 
                  href="/notes" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-3 rounded-md text-base font-medium transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span>Notas</span>
                </Link>
              </div>

              {/* Logout button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-3 rounded-md text-base font-medium w-full transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}