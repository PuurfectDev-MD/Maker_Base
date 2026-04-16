<script lang="ts">
	import { supabase } from '$lib/supabase';
	let { data } = $props();
	let signing = $state(false);
	let error_message = $state('');
	let email_sent = $state(false);

	import { GoogleLogoIcon, Check } from 'phosphor-svelte';
	let loading = $state(false);

	async function signInWithGoogle() {
		loading = true;
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});
		if (error) {
			console.error(error);
			loading = false;
		}
	}

	async function signup(e: Event) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		if (form.password.value != form.password_confirm.value) {
			error_message = 'Passwords dont match';
			return;
		}
		signing = true;
		const { data, error: signupError } = await supabase.auth.signUp({
			email: form.email.value,
			password: form.password.value,
			options: {
				emailRedirectTo: `${window.location.origin}/auth/verify`,
				data: {
					username: form.username.value,
					avatar_url: form.avatar_selection.value || null
				}
			}
		});

		if (signupError) {
			signing = false;
			error_message = signupError.message;
			return;
		}
	}
</script>

<div class="flex flex-row justify-center gap-y-4">
	<form onsubmit={signup} class="px-10 pt-20 pb-10 md:pt-10">
		<div class="flex gap-x-5 p-4">
			<h1 class="text-2xl font-bold md:text-3xl">Signup</h1>
		</div>

		<div class="row p-4">
			<label>
				Username:
				<input class="input-form ml-4 text-black" required type="text" name="username" />
			</label>
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
		<div class="flex items-center p-4">
			<label class="w-40">Confirm Password:</label>
			<input
				class="input-form mb-2 flex-1 text-black"
				required
				type="password"
				name="password_confirm"
			/>
		</div>
		<div class="avatar_select hidden">
			<input name="avatar_selection" />
		</div>

		<div class="flex justify-center gap-x-8 pt-5">
			<div class="mx-3">
				<button type="submit"> <Check size={32}></Check></button>
			</div>
			<div class="mx-4 h-10 w-px bg-[var(--accent)]"></div>
			<div class="">
				<button onclick={signInWithGoogle} disabled={loading}
					><GoogleLogoIcon size={32}></GoogleLogoIcon></button
				>
			</div>
		</div>
	</form>
</div>

<div class="flex justify-center gap-x-2 md:gap-x-4">
	<h2 class="p-3">Already Have an account?</h2>
	<a href="/auth/login" class="rounded-2xl border-2 border-r-4 p-3 no-underline!"> Login</a>
</div>

{#if error_message}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">{error_message}</p>
	</div>
{/if}

{#if signing}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">Check your email :)</p>
	</div>
{/if}

{#if email_sent}
	<div class="mt-4 rounded-lg p-4 text-white">
		Check your email and click the link to verify your account
	</div>
{/if}
