import { page } from '$app/state';


export async function load({ locals, params }) {
    const { id } = params;
    const { data: post, error } = await locals.supabase.from("posts").select("*").eq("id", id).single()

    if (error || !post) {
        return {
            status: 404,
            error: 'Post not found'
        };
    }

    if (post.author_id !== locals.user.id) {

        return {
            status: 403,
            error: 'Unauthorized'
        };
    }

    return { post }
}
