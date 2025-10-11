import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#3d4e7a] font-mono text-white overflow-x-hidden relative">
      {/* Pixel Art Background - Inspired by Wizard Shock */}
      <div className="fixed inset-0 z-0">
        {/* Sky Gradient - Multiple layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3d4e7a] via-[#4a5a8a] to-[#5a6a9a]" />

        {/* Stars - scattered across the sky */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white"
            style={{
              width: Math.random() > 0.8 ? '3px' : '2px',
              height: Math.random() > 0.8 ? '3px' : '2px',
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.6 + Math.random() * 0.4,
              boxShadow: '0 0 2px rgba(255,255,255,0.5)'
            }}
          />
        ))}

        {/* Distant Mountain Silhouettes - Far background */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Far mountains - lighter */}
          <svg className="absolute bottom-32 w-full h-64 opacity-30" preserveAspectRatio="none" viewBox="0 0 1200 200">
            <polygon points="0,200 200,80 400,120 600,60 800,100 1000,70 1200,140 1200,200" fill="#2a2a4a" />
          </svg>

          {/* Mid mountains */}
          <svg className="absolute bottom-24 w-full h-72 opacity-50" preserveAspectRatio="none" viewBox="0 0 1200 200">
            <polygon points="0,200 150,100 350,140 550,80 750,130 950,90 1150,150 1200,200" fill="#1a1a3a" />
          </svg>
        </div>

        {/* Forest/Building Silhouettes - Foreground */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a] to-transparent" />

        {/* Trees and Buildings - Left Side */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Tree 1 - Far Left */}
          <div className="absolute bottom-0 left-[5%]">
            <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[80px] border-l-transparent border-r-transparent border-b-[#0a0a1a]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-20 bg-[#0a0a1a]" />
          </div>

          {/* Building Cluster 1 - Left */}
          <div className="absolute bottom-0 left-[12%] flex items-end gap-1">
            {/* Tall tower with windows */}
            <div className="relative">
              <div className="w-16 h-56 bg-[#0a0a1a] border-r border-[#1a1a2a]">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-3 w-8 h-4 bg-[#d4a02a]"
                    style={{
                      top: `${8 + i * 28}px`,
                      opacity: Math.random() > 0.3 ? 1 : 0.3
                    }}
                  />
                ))}
              </div>
              {/* Roof */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[32px] border-r-[32px] border-b-[32px] border-l-transparent border-r-transparent border-b-[#0a0a1a]" />
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-8 bg-[#0a0a1a]" />
            </div>

            {/* Medium building */}
            <div className="w-12 h-40 bg-[#0a0a1a]">
              <div className="absolute top-8 left-2 w-6 h-4 bg-[#d4a02a] opacity-80" />
              <div className="absolute top-20 left-2 w-6 h-4 bg-[#d4a02a]" />
              <div className="absolute top-32 left-2 w-6 h-4 bg-[#d4a02a] opacity-60" />
            </div>

            {/* Short building */}
            <div className="w-10 h-28 bg-[#0a0a1a]">
              <div className="absolute top-6 left-2 w-4 h-3 bg-[#d4a02a]" />
              <div className="absolute top-16 left-2 w-4 h-3 bg-[#d4a02a] opacity-70" />
            </div>
          </div>

          {/* Tree Cluster - Mid Left */}
          <div className="absolute bottom-0 left-[28%]">
            <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[70px] border-l-transparent border-r-transparent border-b-[#0a0a1a]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-16 bg-[#0a0a1a]" />
          </div>

          {/* Central Wizard Towers */}
          <div className="absolute bottom-0 left-[38%] flex items-end gap-2">
            {/* Main tall tower */}
            <div className="relative">
              <div className="w-20 h-72 bg-[#1a0a2a] border-2 border-[#0a0a1a]">
                <div className="absolute top-16 left-4 w-10 h-8 bg-[#ffd42a] opacity-90 shadow-[0_0_10px_rgba(255,212,42,0.5)]" />
                <div className="absolute top-32 left-4 w-10 h-8 bg-[#ffd42a] shadow-[0_0_10px_rgba(255,212,42,0.5)]" />
                <div className="absolute top-48 left-4 w-10 h-8 bg-[#ffd42a] opacity-80 shadow-[0_0_10px_rgba(255,212,42,0.5)]" />
                <div className="absolute top-64 left-4 w-10 h-8 bg-[#ffd42a] shadow-[0_0_10px_rgba(255,212,42,0.5)]" />
              </div>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[44px] border-r-[44px] border-b-[64px] border-l-transparent border-r-transparent border-b-[#2a1a3a]" />
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-1 h-12 bg-[#1a1a2a]" />
              <div className="absolute -top-26 left-1/2 w-8 h-6 bg-[#4a3a5a]" />
            </div>

            {/* Side tower */}
            <div className="relative">
              <div className="w-16 h-48 bg-[#1a0a2a] border-2 border-[#0a0a1a]">
                <div className="absolute top-12 left-3 w-8 h-6 bg-[#ffd42a] opacity-90 shadow-[0_0_8px_rgba(255,212,42,0.4)]" />
                <div className="absolute top-28 left-3 w-8 h-6 bg-[#ffd42a] shadow-[0_0_8px_rgba(255,212,42,0.4)]" />
              </div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[36px] border-r-[36px] border-b-[48px] border-l-transparent border-r-transparent border-b-[#2a1a3a]" />
            </div>

            {/* Small tower */}
            <div className="relative">
              <div className="w-12 h-36 bg-[#1a0a2a] border-2 border-[#0a0a1a]">
                <div className="absolute top-10 left-2 w-6 h-5 bg-[#ffd42a] opacity-85" />
                <div className="absolute top-24 left-2 w-6 h-5 bg-[#ffd42a]" />
              </div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[28px] border-r-[28px] border-b-[40px] border-l-transparent border-r-transparent border-b-[#2a1a3a]" />
            </div>
          </div>

          {/* Building with stairs - Right side */}
          <div className="absolute bottom-0 right-[25%]">
            <div className="relative">
              <div className="w-24 h-44 bg-[#0a0a1a]">
                <div className="absolute top-12 left-4 w-10 h-6 bg-[#d4a02a] opacity-90" />
                <div className="absolute top-28 left-4 w-10 h-6 bg-[#d4a02a]" />
              </div>
              {/* Stairs on the side */}
              <div className="absolute right-0 bottom-0 flex flex-col items-end">
                <div className="w-8 h-3 bg-[#0a0a1a] border-t border-[#1a1a2a]" />
                <div className="w-10 h-3 bg-[#0a0a1a] border-t border-[#1a1a2a]" />
                <div className="w-12 h-3 bg-[#0a0a1a] border-t border-[#1a1a2a]" />
                <div className="w-14 h-3 bg-[#0a0a1a] border-t border-[#1a1a2a]" />
              </div>
            </div>
          </div>

          {/* Tall tower - Right */}
          <div className="absolute bottom-0 right-[15%]">
            <div className="relative">
              <div className="w-18 h-60 bg-[#1a0a2a] border-2 border-[#0a0a1a]">
                <div className="absolute top-20 left-3 w-10 h-7 bg-[#ffd42a] opacity-95 shadow-[0_0_10px_rgba(255,212,42,0.5)]" />
                <div className="absolute top-40 left-3 w-10 h-7 bg-[#ffd42a] shadow-[0_0_10px_rgba(255,212,42,0.5)]" />
              </div>
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[56px] border-l-transparent border-r-transparent border-b-[#2a1a3a]" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-10 bg-[#1a1a2a]" />
            </div>
          </div>

          {/* Trees - Right side */}
          <div className="absolute bottom-0 right-[8%]">
            <div className="w-0 h-0 border-l-[28px] border-r-[28px] border-b-[75px] border-l-transparent border-r-transparent border-b-[#0a0a1a]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-18 bg-[#0a0a1a]" />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 bg-black/90 border-b-4 border-yellow-400 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-yellow-400 tracking-wider">
              &#9733; GAME DEV GROUP
            </div>
            <div className="hidden md:flex gap-8 items-center">
              <a href="#about" className="hover:text-yellow-400 transition-colors uppercase text-sm tracking-wider">
                About
              </a>
              <a href="#projects" className="hover:text-yellow-400 transition-colors uppercase text-sm tracking-wider">
                Projects
              </a>
              <a href="#events" className="hover:text-yellow-400 transition-colors uppercase text-sm tracking-wider">
                Events
              </a>
              <a href="#join" className="bg-yellow-400 text-black px-6 py-2 border-2 border-black hover:bg-yellow-300 transition-all font-bold">
                JOIN US
              </a>
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden text-yellow-400 text-2xl">
              ≡
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        {/* Header with pixel border effect */}
        <div className="text-center mb-16">
          <div className="inline-block bg-black/90 border-8 border-white p-8 shadow-2xl mb-8 backdrop-blur-sm" style={{ imageRendering: 'pixelated' }}>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-wider mb-4" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.8)' }}>
              GAME DEV
            </h1>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-wider text-yellow-400" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.8)' }}>
              GROUP
            </h2>
          </div>

          <p className="text-xl sm:text-2xl mb-4 px-4 bg-black/80 inline-block py-3 border-4 border-yellow-400 backdrop-blur-sm">
            &#9733; CREATE &#9733; PLAY &#9733; LEVEL UP &#9733;
          </p>

          <p className="text-lg sm:text-xl max-w-3xl mx-auto mt-6 px-4 leading-relaxed bg-black/60 py-3 rounded backdrop-blur-sm">
            A GUILD FULL OF ADVENTURES, CREATIVITY, AND ENDLESS RESPAWNS
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16 bg-black/90 border-4 border-white p-8 shadow-2xl backdrop-blur-sm">
          <h3 className="text-3xl font-bold mb-6 text-yellow-400 text-center border-b-4 border-yellow-400 pb-3">
            &gt; MISSION_LOG.TXT
          </h3>
          <p className="text-lg leading-relaxed mb-4">
            WE ARE A COMMUNITY OF STUDENT GAME DEVELOPERS, ARTISTS, DESIGNERS, AND STORYTELLERS WHO SHARE A PASSION FOR CREATING INTERACTIVE EXPERIENCES.
          </p>
          <p className="text-lg leading-relaxed">
            WHETHER YOU'RE A SEASONED DEVELOPER OR JUST PICKED UP YOUR FIRST CONTROLLER, JOIN US IN BUILDING THE NEXT GENERATION OF GAMES!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-16">
          <button className="group relative bg-yellow-400 text-black font-bold text-xl px-12 py-4 border-4 border-black shadow-lg hover:bg-yellow-300 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none w-full sm:w-auto">
            <span className="relative z-10">[A] JOIN THE PARTY</span>
          </button>

          <button className="group relative bg-purple-600 text-white font-bold text-xl px-12 py-4 border-4 border-white shadow-lg hover:bg-purple-500 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none w-full sm:w-auto">
            <span className="relative z-10">[B] VIEW PROJECTS</span>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-black/90 border-4 border-green-400 p-6 hover:border-green-300 transition-all hover:translate-y-[-4px] backdrop-blur-sm">
            <div className="text-4xl mb-4">&#128377;</div>
            <h3 className="text-2xl font-bold mb-3 text-green-400">GAME JAMS</h3>
            <p className="text-base">
              Participate in regular game jams and 48-hour coding marathons. Build games, make friends, earn XP!
            </p>
          </div>

          <div className="bg-black/90 border-4 border-blue-400 p-6 hover:border-blue-300 transition-all hover:translate-y-[-4px] backdrop-blur-sm">
            <div className="text-4xl mb-4">&#127918;</div>
            <h3 className="text-2xl font-bold mb-3 text-blue-400">WORKSHOPS</h3>
            <p className="text-base">
              Learn from experienced developers. Unity, Unreal, Godot, and more. All skill levels welcome!
            </p>
          </div>

          <div className="bg-black/90 border-4 border-pink-400 p-6 hover:border-pink-300 transition-all hover:translate-y-[-4px] backdrop-blur-sm">
            <div className="text-4xl mb-4">&#11088;</div>
            <h3 className="text-2xl font-bold mb-3 text-pink-400">COMMUNITY</h3>
            <p className="text-base">
              Connect with fellow game devs, share ideas, get feedback, and collaborate on epic projects!
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto bg-black/90 border-4 border-white p-6 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">50+</div>
              <div className="text-sm uppercase mt-1">Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">25+</div>
              <div className="text-sm uppercase mt-1">Games Made</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">10+</div>
              <div className="text-sm uppercase mt-1">Game Jams</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">∞</div>
              <div className="text-sm uppercase mt-1">Fun Had</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-white bg-black/90 py-8 mt-16 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4">
            PRESS START TO CONTINUE...
          </p>
          <div className="flex gap-6 justify-center items-center flex-wrap">
            <a href="#" className="hover:text-yellow-400 transition-colors text-sm uppercase">
              [Discord]
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors text-sm uppercase">
              [Instagram]
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors text-sm uppercase">
              [GitHub]
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors text-sm uppercase">
              [Events]
            </a>
          </div>
          <p className="text-sm mt-6 text-gray-400">
            © 2025 GAME DEV GROUP • MADE WITH ♥ AND &#9749;
          </p>
        </div>
      </footer>
    </div>
  );
}