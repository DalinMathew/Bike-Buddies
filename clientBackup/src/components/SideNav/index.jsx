import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { VscFeedback } from "react-icons/vsc";
import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CrownOutlined,
  HddOutlined,
  UnorderedListOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { MdManageAccounts } from "react-icons/md";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaRegAddressBook } from "react-icons/fa6";
import { RiArticleLine } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'

import Logo from '../Logo'

const SideNav = (props) => {
  const user = useSelector((state) => state?.auth?.user);
  // console.log(user.role)

  const { collapsed, onCollapse } = props
  const { Sider } = Layout
  // console.log(user)
  let roles = ''
  if(user && user.role){
    roles = user.role;
  }
  else{
    roles =''
  }

  let currentPath = useLocation().pathname

  // dummy fix for side nav highlight
  if (currentPath.includes('/app/course/'))
    currentPath = currentPath.replace('/app/course/', '/app/courses/')

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        // onClick={() => (window.location = 'https://gp-eduhub.github.io/')}
      >
        <Logo collapsed={collapsed} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        activeKey={currentPath}
        selectedKeys={currentPath}
      >
        {roles == "rider" ? (
          <>
            <Menu.Item key="/app/rider" icon={<DashboardOutlined />}>
              <NavLink to="/app/rider">Home</NavLink>
            </Menu.Item>

            <Menu.Item key="/app/profile" icon={<UserOutlined />}>
              <NavLink to="/app/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="/app/addbike" icon={<PlusSquareOutlined />}>
              <NavLink to="/app/addbike">Add bike</NavLink>
            </Menu.Item>
            <Menu.Item key="/app/tripmanage" icon={<MdManageAccounts />}>
              <NavLink to="/app/tripmanage">Manage Trip</NavLink>
            </Menu.Item>
            <Menu.Item key="/app/viewfeedback" icon={<VscFeedback />}>
              <NavLink to="/app/viewfeedback">View Customer Feedback</NavLink>
            </Menu.Item>
          </>
        ) : (
          <></>
        )}
        {roles == "customer" ? (
          <>
            <Menu.Item key="/app/customer" icon={<DashboardOutlined />}>
              <NavLink to="/app/customer">Home</NavLink>
            </Menu.Item>

            <Menu.Item key="/app/profile" icon={<UserOutlined />}>
              <NavLink to="/app/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="/app/bookings" icon={<FaRegAddressBook />}>
              <NavLink to="/app/bookings">My Bookings</NavLink>
            </Menu.Item>
          </>
        ) : (
          <></>
        )}
        {roles == "admin" ? (
          <>
            <Menu.Item key="/app/userlist" icon={<HddOutlined />}>
              <NavLink to="/app/userlist">Users </NavLink>
            </Menu.Item>

            <Menu.Item key="/app/riderlist" icon={<RiArticleLine />}>
              <NavLink to="/app/riderlist">Riders </NavLink>
            </Menu.Item>

            <Menu.Item key="/app/profile" icon={<UserOutlined />}>
              <NavLink to="/app/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="/app/allbikes" icon={<UnorderedListOutlined />}>
              <NavLink to="/app/allbikes">Bikes</NavLink>
            </Menu.Item>
            <Menu.Item key="/app/dashboard" icon={<GiFullMotorcycleHelmet />}>
              <NavLink to="/app/dashboard">Bookings</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="/app/addbike" icon={<UserOutlined />}>
          <NavLink to="/app/addbike">Add bike</NavLink>
        </Menu.Item> */}
            <Menu.Item key="/app/viewfeedback" icon={<VscFeedback />}>
              <NavLink to="/app/viewfeedback">View Customer Feedback</NavLink>
            </Menu.Item>
          </>
        ) : (
          <> </>
        )}
      </Menu>
    </Sider>
  );
}

export default SideNav
