export type AsyncReturnType<F extends (...args: unknown[]) => Promise<unknown>> = Awaited<
  ReturnType<F>
>;
