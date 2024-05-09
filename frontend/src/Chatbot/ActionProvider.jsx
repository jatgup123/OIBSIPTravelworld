import React from 'react';
//import useSpeechRecognition from "./speech1.ts";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    /*const {
        text
      }=useSpeechRecognition();*/
      //console.log("text0", text);
    const initialAction = () => {
       
        const message =createChatBotMessage('Just type in your name to begin.');
        //console.log("text1", text);
        //const message = {text}
        updateState(message, "peoples")
    }

    const afterNameMessage = () => {
        const message = createChatBotMessage("Let me know the no. of peoples want to travel.");
        
        updateState(message, "budget")
    }

    const afterpeopleMessage = () => {
        const message = createChatBotMessage("Let me know your budget of travelling so that i can suggest best packages for you");
        updateState(message, "preference")
    }

    const afterbudgetMessage = () => {
        const message = createChatBotMessage("If u are comfirm on your entered credentials then click on Start button",{
            widget: "startSlow"
        });
        updateState(message)
    }

    const finalResult = (name, peoples, budget) => {
        const message = createChatBotMessage(`Got it, ${name}! Based on your no. of peoples ${peoples} and budget ${budget} for a package, Here are some of the recommanded packages. Enjoy the thrill!`, {
            widget: "finalImage"
        })
        updateState(message)
    }

    const updateState = (message, checker) => {
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
            checker,
        }))
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        initialAction,
                        afterNameMessage,
                        afterpeopleMessage,
                        afterbudgetMessage,
                        finalResult
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;