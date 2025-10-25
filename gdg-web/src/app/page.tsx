'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown Timer for Game Jam
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Game Jam starts November 7th, 2025 at 6 PM
      const targetDate = new Date('2025-11-07T18:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-lime-500/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo_icon.svg" alt="GDG Logo" className="w-10 h-10" />
            <div className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
              GDG
            </div>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">About</a>
            <a href="#gamejam" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Game Jam</a>
            <a href="#workshops" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Workshops</a>
            <a href="#projects" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Projects</a>
            <a href="#community" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Community</a>
            <a href="/eboard" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Eboard</a>
          </div>
          <button className="bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-lime-500/50 transition-all">
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-lime-50 via-white to-emerald-50">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(184, 214, 46, 0.3) 0%, transparent 50%)',
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute top-20 left-20 w-72 h-72 bg-lime-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(184,214,46,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(184,214,46,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
          
          {/* Floating Pixel Squares */}
          <div className="absolute top-40 left-10 w-12 h-12 bg-lime-400/40 animate-float" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}></div>
          <div className="absolute top-60 right-32 w-16 h-16 bg-emerald-400/40 animate-float delay-1000" style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-block mb-4 px-4 py-2 bg-lime-500/10 border border-lime-500/40 rounded-full text-lime-700 text-sm font-semibold">
            ⚡ Level Up Your Game Dev Skills
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-lime-500 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-gradient">
              Create. Build. Play.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the ultimate game development community where creativity meets code. 
            Build amazing games, learn from peers, and bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-white rounded-full font-bold text-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-lime-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <a href="/eboard" className="px-8 py-4 border-2 border-lime-500 text-lime-700 rounded-full font-bold text-lg hover:bg-lime-500/10 transition-colors text-center">
              Meet Our Team
            </a>
            <button className="px-8 py-4 border-2 border-emerald-500 text-emerald-700 rounded-full font-bold text-lg hover:bg-emerald-500/10 transition-colors">
              Watch Our Games
            </button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-lime-600">50+</div>
              <div className="text-gray-600 mt-1">Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600">30+</div>
              <div className="text-gray-600 mt-1">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">Weekly</div>
              <div className="text-gray-600 mt-1">Meetups</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-lime-500 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-lime-500 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
              Why Join GDG?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Whether you're a beginner or experienced developer, we provide everything you need to succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group p-8 bg-gradient-to-b from-lime-50 to-white border border-lime-200 rounded-2xl hover:border-lime-400 transition-all hover:shadow-xl hover:shadow-lime-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎮</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Beginner Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Never coded before? No problem! Our workshops start from the basics and guide you through 
                creating your first game with hands-on support.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group p-8 bg-gradient-to-b from-emerald-50 to-white border border-emerald-200 rounded-2xl hover:border-emerald-400 transition-all hover:shadow-xl hover:shadow-emerald-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Real Projects</h3>
              <p className="text-gray-600 leading-relaxed">
                Work on actual games that people will play. Build your portfolio with projects that 
                showcase your skills to future employers or colleges.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group p-8 bg-gradient-to-b from-green-50 to-white border border-green-200 rounded-2xl hover:border-green-400 transition-all hover:shadow-xl hover:shadow-green-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Amazing Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with fellow game enthusiasts, collaborate on projects, and make lifelong friends 
                who share your passion for creating games.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Jam Section */}
      <section id="gamejam" className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-lime-50 to-emerald-50">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-100/30 to-emerald-100/30" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-lime-500/10 border border-lime-500/40 rounded-full text-lime-700 text-sm font-semibold">
                🏆 Annual Event
              </div>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
                Epic Game Jam
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Our legendary 48-hour game jam is where magic happens. Form teams, brainstorm wild ideas, 
                and create a complete game from scratch in just one weekend.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-lime-600 text-xl">✓</span>
                  <span className="text-gray-700">48 hours of non-stop creativity and coding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lime-600 text-xl">✓</span>
                  <span className="text-gray-700">Prizes for best games in multiple categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lime-600 text-xl">✓</span>
                  <span className="text-gray-700">Free food, drinks, and swag throughout</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lime-600 text-xl">✓</span>
                  <span className="text-gray-700">Mentors available to help when you're stuck</span>
                </li>
              </ul>
              <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-lime-500/50 transition-all">
                Register for Next Jam
              </button>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-lime-100/50 to-emerald-100/50 border border-lime-300 p-8 flex items-center justify-center shadow-lg">
                <div className="text-center w-full">
                  <div className="text-7xl mb-4">🎯</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">November 7th, 2025</div>
                  <div className="text-lg text-lime-700 mb-6">6:00 PM</div>
                  
                  {/* Countdown Timer */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-3 uppercase tracking-wider">Starts In</div>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="bg-white/80 rounded-lg p-3 border border-lime-300 shadow-sm">
                        <div className="text-3xl font-bold text-lime-600">{timeLeft.days}</div>
                        <div className="text-xs text-gray-600 mt-1">DAYS</div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 border border-emerald-300 shadow-sm">
                        <div className="text-3xl font-bold text-emerald-600">{timeLeft.hours}</div>
                        <div className="text-xs text-gray-600 mt-1">HRS</div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 border border-green-300 shadow-sm">
                        <div className="text-3xl font-bold text-green-600">{timeLeft.minutes}</div>
                        <div className="text-xs text-gray-600 mt-1">MIN</div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 border border-lime-300 shadow-sm">
                        <div className="text-3xl font-bold text-lime-600">{timeLeft.seconds}</div>
                        <div className="text-xs text-gray-600 mt-1">SEC</div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-center pt-4 border-t border-lime-300">
                    <div>
                      <div className="text-xl font-bold text-emerald-600">48hrs</div>
                      <div className="text-xs text-gray-600">Duration</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">$$$</div>
                      <div className="text-xs text-gray-600">Prizes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-24 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent">
              Weekly Workshops
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Learn new skills every week with hands-on workshops covering everything from Unity basics to advanced AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Workshop Card 1 */}
            <div className="group relative overflow-hidden rounded-xl border border-lime-200 bg-white hover:border-lime-400 transition-all shadow-sm hover:shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-lime-100 to-lime-50 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform">🎨</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900">Game Art Basics</h3>
                <p className="text-gray-600 text-sm mb-4">Learn pixel art and 2D design fundamentals</p>
                <div className="text-lime-600 text-sm font-semibold">Beginner Friendly</div>
              </div>
            </div>

            {/* Workshop Card 2 */}
            <div className="group relative overflow-hidden rounded-xl border border-emerald-200 bg-white hover:border-emerald-400 transition-all shadow-sm hover:shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform">🎮</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900">Unity Fundamentals</h3>
                <p className="text-gray-600 text-sm mb-4">Master the most popular game engine</p>
                <div className="text-emerald-600 text-sm font-semibold">All Levels</div>
              </div>
            </div>

            {/* Workshop Card 3 */}
            <div className="group relative overflow-hidden rounded-xl border border-green-200 bg-white hover:border-green-400 transition-all shadow-sm hover:shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform">🔊</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900">Sound Design</h3>
                <p className="text-gray-600 text-sm mb-4">Create immersive audio experiences</p>
                <div className="text-green-600 text-sm font-semibold">Intermediate</div>
              </div>
            </div>

            {/* Workshop Card 4 */}
            <div className="group relative overflow-hidden rounded-xl border border-lime-200 bg-white hover:border-lime-400 transition-all shadow-sm hover:shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-lime-100 to-lime-50 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform">🤖</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900">AI & NPCs</h3>
                <p className="text-gray-600 text-sm mb-4">Build intelligent game characters</p>
                <div className="text-lime-600 text-sm font-semibold">Advanced</div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Workshops every Tuesday & Thursday at 6 PM</p>
            <button className="px-6 py-3 border-2 border-emerald-500 text-emerald-700 rounded-full hover:bg-emerald-500/10 transition-colors font-semibold">
              View Full Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/20 to-lime-100/20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
              Our Games
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Check out the incredible games our members have created
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-lime-200 hover:border-lime-400 transition-all hover:shadow-2xl hover:shadow-lime-200/50">
              <div className="aspect-video bg-gradient-to-br from-lime-100 to-lime-50 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform">🚀</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Space Odyssey</h3>
                <p className="text-gray-600 mb-4">A retro space shooter with modern mechanics</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-lime-100 border border-lime-300 rounded-full text-lime-700 text-xs">Unity</span>
                  <span className="px-3 py-1 bg-lime-100 border border-lime-300 rounded-full text-lime-700 text-xs">C#</span>
                  <span className="px-3 py-1 bg-lime-100 border border-lime-300 rounded-full text-lime-700 text-xs">2D</span>
                </div>
                <button className="text-lime-600 hover:text-lime-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Play Game <span>→</span>
                </button>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-emerald-200 hover:border-emerald-400 transition-all hover:shadow-2xl hover:shadow-emerald-200/50">
              <div className="aspect-video bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform">🏰</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Dungeon Crawler</h3>
                <p className="text-gray-600 mb-4">Procedurally generated roguelike adventure</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-full text-emerald-700 text-xs">Godot</span>
                  <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-full text-emerald-700 text-xs">GDScript</span>
                  <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-full text-emerald-700 text-xs">Pixel Art</span>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Play Game <span>→</span>
                </button>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-green-200 hover:border-green-400 transition-all hover:shadow-2xl hover:shadow-green-200/50">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform">🧩</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Mind Bender</h3>
                <p className="text-gray-600 mb-4">Physics-based puzzle platformer</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-green-100 border border-green-300 rounded-full text-green-700 text-xs">Unreal</span>
                  <span className="px-3 py-1 bg-green-100 border border-green-300 rounded-full text-green-700 text-xs">Blueprint</span>
                  <span className="px-3 py-1 bg-green-100 border border-green-300 rounded-full text-green-700 text-xs">3D</span>
                </div>
                <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Play Game <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-lime-500/50 transition-all">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent">
              Join Our Community
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              More than just coding - it's about the friends you make and the fun you have along the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Community Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-lime-50 to-white border border-lime-200 rounded-2xl shadow-sm">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Fun Events</h3>
              <p className="text-gray-700 leading-relaxed">
                Game nights, tournaments, movie screenings, and social hangouts. We're not all work - 
                we know how to have a great time together!
              </p>
            </div>

            {/* Community Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl shadow-sm">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Active Discord</h3>
              <p className="text-gray-700 leading-relaxed">
                Join our Discord server with dedicated channels for different game engines, art, 
                sound design, and general gaming chat. Get help anytime!
              </p>
            </div>

            {/* Community Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl shadow-sm">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Showcase Your Work</h3>
              <p className="text-gray-700 leading-relaxed">
                Present your games to the club and get constructive feedback. We celebrate every 
                achievement, from "Hello World" to full releases!
              </p>
            </div>

            {/* Community Feature 4 */}
            <div className="p-8 bg-gradient-to-br from-lime-50 to-white border border-lime-200 rounded-2xl shadow-sm">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Mentorship Program</h3>
              <p className="text-gray-700 leading-relaxed">
                Get paired with experienced developers who can guide you through your game dev 
                journey and help you overcome any challenges.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-lime-50 border border-lime-200 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "I went from never having coded to publishing my first game on Steam. 
                This club changed my life!"
              </p>
              <div className="text-lime-700 font-semibold">- Alex, Sophomore</div>
            </div>

            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The Game Jam was the most intense and fun 48 hours of my college experience. 
                Can't wait for the next one!"
              </p>
              <div className="text-emerald-700 font-semibold">- Jordan, Junior</div>
            </div>

            <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "I found my best friends here and learned skills that landed me a game dev internship. 
                Best club on campus!"
              </p>
              <div className="text-green-700 font-semibold">- Sam, Senior</div>
            </div>
          </div>

          {/* Eboard Spotlight */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-lime-50 to-emerald-50 rounded-2xl p-8 border border-lime-200">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Meet Our Leadership Team</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Get to know the passionate students who make GDG possible. 
                Each member brings unique skills and dedication to our community.
              </p>
              <a 
                href="/eboard" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-lime-500/50 transition-all group"
              >
                Meet the Eboard
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-lime-100 to-emerald-100">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-200/40 to-emerald-200/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,214,46,0.2)_0%,transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-lime-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
            Ready to Create Your First Game?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join us for our next meeting and start your game development journey today. 
            All skill levels welcome!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all">
              Join GDG Today
            </button>
            <button className="px-8 py-4 border-2 border-lime-600 text-lime-700 rounded-full font-bold text-lg hover:bg-lime-500/10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="#about" className="text-gray-600 hover:text-lime-600 transition-colors">About</a></li>
                <li><a href="#gamejam" className="text-gray-600 hover:text-lime-600 transition-colors">Game Jam</a></li>
                <li><a href="#workshops" className="text-gray-600 hover:text-lime-600 transition-colors">Workshops</a></li>
                <li><a href="#projects" className="text-gray-600 hover:text-lime-600 transition-colors">Projects</a></li>
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
    </main>
  );
}

