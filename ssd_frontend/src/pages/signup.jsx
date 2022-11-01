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
	Select,
    InputLabel,
    FormControl,
    MenuItem
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const [userName, setUserName] = useState();
	const [passWord, setPassword] = useState();
	const [role, setRole] = useState();
	const [statusMessage, setStatusMessage] = useState("");
	let navigate = useNavigate();

	async function signUpUser(credentials) {
		return new Promise((resolve, reject) => {
			fetch("http://localhost:5000/signup", {
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

		const response = await signUpUser({
			userName: userName,
			passWord: passWord,
			role: role,
		});

		setUserName("");
		setPassword("");
		setStatusMessage(response.data.message);
	};

	const loginHandler = (e) => {
		navigate("../login", { replace: true });
	};

	return (
		<div>
			<Container style={{ backgroundColor: "white", marginTop: "100px" }}>
				<Grid container spacing={3}>
					<Grid item sm={3}></Grid>
					<Grid item sm={6}>
						<Card>
							<CardHeader
								title="Register User"
								titleTypographyProps={{ variant: "h5" }}
								style={{
									textAlign: "center",
									color: "#4A5568",
								}}
							></CardHeader>
							<CardContent>
								<form>
									<Grid container spacing={3}>
										<Grid item sm={12}>
											<TextField
												id="outlined-basic"
												label="Username"
												variant="outlined"
												className="inputText"
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
												fullWidth
												size="medium"
												onChange={(e) => setPassword(e.target.value)}
											/>
										</Grid>
										<Grid item sm={12}>
											<FormControl fullWidth>
												<InputLabel variant="outlined" id="demo-simple-select-label">
													Role Type
												</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={role}
                                                    variant="outlined"
													label="Role Type"
													onChange={(e) => setRole(e.target.value)}
												>
													<MenuItem value={"Admin"}>Admin</MenuItem>
													<MenuItem value={"Manager"}>Manager</MenuItem>
													<MenuItem value={"Staff"}>Staff</MenuItem>
												</Select>
											</FormControl>
										</Grid>
										<Grid item sm={4}>
											<Button
												variant="contained"
												style={{
													color: "#ffffff",
													backgroundColor: "#62A9FF",
													width: "100%",
													borderRadius: "6px",
												}}
												type="submit"
												onClick={handleSubmit}
											>
												Signup
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

export default SignUp;
