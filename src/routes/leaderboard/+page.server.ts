export const load = (async ({ local: {
	supabase
} }) => {
	const { data } = await supabase.from('Users').select();

	return {
		users: data
	};
}) satisfies PageServerLoad;
