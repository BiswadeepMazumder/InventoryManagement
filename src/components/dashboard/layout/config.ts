import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
  {
    key: "overview",
    title: "Overview",
    href: paths.dashboard.overview,
    icon: "chart-pie",
  },
  {
    key: "page1",
    title: "Page 1",
    href: paths.dashboard.settings,
    icon: "users",
  },
  {
    key: "page2",
    title: "Page 2",
    href: paths.dashboard.settings,
    icon: "plugs-connected",
  },
  {
    key: "page3",
    title: "Page 3",
    href: paths.dashboard.settings,
    icon: "gear-six",
  },
  {
    key: "page4",
    title: "Page 4",
    href: paths.dashboard.settings,
    icon: "user",
  },
  {
    key: "error",
    title: "Error",
    href: paths.errors.notFound,
    icon: "x-square",
  },
] satisfies NavItemConfig[];
