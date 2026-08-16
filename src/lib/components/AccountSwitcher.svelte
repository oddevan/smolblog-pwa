<script lang="ts">
	import * as Card from "./ui/card/index";
	import * as Item from "./ui/item/index.js";
	import ScrollArea from "./ui/scroll-area/scroll-area.svelte";


</script>

<Card.Root class="w-md max-w-full">
	<Card.Header>Select a blog</Card.Header>
	<Card.Content>
		<ScrollArea>
			<Item.Root>

			</Item.Root>
		</ScrollArea>
	</Card.Content>
</Card.Root>