import { z } from 'zod';
import {
  automationExerciseAccountResponseSchema,
  automationExerciseCreateAccountRequestSchema,
  automationExerciseDeleteAccountRequestSchema,
} from '../schemas/automation-exercise-account.schema';

export type AutomationExerciseCreateAccountRequest =
  z.infer<typeof automationExerciseCreateAccountRequestSchema>;

export type AutomationExerciseDeleteAccountRequest =
  z.infer<typeof automationExerciseDeleteAccountRequestSchema>;

export type AutomationExerciseAccountResponse =
  z.infer<typeof automationExerciseAccountResponseSchema>;
