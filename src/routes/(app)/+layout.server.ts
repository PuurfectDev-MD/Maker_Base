import { redirect } from '@sveltejs/kit'

export async function load({ locals: { supabase, session } }) {
    if (!session) {
        throw redirect(303, '/auth/signup')
    }

    const { data: profile } = await supabase.from('users').select('*').eq("id", session.user.id).single()

    return {
        user: {
            ...session.user,
            username: profile.username,
            avatarUrl: profile.avatar_url,
            emailVerified: profile.emailVerified,
            createdAt: profile.createdAt,
        }
    }
}