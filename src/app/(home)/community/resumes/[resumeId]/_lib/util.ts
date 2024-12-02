export const generateTabItems = (resume?: any) => {
  if (!resume || !resume.result) {
    return []; // resume이 없으면 빈 배열 반환
  }

  const tabItems = [];

  if (resume.result.aboutMe) {
    tabItems.push({ label: "자기소개", target: "#selfIntroduction" });
  }

  if (resume.result.workExperiences?.length > 0) {
    tabItems.push({ label: "경력", target: "#workExperience" });
  }

  if (resume.result.projects?.length > 0) {
    tabItems.push({ label: "프로젝트", target: "#projects" });
  }

  if (resume.result.educations?.length > 0) {
    tabItems.push({ label: "교육", target: "#education" });
  }

  if (resume.result.certificates?.length > 0) {
    tabItems.push({ label: "자격증", target: "#certificates" });
  }

  if (resume.result.techStack?.length > 0) {
    tabItems.push({ label: "기술스택", target: "#techStack" });
  }

  if (resume.result.links?.length > 0) {
    tabItems.push({ label: "개인 링크", target: "#links" });
  }

  return tabItems;
};
