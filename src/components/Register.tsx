import { useState } from 'react'

type Props = {}

export const Register = (props: Props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className=' w-full h-screen flex items-center justify-center'>
            <div>
                <form action="">
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='username' className='username' />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='password' className='password' />
                    <button>Register</button>
                </form>
            </div>
        </div>
    )
}