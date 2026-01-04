
import React, { useState } from 'react';
import { User, Section, Language, ContentItem } from '../../types';
import { mockSections } from '../../data/mockData';
import { BookOpenIcon, MegaphoneIcon, MessageCircleIcon, FileTextIcon, PlusCircleIcon, GoogleMeetIcon, VideoIcon, ImageIcon, SendIcon } from '../icons';
import CreateSectionModal from './CreateSectionModal';
import AddContentModal from './AddContentModal';

interface ProfessorDashboardProps {
    user: User;
    language: Language;
}

interface ProfessorSectionDetailProps {
    section: Section;
    onBack: () => void;
    onUpdateSection: (updatedSection: Section) => void;
    language: Language;
    user: User;
}

const ProfessorSectionDetail: React.FC<ProfessorSectionDetailProps> = ({ section, onBack, onUpdateSection, language, user }) => {
    const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
    
    const handleAddContent = (newItem: ContentItem) => {
        const updatedSection = {
            ...section,
            content: [...section.content, newItem],
        };
        onUpdateSection(updatedSection);
        setIsAddContentModalOpen(false);
    };

    const translations = {
        ar: {
            announcements: "الإعلانات",
            newAnnouncement: "إعلان جديد...",
            post: "نشر",
            groupChat: "دردشة جماعية",
            sendMessage: "أرسل رسالة...",
            courseContent: "محتوى المادة",
            addContent: "إضافة محتوى",
            back: "العودة للأقسام",
            startLecture: "بدء محاضرة مباشرة",
            noAnnouncements: "لا توجد إعلانات بعد.",
            noContent: "لا يوجد محتوى بعد.",
            noMessages: "ابدأ المحادثة الآن!",
        },
        en: {
            announcements: "Announcements",
            newAnnouncement: "New announcement...",
            post: "Post",
            groupChat: "Group Chat",
            sendMessage: "Send a message...",
            courseContent: "Course Content",
            addContent: "Add Content",
            back: "Back to Sections",
            startLecture: "Start Live Lecture",
            noAnnouncements: "No announcements yet.",
            noContent: "No content yet.",
            noMessages: "Start the conversation now!",
        },
    };
    const t = translations[language];

    const renderContentIcon = (type: ContentItem['type']) => {
        switch (type) {
            case 'summary': return <FileTextIcon className="w-5 h-5 text-primary-500" />;
            case 'image': return <ImageIcon className="w-5 h-5 text-primary-500" />;
            case 'video': return <VideoIcon className="w-5 h-5 text-primary-500" />;
        }
    };

    return (
        <div className="space-y-6">
             {isAddContentModalOpen && (
                <AddContentModal 
                    onClose={() => setIsAddContentModalOpen(false)}
                    onAdd={handleAddContent}
                    language={language}
                />
            )}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">{section.name}</h2>
                <button onClick={onBack} className="text-sm text-primary-500 hover:underline flex-shrink-0">{t.back}</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Announcements */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><MegaphoneIcon className="w-6 h-6 text-primary-500"/> {t.announcements}</h3>
                        <div className="space-y-4 max-h-48 sm:max-h-60 overflow-y-auto pr-2">
                             {section.announcements.length === 0 ? <p className="text-slate-400 text-sm">{t.noAnnouncements}</p> :
                                section.announcements.map(ann => (
                                    <div key={ann.id} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-md">
                                        <p>{ann.content}</p>
                                        {ann.imageUrl && <img src={ann.imageUrl} alt="announcement" className="mt-2 rounded-lg" />}
                                        <p className="text-xs text-slate-400 mt-2">{new Date(ann.timestamp).toLocaleString()}</p>
                                    </div>
                                ))
                             }
                        </div>
                        <div className="mt-4 flex gap-2">
                            <input type="text" placeholder={t.newAnnouncement} className="flex-1 px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            <button className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600">{t.post}</button>
                        </div>
                    </div>

                    {/* Group Chat */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md flex flex-col h-[70vh]">
                        <h3 className="text-xl font-bold p-6 pb-4 flex items-center gap-2 border-b dark:border-slate-700 flex-shrink-0">
                            <MessageCircleIcon className="w-6 h-6 text-primary-500"/>
                            {t.groupChat}
                        </h3>
                        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                            {section.groupChat.length === 0 && <p className="text-center text-slate-400">{t.noMessages}</p>}
                            {section.groupChat.map(msg => {
                                const isCurrentUser = msg.userId === user.id;
                                return (
                                    <div key={msg.id} className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                        {!isCurrentUser && (
                                            <img src={`https://picsum.photos/seed/${msg.userId}/40`} alt={msg.userName} className="w-8 h-8 rounded-full self-start" />
                                        )}
                                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isCurrentUser ? 'bg-primary-500 text-white rounded-br-lg' : 'bg-gray-100 dark:bg-slate-700 rounded-bl-lg'}`}>
                                            {!isCurrentUser && <p className="text-xs font-bold mb-1 text-primary-600 dark:text-primary-400">{msg.userName}</p>}
                                            <p className="text-sm">{msg.message}</p>
                                            <p className={`text-xs mt-1 opacity-70 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        {isCurrentUser && (
                                            <img src={user.profilePicture} alt={user.name} className="w-8 h-8 rounded-full self-start" />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder={t.sendMessage}
                                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <button className="bg-primary-500 text-white p-3 rounded-full hover:bg-primary-600 disabled:bg-primary-300">
                                    <SendIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                     <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors">
                        <GoogleMeetIcon className="w-6 h-6" />
                        <span className="font-semibold">{t.startLecture}</span>
                    </a>
                    {/* Course Content */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><FileTextIcon className="w-6 h-6 text-primary-500"/>{t.courseContent}</h3>
                        <div className="space-y-3 max-h-48 sm:max-h-60 overflow-y-auto pr-2">
                             {section.content.length === 0 ? <p className="text-slate-400 text-sm">{t.noContent}</p> :
                                section.content.map(item => (
                                    <div key={item.id} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-md">
                                        {renderContentIcon(item.type)}
                                        <a href={item.url} className="text-sm hover:underline">{item.title}</a>
                                    </div>
                             ))}
                        </div>
                        <button 
                          onClick={() => setIsAddContentModalOpen(true)}
                          className="w-full mt-4 flex items-center justify-center gap-2 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 py-2 rounded-md hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors">
                            <PlusCircleIcon className="w-5 h-5"/>
                            {t.addContent}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfessorDashboard: React.FC<ProfessorDashboardProps> = ({ user, language }) => {
    const [sections, setSections] = useState(() => mockSections.filter(s => s.professorId === user.id));
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreateSection = (name: string) => {
        const newSection: Section = {
            id: `sec-${Date.now()}`,
            name,
            professorId: user.id,
            professorName: user.name,
            announcements: [],
            groupChat: [],
            content: [],
        };
        setSections(prev => [...prev, newSection]);
        setIsCreateModalOpen(false);
    };

    const handleUpdateSection = (updatedSection: Section) => {
        setSections(prev => prev.map(s => s.id === updatedSection.id ? updatedSection : s));
        setSelectedSection(updatedSection); // Keep the detail view open with updated data
    };

    const translations = {
        ar: {
            myChannel: "قناتي",
            mySections: "الأقسام الخاصة بي",
            createNewSection: "إنشاء قسم جديد",
        },
        en: {
            myChannel: "My Channel",
            mySections: "My Sections",
            createNewSection: "Create New Section",
        },
    };

    const t = translations[language];

    if (selectedSection) {
        return <ProfessorSectionDetail 
                    user={user} 
                    section={selectedSection} 
                    onBack={() => setSelectedSection(null)} 
                    onUpdateSection={handleUpdateSection}
                    language={language} 
                />;
    }

    return (
        <div className="space-y-8">
             {isCreateModalOpen && (
                <CreateSectionModal 
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleCreateSection}
                    language={language}
                />
            )}
            <div>
                <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400">{t.myChannel}</h2>
                <p className="text-slate-500 dark:text-slate-400">{t.mySections}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map(section => (
                    <button 
                        key={section.id} 
                        onClick={() => setSelectedSection(section)}
                        className="text-start bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-3 rounded-lg">
                                <BookOpenIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{section.name}</h3>
                        </div>
                        <div className="flex justify-around text-sm text-slate-600 dark:text-slate-300 border-t pt-4 mt-4 border-gray-200 dark:border-slate-700">
                            <div className="flex items-center gap-1">
                                <MegaphoneIcon className="w-4 h-4" />
                                <span>{section.announcements.length} {language === 'en' ? 'Announce' : 'إعلان'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FileTextIcon className="w-4 h-4" />
                                <span>{section.content.length} {language === 'en' ? 'Files' : 'ملف'}</span>
                            </div>
                        </div>
                    </button>
                ))}
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <PlusCircleIcon className="w-12 h-12 mb-2" />
                    <span className="font-semibold">{t.createNewSection}</span>
                </button>
            </div>
        </div>
    );
};

export default ProfessorDashboard;
