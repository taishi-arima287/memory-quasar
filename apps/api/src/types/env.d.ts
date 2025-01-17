declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    // ... other env vars
  }
}
