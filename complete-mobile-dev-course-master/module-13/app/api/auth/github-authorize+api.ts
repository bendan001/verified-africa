import { BASE_URL, GITHUB_AUTH_URL, GITHUB_CLIENT_ID } from "@/constants";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID!,
    redirect_uri: BASE_URL + "/api/auth/github-callback",
    scope: "user:email", // Request email access
    state: state || "",
  });

  return Response.redirect(GITHUB_AUTH_URL + "?" + params.toString());
}
