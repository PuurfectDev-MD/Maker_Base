import { getRequestEvent } from "$app/server";


export async function load({ locals }) {
    const resultPromise = getUserSetup(locals.user.id)

    return { result: resultPromise }
}
async function getUserSetup(userid: string) {
    let event = getRequestEvent()

    //getting the user recent post
    const postsPromise = event.locals.supabase.from("posts").select().limit(3).order("created_at", { ascending: false }).eq("author_id", event.locals.user.id)

    //getting user post count
    const countPromise = event.locals.supabase.from("posts").select("*", { count: "exact", head: true }).eq("author_id", userid)

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