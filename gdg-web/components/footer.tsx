'use client';

export default function Footer() {
  return (
    <footer className="border-t border-lime-200 bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <img src="/logo_icon.svg" alt="GDG Logo" className="w-8 h-8" />
                        <div className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
                            GDG
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                    Creating the next generation of game developers, one project at a time.
                    </p>
                </div>
            
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/#about" className="text-gray-600 hover:text-lime-600 transition-colors">About</a></li>
                        <li><a href="/#gamejam" className="text-gray-600 hover:text-lime-600 transition-colors">Game Jam</a></li>
                        <li><a href="/#workshops" className="text-gray-600 hover:text-lime-600 transition-colors">Workshops</a></li>
                        <li><a href="/#projects" className="text-gray-600 hover:text-lime-600 transition-colors">Projects</a></li>
                        <li><a href="/eboard" className="text-gray-600 hover:text-lime-600 transition-colors">Eboard</a></li>
                    </ul>
                </div>
            
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-lime-600 transition-colors">Tutorials</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-lime-600 transition-colors">Tools</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-lime-600 transition-colors">Assets</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-lime-600 transition-colors">FAQ</a></li>
                    </ul>
                </div>
            
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-lime-600 transition-colors">Discord</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-lime-600 transition-colors">Instagram</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-lime-600 transition-colors">Twitter</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-lime-600 transition-colors">GitHub</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-lime-200 pt-8 text-center text-gray-600 text-sm">
                <p>&copy; 2025 Game Development Group. Made with 💚 by our members.</p>
            </div>
        </div>
    </footer>
  );
}