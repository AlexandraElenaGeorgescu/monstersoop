
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Skull, 
  Zap, 
  Ghost, 
  Sword, 
  ChefHat, 
  Box, 
  ArrowRight, 
  ArrowLeft, 
  Code, 
  Terminal, 
  Dna,
  Users,
  Shield,
  Play,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  Layers,
  Split,
  FileCode,
  Hammer,
  BookOpen,
  Backpack,
  Scroll,
  Network,
  FileSignature
} from "lucide-react";

// --- Type Definitions ---

interface CodeBlockProps {
  code: string;
}

interface MonsterButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
}

interface TipBoxProps {
  title: string;
  children: React.ReactNode;
  variant?: "info" | "warning" | "fun" | "pro";
  delay?: number;
}

// --- Shared Components ---

const CodeBlock = ({ code }: CodeBlockProps) => (
  <div className="bg-gray-950 border-l-4 border-purple-500 p-4 rounded-md shadow-inner my-4 font-code text-sm sm:text-base overflow-x-auto text-gray-300 relative group">
    <pre>
      <code>{code}</code>
    </pre>
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Code size={16} className="text-gray-500" />
    </div>
  </div>
);

const MonsterButton = ({ onClick, children, variant = "primary", disabled = false }: MonsterButtonProps) => {
  let styles = "";
  if (variant === "primary") styles = "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)] border border-purple-400";
  if (variant === "secondary") styles = "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600";
  if (variant === "danger") styles = "bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-500";
  if (variant === "ghost") styles = "bg-transparent hover:bg-gray-800 text-gray-400 border border-transparent";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 justify-center ${disabled ? 'opacity-50 cursor-not-allowed' : styles}`}
    >
      {children}
    </motion.button>
  );
};

const TipBox = ({ title, children, variant = "info", delay = 0 }: TipBoxProps) => {
  let borderColor = "border-blue-500/30";
  let bgColor = "bg-blue-900/20";
  let iconColor = "text-blue-400";
  let Icon = Info;

  if (variant === "warning") {
    borderColor = "border-red-500/50";
    bgColor = "bg-red-900/20";
    iconColor = "text-red-500";
    Icon = AlertTriangle;
  } else if (variant === "fun") {
    borderColor = "border-pink-500/50";
    bgColor = "bg-pink-900/20";
    iconColor = "text-pink-400";
    Icon = Zap;
  } else if (variant === "pro") {
    borderColor = "border-yellow-500/50";
    bgColor = "bg-yellow-900/20";
    iconColor = "text-yellow-400";
    Icon = Terminal;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`${bgColor} border ${borderColor} rounded-lg p-4 mt-4 backdrop-blur-sm shadow-lg`}
    >
      <div className={`flex items-center gap-2 mb-2 ${iconColor} font-bold uppercase tracking-wider text-xs`}>
        <Icon size={16} />
        <span>{title}</span>
      </div>
      <div className="text-gray-200 text-sm leading-relaxed">{children}</div>
    </motion.div>
  );
};

// --- VISUAL SLIDES (Odd Numbers) ---

// Slide 1: Blueprint
const Slide1_Blueprint = () => {
  const [created, setCreated] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 min-h-[400px]">
      <div className="relative w-full flex justify-center items-center h-64">
        <AnimatePresence mode="wait">
          {!created ? (
            <motion.div
              key="blueprint"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              exit={{ scale: 0, opacity: 0, rotate: 20 }}
              className="w-48 h-64 bg-blue-600 rounded shadow-2xl p-6 relative border-2 border-dashed border-blue-300 flex flex-col justify-between transform transition-transform"
            >
              <div className="absolute top-2 right-2 opacity-50"><Code size={24} /></div>
              <div>
                <h3 className="text-xl font-code font-bold text-blue-50 mb-2">class Monster</h3>
                <div className="space-y-1 text-blue-200 text-xs font-mono">
                  <p>int Hp;</p>
                  <p>string Name;</p>
                  <p>void Roar();</p>
                </div>
              </div>
              <div className="text-[10px] text-blue-300 font-mono text-center border-t border-blue-400/30 pt-2">Monster.cs</div>
            </motion.div>
          ) : (
            <motion.div
              key="monster"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1.5, y: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="relative"
            >
              <div className="text-9xl filter drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-bounce">🧟‍♂️</div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: -20 }}
                className="absolute -top-4 -right-8 bg-white text-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap"
              >
                Heap: 0x2A
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!created && (
        <MonsterButton onClick={() => setCreated(true)}>
          <Zap className="mr-2" size={18} /> SPAWN (new)
        </MonsterButton>
      )}
      {created && (
        <MonsterButton variant="secondary" onClick={() => setCreated(false)}>
          Reset Memory
        </MonsterButton>
      )}
    </div>
  );
};

// Slide 3: Constructor
const Slide3_Constructor = () => {
  const [assembled, setAssembled] = useState(false);
  const [alive, setAlive] = useState(false);

  const assemble = () => {
    setAssembled(true);
    setTimeout(() => setAlive(true), 1200);
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative w-64 h-64 mb-8">
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl z-10"
          initial={{ y: -200, opacity: 0 }}
          animate={assembled ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          🧟
        </motion.div>
        <motion.div 
          className="absolute top-16 left-1/2 -translate-x-1/2 w-20 h-24 bg-green-900 rounded border border-green-700"
          initial={{ x: -200, opacity: 0 }}
          animate={assembled ? { x: "-50%", opacity: 1 } : { x: -200, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div 
          className="absolute top-16 left-0 w-8 h-24 bg-green-800 rounded origin-top-right rotate-45 border border-green-700"
          initial={{ x: -200, opacity: 0 }}
          animate={assembled ? { x: 30, opacity: 1 } : { x: -200, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.div 
          className="absolute top-16 right-0 w-8 h-24 bg-green-800 rounded origin-top-left -rotate-45 border border-green-700"
          initial={{ x: 200, opacity: 0 }}
          animate={assembled ? { x: -30, opacity: 1 } : { x: 200, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        
        {assembled && !alive && (
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 text-yellow-400 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0], scale: 2 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Zap size={80} fill="currentColor" />
          </motion.div>
        )}

        {alive && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/90 text-green-400 px-4 py-2 rounded-lg border border-green-500 font-mono text-sm whitespace-nowrap shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          >
            <div>HP = 100;</div>
            <div>Name = "Frank";</div>
          </motion.div>
        )}
      </div>

      <MonsterButton onClick={assemble} disabled={assembled}>
        {assembled ? (alive ? "IT'S ALIVE!" : "Assembling...") : "Activate Constructor()"}
      </MonsterButton>
    </div>
  );
};

// Slide 5b: Constructor Types (Visual/Theory)
const Slide5_ConstructorTypes = () => {
  const [type, setType] = useState<"default" | "param">("default");

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-center gap-4 mb-4">
        <button 
          onClick={() => setType("default")}
          className={`px-4 py-2 rounded-lg border transition-all ${type === 'default' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
        >
          Constructor Implicit
        </button>
        <button 
          onClick={() => setType("param")}
          className={`px-4 py-2 rounded-lg border transition-all ${type === 'param' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
        >
          Constructor cu Parametri
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-1">
        {/* Code Side */}
        <div className="h-full flex flex-col justify-center">
          <CodeBlock code={
            type === "default" 
            ? `public Monster() {\n  // Nu primește nimic\n  Hp = 100;\n  Name = "Unknown";\n}`
            : `public Monster(string n, int h) {\n  // Primește ingrediente\n  Hp = h;\n  Name = n;\n}`
          } />
          <p className="text-sm text-gray-400 italic">
            {type === "default" ? "\"Meniul Zilei\" - Primești ce decidem noi." : "\"A la Carte\" - Tu decizi cum arată monstrul."}
          </p>
        </div>

        {/* Visual Side */}
        <div className="flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-xl border border-gray-700 min-h-[200px]">
          <motion.div 
            key={type}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="text-7xl mb-4">{type === "default" ? "😐" : "👹"}</div>
            <div className="font-mono text-sm bg-black p-3 rounded text-left border-l-2 border-purple-500">
              <div>Name: <span className="text-green-400">"{type === "default" ? "Unknown" : "BOSS"}"</span></div>
              <div>Hp: <span className="text-green-400">{type === "default" ? "100" : "5000"}</span></div>
            </div>
            <div className="mt-4 text-xs text-gray-500 font-mono">
              {type === "default" ? "new Monster();" : "new Monster(\"BOSS\", 5000);"}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Slide 5: Inheritance Visual (Old 5)
const Slide6_Inheritance = () => {
  const [color, setColor] = useState("bg-gray-500");

  const ChildMonster = ({ name, type }: { name: string; type: string }) => (
    <div className="flex flex-col items-center">
      <motion.div 
        animate={{ backgroundColor: color === "bg-gray-500" ? "#6b7280" : (color === "bg-red-600" ? "#dc2626" : "#2563eb") }}
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg transition-colors duration-500 border-2 border-white/20"
      >
        {type === "vampire" ? "🧛" : "🧟"}
      </motion.div>
      <div className="h-8 w-0.5 bg-gray-600 -mt-2"></div>
      <span className="text-sm mt-2 font-bold text-gray-300">{name}</span>
      <span className="text-xs text-gray-500">: Monster</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center h-full gap-4 pt-4">
      <div className="flex flex-col items-center z-10 relative">
        <span className="mb-2 text-purple-400 uppercase text-xs tracking-widest font-bold">Base Class (DNA)</span>
        <motion.div 
          animate={{ backgroundColor: color === "bg-gray-500" ? "#6b7280" : (color === "bg-red-600" ? "#dc2626" : "#2563eb") }}
          className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-xl cursor-pointer border-4 border-white/10 hover:scale-105 transition-transform"
          onClick={() => setColor(prev => {
            if (prev === "bg-gray-500") return "bg-red-600";
            if (prev === "bg-red-600") return "bg-blue-600";
            return "bg-gray-500";
          })}
        >
          👹
        </motion.div>
        <p className="text-xs mt-2 text-gray-400 animate-pulse">Click Parent to Mutate</p>
      </div>

      <div className="w-48 h-8 border-t-2 border-x-2 border-gray-600 rounded-t-xl -mt-2 opacity-50"></div>

      <div className="flex gap-16 -mt-4">
        <ChildMonster name="Vampire" type="vampire" />
        <ChildMonster name="Zombie" type="zombie" />
      </div>
    </div>
  );
};

// Slide 7: Creation Order Visual (Old 7)
const Slide8_Chain = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="relative w-40 h-60 flex items-center justify-center">
        {/* Skeleton (Base) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
          className="absolute text-8xl z-10"
        >
          💀
        </motion.div>
        
        {/* Skin (Derived) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 0.7 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-green-600 rounded-full blur-xl z-0"
        />
         <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute text-8xl z-20 mix-blend-normal"
        >
          🧟
        </motion.div>

        {step >= 1 && (
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: -140, opacity: 1 }}
            className="absolute top-10 left-0 text-xs bg-gray-800 p-2 rounded border border-gray-600 w-36 shadow-lg"
          >
            <strong className="text-blue-400">1. Base (Schelet)</strong>
            <div className="text-gray-400">Inițializează HP, ID</div>
            <div className="text-green-500 text-[10px] mt-1">FOUNDATION</div>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 140, opacity: 1 }}
            className="absolute bottom-10 right-0 text-xs bg-green-900/80 p-2 rounded border border-green-600 w-36 shadow-lg"
          >
            <strong className="text-green-400">2. Derived (Piele)</strong>
            <div className="text-gray-300">Adaugă Putreziciunea</div>
             <div className="text-green-500 text-[10px] mt-1">ROOF</div>
          </motion.div>
        )}
      </div>

      <MonsterButton onClick={() => setStep(1)} disabled={step > 0}>
        {step === 0 ? "new Zombie()" : (step === 1 ? "Building Base..." : "Complete")}
      </MonsterButton>
    </div>
  );
};

// Slide 9: Polymorphism Visual (Old 9)
const Slide10_Polymorphism = () => {
  const [singing, setSinging] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-12">
      <div className="flex gap-4 md:gap-12 items-end h-40">
        {[
          { icon: "🐺", sound: "Hooooowl!", name: "Wolf", color: "text-blue-400", style: "bg-blue-900/30 border-blue-900" },
          { icon: "🧛", sound: "Hiss!", name: "Vampire", color: "text-red-500", style: "bg-red-900/30 border-red-900" },
          { icon: "👻", sound: "Boooo!", name: "Ghost", color: "text-white", style: "bg-gray-800 border-gray-600" }
        ].map((m, i) => (
          <div key={i} className="flex flex-col items-center relative group">
            <AnimatePresence>
              {singing && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0 }}
                  animate={{ opacity: 1, y: -40, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring" }}
                  className={`absolute -top-12 bg-white text-black px-4 py-2 rounded-2xl font-bold text-lg bubble-arrow whitespace-nowrap z-20 shadow-lg ${m.color}`}
                >
                  {m.sound}
                </motion.div>
              )}
            </AnimatePresence>
            <div className={`text-6xl mb-4 p-4 rounded-full border-2 border-dashed border-gray-700 ${m.style} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>{m.icon}</div>
            <div className="flex flex-col items-center gap-1 opacity-50">
              <div className="w-1 h-8 bg-gray-600"></div>
              <div className="w-8 h-1 bg-gray-600"></div>
            </div>
          </div>
        ))}
      </div>

      <MonsterButton onClick={() => {
        setSinging(true);
        setTimeout(() => setSinging(false), 2000);
      }} disabled={singing}>
        🎤 monster.Sing()
      </MonsterButton>
      <p className="text-sm text-gray-500 italic">3 Monștri diferiți, 1 singură comandă (Run-time decision)</p>
    </div>
  );
};

// Slide 11: New vs Override Visual (Old 11)
const Slide12_NewVsOverride = () => {
  const [state, setState] = useState("base"); // base, override, new

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 grid grid-cols-2 gap-4 md:gap-8 items-center">
        {/* Left: Override */}
        <div 
          className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-800 ${state === "override" ? "border-green-500 bg-green-900/10 ring-2 ring-green-500/50" : "border-gray-700 opacity-60"}`}
          onClick={() => setState("override")}
        >
          <div className="bg-gray-800 p-2 rounded text-xs font-mono mb-2">virtual / override</div>
          <h3 className="font-bold text-xl text-green-400">Sabia Ascuțită</h3>
          <div className="text-7xl transition-all duration-300 transform">
            {state === "override" ? "🗡️" : "⚔️"}
          </div>
          <p className="text-center text-xs text-gray-400">
            Fiul modifică sabia primită de la tata. Orice 'Monster' o vede ascuțită.
          </p>
        </div>

        {/* Right: New */}
        <div 
          className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-800 ${state === "new" ? "border-red-500 bg-red-900/10 ring-2 ring-red-500/50" : "border-gray-700 opacity-60"}`}
          onClick={() => setState("new")}
        >
          <div className="bg-gray-800 p-2 rounded text-xs font-mono mb-2">new (hiding)</div>
          <h3 className="font-bold text-xl text-red-400">Sabie Nouă (Hidden)</h3>
          <div className="relative h-20 w-20 flex items-center justify-center">
             <motion.div 
               animate={{ opacity: state === "new" ? 0 : 1 }}
               className="text-7xl absolute grayscale"
             >
               ⚔️
             </motion.div>
             <motion.div 
               animate={{ opacity: state === "new" ? 1 : 0, scale: state === "new" ? 1.2 : 0.8 }}
               className="text-7xl absolute"
             >
               🪄
             </motion.div>
          </div>
          <p className="text-center text-xs text-gray-400">
             Fiul își cumpără o baghetă nouă. Tata (Monster) nu știe de ea și folosește tot sabia veche.
          </p>
        </div>
      </div>
      
      <div className="text-center mt-2 font-mono bg-black/80 p-4 rounded-lg border-l-4 border-yellow-500 shadow-lg text-sm md:text-base">
        <div className="text-gray-500">// Upcasting: Privim copilul ca pe un Monstru</div>
        <div className="text-white">Monster m = <span className="text-purple-400">new Child()</span>;</div>
        <div className="text-white">m.Attack();</div>
        <div className="mt-2 pt-2 border-t border-gray-800 text-yellow-400 font-bold">
          {state === "base" ? "Waiting for selection..." : (state === "override" ? "> Output: SLASH! (Metoda Copilului)" : "> Output: BONK! (Metoda Tatălui)")}
        </div>
      </div>
    </div>
  );
};

