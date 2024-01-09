
type Props = {}

const Chat = (props: Props) => {
    return (
        <div className=" flex h-screen w-screen">
            <div className="bg-neutral-700 w-1/3">Contacts</div>
            <div className=" bg-slate-200 w-2/3 flex flex-col justify-between">
                <div>messages</div>
                <div className="flex gap-1 mx-2 my-3">
                    <input type="text" name="" id="" className=" w-full  rounded-md "/>
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