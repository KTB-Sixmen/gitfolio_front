import { useAuthStore } from '@/app/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLogout() {
  const { accessToken, setAccessToken } = useAuthStore((state) => state);

  const router = useRouter(); // router 사용 설정

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await fetch(`/api/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          status: response.status,
          message: errorData.message ?? '에러가 발생했습니다.',
        };
      }

      return response.json();
    },
    onSuccess: (data) => {
      setAccessToken('');
      toast.info('로그아웃에 성공했습니다.');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
