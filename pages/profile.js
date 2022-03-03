import Layout from "../components/layout/Layout"
import { useContext } from "react"
import { UserContext } from "../lib/context"
import { useRouter } from "next/router"
import Image from "next/image"
import { UserCircleIcon } from "@heroicons/react/outline"

export default function Profile() {
  const { user } = useContext(UserContext)
  const router = useRouter()

  return (
    <Layout>
      {user ? (
        <>
          {user.photoUrl ? (
            <Image src={user.photoUrl} width="25" height="25" />
          ) : (
            <UserCircleIcon className="h-24 w-24" />
          )}
          <div>Email: {user.email}</div>
          <div>Display Name: {user.displayName}</div>
        </>
      ) : (
        <p>Need to be logged in</p>
      )}
    </Layout>
  )
}