// Slide 13: List Visual (Old 13)
const Slide14_List = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="font-code text-xl bg-gray-900 p-4 rounded border border-purple-500/30">
        <span className="text-blue-400">List</span>&lt;<span className="text-green-400">Monster</span>&gt; horde;
      </div>
      
      <div className="flex gap-2 md:gap-4 overflow-hidden w-full justify-center py-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center bg-gray-800 p-3 md:p-4 rounded-lg w-20 md:w-24 shrink-0 border border-gray-600 shadow-lg relative group"
          >
            <div className="text-4xl md:text-5xl mb-2 transform group-hover:-translate-y-2 transition-transform">
              {["🧛", "🧟", "🐺", "👻", "👹"][i]}
            </div>
            <div className="text-[10px] text-gray-500 font-mono absolute top-2 right-2">[{i}]</div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-gray-400 max-w-md text-sm">
        O listă să-i stăpânească pe toți. Deși arată diferit, toți sunt <span className="text-green-400 font-mono">Monster</span> la bază.
      </p>
    </div>
  );
};

// Slide 15: Abstract Visual (Old 15)
const Slide16_Abstract = () => {
  const [errorShake, setErrorShake] = useState(0);
  const [equippedItem, setEquippedItem] = useState<string | null>(null);

  const handleAbstractClick = () => {
    setErrorShake(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-12">
      <div className="flex gap-12 items-center">
        {/* Abstract Class */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ x: [0, -10, 10, -10, 10, 0] }}
            key={errorShake}
            transition={{ duration: 0.4 }}
            className="relative cursor-not-allowed group"
            onClick={handleAbstractClick}
          >
            <div className="text-8xl opacity-30 filter blur-[2px] hover:blur-none transition-all">👻</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 font-bold rotate-[-15deg] border-2 border-gray-500 p-2 rounded">
              ABSTRACT
            </div>
          </motion.div>
          <div className="bg-gray-800 px-3 py-1 rounded text-xs font-mono text-gray-400">class Item</div>
          <AnimatePresence>
            {errorShake > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-16 bg-red-900/90 text-red-200 text-xs p-2 rounded border border-red-500 whitespace-nowrap z-50"
              >
                Error: Cannot Instantiate Abstract Class!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ArrowRight className="text-gray-600" size={32} />

        {/* Concrete Class */}
        <div className="flex flex-col items-center gap-4">
           <motion.div 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setEquippedItem("Sword")}
             className={`text-8xl cursor-pointer p-4 rounded-full transition-colors ${equippedItem === "Sword" ? "bg-green-900/40 ring-2 ring-green-500" : "hover:bg-gray-800"}`}
           >
             🗡️
           </motion.div>
           <div className="bg-gray-800 px-3 py-1 rounded text-xs font-mono text-green-400">class Sword : Item</div>
        </div>
      </div>

      <div className="bg-black/50 p-4 rounded-lg border border-gray-700 w-full max-w-md text-center">
        Inventory: {equippedItem ? <span className="text-green-400 font-bold">{equippedItem} (Valid)</span> : <span className="text-gray-500 italic">Empty</span>}
      </div>
    </div>
  );
};

