'use client'
import { useEffect, useState } from 'react';
import { FileText, Plus, Search, Tag, Calendar, X, Edit, Eye } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/hooks/useAppStore';

export default function NotesPage() {
  const { user } = useAuth();
  const { 
    notes, 
    subjects, 
    initializeDemoData,
    quickAddNote,
    deleteNote,
    updateNote
  } = useAppStore();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    subjectId?: string;
  }
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Inicializar datos demo si no hay notas
  useEffect(() => {
    if (user && notes.length === 0) {
      initializeDemoData();
    }
  }, [user, notes.length, initializeDemoData]);

  // Función para obtener el nombre de la materia
  const getSubjectName = (subjectId?: string) => {
    if (!subjectId) return 'Sin materia';
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'Materia desconocida';
  };

  // Filtrar notas por búsqueda
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddNote = () => {
    setShowAddModal(true);
  };

  const handleQuickAddNote = () => {
    const noteTitles = [
      'Conceptos importantes del capítulo 5',
      'Resumen de la clase de hoy',
      'Fórmulas para el examen',
      'Ideas para el proyecto final',
      'Dudas sobre programación',
      'Recursos útiles encontrados'
    ];
    const randomTitle = noteTitles[Math.floor(Math.random() * noteTitles.length)];
    const content = `Esta es una nota sobre ${randomTitle}.\n\nPuntos importantes:\n- Punto 1\n- Punto 2\n- Punto 3\n\nNotas adicionales: Esta nota fue generada automáticamente para testing.`;
    
    quickAddNote(randomTitle, content);
    alert(`✅ Nota "${randomTitle}" guardada exitosamente!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notas</h1>
              <p className="text-gray-600 mt-2">
                Tus apuntes y notas de estudio ({filteredNotes.length} {searchTerm ? 'encontradas' : 'guardadas'})
              </p>
            </div>
            <Button onClick={handleAddNote}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Nota
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar en tus notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredNotes.length === 0 ? (
          <Card className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No se encontraron notas' : 'No tienes notas guardadas'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Intenta con otros términos de búsqueda'
                : 'Comienza creando tu primera nota de estudio'
              }
            </p>
            {!searchTerm && (
              <Button onClick={handleQuickAddNote}>
                <Plus className="w-4 h-4 mr-2" />
                Crear Primera Nota
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                subjectName={getSubjectName(note.subjectId)}
                onEdit={(note) => {
                  setSelectedNote(note);
                  setShowEditModal(true);
                }}
                onView={(note) => {
                  alert(`📝 ${note.title}\n\n${note.content}\n\nTags: ${note.tags.join(', ')}\nMateria: ${getSubjectName(note.subjectId)}`);
                }}
                onDelete={(noteId) => {
                  if (confirm('¿Eliminar esta nota?')) {
                    deleteNote(noteId);
                    alert('🗑️ Nota eliminada');
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal para Agregar Nota */}
      {showAddModal && (
        <AddNoteModal 
          onClose={() => setShowAddModal(false)}
          onQuickAdd={handleQuickAddNote}
        />
      )}

      {/* Modal para Editar Nota */}
      {showEditModal && selectedNote && (
        <EditNoteModal 
          note={selectedNote}
          onClose={() => {
            setShowEditModal(false);
            setSelectedNote(null);
          }}
          onSave={(updatedNote) => {
            updateNote(selectedNote.id, updatedNote);
            setShowEditModal(false);
            setSelectedNote(null);
            alert('✅ Nota actualizada exitosamente!');
          }}
        />
      )}
    </div>
  );
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  subjectId?: string;
}

interface NoteCardProps {
  note: Note;
  subjectName: string;
  onEdit: (note: Note) => void;
  onView: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

function NoteCard({ note, subjectName, onEdit, onView, onDelete }: NoteCardProps) {
  return (
    <Card hover className="h-fit">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500">{subjectName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
          </div>
          <button 
            onClick={() => onDelete(note.id)}
            className="text-red-400 hover:text-red-600 p-1"
            title="Eliminar nota"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2">{note.title}</h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {note.content}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1 flex items-center justify-center"
          onClick={() => onEdit(note)}
        >
          <Edit className="w-3 h-3 mr-1" />
          Editar
        </Button>
        <Button 
          size="sm" 
          variant="secondary" 
          className="flex-1 flex items-center justify-center"
          onClick={() => onView(note)}
        >
          <Eye className="w-3 h-3 mr-1" />
          Ver Completa
        </Button>
      </div>
    </Card>
  );
}

// Modal para agregar nota
function AddNoteModal({ onClose, onQuickAdd }: { onClose: () => void, onQuickAdd: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 m-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Nueva Nota</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Para el testing, usaremos la función de crear nota rápida con contenido de ejemplo.
        </p>
        
        <div className="flex space-x-3">
          <Button 
            onClick={() => {
              onQuickAdd();
              onClose();
            }}
            className="flex-1"
          >
            Crear Nota Demo
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

// Modal para editar nota
function EditNoteModal({ 
  note, 
  onClose, 
  onSave 
}: { 
  note: Note; 
  onClose: () => void; 
  onSave: (updatedNote: Note) => void;
}) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags.join(', '));

  const handleSave = () => {
    const updatedNote: Note = {
      id: note.id,
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      createdAt: note.createdAt,
      subjectId: note.subjectId
    };
    
    if (!updatedNote.title || !updatedNote.content) {
      alert('Título y contenido son obligatorios');
      return;
    }
    
    onSave(updatedNote);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Editar Nota</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Título de la nota"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Escribe el contenido de tu nota aquí..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (separados por comas)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tag1, tag2, tag3"
            />
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <Button onClick={handleSave} className="flex-1">
            Guardar Cambios
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}