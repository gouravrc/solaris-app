import React, { useEffect, useState } from "react";
import "./index.css";
import {
  FaUserCheck,
  FaHome,
  FaSun,
  FaWindowClose,
  FaRegWindowClose,
} from "react-icons/fa";
import { getLocalStorage } from "../utils";
import {
  applicationCreateService,
  evaluateApplicationService,
  setApplicationStatusService,
} from "../utils/service";
import { Puff } from "react-loader-spinner";

const AddNewLoan = (props: any) => {
  console.log(props);
  const [name, setName] = useState<any>();
  const [age, setAge] = useState<any>();
  const [pan, setPan] = useState<any>();
  const [cibil, setCibil] = useState<any>();
  const [rtr, setRtr] = useState<any>();
  const [collateral, setCollateral] = useState<any>();
  const [collateralAmount, setCollateralAmount] = useState<any>();
  const [coverage, setCoverage] = useState<any>();
  const [loanamt, setLoanAmt] = useState<any>();
  const [type, setType] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [roofsize, setRoofsize] = useState<any>();
  const [bank, setBank] = useState<any>();
  const [load, setLoad] = useState<boolean>();
  const [id, setId] = useState<any>();
  const [evaluateObj, setEvaluateObj] = useState<any>();
  const [evaluate, setEvaluate] = useState<boolean>();
  const [minusage, setMinusage] = useState<any>();
  const [result, setResult] = useState<any>();
  const [resultFailed, setResultFailed] = useState<any>();

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setAge(props.data.age);
      setPan(props.data.pan);
      setCibil(props.data.cibil);
      setRtr(props.data.rtr);
      setCollateral(props.data.collateral);
      setCollateralAmount(props.data.collateralAmount);
      setCoverage(props.data.coverage);
      setLoanAmt(props.data.loanamt);
      setType(props.data.type);
      setLocation(props.data.location);
      setRoofsize(props.data.roofsize);
      setBank(props.data.bank);
      setId(props.data.id);
      setMinusage(props.data.minusage);
    }
  }, [props]);
  console.log(props);

  function onSaveDraft(submit: boolean) {
    setLoad(true);
    const res: any = getLocalStorage("user");
    const pRes = JSON.parse(res);
    const obj = {
      name,
      age,
      pan,
      cibil,
      rtr,
      collateral,
      collateralAmount,
      coverage,
      loanamt,
      type,
      location,
      roofsize,
      bank,
      id: !id ? new Date().getTime().toString().substring(9) : id,
      createdDate: new Date().getTime(),
      username: pRes.username,
      userId: pRes.id,
      lat: "",
      lng: "",
      minusage: minusage,
    };

    if (submit) {
      applicationCreateService(obj, (res: any) => {
        console.log(res);
        if (res.status === 200) {
          setLoad(false);
          props.onSubmitSuccessfully();
          props.onClose();
          id && props.onDeleteDraftCopy(obj.id);
        } else {
          setLoad(false);
          props.onClose();
        }
      });
    } else {
      props.onDraft(obj);
    }
  }

  function evaluateApplication() {
    const obj = props.data;
    evaluateApplicationService(obj, (res: any) => {
      console.log(res);
      if (res.status == 200) {
        var response = res.data.data;
        if (typeof response === "number") {
          setEvaluateObj(true);
          setEvaluate(true);
          setResult(response);
        } else {
          setEvaluateObj(response);
          setEvaluate(true);
          setResultFailed(response);
        }
      }
    });
  }

  function chaneApplicationStatus(type:any) {
    const element: any = props.data;
    const obj = {
      id: element.id,
      userId: element.userId,
      status: type === "disburse" ? "SANCTIONED" : type === "cancel" ? "REJECTED" :
        evaluateObj && evaluateObj === true
          ? "EVALUATION COMPLETED"
          : "REJECTED",
    };
    setApplicationStatusService(obj, (res: any) => {
      console.log(res);
      props.onClose();
    });
  }

  return (
    <div className="modal-container">
      {!load ? (
        <div style={{ overflowY: "auto" }} className="modal-div">
          <center style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "grey" }} className="modal-heading-txt">
              {props.isLoanOfficer
                ? `Loan Application Id: ${id}`
                : "New Loan Application Form"}
            </label>
            {!props.submitted ? (
              <label
                style={{ color: "grey", fontSize: "20px", marginTop: "1%" }}
                className="modal-heading-txt"
              >
                Please fill all the required fields
              </label>
            ) : (
              <label
                style={{ color: "grey", fontSize: "20px" }}
                className="modal-heading-txt"
              >
                {/* {`Loan Application Id: ${id}`} */}
              </label>
            )}
            {evaluateObj && evaluateObj === true ? (
              <label
                style={{ color: "#72ABE3", fontSize: "30px", marginTop: "1%" }}
                className="modal-heading-txt"
              >
                {`Application Evaluation - SUCCESS`}
              </label>
            ) : evaluateObj && evaluateObj !== true ? (
              <label
                style={{ color: "grey", fontSize: "30px", marginTop: "1%" }}
                className="modal-heading-txt"
              >
                {`Application Evaluation -`}{" "}
                <label style={{ color: "red", fontSize: "30px" }}>FAILED</label>
              </label>
            ) : (
              <></>
            )}
          </center>
          {result && (
            <center style={{ marginTop: "2%" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "2%" }}>
                  <label
                    style={{
                      fontSize: "2rem",
                      color: "grey",
                      fontWeight: "bold",
                      fontFamily: "Teachers",
                    }}
                  >
                    Report
                  </label>
                </div>
                <div style={{ marginBottom: "1%" }}>
                  <label
                    style={{
                      fontSize: "1.5rem",
                      color: "#427e3b",
                      fontFamily: "Teachers",
                    }}
                  >
                    {`Status:`}{" "}
                    <label style={{ fontWeight: "bold" }}>
                      {result > 0.5 ? (
                        `SURPLUS`
                      ) : (
                        <label style={{ color: "orange" }}>DEFICIT</label>
                      )}
                    </label>
                  </label>
                </div>
                <div style={{ marginBottom: "1%" }}>
                  <label
                    style={{
                      fontSize: "1.5rem",
                      color: "blue",
                      fontFamily: "Teachers",
                    }}
                  >{`Power Output Expected: ${(result - 0.5).toFixed(
                    2
                  )}% ${result < 0.5 ? "LESS" : "PLUS"} (average monthly usage capacity)`}</label>
                </div>
              </div>
            </center>
          )}
          {resultFailed && (
            <center style={{ marginTop: "2%" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "2%" }}>
                  <label
                    style={{
                      fontSize: "2rem",
                      color: "grey",
                      fontWeight: "bold",
                      fontFamily: "Teachers",
                    }}
                  >
                    Report
                  </label>
                </div>
                <div style={{ marginBottom: "1%" }}>
                  <label
                    style={{
                      fontSize: "1.5rem",
                      color: "grey",
                      fontFamily: "Teachers",
                      fontWeight: "bold",
                    }}
                  >
                    {`Reason: `}{" "}
                    <label style={{ color: "red" }}>
                      MAJOR CRITERIA FAILED
                    </label>
                  </label>
                </div>
              </div>
            </center>
          )}

          <div style={{ marginTop: "0%" }}></div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <FaUserCheck
              style={{
                fontSize: "30px",
                marginTop: "2.5%",
                marginRight: "1%",
                color: "#74976C",
              }}
            />
            <label
              style={{ marginTop: "2%", fontWeight: "bold", color: "#74976C" }}
              className="modal-heading-txt"
            >
              KYC Details
            </label>
          </div>

          <div className="modal-section">
            <div className="modal-section-div">
              {name && <label className="placeholder-txt">Name</label>}
              <input
                onChange={(e: any) => setName(e.target.value)}
                placeholder="Name"
                className="input-div-modal"
                value={name}
                disabled={props.submitted}
              />
            </div>
            <div className="modal-section-div">
              {age && <label className="placeholder-txt">Age</label>}
              <input
                maxLength={2}
                type="number"
                placeholder="Age"
                className="input-div-modal"
                onChange={(e: any) => setAge(e.target.value)}
                value={age}
                disabled={props.submitted}
              />
            </div>
            <div className="modal-section-div">
              {pan && <label className="placeholder-txt">PAN</label>}
              <input
                placeholder="PAN"
                maxLength={10}
                className="input-div-modal"
                onChange={(e: any) => setPan(e.target.value)}
                value={pan}
                disabled={props.submitted}
              />
            </div>
            <div className="modal-section-div">
              {cibil && (
                <label
                  className={
                    evaluateObj && evaluateObj.cibil
                      ? "placeholder-txt-error"
                      : "placeholder-txt"
                  }
                >
                  {evaluateObj && evaluateObj.cibil
                    ? `CIBIL (FAILED )`
                    : `CIBIL`}
                </label>
              )}
              <input
                type="number"
                placeholder="Cibil"
                className={
                  evaluateObj && evaluateObj.cibil
                    ? "input-div-modal-error"
                    : "input-div-modal"
                }
                onChange={(e: any) => setCibil(e.target.value)}
                value={cibil}
                disabled={props.submitted}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <FaHome
              style={{
                fontSize: "30px",
                marginTop: "2.5%",
                marginRight: "1%",
                color: "#74976C",
              }}
            />
            <label
              style={{ marginTop: "2%", fontWeight: "bold", color: "#74976C" }}
              className="modal-heading-txt"
            >
              Property Details
            </label>
          </div>
          <div className="modal-section">
            <div className="modal-section-div">
              {rtr && (
                <label
                  className={
                    evaluateObj && evaluateObj.rtr
                      ? "placeholder-txt-error"
                      : "placeholder-txt"
                  }
                >
                  {evaluateObj && evaluateObj.rtr
                    ? `Roof Top Rights (FAILED )`
                    : `Roof Top Rights`}
                </label>
              )}
              <select
                onChange={(e: any) => setRtr(e.target.value)}
                className={
                  evaluateObj && evaluateObj.rtr
                    ? "input-div-modal-error"
                    : "input-div-modal"
                }
                name="cars"
                id="cars"
                value={rtr}
                disabled={props.submitted}
              >
                <option value="N/A">Roof Top Rights</option>
                <option value="Yes">Yes, I do have Rights</option>
                <option value="No">No, I dont have Rights</option>
              </select>
            </div>
            <div className="modal-section-div">
              {location && <label className="placeholder-txt">Location</label>}
              <input
                onChange={(e: any) => setLocation(e.target.value)}
                placeholder="Location"
                className="input-div-modal"
                value={location}
                disabled={props.submitted}
              />
            </div>
            <div className="modal-section-div">
              {roofsize && (
                <label className="placeholder-txt">
                  Roof Size (meter square)
                </label>
              )}
              <input
                placeholder="Roof Size (meter square)"
                className="input-div-modal"
                type="number"
                onChange={(e: any) => setRoofsize(e.target.value)}
                value={roofsize}
                disabled={props.submitted}
              />
            </div>

            <div className="modal-section-div">
              {collateral && (
                <label
                  className={
                    evaluateObj && evaluateObj.collateral
                      ? "placeholder-txt-error"
                      : "placeholder-txt"
                  }
                >
                  {evaluateObj && evaluateObj.collateral
                    ? `Collateral (FAILED )`
                    : `Collateral`}
                </label>
              )}
              <select
                onChange={(e: any) => setCollateral(e.target.value)}
                className={
                  evaluateObj && evaluateObj.collateral
                    ? "input-div-modal-error"
                    : "input-div-modal"
                }
                value={collateral}
                disabled={props.submitted}
              >
                <option value="N/A">Collateral</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="modal-section-div">
              {collateralAmount && (
                <label className="placeholder-txt">Collateral Amount</label>
              )}
              <input
                type="number"
                placeholder="Collateral Amount"
                className={"input-div-modal"}
                onChange={(e: any) => setCollateralAmount(e.target.value)}
                value={collateralAmount}
                disabled={props.submitted}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FaSun
              style={{
                fontSize: "30px",
                marginTop: "2.5%",
                marginRight: "1%",
                color: "#74976C",
              }}
            />
            <label
              style={{ marginTop: "2%", fontWeight: "bold", color: "#74976C" }}
              className="modal-heading-txt"
            >
              Solar Panel & Bank Details
            </label>
          </div>
          <div className="modal-section">
            <div className="modal-section-div">
              {coverage && (
                <label className="placeholder-txt">
                  Panel Coverage Area (meter square)
                </label>
              )}
              <input
                placeholder="Panel Coverage Area (meter square)"
                className="input-div-modal"
                onChange={(e: any) => setCoverage(e.target.value)}
                value={coverage}
                disabled={props.submitted}
              />
            </div>
            <div className="modal-section-div">
              {type && <label className="placeholder-txt">Type</label>}
              <select
                onChange={(e: any) => setType(e.target.value)}
                className="input-div-modal"
                name="cars"
                id="cars"
                value={type}
                disabled={props.submitted}
              >
                <option value="N/A">Type</option>
                <option value="commercial">Commercial Usage</option>
                <option value="domestic">Domestic Usage</option>
              </select>
            </div>
            <div className="modal-section-div">
              {loanamt && (
                <label className="placeholder-txt">Loan Amount</label>
              )}
              <input
                type="number"
                placeholder="Loan Amount"
                className="input-div-modal"
                onChange={(e: any) => setLoanAmt(e.target.value)}
                value={loanamt}
                disabled={props.submitted}
              />
            </div>
            <div className="modal-section-div">
              {bank && (
                <label className="placeholder-txt">Financial Institution</label>
              )}
              <select
                onChange={(e: any) => setBank(e.target.value)}
                className="input-div-modal"
                name="cars"
                id="cars"
                value={bank}
                disabled={props.submitted}
              >
                <option value="N/A">Choose Bank</option>
                <option value="Bank A">Bank A (Nationalized Bank)</option>
                <option value="Bank B">Bank B (Privatized Bank)</option>
              </select>
            </div>
            <div className="modal-section-div">
              {minusage && (
                <label className="placeholder-txt">
                  {"Average Monthly Usage (KwH)"}
                </label>
              )}
              <input
                type="number"
                placeholder="Average Monthly Usage (KwH)"
                className="input-div-modal"
                onChange={(e: any) => setMinusage(e.target.value)}
                value={minusage}
                disabled={props.minusage}
              />
            </div>
          </div>

          <center
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "2%",
            }}
          >
            {!props.submitted && !props.newLoanModal ? (
              <div
                onClick={() => props.onDelete(props.data.id)}
                className="proceed-btn-outline-red"
              >
                <label className="proceed-btn-light-red">Delete</label>
              </div>
            ) : props.newLoanModal ? (
              <div
                onClick={() => onSaveDraft(false)}
                className="proceed-btn-outline"
              >
                <label className="proceed-btn-light">Save Draft</label>
              </div>
            ) : null}

            {props.data && !props.data.id && (
              <div
                onClick={() => onSaveDraft(false)}
                className="proceed-btn-outline"
              >
                <label className="proceed-btn-light">Save Draft</label>
              </div>
            )}
            {!props.submitted && (
              <div onClick={() => onSaveDraft(true)} className="proceed-btn">
                <label className="proceed-btn-dark">Submit Application</label>
              </div>
            )}
            {result  && (
              <div
                onClick={() => chaneApplicationStatus("cancel")}
                className="proceed-btn-outline-red"
              >
                <label className="proceed-btn-light-red">Cancel & Reject</label>
              </div>
            )}
            {result &&
            <div
            onClick={() => chaneApplicationStatus("disburse")}
            className="proceed-btn"
          >
            <label className="proceed-btn-dark">
              {" "}
              Proceed For Disbursement
            </label>
          </div>
            
            }
            {props.isLoanOfficer &&
            props.data.status != "SANCTIONED" &&
              (props.data.status !== "REJECTED") &&
              
              !result &&
              (!evaluate ? (
                <div
                  onClick={() => evaluateApplication()}
                  className="proceed-btn"
                >
                  <label className="proceed-btn-dark">
                    Evaluate Application
                  </label>
                </div>
              ) : (
                <div
                  onClick={() => chaneApplicationStatus(undefined)}
                  className="proceed-btn"
                >
                  <label className="proceed-btn-dark">
                    {" "}
                    Update Application Status
                  </label>
                </div>
              ))}
          </center>
        </div>
      ) : (
        <Puff
          visible={true}
          height="100"
          width="100"
          color="#427e3b"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      <div
        onClick={() => {
          setEvaluateObj(undefined);
          setEvaluate(undefined);
          setResult(undefined);
          props.onClose();
        }}
        className="close-div"
      >
        <FaRegWindowClose
          style={{ fontSize: "30px", color: "#427e3b", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default AddNewLoan;
