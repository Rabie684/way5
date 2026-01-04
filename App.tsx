
import React, { useState, useEffect, useCallback } from 'react';
import { User, UserRole, View, Language, Theme, Section } from './types';
import { mockProfessor, mockStudent, mockUniversities } from './data/mockData';
import LoginScreen from './components/auth/LoginScreen';
import StudentDashboard from './components/student/StudentDashboard';
import ProfessorDashboard from './components/professor/ProfessorDashboard';
import Chatbot from './components/common/Chatbot';
import ProfileDropdown from './components/common/ProfileDropdown';
import ProfileModal from './components/common/ProfileModal';
import { UniversityIcon } from './components/icons';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [view, setView] = useState<View>('login');
    const [theme, setTheme] = useState<Theme>('light');
    const [language, setLanguage] = useState<Language>('ar');
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [language, theme]);

    const handleLogin = (role: UserRole) => {
        if (role === 'professor') {
            setCurrentUser(mockProfessor);
            setView('professor_dashboard');
        } else {
            setCurrentUser(mockStudent);
            setView('student_dashboard');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('login');
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const renderContent = () => {
        if (!currentUser) {
            return <LoginScreen onLogin={handleLogin} language={language} />;
        }
        switch (view) {
            case 'student_dashboard':
                return <StudentDashboard user={currentUser} language={language} />;
            case 'professor_dashboard':
                return <ProfessorDashboard user={currentUser} language={language} />;
            default:
                return <LoginScreen onLogin={handleLogin} language={language} />;
        }
    };

    const getHeaderTitle = () => {
        if (!currentUser) return 'جامعتك الرقمية way';
        if (language === 'en') {
            return view === 'professor_dashboard' ? `${currentUser.university} - ${currentUser.faculty}` : 'Student Portal';
        }
        return view === 'professor_dashboard' ? `${currentUser.university} - ${currentUser.faculty}` : 'بوابة الطالب';
    };

    return (
        <div className="bg-gray-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 font-sans">
            {currentUser && (
                <header className="bg-white dark:bg-slate-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
                    <div className="flex items-center gap-3">
                         <div className="bg-primary-500 text-white p-2 rounded-lg">
                            <UniversityIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-primary-600 dark:text-primary-400 truncate max-w-xs">{getHeaderTitle()}</h1>
                            <p className="hidden sm:block text-sm text-slate-500 dark:text-slate-400">
                                {language === 'en' ? 'Welcome' : 'مرحباً'}, {currentUser.name}
                            </p>
                        </div>
                    </div>
                     <div className="flex items-center gap-1 sm:gap-2">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
                           {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                         <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 font-bold text-sm">
                            {language === 'ar' ? 'EN' : 'AR'}
                        </button>
                        <ProfileDropdown 
                            user={currentUser} 
                            onLogout={handleLogout} 
                            onProfile={() => setIsProfileModalOpen(true)}
                            language={language}
                        />
                    </div>
                </header>
            )}
            <main className="p-4 md:p-8">
                {renderContent()}
            </main>
            {currentUser?.role === 'student' && <Chatbot language={language} />}
            {isProfileModalOpen && currentUser && (
                <ProfileModal 
                    user={currentUser} 
                    onClose={() => setIsProfileModalOpen(false)} 
                    language={language}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />
            )}
        </div>
    );
};

export default App;
