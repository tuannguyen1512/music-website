import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

interface Song {
    song_id: number;
    song_name: string;
    artist_id: number;
    album_id: number;
    genre: string;
    file_url: string;
    artist_name: string; 
}
//this function will get the songs from the db
const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data, error } = await supabase
    .from('songs')
    .select('*')

    if(error){
        console.log(error)
    }

    return (data as any) || []
}

export default getSongs