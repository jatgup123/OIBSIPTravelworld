import React from 'react'

export default function DipslayImage(props) {
    const { imageUrl, link, amt, name } = props.state.userData.product;
    console.log(props.state.userData)

    return (
        <div className='img-component'>
            <div>{name}</div>
            <div>{amt}</div>
            <div className='img-container'>
                <img src={imageUrl} alt="" />
            </div>
            <a href={link} target='_blank' rel="noreferrer">Link</a>
        </div>
    )
}
