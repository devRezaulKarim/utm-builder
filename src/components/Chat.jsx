import CopyToClipboard from "react-copy-to-clipboard";
import { Button } from "./ui/button";
import { FaRegCopy } from "react-icons/fa6";

const Chat = ({ conversation, copyStatus, setCopyStatus }) => {
  return (
    <div
      className={`my-2 max-w-[90%] p-2 rounded-xl ${
        conversation.type === "response"
          ? "ml-auto bg-gradient-to-r from-violet-500 to-indigo-700 break-all"
          : "bg-gray-200"
      }`}
    >
      <span
        className={`text-lg ${
          conversation.type === "response" ? "text-white rounded-full" : ""
        }`}
      >
        {`${conversation.message === "" ? "Skip" : conversation.message}`}
      </span>
      {conversation.url && (
        <div className="relative">
          <p className="bg-gray-200 border p-2 rounded-lg border-violet-500 shadow-[inset_0px_0px_5px_1px_gray] break-all">
            {conversation.url}
          </p>
          <div
            onMouseLeave={() => setCopyStatus("Copy")}
            className="group absolute top-1 right-1"
          >
            <p className="absolute px-2 bg-violet-500 rounded text-xs font-semibold text-white py-1 right-14 translate-x-1/4 top-0  w-[70px] text-center after:content-[''] after:w-3 after:aspect-square after:bg-violet-500 after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:translate-x-1/3 after:rotate-45 scale-0 group-hover:scale-100 duration-100">
              {copyStatus}
            </p>
            <CopyToClipboard
              text={conversation.url}
              onCopy={() => setCopyStatus("Copied!")}
            >
              <Button
                className="opacity-80 hover:opacity-100 duration-300"
                size="xs"
              >
                <FaRegCopy className="text-sm" />
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
