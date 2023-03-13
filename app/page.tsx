import { BoltIcon, ExclamationTriangleIcon, SunIcon } from "@heroicons/react/24/outline";

function HomePage() {
  return (
    <div className="flex flex-col items-center text-white h-screen xs:h-[100svh] px-2 overflow-y-auto overflow-x-hidden justify-start py-20">
        <h1 className="text-5xl text-center font-bold mb-20 xs:text-3xl xs:mb-2 h-auto">ChatGPT Personal</h1>

        <div className="flex space-x-2 text-center xs:flex-col xs:space-x-0">

            <div className="space-y-2 xs:mt-4">

                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                    <SunIcon className="h-6 w-6" />
                        <h2>Examples</h2>
                    </div>
                </div>

                <p className="infoText">
                    "Explain quantum computing in simple terms"
                </p>
                <p className="infoText">
                    "Got any creative ideas for a 10 year old’s birthday?"
                </p> 
                <p className="infoText">
                    "How do I make an HTTP request in Javascript?"
                </p>
            </div>
            
            <div className="space-y-2 xs:mt-4">
                
                <div> 
                    <div className="flex flex-col items-center justify-center mb-5">
                    <BoltIcon className="h-6 w-6" />
                        <h2>Capabilities</h2>
                    </div>
                </div>

                <p className="infoText">
                    Remembers what user said earlier in the conversation
                </p>
                <p className="infoText">
                    Allows user to provide follow-up corrections
                </p> 
                <p className="infoText">
                    Trained to decline inappropriate requests
                </p>
            </div>
            
            <div className="space-y-2 xs:mt-4">

                <div>
                    <div className="flex flex-col items-center justify-center mb-5">
                    <ExclamationTriangleIcon className="h-6 w-6" />
                        <h2>Limitations</h2>
                    </div>
                </div>

                <p className="infoText">
                    May occasionally generate incorrect information
                </p>
                <p className="infoText">
                    May occasionally produce harmful instructions or biased content
                </p> 
                <p className="infoText">
                    Limited knowledge of world and events after 2021
                </p>
            </div>

        </div>

    </div>
  ) 
}

export default HomePage;