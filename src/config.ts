import { getSiteURL } from "@/utils/get-site-url";
import { LogLevel } from "@/utils/logger";

export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
  logLevel: keyof typeof LogLevel;
}

export const config: Config = {
  site: {
    name: "Inventory Management",
    description: "Inventory Management",
    themeColor: "#090a0b",
    url: getSiteURL(),
  },
  logLevel:
    (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ??
    LogLevel.ALL,
};

export const LIMIT_ADD_QUANTITY_ORDER_ITEMS = 1000;
