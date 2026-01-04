
import React, { useState, useRef, useEffect } from 'react';
import { User, Language } from '../../types';
import { UserIcon, LogoutIcon, ChevronDownIcon } from '../icons';

interface ProfileDropdownProps {
    user: User;
    onLogout: () => void;
    onProfile: () => void;
    language: Language;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout, onProfile, language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const translations = {
        ar: {
            profile: 'الملف الشخصي',
            logout: 'تسجيل الخروج',
        },
        en: {
            profile: 'Profile',
            logout: 'Logout',
        },
    };
    const t = translations[language];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
                <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full" />
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute end-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border dark:border-slate-700">
                    <div className="px-4 py-2 border-b dark:border-slate-700">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                        onClick={() => { onProfile(); setIsOpen(false); }}
                        className="w-full text-start flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                        <UserIcon className="w-4 h-4" />
                        {t.profile}
                    </button>
                    <button
                        onClick={onLogout}
                        className="w-full text-start flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <LogoutIcon className="w-4 h-4" />
                        {t.logout}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
