
import React, { useState } from 'react';
import { Language, ContentItem } from '../../types';
import { XIcon } from '../icons';

interface AddContentModalProps {
    onClose: () => void;
    onAdd: (item: ContentItem) => void;
    language: Language;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ onClose, onAdd, language }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<ContentItem['type']>('summary');

    const translations = {
        ar: {
            title: "إضافة محتوى جديد",
            contentTitle: "عنوان المحتوى",
            titlePlaceholder: "مثال: ملخص الفصل الأول",
            contentType: "نوع المحتوى",
            summary: "ملخص (PDF)",
            image: "صورة",
            video: "فيديو",
            uploadFile: "رفع ملف",
            add: "إضافة",
            cancel: "إلغاء",
        },
        en: {
            title: "Add New Content",
            contentTitle: "Content Title",
            titlePlaceholder: "e.g., Chapter 1 Summary",
            contentType: "Content Type",
            summary: "Summary (PDF)",
            image: "Image",
            video: "Video",
            uploadFile: "Upload File",
            add: "Add",
            cancel: "Cancel",
        },
    };
    const t = translations[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            const newItem: ContentItem = {
                id: `cont-${Date.now()}`,
                title: title.trim(),
                type,
                url: '#', // Placeholder URL
            };
            onAdd(newItem);
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
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="contentTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.contentTitle}</label>
                            <input
                                id="contentTitle"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t.titlePlaceholder}
                                required
                                autoFocus
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                        <div>
                             <label htmlFor="contentType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.contentType}</label>
                            <select
                                id="contentType"
                                value={type}
                                onChange={(e) => setType(e.target.value as ContentItem['type'])}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="summary">{t.summary}</option>
                                <option value="image">{t.image}</option>
                                <option value="video">{t.video}</option>
                            </select>
                        </div>
                        <div>
                             <label htmlFor="fileUpload" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.uploadFile}</label>
                             <input 
                                id="fileUpload" 
                                type="file" 
                                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-slate-700 dark:file:text-slate-300 dark:hover:file:bg-slate-600" 
                             />
                        </div>
                    </div>
                    <footer className="flex justify-end gap-3 p-4 bg-gray-50 dark:bg-slate-800/50 border-t dark:border-slate-700">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500">{t.cancel}</button>
                        <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">{t.add}</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AddContentModal;
