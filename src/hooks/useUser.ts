import * as React from "react";

import type { UserContextValue } from "@/contexts/UserContext";
import { UserContext } from "@/contexts/UserContext";

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
