import { Icon } from "@iconify/react";

export const NAVIGATIONS = [
  {
    title: "Home",
    link: "/",
    icon: (
      <Icon
        icon="solar:home-2-outline"
        className="size-7 text-gray-500 dark:text-gray-400"
      />
    ),
    activeIcon: (
      <Icon
        icon="solar:home-2-bold"
        className="size-7 text-gray-500 dark:text-gray-400"
      />
    ),
  },
  {
    title: "Events",
    link: "/events",
    icon: (
      <Icon
        icon="solar:calendar-date-outline"
        className="size-7 text-gray-500 dark:text-gray-400"
      />
    ),
    activeIcon: (
      <Icon
        icon="solar:calendar-date-bold"
        className="size-7 text-gray-500 dark:text-gray-400"
      />
    ),
  },
  {
    title: "Hackatons",
    link: "/hackatons",
    icon: (
      <Icon
        icon="solar:compass-outline"
        className="size-7 text-gray-500 dark:text-gray-400"
      />
    ),
    activeIcon: (
      <Icon
        icon="solar:compass-bold"
        className="size-7 text-gray-500 dark:text-gray-400"
      />
    ),
  },
  {
    title: "Testimonials",
    link: "/testimonials",
    icon: (
      <Icon
        icon="solar:hashtag-chat-outline"
        className="size-7 text-gray-500 dark:text-gray-400"
      />
    ),
    activeIcon: (
      <Icon
        icon="solar:hashtag-chat-bold"
        className="size-7 text-gray-500 dark:text-gray-400"
      />
    ),
  },
];
