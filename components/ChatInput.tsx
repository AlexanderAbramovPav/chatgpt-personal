'use client'

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast"
import ModelSelection from "./ModelSelection";
import useSWR from 'swr'

type ChatInputProps = {
    chatId: string;
}

function ChatInput({chatId}: ChatInputProps) {

    const [prompt, setPrompt] = useState("")
    const { data: session } = useSession()

    const { data: model } = useSWR('model', {
        fallbackData: "gpt-3.5-turbo",
    })

    const [messages] = useCollection(session && query(collection( db, "users", session?.user?.email!, "chats", chatId, "messages"), orderBy("createdAt", "asc")));

    type gptMessagesHistoryType = {
        role: string, content: string
    }

    const gptMessagesHistory: gptMessagesHistoryType[] = []

    // let gptFullMessagesHistory: string[] = []
    
    const handlePromptSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return

        const trimmedInput = prompt.trim()
        setPrompt("")

        const message: Message = {
            text: trimmedInput,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            }
        }

        await messages?.docs.forEach((message) => {
            if (message.data().user.name === "ChatGPT") {
                gptMessagesHistory.push({role: 'assistant', content: message.data().text})
                // gptFullMessagesHistory = gptFullMessagesHistory.concat(message.data().text)
            } else {
                gptMessagesHistory.push({role: 'user', content: message.data().text})
            }
        })

        await gptMessagesHistory.push({role: 'user', content: trimmedInput})
        // const gptLastMessagesHistory = gptFullMessagesHistory.slice(-1) + trimmedInput

        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'
            ), message
        )

        const notification = toast.loading("ChatGPT is thinking...")


        let modelBasedPrompts

        if (model === "gpt-3.5-turbo-0301" || model === "gpt-3.5-turbo") {
            modelBasedPrompts = gptMessagesHistory
        } else {
            modelBasedPrompts = trimmedInput
        }
        


        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: modelBasedPrompts, 
                chatId, 
                model, 
                session,
            })
        }).then(() => {
            toast.success('ChatGPT has responded!', {
                id: notification,
            })
            })
            .catch(() => {
                toast.error('Something happened!', {
                    id: notification,
                })
            })
    }

    function handlePromptChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPrompt(e.target.value)
    }


  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm mx-2 my-3 hover:bg-gray-600/50">
        <form className="p-5 space-x-5 flex justify-between" onSubmit={handlePromptSubmit}>
            <input type="text"
            disabled={!session}
            className="bg-transparent w-full focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
            onChange={handlePromptChange}
            value={prompt} 
            placeholder="Type your message here..."
            />
            <button disabled={!prompt || !session} type='submit' className="p-1 rounded hover:bg-[#11A37F] hover:text-white disabled:bg-gray-500 disabled:text-gray-700">
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
            </button>
        </form>

        <div className="hidden xs:inline">
            <ModelSelection />
        </div>
    </div>
  )
}

export default ChatInput