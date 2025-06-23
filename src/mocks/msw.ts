export async function setupMsw() {
  if (import.meta.env.DEV && import.meta.env.MODE === 'enableMock') {
    const { worker } = await import('./browser');
    return worker.start();
  }
}
