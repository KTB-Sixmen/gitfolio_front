import { Suspense } from "react";
import Plan from "./_components/Plan";

export default function Page() {
  return (
    <div className="flex-grow overflow-y-auto justify-center items-center">
      <Suspense>
        <Plan />
      </Suspense>
    </div>
  );
}
