import {Button, Modal, Spin, message} from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db, getAuth} from "../firebase";

const initialState = {
  appliesJobs: [],
  isOpen: false,
  applicantDetails: {},
  spinning: false,
};

const auth = getAuth;

const AppliedJobs = () => {
  const [state, setState] = useState(initialState);
  const getData = async () => {
    setState((prev) => ({...prev, spinning: true}));
    const q = query(
      collection(db, "jobApplied"),
      where("user_id", "==", auth.currentUser?.uid)
    );
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach(async (doc) => {
      data.push({id: doc.id, ...doc.data()});
    });
    const finalData = [];
    for (const d of data) {
      const qu = await getDoc(doc(db, "jobs", d.job_id));
      finalData.push({...d, jobDetails: qu.data()});
    }
    setState((prev) => ({...prev, appliesJobs: finalData, spinning: false}));
  };

  const closeModal = () => setState((prev) => ({...prev, isOpen: false}));

  const openViewApplication = (data) => {
    console.log(data);
    setState((prev) => ({...prev, isOpen: true, applicantDetails: data}));
  };

  const withDrawApplication = async (id) => {
    setState((prev) => ({...prev, spinning: true}));
    await deleteDoc(doc(db, "jobApplied", id));
    setState((prev) => ({...prev, spinning: false}));
    message.success("Application Deleted Successfully");
    getData();
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Spin spinning={state.spinning}>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-2 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Applied Jobs
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>
            <div className="flex flex-wrap -m-4">
              {state.appliesJobs.map((each, index) => (
                <div className="xl:w-1/4 md:w-1/2 p-4" key={index}>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <img
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src={each.jobDetails.image}
                      alt="content"
                    />
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {each.jobDetails.job_title}
                    </h2>
                    <p className="leading-relaxed text-base">
                      {each.jobDetails.description}
                    </p>
                    <div className="mt-12">
                      <Button
                        type="primary"
                        className="w-full"
                        onClick={() => openViewApplication(each)}
                      >
                        View Application
                      </Button>
                      <br />
                      <Button
                        type="primary"
                        danger
                        className="mt-3 w-full"
                        onClick={() => withDrawApplication(each.id)}
                      >
                        Withdraw Application
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Spin>
      <Modal
        title="Application Details"
        centered
        open={state.isOpen}
        onOk={closeModal}
        onCancel={closeModal}
        cancelButtonProps={{style: {display: "none"}}}
      >
        <hr className="my-4" />
        <p className="text-xl">
          <span className="font-semibold">Name&nbsp;:</span>&nbsp;
          {state.applicantDetails.name}
        </p>
        <p className="text-xl">
          <span className="font-semibold">Email&nbsp;:</span>&nbsp;
          {state.applicantDetails.email}
        </p>
        <p className="text-xl">
          <span className="font-semibold">DOB&nbsp;:</span>&nbsp;
          {state.applicantDetails.dob}
        </p>
        <p className="text-xl">
          <span className="font-semibold">Expected Joining Date&nbsp;:</span>
          &nbsp;
          {state.applicantDetails.doj}
        </p>
        <p className="text-xl">
          <span className="font-semibold">Resume&nbsp;:</span>
          &nbsp;
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => window.open(state.applicantDetails.resume)}
          >
            Visit
          </span>
        </p>
      </Modal>
    </>
  );
};

export default AppliedJobs;
