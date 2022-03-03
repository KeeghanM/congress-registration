import Layout from "../components/layout/Layout"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { useRouter } from "next/router"
import { auth } from "../../chess-training-app/lib/firebase"

export default function Login() {
  return (
    <Layout>
      <div className="max-w-xs">
        <EmailPasswordForm />
        <p>Or</p>
        <GoogleSigninButton />
      </div>
    </Layout>
  )
}

function EmailPasswordForm(e) {
  const router = useRouter()

  const loginWithEmailAndPassword = (e) => {
    e.preventDefault()

    let form = e.target
    let email = form["login-email"].value
    let password = form["login-password"].value

    console.log({ email, password })

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/profile")
      })
      .catch((error) => {
        if (error.code == "auth/user-not-found") {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              let user = userCredential.user
              setDoc(doc(firestore, "users", user.uid), {
                email: user.email,
              })
                .then(() => {
                  router.push("/profile")
                })
                .catch((error) => {
                  console.log(error.message)
                })
            })
            .catch((error) => {
              console.log(error.message)
            })
        } else {
          if (error.code == "auth/wrong-password") {
            let message = document.querySelector("#login-error")
            message.innerHTML = "Incorrect Password"
            message.hidden = false
          } else {
            console.log(error.message)
          }
        }
      })
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={loginWithEmailAndPassword}>
      <div className="flex items-center justify-between">
        <label htmlFor="login-email">Email:</label>
        <input
          required
          type="email"
          name="login-email"
          id="login-email"
          className="border"
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="login-password">Password:</label>
        <input
          required
          type="password"
          name="login-password"
          id="login-password"
          className="border"
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-gray-200 px-4 py-2 hover:bg-gray-400">
          Login / Register
        </button>
      </div>
    </form>
  )
}

function GoogleSigninButton() {
  const router = useRouter()
  const provider = new GoogleAuthProvider()
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userRef = doc(firestore, "users", result.user.uid)
        setDoc(userRef, {}, { merge: true })
        router.push("/profile")
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <button
      className="bg-gray-200 px-4 py-2 hover:bg-gray-400"
      onClick={loginWithGoogle}
    >
      Sign In With Google
    </button>
  )
}
