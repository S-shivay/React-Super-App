import {useNavigate} from "react-router-dom"
export default function NotFound () {
    const navigate = useNavigate();
    return (
        <div style={{textAlign:"center"}}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
    )
}