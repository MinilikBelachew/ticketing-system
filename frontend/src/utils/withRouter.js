import { useNavigate } from "react-router-dom";

export function withRouter(Component) {
  return function WithRouter(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
