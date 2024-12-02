"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  ArrowDown,
  ArrowUp,
  // Linkedin,
  Plus,
  PlusCircle,
  Trash,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Link } from "lucide-react";
import { Github } from "lucide-react";
import Notion from "../../../../../public/notion.svg";
import Tistory from "../../../../../public/tistory.svg";
import Linkedin from "../../../../../public/linkedin.svg";
import { useAuthStore } from "@/app/store/useAuthStore";
import { positionTypeMap } from "@/app/types/type";
import { useOnboardingUpdate } from "../../onboarding/_hooks/useOnboardingUpdate";
import { ProfileResult } from "../../onboarding/_hooks/useProfileQuery";
import { EditProfileFormSchema } from "../_lib/schema";
import CustomMonthRangePicker from "../../onboarding/_components/custom-month-range-picker";
import { useProfileUpdate } from "../_hooks/useProfileUpdate";
import { toast } from "sonner";

type Props = {
  userProfile: ProfileResult;
};

export default function ProfileEdit({ userProfile }: Props) {
  const [imageFile, setImageFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const form = useForm<z.infer<typeof EditProfileFormSchema>>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      name: userProfile.name,
      phoneNumber: userProfile.phoneNumber,
      email: userProfile.email,
      position: userProfile.position,
      workExperiences: userProfile.workExperiences || [
        {
          companyName: "",
          departmentName: "",
          role: "",
          workType: "",
          employmentStatus: "",
          startedAt: "",
          endedAt: "",
        },
      ],
      educations: userProfile.educations || [
        {
          schoolType: "",
          schoolName: "",
          major: "",
          graduationStatus: "",
          startedAt: "",
          endedAt: "",
        },
      ],
      links: userProfile.links || [{ linkUrl: "", linkTitle: "" }],
      certificates: userProfile.certificates || [
        {
          certificateName: "",
          certificateGrade: "",
          certificateOrganization: "",
          certificatedAt: "",
        },
      ],
    },
    mode: "onChange",
  });

  const { mutate } = useProfileUpdate();

  const {
    fields: experiencesFields,
    append: experiencesAppend,
    remove: experiencesRemove,
    move: experiencesMove,
  } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });
  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
    move: educationMove,
  } = useFieldArray({
    control: form.control,
    name: "educations",
  });
  const {
    fields: linksFields,
    append: linksAppend,
    remove: linksRemove,
    move: linksMove,
  } = useFieldArray({
    control: form.control,
    name: "links",
  });
  const {
    fields: certificationsFields,
    append: certificationsAppend,
    remove: certificationsRemove,
    move: certificationsMove,
  } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  const [iconTypes, setIconTypes] = useState(
    Array(linksFields.length).fill(<Link />),
  );

  function onSubmit(data: z.infer<typeof EditProfileFormSchema>) {
    const formData = new FormData();

    const memberUpdateRequestDTO = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      position: data.position,
    };
    const memberAdditionalRequestDTO = {
      workExperiences: data.workExperiences,
      educations: data.educations,
      certificates: data.certificates,
      links: data.links,
    };

    if (imageFile) {
      formData.append("imageFile", imageFile as Blob);
    }
    formData.append(
      "memberUpdateRequestDTO",
      new Blob([JSON.stringify(memberUpdateRequestDTO)], {
        type: "application/json",
      }),
    );
    formData.append(
      "memberAdditionalRequestDTO",
      new Blob([JSON.stringify(memberAdditionalRequestDTO)], {
        type: "application/json",
      }),
    );

    mutate({ data: formData });
    // toast.message("You submitted the following values:", {
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         {JSON.stringify(formData, null, 2)}
    //       </code>
    //     </pre>
    //   ),
    // });
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // 선택된 파일이 있는지 확인
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageFile(file);
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleIconChange = (url: string, index: number) => {
    setIconTypes((prevIconTypes) => {
      const newIconTypes = [...prevIconTypes];
      if (url.includes("github.com")) {
        newIconTypes[index] = <Github />;
      } else if (url.includes("linkedin.com")) {
        newIconTypes[index] = <Linkedin />;
      } else if (url.includes("tistory.com")) {
        newIconTypes[index] = <Tistory />;
      } else if (url.includes("notion.site")) {
        newIconTypes[index] = <Notion />;
      } else {
        newIconTypes[index] = <Link />;
      }
      return newIconTypes;
    });
  };

  return (
    <div className="max-w-3xl p-4 mx-auto space-y-6">
      <div className="text-2xl font-bold text-center">
        기본 정보(필수) / 추가 정보(선택) 입력
      </div>
      <div className="text-center">
        많은 정보를 입력해주시면 더 좋은 이력서가 만들어집니다!
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 기본정보 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-medium">
                <div className="text-xl font-bold">
                  기본 정보
                  <span className="text-red-500">*</span>
                  <span className="text-sm font-normal"> (필수 사항)</span>
                </div>
              </CardTitle>
              <Separator className="border-2 border-black" />
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="relative group w-[100px] h-[100px] rounded-full overflow-hidden">
                      <Image
                        className="object-cover w-full h-full rounded-full"
                        width={100}
                        height={100}
                        src={preview || userProfile.avatarUrl}
                        priority
                        alt="profile_url"
                      />
                      <div className="absolute inset-0 transition-opacity bg-black opacity-0 group-hover:opacity-40"></div>
                      <button
                        type="button"
                        className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100"
                        onClick={() =>
                          document.getElementById("file-input")!.click()
                        }
                      >
                        이미지 업로드
                      </button>
                    </div>
                    <Input
                      id="file-input"
                      className="hidden"
                      type="file"
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="">본명</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="본명" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="이메일" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>전화번호</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="ex) 01012345678" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>직군</FormLabel>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="선택" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(positionTypeMap).map(
                                ([key, label]) => (
                                  <SelectItem key={key} value={key}>
                                    {label}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>직군</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="ex) 백엔드, 프론트엔드"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 경력 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-medium">
                <div className="text-xl font-bold">
                  경력
                  <span className="text-sm font-normal"> (선택 사항)</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    experiencesAppend({
                      companyName: "",
                      departmentName: "",
                      role: "",
                      workType: "",
                      employmentStatus: "",
                      startedAt: "",
                      endedAt: "",
                    });
                  }}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  추가
                </Button>
              </CardTitle>
              <Separator className="border-2 border-black" />
            </CardHeader>
            {experiencesFields.map((field, index) => (
              <CardContent key={field.id}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                      경력 {String(index + 1).padStart(2, "0")}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index > 0) {
                            experiencesMove(index, index - 1);
                          }
                        }}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === experiencesFields.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index < experiencesFields.length - 1) {
                            experiencesMove(index, index + 1);
                          }
                        }}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          experiencesRemove(index);
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between w-full gap-2">
                    <FormField
                      control={form.control}
                      name={`workExperiences.${index}.companyName`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1">
                          <FormLabel className="text-nowrap">회사명</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="회사명" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`workExperiences.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex flex-col ">직책</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="직책" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`workExperiences.${index}.departmentName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex flex-col ">
                            부서명
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="부서명" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between w-full gap-2">
                    <div className="flex flex-1 gap-2">
                      <FormField
                        control={form.control}
                        name={`workExperiences.${index}.workType`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>근무 형태</FormLabel>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="선택" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="INTERN">인턴</SelectItem>
                                <SelectItem value="CONTRACT_WORKER">
                                  계약직
                                </SelectItem>
                                <SelectItem value="FULL_TIME">
                                  정규직
                                </SelectItem>
                                <SelectItem value="PRIVATE_BUSINESS">
                                  개인사업
                                </SelectItem>
                                <SelectItem value="FREELANCER">
                                  프리랜서
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`workExperiences.${index}.employmentStatus`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>재직 여부</FormLabel>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="선택" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="EMPLOYMENT">
                                  재직중
                                </SelectItem>
                                <SelectItem value="RESIGNATION">
                                  퇴사
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="text-sm font-semibold">근무 기간</div>
                      <CustomMonthRangePicker
                        value={"workExperiences"}
                        form={form}
                        index={index}
                      />
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              </CardContent>
            ))}
          </Card>

          {/* 교육 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-medium">
                <div className="text-xl font-bold">
                  교육
                  <span className="text-sm font-normal"> (선택 사항)</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    educationAppend({
                      schoolType: "",
                      schoolName: "",
                      major: "",
                      graduationStatus: "",
                      startedAt: "",
                      endedAt: "",
                    });
                  }}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  추가
                </Button>
              </CardTitle>
              <Separator className="border-2 border-black" />
            </CardHeader>
            {educationFields.map((field, index) => (
              <CardContent key={field.id}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                      교육 {String(index + 1).padStart(2, "0")}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index > 0) {
                            educationMove(index, index - 1);
                          }
                        }}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === educationFields.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index < educationFields.length - 1) {
                            educationMove(index, index + 1);
                          }
                        }}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          educationRemove(index);
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between flex-1 w-full gap-2">
                    <FormField
                      control={form.control}
                      name={`educations.${index}.schoolType`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1">
                          <FormLabel>종류</FormLabel>
                          <Select
                            name={field.name}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PRIVATE_EDUCATION">
                                사설교육
                              </SelectItem>
                              <SelectItem value="HIGH_SCHOOL">
                                고등학교
                              </SelectItem>
                              <SelectItem value="UNIVERSITY_ASSOCIATE_DEGREE">
                                대학교(전문학사)
                              </SelectItem>
                              <SelectItem value="UNIVERSITY_BACHELOR">
                                대학교(학사)
                              </SelectItem>
                              <SelectItem value="GRADUATE_SCHOOL_MASTER">
                                대학원(석사)
                              </SelectItem>
                              <SelectItem value="GRADUATE_SCHOOL_DOCTOR">
                                대학원(박사)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`educations.${index}.schoolName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex flex-col">
                            소속/기관
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="소속/기관이 없을 경우 개인 또는 기타"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`educations.${index}.major`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex flex-col">
                            전공명/전공 계열
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="전공을 입력해주세요"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-between w-full gap-2">
                    <div className="flex flex-1 gap-2">
                      <FormField
                        control={form.control}
                        name={`educations.${index}.graduationStatus`}
                        render={({ field }) => (
                          <FormItem className="w-1/3">
                            <FormLabel>재학 상태</FormLabel>
                            <Select
                              name={field.name}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="선택" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="GRADUATED">졸업</SelectItem>
                                <SelectItem value="ATTENDING">
                                  재학중
                                </SelectItem>
                                <SelectItem value="DROP_OUT">중퇴</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col justify-between w-full">
                        <div className="text-sm font-semibold">재학 기간</div>
                        <CustomMonthRangePicker
                          value={"educations"}
                          form={form}
                          index={index}
                        />
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              </CardContent>
            ))}
          </Card>

          {/* 자격증 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-medium">
                <div className="text-xl font-bold">
                  자격증
                  <span className="text-sm font-normal"> (선택사항)</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    certificationsAppend({
                      certificateName: "",
                      certificateGrade: "",
                      certificateOrganization: "",
                      certificatedAt: "",
                    });
                  }}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  추가
                </Button>
              </CardTitle>
              <Separator className="border-2 border-black" />
            </CardHeader>
            {certificationsFields.map((field, index) => (
              <CardContent key={field.id}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                      자격증 {String(index + 1).padStart(2, "0")}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index > 0) {
                            certificationsMove(index, index - 1);
                          }
                        }}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === certificationsFields.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index < certificationsFields.length - 1) {
                            certificationsMove(index, index + 1);
                          }
                        }}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          certificationsRemove(index);
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name={`certificates.${index}.certificateName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>자격증명</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="자격증명을 입력해주세요."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between flex-1 w-full gap-2">
                    <FormField
                      control={form.control}
                      name={`certificates.${index}.certificateGrade`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1">
                          <FormLabel>점수/급</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              // placeholder="."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certificates.${index}.certificatedAt`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>취득월</FormLabel>
                          <FormControl>
                            <Input
                              className="text-center"
                              type="month"
                              {...field}
                              placeholder="YYYY.MM."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certificates.${index}.certificateOrganization`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex flex-col flex-1">
                            발급 기관
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              // placeholder="전공을 입력해주세요"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator className="my-4" />
                </div>
              </CardContent>
            ))}
          </Card>

          {/* 링크 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-medium">
                <div className="text-xl font-bold">
                  링크
                  <span className="text-sm font-normal"> (선택 사항)</span>
                </div>
              </CardTitle>
              <Separator className="border-2 border-black" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  linksAppend({
                    linkUrl: "",
                    linkTitle: "",
                  });
                }}
                className="w-full gap-1 py-2 mx-auto text-center text-black bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <Plus />
                링크추가
              </Button>
              {linksFields.map((field, index) => {
                return (
                  <div
                    className="flex justify-between w-full gap-2 "
                    key={index}
                  >
                    <div className="flex items-center justify-center w-full gap-2 border border-gray-200 rounded-md">
                      <div className="p-4 border-r border-gray-200 aspect-square w-14 h-14">
                        {iconTypes[index]}
                      </div>
                      <div className="flex flex-col w-full p-2 text-sm">
                        <FormField
                          control={form.control}
                          name={`links.${index}.linkUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input
                                  {...field}
                                  className="flex w-full px-3 py-1 transition-colors bg-transparent rounded-md shadow-sm h-9 placeholder:text-gray-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="https://"
                                  onBlur={() =>
                                    handleIconChange(field.value!, index)
                                  }
                                  // onChange={() =>
                                  //   handleIconChange(field.value!, index)
                                  // }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`links.${index}.linkTitle`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <input
                                  className="flex w-full px-3 py-1 text-base font-bold transition-colors bg-transparent rounded-md shadow-sm h-9 placeholder:font-bold placeholder:text-gray-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                  placeholder="URL 제목을 입력해주세요."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <div className="font-bold">깃허브</div> */}
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-2 border border-gray-200 rounded-md">
                      <Button
                        className="border-r border-gray-200 "
                        variant="ghost"
                        size="sm"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (index > 0) {
                            linksMove(index, index - 1);
                          }
                        }}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        className="border-r border-gray-200 "
                        variant="ghost"
                        size="sm"
                        disabled={index === linksFields.length - 1}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (index < linksFields.length - 1) {
                            linksMove(index, index + 1);
                          }
                        }}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          linksRemove(index);
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="px-8">저장</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
