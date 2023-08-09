export const load = (async ({ locals: {
	supabase
} }) => {
	const { data } = await supabase.from('Users').select();

	return {
		users: data
	};
}) satisfies PageServerLoad;
