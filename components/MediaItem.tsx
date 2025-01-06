'use client';

import Image from 'next/image';

type Playlist = {
    playlist_id: number;
    playlist_name: string;
};

interface Props {
    data: Playlist; // Dữ liệu playlist
    onClick?: (id: number) => void; // Hàm xử lý khi nhấn vào playlist
}

const imagePaths = [
    '/images/music1/1.png',
    '/images/music1/2.png',
    '/images/music1/3.png',
    '/images/music1/4.png',
    '/images/music1/5.png',
];

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
};

const MediaItem = ({ data, onClick }: Props) => {
    const randomImage = getRandomImage();

    const handleClick = () => {
        if (onClick) {
            return onClick(data.playlist_id); // Gọi hàm onClick nếu được truyền
        }
        // Có thể thêm logic mặc định nếu cần
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    fill
                    src={randomImage} // Ảnh mặc định nếu không có ảnh bìa
                    alt="playlist cover"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.playlist_name}</p>
                <p className="text-neutral-400 text-sm truncate">{'No description'}</p>
            </div>
        </div>
    );
};

export default MediaItem;