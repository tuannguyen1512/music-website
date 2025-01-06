import { Database } from "@/types";

import usePlayer from "./usePlayer";
//import useSubscribeModal from "./useSubscribeModal";
import { useUser } from "./useUser";

type Song = Database["public"]["Tables"]["songs"]["Row"]
//basically when use clicks the button play current song based on id but also create a playlist of the played songs
const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const { user } = useUser();

  const onPlay = (id: number) => {

    player.setId(id);
    player.setIds(songs.map((song) => song.song_id));
  }

  return onPlay;
};

export default useOnPlay;