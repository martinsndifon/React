import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  // Needed to be able to call invalidateQueries() so a refetching can be done by reactQuery
  const queryClient = useQueryClient();

  // useMutation is called everytime we need to change remote state, like creating, updating or deleting data from a remote DB
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success('Booking succesfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
