'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import AlbumItem from '@/components/AlbumItem'; // Import AlbumItem component

// Supabase client configuration
const supabaseUrl = 'https://rzedkumfprtbvhcgkhzj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZWRrdW1mcHJ0YnZoY2draHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTY4MTMsImV4cCI6MjA0ODg5MjgxM30.ScYVwLUfqiqZzcYzbKBJINNE4EJaS65BZXulJNvmnAs';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Album {
    album_id: number;
    album_title: string;
    artist_name: string
}

// Hàm trộn ngẫu nhiên
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const AlbumsContent = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('albums')
                .select(`
                    album_id,
                    album_title,
                    artist_name
                `); // Truy vấn các cột từ bảng albums

            if (error) {
                console.error('Lỗi khi lấy album:', error.message);
            } else {
                // Trộn ngẫu nhiên và lấy 6 album
                const shuffledAlbums = shuffleArray(data || []).slice(0, 6);
                setAlbums(shuffledAlbums);
            }
            setLoading(false);
        };

        fetchAlbums();
    }, []);

    if (loading) {
        return <div className="mt-4 text-neutral-400">Đang tải...</div>;
    }

    if (albums.length === 0) {
        return <div className="mt-4 text-neutral-400">Không có album nào.</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
            {albums.map((album) => (
                <AlbumItem
                    key={album.album_id}
                    data={album}
                    onClick={(album_id) => console.log('Album clicked:', album_id)} // Xử lý sự kiện click
                />
            ))}
        </div>
    );
};

export default AlbumsContent;