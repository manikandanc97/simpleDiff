const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../components/sections/selected-work.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove FILTER_TABS
content = content.replace(
  'const FILTER_TABS = ["All", "Websites", "Web Apps", "Mobile Apps"] as const;\n\nfunction GoogleIcon() {',
  'function GoogleIcon() {'
);

// 2. Remove activeFilter state and update filteredProjects
content = content.replace(
  `  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.serviceType === activeFilter);

  useEffect(() => {
    if (!filteredProjects.find((p) => p.id === activeId) && filteredProjects.length > 0) {
      setActiveId(filteredProjects[0].id);
    }
  }, [activeFilter, filteredProjects, activeId]);

  const activeProjectIndex = filteredProjects.findIndex((p) => p.id === activeId);`,
  `  const filteredProjects = PROJECTS.filter((p) => p.kind === "client");
  const [activeId, setActiveId] = useState<string>(filteredProjects[0].id);

  const activeProjectIndex = filteredProjects.findIndex((p) => p.id === activeId);`
);

// 3. Update the Header (Remove Tabs UI, Add SVG)
const oldHeaderRegex = /\{\/\* Top Filter Pills & Prev\/Next Arrows \*\/\}[\s\S]*?<\/svg>\n            <\/div>/;
const newHeader = `{/* Top Header: Live Client Site Badge & Prev/Next Arrows */}
            <div className="flex items-center justify-end gap-6 mb-4 relative z-10 min-h-[40px]">
              {/* Handwritten "Live Client Site" badge positioned left of arrows */}
              <div className="hidden sm:flex pointer-events-none items-center gap-2 z-30 select-none mt-1">
                <span className="font-handwriting text-[18px] text-[#922F55] font-bold -rotate-2 tracking-wide drop-shadow-sm">
                  Live Client Site
                </span>
                <svg width="42" height="34" viewBox="0 0 42 34" fill="none" className="text-[#922F55] mt-1 -ml-1 drop-shadow-sm">
                  {/* Arrow pointing downwards towards the browser window */}
                  <path d="M4 4 C 14 10, 24 18, 30 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M22 28 L 30 26 L 32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

              {/* Prev / Next Circular Navigation Buttons */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <button 
                  onClick={handlePrev} 
                  aria-label="Previous Project"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 text-[#121114] hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNext} 
                  aria-label="Next Project"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 text-[#121114] hover:bg-slate-50 transition-colors cursor-pointer active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>`;
content = content.replace(oldHeaderRegex, newHeader);

// 4. Update the Browser Viewport Content
const oldViewportRegex = /<AnimatePresence mode="wait">[\s\S]*?<\/AnimatePresence>/;
const newViewport = `<AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {activeProject.image && (
                      <img 
                        src={activeProject.image}
                        alt={activeProject.name}
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>`;
content = content.replace(oldViewportRegex, newViewport);

// 5. Remove custom preview components
const indexToRemove = content.indexOf('/* ─────────────────────────────────────────────────────────────────────────────');
if (indexToRemove !== -1) {
  content = content.substring(0, indexToRemove);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated selected-work.tsx');
