import { useLocation, Link } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const error = location.state && location.state.error;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error ? error.statusText || error.message : "Unknown error"}</i>
      </p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
