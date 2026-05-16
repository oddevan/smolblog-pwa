<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
  import { ModeWatcher, resetMode, setMode, userPrefersMode } from 'mode-watcher';
  import * as Menubar from '$lib/components/ui/menubar';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher/>
<Menubar.Root class="fixed top-2 right-2">
	<Menubar.Menu>
		<Menubar.Trigger>Navigation</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item><a href="/">Onboarding</a></Menubar.Item>
			<Menubar.Item><a href="/theme">Theme Editor</a></Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Mode</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.RadioGroup bind:value={userPrefersMode.current}>
				<Menubar.RadioItem value="light">Light</Menubar.RadioItem>
				<Menubar.RadioItem value="dark">Dark</Menubar.RadioItem>
				<Menubar.RadioItem value="system">Default</Menubar.RadioItem>
			</Menubar.RadioGroup>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>

<div class="flex items-center justify-center min-h-dvh">
	{@render children()}
</div>
