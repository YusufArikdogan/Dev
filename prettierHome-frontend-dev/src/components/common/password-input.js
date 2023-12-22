import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import "./password-input.scss";


const PasswordInput = (props) => {
  const [type, setType] = useState("password");

  const handleType = () => {
    const newType = type === "password" ? "text" : "password";
    setType(newType);
  };

  return (
    <InputGroup className="mb-3">
       <InputGroup.Text id="basic-addon1" 
          style={{borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px"}}><FaLock /></InputGroup.Text>

      <Form.Control
        type={type}
        placeholder={props.placeholderText || "Enter password"}
        aria-label="Enter password"
        aria-describedby="basic-addon1"
        {...props}
      />
      <InputGroup.Text id="basic-addon1" className="password-icon" onClick={handleType}>
        {type === "password" ? <BsEyeSlashFill/> :  <BsEyeFill /> }
      </InputGroup.Text>

      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
