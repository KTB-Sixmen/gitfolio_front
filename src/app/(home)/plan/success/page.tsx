"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    (function () {
      // 예제 데이터를 카카오페이에서 받은 값으로 교체하세요.
      const paymentResult = {
        success: true,
        transactionId: "1234567890",
        amount: 5000,
      };

      // 부모 창에 결제 성공 데이터 전달
      if (window.opener && typeof window.opener.onSuccess === "function") {
        window.opener.onSuccess(paymentResult);
      }

      // 현재 창 닫기
      window.close();
    })();
  }, []);

  return (
    <div>
      <p>결제가 성공적으로 완료되었습니다. 창이 곧 닫힙니다...</p>
    </div>
  );
}
