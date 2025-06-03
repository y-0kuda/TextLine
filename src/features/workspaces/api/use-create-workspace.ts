import { useCallback, useMemo, useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

// workspaceの名前
type RequestType = { name: string };
// workspaceができた後に作られるworkspaceのid
type ResponseType = Id<"workspaces"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  // Error型のエラーをerrorに入れる
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateWorkspace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);

  // statusという変数ひとつでさまざまな状態を場合分けする
  // 各statusと'pending'や'success'などが同じであればtrue、異なっていればfalseが各変数に入る
  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    // valuesにはworkspaceの名前など必要な情報が渡される
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");

        const response = await mutation(values);
        // mutationが実行されれば、successのメソッドが実行される
        // responseには作成されたworkspaceの情報が入る
        options?.onSuccess?.(response);
        // onSuccessを使わなくてもdataを取得できるようにreturnする
        // dataには新しく作ったworkspaceのidが入っている
        return response;
      } catch (error) {
        setStatus("error");
        options?.onError?.(error as Error);
        // callbackで呼ばなくてもいいようにここでthrow errorをしている
        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
