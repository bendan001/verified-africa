import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/constants";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const code = formData.get("code") as string;
    const codeVerifier = formData.get("code_verifier") as string;

    console.log("Exchanging code with Google...");

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: BASE_URL + "/api/auth/callback",
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Google token exchange failed:", errorText);
      return Response.json(
        { error: "Failed to exchange code" },
        { status: 400 },
      );
    }

    const tokens = await tokenResponse.json();
    console.log("Got tokens from Google");

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

    const userInfo = await userResponse.json();

    const normalizeUser = {
      sub: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
    };

    return Response.json({
      access_token: tokens.access_token,
      user: normalizeUser,
    });
  } catch (error) {
    console.error("Token error:", error);
    return Response.json({ error: "Authentication failed" }, { status: 500 });
  }
}
