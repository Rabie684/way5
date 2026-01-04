
import React, { useState, useMemo } from 'react';
import { User, Section, University, Language, Faculty } from '../../types';
import { mockSections, mockUniversities } from '../../data/mockData';
import { BookOpenIcon, MegaphoneIcon, MessageCircleIcon, FileTextIcon, UniversityIcon } from '../icons';
import StudentSectionDetail from './StudentSectionDetail';

// Props for the main component
interface StudentDashboardProps {
    user: User;
    language: Language;
}

// Props for the explore view
interface ExploreViewProps {
    language: Language;
    subscribedSectionIds: string[];
    onSubscribe: (section: Section) => void;
}

// The card for a single section
const SectionCard: React.FC<{ section: Section; language: Language }> = ({ section, language }) => {
    const translations = {
        ar: { announcements: 'إعلان', files: 'ملف', messages: 'رسائل' },
        en: { announcements: 'Announce', files: 'Files', messages: 'Messages' },
    };
    const t = translations[language];

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-3 rounded-lg">
                    <BookOpenIcon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{section.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{section.professorName}</p>
                </div>
            </div>
            <div className="flex justify-around text-xs text-slate-600 dark:text-slate-300 border-t pt-4 mt-4 border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-1">
                    <MegaphoneIcon className="w-4 h-4" />
                    <span>{section.announcements.length} {t.announcements}</span>
                </div>
                <div className="flex items-center gap-1">
                    <FileTextIcon className="w-4 h-4" />
                    <span>{section.content.length} {t.files}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageCircleIcon className="w-4 h-4" />
                    <span>{section.groupChat.length} {t.messages}</span>
                </div>
            </div>
        </div>
    );
};


