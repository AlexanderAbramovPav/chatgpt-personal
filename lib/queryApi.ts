import openai from "./chatgpt";

const query = async (prompt: [], chatId: string, model: string) => {
     
    if (model === "gpt-3.5-turbo-0301" || model === "gpt-3.5-turbo") {
        const res = await openai.createChatCompletion({
            model,
            messages: prompt,
            temperature: 0.9,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        .then((res) => res.data.choices[0].message?.content)
        .catch((err) => `ChatGPT was unable to find an answer for that! (Error: ${err.message})`)
        
        return res;
    } else {

        const res = await openai.createCompletion({
            model,
            prompt,
            temperature: 0.9,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        .then((res) => res.data.choices[0].text)
        .catch((err) => `ChatGPT was unable to find an answer for that! (Error: ${err.message})`)

        return res;
    }
}

export default query;