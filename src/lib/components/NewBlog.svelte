<script lang="ts">
	import { Button } from "./ui/button";
	import * as Field from "./ui/field";
	import * as InputGroup from "./ui/input-group";

	let error = $state<string>();
</script>

<Field.Set>
	<Field.Legend>Add New Blog</Field.Legend>
	<Field.Description>Connect Smolblog to your blog</Field.Description>
	<Field.Group data-invalid={!!error}>
		<Field.Field>
			<Field.Label for="blogUrl">Blog Address</Field.Label>
			<InputGroup.Root>
				<InputGroup.Addon>
					<InputGroup.Text>https://</InputGroup.Text>
				</InputGroup.Addon>
				<InputGroup.Input type="url" name="blogUrl" placeholder="my.awesome.blog" />
			</InputGroup.Root>
			{#if error}
			<Field.Error>{error}</Field.Error>
			{:else}
			<Field.Description>The homepage for your blog</Field.Description>
			{/if}
		</Field.Field>
	</Field.Group>
	<Field.Field orientation="horizontal">
		<Button>Submit</Button>
	</Field.Field>
</Field.Set>