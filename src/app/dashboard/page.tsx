import { format, subDays } from "date-fns";
import { cookies } from "next/headers";

import { Post } from "../types/post";
import { PostCard } from "./components/post-card";
import CopyPostsData from "./components/copy-posts-data";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token === undefined) {
    redirect("/");
  }

  const today = new Date();
  const sevenDaysBefore = subDays(today, 7);

  const postsUrl = new URL("https://graph.threads.net/v1.0/me/threads");
  postsUrl.searchParams.set(
    "fields",
    "id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post"
  );
  postsUrl.searchParams.set("since", format(sevenDaysBefore, "yyyy-MM-dd"));
  postsUrl.searchParams.set("access_token", token);

  const posts = await fetch(postsUrl);
  const postsJson = await posts.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2">
        近一週的 Threads 帖子 <CopyPostsData posts={postsJson.data} />
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {postsJson.data.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
