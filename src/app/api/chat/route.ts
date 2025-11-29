import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { tools } from '@/lib/ai/tools';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.5-flash-lite'),
            messages,
            system: `You are Vian, an advanced AI Property Manager. Your role is to assist users with managing their properties, tenants, and analyzing performance.
    
    You have access to several tools to help you retrieve information and perform actions.
    - Use 'get_properties' to show a list of properties.
    - Use 'get_tenants' to show a list of tenants.
    - Use 'get_stats' to show financial and operational statistics.
    - Use 'get_property_detail' when the user asks for details about a specific property.
    - Use 'get_tenant_detail' when the user asks for details about a specific tenant.
    - Use 'create_property' when the user wants to add a new property.
    - Use 'edit_property' when the user wants to edit an existing property.
    
    If the user's request can be answered by one of these tools, call the appropriate tool.
    If the user's request is a general question or greeting, respond with a helpful text message.
    `,
            tools: tools,
        });

        return result.toDataStreamResponse({
            getErrorMessage: (error) => {
                console.error('Stream Error Details:', error);
                if (error instanceof Error) {
                    return error.message;
                }
                return 'An unknown error occurred';
            }
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'An error occurred processing your request.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
