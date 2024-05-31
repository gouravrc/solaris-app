import React, { useEffect, useState, useCallback } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./index.css";
import { FaHome, FaUser, FaScrewdriver, FaPowerOff } from "react-icons/fa";
import AddNewLoan from "./AddNewLoan";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
  updateLocalStorage,
} from "../utils";
import LoanCard from "./LoanCard";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { useHistory } from "react-router-dom";
import {
  applicationGetService,
  getApplicationOfficerService,
  setApplicationStatusService,
} from "../utils/service";
import { Puff } from "react-loader-spinner";

const columns = [
  { key: "id", name: "Application ID" },
  { key: "name", name: "Applicant Name" },
  { key: "username", name: "Customer Account" },
  { key: "type", name: "Type" },
  { key: "bank", name: "Bank" },
  { key: "location", name: "Location" },
  { key: "loanamt", name: "Loan Amount" },
  { key: "status", name: "Status" },
  { key: "action", name: "Action" },
];
const DashboarScreen = () => {
  const history = useHistory();
  const [newLoan, setNewLoan] = useState<boolean>(false);
  const [newLoanModal, setNewLoanModal] = useState<boolean>(false);
  const [draft, setDraft] = useState<any>();
  const [data, setData] = useState<any>();
  const [rawdata, setRawData] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [draftdata, setDraftData] = useState<any>();
  const [isSubmitted, setIsSubmitted] = useState<any>();
  const [isLoanOfficer, setIsLoanOfficer] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [officerPreviewModal, setOfficerPreviewModal] =
    useState<boolean>(false);
  const [officerPreviewModalData, setOfficerPreviewModalData] = useState<any>();
  const [invaluation, setInvaluation] = useState<any>();
  const [rejected, setRejected] = useState<any>();
  const [evaluationcompleted, setEvaluateCompleted] = useState<any>();
  const [submitted, setSubmitted] = useState<any>();
  const [filter, setFilter] = useState<any>("All");

  const fetchLoanUserLoanApplication = useCallback(
    () => callLoanApplicationService(),
    [userData]
  );
  const fetchLoanUserLoanApplicationOfficer = useCallback(
    () => callLoanOfficerApplicationService(),
    [userData]
  );
  const handleForceupdateMethod = useForceUpdate();
  function useForceUpdate() {
    let [value, setState] = useState(true);
    return () => setState(!value);
  }
  function callLoanApplicationService() {
    setLoad(true);
    if (userData) {
      const obj = {
        userId: userData.id,
      };
      applicationGetService(obj, (res: any) => {
        if (res.status === 200) {
          let response = res.data.data
          response.sort(function(a:any, b:any){return b.createdDate - a.createdDate});
          setData(response);
          setRawData(response);
          setLoad(false);
        } else {
          alert("Error Occured");
          setLoad(false);
        }
      });
    }
  }
  function viewApplication(element: any) {
    const obj = {
      id: element.id,
      userId: element.userId,
      status: "IN EVALUATION",
    };
    setApplicationStatusService(obj, (res: any) => {
      console.log();
    });
  }
  function callLoanOfficerApplicationService() {
    setLoad(true);
    if (userData) {
      const obj = {
        id: null,
        userId: null,
        allApplication: true,
      };

      let invaluationArr: any = [];
      let rejectedArr: any = [];
      let evaluationcompletedArr: any = [];
      let submittedArr: any = [];

      getApplicationOfficerService(obj, (res: any) => {
        let response = res;
        console.log(res);
        if (response.status === 200) {
          let res: any = [];
          let newResData: any = [];
          res = response.data.data;

          res.forEach((element: any, index:any) => {
            newResData.push({
              ...element,
              loanamt:<label>Rs {element.loanamt.toLocaleString("en-IN")}</label>,
              status:
                element.status === "Submitted" ? (
                  <label className="new-status">NEW</label>
                ) : (
                  <label
                    className={
                      element.status == "REJECTED"
                        ? "evaluate-status-error"
                        : element.status == "EVALUATION COMPLETED"
                        ? "evaluate-status-success"
                        : element.status == "SANCTIONED"
                        ? "evaluate-status-sanctioned"
                        : "evaluate-status"
                    }
                  >
                    {element.status}
                  </label>
                ),
              action: (
                <label
                  onClick={() => {
                    setOfficerPreviewModal(true);
                    setOfficerPreviewModalData(element);
                    if (element.status === "Submitted") {
                      viewApplication(element);
                    }
                  }}
                  className="action-button"
                >
                  Open Application
                </label>
              ),
            });
            if (element.status === "REJECTED") {
              rejectedArr.push({ ...element });
            }
            if (element.status === "IN EVALUATION") {
              invaluationArr.push({ ...element });
            }
            if (element.status === "EVALUATION COMPLETED") {
              evaluationcompletedArr.push({ ...element });
            }
            if (element.status === "Submitted") {
              submittedArr.push({ ...element });
            }
          });
          newResData.sort(function(a:any, b:any){return b.createdDate - a.createdDate});
          setData(newResData);
          setRawData(newResData);
          setLoad(false);
          setInvaluation(invaluationArr);
          setRejected(rejectedArr);
          setEvaluateCompleted(evaluationcompletedArr);
          setSubmitted(submittedArr);
        } else {
          alert("Error Occured");
          setLoad(false);
        }
      });
    }
  }
  useEffect(() => {
    let res: any = getLocalStorage("draft");
    if (res && res.length > 0) {
      setDraft(JSON.parse(res));
      setData(JSON.parse(res));
    }
  }, [getLocalStorage("draft")]);
  useEffect(() => {
    let res: any = getLocalStorage("user");
    let pData = JSON.parse(res);
    console.log("isLoanOfficer", pData);

    if (pData.role === "customer") {
      setIsLoanOfficer(false);
      setUserData(pData);
    } else {
      setIsLoanOfficer(true);
      setUserData(pData);
    }
  }, []);
  useEffect(() => {
    if (userData && userData.role === "customer") {
      fetchLoanUserLoanApplication();
    } else {
      fetchLoanUserLoanApplicationOfficer();
    }
  }, [userData]);

  function onSubmitCall() {
    setLoad(true);
    setTimeout(() => {
      const obj = {
        userId: userData.id,
      };

      applicationGetService(obj, (res: any) => {
        if (res.status === 200) {
          let response = res.data.data
          response.sort(function(a:any, b:any){return b.createdDate - a.createdDate});
          setData(response);
          setRawData(response);
          setLoad(false);
          handleForceupdateMethod();
        } else {
          alert("Error Occured");
          setLoad(false);
        }
      });
    }, 1000);
  }
  function clickFilter(type: any) {
    console.log(type);
    let getData = rawdata;
    let filteredArr: any[] = [];
    getData.forEach((element: any) => {
      if (type === "Submitted" && element.status.props.children === "Submitted") {
        filteredArr.push({ ...element });
      }
      if (
        type === "In-Evaluation" &&
        element.status.props.children === "IN EVALUATION"
      ) {
        filteredArr.push({ ...element });
      }
      if (
        type === "Completed" &&
        element.status.props.children === "EVALUATION COMPLETED"
      ) {
        filteredArr.push({ ...element });
      }
      if (
        type === "Sanctioned" &&
        element.status.props.children === "SANCTIONED"
      ) {
        filteredArr.push({ ...element });
      }
      if (type === "Rejected" && element.status.props.children === "REJECTED") {
        filteredArr.push({ ...element });
      }
      if (type === "All") {
        filteredArr.push({ ...element });
      }
    });
    setData(filteredArr);
  }
  return (
    <div className="container">
      <Sidebar>
        <div className="sidebar-ui">
          <label>
            <label className="logo-title">SOLARIS</label>
            <label className="logo-title-minor">v1.0</label>
          </label>
          <label style={{ color: "white" }} className="logo-title-green-minor">
            UnisysHackHive
          </label>

          <div className="sidebar-div">
            <div className="sidebar-div-menu">
              <FaHome
                style={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  marginRight: "10px",
                }}
              />
              <label className="menu-txt">Home</label>
            </div>
            <div className="sidebar-div-menu">
              <FaUser
                style={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  marginRight: "10px",
                }}
              />
              <label className="menu-txt">Profile</label>
            </div>
          </div>
          <div className="sidebar-div-menu">
            <FaScrewdriver
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginRight: "10px",
              }}
            />
            <label className="menu-txt">Settings</label>
          </div>
          <div
            onClick={() => {
              clearLocalStorage();
              history.push("/");
            }}
            className="sidebar-div-menu"
          >
            <FaPowerOff
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginRight: "10px",
              }}
            />
            <label className="menu-txt">Logout</label>
          </div>
        </div>
      </Sidebar>
      {!load ? (
        <div className="main-screen">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <label style={{ color: "#797E78" }} className="logo-title-green">
              {`Welcome ${userData && userData.username}`}
            </label>
            {!isLoanOfficer && data && data.length > 0 && (
              <div
                style={{ marginTop: "1%" }}
                onClick={() => {
                  setNewLoan(true);
                  setNewLoanModal(true);
                }}
                className="add-application-btn"
              >
                <label
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {"Apply New Loan"}
                </label>
              </div>
            )}
          </div>

          {!isLoanOfficer ? (
            <label
              style={{ color: "#575C56" }}
              className="logo-title-green-minor"
            >
              Customer ID:{" "}
              <label style={{ fontWeight: "bold" }}>{`${
                userData && userData.id
              }`}</label>
            </label>
          ) : (
            <label
              style={{ color: "#575C56" }}
              className="logo-title-green-minor"
            >
              {`Emp ID: ${userData && userData.id}`}
            </label>
          )}
          {!isLoanOfficer && data && data.length > 0 && (
            <div className="draft-div">
              <label style={{ color: "#B6BFB4" }} className="draft-div-title">
                Submitted
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {data &&
                  data.length > 0 &&
                  data.map((item: any, index: any) => (
                    <LoanCard
                      item={item}
                      key={index}
                      onEdit={() => {
                        setDraftData(item);
                        setNewLoanModal(true);
                      }}
                      submitted
                      onPreview={() => {
                        setDraftData(item);
                        setNewLoanModal(true);
                        setIsSubmitted(true);
                      }}
                    />
                  ))}
              </div>
            </div>
          )}
          {!isLoanOfficer && draft && draft.length > 0 && (
            <div
              style={data && data.length > 0 ? { marginTop: "5%" } : {}}
              className="draft-div"
            >
              <label style={{ color: "#B6BFB4" }} className="draft-div-title">
                In Draft
              </label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {draft &&
                  draft.length > 0 &&
                  draft.map((item: any, index: any) => (
                    <LoanCard
                      item={item}
                      key={index}
                      onEdit={() => {
                        setDraftData(item);
                        setNewLoanModal(true);
                        setIsSubmitted(false);
                      }}
                      draft
                    />
                  ))}
              </div>
            </div>
          )}
          {isLoanOfficer && rawdata && rawdata.length > 0 && (
            <div>
              <div className="info-div">
                {submitted && submitted.length > 0 && (
                  <div className="info-div-sec">
                    <label className="new-count-txt">
                      {submitted && submitted.length}
                    </label>
                    <label className="new-count-txt-minor">
                      New Applications
                    </label>
                  </div>
                )}
                {invaluation && invaluation.length > 0 && (
                  <div className="info-div-sec-evaluation">
                    <label className="evaluation-count-txt">
                      {invaluation && invaluation.length}
                    </label>
                    <label className="evaluation-count-txt-minor">
                      In Evaluation
                    </label>
                  </div>
                )}
                {evaluationcompleted && evaluationcompleted.length > 0 && (
                  <div className="info-div-sec-success">
                    <label className="success-count-txt">
                      {evaluationcompleted && evaluationcompleted.length}
                    </label>
                    <label className="success-count-txt-minor">
                      Evaluation Done
                    </label>
                  </div>
                )}
                {rejected && rejected.length > 0 && (
                  <div className="info-div-sec-reject">
                    <label className="reject-count-txt">
                      {rejected && rejected.length}
                    </label>
                    <label className="reject-count-txt-minor">Rejected</label>
                  </div>
                )}
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "1%",
                  }}
                >
                  <label
                    onClick={() => {
                      clickFilter("All");
                      setFilter("All");
                    }}
                    className={
                      filter == "All" ? "bread-crumbs-bold" : "bread-crumbs"
                    }
                  >
                    {"All"}
                  </label>
                  <label className="bread-crumbs-bold">{"|"}</label>
                  <label
                    onClick={() => {
                      clickFilter("Submitted");
                      setFilter("Submitted");
                    }}
                    className={
                      filter == "Submitted" ? "bread-crumbs-bold" : "bread-crumbs"
                    }
                  >
                    {"New"}
                  </label>
                  <label className="bread-crumbs-bold">{"|"}</label>
                  <label
                    onClick={() => {
                      clickFilter("In-Evaluation");
                      setFilter("In-Evaluation");
                    }}
                    className={
                      filter == "In-Evaluation"
                        ? "bread-crumbs-bold"
                        : "bread-crumbs"
                    }
                  >
                    {"In-Evaluation"}
                  </label>
                  <label className="bread-crumbs-bold">{"|"}</label>
                  <label
                    onClick={() => {
                      clickFilter("Completed");
                      setFilter("Completed");
                    }}
                    className={
                      filter == "Completed"
                        ? "bread-crumbs-bold"
                        : "bread-crumbs"
                    }
                  >
                    {"Evaluation Completed"}
                  </label>
                  <label className="bread-crumbs-bold">{"|"}</label>
                  <label
                    onClick={() => {
                      clickFilter("Sanctioned");
                      setFilter("Sanctioned");
                    }}
                    className={
                      filter == "Sanctioned"
                        ? "bread-crumbs-bold"
                        : "bread-crumbs"
                    }
                  >
                    {"Sanctioned"}
                  </label>
                  <label className="bread-crumbs-bold">{"|"}</label>
                  <label
                    onClick={() => {
                      clickFilter("Rejected");
                      setFilter("Rejected");
                    }}
                    className={
                      filter == "Rejected"
                        ? "bread-crumbs-bold"
                        : "bread-crumbs"
                    }
                  >
                    {"Rejected"}
                  </label>
                </div>
              </div>
              {data && data.length > 0 ? (
                <DataGrid
                  style={{
                    backgroundColor: "#fff",
                    outline: "none",
                    height: "80%",
                    width: "80vw",
                    border: "1px solid #fff",
                    marginLeft: "0%",
                    marginTop: "1%",
                  }}
                  className="grid"
                  columns={columns}
                  rows={data}
                  rowHeight={50}
                />
              ) : (
                <div style={{ marginTop: "2%" }}>
                  <label
                    style={{
                      marginTop: "2%",
                      fontSize: "1.5rem",
                      color: "grey",
                      fontWeight: "bold",
                      fontFamily: "Teachers",
                    }}
                  >
                    No Records Found
                  </label>
                </div>
              )}
            </div>
          )}

          <div className="application-div">
            {!isLoanOfficer && !draft && data && data.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    color: "#427E3B",
                    fontWeight: "bold",
                  }}
                >
                  {"No Loan Application(s) Found"}
                </label>
                <div
                  onClick={() => setNewLoanModal(true)}
                  className="add-application-btn"
                >
                  <label
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {"Apply New Loan"}
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
          }}
        >
          <Puff
            visible={true}
            height="100"
            width="100"
            color="#427e3b"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {newLoanModal && (
        <AddNewLoan
          onDraft={(e: any) => {
            setNewLoanModal(false);
            setLocalStorage("draft", e);
            setDraftData(undefined);
            setIsSubmitted(undefined);
            setNewLoan(false);
          }}
          onClose={() => {
            setDraftData(undefined);
            setNewLoanModal(false);
            setIsSubmitted(undefined);
            setNewLoan(false);
          }}
          data={draftdata}
          onDelete={(id: any) => {
            setNewLoanModal(false);
            updateLocalStorage("draft", id);
            setIsSubmitted(undefined);
            setNewLoan(false);
          }}
          submitted={isSubmitted}
          onSubmitSuccessfully={() => onSubmitCall()}
          onDeleteDraftCopy={(e: any) => updateLocalStorage("draft", e)}
          newLoanModal={newLoan}
        />
      )}
      {officerPreviewModal && (
        <AddNewLoan
          onClose={() => {
            setOfficerPreviewModal(false);
            setOfficerPreviewModalData(undefined);
            fetchLoanUserLoanApplicationOfficer();
          }}
          data={officerPreviewModalData}
          submitted={true}
          isLoanOfficer
        />
      )}
    </div>
  );
};

export default DashboarScreen;
