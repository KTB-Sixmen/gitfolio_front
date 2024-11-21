import React from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import ResumeDocument from "./ResumeDocument";
import { ResumeDetailResponse } from "../../../community/_hooks/useResumeQuery";
import { FileText } from "lucide-react";

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
    <Button className="flex gap-2 bg-red-500 pr-6" onClick={downloadPdf}>
      <FileText />
      <div>pdf로 저장</div>
    </Button>
  );
};

export default PdfDownloadButton;
