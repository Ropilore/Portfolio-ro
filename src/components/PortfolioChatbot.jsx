import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  User,
  Bot,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  ArrowRight,
  RefreshCw,
  Info,
  ExternalLink
} from "lucide-react";

// Dynamic experience helper function for the chatbot
const getDynamicExperienceText = () => {
  const startDate = new Date(2025, 9, 1); // October 1, 2025 (Month index 9 is October)
  const currentDate = new Date();
  
  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth();
  
  // We add 1 because October 2025 is Month 1, November is Month 2, etc.
  let totalMonths = (yearsDiff * 12) + monthsDiff + 1;
  if (totalMonths < 1) totalMonths = 1;
  
  if (totalMonths < 12) {
    return `${totalMonths} ${totalMonths === 1 ? "month" : "months"}`;
  } else {
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "year" : "years"}`;
    } else {
      return `${years} ${years === 1 ? "year" : "years"} and ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
    }
  }
};

const DYNAMIC_EXP = getDynamicExperienceText();

// Knowledge Base of Rohit Pilore
const PORTFOLIO_DATA = {
  name: "Rohit Pilore",
  role: "Software Engineer & Frontend Developer",
  location: "Pune, Maharashtra, India",
  email: "rohitapilore@gmail.com",
  phone: "+91 9322810417",
  github: "https://github.com/rohit-pilore",
  education: [
    {
      period: "2022 — 2025",
      degree: "BSc in Information Technology",
      college: "NYNC College, Chalisgaon",
      link: "https://www.rashtriyacollege.com/",
      description: "Focused on computer science fundamentals, object-oriented programming, data structures, algorithms, and web application development."
    },
    {
      period: "2020 — 2021",
      degree: "HSC — Science",
      college: "Maharashtra State Board",
      description: "Focused on Physics, Chemistry, Mathematics, and Biology developing strong analytical and problem-solving skills essential for technical education. Scored 78.80% in the PCMB group."
    },
    {
      period: "2020",
      degree: "Secondary School Certificate (SSC - 10th)",
      college: "High School, Chalisgaon",
      description: "Completed general secondary education with excellent grades in mathematics and sciences."
    }
  ],
  skills: [
    "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", 
    "JavaScript", "HTML5", "CSS3", "Framer Motion", "Git", "GitHub", 
    "MongoDB", "PostgreSQL", "Firebase", "AWS", "Docker", "Python", 
    "C++", "SQL", "C", "Java", "Data Structures & Algorithms"
  ],
  experiences: [
    {
      period: "2025 — Present",
      role: "Frontend Developer",
      company: "Revdau Private Limited (Revdau.ai)",
      description: `Acquired ${DYNAMIC_EXP} of professional experience building and maintaining enterprise-grade React applications, establishing automated testing to increase coverage to 85%.`,
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GitHub"]
    }
  ],
  projects: [
    {
      title: "Kabaddi Ecosystem Platform",
      description: "A full-featured sports platform for Kabaddi, enabling player registration, tournament management, and real-time match updates.",
      tags: ["React", "Firebase", "NodeJS"]
    },
    {
      title: "AI-Powered Solution Hub",
      description: "A modern platform focused on digital transformation, leveraging AI for scalable and efficient business operations.",
      tags: ["Next.js", "OpenAI", "Cloud-Native"]
    },
    {
      title: "Fintech Dashboard",
      description: "A comprehensive financial analytics platform with real-time data visualization and AI-powered insights.",
      tags: ["React", "Typescript", "Analytics"]
    },
    {
      title: "Multi-Cloud Management (MCM)",
      description: "A scalable cloud management platform for multi-cloud environments, optimizing resource usage and monitoring.",
      tags: ["React", "AWS", "Dashboard"]
    },
    {
      title: "E-Commerce Solution",
      description: "A full-featured e-commerce platform with inventory management and seamless Stripe payment integration.",
      tags: ["Next.js", "Stripe", "Tailwind"]
    },
    {
      title: "Smart System Dashboard",
      description: "Monitoring and management dashboard for enterprise-level smart systems and IoT devices.",
      tags: ["React", "IoT", "ContextAPI"]
    },
    {
      title: "AI Content Creation",
      description: "An intelligent writing assistant that helps users generate high-quality content using LLMs.",
      tags: ["React", "GPT-4", "FastAPI"]
    },
    {
      title: "Collaborative Workspace",
      description: "A real-time project management tool for teams with task tracking and interactive boards.",
      tags: ["Next.js", "Socket.io", "MongoDB"]
    }
  ]
};

