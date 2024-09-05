import supabaseClient from "@/utils/supabase";

// Defining the parameters for the getJobs function
interface GetJobsParams {
    location?: string;
    company_id?: number;
    searchQuery?: string;
}

// Fetch Jobs
export async function getJobs(token: string, { location, company_id, searchQuery }: GetJobsParams) {
    const supabase = await supabaseClient(token);
    let query = supabase
        .from("jobs")
        .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");

    if (location) {
        query = query.eq("location", location);
    }

    if (company_id) {
        query = query.eq("company_id", company_id);
    }

    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching Jobs:", error);
        return null;
    }

    return data;
}