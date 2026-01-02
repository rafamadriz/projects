export default function Die(props) {
    return (
        <button
            onClick={props.toggleIsHeld}
            className={props.isHeld ? "is-held" : null}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value},
            ${props.isHeld ? "held" : "not held"}`}
        >
            {props.value}
        </button>
    )
}
