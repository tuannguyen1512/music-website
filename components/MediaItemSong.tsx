'use client'

import useLoadImage from "@/hooks/useLoadImage"
import usePlayer from "@/hooks/usePlayer"
import { Database } from "@/types"
import Image from "next/image"

interface Song {
    song_id: number;
    song_name: string;
    artist_id: number;
    album_id: number;
    genre: string;
    file_url: string;
    artist_name: string; // Không cần optional vì bảng đã có cột này
}

interface Props{
    data: Song
    onClick?:(id:number) => void
}
const MediaItem = ({data, onClick}:Props) => {

    //getting image from db
    const imageUrl = useLoadImage(data)
    const player = usePlayer()

    const handleClick = () => {
        if(onClick){
            return onClick(data.song_id)
        }

        //default turn on player
        return player.setId(data.song_id)
    }

    //creating the little image and the title and text thing you see on the sidebar
    return (
        <div onClick={handleClick} className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'>
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image fill src={imageUrl || '/images/liked.png'} alt='media item' className="object-cover"/>
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.song_name}</p>
                <p className="text-neutral-400 text-sm truncate">{data.artist_name}</p>
            </div>
        </div>
    )
}

export default MediaItem