// Slide 16b: Abstract vs Interface (New Comparison)
const Slide18_AbstractVsInterface = () => (
  <div className="grid grid-cols-2 gap-6 h-full items-center">
    <motion.div 
      initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}}
      className="bg-gray-800/50 p-4 rounded-xl border border-purple-500/30 flex flex-col items-center text-center h-full"
    >
      <div className="text-6xl mb-4">👻</div>
      <h3 className="text-xl font-bold text-purple-400 mb-2">Abstract Class</h3>
      <p className="text-xs text-gray-400 mb-4 bg-gray-900 p-2 rounded">"Casa pe jumătate terminată"</p>
      
      <ul className="text-sm text-left space-y-2 w-full text-gray-300">
        <li className="flex gap-2"><CheckCircle2 className="text-green-500 shrink-0" size={16}/> Poate avea logică (metode normale).</li>
        <li className="flex gap-2"><CheckCircle2 className="text-green-500 shrink-0" size={16}/> Poate avea câmpuri (variabile).</li>
        <li className="flex gap-2"><AlertTriangle className="text-yellow-500 shrink-0" size={16}/> Doar 1 părinte (Single Inheritance).</li>
      </ul>
      <div className="mt-auto pt-4 text-[10px] text-gray-500 font-mono">public abstract void DoWork();</div>
    </motion.div>

    <motion.div 
      initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.2}}
      className="bg-gray-800/50 p-4 rounded-xl border border-blue-500/30 flex flex-col items-center text-center h-full"
    >
      <div className="text-6xl mb-4">📜</div>
      <h3 className="text-xl font-bold text-blue-400 mb-2">Interface</h3>
      <p className="text-xs text-gray-400 mb-4 bg-gray-900 p-2 rounded">"Doar Contractul (Lista de Reguli)"</p>
      
      <ul className="text-sm text-left space-y-2 w-full text-gray-300">
        <li className="flex gap-2"><XCircle className="text-red-500 shrink-0" size={16}/> Fără logică (doar semnături).</li>
        <li className="flex gap-2"><XCircle className="text-red-500 shrink-0" size={16}/> Fără câmpuri (variabile).</li>
        <li className="flex gap-2"><Zap className="text-yellow-500 shrink-0" size={16}/> Poți implementa oricâte (Multiple)!</li>
      </ul>
      <div className="mt-auto pt-4 text-[10px] text-gray-500 font-mono">void DoWork();</div>
    </motion.div>
  </div>
);

