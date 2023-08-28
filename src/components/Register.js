import { Form, Input, Button, message } from "antd";
import axios from "axios";

import { config } from "../constants";
import { useState } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const { username, password } = values;
    const opt = {
      method: "POST",
      url: `${config.BASE_URL}/signup`,
      data: {
        username: username,
        password: password,
      },
      headers: { "content-type": "application/json" },
    };

    try {
      setLoading(true);
      const res = await axios(opt);
      if (res.status === 200) {
        message.success("Registration succeed!");
        props.history.push("/login");
      }
    } catch (error) {
      console.log(`Registration Failed: ${error.message}`);
      message.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      className="register"
    >
      <Form.Item
        name="username"
        label="Username"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className="register-btn"
          loading={loading}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
