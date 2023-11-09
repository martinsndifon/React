import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  // useQuery is called whenever we need the data from a remote DB
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
