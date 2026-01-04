
import { User, Section, ProfessorChannel, University } from '../types';

export const mockStudent: User = {
    id: 'student1',
    name: 'ربيع حمر العين',
    email: 'rabie.h@email.com',
    role: 'student',
    profilePicture: 'https://picsum.photos/seed/student1/200',
    balance: 500,
    subscribedSections: [],
};

export const mockProfessor: User = {
    id: 'prof-ksar-1',
    name: 'بن الطاهر بختة',
    email: 'b.bentaher@univ-tiaret.dz',
    role: 'professor',
    profilePicture: 'https://picsum.photos/seed/prof-ksar-1/200',
    university: 'جامعة ابن خلدون ملحقة قصر الشلالة',
    faculty: 'كلية العلوم الاقتصادية',
};

export const mockSections: Section[] = [
    {
        id: 'sec1',
        name: 'الخوارزميات وهياكل البيانات',
        professorId: 'prof1',
        professorName: 'د. فاطمة الزهراء',
        announcements: [
            { id: 'ann1', content: 'تم تأجيل محاضرة الغد إلى يوم الأربعاء.', timestamp: '2024-07-20T10:00:00Z', imageUrl: 'https://picsum.photos/seed/ann1/800/200' },
            { id: 'ann2', content: 'مذكرة هامة: سيتم عقد امتحان مفاجئ الأسبوع المقبل.', timestamp: '2024-07-18T15:30:00Z' },
        ],
        groupChat: [
            {id: 'msg1', userId: 'student1', userName: 'أحمد علي', message: 'السلام عليكم، هل هناك واجب لهذا الأسبوع؟', timestamp: '2024-07-22T09:15:00Z'},
            {id: 'msg2', userId: 'prof1', userName: 'د. فاطمة الزهراء', message: 'وعليكم السلام. نعم، تجدونه في قسم المحتوى.', timestamp: '2024-07-22T09:20:00Z'},
            {id: 'msg3', userId: 'student2', userName: 'سارة بن علي', message: 'شكراً دكتورة!', timestamp: '2024-07-22T09:21:00Z'},
            {id: 'msg4', userId: 'student1', userName: 'أحمد علي', message: 'تمام، شكراً جزيلاً.', timestamp: '2024-07-22T09:22:00Z'},
            {id: 'msg5', userId: 'prof1', userName: 'د. فاطمة الزهراء', message: 'بالتوفيق في دراستكم. لا تترددوا في طرح أي أسئلة أخرى.', timestamp: '2024-07-22T09:30:00Z'},
        ],
        content: [
            { id: 'cont1', type: 'summary', title: 'ملخص الفصل الأول', url: '#' },
            { id: 'cont2', type: 'video', title: 'فيديو شرح Recursion', url: '#' },
        ],
    },
    {
        id: 'sec2',
        name: 'الذكاء الاصطناعي',
        professorId: 'prof1',
        professorName: 'د. فاطمة الزهراء',
        announcements: [],
        groupChat: [],
        content: [],
    },
     {
        id: 'sec3',
        name: 'قواعد البيانات المتقدمة',
        professorId: 'prof2',
        professorName: 'د. يوسف إبراهيم',
        announcements: [
            { id: 'ann3', content: 'يرجى مراجعة الفصل الخامس قبل المحاضرة القادمة.', timestamp: '2024-07-21T09:00:00Z' },
        ],
        groupChat: [],
        content: [
            { id: 'cont3', type: 'summary', title: 'ملخص Normalization', url: '#' },
        ],
    },
    {
        id: 'sec4',
        name: 'مدخل للاقتصاد',
        professorId: 'prof-ksar-1',
        professorName: 'بن الطاهر بختة',
        announcements: [], groupChat: [], content: [],
    },
    {
        id: 'sec5',
        name: 'الأدب العربي الحديث',
        professorId: 'prof3',
        professorName: 'د. أمينة خليل',
        announcements: [], groupChat: [], content: [],
    },
    {
        id: 'sec6',
        name: 'الدوائر الكهربائية',
        professorId: 'prof-djelfa-1',
        professorName: 'أ. عبد القادر رحماني',
        announcements: [], groupChat: [], content: [],
    }
];

export const mockUniversities: University[] = [
    {
        id: 'univ-tiaret-ksar',
        name: 'جامعة ابن خلدون ملحقة قصر الشلالة',
        faculties: [
            { 
                id: 'fac-ksar-eco', 
                name: 'كلية العلوم الاقتصادية', 
                professors: [
                    { id: 'prof-ksar-1', name: 'بن الطاهر بختة', channelId: 'chan-ksar-1' }
                ] 
            },
        ],
    },
    {
        id: 'univ-tiaret',
        name: 'جامعة ابن خلدون تيارت',
        faculties: [
            { 
                id: 'fac-tiaret-sci', 
                name: 'كلية العلوم الدقيقة والإعلام الآلي', 
                professors: [
                    { id: 'prof1', name: 'د. فاطمة الزهراء', channelId: 'chan1' }
                ] 
            },
            { 
                id: 'fac-tiaret-law', 
                name: 'كلية الحقوق والعلوم السياسية', 
                professors: [
                     { id: 'prof2', name: 'د. يوسف إبراهيم', channelId: 'chan2' }
                ] 
            },
        ],
    },
    {
        id: 'univ-djelfa',
        name: 'جامعة زيان عاشور الجلفة',
        faculties: [
            { 
                id: 'fac-djelfa-letters', 
                name: 'كلية الآداب واللغات', 
                professors: [
                    { id: 'prof3', name: 'د. أمينة خليل', channelId: 'chan3' }
                ] 
            },
            { 
                id: 'fac-djelfa-tech', 
                name: 'كلية العلوم والتكنولوجيا', 
                professors: [
                    { id: 'prof-djelfa-1', name: 'أ. عبد القادر رحماني', channelId: 'chan-djelfa-1' }
                ] 
            },
        ],
    }
];
