import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Post {
  media_product_type: string;
  media_type: string;
  permalink: string;
  username: string;
  text: string;
  timestamp: string;
  is_quote_post: boolean;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={`https://avatar.vercel.sh/${post.username}.png`}
            />
            <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{post.username}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.timestamp), "PPpp", { locale: zhTW })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-card-foreground">{post.text}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{post.media_product_type}</Badge>
          <Badge variant="secondary">{post.media_type}</Badge>
          {post.is_quote_post && <Badge variant="secondary">引用貼文</Badge>}
        </div>
        <Button variant="outline" size="sm" asChild>
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            查看原帖
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
