import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	console.log("This is your token " + store.token)
	const localtoken = sessionStorage.getItem("token")

	const handleClick = () => {
		actions.login(email, password).then(() => {
			navigate("/");
		});
	};

	return (
		<div className="text-center my-5">
			<div className="title my-3">
				<h1>Login</h1>
			</div>
			{store.token && store.token != "" && store.token != undefined ? (
				"You are logged in with this token => " + store.token
			) : (
				<div className="container col-md-4">
					<div className="form-floating mb-3">
						<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
						<label htmlFor="floatingInput">Email</label>
					</div>
					<div className="form-floating mb-3">
						<input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
						<label htmlFor="floatingPassword">Password</label>
					</div>
					<button className="btn btn-primary" onClick={handleClick}>Login</button>
				</div>

			)}
		</div>
	);
};
