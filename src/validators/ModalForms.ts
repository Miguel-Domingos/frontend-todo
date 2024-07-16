import { z } from "zod";

export type TaskSchemaTypes = z.infer<typeof TaskSchema>;

export const TaskSchema = z.object({
  title: z.string().min(3, { message: "Título inválido" }),
  description: z.string().min(3, { message: "Descrição inválida inválido" }),
  deadline: z.date().min(new Date(), {
    message: "Data inválida",
  }),
  users_id: z
    .number()
    .array()
    .min(1, { message: "Selecione pelo menos 1 usuário" }),
});

export type UserSchemaTypes = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  name: z.string().min(3, { message: "Nome de usuário inválido" }),
  email: z
    .string()
    .min(3, { message: "Email de usuário inválido" })
    .email({ message: "formato de email inválido" }),
  password: z
    .string()
    .min(8, { message: "senha deve conter pelo menos 8 caracteres" }),
});