// Response Logic Engine (Fully English)
const getAiResponse = (query, isOwner) => {
  const q = query.toLowerCase().trim();

  // Helper matching keywords
  const contains = (keywords) => keywords.some(k => q.includes(k));

  // --- OWNER MODE SPECIAL DIALOGUE ---
  if (isOwner) {
    if (contains(["hi", "hello", "hey", "namaste", "kaise ho", "how are you"])) {
      return {
        text: "Hello Rohit! I am doing great. Your portfolio website is fully optimized and online. I am actively guiding visitors through your outstanding skills and projects! 🚀\n\nFeel free to ask me anything to test my responses.",
        chips: ["Show Visitor Mode", "Projects Summary", "Lead Updates", "Clear Chat"]
      };
    }
    if (contains(["visitor mode", "exit", "logout", "bahar"])) {
      return {
        text: "Sure Rohit! Switching back to Visitor Mode so you can see how guests interact with me.",
        action: "exit_owner",
        chips: ["🚀 Technical Skills", "📁 Show Projects", "📞 Contact Details"]
      };
    }
    if (contains(["project", "work", "apps", "websites", "dashboard", "kabaddi"])) {
      return {
        text: "Rohit, you have a total of 8 impressive projects listed on your portfolio! My absolute favorites are the **Kabaddi Ecosystem Platform** and the **AI-Powered Solution Hub**.\n\nWhenever a visitor asks about them, I explain their tech stack (React, Firebase, OpenAI) and unique features. Would you like me to summarize more info?",
        chips: ["Skills summary", "Contact details", "Logout"]
      };
    }
    if (contains(["skill", "stack", "technology", "languages"])) {
      return {
        text: "Your tech stack is exceptionally strong! You specialize in **React, Next.js, TypeScript, Tailwind CSS, Node.js, and Framer Motion**, with a solid command of DSA and backend databases (MongoDB, PostgreSQL).\n\nVisitors are highly impressed by your versatile development profile!",
        chips: ["Projects Summary", "Contact details", "Logout"]
      };
    }
    if (contains(["lead", "contact", "messages", "email"])) {
      return {
        text: "My messaging integration is fully active! Whenever a visitor fills out the contact form, you will receive an email via EmailJS instantly.\n\nI share your active email `rohitapilore@gmail.com` and phone `+91 9322810417` directly with visitors when they request it.",
        chips: ["Projects Summary", "Logout"]
      };
    }
    
    // Default Owner fallback
    return {
      text: "At your service, Rohit! I am your personal AI assistant. I have perfect access to all your portfolio data.\n\nYou can test custom answers or check what I present to visitors.",
      chips: ["Projects Summary", "Skills summary", "Show Visitor Mode"]
    };
  }

  // --- VISITOR MODE DIALOGUE (Default) ---
  
  // Greetings
  if (contains(["hello", "hi", "hey", "namaste", "hola", "how are you", "yo"])) {
    return {
      text: "Hello! 🙏 Welcome to Rohit's Portfolio. I am Rohit's AI assistant. How can I help you today? \n\nYou can ask me about Rohit's skills, projects, work experience, or contact details!",
      chips: ["🚀 Technical Skills", "📁 Show Projects", "📞 Contact Details", "🔑 Owner Mode"]
    };
  }

  // Identity / Who are you?
  if (contains(["who are you", "what is your name", "chatbot name", "identity", "tum kaun ho"])) {
    return {
      text: "I am Rohit Pilore's dedicated AI Assistant. My role is to help you learn about Rohit's professional background, custom web projects, and software engineering capabilities. 😊",
      chips: ["🚀 Technical Skills", "📁 Show Projects", "📞 Contact Details"]
    };
  }

  // Technical Skills
  if (contains(["skills", "tech stack", "languages", "programming", "technology", "technologies", "what do you know", "css", "react", "nextjs", "node", "typescript", "dsa", "javascript"])) {
    return {
      text: "Rohit is a highly skilled **Software Engineer & Frontend Developer**. Here is a breakdown of his technical stack:\n\n" +
            "• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, HTML5, CSS3, JavaScript\n" +
            "• **Backend & Databases**: Node.js, MongoDB, PostgreSQL, Firebase, SQL\n" +
            "• **DevOps & Tools**: AWS, Docker, Git, GitHub\n" +
            "• **Languages**: C++, Python, Java, C, Data Structures & Algorithms\n\n" +
            "He specializes in building high-performance, interactive, and responsive web applications! ✨",
      chips: ["📁 Show Projects", "💼 Work Experience", "📞 Contact Details"]
    };
  }

  // Projects
  if (contains(["project", "projects", "work", "portfolio", "apps", "websites", "what did he make", "fintech", "kabaddi", "solution hub", "dashboard"])) {
    return {
      text: "Rohit has built several high-impact, premium projects. Here are some of his featured works:\n\n" +
            "1. 🏆 **Kabaddi Ecosystem Platform**: A complete sports platform enabling tournament management and real-time updates. (React, Firebase, Node.js)\n" +
            "2. 🧠 **AI-Powered Solution Hub**: Scalable digital transformation platform utilizing OpenAI. (Next.js, OpenAI, Cloud-Native)\n" +
            "3. 💳 **Fintech Dashboard**: Premium financial analytics platform with real-time charts. (React, TypeScript)\n" +
            "4. ☁️ **Multi-Cloud Management (MCM)**: A dashboard optimizing cloud resource usage. (React, AWS)\n" +
            "5. 🛒 **E-Commerce Solution**: Fully featured online store with Stripe payment integration. (Next.js, Stripe)\n\n" +
            "You can scroll to the **Featured Work** section to view more details and check their repository links! 📁",
      chips: ["🚀 Technical Skills", "💼 Work Experience", "📞 Contact Details"]
    };
  }

  // Work Experience / Jobs
  if (contains(["experience", "job", "career", "revdau", "startup labs", "freelance", "work history", "office"])) {
    return {
      text: "Here is Rohit's professional work experience:\n\n" +
            `• **Frontend Developer at Revdau Private Limited (2025 — Present)**: Completed **${DYNAMIC_EXP} of experience** designing, building, and maintaining React/Next.js enterprise applications. Established automated testing that increased unit test coverage to **85%**.\n\n` +
            "Rohit focuses on clean code, technical scalability, and visual elegance! 💻",
      chips: ["🚀 Technical Skills", "📁 Show Projects", "🎓 Education"]
    };
  }

  // Education
  if (contains(["education", "college", "degree", "bsc", "school", "qualification", "studies"])) {
    return {
      text: "Here is Rohit's full educational background:\n\n" +
            "• 🎓 **BSc in Information Technology (2022 — 2025)**\n" +
            "  **College**: NYNC College, Chalisgaon (Rashtriya College)\n" +
            "  **Details**: Acquired strong fundamentals in Computer Science, Data Structures, OOPs, database management, and modern web application development.\n\n" +
            "• 🏫 **HSC — Science (2020 — 2021)**\n" +
            "  **Board**: Maharashtra State Board\n" +
            "  **Details**: Focused on Physics, Chemistry, Mathematics, and Biology developing strong analytical and problem-solving skills essential for technical education. Scored **78.80%** (PCMB Group).\n\n" +
            "• 📝 **Secondary School Certificate (SSC - 10th Grade) (2020)**\n" +
            "  **School**: High School, Chalisgaon\n" +
            "  **Details**: Completed general secondary school curriculum.",
      chips: ["💼 Work Experience", "📁 Show Projects", "📞 Contact Details"]
    };
  }

  // Contact / Socials / Location
  if (contains(["contact", "email", "phone", "number", "mobile", "address", "location", "pune", "where does he live", "gmail", "github", "linkedin", "social"])) {
    return {
      text: "You can connect with Rohit directly! Here are his contact details:\n\n" +
            "• 📍 **Location**: Pune, Maharashtra, India\n" +
            "• ✉️ **Email**: [rohitapilore@gmail.com](mailto:rohitapilore@gmail.com)\n" +
            "• 📞 **Phone**: [+91 9322810417](tel:+919322810417)\n" +
            "• 🔗 **GitHub**: [github.com/rohit-pilore](https://github.com/rohit-pilore)\n\n" +
            "Feel free to send a message via the **Contact Form** at the bottom of the page. He typically responds within 24 hours! 🤝",
      chips: ["🚀 Technical Skills", "📁 Show Projects", "🔑 Owner Mode"]
    };
  }

  // Owner Mode passcode query
  if (contains(["owner mode", "owner", "admin", "rohit login", "passcode", "secret"])) {
    return {
      text: "It looks like you want to activate 'Owner Mode'. Please click the '🔑 Owner Mode' option from the quick links or let me know if you are Rohit so I can verify your passcode! 🔐",
      chips: ["🔑 Owner Mode", "Hello", "Show Projects"]
    };
  }

  // Fallback / Default Help
  return {
    text: "I couldn't quite understand your question. 😅\n\nHowever, I know everything about Rohit's profile! You can use the suggestion chips below or ask me:\n" +
          "• *'Show Rohit's projects'*\n" +
          "• *'What is Rohit's email?'*\n" +
          "• *'Tell me about his technical skills.'*",
    chips: ["🚀 Technical Skills", "📁 Show Projects", "📞 Contact Details", "🎓 Education"]
  };
};

