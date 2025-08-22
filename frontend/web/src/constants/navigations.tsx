import {
  IconBubbleQuotes,
  IconBubbleQuotesFill,
  IconCalendar2,
  IconCalendar2Fill,
  IconCompass,
  IconCompassFill,
  IconHome2,
  IconHome2Fill,
} from "@intentui/icons";

export const NAVIGATIONS = [
  {
    title: "Home",
    link: "/",
    icon: <IconHome2 className="size-6" />,
    activeIcon: <IconHome2Fill className="size-6" />,
  },
  {
    title: "Events",
    link: "/events",
    icon: <IconCalendar2 className="size-6" />,
    activeIcon: <IconCalendar2Fill className="size-6" />,
  },
  {
    title: "Hackatons",
    link: "/hackatons",
    icon: <IconCompass className="size-6" />,
    activeIcon: <IconCompassFill className="size-6" />,
  },
  {
    title: "Testimonials",
    link: "/testimonials",
    icon: <IconBubbleQuotes className="size-6" />,
    activeIcon: <IconBubbleQuotesFill className="size-6" />,
  },
];
