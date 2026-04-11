import { supabase } from "$lib/supabase"


export async function load() {
    const responsePromise = explorePosts()

    return {
        posts: responsePromise
    }
}

async function explorePosts() {
    const { data, error } = await supabase.from("posts").select("*").order("dots_count", { ascending: false }).limit(20)
    if (error) {
        console.log(error.message)
        return { type: "db_error", message: "Failed to fetch top posts" }
    }

    return { type: "success", result: data }
}