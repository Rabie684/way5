
import React, { useState } from 'react';
import { Language } from '../../types';
import { XIcon } from '../icons';

interface CreateSectionModalProps {
    onClose: () => void;
    onCreate: (name: string) => void;
    language: Language;
}

const CreateSectionModal: React.FC<CreateSectionModalProps> = ({ onClose, onCreate, language }) => {
    const [name, setName] = useState('');

    const translations = {
        ar: {
            title: "إنشاء قسم جديد",
            sectionName: "اسم القسم",
            placeholder: "مثال: الخوارزميات",
            create: "إنشاء",
            cancel: "إلغاء",
        },
        en: {
            title: "Create New Section",
            sectionName: "Section Name",
            placeholder: "e.g., Algorithms",
            create: "Create",
            cancel: "Cancel",
        },
    };
    const t = translations[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md" role="dialog" aria-modal="true">
                <header className="flex items-center justify-between p-4 border-b dark:border-slate-700">
                    <h2 className="text-lg font-bold">{t.title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
                        <XIcon className="w-5 h-5" />
                    </button>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="sectionName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.sectionName}</label>
                        <input
                            id="sectionName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t.placeholder}
                            required
                            autoFocus
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <footer className="flex justify-end gap-3 p-4 bg-gray-50 dark:bg-slate-800/50 border-t dark:border-slate-700">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500">{t.cancel}</button>
                        <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">{t.create}</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default CreateSectionModal;
