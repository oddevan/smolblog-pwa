export let accounts = $state([]);

$effect(() => {
	const savedAccounts = localStorage.getItem('accounts');
	if (savedAccounts) accounts = JSON.parse(savedAccounts);
});

$effect(() => {
	localStorage.setItem('accounts', JSON.stringify(accounts));
});
