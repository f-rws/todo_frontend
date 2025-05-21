import { z } from 'zod';
import type { Task } from '../types';

export const taskSchemaId = z.string();
export const taskSchemaTitle = z.string().min(1).max(50);
export const taskSchemaDescription = z.string().max(1000);
export const taskSchemaStatus = z.enum(['notStarted', 'inProgress', 'completed']);
export const taskSchemaCreatedAt = z.string().datetime();
export const taskSchemaUpdatedAt = z.union([z.string().datetime(), z.null()]);
export const taskSchemaExpiredAt = z.string().date();

export const taskSchema = z.object({
  id: taskSchemaId,
  title: taskSchemaTitle,
  description: taskSchemaDescription,
  status: taskSchemaStatus,
  createdAt: taskSchemaCreatedAt,
  updatedAt: taskSchemaUpdatedAt,
  expiredAt: taskSchemaExpiredAt,
}) satisfies z.ZodSchema<Task>;
