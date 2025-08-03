'use client'
import { useEffect } from 'react';
import { BookOpen, CheckCircle, FileText, Clock } from 'lucide-react';
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
      
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Resumen de tu actividad académica
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Materias Activas"
            value={stats.materias}
            icon={<BookOpen className="w-6 h-6" />}
            color="blue"
            change="+2 este mes"
          />
          <StatsCard
            title="Tareas Pendientes"
            value={stats.tareasPendientes}
            icon={<Clock className="w-6 h-6" />}
            color="yellow"
            change="5 próximas"
          />
          <StatsCard
            title="Notas Guardadas"
            value={stats.notasGuardadas}
            icon={<FileText className="w-6 h-6" />}
            color="green"
            change="+12 esta semana"
          />
          <StatsCard
            title="Completadas"
            value={stats.tareasCompletadas}
            icon={<CheckCircle className="w-6 h-6" />}
            color="purple"
            change="80% completadas"
          />
        </div>

        {/* Quick Actions - AHORA FUNCIONALES */}
        <Card className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={handleQuickAddSubject}
              className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <div className="text-blue-600 font-medium">Nueva Materia</div>
              <div className="text-sm text-gray-600">Agregar una nueva materia</div>
            </button>
            <button 
              onClick={handleQuickAddTask}
              className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <div className="text-green-600 font-medium">Nueva Tarea</div>
              <div className="text-sm text-gray-600">Crear una nueva tarea</div>
            </button>
            <button 
              onClick={handleQuickAddNote}
              className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <div className="text-purple-600 font-medium">Nueva Nota</div>
              <div className="text-sm text-gray-600">Escribir una nueva nota</div>
            </button>
          </div>
        </Card>
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
}

function StatsCard({ title, value, icon, color, change }: StatsCardProps) {
  const colorStyles = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600'
  };

  return (
    <Card hover className={`${colorStyles[color]} border`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{change}</p>
        </div>
        <div className="p-3 rounded-lg bg-white shadow-sm">
          {icon}
        </div>
      </div>
    </Card>
  );
}