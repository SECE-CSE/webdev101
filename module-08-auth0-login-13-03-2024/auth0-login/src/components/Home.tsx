import {  useAuth0 } from '@auth0/auth0-react'

export default function Home() {
  const { user } = useAuth0()
  return (
    <div>
        <h1>Home</h1>
        <p>Welcome {user?.name}</p> 
    </div>
  )
}