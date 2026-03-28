export async function load({ params, locals }) {
    const { data, error } = await locals.supabase
        .from('posts')
        .select()
        .eq('slug', params.slug)
        .single()

    if (error) return { type: 'db_error', message: 'Something went wrong' }

    return { type: 'success', post: data }
}