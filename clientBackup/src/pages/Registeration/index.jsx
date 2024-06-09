import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Select } from 'antd'
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  MobileOutlined,
  NumberOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { register } from '../../reducers/authReducer'
import { useDispatch } from 'react-redux'
import { FormItemFlex, PageContainer, FormContainer, FormWrapper, FormTitle } from './style'
import { IoIosArrowBack } from "react-icons/io";
import './style.css'


const Registeration = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    try {
      dispatch(register(values))
      history.push('/login')
    } catch (e) {
      alert("User Already Exist")
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <FormWrapper>
          <Form
            name="register"
            onFinish={onFinish}
            initialValues={{ remember: false }}
            scrollToFirstError
          >
            <Link to="/">
              <h4 className="text-dark">
                <IoIosArrowBack />
              </h4>
            </Link>
            <FormTitle>Sign Up</FormTitle>
            <p>
              Have already Account ? <Link to="/login">Login</Link>
            </p>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please enter your Fullame" },
                { min: 3, message: "Minimum length for name is 3 characters" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Fullname" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your Username" },
                {
                  min: 3,
                  message: "Minimum length for username is 3 characters",
                },
              ]}
            >
              <Input prefix={<UserAddOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your E-mail!" },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
                {
                  max: 50,
                  message: "Email must be no more than 50 characters",
                },
                {
                  validator: (_, value) => {
                    if (value && value.includes("@example.com")) {
                      return Promise.reject(
                        "Email cannot contain @example.com"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-Mail" />
            </Form.Item>
            <Form.Item
              name="age"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "The input is not a valid integer!",
                },
                {
                  max: 120,
                  message: "Age must be less than 120!",
                  transform: (value) => Number(value), // Convert the input value to a number
                },
                { required: true, message: "Please input your Age!" },
              ]}
            >
              <Input prefix={<NumberOutlined />} placeholder="Age" />
            </Form.Item>
            <Form.Item name="gender">
              <Select
                prefix={<MailOutlined />}
                placeholder={
                  <span style={{ fontWeight: "bolder" }}>Gender</span>
                }
              >
                <Select.Option value="rider">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="role">
              <Select
                prefix={<UserOutlined />}
                placeholder={<span style={{ fontWeight: "bolder" }}>Role</span>}
              >
                <Select.Option value="rider">Rider</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^\d{10}$/, // Matches 10-digit numbers (adjust for your region)
                  message: "Please enter a valid 10-digit mobile number.", // Customize message
                },
              ]}
            >
              <Input prefix={<MobileOutlined />} placeholder="Mobile" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long.",
                },
                {
                  max: 12,
                  message: "Password must be at most 12 characters long.",
                },
                {
                  validator: (rule, value) => {
                    if (!/[a-z]/.test(value)) {
                      return Promise.reject(
                        "Password must contain at least one lowercase letter."
                      );
                    }
                    if (!/[A-Z]/.test(value)) {
                      return Promise.reject(
                        "Password must contain at least one uppercase letter."
                      );
                    }
                    if (!/\d/.test(value)) {
                      return Promise.reject(
                        "Password must contain at least one number."
                      );
                    }
                    if (!/[!.@#$%^&*()_+\-=\[\]{};':"/\\|,.<>? ]/.test(value)) {
                      return Promise.reject(
                        "Password must contain at least one special character."
                      );
                    }
                    return Promise.resolve(); // Success
                  },
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="passwordConfirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <FormItemFlex>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("Should accept Agreement"),
                  },
                ]}
              >
                <Checkbox>
                  I have read the <Link to="#">Agreement</Link>
                </Checkbox>
              </Form.Item>
            </FormItemFlex>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>
      </FormContainer>
    </PageContainer>
  );
}

export default Registeration
