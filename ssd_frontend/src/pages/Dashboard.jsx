import React, { useEffect, useRef, useState } from "react";
import useToken from "../userToken";
import Imagepage from "./imagePage"

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

    useEffect(() => {
		async function fetchPermission(token) {
		  let response = await getPermission(token);
          response2.current = await getData(token);
		  
		  setPermissions(response.data.data);
		
		  return response;
		}

		fetchPermission(token);
	  }, []);

  return (

    <div>
		
		{ response2.current != null?
			response2.current.data.map((image) => {
				return (
					<div key={image.imagePath}>
						<h2>{image.message}</h2>
						<Imagepage imageIds={image.imagePath} />
					</div>
				)
			}) : null
		}

	</div>
  );
}

export default Dashboard