// Slide 17: Overloading Visual (Old 17)
const Slide19_Overloading = () => {
  const [result, setResult] = useState("🍽️");
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const cook = (item: string | null) => {
    setActiveBtn(item === "human" ? "human" : (item === "sauce" ? "sauce" : "air"));
    setResult("🔥");
    setTimeout(() => {
      if (!item) setResult("🍳"); 
      if (item === "human") setResult("🍖"); 
      if (item === "sauce") setResult("🍝"); 
      setActiveBtn(null);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="flex items-center gap-8 md:gap-16">
        <div className="flex flex-col gap-4">
           <button 
             onClick={() => cook(null)} 
             className={`p-3 rounded-xl border-2 transition-all font-mono text-xs md:text-sm text-left ${activeBtn === 'air' ? 'bg-yellow-900 border-yellow-500' : 'bg-gray-800 border-gray-600 hover:bg-gray-700'}`}
           >
             <div>Cook()</div>
             <div className="text-[10px] text-gray-500">Mănâncă aer</div>
           </button>
           <button 
             onClick={() => cook("human")} 
             className={`p-3 rounded-xl border-2 transition-all font-mono text-xs md:text-sm text-left ${activeBtn === 'human' ? 'bg-yellow-900 border-yellow-500' : 'bg-gray-800 border-gray-600 hover:bg-gray-700'}`}
           >
             <div>Cook(<span className="text-red-400">Human</span> h)</div>
             <div className="text-[10px] text-gray-500">Mănâncă om</div>
           </button>
           <button 
             onClick={() => cook("sauce")} 
             className={`p-3 rounded-xl border-2 transition-all font-mono text-xs md:text-sm text-left ${activeBtn === 'sauce' ? 'bg-yellow-900 border-yellow-500' : 'bg-gray-800 border-gray-600 hover:bg-gray-700'}`}
           >
             <div>Cook(<span className="text-red-400">Human</span> h, <span className="text-blue-400">Sauce</span> s)</div>
             <div className="text-[10px] text-gray-500">Mănâncă om cu sos</div>
           </button>
        </div>

        <div className="h-32 w-1 bg-gray-700 rounded-full hidden md:block"></div>

        <div className="flex flex-col items-center relative">
           <div className="text-7xl mb-4 relative z-10">👨‍🍳</div>
           <ChefHat className="absolute -top-6 -right-2 text-white opacity-20" size={40} />
           <div className="text-5xl animate-bounce drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{result}</div>
        </div>
      </div>
      <p className="text-sm text-gray-400 italic bg-black/30 p-2 rounded">
        Static Polymorphism: Decizia se ia la <strong>Compile Time</strong> bazată pe ingrediente (parametri).
      </p>
    </div>
  );
};

// Slide 20: Inventory Visual (Old 19)
const Slide21_Inventory = () => {
  const [log, setLog] = useState<string[]>([]);

  const useAll = () => {
    setLog([]);
    ["Sword", "Potion", "Shield"].forEach((item, i) => {
      setTimeout(() => {
        let msg = "";
        if (item === "Sword") msg = "Sword: SLASH! (Attack: 50)";
        if (item === "Potion") msg = "Potion: Glug! (Health: +100)";
        if (item === "Shield") msg = "Shield: BLOCK! (SpecialPower)";
        setLog(prev => [...prev, msg]);
      }, i * 600);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="grid grid-cols-3 gap-4 bg-amber-900/20 p-6 rounded-xl border-2 border-amber-800 shadow-inner">
        {["⚔️", "🧪", "🛡️"].map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="w-20 h-20 bg-black/60 rounded-lg flex items-center justify-center text-4xl border border-white/5 shadow-lg"
          >
            {item}
          </motion.div>
        ))}
      </div>

      <MonsterButton onClick={useAll}>
        <Play size={18} className="mr-2 fill-current" /> foreach (var item in backpack)
      </MonsterButton>

      <div className="w-full max-w-sm bg-black p-4 rounded-lg font-mono text-green-400 text-sm h-40 border border-gray-800 shadow-inner flex flex-col justify-end">
        {log.map((l, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-1"
          >
            <span className="text-gray-600 mr-2">&gt;</span>{l}
          </motion.div>
        ))}
        {log.length === 0 && <span className="opacity-30 text-center py-8">Ready to iterate...</span>}
      </div>
    </div>
  );
};

// --- THEORY SLIDES (Deep Dives - Interactive) ---

// Slide 2 Theory
const Slide2_Theory = () => (
  <div className="space-y-6">
    <p><strong>Clasa</strong> e doar o hârtie (Blueprint). Nu te poate mușca. <strong>Obiectul</strong> e monstrul real, creat în memorie.</p>
    <div className="grid grid-cols-2 gap-4 mt-6">
      <motion.div 
        initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.2}}
        className="bg-blue-900/20 p-4 rounded border border-blue-500/30"
      >
        <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2"><Box size={16}/> Stack (Stiva)</h4>
        <p className="text-xs text-gray-300">Aici stă referința (telecomanda). E rapidă și mică. <code>Monster m;</code></p>
      </motion.div>
      <motion.div 
        initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.4}}
        className="bg-green-900/20 p-4 rounded border border-green-500/30"
      >
        <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2"><Users size={16}/> Heap (Grămada)</h4>
        <p className="text-xs text-gray-300">Aici stă Monstrul fizic. E spațiul mare. <code>new Monster();</code></p>
      </motion.div>
    </div>
    
    <TipBox title="Știai că?" variant="fun" delay={0.6}>
      <p>C# trebuia să se numească <span className="font-bold text-pink-400">"Cool"</span> (C-like Object Oriented Language).</p>
      <p className="mt-2">Dar creatorii și-au dat seama că extensia fișierelor ar fi fost <code>.cool</code>, ceea ce nu suna foarte "profesional" pentru corporații. Așa că au ales <strong>C#</strong> (C Sharp), o referință muzicală (o notă cu un semiton mai sus decât C).</p>
    </TipBox>
  </div>
);

