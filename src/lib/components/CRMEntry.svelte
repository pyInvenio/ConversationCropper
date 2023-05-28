<script>
	/**
	 * @type {any}
	 */
	export let name;
	/**
	 * @type {any}
	 */
	export let links;
	let showLinks = false;

	function toggleLinks() {
		showLinks = !showLinks;
	}
</script>

<div class="container" on:click={toggleLinks}>
	<div class="name">
		<p>{name}</p>
		<svg
			class="arrow"
			class:rotate={showLinks}
			xmlns="http://www.w3.org/2000/svg"
			width="36"
			height="36"
			viewBox="0 0 24 24"
			fill="none"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="12 16 16 12 12 8" />
		</svg>
	</div>
	<ul class="links" class:show={showLinks}>
		{#each links as link}
			<li><a href={link.url}>• {link.name}</a></li>
		{/each}
	</ul>
</div>

<style>
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 75%;
		margin: 10px auto; /* Added top and bottom margin */
		background-color: #059669;
		opacity: 0.6;
		border-radius: 0.375rem;
		transition: all 0.3s ease;
		padding: 20px;
	}

	.name {
		color: #ffffff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: 100%;
	}

	.arrow {
		position: absolute;
		right: 0;
		transition: transform 0.3s ease;
		transform-origin: center;
	}

	.rotate {
		transform: rotate(90deg);
	}

	.links {
		display: none;
		list-style-type: none;
		padding: 0;
		color: #ffffff;
		text-align: left;
		width: 100%;
	}

	.links a {
		text-decoration: none;
		color: #ffffff;
	}

	.links a:hover {
		text-decoration: underline;
	}

	.show {
		display: block;
		animation: expand 0.3s ease;
	}

	@keyframes expand {
		0% {
			transform: scaleY(0);
		}
		100% {
			transform: scaleY(1);
		}
	}
</style>
