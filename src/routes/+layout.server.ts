

export function load({ locals, cookies }) {
    const theme = cookies.get('user-theme') || 'warm';
    return {
        user: locals.user,
        theme: theme
    }
}