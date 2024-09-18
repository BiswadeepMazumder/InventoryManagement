"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/firebase";

import type { User } from "@/types/user";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

const user = {
  id: "USER-0001",
  avatar: "/assets/avatar.png",
  firstName: "First Name",
  lastName: "Last Name",
  email: "user@company.com",
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const { firstName, lastName, email, password } = params;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("[DEBUG] User created:", user);

      const token = generateToken();
      localStorage.setItem("auth-token", token);

      return {};
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("[DEBUG] Error:", errorCode, errorMessage);

      return { error: errorMessage };
    }
  }

  async signIn(params: SignInParams): Promise<{ error?: string }> {
    const { email, password } = params;
    if (email !== "user@company.com" || password !== "password") {
      return { error: "Invalid credentials" };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("[DEBUG] User signed in:", user);

      const token = generateToken();
      localStorage.setItem("auth-token", token);

      return {};
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("[DEBUG] Error:", errorCode, errorMessage);

      return { error: errorMessage };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Password reset not implemented" };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem("auth-token");

    return {};
  }
}

export const authClient = new AuthClient();
