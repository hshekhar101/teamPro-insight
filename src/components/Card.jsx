import React from "react";
import { BsExclamationSquareFill } from "react-icons/bs";
import "../styles/Card.css";

const Card = ({ us, id, title, tags, status, image }) => {
  return (
    <div className="container_card">
      <div className="cardHeading2" style={{ justifyContent: "space-between" }}>
        <span style={{ textTransform: "uppercase", color: "darkgrey" }}>
          {id}
        </span>

        <div className="image">
          {!us ? (
            <p></p>
          ) : (
            <>
              <div className="image">
                <img src={image} alt="Error" />
              </div>
              <div className="status" style={{ background: status }}></div>
            </>
          )}
        </div>
      </div>

      <div className="title">
        <p>{title}</p>
      </div>

      <div className="tags">
        <div className="tag">
          <BsExclamationSquareFill />
        </div>
        {tags?.map((element, index) => {
          return (
            <div key={index} className="tag">
              <span>⚪</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
