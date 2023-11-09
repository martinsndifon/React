import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
  // Needed to be able to call invalidateQueries() so a refetching can be done by reactQuery
  const queryClient = useQueryClient();

  // useMutation is called everytime we need to change remote state, like creating, updating or deleting data from a remote DB
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success('Cabin succesfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
