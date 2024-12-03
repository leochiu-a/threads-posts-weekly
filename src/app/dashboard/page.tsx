import { cookies } from "next/headers";

type Post = {
  id: string;
  media_product_type: string;
  media_type: string;
  permalink: string;
  owner: { id: string };
  username: string;
  text: string;
  timestamp: string;
  shortcode: string;
  is_quote_post: boolean;
};

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const postsUrl = new URL("https://graph.threads.net/v1.0/me/threads");
  postsUrl.searchParams.set(
    "fields",
    "id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post"
  );
  postsUrl.searchParams.set("since", "2023-10-15");
  postsUrl.searchParams.set("access_token", token!);

  const posts = await fetch(postsUrl).then((res) => res.json());

  return (
    <div>
      {posts.data.map((post: Post) => (
        <div key={post.id}>
          <div>{post.media_product_type}</div>
          <div>{post.media_type}</div>
          <div>{post.permalink}</div>
          <div>{post.username}</div>
          <div>{post.text}</div>
          <div>{post.timestamp}</div>
          <div>{post.is_quote_post ? "true" : "false"}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
