import {
  BASE_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_TOKEN_URL,
  GITHUB_USER_API_URL,
} from "@/constants";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const code = formData.get("code") as string;

    // Exchange code for access token
    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json", // Important: GitHub returns JSON by default
      },
      body: new URLSearchParams({
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        redirect_uri: BASE_URL + "/api/auth/github-callback",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("GitHub token exchange failed:", errorText);
      return Response.json(
        { error: "Failed to exchange code" },
        { status: 400 },
      );
    }

    const tokens = await tokenResponse.json();

    const accessToken = tokens.access_token;

    if (!accessToken) {
      return Response.json(
        { error: "No access token received" },
        { status: 400 },
      );
    }

    const userResponse = await fetch(GITHUB_USER_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json", // GitHub API version
        "User-Agent": "YourAppName", // GitHub requires User-Agent
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("GitHub user API failed:", errorText);
      return Response.json(
        { error: "Failed to fetch user information" },
        { status: 400 },
      );
    }

    const userInfo = await userResponse.json();

    console.log(userInfo);
    const normalizeUser = {
      sub: userInfo.id.toString(),
      name: userInfo.name || userInfo.login,
      email: userInfo.email,
      picture: userInfo.avatar_url,
    };

    return Response.json({
      access_token: accessToken,
      user: normalizeUser,
    });
  } catch (error) {
    console.error("Token error:", error);
    return Response.json({ error: "Authentication failed" }, { status: 500 });
  }
}
