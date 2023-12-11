export type ITodo = {
    todo_id: number,
    subject: string,
    created_datetime: Date,
    is_checked: boolean | null = false,
}