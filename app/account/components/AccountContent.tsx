'use client'

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation"
import Button from "@/components/Button";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const AccountContent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser()
    const supabaseClient = useSupabaseClient();

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    //only for signed in users
    useEffect(()=>{
        if(!isLoading && !user){
            router.replace('/')
        }
    },[isLoading,user,router])

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const { data, error } = await supabaseClient
                    .from('users')
                    .select('email, password')
                    .eq('user_id', user.id)
                    .single();

                if (error) {
                    console.error("Error fetching user data:", error);
                    return;
                }

                setEmail(data?.email || 'N/A');
                setPassword(data?.password || 'N/A');
            }
        };

        fetchUserData();
    }, [user, supabaseClient]);

    return (
        <div className="mb-7 px-6">
            <div className="flex flex-col gap-y-4">
                <p className="text-lg font-semibold">Thông tin cá nhân</p>
                <div className="text-sm">
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Password:</strong> {password}</p>
                </div>
            </div>
        </div>
    );
}

export default AccountContent