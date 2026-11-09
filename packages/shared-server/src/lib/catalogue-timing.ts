/** Temporary, LXC test branch only: which step of the catalogue counts takes the time. */
import { trpcLogger as log } from "@norish/shared-server/logger";

export async function timedStage<T>(
  stage: string,
  size: number,
  run: () => Promise<T>
): Promise<T> {
  const started = performance.now();

  try {
    return await run();
  } finally {
    if (size >= 500) {
      log.info({ stage, size, ms: Math.round(performance.now() - started) }, "catalogue-timing");
    }
  }
}
