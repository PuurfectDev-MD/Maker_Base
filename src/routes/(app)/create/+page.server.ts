import { redirect } from '@sveltejs/kit'
import { error } from 'console'


export function load({ locals }) {
    if (!locals.user?.id) {
        error(401, "You cant make a post")
        redirect(303, "/auth/signup")
    }

    return { user: locals.user }
}