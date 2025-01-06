import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getSongs from "./getSongs"

interface Song {
    song_id: number;
    song_name: string;
    artist_id: number;
    album_id: number;
    genre: string;
    file_url: string;
    artist_name: string; // Không cần optional vì bảng đã có cột này
}
//this function will get the songs from the db based on title for the search
const getSongsByTitle = async (title:string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    if(!title){ //no title return all songs
        const allSongs = await getSongs()
        return allSongs
    }

    const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('song_name',`%${title}%`) //find title that matches

    if(error){
        console.log(error)
    }

    return (data as any) || []
}

export default getSongsByTitle