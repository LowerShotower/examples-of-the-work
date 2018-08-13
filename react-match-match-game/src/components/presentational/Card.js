import React from 'react';

const Card = (props) => {

    const card = React.createRef();

    const skirtStyle = {
        backgroundPositionY: 0 + '%',
        backgroundPositionX: 'calc(' + props.skirtType + ' * 100% / 2)'
    }
    const faceStyle = {
        backgroundPositionY: 0 + '%',
        backgroundPositionX: 'calc(' + props.type + ' * 100% / 11)'
    }

    const onClick = (e) => {
        console.log(props.id)
        // card.current.className = "card open disabled";
        props.onCardClick(props.id);
    }

    return (
        <div className={props.className} onClick={onClick} ref={card} >
            <div className="face front" style={skirtStyle}></div>
        <div className="face back" style={faceStyle}></div>
        </div>
    )
}

export default Card;
