import {Button, DatePicker, Form, Input, Modal, Spin, message} from "antd";
import dayjs from "dayjs";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db, getAuth} from "../firebase";

const initialState = {
  jobs: [],
  spinning: false,
  isOpen: false,
  loading: false,
};

const {TextArea} = Input;

const disabledDateForDob = (current) =>
  current && current > dayjs().endOf("day");
const disabledDateForDoj = (current) =>
  current && current < dayjs().endOf("day");
const ApplyForJob = () => {
  const [state, setState] = useState(initialState);
  const [form] = Form.useForm();

  const auth = getAuth;

  const addJobs = async () => {
    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        job_title: "Software Developer",
        image:
          "https://thelogocompany.net/wp-content/uploads/2023/05/tlc-icon.jpg",
        description: "Great Job",
        requiredSkills: ["React", "Tailwind", "Docker"],
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getJobs = async () => {
    setState((prev) => ({...prev, spinning: true}));
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()});
    });
    setState((prev) => ({...prev, jobs: data, spinning: false}));
  };

  useEffect(() => {
    getJobs();
  }, []);

  const closeModal = () => setState((prev) => ({...prev, isOpen: false}));

  const openJobAppication = (job_id) => {
    console.log(job_id);
    setState((prev) => ({...prev, isOpen: true}));
    form.setFieldsValue({
      job_id: `job-${job_id}`,
      email: auth.currentUser.email,
      user_id: auth.currentUser.uid,
    });
  };

  const applyForJob = async (values) => {
    const data = {
      ...values,
      dob: values.dob.format("YYYY-MM-DD"),
      doj: values.doj.format("YYYY-MM-DD"),
      job_id: values.job_id.split("-")[1],
    };
    console.log(data);
    setState((prev) => ({...prev, loading: true}));
    try {
      const docRef = await addDoc(collection(db, "jobApplied"), data);
      console.log("Document written with ID: ", docRef.id);
      setState((prev) => ({...prev, isOpen: false}));
      message.success("Job Application has been submitted successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setState((prev) => ({...prev, loading: false}));
  };

  return (
    <>
      <Spin spinning={state.spinning}>
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Apply for Job
          </h1>
          <div className="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-x-8 gap-y-8">
          {state.jobs.map((each, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl md:flex-row  hover:bg-gray-100"
            >
              <img
                className="object-cover w-48 rounded-t-lg h-48   md:rounded-none md:rounded-s-lg"
                src={each.image}
                alt={each.id}
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {each.job_title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 ">
                  {each.description}
                </p>
              </div>
              <div className="absolute bottom-5 right-5">
                <Button
                  type="primary"
                  onClick={() => openJobAppication(each.id)}
                >
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Spin>

      <Modal
        title="Job Application"
        centered
        width={800}
        open={state.isOpen}
        onCancel={closeModal}
        okButtonProps={{style: {display: "none"}}}
        cancelButtonProps={{style: {display: "none"}}}
      >
        <hr className="my-8" />
        <Form
          name="job_application"
          form={form}
          onFinish={applyForJob}
          layout="vertical"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Form.Item name="user_id" style={{display: "none"}}>
              <Input />
            </Form.Item>
            <Form.Item label="Job ID" name="job_id">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
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
              label="Dob"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please select your dob!",
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                className="w-full"
                disabledDate={disabledDateForDob}
              />
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
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Resume Link"
              name="resume"
              rules={[
                {
                  required: true,
                  message: "Please input your Resume link!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Expected Date of Joining"
              name="doj"
              rules={[
                {
                  required: true,
                  message: "Please select your Date of Joining!",
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                className="w-full"
                disabledDate={disabledDateForDoj}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Cover Letter"
            name="cover_letter"
            rules={[
              {
                required: true,
                message: "Please provide cover letter!",
              },
            ]}
          >
            <TextArea rows={4} count={{show: true, max: 100}} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={state.loading}
            disabled={state.loading}
            className="mt-5 w-full"
          >
            Apply
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ApplyForJob;
