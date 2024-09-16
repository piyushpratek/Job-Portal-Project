import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// - Apply to job ( candidate )
export async function applyToJob(token: string, _: any, jobData: { job_id: number; name: string; status: string; candidate_id: string; resume: string | ArrayBuffer | ArrayBufferView | Blob | Buffer | File | FormData | NodeJS.ReadableStream | ReadableStream<Uint8Array> | URLSearchParams; experience: string | number }) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume-${random}-${jobData.candidate_id}`;

    const { error: storageError } = await supabase.storage
        .from("resumes")
        .upload(fileName, jobData.resume);

    if (storageError) throw new Error("Error uploading Resume");

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

    const { data, error } = await supabase
        .from("applications")
        .insert([
            {
                ...jobData,
                resume,
            },
        ])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Error submitting Application");
    }

    return data;
}