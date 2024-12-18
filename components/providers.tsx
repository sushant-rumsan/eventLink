"use client";

import { config } from "@/app/wagmi.config";
import { WagmiConfig } from "wagmi";

// const config = createConfig(
//   getDefaultConfig({
//     appName: "Event Management DApp",
//     projectId: "YOUR_PROJECT_ID", // Get this from WalletConnect Cloud
//     chains: [mainnet, sepolia],
//   })
// );

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
