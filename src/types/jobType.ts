type Company = {
    logo_url: string;
};

export type Job = {
    id: string;
    title?: string | undefined;
    location?: string | undefined;
    description?: string | undefined;
    company?: Company;
    saved?: any[]; // Adjust this type based on the actual structure
};