// workspaceのURLのパラメーターの取得ができるようにする

import { useParams } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";

export const useWorkspaceId = () => {
  const params = useParams();
  // 型がstringでもありconvexに合う型でもあるので、安全に扱える
  return params.workspaceId as Id<"workspaces">;
};
