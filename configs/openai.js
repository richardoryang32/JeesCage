import { OpenAI } from "openai"

export const openai =new OpenAI({
    api_key:process.env.OPENAI_API_KEY,
    base_url:OPENAI_BASE_URL
}
)