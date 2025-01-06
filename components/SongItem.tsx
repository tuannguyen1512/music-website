'use client'

import useLoadImage from "@/hooks/useLoadImage"
import { Database } from "@/types"
import Image from "next/image"
import PlayButton from "./PlayButton"

type Song = Database["public"]["Tables"]["songs"]["Row"]

interface Props{
    data:Song
    onClick: (file_url:string)=>void
}

const imagePaths = [
    '/images/music1/1.png',
    '/images/music1/2.png',
    '/images/music1/3.png',
    '/images/music1/4.png',
    '/images/music1/5.png',
    '/images/music1/6.png',
    '/images/music1/7.png',
    '/images/music1/8.png',
    '/images/music1/9.png',
    '/images/music1/10.png',
];

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
};

const SongItem = ({data,onClick}:Props) => {
    const randomImage = getRandomImage();

    const imagePath = useLoadImage(data) //getting the specific path for the image

    return (
        <div onClick={()=>onClick(data.file_url)} className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'>
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image className="object-cover" src={randomImage} alt='cover' fill/>
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="font-semibold truncate w-full">{data.song_name}</p>
                <p className="text-neutral-400 text-sm pb-4 w-full truncate">By {data.artist_name}</p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton/>
            </div>
        </div>
    )
}

export default SongItem