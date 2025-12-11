import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Skull, Zap, Ghost, Sword, Box, ArrowRight, ArrowLeft, Code, Terminal, 
  Shield, AlertTriangle, Info, CheckCircle2, XCircle, BookOpen, Scroll, 
  Lock, Globe, Menu as MenuIcon, X, Trophy, Backpack, Bug, 
  Database, Layers, List as ListIcon, Search, Key, Flag, Flame, Snowflake, 
  Droplets, Activity, Hammer, Split, Anchor, Eye, EyeOff, Hash, Share2,
  Table as TableIcon, FileText, CornerDownRight, FileCode
} from "lucide-react";

// Animation variants for reuse
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
};

// --- Type Definitions ---

interface CodeBlockProps {
  code: string;
  highlight?: string;
}

interface MonsterButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success";
  disabled?: boolean;
  className?: string;
}

interface TipBoxProps {
  title: string;
  children?: React.ReactNode;
  variant?: "info" | "warning" | "fun" | "pro";
  delay?: number;
}

// --- Shared Components ---

const CodeBlock = ({ code, highlight }: CodeBlockProps) => (
  <div className="bg-gray-950 border-l-4 border-purple-500 p-4 rounded-md shadow-inner my-4 font-code text-xs sm:text-sm overflow-x-auto text-gray-300 relative group max-w-full">
    <pre>
      <code>{code}</code>
    </pre>
    {highlight && <div className="absolute top-2 right-2 text-[10px] text-purple-400 opacity-50">{highlight}</div>}
  </div>
);

const MonsterButton = ({ onClick, children, variant = "primary", disabled = false, className = "" }: MonsterButtonProps) => {
  let styles = "";
  if (variant === "primary") styles = "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)] border border-purple-400";
  if (variant === "secondary") styles = "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600";
  if (variant === "danger") styles = "bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-500";
  if (variant === "success") styles = "bg-green-900/50 hover:bg-green-800 text-green-200 border border-green-500";
  if (variant === "ghost") styles = "bg-transparent hover:bg-gray-800 text-gray-400 border border-transparent";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold transition-all flex items-center gap-2 justify-center text-xs sm:text-sm ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : styles} ${className}`}
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
      className={`${bgColor} border ${borderColor} rounded-lg p-3 sm:p-4 mt-4 backdrop-blur-sm shadow-lg`}
    >
      <div className={`flex items-center gap-2 mb-2 ${iconColor} font-bold uppercase tracking-wider text-xs`}>
        <Icon size={16} />
        <span>{title}</span>
      </div>
      <div className="text-gray-200 text-xs sm:text-sm leading-relaxed">{children}</div>
    </motion.div>
  );
};

// =======================
// MODULE 1: INTRO & FUNDAMENTALS (Structure, Data Types, Conversions)
// =======================

// Slide: .NET Introduction - The Compilation Pipeline Visual
const Slide_NetIntro = () => {
  const [step, setStep] = useState(0);
  const stages = [
    { icon: "📝", label: "C# Code", desc: "Your .cs files", color: "blue" },
    { icon: "⚙️", label: "Compiler", desc: "Roslyn", color: "purple" },
    { icon: "📦", label: "IL Code", desc: "Intermediate Language", color: "yellow" },
    { icon: "🚀", label: "CLR + JIT", desc: "Runtime Magic", color: "green" },
    { icon: "💻", label: "Native", desc: "Machine Code", color: "red" }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % (stages.length + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex flex-col h-full items-center justify-center gap-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="text-4xl mb-2">⚡</div>
        <h3 className="text-2xl font-bold text-purple-400">How C# Becomes Magic</h3>
        <p className="text-sm text-gray-400 mt-1">The compilation journey!</p>
      </motion.div>
      
      {/* Pipeline Animation */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: step >= i ? 1 : 0.8,
                opacity: step >= i ? 1 : 0.3,
                y: step === i ? -10 : 0
              }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col items-center p-4 rounded-xl border-2 w-24 ${
                step >= i 
                  ? `bg-${stage.color}-900/50 border-${stage.color}-400` 
                  : 'bg-gray-800 border-gray-700'
              }`}
            >
              <motion.div 
                animate={step === i ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: step === i ? Infinity : 0 }}
                className="text-3xl mb-2"
              >
                {stage.icon}
              </motion.div>
              <div className="text-xs font-bold text-center">{stage.label}</div>
              <div className="text-[9px] text-gray-400 text-center mt-1">{stage.desc}</div>
            </motion.div>
            
            {i < stages.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: step > i ? 1 : 0.3,
                  x: step > i ? [0, 5, 0] : 0
                }}
                transition={{ x: { duration: 0.5, repeat: step > i ? Infinity : 0 } }}
                className="text-xl text-gray-500"
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>
      
      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 p-3 rounded-lg border border-purple-500/30 text-center"
        >
          <div className="text-2xl mb-1">🏗️</div>
          <div className="text-xs font-bold text-purple-400">.NET Framework</div>
          <div className="text-[10px] text-gray-400">The Platform</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800 p-3 rounded-lg border border-green-500/30 text-center"
        >
          <div className="text-2xl mb-1">🧠</div>
          <div className="text-xs font-bold text-green-400">CLR</div>
          <div className="text-[10px] text-gray-400">The Engine</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gray-800 p-3 rounded-lg border border-blue-500/30 text-center"
        >
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xs font-bold text-blue-400">JIT</div>
          <div className="text-[10px] text-gray-400">Speed Boost</div>
        </motion.div>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        🔄 Watch the code transform automatically!
    </div>
  </div>
);
};

// C# Structure Slide with Animations
const Slide_CSharpStructure = () => {
  const [showExample, setShowExample] = useState(false);
  return (
    <div className="flex flex-col h-full gap-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-xl font-bold text-blue-400 mb-4">C# Structure</h3>
        <p className="text-sm text-gray-300 mb-4">The first line is a <strong>directive</strong> that tells our program we're going to use classes from a namespace.</p>
      </motion.div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-4 rounded-lg border border-blue-500/30"
        >
          <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
            <Code size={18}/> using Directive
          </h4>
          <p className="text-xs text-gray-400 mb-3">Tells the program which namespace to use</p>
          <CodeBlock code={`using System;`} />
          <p className="text-[10px] text-gray-500 mt-2">In our case, we're using the class "Console" from namespace "System"</p>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="bg-gray-800 p-4 rounded-lg border border-purple-500/30"
        >
          <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
            <Layers size={18}/> Namespace
          </h4>
          <p className="text-xs text-gray-400 mb-3">A logical way of grouping classes</p>
          <CodeBlock code={`namespace MyApp {\n  class Program { ... }\n}`} />
          <p className="text-[10px] text-gray-500 mt-2">In newer versions, this can be simplified</p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.6 }}
        className="bg-gray-900 p-4 rounded-lg border border-green-500/30"
      >
        <button 
          onClick={() => setShowExample(!showExample)}
          className="w-full text-left flex items-center justify-between mb-2"
        >
          <h4 className="font-bold text-green-400">Complete Example</h4>
          <ArrowRight className={`transition-transform ${showExample ? 'rotate-90' : ''}`} size={16} />
        </button>
        <AnimatePresence>
          {showExample && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CodeBlock code={`using System;\n\nclass HelloWorld\n{\n    public static void Main()\n    {\n        Console.WriteLine("Hello world!");\n    }\n}`} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Slide: Value vs Reference - The Box vs The Arrow (Visual)
const Slide_ValueVsReference = () => {
  const [showCopy, setShowCopy] = useState(false);
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl font-bold text-purple-400 mb-2 text-center">The Box vs The Arrow 📦➡️</h3>
        <p className="text-sm text-gray-400 text-center">Value Type = The actual box. Reference Type = An arrow pointing to the box!</p>
      </motion.div>
      
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Value Type */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-green-900/20 p-6 rounded-xl border-2 border-green-500/50"
        >
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📦</div>
            <div className="font-bold text-green-400">Value Type</div>
            <div className="text-xs text-gray-500 mt-1">int, bool, char, struct</div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border border-green-500/30">
              <div className="text-xs font-mono text-gray-300 mb-2">int a = 10;</div>
              <div className="flex items-center gap-2">
                <div className="bg-green-500 p-2 rounded font-mono text-sm">10</div>
                <div className="text-xs text-gray-400">← The value is HERE</div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCopy(!showCopy)}
              className="w-full bg-gray-800 p-2 rounded text-xs text-gray-300 hover:bg-gray-700"
            >
              {showCopy ? "Hide Copy" : "Show Copy"}
            </motion.button>
            
            <AnimatePresence>
              {showCopy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-800 p-3 rounded border border-green-500/30"
                >
                  <div className="text-xs font-mono text-gray-300 mb-2">int b = a;</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 p-2 rounded font-mono text-sm">10</div>
                    <div className="text-xs text-gray-400">← COPY created!</div>
                  </div>
                  <div className="text-[10px] text-green-400 mt-2">Two separate boxes with same value!</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Reference Type */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-blue-900/20 p-6 rounded-xl border-2 border-blue-500/50"
        >
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">➡️</div>
            <div className="font-bold text-blue-400">Reference Type</div>
            <div className="text-xs text-gray-500 mt-1">string, class, array</div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border border-blue-500/30">
              <div className="text-xs font-mono text-gray-300 mb-2">string a = "Hello";</div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-700 px-2 py-1 rounded text-xs">a</div>
                <ArrowRight className="text-blue-400" size={16} />
                <div className="bg-blue-500 p-2 rounded font-mono text-xs">"Hello"</div>
                <div className="text-xs text-gray-400">← Arrow points here</div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCopy(!showCopy)}
              className="w-full bg-gray-800 p-2 rounded text-xs text-gray-300 hover:bg-gray-700"
            >
              {showCopy ? "Hide Copy" : "Show Copy"}
            </motion.button>
            
            <AnimatePresence>
              {showCopy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-800 p-3 rounded border border-blue-500/30"
                >
                  <div className="text-xs font-mono text-gray-300 mb-2">string b = a;</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-700 px-2 py-1 rounded text-xs">b</div>
                    <ArrowRight className="text-blue-400" size={16} />
                    <div className="bg-blue-500 p-2 rounded font-mono text-xs">"Hello"</div>
                    <div className="text-xs text-gray-400">← SAME box!</div>
                  </div>
                  <div className="text-[10px] text-blue-400 mt-2">Two arrows pointing to the SAME box!</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-yellow-900/20 p-4 rounded border border-yellow-500/30 text-xs text-center max-w-2xl"
      >
        <strong className="text-yellow-400">Key Difference:</strong> Value types hold the data directly (like carrying a box). Reference types hold an address/arrow pointing to where the data lives (like having a map to the box).
      </motion.div>
    </div>
  );
};

