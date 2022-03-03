import {
  SearchIcon,
  BookmarkIcon,
  CashIcon,
  BookOpenIcon,
  PlusCircleIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/outline"
import Link from "next/link"
export default function Sidebar() {
  let user = { name: "Keeghan McGarry" }

  return (
    <aside className="absolute h-full w-64 overflow-y-auto bg-gray-600 p-6 text-gray-200">
      <div className="pb-6 text-center ">
        <h1 className="text-2xl font-bold text-orange-400">
          ChessCongress.app
        </h1>
        <p className="italic">Manage all your chess congresses online</p>
      </div>
      <Link href="/">
        <div className="flex flex-row items-center gap-2 pb-2 hover:cursor-pointer hover:text-orange-600">
          <HomeIcon className="h-5 w-5" />
          Home
        </div>
      </Link>
      <hr />
      <h3 className="pb-2 font-bold text-orange-400">Player Menu</h3>
      <Link href="/profile">
        <div className="flex flex-row items-center gap-2 pb-2 hover:cursor-pointer hover:text-orange-600">
          <UserIcon className="h-5 w-5" />
          {user.name}
        </div>
      </Link>
      <ul>
        <Link href="/find-a-congress">
          <li className="flex flex-row items-center gap-2 pb-2 hover:cursor-pointer hover:text-orange-600">
            <SearchIcon className="h-5 w-5" />
            Find a congress
          </li>
        </Link>
        <Link href="/upcoming-congress">
          <li className="flex flex-row items-center gap-2 pb-2 hover:cursor-pointer hover:text-orange-600">
            <BookmarkIcon className="h-5 w-5" />
            Upcoming Congresses
          </li>
        </Link>
        <Link href="/payment-history">
          <li className="flex flex-row items-center gap-2 pb-2 hover:cursor-pointer hover:text-orange-600">
            <CashIcon className="h-5 w-5" />
            Payment History
          </li>
        </Link>
      </ul>
      <hr />
      <h3 className="pb-2 font-bold text-orange-400">Organiser Menu</h3>
      <ul>
        <Link href="/manage-congresses">
          <li className="flex flex-row items-center gap-2 pb-2 hover:cursor-pointer hover:text-orange-600">
            <BookOpenIcon className="h-5 w-5" />
            Manage Congresses
          </li>
        </Link>
        <Link href="/add-congress">
          <li className="flex flex-row items-center gap-2 pb-2 hover:cursor-pointer hover:text-orange-600">
            <PlusCircleIcon className="h-5 w-5" />
            Create Congress
          </li>
        </Link>
      </ul>
    </aside>
  )
}
