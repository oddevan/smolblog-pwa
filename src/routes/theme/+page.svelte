<script lang="ts">
	import CodeMirror from "svelte-codemirror-editor"
	import { html } from "@codemirror/lang-html"
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import mustache from 'wontache';
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";

	const baseTemplate = `<!DOCTYPE html>
<html>
	<head>
		<title>{{site.name}}</title>
	</head>
	<body>
		<p>{{site.name}}</p>
		<h1>{{post.title}}</h1>
		{{{post.content}}}
		<p>Built with brains, love, and <a href="https://smolblog.com/">Smolblog</a>.</p>
	</body>
</html>`;

	let template = $state(baseTemplate);
	let data = $state({
		site: { name: 'A Smol Blog' },
		post: {
			title: 'A Smol Post',
			content: '<p>Fully-formed <em>marked</em>-up language</p>',
		},
	})

	let previewHtml = $derived(mustache(template)(data));
</script>

<style>

</style>
 
<div class="w-full h-dvh">
<Resizable.PaneGroup direction="horizontal">
 <Resizable.Pane defaultSize={50}>
  <Resizable.PaneGroup direction="vertical">
   <Resizable.Pane defaultSize={25}>
		<ScrollArea class="w-full h-full">
    <Field.Set class="p-4">
			<Field.Legend>Sample Data</Field.Legend>
			<Field.Description>This will populate the template preview.</Field.Description>
			<Field.Group>
				<Field.Field>
					<Field.Label for="site-title">Site Title</Field.Label>
					<Input id="site-title" autocomplete="off" bind:value={data.site.name} />
				</Field.Field>
			</Field.Group>
			<Field.Group>
				<Field.Field>
					<Field.Label for="post-title">Post Title</Field.Label>
					<Input id="post-title" autocomplete="off" bind:value={data.post.title} />
				</Field.Field>
				<Field.Field>
					<Field.Label for="post-content">Post Content</Field.Label>
					<Textarea id="post-content" bind:value={data.post.content} />
					<Field.Description>Use full HTML</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>
		</ScrollArea>
   </Resizable.Pane>
   <Resizable.Handle withHandle />
   <Resizable.Pane defaultSize={75}>
		<ScrollArea class="w-full h-full">
		<CodeMirror class="w-full h-full" lang={html()} bind:value={template}></CodeMirror>
		</ScrollArea>
   </Resizable.Pane>
  </Resizable.PaneGroup>
 </Resizable.Pane>
 <Resizable.Handle withHandle />
 <Resizable.Pane defaultSize={50}>
	<iframe class="w-full h-full" sandbox="" srcdoc={previewHtml} title="Theme Preview"></iframe>
 </Resizable.Pane>
</Resizable.PaneGroup>
</div>