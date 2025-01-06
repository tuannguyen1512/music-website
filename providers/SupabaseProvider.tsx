'use client'

import { Database } from "@/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"

interface Props{
    children: React.ReactNode
}

const SupabaseProvider: React.FC<Props> = ({children}) => {
    const [supabaseClient] = useState(()=>createClientComponentClient<Database>())

    return(
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}

export default SupabaseProvider