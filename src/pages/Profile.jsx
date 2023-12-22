import {Button, Form, Input, Modal, message} from "antd";
import {updateProfile} from "firebase/auth";
import {useState} from "react";
import {getAuth} from "../firebase";

const initialState = {
  isOpen: false,
  loading: false,
};

const Profile = () => {
  const [state, setState] = useState(initialState);
  const [form] = Form.useForm();
  const auth = getAuth;

  const updateMyProfile = (values) => {
    console.log(values);
    setState((prev) => ({...prev, loading: true}));
    updateProfile(auth.currentUser, values)
      .then(() => {
        message.success("Profile Updated Successfully!");
        setState((prev) => ({...prev, loading: false, isOpen: false}));
      })
      .catch((error) => {
        message.error("Error Occured!");
        setState((prev) => ({...prev, loading: false}));
      });
  };

  const closeModal = () => setState((prev) => ({...prev, isOpen: false}));

  const openModal = () => {
    setState((prev) => ({...prev, isOpen: true}));
    form.setFieldsValue(auth.currentUser);
  };

  return (
    <>
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          Profile
        </h1>
        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    {auth.currentUser?.displayName}
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base">{auth.currentUser?.email}</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">
                  Meggings portland fingerstache lyft, post-ironic fixie man bun
                  banh mi umami everyday carry hexagon locavore direct trade art
                  party. Locavore small batch listicle gastropub farm-to-table
                  lumbersexual salvia messenger bag. Coloring book flannel
                  truffaut craft beer drinking vinegar sartorial, disrupt
                  fashion axe normcore meh butcher. Portland 90's scenester
                  vexillologist forage post-ironic asymmetrical, chartreuse
                  disrupt butcher paleo intelligentsia pabst before they sold
                  out four loko. 3 wolf moon brooklyn.
                </p>
                <span
                  className="text-indigo-500 inline-flex items-center cursor-pointer"
                  onClick={openModal}
                >
                  Update Profile
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        title="Job Application"
        centered
        open={state.isOpen}
        onCancel={closeModal}
        okButtonProps={{style: {display: "none"}}}
        cancelButtonProps={{style: {display: "none"}}}
      >
        <hr className="my-8" />
        <Form
          name="job_application"
          form={form}
          onFinish={updateMyProfile}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="displayName"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            <Input type="email" readOnly />
          </Form.Item>
          <Form.Item label="Profile Image Url" name="photoURL">
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={state.loading}
            disabled={state.loading}
            className="mt-5 w-full"
          >
            Update
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Profile;
