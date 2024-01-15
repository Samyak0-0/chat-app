import { useContext, useEffect, useState } from "react"
import { Svgfunc } from "./UserAvatars"
import { UserContext } from "./UserContext"

type Props = {}

const Chat = (props: Props) => {

    const [ws, setWs] = useState({})
    const [onlinePeople, setOnlinePeople] = useState({})
    const [selectedContact, setSelectedContact] = useState<string>()
    const { username }: any = useContext(UserContext)

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
        peopleArray.forEach(({ userId, usernamee }) => {
            people[userId] = usernamee
        })
        setOnlinePeople(people)
    }


    function selectContact(userId: string) {
        setSelectedContact(userId)
    }


    return (
        <div className=" flex h-screen w-screen">
            <div className="bg-neutral-700 w-1/3 text-white flex flex-col">
                <div className="py-3 px-2 text-xl font-semibold h-1/10">Contacts</div>
                <div className="mt-2 flex flex-col h-full ">
                    {Object.keys(onlinePeople).map(userId => (

                        <div onClick={() => selectContact(userId)} className={" border-y-2 border-neutral-600 p-2 flex items-center cursor-pointer" + ((userId === selectedContact) ? " bg-neutral-600" : "")} key={userId}>
                            <div className="" ><Svgfunc seed={onlinePeople[userId]} sizze={0.09 * window.innerHeight} /></div>
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