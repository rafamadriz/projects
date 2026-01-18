export default function BadgePill({ children, color }) {
    return (
        <div className={`badge badge-pill ${color}`}>
            {children}
        </div>
    )
}
