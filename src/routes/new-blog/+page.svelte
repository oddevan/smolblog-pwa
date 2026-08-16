<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input";
  import * as Item from "$lib/components/ui/item";
  import Spinner from "$lib/components/ui/spinner/spinner.svelte";
  import Micropub, { type MicropubEndpointsReponse } from 'micropub-helper';

	let blogUrl = $state<string>();
	let working = $state(false);
  let endpoints = $state<MicropubEndpointsReponse>();
  let authUrl = $state<string>();
	let buttonDisabled = $derived(working || !blogUrl);

  let mp: Micropub;
  async function connect() {
    if (!blogUrl) { return; }
    try {
      working = true;
      endpoints = undefined;
      const state = crypto.randomUUID();
      mp = new Micropub({
        clientId: resolve("/"),
        redirectUri: resolve("/new-blog"),
        me: blogUrl,
        state,
      });
      endpoints = await mp.getEndpointsFromUrl(blogUrl);
      console.log({options: mp.options, state});
      authUrl = await mp.getAuthUrl();
    } catch(e) {
      console.error(e)
    } finally {
      working = false;
    }
  }
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Add New Blog</Card.Title>
  </Card.Header>
	<Card.Content>
		<Field.Set>
			<Field.Group>
          <Field.Field>
            <Field.Label for="blog-url"
              >Blog Address</Field.Label
            >
            <Input
              id="blog-url"
              placeholder="mycool.blog"
              required
							type="url"
							bind:value={blogUrl}
            />
						<Field.Description>Just the home page for your blog</Field.Description>
          </Field.Field>
			</Field.Group>
		</Field.Set>
    {#if authUrl}
      <Item.Root>
        <Item.Content>
          <Item.Title>Redirect To</Item.Title>
          <Item.Description>{authUrl}</Item.Description>
        </Item.Content>
        <Item.Actions>
          <Button href={authUrl}>Sign In</Button>
        </Item.Actions>
      </Item.Root>
    {/if}
    {#if endpoints}
      <Item.Root>
        <Item.Content>
          <Item.Title>Auth</Item.Title>
          <Item.Description>{endpoints.auth}</Item.Description>
        </Item.Content>
      </Item.Root>
      <Item.Root>
        <Item.Content>
          <Item.Title>Token</Item.Title>
          <Item.Description>{endpoints.token}</Item.Description>
        </Item.Content>
      </Item.Root>
      <Item.Root>
        <Item.Content>
          <Item.Title>Publish</Item.Title>
          <Item.Description>{endpoints.micropub}</Item.Description>
        </Item.Content>
      </Item.Root>
    {/if}
	</Card.Content>
	<Card.Footer>
		<Button variant="default" class="w-full" disabled={buttonDisabled} onclick={connect}>
      {#if working}
        <Spinner />
      {/if}
      Connect
    </Button>
	</Card.Footer>
</Card.Root>