// Explore View component
const ExploreView: React.FC<ExploreViewProps> = ({ language, subscribedSectionIds, onSubscribe }) => {
    const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
    const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

    const translations = {
        ar: {
            title: "استكشف الأقسام",
            subtitle: "ابحث عن قنوات أساتذتك واشترك في أقسامهم.",
            selectUni: "اختر جامعة",
            selectFaculty: "اختر كلية",
            backToUni: "العودة للجامعات",
            backToFaculty: "العودة للكليات",
            subscribe: "اشتراك",
            subscribed: "مشترك",
            cost: "100 دج",
        },
        en: {
            title: "Explore Sections",
            subtitle: "Find your professors' channels and subscribe to their sections.",
            selectUni: "Select a University",
            selectFaculty: "Select a Faculty",
            backToUni: "Back to Universities",
            backToFaculty: "Back to Faculties",
            subscribe: "Subscribe",
            subscribed: "Subscribed",
            cost: "100 DZD",
        },
    };
    const t = translations[language];

    const handleUniversitySelect = (university: University) => {
        setSelectedUniversity(university);
        setSelectedFaculty(null);
    };

    const handleFacultySelect = (faculty: Faculty) => {
        setSelectedFaculty(faculty);
    };

    // Render sections for the selected faculty and professor
    const renderSections = (professorId: string) => {
        return mockSections
            .filter(section => section.professorId === professorId)
            .map(section => {
                const isSubscribed = subscribedSectionIds.includes(section.id);
                return (
                    <div key={section.id} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h5 className="font-bold">{section.name}</h5>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{section.professorName}</p>
                        </div>
                        <button
                            onClick={() => !isSubscribed && onSubscribe(section)}
                            disabled={isSubscribed}
                            className={`px-4 py-2 rounded-md text-sm font-semibold text-white ${isSubscribed ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600'}`}
                        >
                            {isSubscribed ? t.subscribed : `${t.subscribe} (${t.cost})`}
                        </button>
                    </div>
                );
            });
    };

    if (selectedUniversity && selectedFaculty) {
        return (
            <div>
                 <button onClick={() => setSelectedFaculty(null)} className="text-sm text-primary-500 hover:underline mb-4">&larr; {t.backToFaculty}</button>
                <h3 className="text-2xl font-bold mb-4">{selectedFaculty.name}</h3>
                <div className="space-y-6">
                    {selectedFaculty.professors.map(prof => (
                        <div key={prof.id}>
                            <h4 className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-2">{prof.name}</h4>
                            <div className="space-y-2">
                                {renderSections(prof.id)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (selectedUniversity) {
        return (
            <div>
                 <button onClick={() => setSelectedUniversity(null)} className="text-sm text-primary-500 hover:underline mb-4">&larr; {t.backToUni}</button>
                <h3 className="text-2xl font-bold mb-4">{selectedUniversity.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedUniversity.faculties.map(faculty => (
                        <button key={faculty.id} onClick={() => handleFacultySelect(faculty)} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md text-center hover:bg-primary-50 dark:hover:bg-slate-700 transition">
                            <h4 className="text-lg font-bold">{faculty.name}</h4>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400">{t.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">{t.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUniversities.map(uni => (
                    <button key={uni.id} onClick={() => handleUniversitySelect(uni)} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md text-center hover:bg-primary-50 dark:hover:bg-slate-700 transition-all duration-300 hover:shadow-lg">
                         <div className="flex justify-center mb-4 text-primary-500">
                           <UniversityIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold">{uni.name}</h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

const Notification: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
    return (
        <div className={`fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            <span>{message}</span>
            <button onClick={onClose} className="ms-4 font-bold">X</button>
        </div>
    );
};

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, language }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'explore'>('dashboard');
    const [studentData, setStudentData] = useState<User>(user);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    const subscribedSections = useMemo(() => {
        return mockSections.filter(section => studentData.subscribedSections?.includes(section.id));
    }, [studentData.subscribedSections]);
    
    const handleSubscribe = (section: Section) => {
        const cost = 100;

        if(studentData.subscribedSections?.includes(section.id)) {
            showNotification(language === 'ar' ? 'أنت مشترك بالفعل في هذا القسم.' : 'You are already subscribed to this section.', 'error');
            return;
        }

        if((studentData.balance || 0) < cost) {
            showNotification(language === 'ar' ? 'رصيدك غير كافٍ للاشتراك.' : 'Insufficient balance to subscribe.', 'error');
            return;
        }

        setStudentData(prev => ({
            ...prev,
            balance: (prev.balance || 0) - cost,
            subscribedSections: [...(prev.subscribedSections || []), section.id]
        }));
        
        showNotification(language === 'ar' ? `تم الاشتراك بنجاح في قسم ${section.name}!` : `Successfully subscribed to ${section.name}!`, 'success');
        setActiveTab('dashboard');
    };
    
    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const translations = {
        ar: {
            dashboard: "الأقسام المشترك بها",
            explore: "استكشف",
            balance: "الرصيد",
            noSubscriptions: "لم تشترك في أي قسم بعد.",
            explorePrompt: "اذهب إلى قسم 'استكشف' لبدء التعلم!",
        },
        en: {
            dashboard: "My Sections",
            explore: "Explore",
            balance: "Balance",
            noSubscriptions: "You haven't subscribed to any sections yet.",
            explorePrompt: "Go to the 'Explore' tab to start learning!",
        },
    };

    const t = translations[language];

    if (selectedSection) {
        return <StudentSectionDetail section={selectedSection} user={studentData} language={language} onBack={() => setSelectedSection(null)} />;
    }

    return (
        <div className="space-y-8">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-full">
                    <button 
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-6 py-2 rounded-full transition-colors text-sm font-semibold ${activeTab === 'dashboard' ? 'bg-white dark:bg-slate-700 shadow text-primary-600' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                        {t.dashboard}
                    </button>
                    <button 
                        onClick={() => setActiveTab('explore')}
                        className={`px-6 py-2 rounded-full transition-colors text-sm font-semibold ${activeTab === 'explore' ? 'bg-white dark:bg-slate-700 shadow text-primary-600' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                        {t.explore}
                    </button>
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 px-4 rounded-full shadow-sm">
                    <span className="font-bold text-slate-600 dark:text-slate-300">{t.balance}: </span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">{studentData.balance} DZD</span>
                </div>
            </div>

            {activeTab === 'dashboard' && (
                <div>
                    {subscribedSections.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subscribedSections.map(section => (
                                <div key={section.id} onClick={() => setSelectedSection(section)}>
                                    <SectionCard section={section} language={language} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-lg">
                            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200">{t.noSubscriptions}</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">{t.explorePrompt}</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'explore' && (
                <ExploreView language={language} subscribedSectionIds={studentData.subscribedSections || []} onSubscribe={handleSubscribe} />
            )}

        </div>
    );
};

export default StudentDashboard;
