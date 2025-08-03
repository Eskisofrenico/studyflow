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
            <Button size="lg">
              Comenzar Ahora
            </Button>
            <Button variant="outline" size="lg">
              Ver Demo
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}