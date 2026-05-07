export async function load(event) {
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