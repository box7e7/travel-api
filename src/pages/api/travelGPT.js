const { Configuration, OpenAIApi } = require("openai");
import { promises as fs } from 'fs';

//////////////////////////////////////////////////////////////////////////
let port=3033
let url0=`http://192.168.0.241:${port}/api`

async function fetchAndPrint(url0,text) {
 let list0=[]
  const response = await fetch(url0, {
     method: 'POST',
     body: text,
     headers: { 'Accept': 'text/event-stream' }
    });

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
    list0.push(decoder.decode(value))
  }

  // console.log("$$$$$$",result.split("\n\n"),"%%%%%%%%%%\n",JSON.parse(list0[list0.length-2]).message);
  return JSON.parse(list0[list0.length-2]).message
}
////////////////////////////////////////////////////////////////////////////






export default async function handler(req, res) {

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

    const text = await fs.readFile('context_travel.txt', 'utf8');

    let context = [ {'role':'system', 'content':text} ]  
    context.push(...req.body)

    const openai = new OpenAIApi(configuration);  
    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: context,
    });

    console.log(completion.data.choices[0].message);
    console.log(req.body)
    console.log(context)

    // let result= await fetchAndPrint(url0,`this is context, a list of objects with role and content as keys, any object in the context with key role as system use it as system context to answer any question from the object with role user:${JSON.stringify(context)}`)
    // console.log("///// result /////\n",result)

    
    res.status(200).json({ response: completion.data.choices[0].message.content })
    // res.status(200).json({ response: result })

  }
  