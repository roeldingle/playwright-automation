import { z } from 'zod';

const mainMenuPagesSchema = z.array(
  z.object({
    name: z.string().min(1),
    title: z.string().min(1),
  }),
).min(1);

const rawMainMenuPages = process.env.MAIN_MENU_PAGES;

if (!rawMainMenuPages) {
  throw new Error('MAIN_MENU_PAGES must be defined in the environment configuration.');
}

let parsedMainMenuPages: unknown;

try {
  parsedMainMenuPages = JSON.parse(rawMainMenuPages);
} catch (error) {
  throw new Error('MAIN_MENU_PAGES must contain valid JSON.', { cause: error });
}

export const mainMenuPages = mainMenuPagesSchema.parse(parsedMainMenuPages);
