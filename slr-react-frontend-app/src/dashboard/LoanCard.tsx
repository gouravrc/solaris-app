import React from "react";
import { FaUserEdit, FaIdCard } from "react-icons/fa";

const LoanCard = ({ item, key, onEdit, submitted, onPreview, draft }: any) => {
  return (
    <div key={key} className="draft-div-container">
      <div className="div-row">
        <label style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold" }} className="draft-headline">
            {item.bank}
          </label>
          {!submitted ? <></> : <label style={{ fontSize: "1.5rem" }} className="draft-headline">
            Application Id:{" "}
            <label style={{ fontWeight: "bold" }}>
              {`XXXX${item.id.toString().substring(9, 13)}`}
            </label>
          </label>}
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {submitted ? (
            <FaIdCard
              onClick={() => onPreview(item.id)}
              style={{ fontSize: "30px", color: "grey" }}
            />
          ) : (
            <FaUserEdit
              onClick={() => onEdit()}
              style={{ fontSize: "30px", color: "#427e3b" }}
            />
          )}
        </div>
      </div>
      <div className="div-row">
        <label className="draft-regular-txt">{"Loan Status"}</label>
        <label style={{ fontWeight: "bold" }} className="draft-regular-txt">
          {item.status}
        </label>
      </div>
      <div className="div-row">
        <label className="draft-regular-txt">{"Loan Applicant"}</label>
        <label style={{ fontWeight: "bold" }} className="draft-regular-txt">
          {item.name}
        </label>
      </div>
      <div className="div-row">
        <label className="draft-regular-txt">{"Created On"}</label>
        <label style={{ fontWeight: "bold" }} className="draft-regular-txt">
          {new Date(item.id).toLocaleDateString()}
        </label>
      </div>
      <div className="div-row">
        <label className="draft-regular-txt">{"Loan Amount"}</label>
        <label style={{ fontWeight: "bold" }} className="draft-regular-txt">
          Rs {parseInt(item.loanamt).toLocaleString("en-IN")}
        </label>
      </div>
      <div className="div-row">
        <label className="draft-regular-txt">{"PAN"}</label>
        <label style={{ fontWeight: "bold" }} className="draft-regular-txt">
          {item.pan}
        </label>
      </div>
      <div className="div-row">
        <label className="draft-regular-txt">{"Type"}</label>
        <label style={{ fontWeight: "bold" }} className="draft-regular-txt">
          {item.type.toUpperCase()}
        </label>
      </div>
    </div>
  );
};
export default LoanCard;
