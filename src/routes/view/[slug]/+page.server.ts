export async function load({ params, locals }) {
    const slugPostPromise = loadPostBySlug(params.slug, locals)

    return { slugPost: slugPostPromise }
}

async function loadPostBySlug(slug: string, locals: App.Locals) {
    const { data, error } = await locals.supabase
        .from('posts')
        .select()
        .eq('slug', slug)
        .single()

    if (error) return { type: 'db_error', message: 'Something went wrong' }

    return { type: "success", post: data }

}