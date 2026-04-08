<script lang="ts">
	let { data } = $props();
</script>

<h1>This is user page</h1>
<h2>Hello! {data.user.user_metadata.username}</h2>

<div class="p-4">
	<h1>Options:</h1>

	<ul class=" px-4 py-4">
		<li>
			<h2><a href="/posts/view/{data.user.id}">View all your notes</a></h2>
		</li>
		<li>
			<h2><a href="/posts/new">Make a new note</a></h2>
		</li>
	</ul>
</div>
