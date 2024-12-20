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
import {
  PositionType,
  positionTypeMap,
  WorkType,
  workTypeMap,
} from "@/app/types/type";
import { ResumeDetailResponse } from "@/app/(home)/community/_hooks/useResumeQuery";

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
    return `${process.env.NEXT_PUBLIC_SERVICE_URL}/images/github-mark.png`;
  } else if (url.includes("linkedin.com")) {
    return "${process.env.NEXT_PUBLIC_SERVICE_URL}/images/linkedin.png";
  } else if (url.includes("notion.site")) {
    return `${process.env.NEXT_PUBLIC_SERVICE_URL}/images/notion.png`;
  } else if (url.includes("tistory.com")) {
    return `${process.env.NEXT_PUBLIC_SERVICE_URL}/images/tistory.png`;
  } else {
    return `${process.env.NEXT_PUBLIC_SERVICE_URL}/images/default-link.png`;
  }
}

const ResumeDocument2 = ({ resume }: Props) => {
  return (
    <Document>
      <Page size="A4" style={tw("p-16 px-32 font-pretendard")}>
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
            style={tw("w-36 h-36 rounded-lg")}
            src={resume.result.avatarUrl}
          />
        </View>

        {/* 자기소개 */}
        <View style={tw("border-b border-gray-300 my-4")} />
        <View style={tw("mb-2")}>
          <Text style={tw("text-xl font-bold mb-2")}>자기소개</Text>
          <Text style={tw("text-xs leading-relaxed")}>
            {resume.result.aboutMe}
          </Text>
        </View>

        {/* 경력 */}
        {resume.result.workExperiences.length > 0 && (
          <>
            <View style={tw("border-b border-gray-300 my-4")} />
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
            <View style={styles.sectionBorder} />
            <View style={styles.sectionMargin}>
              <Text style={styles.sectionTitle}>프로젝트</Text>
              {resume.result.projects.map((project, index) => (
                <View key={index} style={styles.projectContainer}>
                  <Text style={styles.projectTitle}>{project.projectName}</Text>
                  {project.repoLink && (
                    <Link src={project.repoLink} style={styles.projectLink}>
                      {project.repoLink}
                    </Link>
                  )}
                  <Text style={styles.projectDate}>
                    {project.projectStartedAt} ~ {project.projectEndedAt}
                  </Text>
                  <Text style={styles.projectSkill}>{project.skillSet}</Text>

                  {resume.result.template === "BASIC" &&
                    project.roleAndTask.length > 0 && (
                      <View style={styles.templateStarSection}>
                        <Text style={styles.templateStarTitle}>담당 업무</Text>
                        <View style={styles.templateStarTaskContainer}>
                          {project.roleAndTask.map(
                            (task: string, taskIndex: number) => (
                              <View
                                key={taskIndex}
                                style={styles.listItemContainer}
                              >
                                <Text style={styles.listItemBullet}>•</Text>
                                <Text style={styles.listItemText}>{task}</Text>
                              </View>
                            ),
                          )}
                        </View>
                      </View>
                    )}

                  {resume.result.template === "STAR" && (
                    <View style={styles.templateStarContainer}>
                      {/* 담당 업무 */}
                      {project.roleAndTask.length > 0 && (
                        <View style={styles.templateStarSection}>
                          <Text style={styles.templateStarTitle}>
                            담당 업무
                          </Text>
                          <View style={styles.templateStarTaskContainer}>
                            {project.roleAndTask.map(
                              (task: string, taskIndex: number) => (
                                <View
                                  key={taskIndex}
                                  style={styles.listItemContainer}
                                >
                                  <Text style={styles.listItemBullet}>•</Text>
                                  <Text style={styles.listItemText}>
                                    {task}
                                  </Text>
                                </View>
                              ),
                            )}
                          </View>
                        </View>
                      )}

                      {/* 트러블 슈팅 */}
                      {project.star && (
                        <View style={styles.templateStarSection}>
                          <Text style={styles.templateStarTitle}>
                            트러블 슈팅
                          </Text>
                          <View style={styles.templateStarTroubleContainer}>
                            <View style={styles.troubleListItemContainer}>
                              <Text style={styles.listItemBullet}>•</Text>
                              <Text style={styles.listItemText}>
                                <Text style={styles.templateStarTitle}>
                                  상황 설명
                                </Text>
                                : {project.star.situation}
                              </Text>
                            </View>
                            <View style={styles.troubleListItemContainer}>
                              <Text style={styles.listItemBullet}>•</Text>
                              <Text style={styles.listItemText}>
                                <Text style={styles.templateStarTitle}>
                                  해결해야 할 문제
                                </Text>
                                : {project.star.task}
                              </Text>
                            </View>
                            <View style={styles.troubleListItemContainer}>
                              <Text style={styles.listItemBullet}>•</Text>
                              <Text style={styles.listItemText}>
                                <Text style={styles.templateStarTitle}>
                                  취한 행동
                                </Text>
                                : {project.star.action}
                              </Text>
                            </View>
                            <View style={styles.troubleListItemContainer}>
                              <Text style={styles.listItemBullet}>•</Text>
                              <Text style={styles.listItemText}>
                                <Text style={styles.templateStarTitle}>
                                  결과 및 성과
                                </Text>
                                : {project.star.result}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  )}

                  {resume.result.template === "GITFOLIO" && (
                    <View style={styles.templateStarSection}>
                      {/* roleAndTask 리스트 */}
                      {project.roleAndTask.length > 0 && (
                        <View style={styles.templateStarSection}>
                          <Text style={styles.templateStarTitle}>
                            담당 업무
                          </Text>
                          <View style={styles.templateStarTaskContainer}>
                            {project.roleAndTask.map(
                              (task: string, taskIndex: number) => (
                                <View
                                  key={taskIndex}
                                  style={styles.listItemContainer}
                                >
                                  <Text style={styles.listItemBullet}>•</Text>
                                  <Text style={styles.listItemText}>
                                    {task}
                                  </Text>
                                </View>
                              ),
                            )}
                          </View>
                        </View>
                      )}

                      {project.troubleShooting && (
                        <View style={styles.templateStarSection}>
                          <Text style={styles.templateStarTitle}>
                            트러블 슈팅
                          </Text>
                          <View style={styles.templateStarTroubleContainer}>
                            <View style={styles.troubleListItemContainer}>
                              <Text style={styles.listItemBullet}>•</Text>
                              <Text style={styles.listItemText}>
                                <Text style={styles.templateStarTitle}>
                                  발생한 문제
                                </Text>
                                : {project.troubleShooting.problem}
                              </Text>
                            </View>
                            <View style={styles.troubleListItemContainer}>
                              <Text style={styles.listItemBullet}>•</Text>
                              <Text style={styles.listItemText}>
                                <Text style={styles.templateStarTitle}>
                                  세웠던 가설
                                </Text>
                                : {project.troubleShooting.hypothesis}
                              </Text>
                            </View>
                            <View style={styles.troubleListItemContainer}>
                              <Text style={styles.listItemBullet}>•</Text>
                              <Text style={styles.listItemText}>
                                <Text style={styles.templateStarTitle}>
                                  시도한 방법
                                </Text>
                                : {project.troubleShooting.tring}
                              </Text>
                            </View>
                            <View style={styles.troubleListItemContainer}>
                              <Text style={styles.listItemBullet}>•</Text>
                              <Text style={styles.listItemText}>
                                <Text style={styles.templateStarTitle}>
                                  개선된 지표
                                </Text>
                                : {project.troubleShooting.result}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  )}

                  {index < resume.result.projects.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </>
        )}

        {/* 교육 */}
        {resume.result.educations.length > 0 && (
          <>
            <View style={tw("border-b border-gray-300 my-4")} />
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
            <View style={tw("border-b border-gray-300 my-4")} />
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
        {/* {resume.result.techStack.length > 0 && (
          <>
            <View style={tw("border-b border-gray-300 my-4")} />
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
        )} */}
        {resume.result.techStack.length > 0 && (
          <>
            <View style={tw("border-b border-gray-300 my-4")} />
            <View style={tw("mb-6")}>
              <Text style={tw("text-xl font-bold mb-2")}>기술스택</Text>
              <Text style={tw("text-sm")}>
                {resume.result.techStack.join(", ")}
              </Text>
            </View>
          </>
        )}

        {/* 개인 링크 */}
        {resume.result.links.length > 0 && (
          <>
            {/* 구분선 */}
            <View style={tw("border-b border-gray-300 my-4")} />

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

const styles = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    padding: 24, // p-6
    paddingTop: 48,
  },
  sectionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginVertical: 8, // my-4
  },
  sectionMargin: {
    marginBottom: 4, // mb-6
  },
  sectionTitle: {
    fontSize: 14, // 기존 20에서 축소
    fontWeight: "bold",
    marginBottom: 16, // mb-2
  },
  projectContainer: {
    marginBottom: 4, // mb-4
  },
  projectTitle: {
    fontSize: 12, // 기존 16에서 축소
    fontWeight: "semibold", // font-semibold
    marginBottom: 8, // mb-4
  },
  projectLink: {
    fontSize: 10, // 기존 12에서 축소
    color: "#9ca3af", // text-gray-400
    marginBottom: 2, // mb-1
    textDecoration: "none",
  },
  projectDate: {
    fontSize: 10, // 기존 12에서 축소
    color: "#9ca3af",
    marginBottom: 2, // mb-1
  },
  projectSkill: {
    fontSize: 10, // 기존 12에서 축소
    color: "#9ca3af",
    marginBottom: 8, // mb-4
  },
  listContainer: {
    marginLeft: 16, // ml-4
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8, // mb-1
  },
  troubleListItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2, // mb-1
  },
  listItemBullet: {
    fontSize: 10, // 기존 14에서 축소
    marginRight: 8, // mr-2
  },
  listItemText: {
    fontSize: 10, // 기존 14에서 축소
  },
  templateStarContainer: {
    marginTop: 16, // spacing similar to space-y-4 between sections
  },
  templateStarSection: {
    marginBottom: 2, // space-y-2
  },
  templateStarTitle: {
    fontWeight: "semibold",
    fontSize: 10, // 기존 14에서 축소
    marginBottom: 8, // space-y-2
  },
  templateStarTaskContainer: {
    marginLeft: 8, // ml-6
  },
  templateStarTroubleContainer: {
    marginLeft: 8, // ml-6
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db", // border-gray-300
    marginVertical: 4, // my-4
  },
});
