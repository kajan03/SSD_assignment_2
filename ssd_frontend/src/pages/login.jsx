import React, { useState } from "react";
import {
	Grid,
	TextField,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {

	const [userName, setUserName] = useState();
	const [passWord, setPassword] = useState();
	const [statusMessage, setStatusMessage] = useState("");
	const [error, setError] = useState('');
	let navigate = useNavigate();

	async function loginUser(credentials) {
		return new Promise((resolve, reject) => {
			fetch("http://localhost:5000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			})
				.then(async function (response) {
					let code = response.status;
					let data = await response.json();
					resolve({
						code: code,
						data: data,
					});
				})
				.catch((e) => reject(e));
		});
	}


	const handleSubmit = async (e) => {
		e.preventDefault();



		const response = await loginUser({
			userName: userName,
			passWord: passWord,
		});

		if (response.code != 200) { setStatusMessage(response.data.message); setError('Please add User name and Password') }
		else {
			setToken(response.data.token);
			navigate("/add", {
				replace: true,
			});
		}
	};

	return (
		<div>
			<Container style={{ backgroundColor: "white", marginTop: "100px" }}>
				<Grid container spacing={3}>
					<Grid item sm={3}></Grid>
					<Grid item sm={6}>
						<Card>
							<CardHeader
								title="Login"
								titleTypographyProps={{ variant: "h5" }}
								style={{
									textAlign: "center",
									color: "#4A5568",
								}}
							></CardHeader>
							<CardContent>
								<form>
									<div style={{ display: 'flex', justifyContent: 'center', color: 'red', marginBottom: '5%' }}>{error}</div>
									<Grid container spacing={3}>

										<Grid item sm={12}>
											<TextField
												id="outlined-basic"
												label="Username"
												variant="outlined"
												className="inputText"
												required
												fullWidth
												size="medium"
												onChange={(e) => setUserName(e.target.value)}
											/>
										</Grid>
										<Grid item sm={12}>
											<TextField
												id="outlined-basic"
												label="Password"
												variant="outlined"
												className="inputText"
												required
												type="password"
												fullWidth
												size="medium"
												onChange={(e) => setPassword(e.target.value)}
											/>
										</Grid>
										<Grid item sm={12} style={{
											display: 'flex',
											justifyContent: 'center'
										}}>
											<Button
												variant="contained"

												style={{
													color: "#ffffff",
													backgroundColor: "#167cf7",
													width: "50%",
													borderRadius: "6px",

												}}
												type="submit"
												onClick={handleSubmit}
											>
												Login
											</Button>
										</Grid>
									</Grid>
								</form>
							</CardContent>
						</Card>
					</Grid>
					<Grid item sm={3}></Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default LoginForm;
