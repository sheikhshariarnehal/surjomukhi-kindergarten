export interface Notice {
  id: string;
  title: string;
  slug: string;
  content: string;
  publish_date: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNoticeData {
  title: string;
  slug: string;
  content: string;
  publish_date?: string;
  file_url?: string;
}

export interface UpdateNoticeData {
  title?: string;
  slug?: string;
  content?: string;
  publish_date?: string;
  file_url?: string;
}

export interface NoticeListItem {
  id: string;
  title: string;
  slug: string;
  publish_date: string;
  file_url?: string;
}
