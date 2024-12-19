export interface ITask {
	id: string;
	title: string;
	completed: boolean;
}

export function formatTaskTitle(title: string): string {
	return title.trim().toUpperCase();
}
export const API_BASE_URL = 'http://localhost:3000';
