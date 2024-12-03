"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Post } from "@/app/types/post";
import { Button } from "@/components/ui/button";

const CopyPostsData = ({ posts }: { posts: Post[] }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      JSON.stringify(
        posts
          .filter((post) => post.media_type !== "REPOST_FACADE")
          .map((post) => ({
            text: post.text,
            url: post.permalink,
          }))
      )
    );
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <Button onClick={handleCopy} variant="ghost">
        <Copy />
      </Button>
    </>
  );
};

export default CopyPostsData;
