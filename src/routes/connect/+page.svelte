<script lang="ts">
	import NewBlog from "#lib/components/NewBlog.svelte";
	import * as Card from "#lib/components/ui/card/index.js";


</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>New Blog</Card.Title>
	</Card.Header>
	<Card.Content>
		<NewBlog/>
	</Card.Content>
</Card.Root>