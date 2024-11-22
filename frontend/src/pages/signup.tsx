import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigated = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("authToken");
    if (auth) {
      navigated("/");
      return;
    }
  });
  const handleLogin = async () => {
    let result = await fetch("http://localhost:5005/api/auth/signup", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result)
    if (result) {
      localStorage.setItem("authToken",result?.data?.token);
      localStorage.setItem("email", result?.data?.email);
      navigated("/");
    } else {
      alert("Please Enter Correct Details");
    }
  };

  return (
    <Div>
      <Content>
        <h2 style={{textAlign:'center'}}>
          LOGIN
          </h2>
        <Div2>
          <Label for="emaillabel">Email :&nbsp;&nbsp;</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            aria-describedby="emailHelp"
          />
        </Div2>{" "}
        <Div2>
          <Label for="passwordlabel">Password :&nbsp;&nbsp;</Label>
          <Input
            type="password"
            id="password"
            aria-describedby="emailHelp"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </Div2>
        <Button type="submit" onClick={handleLogin}>SignUp</Button>
      </Content>
    </Div>
  );
}

export default Login;
const Div = styled.div`
  display: flex;

  margin: 60px;
  justify-content: center;
`;
const Content = styled.div`
  border: 3px solid  #000;
  position: absolute;
  color:  #000;
  width: 400px;
  border-radius: 10px;
  justify-content:center;
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;

const Label = styled.label`
  font-size: 15px;
`;
const Input = styled.input`
  height: 30px;
  border-radius: 5px;
  margin: 10px;
  border: 1px solid #090b13;
  color: #000;
  font-size: 18px;
  text-align: center;
`;

const Button = styled.div`
  border: 2px solid #000;
  width: 100px;
  height: 40px;
  margin: 20px;
  border-radius: 5px;
  font-size: 17px;
  color: #000;
  cursor:pointer;
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
`;
