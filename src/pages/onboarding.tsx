import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from "react-spinners";

const Onboarding = () => {
    const { user, isLoaded } = useUser()
    console.log(user);
    const navigate = useNavigate();

    type Role = "candidate" | "recruiter";

    const navigateUser = useCallback((currRole: Role) => {
        navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
    }, [navigate]);

    const handleRoleSelection = async (role: Role) => {
        if (!user) {
            console.error("User is not available");
            return;
        }

        try {
            await user.update({ unsafeMetadata: { role } });
            console.log(`Role updated to: ${role}`);
            navigateUser(role);
        } catch (err) {
            console.error("Error updating role:", err);
        }
    };

    useEffect(() => {
        if (user?.unsafeMetadata?.role) {
            navigateUser(user.unsafeMetadata.role as Role);
        }
    }, [navigateUser, user]);

    if (!isLoaded) {
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
    }

    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
                I am a...
            </h2>
            <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
                <Button
                    variant="blue"
                    className="h-36 text-2xl"
                    onClick={() => handleRoleSelection("candidate")}
                >
                    Candidate
                </Button>
                <Button
                    variant="destructive"
                    className="h-36 text-2xl"
                    onClick={() => handleRoleSelection("recruiter")}
                >
                    Recruiter
                </Button>
            </div>
        </div>
    )
}

export default Onboarding