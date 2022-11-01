import React, { useEffect, useState } from "react";
import {
    Grid,
    Button,
    Card,
    Container,
} from "@material-ui/core";
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


const Home = () => {

    const { token, setToken } = useToken();
    const [permissions, setPermissions] = useState([]);

    let navigate = useNavigate();

    const handleSubmitAddUser = async (e) => {
        navigate("/signup", {
            replace: true,
        });
    }

    const handleSubmitAddData = async (e) => {
        navigate("/add", {
            replace: true,
        });
    }

    useEffect(() => {
        async function fetchPermission(token) {
            let response = await getPermission(token);

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
            <Container style={{ backgroundColor: "white", marginTop: "100px", height: '100%' }}>
                <Grid container spacing={12}>
                    <Grid item sm={12}>
                        <Card style={{ display: 'flex', justifyContent: 'center', }}>
                            {permissions.includes("ADMIN") ?
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10%', justifyContent: 'center', alignItems: 'center', padding: '5%' }}>
                                    <Button
                                        variant="contained"
                                        style={{
                                            color: "#ffffff",
                                            backgroundColor: "#167cf7",
                                            width: "50%",
                                            borderRadius: "6px",
                                            marginBottom: '5%'

                                        }}
                                        type="submit"
                                        onClick={handleSubmitAddUser}
                                    >
                                        Add users
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            color: "#ffffff",
                                            backgroundColor: "#167cf7",
                                            width: "50%",
                                            borderRadius: "6px",

                                        }}
                                        type="submit"
                                        onClick={handleSubmitAddData}
                                    >
                                        Add data
                                    </Button>
                                </div>
                                :
                                <Button
                                    variant="contained"

                                    style={{
                                        color: "#ffffff",
                                        backgroundColor: "#167cf7",
                                        width: "50%",
                                        borderRadius: "6px",

                                    }}
                                    type="submit"
                                    onClick={handleSubmitAddData}
                                >
                                    Add data
                                </Button>
                            }


                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Home;
