"use client";

import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/community");
  };

  return (
    <article className="error_wrap flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="container max-w-lg bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold text-red-500 mb-4">ERROR</h1>
        <p className="text-lg text-gray-600 mb-6">
          찾으려는 페이지가 정상작동하지 않습니다.
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
        >
          커뮤니티로 이동하기
        </button>
      </div>
    </article>
  );
}
