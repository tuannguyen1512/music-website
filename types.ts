export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: number;
          username: string;
          password: string;
        };
        Insert: {
          user_id?: number;
          username: string;
          password: string;
        };
        Update: {
          user_id?: number;
          username?: string;
          password?: string;
        };
      };
      favorites: {
        Row: {
          favorite_id: number;
          user_id: number;
          song_id: number;
        };
        Insert: {
          favorite_id?: number;
          user_id: number;
          song_id: number;
        };
        Update: {
          favorite_id?: number;
          user_id?: number;
          song_id?: number;
        };
      };
      playlists: {
        Row: {
          playlist_id: number;
          playlist_name: string;
          user_id: number;
        };
        Insert: {
          playlist_id?: number;
          name: string;
          user_id: number;
        };
        Update: {
          playlist_id?: number;
          name?: string;
          user_id?: number;
        };
      };
      history: {
        Row: {
          history_id: number;
          user_id: number;
          song_id: number;
        };
        Insert: {
          history_id?: number;
          user_id: number;
          song_id: number;
        };
        Update: {
          history_id?: number;
          user_id?: number;
          song_id?: number;
        };
      };
      playlist_songs: {
        Row: {
          playlist_id: number;
          song_id: number;
        };
        Insert: {
          playlist_id: number;
          song_id: number;
        };
        Update: {
          playlist_id?: number;
          song_id?: number;
        };
      };
      song_genres: {
        Row: {
          song_id: number;
          genre_id: number;
        };
        Insert: {
          song_id: number;
          genre_id: number;
        };
        Update: {
          song_id?: number;
          genre_id?: number;
        };
      };
      genres: {
        Row: {
          genre_id: number;
          genre_title: string;
          description: string;
        };
        Insert: {
          genre_id?: number;
          genre_title: string;
          description: string;
        };
        Update: {
          genre_id?: number;
          genre_title?: string;
          description?: string;
        };
      };
      songs: {
        Row: {
          song_id: number;
          song_name: string;
          artist_id: number;
          album_id: number;
          genre: string;
          file_url: string;
          artist_name: string;
        };
        Insert: {
          song_id?: number;
          song_name: string;
          artist_id: number;
          album_id: number;
          genre: string;
          file_url: string;
          artist_name: string;
        };
        Update: {
          song_id?: number;
          song_name?: string;
          artist_id?: number;
          album_id?: number;
          genre?: string;
          file_url?: string;
          artist_name: string;
        };
      };
      albums: {
        Row: {
          album_id: number;
          album_title: string;
          album_image_file: string;
          artist_name: string;
        };
        Insert: {
          album_id?: number;
          album_title: string;
          album_image_file: string;
          artist_name: string;
        };
        Update: {
          album_id?: number;
          album_title?: string;
          album_image_file?: string;
          artist_name?: string;
        };
      };
      artists: {
        Row: {
          artist_id: number;
          artist_name: string;
          artist_url: string;
          artist_website: string;
        };
        Insert: {
          artist_id?: number;
          artist_name: string;
          artist_url: string;
          artist_website: string;
        };
        Update: {
          artist_id?: number;
          artist_name?: string;
          artist_url?: string;
          artist_website?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export interface Subscription {
  id: string;
  user_id: string;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
}
