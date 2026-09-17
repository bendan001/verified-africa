export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  return Response.json({query})
}


