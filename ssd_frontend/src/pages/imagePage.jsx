import React, { useEffect, useState } from 'react'
import useToken from "../userToken";
import { useNavigate } from "react-router-dom";


async function getImagesFrm(token, id) {

  let blob = await fetch("http://localhost:5000/file/" + id,
    {
      method: "GET",
      headers: {
        token: token,
      }
    }).then(r =>
      r.blob()
    );

  return blob;

}

const ImagePage = ({ imageIds }) => {

  const { token, setToken } = useToken();
  const [images, setImages] = useState(null)
  let navigate = useNavigate();

  useEffect(() => {

    async function getImage(id) {
      let imageBlob
      try {

        imageBlob = await getImagesFrm(token, id);

      } catch (err) {
        return null
      }

      return window.URL.createObjectURL(imageBlob)
    }

    async function getImages() {
      const imageArray = await getImage(imageIds)

      setImages(imageArray)
    }

    getImages()

  }, [])


  useEffect(() => {
    if (!token) navigate("../login", { replace: true });
  }, [token]);


  return (
    <div>
      {
        images != null ?

          <img src={images} height={300} width={"60%"} alt={`image-${images}`} key={images} />
          : null
      }
    </div>
  )

}

export default ImagePage