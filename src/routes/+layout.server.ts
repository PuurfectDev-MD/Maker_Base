

export function load({ locals, cookies }) {
    const theme = cookies.get('user-theme') || 'blueprint';
    return {
        user: locals.user,
        theme: theme
    }
}