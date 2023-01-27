import React from "react";
import { Box, Button, Container } from "@mui/material";
import image1 from "./circe-denyer-W_8Tivmufmo-unsplash.jpg";
import image2 from "./thomas-dils-_9zEZ7QBPiY-unsplash.jpg";

import axios from "axios";
function App() {
  //토큰
  const TOKEN: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4OSIsImlhdCI6MTY3NDAzNzkzNiwiZXhwIjoxNjc0MDQ1MTM2fQ.RXYPcAwJcytFL8_bkz5jrf64nRP6IVCK4bFTf88nbi4";
  // 로컬 서버 URL
  const BASE_URL: string = "https://api-dev.passsign.kr";
  //문서 id
  const documentId: string = "97";
  axios.interceptors.request.use(function (config) {
    config.headers = {
      Authorization: `Bearer ${TOKEN}`,
    };
    return config;
  });
  const onClick = () => {
    axios.defaults.headers.common[`Authorization`] = `Bearer ${TOKEN}`;
    axios
      .get(`${BASE_URL}/api/document/download/${documentId}`)
      .then((res) => res.data)
      .then((res) => {
        fetch(res.documentUrl, { method: "GET" })
          .then((res) => {
            return res.blob();
          })
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Document.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout((_) => {
              window.URL.revokeObjectURL(url);
            }, 60000);
          })
          .catch((err) => {
            console.error("err: ", err);
          });
      });
  };
  // const onClickDownloadFile = async () => {
  //   axios.defaults.headers.common[`Authorization`] = `Bearer ${TOKEN}`;

  //   await axios({
  //     url: `${BASE_URL}/api/document/download/${documentId}`,
  //     method: "GET",
  //     responseType: "blob",
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     console.log(url);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "file.pdf"); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // };
  return (
    <Container>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1>PDF 다운 받기 ~~~</h1>
      </Box>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Button onClick={onClick} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Box>
            <img src={image1} alt="너굴" width={400} />
            <img src={image2} alt="너굴" width={400} />
          </Box>
          <Box>다운 받아줘잉</Box>
        </Button>
      </Box>
    </Container>
  );
}

export default App;
