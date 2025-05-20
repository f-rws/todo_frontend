import { z } from 'zod';
import type { Task } from '../types';

export const taskSchemaId = z.string();

export const taskSchema = z.object({
  id: taskSchemaId,
  title: z.string().min(1).max(50),
  description: z.string().max(1000),
  status: z.enum(['notStarted', 'inProgress', 'completed']),
  createdAt: z.string().datetime(),
  updatedAt: z.union([z.string().datetime(), z.null()]),
  expiredAt: z.string().date(),
}) satisfies z.ZodSchema<Task>;
