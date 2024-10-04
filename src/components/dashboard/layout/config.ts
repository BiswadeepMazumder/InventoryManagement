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
    key: "items",
    title: "Items",
    href: paths.dashboard.items,
    icon: "users",
  },
  {
    key: "orders",
    title: "Orders",
    href: paths.dashboard.orders,
    icon: "plugs-connected",
  },
  {
    key: "suppliers",
    title: "Suppliers",
    href: paths.dashboard.suppliers,
    icon: "plugs-connected",
  },
  {
    key: "account",
    title: "Account",
    href: paths.dashboard.account,
    icon: "user",
  },
  {
    key: "settings",
    title: "Settings",
    href: paths.dashboard.settings,
    icon: "gear-six",
  },
  {
    key: "error",
    title: "Error",
    href: paths.errors.notFound,
    icon: "x-square",
  },
] satisfies NavItemConfig[];
