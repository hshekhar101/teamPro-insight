import axios from "axios";
import emp1 from "../images/emp1.png";
import emp2 from "../images/emp2.png";
import emp3 from "../images/emp3.png";
import emp4 from "../images/emp4.png";
import emp5 from "../images/emp5.png";
import pr1 from "../images/pr1.png";
import pr2 from "../images/pr2.png";
import pr3 from "../images/pr3.png";
import pr4 from "../images/pr4.png";
import pr5 from "../images/pr5.png";
import pr6 from "../images/pr6.png";
import pr7 from "../images/pr7.png";
import pr8 from "../images/pr8.png";
import pr9 from "../images/pr9.png";
import pr10 from "../images/pr10.png";

let profileList = [pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8, pr9, pr10];
let colorList = ["grey", "yellow", "blue", "green", "red"];
let empList = [emp1, emp2, emp3, emp4, emp5];

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: "dataRequest" });

    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );
    var newdata = {
      tickets: [],
      users: [],
    };
    data.tickets.forEach((element) => {
      var randomidx = Math.floor(Math.random() * 10);
      newdata.tickets.push({
        id: element.id,
        title: element.title,
        description: element.description,
        priority: element.priority,
        status: element.status,
        userId: element.userId,
        tag: element.tag,
        image: profileList[randomidx],
        color: colorList[element.priority],
      });
    });
    data.users.forEach((element) => {
      var randomidx = Math.floor(Math.random() * 5);
      newdata.users.push({
        id: element.id,
        name: element.name,
        img: empList[randomidx],
      });
    });
    dispatch({ type: "dataSuccess", payload: newdata });
  } catch (error) {
    dispatch({ type: "dataFailure" });
  }
};

export const dataSelect = (group, tickets, order) => async (dispatch) => {
  try {
    // console.log(group, tickets, order);
    dispatch({ type: "dataSelectRequest" });

    let user = false;
    let set = new Set();
    let array = [],
      dataSelected = [];

    if (group === "status") {
      tickets.forEach((element) => {
        set.add(element.status);
      });
      set.add("Done");
      // set.add("Cancelled");

      array = [...set];

      array.forEach((element, index) => {
        let array = tickets.filter((filterElement) => {
          return element === filterElement.status;
        });
        dataSelected.push({
          [index]: {
            title: element,
            value: array,
          },
        });
      });
    } else if (group === "user") {
      user = true;
      tickets?.users?.forEach((element, index) => {
        array = tickets?.tickets?.filter((filterElement) => {
          return element.id === filterElement.userId;
        });

        dataSelected.push({
          [index]: {
            title: element.name,
            value: array,
            img: element.img,
          },
        });
      });
      // console.log(dataSelected);
    } else {
      let priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

      priorityList.forEach((element, index) => {
        array = tickets.filter((filterElement) => {
          return index === filterElement.priority;
        });

        dataSelected.push({
          [index]: {
            title: element,
            value: array,
          },
        });
      });
    }
    if (order === "title") {
      dataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }
    if (order === "priority") {
      dataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }
    // console.log(dataSelected);
    dispatch({ type: "dataSelectSuccess", payload: { dataSelected, user } });
  } catch (error) {
    dispatch({ type: "dataSelectFailure", payload: error.message });
  }
};
