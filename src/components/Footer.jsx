import { faBowlFood, faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";



export const Footer = ()=>{
	return (
		<footer>
			<Link to="/">
        	    <FontAwesomeIcon icon={faHome}/>
        	</Link>
        	<Link to="/search" className="active">
        	    <FontAwesomeIcon icon={faSearch}/>
        	</Link>
        	<Link to="/">
        	    <FontAwesomeIcon icon={faBowlFood}/>
        	</Link>
        	<Link to="/profile">
        	    <FontAwesomeIcon icon={faUser}/>
        	</Link>
		</footer>
	);
}