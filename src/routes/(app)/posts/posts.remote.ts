import { form, getRequestEvent, command } from "$app/server";
import { redirect } from "@sveltejs/kit";
import * as v from 'valibot';




export const createPost = form(
    v.object({
        title: v.pipe(v.string(), v.nonEmpty()),
        content: v.pipe(v.string(), v.nonEmpty()),
        isPublic: v.optional(v.boolean(), true),
    }),


    async ({ title, content, isPublic }) => {
        const event = getRequestEvent()
        const user = event.locals.user

        if (!user.id) {
            redirect(401, 'Unauthorized')
        }

        const slug = `${user.user_metadata.username}_${title.toLowerCase().replace(/ /g, '-')}`

        const { error } = await event.locals.supabase.from('posts').insert({
            title,
            content,
            author_id: user.id,
            is_public: isPublic,
            slug

        })


        if (error) {
            console.log(error.details + error.message)
            return { error: error.message }
        }


        redirect(303, `/view/${slug}`)
    }
)



export const saveToDb = command(v.object({
    content: v.string(),
    title: v.string(),
    isPublic: v.boolean(),

}),
    async ({ title, content, isPublic }) => {
        const event = getRequestEvent()
        const user = event.locals.user
        const slug = `${user?.user_metadata.username}_${title.toLowerCase().replace(/ /g, '-')}`
        console.log('Sending info to db!')
        const { data, error } = await event.locals.supabase.from('posts').insert({
            title,
            content,
            author_id: user?.id,
            is_public: isPublic,
            slug
        })

        if (error) {
            console.log('Supabase error:', JSON.stringify(error))
            return { type: "db_error", message: "Something went wrong" }
        }

        return { type: "success", message: "Post made" }
    })