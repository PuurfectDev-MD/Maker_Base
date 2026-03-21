import { getRequestEvent, query } from "$app/server";
import * as v from 'valibot';

export const getPostBySlug = query(v.string(), async (viewSlug) => {
    const event = getRequestEvent()
    const { data, error } = await event.locals.supabase.
        from('posts').
        select().eq('slug', viewSlug).
        single()
    if (error) return error.message

    return data
})