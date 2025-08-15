import { updateUser } from '@src/services/api/users';
import type { PaginatedUsers, UpdateUserDto, User } from '@src/types';
import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';

type UpdateUserVariables = {
  id: number;
  data: UpdateUserDto;
};

type UpdateUserContext = {
  previousLists: Array<{
    key: QueryKey;
    data: PaginatedUsers | undefined;
  }>;
  previousDetail: User | undefined;
};

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation<
    User,
    unknown,
    UpdateUserVariables,
    UpdateUserContext
  >({
    mutationFn: ({ id, data }) => updateUser(id, data),

    onMutate: async ({ id, data }): Promise<UpdateUserContext> => {
      const listQueries = qc
        .getQueryCache()
        .findAll({ queryKey: ['users', 'list'] });

      const previousLists = listQueries.map((q) => ({
        key: q.queryKey,
        data: qc.getQueryData<PaginatedUsers>(q.queryKey),
      }));

      const previousDetail = qc.getQueryData<User>(queryKeys.userById(id));

      listQueries.forEach((q) => {
        const current = qc.getQueryData<PaginatedUsers>(q.queryKey);
        if (!current) return;

        qc.setQueryData<PaginatedUsers>(q.queryKey, {
          ...current,
          clients: current.clients.map((u) =>
            u.id === id ? { ...u, ...data } : u,
          ),
        });
      });

      if (previousDetail) {
        qc.setQueryData<User>(queryKeys.userById(id), {
          ...previousDetail,
          ...data,
        });
      }

      return { previousLists, previousDetail };
    },

    onError: (_err, { id }, ctx) => {
      ctx?.previousLists.forEach((p) => {
        if (p.key) qc.setQueryData(p.key, p.data);
      });

      if (ctx?.previousDetail) {
        qc.setQueryData(queryKeys.userById(id), ctx.previousDetail);
      }
    },

    onSuccess: async (_res, { id }) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ['users', 'list'] }),
        qc.invalidateQueries({ queryKey: queryKeys.userById(id) }),
      ]);
    },
  });
}