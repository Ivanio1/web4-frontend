import {useNavigate} from "react-router-dom";



const Link = (props) => {
    const navigate = useNavigate();//onClick={() => navigate('/register')}
    return(
        <div>
            <a onClick={() => navigate('/')}>На стартовую</a>
        </div>
    )

}

export default Link;
