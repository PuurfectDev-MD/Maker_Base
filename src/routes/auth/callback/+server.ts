import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
    const code = url.searchParams.get('code')
    const next = url.searchParams.get('next') ?? '/'

    if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data?.user) {
            const user = data.user
            for (let i = 0; i < 10; i++) {
                const { data: userRow } = await supabase.from("users").select("*").eq("id", user.id).maybeSingle()

                if (userRow) {
                    break
                }
            }

            throw redirect(303, `/${data.user.id}`)
        }

    }
    throw redirect(303, `/`)
}