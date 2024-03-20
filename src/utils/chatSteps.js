export const chatSteps = [
  {
    message:
      " To get started, could you please provide the main URL you'll be using for your campaign?",
    userInputName: "URL",
    msgType: "request",
  },
  {
    message: "Great! Now, let's determine where you'll be sharing this link.",
    userInputName: "source",
    msgType: "request",
    suggestions: ["Google", "Facebook", "Twitter", "Instagram", "Email"],
  },
  {
    message: "Excellent! Now, let's determine the medium for your campaign",
    userInputName: "medium",
    msgType: "request",
    suggestions: ["Email", "Social", "CPC", "Organic", "Banner"],
  },
  {
    message: "Good! Now, let's think of a name for your campaign.",
    userInputName: "campaignName",
    msgType: "request",
  },
  {
    message:
      "Do you have any specific terms you'd like to track for this campaign? ",
    userInputName: "term",
    msgType: "request",
  },
  {
    message:
      "Would you like to specify any content for this link? It could be the name of the specific email, a particular banner or button, or any other identifier.",
    userInputName: "content",
    msgType: "request",
  },
  {
    isFinal: true,
  },
];
