import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

export default function HeaderBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Requisition App
          </Link>
          <span className="hidden md:inline text-xs md:text-sm text-muted-foreground">
            Developed by <span className="font-medium">Aditya Pratap Singh</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/forms')}>Form List</Button>
          <Button variant="outline" onClick={() => navigate('/')}>New Form</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}