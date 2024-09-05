import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

type FetchCallback = (token: string, options: Record<string, unknown>, ...args: unknown[]) => Promise<unknown>;

const useFetch = (cb: FetchCallback, options: Record<string, unknown> = {}) => {
    const [data, setData] = useState<unknown>(undefined);
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const { session } = useSession();

    const fn = async (...args: unknown[]) => {
        setLoading(true);
        setError(null);

        if (!session) {
            setError(new Error("Session is not available"));
            setLoading(false);
            return;
        }

        try {
            const supabaseAccessToken = await session.getToken({
                template: "supabase",
            });
            if (!supabaseAccessToken) {
                throw new Error("Failed to retrieve Supabase token");
            }
            const response = await cb(supabaseAccessToken, options, ...args);
            setData(response);
            setError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error("Unknown error occurred"));
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn };
};

export default useFetch;
