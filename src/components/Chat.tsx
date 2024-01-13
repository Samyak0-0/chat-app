import { useEffect, useState } from "react"
import { Svgfunc} from "./UserAvatars"

type Props = {}

const Chat = (props: Props) => {

    const [ws, setWs] = useState({})
    const [onlinePeople, setOnlinePeople] = useState({})

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000')
        console.log(ws)
        setWs(ws)
        ws.addEventListener('message', handleMessage)
    }, [])

    function handleMessage(ev) {
        const messgaeData = JSON.parse(ev.data)
        if ('online' in messgaeData) {
            showOnlinePeople(messgaeData.online)
        }
    }

    const showOnlinePeople = (peopleArray) => {
        const people = {}
        peopleArray.forEach(({ userId, username }) => {
            people[userId] = username
        })
        setOnlinePeople(people)
    }

    return (
        <div className=" flex h-screen w-screen">
            <div className="bg-neutral-700 w-1/3 text-white">
                <div className="py-3 px-2 text-xl font-semibold">Contacts</div>
                <div className="my-2">
                    {Object.keys(onlinePeople).map(userId => (
                        
                        <div className=" border-y-2 border-neutral-600 p-2 flex items-center" key={userId}>
                            <div className="w-1/4 " ><Svgfunc seed={onlinePeople[userId]}/></div>
                            <div className="ml-4">{onlinePeople[userId]}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" bg-slate-200 w-2/3 flex flex-col justify-between">
                <div>messages</div>
                <div className="flex gap-1 mx-2 my-3">
                    <input type="text" name="" id="" className=" w-full  rounded-md " />
                    <button className=" p-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat