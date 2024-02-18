import React from "react";
import styled from "@emotion/styled";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, Icon, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import { setHeaderTitle } from "../../store/headerSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
`;

const StyledSidebar = styled.div`
  background-color: #232538;
  color: white;
  height: 30rem;
  position: fixed;
  align-items: center;
  display: flex;
  flex-direction: column;
  top: 20%;
  left: ${({ isOpen }) => (isOpen ? "0" : "-13.5rem")};
  width: 225px;
  transition: all 0.3s ease-in-out;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 5;
  box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.3);
`;

const BurgerButton = styled.button`
  width: 95%;
  background-color: transparent;
  border: none;
  top: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  top: 11rem;
  cursor: pointer;
  background-color: #bcac1f;
  width: 1.5rem;
  height: 8rem;
  left: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 4;
`;

const MenuButton = styled.button`
  background-color: #4a5572;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 11.6rem;
  height: 3rem;
  border-radius: 14px;
  cursor: pointer;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  &:hover {
    background-color: #3a3e5e;
  }

  & > .MuiSvgIcon-root {
    margin-right: 3rem;
  }

  &:active {
    background-color: #62689e;
    border-radius: 14px;
  }
`;

const BottomCard = styled.div`
  background-color: #bcac1f;
  height: 3rem;
  width: 11.6rem;
  display: flex;
  color: #232538;
  justify-content: space-around;
  align-items: center;
  border-radius: 14px;
  position: absolute;
  font-weight: bold;
  bottom: 20px;
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.login.user);
  const handleClick = (title, route) => {
    dispatch(setHeaderTitle(title.toUpperCase()));
    navigate(route);
  };
  return (
    <>
      <Container>
        <StyledSidebar isOpen={isOpen}>
          <ButtonWrapper isOpen={isOpen} onClick={toggleSidebar}>
            <BurgerButton>
              <ArrowForwardIosRoundedIcon color="#fff" size={20} />
            </BurgerButton>
          </ButtonWrapper>
          <MenuButton
            style={{
              marginTop: "1.5rem",
            }}
            onClick={() => handleClick("Home", "/home")}
          >
            <HomeIcon />
            Home
          </MenuButton>
          <div
            style={{
              marginTop: "1.5rem",
              marginLeft: "0px",
              fontWeight: "bold",
            }}
          >
            Ventas
          </div>
          <MenuButton
            onClick={() => handleClick("VENTAS TOTALES", "/total-sales")}
          >
            <BarChartIcon />
            Total
          </MenuButton>
          <MenuButton
            onClick={() => handleClick("VENTAS POR PRODUCTO", "/product-sales")}
          >
            <DonutSmallIcon />
            Productos
          </MenuButton>
          <MenuButton
            onClick={() => handleClick("VENTAS POR ESTACION", "/station-sales")}
          >
            <StackedLineChartIcon />
            <Box>Estacion</Box>
          </MenuButton>
          <BottomCard>
            <Icon>
              <AccountCircleRoundedIcon />
            </Icon>
            {userInfo.username}
          </BottomCard>
        </StyledSidebar>
      </Container>
    </>
  );
};

export default Sidebar;
