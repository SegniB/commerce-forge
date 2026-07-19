import { z } from 'zod';

const EnvironmentSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .refine(
      (value) => {
        if (value !== value.trim()) {
          return false;
        }

        try {
          const url = new URL(value);

          return url.protocol === 'postgresql:' || url.protocol === 'postgres:';
        } catch {
          return false;
        }
      },
      {
        message: 'DATABASE_URL must be a valid PostgreSQL connection URL',
      },
    ),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

export function validateEnvironment(
  configuration: Record<string, unknown>,
): Environment {
  return EnvironmentSchema.parse(configuration);
}
