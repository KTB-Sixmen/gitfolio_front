import Tistory from "../../../public/tistory.svg";
import Notion from "../../../public/notion.svg";
import { Github, Link, Linkedin } from "lucide-react";

export const handleIconChange = (url: string) => {
  if (url.includes("github.com")) {
    return <Github />;
  } else if (url.includes("linkedin.com")) {
    return <Linkedin />;
  } else if (url.includes("tistory.com")) {
    return <Tistory />;
  } else if (url.includes("notion.site")) {
    return <Notion />;
  } else {
    return <Link />;
  }
};
