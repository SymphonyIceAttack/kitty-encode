"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, List } from "lucide-react";
import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({
  items,
  className = "",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const getIndentClass = (level: number) => {
    switch (level) {
      case 2:
        return "pl-4";
      case 3:
        return "pl-8";
      case 4:
        return "pl-12";
      default:
        return "pl-0";
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile TOC Button */}
      <motion.button
        type="button"
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <List className="w-6 h-6" />
      </motion.button>

      {/* Mobile TOC Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed right-0 top-0 h-full w-80 bg-background border-l shadow-xl z-50 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Table of Contents</h3>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
                <nav className="space-y-2">
                  {items.map((item, index) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      className={`block w-full text-left py-2 px-3 rounded-md text-xs transition-colors ${
                        activeId === item.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      } ${getIndentClass(item.level)}`}
                      onClick={() => scrollToHeading(item.id)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-2">
                        {item.level > 2 && (
                          <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        )}
                        <span className="truncate">{item.title}</span>
                      </div>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop TOC */}
      <motion.aside
        className={`hidden lg:block w-64 flex-shrink-0 sticky top-6 self-start h-[80vh] overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-muted/30 rounded-lg p-4 h-full overflow-y-auto">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 sticky top-0 bg-muted/30 py-2">
            Table of Contents
          </h3>
          <nav className="space-y-1">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className={`block w-full text-left py-1.5 px-3 rounded-md text-xs transition-colors ${
                  activeId === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                } ${getIndentClass(item.level)}`}
                onClick={() => scrollToHeading(item.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-2">
                  {item.level > 2 && (
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  )}
                  <span className="truncate">{item.title}</span>
                </div>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
}
