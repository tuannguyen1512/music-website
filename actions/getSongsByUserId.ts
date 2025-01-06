import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

interface Song {
    song_id: number;
    song_name: string;
    artist_id: number;
    album_id: number;
    genre: string;
    file_url: string;
    artist_name: string; // Không cần optional vì bảng đã có cột này
}
//this function will get the songs from the db based on a specific user id
const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data: sessionData, error: sessionError} = await supabase.auth.getSession()

    if(sessionError){
        console.log(sessionError.message)
        return []
    }

    const { data, error} = await supabase.from('songs').select('*')

    if(error){
        console.log(error.message)
    }
    return (data as any) || []
}

export default getSongsByUserId