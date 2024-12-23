import { Button } from "@/components/ui/button";
import { CardContent, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp, PlusCircle, Trash } from "lucide-react";
import { useFieldArray } from "react-hook-form";

// 개별 프로젝트 컴포넌트
const ProjectFields = ({
  index,
  control,
  template,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  index: number;
  control: any;
  template: string;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const {
    fields: roleAndTaskFields,
    append: roleAndTaskAppend,
    remove: roleAndTaskRemove,
  } = useFieldArray({
    control,
    name: `projects.${index}.roleAndTask`,
  });

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            프로젝트 {String(index + 1).padStart(2, "0")}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={isFirst}
              onClick={onMoveUp}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={isLast}
              onClick={onMoveDown}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <FormField
          control={control}
          name={`projects.${index}.projectName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>프로젝트명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="프로젝트명" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <FormField
            control={control}
            name={`projects.${index}.projectStartedAt`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>시작일</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="YYYY-MM-DD" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`projects.${index}.projectEndedAt`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>종료일</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="YYYY-MM-DD" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name={`projects.${index}.skillSet`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>스킬셋</FormLabel>
              <FormControl>
                <Input {...field} placeholder="예: React, Node.js" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>역할 및 업무</FormLabel>
          {roleAndTaskFields.map((rtField, rtIndex) => (
            <div key={rtField.id} className="flex gap-2 items-center">
              <FormField
                control={control}
                name={`projects.${index}.roleAndTask.${rtIndex}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} placeholder="역할 또는 업무" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => roleAndTaskRemove(rtIndex)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => roleAndTaskAppend("")}
            className="flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            추가
          </Button>
        </div>

        {template === "STAR" && (
          <>
            <FormField
              control={control}
              name={`projects.${index}.star.situation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>S (Situation)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="상황 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.star.task`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>T (Task)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="과제 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.star.action`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>A (Action)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="조치 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.star.result`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>R (Result)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="결과 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {template === "GITFOLIO" && (
          <>
            <FormField
              control={control}
              name={`projects.${index}.troubleShooting.problem`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="문제점 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.troubleShooting.hypothesis`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hypothesis</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="가설 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.troubleShooting.try`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Try</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="시도한 내용" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.troubleShooting.result`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="결과 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Separator className="my-4" />
      </div>
    </CardContent>
  );
};

export default ProjectFields;
