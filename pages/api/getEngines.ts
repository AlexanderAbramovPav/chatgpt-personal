import { NextApiRequest, NextApiResponse } from "next"
import openai from "../../lib/chatgpt"


type Option = {
    value: string,
    label: string
}

type Data = {
    modelOptions: Option[],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const models = await openai.models.list().then((res) => res.data);

    const modelOptions = models
    .filter(model => /^gpt-4/.test(model.id) || /^gpt-3/.test(model.id))
    .map(model => ({
        value: model.id,
        label: model.id,
    }));

    res.status(200).json({ modelOptions });

}
