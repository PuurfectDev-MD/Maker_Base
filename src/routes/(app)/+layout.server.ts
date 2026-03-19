export function load({ locals }) {
    if (!locals.user?.id) {
        window.location.href = "/"
    }

    return {
        user: locals.user

    }
}