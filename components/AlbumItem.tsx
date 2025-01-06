'use client';

import { useCallback } from 'react';

interface Album {
    album_id: number;
    album_title: string;
    artist_name: string;
    album_image?: string; // URL hình ảnh album nếu có
}

interface Props {
    data: Album; // Thông tin album
    onClick: (id: number) => void; // Hàm xử lý khi click
}

const imagePaths = [
    '/images/music2/1.png',
    '/images/music2/2.png',
    '/images/music2/3.png',
    '/images/music2/4.png',
    '/images/music2/5.png',
    '/images/music2/6.png',
    '/images/music2/7.png'
];

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
};

const AlbumItem = ({ data, onClick }: Props) => {
    const randomImage = getRandomImage();
    
    const handleClick = useCallback(() => {
        onClick(data.album_id);
    }, [data.album_id, onClick]);

    return (
        <div
            onClick={handleClick}
            className="group flex flex-col items-center justify-center rounded-md overflow-hidden bg-neutral-800 cursor-pointer hover:bg-neutral-700 transition p-3"
        >
            <img
                src={randomImage}
                alt={data.album_title}
                className="object-cover w-full h-full rounded-md"
            />
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="text-white font-semibold truncate w-full">{data.album_title}</p>
                <p className="text-neutral-400 text-sm truncate w-full">By {data.artist_name}</p>
            </div>
        </div>
    );
};

export default AlbumItem;