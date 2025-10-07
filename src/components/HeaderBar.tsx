import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

export default function HeaderBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white dark:bg-neutral-950/80">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-neutral-800 flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 11h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-lg md:text-xl font-semibold text-foreground">Requisition App</div>
          </Link>
          <span className="hidden md:inline text-sm text-muted-foreground">Formal requisition form manager</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/forms')}>Saved Forms</Button>
          <Button variant="outline" onClick={() => navigate('/')}>New Form</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}