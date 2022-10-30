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
import FileUpload from 'react-material-file-upload';

const AddMessageFiles = () => {

    // const [files, setFiles] = useState<File>([]);

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
											<TextField
												id="outlined-basic"
												label="Enter Message"
												variant="outlined"
												className="inputText"
												fullWidth
												size="medium"
											/>
										</Grid>
										<Grid item sm={12}>
                                        <FileUpload />
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