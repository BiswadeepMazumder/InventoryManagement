export const paths = {
  home: "/",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    overview: "/dashboard",
    items: "/dashboard/items",
    orders: "/dashboard/orders",
    suppliers: "/dashboard/suppliers",
    account: "/dashboard/account",
    settings: "/dashboard/settings",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
