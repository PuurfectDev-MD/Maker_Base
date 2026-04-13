export async function load({ locals }) {
    const resultPromise = getUserSetup(locals.user.id, locals)

    return { result: resultPromise }
}
async function getUserSetup(userid: string, locals: App.Locals) {

    //getting the user recent post
    const postsPromise = locals.supabase.from("posts").select().limit(3).order("created_at", { ascending: false }).eq("author_id", locals.user.id)

    //getting user post count
    const countPromise = locals.supabase.from("posts").select("*", { count: "exact", head: true }).eq("author_id", userid)

    const [postsResult, countResult] = await Promise.all([postsPromise, countPromise]);

    if (postsResult.error || countResult.error) {
        console.log(postsResult.error)
        console.log(countResult.error)
        return { type: "db_error", message: "There was an error fetching user data" }
    }


    return {
        type: 'success',
        posts: postsResult.data,
        totalCount: countResult.count
    }

}