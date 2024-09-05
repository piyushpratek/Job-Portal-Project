import { useSession } from '@clerk/clerk-react';
import { useState } from 'react';

type FetchCallback<T, U extends any[]> = (token: string, params: T, ...args: U) => Promise<any>;

const useFetch = <T, U extends any[]>(cb: FetchCallback<T, U>, options: T = {} as T) => {
    const [data, setData] = useState<any>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const { session } = useSession();

    const fn = async (...args: U) => {
        setLoading(true);
        setError(null);

        try {
            const supabaseAccessToken = await session?.getToken({
                template: 'supabase',
            });
            // Check if supabaseAccessToken is valid
            if (typeof supabaseAccessToken !== 'string') {
                throw new Error('Supabase access token is not available.');
            }
            const response = await cb(supabaseAccessToken, options, ...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fn };
};

export default useFetch;
