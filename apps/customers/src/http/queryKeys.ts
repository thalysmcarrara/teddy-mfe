export const queryKeys = {
  usersList: (page: number, limit: number) => ['users', 'list', { page, limit }] as const,
  userById: (id: number) => ['users', 'detail', { id }] as const,
};