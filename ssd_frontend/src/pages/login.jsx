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
  
	  if (response.code != 200) setStatusMessage(response.data.message);
	  else {
		setToken(response.data.token);
		navigate("/add", {
		  replace: true,
		});
	  }
	};

	return (
		<div>
			<Container style={{ backgroundColor: "white",marginTop:"100px" }}>
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
