import {Button, Form, Input, Tag, message} from "antd";
import {addDoc, collection} from "firebase/firestore";
import {useRef, useState} from "react";
import addJobSVG from "../assets/addJob.svg";
import {db} from "../firebase";

const {Search, TextArea} = Input;

const AddJobs = () => {
  const [keySkills, setKeySkills] = useState([]);
  const skillsInput = useRef(null);
  const [form] = Form.useForm();
  const addJobs = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "jobs"), {
        ...values,
        requiredSkills: keySkills,
      });
      console.log(docRef);
      form.resetFields();
      setKeySkills([]);
    } catch (e) {
      console.error("Error adding document: ", e);
      message.error("Error Occured!");
    }
  };

  const addKeySkills = () => {
    const skill = form.getFieldValue("requiredSkills");
    if (skill) {
      setKeySkills([...keySkills, skill]);
      form.resetFields(["requiredSkills"]);
      setTimeout(() => {
        skillsInput.current.focus({
          cursor: "start",
        });
      }, 1);
    }
  };

  const handleClose = (removedTag) =>
    setKeySkills(keySkills.filter((tag) => tag !== removedTag));

  return (
    <>
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          Add Jobs
        </h1>
        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex justify-center mt-24">
          <img
            src={addJobSVG}
            alt="addjobsvg"
            className="hidden   sm:block md:w-[80%]"
          />
        </div>
        <div className="flex justify-center mt-16">
          <Form
            name="addJob"
            form={form}
            layout="vertical"
            className="w-full"
            onFinish={addJobs}
          >
            <Form.Item
              label="Job Title"
              name="job_title"
              rules={[
                {
                  required: true,
                  message: "Please input job title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Job logo url"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input logo url!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Required Skills"
              name="requiredSkills"
              required
              rules={[
                {
                  required: keySkills.length === 0,
                  message: "Please input your Key Skill",
                },
              ]}
            >
              <div>
                <Search
                  placeholder={
                    keySkills.length ? "add more skills..." : "add skills"
                  }
                  ref={skillsInput}
                  onSearch={addKeySkills}
                  enterButton={
                    <Button type="primary" className="!px-5">
                      +
                    </Button>
                  }
                />
                <div className="mt-2">
                  {keySkills.map((each, index) => (
                    <span key={index} style={{display: "inline-block"}}>
                      <Tag
                        closable
                        onClose={(e) => {
                          e.preventDefault();
                          handleClose(each);
                        }}
                      >
                        {each}
                      </Tag>
                    </span>
                  ))}
                </div>
              </div>
            </Form.Item>
            <Form.Item
              label="Job Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input Job Description!",
                },
              ]}
            >
              <TextArea rows={4} count={{show: true, max: 100}} />
            </Form.Item>
            <div className="flex justify-center mt-8">
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddJobs;
