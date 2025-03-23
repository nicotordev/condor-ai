import { AppChatFormProps } from "@/types/app";
import EditableDiv from "../Common/EditableDiv";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import clsx from "clsx";
import AppSuggestionBar from "./AppSuggestionBar";

export default function AppChatForm({
  onSubmit,
  message,
  setMessage,
  isPending,
  isInitialChat,
  handleQuery,
}: AppChatFormProps) {
  return (
    <div className="flex flex-col gap-8">
      {isInitialChat && (
        <AppSuggestionBar handleQuery={handleQuery} />
      )}
      <form
        className={clsx(
          "text-center md:flex flex-col gap-4 max-md:fixed max-md:bottom-0 max-md:w-screen max-md:rounded-none w-full relative",
        )}
        onSubmit={onSubmit}
      >
        <div className="p-2 min-w-2xl rounded-lg shadow-md w-full md:max-w-4xl border border-gray-300 mx-auto bg-white">
          <div className="relative w-full max-w-full pb-3">
            <EditableDiv
              placeholder="Escribe tu mensaje aquí..."
              onChange={setMessage}
              value={message}
              className="relative w-full p-3 bg-transparent focus:outline-none text-left break-words whitespace-pre-wrap"
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              className="rounded-full text-dark-text-accent shrink-0 aspect-square w-9 h-9 hover:border-white hover:-translate-y-1"
              variant="outline"
              type="submit"
              disabled={isPending}
            >
              <ArrowUp />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
