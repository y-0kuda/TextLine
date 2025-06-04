import { Info, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

export const Toolbar = () => {
  const workspsceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspsceId });

  return (
    // items-centerは上下中央でjustify-centerは左右中央
    // justify-betweenで要素内のものが等間隔に並ぶ
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      {/* スペースを取るために使われる */}
      {/* 他の要素に合わせて伸び縮みする */}
      <div className="flex-1" />
      {/* grow-[2]は横幅を縮める際に縮まる速度で数字が大きい方が遅くなる */}
      {/* shrinkは必要に応じて縮むようにする */}
      <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search {data?.name} </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