// Slide 4 Theory
const Slide4_Theory = () => (
  <div className="space-y-4">
    <p>Un <strong>Constructor</strong> este o metodă specială care se execută <strong>AUTOMAT</strong> când folosești cuvântul <code>new</code>.</p>
    <p>Scopul lui? Să inițializeze datele (HP, Name) ca să nu ai un monstru "gol" (null) care crapă jocul.</p>
    <CodeBlock code={`class Monster {\n  public int Hp;\n  // Constructorul (același nume cu clasa)\n  public Monster() {\n    Hp = 100; // Rezervor plin!\n  }\n}`} />
    <TipBox title="Atenție la Detalii" variant="pro" delay={0.3}>
      Constructorul nu are <code>return type</code> (nici măcar <code>void</code>). Dacă scrii <code>void Monster()</code>, aia e doar o metodă ciudată, nu constructorul!
    </TipBox>
  </div>
);

// Slide 7 Theory (Old 6) - Inheritance Upgrade
const Slide7_Theory = () => {
  const [denied, setDenied] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-lg">
        <Dna className="text-purple-400" size={32}/>
        <div>
          <h3 className="font-bold text-purple-200">Regula #1: Moștenirea Membrilor</h3>
          <p className="text-sm text-gray-400">Copilul (Derived) primește automat toate câmpurile și metodele părintelui (Base). Vampirul are <code>HP</code> fără să scrii tu cod.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.3}}
          className="border border-red-500/30 bg-red-900/10 p-4 rounded-lg flex flex-col gap-2 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs">
            <AlertTriangle size={16}/> Critical Rule
          </div>
          <p className="font-bold">Single Inheritance Only!</p>
          <p className="text-xs text-gray-300 mb-2">În C++, poți moșteni de la mai mulți. În C#, <strong>NU</strong>.</p>
          
          <div className="flex items-center justify-center gap-2 mt-2 bg-gray-900/50 p-2 rounded">
             <div className="text-center"><div className="text-2xl">🧟</div><div className="text-[10px] text-gray-500">Child</div></div>
             <ArrowLeft size={16} className="text-gray-500"/>
             <div className="text-center p-1 rounded border border-green-500/30 bg-green-500/10"><div className="text-xl">🧛</div><div className="text-[10px] text-green-500">Parent 1</div></div>
             <div 
               className="text-center p-1 rounded border border-red-500/30 bg-red-500/10 cursor-pointer relative group"
               onClick={() => setDenied(true)}
               onMouseLeave={() => setDenied(false)}
             >
               <div className="text-xl opacity-50">🐺</div>
               <div className="text-[10px] text-red-500">Parent 2</div>
               {denied && (
                 <motion.div 
                   initial={{ scale: 0 }} animate={{ scale: 1 }}
                   className="absolute inset-0 bg-red-900/90 flex items-center justify-center"
                 >
                   <XCircle className="text-red-500" />
                 </motion.div>
               )}
             </div>
          </div>
          <p className="text-[10px] text-red-400 text-center mt-1">{denied ? "ERROR: Class cannot have multiple base classes!" : "Try to add Parent 2..."}</p>
        </motion.div>

        <motion.div 
          initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.5}}
          className="border border-yellow-500/30 bg-yellow-900/10 p-4 rounded-lg flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 text-yellow-400 font-bold uppercase text-xs">
            <Hammer size={16}/> Constructor Rule
          </div>
          <p className="font-bold">Constructors are NOT inherited</p>
          <p className="text-sm text-gray-300">Doar pentru că tata are "permis de construcție", nu înseamnă că îl ai și tu automat.</p>
          <p className="text-xs text-gray-400 mt-2">Trebuie să îți definești propriul constructor în clasa copil.</p>
        </motion.div>
      </div>
    </div>
  );
};

