
import React from "react";
import { FiArrowUpRight } from 'react-icons/fi';








const TravelPlanner = ({setResponse,setState}) => {

  const funcPlace=function(e){
    // if (typeof window !== 'undefined') {
    // let value=document.getElementById("place")
  
    console.log("////// clicked //////",e.currentTarget.getAttribute("data-text"),document.getElementById("btn").innerText)
    document.getElementById("place").value=e.currentTarget.getAttribute("data-text")
    document.getElementById("btn").innerText="Generate"
    setResponse(null)
    
    // }
  }


  const handleFormSubmit = async () => {
  
 
    document.getElementById("place").value=="" ? console.log("Not defined") : console.log("defined")
    
    if(document.getElementById("place").value!=""){
      setState("loading")
      let message=`1. List of Hotels name and distance from City Center ${document.getElementById("place").value}. Do not provide pictures, only hotels names, distance and brief desctiption.`
      message=`1. List of Hotels and distance from City Center ${document.getElementById("place").value}. Do not provide pictures, only hotels names,distace and brief desctiption. Headline and title must be styled for this paragraph.
      2. Itinerary options including flights, trains and buses to get to ${document.getElementById("place").value} from Dubai  - This needs to be brief and summarized result. Headline and title must be styled for this paragraph.
      3. Estimated Price should be included. Headline and title must be styled for this paragraph.
      4. List Activities and restaurants within walking distance from ${document.getElementById("place").value}. Headline and title must be styled for this paragraph.
      5. Estimated time needed to visit proposed places. Headline and title must be styled for this paragraph.` 
    


      const protocol = window.location.protocol;
      const host = window.location.host;
      const fullHost = protocol + '//' + host;
      console.log("////// full host /////",fullHost)
      let url = `${fullHost}/api/travelGPT`;
      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify([ { content: message, role: 'user' }]),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8', 
          },
        });
        const data = await res.json();
       console.log(data)
       setResponse(data.response)
       setState("finished")
      } catch (error) {
        console.log(error);
      }
    }
    
    
    };

  const [_document, set_document] = React.useState(null)

    React.useEffect(() => {
        set_document(document)
    }, [])
    
    return (
      <div className="relative flex flex-col items-start py-3 bg-slate-700 bg-opacity-80 w-[98%] md:w-[80%] rounded-xl">
       <div className="relative flex flex-col items-center justify-center content-center w-full">
          <div className="relative w-[98%] flex items-center mt-4">
                {/* <img className="conciergeRectGeneral" src="/assets/concierge_in_input-1dc8c7a4.svg" alt="Concierge Rect" /> */}
                <input className=" bg-black text-lg border-transparent w-full h-14 rounded-md text-white pl-3" placeholder="Where to?" type="text" id="place" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" id="btn" onClick={handleFormSubmit}>
                    Next
                </button>
          </div>
       </div>

        {/* <div className="flex flex-col mt-2 w-100 overflow-scroll" style={{ maxHeight: '300px' }}></div> */}
        <div className="mt-3 w-full">
          <div className=" flex items-center text-sm w-4/5 cursor-pointer px-5   ">
            <i className="fa-regular fa-chevron-up exampleColor"></i>
            <div className=" ml-2 uppercase text-xs text-slate-100">Example Cities</div>
          </div>
          <div className="mt-3 space-y-5 px-5">
            
            <div className="pl-3 pr-4 mv-2 text-lg">

              <div data-text="New York, United States" className="flex items-center justify-between w-100 cursor-pointer text-slate-100 hover:text-slate-400" onClick={(e)=>{
                funcPlace(e);
              }} >
                <div className="flex items-center">
                  <div className="">New York, United States</div>
                </div>
                <i className=""><FiArrowUpRight size={28} className="arrowUpRight" /></i>
              </div>

            </div>
            
            <div className="pl-3 pr-4 mv-2 text-lg">

              <div data-text="Los Angeles, California, United States" className="flex items-center justify-between w-full cursor-pointer text-slate-100 hover:text-slate-400" onClick={(e)=>{
                funcPlace(e);
              }}  >
                <div className="flex items-center">
                  <div className="">Los Angeles, California, United States</div>
                </div>
                <i className=""><FiArrowUpRight size={28} className="arrowUpRight" /></i>
              </div>

            </div>
            
            <div className="pl-3 pr-4 mv-2 text-lg">

              <div data-text="Austin, Texas, United States" className="flex items-center justify-between w-100 cursor-pointer text-slate-100 hover:text-slate-400" onClick={(e)=>{
                funcPlace(e);
              }}  >
                <div className="flex items-center">
                  <div className="">Austin, Texas, United States</div>
                </div>
                <i className=""><FiArrowUpRight  size={28} className="arrowUpRight" /></i>
              </div>

            </div>
          
          </div>
        </div>
      </div>
    );
  };
  

  export default TravelPlanner;