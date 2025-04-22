"use client";

import { PrivyProvider as BasePrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BasePrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["wallet", "twitter"],
        appearance: {
          theme: "#111927",
          accentColor: "#0CAEE4",
          logo: "/images/brand.png",
          walletChainType: "solana-only",
          walletList: ["detected_solana_wallets", "phantom", "solflare"],
        },
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors(),
          },
        },
        solanaClusters: [
          {
            name: "devnet",
            rpcUrl: `https://devnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUM_API_KEY}`,
          },
        ],
        embeddedWallets: {
          showWalletUIs: false,
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
      }}
    >
      {children}
    </BasePrivyProvider>
  );
}
