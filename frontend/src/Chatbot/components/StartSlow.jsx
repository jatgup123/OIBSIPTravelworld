import React from 'react'

export default function StartSlow(props) {

    const preference = () => {
        const name = props.state.userData.name;
        const peoples = props.state.userData.peoples;
        const budget = props.state.userData.budget;
        console.log("Start", name);
        props.state.data(name, peoples, budget, props);
    }

    return (
        <div>
            <button className='start-btn' onClick={() => preference()}>Start</button>
        </div>
    )
}
