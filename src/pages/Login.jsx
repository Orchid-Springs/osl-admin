import { Button, Form, Input, message } from "antd";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", values);
      localStorage.setItem("user", JSON.stringify(data));
      if (data) navigate("/");
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
    setLoading(false);
  };

  const onFinishFailed = (error) => {
    message.error(error);
  };

  return (
    <div className="h-screen w-screen flex justify-items-center items-center max-w-[700px] mx-auto p-8">
      <div className="w-full">
        <div className="w-full bg-blue-700 p-3 flex justify-center items-center">
          <img src={logo} alt="" className="h-[50px] md:h-[100px]" />
        </div>
        <Form
          className="bg-[#FBF9F2] p-4 md:p-10"
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input className="p-4" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="p-4" />
          </Form.Item>

          <Form.Item className="w-full">
            <Button
              htmlType="submit"
              className="bg-[#FFA903] hover:bg-[#010D33] h-[40px] text-lg uppercase text-white"
              loading={loading}
              size="large"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
