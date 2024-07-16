import { useState } from 'react';

export function useSavedSearch() {
	const item: string = localStorage.getItem('lastSearch') || '';
	const [search, setSearch] = useState<string>(item);
	// useEffect(() => {
	// 	return () => {
	// 		console.log('unmounting', search);
	// 		localStorage.setItem('lastSearch', search);
	// 	};
	// }, [search]);
	return [search, setSearch];
}
