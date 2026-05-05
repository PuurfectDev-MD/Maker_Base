import { getRequestEvent, command, query } from "$app/server";
import { redirect } from "@sveltejs/kit";
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

        const updateSteakToDb = await updateStreak(user.id)

        if (updateSteakToDb?.type === "db_error") {
            await event.locals.supabase.from("posts").delete().eq("slug", slug)
            console.log(updateSteakToDb?.message)
            return { type: "db_error", message: "There was an error while updating the streak" }
        }

        return { type: "success", message: "Post made" }
    })



export const handleUpdate = command(v.object({
    id: v.string(),
    content: v.string(),
    description: v.pipe(v.string(), v.nonEmpty()),
    title: v.string(),
    isPublic: v.boolean(),
    selected: v.array(v.string())
}), async ({ id, title, content, isPublic, description, selected }) => {

    const event = getRequestEvent()
    const user = event.locals.user.id

    const { data: existingPost } = await event.locals.supabase.from("posts").select("author_id").eq("id", id).single()
    if (!existingPost || existingPost.author_id !== user) {
        return { type: "unauthorized", message: "You don't own this post." };
    }
    console.log('Sending info to db!')
    const { data, error } = await event.locals.supabase.from('posts').update({
        title,
        description,
        content,
        is_public: isPublic,
        tag_ids: selected
    }).eq('id', id);


    if (error) {
        return { type: "db_error", message: "There was an erorr updating the post" }
    }
    return { type: "success", message: "Post updated :)" }

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


export const deletePost = query(v.string(), async (id) => {
    let event = getRequestEvent()


    if (!event.locals.user.id) {
        throw redirect(303, "/")
    }
    const { error } = await event.locals.supabase.from("posts").delete().eq("id", id)

    if (error) {
        return { type: "db_error", message: "There was an error deleting tags" }
    }
    return { type: "success", message: "deleted succesfully." }
})





async function updateStreak(id: string) {
    const today = new Date().toISOString().split("T")[0];

    const event = getRequestEvent()

    const { data, error } = await event.locals.supabase.from("streak").select("*").eq("user_id", id).single()

    if (error) return { type: "db_error", message: "There was an error fetching your streak" }



    let streak = data.current_streak
    let longest_streak = data.longest_streak

    const lastActive = data.last_active_date
    console.log("lastActive:", lastActive)
    console.log("today:", today)
    if (lastActive == today) return
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
    const isConsecutive = lastActive == yesterday


    const newStreak = isConsecutive ? streak + 1 : 1
    const newLongest = Math.max(newStreak, longest_streak)

    const { error: updateerr } = await event.locals.supabase.from("streak").update({
        longest_streak: newLongest,
        current_streak: newStreak,
        last_active_date: today
    }).eq("user_id", id)

    if (updateerr) {
        console.log(updateerr.message)
        return {
            type: "db_error", message: updateerr.message
        }

    }
    return { type: "success", message: "Your streak was updated." }
}
