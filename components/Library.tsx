'use client'

import { useEffect, useState } from 'react';
import {TbPlaylist} from 'react-icons/tb' 
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Database } from '@/types'
import { createClient } from '@supabase/supabase-js';
import MediaItem from './MediaItem'

type Playlist = Database["public"]["Tables"]["playlists"]["Row"]

const supabaseUrl = 'https://rzedkumfprtbvhcgkhzj.supabase.co' // Thay bằng URL Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6ZWRrdW1mcHJ0YnZoY2draHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTY4MTMsImV4cCI6MjA0ODg5MjgxM30.ScYVwLUfqiqZzcYzbKBJINNE4EJaS65BZXulJNvmnAs'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const Library = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

    useEffect(() => {
        if (!user) return; // Nếu không có user, không tải playlists

        const fetchPlaylists = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('playlists')
                .select('playlist_id, playlist_name, playlist_description, cover_image_url, user_id')
                .eq('user_id', user.id); // Chỉ lấy playlist thuộc về user hiện tại

            if (error) {
                console.error('Error fetching playlists:', error);
            } else {
                setPlaylists(data || []);
            }

            setLoading(false);
        };

        fetchPlaylists();
    }, [user]); // Chỉ gọi lại khi trạng thái user thay đổi



    const onClick = () => {
        //if not logged in send to auth 
        if(!user){
            return authModal.onOpen()
        }
        return uploadModal.onOpen()

    }

    return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
                {/*all the weird 'components' are just icons we got from react-icons*/}
                <TbPlaylist size={26} className='text-neutral-400'/>
                <p className='text-neutral-400 font-medium text-md'>Your Library</p>
            </div>
            <AiOutlinePlus onClick={onClick} size={20} className='text-neutral-400 cursor-pointer hover:text-white transition'/> {/*to create the color change once hover effect do hover:text-somecolor and transition, also set the default color too*/}
        </div>
        {/* Danh sách playlists hoặc thông báo */}
        {user ? (
                (
                    <div className="flex flex-col gap-y-2 mt-4 px-3">
                        {playlists.map((playlist) => (
                            <MediaItem
                                key={playlist.playlist_id}
                                data={playlist}
                                onClick={(id) => console.log('Clicked playlist ID:', id)}
                            />
                        ))}
                    </div>
                )
            ) : (
                <div className="text-neutral-400 px-5 mt-4">
                    Log in to see your playlists.
                </div>
            )}
    </div>
  )
}

export default Library