import { User as FirebaseUser } from "@firebase/auth";

// export interface User {
//   id: string;
//   name?: string;
//   avatar?: string;
//   email?: string;
//
//   [key: string]: unknown;
// }

export type User = FirebaseUser;
