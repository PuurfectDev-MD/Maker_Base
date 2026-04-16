<script lang="ts">
	import { supabase } from '$lib/supabase';
	let logging_in = $state(false);
	let loading = $state(false);
	let error_message = $state('');

	import { GoogleLogoIcon, Check } from 'phosphor-svelte';

	async function logInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
				queryParams: {
					access_type: 'offline',
					prompt: 'select_account'
				}
			}
		});
	}
	async function login_with_email(e: Event) {
		logging_in = true;
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const { data, error } = await supabase.auth.signInWithPassword({
			email: form.email.value,
			password: form.password.value
		});

		if (error) {
			error_message = ' The credentials dont match to any user. Try again.';
			logging_in = false;
		}

		await new Promise((resolve) => setTimeout(resolve, 1000));
		window.location.href = `/${data.user?.id}`;
	}
</script>

<div class="flex flex-row justify-center gap-y-4">
	<form onsubmit={login_with_email} class="pt-20 md:pt-10">
		<div class="flex gap-x-5 p-4">
			<h1 class="text-2xl font-bold md:text-3xl">Login</h1>
		</div>
		<div class="row p-4">
			<label>
				Email:
				<input class="input-form ml-4 text-black" required type="email" name="email" />
			</label>
		</div>

		<div class="row p-4">
			<label>
				Password:
				<input class="input-form ml-4 text-black" required type="password" name="password" />
			</label>
		</div>

		<div class="flex justify-center gap-x-8 pt-5">
			<div class="mx-3">
				<button type="submit"> <Check size={32}></Check></button>
			</div>
			<div class="mx-4 h-10 w-px bg-[var(--accent)]"></div>
			<div class="">
				<button type="button" onclick={logInWithGoogle} disabled={loading}
					><GoogleLogoIcon size={32}></GoogleLogoIcon></button
				>
			</div>
		</div>
	</form>
</div>

<div class="bottom-0 mt-10 flex flex-row justify-center gap-x-10 p-8">
	<h1 class="p-3">Dont have an account?</h1>
	<a href="/auth/signup" class="rounded-2xl border-2 border-r-4 p-3 no-underline!"> Signup</a>
</div>

{#if error_message}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">{error_message}</p>
	</div>
{/if}

{#if logging_in}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">Give me a moment...</p>
	</div>
{/if}
