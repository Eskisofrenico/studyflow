'use client'
import { useEffect, useState } from 'react';
import { CheckCircle, Clock, Plus, Filter, Calendar, BookOpen, AlertTriangle, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/hooks/useAppStore';

export default function TasksPage() {
  const { user } = useAuth();
  const { 
    tasks, 
    subjects, 
    initializeDemoData,
    quickAddTask,
    toggleTask,
    deleteTask
  } = useAppStore();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  // Inicializar datos demo si no hay tareas
  useEffect(() => {
    if (user && tasks.length === 0) {
      initializeDemoData();
    }
  }, [user, tasks.length, initializeDemoData]);

  // Función para obtener el nombre de la materia
  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'Materia desconocida';
  };

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || 
                       (filterStatus === 'pending' && !task.completed) ||
                       (filterStatus === 'completed' && task.completed);
    
    const subjectMatch = filterSubject === 'all' || task.subjectId === filterSubject;
    
    return statusMatch && subjectMatch;
  });

  // Separar tareas por estado
  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  // Ordenar tareas pendientes por fecha de vencimiento
  const sortedPendingTasks = pendingTasks.sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const handleAddTask = () => {
    setShowAddModal(true);
  };

  const handleQuickAddTask = () => {
    const taskTitles = [
      'Estudiar para parcial de matemáticas',
      'Entregar informe de laboratorio',
      'Revisar apuntes de la semana',
      'Hacer ejercicios del capítulo 4',
      'Preparar presentación grupal',
      'Leer artículo científico',
      'Completar tarea de programación'
    ];
    const randomTitle = taskTitles[Math.floor(Math.random() * taskTitles.length)];
    
    quickAddTask(randomTitle);
    alert(`✅ Tarea "${randomTitle}" creada exitosamente!`);
  };

  // Función para determinar si una tarea está próxima a vencer
  const getTaskUrgency = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const hoursUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilDue < 0) return 'overdue';
    if (hoursUntilDue < 24) return 'urgent';
    if (hoursUntilDue < 72) return 'soon';
    return 'normal';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tareas</h1>
              <p className="text-gray-600 mt-2">
                Gestiona todas tus tareas y deadlines ({pendingTasks.length} pendientes, {completedTasks.length} completadas)
              </p>
            </div>
            <Button onClick={handleAddTask}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Tarea
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Filter by Status */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'completed')}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas las tareas</option>
                <option value="pending">Pendientes</option>
                <option value="completed">Completadas</option>
              </select>
            </div>
            
            {/* Filter by Subject */}
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas las materias</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredTasks.length === 0 ? (
          <Card className="text-center py-12">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes tareas {filterStatus === 'pending' ? 'pendientes' : filterStatus === 'completed' ? 'completadas' : ''}
            </h3>
            <p className="text-gray-600 mb-6">
              {filterStatus === 'all' 
                ? 'Comienza agregando tu primera tarea'
                : 'Intenta cambiar los filtros para ver más tareas'
              }
            </p>
            {filterStatus === 'all' && (
              <Button onClick={handleQuickAddTask}>
                <Plus className="w-4 h-4 mr-2" />
                Crear Primera Tarea
              </Button>
            )}
          </Card>
        ) : (
          <div className="space-y-8">
            
            {/* Tareas Pendientes */}
            {sortedPendingTasks.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Tareas Pendientes ({sortedPendingTasks.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedPendingTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      subjectName={getSubjectName(task.subjectId)}
                      urgency={getTaskUrgency(task.dueDate)}
                      onToggle={() => toggleTask(task.id)}
                      onDelete={() => {
                        if (confirm(`¿Eliminar la tarea "${task.title}"?`)) {
                          deleteTask(task.id);
                          alert('🗑️ Tarea eliminada');
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tareas Completadas */}
            {completedTasks.length > 0 && filterStatus !== 'pending' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Tareas Completadas ({completedTasks.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      subjectName={getSubjectName(task.subjectId)}
                      urgency="completed"
                      onToggle={() => toggleTask(task.id)}
                      onDelete={() => {
                        if (confirm(`¿Eliminar la tarea "${task.title}"?`)) {
                          deleteTask(task.id);
                          alert('🗑️ Tarea eliminada');
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal para Agregar Tarea */}
      {showAddModal && (
        <AddTaskModal 
          onClose={() => setShowAddModal(false)}
          onQuickAdd={handleQuickAddTask}
        />
      )}
    </div>
  );
}

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
  };
  subjectName: string;
  urgency: 'overdue' | 'urgent' | 'soon' | 'normal' | 'completed';
  onToggle: () => void;
  onDelete: () => void;
}

function TaskCard({ task, subjectName, urgency, onToggle, onDelete }: TaskCardProps) {
  const urgencyStyles = {
    overdue: 'border-l-red-500 bg-red-50',
    urgent: 'border-l-orange-500 bg-orange-50',
    soon: 'border-l-yellow-500 bg-yellow-50',
    normal: 'border-l-blue-500 bg-blue-50',
    completed: 'border-l-green-500 bg-green-50 opacity-75'
  };

  const priorityColors = {
    high: 'text-red-600 bg-red-100',
    medium: 'text-yellow-600 bg-yellow-100',
    low: 'text-green-600 bg-green-100'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < -24) return `Vencida hace ${Math.abs(Math.floor(diffHours / 24))} días`;
    if (diffHours < 0) return 'Vencida';
    if (diffHours < 24) return `Vence en ${Math.ceil(diffHours)} horas`;
    if (diffHours < 48) return 'Vence mañana';
    return `Vence ${date.toLocaleDateString()}`;
  };

  return (
    <Card className={`border-l-4 ${urgencyStyles[urgency]} hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500">{subjectName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
          </span>
          <button 
            onClick={onDelete}
            className="text-red-400 hover:text-red-600 p-1"
            title="Eliminar tarea"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      <h3 className={`text-lg font-bold mb-2 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
        {task.title}
      </h3>
      
      {task.description && (
        <p className="text-gray-600 text-sm mb-3">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Calendar className="w-4 h-4" />
        <span className={urgency === 'overdue' ? 'text-red-600 font-medium' : ''}>
          {formatDate(task.dueDate)}
        </span>
        {urgency === 'overdue' && <AlertTriangle className="w-4 h-4 text-red-600" />}
      </div>

      <div className="flex space-x-2">
        <Button 
          size="sm" 
          variant={task.completed ? "outline" : "primary"}
          className="flex-1 flex items-center justify-center"
          onClick={onToggle}
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          {task.completed ? 'Marcar Pendiente' : 'Completar'}
        </Button>
      </div>
    </Card>
  );
}

// Modal para agregar tarea
function AddTaskModal({ onClose, onQuickAdd }: { onClose: () => void, onQuickAdd: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 m-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Nueva Tarea</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Para el testing, usaremos la función de crear tarea rápida con datos de ejemplo.
        </p>
        
        <div className="flex space-x-3">
          <Button 
            onClick={() => {
              onQuickAdd();
              onClose();
            }}
            className="flex-1"
          >
            Crear Tarea Demo
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}