
import React, { useState } from 'react';
import { UserRole, Language } from '../../types';
import { mockUniversities } from '../../data/mockData';
import { UniversityIcon } from '../icons';

interface LoginScreenProps {
    onLogin: (role: UserRole) => void;
    language: Language;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, language }) => {
    const [role, setRole] = useState<UserRole>('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [university, setUniversity] = useState('');
    const [faculty, setFaculty] = useState('');

    const selectedUniversityData = mockUniversities.find(u => u.name === university);
    const availableFaculties = selectedUniversityData ? selectedUniversityData.faculties : [];

    const translations = {
        ar: {
            title: "مرحباً بك في جامعتك الرقمية way",
            subtitle: "منصة التعليم العالي الرائدة في الجزائر",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            student: "طالب",
            professor: "أستاذ",
            loginAs: "تسجيل الدخول كـ",
            universityHint: "أدخل بريدك الجامعي",
            regularHint: "أدخل بريدك الإلكتروني",
            university: "الجامعة",
            faculty: "الكلية",
            selectUniversity: "اختر الجامعة",
            selectFaculty: "اختر الكلية",
            orTry: "أو جرب المنصة مباشرة",
            demoStudent: "دخول كطالب تجريبي",
            demoProfessor: "دخول كأستاذ تجريبي",
        },
        en: {
            title: "Welcome to Your Digital University way",
            subtitle: "The leading higher education platform in Algeria",
            email: "Email",
            password: "Password",
            student: "Student",
            professor: "Professor",
            loginAs: "Login as a",
            universityHint: "Enter your university email",
            regularHint: "Enter your email",
            university: "University",
            faculty: "Faculty",
            selectUniversity: "Select University",
            selectFaculty: "Select Faculty",
            orTry: "Or try the platform directly",
            demoStudent: "Enter as Demo Student",
            demoProfessor: "Enter as Demo Professor",
        },
    };

    const t = translations[language];

    const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUniversity(e.target.value);
        setFaculty(''); // Reset faculty when university changes
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(role);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary-500 text-white p-4 rounded-full inline-block">
                           <h1 className="text-3xl font-bold">W<span className="text-2xl">ay</span></h1>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">{t.title}</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">{t.subtitle}</p>
                </div>
                
                <div className="flex justify-center bg-gray-100 dark:bg-slate-700 p-1 rounded-full">
                    <button 
                        onClick={() => setRole('student')}
                        className={`w-1/2 px-4 py-2 rounded-full transition-colors ${role === 'student' ? 'bg-primary-500 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                        {t.student}
                    </button>
                    <button 
                        onClick={() => setRole('professor')}
                        className={`w-1/2 px-4 py-2 rounded-full transition-colors ${role === 'professor' ? 'bg-primary-500 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                        {t.professor}
                    </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {role === 'professor' && (
                        <>
                            <div>
                                <label htmlFor="university" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.university}</label>
                                <select id="university" value={university} onChange={handleUniversityChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                                    <option value="" disabled>{t.selectUniversity}</option>
                                    {mockUniversities.map(uni => <option key={uni.id} value={uni.name}>{uni.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="faculty" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.faculty}</label>
                                <select id="faculty" value={faculty} onChange={(e) => setFaculty(e.target.value)} required disabled={!university} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-50 dark:disabled:bg-slate-700/50">
                                    <option value="" disabled>{t.selectFaculty}</option>
                                    {availableFaculties.map(fac => <option key={fac.id} value={fac.name}>{fac.name}</option>)}
                                </select>
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.email}</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={role === 'professor' ? t.universityHint : t.regularHint} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <div>
                        <label htmlFor="password">{t.password}</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                    <button type="submit" className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-md shadow-lg transition-transform transform hover:scale-105">
                        {t.loginAs} {role === 'student' ? t.student : t.professor}
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">{t.orTry}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button onClick={() => onLogin('student')} className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-md transition-colors">
                        {t.demoStudent}
                    </button>
                    <button onClick={() => onLogin('professor')} className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-md transition-colors">
                        {t.demoProfessor}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
