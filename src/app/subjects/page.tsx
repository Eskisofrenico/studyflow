'use client'
import { useEffect, useState } from 'react';
import { BookOpen, Plus, Clock, User, X, Eye, ListTodo } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/hooks/useAppStore';

export default function SubjectsPage() {
  const { user } = useAuth();
  const { 
    subjects, 
    initializeDemoData, 
    quickAddSubject
  } = useAppStore();
  
  const [showAddModal, setShowAddModal] = useState(false);

  // Inicializar datos demo si no hay materias
  useEffect(() => {
    if (user && subjects.length === 0) {
      initializeDemoData();
    }
  }, [user, subjects.length, initializeDemoData]);

  const handleAddSubject = () => {
    setShowAddModal(true);
  };

  const handleQuickAdd = () => {
    const subjectNames = [
      'Cálculo Diferencial',
      'Programación Orientada a Objetos', 
      'Estructuras de Datos',
      'Sistemas Operativos',
      'Redes de Computadores',
      'Ingeniería de Software'
    ];
    const randomName = subjectNames[Math.floor(Math.random() * subjectNames.length)];
    const code = 'ING-' + Math.floor(Math.random() * 900 + 100);
    
    quickAddSubject(randomName, code);
    alert(`✅ Materia "${randomName}" agregada exitosamente!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Materias</h1>
              <p className="text-gray-600 mt-2">
                Gestiona tus materias del semestre ({subjects.length} activas)
              </p>
            </div>
            <Button onClick={handleAddSubject}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Materia
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {subjects.length === 0 ? (
          <Card className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes materias registradas
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza agregando tu primera materia del semestre
            </p>
            <Button onClick={handleQuickAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Primera Materia
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        )}
      </div>

      {/* Modal Simple para Agregar Materia */}
      {showAddModal && (
        <AddSubjectModal 
          onClose={() => setShowAddModal(false)}
          onQuickAdd={handleQuickAdd}
        />
      )}
    </div>
  );
}

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    code: string;
    credits: number;
    color: string;
    professor?: string;
    schedule?: string;
  };
}

function SubjectCard({ subject }: SubjectCardProps) {
  const { deleteSubject, quickAddTask, tasks } = useAppStore();
  
  const colorStyles = {
    blue: 'border-l-blue-500 bg-blue-50',
    green: 'border-l-green-500 bg-green-50', 
    purple: 'border-l-purple-500 bg-purple-50',
    yellow: 'border-l-yellow-500 bg-yellow-50',
    red: 'border-l-red-500 bg-red-50'
  };

  const handleViewDetails = () => {
    const subjectTasks = tasks.filter(task => task.subjectId === subject.id);
    alert(`📋 Detalles de ${subject.name}:\n\n` +
          `Código: ${subject.code}\n` +
          `Créditos: ${subject.credits}\n` +
          `Profesor: ${subject.professor || 'No asignado'}\n` +
          `Horario: ${subject.schedule || 'No definido'}\n` +
          `Tareas activas: ${subjectTasks.length}`
    );
  };

  const handleAddTask = () => {
    const taskNames = [
      'Parcial 1',
      'Tarea práctica',
      'Ensayo final', 
      'Proyecto grupal',
      'Laboratorio 3'
    ];
    const randomTask = taskNames[Math.floor(Math.random() * taskNames.length)];
    
    quickAddTask(randomTask, subject.id);
    alert(`✅ Tarea "${randomTask}" agregada a ${subject.name}!`);
  };

  const handleDelete = () => {
    if (confirm(`¿Eliminar la materia "${subject.name}"? Esto también eliminará todas sus tareas y notas.`)) {
      deleteSubject(subject.id);
      alert(`🗑️ Materia "${subject.name}" eliminada`);
    }
  };

  return (
    <Card className={`border-l-4 ${colorStyles[subject.color as keyof typeof colorStyles] || colorStyles.blue} hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-500">{subject.code}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {subject.credits} créditos
          </span>
          <button 
            onClick={handleDelete}
            className="text-red-400 hover:text-red-600 p-1"
            title="Eliminar materia"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-3">{subject.name}</h3>
      
      {(subject.professor || subject.schedule) && (
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {subject.professor && (
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{subject.professor}</span>
            </div>
          )}
          {subject.schedule && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{subject.schedule}</span>
            </div>
          )}
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 flex items-center justify-center"
            onClick={handleViewDetails}
          >
            <Eye className="w-3 h-3 mr-1" />
            Ver Detalles
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="flex-1 flex items-center justify-center"
            onClick={handleAddTask}
          >
            <ListTodo className="w-3 h-3 mr-1" />
            + Tarea
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Modal simple para demo
function AddSubjectModal({ onClose, onQuickAdd }: { onClose: () => void, onQuickAdd: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 m-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Agregar Nueva Materia</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Para el testing, usaremos la función de agregar rápido con datos aleatorios.
        </p>
        
        <div className="flex space-x-3">
          <Button 
            onClick={() => {
              onQuickAdd();
              onClose();
            }}
            className="flex-1"
          >
            Agregar Materia Demo
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}