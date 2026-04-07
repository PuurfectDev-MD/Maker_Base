import { supabase } from "$lib/supabase"


export async function load() {
    const response = await explorePosts()
    if (response.type == "success") {
        return {
            posts: response.result
        }
    }

    return {
        error: response.message
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