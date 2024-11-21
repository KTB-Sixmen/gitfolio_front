// utils/customFetcher.js

import { getAccessToken, useAuthStore } from "@/app/store/useAuthStore";

async function refreshAccessToken() {
  // 토큰 갱신 로직 구현
  // 예: 새 accessToken을 받아오는 API 호출
  const response = await fetch("/api/auth/refresh", { method: "POST" });
  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }
  const data = await response.json();
  return data.accessToken;
}

export async function customFetcher(url: string, options: any = {}) {
  let accessToken = getAccessToken();

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
