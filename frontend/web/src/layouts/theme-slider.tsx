"use client";

import { Button } from "@packages/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";
import { LuMonitor, LuMoonStar, LuSunMedium } from "react-icons/lu";

const themes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];

export function ThemeSlider() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (mounted && theme) {
      setIndex(themes.indexOf(theme as "light" | "dark" | "system"));
    }
  }, [mounted, theme]);

  const handleToggle = () => {
    const nextIndex = (index + 1) % themes.length;
    setIndex(nextIndex);
    setTheme(themes[nextIndex]);
  };

  if (!mounted) {
    // Prevent mismatch during hydration
    return (
      <Button variant="outline" size="icon" className="rounded-full" disabled />
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
          {themes[index] === "light" && <LuSunMedium className="size-5" />}
          {themes[index] === "dark" && <LuMoonStar className="size-5" />}
          {themes[index] === "system" && <LuMonitor className="size-5" />}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
