
import React, { useState } from 'react';
import { BotIcon, SendIcon, XIcon } from '../icons';
import { checkProfessorActivity } from '../../services/geminiService';
import { Language } from '../../types';

interface ChatbotProps {
    language: Language;
}

const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const translations = {
        ar: {
            title: 'جارفيس',
            placeholder: 'اسأل عن نشاط أستاذ في قسم معين...',
            greeting: 'مرحباً! أنا جارفيس، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
            button: 'إرسال',
        },
        en: {
            title: 'Jarvis',
            placeholder: 'Ask about a professor\'s activity...',
            greeting: 'Hello! I\'m Jarvis, your smart assistant. How can I help you today?',
            button: 'Send',
        },
    };

    const t = translations[language];

    const handleQuery = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        setResponse('');
        
        // Simple parsing: assumes "professor name" in "section name"
        const queryParts = query.split(/ في | in /i);
        const professorName = queryParts[0]?.trim();
        const sectionName = queryParts[1]?.trim();

        if (professorName && sectionName) {
            const result = await checkProfessorActivity(professorName, sectionName, language);
            setResponse(result.message);
        } else {
            const errorMsg = language === 'ar' 
                ? 'يرجى استخدام الصيغة: [اسم الأستاذ] في [اسم القسم]'
                : 'Please use the format: [Professor Name] in [Section Name]';
            setResponse(errorMsg);
        }
        
        setIsLoading(false);
        setQuery('');
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 end-4 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-110 z-50"
                aria-label="Open Chatbot"
            >
                <BotIcon className="w-8 h-8" />
            </button>
        );
    }

    return (
        <div className="fixed z-50 bottom-0 start-0 end-0 rounded-t-2xl sm:bottom-6 sm:end-6 sm:start-auto sm:rounded-2xl h-[70vh] sm:h-[60vh] sm:max-w-sm flex flex-col transition-all bg-white dark:bg-slate-800 shadow-2xl">
            <header className="bg-primary-500 text-white p-4 rounded-t-2xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <BotIcon className="w-6 h-6" />
                    <h3 className="font-bold text-lg">{t.title}</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20">
                    <XIcon className="w-6 h-6" />
                </button>
            </header>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex items-start gap-2.5 mb-4">
                     <div className="bg-primary-500 text-white p-2 rounded-full self-start">
                        <BotIcon className="w-5 h-5" />
                    </div>
                    <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">{t.greeting}</p>
                    </div>
                </div>
                {response && (
                    <div className="flex items-start gap-2.5">
                        <div className="bg-primary-500 text-white p-2 rounded-full self-start">
                           <BotIcon className="w-5 h-5" />
                       </div>
                        <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">{response}</p>
                        </div>
                    </div>
                )}
                 {isLoading && (
                     <div className="flex justify-center items-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                     </div>
                )}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                        placeholder={t.placeholder}
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button onClick={handleQuery} className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 disabled:bg-primary-300" disabled={isLoading}>
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
