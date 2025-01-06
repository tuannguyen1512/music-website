import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

// Định nghĩa kiểu UserContext
type UserContextType = {
    accessToken: string | null; // Token phiên đăng nhập
    user: User | null;          // Thông tin cơ bản từ Supabase Auth
    userDetails: User | null;   // Thông tin bổ sung từ bảng "users"
    isLoading: boolean;         // Trạng thái tải dữ liệu
    register: (email: string, password: string) => Promise<void>; // Hàm đăng ký
    login: (email: string, password: string) => Promise<void>;    // Hàm đăng nhập
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<User | null>(null);

    // Hàm lấy thông tin người dùng từ bảng "users"
    const getUserDetails = async () => {
        if (!user) return null;

        const { data, error } = await supabase.from("users").select("*").eq("user_id", user.id).single();
        if (error) {
            console.error("Error fetching user details:", error.message);
            return null;
        }
        return data;
    };

    // Hàm đăng ký người dùng mới
    const register = async (email: string, password: string) => {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
            console.error("Error signing up:", signUpError.message);
            throw new Error(signUpError.message);
        }

        // Sau khi đăng ký, lưu người dùng vào bảng "users"
        const userId = signUpData?.user?.id;
        if (userId) {
            const { error: insertError } = await supabase.from("users").insert([
                {
                    user_id: userId,
                    email: email,
                },
            ]);
            if (insertError) {
                console.error("Error inserting user into database:", insertError.message);
                throw new Error(insertError.message);
            }
        }
    };

    // Hàm đăng nhập người dùng
    const login = async (email: string, password: string) => {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
            console.error("Error signing in:", signInError.message);
            throw new Error(signInError.message);
        }
    };

    // useEffect để tải thông tin chi tiết người dùng khi đăng nhập
    useEffect(() => {
        if (user && !isLoadingData && !userDetails) {
            setIsLoadingData(true);
            getUserDetails()
                .then((details) => {
                    setUserDetails(details);
                })
                .finally(() => {
                    setIsLoadingData(false);
                });
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null); // Reset thông tin khi người dùng đăng xuất
        }
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        register,
        login,
    };

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a MyUserContextProvider.");
    }
    return context;
};