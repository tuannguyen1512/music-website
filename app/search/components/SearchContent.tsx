'use client'

import MediaItemSong from "@/components/MediaItemSong"
import { Database } from "@/types"
import LikeButton from "@/components/LikeButton"
import useOnPlay from "@/hooks/useOnPlay"

type Song = Database["public"]["Tables"]["songs"]["Row"]

interface Props{
    songs:Song[]
}
const SearchContent = ({songs}:Props) => {

    const onPlay = useOnPlay(songs)

    if(songs.length===0){
        return(
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No songs found.</div>
        )
    }
    
    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song)=>(
                <div className="flex items-center gap-x-4 w-full" key={song.song_id}>
                    <div className="flex-1">
                        <MediaItemSong onClick={(id:number)=>onPlay(id)} data={song}/>
                    </div>
                    {/*add like button here*/}
                    <LikeButton songId={song.song_id}/>
                </div>
            ))}
        </div>
    )
}

export default SearchContent