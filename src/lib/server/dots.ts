import { supabase } from "$lib/supabase";

export async function viewDots(postSlug: string) {
    const { error } = await supabase.from("posts").select().eq("post_slug", postSlug)


}