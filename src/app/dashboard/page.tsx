'use client'
import { useEffect } from 'react';
import { BookOpen, CheckCircle, FileText, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/hooks/useAppStore';

export default function DashboardPage() {
  const { user } = useAuth();
  const { 
    subjects, 
    tasks, 
    notes, 
    initializeDemoData,
    quickAddSubject,
    quickAddTask,
    quickAddNote
  } = useAppStore();

  // Inicializar datos demo cuando el usuario esté logueado
  useEffect(() => {
    if (user && subjects.length === 0) {
      initializeDemoData();
    }
  }, [user, subjects.length, initializeDemoData]);

  // Calcular estadísticas en tiempo real
  const stats = {
    materias: subjects.length,
    tareasPendientes: tasks.filter(task => !task.completed).length,
    notasGuardadas: notes.length,
    tareasCompletadas: tasks.filter(task => task.completed).length
  };

  // Handlers para acciones rápidas
  const handleQuickAddSubject = () => {
    const subjectNames = [
      'Análisis Matemático',
      'Física General', 
      'Química Orgánica',
      'Historia del Arte',
      'Inglés Técnico',
      'Estadística'
    ];
    const randomName = subjectNames[Math.floor(Math.random() * subjectNames.length)];
    const code = 'MAT-' + Math.floor(Math.random() * 900 + 100);
    
    quickAddSubject(randomName, code);
    
    // Feedback visual
    alert(`✅ Materia "${randomName}" agregada exitosamente!`);
  };

  const handleQuickAddTask = () => {
    const taskTitles = [
      'Estudiar para parcial',
      'Entregar laboratorio',
      'Revisar apuntes',
      'Hacer ejercicios',
      'Preparar presentación',
      'Leer capítulo 5'
    ];
    const randomTitle = taskTitles[Math.floor(Math.random() * taskTitles.length)];
    
    quickAddTask(randomTitle);
    
    // Feedback visual
    alert(`✅ Tarea "${randomTitle}" creada exitosamente!`);
  };

  const handleQuickAddNote = () => {
    const noteTitles = [
      'Resumen de clase',
      'Conceptos importantes',
      'Fórmulas clave',
      'Ideas para proyecto',
      'Dudas pendientes',
      'Recursos útiles'
    ];
    const randomTitle = noteTitles[Math.floor(Math.random() * noteTitles.length)];
    const content = `Esta es una nota sobre ${randomTitle}. Contenido automático generado para testing.`;
    
    quickAddNote(randomTitle, content);
    
    // Feedback visual
    alert(`✅ Nota "${randomTitle}" guardada exitosamente!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section - Mobile optimized */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Resumen de tu actividad académica
          </p>
        </div>
      </div>

      {/* Main Content - Mobile first */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Link href="/subjects">
            <StatsCard
              title="Materias"
              value={stats.materias}
              icon={<BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />}
              color="blue"
              change="+2 este mes"
              clickable
            />
          </Link>
          <Link href="/tasks">
            <StatsCard
              title="Pendientes"
              value={stats.tareasPendientes}
              icon={<Clock className="w-4 h-4 sm:w-6 sm:h-6" />}
              color="yellow"
              change="5 próximas"
              clickable
            />
          </Link>
          <Link href="/notes">
            <StatsCard
              title="Notas"
              value={stats.notasGuardadas}
              icon={<FileText className="w-4 h-4 sm:w-6 sm:h-6" />}
              color="green"
              change="+12 esta semana"
              clickable
            />
          </Link>
          <Link href="/tasks">
            <StatsCard
              title="Completadas"
              value={stats.tareasCompletadas}
              icon={<CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />}
              color="purple"
              change="80% completadas"
              clickable
            />
          </Link>
        </div>

        {/* Quick Actions - Mobile optimized */}
        <Card className="mb-6 sm:mb-8" padding="sm">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <button 
              onClick={handleQuickAddSubject}
              className="p-3 sm:p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none touch-manipulation"
            >
              <div className="text-blue-600 font-medium text-sm sm:text-base">Nueva Materia</div>
              <div className="text-xs sm:text-sm text-gray-600">Agregar una nueva materia</div>
            </button>
            <button 
              onClick={handleQuickAddTask}
              className="p-3 sm:p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors focus:ring-2 focus:ring-green-500 focus:outline-none touch-manipulation"
            >
              <div className="text-green-600 font-medium text-sm sm:text-base">Nueva Tarea</div>
              <div className="text-xs sm:text-sm text-gray-600">Crear una nueva tarea</div>
            </button>
            <button 
              onClick={handleQuickAddNote}
              className="p-3 sm:p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none touch-manipulation sm:col-span-1 col-span-1"
            >
              <div className="text-purple-600 font-medium text-sm sm:text-base">Nueva Nota</div>
              <div className="text-xs sm:text-sm text-gray-600">Escribir una nueva nota</div>
            </button>
          </div>
        </Card>

        {/* Quick Navigation - Mobile stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="hover:shadow-lg transition-shadow" padding="sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Próximas Tareas</h3>
              <Link href="/tasks" className="text-blue-600 hover:text-blue-800 flex items-center text-xs sm:text-sm">
                Ver todas <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-2">
              {tasks.filter(t => !t.completed).slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-xs sm:text-sm text-gray-700 truncate pr-2">{task.title}</span>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {tasks.filter(t => !t.completed).length === 0 && (
                <p className="text-gray-500 text-xs sm:text-sm">No hay tareas pendientes</p>
              )}
            </div>
          </Card>

          <Card className="hover:shadow-lg transition-shadow" padding="sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Mis Materias</h3>
              <Link href="/subjects" className="text-blue-600 hover:text-blue-800 flex items-center text-xs sm:text-sm">
                Ver todas <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-2">
              {subjects.slice(0, 3).map(subject => (
                <div key={subject.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-xs sm:text-sm text-gray-700 truncate pr-2">{subject.name}</span>
                  <span className="text-xs text-gray-500 flex-shrink-0">{subject.code}</span>
                </div>
              ))}
              {subjects.length === 0 && (
                <p className="text-gray-500 text-xs sm:text-sm">No hay materias registradas</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'yellow' | 'green' | 'purple';
  change: string;
  clickable?: boolean;
}

function StatsCard({ title, value, icon, color, change, clickable = false }: StatsCardProps) {
  const colorStyles = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600'
  };

  return (
    <Card 
      hover 
      className={`${colorStyles[color]} border ${clickable ? 'cursor-pointer transform hover:scale-105 transition-transform touch-manipulation' : ''}`}
      padding="sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{title}</p>
          <p className="text-xl sm:text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1 hidden sm:block">{change}</p>
        </div>
        <div className="p-2 sm:p-3 rounded-lg bg-white shadow-sm flex-shrink-0">
          {icon}
        </div>
      </div>
    </Card>
  );
}