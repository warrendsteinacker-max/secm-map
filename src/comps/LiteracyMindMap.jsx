import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Circle } from 'lucide-react';

const LiteracyMindMap = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <h1 className="text-3xl font-bold text-blue-800 text-center mb-2">
            Part 4a: Literacy Mind Map
          </h1>
          <p className="text-center text-slate-600">
            Integrated K–3 Reading Components
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleZoomIn}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <ZoomIn className="w-5 h-5" />
            Zoom In
          </button>
          <button
            onClick={handleZoomOut}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <ZoomOut className="w-5 h-5" />
            Zoom Out
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Reset View
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
            <span className="text-sm font-semibold text-slate-700">
              Zoom: {Math.round(scale * 100)}%
            </span>
          </div>
        </div>

        {/* Canvas Container */}
        <div 
          ref={containerRef}
          className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-blue-200"
          style={{ height: '700px', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              width: '1800px',
              height: '1400px',
              position: 'relative',
              margin: '0 auto'
            }}
          >
            <svg width="1800" height="1400" style={{ position: 'absolute', top: 0, left: 0 }}>
              <defs>
                <marker id="arrowblue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <polygon points="0 0, 12 6, 0 12" fill="#3b82f6" />
                </marker>
                <marker id="arrowgreen" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <polygon points="0 0, 12 6, 0 12" fill="#10b981" />
                </marker>
                <marker id="arrowpurple" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <polygon points="0 0, 12 6, 0 12" fill="#8b5cf6" />
                </marker>
                <marker id="arroworange" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <polygon points="0 0, 12 6, 0 12" fill="#f59e0b" />
                </marker>
              </defs>

              {/* Main connections from center */}
              <path d="M 900 700 Q 750 550 600 420" stroke="#3b82f6" strokeWidth="4" fill="none" markerEnd="url(#arrowblue)"/>
              <path d="M 900 700 Q 1050 550 1200 420" stroke="#10b981" strokeWidth="4" fill="none" markerEnd="url(#arrowgreen)"/>
              <path d="M 900 700 Q 750 850 600 980" stroke="#8b5cf6" strokeWidth="4" fill="none" markerEnd="url(#arrowpurple)"/>
              <path d="M 900 700 Q 1050 850 1200 980" stroke="#f59e0b" strokeWidth="4" fill="none" markerEnd="url(#arroworange)"/>
              
              {/* Interconnections with symbols */}
              {/* A: Word Recognition to Fluency */}
              <path d="M 650 400 Q 800 360 1150 400" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowblue)"/>
              {/* B: Fluency to Comprehension */}
              <path d="M 1220 470 Q 1280 700 1220 930" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrowgreen)"/>
              {/* C: Comprehension to Vocabulary */}
              <path d="M 1150 1000 Q 800 1040 650 1000" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arroworange)"/>
              {/* D: Vocabulary to Word Recognition */}
              <path d="M 580 930 Q 520 700 580 470" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowpurple)"/>
            </svg>

            {/* Connection Symbol Labels */}
            <div className="absolute bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg" style={{ left: '880px', top: '350px' }}>A</div>
            <div className="absolute bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg" style={{ left: '1280px', top: '680px' }}>B</div>
            <div className="absolute bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg" style={{ left: '880px', top: '1050px' }}>C</div>
            <div className="absolute bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg" style={{ left: '480px', top: '680px' }}>D</div>

            {/* Center Node */}
            <div className="absolute" style={{ left: '720px', top: '600px', width: '360px' }}>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-8 shadow-2xl border-4 border-white">
                <h2 className="text-3xl font-bold text-center mb-3">
                  Balanced Literacy Instruction in K–3
                </h2>
                <p className="text-center text-sm opacity-90">
                  Four Essential Components Working Together
                </p>
              </div>
            </div>

            {/* Word Recognition - Top Left */}
            <div className="absolute" style={{ left: '280px', top: '180px', width: '340px' }}>
              <div className="bg-blue-100 rounded-2xl p-6 shadow-xl border-4 border-blue-500">
                <div className="bg-blue-500 text-white rounded-xl p-4 mb-3">
                  <h3 className="text-2xl font-bold text-center">Word Recognition</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border-2 border-blue-300">
                    <p className="font-bold text-blue-900 text-sm mb-1">Definition:</p>
                    <p className="text-slate-700 text-sm">Ability to identify and decode words using phonics and word analysis skills</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-300">
                    <p className="font-bold text-blue-900 text-sm mb-1">Classroom Example:</p>
                    <p className="text-slate-700 text-sm">Word sorts with short vowels (CVC patterns)</p>
                  </div>
                  <div className="bg-blue-600 text-white rounded-lg p-3">
                    <p className="font-bold text-sm mb-2">Connects to:</p>
                    <ul className="text-xs space-y-1">
                      <li>→ Builds automaticity for fluency (A)</li>
                      <li>→ Supports vocabulary development</li>
                      <li>→ Enables comprehension</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs italic text-slate-600 mt-3 text-center">
                  (Tompkins et al., 2021, p. 136)
                </p>
              </div>
            </div>

            {/* Fluency - Top Right */}
            <div className="absolute" style={{ left: '1180px', top: '180px', width: '340px' }}>
              <div className="bg-green-100 rounded-2xl p-6 shadow-xl border-4 border-green-500">
                <div className="bg-green-500 text-white rounded-xl p-4 mb-3">
                  <h3 className="text-2xl font-bold text-center">Reading Fluency</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border-2 border-green-300">
                    <p className="font-bold text-green-900 text-sm mb-1">Definition:</p>
                    <p className="text-slate-700 text-sm">Reading accurately, quickly, with expression (automaticity, speed, prosody)</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border-2 border-green-300">
                    <p className="font-bold text-green-900 text-sm mb-1">Classroom Example:</p>
                    <p className="text-slate-700 text-sm">Paired repeated reading with partner feedback</p>
                  </div>
                  <div className="bg-green-600 text-white rounded-lg p-3">
                    <p className="font-bold text-sm mb-2">Connects to:</p>
                    <ul className="text-xs space-y-1">
                      <li>→ Requires word recognition (A)</li>
                      <li>→ Improves comprehension (B)</li>
                      <li>→ Enhances vocabulary acquisition</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs italic text-slate-600 mt-3 text-center">
                  (Tompkins et al., 2021, p. 136)
                </p>
              </div>
            </div>

            {/* Vocabulary - Bottom Left */}
            <div className="absolute" style={{ left: '280px', top: '800px', width: '340px' }}>
              <div className="bg-purple-100 rounded-2xl p-6 shadow-xl border-4 border-purple-500">
                <div className="bg-purple-500 text-white rounded-xl p-4 mb-3">
                  <h3 className="text-2xl font-bold text-center">Vocabulary</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border-2 border-purple-300">
                    <p className="font-bold text-purple-900 text-sm mb-1">Definition:</p>
                    <p className="text-slate-700 text-sm">Knowledge of word meanings (Tier 1: basic, Tier 2: academic, Tier 3: specialized)</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 border-2 border-purple-300">
                    <p className="font-bold text-purple-900 text-sm mb-1">Classroom Example:</p>
                    <p className="text-slate-700 text-sm">Word webs for new story words</p>
                  </div>
                  <div className="bg-purple-600 text-white rounded-lg p-3">
                    <p className="font-bold text-sm mb-2">Connects to:</p>
                    <ul className="text-xs space-y-1">
                      <li>→ Enhanced by word recognition (D)</li>
                      <li>→ Critical for comprehension (C)</li>
                      <li>→ Supports fluent reading</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs italic text-slate-600 mt-3 text-center">
                  (Tompkins et al., 2021, pp. 184-185)
                </p>
              </div>
            </div>

            {/* Comprehension - Bottom Right */}
            <div className="absolute" style={{ left: '1180px', top: '800px', width: '340px' }}>
              <div className="bg-orange-100 rounded-2xl p-6 shadow-xl border-4 border-orange-500">
                <div className="bg-orange-500 text-white rounded-xl p-4 mb-3">
                  <h3 className="text-2xl font-bold text-center">Comprehension</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border-2 border-orange-300">
                    <p className="font-bold text-orange-900 text-sm mb-1">Definition:</p>
                    <p className="text-slate-700 text-sm">Understanding and making meaning from text - the ultimate reading goal</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 border-2 border-orange-300">
                    <p className="font-bold text-orange-900 text-sm mb-1">Classroom Example:</p>
                    <p className="text-slate-700 text-sm">Story maps and retelling wheels</p>
                  </div>
                  <div className="bg-orange-600 text-white rounded-lg p-3">
                    <p className="font-bold text-sm mb-2">Connects to:</p>
                    <ul className="text-xs space-y-1">
                      <li>→ Relies on fluent reading (B)</li>
                      <li>→ Requires vocabulary (C)</li>
                      <li>→ Integrates all components</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs italic text-slate-600 mt-3 text-center">
                  (Michigan Dept. of Ed., n.d., p. 17)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Index */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
            Connection Index: How Components Interact
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">A</div>
                <h4 className="font-bold text-slate-800">Word Recognition → Fluency</h4>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Automaticity enables fluent reading.</strong> When students recognize words automatically without conscious decoding effort, they achieve the 95% accuracy needed for fluency. Tompkins et al. (2021) explain that readers must "recognize most words automatically" to read fluently, freeing cognitive resources for comprehension (p. 136).
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">B</div>
                <h4 className="font-bold text-slate-800">Fluency → Comprehension</h4>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Fluent reading improves understanding.</strong> When students read at 100+ words per minute with proper expression and phrasing, they can focus mental energy on making meaning rather than decoding. Research shows fluent readers comprehend significantly better than non-fluent readers (Tompkins et al., 2021, p. 136).
              </p>
            </div>

            <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-600">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">C</div>
                <h4 className="font-bold text-slate-800">Comprehension → Vocabulary</h4>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Vocabulary knowledge supports meaning-making.</strong> Understanding Tier 2 academic vocabulary is essential for comprehension across content areas. As Tompkins et al. (2021) emphasize, teaching academic vocabulary "has a powerful impact on learning" because these words appear frequently in texts but less often in oral language (pp. 184-185).
              </p>
            </div>

            <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-600">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">D</div>
                <h4 className="font-bold text-slate-800">Vocabulary → Word Recognition</h4>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Decoding impacts vocabulary acquisition.</strong> Word study and phonics instruction help students decode unfamiliar vocabulary words. When students can apply word analysis skills, they can independently tackle new academic vocabulary, building both their decoding abilities and word knowledge simultaneously.
              </p>
            </div>
          </div>
        </div>

        {/* References */}
        <div className="bg-slate-100 rounded-lg shadow-md p-6 mt-4">
          <h4 className="font-bold text-slate-800 mb-3">References</h4>
          <div className="space-y-2 text-sm text-slate-700">
            <p className="ml-8 -indent-8">
              Michigan Department of Education. (n.d.). <em>Reading standards: Foundational skills (K–5)</em>.
            </p>
            <p className="ml-8 -indent-8">
              Tompkins, G. E., Rodgers, E., & Rodgers, A. (2021). <em>Literacy for the 21st century</em> (8th ed.). Pearson Education (US). https://reader.yuzu.com/books/9780135893401
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded">
          <p className="text-sm text-slate-700">
            <strong>Instructions:</strong> Use zoom controls to explore the mind map. Click and drag to pan. Letter symbols (A, B, C, D) mark key connections explained in the Connection Index below the map.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiteracyMindMap;