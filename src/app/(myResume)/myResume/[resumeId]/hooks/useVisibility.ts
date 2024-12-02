import { useEffect, useState } from "react";
import { useMyResumeVisibilityMutation } from "../../_hooks/useMyResumeVisibilityMutation";

export const useVisibility = (resume: any, resumeId: string) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const { mutate } = useMyResumeVisibilityMutation(resumeId);

  useEffect(() => {
    if (resume) {
      setVisibility(resume.result.visibility === "PUBLIC");
    }
  }, [resume]);

  const handleToggleVisibility = () => {
    setVisibility((prev) => {
      const newVisibility = !prev; // 상태를 먼저 바꾼다
      mutate(newVisibility ? "PUBLIC" : "PRIVATE"); // 업데이트된 상태를 기반으로 요청을 보냄
      return newVisibility;
    });
  };

  return {
    visibility,
    handleToggleVisibility,
  };
};
