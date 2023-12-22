import {Button, Form, Input, message, Modal} from "antd";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import homeSVG from "../assets/home.svg";
import logo from "../assets/logo.png";
import {getAuth} from "../firebase";

const initialState = {
  loading: false,
  registerLoading: false,
  isOpen: false,
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const auth = getAuth;

  const onFinish = (values) => {
    setState((prev) => ({...prev, registerLoading: true}));
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        form.resetFields();
        setState((prev) => ({...prev, registerLoading: false, isOpen: false}));
      })
      .catch((error) => {
        const errorMessage = error.message;
        message.error(errorMessage);
        setState((prev) => ({...prev, registerLoading: false}));
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    setState((prev) => ({...prev, isOpen: false}));
  };

  const onFinishLogin = (values) => {
    setState((prev) => ({...prev, loading: true}));
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setState((prev) => ({...prev, loading: false}));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        const errorMessage = error.message;
        message.error(errorMessage);
        setState((prev) => ({...prev, loading: false}));
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="hidden sm:block">
            <img src={homeSVG} className="w-full" alt="Phone image" />
          </div>
          <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-16 w-auto"
                src={logo}
                alt="Your Company"
              />

              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form
                name="basic"
                layout="vertical"
                onFinish={onFinishLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input style={{height: "40px"}} />
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
                  <Input.Password style={{height: "40px"}} />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={state.loading}
                  className="w-full mt-12"
                >
                  Login
                </Button>
              </Form>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <span
                onClick={() => setState((prev) => ({...prev, isOpen: true}))}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Register Here
              </span>
            </p>
          </div>
        </div>
      </div>

      <Modal
        title="Register Modal"
        open={state.isOpen}
        okButtonProps={{style: {display: "none"}}}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register Account
        </h2>
        <Form
          name="register"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input style={{height: "40px"}} />
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
            <Input.Password style={{height: "40px"}} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={state.registerLoading}
            className="w-full my-12"
          >
            Register
          </Button>
        </Form>
        <hr />
      </Modal>
    </>
  );
};

export default Login;
