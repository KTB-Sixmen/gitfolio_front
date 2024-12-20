import { useAuthStore } from "@/app/store/useAuthStore";
import * as Sentry from "@sentry/nextjs";
import { toast } from "sonner";

const customFetch = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  if (typeof window === "undefined") {
    return fetch(url, options);
  }

  let accessToken = useAuthStore.getState().accessToken;

  const headers: Record<string, string> = {
    ...((options.headers instanceof Headers
      ? Object.fromEntries(options.headers.entries())
      : (options.headers as Record<string, string>)) || {}),
  };

  if (!accessToken) {
    const reissueResponse = await fetch(
      `/api/auth/reissue`,
      // `${process.env.NEXT_PUBLIC_AUTH_SERVER_URL}/api/auth/reissue`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (reissueResponse.ok) {
      const data = await reissueResponse.json();
      accessToken = data.accessToken;
      useAuthStore.setState({ accessToken, authenticated: true });
    } else {
      useAuthStore.getState().resetAuth();
    }
  }

  // Access Token이 있다면 Authorization 헤더 추가
  headers.Authorization = `Bearer ${accessToken}`;

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, { ...options, headers });

    // Access Token 만료(401) 시 처리
    if (response.status === 401) {
      // 토큰 재발급 요청
      const reissueResponse = await fetch(
        `/api/auth/reissue`,
        // `${process.env.NEXT_PUBLIC_AUTH_SERVER_URL}/api/auth/reissue`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!reissueResponse.ok) {
        const errorData = await reissueResponse.json();
        const errorMessage = errorData.message || "인증에 실패하였습니다.";

        useAuthStore.getState().resetAuth();

        // window.location.href = "/community";

        throw new Error(errorMessage); // 메시지를 에러에 전달
      }

      const { accessToken: newAccessToken } = await reissueResponse.json();

      // zustand에 새 토큰 저장
      useAuthStore.setState({ accessToken: newAccessToken });

      // 재발급 받은 토큰으로 동일 요청 재시도
      headers.Authorization = `Bearer ${accessToken}`;
      return fetch(url, { ...options, headers });
    }

    // if (!response.ok) {
    //   const error = new Error(response.statusText);
    //   (error as any).status = response.status;
    //   throw error;
    // }

    return response; // 정상 응답 반환
  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
    console.log("catch 에러!");
    // window.location.href = "/community";
    throw error;
  }
};

export default customFetch;
