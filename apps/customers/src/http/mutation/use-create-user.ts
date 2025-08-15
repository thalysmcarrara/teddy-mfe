import { createUser } from "@src/services/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      const cache = qc.getQueryCache().findAll({ queryKey: ['users', 'list'] });
      await Promise.all(cache.map((q) => qc.invalidateQueries({ queryKey: q.queryKey })));
    },
  });
}