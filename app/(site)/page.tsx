import getSongs from "@/actions/getSongs"
import Header from "@/components/Header"
import ListItem from "@/components/ListItem"
import PageContent from "./components/PageContent"
import AlbumsContent from "./components/AlbumsContent"

export const revalidate = 0

export default async function Home() {

  const songs = await getSongs() //get all the songs from the db

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image='/images/like1.png' name='Đã thích' href='liked'/>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem image='/images/history.png' name='Mới phát gần đây' href='history' />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="fle justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Dành cho bạn</h1>
        </div>
        <div>
          <PageContent />
        </div>
        <div className="fle justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Bài hát mới nhất</h1>
        </div>
        <div>
          <PageContent />
        </div>
        <div className="fle justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Album mới nhất </h1>
        </div>
        <div>
          <AlbumsContent />
        </div>
      </div>
    </div>
  )
}
