import { describe, expect, test } from 'vitest';
import { taskSchemaId, taskSchemaTitle } from '..';
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

type TestCase = {
  value: unknown;
  expected: ReturnType<(typeof taskSchemaId)['safeParse']>['success'];
  description: string;
};

describe.concurrent('taskSchemaIdのテスト', () => {
  const cases: TestCase[] = [
    { value: validTask.id, expected: true, description: '有効な値' },
    { value: '', expected: true, description: '空文字を許容' },
    { value: undefined, expected: false, description: '未定義' },
  ];

  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchemaId.safeParse(value).success).toBe(expected);
  });
});

describe.concurrent('taskSchemaTitleのテスト', () => {
  const cases: TestCase[] = [
    { value: validTask.title, expected: true, description: '有効な値' },
    { value: '', expected: false, description: '空文字は許容しない' },
    { value: 'a', expected: true, description: '最短1文字' },
    { value: 'a'.repeat(50), expected: true, description: '最長50文字' },
    { value: 'a'.repeat(51), expected: false, description: '51文字以上は許容しない' },
  ];

  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchemaTitle.safeParse(value).success).toBe(expected);
  });
});
