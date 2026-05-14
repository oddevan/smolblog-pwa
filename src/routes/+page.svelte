<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
	import * as Item from "$lib/components/ui/item/index.js";
  import Atmosphere from "$lib/components/icons/Atmosphere.svelte";
  import Mastodon from "$lib/components/icons/Mastodon.svelte";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import Micropub from "$lib/components/icons/Micropub.svelte";
  import Bluesky from "$lib/components/icons/Bluesky.svelte";
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Welcome to Smolblog</Card.Title>
    <Card.Description
      >Let's connect to your social account</Card.Description
    >
  </Card.Header>
	<Card.Content>
		<div class="w-full flex flex-col gap-4">
			<Item.Root variant="outline">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media>
							<Bluesky class="size-6" />
						</Item.Media>
						<Item.Content>
							<Item.Title>Bluesky</Item.Title>
						</Item.Content>
						<Item.Actions>
							<ChevronRight class="size-4" />
						</Item.Actions>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root variant="outline">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media>
							<Mastodon class="size-6" />
						</Item.Media>
						<Item.Content>
							<Item.Title>Mastodon</Item.Title>
						</Item.Content>
						<Item.Actions>
							<ChevronRight class="size-4" />
						</Item.Actions>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root variant="outline">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media>
							<Atmosphere class="size-6" />
						</Item.Media>
						<Item.Content>
							<Item.Title>Atmosphere Account</Item.Title>
							<Item.Description
        >Blacksky, Anisota, Leaflet, etc...</Item.Description
      >
						</Item.Content>
						<Item.Actions>
							<ChevronRight class="size-4" />
						</Item.Actions>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root variant="outline">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media>
							<Micropub class="size-6" />
						</Item.Media>
						<Item.Content>
							<Item.Title>Micropub</Item.Title>
							<Item.Description
								>You know it if you have it.</Item.Description
							>
						</Item.Content>
						<Item.Actions>
							<ChevronRight class="size-4" />
						</Item.Actions>
					</a>
				{/snippet}
			</Item.Root>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button variant="link" class="w-full">I can't / don't want to.</Button>
	</Card.Footer>
</Card.Root>