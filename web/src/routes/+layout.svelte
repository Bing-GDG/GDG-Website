<script>import "../app.css";
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();</script>

<svelte:head>
	<link rel="icon" href="{favicon}" />
</svelte:head>

<!-- header bar (navbar probably) -->
<header class="bg-background flex flex-row items-center border-b py-3 px-2 sticky top-0">
	<!--
		<h1 class="mr-auto">TITLE</h1>
		<h1 class="">BUTTONS</h1>
	-->


</header>

{@render children()}
