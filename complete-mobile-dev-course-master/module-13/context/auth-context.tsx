import { BASE_URL } from "@/constants";
import {
  AuthRequestConfig,
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import * as jose from "jose";
import * as React from "react";

WebBrowser.maybeCompleteAuthSession();

interface AuthUser {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: AuthUser | null;
  signIn: (provider: "google" | "github") => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  isLoading: false,
});

const config: AuthRequestConfig = {
  clientId: "google",
  scopes: ["openid", "profile", "email"],
  redirectUri: makeRedirectUri(),
  usePKCE: false,
};

const githubConfig: AuthRequestConfig = {
  clientId: "github",
  scopes: ["user:email"],
  redirectUri: makeRedirectUri(),
  usePKCE: false,
};

const discovery: DiscoveryDocument = {
  authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
  tokenEndpoint: `${BASE_URL}/api/auth/token`,
};

const githubDiscovery: DiscoveryDocument = {
  authorizationEndpoint: `${BASE_URL}/api/auth/github-authorize`,
  tokenEndpoint: `${BASE_URL}/api/auth/github-token`,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [provider, setProvider] = React.useState<"google" | "github">("google");

  // Google auth request
  const [googleRequest, googleResponse, googlePromptAsync] = useAuthRequest(
    config,
    discovery,
  );

  // GitHub auth request
  const [githubRequest, githubResponse, githubPromptAsync] = useAuthRequest(
    githubConfig,
    githubDiscovery,
  );

  React.useEffect(() => {
    if (googleResponse?.type === "success") {
      handleAuthResponse(googleResponse.params.code, "google");
    }
    if (githubResponse?.type === "success") {
      handleAuthResponse(githubResponse.params.code, "github");
    }
  }, [googleResponse, githubResponse]);

  React.useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    setIsLoading(true);
    try {
      const storedToken = await SecureStore.getItemAsync("accessToken");

      if (storedToken) {
        const decoded = jose.decodeJwt(storedToken);
        const exp = (decoded as any).exp;
        const now = Math.floor(Date.now() / 1000);

        if (exp && exp > now) {
          setAccessToken(storedToken);
          setUser(decoded as AuthUser);
        }
      }
    } catch (error) {
      console.error("Error restoring session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthResponse = async (
    code: string,
    authProvider: "google" | "github",
  ) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("code", code);

      const endPoint =
        authProvider === "google"
          ? `${BASE_URL}/api/auth/token`
          : `${BASE_URL}/api/auth/github-token`;

      const tokenResponse = await fetch(endPoint, {
        method: "POST",
        body: formData,
      });

      const token = await tokenResponse.json();

      const tokenKey =
        authProvider === "google" ? "accessToken" : "githubAccessToken";

      await SecureStore.setItemAsync(tokenKey, token.access_token);

      setUser(token.user);
      setProvider(authProvider);
    } catch (error) {
      console.error("Error handling auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (authProvider: "google" | "github" = "google") => {
    try {
      setProvider(authProvider);
      if (authProvider === "google") {
        await googlePromptAsync();
      } else {
        await githubPromptAsync();
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const signOut = async () => {
    const tokenKey =
      provider === "google" ? "accessToken" : "githubAccessToken";
    await SecureStore.deleteItemAsync(tokenKey);
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
