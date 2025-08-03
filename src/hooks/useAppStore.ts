import { create } from 'zustand';
import { Subject, Task, Note } from '../types';

interface AppStore {
  // State
  subjects: Subject[];
  tasks: Task[];
  notes: Note[];
  
  // Modal states
  showAddSubjectModal: boolean;
  showAddTaskModal: boolean;
  showAddNoteModal: boolean;
  selectedItem: Subject | Task | Note | null;
  
  // Actions
  setSubjects: (subjects: Subject[]) => void;
  addSubject: (subject: Subject) => void;
  deleteSubject: (id: string) => void;
  
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  
  // Modal actions
  setShowAddSubjectModal: (show: boolean) => void;
  setShowAddTaskModal: (show: boolean) => void;
  setShowAddNoteModal: (show: boolean) => void;
  setSelectedItem: (item: Subject | Task | Note | null) => void;
  
  // Quick add functions
  quickAddSubject: (name: string, code: string) => void;
  quickAddTask: (title: string, subjectId?: string) => void;
  quickAddNote: (title: string, content: string, subjectId?: string) => void;
  
  // Inicializar datos demo
  initializeDemoData: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  subjects: [],
  tasks: [],
  notes: [],
  
  // Modal states
  showAddSubjectModal: false,
  showAddTaskModal: false,
  showAddNoteModal: false,
  selectedItem: null,

  setSubjects: (subjects) => set({ subjects }),
  addSubject: (subject) => set((state) => ({ 
    subjects: [...state.subjects, subject] 
  })),
  deleteSubject: (id) => set((state) => ({
    subjects: state.subjects.filter(s => s.id !== id),
    tasks: state.tasks.filter(t => t.subjectId !== id),
    notes: state.notes.filter(n => n.subjectId !== id)
  })),
  
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ 
    notes: [...state.notes, note] 
  })),
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(n => n.id !== id)
  })),
  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map(note => 
      note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
    )
  })),

  // Modal actions
  setShowAddSubjectModal: (show) => set({ showAddSubjectModal: show }),
  setShowAddTaskModal: (show) => set({ showAddTaskModal: show }),
  setShowAddNoteModal: (show) => set({ showAddNoteModal: show }),
  setSelectedItem: (item) => set({ selectedItem: item }),

  // Quick add functions para demos rápidos
  quickAddSubject: (name, code) => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name,
      code,
      credits: 4,
      color: ['blue', 'green', 'purple', 'yellow', 'red'][Math.floor(Math.random() * 5)],
      semester: '2025-1',
      professor: 'Prof. ' + name.split(' ')[0],
      schedule: 'Lun/Mié 10:00-12:00',
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    get().addSubject(newSubject);
  },

  quickAddTask: (title, subjectId) => {
    const subjects = get().subjects;
    const targetSubjectId = subjectId || (subjects.length > 0 ? subjects[0].id : '1');
    
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: `Descripción para: ${title}`,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días
      completed: false,
      priority: 'medium',
      subjectId: targetSubjectId,
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    get().addTask(newTask);
  },

  quickAddNote: (title, content, subjectId) => {
    const subjects = get().subjects;
    const targetSubjectId = subjectId || (subjects.length > 0 ? subjects[0].id : undefined);
    
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      tags: ['nueva', 'nota'],
      subjectId: targetSubjectId,
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    get().addNote(newNote);
  },

  initializeDemoData: () => {
    const demoSubjects: Subject[] = [
      {
        id: '1',
        name: 'Programación Web',
        code: 'ING-301',
        credits: 4,
        color: 'blue',
        semester: '2025-1',
        professor: 'Dr. García',
        schedule: 'Lun/Mié 10:00-12:00',
        userId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Base de Datos',
        code: 'ING-250',
        credits: 3,
        color: 'green',
        semester: '2025-1',
        professor: 'Dra. López',
        schedule: 'Mar/Jue 14:00-16:00',
        userId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const demoTasks: Task[] = [
      {
        id: '1',
        title: 'Proyecto Final React',
        description: 'Desarrollar aplicación web con React y TypeScript',
        dueDate: '2025-02-15T23:59:00.000Z',
        completed: false,
        priority: 'high',
        subjectId: '1',
        userId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const demoNotes: Note[] = [
      {
        id: '1',
        title: 'Conceptos de React Hooks',
        content: 'useState, useEffect, useContext... Los hooks permiten usar estado y otras características de React.',
        tags: ['React', 'JavaScript', 'Frontend'],
        subjectId: '1',
        userId: '1',
        createdAt: '2025-01-15',
        updatedAt: '2025-01-15'
      }
    ];

    set({ 
      subjects: demoSubjects, 
      tasks: demoTasks, 
      notes: demoNotes 
    });
  }
}));