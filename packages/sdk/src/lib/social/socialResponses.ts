interface Paging {
  before: string;
  after: string;
}

interface FeedBase {
  paging: Paging;
}

export interface FacebookPost {
  id: string;
  actions?: object;
  admin_creator?: object;
  allowed_advertising_objects?: string;
  application?: object;
  attachments?: object;
  backdated_time?: number;
  call_to_action?: object;
  can_reply_privately?: boolean;
  child_attachments?: object;
  created_time?: number;
  feed_targeting?: object;
  from?: object;
  full_picture?: string;
  icon?: string;
  instagram_eligibility?:
    | "ineligible_caption_mentions_not_allowed"
    | "ineligible_caption_too_long"
    | "ineligible_media_aspect_ratio"
    | "ineligible_media_dimension"
    | "ineligible_media_square_aspect_ratio"
    | "ineligible_media_square_dimension"
    | "ineligible_post_type"
    | "ineligible_unknown_error"
    | "ineligible_video_length";
  is_eligible_for_promotion?: boolean;
  is_expired?: boolean;
  is_hidden?: boolean;
  is_instagram_eligible?: string;
  is_popular?: boolean;
  is_published?: boolean;
  is_spherical?: boolean;
  message?: string;
  message_tags?: Array<string>;
  parent_id?: string;
  permalink_url?: string;
  place?: string;
  privacy?: object;
  promotable_id?: string;
  properties?: object;
  sheduled_publish_time?: number;
  shares?: object;
  status_type?:
    | "added_photos"
    | "added_video"
    | "app_created_story"
    | "approved_friend"
    | "created_event"
    | "created_group"
    | "created_note"
    | "mobile_status_update"
    | "published_story"
    | "shared_story"
    | "tagged_in_photo"
    | "wall_post";
  story?: string;
  story_tags?: Array<string>;
  subscribed?: boolean;
  targeting?: object;
  type?: "link" | "offer" | "photo" | "status" | "video";
  updated_time: number;
  video_buying_eligibility: Array<string>;
  with_tag: object;
}

export interface InstagramPost {
  id: string;
  caption?: string;
  comments_count?: string;
  ig_id?: string;
  is_comment_enabled?: string;
  like_count?: string;
  media_product_type?: string;
  media_type?: string;
  media_url?: string;
  owner?: string;
  permalink?: string;
  shortcode?: string;
  thumbnail_url?: string;
  timestamp?: string;
  username?: string;
  video_title?: string;
}

export interface FacebookFeed extends FeedBase {
  data: Array<FacebookPost>;
}
export interface InstagramFeed extends FeedBase {
  data: Array<InstagramPost>;
}
