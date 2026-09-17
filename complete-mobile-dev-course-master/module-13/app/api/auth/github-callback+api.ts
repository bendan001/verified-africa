export async function GET(request: Request) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    const redirectUri = "module13://?error=" + encodeURIComponent(error);
    return Response.redirect(redirectUri);
  }

  const redirectUri = "module13://";

  const params = new URLSearchParams({
    code: code || "",
    state: state || "",
  });

  return Response.redirect(redirectUri + "?" + params.toString());
}
