import { error } from 'console'


export function load({ locals }) {
    if (!locals.user?.id) {
        error(401, "You cant make a post")
    }

    return { user: locals.user }
}