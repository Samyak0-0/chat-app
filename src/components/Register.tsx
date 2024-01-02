import { useState } from 'react'
import axios from 'axios';

type Props = {}

export const Register = (props: Props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const register = async(ev: Event) => {
        ev.preventDefault()
      const response = await axios.post('/register', {username,password})  
    }

    return (
        <div className=' w-full h-screen flex items-center justify-center'>
            <div>
                <form action="" onSubmit={register}>
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