const Slide_DataTypes_Table = () => {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const types = [
    { type: "bool", represents: "Boolean", range: "True or False", default: "False" },
    { type: "byte", represents: "8-bit unsigned", range: "0 to 255", default: "0" },
    { type: "char", represents: "16-bit Unicode", range: "U+0000 to U+ffff", default: "'\\0'" },
    { type: "int", represents: "32-bit signed", range: "-2.1B to 2.1B", default: "0" },
    { type: "long", represents: "64-bit signed", range: "Huge integer range", default: "0L" },
    { type: "float", represents: "32-bit single-prec", range: "~6-9 digits precision", default: "0.0F" },
    { type: "double", represents: "64-bit double-prec", range: "~15-17 digits precision", default: "0.0D" },
    { type: "decimal", represents: "128-bit precise", range: "28-29 significant digits (Financial)", default: "0.0M" },
  ];
  
  return (
  <div className="flex flex-col h-full">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2"><TableIcon size={18}/> Primitive Data Types</h3>
        <p className="text-xs text-gray-400 mt-1">These types literally represent a value</p>
      </motion.div>
      <div className="overflow-x-auto border border-gray-700 rounded-lg flex-1">
      <table className="w-full text-left text-xs text-gray-300">
          <motion.thead initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gray-800 text-gray-100 uppercase font-bold">
          <tr>
            <th className="p-3">Type</th>
            <th className="p-3">Represents</th>
            <th className="p-3">Range / Note</th>
            <th className="p-3">Default</th>
          </tr>
          </motion.thead>
        <tbody className="divide-y divide-gray-700 bg-gray-900/50">
            {types.map((t, i) => (
              <motion.tr
                key={t.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onMouseEnter={() => setHighlighted(t.type)}
                onMouseLeave={() => setHighlighted(null)}
                className={`cursor-pointer transition-all ${highlighted === t.type ? 'bg-purple-900/30 scale-[1.02]' : 'hover:bg-gray-800/50'}`}
              >
                <td className="p-3 font-mono text-purple-300">{t.type}</td>
                <td className="p-3">{t.represents}</td>
                <td className="p-3">{t.range}</td>
                <td className="p-3 font-mono text-green-400">{t.default}</td>
              </motion.tr>
            ))}
        </tbody>
      </table>
    </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[10px] text-gray-500 mt-2 italic">
        * Primitives represent literal values.
      </motion.p>
  </div>
);
};

const Slide_Conversion = () => {
  const [showExample, setShowExample] = useState<"implicit" | "explicit" | "helper">("implicit");
  return (
    <div className="flex flex-col h-full gap-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h3 className="text-xl font-bold text-purple-400 mb-2">Data Conversions</h3>
        <p className="text-xs text-gray-400">A variable can be converted from its type to another in two ways</p>
      </motion.div>
      
      <div className="flex gap-2 justify-center">
        {[
          { key: "implicit", label: "Implicit", color: "green" },
          { key: "explicit", label: "Explicit", color: "yellow" },
          { key: "helper", label: "Helpers", color: "blue" }
        ].map(btn => (
          <motion.button
            key={btn.key}
            onClick={() => setShowExample(btn.key as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${showExample === btn.key ? `bg-${btn.color}-600 border-${btn.color}-400 text-white` : 'bg-gray-800 border-gray-600 text-gray-400'}`}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {showExample === "implicit" && (
          <motion.div
            key="implicit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-green-900/20 p-6 rounded-xl border border-green-500/30"
          >
            <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
              <ArrowRight className="rotate-90 text-green-400" size={16} />
              Implicit Conversion (Upcast)
            </h4>
            <p className="text-xs text-gray-300 mb-4">No data loss. Smaller type to larger type. Happens automatically.</p>
            <CodeBlock code={`int number = 10;\nobject numberObject = number;\n// Automatically converts int to object`} />
            <TipBox title="Safe" variant="info" delay={0.3}>
              The compiler automatically handles this conversion. No cast needed!
            </TipBox>
          </motion.div>
        )}
        
        {showExample === "explicit" && (
          <motion.div
            key="explicit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-500/30"
          >
            <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
              <ArrowLeft className="rotate-90 text-yellow-400" size={16} />
              Explicit Conversion (Downcast)
            </h4>
            <p className="text-xs text-gray-300 mb-4">Potential data loss. You must specify the cast explicitly.</p>
            <CodeBlock code={`object numberObject = 10;\n// WRONG: int number = numberObject;\n// CORRECT:\nint number = (int)numberObject;\n\n// Or with data loss:\ndouble pi = 3.14;\nint num = (int)pi; // 3 (truncated)`} />
            <TipBox title="Warning" variant="warning" delay={0.3}>
              Explicit conversion requires a cast. Data may be lost (e.g., 3.14 becomes 3).
            </TipBox>
          </motion.div>
        )}
        
        {showExample === "helper" && (
          <motion.div
            key="helper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30"
          >
            <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
              <Terminal size={16} />
              Helper Methods
            </h4>
            <p className="text-xs text-gray-300 mb-4">Built-in methods for safe conversions</p>
            <div className="space-y-2">
              <CodeBlock code={`// Convert class\nint num = Convert.ToInt32("123");\n// Returns 123`} />
              <CodeBlock code={`// Parse (throws exception if fails)\nint num = int.Parse("123");\n// Returns 123, or throws`} />
              <CodeBlock code={`// TryParse (safe, returns bool)\nif (int.TryParse("123", out int num)) {\n    // num is 123\n}`} />
      </div>
          </motion.div>
        )}
      </AnimatePresence>
  </div>
);
};

const Slide_ConstReadonly = () => (
  <div className="grid grid-cols-2 gap-4 h-full items-center">
    <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 h-full flex flex-col">
      <div className="flex items-center gap-2 text-blue-400 font-bold text-lg mb-2"><Lock size={18}/> const</div>
      <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4 flex-1">
        <li>Value set at <strong>Compile Time</strong>.</li>
        <li>Cannot be changed.</li>
        <li>Must be initialized at declaration.</li>
        <li>Implicitly <code>static</code>.</li>
        <li>Primitive types (+ string) only (mostly).</li>
      </ul>
      <div className="mt-auto pt-2 border-t border-blue-500/20 text-[10px] font-mono">const int MaxHp = 100;</div>
    </div>
    <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/30 h-full flex flex-col">
      <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-2"><Shield size={18}/> readonly</div>
      <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4 flex-1">
        <li>Value set at <strong>Runtime</strong>.</li>
        <li>Can be set in declaration OR <strong>Constructor</strong>.</li>
        <li>Can hold Reference types (Objects).</li>
        <li>Can vary per instance.</li>
      </ul>
      <div className="mt-auto pt-2 border-t border-purple-500/20 text-[10px] font-mono">readonly int _birthYear;</div>
    </div>
  </div>
);

const Slide_Var = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4">
    <h3 className="text-2xl font-bold text-pink-400">var (Implicit Typing)</h3>
    <ul className="text-sm text-gray-300 space-y-2 text-center max-w-lg">
      <li>Used for local variables (inside methods).</li>
      <li>Must be initialized immediately.</li>
      <li>Strongly typed! Once a <code>string</code>, always a <code>string</code>.</li>
      <li>Stored on Stack or Heap depending on inferred type.</li>
    </ul>
    <CodeBlock code={`var name = "Alucard"; // Compiled as string\nvar hp = 100; // Compiled as int\n\nname = 50; // ERROR! Cannot change type.`} />
  </div>
);

// =======================
// MODULE 2: OPERATORS & PREPROCESSOR
// =======================

const Slide_Operators_Lists = () => {
  const [tab, setTab] = useState("arithmetic");
  const tabs = ["arithmetic", "logic", "bitwise", "assignment", "general"];
  return (
    <div className="flex flex-col h-full gap-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 justify-center flex-wrap"
      >
        {tabs.map((t, i) => (
          <motion.button 
            key={t} 
            onClick={() => setTab(t)} 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-2 py-1 text-[10px] uppercase font-bold rounded border transition-all ${tab===t ? 'bg-purple-600 border-purple-400 shadow-lg shadow-purple-500/50' : 'bg-gray-800 border-gray-600 hover:bg-gray-700'}`}
          >
            {t}
          </motion.button>
        ))}
      </motion.div>
      <motion.div 
        key={tab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 flex-1 overflow-y-auto"
      >
        {tab === "arithmetic" && (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 border-b border-gray-700 pb-1 font-bold text-gray-400"><span>Op</span><span>Desc</span></div>
            <div className="grid grid-cols-2"><span>+, -, *, /</span><span>Math Basics</span></div>
            <div className="grid grid-cols-2"><span>%</span><span>Modulus (Remainder)</span></div>
            <div className="grid grid-cols-2"><span>++, --</span><span>Increment/Decrement</span></div>
          </div>
        )}
        {tab === "logic" && (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 border-b border-gray-700 pb-1 font-bold text-gray-400"><span>Op</span><span>Desc</span></div>
            <div className="grid grid-cols-2"><span>&&</span><span>Logical AND</span></div>
            <div className="grid grid-cols-2"><span>||</span><span>Logical OR</span></div>
            <div className="grid grid-cols-2"><span>!</span><span>Logical NOT</span></div>
            <div className="grid grid-cols-2"><span>==, !=</span><span>Equality</span></div>
            <div className="grid grid-cols-2"><span>&lt;, &gt;, &lt;=</span><span>Relational</span></div>
          </div>
        )}
        {tab === "bitwise" && (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 border-b border-gray-700 pb-1 font-bold text-gray-400"><span>Op</span><span>Desc</span></div>
            <div className="grid grid-cols-2"><span>&</span><span>Bitwise AND</span></div>
            <div className="grid grid-cols-2"><span>|</span><span>Bitwise OR</span></div>
            <div className="grid grid-cols-2"><span>^</span><span>Bitwise XOR</span></div>
            <div className="grid grid-cols-2"><span>~</span><span>Bitwise Complement</span></div>
            <div className="grid grid-cols-2"><span>&lt;&lt;, &gt;&gt;</span><span>Bit Shift</span></div>
          </div>
        )}
        {tab === "general" && (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 border-b border-gray-700 pb-1 font-bold text-gray-400"><span>Op</span><span>Desc</span></div>
            <div className="grid grid-cols-2"><span className="text-yellow-400">sizeof()</span><span>Size in bytes (Value Types)</span></div>
            <div className="grid grid-cols-2"><span className="text-yellow-400">typeof()</span><span>Get System.Type</span></div>
            <div className="grid grid-cols-2"><span className="text-green-400">is</span><span>Type check</span></div>
            <div className="grid grid-cols-2"><span className="text-green-400">as</span><span>Safe cast (returns null)</span></div>
            <div className="grid grid-cols-2"><span className="text-blue-400">?:</span><span>Ternary (If-Else)</span></div>
            <div className="grid grid-cols-2"><span className="text-blue-400">??</span><span>Null Coalescing</span></div>
          </div>
        )}
        {tab === "assignment" && (
          <div className="space-y-2 text-sm">
             <div className="grid grid-cols-2 border-b border-gray-700 pb-1 font-bold text-gray-400"><span>Op</span><span>Desc</span></div>
             <div className="grid grid-cols-2"><span>=</span><span>Assign</span></div>
             <div className="grid grid-cols-2"><span>+=, -=</span><span>Add/Sub & Assign</span></div>
             <div className="grid grid-cols-2"><span>*=, /=</span><span>Mult/Div & Assign</span></div>
             <div className="grid grid-cols-2"><span>??=</span><span>Null Coalescing Assign</span></div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const Slide_Operators = () => {
  const [activeOp, setActiveOp] = useState<"null" | "ternary" | "precedence">("null");
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-2 justify-center mb-4">
        {[
          { key: "null", label: "Null Coalescing", icon: "??" },
          { key: "ternary", label: "Ternary", icon: "? :" },
          { key: "precedence", label: "Precedence", icon: "Order" }
        ].map(op => (
          <motion.button
            key={op.key}
            onClick={() => setActiveOp(op.key as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${activeOp === op.key ? 'bg-purple-600 border-purple-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-400'}`}
          >
            {op.icon}
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {activeOp === "null" && (
          <motion.div
            key="null"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gray-800 p-6 rounded-xl border border-blue-500/30"
          >
      <h3 className="text-xl font-bold text-blue-400 mb-4">Null Coalescing (??)</h3>
      <p className="text-sm text-gray-300 mb-4">"If left is null, use right."</p>
      <CodeBlock code={`string name = null;\nstring display = name ?? "Unknown";\n// display is "Unknown"`} />
          </motion.div>
        )}
        
        {activeOp === "ternary" && (
          <motion.div
            key="ternary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gray-800 p-6 rounded-xl border border-green-500/30"
          >
            <h3 className="text-xl font-bold text-green-400 mb-4">Conditional Operator (? :)</h3>
            <p className="text-sm text-gray-300 mb-4">"If condition is true ? Then value X : Otherwise value Y"</p>
            <CodeBlock code={`int input = 5;\nstring classify = (input > 0) ? "positive" : "negative";\n// classify is "positive"`} />
          </motion.div>
        )}
        
        {activeOp === "precedence" && (
          <motion.div
            key="precedence"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gray-800 p-6 rounded-xl border border-yellow-500/30"
          >
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Operator Precedence</h3>
            <p className="text-sm text-gray-300 mb-4">Operators with higher precedence execute first.</p>
            <div className="space-y-3">
              <div className="bg-gray-900 p-3 rounded border border-yellow-500/20">
                <p className="text-sm font-mono mb-2">1 + 2 * 3</p>
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-xs text-gray-400"
                >
                  Because * has higher precedence than +:
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm font-mono text-yellow-400 mt-2"
                >
                  1 + (2 * 3) = 7
                </motion.div>
    </div>
              <TipBox title="Remember" variant="pro">
                When operators have the same precedence, associativity determines the order (left-to-right or right-to-left).
              </TipBox>
    </div>
          </motion.div>
        )}
      </AnimatePresence>
  </div>
);
};

const Slide_Preprocessor = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const directives = [
    { 
      code: "#define DEBUG", 
      desc: "Defines a symbol", 
      color: "yellow",
      details: "Creates a compile-time symbol that can be tested with #if"
    },
    { 
      code: "#if, #else, #elif, #endif", 
      desc: "Conditional compilation", 
      color: "blue",
      details: "Include or exclude code regions based on symbols. Can use ||, &&, ! operators."
    },
    { 
      code: "#region, #endregion", 
      desc: "Code organization", 
      color: "green",
      details: "Marks collapsible regions in IDE. Does not affect compilation."
    },
    { 
      code: "#pragma warning disable", 
      desc: "Disable warnings", 
      color: "red",
      details: "Silences specific compiler warnings. Use sparingly!"
    },
    { 
      code: "#warning, #error", 
      desc: "Custom messages", 
      color: "purple",
      details: "Generate custom warnings or errors during compilation."
    }
  ];
  
  return (
    <div className="flex flex-col h-full gap-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
    <h3 className="text-xl font-bold text-gray-300">Preprocessor Directives</h3>
        <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto">Commands for the compiler. They alter the code <em>before</em> actual compilation starts.</p>
      </motion.div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {directives.map((dir, i) => {
          const colorClasses = {
            yellow: "border-yellow-500 text-yellow-400 bg-yellow-900/10",
            blue: "border-blue-500 text-blue-400 bg-blue-900/10",
            green: "border-green-500 text-green-400 bg-green-900/10",
            red: "border-red-500 text-red-400 bg-red-900/10",
            purple: "border-purple-500 text-purple-400 bg-purple-900/10"
          };
          const cls = colorClasses[dir.color as keyof typeof colorClasses];
          
          return (
            <motion.div
              key={dir.code}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gray-800 p-3 rounded border-l-4 ${cls} cursor-pointer transition-all hover:scale-[1.02]`}
              onClick={() => setExpanded(expanded === dir.code ? null : dir.code)}
            >
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono">{dir.code}</code>
                <motion.div
                  animate={{ rotate: expanded === dir.code ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={14} className="text-gray-500" />
                </motion.div>
      </div>
              <p className="text-[10px] text-gray-400 mt-1">{dir.desc}</p>
              <AnimatePresence>
                {expanded === dir.code && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 pt-2 border-t border-gray-700"
                  >
                    <p className="text-[10px] text-gray-300">{dir.details}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-red-900/20 p-3 rounded border border-red-500/30 text-center"
      >
        <div className="text-[10px] text-red-400 italic flex items-center justify-center gap-2">
          <AlertTriangle size={12} />
          <span>Advice: Avoid overuse. It makes code harder to read/maintain.</span>
      </div>
      </motion.div>
  </div>
);
};

// =======================
// MODULE 3: METHODS & ENUMS
// =======================

const Slide_Methods_Intro = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
    <h3 className="text-xl font-bold text-purple-300">Methods</h3>
    <p className="text-sm text-gray-300">Reusable code blocks. "Mini-programs".</p>
    <div className="bg-gray-900 p-4 rounded border border-purple-500/30 font-mono text-sm text-left">
      <span className="text-blue-400">int</span> <span className="text-yellow-400">Add</span>(<span className="text-green-400">int a, int b</span>)<br/>
      &#123;<br/>
      &nbsp;&nbsp;<span className="text-purple-400">return</span> a + b;<br/>
      &#125;
    </div>
    <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 w-full max-w-md">
      <div className="bg-gray-800 p-2 rounded"><strong>Reusability:</strong> Write once, use everywhere.</div>
      <div className="bg-gray-800 p-2 rounded"><strong>Organization:</strong> Break complex tasks into chunks.</div>
    </div>
  </div>
);

const Slide_RefOut = () => {
  const [mode, setMode] = useState<"ref" | "out">("ref");
  return (
    <div className="flex flex-col h-full gap-6 items-center justify-center">
      <div className="flex gap-4">
        <button onClick={() => setMode("ref")} className={`px-4 py-2 rounded text-sm ${mode === 'ref' ? 'bg-blue-600' : 'bg-gray-800'}`}>ref (Two-Way)</button>
        <button onClick={() => setMode("out")} className={`px-4 py-2 rounded text-sm ${mode === 'out' ? 'bg-green-600' : 'bg-gray-800'}`}>out (One-Way)</button>
      </div>
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 w-full max-w-lg">
        {mode === "ref" ? (
          <div>
            <h4 className="text-blue-400 font-bold mb-2">ref Parameter</h4>
            <ul className="text-xs text-gray-300 list-disc pl-4 space-y-2">
              <li>Variable <strong>MUST</strong> be initialized before passing.</li>
              <li>Method receives reference to original variable.</li>
              <li>Method can read and/or modify it.</li>
            </ul>
            <CodeBlock code={`int x = 10;\nvoid Add(ref int i) { i += 5; }\nAdd(ref x); // x is now 15`} />
          </div>
        ) : (
          <div>
            <h4 className="text-green-400 font-bold mb-2">out Parameter</h4>
            <ul className="text-xs text-gray-300 list-disc pl-4 space-y-2">
              <li>Variable does <strong>NOT</strong> need initialization before passing.</li>
              <li>Method <strong>MUST</strong> assign a value before returning.</li>
              <li>Used for returning multiple values.</li>
            </ul>
            <CodeBlock code={`int res;\nvoid GetResult(out int i) { i = 100; }\nGetResult(out res); // res is 100`} />
          </div>
        )}
      </div>
    </div>
  );
};

const Slide_Enums = () => (
  <div className="flex flex-col h-full gap-4">
    <h3 className="text-xl font-bold text-yellow-400 text-center">Enums & Flags</h3>
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="bg-gray-800 p-4 rounded border border-gray-600 flex flex-col">
        <h4 className="font-bold text-sm mb-2">Simple Enum</h4>
        <p className="text-[10px] text-gray-400 mb-2">Named constants. Default underlying type is <code>int</code>.</p>
        <CodeBlock code={`enum Color {\n  Red = 0,\n  Green = 1,\n  Blue = 2\n}`} />
      </div>
      <div className="bg-gray-800 p-4 rounded border border-gray-600 flex flex-col">
        <h4 className="font-bold text-sm mb-2">Flags Enum</h4>
        <p className="text-[10px] text-gray-400 mb-2">Bitwise combinations. Use powers of 2.</p>
        <CodeBlock code={`[Flags]\nenum Status {\n  None = 0,\n  Stun = 1,\n  Poison = 2,\n  Dead = 4\n}\n// Stun | Poison`} />
      </div>
    </div>
  </div>
);

// =======================
// MODULE 4: DATA STRUCTURES
// =======================

const Slide_DataStructures_List = () => {
  const [active, setActive] = useState("array");
  const dsData = {
    array: { title: "Array (T[])", desc: "Fixed size. Contiguous memory. Fastest access by index.", code: "int[] nums = {1, 2, 3};" },
    list: { title: "List<T>", desc: "Dynamic array. Grows automatically. Fast index access.", code: "List<int> l = new(); l.Add(1);" },
    linked: { title: "LinkedList<T>", desc: "Doubly linked nodes. Fast insert/delete at ends/middle. Slow access.", code: "LinkedList<int> ll = new();" },
    stack: { title: "Stack<T>", desc: "LIFO (Last In First Out). Push/Pop.", code: "Stack<int> s = new(); s.Push(1);" },
    queue: { title: "Queue<T>", desc: "FIFO (First In First Out). Enqueue/Dequeue.", code: "Queue<int> q = new(); q.Enqueue(1);" },
    dict: { title: "Dictionary<K,V>", desc: "Key-Value pairs. Unique keys. Fast lookup O(1).", code: "var d = new Dictionary<string, int>();" },
    hash: { title: "HashSet<T>", desc: "Unique elements only. No order. Math set operations.", code: "HashSet<int> h = new(); h.Add(1);" },
    tuple: { title: "Tuple", desc: "Lightweight container for multiple values. ValueType (ValueTuple).", code: "(string, int) t = (\"Bob\", 20);" },
  };

  return (
    <div className="flex h-full gap-4">
      <div className="flex flex-col gap-1 w-1/3 overflow-y-auto">
        {Object.keys(dsData).map(k => (
          <button key={k} onClick={() => setActive(k)} className={`text-left px-3 py-2 rounded text-xs font-bold ${active === k ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
            {dsData[k as keyof typeof dsData].title}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-gray-900 p-4 rounded border border-gray-700 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-white mb-2">{dsData[active as keyof typeof dsData].title}</h3>
        <p className="text-sm text-gray-300 mb-4">{dsData[active as keyof typeof dsData].desc}</p>
        <CodeBlock code={dsData[active as keyof typeof dsData].code} />
      </div>
    </div>
  );
};

// =======================
// MODULE 5: OOP CORE (Anatomy)
// =======================

// Slide: Struct vs Class - The Twin Battle
const Slide_StructVsClass = () => {
  const [selected, setSelected] = useState<"struct" | "class" | null>(null);
  
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h3 className="text-2xl font-bold text-purple-400">Struct vs Class</h3>
        <p className="text-sm text-gray-400 mt-1">Twins with different superpowers!</p>
      </motion.div>
      
      <div className="flex gap-8 items-stretch">
        {/* Struct */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          onClick={() => setSelected(selected === "struct" ? null : "struct")}
          className={`cursor-pointer p-6 rounded-xl border-2 w-56 transition-all ${
            selected === "struct" 
              ? 'bg-blue-900/50 border-blue-400 shadow-lg shadow-blue-500/30' 
              : 'bg-gray-800 border-gray-600 hover:border-blue-400'
          }`}
        >
          <div className="text-center">
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-3"
            >
              📦
            </motion.div>
            <div className="text-xl font-bold text-blue-400 mb-2">STRUCT</div>
            <div className="text-xs text-gray-400">Value Type</div>
          </div>
          
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">📚</span>
              <span>Lives on Stack</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">📋</span>
              <span>Copies data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">🚫</span>
              <span>No inheritance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">⚡</span>
              <span>Fast & light</span>
            </div>
          </div>
        </motion.div>
        
        {/* VS */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ rotate: { duration: 2, repeat: Infinity } }}
          className="flex items-center"
        >
          <div className="text-4xl font-bold text-purple-500">VS</div>
        </motion.div>
        
        {/* Class */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          onClick={() => setSelected(selected === "class" ? null : "class")}
          className={`cursor-pointer p-6 rounded-xl border-2 w-56 transition-all ${
            selected === "class" 
              ? 'bg-green-900/50 border-green-400 shadow-lg shadow-green-500/30' 
              : 'bg-gray-800 border-gray-600 hover:border-green-400'
          }`}
        >
          <div className="text-center">
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-5xl mb-3"
            >
              🏭
            </motion.div>
            <div className="text-xl font-bold text-green-400 mb-2">CLASS</div>
            <div className="text-xs text-gray-400">Reference Type</div>
          </div>
          
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-green-400">🗄️</span>
              <span>Lives on Heap</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">➡️</span>
              <span>Copies reference</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">👨‍👧‍👦</span>
              <span>Inheritance OK</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">🦾</span>
              <span>Feature-rich</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Code Example */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900 p-4 rounded-lg max-w-md w-full"
          >
            {selected === "struct" ? (
              <div>
                <div className="text-xs text-blue-400 mb-2">// Struct = Copy everything</div>
                <code className="text-xs text-gray-300">
                  Point a = new Point(1, 2);<br/>
                  Point b = a; // b is a COPY<br/>
                  b.X = 99; // a.X still 1!
                </code>
              </div>
            ) : (
              <div>
                <div className="text-xs text-green-400 mb-2">// Class = Share the same</div>
                <code className="text-xs text-gray-300">
                  Monster a = new Monster();<br/>
                  Monster b = a; // b points to SAME<br/>
                  b.HP = 0; // a.HP is also 0!
                </code>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="text-xs text-gray-500 text-center">
        💡 Click each to see the difference!
    </div>
  </div>
);
};

// Slide: Access Modifiers - The Castle Guards Visual
const Slide_AccessModifiers_Detailed = () => {
  const [selectedGuard, setSelectedGuard] = useState<number | null>(null);
  const guards = [
    { name: "public", icon: "🌍", color: "green", desc: "Open gate! Everyone welcome!", visual: "Anyone from anywhere can enter" },
    { name: "private", icon: "🔐", color: "red", desc: "VIP only! Just me in my room!", visual: "Only the owner can access" },
    { name: "protected", icon: "👨‍👧‍👦", color: "yellow", desc: "Family members allowed!", visual: "Me + My children (derived classes)" },
    { name: "internal", icon: "🏰", color: "blue", desc: "Castle residents only!", visual: "Same assembly/project only" }
  ];
  
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="text-4xl mb-2">🏰</div>
        <h3 className="text-2xl font-bold text-purple-400">Access Modifiers</h3>
        <p className="text-sm text-gray-400 mt-1">Castle guards controlling who gets in!</p>
      </motion.div>
      
      <div className="relative w-full max-w-2xl">
        {/* Castle visualization */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 p-8 rounded-xl border-2 border-purple-500/30 relative"
        >
          <div className="grid grid-cols-4 gap-3">
            {guards.map((guard, i) => (
              <motion.button
                key={guard.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedGuard(selectedGuard === i ? null : i)}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                  selectedGuard === i 
                    ? `bg-${guard.color}-900/50 border-${guard.color}-400 shadow-lg` 
                    : 'bg-gray-700 border-gray-600 hover:border-purple-400'
                }`}
              >
                <motion.div 
                  animate={selectedGuard === i ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: selectedGuard === i ? Infinity : 0 }}
                  className="text-3xl mb-2"
                >
                  {guard.icon}
                </motion.div>
                <div className={`text-xs font-mono font-bold text-${guard.color}-400`}>{guard.name}</div>
              </motion.button>
            ))}
    </div>
          
          <AnimatePresence mode="wait">
            {selectedGuard !== null && (
              <motion.div
                key={selectedGuard}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className={`bg-${guards[selectedGuard].color}-900/30 p-4 rounded-lg border border-${guards[selectedGuard].color}-500/50`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{guards[selectedGuard].icon}</span>
                    <span className={`text-lg font-bold text-${guards[selectedGuard].color}-400`}>{guards[selectedGuard].name}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{guards[selectedGuard].desc}</p>
                  <div className="bg-gray-900 p-2 rounded text-xs text-gray-400">
                    {guards[selectedGuard].visual}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-gray-500 text-center"
      >
        💡 Click each guard to see who they let in!
      </motion.div>
  </div>
);
};

// Slide: Properties - The Bouncer Visual
const Slide_Properties = () => {
  const [hp, setHp] = useState(100);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  
  const trySetHp = (val: string) => {
    const num = parseInt(val);
    if (isNaN(num)) {
      setMessage("❌ Not a number!");
      return;
    }
    if (num < 0) {
      setHp(0);
      setMessage("🛡️ Bouncer says: Can't go below 0! Set to 0.");
    } else if (num > 100) {
      setHp(100);
      setMessage("🛡️ Bouncer says: Max is 100! Capped.");
    } else {
      setHp(num);
      setMessage("✅ Value accepted!");
    }
  };
  
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="text-4xl mb-2">🚪</div>
        <h3 className="text-2xl font-bold text-green-400">Properties = Bouncers</h3>
        <p className="text-sm text-gray-400 mt-1">They check values before letting them in!</p>
      </motion.div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 p-6 rounded-xl border-2 border-green-500/30 w-full max-w-md"
      >
        {/* HP Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold">Monster HP</span>
            <span className="text-sm font-mono text-green-400">{hp}/100</span>
      </div>
          <div className="h-6 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: `${hp}%` }}
              transition={{ type: "spring", stiffness: 100 }}
              className={`h-full ${hp > 50 ? 'bg-green-500' : hp > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
            />
      </div>
    </div>
        
        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Try setting HP..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trySetHp(inputValue)}
            className="bg-green-600 px-4 py-2 rounded font-bold text-sm"
          >
            SET
          </motion.button>
        </div>
        
        {/* Message */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-900 p-3 rounded text-sm text-center"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Bouncer */}
        <motion.div 
          animate={{ x: [0, 3, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -right-4 top-1/2 -translate-y-1/2 text-4xl"
        >
          🧍
        </motion.div>
      </motion.div>
      
      <div className="bg-gray-900 p-3 rounded-lg text-xs font-mono max-w-md">
        <div className="text-gray-500">// The property's "set" validates input:</div>
        <div className="text-green-400">set {'{'} _hp = value {'<'} 0 ? 0 : value; {'}'}</div>
      </div>
  </div>
);
};

const Slide_Constructors = () => (
  <div className="grid grid-cols-2 gap-4 h-full">
    <div className="bg-gray-800 p-4 rounded border border-gray-600">
      <h4 className="font-bold text-blue-400 mb-2">Instance Constructor</h4>
      <p className="text-xs text-gray-400 mb-2">Runs every time you `new` an object. Initializes instance fields.</p>
      <CodeBlock code={`class Car {\n  public Car() { ... }\n}`} />
    </div>
    <div className="bg-gray-800 p-4 rounded border border-gray-600">
      <h4 className="font-bold text-purple-400 mb-2">Static Constructor</h4>
      <p className="text-xs text-gray-400 mb-2">Runs ONCE per app domain. Initializes static fields. No parameters allowed.</p>
      <CodeBlock code={`class Car {\n  static Car() { ... }\n}`} />
    </div>
    <div className="col-span-2 bg-red-900/20 p-3 rounded border border-red-500/30 text-xs">
      <strong className="text-red-300">Destructor (Finalizer):</strong> <code>~Car()</code>. Called by GC. Do not use unless releasing unmanaged resources (rare). Use <code>IDisposable</code> instead.
    </div>
  </div>
);

const Slide_StaticClasses = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
    <h3 className="text-xl font-bold text-purple-400">Static Classes</h3>
    <ul className="list-disc text-sm text-gray-300 space-y-2 text-left bg-gray-800 p-6 rounded border border-purple-500/50">
      <li>Declared with <code>static</code> keyword.</li>
      <li>Cannot be instantiated (no <code>new</code>).</li>
      <li>Cannot be inherited (implicitly <code>sealed</code>).</li>
      <li>Can ONLY contain static members.</li>
      <li>Usage: Utility classes, Extensions, Global Config.</li>
    </ul>
    <CodeBlock code={`static class MathHelper {\n  public static int Add(int a, int b) => a+b;\n}`} />
  </div>
);

const Slide_Partial = () => (
  <div className="flex flex-col h-full items-center justify-center gap-6">
    <h3 className="text-xl font-bold text-orange-400">Partial Classes</h3>
    <p className="text-sm text-gray-300 max-w-lg text-center">Splits a class, struct, or interface definition over two or more source files.</p>
    <div className="flex gap-2 w-full max-w-2xl justify-center items-center">
       <div className="bg-gray-800 p-3 rounded border border-gray-600 flex-1">
         <div className="text-[10px] text-gray-500 mb-1">File1.cs</div>
         <CodeBlock code={`partial class Hero {\n  void Attack() { ... }\n}`} />
       </div>
       <div className="text-2xl text-purple-500">+</div>
       <div className="bg-gray-800 p-3 rounded border border-gray-600 flex-1">
         <div className="text-[10px] text-gray-500 mb-1">File2.cs</div>
         <CodeBlock code={`partial class Hero {\n  void Defend() { ... }\n}`} />
       </div>
    </div>
    <div className="text-3xl text-gray-400">↓</div>
    <div className="bg-purple-900/20 p-3 rounded border border-purple-500/50 w-full max-w-md text-center">
      <div className="text-xs text-purple-300 font-bold">Compiled Result</div>
      <div className="text-xs text-gray-300">One single <code>Hero</code> class with both Attack() and Defend().</div>
    </div>
  </div>
);

// =======================
// ORIGINAL VISUAL SLIDES (From HTML)
// =======================

// Slide 1: Blueprint (Class vs Object)
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

// Slide 3: Constructor Visual
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

// Slide 5b: Constructor Types Visual
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
        <div className="h-full flex flex-col justify-center">
          <CodeBlock code={
            type === "default"
              ? `public Monster() {\n // Nu primește nimic\n Hp = 100;\n Name = "Unknown";\n}`
              : `public Monster(string n, int h) {\n // Primește ingrediente\n Hp = h;\n Name = n;\n}`
          } />
          <p className="text-sm text-gray-400 italic">
            {type === "default" ? "\"Meniul Zilei\" - Primești ce decidem noi." : "\"A la Carte\" - Tu decizi cum arată monstrul."}
          </p>
        </div>
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
      {/* Finalizer / IDisposable reminder */}
      <div className="bg-red-900/20 p-3 rounded border border-red-500/30 text-xs space-y-1">
        <div className="flex items-center gap-2 text-red-300 font-bold">
          <span>⚠️</span> <span>Destructor (Finalizer) ~Monster()</span>
        </div>
        <p className="text-gray-300">Cheamat de GC. Nu are parametri. Evită-l; folosește <code>IDisposable</code> + <code>using</code> pentru resurse (stream, DB).</p>
        <CodeBlock code={`class Monster : IDisposable {\n  ~Monster() { /* Finalizer - rar folosit */ }\n  public void Dispose() {\n    // Eliberează resurse\n    GC.SuppressFinalize(this);\n  }\n}\n\nusing var m = new Monster(); // Dispose auto`} />
      </div>
    </div>
  );
};

// Slide 6: Inheritance Visual
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

// Slide 8: Creation Order Visual
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
          className="absolute text-8xl z-10"
        >
          💀
        </motion.div>
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

// Slide 10: Polymorphism Visual
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
                  className={`absolute -top-12 bg-white text-black px-4 py-2 rounded-2xl font-bold text-lg whitespace-nowrap z-20 shadow-lg ${m.color}`}
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

// Slide 12: New vs Override Visual
const Slide12_NewVsOverride = () => {
  const [state, setState] = useState("base");
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 grid grid-cols-2 gap-4 md:gap-8 items-center">
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

// Slide 14: List Visual
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

// Slide 16: Abstract Visual
const Slide16_Abstract = () => {
  const [errorShake, setErrorShake] = useState(0);
  const [equippedItem, setEquippedItem] = useState<string | null>(null);
  const handleAbstractClick = () => {
    setErrorShake(prev => prev + 1);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-12">
      <div className="flex gap-12 items-center">
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

// Slide 19: Overloading Visual
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
          <div className="text-5xl animate-bounce drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{result}</div>
        </div>
      </div>
      <p className="text-sm text-gray-400 italic bg-black/30 p-2 rounded">
        Static Polymorphism: Decizia se ia la <strong>Compile Time</strong> bazată pe ingrediente (parametri).
      </p>
    </div>
  );
};

// Slide 21: Inventory Visual
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
        <Terminal size={18} className="mr-2 fill-current" /> foreach (var item in backpack)
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

// =======================
// MODULE 6, 7, 8: INHERITANCE, POLYMORPHISM, ADVANCED
// =======================

const Slide_Inheritance = () => (
  <div className="flex flex-col h-full items-center justify-center gap-4">
    <h3 className="text-2xl font-bold text-blue-400">Inheritance Hierarchy</h3>
    <div className="flex flex-col items-center gap-4">
      <div className="bg-blue-900/30 p-4 rounded-xl border-2 border-blue-500 w-48 text-center">
        <div className="text-xs text-blue-300 uppercase font-bold tracking-widest mb-1">Base Class</div>
        <div className="font-mono text-lg">Monster</div>
        <div className="text-[10px] text-gray-400 mt-2">Health, Position, Die()</div>
      </div>
      <div className="h-8 w-0.5 bg-gray-600"></div>
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <div className="h-4 w-0.5 bg-gray-600"></div>
          <div className="bg-green-900/30 p-4 rounded-xl border-2 border-green-500 w-40 text-center mt-0">
             <div className="text-xs text-green-300 uppercase font-bold tracking-widest mb-1">Derived</div>
             <div className="font-mono text-base">Goblin</div>
             <div className="text-[10px] text-gray-400 mt-2">StealGold()</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-4 w-0.5 bg-gray-600"></div>
          <div className="bg-red-900/30 p-4 rounded-xl border-2 border-red-500 w-40 text-center mt-0">
             <div className="text-xs text-red-300 uppercase font-bold tracking-widest mb-1">Derived</div>
             <div className="font-mono text-base">Dragon</div>
             <div className="text-[10px] text-gray-400 mt-2">BreathFire()</div>
          </div>
        </div>
      </div>
    </div>
    <TipBox title="IS-A Relationship" variant="info">
      A Goblin <strong>IS A</strong> Monster. A Dragon <strong>IS A</strong> Monster. They share common logic.
    </TipBox>
  </div>
);

const Slide_Inheritance_Rules = () => (
  <div className="flex flex-col h-full gap-4">
    <h3 className="text-xl font-bold text-orange-400">Inheritance Rules</h3>
    <ul className="space-y-3 text-sm text-gray-300">
      <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Derived class inherits all non-private members.</li>
      <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500"/> Constructors are <strong>NOT</strong> inherited.</li>
      <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-yellow-500"/> Single Base Class only (C#).</li>
      <li className="flex items-center gap-2"><Terminal size={16} className="text-blue-500"/> Use <code>base</code> keyword to access parent members/constructors.</li>
    </ul>
    <CodeBlock code={`class Dog : Animal {\n  public Dog(string n) : base(n) { }\n}`} />
  </div>
);

const Slide_AbstractVsInterface = () => (
  <div className="flex flex-col h-full gap-4">
    <h3 className="text-xl font-bold text-center text-gray-200">Abstract Class vs Interface</h3>
    <div className="overflow-auto border border-gray-700 rounded-lg flex-1">
      <table className="w-full text-left text-xs text-gray-300">
        <thead className="bg-gray-800 uppercase font-bold">
          <tr><th className="p-2">Feature</th><th className="p-2">Abstract Class</th><th className="p-2">Interface</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          <tr><td className="p-2 text-gray-400 font-bold">Implementation</td><td>Can have logic + abstract methods</td><td>Only declarations (pre-C# 8)</td></tr>
          <tr><td className="p-2 text-gray-400 font-bold">State</td><td>Can have fields</td><td>No fields</td></tr>
          <tr><td className="p-2 text-gray-400 font-bold">Inheritance</td><td>Single Class</td><td>Multiple Interfaces</td></tr>
          <tr><td className="p-2 text-gray-400 font-bold">Access</td><td>All modifiers allowed</td><td>Public by default</td></tr>
          <tr><td className="p-2 text-gray-400 font-bold">Constructor</td><td>Yes</td><td>No</td></tr>
          <tr><td className="p-2 text-gray-400 font-bold">Concept</td><td>"Is a" (Base)</td><td>"Can do" (Contract)</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Slide_Sealed = () => (
  <div className="flex flex-col items-center justify-center h-full gap-6">
    <div className="text-center">
      <div className="text-6xl mb-4">🚫</div>
      <h3 className="text-2xl font-bold text-red-400">Sealed Keyword</h3>
    </div>
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-gray-800 p-4 rounded border border-red-500/30">
        <h4 className="font-bold text-sm mb-2">Sealed Class</h4>
        <p className="text-xs text-gray-400">Cannot be inherited from.</p>
        <CodeBlock code={`sealed class FinalBoss { }`} />
      </div>
      <div className="bg-gray-800 p-4 rounded border border-red-500/30">
        <h4 className="font-bold text-sm mb-2">Sealed Method</h4>
        <p className="text-xs text-gray-400">Stops further overriding in inheritance chain.</p>
        <CodeBlock code={`sealed override void Attack() { }`} />
      </div>
    </div>
  </div>
);

// =======================
// MODULE 9: EXCEPTIONS & DEBUGGING
// =======================

const Slide_Exceptions_Details = () => (
  <div className="space-y-3 h-full overflow-auto">
    <h3 className="text-xl font-bold text-red-400 text-center">System.Exception - Proprietăți</h3>
    <div className="grid grid-cols-3 gap-2 text-xs text-center">
      <div className="bg-blue-900/30 p-3 rounded border border-blue-500/30">
        <strong className="text-blue-400">StackTrace</strong>
        <p className="text-gray-300 mt-1">Unde s-a întâmplat - linia exactă și call stack</p>
    </div>
      <div className="bg-green-900/30 p-3 rounded border border-green-500/30">
        <strong className="text-green-400">Message</strong>
        <p className="text-gray-300 mt-1">Ce s-a întâmplat - descrierea erorii</p>
    </div>
      <div className="bg-purple-900/30 p-3 rounded border border-purple-500/30">
        <strong className="text-purple-400">InnerException</strong>
        <p className="text-gray-300 mt-1">Cauza originală - excepția "din spate"</p>
      </div>
    </div>
    
    <div className="bg-gray-900 p-3 rounded border border-red-800">
      <h4 className="text-xs font-bold text-red-400 mb-2">🔴 finally - RULEAZĂ MEREU!</h4>
      <CodeBlock code={`try {
    File.Open("data.txt");  // Risky
}
catch (FileNotFoundException ex) {
    Console.WriteLine(ex.Message);
}
finally {
    // ✅ ALWAYS RUNS! Even if exception!
    // Perfect for: Close files, DB connections
    file.Close();
}`} />
    </div>
    
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="bg-yellow-900/20 p-2 rounded border border-yellow-500/30">
        <strong className="text-yellow-400">ApplicationException</strong>
        <p className="text-gray-300">User-defined exceptions (tu le creezi)</p>
        <code className="text-[10px] text-gray-500">class MyError : ApplicationException</code>
      </div>
      <div className="bg-red-900/20 p-2 rounded border border-red-500/30">
        <strong className="text-red-400">SystemException</strong>
        <p className="text-gray-300">CLR exceptions (NullReference, IndexOutOfRange)</p>
        <code className="text-[10px] text-gray-500">throw by runtime</code>
      </div>
    </div>
    
    <div className="text-[10px] text-center text-gray-500 bg-gray-800 p-2 rounded">
      💡 Best practice: Creează excepții custom care moștenesc de la <code>Exception</code> sau <code>ApplicationException</code>
    </div>
  </div>
);

// Slide: Finally Block - ALWAYS RUNS!
const Slide_Finally_Always = () => {
  const [scenario, setScenario] = useState<"success" | "error" | "return">("success");
  return (
    <div className="space-y-4 h-full flex flex-col justify-center">
      <h3 className="text-xl font-bold text-green-400 text-center">finally - RULEAZĂ MEREU! 🔒</h3>
      <p className="text-sm text-gray-300 text-center">Indiferent ce se întâmplă, finally se execută!</p>
      
      <div className="flex justify-center gap-2 mb-4">
        <button onClick={() => setScenario("success")} className={`px-3 py-1 rounded text-xs ${scenario === "success" ? 'bg-green-600' : 'bg-gray-700'}`}>✅ Success</button>
        <button onClick={() => setScenario("error")} className={`px-3 py-1 rounded text-xs ${scenario === "error" ? 'bg-red-600' : 'bg-gray-700'}`}>❌ Exception</button>
        <button onClick={() => setScenario("return")} className={`px-3 py-1 rounded text-xs ${scenario === "return" ? 'bg-yellow-600' : 'bg-gray-700'}`}>↩️ Early Return</button>
      </div>
      
      <div className="bg-gray-900 p-4 rounded-lg max-w-lg mx-auto">
        <CodeBlock code={scenario === "success" 
          ? `try {
    OpenFile();     // ✅ Works
    ReadData();     // ✅ Works
}
catch { }
finally {
    CloseFile();    // ✅ RUNS!
}`
          : scenario === "error"
          ? `try {
    OpenFile();     // ✅ Works
    ReadData();     // ❌ THROWS!
}
catch {
    Log("Error");   // ✅ Catches
}
finally {
    CloseFile();    // ✅ STILL RUNS!
}`
          : `try {
    OpenFile();
    if (empty) return null;  // ↩️ Early exit
    ReadData();
}
finally {
    CloseFile();    // ✅ RUNS ANYWAY!
}`} />
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs max-w-lg mx-auto">
        <div className="bg-green-900/20 p-2 rounded text-center">
          <div className="text-lg">✅</div>
          <span className="text-green-400">Success</span>
          <p className="text-gray-400">finally runs</p>
        </div>
        <div className="bg-red-900/20 p-2 rounded text-center">
          <div className="text-lg">❌</div>
          <span className="text-red-400">Exception</span>
          <p className="text-gray-400">finally runs</p>
        </div>
        <div className="bg-yellow-900/20 p-2 rounded text-center">
          <div className="text-lg">↩️</div>
          <span className="text-yellow-400">Return</span>
          <p className="text-gray-400">finally runs</p>
        </div>
      </div>
      
      <div className="text-xs text-center text-purple-400 bg-purple-900/20 p-2 rounded max-w-md mx-auto">
        💡 Use case: Close files, DB connections, release resources!
      </div>
    </div>
  );
};

const Slide_Exceptions_Filters = () => (
  <div className="flex flex-col h-full justify-center gap-4">
    <h3 className="text-xl font-bold text-yellow-400 text-center">Exception Filters (when)</h3>
    <p className="text-sm text-gray-300 text-center">Prinde excepții doar dacă o condiție e îndeplinită!</p>
    <div className="bg-gray-900 p-4 rounded-xl border border-yellow-600/50 max-w-xl mx-auto w-full">
      <CodeBlock code={`try {
    CallAPI();
}
catch (HttpException ex) when (ex.Status == 404) {
    // Runs ONLY if status is 404
    Console.WriteLine("Not found");
}
catch (HttpException ex) when (ex.Status == 500) {
    // Runs ONLY if status is 500
    Console.WriteLine("Server error");
}
catch (Exception ex) {
    // Fallback for everything else
    Console.WriteLine("Unknown error");
}`} />
    </div>
    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto text-xs">
      <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
        <strong className="text-green-400">✅ Cu when:</strong>
        <p className="text-gray-300">Păstrează stack trace original</p>
        <p className="text-gray-300">Skip-uiește catch dacă nu match</p>
      </div>
      <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
        <strong className="text-red-400">❌ Fără when:</strong>
        <p className="text-gray-300">Trebuie să faci re-throw</p>
        <p className="text-gray-300">Pierzi stack trace original</p>
      </div>
    </div>
  </div>
);

// Slide: var keyword - Implicit Typing
const Slide_VarKeyword = () => (
  <div className="space-y-4 h-full">
    <h3 className="text-xl font-bold text-blue-400 text-center">var - Implicit Typed Variables</h3>
    <p className="text-sm text-gray-300 text-center">Compilatorul deduce tipul automat!</p>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
        <h4 className="font-bold text-green-400 mb-2">✅ Corect</h4>
        <CodeBlock code={`var name = "Zombie";  // string
var hp = 100;         // int
var list = new List<Monster>();`} />
      </div>
      <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
        <h4 className="font-bold text-red-400 mb-2">❌ Greșit</h4>
        <CodeBlock code={`var x;      // Error! Must initialize
var y = null; // Error! Can't infer`} />
      </div>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg">
      <h4 className="font-bold text-purple-400 mb-2">📋 Reguli var:</h4>
      <ul className="text-sm space-y-1 text-gray-300">
        <li>• Doar pentru variabile <strong>locale</strong> (în metodă)</li>
        <li>• TREBUIE inițializată la declarare</li>
        <li>• Tipul se fixează la compile-time (strongly typed)</li>
        <li>• NU poate fi null fără tip explicit</li>
      </ul>
    </div>
    <div className="text-xs text-yellow-400 text-center bg-yellow-900/20 p-2 rounded">
      ⚠️ var ≠ dynamic! var e type-safe, tipul e fix după inițializare!
    </div>
  </div>
);

// Slide: Object Type - Base of All
const Slide_ObjectType = () => (
  <div className="space-y-4 h-full">
    <h3 className="text-xl font-bold text-purple-400 text-center">object - Tipul Suprem</h3>
    <p className="text-sm text-gray-300 text-center">Toate tipurile moștenesc de la <code>System.Object</code></p>
    <div className="flex justify-center gap-4 my-4">
      <div className="text-center">
        <div className="text-5xl mb-2">👑</div>
        <div className="font-bold text-purple-400">object</div>
        <div className="text-xs text-gray-500">Base class</div>
      </div>
    </div>
    <div className="bg-gray-900 p-4 rounded-lg">
      <CodeBlock code={`object anything;
anything = 42;        // int → object (boxing)
anything = "Hello";   // string → object
anything = new Monster();  // Monster → object

// ⚠️ Evită dacă poți - pierde type safety!`} />
    </div>
    <div className="grid grid-cols-2 gap-4 text-xs">
      <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
        <strong className="text-blue-400">Boxing:</strong>
        <p className="text-gray-300">Value type → object (încetinește)</p>
      </div>
      <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
        <strong className="text-green-400">Unboxing:</strong>
        <p className="text-gray-300">object → Value type (cast explicit)</p>
      </div>
    </div>
    <div className="text-xs text-gray-400 text-center">
      Metode moștenite: <code>ToString()</code>, <code>Equals()</code>, <code>GetHashCode()</code>, <code>GetType()</code>
    </div>
  </div>
);

// Slide: All 7 Access Modifiers
const Slide_AllAccessModifiers = () => {
  const modifiers = [
    { name: "public", emoji: "🌍", scope: "Oriunde", color: "green" },
    { name: "private", emoji: "🔐", scope: "Doar în clasă", color: "red" },
    { name: "protected", emoji: "👨‍👧‍👦", scope: "Clasă + Derivate", color: "yellow" },
    { name: "internal", emoji: "🏰", scope: "Same Assembly", color: "blue" },
    { name: "protected internal", emoji: "🏰👨‍👧‍👦", scope: "Same Assembly OR Derived", color: "purple" },
    { name: "private protected", emoji: "🔐👨‍👧‍👦", scope: "Same Assembly AND Derived", color: "pink" },
    { name: "file", emoji: "📄", scope: "Same File (C# 11)", color: "cyan" },
  ];
  return (
    <div className="space-y-4 h-full overflow-auto">
      <h3 className="text-xl font-bold text-purple-400 text-center">Toate 7 Access Modifiers</h3>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {modifiers.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-3 rounded border bg-${m.color}-900/20 border-${m.color}-500/30`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{m.emoji}</span>
              <strong className={`text-${m.color}-400`}>{m.name}</strong>
            </div>
            <p className="text-gray-300">{m.scope}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-gray-800 p-3 rounded text-xs">
        <strong className="text-yellow-400">Default:</strong>
        <span className="text-gray-300 ml-2">class = internal, class members = private</span>
      </div>
    </div>
  );
};

// Slide: Static vs Non-Static Comparison Table
const Slide_StaticVsNonStatic = () => (
  <div className="space-y-4 h-full">
    <h3 className="text-xl font-bold text-purple-400 text-center">Static vs Non-Static</h3>
    <div className="overflow-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 p-2 text-left">Feature</th>
            <th className="border border-gray-700 p-2 text-purple-400">Static Class</th>
            <th className="border border-gray-700 p-2 text-green-400">Non-Static Class</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          <tr>
            <td className="border border-gray-700 p-2">Keyword</td>
            <td className="border border-gray-700 p-2"><code>static class</code></td>
            <td className="border border-gray-700 p-2"><code>class</code></td>
          </tr>
          <tr className="bg-gray-900/50">
            <td className="border border-gray-700 p-2">Instanțiere (new)</td>
            <td className="border border-gray-700 p-2 text-red-400">❌ NU</td>
            <td className="border border-gray-700 p-2 text-green-400">✅ DA</td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">Membri</td>
            <td className="border border-gray-700 p-2">Doar static</td>
            <td className="border border-gray-700 p-2">Static + Instance</td>
          </tr>
          <tr className="bg-gray-900/50">
            <td className="border border-gray-700 p-2">Instance Constructor</td>
            <td className="border border-gray-700 p-2 text-red-400">❌ NU</td>
            <td className="border border-gray-700 p-2 text-green-400">✅ DA</td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">Moștenire</td>
            <td className="border border-gray-700 p-2 text-red-400">❌ Sealed implicit</td>
            <td className="border border-gray-700 p-2 text-green-400">✅ DA</td>
          </tr>
          <tr className="bg-gray-900/50">
            <td className="border border-gray-700 p-2">Acces membri</td>
            <td className="border border-gray-700 p-2"><code>ClassName.Member</code></td>
            <td className="border border-gray-700 p-2"><code>instance.Member</code></td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">Use Case</td>
            <td className="border border-gray-700 p-2">Helpers, Utils</td>
            <td className="border border-gray-700 p-2">Entities, Objects</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="text-xs text-center text-gray-400">
      💡 Static = shared by all, Non-Static = unique per instance
    </div>
  </div>
);

// Slide: Data Structures - When to Use What (with Big O)
const Slide_DataStructures_When = () => (
  <div className="space-y-3 h-full overflow-auto">
    <h3 className="text-xl font-bold text-purple-400 text-center">Când să folosești fiecare? (+ Big O)</h3>
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="bg-blue-900/30 p-2 rounded border border-blue-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">📦</span>
          <strong className="text-blue-400">Array</strong>
          <span className="ml-auto text-green-400 text-[10px]">O(1) access</span>
        </div>
        <p className="text-gray-300">Mărime FIXĂ. Cel mai rapid acces [i]!</p>
        <div className="text-[10px] text-gray-500 mt-1">❌ Insert/Delete = O(n)</div>
      </div>
      <div className="bg-green-900/30 p-2 rounded border border-green-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">📝</span>
          <strong className="text-green-400">List&lt;T&gt;</strong>
          <span className="ml-auto text-green-400 text-[10px]">O(1) add end</span>
        </div>
        <p className="text-gray-300">Mărime DINAMICĂ. Add/Remove ușor!</p>
        <div className="text-[10px] text-gray-500 mt-1">❌ Insert middle = O(n)</div>
      </div>
      <div className="bg-yellow-900/30 p-2 rounded border border-yellow-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🔗</span>
          <strong className="text-yellow-400">LinkedList</strong>
          <span className="ml-auto text-green-400 text-[10px]">O(1) insert</span>
        </div>
        <p className="text-gray-300">Insert/Remove rapid ORIUNDE!</p>
        <div className="text-[10px] text-gray-500 mt-1">❌ Access [i] = O(n)</div>
      </div>
      <div className="bg-red-900/30 p-2 rounded border border-red-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">📚</span>
          <strong className="text-red-400">Stack</strong>
          <span className="ml-auto text-green-400 text-[10px]">LIFO</span>
        </div>
        <p className="text-gray-300">Last In First Out. Undo/Redo!</p>
        <div className="text-[10px] text-gray-500 mt-1">Push/Pop = O(1)</div>
      </div>
      <div className="bg-pink-900/30 p-2 rounded border border-pink-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🎫</span>
          <strong className="text-pink-400">Queue</strong>
          <span className="ml-auto text-green-400 text-[10px]">FIFO</span>
        </div>
        <p className="text-gray-300">First In First Out. Job queue!</p>
        <div className="text-[10px] text-gray-500 mt-1">Enqueue/Dequeue = O(1)</div>
      </div>
      <div className="bg-purple-900/30 p-2 rounded border border-purple-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🔑</span>
          <strong className="text-purple-400">Dictionary</strong>
          <span className="ml-auto text-green-400 text-[10px]">O(1) lookup</span>
        </div>
        <p className="text-gray-300">Key → Value. Cheia UNICĂ! HashMap!</p>
        <div className="text-[10px] text-gray-500 mt-1">dict["key"] = value;</div>
      </div>
      <div className="bg-cyan-900/30 p-2 rounded border border-cyan-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🎯</span>
          <strong className="text-cyan-400">HashSet</strong>
          <span className="ml-auto text-green-400 text-[10px]">O(1) contains</span>
        </div>
        <p className="text-gray-300">Valori UNICE. Fără duplicate!</p>
        <div className="text-[10px] text-gray-500 mt-1">Add/Remove/Contains = O(1)</div>
      </div>
      <div className="bg-orange-900/30 p-2 rounded border border-orange-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">📦</span>
          <strong className="text-orange-400">Tuple</strong>
          <span className="ml-auto text-blue-400 text-[10px]">multiple vals</span>
        </div>
        <p className="text-gray-300">Return mai multe valori!</p>
        <div className="text-[10px] text-gray-500 mt-1">var (a, b) = GetPair();</div>
      </div>
    </div>
    <div className="text-[10px] text-center text-gray-500 bg-gray-800 p-1 rounded">
      💡 Dictionary = C# HashMap | HashSet = Unique values only
    </div>
  </div>
);

// Slide: Static Constructor
const Slide_StaticConstructor = () => (
  <div className="space-y-4 h-full">
    <h3 className="text-xl font-bold text-purple-400 text-center">Static Constructor</h3>
    <p className="text-sm text-gray-300 text-center">Rulează <strong>EXACT O DATĂ</strong>, înainte de prima utilizare a clasei!</p>
    <div className="bg-gray-900 p-4 rounded-lg border border-purple-500/30">
      <CodeBlock code={`class Monster {
  static int TotalMonsters;  // Shared
  
  // Static Constructor - no access modifier!
  static Monster() {
    TotalMonsters = 0;
    Console.WriteLine("Class initialized!");
  }
  
  // Instance Constructor
  public Monster() {
    TotalMonsters++;
  }
}`} />
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
        <h4 className="font-bold text-green-400 mb-2">✅ Static Constructor</h4>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Fără access modifier</li>
          <li>• Fără parametri</li>
          <li>• Rulează automat O DATĂ</li>
          <li>• Inițializează date statice</li>
        </ul>
      </div>
      <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
        <h4 className="font-bold text-blue-400 mb-2">📦 Instance Constructor</h4>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Are access modifier</li>
          <li>• Poate avea parametri</li>
          <li>• Rulează la fiecare "new"</li>
          <li>• Inițializează instanța</li>
        </ul>
      </div>
    </div>
    <div className="text-xs text-yellow-400 text-center bg-yellow-900/20 p-2 rounded">
      ⚠️ Static constructor rulează ÎNAINTE chiar și de metode statice!
    </div>
  </div>
);

// Slide: Interface Rules
const Slide_InterfaceRules = () => (
  <div className="space-y-4 h-full">
    <h3 className="text-xl font-bold text-blue-400 text-center">Interface Key Points</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
        <h4 className="font-bold text-red-400 mb-3">❌ NU poate avea:</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <XCircle size={14} className="text-red-500"/>
            <span>Fields (câmpuri/variabile)</span>
          </li>
          <li className="flex items-center gap-2">
            <XCircle size={14} className="text-red-500"/>
            <span>Constructor</span>
          </li>
          <li className="flex items-center gap-2">
            <XCircle size={14} className="text-red-500"/>
            <span>Implementare de metode*</span>
          </li>
          <li className="flex items-center gap-2">
            <XCircle size={14} className="text-red-500"/>
            <span>Access modifiers private</span>
          </li>
        </ul>
        <p className="text-[10px] text-gray-500 mt-2">*C# 8.0+ permite default implementations</p>
      </div>
      <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
        <h4 className="font-bold text-green-400 mb-3">✅ POATE avea:</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-500"/>
            <span>Semnături de metode</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-500"/>
            <span>Properties (doar semnătură)</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-500"/>
            <span>Events</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-500"/>
            <span>Indexers</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="bg-purple-900/20 p-4 rounded border border-purple-500/30">
      <h4 className="font-bold text-purple-400 mb-2">🎯 Când să folosești Interface?</h4>
      <p className="text-sm text-gray-300">
        "A <strong>is capable of doing</strong> B" → Interface<br/>
        "A <strong>is a</strong> B" → Abstract Class
      </p>
      <div className="mt-2 text-xs text-gray-400">
        Ex: <code>Dog : Animal</code> (is-a) vs <code>Dog : IBarking</code> (can do)
      </div>
    </div>
    <div className="text-center text-sm text-green-400 bg-green-900/10 p-2 rounded">
      🚀 Multiple Inheritance: O clasă poate implementa ORICÂTE interfețe!
    </div>
  </div>
);

const Slide_Debugging_Info = () => (
  <div className="flex flex-col h-full gap-4">
    <h3 className="text-xl font-bold text-blue-400">Debugging Tools</h3>
    <ul className="space-y-3 text-sm text-gray-300 flex-1">
      <li className="flex items-start gap-2">
        <div className="bg-red-600 w-3 h-3 rounded-full mt-1 shrink-0"></div>
        <div><strong>Breakpoint (F9):</strong> Pauses execution at a specific line.</div>
      </li>
      <li className="flex items-start gap-2">
        <Eye size={16} className="text-blue-400 mt-0.5 shrink-0"/>
        <div><strong>Watch / Inspect:</strong> Hover over variables to see values while paused.</div>
      </li>
      <li className="flex items-start gap-2">
        <ArrowRight size={16} className="text-yellow-400 mt-0.5 shrink-0"/>
        <div><strong>Step Over (F10):</strong> Execute line and move to next.</div>
      </li>
      <li className="flex items-start gap-2">
        <CornerDownRight size={16} className="text-green-400 mt-0.5 shrink-0"/>
        <div><strong>Step Into (F11):</strong> Enter inside method calls.</div>
      </li>
    </ul>
    <div className="bg-gray-800 p-3 rounded text-xs text-gray-400 border border-gray-600">
      Debug vs Release: Debug builds include symbols (.pdb) and no optimization. Release optimizes for speed.
    </div>
  </div>
);

// =======================
// ADDITIONAL THEORY SLIDES (From Original Content)
// =======================

// Slide 2: Stack vs Heap - The Memory Visual
const Slide2_Theory = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { action: "Declare variable", stack: ["Monster m"], heap: [], arrow: false },
    { action: "Create object with 'new'", stack: ["Monster m →"], heap: ["🧟 Monster Object"], arrow: true },
    { action: "Second reference", stack: ["Monster m →", "Monster m2 →"], heap: ["🧟 Monster Object"], arrow: true }
  ];
  
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h3 className="text-2xl font-bold text-purple-400">Stack vs Heap</h3>
        <p className="text-sm text-gray-400 mt-1">Where do objects actually live?</p>
      </motion.div>
      
      <div className="flex gap-8 items-start w-full max-w-3xl justify-center">
        {/* Stack */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex-1 max-w-xs"
        >
          <div className="text-center mb-2">
            <span className="text-blue-400 font-bold">📚 STACK</span>
            <div className="text-[10px] text-gray-500">Fast, small, references</div>
          </div>
          <div className="bg-blue-900/30 border-2 border-blue-500/50 rounded-lg p-4 min-h-[150px] flex flex-col-reverse gap-2">
            <AnimatePresence>
              {steps[step].stack.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-blue-600/50 p-2 rounded text-xs font-mono text-center"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Arrow */}
        <div className="flex flex-col items-center justify-center pt-10">
          <AnimatePresence>
            {steps[step].arrow && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-2xl"
                >
                  →
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Heap */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex-1 max-w-xs"
        >
          <div className="text-center mb-2">
            <span className="text-green-400 font-bold">🗄️ HEAP</span>
            <div className="text-[10px] text-gray-500">Large, objects live here</div>
          </div>
          <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-4 min-h-[150px] flex items-center justify-center">
            <AnimatePresence>
              {steps[step].heap.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
                  transition={{ rotate: { duration: 2, repeat: Infinity } }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="bg-green-600/50 p-4 rounded-lg text-center"
                >
                  <div className="text-3xl mb-1">{item.includes("🧟") ? "🧟" : ""}</div>
                  <div className="text-xs font-mono">Monster Object</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className={`px-4 py-2 rounded-lg font-bold ${step === 0 ? 'bg-gray-700 text-gray-500' : 'bg-purple-600 hover:bg-purple-500'}`}
        >
          ← Back
        </motion.button>
        <div className="text-sm text-gray-400">{steps[step].action}</div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className={`px-4 py-2 rounded-lg font-bold ${step === steps.length - 1 ? 'bg-gray-700 text-gray-500' : 'bg-purple-600 hover:bg-purple-500'}`}
        >
          Next →
        </motion.button>
      </div>
      
      <div className="bg-gray-900 p-3 rounded-lg text-xs font-mono max-w-md text-center">
        <span className="text-gray-500">// </span>
        <span className="text-blue-400">Stack</span>
        <span className="text-gray-500"> holds the remote (reference), </span>
        <span className="text-green-400">Heap</span>
        <span className="text-gray-500"> holds the TV (object)</span>
      </div>
    </div>
  );
};

// Slide 4 Theory: Constructor Deep Dive
const Slide4_Theory = () => (
  <div className="space-y-4">
    <p>Un <strong>Constructor</strong> este o metodă specială care se execută <strong>AUTOMAT</strong> când folosești cuvântul <code>new</code>.</p>
    <p>Scopul lui? Să inițializeze datele (HP, Name) ca să nu ai un monstru "gol" (null) care crapă jocul.</p>
    <CodeBlock code={`class Monster {\n public int Hp;\n // Constructorul (același nume cu clasa)\n public Monster() {\n Hp = 100; // Rezervor plin!\n }\n}`} />
    <TipBox title="Atenție la Detalii" variant="pro" delay={0.3}>
      Constructorul nu are <code>return type</code> (nici măcar <code>void</code>). Dacă scrii <code>void Monster()</code>, aia e doar o metodă ciudată, nu constructorul!
    </TipBox>
  </div>
);

// Slide 7 Theory: Inheritance Deep Dive
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
          <p className="font-bold text-lg">⚠️ Constructors are NOT inherited!</p>
          <p className="text-sm text-gray-300">Doar pentru că tata are constructor, nu înseamnă că îl ai și tu automat.</p>
          <div className="bg-gray-900 p-2 rounded text-xs mt-2">
            <p className="text-yellow-400 mb-1">👉 De aia ai nevoie de <code className="bg-purple-900/50 px-1 rounded">: base()</code>!</p>
            <p className="text-gray-400">Copilul TREBUIE să apeleze constructorul părintelui manual cu <code>base(params)</code></p>
          </div>
          <CodeBlock code={`class Zombie : Monster {
  public Zombie(int hp) : base(hp) { }
  //                      ^^^^^^^^
  //  Apelează Monster(hp) manual!
}`} />
        </motion.div>
      </div>
    </div>
  );
};

// Slide 9 Theory: Constructor Chaining
const Slide9_ChainingTheory = () => {
  const [stage, setStage] = useState(0);
  return (
    <div className="space-y-4 h-full flex flex-col justify-center overflow-auto">
      <div className="text-center">
        <h3 className="font-bold text-xl text-purple-300">Constructor Chaining: base()</h3>
        <p className="text-gray-400 text-sm">Cum transmitem datele la părinte?</p>
      </div>
      
      {/* The base keyword code example */}
      <div className="bg-gray-900 p-3 rounded-lg border border-purple-500/30 max-w-lg mx-auto">
        <CodeBlock code={`class Monster {
  public int HP;
  public Monster(int hp) {  // Base ctor
    HP = hp;
  }
}

class Zombie : Monster {
  public int Decay;
  
  // 👇 : base(hp) calls parent's ctor FIRST!
  public Zombie(int hp, int decay) : base(hp) {
    Decay = decay;  // Then this runs
  }
}`} />
      </div>

      {/* Visual animation */}
      <div className="flex justify-center">
        <div className="relative w-48 h-28 bg-gray-900 border-b-4 border-gray-700 flex flex-col-reverse items-center">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={stage >= 2 ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
            className="w-full h-10 bg-green-900/80 border-2 border-green-500 flex items-center justify-center text-xs text-green-200 z-10 rounded-t-lg absolute top-0"
          >
            2. Zombie() - Decay
          </motion.div>
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={stage >= 1 ? { height: "4rem", opacity: 1 } : { height: 0, opacity: 0 }}
            className="w-full bg-blue-900/50 border-x-2 border-blue-500 flex items-center justify-center text-xs text-blue-200 absolute bottom-0"
          >
            1. Monster(hp) - HP
          </motion.div>
        </div>
      </div>
      
      <div className="flex justify-center gap-2">
        <button onClick={() => setStage(1)} className={`px-3 py-1 rounded text-xs ${stage >= 1 ? 'bg-blue-600' : 'bg-gray-700'}`}>Step 1: base(hp)</button>
        <button onClick={() => setStage(2)} className={`px-3 py-1 rounded text-xs ${stage >= 2 ? 'bg-green-600' : 'bg-gray-700'}`}>Step 2: Derived</button>
        <button onClick={() => setStage(0)} className="px-3 py-1 rounded text-xs bg-red-900/50">Reset</button>
      </div>
      
      <div className="text-center text-xs text-yellow-400 bg-yellow-900/20 p-2 rounded max-w-md mx-auto">
        ⚠️ Fundația (base) se construiește ÎNTÂI, apoi acoperișul (derived)!</div>
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

// Slide 11 Theory: Polymorphism Deep Dive
const Slide11_PolymorphismTheory = () => (
  <div className="space-y-4 h-full flex flex-col">
    <p className="text-center mb-2">Marea bătălie a Polimorfismului: <strong>Când</strong> se ia decizia?</p>
    <div className="grid grid-cols-2 gap-4 flex-1">
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
      <motion.div
        initial={{x:20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.2}}
        className="bg-gray-800 p-3 md:p-4 rounded-xl border border-purple-500/20 flex flex-col hover:bg-gray-800/80 transition-colors"
      >
        <div className="flex items-center gap-2 text-purple-400 font-bold mb-2 text-sm md:text-base">
          <Terminal size={18}/> Run-Time
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

// Slide 13 Theory: New Hiding
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

// Slide 15 Theory: Upcasting
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

// Slide 17 Theory: Abstract Rules
const Slide17_AbstractRules = () => {
  const [checked, setChecked] = useState([false, false, false, false]);
  const toggleCheck = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };
  const points = [
    { title: "Cannot be Instantiated", desc: "Nu poți face new Abstract()." },
    { title: "Abstract Members", desc: "Metode fără corp (doar semnătura)." },
    { title: "Non-Abstract Members", desc: "Poate avea și metode normale cu logică." },
    { title: "Enforced Implementation", desc: "Copiii sunt OBLIGAȚI să dea override." }
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
        <CodeBlock code={`abstract class Item {\n public int attack;\n public int health;\n public abstract void specialPower(); // Rule\n}`} />
      </div>
    </div>
  );
};

// Slide 18: Abstract vs Interface Detailed
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

// Slide 20 Theory: Overloading Deep Dive
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

// Slide 22 Theory: Inventory Deep Dive
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

// Slide 23: Architecture
const Slide23_Architecture = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-full max-w-2xl h-96 bg-gray-900/50 rounded-xl border border-gray-700 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-800 border-2 border-gray-600 p-3 rounded-lg flex flex-col items-center z-10 w-48"
        >
          <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Base Class</div>
          <div className="text-lg font-mono font-bold">Item</div>
          <div className="text-[10px] text-gray-500 italic">specialPower()</div>
        </motion.div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }}
            d="M336 80 L200 160" stroke="#6b7280" strokeWidth="2" fill="none" 
          />
          <motion.path 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }}
            d="M336 80 L470 160" stroke="#6b7280" strokeWidth="2" fill="none" 
          />
        </svg>
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
        <motion.div 
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-24 bg-purple-900/20 border-2 border-dashed border-purple-500 rounded-xl flex items-center justify-center gap-4"
        >
          <span className="text-xs text-purple-300 absolute -top-3 bg-gray-900 px-2">List&lt;Item&gt; backpack</span>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-2xl">🗡️</motion.div>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="text-2xl">🧪</motion.div>
        </motion.div>
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

// Additional missing imports
const Dna = ({ size, className }: { size: number; className?: string }) => <Activity size={size} className={className} />;

// Slide: Interfaces - The Job Contract (Visual)
const Slide_InterfaceContract = () => {
  const [signed, setSigned] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const classes = [
    { name: "Sword", icon: "🗡️", implements: "IAttackable", color: "red" },
    { name: "Shield", icon: "🛡️", implements: "IDefendable", color: "blue" },
    { name: "Potion", icon: "🧪", implements: "IUsable", color: "green" }
  ];
  
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl font-bold text-blue-400 mb-2 text-center">The Job Contract 📋</h3>
        <p className="text-sm text-gray-400 text-center">Interface = "You MUST do these things if you want this job!"</p>
      </motion.div>
      
      <div className="relative w-full max-w-2xl">
        {/* The Contract */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          className="bg-gray-800 p-6 rounded-xl border-2 border-blue-500/50 shadow-2xl"
        >
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📋</div>
            <div className="font-bold text-blue-400">interface IAttackable</div>
            <div className="text-xs text-gray-500 mt-1">The Contract (No body, just promises!)</div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg border border-blue-500/30 mb-4">
            <div className="text-sm font-bold text-blue-300 mb-2">Required Skills:</div>
            <div className="space-y-1 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <code>void Attack()</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <code>int Damage {'{'} get; set; {'}'}</code>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center mb-4">
            ↓ Sign below to implement this contract ↓
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {classes.map((cls, i) => (
              <motion.button
                key={cls.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedClass(cls.name);
                  setSigned(true);
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedClass === cls.name 
                    ? 'bg-red-900/50 border-red-400' 
                    : 'bg-gray-700 border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="text-2xl mb-1">{cls.icon}</div>
                <div className="font-mono text-[10px] text-gray-300">{cls.name}</div>
                <div className="text-[9px] text-gray-500 mt-1">: {cls.implements}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Implementation Example */}
        <AnimatePresence>
          {signed && selectedClass && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 bg-gray-900 p-4 rounded-lg border border-green-500/30"
            >
              <div className="text-sm font-bold text-green-400 mb-2">✓ Contract Signed! Implementation:</div>
              <CodeBlock code={`class ${selectedClass} : IAttackable {\n  public int Damage { get; set; }\n  \n  public void Attack() {\n    // ${selectedClass} MUST implement this!\n    Console.WriteLine("${selectedClass} attacks!");\n  }\n}`} />
              <div className="text-[10px] text-gray-500 mt-2">
                {selectedClass} now <strong>promises</strong> to have Attack() and Damage. It's in the contract!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-yellow-900/20 p-3 rounded border border-yellow-500/30 text-xs text-center max-w-md"
      >
        <strong className="text-yellow-400">Key Point:</strong> Interface = "Can-Do" contract. A class can implement MULTIPLE interfaces (multiple contracts)!
      </motion.div>
    </div>
  );
};

// Slide: Interfaces Detailed
const Slide_Interfaces_Detailed = () => (
  <div className="space-y-4 h-full overflow-y-auto pr-2">
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="text-xl font-bold text-blue-400">Interfaces in C#</h3>
      <p className="text-sm text-gray-300">An interface in C# is a <strong>contract</strong> that defines a set of methods, properties, events, and indexers that a class or struct must implement.</p>
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800 p-4 rounded-lg border border-blue-500/30"
    >
      <h4 className="font-bold text-blue-300 mb-2">Key Points:</h4>
      <ul className="text-xs text-gray-300 space-y-2 list-disc pl-5">
        <li>Interface methods do <strong>not</strong> have a body - the body is provided by the "implement" class</li>
        <li>On implementation of an interface, you must override all of its methods</li>
        <li>Interfaces can contain properties and methods, but <strong>not fields/variables</strong> (pre-C# 8.0)</li>
        <li>Interface members are by default <code>abstract</code> and <code>public</code></li>
        <li>An interface <strong>cannot contain a constructor</strong> (as it cannot be used to create objects)</li>
        <li>A class can implement <strong>multiple interfaces</strong> (unlike inheritance which is single)</li>
        <li>Interfaces define <strong>"Can-Do"</strong> relationships, not "Is-A" relationships</li>
      </ul>
    </motion.div>
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800 p-3 rounded border border-gray-600"
      >
        <h4 className="font-bold text-sm mb-2">Basic Interface</h4>
        <CodeBlock code={`interface IAttackable {\n  void Attack();\n  int Damage { get; set; }\n}`} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 p-3 rounded border border-gray-600"
      >
        <h4 className="font-bold text-sm mb-2">Implementation</h4>
        <CodeBlock code={`class Sword : IAttackable {\n  public int Damage { get; set; }\n  public void Attack() {\n    Console.WriteLine("Slash!");\n  }\n}`} />
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-800 p-4 rounded-lg border border-purple-500/30"
    >
      <h4 className="font-bold text-purple-300 mb-2">Multiple Interfaces</h4>
      <CodeBlock code={`interface IAttackable { void Attack(); }\ninterface IDefendable { void Defend(); }\n\nclass Knight : IAttackable, IDefendable {\n  public void Attack() { /* ... */ }\n  public void Defend() { /* ... */ }\n}`} />
      <p className="text-[10px] text-gray-400 mt-2">A class can implement multiple interfaces! This is why interfaces are powerful.</p>
    </motion.div>
    <TipBox title="When to use Interface?" variant="info">
      Use interfaces if you can make the statement "A is capable of [doing]". For example, a triangle is capable of being drawn, so it implements <code>IDrawable</code>. Use "Can-Do" not "Is-A".
    </TipBox>
  </div>
);

// Slide: Static Classes - The Shared Toolbox (Visual)
const Slide_StaticToolbox = () => {
  const [usingTool, setUsingTool] = useState<string | null>(null);
  const tools = [
    { name: "MathHelper", icon: "🔢", desc: "Calculate()", color: "blue" },
    { name: "Logger", icon: "📝", desc: "Log()", color: "green" },
    { name: "Config", icon: "⚙️", desc: "GetSetting()", color: "purple" },
    { name: "Validator", icon: "✅", desc: "IsValid()", color: "yellow" }
  ];
  
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl font-bold text-purple-400 mb-2 text-center">The Shared Toolbox 🧰</h3>
        <p className="text-sm text-gray-400 text-center">Static = Everyone shares the SAME toolbox. No need to create your own!</p>
      </motion.div>
      
      <div className="relative w-full max-w-2xl">
        {/* The Shared Toolbox */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 p-6 rounded-xl border-2 border-purple-500/50 shadow-2xl"
        >
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🧰</div>
            <div className="font-bold text-purple-400">static class Toolbox</div>
            <div className="text-xs text-gray-500 mt-1">No 'new' allowed! Just use it directly.</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool, i) => (
              <motion.button
                key={tool.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUsingTool(usingTool === tool.name ? null : tool.name)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  usingTool === tool.name 
                    ? `bg-${tool.color}-900/50 border-${tool.color}-400 shadow-lg` 
                    : 'bg-gray-700 border-gray-600 hover:border-purple-400'
                }`}
              >
                <div className="text-2xl mb-1">{tool.icon}</div>
                <div className="font-mono text-xs text-gray-300">{tool.name}</div>
                <div className="text-[10px] text-gray-500 mt-1">{tool.desc}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Usage Examples */}
        <AnimatePresence>
          {usingTool && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 bg-gray-900 p-4 rounded-lg border border-purple-500/30"
            >
              <div className="text-sm font-bold text-purple-400 mb-2">Usage:</div>
              <CodeBlock code={`// ❌ WRONG: Can't create instance!\n// Toolbox t = new Toolbox();\n\n// ✅ CORRECT: Use directly!\n${usingTool}.${tools.find(t => t.name === usingTool)?.desc}\n\n// Everyone uses the SAME toolbox!`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-yellow-900/20 p-3 rounded border border-yellow-500/30 text-xs text-center max-w-md"
      >
        <strong className="text-yellow-400">Key Point:</strong> Static = One shared copy for EVERYONE. Like a public library everyone uses!
      </motion.div>
    </div>
  );
};

// Slide: Static Classes Detailed
const Slide_StaticClasses_Detailed = () => (
  <div className="space-y-4 h-full overflow-y-auto pr-2">
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="text-xl font-bold text-purple-400">Static Classes, Methods and Variables</h3>
      <p className="text-sm text-gray-400 mt-1">Static = Belongs to the CLASS, not to any instance</p>
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800 p-4 rounded-lg border border-purple-500/30"
    >
      <h4 className="font-bold text-purple-300 mb-2">Static Class Rules:</h4>
      <ul className="text-xs text-gray-300 space-y-2 list-disc pl-5">
        <li>A static class is declared using the <code>static</code> keyword</li>
        <li>All members inside a static class must be static</li>
        <li>It <strong>cannot be instantiated</strong> using the <code>new</code> keyword</li>
        <li>It is <strong>implicitly sealed</strong>, so it cannot be inherited</li>
        <li>A static class can only have the <code>public</code> or <code>internal</code> access modifiers</li>
        <li>Static constructor runs <strong>ONCE</strong> before the class is first used</li>
        <li>Static members are shared across <strong>ALL</strong> instances (or accessed without instances)</li>
      </ul>
    </motion.div>
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800 p-3 rounded border border-gray-600"
      >
        <h4 className="font-bold text-sm mb-2">Static Fields</h4>
        <CodeBlock code={`static class AppConfig {\n  public static string AppName = "MonsterOOP";\n  public static int Version = 1;\n  // Shared by ALL code\n}`} />
        <p className="text-[10px] text-gray-400 mt-2">One value for the entire application!</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 p-3 rounded border border-gray-600"
      >
        <h4 className="font-bold text-sm mb-2">Static Constructor</h4>
        <CodeBlock code={`static class AppConfig {\n  static AppConfig() {\n    // Runs ONCE before first use\n    // Perfect for initialization\n  }\n}`} />
        <p className="text-[10px] text-gray-400 mt-2">Runs automatically, no need to call it!</p>
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-800 p-4 rounded-lg border border-blue-500/30"
    >
      <h4 className="font-bold text-blue-300 mb-2">Static Methods</h4>
      <CodeBlock code={`static class MathHelper {\n  public static int Add(int a, int b) {\n    return a + b;\n  }\n}\n\n// Usage: No instance needed!\nint result = MathHelper.Add(5, 3);`} />
    </motion.div>
    <TipBox title="Static vs Non-Static" variant="pro">
      <strong>Static:</strong> Belongs to the class itself. Shared across all instances. Accessed via ClassName.Member<br/>
      <strong>Non-Static:</strong> Belongs to each instance. Each object has its own copy. Accessed via instance.Member
    </TipBox>
  </div>
);

// Slide: Object Theory
const Slide_Object_Theory = () => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-purple-400">Object - The Base Type</h3>
    <p className="text-sm text-gray-300"><code>Object</code> represents a base type for all other types in C#. All other types are derived from this one.</p>
    <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/30">
      <h4 className="font-bold text-purple-300 mb-2">Key Points:</h4>
      <ul className="text-xs text-gray-300 space-y-2 list-disc pl-5">
        <li>Object type variables can store references as well as values or any user defined type</li>
        <li><strong>Avoid if possible</strong>, use a more specific type</li>
        <li>All classes implicitly inherit from <code>System.Object</code></li>
      </ul>
    </div>
    <CodeBlock code={`object obj1 = 42; // int\nobject obj2 = "Hello"; // string\nobject obj3 = new Monster(); // Monster\n\n// Boxing: Value type to object\nint num = 10;\nobject boxed = num; // Boxing\n\n// Unboxing: Object back to value type\nint unboxed = (int)boxed; // Unboxing`} />
    <TipBox title="Boxing & Unboxing" variant="warning">
      Boxing and unboxing have performance costs. Avoid using <code>object</code> when you know the specific type.
    </TipBox>
  </div>
);

// Slide: OOP Introduction - The 4 Pillars Visual
const Slide_OOP_Introduction = () => {
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const pillars = [
    { name: "Encapsulation", icon: "🔒", color: "blue", emoji: "📦", desc: "Hide the messy stuff inside a box!", example: "private int hp; // Can't touch this!" },
    { name: "Abstraction", icon: "🎭", color: "green", emoji: "🎯", desc: "Show only what matters, hide the rest!", example: "car.Drive(); // Don't care HOW it works" },
    { name: "Inheritance", icon: "🧬", color: "yellow", emoji: "👨‍👦", desc: "Kids inherit powers from parents!", example: "class Zombie : Monster { }" },
    { name: "Polymorphism", icon: "🦎", color: "pink", emoji: "🎭", desc: "Same action, different results!", example: "monster.Attack(); // Each attacks differently" }
  ];
  
  return (
    <div className="flex flex-col h-full items-center justify-center gap-6">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="text-5xl mb-4">🏛️</div>
        <h3 className="text-2xl font-bold text-purple-400">The 4 Pillars of OOP</h3>
        <p className="text-sm text-gray-400 mt-2">Click a pillar to see its power!</p>
      </motion.div>
      
      <div className="flex gap-4 justify-center">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.1, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePillar(activePillar === i ? null : i)}
            className={`cursor-pointer flex flex-col items-center p-4 rounded-xl border-2 transition-all w-28 ${
              activePillar === i 
                ? `bg-${pillar.color}-900/50 border-${pillar.color}-400 shadow-lg shadow-${pillar.color}-500/30` 
                : 'bg-gray-800 border-gray-600 hover:border-purple-400'
            }`}
          >
            <motion.div 
              animate={activePillar === i ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="text-4xl mb-2"
            >
              {pillar.emoji}
            </motion.div>
            <div className="text-xs font-bold text-center">{pillar.name}</div>
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {activePillar !== null && (
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`bg-gray-800 p-6 rounded-xl border-2 border-${pillars[activePillar].color}-500/50 max-w-md text-center`}
          >
            <div className="text-3xl mb-3">{pillars[activePillar].emoji}</div>
            <h4 className={`text-xl font-bold text-${pillars[activePillar].color}-400 mb-2`}>{pillars[activePillar].name}</h4>
            <p className="text-sm text-gray-300 mb-4">{pillars[activePillar].desc}</p>
            <div className="bg-gray-900 p-3 rounded-lg">
              <code className="text-xs text-green-400">{pillars[activePillar].example}</code>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {activePillar === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm"
        >
          ☝️ Tap a pillar to learn its secret!
        </motion.div>
      )}
    </div>
  );
};

// Slide: Class Components
const Slide_ClassComponents = () => (
  <div className="space-y-4 h-full overflow-y-auto pr-2">
    <h3 className="text-xl font-bold text-purple-400">Class Components</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-800 p-3 rounded border border-gray-600">
        <h4 className="font-bold text-sm mb-2">Fields</h4>
        <p className="text-xs text-gray-400 mb-2">Variables that store data associated with the class</p>
        <CodeBlock code={`private string _color;\npublic string Color { get; set; }`} />
      </div>
      <div className="bg-gray-800 p-3 rounded border border-gray-600">
        <h4 className="font-bold text-sm mb-2">Properties</h4>
        <p className="text-xs text-gray-400 mb-2">Encapsulate access to a class's fields</p>
        <CodeBlock code={`public int Health { get; set; }`} />
      </div>
      <div className="bg-gray-800 p-3 rounded border border-gray-600">
        <h4 className="font-bold text-sm mb-2">Constructors</h4>
        <p className="text-xs text-gray-400 mb-2">Special methods used to create objects</p>
        <CodeBlock code={`public Monster() { }`} />
      </div>
      <div className="bg-gray-800 p-3 rounded border border-gray-600">
        <h4 className="font-bold text-sm mb-2">Methods</h4>
        <p className="text-xs text-gray-400 mb-2">Functions that define behavior</p>
        <CodeBlock code={`public void Attack() { }`} />
      </div>
    </div>
  </div>
);

interface GrimoireMenuProps {
  isOpen: boolean;
  onClose: () => void;
  slides: any[];
  onJump: (index: number) => void;
}

const GrimoireMenu = ({ isOpen, onClose, slides, onJump }: GrimoireMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" />
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-900 border-l border-purple-500/30 shadow-2xl z-[70] flex flex-col">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
            <h2 className="text-xl font-horror text-purple-400 flex items-center gap-2"><BookOpen size={20}/> The Grimoire</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors"><X size={20} className="text-gray-400 hover:text-white" /></button>
          </div>
          <div className="overflow-y-auto flex-1 p-4 space-y-6">
            {Array.from(new Set(slides.map(s => s.module))).map((mod) => (
              <div key={mod as string}>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1 border-b border-gray-800 pb-1">{mod as string}</h3>
                <div className="space-y-1">
                  {slides.map((s, idx) => s.module === mod && (
                    <button key={idx} onClick={() => { onJump(idx); onClose(); }} className="w-full text-left px-3 py-2 rounded hover:bg-gray-800 text-sm text-gray-300 hover:text-purple-300 transition-colors flex items-center gap-3 group">
                      <span className="text-[10px] text-gray-600 font-mono w-4 group-hover:text-purple-500">{idx + 1}</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- MAIN SLIDES ARRAY (ALL 55+ SLIDES - NOTHING OMITTED!) ---

const slides = [
  // ============================================
  // CURS 1: INTRODUCTION TO C# & .NET (2 slides)
  // ============================================
  { id: 1, module: "Curs 1", type: "visual", title: ".NET Framework", subtitle: "CLR, JIT, Abstraction", render: () => <Slide_NetIntro /> },
  { id: 2, module: "Curs 1", type: "visual", title: "C# Structure", subtitle: "using & namespace", render: () => <Slide_CSharpStructure /> },
  
  // ============================================
  // CURS 2: FUNDAMENTALS - Data Types & Operators (7 slides)
  // ============================================
  { id: 3, module: "Curs 2", type: "visual", title: "Data Types", subtitle: "bool, int, float, string...", render: () => <Slide_DataTypes_Table /> },
  { id: 4, module: "Curs 2", type: "visual", title: "Value vs Reference", subtitle: "📦 Cutia vs ➡️ Săgeata", render: () => <Slide_ValueVsReference /> },
  { id: 5, module: "Curs 2", type: "visual", title: "Conversii", subtitle: "Implicit vs Explicit Cast", render: () => <Slide_Conversion /> },
  { id: 6, module: "Curs 2", type: "visual", title: "const vs readonly", subtitle: "Compile vs Runtime", render: () => <Slide_ConstReadonly /> },
  { id: 7, module: "Curs 2", type: "theory", title: "var Keyword", subtitle: "Implicit Typing", render: () => <Slide_VarKeyword /> },
  { id: 8, module: "Curs 2", type: "theory", title: "object Type", subtitle: "Baza Tuturor", render: () => <Slide_ObjectType /> },
  { id: 9, module: "Curs 2", type: "visual", title: "Operators", subtitle: "Arithmetic, Logic, Bitwise", render: () => <Slide_Operators_Lists /> },
  { id: 10, module: "Curs 2", type: "visual", title: "Null Coalescing", subtitle: "?? și ?: Operators", render: () => <Slide_Operators /> },
  { id: 11, module: "Curs 2", type: "visual", title: "Preprocessor", subtitle: "#if, #define, #region", render: () => <Slide_Preprocessor /> },
  
  // ============================================
  // CURS 3: FUNDAMENTALS 2.0 - Methods & Data Structures (5 slides)
  // ============================================
  { id: 12, module: "Curs 3", type: "visual", title: "Methods", subtitle: "Input → Output", render: () => <Slide_Methods_Intro /> },
  { id: 13, module: "Curs 3", type: "visual", title: "ref vs out", subtitle: "Two-Way Communication", render: () => <Slide_RefOut /> },
  { id: 14, module: "Curs 3", type: "visual", title: "Enums & Flags", subtitle: "[Flags] pentru Bitwise", render: () => <Slide_Enums /> },
  { id: 15, module: "Curs 3", type: "visual", title: "Data Structures", subtitle: "Array, List, Dictionary...", render: () => <Slide_DataStructures_List /> },
  { id: 16, module: "Curs 3", type: "theory", title: "Când să folosești?", subtitle: "List vs Dict vs Set", render: () => <Slide_DataStructures_When /> },

  // ============================================
  // CURS 4: OOP INTRODUCTION (15 slides)
  // ============================================
  { id: 17, module: "Curs 4", type: "visual", title: "Cele 4 Piloni OOP", subtitle: "Fundația", render: () => <Slide_OOP_Introduction /> },
  { id: 18, module: "Curs 4", type: "visual", title: "Schița vs. Viața", subtitle: "Class vs Object", render: () => <Slide1_Blueprint /> },
  { id: 19, module: "Curs 4", type: "theory", title: "Alocarea Memoriei", subtitle: "Stack vs Heap", render: () => <Slide2_Theory /> },
  { id: 20, module: "Curs 4", type: "visual", title: "Struct vs Class", subtitle: "Value vs Reference", render: () => <Slide_StructVsClass /> },
  { id: 21, module: "Curs 4", type: "visual", title: "Access Modifiers", subtitle: "4 Basic Guards", render: () => <Slide_AccessModifiers_Detailed /> },
  { id: 22, module: "Curs 4", type: "theory", title: "Toate 7 Modifiers", subtitle: "protected internal, file...", render: () => <Slide_AllAccessModifiers /> },
  { id: 23, module: "Curs 4", type: "visual", title: "Properties", subtitle: "get; set; Bouncer", render: () => <Slide_Properties /> },
  { id: 24, module: "Curs 4", type: "visual", title: "Laboratorul Frankenstein", subtitle: "Constructorul", render: () => <Slide3_Constructor /> },
  { id: 25, module: "Curs 4", type: "theory", title: "Nașterea (Constructori)", subtitle: "Primul Țipăt", render: () => <Slide4_Theory /> },
  { id: 26, module: "Curs 4", type: "visual", title: "Tipuri de Constructori", subtitle: "Default vs Parametrizat", render: () => <Slide5_ConstructorTypes /> },
  { id: 27, module: "Curs 4", type: "theory", title: "System.Exception", subtitle: "StackTrace, Message, Inner", render: () => <Slide_Exceptions_Details /> },
  { id: 28, module: "Curs 4", type: "visual", title: "finally Block", subtitle: "RULEAZĂ MEREU!", render: () => <Slide_Finally_Always /> },
  { id: 29, module: "Curs 4", type: "visual", title: "Exception Filters", subtitle: "when Keyword", render: () => <Slide_Exceptions_Filters /> },
  { id: 30, module: "Curs 4", type: "theory", title: "Debugging", subtitle: "Breakpoints, Watch, Step", render: () => <Slide_Debugging_Info /> },
  { id: 31, module: "Curs 4", type: "visual", title: "Partial Classes", subtitle: "Fișiere Împărțite", render: () => <Slide_Partial /> },

  // ============================================
  // CURS 5: INHERITANCE & POLYMORPHISM (12 slides)
  // ============================================
  { id: 32, module: "Curs 5", type: "visual", title: "Arborele Genealogic", subtitle: "Inheritance = DNA", render: () => <Slide6_Inheritance /> },
  { id: 33, module: "Curs 5", type: "theory", title: "Regulile Moștenirii", subtitle: "Single Only + base", render: () => <Slide7_Theory /> },
  { id: 34, module: "Curs 5", type: "visual", title: "Ordinea Creației", subtitle: "Base → Derived", render: () => <Slide8_Chain /> },
  { id: 35, module: "Curs 5", type: "theory", title: "Constructor Chaining", subtitle: ": base(params)", render: () => <Slide9_ChainingTheory /> },
  { id: 36, module: "Curs 5", type: "visual", title: "Concursul de Talente", subtitle: "Runtime Polymorphism", render: () => <Slide10_Polymorphism /> },
  { id: 37, module: "Curs 5", type: "theory", title: "Polimorfism Deep Dive", subtitle: "virtual/override + V-Table", render: () => <Slide11_PolymorphismTheory /> },
  { id: 38, module: "Curs 5", type: "visual", title: "Dilema Sabiei", subtitle: "new vs override", render: () => <Slide12_NewVsOverride /> },
  { id: 39, module: "Curs 5", type: "theory", title: "Method Hiding (new)", subtitle: "Capcana Periculoasă", render: () => <Slide13_HidingTheory /> },
  { id: 40, module: "Curs 5", type: "visual", title: "Armata Diversă", subtitle: "List<Monster>", render: () => <Slide14_List /> },
  { id: 41, module: "Curs 5", type: "theory", title: "Upcasting", subtitle: "Copil → Părinte", render: () => <Slide15_UpcastingTheory /> },
  { id: 42, module: "Curs 5", type: "visual", title: "Bucătarul Monstru", subtitle: "Method Overloading", render: () => <Slide19_Overloading /> },
  { id: 43, module: "Curs 5", type: "theory", title: "Polimorfism Static", subtitle: "Compile-time Decision", render: () => <Slide20_OverloadingTheory /> },

  // ============================================
  // CURS 6: INTERFACES, SEALED, STATIC, PARTIAL (14 slides)
  // ============================================
  { id: 44, module: "Curs 6", type: "visual", title: "Cutia de Scule", subtitle: "static class", render: () => <Slide_StaticToolbox /> },
  { id: 45, module: "Curs 6", type: "theory", title: "Static Constructor", subtitle: "Rulează O DATĂ", render: () => <Slide_StaticConstructor /> },
  { id: 46, module: "Curs 6", type: "theory", title: "Static vs Non-Static", subtitle: "Tabel Comparativ", render: () => <Slide_StaticVsNonStatic /> },
  { id: 47, module: "Curs 6", type: "visual", title: "Planul Fantomă", subtitle: "abstract class", render: () => <Slide16_Abstract /> },
  { id: 48, module: "Curs 6", type: "theory", title: "Regulile Abstracte", subtitle: "Cele 4 Porunci", render: () => <Slide17_AbstractRules /> },
  { id: 49, module: "Curs 6", type: "visual", title: "Fantoma vs Avocatul", subtitle: "Abstract vs Interface", render: () => <Slide18_AbstractVsInterface /> },
  { id: 50, module: "Curs 6", type: "visual", title: "Contractul de Muncă", subtitle: "interface IDoable", render: () => <Slide_InterfaceContract /> },
  { id: 51, module: "Curs 6", type: "theory", title: "Interface Key Points", subtitle: "No fields, No ctor", render: () => <Slide_InterfaceRules /> },
  { id: 52, module: "Curs 6", type: "visual", title: "Clasa Sigilată", subtitle: "sealed = No Kids", render: () => <Slide_Sealed /> },
  { id: 53, module: "Curs 6", type: "visual", title: "Inventarul RPG", subtitle: "Abstract + Interface", render: () => <Slide21_Inventory /> },
  { id: 54, module: "Curs 6", type: "theory", title: "Magia Rucsacului", subtitle: "Upcasting în Acțiune", render: () => <Slide22_InventoryTheory /> },
  { id: 55, module: "Curs 6", type: "visual", title: "Arhitectura Finală", subtitle: "Puzzle-ul Complet", render: () => <Slide23_Architecture /> },
];

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(curr => curr + 1); };
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(curr => curr - 1); };
  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col overflow-hidden selection:bg-purple-500 selection:text-white font-sans">
      <GrimoireMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} slides={slides} onJump={setCurrentSlide} />

      <header className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/95 backdrop-blur z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-2 rounded-lg"><Ghost className="text-white" size={20} /></div>
          <h1 className="font-horror text-xl sm:text-2xl tracking-wider text-purple-100 hidden sm:block">Monster OOP Academy <span className="text-xs font-mono text-purple-400 ml-2">vFinal</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-500 font-mono hidden md:block">{slide.module} • {currentSlide + 1}/{slides.length}</div>
          <button onClick={() => setMenuOpen(true)} className="p-2 bg-gray-800 rounded-lg hover:bg-purple-900 transition-colors border border-gray-700 hover:border-purple-500 group" title="Open Grimoire">
            <Scroll size={20} className="text-gray-400 group-hover:text-purple-300" />
          </button>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full flex flex-col">
            <div className="mb-4 sm:mb-8 text-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent font-horror tracking-wide">{slide.title}</h2>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                 {slide.type === "visual" && <Zap size={14} className="text-yellow-500"/>}
                 {slide.type === "theory" && <FileText size={14} className="text-blue-500"/>}
                 <p className="font-mono text-xs uppercase tracking-[0.2em]">{slide.subtitle}</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
               <div className="bg-gray-800/20 p-4 sm:p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm w-full h-full flex flex-col justify-center relative overflow-hidden">
                  {slide.render()}
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="p-4 border-t border-gray-800 flex justify-between items-center bg-gray-900 z-50">
        <button onClick={prevSlide} disabled={currentSlide === 0} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${currentSlide === 0 ? "text-gray-700 cursor-not-allowed" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
          <ArrowLeft size={18} /> <span className="hidden sm:inline">Prev</span>
        </button>
        <div className="hidden md:flex gap-1.5 flex-wrap justify-center max-w-[50%]">
          {slides.map((s, idx) => (
             <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 rounded-full transition-all duration-300 hover:bg-purple-400 ${idx === currentSlide ? "w-8 bg-purple-500" : (s.type === 'theory' ? "w-1.5 bg-blue-900" : "w-1.5 bg-gray-700")}`} title={s.title}/>
          ))}
        </div>
        <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all text-sm ${currentSlide === slides.length - 1 ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)]"}`}>
          {currentSlide === slides.length - 1 ? "Finish" : "Next"} <ArrowRight size={18} />
        </button>
      </footer>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
