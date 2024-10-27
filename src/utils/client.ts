"use client";

import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth, onAuthStateInit } from "@/firebase";

import type { User } from "@/types/user";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

// const user = {
//   id: "USER-0001",
//   avatar: "/assets/avatar.png",
//   firstName: "First Name",
//   lastName: "Last Name",
//   email: "user@company.com",
// } satisfies User;

export const NAME_DELIMITER = "|%%|";

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

      await updateProfile(user, {
        displayName: `${firstName}${NAME_DELIMITER}${lastName}`,
      });

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

  async changePassword({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ error?: string }> {
    if (!auth.currentUser) {
      return { error: "User is not signed in" };
    }

    if (!currentPassword || !newPassword) {
      return { error: "Password is empty" };
    }

    if (currentPassword === newPassword) {
      return { error: "New password is the same as the current password" };
    }

    try {
      // Get current user
      const auth = await onAuthStateInit();

      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        auth.email,
        currentPassword,
      );
      await reauthenticateWithCredential(auth, credential);

      // Change password
      await updatePassword(auth, newPassword);
      return {};
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("[DEBUG] Error:", errorCode, errorMessage);

      return { error: errorMessage };
    }
  }

  async resetPassword({
    email,
  }: ResetPasswordParams): Promise<{ error?: string }> {
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      return {};
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("[DEBUG] Error:", errorCode, errorMessage);

      return { error: errorMessage };
    }
  }

  async getUser(): Promise<{ data?: any | null; error?: string }> {
    const token = localStorage.getItem("auth-token");
    // console.log("[DEBUG] token", token);
    const auth = await onAuthStateInit();
    // console.log("[DEBUG] auth", auth);

    if (!token) {
      return { data: null };
    }

    return { data: auth };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem("auth-token");
    auth.signOut();

    return {};
  }
}

export const authClient = new AuthClient();