// Slide 9 Theory (Old 8) - Constructor Chaining Deep Dive
const Slide9_ChainingTheory = () => {
  const [stage, setStage] = useState(0);

  return (
    <div className="space-y-6 h-full flex flex-col justify-center">
      <div className="text-center mb-4">
        <h3 className="font-bold text-xl text-purple-300">Lanțul de Execuție (The Chain)</h3>
        <p className="text-gray-400 text-sm">Cum transmitem datele la părinte?</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-32 bg-gray-900 border-b-4 border-gray-700 flex flex-col-reverse items-center">
            {/* Derived - Roof */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={stage >= 2 ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
              className="w-full h-12 bg-green-900/80 border-2 border-green-500 flex items-center justify-center text-xs text-green-200 z-10 rounded-t-lg absolute top-0"
            >
              2. Derived (Acoperiș)
            </motion.div>

            {/* Base - Foundation */}
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={stage >= 1 ? { height: "5rem", opacity: 1 } : { height: 0, opacity: 0 }}
              className="w-full bg-blue-900/50 border-x-2 border-blue-500 flex items-center justify-center text-xs text-blue-200 absolute bottom-0"
            >
              1. Base (Fundația)
            </motion.div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
         <button onClick={() => setStage(1)} className={`px-4 py-2 rounded text-xs ${stage >= 1 ? 'bg-blue-600' : 'bg-gray-700'}`}>Step 1: base(model)</button>
         <button onClick={() => setStage(2)} className={`px-4 py-2 rounded text-xs ${stage >= 2 ? 'bg-green-600' : 'bg-gray-700'}`}>Step 2: Derived()</button>
         <button onClick={() => setStage(0)} className="px-4 py-2 rounded text-xs bg-red-900/50 text-red-200">Reset</button>
      </div>

      <div className="bg-gray-950 p-3 rounded border-l-2 border-purple-500 text-sm font-mono mt-4">
        <span className="text-blue-400">public</span> <span className="text-yellow-400">Zombie</span>(string model) : <span className="text-pink-400">base</span>(model) <span className="text-gray-500">{"{"}</span> <br/>
        <span className="text-gray-500 ml-4">// 1. base(model) trimite datele la tata</span> <br/>
        <span className="text-gray-500 ml-4">// 2. Apoi rulează constructorul copilului</span> <br/>
        <span className="text-gray-500">{"}"}</span>
      </div>

      <p className="text-center text-xs text-gray-500 italic mt-2">"Nu poți pune acoperișul înainte să torni fundația."</p>
    </div>
  );
};

// Slide 11 Theory (Old 10) - Polymorphism Deep Dive Upgrade
const Slide11_PolymorphismTheory = () => (
  <div className="space-y-4 h-full flex flex-col">
    <p className="text-center mb-2">Marea bătălie a Polimorfismului: <strong>Când</strong> se ia decizia?</p>
    
    <div className="grid grid-cols-2 gap-4 flex-1">
      {/* Compile Time */}
      <motion.div 
        initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}} 
        className="bg-gray-800 p-3 md:p-4 rounded-xl border border-blue-500/20 flex flex-col hover:bg-gray-800/80 transition-colors"
      >
        <div className="flex items-center gap-2 text-blue-400 font-bold mb-2 text-sm md:text-base">
          <FileCode size={18}/> Compile-Time
        </div>
        <h4 className="text-base md:text-lg font-bold mb-1">Overloading</h4>
        <p className="text-[10px] md:text-xs text-gray-400 mb-3 bg-black/20 p-1 rounded">Static. Rapid. Știut dinainte.</p>
        <div className="space-y-2 flex-1">
          <div className="bg-blue-900/10 p-2 rounded border border-blue-500/10 text-[10px] md:text-xs font-mono">
            Cook() <br/> Cook(Meat)
          </div>
          <ul className="text-[10px] md:text-xs space-y-1 list-disc pl-3 text-gray-300">
            <li>Același nume</li>
            <li>Parametri <strong>DIFERIȚI</strong></li>
          </ul>
        </div>
      </motion.div>

      {/* Run Time */}
      <motion.div 
        initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.2}}
        className="bg-gray-800 p-3 md:p-4 rounded-xl border border-purple-500/20 flex flex-col hover:bg-gray-800/80 transition-colors"
      >
        <div className="flex items-center gap-2 text-purple-400 font-bold mb-2 text-sm md:text-base">
          <Play size={18}/> Run-Time
        </div>
        <h4 className="text-base md:text-lg font-bold mb-1">Overriding</h4>
        <p className="text-[10px] md:text-xs text-gray-400 mb-3 bg-black/20 p-1 rounded">Dynamic. Flexibil. V-Table.</p>
        <div className="space-y-2 flex-1">
          <div className="bg-purple-900/10 p-2 rounded border border-purple-500/10 text-[10px] md:text-xs font-mono">
            virtual Sing() <br/> override Sing()
          </div>
          <ul className="text-[10px] md:text-xs space-y-1 list-disc pl-3 text-gray-300">
            <li>Același nume</li>
            <li>Parametri <strong>IDENTICI</strong></li>
          </ul>
        </div>
      </motion.div>
    </div>

    <div className="bg-gray-900 p-3 rounded text-xs flex items-center gap-3 border border-gray-700 mt-auto">
      <BookOpen className="text-purple-400 shrink-0" size={20}/>
      <div>
        <span className="text-purple-400 font-bold">V-Table Concept:</span> O "foaie de pontaj" secretă pe care fiecare obiect o are în buzunar. Când zici <code>Sing()</code>, monstrul se uită în foaie la runtime să vadă ce funcție trebuie să ruleze (a lui sau a tatălui).
      </div>
    </div>
  </div>
);

// Slide 13 Theory (Old 12) - New Hiding
const Slide13_HidingTheory = () => (
  <div className="space-y-4">
    <p>Ce se întâmplă dacă folosești <code>new</code> în loc de <code>override</code>? Faci o <strong>iluzie optică</strong>.</p>
    
    <div className="grid grid-cols-1 gap-4 my-4">
      <div className="bg-green-900/20 p-3 rounded border-l-4 border-green-500">
        <h4 className="text-green-400 font-bold text-sm">OVERRIDE (Corect)</h4>
        <p className="text-xs text-gray-300">Modifici metoda originală. Chiar dacă ești privit ca un <code>Monster</code> generic, tot metoda ta de <code>Zombie</code> se execută.</p>
      </div>
      <div className="bg-red-900/20 p-3 rounded border-l-4 border-red-500">
        <h4 className="text-red-400 font-bold text-sm">NEW (Periculos)</h4>
        <p className="text-xs text-gray-300">Doar ascunzi metoda tatălui. Dacă ești privit ca un <code>Monster</code>, se execută metoda tatălui, nu a ta!</p>
      </div>
    </div>

    <TipBox title="Nu fă asta acasă" variant="warning">
      Evită <code>new</code>. De obicei înseamnă că design-ul clasei Base este greșit și ai uitat să pui <code>virtual</code> pe metoda părintelui.
    </TipBox>
  </div>
);

// Slide 15 Theory (Old 14) - Upcasting
const Slide15_UpcastingTheory = () => (
  <div className="space-y-4">
    <p><strong>Upcasting</strong> înseamnă să tratezi un obiect specific (Vampir) ca pe unul generic (Monstru).</p>
    <div className="bg-gray-900 p-4 rounded-lg flex flex-col items-center gap-4">
       <div className="flex gap-2">
         <span className="text-3xl">🧛</span>
         <span className="text-3xl">🧟</span>
         <span className="text-3xl">🐺</span>
       </div>
       <ArrowRight className="rotate-90 text-gray-500"/>
       <div className="bg-gray-800 px-4 py-2 rounded border border-purple-500">
         List&lt;<span className="text-purple-400 font-bold">Monster</span>&gt;
       </div>
    </div>
    <CodeBlock code={`List<Monster> horde = new List<Monster>();\nhorde.Add(new Zombie()); // Legal!\nhorde.Add(new Vampire()); // Legal!`} />
    <p className="text-sm">Pentru listă, toți sunt doar `Monster`. Dar datorită polimorfismului (virtual/override), ei știu să atace corect când le vine rândul.</p>
  </div>
);

