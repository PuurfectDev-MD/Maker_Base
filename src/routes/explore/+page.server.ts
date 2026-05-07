import { supabase } from "$lib/supabase"
import { redis } from "$lib/server/redis"

export async function load() {
    const CACHE_KEY = "explore:top_posts"

    const cached = await redis.get(CACHE_KEY).catch(() => null);

    if (cached) {
        console.log("Redis Hit");
        return {
            streamed: {
                posts: Promise.resolve(JSON.parse(cached))
            }
        };
    }

    console.log("Redis Miss");


    const fetchAndCache = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select("title, description, author_username, dots_count, slug")
            .order("dots_count", { ascending: false })
            .limit(20);

        if (error) {
            console.error("Supabase Error:", error);
            return [];
        }

        redis.set(CACHE_KEY, JSON.stringify(data), 'EX', 600).catch(e => console.error(e));

        return data;
    };


    return {
        streamed: {
            posts: fetchAndCache()
        }
    };
}