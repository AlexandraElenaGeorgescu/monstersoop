
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
  Info
} from "lucide-react";

// --- Type Definitions ---

interface CodeBlockProps {
  code: string;
  language?: string;
}

interface MonsterButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

interface TipBoxProps {
  title: string;
  children: React.ReactNode;
  variant?: "info" | "warning" | "fun";
}

// --- Shared Components ---

const CodeBlock = ({ code }: CodeBlockProps) => (
  <div className="bg-gray-950 border-l-4 border-purple-500 p-4 rounded-md shadow-inner my-4 font-code text-sm sm:text-base overflow-x-auto text-gray-300">
    <pre>
      <code>{code}</code>
    </pre>
  </div>
);

const MonsterButton = ({ onClick, children, variant = "primary", disabled = false }: MonsterButtonProps) => {
  let styles = "";
  if (variant === "primary") styles = "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)] border border-purple-400";
  if (variant === "secondary") styles = "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600";
  if (variant === "danger") styles = "bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-500";

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

const TipBox = ({ title, children, variant = "info" }: TipBoxProps) => {
  let borderColor = "border-yellow-500/30";
  let iconColor = "text-yellow-400";
  let Icon = Zap;

  if (variant === "warning") {
    borderColor = "border-red-500/50";
    iconColor = "text-red-500";
    Icon = AlertTriangle;
  } else if (variant === "fun") {
    borderColor = "border-pink-500/50";
    iconColor = "text-pink-400";
    Icon = Info;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-900/80 border ${borderColor} rounded-lg p-4 mt-6 backdrop-blur-sm`}
    >
      <div className={`flex items-center gap-2 mb-2 ${iconColor} font-bold`}>
        <Icon size={18} />
        <span>{title}</span>
      </div>
      <div className="text-gray-300 text-sm italic leading-relaxed">{children}</div>
    </motion.div>
  );
};

// --- Specific Slide Implementations ---

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

// Slide 5: Inheritance
const Slide5_Inheritance = () => {
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

// Slide 7: Creation Order
const Slide7_Chain = () => {
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
            <strong className="text-blue-400">1. Base Constructor</strong>
            <div className="text-gray-400">Inițializează Scheletul (HP, ID)</div>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 140, opacity: 1 }}
            className="absolute bottom-10 right-0 text-xs bg-green-900/80 p-2 rounded border border-green-600 w-36 shadow-lg"
          >
            <strong className="text-green-400">2. Derived Constructor</strong>
            <div className="text-gray-300">Adaugă Putreziciunea (Specific)</div>
          </motion.div>
        )}
      </div>

      <MonsterButton onClick={() => setStep(1)} disabled={step > 0}>
        {step === 0 ? "new Zombie()" : (step === 1 ? "Building Base..." : "Complete")}
      </MonsterButton>
    </div>
  );
};

// Slide 9: Polymorphism
const Slide9_Polymorphism = () => {
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

// Slide 11: New vs Override
const Slide11_NewVsOverride = () => {
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

// Slide 13: List
const Slide13_List = () => {
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

// Slide 15: Abstract
const Slide15_Abstract = () => {
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

// Slide 17: Overloading
const Slide17_Overloading = () => {
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

// Slide 19: Inventory
const Slide19_Inventory = () => {
  const [log, setLog] = useState<string[]>([]);

  const useAll = () => {
    setLog([]);
    ["Sword", "Potion", "Shield"].forEach((item, i) => {
      setTimeout(() => {
        let msg = "";
        if (item === "Sword") msg = "Sword: SLASH! (-10HP)";
        if (item === "Potion") msg = "Potion: Glug glug! (+50HP)";
        if (item === "Shield") msg = "Shield: Clang! (Block)";
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
    content: (
      <div className="space-y-4">
        <p><strong>Clasa</strong> e doar o hârtie (Blueprint). Nu te poate mușca. <strong>Obiectul</strong> e monstrul real, creat în memorie.</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2"><Box size={16}/> Stack (Stiva)</h4>
            <p className="text-xs text-gray-300">Aici stă referința (telecomanda). E rapidă și mică. <code>Monster m;</code></p>
          </div>
          <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2"><Users size={16}/> Heap (Grămada)</h4>
            <p className="text-xs text-gray-300">Aici stă Monstrul fizic. E spațiul mare. <code>new Monster();</code></p>
          </div>
        </div>
        <TipBox title="Știai că?" variant="fun">
          C# trebuia să se numească "Cool" (C-like Object Oriented Language). Dar creatorii și-au dat seama că extensia fișierelor ar fi fost <strong>.cool</strong>, ceea ce nu suna foarte "profesional" pentru corporații. Au ales C# (nota muzicală Do Diez).
        </TipBox>
      </div>
    )
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
    content: (
      <div className="space-y-4">
        <p>Un <strong>Constructor</strong> este o metodă specială care se execută <strong>AUTOMAT</strong> când folosești cuvântul <code>new</code>.</p>
        <p>Scopul lui? Să inițializeze datele (HP, Name) ca să nu ai un monstru "gol" (null).</p>
        <CodeBlock code={`class Monster {\n  public int Hp;\n  // Constructorul (același nume cu clasa)\n  public Monster() {\n    Hp = 100; // Rezervor plin!\n  }\n}`} />
      </div>
    ),
    tip: "Constructorul nu are 'return type'. Dacă pui 'void Monster()', devine o metodă normală și nu mai e constructor!"
  },

  // Module 3: Family
  {
    id: 5,
    type: "visual",
    title: "Arborele Genealogic (DNA)",
    subtitle: "Inheritance",
    render: () => <Slide5_Inheritance />
  },
  {
    id: 6,
    type: "theory",
    title: "Regulile Moștenirii",
    subtitle: "Cine sunt părinții tăi?",
    content: (
      <div className="space-y-4">
        <p>Copilul (Derived Class) moștenește toate câmpurile și metodele părintelui (Base Class). Vampirul are automat <code>HP</code> de la Monstru.</p>
        <CodeBlock code={`class Vampire : Monster {\n  // Are deja HP și Roar()\n  public void Fly() { ... }\n}`} />
        <TipBox title="Single Inheritance Rule" variant="warning">
          În C#, o clasă poate avea <strong>UN SINGUR</strong> tată (Base Class). Nu poți fi jumătate Vampir, jumătate Zombie. "No Hybrids allowed!"
        </TipBox>
      </div>
    )
  },

  // Module 4: Order
  {
    id: 7,
    type: "visual",
    title: "Ordinea Creației",
    subtitle: "Schelet vs. Piele",
    render: () => <Slide7_Chain />
  },
  {
    id: 8,
    type: "theory",
    title: "Constructor Chaining",
    subtitle: "base()",
    content: (
      <div className="space-y-4">
        <p>Constructori <strong>NU</strong> se moștenesc! Ei se apelează în lanț.</p>
        <p>Când creezi un <code>new Zombie()</code>:</p>
        <ol className="list-decimal list-inside text-sm text-gray-300 ml-2">
          <li>Se execută <strong>Base Constructor</strong> (Scheletul)</li>
          <li>Se execută <strong>Derived Constructor</strong> (Carnea)</li>
        </ol>
        <CodeBlock code={`public Zombie(string name) : base(name) {\n  // Apelează explicit constructorul tatălui\n}`} />
      </div>
    ),
    tip: "Dacă nu pui : base(), C# încearcă să apeleze constructorul tatălui fără parametri. Dacă tatăl nu are unul, codul crapă."
  },

  // Module 5: Personality
  {
    id: 9,
    type: "visual",
    title: "Concursul de Talente",
    subtitle: "Run-time Polymorphism",
    render: () => <Slide9_Polymorphism />
  },
  {
    id: 10,
    type: "theory",
    title: "Polimorfism (Run-Time)",
    subtitle: "One interface, multiple implementations",
    content: (
      <div className="space-y-4">
        <p>Trei monștri, o singură comandă: <code>Sing()</code>. Fiecare răspunde diferit.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-2 rounded border border-purple-500/30">
             <div className="text-purple-400 font-bold text-xs">virtual</div>
             <p className="text-[10px] text-gray-400">Părintele își dă permisiunea: "Puteți schimba asta".</p>
          </div>
          <div className="bg-gray-800 p-2 rounded border border-green-500/30">
             <div className="text-green-400 font-bold text-xs">override</div>
             <p className="text-[10px] text-gray-400">Copilul schimbă regula: "Eu fac așa!"</p>
          </div>
        </div>
        <CodeBlock code={`public override void Sing() {\n  Console.WriteLine("Hiss!");\n}`} />
        <p className="text-xs text-gray-400">Decizia se ia la <strong>Runtime</strong> (în timpul execuției).</p>
      </div>
    )
  },

  // Module 6: The Sword
  {
    id: 11,
    type: "visual",
    title: "Dilema Sabiei",
    subtitle: "New vs Override",
    render: () => <Slide11_NewVsOverride />
  },
  {
    id: 12,
    type: "theory",
    title: "Method Hiding (new)",
    subtitle: "Capcana",
    content: (
      <div className="space-y-4">
        <p>Dacă folosești <code>new</code> în loc de <code>override</code>, doar ascunzi metoda tatălui, nu o înlocuiești real.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
          <li><strong className="text-green-400">Override:</strong> Toată lumea vede metoda nouă (Sabia Ascuțită).</li>
          <li><strong className="text-red-400">New:</strong> Metoda nouă e ascunsă. Dacă ești privit ca `Monster`, se execută metoda veche!</li>
        </ul>
        <TipBox title="Sfat Prietenesc" variant="warning">
          Evită `new`. De obicei înseamnă că design-ul clasei Base este greșit și ai uitat să pui `virtual`.
        </TipBox>
      </div>
    )
  },

  // Module 7: Array
  {
    id: 13,
    type: "visual",
    title: "Armata Diversă",
    subtitle: "Collections",
    render: () => <Slide13_List />
  },
  {
    id: 14,
    type: "theory",
    title: "Upcasting",
    subtitle: "O listă să-i stăpânească pe toți",
    content: (
      <div className="space-y-4">
        <p>Putem stoca obiecte Derived într-o referință de tip Base. Asta e <strong>Upcasting</strong>.</p>
        <CodeBlock code={`List<Monster> horde = new List<Monster>();\nhorde.Add(new Zombie()); // Legal!\nhorde.Add(new Vampire()); // Legal!`} />
        <p>Pentru listă, toți sunt doar `Monster`. Dar datorită polimorfismului (virtual/override), ei se comportă corect când apelăm metodele.</p>
      </div>
    )
  },

  // Module 8: Ghosts
  {
    id: 15,
    type: "visual",
    title: "Planul Fantomă",
    subtitle: "Abstract Classes",
    render: () => <Slide15_Abstract />
  },
  {
    id: 16,
    type: "theory",
    title: "Abstract Class",
    subtitle: "Contractul",
    content: (
      <div className="space-y-4">
        <p>O clasă <strong>abstractă</strong> este o idee incompletă. Nu poți face <code>new AbstractClass()</code>.</p>
        <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
          <li>Servește doar ca bază (Base Class).</li>
          <li>Poate avea metode normale (cu cod).</li>
          <li>Poate avea metode abstracte (fără cod).</li>
        </ul>
        <CodeBlock code={`abstract class Item {\n  public int Id; // Normal\n  public abstract void Use(); // Contract\n}`} />
        <p className="text-sm font-bold text-purple-400">Dacă moștenești o clasă abstractă, ești OBLIGAT să implementezi metodele abstracte!</p>
      </div>
    )
  },

  // Module 9: Overloading
  {
    id: 17,
    type: "visual",
    title: "Bucătarul Monstru",
    subtitle: "Method Overloading",
    render: () => <Slide17_Overloading />
  },
  {
    id: 18,
    type: "theory",
    title: "Polimorfism Static (Overloading)",
    subtitle: "Semnătura Metodei",
    content: (
      <div className="space-y-4">
        <p>Aceeași metodă, parametri diferiți. Asta se numește <strong>Compile-time Polymorphism</strong>.</p>
        <CodeBlock code={`void Cook() { ... }\nvoid Cook(Human h) { ... }\nvoid Cook(Human h, Sauce s) { ... }`} />
        <p>Compilatorul știe EXACT ce metodă să apeleze uitându-se la lista de argumente. Nu e nicio magie la runtime.</p>
        <TipBox title="Pro Tip" variant="info">
          Doar tipul și ordinea parametrilor contează. Return type-ul NU face metoda unică!
        </TipBox>
      </div>
    )
  },

  // Module 10: Finale
  {
    id: 19,
    type: "visual",
    title: "Inventarul RPG",
    subtitle: "Putting it together",
    render: () => <Slide19_Inventory />
  },
  {
    id: 20,
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
          <h1 className="font-horror text-2xl tracking-wider text-purple-100 hidden sm:block">Monster OOP Academy <span className="text-xs font-mono text-purple-400 ml-2">v2.0</span></h1>
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
                slide.render()
              ) : (
                <div className="bg-gray-800/40 p-6 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm max-w-3xl mx-auto w-full">
                  <div className="text-base md:text-lg leading-relaxed text-gray-200">
                    {slide.content}
                  </div>
                  {slide.tip && (
                    <TipBox title="Pro Tip">
                      {slide.tip}
                    </TipBox>
                  )}
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
