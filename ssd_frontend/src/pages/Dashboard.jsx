import React, { useEffect, useRef, useState } from "react";
import useToken from "../userToken";
import Imagepage from "./imagePage"
import { useNavigate } from "react-router-dom";

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

async function getData(token) {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:5000/files", {
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

const Dashboard = () => {

	const [permissions, setPermissions] = useState([]);
	const { token, setToken } = useToken();
	const response2 = useRef(null)
	let navigate = useNavigate();

	useEffect(() => {
		async function fetchPermission(token) {
			let response = await getPermission(token);
			response2.current = await getData(token);

			setPermissions(response.data.data);

			return response;
		}

		fetchPermission(token);
	}, []);

	useEffect(() => {
		if (!token) navigate("../login", { replace: true });
	}, [token]);

	return (

		<div>

			{response2.current != null ?
				response2.current.data.map((image) => {
					return (
						permissions.includes("FILEUPLOAD") ? 
						(
							<div key={image.imagePath}>
								<h2>{image.message}</h2>
								<Imagepage imageIds={image.imagePath} />
							</div>) : 
							(
								<div key={image.message}>
									<h2>{image.message}</h2>
								</div>
							)
						)
				}) : null
			}

		</div>
	);
}

export default Dashboard