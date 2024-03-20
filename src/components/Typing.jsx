import React from "react";

const Typing = () => {
  return (
    <>
      <style>
        {`
      .loader {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: block;
        margin-block: 5px;
        margin-left: 25px;
        position: relative;
        background: #FFF;
        box-shadow: -24px 0 #FFF, 24px 0 #FFF;
        box-sizing: border-box;
        animation: shadowPulse 2s linear infinite;
      }

      @keyframes shadowPulse {
        33% {
          background: #FFF;
          box-shadow: -24px 0 #4439CB, 24px 0 #FFF;
        }
        66% {
          background: #4439CB;
          box-shadow: -24px 0 #FFF, 24px 0 #FFF;
        }
        100% {
          background: #FFF;
          box-shadow: -24px 0 #FFF, 24px 0 #4439CB;
        }
      }
      `}
      </style>
      <span className="bg-gray-200 p-1 px-3 rounded-lg w-20">
        <span className="loader"></span>
      </span>
    </>
  );
};

export default Typing;
