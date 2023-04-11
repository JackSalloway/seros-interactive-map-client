import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./GenericError.css";

const GenericError = () => {
    const [seconds, setSeconds] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        if (seconds !== 0) {
            setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
        }
        if (seconds === 0) {
            navigate("/");
        }
    }, [seconds, navigate]);

    return (
        <div className="error-element-wrapper">
            <p>Oops! We've encountered an error!</p>
            <p>
                Redirecting you to the <Link to={"/"}>login page</Link> in{" "}
                {seconds} seconds.
            </p>
            <p>Sorry for any inconvenience caused!</p>
        </div>
    );
};

export default GenericError;
