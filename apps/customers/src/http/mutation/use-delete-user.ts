import { deleteUser } from "@src/services/api/users";
import type { PaginatedUsers, User } from "@src/types";
import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

type DeleteUserVariables = {
  id: number;
};

type DeleteUserContext = {
  previousLists: Array<{
    key: QueryKey;
    data: PaginatedUsers | undefined;
  }>;
  previousDetail: User | undefined;
  id: number;
};

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation<
    void,         
    unknown,         
    DeleteUserVariables,
    DeleteUserContext
  >({
    mutationFn: ({ id }) => deleteUser(id),
    onMutate: async ({ id }): Promise<DeleteUserContext> => {
      const listQueries = qc.getQueryCache().findAll({ queryKey: ['users', 'list'] });
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
          clients: current.clients.filter((u) => u.id !== id),
          totalPages: Math.max(0, (current.totalPages ?? 0) - 1),
        });
      });

      qc.removeQueries({ queryKey: queryKeys.userById(id), exact: true });

      return { previousLists, previousDetail, id };
    },
    onError: (_err, _vars, ctx) => {
      ctx?.previousLists?.forEach((p) => p.key && qc.setQueryData(p.key, p.data));
      if (ctx?.previousDetail) qc.setQueryData(['users', 'detail', { id: ctx.id }], ctx.previousDetail);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['users', 'list'] });
    },
  });
}