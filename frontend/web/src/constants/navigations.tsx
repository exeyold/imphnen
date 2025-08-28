import { CalendarDate, Compass, HashtagChat, Home } from "@solar-icons/react";

export const NAVIGATIONS = [
  {
    title: "Home",
    link: "/",
    icon: (
      <Home
        className="size-7 text-gray-500 dark:text-gray-400"
        weight="Outline"
      />
    ),
    activeIcon: (
      <Home className="size-7 text-gray-500 dark:text-gray-400" weight="Bold" />
    ),
  },
  {
    title: "Events",
    link: "/events",
    icon: (
      <CalendarDate
        className="size-7 text-gray-500 dark:text-gray-400"
        weight="Outline"
      />
    ),
    activeIcon: (
      <CalendarDate
        className="size-7 text-gray-500 dark:text-gray-400"
        weight="Bold"
      />
    ),
  },
  {
    title: "Hackatons",
    link: "/hackatons",
    icon: (
      <Compass
        className="size-7 text-gray-500 dark:text-gray-400"
        weight="Outline"
      />
    ),
    activeIcon: (
      <Compass
        className="size-7 text-gray-500 dark:text-gray-400"
        weight="Bold"
      />
    ),
  },
  {
    title: "Testimonials",
    link: "/testimonials",
    icon: (
      <HashtagChat
        className="size-7 text-gray-500 dark:text-gray-400"
        weight="Outline"
      />
    ),
    activeIcon: (
      <HashtagChat
        className="size-7 text-gray-500 dark:text-gray-400"
        weight="Bold"
      />
    ),
  },
];
