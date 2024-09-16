export interface Application {
    id: number;
    job_id: number;
    resume: string;
    name: string;
    experience: number;
    education: string;
    skills: string;
    status: string;
    created_at: string;
    job?: {
        title: string;
        company?: {
            name: string;
        };
    };
}