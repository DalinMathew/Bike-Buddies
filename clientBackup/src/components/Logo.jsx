import React from "react";
import styled, { css, keyframes } from "styled-components";
import img1 from "./Gemini_Generated_Image_etr4csetr4csetr4.jpg";
import img2 from "./hhhh.jpeg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const LogoContainer = styled.div`
  height: 28px;
  margin: 16px;
  animation: ${(props) => (props.collapsed ? fadeOut : fadeIn)} 0.3s ease-in-out;
  opacity: ${(props) => (props.collapsed ? 0 : 1)};
  display: ${(props) => (props.collapsed ? "none" : "block")};
`;

const LogoContainer2 = styled.div`
  height: 28px;
  margin: 16px 8px;
  animation: ${(props) => (props.collapsed ? fadeIn : fadeOut)} 0.3s ease-in-out;
  opacity: ${(props) => (props.collapsed ? 1 : 0)};
  display: ${(props) => (props.collapsed ? "block" : "none")};
`;

const Logo = ({ collapsed }) => {
  return (
    <>
      <LogoContainer collapsed={collapsed}>
        <img
          src={img2}
          alt="Logo 1"
          style={{ height: "100%", width: "auto" }}
        />
      </LogoContainer>
      <LogoContainer2 collapsed={collapsed}>
        <img
          src={img1}
          alt="Logo 2"
          style={{ height: "100%", width: "auto" }}
        />
      </LogoContainer2>
    </>
  );
};

export default Logo;
