
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { mockSections } from '../data/mockData';

// The API key is securely managed by the environment.
const API_KEY = process.env.API_KEY;
const ai = new GoogleGenAI({apiKey: API_KEY});

interface JarvisResponse {
    hasContent: boolean;
    message: string;
}

export const checkProfessorActivity = async (professorName: string, sectionName: string, language: 'ar' | 'en'): Promise<JarvisResponse> => {
    
    const languageMap = {
        ar: 'Arabic',
        en: 'English'
    };
    
    // In a real app, this data would come from a database. For the demo, we pass it to Gemini as context.
    const sectionsContext = JSON.stringify(mockSections.map(s => ({ professor: s.professorName, section: s.name, announcements: s.announcements.length, content: s.content.length })));
    
    const prompt = `You are a helpful university assistant chatbot named Jarvis. Your task is to check if a professor is active in a specific section based on the data provided.
    
    Data: ${sectionsContext}

    Question: Is Professor "${professorName}" active in the section "${sectionName}"? (Active means they have posted announcements or content).
    
    Instructions:
    1. Find the matching professor and section in the data.
    2. If not found, say you couldn't find it.
    3. Check if the number of announcements or content is greater than 0.
    4. Your final response must be in ${languageMap[language]}.
    5. Start your response with a single word: "YES" if active, "NO" if not active or not found.
    6. After the single word, add a newline, then provide a friendly, short explanation.

    Example response if active (in English):
    YES
    Yes, Professor D. Fatima Zahra has posted 1 announcement and 2 content items in the "Algorithms and Data Structures" section. It seems to be an active section.
    
    Example response if not found (in Arabic):
    NO
    عذراً، لم أتمكن من العثور على قسم باسم "الفيزياء" للأستاذ "د. يوسف". يرجى التحقق من الأسماء.
    `;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        const text = response.text || '';
        const lines = text.split('\n');
        const answer = lines[0]?.trim().toUpperCase();
        const message = lines.slice(1).join('\n').trim();

        if (answer === 'YES' || answer === 'NO') {
             return {
                hasContent: answer === 'YES',
                message: message || (language === 'ar' ? 'تم العثور على معلومات.' : 'Information found.'),
             };
        } else {
            // If Gemini doesn't follow the format, return the whole text as the message.
            return { hasContent: false, message: text };
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        const errorMessage = language === 'ar' 
            ? 'عذراً، لا يمكنني الاتصال بعقلي المدبر الآن. ربما هناك مشكلة في الاتصال. حاول مرة أخرى لاحقاً.'
            : "Sorry, I couldn't connect to my brain right now. There might be a connection issue. Please try again later.";
        return { hasContent: false, message: errorMessage };
    }
};
