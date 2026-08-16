<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
	import * as Item from "$lib/components/ui/item/index.js";
  import Atmosphere from "$lib/components/icons/Atmosphere.svelte";
  import Mastodon from "$lib/components/icons/Mastodon.svelte";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import Plus from "@lucide/svelte/icons/plus";
  import Micropub from "$lib/components/icons/Micropub.svelte";
  import Bluesky from "$lib/components/icons/Bluesky.svelte";
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
  import Tumblr from "$lib/components/icons/Tumblr.svelte";
  import MicroDotBlog from "$lib/components/icons/MicroDotBlog.svelte";
  import WordPress from "$lib/components/icons/WordPress.svelte";

	import { resolve } from "$app/paths";

	let blogUrl = $state<string>();
	let working = $state(false);
	let buttonDisabled = $derived(working || !blogUrl);
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Welcome to Smolblog</Card.Title>
    <Card.Description
      >Select a blog</Card.Description
    >
  </Card.Header>
	<Card.Content>
		<ScrollArea class="w-full h-64">
		<div class="w-full flex flex-col gap-4">
			<Item.Root variant="outline">
				{#snippet child({ props })}
					<a href={resolve("/")} {...props}>
						<Item.Content>
							<Item.Title>Bluesky</Item.Title>
						</Item.Content>
						<Item.Actions>
							<ChevronRight class="size-4" />
						</Item.Actions>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root variant="muted">
				{#snippet child({ props })}
					<a href={resolve("/new-blog")} {...props}>
						<Item.Media>
							<Plus class="size-6" />
						</Item.Media>
						<Item.Content>
							<Item.Title>Add new blog</Item.Title>
						</Item.Content>
					</a>
				{/snippet}
			</Item.Root>
		</div>
		</ScrollArea>
	</Card.Content>
	<Card.Footer class="justify-end">
		<a href={resolve("/about")}>What is this?</a>
	</Card.Footer>
</Card.Root>