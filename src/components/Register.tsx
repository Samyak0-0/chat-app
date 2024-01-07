import { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from './UserContext';


export const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUsername: setLoggedInUsername, setId} : any  = useContext(UserContext)


    const register = async(ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const {data} = await axios.post('/register', {username,password})
        setLoggedInUsername(username)
        setId(data.id)

    }

    return (
        <div className=' w-full h-screen flex items-center justify-center'>
            <div>
                <form onSubmit={register}>
                    <div className='flex flex-col gap-2'>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='username' className='username p-3' />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='password' className='password p-3' />
                    </div>
                    <button className="my-2 border-2 border-white w-full p-3 text-white">Register</button>
                </form>
            </div>
        </div>
    )
}