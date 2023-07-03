import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://hnagncamzhjfqebflwfn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYWduY2FtemhqZnFlYmZsd2ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzODQ2NzcsImV4cCI6MjAwMzk2MDY3N30.CXMbfDDk20_YSTeOITeNnrIT7w6U8gdxm314megKww8'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
    const { user } = useAuthUser()

    user.value = session?.user || null
})

export default function useSupabase() {
    return { supabase }
}