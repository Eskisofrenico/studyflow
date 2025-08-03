import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            StudyFlow - Gestión Académica
          </h1>
          <p className="text-gray-600 mb-6">
            Tu sistema de gestión universitario profesional
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">
                Comenzar Ahora
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Ver Demo
              </Button>
            </Link>
          </div>
          
          {/* Demo credentials reminder */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-1">
              Credenciales de prueba:
            </p>
            <p className="text-xs text-blue-700">
              Email: demo@studyflow.com | Contraseña: demo123
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}