"use client";

import { Button } from "@packages/ui/button";
import { Moon, Sun } from "@solar-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";
import { LuSunMedium } from "react-icons/lu";

const themes: ("light" | "dark")[] = ["light", "dark"];

export function ThemeSlider() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [index, setIndex] = React.useState(0);

  // Sync with actual theme after mount
  React.useEffect(() => {
    if (mounted && resolvedTheme) {
      setIndex(themes.indexOf(resolvedTheme as "light" | "dark"));
    }
  }, [mounted, resolvedTheme]);

  const handleToggle = () => {
    const nextIndex = (index + 1) % themes.length;
    setIndex(nextIndex);
    setTheme(themes[nextIndex]);
  };

  if (!mounted) {
    // Prevent mismatch during hydration
    return (
      <Button variant="outline" size="icon" className="rounded-full" disabled>
        <LuSunMedium className="size-5 opacity-0" />
      </Button>
    );
  }

  const iconVariants = {
    initial: { opacity: 0, y: 10, rotate: -45, scale: 0.8 },
    animate: { opacity: 1, y: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, y: -10, rotate: 45, scale: 0.8 },
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative overflow-hidden rounded-full"
      onClick={handleToggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={themes[index]}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute flex items-center justify-center"
        >
          {themes[index] === "light" && (
            <Sun
              className="size-5 text-gray-500 dark:text-gray-400"
              weight="Outline"
            />
          )}
          {themes[index] === "dark" && (
            <Moon
              className="size-5 text-gray-500 dark:text-gray-400"
              weight="Outline"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
