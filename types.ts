
export type UserRole = 'student' | 'professor';
export type View = 'login' | 'student_dashboard' | 'professor_dashboard' | 'explore' | 'profile' | 'wallet' | 'section_details';
export type Theme = 'light' | 'dark';
export type Language = 'ar' | 'en';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    profilePicture: string;
    university?: string;
    faculty?: string;
    balance?: number;
    subscribedSections?: string[];
}

export interface Announcement {
    id: string;
    content: string;
    imageUrl?: string;
    timestamp: string;
}

export interface ChatMessage {
    id: string;
    userId: string;
    userName: string;
    message: string;
    timestamp: string;
}

export interface ContentItem {
    id: string;
    type: 'summary' | 'image' | 'video';
    title: string;
    url: string;
}

export interface Section {
    id: string;
    name: string;
    professorId: string;
    professorName: string;
    announcements: Announcement[];
    groupChat: ChatMessage[];
    content: ContentItem[];
}

export interface ProfessorChannel {
    id: string;
    professorId: string;
    sections: Section[];
}

export interface University {
    id: string;
    name: string;
    faculties: Faculty[];
}

export interface Faculty {
    id: string;
    name: string;
    professors: { id: string, name: string, channelId: string }[];
}
