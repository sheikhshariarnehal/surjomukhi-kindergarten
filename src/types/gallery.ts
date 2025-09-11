export interface GalleryImage {
  id: string;
  title: string;
  caption?: string;
  image_url: string;
  album: string;
  created_at: string;
}

export interface CreateGalleryImageData {
  title: string;
  caption?: string;
  image_url: string;
  album: string;
}

export interface UpdateGalleryImageData {
  title?: string;
  caption?: string;
  album?: string;
}

export interface GalleryAlbum {
  name: string;
  images: GalleryImage[];
  cover_image?: string;
}

export interface Download {
  id: string;
  title: string;
  file_url: string;
  category: string;
  uploaded_at: string;
}

export interface CreateDownloadData {
  title: string;
  file_url: string;
  category: string;
}

export interface UpdateDownloadData {
  title?: string;
  category?: string;
}
