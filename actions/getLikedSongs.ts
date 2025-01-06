import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

type FavoriteSong = Database["public"]["Tables"]["favorites"]["Row"]

//this function will get the liked songs from the db
const getLikedSongs = async (): Promise<FavoriteSong[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {
        data:{
            session
        }
    } = await supabase.auth.getSession()


    const { data, error } = await supabase
    .from('favorites')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)

    if(error){
        console.log(error)
        return []
    }

    if(!data){
        return []
    }

    return data.map((song)=>({
        ...song.songs
    }))
}

export default getLikedSongs