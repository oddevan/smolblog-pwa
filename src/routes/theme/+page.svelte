<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { html } from "@codemirror/lang-html";
  import * as Resizable from "$lib/components/ui/resizable/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import mustache from "wontache";
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
  import { resolve } from "$app/paths";

  const baseTemplate = `<!DOCTYPE html>
<html>

<head>
	<title>Theme Preview</title>
	<style type="text/css">
		body {
			background: url(${resolve("/")}theme_assets/bodyback.jpg) #fff repeat-y fixed;
			color: #444;
			font-family: "helvetica neue", verdana, sans-serif;
			margin: 0;
		}

		div.layer {
			margin: 0;
			padding: 0;
			min-height: 100vh;
			background: url(${resolve("/")}theme_assets/sideback.png) repeat-y;
		}

		h1 {
			top: 30px;
			left: 30px;
			font-size: 48px;
			position: fixed;
			transform: rotate(-90deg) translateX(-100%);
			transform-origin: left top 0;
			color: white;
			text-shadow: 0 0 5px black;
			margin: 0;
			white-space: nowrap;
			height: min-content;
		}

		/* --- */

		div#nav {
			margin: 0;
			padding: 0;
			position: absolute;
			top: 360;
			left: 0;
			position: fixed;
		}

		div#nav ul {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		div#nav li {
			display: block;
			width: 125px;
		}

		div#nav a {
			display: block;
			text-align: right;
			text-decoration: none;
			background: #fff;
			color: #000;
			line-height: 25px;
			font-weight: bold;
			padding-right: 25px;
		}

		div#nav a:hover {
			background: #000;
			color: #fff;
		}

		/* --- */

		div#main {
			display: block;
			width: 500;
			height: 700;
			/*background: #fff;*/
			color: #777;
			position: relative;
			top: 0;
			left: 125px;
			margin: 0;
			padding: 0;
		}

		div.post {
			margin: 10 0;
			padding: 0 10;
		}

		div.post h2 {
			margin: 5px 0;
			font-size: 18px;
		}

		div.post div.postbody {
			font-size: 14px;
			margin: 0 15px;
		}

		div.post div.metadata {
			font-size: 11px;
			margin: 0;
			padding: 5px;
			border-top: 1px solid #ccc;
		}

		div.post div.metadata p {
			margin: 0;
		}

		div.post div.metadata .date {
			font-weight: bold;
		}

		/* --- */

		div#sidebar {
			position: absolute;
			top: 100;
			left: 625px;
		}

		/* --- */

		div#footer {
			font-size: 10;
			text-align: right;
			border-top: 3px solid #00c;
			border-left: 3px solid #00c;
			background: #009;
			color: #fff;
			opacity: .75;
			margin: 0;
			padding: 3px;
			position: absolute;
			position: fixed;
			bottom: 0;
			right: 0;
		}

		div#footer:hover {
			opacity: 1;
		}

		div#footer p {
			margin: 0;
			padding: 0;
		}

		div#footer a {
			color: #fff;
			text-decoration: underline;
		}
	</style>
</head>

<body>

	<div class="layer">

		<div id="header">
			<h1><span>{{site.name}}</span></h1>
		</div>

		<!-- <div id="nav">
	<ul>
		<li><a href="#">Blog</a></li>
		<li><a href="#">Lifestream</a></li>
		<li><a href="#">Podcast</a></li>
		<li><a href="#">About</a></li>
	</ul>
</div> -->

		<div id="main">

			<div class="post" id="2">
				<h2>{{post.title}}</h2>
				<div class="postbody">
					{{{post.content}}}
				</div>
				<div class="metadata">
					<p class="tags"><span style="font-weight: bold;">Tags</span>: <a
							href="http://plothole.fu.campus/chyrp/?action=tag&amp;name=in-ur">in ur</a>, <a
							href="http://plothole.fu.campus/chyrp/?action=tag&amp;name=lolspeak">lolspeak</a></p>
					<p class="end"><span style="font-weight: bold;">26 June 2008</span> / <a href="#">2 comments</a> / <a
							href="#">Trackback</a></p>
				</div>
			</div>

		</div>

		<div id="sidebar">
			<ul>

				<li>
					<h3>Socials</h3>

					<ul id="social-list">
						{{#site.socials}}
						<li><a href="{{url}}">{{name}}</a></li>
						{{/site.socials}}
					</ul>
				</li>
			</ul>
		</div>

		<div id="footer">
			<p>&copy; {{site.author}}<br>
				Built with brains, love, and <a href="https://smolblog.com/">Smolblog</a>.</p>
		</div>

	</div>

</body>

</html>`;

  let template = $state(baseTemplate);
  let data = $state({
    site: {
      name: "A Smol Blog",
      author: "Smol Snek",
      socials: [
        {
          url: "https://bsky.app/smolblog.com/",
          title: "Bluesky",
        },
        {
          url: "https://mastodon.social/@oddevan/",
          title: "Mastodon",
        },
      ],
    },
    post: {
      title: "A Smol Post",
      content: "<p>Fully-formed <em>marked</em>-up language</p>",
    },
  });

  let previewHtml = $derived(mustache(template)(data));
</script>

<style>
</style>

<div class="w-full h-dvh">
  <Resizable.PaneGroup direction="horizontal">
    <Resizable.Pane defaultSize={50}>
      <ScrollArea class="w-full h-full">
        <Field.Set class="p-4">
          <Field.Legend class="pt-4">Sample Data</Field.Legend>
          <Field.Description
            >This will populate the template preview.</Field.Description
          >
          <Field.Group>
            <Field.Field>
              <Field.Label for="site-title">Site Title</Field.Label>
              <Input
                id="site-title"
                autocomplete="off"
                bind:value={data.site.name}
              />
            </Field.Field>
            <Field.Field>
              <Field.Label for="site-author">Site Author</Field.Label>
              <Input
                id="site-author"
                autocomplete="off"
                bind:value={data.site.author}
              />
            </Field.Field>
          </Field.Group>
          <Field.Group>
            <Field.Field>
              <Field.Label for="post-title">Post Title</Field.Label>
              <Input
                id="post-title"
                autocomplete="off"
                bind:value={data.post.title}
              />
            </Field.Field>
            <Field.Field>
              <Field.Label for="post-content">Post Content</Field.Label>
              <Textarea id="post-content" bind:value={data.post.content} />
              <Field.Description>Use full HTML</Field.Description>
            </Field.Field>
          </Field.Group>
        </Field.Set>
        <CodeMirror class="w-full h-full" lang={html()} bind:value={template}
        ></CodeMirror>
      </ScrollArea>
    </Resizable.Pane>
    <Resizable.Handle withHandle />
    <Resizable.Pane defaultSize={50}>
      <iframe
        class="w-full h-full"
        sandbox=""
        srcdoc={previewHtml}
        title="Theme Preview"
      ></iframe>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</div>
