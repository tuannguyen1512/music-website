'use client'

import LikeButton from "@/components/LikeButton"
import MediaItemSong from "@/components/MediaItemSong"
import { useUser } from "@/hooks/useUser"
import { Database } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import useOnPlay from "@/hooks/useOnPlay"

type Song = Database["public"]["Tables"]["songs"]["Row"]

interface Props{
    songs: Song[]
}

const LikedContent = ({songs}:Props) => {
    const router = useRouter()
    const {isLoading, user} = useUser()
    const onPlay = useOnPlay(songs)

    useEffect(()=> {
        if(!isLoading && !user){
            router.replace('/') //not logged in go home
        }
    },[isLoading, user, router])

    if(songs.length === 0){
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No liked songs.</div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song)=>(
                <div className="flex items-center gap-x-4 w-full" key={song.song_id}>
                    <div className="flex-1">
                        <MediaItemSong onClick={(id:number)=>onPlay(id)} data={song}/>
                    </div>
                    <LikeButton songId={song.song_id}/>
                </div>
            ))}
        </div>
    )
}

export default LikedContent