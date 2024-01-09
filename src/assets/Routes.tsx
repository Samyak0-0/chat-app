
import RegisterAndLogin from '../components/RegisterAndLogin'
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

type Props = {}

export default function Routes({}: Props) {

    const {username, id}: any = useContext(UserContext)

    if(username) {
        return 'logged in'
    }
    
  return (
    <RegisterAndLogin />
  )
}