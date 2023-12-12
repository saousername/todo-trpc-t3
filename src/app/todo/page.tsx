"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import { ITodo } from "types";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function todoPage() {
  const { isLoading, data, isError } = api.todo.getAll.useQuery();
  const u = api.useUtils();
  //  const [todos, setTodos] = useState<ITodo[]>(todosFromServer.data || []);

  // console.log(todosFromServer.data);

  // useEffect(() => {
  //     getTodos();
  // }, []);

  // async function getTodos() {
  //     ;
  // }

  const createTodo = api.todo.create.useMutation({
    onSuccess: async () => {
      console.log("successful create");
      await u.todo.invalidate();
    },
  });

  const editTodo = api.todo.edit.useMutation({
    onSuccess: async () => {
      console.log("successful edit");
      await u.todo.invalidate();
    },
  });

  const [newTodoInput, setNewTodoInput] = useState<string>("");

  async function addNewTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("click");

    // setTodos((p: ITodo[]) => { let t = p; t.push({
    //     subject: newTodoInput || "No Subject",
    //     createdDatetime: new Date(),
    // } as ITodo); return t })
    // const updated = [{
    //     id: getRandomInt(1000),
    //     subject: newTodoInput || "No Subject",
    //     createdDatetime: new Date(),
    // } as ITodo, ...todos]
    // setTodos(updated);
    setNewTodoInput("");
    createTodo.mutate({ subject: newTodoInput || "No Subject" });
  }

  async function toggleChecked(todo: ITodo) {
    // const others = todos.filter((t) => t.id !== todo.id);
    // let newTodo = todo;
    // newTodo.isChecked = !newTodo.isChecked;
    // if(newTodo.isChecked) {
    //     setTodos([...others, newTodo]);
    // } else {
    //     setTodos([newTodo, ...others]);
    // }
    editTodo.mutate({ todo_id: todo.todo_id, is_checked: !todo.is_checked });
  }

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <h1 className="text-3xl font-semibold">To-Do</h1>
      <div className="flex w-full flex-row justify-center gap-2.5">
        <form
          onSubmit={addNewTodo}
          className="grid w-full max-w-sm items-center gap-1.5"
        >
          <Label htmlFor="email">New Item</Label>
          <>
            <Input
              value={newTodoInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTodoInput(e.target.value)
              }
              placeholder="e.g Complete challenge for Simeon"
            />
            <Button type="submit">Create</Button>
          </>
        </form>
      </div>
      <div className="flex w-full max-w-[400px] flex-col items-center gap-2 py-4">
        {!isLoading &&
          !isError &&
          data &&
          data.map((todo) => (
            <TodoItem
              key={todo.todo_id}
              todo={todo}
              toggleChecked={toggleChecked}
            />
          ))}
      </div>
    </div>
  );
}

function TodoItem({
  todo,
  toggleChecked,
}: {
  todo: ITodo;
  toggleChecked: (todo: ITodo) => void;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-start gap-2 rounded-sm bg-gray-50 p-2">
      <Checkbox
        checked={todo.is_checked ?? false}
        onCheckedChange={() => toggleChecked(todo)}
      />
      <p className="text-lg">{todo.subject}</p>
    </div>
  );
}
