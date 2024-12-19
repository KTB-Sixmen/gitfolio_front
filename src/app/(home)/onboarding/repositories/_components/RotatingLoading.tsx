import { useEffect, useState } from "react";
import { Search, ClipboardCheck, Pencil, Loader2 } from "lucide-react";

export default function RotatingLoading() {
  const steps = [
    {
      message: "레파지토리 살펴보는 중",
      icon: <Search className="text-blue-500" />,
    },
    {
      message: "프로젝트 검토 중",
      icon: <ClipboardCheck className="text-blue-500" />,
    },
    {
      message: "이력서 작성 중",
      icon: <Pencil size={18} className="text-blue-500" />,
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      // 마지막 단계에 도달하면 멈추기
      if (currentIndex < steps.length - 1) {
        setIndex(currentIndex);
      } else {
        setIndex(steps.length - 1);
        clearInterval(interval);
      }
    }, 10 * 1000); // 2초 간격으로 단계 전환
    return () => clearInterval(interval);
  }, []);

  const { message, icon } = steps[index];

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <span>{icon}</span>
        <span>{message}</span>
      </div>
      <Loader2 className="w-6 h-6 ml-2 animate-spin" />
    </div>
  );
}
