import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are Vian, an advanced AI Property Manager. Your role is to assist users with managing their properties, tenants, and analyzing performance.

You must respond in a strictly structured JSON format. Do not include any markdown formatting (like \`\`\`json). Just the raw JSON object.

The JSON object must have the following structure:
{
  "category": "display_component" | "general_response" | "analysis",
  "content": "The text response to show the user",
  "component": "PropertyTable" | "StatsCard" | "PropertyForm" | null,
  "data": any // Optional data to pass to the component (e.g., initialData for PropertyForm)
}

Categories:
1. "display_component": Use this when the user asks to see a list, table, or specific UI element (e.g., "Show properties", "List tenants").
   - Set "component" to "PropertyTable" or "StatsCard".
   - "PropertyTable" is for lists of properties.
   - "StatsCard" is for financial or performance metrics.

2. "general_response": Use this for greetings, clarifications, or general questions that don't require a specific UI component.
   - Set "component" to null.

3. "analysis": Use this when the user asks for insights, trends, or complex data analysis.
   - Set "component" to "StatsCard" if relevant, or null if text-only analysis is sufficient.

4. "action_form": Use this when the user wants to CREATE or EDIT a property.
   - Set "component" to "PropertyForm".
   - If EDITING, you MUST provide "data" with the property details (mock data is fine for now).
   - If CREATING, set "data" to null or empty object.

Examples:
User: "Show me my properties"
Response: { "category": "display_component", "content": "Here is a list of your current properties.", "component": "PropertyTable" }

User: "Add a new property"
Response: { "category": "action_form", "content": "Sure, please fill out the details below.", "component": "PropertyForm", "data": null }

User: "Edit the property at 123 Main St"
Response: { "category": "action_form", "content": "Here is the form for 123 Main St.", "component": "PropertyForm", "data": { "name": "Sunset Apartments", "address": "123 Main St", "type": "Residential", "status": "Good", "units": 12, "revenue": 15000 } }

User: "How is my revenue doing?"
Response: { "category": "analysis", "content": "Your revenue is up 12% this month, totaling $245,000.", "component": "StatsCard", "data": { "title": "Total Revenue", "value": "$245,000", "trend": "+12% vs last month" } }

User: "Hello"
Response: { "category": "general_response", "content": "Hello! I'm Vian. How can I help you manage your properties today?", "component": null }
`;

export async function POST(req: Request) {
    try {
        const { history, message } = await req.json();
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: 'model',
                    parts: [{ text: '{"category": "general_response", "content": "Understood. I will respond in strict JSON format.", "component": null}' }],
                },
                ...history.map((msg: any) => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.parts }]
                }))
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        // Clean up potential markdown code blocks if the model slips up
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const jsonResponse = JSON.parse(cleanText);
            return NextResponse.json(jsonResponse);
        } catch (e) {
            console.error('Failed to parse JSON response:', text);
            return NextResponse.json({
                category: 'general_response',
                content: text, // Fallback to raw text if parsing fails
                component: null,
            });
        }
    } catch (error: any) {
        console.error('Gemini API Error Details:', {
            message: error.message,
            stack: error.stack,
            apiKeyPresent: !!process.env.GEMINI_API_KEY,
            apiKeyLength: process.env.GEMINI_API_KEY?.length
        });

        return NextResponse.json({
            category: 'general_response',
            content: `I'm having trouble connecting. Error: ${error.message || 'Unknown error'}. (API Key Present: ${!!process.env.GEMINI_API_KEY})`,
            component: null,
        }, { status: 500 });
    }
}
