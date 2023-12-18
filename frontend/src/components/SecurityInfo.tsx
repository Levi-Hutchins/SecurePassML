import React from "react";
import { SecurityInfoProps } from "./Types";
import { TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const SecurityInfo: React.FC<SecurityInfoProps> = ({
  inRockYou,
  inTenMill,
  isCheckLoading,
}) => {
  return (
    <div className="panel">
      <h2 className="heading">Security</h2>
      {isCheckLoading ? (
        <div className="spinner-container">
          <TailSpin color="#00BFFF" height={40} width={40} />
        </div>
      ) : (
        <div>
          {inRockYou ? (
            <div className="db-info">
              Password found within rockyou.txt
              <FontAwesomeIcon
                icon={faExclamationCircle}
                color="red"
                className="icon-result"
                style={{ fontSize: "1.2em" }}
              />
            </div>
          ) : (
            <div className="db-info">
              Password not found within rockyou.txt
              <FontAwesomeIcon
                icon={faCircleCheck}
                color="green"
                className="icon-result"
                style={{ fontSize: "1.2em" }}
              />
            </div>
          )}
          {inTenMill ? (
            <div className="db-info">
              Password found within 10-million-password.txt
              <FontAwesomeIcon
                icon={faExclamationCircle}
                color="red"
                className="icon-result"
                style={{ fontSize: "1.2em" }}
              />
            </div>
          ) : (
            <div className="db-info" style={{ paddingTop: "10px" }}>
              Password not found within 10-million-password.txt
              <FontAwesomeIcon
                icon={faCircleCheck}
                color="green"
                className="icon-result"
                style={{ fontSize: "1.2em" }}
              />
            </div>
          )}
          <br />
          <div className="db-info">
            Note: If your password is found within any of this files, your
            password is not secure.
            <br />
            <br />
            More Features Comming..
          </div>
        </div>
      )}
    </div>
  );
};
export default SecurityInfo;
