import { HiBeaker, HiCalendar, HiChat, HiHome } from "react-icons/hi";

export const NAVIGATIONS = [
  {
    title: "Home",
    link: "/",
    icon: <HiHome className="size-6" />,
  },
  {
    title: "Events",
    link: "/events",
    icon: <HiCalendar className="size-6" />,
  },
  {
    title: "Hackatons",
    link: "/hackatons",
    icon: <HiBeaker className="size-6" />,
  },
  {
    title: "Testimonials",
    link: "/testimonials",
    icon: <HiChat className="size-6" />,
  },
];
