import {  useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'

export default function Home() {
  const [token, setToken] = useState<string>('') 
  const { user, getAccessTokenSilently } = useAuth0()
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {user?.name}</p> 
      <p>{token}</p>
      <button onClick={async () => {
        const token = await getAccessTokenSilently()
        setToken(token)
      }}>Get Token</button>
    </div>
  )
}
