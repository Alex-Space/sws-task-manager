export interface ITask {
    id: string;
    title: string;
    completed: boolean;
}
export declare function formatTaskTitle(title: string): string;
export declare const API_BASE_URL = "http://localhost:3000";
