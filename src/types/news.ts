export interface News {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  publish_date: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNewsData {
  title: string;
  excerpt?: string;
  content: string;
  publish_date?: string;
  image_url?: string;
}

export interface UpdateNewsData {
  title?: string;
  excerpt?: string;
  content?: string;
  publish_date?: string;
  image_url?: string;
}

export interface NewsListItem {
  id: string;
  title: string;
  excerpt?: string;
  publish_date: string;
  image_url?: string;
}
