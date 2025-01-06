import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song || !song.song_id) {
    return ''; // Nếu không có bài hát hoặc song_id, trả về chuỗi rỗng
  }

  // Tạo đường dẫn tệp dựa trên song_id
  const filePath = `songs/${song.song_id}.mp3`;

  // Lấy URL công khai từ Supabase Storage
  const { data: songData } = supabaseClient.storage.from('songs').getPublicUrl(filePath);

  return songData?.publicUrl || ''; // Trả về URL công khai hoặc chuỗi rỗng nếu thất bại
};

export default useLoadSongUrl;