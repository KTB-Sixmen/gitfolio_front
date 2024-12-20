// utils/errorHandler.ts
import * as Sentry from "@sentry/nextjs";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

export interface CustomError extends Error {
  status?: number;
}

export const handleApiError = (error: CustomError) => {
  // Sentry에 에러 로깅
  Sentry.captureException(error);

  switch (error.status) {
    case 401: // 인증 오류
      toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
      useAuthStore.getState().resetAuth(); // 로그아웃 메서드 추가 필요
      // window.location.href = "/login";
      break;

    case 403: // 권한 없음
      toast.error("접근 권한이 없습니다.");
      break;

    case 404: // 리소스 없음
      toast.error("요청한 리소스를 찾을 수 없습니다.");
      break;

    case 500: // 서버 내부 오류
      toast.error("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      break;

    default: // 기타 네트워크 에러
      toast.error("네트워크 오류가 발생했습니다.");
  }
};
