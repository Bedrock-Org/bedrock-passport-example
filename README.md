# Orange ID by Bedrock – React (NPM) Integration Example

## How to Install

```bash
npm i @bedrock_org/passport
```

## How to integrate

Wrap your application or router with the bedrock-passport provider

```jsx

import { BedrockPassportProvider } from "@bedrock_org/passport";
...
const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <BedrockPassportProvider
      baseUrl="https://api.bedrockpassport.com" // Base API URL – no need to change this. Leave as is.
      authCallbackUrl="http://<your_url>/auth/callback"  // This page must exist and handle the login callback. Replace <yoururl> with your actual domain.
      tenantId="orange-abc123"  // Your assigned tenant ID - you can request one at https://vibecodinglist.com/orange-id-integration
      walletConnectId="591d21ef88b24c6837599a5c2a0ce03d" // Optional: WalletConnect Project ID. The default is fine, but you can replace it with your own.
    >
      {children}
    </BedrockPassportProvider>
  );
};

```

### Configuration Options

| Parameter         | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `baseUrl`         | The Bedrock Passport API base URL                           |
| `authCallbackUrl` | The URL where users will be redirected after authentication |
| `tenantId`        | Your Bedrock Passport tenant identifier                     |
| `walletConnectId` | Your WalletConnect project ID for wallet connections        |

Create the callback page for handling the token from server

```jsx
function AuthCallback() {
  const { loginCallback } = useBedrockPassport();

  useEffect(() => {
    const login = async (token: string, refreshToken: string) => {
      const success = await loginCallback(token, refreshToken);
      if (success) {
        //redirect to the page you want
        window.location.href = "/";
      }
    };

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const refreshToken = params.get("refreshToken");

    if (token && refreshToken) {
      login(token, refreshToken);
    }
  }, [loginCallback]);

  return <div>Signing in...</div>;
}
```

## How to use

Once you wrapped the application with the provider,
you can start to add in the component and hooks for where you need

```jsx

import { useBedrockPassport, LoginPanel, Button } from "@bedrock_org/passport";
import "@bedrock_org/passport/dist/style.css";

...
<LoginPanel
  panelClass="container p-2 md:p-8 rounded-2xl max-w-[480px]"
  buttonClass="hover:border-orange-500"
  headerClass="justify-center"
  title="Sign in to"
  titleClass="text-xl font-bold"
  logo="https://irp.cdn-website.com/e81c109a/dms3rep/multi/orange-web3-logo-v2a-20241018.svg"
  logoAlt="Orange Web3"
  logoClass="ml-2 md:h-8 h-6"
  showConnectWallet={false}
  walletButtonText="Connect Wallet"
  separatorText="OR"
  separatorTextClass="bg-orange-900 text-gray-500"
  separatorClass="bg-orange-900"
  linkRowClass="justify-center"
/>

```

Use tailwind variable for the class customization: refer to [tailwindcss](https://tailwindcss.com/docs)

[Example Integration](https://github.com/rfl-nftplatform/bedrock-passport-example)

The library is still in development, more features will be added in the future.

### Styling available for the panel

### Configuration Options

| Parameter            | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `panelClass`         | panel styling                                                |
| `buttonClass`        | all button styling                                           |
| `headerClass`        | header styling                                               |
| `title`              | title of the panel                                           |
| `titleClass`         | title styling                                                |
| `logo`               | logo url                                                     |
| `logoAlt`            | logo alt string                                              |
| `logoClass`          | logo styling                                                 |
| `showConnectWallet`  | boolean, false by default                                    |
| `walletButtonText`   | string in wallet button text                                 |
| `walletButtonClass`  | wallet button styling, by default will follow button styling |
| `separatorText`      | text in the middle of separator                              |
| `separatorTextClass` | separator text styling                                       |
| `separatorClass`     | separator styling                                            |

### example of using the user hook, check if user is logged in

```jsx
const { isLoggedIn } = useBedrockPassport();
```
