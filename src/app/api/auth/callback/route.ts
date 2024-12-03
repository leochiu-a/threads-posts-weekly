import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 500 }
    );
  }

  try {
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;

    const url = new URL("https://graph.threads.net/oauth/access_token");
    url.searchParams.set("client_id", process.env.CLIENT_ID!);
    url.searchParams.set("client_secret", process.env.CLIENT_SECRET!);
    url.searchParams.set("grant_type", "authorization_code");
    url.searchParams.set("redirect_uri", redirectUrl);
    url.searchParams.set("code", code);

    const tokenResponse = await fetch(url);
    const tokenResponseJson = await tokenResponse.json();
    const { access_token, user_id } = tokenResponseJson;

    const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;
    const response = NextResponse.redirect(dashboardUrl);
    const in1Hour = new Date(Date.now() + 60 * 60 * 1000);
    response.cookies.set("access_token", access_token, { expires: in1Hour });
    response.cookies.set("user_id", user_id, { expires: in1Hour });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to exchange code for token" },
      { status: 500 }
    );
  }
}
