import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface LogHistoryProps {
    userId: string;
    songId: number;
}

const useLogHistory = () => {
    const supabaseClient = useSupabaseClient();

    const logHistory = async ({ userId, songId }: LogHistoryProps) => {
        if (!userId || !songId) {
            console.error("User ID or Song ID is missing");
            return;
        }

        const { error } = await supabaseClient
            .from("history")
            .insert({
                user_id: userId,
                song_id: songId,
            });

        if (error) {
            console.error("Error logging history:", error.message);
        } else {
            console.log("History logged successfully");
        }
    };

    return logHistory;
};

export default useLogHistory;