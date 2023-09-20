import { z } from "zod";

//schemas
const schemaTask = z.object({
  title: z
    .string()
    .max(20, "execido o limite de caracteres (20).")
    .min(6, "O titulo deve ter no minimo 6 caracteres"),
  message: z
    .string()
    .max(50, "execido o limite de caracteres (50).")
    .min(6, "O titulo deve ter no minimo 6 caracteres"),
});

const schemaCreateAccount = z
  .object({
    email: z.string().email("E-mail inválido."),
    name: z.string().nonempty().min(3, "O nome deve ter no mínimo 3 letras."),
    password: z.string().min(6, "Senha menor que 6 dígitos."),
    rePassword: z.string().min(6, "Senha de confirmação menor que 6 dígitos."),
  })
  .refine(({ password, rePassword }) => password === rePassword, {
    message: "Senhas não conferem",
    path: ["rePassword"],
  });
const schemaLogin = z.object({
  email: z.string().email("E-mail invalido"),
  password: z.string().min(6, "Senha menor que 6 dígitos"),
});

//types
type TLogin = z.infer<typeof schemaLogin>;
type TCreateAccount = z.infer<typeof schemaCreateAccount>;
type TTask = z.infer<typeof schemaTask>;

export { schemaCreateAccount, schemaLogin, schemaTask };
export type { TCreateAccount, TLogin, TTask };
