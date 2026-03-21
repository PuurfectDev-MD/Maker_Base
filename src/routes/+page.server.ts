import { redirect } from '@sveltejs/kit'

export function load({ locals }) {
    if (locals.user?.id) {
        redirect(303, `/${locals.user.id}`)
    }
    return {
        user: locals.user
    }
}