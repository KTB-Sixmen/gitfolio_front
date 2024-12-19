import React from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import ResumeDocument from "./ResumeDocument";
import { Download } from "lucide-react";
import { ResumeDetailResponse } from "@/app/(home)/community/_hooks/useResumeQuery";

type Props = {
  resume: ResumeDetailResponse;
};

const PdfDownloadButton = ({ resume }: Props) => {
  const downloadPdf = async () => {
    const fileName = `${resume.result.memberName}_이력서_깃트폴리오`;
    const blob = await pdf(<ResumeDocument resume={resume} />).toBlob();
    saveAs(blob, fileName);
  };

  return (
    <Button
      className="flex justify-between w-full gap-2 p-0 border-none shadow-none bg-white text-black font-normal hover:bg-gray-100"
      onClick={downloadPdf}
    >
      <div className="text-left">pdf로 저장</div>
      <Download size={18} color="blue" />
    </Button>
  );
};

export default PdfDownloadButton;
