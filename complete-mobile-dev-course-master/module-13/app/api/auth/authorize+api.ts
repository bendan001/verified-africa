import { BASE_URL, GOOGLE_AUTH_URL, GOOGLE_CLIENT_ID } from "@/constants";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID!,
    redirect_uri: BASE_URL + "/api/auth/callback",
    response_type: "code",
    scope: "openid profile email",
    state: state || "",
    prompt: "select_account",
  });

  return Response.redirect(GOOGLE_AUTH_URL + "?" + params.toString());
}
