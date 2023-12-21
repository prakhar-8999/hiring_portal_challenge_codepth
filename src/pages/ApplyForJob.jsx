import {ArrowRightOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../firebase";

const initialState = {
  jobs: [],
};

const ApplyForJob = () => {
  const [state, setState] = useState(initialState);

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
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const data = [];
    // const data = querySnapshot.map((each) => ({id: each.id,...each.data()}))
    // console.log(data);
    querySnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()});
      console.log({id: doc.id, ...doc.data()});
    });
    setState((prev) => ({...prev, jobs: data}));
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <div className="flex justify-start text-2xl font-bold">
        Apply For Job &nbsp;&nbsp; <ArrowRightOutlined />{" "}
        <button onClick={addJobs}>addJobs</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-12 gap-x-8 gap-y-8">
        {state.jobs.map((each) => (
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl md:flex-row  hover:bg-gray-100">
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
            <div className="!relative !right-0">
              <Button type="primary">Apply</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplyForJob;
