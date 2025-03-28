# Bedrock passport integration example

<!--toc:start-->

- [Bedrock passport integration example](#bedrock-passport-integration-example)
  - [How to Install](#how-to-install)
  - [How to integrate](#how-to-integrate)
    - [Configuration Options](#configuration-options)
  - [How to use](#how-to-use) - [Styling available for the panel](#styling-available-for-the-panel) - [Configuration Options](#configuration-options) - [example of using the user hook, check if user is logged in](#example-of-using-the-user-hook-check-if-user-is-logged-in)
  <!--toc:end-->

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
      baseUrl="https://xxx"
      authCallbackUrl="http://xxx"
      tenantId="demo"
      walletConnectId="projectId"
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
  buttonClass="hover:border-blue-500"
  headerClass="justify-center"
  title="Sign in to"
  titleClass="text-xl font-bold"
  logo="https://irp.cdn-website.com/4d865567/dms3rep/multi/bedrockxr-logo-colored-white-type-v1a-20241111.svg"
  logoAlt="Bedrock Passport"
  logoClass="ml-2 md:h-8 h-6"
  showConnectWallet={true}
  walletButtonText="Connect Wallet"
  separatorText="OR"
  separatorTextClass="bg-blue-900 text-gray-500"
  separatorClass="bg-blue-900"
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
