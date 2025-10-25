'use client';

import { useState, useEffect, useRef } from 'react';

interface EboardMember {
  id: number;
  name: string;
  position: string;
  year: string;
  major: string;
  bio: string;
  funFact: string;
  favoriteGame: string;
  skills: string[];
  image: string;
  color: string;
}

const eboardMembers: EboardMember[] = [
  {
    id: 1,
    name: "Alex Chen",
    position: "President",
    year: "Senior",
    major: "Computer Science",
    bio: "Passionate about game development and community building. Started coding in high school and fell in love with creating interactive experiences.",
    funFact: "Can solve a Rubik's cube in under 30 seconds!",
    favoriteGame: "The Legend of Zelda: Breath of the Wild",
    skills: ["Unity", "C#", "Leadership", "Project Management"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    color: "lime"
  },
  {
    id: 2,
    name: "Jordan Martinez",
    position: "Vice President",
    year: "Junior",
    major: "Game Design",
    bio: "Specializes in 3D modeling and level design. Loves creating immersive worlds that tell compelling stories.",
    funFact: "Has a pet snake named Pixel!",
    favoriteGame: "Hollow Knight",
    skills: ["Blender", "Unreal Engine", "3D Art", "Level Design"],
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    color: "emerald"
  },
  {
    id: 3,
    name: "Sam Kim",
    position: "Treasurer",
    year: "Senior",
    major: "Business Administration",
    bio: "Handles all the financial aspects of the club while pursuing a passion for indie game development in their spare time.",
    funFact: "Collects vintage video game consoles!",
    favoriteGame: "Stardew Valley",
    skills: ["Finance", "Unity", "Pixel Art", "Community Management"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    color: "green"
  },
  {
    id: 4,
    name: "Taylor Williams",
    position: "Secretary",
    year: "Sophomore",
    major: "Digital Arts",
    bio: "Creative mind behind our social media and event planning. Loves bringing people together through shared interests in gaming.",
    funFact: "Can play 5 different instruments!",
    favoriteGame: "Celeste",
    skills: ["Social Media", "Event Planning", "Photoshop", "Communication"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    color: "lime"
  },
  {
    id: 5,
    name: "Riley Johnson",
    position: "Tech Lead",
    year: "Junior",
    major: "Computer Engineering",
    bio: "Our go-to person for technical challenges. Specializes in game engines and optimization techniques.",
    funFact: "Built their own gaming PC from scratch!",
    favoriteGame: "Factorio",
    skills: ["C++", "OpenGL", "Game Engines", "Optimization"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    color: "emerald"
  },
  {
    id: 6,
    name: "Casey Brown",
    position: "Event Coordinator",
    year: "Senior",
    major: "Marketing",
    bio: "Makes sure all our events run smoothly and everyone has a great time. Passionate about creating memorable experiences.",
    funFact: "Has been to 15 different gaming conventions!",
    favoriteGame: "Overwatch",
    skills: ["Event Planning", "Marketing", "Unity", "Team Building"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    color: "green"
  }
];

export default function EboardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextMember = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % eboardMembers.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevMember = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + eboardMembers.length) % eboardMembers.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToMember = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentMember = eboardMembers[currentIndex];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-lime-500/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo_icon.svg" alt="GDG Logo" className="w-10 h-10" />
            <div className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
              GDG
            </div>
          </a>
          <div className="hidden md:flex gap-8">
            <a href="/#about" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">About</a>
            <a href="/#gamejam" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Game Jam</a>
            <a href="/#workshops" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Workshops</a>
            <a href="/#projects" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Projects</a>
            <a href="/#community" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Community</a>
            <a href="/eboard" className="text-lime-600 font-semibold">Eboard</a>
          </div>
          <a href="/#community" className="bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-lime-500/50 transition-all">
            Join Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-emerald-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(184,214,46,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(184,214,46,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-lime-500/10 border border-lime-500/40 rounded-full text-lime-700 text-sm font-semibold">
            👥 Leadership Team
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-lime-500 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-gradient">
              Meet the Eboard
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get to know the amazing people who make GDG possible. 
            Each member brings unique skills and passion to our community.
          </p>
        </div>
      </section>

      {/* Eboard Cards Section */}
      <section className="py-16 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Main Card Display */}
          <div className="relative mb-12">
            <div 
              ref={containerRef}
              className="relative h-[600px] flex items-center justify-center"
            >
              {/* Background Cards */}
              {eboardMembers.map((member, index) => {
                const distance = Math.abs(index - currentIndex);
                const isActive = index === currentIndex;
                const isPrev = index === (currentIndex - 1 + eboardMembers.length) % eboardMembers.length;
                const isNext = index === (currentIndex + 1) % eboardMembers.length;
                
                if (distance > 2) return null;

                return (
                  <div
                    key={member.id}
                    className={`absolute transition-all duration-500 ease-out ${
                      isActive
                        ? 'scale-100 opacity-100 z-30'
                        : isPrev || isNext
                        ? 'scale-75 opacity-60 z-20'
                        : 'scale-50 opacity-30 z-10'
                    } ${
                      isPrev ? '-translate-x-32' : isNext ? 'translate-x-32' : 'translate-x-0'
                    }`}
                    style={{
                      transform: `translateX(${isPrev ? '-200px' : isNext ? '200px' : '0'}) scale(${isActive ? 1 : 0.75})`,
                    }}
                  >
                    <div className={`w-80 h-96 bg-white rounded-3xl shadow-2xl border-2 ${
                      member.color === 'lime' ? 'border-lime-300' :
                      member.color === 'emerald' ? 'border-emerald-300' :
                      'border-green-300'
                    } overflow-hidden group hover:shadow-3xl transition-all duration-300`}>
                      {/* Card Header */}
                      <div className={`h-32 bg-gradient-to-br ${
                        member.color === 'lime' ? 'from-lime-400 to-lime-500' :
                        member.color === 'emerald' ? 'from-emerald-400 to-emerald-500' :
                        'from-green-400 to-green-500'
                      } relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-bold text-xl">{member.name}</h3>
                            <p className="text-lime-100 text-sm">{member.position}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-sm font-medium">{member.year}</p>
                            <p className="text-lime-100 text-xs">{member.major}</p>
                          </div>
                        </div>
                      </div>

                      {/* Profile Image */}
                      <div className="relative -mt-16 flex justify-center">
                        <div className={`w-24 h-24 rounded-full border-4 ${
                          member.color === 'lime' ? 'border-lime-300' :
                          member.color === 'emerald' ? 'border-emerald-300' :
                          'border-green-300'
                        } overflow-hidden bg-white shadow-lg`}>
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 pt-2">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                          {member.bio}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Fun Fact</p>
                            <p className="text-sm text-gray-700 font-medium">{member.funFact}</p>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Favorite Game</p>
                            <p className="text-sm text-gray-700 font-medium">{member.favoriteGame}</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="mt-4">
                          <p className="text-xs text-gray-500 mb-2">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`px-2 py-1 text-xs rounded-full ${
                                  member.color === 'lime' ? 'bg-lime-100 text-lime-700' :
                                  member.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                                  'bg-green-100 text-green-700'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevMember}
              disabled={isAnimating}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-lime-200 flex items-center justify-center hover:bg-lime-50 transition-colors disabled:opacity-50 z-40"
            >
              <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextMember}
              disabled={isAnimating}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-lime-200 flex items-center justify-center hover:bg-lime-50 transition-colors disabled:opacity-50 z-40"
            >
              <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mb-8">
            {eboardMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToMember(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-lime-500 scale-125'
                    : 'bg-gray-300 hover:bg-lime-300'
                }`}
              />
            ))}
          </div>

          {/* Member Counter */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              {currentIndex + 1} of {eboardMembers.length} members
            </p>
          </div>
        </div>
      </section>

      {/* All Members Grid */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
              The Full Team
            </h2>
            <p className="text-gray-600 text-lg">
              Click on any member to learn more about them
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eboardMembers.map((member, index) => (
              <button
                key={member.id}
                onClick={() => goToMember(index)}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  index === currentIndex
                    ? 'border-lime-400 shadow-lg'
                    : member.color === 'lime'
                    ? 'border-lime-200 hover:border-lime-300'
                    : member.color === 'emerald'
                    ? 'border-emerald-200 hover:border-emerald-300'
                    : 'border-green-200 hover:border-green-300'
                }`}
              >
                <div className="bg-white p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full border-2 ${
                      member.color === 'lime' ? 'border-lime-300' :
                      member.color === 'emerald' ? 'border-emerald-300' :
                      'border-green-300'
                    } overflow-hidden`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-lime-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{member.position}</p>
                      <p className="text-gray-500 text-xs">{member.year} • {member.major}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio.substring(0, 100)}...
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-lime-100 to-emerald-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
            Want to Join Our Team?
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            We're always looking for passionate members to help lead our community. 
            Applications open each semester!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#community"
              className="px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-lime-500/50 transition-all"
            >
              Learn More
            </a>
            <a
              href="/#community"
              className="px-8 py-4 border-2 border-lime-600 text-lime-700 rounded-full font-bold hover:bg-lime-500/10 transition-colors"
            >
              Contact Us
            </a>
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
                <li><a href="/#about" className="text-gray-600 hover:text-lime-600 transition-colors">About</a></li>
                <li><a href="/#gamejam" className="text-gray-600 hover:text-lime-600 transition-colors">Game Jam</a></li>
                <li><a href="/#workshops" className="text-gray-600 hover:text-lime-600 transition-colors">Workshops</a></li>
                <li><a href="/#projects" className="text-gray-600 hover:text-lime-600 transition-colors">Projects</a></li>
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
