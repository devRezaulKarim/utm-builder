import { IoSend } from "react-icons/io5";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Form = ({
  handleNextStep,
  chatSteps,
  step,
  userInput,
  setUserInput,
  isLoading,
  errorMsg,
}) => {
  return (
    <>
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
    </>
  );
};

export default Form;
