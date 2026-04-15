export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Cabinet Dr Kakachi</h3>
            <p className="text-sm leading-relaxed max-w-sm">Votre clinique dentaire de référence pour tous vos soins. Un professionnalisme garanti, une équipe à votre écoute et des prix abordables.</p>
          </div>
          <div>
            <h3 className="text-white text-sm font-bold mb-4 tracking-wider uppercase">Contact</h3>
            <ul className="text-sm space-y-3">
              <li className="flex items-center gap-2">
                <span>📍</span> El Biar, Alger
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> +213 555 12 34 56
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> <a href="mailto:contact@drkakachi.com" className="hover:text-teal-400 transition-colors">contact@drkakachi.com</a>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Cabinet Dr Kakachi. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
