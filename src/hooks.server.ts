import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'




export const handle: Handle = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookies) => cookies.forEach(({ name, value, options }) =>
                event.cookies.set(name, value, { ...options, path: '/' })
            )
        }
    })

    const { data: { session } } = await event.locals.supabase.auth.getSession()

    event.locals.session = session
    event.locals.user = session?.user ?? null


    const theme = event.cookies.get('user-theme') || 'warm';

    return resolve(event, {
        transformPageChunk: ({ html }) =>
            html.replace('data-theme=""', `data-theme="${theme}"`)
    })
}



