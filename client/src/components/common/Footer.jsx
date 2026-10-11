import { Github, Code2, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <span className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              VoyageAI
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous multi-agent travel planning platform powered by React, Vite, Tailwind CSS, and Express.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-slate-200 cursor-pointer">React 18 &amp; Vite 6 HMR</li>
              <li className="hover:text-slate-200 cursor-pointer">Tailwind CSS Utility Styling</li>
              <li className="hover:text-slate-200 cursor-pointer">Express REST Microservice</li>
              <li className="hover:text-slate-200 cursor-pointer">Centralized API Wrapper</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Workspaces</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>/client (Port :5173)</li>
              <li>/server (Port :5000)</li>
              <li>.github/workflows/ci.yml</li>
              <li>npm run dev (concurrently)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Repository</h4>
            <div className="space-y-3 text-xs">
              <a
                href="https://github.com/Kimjurubyjane-013/Full_Stack"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-indigo-400 hover:text-indigo-300"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-[11px] text-slate-500">
                Maintained by Lead System Architect (Person 1), Frontend Specialist (Person 2), and Backend Specialist (Person 3).
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} VoyageAI &bull; Intelligent Multi-Agent Travel Planner. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Built with precision for team collaboration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
