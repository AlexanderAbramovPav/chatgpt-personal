import openai from "./chatgpt";

const query = async (prompt: [], chatId: string, model: string) => {
     
    const res = await openai.chat.completions.create({
        model,
        messages: prompt,
        temperature: 0.9,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    .then((res) => res.choices[0].message?.content)
    .catch((err) => `ChatGPT was unable to find an answer for that! (Error: ${err.message})`)
    
    return res;

}

export default query;