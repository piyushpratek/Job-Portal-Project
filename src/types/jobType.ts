export type Company = {
    id: number;
    logo_url: string;
    name: string;         // Name of the company
    location?: string;    // Optional location field
};

export type Job = {
    id: number;
    title?: string | undefined;
    location?: string | undefined;
    description?: string | undefined;
    company?: Company;
    saved?: any[]; // Adjust this type based on the actual structure
    isOpen: boolean;      // Whether the job is open for applications
    recruiter_id: string;
    company_id: number;
    requirements: string;

};