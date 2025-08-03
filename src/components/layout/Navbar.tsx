'use client'
import Link from 'next/link';
import { BookOpen, Calendar, FileText, User, LogOut, CheckSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">StudyFlow</span>
        </Link>

        {/* Navigation Links */}
        {user && (
          <div className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Calendar className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/subjects" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Materias</span>
            </Link>
            <Link href="/tasks" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <CheckSquare className="h-4 w-4" />
              <span>Tareas</span>
            </Link>
            <Link href="/notes" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <FileText className="h-4 w-4" />
              <span>Notas</span>
            </Link>
          </div>
        )}

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Hola, {user.name}</span>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center space-x-1">
                <LogOut className="h-4 w-4" />
                <span>Salir</span>
              </Button>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}