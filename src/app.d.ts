import type { SupabaseClient, Session } from '@supabase/supabase-js'

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient
			session: Session | null
			user: User | null
		}
	}
}

export { }