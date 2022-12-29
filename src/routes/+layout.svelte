<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/leaderboard">Leaderboard</a>
	<a href="/gameweek/1">Fixtures</a>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 2rem;
	}

	main {
		padding: 2rem;
	}
</style>
