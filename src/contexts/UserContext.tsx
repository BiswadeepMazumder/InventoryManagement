"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

import { User } from "@/types/user";
import { authClient } from "@/utils/client";
import { logger } from "@/utils/default-logger";

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({
  children,
}: UserProviderProps): React.JSX.Element {
  const [state, setState] = useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState((prev) => ({
          ...prev,
          user: null,
          error: "Something went wrong",
          isLoading: false,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        user: data ?? null,
        error: null,
        isLoading: false,
      }));
    } catch (err) {
      logger.error(err);
      setState((prev) => ({
        ...prev,
        user: null,
        error: "Something went wrong",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    // Check session on mount to see if user is logged in or not
    checkSession().catch((err: unknown) => {
      logger.error(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <UserContext.Provider value={{ ...state, checkSession }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
