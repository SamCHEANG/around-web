import { Button, Form, message, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { config } from "../constants.js";
import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const { handleLoggedIn } = props;

  const [loading, setLoading] = useState(false);
  const onFinish = async (data) => {
    const { username, password } = data;
    const opts = {
      method: "POST",
      url: `${config.BASE_URL}/signin`,
      data: { username, password },
      headers: { "Content-Type": "application/json" },
    };

    try {
      setLoading(true);
      const res = await axios(opts);
      if (res.status === 200) {
        const { data } = res;
        handleLoggedIn(data);
        message.success("Login succeed");
      }
    } catch (error) {
      console.log(`Login failed: ${error.message}`);
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
