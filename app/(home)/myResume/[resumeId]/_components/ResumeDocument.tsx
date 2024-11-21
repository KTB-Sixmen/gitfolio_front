import React from "react";
import {
  Document,
  Page,
  Text,
  Image as PImage,
  View,
  StyleSheet,
  Font,
  Link,
  Svg,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { ResumeDetailResponse } from "../../../community/_hooks/useResumeQuery";
import {
  PositionType,
  positionTypeMap,
  WorkType,
  workTypeMap,
} from "@/app/types/type";

type FontWeight = "normal" | "bold" | "light" | undefined;

Font.register({
  family: "Pretendard",
  fonts: [
    {
      src: "../fonts/Pretendard-Regular.ttf",
      fontWeight: "300" as FontWeight,
    },
    {
      src: "../fonts/Pretendard-SemiBold.ttf",
      fontWeight: "600" as FontWeight,
    },
    {
      src: "../fonts/Pretendard-Bold.ttf",
      fontWeight: "700" as FontWeight,
    },
  ],
});

const tw = createTw({
  theme: {
    fontFamily: {
      pretendard: ["Pretendard"],
    },
  },
});

type Props = {
  resume: ResumeDetailResponse;
};

function getIconForLink(url: string) {
  if (url.includes("github.com")) {
    return "http://localhost:3000/images/github-mark.png";
  } else if (url.includes("linkedin.com")) {
    return "http://localhost:3000/images/linkedin.png";
  } else if (url.includes("notion.site")) {
    return "http://localhost:3000/images/notion.png";
  } else if (url.includes("tistory.com")) {
    return "http://localhost:3000/images/tistory.png";
  } else {
    return "http://localhost:3000/images/default-link.png";
  }
}

const ResumeDocument2 = ({ resume }: Props) => {
  return (
    <Document>
      <Page size="A4" style={tw("p-8 px-32 font-pretendard")}>
        {/* 헤더 */}
        <View style={tw("flex flex-row mb-2")}>
          <View style={tw("flex-1")}>
            <Text style={tw("text-3xl font-bold")}>
              {resume.result.memberName}
            </Text>
            <Text style={tw("text-lg")}>
              {positionTypeMap[resume.result.position as PositionType]} 개발자
            </Text>
          </View>
          <PImage
            style={tw("w-52 h-52 rounded-lg")}
            src={resume.result.avatarUrl}
          />
        </View>

        {/* 자기소개 */}
        <View style={tw("border-b border-black my-4")} />
        <View style={tw("mb-6")}>
          <Text style={tw("text-xl font-bold mb-2")}>자기소개</Text>
          <Text style={tw("text-xs leading-relaxed")}>
            {resume.result.aboutMe}
          </Text>
        </View>

        {/* 경력 */}
        {resume.result.workExperiences.length > 0 && (
          <>
            <View style={tw("border-b border-black my-4")} />
            <View>
              <Text style={tw("text-xl font-bold mb-2")}>경력</Text>
              {resume.result.workExperiences.map((experience, index) => (
                <View key={index} style={tw("mb-4")}>
                  <Text style={tw("text-lg font-semibold")}>
                    {experience.companyName}
                  </Text>
                  <Text style={tw("text-xs text-gray-400 mb-1")}>
                    {experience.departmentName} | {experience.role} |{" "}
                    {workTypeMap[experience.workType as WorkType]}
                  </Text>
                  <Text style={tw("text-xs text-gray-400")}>
                    {experience.startedAt} ~ {experience.endedAt}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* 프로젝트 */}
        {resume.result.projects.length > 0 && (
          <>
            <View style={tw("border-b border-black my-4")} />
            <View style={tw("mb-6")}>
              <Text style={tw("text-xl font-bold mb-2")}>프로젝트</Text>
              {resume.result.projects.map((project, index) => (
                <View key={index} style={tw("mb-4")}>
                  <Text style={tw("text-base font-semibold mb-2")}>
                    {project.projectName}
                  </Text>
                  <Link
                    src={project.repoLink}
                    style={tw("text-xs text-gray-400 mb-2")}
                  >
                    {project.repoLink}
                  </Link>
                  <Text style={tw("text-xs text-gray-400 mb-2")}>
                    {project.projectStartedAt} ~ {project.projectEndedAt}
                  </Text>
                  <Text style={tw("text-xs text-gray-400 mb-4")}>
                    기술 스택: {project.skillSet}
                  </Text>
                  <Text style={tw("text-sm")}>
                    {project.projectDescription}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* 교육 */}
        {resume.result.educations.length > 0 && (
          <>
            <View style={tw("border-b border-black my-4")} />
            <View style={tw("mb-6")}>
              <Text style={tw("text-xl font-bold mb-2")}>교육</Text>
              {resume.result.educations.map((education, index) => (
                <View key={index} style={tw("mb-4")}>
                  <Text style={tw("text-lg font-semibold")}>
                    {education.schoolName}
                  </Text>
                  <Text style={tw("text-xs text-gray-400 mb-1")}>
                    {education.schoolType} | {education.major}
                  </Text>
                  <Text style={tw("text-xs text-gray-400")}>
                    {education.startedAt} ~ {education.endedAt} |{" "}
                    {education.graduationStatus}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* 자격증 */}
        {resume.result.certificates.length > 0 && (
          <>
            <View style={tw("border-b border-black my-4")} />
            <View style={tw("mb-6")}>
              <Text style={tw("text-xl font-bold mb-2")}>자격증</Text>
              {resume.result.certificates.map((certificate, index) => (
                <View key={index} style={tw("mb-4")}>
                  <Text style={tw("text-lg font-semibold")}>
                    {certificate.certificateName}
                  </Text>
                  <Text style={tw("text-xs text-gray-400")}>
                    {certificate.certificateGrade} |{" "}
                    {certificate.certificateOrganization}
                  </Text>
                  <Text style={tw("text-xs text-gray-400")}>
                    {certificate.certificatedAt}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* 기술스택 */}
        {resume.result.techStack.length > 0 && (
          <>
            <View style={tw("border-b border-black my-4")} />
            <View style={tw("mb-6")}>
              <Text style={tw("text-xl font-bold mb-2")}>기술스택</Text>
              <View style={tw("flex flex-row flex-wrap")}>
                {resume.result.techStack.map((tech, index) => (
                  <Text
                    key={index}
                    style={tw(
                      "text-sm mr-2 p-1 px-2 border bg-gray-50 border-gray-600 rounded-lg",
                    )}
                  >
                    {tech}
                  </Text>
                ))}
              </View>
            </View>
          </>
        )}

        {/* 개인 링크 */}
        {resume.result.links.length > 0 && (
          <>
            {/* 구분선 */}
            <View style={tw("border-b border-black my-4")} />

            <View>
              <Text style={tw("text-2xl font-semibold")}>개인 링크</Text>
              {resume.result.links.map((link, index) => (
                <View
                  key={index}
                  style={tw(
                    "flex flex-row items-center w-full p-2 border border-gray-400 rounded-md bg-gray-50 mb-2",
                  )}
                >
                  {/* 아이콘 영역 */}
                  <View
                    style={tw(
                      "flex items-center justify-center p-4 border-r border-gray-200 w-14 h-14",
                    )}
                  >
                    <PImage
                      // src={"../images/github-mark.png"}
                      src={getIconForLink(link.linkUrl)}
                      style={tw("w-full h-full")}
                    />
                  </View>
                  {/* 링크 정보 */}
                  <View style={tw("flex flex-col flex-1 ml-2")}>
                    <Text
                      style={tw("text-xs font-semibold text-gray-600 mb-2")}
                    >
                      {link.linkUrl}
                    </Text>
                    <Link src={link.linkUrl}>
                      <Text style={tw("text-black font-semibold text-xs")}>
                        {link.linkTitle}
                      </Text>
                    </Link>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default ResumeDocument2;
