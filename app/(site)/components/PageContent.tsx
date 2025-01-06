'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import SongItem from "@/components/SongItem"
import useOnPlay from "@/hooks/useOnPlay"

// Supabase client configuration
const supabaseUrl = 'https://rzedkumfprtbvhcgkhzj.supabase.co' // Thay bằng URL Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZWRrdW1mcHJ0YnZoY2draHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTY4MTMsImV4cCI6MjA0ODg5MjgxM30.ScYVwLUfqiqZzcYzbKBJINNE4EJaS65BZXulJNvmnAs'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Song {
    song_id: number;
    song_name: string;
    artist_id: number;
    album_id: number;
    genre: string;
    file_url: string;
    artist_name: string; // Không cần optional vì bảng đã có cột này
}

const PageContent = () => {
    const [songs, setSongs] = useState<Song[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const onPlay = useOnPlay(songs)

    // Hàm trộn danh sách bài hát ngẫu nhiên
    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('songs')
                .select(`
                    song_id,
                    song_name,
                    artist_id,
                    album_id,
                    genre,
                    file_url,
                    artist_name
                `); // Truy vấn các cột cần thiết từ bảng songs

            if (error) {
                console.error("Lỗi khi lấy bài hát:", error.message);
            } else {
                setSongs(data || []);
            }
            setLoading(false);
        };

        fetchSongs();
    }, []);

    if (loading) {
        return <div className="mt-4 text-neutral-400">Đang tải...</div>
    }

    if (songs.length === 0) {
        return <div className="mt-4 text-neutral-400">Không có bài hát nào.</div>
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
            {shuffleArray(songs).slice(0, 5).map((song) => (
                <SongItem key={song.song_id} onClick={() => onPlay(song.song_id)} data={song} />
            ))}
        </div>
    );
}

export default PageContent;