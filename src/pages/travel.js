import { useState } from "react";
import TravelPlanner from "../components/TravelPlanner"
import Head from 'next/head';
import { Watch } from 'react-loader-spinner'


let texCode=`<div class="bg-black rounded-md mb-4 pb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>Code</span><button class="flex gap-2 items-center absolute top-0 right-0 h-full px-3" onclick="copyCode(this)"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg><span class="text-white">Copy code</span></button></div><pre class="bg-black text-white p-4"  style="overflow-x: auto;"><code>$1</code></pre></div>`
function convertMarkdownToHtml(markdown) {
  // Define regex patterns to match Markdown syntax
  const headingPattern1 = /^#\s(.*)/gm;
  const headingPattern2 = /^##\s(.*)/gm;
  const headingPattern3 = /^###\s(.*)/gm;
  const codeBlockPattern = /```([\s\S]*?)```/gm;
  const boldPattern = /\*\*(.*?)\*\*/g;
  const italicPattern = /\*(.*?)\*/g;
  const linkPattern = /\[(.*?)\]\((.*?)\)/g;

  // Replace Markdown syntax with corresponding HTML tags
  const html = markdown
    .replace(headingPattern1, '<h1>$1</h1>')
    .replace(headingPattern2, '<h2>$1</h2>')
    .replace(headingPattern3, '<h3>$1</h3>')
    // .replace(codeBlockPattern, '<div class="bg-black text-white p-4 rounded-lg"><button class="copy-code" onclick="copyCode(this)">Copy</button><pre><code>$1</code></pre></div>')
    .replace(codeBlockPattern,texCode)
    .replace(boldPattern, '<b>$1</b>')
    .replace(italicPattern, '<i>$1</i>')
    .replace(linkPattern, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br>');

  return html;
}


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