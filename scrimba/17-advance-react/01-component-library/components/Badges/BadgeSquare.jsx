export default function BadgeSquare({ children, color }) {
    return (
        <div className={`badge badge-square ${color}`}>
            {children}
        </div>
    )
}
