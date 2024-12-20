// // utils/customFetch.ts
// import { useAuthStore } from "@/app/store/useAuthStore";
// import * as Sentry from "@sentry/nextjs";

// const customFetch = async (
//   url: string,
//   options: RequestInit = {},
// ): Promise<Response> => {
//   let accessToken = useAuthStore.getState().accessToken;

//   const headers: Record<string, string> = {
//     ...((options.headers instanceof Headers
//       ? Object.fromEntries(options.headers.entries())
//       : (options.headers as Record<string, string>)) || {}),
//   };

//   if (!accessToken) {
//     const reissueResponse = await fetch("/api/auth/reissue", {
//       method: "POST",
//       credentials: "include",
//     });

//     if (reissueResponse.ok) {
//       const data = await reissueResponse.json();
//       accessToken = data.accessToken;
//       useAuthStore.setState({
//         accessToken,
//         authenticated: true,
//       });
//     } else {
//       useAuthStore.setState({ authenticated: false });
//     }
//   }

//   // Access Token이 있다면 Authorization 헤더 추가
//   headers.Authorization = `Bearer ${accessToken}`;

//   if (!(options.body instanceof FormData)) {
//     headers["Content-Type"] = "application/json";
//   }

//   try {
//     const response = await fetch(url, {
//       ...options,
//       headers,
//     });

//     if (response.status === 401) {
//       const reissueResponse = await fetch("/api/auth/reissue", {
//         method: "POST",
//         credentials: "include",
//       });

//       if (!reissueResponse.ok) {
//         const errorData = await reissueResponse.json();
//         const errorMessage = errorData.message || "인증에 실패하였습니다.";

//         useAuthStore.setState({
//           accessToken: "",
//           authenticated: false,
//         });

//         window.location.href = "/community";

//         throw new Error(errorMessage);
//       }

//       const { accessToken: newAccessToken } = await reissueResponse.json();
//       useAuthStore.setState({ accessToken: newAccessToken });

//       headers.Authorization = `Bearer ${newAccessToken}`;
//       return fetch(url, { ...options, headers });
//     }

//     if (!response.ok) {
//       const error = new Error(response.statusText);
//       (error as any).status = response.status;
//       throw error;
//     }

//     return response;
//   } catch (error) {
//     Sentry.captureException(error);
//     window.location.href = "/community";
//     throw error;
//   }
// };

// export default customFetch;
