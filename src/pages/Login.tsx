import { LoginPanel } from "@bedrock_org/passport";
import "@bedrock_org/passport/dist/style.css";

function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center m-auto">
      <LoginPanel
        buttonClass="hover:border-blue-500"
        headerClass="justify-center"
        logo="https://irp.cdn-website.com/4d865567/dms3rep/multi/bedrockxr-logo-colored-white-type-v1a-20241111.svg"
        title="Sign in to"
        titleClass="text-xl font-bold"
        logoAlt="Orange Web3"
        logoClass="ml-2 md:h-8 h-6"
        panelClass="container p-2 md:p-8 rounded-2xl max-w-[480px]"
        showConnectWallet={true}
        walletButtonText="Connect Wallet"
        separatorText="OR"
        separatorTextClass="bg-blue-900 text-gray-500"
        separatorClass="bg-blue-900"
      />
    </main>
  );
}

export default Login;
