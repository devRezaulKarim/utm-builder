/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import { chatSteps } from "@/utils/chatSteps";
import { useEffect, useState, useRef } from "react";
import Form from "./Form";
import Chat from "./Chat";
import Typing from "./Typing";

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
              <Chat
                key={index}
                conversation={conversation}
                copyStatus={copyStatus}
                setCopyStatus={setCopyStatus}
              />
            ))}
            {isLoading ? (
              <Typing />
            ) : chatSteps[step]?.isFinal ? (
              ""
            ) : (
              <p className="text-lg bg-gray-200 p-2 rounded-lg w-[90%]">
                {chatSteps[step]?.message}
              </p>
            )}
            <div ref={bottomOfMsgBox}></div>
          </div>
          <div className="my-3 text-center">
            <Form
              handleNextStep={handleNextStep}
              chatSteps={chatSteps}
              step={step}
              userInput={userInput}
              setUserInput={setUserInput}
              isLoading={isLoading}
            />
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
