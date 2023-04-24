export const delay = async (delay: number) => new Promise(resolve => {
	setTimeout(() => {
		resolve('');
	}, delay);
});