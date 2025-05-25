import { describe, expect, test } from 'vitest';
import {
  taskSchemaId,
  taskSchemaTitle,
  taskSchemaDescription,
  taskSchemaStatus,
  taskSchemaCreatedAt,
  taskSchemaUpdatedAt,
  taskSchemaExpiredAt,
  taskSchema,
} from '..';
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

describe.concurrent('taskSchemaDescriptionのテスト', () => {
  const cases: TestCase[] = [
    { value: validTask.description, expected: true, description: '有効な値' },
    { value: '', expected: true, description: '空文字を許容' },
    { value: 'a'.repeat(1000), expected: true, description: '最長1000文字' },
    { value: 'a'.repeat(1001), expected: false, description: '1001文字以上は許容しない' },
  ];
  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchemaDescription.safeParse(value).success).toBe(expected);
  });
});

describe.concurrent('taskSchemaStatusのテスト', () => {
  const cases: TestCase[] = [
    { value: 'notStarted', expected: true, description: 'notStartedは有効な値' },
    { value: 'inProgress', expected: true, description: 'inProgressは有効な値' },
    { value: 'completed', expected: true, description: 'completedは有効な値' },
    { value: '', expected: false, description: '空文字は許容しない' },
  ];

  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchemaStatus.safeParse(value).success).toBe(expected);
  });
});

describe.concurrent('taskSchemaCreatedAtのテスト', () => {
  const cases: TestCase[] = [
    { value: validTask.createdAt, expected: true, description: 'UTC形式は有効な値' },
    {
      value: '2024-03-20T00:00:00+09:00',
      expected: false,
      description: 'タイムゾーン付きは許容しない',
    },
    { value: '2024-03-20', expected: false, description: '日付のみは許容しない' },
    {
      value: '2024/03/20T00:00:00+09:00',
      expected: false,
      description: '区切り線がスラッシュは許容しない',
    },
    { value: '', expected: false, description: '空文字は許容しない' },
  ];

  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchemaCreatedAt.safeParse(value).success).toBe(expected);
  });
});

describe.concurrent('taskSchemaUpdatedAtのテスト', () => {
  const cases: TestCase[] = [
    { value: validTask.updatedAt, expected: true, description: 'UTC形式は有効な値' },
    { value: null, expected: true, description: 'nullは許容' },
    {
      value: '2024-03-20T00:00:00+09:00',
      expected: false,
      description: 'タイムゾーン付きは許容しない',
    },
    { value: '2024-03-20', expected: false, description: '日付のみは許容しない' },
    { value: '2024/03/20', expected: false, description: '区切り線がスラッシュは許容しない' },
    { value: '', expected: false, description: '空文字は許容しない' },
  ];

  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchemaUpdatedAt.safeParse(value).success).toBe(expected);
  });
});

describe.concurrent('taskSchemaExpiredAtのテスト', () => {
  const cases: TestCase[] = [
    { value: validTask.expiredAt, expected: true, description: 'UTC形式は有効な値' },
    {
      value: '2024-03-20T00:00:00+09:00',
      expected: false,
      description: 'タイムゾーン付きは許容しない',
    },
    { value: '2024-03-20T00:00:00Z', expected: false, description: '時間込みは許容しない' },
    { value: '2024/03/20', expected: false, description: '区切り線がスラッシュは許容しない' },
    { value: '', expected: false, description: '空文字は許容しない' },
  ];

  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchemaExpiredAt.safeParse(value).success).toBe(expected);
  });
});

describe.concurrent('taskSchemaのテスト', () => {
  const taskWithoutExpiredAt: Partial<Task> = {
    id: validTask.id,
    title: validTask.id,
    description: validTask.id,
    status: validTask.status,
    createdAt: validTask.createdAt,
    updatedAt: validTask.updatedAt,
  };
  const cases: TestCase[] = [
    { value: { ...validTask }, expected: true, description: '有効な値' },
    { value: taskWithoutExpiredAt, expected: false, description: 'プロパティが不足しているtask' },
    { value: {}, expected: false, description: '空オブジェクトは許容しない' },
    { value: undefined, expected: false, description: 'undefinedは許容しない' },
    { value: null, expected: false, description: 'undefinedは許容しない' },
  ];

  test.for(cases)('$description $value -> $expected', ({ value, expected }) => {
    expect(taskSchema.safeParse(value).success).toBe(expected);
  });
});
