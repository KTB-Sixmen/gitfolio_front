import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  avatarUrl: string;
  nickname: string;
  credit: number;
};

export default function HeaderPopover({ avatarUrl, nickname, credit }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage
            src={
              avatarUrl.startsWith("https://avatars")
                ? avatarUrl
                : `${process.env.NEXT_PUBLIC_S3_URL}${avatarUrl}`
            }
            alt="Profile Image"
          />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-4">
        <div className="flex flex-col items-center space-y-2">
          <Avatar>
            <AvatarImage
              src={
                avatarUrl.startsWith("https://avatars")
                  ? avatarUrl
                  : `${process.env.NEXT_PUBLIC_S3_URL}${avatarUrl}`
              }
              alt="Profile Image"
            />
          </Avatar>
          <p className="text-lg font-semibold">{nickname}</p>
          <p className="text-sm text-muted-foreground">Credit: {credit}</p>
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => {
              // mutate();
              console.log("로그아웃");
            }}
          >
            로그아웃
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
