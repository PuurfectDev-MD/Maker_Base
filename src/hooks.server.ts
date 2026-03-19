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


    event.locals.session = (await event.locals.supabase.auth.getSession()).data.session
    event.locals.user = event.locals.session?.user ?? null

    return resolve(event)
}



