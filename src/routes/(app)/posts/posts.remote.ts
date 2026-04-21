import { getRequestEvent, command, query } from "$app/server";
import * as v from 'valibot';


export const saveToDb = command(v.object({
    content: v.string(),
    description: v.pipe(v.string(), v.nonEmpty()),
    title: v.string(),
    isPublic: v.boolean(),
    selected: v.array(v.string())

}),
    async ({ title, content, isPublic, description, selected }) => {
        const event = getRequestEvent()
        const user = event.locals.user
        const username = event.locals.user.user_metadata.username

        const slug = `${user?.user_metadata.username}_${title.toLowerCase().replace(/ /g, '-')}`
        console.log('Sending info to db!')
        const { data, error } = await event.locals.supabase.from('posts').insert({
            title,
            description,
            author_username: username,
            content,
            author_id: user?.id,
            is_public: isPublic,
            slug,
            tag_ids: selected
        })

        if (error) {
            console.log('Supabase error:', JSON.stringify(error))
            return { type: "db_error", message: "Something went wrong" }
        }

        return { type: "success", message: "Post made" }
    })





export const getPublicPostByUser = query(v.string(), async (id) => {
    const event = getRequestEvent()
    const user_id = event.locals.user.id
    if (id !== user_id) {
        return { type: "unauthorized", message: "Unauthorized" }
    }

    const { data, error } = await event.locals.supabase.from('posts').select().eq('author_id', user_id).eq("is_public", true)

    if (error) return { type: "db_error", message: "Something went wrong. Try again" }
    console.log("Success")
    return { type: "success", post: data }


})



export const getPrivatePostByUser = query(v.string(), async (id) => {
    const event = getRequestEvent()
    const user_id = event.locals.user.id
    if (id !== user_id) {
        return { type: "unauthorized", message: "Unauthorized" }
    }

    const { data, error } = await event.locals.supabase.from('posts').select().eq('author_id', user_id).eq("is_public", false)

    if (error) return { type: "db_error", message: "Something went wrong. Try again" }
    console.log("Success")
    return { type: "success", post: data }


})
