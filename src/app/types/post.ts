export type Post = {
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
  /** video media_type 會有值 */
  thumbnail_url?: string;
};
