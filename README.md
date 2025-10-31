# Orange ID by Bedrock – React (NPM) Integration Guide

This guide explains how to integrate the Bedrock Passport authentication widget into a React application using the official NPM package.

> ⚠️ **Before You Start**  
>  
> To use the Orange ID widget, you must [create a Project ID and API Key](https://developer.orangeweb3.com/) and **add it as your `tenantId` & `subscriptionKey`** in the configuration.  
> You'll also need to **whitelist your project URLs via the link above** to enable authentication on your domain.

## How to Install

```bash
# React 18 project
npm install @bedrock_org/passport      

# React 19 project
npm install @bedrock_org/passport@next  
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
      authCallbackUrl="https://yourdomain.com/auth/callback" // Replace with your actual callback URL
      tenantId="orange-abc123"  // Your assigned tenant ID - you can request one at https://vibecodinglist.com/orange-id-integration
      subscriptionKey="your_API_Key" // Your assigned API Key - you can request one at https://vibecodinglist.com/orange-id-integration
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
| `subscriptionKey` | Your Bedrock Passport API Key                               |
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
  // Content options — No changes needed unless specific customization is required
  title="Sign in to"
  logo="https://irp.cdn-website.com/e81c109a/dms3rep/multi/orange-web3-logo-v2a-20241018.svg" // keep the Orange Logo
  logoAlt="Orange Web3"
  walletButtonText="Connect Wallet"
  showConnectWallet={false}
  separatorText="OR"

  // Feature toggles — Adjust these based on which login methods you want to support
  features={{
    enableWalletConnect: false,
    enableAppleLogin: true,
    enableGoogleLogin: true,
    enableEmailLogin: false,
   }}

  // Style options — Keep as-is unless UI tweaks are needed
  titleClass="text-xl font-bold"
  logoClass="ml-2 md:h-8 h-6"
  panelClass="container p-2 md:p-8 rounded-2xl max-w-[480px]"
  buttonClass="hover:border-orange-500"
  separatorTextClass="bg-orange-900 text-gray-500"
  separatorClass="bg-orange-900"
  linkRowClass="justify-center"
  headerClass="justify-center"
/>

```

Use tailwind variable for the class customization: refer to [tailwindcss](https://tailwindcss.com/docs)


### Styling available for the panel

### Configuration Options

| Parameter            | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `panelClass`         | Panel styling                                                |
| `buttonClass`        | All button styling                                           |
| `headerClass`        | Header styling                                               |
| `title`              | Title of the panel                                           |
| `titleClass`         | Title styling                                                |
| `logo`               | Logo url                                                     |
| `logoAlt`            | Logo alt string                                              |
| `logoClass`          | Logo styling                                                 |
| `showConnectWallet`  | Boolean, false by default                                    |
| `walletButtonText`   | String in wallet button text                                 |
| `walletButtonClass`  | Wallet button styling, by default will follow button styling |
| `separatorText`      | Text in the middle of separator                              |
| `separatorTextClass` | Separator text styling                                       |
| `separatorClass`     | Separator styling                                            |
| `linkRowClass`       | Styling for the row containing login links                   |

### Example of Using the User Hook – Check if User is Logged In

```jsx
const { isLoggedIn } = useBedrockPassport();
```

### Logout Implementation with JWT Token

If you want to invalidate the server session, **POST** `https://api.bedrockpassport.com/api/v1/auth/logout` with `Authorization: Bearer <accessToken>`, then call `signOut()` to clear client state. Store `token`/`refreshToken` during the auth callback so the access token is available.

```jsx
import { useBedrockPassport } from "@bedrock_org/passport";

const { signOut } = useBedrockPassport();

const handleLogout = async () => {
  try {
    const accessToken =
      localStorage.getItem("bedrock:accessToken") ||
      sessionStorage.getItem("bedrock:accessToken");
    if (accessToken) {
      await fetch("https://api.bedrockpassport.com/api/v1/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  } catch {
    // ignore network errors; still clear client state
  }

  await signOut();

  try {
    localStorage.removeItem("bedrock:accessToken");
    localStorage.removeItem("bedrock:refreshToken");
    sessionStorage.removeItem("bedrock:accessToken");
    sessionStorage.removeItem("bedrock:refreshToken");
  } catch {}
};
```

## 📦 User Object Returned After Login

When a user logs in successfully using Bedrock Passport, you can access a structured user object like the following:

```json
{
  "id": "clf8138x000045o01a4p2ajpi",
  "email": "testuser@example.com",
  "name": "Test User",
  "displayName": "testname",
  "bio": "This is a sample biography.",
  "picture": "https://cdn.example.com/images/sample_user.png",
  "banner": "https://cdn.example.com/images/sample_user_banner.png",
  "ethAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "provider": "google",
  "createdAt": "2025-04-07T06:21:36.674Z"
}
```

### Explanation of Fields

| Key           | Description                                                                                                                      |
|---------------|----------------------------------------------------------------------------------------------------------------------------------|
| `id`          | Unique Orange ID for the user.                                                                                                   |
| `email`       | User's email address.                                                                                                            |
| `name`        | Full name from the provider.                                                                                                     |
| `displayName` | User-chosen display name. (Can be updated at [vibecodinglist.com/profile](https://vibecodinglist.com/profile))                     |
| `bio`         | A brief biography of the user.                                                                                                   |
| `picture`     | URL to the user's profile picture. (Can be updated at [vibecodinglist.com/profile](https://vibecodinglist.com/profile))             |
| `banner`      | URL to the user's banner image. (Can be updated at [vibecodinglist.com/profile](https://vibecodinglist.com/profile))                |
| `ethAddress`  | Ethereum wallet address (if connected).                                                                                          |
| `provider`    | Login method used (e.g., `google`, `apple`, `wallet`).                                                                           |
| `createdAt`   | Timestamp of account creation.                                                                                                   |


## Server-Side Token Verification (Important for Custom Backends)

After a user logs in with Orange ID, your app receives a **JWT (token)** that represents the authenticated user. If you're passing this token to a backend service (e.g. to fetch user-specific data), it's important to **verify that the token is valid and untampered**.

To do this, your backend can call:

```
GET https://api.bedrockpassport.com/api/v1/auth/user
```

Pass the JWT as a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

If the token is valid, the endpoint will return the user’s profile. If it's invalid or forged, it will return a `401 Unauthorized` response.

> This is the recommended approach for verifying tokens until Bedrock publishes a **JWKS endpoint** that will allow local verification using standard JWT libraries (coming soon).



## 🛠 Troubleshooting

- **Widget not appearing?**  
  Open your browser's developer tools and check for missing scripts or React errors.

- **Authentication callback not working?**  
  Verify that `authCallbackUrl` matches the one registered on the platform and that URL parameters (`token` and `refreshToken`) are handled correctly.

- **Styling issues?**  
  Ensure Tailwind CSS is loaded or replace the class names with your custom CSS definitions.

---

You're now ready to integrate Orange ID by Bedrock into your React application!
