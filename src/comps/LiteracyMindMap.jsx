import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f1f5f9, #dbeafe)',
      padding: '1rem'
    },
    maxWidth: {
      maxWidth: '80rem',
      margin: '0 auto'
    },
    header: {
      background: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#1e40af',
      textAlign: 'center',
      marginBottom: '0.5rem'
    },
    subtitle: {
      textAlign: 'center',
      color: '#475569'
    },
    controls: {
      background: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: '#2563eb',
      color: 'white',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    buttonReset: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: '#475569',
      color: 'white',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    zoomDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: '#f1f5f9',
      borderRadius: '0.5rem'
    },
    canvasContainer: {
      background: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      border: '4px solid #bfdbfe',
      height: '700px',
      cursor: isDragging ? 'grabbing' : 'grab'
    },
    canvas: {
      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
      transformOrigin: 'center center',
      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      width: '1800px',
      height: '1400px',
      position: 'relative',
      margin: '0 auto'
    },
    centerNode: {
      position: 'absolute',
      left: '720px',
      top: '600px',
      width: '360px'
    },
    centerNodeInner: {
      background: 'linear-gradient(to bottom right, #2563eb, #7c3aed)',
      color: 'white',
      borderRadius: '1.5rem',
      padding: '2rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '4px solid white'
    },
    centerTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem'
    },
    centerSubtitle: {
      textAlign: 'center',
      fontSize: '0.875rem',
      opacity: 0.9
    },
    componentBox: {
      position: 'absolute',
      width: '340px'
    },
    blueBox: {
      background: '#dbeafe',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '4px solid #3b82f6'
    },
    greenBox: {
      background: '#d1fae5',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '4px solid #10b981'
    },
    purpleBox: {
      background: '#ede9fe',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '4px solid #8b5cf6'
    },
    orangeBox: {
      background: '#fed7aa',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '4px solid #f59e0b'
    },
    componentHeader: {
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '0.75rem',
      color: 'white'
    },
    componentTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    definitionBox: {
      background: 'white',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      marginBottom: '0.75rem'
    },
    exampleBox: {
      borderRadius: '0.5rem',
      padding: '0.75rem',
      marginBottom: '0.75rem'
    },
    connectsBox: {
      borderRadius: '0.5rem',
      padding: '0.75rem',
      color: 'white'
    },
    label: {
      fontWeight: 'bold',
      fontSize: '0.875rem',
      marginBottom: '0.25rem'
    },
    text: {
      fontSize: '0.875rem',
      color: '#334155'
    },
    citation: {
      fontSize: '0.75rem',
      fontStyle: 'italic',
      color: '#475569',
      marginTop: '0.75rem',
      textAlign: 'center'
    },
    symbolLabel: {
      position: 'absolute',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    connectionIndex: {
      background: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginTop: '1rem'
    },
    indexTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem'
    },
    indexCard: {
      padding: '1.25rem',
      borderRadius: '0.5rem'
    },
    indexCardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.5rem'
    },
    indexSymbol: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: 'white'
    },
    indexCardTitle: {
      fontWeight: 'bold',
      color: '#1e293b'
    },
    indexCardText: {
      color: '#475569',
      fontSize: '0.875rem',
      lineHeight: '1.5'
    },
    references: {
      background: '#f1f5f9',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
      marginTop: '1rem'
    },
    refTitle: {
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '0.75rem'
    },
    refText: {
      fontSize: '0.875rem',
      color: '#334155',
      marginLeft: '2rem',
      textIndent: '-2rem',
      marginBottom: '0.5rem'
    },
    instructions: {
      background: '#dbeafe',
      borderLeft: '4px solid #3b82f6',
      padding: '1rem',
      marginTop: '1rem',
      borderRadius: '0.25rem'
    },
    instructionsText: {
      fontSize: '0.875rem',
      color: '#334155'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Part 4a: Literacy Mind Map</h1>
          <p style={styles.subtitle}>Integrated K–3 Reading Components</p>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <button onClick={handleZoomIn} style={styles.button} onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'} onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
            <ZoomIn style={{ width: '1.25rem', height: '1.25rem' }} />
            Zoom In
          </button>
          <button onClick={handleZoomOut} style={styles.button} onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'} onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
            <ZoomOut style={{ width: '1.25rem', height: '1.25rem' }} />
            Zoom Out
          </button>
          <button onClick={handleReset} style={styles.buttonReset} onMouseOver={e => e.currentTarget.style.background = '#334155'} onMouseOut={e => e.currentTarget.style.background = '#475569'}>
            <RotateCcw style={{ width: '1.25rem', height: '1.25rem' }} />
            Reset View
          </button>
          <div style={styles.zoomDisplay}>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>
              Zoom: {Math.round(scale * 100)}%
            </span>
          </div>
        </div>

        {/* Canvas Container */}
        <div ref={containerRef} style={styles.canvasContainer} onMouseDown={handleMouseDown}>
          <div style={styles.canvas}>
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
              
              {/* Interconnections */}
              <path d="M 650 400 Q 800 360 1150 400" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowblue)"/>
              <path d="M 1220 470 Q 1280 700 1220 930" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrowgreen)"/>
              <path d="M 1150 1000 Q 800 1040 650 1000" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arroworange)"/>
              <path d="M 580 930 Q 520 700 580 470" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowpurple)"/>
            </svg>

            {/* Symbol Labels */}
            {/* <div style={{...styles.symbolLabel, background: '#2563eb', left: '880px', top: '350px'}}>A</div>
            <div style={{...styles.symbolLabel, background: '#10b981', left: '1280px', top: '680px'}}>B</div>
            <div style={{...styles.symbolLabel, background: '#f59e0b', left: '880px', top: '1050px'}}>C</div>
            <div style={{...styles.symbolLabel, background: '#8b5cf6', left: '480px', top: '680px'}}>D</div> */}

            {/* Center Node */}
            <div style={styles.centerNode}>
              <div style={styles.centerNodeInner}>
                <h2 style={styles.centerTitle}>Balanced Literacy Instruction in K–3</h2>
                <p style={styles.centerSubtitle}>Four Essential Components Working Together</p>
              </div>
            </div>

            {/* Word Recognition */}
            <div style={{...styles.componentBox, left: '280px', top: '180px'}}>
              <div style={styles.blueBox}>
                <div style={{...styles.componentHeader, background: '#3b82f6'}}>
                  <h3 style={styles.componentTitle}>Word Recognition</h3>
                </div>
                <div style={{...styles.definitionBox, border: '2px solid #93c5fd'}}>
                  <p style={{...styles.label, color: '#1e3a8a'}}>Definition:</p>
                  <p style={styles.text}>Ability to identify and decode words using phonics and word analysis skills</p>
                </div>
                <div style={{...styles.exampleBox, background: '#eff6ff', border: '2px solid #93c5fd'}}>
                  <p style={{...styles.label, color: '#1e3a8a'}}>Classroom Example:</p>
                  <p style={styles.text}>Word sorts with short vowels (CVC patterns) and images</p>
                </div>
                <div style={{...styles.connectsBox, background: '#2563eb'}}>
                  <p style={{...styles.label, color: 'white'}}>Connects to:</p>
                  <ul style={{ fontSize: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li>→ Builds fluency (A)</li>
                    <li>→ Supports vocabulary development (D)</li>
                    <li>→ Enables comprehension (C)</li>
                  </ul>
                </div>
                <p style={styles.citation}>Tompkins et al., 2021, p. 136</p>
              </div>
            </div>

            {/* Fluency */}
            <div style={{...styles.componentBox, left: '1180px', top: '180px'}}>
              <div style={styles.greenBox}>
                <div style={{...styles.componentHeader, background: '#10b981'}}>
                  <h3 style={styles.componentTitle}>Fluency</h3>
                </div>
                <div style={{...styles.definitionBox, border: '2px solid #6ee7b7'}}>
                  <p style={{...styles.label, color: '#064e3b'}}>Definition:</p>
                  <p style={styles.text}>Reading or writing accurately, quickly, with expression (automaticity, speed, prosody) or the opposite (inaccurate, slow, without expression)</p>
                </div>
                <div style={{...styles.exampleBox, background: '#f0fdf4', border: '2px solid #6ee7b7'}}>
                  <p style={{...styles.label, color: '#064e3b'}}>Classroom Example:</p>
                  <p style={styles.text}>Paired repeated reading or writing with partner feedback</p>
                </div>
                <div style={{...styles.connectsBox, background: '#059669'}}>
                  <p style={{...styles.label, color: 'white'}}>Connects to:</p>
                  <ul style={{ fontSize: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li>→ Requires word recognition (A)</li>
                    <li>→ Improves comprehension (B)</li>
                    <li>→ Enhances vocabulary acquisition (C)</li>
                  </ul>
                </div>
                <p style={styles.citation}>Tompkins et al., 2021, pp. 136-145</p>
              </div>
            </div>

            {/* Vocabulary */}
            <div style={{...styles.componentBox, left: '280px', top: '800px'}}>
              <div style={styles.purpleBox}>
                <div style={{...styles.componentHeader, background: '#8b5cf6'}}>
                  <h3 style={styles.componentTitle}>Vocabulary</h3>
                </div>
                <div style={{...styles.definitionBox, border: '2px solid #c4b5fd'}}>
                  <p style={{...styles.label, color: '#4c1d95'}}>Definition:</p>
                  <p style={styles.text}>Knowledge of word meanings (Tier 1: basic, Tier 2: academic, Tier 3: specialized)</p>
                </div>
                <div style={{...styles.exampleBox, background: '#faf5ff', border: '2px solid #c4b5fd'}}>
                  <p style={{...styles.label, color: '#4c1d95'}}>Classroom Example:</p>
                  <p style={styles.text}>Word webs and walls for new story words</p>
                </div>
                <div style={{...styles.connectsBox, background: '#7c3aed'}}>
                  <p style={{...styles.label, color: 'white'}}>Connects to:</p>
                  <ul style={{ fontSize: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li>→ Enhanced by word recognition (D)</li>
                    <li>→ Critical for comprehension (C)</li>
                    <li>→ Supports fluent reading and writing (B)</li>
                  </ul>
                </div>
                <p style={styles.citation}>Tompkins et al., 2021, pp. 184-185</p>
              </div>
            </div>

            {/* Comprehension */}
            <div style={{...styles.componentBox, left: '1180px', top: '850px'}}>
              <div style={styles.orangeBox}>
                <div style={{...styles.componentHeader, background: '#f59e0b'}}>
                  <h3 style={styles.componentTitle}>Comprehension</h3>
                </div>
                <div style={{...styles.definitionBox, border: '2px solid #fcd34d'}}>
                  <p style={{...styles.label, color: '#78350f'}}>Definition:</p>
                  <p style={styles.text}>A creative, multifaceted process where readers engage with text, draw on background knowledge, and develop understanding. Includes three levels: literal (facts), inferential (connections), and critical (analysis).</p>
                </div>
                <div style={{...styles.exampleBox, background: '#fffbeb', border: '2px solid #fcd34d'}}>
                  <p style={{...styles.label, color: '#78350f'}}>Classroom Example:</p>
                  <p style={styles.text}>Story maps and retelling wheels to assess literal, inferential, and critical comprehension levels</p>
                </div>
                <div style={{...styles.connectsBox, background: '#d97706'}}>
                  <p style={{...styles.label, color: 'white'}}>Connects to:</p>
                  <ul style={{ fontSize: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li>→ Relies on fluent reading (B)</li>
                    <li>→ Requires vocabulary (C)</li>
                    <li>→ Builds on word recognition (A)</li>
                  </ul>
                </div>
                <p style={styles.citation}>Tompkins et al., 2021, p. 221</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Index */}
        <div style={styles.connectionIndex}>
          <h3 style={styles.indexTitle}>Connection Index: How Components Interact</h3>
          <div style={styles.grid}>
            <div style={{...styles.indexCard, background: '#dbeafe', borderLeft: '4px solid #2563eb'}}>
              <div style={styles.indexCardHeader}>
                <div style={{...styles.indexSymbol, background: '#2563eb'}}>A</div>
                <h4 style={styles.indexCardTitle}>Word Recognition → Fluency</h4>
              </div>
              <p style={styles.indexCardText}>
                <strong>This automaticity enables fluent reading.</strong> As suggested by Tompkins et al. (2021) on page 136, reading fluency is a form of word recognition. When students can quickly and accurately decode words, they can read with appropriate speed and expression, leading to better overall fluency.
              </p>
            </div>

            <div style={{...styles.indexCard, background: '#d1fae5', borderLeft: '4px solid #10b981'}}>
              <div style={styles.indexCardHeader}>
                <div style={{...styles.indexSymbol, background: '#10b981'}}>B</div>
                <h4 style={styles.indexCardTitle}>Fluency → Comprehension</h4>
              </div>
              <p style={styles.indexCardText}>
                <strong>Fluent reading and writing improves understanding.</strong> According to Tompkins et al. (2021) on pages 221 and 136-145, reading and writing is a form of comprehension. This is because given the definition of comprehension on page 221, both types of fluency engage students to think about texts.
              </p>
            </div>

            <div style={{...styles.indexCard, background: '#fed7aa', borderLeft: '4px solid #f59e0b'}}>
              <div style={styles.indexCardHeader}>
                <div style={{...styles.indexSymbol, background: '#f59e0b'}}>C</div>
                <h4 style={styles.indexCardTitle}>Comprehension → Vocabulary</h4>
              </div>
              <p style={styles.indexCardText}>
                <strong>Vocabulary knowledge supports meaning-making.</strong> Tompkins et al. define comprehension as a creative, multifaceted process with three levels: literal comprehension (picking out main ideas and facts), inferential comprehension (reading between the lines to make connections), and critical comprehension (analyzing and evaluating). Understanding Tier 2 academic vocabulary is essential across all comprehension levels because these words appear frequently in texts but less often in oral language.
              </p>
            </div>

            <div style={{...styles.indexCard, background: '#ede9fe', borderLeft: '4px solid #8b5cf6'}}>
              <div style={styles.indexCardHeader}>
                <div style={{...styles.indexSymbol, background: '#8b5cf6'}}>D</div>
                <h4 style={styles.indexCardTitle}>Vocabulary → Word Recognition</h4>
              </div>
              <p style={styles.indexCardText}>
                <strong>Decoding impacts vocabulary acquisition.</strong> Word study and phonics instruction help students decode unfamiliar vocabulary words. When students can apply word analysis skills, they can independently tackle new academic vocabulary, building both their decoding abilities and word knowledge simultaneously.
              </p>
            </div>

            <div style={{...styles.indexCard, background: '#d1fae5', borderLeft: '4px solid #b97010ff'}}>
              <div style={styles.indexCardHeader}>
                <h4 style={styles.indexCardTitle}>How all Four Skills Work Together</h4>
              </div>
              <p style={styles.indexCardText}>
                As shown in the model, as one connection makes another connection, it essentially makes this branching effect that connects all four of them. For example, the overlapping part of vocabulary and word recognition makes a connection, and the blue arrow from word recognition to fluency makes the two on the left side connect to the other two on the right. Essentially, these four components work together to make balanced literacy instruction in K-3.
              </p>
            </div>
          </div>
        </div>

        {/* References */}
        <div style={styles.references}>
          <h4 style={styles.refTitle}>References</h4>
          <p style={styles.refText}>
            Michigan Department of Education. (n.d.). <em>Reading standards: Foundational skills (K–5)</em>.
          </p>
          <p style={styles.refText}>
            Tompkins, G. E., Rodgers, E., & Rodgers, A. (2021). <em>Literacy for the 21st century</em> (8th ed.). Pearson Education (US). https://reader.yuzu.com/books/9780135893401
          </p>
        </div>

        {/* Instructions */}
        <div style={styles.instructions}>
          <p style={styles.instructionsText}>
            <strong>Instructions:</strong> Use zoom controls to explore the mind map. Click and drag to pan. Letter symbols (A, B, C, D) mark key connections explained in the Connection Index below the map.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiteracyMindMap;











// import React, { useState, useRef, useEffect } from 'react';
// import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// const LiteracyMindMap = () => {
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);

//   const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
//   const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
//   const handleReset = () => {
//     setScale(1);
//     setPosition({ x: 0, y: 0 });
//   };

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setDragStart({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       setPosition({
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y
//       });
//     }
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   useEffect(() => {
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, dragStart]);

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: 'linear-gradient(to bottom right, #f1f5f9, #dbeafe)',
//       padding: '1rem'
//     },
//     maxWidth: {
//       maxWidth: '80rem',
//       margin: '0 auto'
//     },
//     header: {
//       background: 'white',
//       borderRadius: '0.75rem',
//       boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
//       padding: '1.5rem',
//       marginBottom: '1rem'
//     },
//     title: {
//       fontSize: '1.875rem',
//       fontWeight: 'bold',
//       color: '#1e40af',
//       textAlign: 'center',
//       marginBottom: '0.5rem'
//     },
//     subtitle: {
//       textAlign: 'center',
//       color: '#475569'
//     },
//     controls: {
//       background: 'white',
//       borderRadius: '0.5rem',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       padding: '1rem',
//       marginBottom: '1rem',
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '1rem',
//       flexWrap: 'wrap'
//     },
//     button: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.5rem 1rem',
//       background: '#2563eb',
//       color: 'white',
//       borderRadius: '0.5rem',
//       border: 'none',
//       cursor: 'pointer',
//       transition: 'all 0.3s',
//       fontSize: '0.875rem',
//       fontWeight: '500'
//     },
//     buttonReset: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.5rem 1rem',
//       background: '#475569',
//       color: 'white',
//       borderRadius: '0.5rem',
//       border: 'none',
//       cursor: 'pointer',
//       transition: 'all 0.3s',
//       fontSize: '0.875rem',
//       fontWeight: '500'
//     },
//     zoomDisplay: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.5rem 1rem',
//       background: '#f1f5f9',
//       borderRadius: '0.5rem'
//     },
//     canvasContainer: {
//       background: 'white',
//       borderRadius: '0.75rem',
//       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//       overflow: 'hidden',
//       border: '4px solid #bfdbfe',
//       height: '700px',
//       cursor: isDragging ? 'grabbing' : 'grab'
//     },
//     canvas: {
//       transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//       transformOrigin: 'center center',
//       transition: isDragging ? 'none' : 'transform 0.1s ease-out',
//       width: '1800px',
//       height: '1400px',
//       position: 'relative',
//       margin: '0 auto'
//     },
//     centerNode: {
//       position: 'absolute',
//       left: '720px',
//       top: '600px',
//       width: '360px'
//     },
//     centerNodeInner: {
//       background: 'linear-gradient(to bottom right, #2563eb, #7c3aed)',
//       color: 'white',
//       borderRadius: '1.5rem',
//       padding: '2rem',
//       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//       border: '4px solid white'
//     },
//     centerTitle: {
//       fontSize: '1.875rem',
//       fontWeight: 'bold',
//       textAlign: 'center',
//       marginBottom: '0.75rem'
//     },
//     centerSubtitle: {
//       textAlign: 'center',
//       fontSize: '0.875rem',
//       opacity: 0.9
//     },
//     componentBox: {
//       position: 'absolute',
//       width: '340px'
//     },
//     blueBox: {
//       background: '#dbeafe',
//       borderRadius: '1rem',
//       padding: '1.5rem',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//       border: '4px solid #3b82f6'
//     },
//     greenBox: {
//       background: '#d1fae5',
//       borderRadius: '1rem',
//       padding: '1.5rem',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//       border: '4px solid #10b981'
//     },
//     purpleBox: {
//       background: '#ede9fe',
//       borderRadius: '1rem',
//       padding: '1.5rem',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//       border: '4px solid #8b5cf6'
//     },
//     orangeBox: {
//       background: '#fed7aa',
//       borderRadius: '1rem',
//       padding: '1.5rem',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//       border: '4px solid #f59e0b'
//     },
//     componentHeader: {
//       borderRadius: '0.75rem',
//       padding: '1rem',
//       marginBottom: '0.75rem',
//       color: 'white'
//     },
//     componentTitle: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       textAlign: 'center'
//     },
//     definitionBox: {
//       background: 'white',
//       borderRadius: '0.5rem',
//       padding: '0.75rem',
//       marginBottom: '0.75rem'
//     },
//     exampleBox: {
//       borderRadius: '0.5rem',
//       padding: '0.75rem',
//       marginBottom: '0.75rem'
//     },
//     connectsBox: {
//       borderRadius: '0.5rem',
//       padding: '0.75rem',
//       color: 'white'
//     },
//     label: {
//       fontWeight: 'bold',
//       fontSize: '0.875rem',
//       marginBottom: '0.25rem'
//     },
//     text: {
//       fontSize: '0.875rem',
//       color: '#334155'
//     },
//     citation: {
//       fontSize: '0.75rem',
//       fontStyle: 'italic',
//       color: '#475569',
//       marginTop: '0.75rem',
//       textAlign: 'center'
//     },
//     symbolLabel: {
//       position: 'absolute',
//       width: '32px',
//       height: '32px',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       color: 'white',
//       boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
//     },
//     connectionIndex: {
//       background: 'white',
//       borderRadius: '0.75rem',
//       boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
//       padding: '1.5rem',
//       marginTop: '1rem'
//     },
//     indexTitle: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       color: '#1e293b',
//       marginBottom: '1rem',
//       textAlign: 'center'
//     },
//     grid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '1rem'
//     },
//     indexCard: {
//       padding: '1.25rem',
//       borderRadius: '0.5rem'
//     },
//     indexCardHeader: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       marginBottom: '0.5rem'
//     },
//     indexSymbol: {
//       width: '32px',
//       height: '32px',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       color: 'white'
//     },
//     indexCardTitle: {
//       fontWeight: 'bold',
//       color: '#1e293b'
//     },
//     indexCardText: {
//       color: '#475569',
//       fontSize: '0.875rem',
//       lineHeight: '1.5'
//     },
//     references: {
//       background: '#f1f5f9',
//       borderRadius: '0.5rem',
//       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//       padding: '1.5rem',
//       marginTop: '1rem'
//     },
//     refTitle: {
//       fontWeight: 'bold',
//       color: '#1e293b',
//       marginBottom: '0.75rem'
//     },
//     refText: {
//       fontSize: '0.875rem',
//       color: '#334155',
//       marginLeft: '2rem',
//       textIndent: '-2rem',
//       marginBottom: '0.5rem'
//     },
//     instructions: {
//       background: '#dbeafe',
//       borderLeft: '4px solid #3b82f6',
//       padding: '1rem',
//       marginTop: '1rem',
//       borderRadius: '0.25rem'
//     },
//     instructionsText: {
//       fontSize: '0.875rem',
//       color: '#334155'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.maxWidth}>
//         {/* Header */}
//         <div style={styles.header}>
//           <h1 style={styles.title}>Part 4a: Literacy Mind Map</h1>
//           <p style={styles.subtitle}>Integrated K–3 Reading Components</p>
//         </div>

//         {/* Controls */}
//         <div style={styles.controls}>
//           <button onClick={handleZoomIn} style={styles.button} onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'} onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
//             <ZoomIn style={{ width: '1.25rem', height: '1.25rem' }} />
//             Zoom In
//           </button>
//           <button onClick={handleZoomOut} style={styles.button} onMouseOver={e => e.currentTarget.style.background = '#1d4ed8'} onMouseOut={e => e.currentTarget.style.background = '#2563eb'}>
//             <ZoomOut style={{ width: '1.25rem', height: '1.25rem' }} />
//             Zoom Out
//           </button>
//           <button onClick={handleReset} style={styles.buttonReset} onMouseOver={e => e.currentTarget.style.background = '#334155'} onMouseOut={e => e.currentTarget.style.background = '#475569'}>
//             <RotateCcw style={{ width: '1.25rem', height: '1.25rem' }} />
//             Reset View
//           </button>
//           <div style={styles.zoomDisplay}>
//             <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>
//               Zoom: {Math.round(scale * 100)}%
//             </span>
//           </div>
//         </div>

//         {/* Canvas Container */}
//         <div ref={containerRef} style={styles.canvasContainer} onMouseDown={handleMouseDown}>
//           <div style={styles.canvas}>
//             <svg width="1800" height="1400" style={{ position: 'absolute', top: 0, left: 0 }}>
//               <defs>
//                 <marker id="arrowblue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#3b82f6" />
//                 </marker>
//                 <marker id="arrowgreen" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#10b981" />
//                 </marker>
//                 <marker id="arrowpurple" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#8b5cf6" />
//                 </marker>
//                 <marker id="arroworange" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#f59e0b" />
//                 </marker>
//               </defs>

//               {/* Main connections from center */}
//               <path d="M 900 700 Q 750 550 600 420" stroke="#3b82f6" strokeWidth="4" fill="none" markerEnd="url(#arrowblue)"/>
//               <path d="M 900 700 Q 1050 550 1200 420" stroke="#10b981" strokeWidth="4" fill="none" markerEnd="url(#arrowgreen)"/>
//               <path d="M 900 700 Q 750 850 600 980" stroke="#8b5cf6" strokeWidth="4" fill="none" markerEnd="url(#arrowpurple)"/>
//               <path d="M 900 700 Q 1050 850 1200 980" stroke="#f59e0b" strokeWidth="4" fill="none" markerEnd="url(#arroworange)"/>
              
//               {/* Interconnections */}
//               <path d="M 650 400 Q 800 360 1150 400" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowblue)"/>
//               <path d="M 1220 470 Q 1280 700 1220 930" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrowgreen)"/>
//               <path d="M 1150 1000 Q 800 1040 650 1000" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arroworange)"/>
//               <path d="M 580 930 Q 520 700 580 470" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowpurple)"/>
//             </svg>

//             {/* Symbol Labels */}
//             {/* <div style={{...styles.symbolLabel, background: '#2563eb', left: '880px', top: '350px'}}>A</div>
//             <div style={{...styles.symbolLabel, background: '#10b981', left: '1280px', top: '680px'}}>B</div>
//             <div style={{...styles.symbolLabel, background: '#f59e0b', left: '880px', top: '1050px'}}>C</div>
//             <div style={{...styles.symbolLabel, background: '#8b5cf6', left: '480px', top: '680px'}}>D</div> */}

//             {/* Center Node */}
//             <div style={styles.centerNode}>
//               <div style={styles.centerNodeInner}>
//                 <h2 style={styles.centerTitle}>Balanced Literacy Instruction in K–3</h2>
//                 <p style={styles.centerSubtitle}>Four Essential Components Working Together</p>
//               </div>
//             </div>

//             {/* Word Recognition */}
//             <div style={{...styles.componentBox, left: '280px', top: '180px'}}>
//               <div style={styles.blueBox}>
//                 <div style={{...styles.componentHeader, background: '#3b82f6'}}>
//                   <h3 style={styles.componentTitle}>Word Recognition</h3>
//                 </div>
//                 <div style={{...styles.definitionBox, border: '2px solid #93c5fd'}}>
//                   <p style={{...styles.label, color: '#1e3a8a'}}>Definition:</p>
//                   <p style={styles.text}>Ability to identify and decode words using phonics and word analysis skills</p>
//                 </div>
//                 <div style={{...styles.exampleBox, background: '#eff6ff', border: '2px solid #93c5fd'}}>
//                   <p style={{...styles.label, color: '#1e3a8a'}}>Classroom Example:</p>
//                   <p style={styles.text}>Word sorts with short vowels (CVC patterns) and images</p>
//                 </div>
//                 <div style={{...styles.connectsBox, background: '#2563eb'}}>
//                   <p style={{...styles.label, color: 'white'}}>Connects to:</p>
//                   <ul style={{ fontSize: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
//                     <li>→ Builds fluency (A)</li>
//                     <li>→ Supports vocabulary development</li>
//                     <li>→ Enables comprehension</li>
//                   </ul>
//                 </div>
//                 <p style={styles.citation}>Tompkins et al., 2021, p. 136</p>
//               </div>
//             </div>

//             {/* Fluency */}
//             <div style={{...styles.componentBox, left: '1180px', top: '180px'}}>
//               <div style={styles.greenBox}>
//                 <div style={{...styles.componentHeader, background: '#10b981'}}>
//                   <h3 style={styles.componentTitle}>Fluency</h3>
//                 </div>
//                 <div style={{...styles.definitionBox, border: '2px solid #6ee7b7'}}>
//                   <p style={{...styles.label, color: '#064e3b'}}>Definition:</p>
//                   <p style={styles.text}>Reading or writing accurately, quickly, with expression (automaticity, speed, prosody) or the opposite (inaccurate, slow, without expression)</p>
//                 </div>
//                 <div style={{...styles.exampleBox, background: '#f0fdf4', border: '2px solid #6ee7b7'}}>
//                   <p style={{...styles.label, color: '#064e3b'}}>Classroom Example:</p>
//                   <p style={styles.text}>Paired repeated reading or writing with partner feedback</p>
//                 </div>
//                 <div style={{...styles.connectsBox, background: '#059669'}}>
//                   <p style={{...styles.label, color: 'white'}}>Connects to:</p>
//                   <ul style={{ fontSize: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
//                     <li>→ Requires word recognition (A)</li>
//                     <li>→ Improves comprehension (B)</li>
//                     <li>→ Enhances vocabulary acquisition</li>
//                   </ul>
//                 </div>
//                 <p style={styles.citation}>Tompkins et al., 2021, pp. 136-145</p>
//               </div>
//             </div>

//             {/* Vocabulary */}
//             <div style={{...styles.componentBox, left: '280px', top: '800px'}}>
//               <div style={styles.purpleBox}>
//                 <div style={{...styles.componentHeader, background: '#8b5cf6'}}>
//                   <h3 style={styles.componentTitle}>Vocabulary</h3>
//                 </div>
//                 <div style={{...styles.definitionBox, border: '2px solid #c4b5fd'}}>
//                   <p style={{...styles.label, color: '#4c1d95'}}>Definition:</p>
//                   <p style={styles.text}>Knowledge of word meanings (Tier 1: basic, Tier 2: academic, Tier 3: specialized)</p>
//                 </div>
//                 <div style={{...styles.exampleBox, background: '#faf5ff', border: '2px solid #c4b5fd'}}>
//                   <p style={{...styles.label, color: '#4c1d95'}}>Classroom Example:</p>
//                   <p style={styles.text}>Word webs and walls for new story words</p>
//                 </div>
//                 <div style={{...styles.connectsBox, background: '#7c3aed'}}>
//                   <p style={{...styles.label, color: 'white'}}>Connects to:</p>
//                   <ul style={{ fontSize: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
//                     <li>→ Enhanced by word recognition (D)</li>
//                     <li>→ Critical for comprehension (C)</li>
//                     <li>→ Supports fluent reading and writing</li>
//                   </ul>
//                 </div>
//                 <p style={styles.citation}>Tompkins et al., 2021, pp. 184-185</p>
//               </div>
//             </div>

//             {/* Comprehension */}
//             <div style={{...styles.componentBox, left: '1180px', top: '800px'}}>
//               <div style={styles.orangeBox}>
//                 <div style={{...styles.componentHeader, background: '#f59e0b'}}>
//                   <h3 style={styles.componentTitle}>Comprehension</h3>
//                 </div>
//                 <div style={{...styles.definitionBox, border: '2px solid #fcd34d'}}>
//                   <p style={{...styles.label, color: '#78350f'}}>Definition:</p>
//                   <p style={styles.text}>A creative, multifaceted process where readers engage with text, draw on background knowledge, and develop understanding. Includes three levels: literal (facts), inferential (connections), and critical (analysis).</p>
//                 </div>
//                 <div style={{...styles.exampleBox, background: '#fffbeb', border: '2px solid #fcd34d'}}>
//                   <p style={{...styles.label, color: '#78350f'}}>Classroom Example:</p>
//                   <p style={styles.text}>Story maps and retelling wheels to assess literal, inferential, and critical comprehension levels</p>
//                 </div>
//                 <div style={{...styles.connectsBox, background: '#d97706'}}>
//                   <p style={{...styles.label, color: 'white'}}>Connects to:</p>
//                   <ul style={{ fontSize: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
//                     <li>→ Relies on fluent reading (B)</li>
//                     <li>→ Requires vocabulary (C)</li>
//                     <li>→ Integrates all components</li>
//                   </ul>
//                 </div>
//                 <p style={styles.citation}>Tompkins et al., 2021, p. 221</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Connection Index */}
//         <div style={styles.connectionIndex}>
//           <h3 style={styles.indexTitle}>Connection Index: How Components Interact</h3>
//           <div style={styles.grid}>
//             <div style={{...styles.indexCard, background: '#dbeafe', borderLeft: '4px solid #2563eb'}}>
//               <div style={styles.indexCardHeader}>
//                 <div style={{...styles.indexSymbol, background: '#2563eb'}}>A</div>
//                 <h4 style={styles.indexCardTitle}>Word Recognition → Fluency</h4>
//               </div>
//               <p style={styles.indexCardText}>
//                 <strong>Automaticity enables fluent reading.</strong> Tompkins et al. state that when students recognize words automatically without conscious decoding effort, they achieve the 95% accuracy needed for fluency, freeing cognitive resources for comprehension.
//               </p>
//             </div>

//             <div style={{...styles.indexCard, background: '#d1fae5', borderLeft: '4px solid #10b981'}}>
//               <div style={styles.indexCardHeader}>
//                 <div style={{...styles.indexSymbol, background: '#10b981'}}>B</div>
//                 <h4 style={styles.indexCardTitle}>Fluency → Comprehension</h4>
//               </div>
//               <p style={styles.indexCardText}>
//                 <strong>Fluent reading improves understanding.</strong> According to Tompkins et al., when students read at 100+ words per minute with proper expression and phrasing, they can focus mental energy on making meaning rather than decoding. Research shows fluent readers comprehend significantly better than non-fluent readers.
//               </p>
//             </div>

//             <div style={{...styles.indexCard, background: '#fed7aa', borderLeft: '4px solid #f59e0b'}}>
//               <div style={styles.indexCardHeader}>
//                 <div style={{...styles.indexSymbol, background: '#f59e0b'}}>C</div>
//                 <h4 style={styles.indexCardTitle}>Comprehension → Vocabulary</h4>
//               </div>
//               <p style={styles.indexCardText}>
//                 <strong>Vocabulary knowledge supports meaning-making.</strong> Tompkins et al. define comprehension as a creative, multifaceted process with three levels: literal comprehension (picking out main ideas and facts), inferential comprehension (reading between the lines to make connections), and critical comprehension (analyzing and evaluating). Understanding Tier 2 academic vocabulary is essential across all comprehension levels because these words appear frequently in texts but less often in oral language.
//               </p>
//             </div>

//             <div style={{...styles.indexCard, background: '#ede9fe', borderLeft: '4px solid #8b5cf6'}}>
//               <div style={styles.indexCardHeader}>
//                 <div style={{...styles.indexSymbol, background: '#8b5cf6'}}>D</div>
//                 <h4 style={styles.indexCardTitle}>Vocabulary → Word Recognition</h4>
//               </div>
//               <p style={styles.indexCardText}>
//                 <strong>Decoding impacts vocabulary acquisition.</strong> Word study and phonics instruction help students decode unfamiliar vocabulary words. When students can apply word analysis skills, they can independently tackle new academic vocabulary, building both their decoding abilities and word knowledge simultaneously.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* References */}
//         <div style={styles.references}>
//           <h4 style={styles.refTitle}>References</h4>
//           <p style={styles.refText}>
//             Michigan Department of Education. (n.d.). <em>Reading standards: Foundational skills (K–5)</em>.
//           </p>
//           <p style={styles.refText}>
//             Tompkins, G. E., Rodgers, E., & Rodgers, A. (2021). <em>Literacy for the 21st century</em> (8th ed.). Pearson Education (US). https://reader.yuzu.com/books/9780135893401
//           </p>
//         </div>

//         {/* Instructions */}
//         <div style={styles.instructions}>
//           <p style={styles.instructionsText}>
//             <strong>Instructions:</strong> Use zoom controls to explore the mind map. Click and drag to pan. Letter symbols (A, B, C, D) mark key connections explained in the Connection Index below the map.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiteracyMindMap;


























// import React, { useState, useRef, useEffect } from 'react';
// import { ZoomIn, ZoomOut, RotateCcw, Circle } from 'lucide-react';

// const LiteracyMindMap = () => {
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);

//   const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
//   const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
//   const handleReset = () => {
//     setScale(1);
//     setPosition({ x: 0, y: 0 });
//   };

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setDragStart({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       setPosition({
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y
//       });
//     }
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   useEffect(() => {
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, dragStart]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
//           <h1 className="text-3xl font-bold text-blue-800 text-center mb-2">
//             Part 4a: Literacy Mind Map
//           </h1>
//           <p className="text-center text-slate-600">
//             Integrated K–3 Reading Components
//           </p>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-center gap-4 flex-wrap">
//           <button
//             onClick={handleZoomIn}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
//           >
//             <ZoomIn className="w-5 h-5" />
//             Zoom In
//           </button>
//           <button
//             onClick={handleZoomOut}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
//           >
//             <ZoomOut className="w-5 h-5" />
//             Zoom Out
//           </button>
//           <button
//             onClick={handleReset}
//             className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all"
//           >
//             <RotateCcw className="w-5 h-5" />
//             Reset View
//           </button>
//           <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
//             <span className="text-sm font-semibold text-slate-700">
//               Zoom: {Math.round(scale * 100)}%
//             </span>
//           </div>
//         </div>

//         {/* Canvas Container */}
//         <div 
//           ref={containerRef}
//           className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-blue-200"
//           style={{ height: '700px', cursor: isDragging ? 'grabbing' : 'grab' }}
//           onMouseDown={handleMouseDown}
//         >
//           <div
//             style={{
//               transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//               transformOrigin: 'center center',
//               transition: isDragging ? 'none' : 'transform 0.1s ease-out',
//               width: '1800px',
//               height: '1400px',
//               position: 'relative',
//               margin: '0 auto'
//             }}
//           >
//             <svg width="1800" height="1400" style={{ position: 'absolute', top: 0, left: 0 }}>
//               <defs>
//                 <marker id="arrowblue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#3b82f6" />
//                 </marker>
//                 <marker id="arrowgreen" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#10b981" />
//                 </marker>
//                 <marker id="arrowpurple" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#8b5cf6" />
//                 </marker>
//                 <marker id="arroworange" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#f59e0b" />
//                 </marker>
//               </defs>

//               {/* Main connections from center */}
//               <path d="M 900 700 Q 750 550 600 420" stroke="#3b82f6" strokeWidth="4" fill="none" markerEnd="url(#arrowblue)"/>
//               <path d="M 900 700 Q 1050 550 1200 420" stroke="#10b981" strokeWidth="4" fill="none" markerEnd="url(#arrowgreen)"/>
//               <path d="M 900 700 Q 750 850 600 980" stroke="#8b5cf6" strokeWidth="4" fill="none" markerEnd="url(#arrowpurple)"/>
//               <path d="M 900 700 Q 1050 850 1200 980" stroke="#f59e0b" strokeWidth="4" fill="none" markerEnd="url(#arroworange)"/>
              
//               {/* Interconnections with symbols */}
//               {/* A: Word Recognition to Fluency */}
//               <path d="M 650 400 Q 800 360 1150 400" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowblue)"/>
//               {/* B: Fluency to Comprehension */}
//               <path d="M 1220 470 Q 1280 700 1220 930" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrowgreen)"/>
//               {/* C: Comprehension to Vocabulary */}
//               <path d="M 1150 1000 Q 800 1040 650 1000" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arroworange)"/>
//               {/* D: Vocabulary to Word Recognition */}
//               <path d="M 580 930 Q 520 700 580 470" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowpurple)"/>
//             </svg>

//             {/* Connection Symbol Labels */}
//             <div className="absolute bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg" style={{ left: '880px', top: '350px' }}>A</div>
//             <div className="absolute bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg" style={{ left: '1280px', top: '680px' }}>B</div>
//             <div className="absolute bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg" style={{ left: '880px', top: '1050px' }}>C</div>
//             <div className="absolute bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg" style={{ left: '480px', top: '680px' }}>D</div>

//             {/* Center Node */}
//             <div className="absolute" style={{ left: '720px', top: '600px', width: '360px' }}>
//               <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-8 shadow-2xl border-4 border-white">
//                 <h2 className="text-3xl font-bold text-center mb-3">
//                   Balanced Literacy Instruction in K–3
//                 </h2>
//                 <p className="text-center text-sm opacity-90">
//                   Four Essential Components Working Together
//                 </p>
//               </div>
//             </div>

//             {/* Word Recognition - Top Left */}
//             <div className="absolute" style={{ left: '280px', top: '180px', width: '340px' }}>
//               <div className="bg-blue-100 rounded-2xl p-6 shadow-xl border-4 border-blue-500">
//                 <div className="bg-blue-500 text-white rounded-xl p-4 mb-3">
//                   <h3 className="text-2xl font-bold text-center">Word Recognition</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="bg-white rounded-lg p-3 border-2 border-blue-300">
//                     <p className="font-bold text-blue-900 text-sm mb-1">Definition:</p>
//                     <p className="text-slate-700 text-sm">Ability to identify and decode words using phonics and word analysis skills</p>
//                   </div>
//                   <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-300">
//                     <p className="font-bold text-blue-900 text-sm mb-1">Classroom Example:</p>
//                     <p className="text-slate-700 text-sm">Word sorts with short vowels (CVC patterns)</p>
//                   </div>
//                   <div className="bg-blue-600 text-white rounded-lg p-3">
//                     <p className="font-bold text-sm mb-2">Connects to:</p>
//                     <ul className="text-xs space-y-1">
//                       <li>→ Builds automaticity for fluency (A)</li>
//                       <li>→ Supports vocabulary development</li>
//                       <li>→ Enables comprehension</li>
//                     </ul>
//                   </div>
//                 </div>
//                 <p className="text-xs italic text-slate-600 mt-3 text-center">
//                   (Tompkins et al., 2021, p. 136)
//                 </p>
//               </div>
//             </div>

//             {/* Fluency - Top Right */}
//             <div className="absolute" style={{ left: '1180px', top: '180px', width: '340px' }}>
//               <div className="bg-green-100 rounded-2xl p-6 shadow-xl border-4 border-green-500">
//                 <div className="bg-green-500 text-white rounded-xl p-4 mb-3">
//                   <h3 className="text-2xl font-bold text-center">Reading Fluency</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="bg-white rounded-lg p-3 border-2 border-green-300">
//                     <p className="font-bold text-green-900 text-sm mb-1">Definition:</p>
//                     <p className="text-slate-700 text-sm">Reading accurately, quickly, with expression (automaticity, speed, prosody)</p>
//                   </div>
//                   <div className="bg-green-50 rounded-lg p-3 border-2 border-green-300">
//                     <p className="font-bold text-green-900 text-sm mb-1">Classroom Example:</p>
//                     <p className="text-slate-700 text-sm">Paired repeated reading with partner feedback</p>
//                   </div>
//                   <div className="bg-green-600 text-white rounded-lg p-3">
//                     <p className="font-bold text-sm mb-2">Connects to:</p>
//                     <ul className="text-xs space-y-1">
//                       <li>→ Requires word recognition (A)</li>
//                       <li>→ Improves comprehension (B)</li>
//                       <li>→ Enhances vocabulary acquisition</li>
//                     </ul>
//                   </div>
//                 </div>
//                 <p className="text-xs italic text-slate-600 mt-3 text-center">
//                   (Tompkins et al., 2021, p. 136)
//                 </p>
//               </div>
//             </div>

//             {/* Vocabulary - Bottom Left */}
//             <div className="absolute" style={{ left: '280px', top: '800px', width: '340px' }}>
//               <div className="bg-purple-100 rounded-2xl p-6 shadow-xl border-4 border-purple-500">
//                 <div className="bg-purple-500 text-white rounded-xl p-4 mb-3">
//                   <h3 className="text-2xl font-bold text-center">Vocabulary</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="bg-white rounded-lg p-3 border-2 border-purple-300">
//                     <p className="font-bold text-purple-900 text-sm mb-1">Definition:</p>
//                     <p className="text-slate-700 text-sm">Knowledge of word meanings (Tier 1: basic, Tier 2: academic, Tier 3: specialized)</p>
//                   </div>
//                   <div className="bg-purple-50 rounded-lg p-3 border-2 border-purple-300">
//                     <p className="font-bold text-purple-900 text-sm mb-1">Classroom Example:</p>
//                     <p className="text-slate-700 text-sm">Word webs for new story words</p>
//                   </div>
//                   <div className="bg-purple-600 text-white rounded-lg p-3">
//                     <p className="font-bold text-sm mb-2">Connects to:</p>
//                     <ul className="text-xs space-y-1">
//                       <li>→ Enhanced by word recognition (D)</li>
//                       <li>→ Critical for comprehension (C)</li>
//                       <li>→ Supports fluent reading</li>
//                     </ul>
//                   </div>
//                 </div>
//                 <p className="text-xs italic text-slate-600 mt-3 text-center">
//                   (Tompkins et al., 2021, pp. 184-185)
//                 </p>
//               </div>
//             </div>

//             {/* Comprehension - Bottom Right */}
//             <div className="absolute" style={{ left: '1180px', top: '800px', width: '340px' }}>
//               <div className="bg-orange-100 rounded-2xl p-6 shadow-xl border-4 border-orange-500">
//                 <div className="bg-orange-500 text-white rounded-xl p-4 mb-3">
//                   <h3 className="text-2xl font-bold text-center">Comprehension</h3>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="bg-white rounded-lg p-3 border-2 border-orange-300">
//                     <p className="font-bold text-orange-900 text-sm mb-1">Definition:</p>
//                     <p className="text-slate-700 text-sm">Understanding and making meaning from text - the ultimate reading goal</p>
//                   </div>
//                   <div className="bg-orange-50 rounded-lg p-3 border-2 border-orange-300">
//                     <p className="font-bold text-orange-900 text-sm mb-1">Classroom Example:</p>
//                     <p className="text-slate-700 text-sm">Story maps and retelling wheels</p>
//                   </div>
//                   <div className="bg-orange-600 text-white rounded-lg p-3">
//                     <p className="font-bold text-sm mb-2">Connects to:</p>
//                     <ul className="text-xs space-y-1">
//                       <li>→ Relies on fluent reading (B)</li>
//                       <li>→ Requires vocabulary (C)</li>
//                       <li>→ Integrates all components</li>
//                     </ul>
//                   </div>
//                 </div>
//                 <p className="text-xs italic text-slate-600 mt-3 text-center">
//                   (Michigan Dept. of Ed., n.d., p. 17)
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Connection Index */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
//           <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
//             Connection Index: How Components Interact
//           </h3>
//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">A</div>
//                 <h4 className="font-bold text-slate-800">Word Recognition → Fluency</h4>
//               </div>
//               <p className="text-slate-700 text-sm leading-relaxed">
//                 <strong>Automaticity enables fluent reading.</strong> When students recognize words automatically without conscious decoding effort, they achieve the 95% accuracy needed for fluency. Tompkins et al. (2021) explain that readers must "recognize most words automatically" to read fluently, freeing cognitive resources for comprehension (p. 136).
//               </p>
//             </div>

//             <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">B</div>
//                 <h4 className="font-bold text-slate-800">Fluency → Comprehension</h4>
//               </div>
//               <p className="text-slate-700 text-sm leading-relaxed">
//                 <strong>Fluent reading improves understanding.</strong> When students read at 100+ words per minute with proper expression and phrasing, they can focus mental energy on making meaning rather than decoding. Research shows fluent readers comprehend significantly better than non-fluent readers (Tompkins et al., 2021, p. 136).
//               </p>
//             </div>

//             <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-600">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">C</div>
//                 <h4 className="font-bold text-slate-800">Comprehension → Vocabulary</h4>
//               </div>
//               <p className="text-slate-700 text-sm leading-relaxed">
//                 <strong>Vocabulary knowledge supports meaning-making.</strong> Understanding Tier 2 academic vocabulary is essential for comprehension across content areas. As Tompkins et al. (2021) emphasize, teaching academic vocabulary "has a powerful impact on learning" because these words appear frequently in texts but less often in oral language (pp. 184-185).
//               </p>
//             </div>

//             <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-600">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">D</div>
//                 <h4 className="font-bold text-slate-800">Vocabulary → Word Recognition</h4>
//               </div>
//               <p className="text-slate-700 text-sm leading-relaxed">
//                 <strong>Decoding impacts vocabulary acquisition.</strong> Word study and phonics instruction help students decode unfamiliar vocabulary words. When students can apply word analysis skills, they can independently tackle new academic vocabulary, building both their decoding abilities and word knowledge simultaneously.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* References */}
//         <div className="bg-slate-100 rounded-lg shadow-md p-6 mt-4">
//           <h4 className="font-bold text-slate-800 mb-3">References</h4>
//           <div className="space-y-2 text-sm text-slate-700">
//             <p className="ml-8 -indent-8">
//               Michigan Department of Education. (n.d.). <em>Reading standards: Foundational skills (K–5)</em>.
//             </p>
//             <p className="ml-8 -indent-8">
//               Tompkins, G. E., Rodgers, E., & Rodgers, A. (2021). <em>Literacy for the 21st century</em> (8th ed.). Pearson Education (US). https://reader.yuzu.com/books/9780135893401
//             </p>
//           </div>
//         </div>

//         {/* Instructions */}
//         <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded">
//           <p className="text-sm text-slate-700">
//             <strong>Instructions:</strong> Use zoom controls to explore the mind map. Click and drag to pan. Letter symbols (A, B, C, D) mark key connections explained in the Connection Index below the map.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiteracyMindMap;



// import React, { useState, useRef, useEffect } from 'react';
// import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// const LiteracyMindMap = () => {
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

//   const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
//   const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
//   const handleReset = () => {
//     setScale(1);
//     setPosition({ x: 0, y: 0 });
//   };

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setDragStart({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       setPosition({
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y
//       });
//     }
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   useEffect(() => {
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, dragStart]);

//   // Style Objects (Replaces Tailwind)
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: 'linear-gradient(to bottom right, #f1f5f9, #eff6ff)',
//       padding: '1rem',
//       fontFamily: 'sans-serif'
//     },
//     header: {
//       backgroundColor: 'white',
//       borderRadius: '0.75rem',
//       boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
//       padding: '1.5rem',
//       marginBottom: '1rem',
//       textAlign: 'center'
//     },
//     controls: {
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '1rem',
//       flexWrap: 'wrap',
//       backgroundColor: 'white',
//       padding: '1rem',
//       borderRadius: '0.5rem',
//       marginBottom: '1rem',
//       boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
//     },
//     buttonBlue: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.5rem 1rem',
//       backgroundColor: '#2563eb',
//       color: 'white',
//       border: 'none',
//       borderRadius: '0.5rem',
//       cursor: 'pointer'
//     },
//     canvasContainer: {
//       backgroundColor: 'white',
//       borderRadius: '0.75rem',
//       overflow: 'hidden',
//       border: '4px solid #bfdbfe',
//       height: '700px',
//       position: 'relative',
//       cursor: isDragging ? 'grabbing' : 'grab',
//       boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
//     },
//     nodeBox: {
//       backgroundColor: 'white',
//       borderRadius: '1rem',
//       padding: '1.5rem',
//       boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
//       border: '4px solid'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
//         <div style={styles.header}>
//           <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e40af', margin: '0 0 0.5rem 0' }}>
//             Part 4a: Literacy Mind Map
//           </h1>
//           <p style={{ color: '#475569', margin: 0 }}>Integrated K–3 Reading Components</p>
//         </div>

//         <div style={styles.controls}>
//           <button onClick={handleZoomIn} style={styles.buttonBlue}><ZoomIn size={20} /> Zoom In</button>
//           <button onClick={handleZoomOut} style={styles.buttonBlue}><ZoomOut size={20} /> Zoom Out</button>
//           <button onClick={handleReset} style={{ ...styles.buttonBlue, backgroundColor: '#475569' }}><RotateCcw size={20} /> Reset</button>
//           <div style={{ padding: '0.5rem 1rem', background: '#f1f5f9', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
//             Zoom: {Math.round(scale * 100)}%
//           </div>
//         </div>

//         <div style={styles.canvasContainer} onMouseDown={handleMouseDown}>
//           <div style={{
//             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
//             transformOrigin: 'center center',
//             width: '1800px',
//             height: '1400px',
//             position: 'relative',
//             margin: '0 auto',
//             transition: isDragging ? 'none' : 'transform 0.1s ease-out'
//           }}>
//             <svg width="1800" height="1400" style={{ position: 'absolute', top: 0, left: 0 }}>
//               <defs>
//                 <marker id="arrowblue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
//                   <polygon points="0 0, 12 6, 0 12" fill="#3b82f6" />
//                 </marker>
//               </defs>
//               <path d="M 900 700 Q 750 550 600 420" stroke="#3b82f6" strokeWidth="4" fill="none" markerEnd="url(#arrowblue)"/>
//             </svg>

//             {/* Center Node */}
//             <div style={{ position: 'absolute', left: '720px', top: '600px', width: '360px' }}>
//               <div style={{ background: 'linear-gradient(to bottom right, #2563eb, #9333ea)', color: 'white', borderRadius: '1.5rem', padding: '2rem', textAlign: 'center', border: '4px solid white' }}>
//                 <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.875rem' }}>Balanced Literacy Instruction</h2>
//               </div>
//             </div>

//             {/* Example Word Recognition Node */}
//             <div style={{ position: 'absolute', left: '280px', top: '180px', width: '340px' }}>
//               <div style={{ ...styles.nodeBox, borderColor: '#3b82f6', backgroundColor: '#eff6ff' }}>
//                 <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '1rem', borderRadius: '0.75rem', textAlign: 'center', marginBottom: '1rem' }}>
//                   <h3 style={{ margin: 0 }}>Word Recognition</h3>
//                 </div>
//                 <p style={{ fontSize: '0.875rem', color: '#1e3a8a' }}><strong>Definition:</strong> Ability to decode words using phonics.</p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiteracyMindMap;