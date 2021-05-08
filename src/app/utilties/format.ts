export function convertSnakeToNormalCase(entry: string) {
	return entry ? entry.split('_').join(' ') : '';
}
