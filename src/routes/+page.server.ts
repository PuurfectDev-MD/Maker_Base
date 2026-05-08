import { redirect } from '@sveltejs/kit';

export async function load(event) {

    if (event.locals.user?.id) {
        console.log("Redirect triggered for:", event.locals.user.id)
        throw redirect(307, `/${event.locals.user.id}`)

    }
    const statsPromise = event.locals.supabase.rpc('get_site_stats')
        .then(res => res.data);

    const notesPromise = event.locals.supabase.rpc('get_recent_posts_with_tags')
        .then(res => res.data);

    return {
        streamed: {
            stats: statsPromise,
            notes: notesPromise
        }
    };
}