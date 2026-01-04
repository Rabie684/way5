
import React from 'react';
import { User, Language, Theme } from '../../types';
import { XIcon } from '../icons';

interface ProfileModalProps {
    user: User;
    onClose: () => void;
    language: Language;
    theme: Theme;
    onToggleTheme: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, language, theme, onToggleTheme }) => {
    
    const translations = {
        ar: {
            title: "الملف الشخصي",
            changePhoto: "تغيير الصورة",
            name: "الاسم",
            email: "البريد الإلكتروني",
            role: "الدور",
            student: "طالب",
            professor: "أستاذ",
            university: "الجامعة",
            faculty: "الكلية",
            balance: "الرصيد",
            appearance: "المظهر",
            light: "نهاري",
            dark: "ليلي",
            close: "إغلاق",
        },
        en: {
            title: "Profile",
            changePhoto: "Change Photo",
            name: "Name",
            email: "Email",
            role: "Role",
            student: "Student",
            professor: "Professor",
            university: "University",
            faculty: "Faculty",
            balance: "Balance",
            appearance: "Appearance",
            light: "Light",
            dark: "Dark",
            close: "Close",
        },
    };
    const t = translations[language];

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md" role="dialog" aria-modal="true">
                <header className="flex items-center justify-between p-4 border-b dark:border-slate-700">
                    <h2 className="text-lg font-bold">{t.title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
                        <XIcon className="w-5 h-5" />
                    </button>
                </header>
                <div className="p-6 space-y-4">
                    <div className="flex flex-col items-center">
                        <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
                        <button className="text-sm text-primary-500 hover:underline">{t.changePhoto}</button>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t.name}:</span>
                            <span className="font-semibold">{user.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t.email}:</span>
                            <span className="font-semibold">{user.email}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t.role}:</span>
                            <span className="font-semibold">{user.role === 'student' ? t.student : t.professor}</span>
                        </div>
                        {user.role === 'professor' && (
                            <>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 dark:text-slate-400">{t.university}:</span>
                                    <span className="font-semibold">{user.university}</span>
                                </div>
                                 <div className="flex justify-between">
                                    <span className="text-slate-500 dark:text-slate-400">{t.faculty}:</span>
                                    <span className="font-semibold">{user.faculty}</span>
                                </div>
                            </>
                        )}
                        {user.role === 'student' && (
                             <div className="flex justify-between">
                                <span className="text-slate-500 dark:text-slate-400">{t.balance}:</span>
                                <span className="font-semibold">{user.balance} DZD</span>
                            </div>
                        )}
                         <div className="flex justify-between items-center pt-2">
                            <span className="text-slate-500 dark:text-slate-400">{t.appearance}:</span>
                            <div className="flex justify-center bg-gray-100 dark:bg-slate-700 p-1 rounded-full">
                                <button 
                                    onClick={onToggleTheme}
                                    disabled={theme === 'light'}
                                    className={`w-1/2 px-4 py-1 rounded-full text-sm transition-colors ${theme === 'light' ? 'bg-primary-500 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                                >
                                    {t.light}
                                </button>
                                <button 
                                    onClick={onToggleTheme}
                                    disabled={theme === 'dark'}
                                    className={`w-1/2 px-4 py-1 rounded-full text-sm transition-colors ${theme === 'dark' ? 'bg-primary-500 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                                >
                                    {t.dark}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                 <footer className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t dark:border-slate-700 text-end">
                    <button onClick={onClose} className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">{t.close}</button>
                </footer>
            </div>
        </div>
    );
};

export default ProfileModal;
