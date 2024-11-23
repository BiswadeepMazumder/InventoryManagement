import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
  {
    key: "overview",
    title: "Overview",
    href: paths.dashboard.overview,
    icon: "overview",
  },
  {
    key: "items",
    title: "Items",
    href: paths.dashboard.items,
    icon: "items",
  },
  {
    key: "orders",
    title: "Orders",
    href: paths.dashboard.orders,
    icon: "orders",
  },
  {
    key: "suppliers",
    title: "Suppliers",
    href: paths.dashboard.suppliers,
    icon: "suppliers",
  },
  {
    key: "account",
    title: "Account",
    href: paths.dashboard.account,
    icon: "account",
  },
  {
    key: "settings",
    title: "Settings",
    href: paths.dashboard.settings,
    icon: "settings",
  },
  // {
  //   key: "error",
  //   title: "Error",
  //   href: paths.errors.notFound,
  //   icon: "x-square",
  // },
] satisfies NavItemConfig[];
