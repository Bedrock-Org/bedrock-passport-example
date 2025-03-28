import { BedrockPassportProvider } from "@bedrock_org/passport";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <BedrockPassportProvider
      baseUrl={import.meta.env.VITE_BASE_URL}
      authCallbackUrl={import.meta.env.VITE_CALLBACK_URL}
      tenantId={import.meta.env.VITE_TENANT_ID}
      walletConnectId={import.meta.env.VITE_WALLET_CONNECT_ID}
    >
      {children}
    </BedrockPassportProvider>
  );
};

export default Provider;
