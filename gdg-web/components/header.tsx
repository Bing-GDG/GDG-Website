'use client';

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-lime-500/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo_icon.svg" alt="GDG Logo" className="w-10 h-10" />
          <div className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
            GDG
          </div>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="/#about" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">About</a>
          <a href="/#gamejam" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Game Jam</a>
          <a href="/#workshops" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Workshops</a>
          <a href="/#projects" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Projects</a>
          <a href="/#community" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Community</a>
          <a href="/eboard" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Eboard</a>
        </div>
        <button className="bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-lime-500/50 transition-all">
          Join Now
        </button>
      </div>
    </nav>
  );
}