import { useAuthStore } from "@/app/store/useAuthStore";

async function refreshAccessToken() {
  try {
    const response = await fetch("/api/auth/reissue", { method: "POST" });
    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }
    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    useAuthStore.setState({ accessToken: "" });
    window.location.href = "/"; // '/'로 라우팅
    return null;
  }
}

export async function customFetcher(url: string, options: any = {}) {
  // let accessToken = getAccessToken();
  let accessToken = useAuthStore.getState().accessToken;

  let headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
  };

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // 토큰 갱신 시도
    accessToken = await refreshAccessToken();
    if (accessToken) {
      useAuthStore.setState({ accessToken });
      headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, {
        ...options,
        headers,
      });
    } else {
      throw new Error("Unauthorized");
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }

  return response.json();
}
