import { useEffect } from "react";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase"

type ChatRowProps = {
    id: string;
}

function ChatRow({id}: ChatRowProps) {

    const pathName = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(
        collection(db,'users', session?.user?.email!,'chats', id,'messages')
    )

    useEffect(() => {
        if (!pathName) return;

        setActive(pathName.includes(id));
    }, [pathName])

    const removeChat = async() => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
        router.replace('/')
    }

  return (
    <Link
        href={`chat/${id}`}
        className={`chatRow justify-center xs:justify-between ${active && 'bg-gray-700/30'}`}
    >
        <ChatBubbleLeftIcon className="h-5 w-5"/>
        <p className="flex-1 xs:hidden inline-flex truncate mx-1">
            {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        </p>
        <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-500 hover:text-red-700" />
    </Link>
  )
}

export default ChatRow