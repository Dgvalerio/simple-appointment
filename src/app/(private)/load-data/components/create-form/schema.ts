import { z } from 'zod';

export const loadClientsSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail deve ser informado.')
    .email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});
