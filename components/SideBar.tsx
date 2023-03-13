'use client'

import { collection, query, orderBy } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"
import NewChat from "./NewChat"
import { db } from "../firebase"
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {

    const {data: session} = useSession();

    const [chats, loading, error] = useCollection(
        session && 
        query(
            collection(db, 'users', session.user?.email!, 'chats'), 
            orderBy('createdAt','asc')
        )
    );

    return (
        <div className="p-2 flex flex-col h-screen xs:h-[100svh]">
            <div className="flex-1">
                <div>
                    <NewChat />

                    {loading && (
                        <div className="animate-pulse text-center text-white my-2">
                            Loading chats...
                        </div>)
                    }


                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}
                </div>
            </div>
            
            <div className="xs:hidden">
                        <ModelSelection />
            </div>

            {session && 
            ( 
            <button className="chatRow" onClick={() => signOut()}>
                <img src={session.user?.image!} alt='Profile Logo' className="h-10 w-10 rounded-full mr-2 xs:hidden"/>
                <p className="xs:mx-auto">Sign Out</p>
            </button>
            )}
        </div>
    )
}

export default SideBar