import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(['user'], user);
      navigate('/dashboard');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}

export default useLogin;
