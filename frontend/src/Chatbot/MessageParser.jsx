import React from 'react';

const MessageParser = ({ children, actions }) => {
    // console.log(children.props.state)
    const { checker } = children.props.state;
    const parse = (message) => {
        if (checker === "peoples") {
            actions.afterNameMessage();
            children.props.state.userData.name = message;
        }

        if (checker === "budget" && Number(message)) {
            actions.afterpeopleMessage();
            children.props.state.userData.peoples = message;
        }

        if (checker === "preference" && Number(message)){
            actions.afterbudgetMessage();
            children.props.state.userData.budget = message;
        }
    }
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;