// Slide 17 Theory (Old 16) - Abstract Deep Dive Upgrade
const Slide17_AbstractRules = () => {
  const [checked, setChecked] = useState([false, false, false, false]);

  const toggleCheck = (index: number) => {
     const newChecked = [...checked];
     newChecked[index] = !newChecked[index];
     setChecked(newChecked);
  };

  const points = [
    { title: "Cannot be Instantiated", desc: "Nu poți face `new Abstract()`." },
    { title: "Abstract Members", desc: "Metode fără corp (doar semnătura)." },
    { title: "Non-Abstract Members", desc: "Poate avea și metode normale cu logică." },
    { title: "Enforced Implementation", desc: "Copiii sunt OBLIGAȚI să dea `override`." }
  ];

  return (
    <div className="space-y-4 h-full flex flex-col">
      <p className="text-center font-bold text-lg mb-2">Cele 4 Porunci ale Claselor Abstracte:</p>
      <p className="text-xs text-center text-gray-400 mb-4">(Click to verify contract)</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
        {points.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleCheck(i)}
            className={`p-3 rounded-lg border cursor-pointer flex items-start gap-3 transition-colors ${checked[i] ? 'bg-purple-900/30 border-purple-500/50' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
          >
            <div className={`mt-1 ${checked[i] ? 'text-green-400' : 'text-gray-600'}`}>
               {checked[i] ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-gray-600" />}
            </div>
            <div>
              <h4 className={`font-bold text-sm ${checked[i] ? 'text-white' : 'text-gray-400'}`}>{p.title}</h4>
              <p className="text-[10px] md:text-xs text-gray-400 mt-1">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-auto">
        <CodeBlock code={`abstract class Item {\n  public int attack;\n  public int health;\n  public abstract void specialPower(); // Rule\n}`} />
      </div>
    </div>
  );
};

// Slide 20 Theory (Old 18) - Overloading Deep Dive
const Slide20_OverloadingTheory = () => (
  <div className="space-y-4">
    <p>Aceeași metodă, parametri diferiți. Asta se numește <strong>Compile-time Polymorphism</strong>.</p>
    <CodeBlock code={`void Cook() { ... }\nvoid Cook(Human h) { ... }\nvoid Cook(Human h, Sauce s) { ... }`} />
    <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
      <Terminal className="text-yellow-400" size={24} />
      <p className="text-sm text-gray-300">
        Compilatorul se uită la ingrediente (parametri) și știe <strong>EXACT</strong> ce metodă să apeleze înainte să rulezi jocul.
      </p>
    </div>
    <TipBox title="Pro Tip" variant="info">
      Doar tipul și ordinea parametrilor contează. Return type-ul NU face metoda unică! Nu poți avea <code>int Cook()</code> și <code>void Cook()</code>.
    </TipBox>
  </div>
);

// Slide 22 Theory (Old 21) - Inventory Deep Dive
const Slide22_InventoryTheory = () => (
  <div className="space-y-4">
    <p>Cum poate o singură listă <code>List&lt;Item&gt;</code> să țină și Săbii și Poțiuni?</p>
    <p className="text-lg font-bold text-center text-purple-400 my-2">Răspuns: Upcasting + Polimorfism</p>
    
    <div className="flex justify-center gap-8 my-4">
       <div className="flex flex-col items-center">
         <div className="bg-gray-800 p-2 rounded border border-gray-600 mb-2 font-mono text-xs">list[0] (Item)</div>
         <div className="h-8 w-0.5 bg-gray-600"></div>
         <div className="text-3xl mt-2 p-2 bg-green-900/20 rounded border border-green-500/50">🗡️</div>
         <div className="text-[10px] text-green-400 mt-1">Sword Object</div>
       </div>
       <div className="flex flex-col items-center">
         <div className="bg-gray-800 p-2 rounded border border-gray-600 mb-2 font-mono text-xs">list[1] (Item)</div>
         <div className="h-8 w-0.5 bg-gray-600"></div>
         <div className="text-3xl mt-2 p-2 bg-blue-900/20 rounded border border-blue-500/50">🧪</div>
         <div className="text-[10px] text-blue-400 mt-1">Potion Object</div>
       </div>
    </div>

    <div className="bg-gray-900 p-4 rounded-lg text-sm">
      <p>Când scrii <code>foreach (var item in backpack)</code>, tu "ții în mână" o referință generică <code>Item</code>.</p>
      <p className="mt-2">Dar când apelezi <code>item.specialPower()</code>, <strong>V-Table-ul</strong> (Run-time) se asigură că sabia taie și poțiunea vindecă.</p>
    </div>
  </div>
);

// Slide 23: Architecture (Old 22)
const Slide23_Architecture = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-full max-w-2xl h-96 bg-gray-900/50 rounded-xl border border-gray-700 p-4">
        
        {/* Abstract Base */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-800 border-2 border-gray-600 p-3 rounded-lg flex flex-col items-center z-10 w-48"
        >
          <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Base Class</div>
          <div className="text-lg font-mono font-bold">Item</div>
          <div className="text-[10px] text-gray-500 italic">specialPower()</div>
        </motion.div>

        {/* Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }}
            d="M336 80 L200 160" stroke="#6b7280" strokeWidth="2" fill="none" 
          />
           <motion.path 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }}
            d="M336 80 L470 160" stroke="#6b7280" strokeWidth="2" fill="none" 
          />
          {/* Arrow heads manual via CSS or just lines for simplicity in this tech stack */}
        </svg>

        {/* Derived Classes */}
        <div className="absolute top-40 w-full flex justify-between px-16">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            className="bg-green-900/30 border border-green-500 p-3 rounded flex flex-col items-center w-32"
          >
            <div className="text-2xl">🗡️</div>
            <div className="font-bold text-sm">Sword</div>
            <div className="text-[10px] text-green-400">override specialPower()</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            className="bg-blue-900/30 border border-blue-500 p-3 rounded flex flex-col items-center w-32"
          >
            <div className="text-2xl">🧪</div>
            <div className="font-bold text-sm">Potion</div>
            <div className="text-[10px] text-blue-400">override specialPower()</div>
          </motion.div>
        </div>

        {/* The List Bucket */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-24 bg-purple-900/20 border-2 border-dashed border-purple-500 rounded-xl flex items-center justify-center gap-4"
        >
          <span className="text-xs text-purple-300 absolute -top-3 bg-gray-900 px-2">List&lt;Item&gt; backpack</span>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-2xl">🗡️</motion.div>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="text-2xl">🧪</motion.div>
        </motion.div>

        {/* Execution Loop */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3 }}
          className="absolute right-4 bottom-4 bg-yellow-900/20 border border-yellow-500/50 p-2 rounded text-[10px] font-mono w-40"
        >
          <div className="text-yellow-400 font-bold mb-1">Runtime Loop:</div>
          <div>foreach(i in list) {"{"}</div>
          <div className="pl-2 text-white">i.specialPower()</div>
          <div>{"}"}</div>
        </motion.div>

      </div>
      <p className="mt-4 text-center text-gray-400 text-sm">
        Arhitectura completă: Cum moștenirea și polimorfismul lucrează împreună.
      </p>
    </div>
  );
};


// --- Data & Main App ---

const slides = [
  // Module 1: Genesis
  {
    id: 1,
    type: "visual",
    title: "Schița vs. Viața",
    subtitle: "Class vs Object",
    render: () => <Slide1_Blueprint />
  },
  {
    id: 2,
    type: "theory",
    title: "Alocarea Memoriei",
    subtitle: "Unde trăiesc monștrii?",
    render: () => <Slide2_Theory />
  },
  
  // Module 2: Birth
  {
    id: 3,
    type: "visual",
    title: "Laboratorul lui Frankenstein",
    subtitle: "Constructorul",
    render: () => <Slide3_Constructor />
  },
  {
    id: 4,
    type: "theory",
    title: "Nașterea (Constructori)",
    subtitle: "Primul țipăt",
    render: () => <Slide4_Theory />
  },
  {
    id: 5,
    type: "theory", // Mixed
    title: "Tipuri de Constructori",
    subtitle: "Menu-ul de Comandă",
    render: () => <Slide5_ConstructorTypes />
  },

  // Module 3: Family
  {
    id: 6,
    type: "visual",
    title: "Arborele Genealogic (DNA)",
    subtitle: "Inheritance",
    render: () => <Slide6_Inheritance />
  },
  {
    id: 7,
    type: "theory",
    title: "Regulile Moștenirii",
    subtitle: "Deep Dive",
    render: () => <Slide7_Theory />
  },

  // Module 4: Order
  {
    id: 8,
    type: "visual",
    title: "Ordinea Creației",
    subtitle: "Schelet vs. Piele",
    render: () => <Slide8_Chain />
  },
  {
    id: 9,
    type: "theory",
    title: "Constructor Chaining",
    subtitle: "Fundația înainte de Acoperiș",
    render: () => <Slide9_ChainingTheory />
  },

  // Module 5: Personality
  {
    id: 10,
    type: "visual",
    title: "Concursul de Talente",
    subtitle: "Run-time Polymorphism",
    render: () => <Slide10_Polymorphism />
  },
  {
    id: 11,
    type: "theory",
    title: "Polimorfism: The Deep Dive",
    subtitle: "Compile vs Runtime",
    render: () => <Slide11_PolymorphismTheory />
  },

  // Module 6: The Sword
  {
    id: 12,
    type: "visual",
    title: "Dilema Sabiei",
    subtitle: "New vs Override",
    render: () => <Slide12_NewVsOverride />
  },
  {
    id: 13,
    type: "theory",
    title: "Method Hiding (new)",
    subtitle: "Capcana Periculoasă",
    render: () => <Slide13_HidingTheory />
  },

  // Module 7: Array
  {
    id: 14,
    type: "visual",
    title: "Armata Diversă",
    subtitle: "Collections",
    render: () => <Slide14_List />
  },
  {
    id: 15,
    type: "theory",
    title: "Upcasting",
    subtitle: "O listă să-i stăpânească pe toți",
    render: () => <Slide15_UpcastingTheory />
  },

  // Module 8: Ghosts
  {
    id: 16,
    type: "visual",
    title: "Planul Fantomă",
    subtitle: "Abstract Classes",
    render: () => <Slide16_Abstract />
  },
  {
    id: 17,
    type: "theory",
    title: "Abstract Class Rules",
    subtitle: "Contractul Suprem",
    render: () => <Slide17_AbstractRules />
  },
  {
    id: 18,
    type: "theory",
    title: "Abstract vs Interface",
    subtitle: "Fantoma vs Avocatul",
    render: () => <Slide18_AbstractVsInterface />
  },

  // Module 9: Overloading
  {
    id: 19,
    type: "visual",
    title: "Bucătarul Monstru",
    subtitle: "Method Overloading",
    render: () => <Slide19_Overloading />
  },
  {
    id: 20,
    type: "theory",
    title: "Polimorfism Static (Overloading)",
    subtitle: "Semnătura Metodei",
    render: () => <Slide20_OverloadingTheory />
  },

  // Module 10: Finale
  {
    id: 21,
    type: "visual",
    title: "Inventarul RPG",
    subtitle: "The Visual Demo",
    render: () => <Slide21_Inventory />
  },
  {
    id: 22,
    type: "theory",
    title: "Magia Rucsacului",
    subtitle: "Putting it together",
    render: () => <Slide22_InventoryTheory />
  },
  {
    id: 23,
    type: "theory",
    title: "Arhitectura Finală",
    subtitle: "Puzzle-ul Complet",
    render: () => <Slide23_Architecture />
  },
  {
    id: 24,
    type: "end",
    title: "Level Complete!",
    subtitle: "Ai supraviețuit cursului OOP",
    content: (
      <div className="text-center space-y-8 flex flex-col items-center">
        <div className="text-7xl animate-bounce flex gap-4">
          <span>🧛‍♀️</span><span>🧟‍♂️</span><span>👻</span>
        </div>
        <p className="text-xl max-w-lg mx-auto leading-relaxed">
          Felicitări! Ai învățat despre Constructori, Moștenire (Single only!), Polimorfism (Virtual vs Override vs Overloading) și Clase Abstracte.
        </p>
        <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/50 w-full max-w-md text-left">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-300"><Terminal size={20}/> Ce urmează?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li><strong>Interfaces:</strong> Contracte pure, fără cod.</li>
            <li><strong>Generics:</strong> Liste magice.</li>
            <li><strong>Design Patterns:</strong> Cum să construiești un castel, nu o colibă.</li>
          </ul>
        </div>
      </div>
    )
  }
];

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col overflow-hidden selection:bg-purple-500 selection:text-white font-sans">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/95 backdrop-blur z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-lg"><Ghost className="text-white" size={20} /></div>
          <h1 className="font-horror text-2xl tracking-wider text-purple-100 hidden sm:block">Monster OOP Academy <span className="text-xs font-mono text-purple-400 ml-2">v2.1</span></h1>
        </div>
        <div className="text-xs text-gray-500 font-mono bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
          Module {Math.ceil((currentSlide + 1) / 2)} • Slide {currentSlide + 1}
        </div>
      </header>

      {/* Main Stage */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full flex flex-col"
          >
            {/* Slide Title Header */}
            <div className="mb-6 md:mb-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent font-horror tracking-wide">
                {slide.title}
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                 {slide.type === "visual" && <Zap size={14} className="text-yellow-500"/>}
                 {slide.type === "theory" && <Code size={14} className="text-blue-500"/>}
                 <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em]">{slide.subtitle}</p>
              </div>
            </div>

            {/* Slide Body */}
            <div className="flex-1 flex flex-col justify-center">
              {slide.render ? (
                // Now supports full rendering for both types
                <div className={`${slide.type === 'theory' ? 'bg-gray-800/40 border-gray-700/50' : 'bg-transparent'} p-6 md:p-10 rounded-2xl border ${slide.type === 'theory' ? '' : 'border-transparent'} shadow-2xl backdrop-blur-sm max-w-3xl mx-auto w-full h-full flex flex-col justify-center`}>
                  {slide.render()}
                </div>
              ) : (
                <div className="bg-gray-800/40 p-6 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm max-w-3xl mx-auto w-full">
                  <div className="text-base md:text-lg leading-relaxed text-gray-200">
                    {/* Fallback for legacy content prop */}
                    {slide.content}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="p-4 md:p-6 border-t border-gray-800 flex justify-between items-center bg-gray-900 z-50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${currentSlide === 0 ? "text-gray-700 cursor-not-allowed" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <ArrowLeft size={18} /> Prev
        </button>

        {/* Progress Dots */}
        <div className="hidden md:flex gap-1.5 flex-wrap justify-center max-w-[50%]">
          {slides.map((_, idx) => (
             <button 
               key={idx} 
               onClick={() => setCurrentSlide(idx)}
               className={`h-1.5 rounded-full transition-all duration-300 hover:bg-purple-400 ${idx === currentSlide ? "w-8 bg-purple-500" : "w-1.5 bg-gray-700"}`} 
             />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${currentSlide === slides.length - 1 ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)]"}`}
        >
          {currentSlide === slides.length - 1 ? "Finish" : "Next Concept"} <ArrowRight size={18} />
        </button>
      </footer>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
