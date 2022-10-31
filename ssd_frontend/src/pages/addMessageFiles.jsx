import React, { useEffect, useState } from "react";
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
import FileUpload from 'react-material-file-upload';
import useToken from "../userToken";
import { useNavigate, useLocation } from "react-router-dom";

async function getPermission(token) {
	return new Promise((resolve, reject) => {
	  fetch("http://localhost:5000/permissions", {
		method: "GET",
		headers: {
		  token: token,
		},
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

const AddMessageFiles = () => {

	const { token, setToken } = useToken();
	const [permissions, setPermissions] = useState([]);
	const [statusMessage, setStatusMessage] = useState("");
	const [files, setFiles] = useState();
	const [message, setMessage] = useState([]);

	let navigate = useNavigate();

	async function fileUpload(credentials) {
		return new Promise((resolve, reject) => {
		  fetch("http://localhost:5000/file/file_upload", {
			method: "POST",
			headers: {
				token: token,
			},
			body: credentials,
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

		const formData = new FormData();
		formData.append("message", message);
		formData.append("image", files[0]);

		const response = await fileUpload(formData);
	
		if (response.code != 200) setStatusMessage(response.data.message);
		else {
		//   setToken(response.data.token);
		  navigate("/", {
			replace: true,
		  });
		}
	  };

	useEffect(() => {
		async function fetchPermission(token) {
		  let response = await getPermission(token);
	
		  setPermissions(response.data.data);
		
		  return response;
		}
		fetchPermission(token);
	  }, []);

	return (
		<div>
			<Container style={{ backgroundColor: "white",marginTop:"100px" }}>
				<Grid container spacing={3}>
					<Grid item sm={3}></Grid>
					<Grid item sm={6}>
						<Card>
							<CardHeader
								title="Create Message"
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
											{
												permissions.includes("MESSAGE") ?

												<TextField
												id="outlined-basic"
												label="Enter Message"
												variant="outlined"
												className="inputText"
												fullWidth
												size="medium"
												onChange={(e) => setMessage(e.target.value)}
												/> : null

											}

										</Grid>

										<Grid item sm={12}>

											{
												permissions.includes("FILEUPLOAD") ?
												<FileUpload 
													value={files} 
													onChange={setFiles}
												/> : null
											}

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
												Submit
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

export default AddMessageFiles;
