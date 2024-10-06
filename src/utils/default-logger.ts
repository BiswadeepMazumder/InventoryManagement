import { config } from "@/config";
import { createLogger } from "@/utils/logger";

export const logger = createLogger({ level: config.logLevel });
