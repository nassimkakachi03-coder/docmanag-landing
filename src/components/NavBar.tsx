import { Link } from "react-router";
import { Activity } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 rounded-xl">
              <Activity className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-xl font-bold flex items-center tracking-tight bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              Dr Kakachi
            </span>
          </Link>
          
          <div className="flex space-x-8">
            <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Accueil</Link>
            <Link to="/services" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Nos Soins</Link>
            <Link to="/contact" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
