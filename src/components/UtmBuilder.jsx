/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { chatSteps } from "@/utils/chatSteps";
import { useEffect, useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { FaRegCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";

const UtmBuilder = () => {
  const [userInput, setUserInput] = useState({
    message: "",
    type: "response",
  });
  const [chatHistory, setChatHistory] = useState([
    { message: "Welcome to the UTM Builder!" },
  ]);
  const [utmParameters, setUTMParameters] = useState({
    URL: "",
    source: "",
    medium: "",
    campaignName: "",
    term: "",
    content: "",
  });

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy");
  const bottomOfMsgBox = useRef(null);

  useEffect(() => {
    bottomOfMsgBox.current.scrollIntoView();
  }, [step, chatHistory]);

  useEffect(() => {
    //Generating the UTM URL
    if (step === chatSteps.length - 1) {
      setChatHistory(() => {
        const url = utmParameters.URL.replace(/\s+/g, "_");
        const source = utmParameters.source.replace(/\s+/g, "_");
        const medium = utmParameters.medium
          ? `&utm_medium=${utmParameters.medium.replace(/\s+/g, "_")} `
          : "";
        const campaignName = utmParameters.campaignName.replace(/\s+/g, "_");
        const term = utmParameters.term
          ? `&utm_term=${utmParameters.term.replace(/\s+/g, "_")}`
          : "";
        const content = utmParameters.content
          ? `&utm_content=${utmParameters.content.replace(/\s+/g, "_")}`
          : "";
        return [
          ...chatHistory,
          {
            message: `Thank you! Here is your UTM URL: `,
            url: `${url}?utm_source=${source}${medium}&utm_campaign=${campaignName}${term}${content}`,
          },
        ];
      });
    }
  }, [step]);

  const handleNextStep = (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (
      userInput.message === "" &&
      (chatSteps[step].userInputName === "URL" ||
        chatSteps[step].userInputName === "source" ||
        chatSteps[step].userInputName === "campaignName")
    ) {
      setErrorMsg(`You have to give ${chatSteps[step].userInputName}`);
      return;
    }

    if (step < chatSteps.length - 1) {
      setChatHistory([...chatHistory, chatSteps[step], userInput]);
      setUTMParameters((prev) => {
        return {
          ...prev,
          [chatSteps[step]["userInputName"]]: userInput.message,
        };
      });

      setUserInput({
        message: "",
        type: "response",
      });
    }

    setErrorMsg("");

    setIsLoading(true);

    setTimeout(() => {
      setStep(step + 1);
      setIsLoading(false);
    }, 1000);
  };

  //start over handler

  const handleStartOver = () => {
    setChatHistory([
      ...chatHistory,
      { message: "Start again", type: "response" },
    ]);

    setTimeout(() => {
      setStep(0);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="w-screen h-screen grid place-items-center">
      <div className="w-[500px] bg-gradient-to-r  from-indigo-700 to-violet-500 overflow-hidden rounded-xl shadow-[0px_0px_100px_1px] shadow-slate-500">
        <h2 className="text-center text-3xl text-white font-bold mt-2">
          UTM Builder
        </h2>
        <div className="flex flex-col justify-end  h-[750px] px-5 py-4 m-2 bg-gray-100 rounded-lg shadow-[inset_0px_0px_5px_1px]">
          <div className="overflow-auto chatBody flex flex-col">
            {chatHistory.map((conversation, index) => (
              <div
                className={`my-2 max-w-[90%] p-2 rounded-xl ${
                  conversation.type === "response"
                    ? "ml-auto bg-gradient-to-r from-violet-500 to-indigo-700 break-all"
                    : "bg-gray-200"
                }`}
                key={index}
              >
                <span
                  className={`text-lg ${
                    conversation.type === "response"
                      ? "text-white rounded-full"
                      : ""
                  }`}
                >
                  {`${
                    conversation.message === "" ? "Skip" : conversation.message
                  }`}
                </span>
                {conversation.url && (
                  <div className="relative">
                    <p className="bg-gray-200 border p-2 rounded-lg border-violet-500 shadow-[inset_0px_0px_5px_1px_gray] break-all">
                      {conversation.url.toLowerCase()}
                    </p>
                    <div
                      onMouseLeave={() => setCopyStatus("Copy")}
                      className="group absolute top-1 right-1"
                    >
                      <p className="absolute px-2 bg-violet-500 rounded text-xs font-semibold text-white py-1 right-14 translate-x-1/4 top-0  w-[70px] text-center after:content-[''] after:w-3 after:aspect-square after:bg-violet-500 after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:translate-x-1/3 after:rotate-45 scale-0 group-hover:scale-100 duration-100">
                        {copyStatus}
                      </p>
                      <CopyToClipboard
                        text={conversation.url.toLowerCase()}
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
            ))}
            {isLoading ? (
              <p>Loading..</p>
            ) : chatSteps[step]?.isFinal ? (
              ""
            ) : (
              <p className="text-lg bg-gray-200 p-2 rounded-lg w-[90%]">
                {chatSteps[step]?.message}
              </p>
            )}
            <div ref={bottomOfMsgBox}></div>
          </div>
          <div className="mt-4 text-center">
            <div className="mb-2">
              {chatSteps[step]?.suggestions &&
                !isLoading &&
                chatSteps[step]?.suggestions.map((suggestion, i) => (
                  <label
                    htmlFor="response"
                    onClick={() =>
                      setUserInput(() => {
                        return {
                          ...userInput,
                          message: suggestion,
                        };
                      })
                    }
                    className={` mr-2 py-1 px-2 rounded-lg text-white hover:bg-indigo-700 duration-300 cursor-pointer ${
                      userInput.message === suggestion
                        ? "bg-indigo-700"
                        : "bg-indigo-500"
                    }`}
                    key={i}
                  >
                    {suggestion}
                  </label>
                ))}
              {errorMsg && <p className="mt-1 text-red-700">{errorMsg}</p>}
            </div>

            <form
              className="flex flex-col relative"
              onSubmit={handleNextStep}
              action=""
            >
              <Input
                id="response"
                className="pr-12"
                type={chatSteps[step]?.userInputName === "URL" ? "url" : "text"}
                value={userInput.message}
                placeholder="Your answer"
                onChange={(e) =>
                  setUserInput({ ...userInput, message: e.target.value })
                }
                disabled={chatSteps[step]?.isFinal}
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex">
                {userInput.message === "" &&
                  !isLoading &&
                  (chatSteps[step].userInputName === "medium" ||
                    chatSteps[step].userInputName === "term" ||
                    chatSteps[step].userInputName === "content") && (
                    <Button type="submit" variant="link">
                      Skip
                    </Button>
                  )}

                <Button
                  disabled={chatSteps[step]?.isFinal}
                  type="submit"
                  variant="ghost"
                >
                  <IoSend
                    className={`${
                      userInput.message ? "text-indigo-700" : "text-gray-300"
                    } text-3xl`}
                  />
                </Button>
              </div>
            </form>
            {chatSteps[step]?.isFinal && (
              <Button className="mt-2" onClick={handleStartOver}>
                Start Over
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UtmBuilder;
