import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { ITodo } from "types";

export const todoRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ subject: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.todo.create({
                data: {
                    subject: input.subject,
                    created_datetime: new Date()
                }
            })
        }),
        edit: publicProcedure
        .input(z.object({ todo_id: z.number(), is_checked: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.todo.update({
                where: { todo_id: input.todo_id },
                data: {
                    is_checked: input.is_checked,
                    // If you want to update the datetime when the todo is edited
                    // created_datetime: new Date()
                }
            })
        }),
    getAll: publicProcedure
        .query(async ({ ctx }) => {
            const allTodos: ITodo[] = await ctx.db.todo.findMany({
                orderBy: [
                    { is_checked: 'asc' },
                    { created_datetime: 'desc' }
                ]
            });
            return allTodos;
        }),
});