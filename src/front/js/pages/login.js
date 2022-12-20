import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	console.log("store message", store.message);
	console.log("actions", actions);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const token = sessionStorage.getItem("token");

	const handleClick = async () => {
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};
	};

	return (
		<div className="text-center my-5">
			<div className="title my-3">
				<h1>Login</h1>
			</div>
			{token && token != "" && token != undefined ? (
				"You are logged-in with this token" + token
			) : (
				<form>
					<div className="container col-md-4">
						<div class="form-floating mb-3">
							<input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
							<label for="floatingInput">Email</label>
						</div>
						<div class="form-floating mb-3">
							<input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
							<label for="floatingPassword">Password</label>
						</div>
					</div>
					<button type="submit" className="btn btn-primary" onClick={handleClick}>Login</button>
				</form>
			)}
		</div>
	);
};
