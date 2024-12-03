import { redirect } from "next/navigation";

export async function GET() {
  const threadsAuthUrl = "https://threads.net/oauth/authorize";
  const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`;

  const authUrl = new URL(threadsAuthUrl);
  authUrl.searchParams.set("client_id", process.env.CLIENT_ID!);
  authUrl.searchParams.set("redirect_uri", redirectUrl);
  authUrl.searchParams.set("scope", "threads_basic,threads_content_publish");
  authUrl.searchParams.set("response_type", "code");

  redirect(authUrl.toString());
}
