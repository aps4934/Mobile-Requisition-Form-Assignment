import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border/50 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Requisition App • All rights reserved.
        </div>

        <div className="text-sm text-muted-foreground">
          Developed by <span className="font-medium">Aditya Pratap Singh</span>
        </div>

        <nav className="text-sm">
          <a
            className="text-muted-foreground hover:text-foreground px-2"
            href="https://www.linkedin.com/in/aps4934g/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            className="text-muted-foreground hover:text-foreground px-2"
            href="https://github.com/aps4934"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            className="text-muted-foreground hover:text-foreground px-2"
            href="https://portfolio-3hns.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
          >
            Portfolio
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