export const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "initial-1",
      sender: "bot",
      text: "Hello! 🙏 I am Rohit's personal AI Assistant. I am designed to match the website's theme and help you find information about Rohit's professional background.\n\nYou can ask me about Rohit's skills, projects, educational background, or contact details!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Owner mode auth states
  const [isOwnerMode, setIsOwnerMode] = useState(false);
  const [isVerifyingOwner, setIsVerifyingOwner] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isTyping, isOpen, isVerifyingOwner]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isVerifyingOwner && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isVerifyingOwner]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue("");

    // Simulate thinking & typing
    setIsTyping(true);
    
    setTimeout(() => {
      // Check if user is triggering owner mode through chat input
      const lowered = text.toLowerCase();
      if ((lowered.includes("owner") || lowered.includes("admin") || lowered.includes("rohit mode") || lowered.trim() === "rohit") && !isOwnerMode) {
        setIsVerifyingOwner(true);
        setIsTyping(false);
        return;
      }

      const response = getAiResponse(text, isOwnerMode);
      
      // Check for actions returned by AI engine
      if (response.action === "exit_owner") {
        setIsOwnerMode(false);
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        chips: response.chips,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "rohit") {
      setIsOwnerMode(true);
      setIsVerifyingOwner(false);
      setPasscode("");
      setPasscodeError("");
      
      // Welcome Rohit!
      setIsTyping(true);
      setTimeout(() => {
        const welcomeMsg = {
          id: `bot-owner-${Date.now()}`,
          sender: "bot",
          text: "🎉 **Owner Mode Unlocked!** \n\nWelcome back, Rohit! Your active session is fully authenticated. \n\nI am currently serving visitors with accurate details about your skills and projects. Let me know if you want to test some queries, review lead status, or exit back to Visitor Mode!",
          chips: ["Show Visitor Mode", "Projects Summary", "Lead Updates", "Clear Chat"],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, welcomeMsg]);
        setIsTyping(false);
      }, 800);
    } else {
      setPasscodeError("Authentication failed! Incorrect passcode. Please try again or click 'Cancel'.");
    }
  };

  const handleChipClick = (chipText) => {
    if (chipText === "🔑 Owner Mode") {
      setIsVerifyingOwner(true);
      return;
    }
    if (chipText === "Show Visitor Mode" || chipText === "Logout") {
      setIsOwnerMode(false);
      setIsTyping(true);
      setTimeout(() => {
        const resetMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "I am back in standard Visitor Mode. I am ready to showcase your accomplishments to guests! 😊",
          chips: ["🚀 Technical Skills", "📁 Show Projects", "📞 Contact Details"],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, resetMsg]);
        setIsTyping(false);
      }, 600);
      return;
    }
    if (chipText === "Clear Chat") {
      setMessages([
        {
          id: "initial-reset",
          sender: "bot",
          text: isOwnerMode 
            ? "Chat history cleared. Active and ready, Rohit! Please let me know how I can assist you."
            : "The chat history has been reset. Feel free to ask me anything about Rohit's background!",
          chips: isOwnerMode ? ["Show Visitor Mode", "Projects Summary", "Lead Updates"] : ["🚀 Technical Skills", "📁 Show Projects", "📞 Contact Details"],
          timestamp: new Date()
        }
      ]);
      return;
    }
    handleSendMessage(chipText);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-[9999] p-4 rounded-full bg-gradient-to-tr from-primary to-primary/80 border border-primary-foreground/20 text-white shadow-[0_0_20px_rgba(32,178,166,0.5)] cursor-pointer focus:outline-none flex items-center justify-center hover:shadow-[0_0_30px_rgba(32,178,166,0.8)] transition-all duration-300"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-highlight"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-9rem)] z-[9999] flex flex-col glass-strong rounded-2xl overflow-hidden border border-primary/20 shadow-[0_15px_50px_rgba(0,0,0,0.8)] glow-border"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-muted to-card border-b border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/50 flex items-center justify-center text-primary">
                    {isOwnerMode ? <ShieldCheck className="w-6 h-6 text-highlight animate-pulse" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-wide text-foreground flex items-center gap-1.5">
                    {isOwnerMode ? "Rohit's Control Center" : "Rohit's AI Assistant"}
                    <Sparkles className="w-3.5 h-3.5 text-highlight" />
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {isOwnerMode ? (
                      <span className="text-highlight font-medium flex items-center gap-1">
                        <Unlock className="w-3 h-3 inline" /> Admin Session Active
                      </span>
                    ) : (
                      "Ask me about skills, projects & career"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setIsOwnerMode(false);
                    setIsVerifyingOwner(false);
                    setMessages([
                      {
                        id: "initial-reset-header",
                        sender: "bot",
                        text: "Welcome back to Visitor Mode! I am fully ready to answer any questions in English.",
                        chips: ["🚀 Technical Skills", "📁 Show Projects", "📞 Contact Details"],
                        timestamp: new Date()
                      }
                    ]);
                  }}
                  title="Reset Chat"
                  className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {isVerifyingOwner ? (
                /* Owner mode Verification Form */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col justify-center items-center p-6 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-highlight/10 border border-highlight/30 flex items-center justify-center text-highlight">
                    <Key className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Are you Rohit?</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Please enter your passcode to unlock Owner Mode.
                    </p>
                  </div>

                  <form onSubmit={handlePasscodeSubmit} className="w-full space-y-4">
                    <input
                      type="password"
                      placeholder="Enter passcode..."
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full px-4 py-3 bg-muted/50 border border-primary/20 rounded-xl text-center focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/50 transition-all font-semibold letter-spacing-lg"
                      autoFocus
                    />
                    {passcodeError && (
                      <p className="text-xs text-rose-500 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                        {passcodeError}
                      </p>
                    )}
                    <div className="flex gap-2.5 justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsVerifyingOwner(false);
                          setPasscode("");
                          setPasscodeError("");
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-foreground hover:bg-white/10 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-primary text-xs font-semibold text-white hover:bg-primary/95 transition-all cursor-pointer shadow-[0_0_10px_rgba(32,178,166,0.3)] flex items-center gap-1"
                      >
                        Verify <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                  <span className="text-[10px] text-muted-foreground/60 italic">Hint: Try 'rohit'</span>
                </motion.div>
              ) : (
                /* Regular messages */
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        msg.sender === "user" 
                          ? "bg-primary text-white font-semibold text-xs" 
                          : isOwnerMode 
                            ? "bg-highlight/20 border border-highlight/40 text-highlight"
                            : "bg-surface border border-primary/20 text-primary"
                      }`}>
                        {msg.sender === "user" ? <User className="w-4 h-4" /> : isOwnerMode ? <ShieldCheck className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      {/* Bubble */}
                      <div className="flex flex-col max-w-[80%] space-y-1.5">
                        <div className={`px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed whitespace-pre-line ${
                          msg.sender === "user"
                            ? "bg-primary text-white rounded-tr-none shadow-[0_2px_10px_rgba(32,178,166,0.2)]"
                            : "glass rounded-tl-none border border-white/5 text-foreground/95"
                        }`}>
                          {/* Rich Text Parsing Helper */}
                          {msg.text.split("\n").map((line, lIdx) => {
                            // Support simple markdown rendering for bold **text** or email links
                            let elements = [];
                            let textCursor = line;
                            
                            // Bold check
                            const boldRegex = /\*\*(.*?)\*\*/g;
                            let match;
                            let lastIndex = 0;
                            
                            while ((match = boldRegex.exec(line)) !== null) {
                              const before = line.substring(lastIndex, match.index);
                              if (before) elements.push(before);
                              elements.push(
                                <strong key={match.index} className="font-semibold text-primary glow-text">
                                  {match[1]}
                                </strong>
                              );
                              lastIndex = boldRegex.lastIndex;
                            }
                            
                            const after = line.substring(lastIndex);
                            if (after) elements.push(after);

                            // Simple markdown link matching [text](url)
                            const linkRegex = /\[(.*?)\]\((.*?)\)/g;
                            let linkMatch = linkRegex.exec(line);
                            if (linkMatch) {
                              return (
                                <p key={lIdx} className="mb-1">
                                  {line.split(/\[.*?\]\(.*?\)/).map((part, pIdx) => (
                                    <span key={pIdx}>
                                      {part}
                                      {pIdx === 0 && (
                                        <a
                                          href={linkMatch[2]}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
                                        >
                                          {linkMatch[1]} <ExternalLink className="w-3 h-3 inline" />
                                        </a>
                                      )}
                                    </span>
                                  ))}
                                </p>
                              );
                            }

                            return (
                              <p key={lIdx} className="mb-1">
                                {elements.length > 0 ? elements : line}
                              </p>
                            );
                          })}
                        </div>

                        {/* Suggestion Chips printed inside the AI message */}
                        {msg.chips && msg.chips.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {msg.chips.map((chip, cIdx) => (
                              <button
                                key={cIdx}
                                onClick={() => handleChipClick(chip)}
                                className="px-3 py-1.5 rounded-lg bg-surface hover:bg-primary/10 border border-white/5 hover:border-primary/40 text-[11px] font-medium text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-2.5 items-start">
                      <div className="w-8 h-8 rounded-lg bg-surface border border-primary/20 text-primary flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="glass px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* suggestion chips at the top of the input area if chat is active */}
            {!isVerifyingOwner && messages.length > 0 && (
              <div className="px-4 py-2 border-t border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2 bg-black/40">
                {isOwnerMode ? (
                  <>
                    <button
                      onClick={() => handleChipClick("Show Visitor Mode")}
                      className="px-3 py-1 rounded-full bg-highlight/10 hover:bg-highlight/20 border border-highlight/30 text-xs font-semibold text-highlight transition-all cursor-pointer flex items-center gap-1"
                    >
                      Visitor Mode
                    </button>
                    <button
                      onClick={() => handleChipClick("Projects Summary")}
                      className="px-3 py-1 rounded-full bg-surface hover:bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    >
                      Projects
                    </button>
                    <button
                      onClick={() => handleChipClick("Lead Updates")}
                      className="px-3 py-1 rounded-full bg-surface hover:bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    >
                      Leads
                    </button>
                    <button
                      onClick={() => handleChipClick("Clear Chat")}
                      className="px-3 py-1 rounded-full bg-surface hover:bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer text-rose-400"
                    >
                      Clear
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleChipClick("🚀 Technical Skills")}
                      className="px-3 py-1 rounded-full bg-surface hover:bg-primary/10 border border-white/5 hover:border-primary/30 text-xs font-medium text-muted-foreground hover:text-primary transition-all cursor-pointer"
                    >
                      🚀 Skills
                    </button>
                    <button
                      onClick={() => handleChipClick("📁 Show Projects")}
                      className="px-3 py-1 rounded-full bg-surface hover:bg-primary/10 border border-white/5 hover:border-primary/30 text-xs font-medium text-muted-foreground hover:text-primary transition-all cursor-pointer"
                    >
                      📁 Projects
                    </button>
                    <button
                      onClick={() => handleChipClick("💼 Work Experience")}
                      className="px-3 py-1 rounded-full bg-surface hover:bg-primary/10 border border-white/5 hover:border-primary/30 text-xs font-medium text-muted-foreground hover:text-primary transition-all cursor-pointer"
                    >
                      💼 Experience
                    </button>
                    <button
                      onClick={() => handleChipClick("🎓 Education")}
                      className="px-3 py-1 rounded-full bg-surface hover:bg-primary/10 border border-white/5 hover:border-primary/30 text-xs font-medium text-muted-foreground hover:text-primary transition-all cursor-pointer"
                    >
                      🎓 Studies
                    </button>
                    <button
                      onClick={() => handleChipClick("📞 Contact Details")}
                      className="px-3 py-1 rounded-full bg-surface hover:bg-primary/10 border border-white/5 hover:border-primary/30 text-xs font-medium text-muted-foreground hover:text-primary transition-all cursor-pointer"
                    >
                      📞 Contact
                    </button>
                    <button
                      onClick={() => handleChipClick("🔑 Owner Mode")}
                      className="px-3 py-1 rounded-full bg-highlight/10 hover:bg-highlight/20 border border-highlight/20 text-xs font-semibold text-highlight transition-all cursor-pointer"
                    >
                      🔑 Owner Mode
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Chat Input form */}
            {!isVerifyingOwner && (
              <div className="p-3 bg-muted border-t border-primary/20 flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isOwnerMode ? "Enter admin query..." : "Ask about Rohit's projects, skills, experience..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 px-4 py-2.5 bg-surface border border-white/15 focus:border-primary rounded-xl text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white transition-all cursor-pointer shadow-[0_0_10px_rgba(32,178,166,0.2)] flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
