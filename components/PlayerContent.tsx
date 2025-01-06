'use client'
import { Database } from "@/types";
import LikeButton from "./LikeButton";
import MediaItemSong from "./MediaItemSong";
import {BsPauseFill,BsPlayFill} from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import { BiShare } from 'react-icons/bi';
import useLogHistory from "@/hooks/useLogHistory"; 
import { useUser } from "@/hooks/useUser"; 

type Song = Database["public"]["Tables"]["songs"]["Row"]

const PlayerContent = ({ song }: { song: Song }) => {
    const songUrl = useLoadSongUrl(song)
    const player = usePlayer()
    const [volume, setVolume] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const { user } = useUser();
    const logHistory = useLogHistory();
    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume===0 ? HiSpeakerXMark:HiSpeakerWave

    //play next song
    const onPlayNext = () =>{
        if(player.ids.length===0){
            return
        }
        const currentIndex = player.ids.findIndex((id)=>id===player.activeId) //find current song index in playlist
        const nextSong = player.ids[currentIndex+1] //find next song index in playlist

        if(!nextSong){ //if current song is last song go back to start
            return player.setId(player.ids[0])
        }
        player.setId(nextSong) //else play next song
    }

    //play prev song
    const onPlayPrev = () =>{ //for going back a song
        if(player.ids.length===0){
            return
        }
        const currentIndex = player.ids.findIndex((id)=>id===player.activeId) //find current song index in playlist
        const prevSong = player.ids[currentIndex-1] //find prev song index in playlist

        if(!prevSong){ //if current song is first song go back to end
            return player.setId(player.ids[player.ids.length-1])
        }
        player.setId(prevSong) //else play prev song
    }

    const [play,{pause, sound}] = useSound(songUrl,{
        volume:volume,
        onplay:()=>setIsPlaying(true),
        onend:()=>{setIsPlaying(false), onPlayNext()}, //stop current song and play next song
        onpause:()=>setIsPlaying(false),
        format:['mp3']
    })

    useEffect(()=>{
        sound?.play()
        return () => {
            sound?.unload()
        }
    },[sound])


    //clicking the play button
    const handlePlay = () => {
        if (!isPlaying) {
            play();
            if (user && song.song_id) {
                logHistory({
                    userId: user.id,
                    songId: song.song_id,
                });
            }
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if(volume===0){
            setVolume(1)
        }else{
            setVolume(0)
        }
    }

    // Hàm sao chép liên kết bài hát
    const handleShare = () => {
        if (songUrl) {
            navigator.clipboard.writeText(songUrl)
                .then(() => alert('Đã sao chép liên kết bài hát vào clipboard!'))
                .catch(() => alert('Không thể sao chép liên kết.'));
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItemSong data={song}/>
                    <LikeButton songId={song.song_id}/>
                </div>
            </div>
            {/* <div className="flex md:hidden col-auto w-full justify-end items-center"> {/*mobile play pause button*
                <div onClick={handlePlay} className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'>
                    <Icon size={30} className='text-black'/>
                </div>
            </div> */}
            
            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward size={30} className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={onPlayPrev}/>
                <div className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer' onClick={handlePlay}>
                    <Icon size={30} className='text-black'/>
                </div>
                <AiFillStepForward size={30} className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={onPlayNext}/>
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon className="cursor-pointer" size={34} onClick={toggleMute}/>
                    <Slider value={volume} onChange={(value)=>setVolume(value)}/>
                    
                    <BiShare
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                        onClick={handleShare}
                    />
                </div>
            </div>
        </div>
    )
}

export default PlayerContent