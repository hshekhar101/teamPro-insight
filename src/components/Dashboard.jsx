import React from "react";
import { useSelector } from "react-redux";
import { BsReception4, BsPlusLg } from "react-icons/bs"; //BsReception4
import { RiTodoFill } from "react-icons/ri";
import { GiProgression } from "react-icons/gi"; //BsSliders2
import { TbFlag2, TbUrgent } from "react-icons/tb"; //BsSliders2
import { IoCloudDoneSharp } from "react-icons/io5"; //BsSliders2
import { MdCancel, MdOutlinePriorityHigh } from "react-icons/md"; //BsSliders2

import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";

import "../styles/Dashboard.css";
import Card from "./Card.jsx";

const Dashboard = () => {
  const { dataSelected, user } = useSelector((state) => state.dataSelectSlice);

  return (
    dataSelected && (
      <div className="container" style={{ justifyContent: "space-evenly" }}>
        {dataSelected.map((element, index) => {
          var group = localStorage.getItem("group");

          return (
            <>
              <div
                key={index}
                className="dashboard"
                style={{ backgroundColor: "whitesmoke" }}
              >
                <div className="cardHeading1">
                  <div
                    className="sideView1"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {!user ? (
                      group === "status" ? (
                        element[index].title === "Todo" ? (
                          <RiTodoFill />
                        ) : element[index].title === "In progress" ? (
                          <GiProgression />
                        ) : element[index].title === "Backlog" ? (
                          <TbFlag2 />
                        ) : element[index].title === "Done" ? (
                          <IoCloudDoneSharp />
                        ) : (
                          <MdCancel />
                        )
                      ) : group === "priority" ? (
                        element[index].title === "High" ? (
                          <FcHighPriority />
                        ) : element[index].title === "Medium" ? (
                          <FcMediumPriority />
                        ) : element[index].title === "Low" ? (
                          <FcLowPriority />
                        ) : element[index].title === "Urgent" ? (
                          <TbUrgent />
                        ) : (
                          <MdOutlinePriorityHigh />
                        )
                      ) : (
                        <BsReception4 />
                      )
                    ) : (
                      <>
                        <div className="image">
                          <img src={element[index].img} alt="Error" />
                        </div>
                      </>
                    )}
                    &nbsp; &nbsp;
                    <span>
                      {element[index]?.title} {element[index]?.value?.length}
                    </span>
                  </div>
                  <div className="sideView2">
                    <BsPlusLg />
                    <span style={{ letterSpacing: "2px" }}> ···</span>
                  </div>
                </div>
                <div className="selectList">
                  {element[index]?.value?.map((element, ind) => {
                    return (
                      <Card
                        key={ind}
                        us={!user}
                        id={element.id}
                        title={element.title}
                        tags={element.tag}
                        image={element.image}
                        status={element.color}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    )
  );
};

export default Dashboard;
