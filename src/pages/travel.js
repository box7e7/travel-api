import { useState } from "react";
import TravelPlanner from "../components/TravelPlanner"
import Head from 'next/head';
import { Watch } from 'react-loader-spinner'

export default function Travel(){

const [state,setState]=useState("idle")
const [response,setResponse]=useState(null)
console.log(`////// ${state} /////////`)
    return(
       <div className="relative flex flex-col items-center content-center w-screen h-screen">
            <Head>
                {/* Other head elements */}
                {/* <script src="../scripts/script.js" /> */}
            </Head>
            <div className="flex flex-col items-center content-center mt-10 w-full h-screen">
            <h2 className="mb-10 text-3xl font-semibold text-gray-800">Travel Planner</h2>

                {state=="loading" ? 
                <Watch
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    /> : null}
                    
                {state!="loading" ? <TravelPlanner setResponse={setResponse} setState={setState}/> : null}
                {response ? <div className="bg-blue-100 rounded-lg p-8 mt-5 text-[#1A202C] space-y-1 mx-8 my-5 pb-8 mb-8" dangerouslySetInnerHTML={{ __html: response }} /> : null}
                {/* {response ? <div className="bg-blue-100 rounded-lg p-8 mt-5 text-[#1A202C] space-y-1 mx-3" dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(response) }} /> : null} */}
            </div>
            {/* <TravelPlanner setResponse={setResponse}/> */}

            
       </div>
    )
}
