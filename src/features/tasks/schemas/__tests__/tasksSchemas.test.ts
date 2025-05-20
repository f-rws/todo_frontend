import { describe, expect, test } from 'vitest';
import { taskSchemaId } from '..';
import type { Task } from '../../types';

const validTask = {
  id: '000001',
  title: 'タイトル',
  description: '詳細な情報',
  status: 'notStarted',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-02-01T00:00:00Z',
  expiredAt: '2025-01-15',
} satisfies Task;

describe.concurrent('taskSchemaIdのテスト', () => {
  type TestCase = {
    value: unknown;
    expected: ReturnType<(typeof taskSchemaId)['safeParse']>['success'];
    description: string;
  };
  const cases: TestCase[] = [
    { value: validTask.id, expected: true, description: '有効な値' },
    { value: '', expected: true, description: '空文字を許容' },
    { value: undefined, expected: false, description: '未定義' },
  ];

  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchemaId.safeParse(value).success).toBe(expected);
  });
});
