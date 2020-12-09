import React, { useState, useEffect, useReducer, useContext } from "react";
import "./App.css";
import { Fragment } from "react";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import amber from "@material-ui/core/colors/amber";
import green from "@material-ui/core/colors/green";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";

/*
https://tecky.io/en/blog/%E5%88%B0%E5%BA%95react-hooks%E6%9C%89%E4%BD%95%E7%89%B9%E5%88%A5-%E4%BA%8C-%E6%B7%BA%E8%AB%87useeffect%E5%8F%8Ausereducer/
may be a good example for using useReducer

for large array with low respone,may be solve by following 
https://zh-hant.reactjs.org/docs/optimizing-performance.html#virtualize-long-lists
*/
const StateContext = React.createContext();
const DispatchContext = React.createContext();

const land_color = amber[500];
const tree_color = green[500];
const mountain_color = brown[500];
const cliff_color = grey[500];
/**
 * random Integer
 * @param {number} min
 * @param {number} max
 */
function randomIntFromInterval(min = 0, max = 1) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//playerStep:enter game>choose country>play
function reducer(state, action) {
  switch (action.type) {
    case "change playerStep to choose country":
      return {
        ...state,
        playerStep: "choose country",
        country: action.country,
        table: action.table,
        people: action.people,
      };
    case "change choose country to play":
      return {
        ...{
          ...state,
          ...{
            country: state.country.map((row) => {
              if (
                row.firstCity.x === action.cell.x &&
                row.firstCity.y === action.cell.y
              ) {
                row = { ...row, ai: false };
              }
              return row;
            }),
          },
        },
        playerStep: "play",
      };
    default:
      throw new Error();
  }
}
/**
 * random array
 * @param {Array} array
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function App() {
  const [radius, setRadius] = useState(2); //2
  const [diameter, setDiameter] = useState(5); //radius*2+1
  const [rowCountry, setRowCountry] = useState(3); //3
  const [state, dispatch] = useReducer(reducer, {
    playerStep: "enter game",
    country: [],
    table: [],
    people: [],
  });
  useEffect(() => {
    console.log("test");
  });
  const fun_changeRadius = (event) => {
    const target = event.target;
    setRadius((prevState) => target.value);
    setDiameter((prevState) => target.value * 2 + 1); //直徑
  };
  const fun_changeRowCountry = (event) => {
    const target = event.target;
    setRowCountry((prevState) => target.value);
  };

  const cityNameArray = [
    "夏",
    "商",
    "周",
    "秦",
    "漢",
    "衞",
    "越",
    "燕",
    "楚",
    "魯",
    "宋",
    "唐",
    "晉",
    "鄭",
    "齊",
    "蔡",
    "吳",
    "陳",
    "曹",
    "酆",
    "樊",
    "單",
    "召",
    "梁",
    "毛",
    "畢",
    "井",
    "溫",
    "劉",
    "榮",
    "甘",
    "尹",
    "甘",
    "原",
    "詹",
    "鞏",
    "應",
    "趙",
    "魏",
    "韓",
    "杞",
    "邾",
    "薛",
    "郳",
    "滕",
    "莒",
    "郯",
    "費",
    "邳",
    "蜀",
    "巴",
    "苴",
  ]; //52
  const peopleFirstNameArray = [
    "姬",
    "嬴",
    "姒",
    "羋",
    "熊",
    "子",
    "姜",
    "呂",
    "田",
    "媯",
    "己",
    "姞",
    "蘇",
    "邵",
    "駱",
    "任",
    "妘",
    "禹",
    "妊",
    "偃",
    "祁",
    "顔",
    "季",
    "倪",
    "風",
    "曼",
    "谷",
    "兒",
    "媿",
  ]; //29
  const peopleSecondNameArray = [
    "鯀",
    "禹",
    "啟",
    "康",
    "相",
    "羿",
    "浞",
    "杼",
    "槐",
    "芒",
    "泄",
    "降",
    "扃",
    "廑",
    "皋",
    "發",
    "桀",
    "嚳",
    "契",
    "冥",
    "恆",
    "絢",
    "至",
    "庸",
    "勝",
    "履",
    "微",
    "摯",
    "辯",
    "高",
    "密",
    "伷",
    "莊",
    "發",
    "整",
    "滕",
    "旦",
    "踰",
    "新",
    "更",
    "和",
    "旬",
    "頌",
    "斂",
    "昭",
    "弓",
    "曜",
    "載",
    "先",
    "囂",
    "瞿",
    "托",
    "羨",
    "受",
    "昌",
    "發",
    "誦",
    "釗",
    "瑕",
    "滿",
    "囏",
    "燮",
    "胡",
    "靜",
    "棄",
    "鞠",
    "類",
    "亶",
    "歷",
    "林",
    "佗",
    "閬",
    "穨",
    "班",
    "瑜",
    "夷",
    "貴",
    "猛",
    "匄",
    "仁",
    "介",
    "叔",
    "嵬",
    "午",
    "驕",
    "喜",
    "扁",
    "定",
    "延",
    "咎",
    "傑",
    "奭",
    "尚",
    "鮮",
    "度",
    "封",
    "忽",
    "亹",
    "嬰",
    "足",
  ]; //100
  /**
   * return object, use for createTable
   * @param {boolean} city
   */
  const fun_land_creat = (city = false) => {
    let land = 0;
    let background = land_color;
    if (!city) {
      let randomNo = randomIntFromInterval(1, 100);
      if (randomNo <= 15) {
        //tree
        land = 1;
        background = tree_color;
      } else if (randomNo <= 30) {
        //mountain
        land = 2;
        background = mountain_color;
      } else if (randomNo <= 31) {
        //cliff
        land = 3;
        background = cliff_color;
      }
    }
    return { land, background };
  };
  const fun_people_creat_value = () => {
    let add_object = { city_save: randomIntFromInterval(40, 100) };
    let random_number = randomIntFromInterval(1, 3);
    if (random_number === 1) {
      add_object.short_attack = randomIntFromInterval(40, 100);
    } else if (random_number === 2) {
      add_object.short_defence = randomIntFromInterval(40, 100);
    } else if (random_number === 3) {
      add_object.long_attack = randomIntFromInterval(40, 100);
    }
    return add_object;
  };

  useEffect(() => {
    console.log("mounted", rowCountry, radius);
  });
  const createTable = () => {
    let table_array = [],
      country = [],
      people = [];
    let copy_cityNameArray = shuffle(JSON.parse(JSON.stringify(cityNameArray)));
    for (let i = 1; i <= diameter * rowCountry; i++) {
      let row_array = [];
      let j = 1;
      let city = false;
      let randomNo2 = 1;
      if (i % 2 === 0) {
        randomNo2 = randomIntFromInterval(1, 2);
      }
      for (; j <= diameter * rowCountry; j++) {
        city = false;
        if (i % diameter === parseInt(diameter / 2) + 1) {
          if (randomNo2 === 1) {
            if (j % diameter === parseInt(diameter / 2) + 1) {
              city = true;
            }
          } else if (randomNo2 === 2) {
            console.log(j % diameter, parseInt(diameter / 2) + 1);
            if ((j - 1) % diameter === parseInt(diameter / 2) + 1) {
              city = true;
            }
          }
        }
        let { land, background } = fun_land_creat(city);
        let cityName = "";
        let row_array_push = {
          x: j,
          y: i,
          land: land,
          background: background,
          city: city,
          control: [],
          seen: [],
        };
        if (city) {
          //add cityName
          if (copy_cityNameArray.length === 0) {
            alert("not enough cityName");
            break;
          } else {
            cityName = copy_cityNameArray.pop();
            row_array_push = { ...row_array_push, cityName: cityName };
          }
          //add peopleFirstName
          let copy_peopleFirstNameArray = shuffle(
            JSON.parse(JSON.stringify(peopleFirstNameArray))
          );
          let add_peopleFirstNameArray = [];
          let add_peopleSecondNameArray = [];
          for (let k = 0; k < 10; k++) {
            add_peopleFirstNameArray.push(copy_peopleFirstNameArray.pop());
            add_peopleSecondNameArray.push(
              shuffle(JSON.parse(JSON.stringify(peopleSecondNameArray)))
            );
          }
          row_array_push = {
            ...row_array_push,
            peopleFirstNameArray: add_peopleFirstNameArray,
            peopleSecondNameArray: add_peopleSecondNameArray,
          };
          //create country
          let copy_add_peopleFirstNameArray = shuffle(
            JSON.parse(JSON.stringify(add_peopleFirstNameArray))
          );
          let country_push = {
            name: cityName,
            id: country.length,
            firstCity: { x: j, y: i },
            ai: true,
            kingFirstName: copy_add_peopleFirstNameArray.pop(),
          };

          country.push(country_push);
          //create people
          let kingNameRandomNumber = 0; //find out index number of kingFirstName
          for (
            ;
            kingNameRandomNumber < row_array_push.peopleFirstNameArray.length;
            kingNameRandomNumber++
          ) {
            if (
              row_array_push.peopleFirstNameArray[kingNameRandomNumber] ===
              country_push.kingFirstName
            ) {
              break;
            }
          }
          let people_push = {
            countryName: country_push.name,
            countryId: country_push.id,
            firstName: country_push.kingFirstName,
            secondName: row_array_push.peopleSecondNameArray[
              kingNameRandomNumber
            ].pop(),
            king: true,
            ...fun_people_creat_value(),
          };
          people.push({
            ...people_push,
            name: people_push.firstName + people_push.secondName,
          });
          //add control
          row_array_push = {
            ...row_array_push,
            control: [
              { name: country_push.name, id: country_push.id, number: 100 },
            ],
          };
          //add seen
          row_array_push = {
            ...row_array_push,
            seen: [country_push.id],
          };
        }
        row_array.push(row_array_push);
      }
      if (i % 2 === 0) {
        //extra table cell (the ten cell in second row)
        let city = false;
        let { land, background } = fun_land_creat(city);
        row_array.push({
          x: j,
          y: i,
          land: land,
          background: background,
          city: city,
          control: [],
          seen: [],
        });
      }
      table_array.push(row_array);
    }
    console.log(people);
    dispatch({
      country: country,
      table: table_array,
      people: people,
      type: "change playerStep to choose country",
    });
    console.log(state);
  };
  /*
  123456789
  2
  3
  4
  5
  6
  7
  8
  9
  */
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="App">
          {state.playerStep === "enter game" ? (
            <Fragment>
              <div>
                A country radius table cell
                <input
                  type="number"
                  value={radius}
                  onChange={fun_changeRadius}
                  min={2}
                />
              </div>
              <div>
                Countries in a row
                <input
                  type="number"
                  value={rowCountry}
                  onChange={fun_changeRowCountry}
                  max={7}
                  min={2}
                />
              </div>
              <button onClick={createTable}>test</button>
            </Fragment>
          ) : null}
          {state.playerStep === "choose country" ? (
            <span>Choose Country</span>
          ) : null}
          {state.playerStep === "choose country" ||
          state.playerStep === "play" ? (
            <div
              style={{
                margin: "0 auto",
                display: "table",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: cliff_color,
                  width: (diameter * rowCountry + 1) * 80 + 20,
                  height: diameter * rowCountry * 80 + 20,
                  minHeight: diameter * rowCountry * 80 + 20,
                  maxHeight: diameter * rowCountry * 80 + 20,
                  display: "table-cell",
                  verticalAlign: "middle",
                }}
              >
                <table
                  style={{
                    width: (diameter * rowCountry + 1) * 80,
                    height: diameter * rowCountry * 80,
                    minHeight: diameter * rowCountry * 80,
                    maxHeight: diameter * rowCountry * 80,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  border="0"
                  cellSpacing="0"
                  cellPadding="0"
                >
                  <tbody>
                    {state.table.map((row, index) => (
                      <tr key={index}>
                        {row.map((row2, index2) =>
                          index % 2 === 0 ? (
                            <Fragment key={index2}>
                              {index2 === 0 ? ( //first non use table cell
                                <Fragment>
                                  <td
                                    style={{
                                      width: 40,
                                      height: 80,
                                    }}
                                  ></td>
                                  <TableCell {...row2} />
                                </Fragment>
                              ) : null}
                              {index2 === diameter * rowCountry - 1 ? ( //last non use table cell
                                <Fragment>
                                  <TableCell {...row2} />
                                  <td
                                    style={{
                                      minWidth: 40,
                                      maxWidth: 40,
                                      height: 80,
                                    }}
                                  ></td>
                                </Fragment>
                              ) : null}
                              {index2 !== 0 &&
                              index2 !== diameter * rowCountry - 1 ? (
                                <TableCell {...row2} />
                              ) : null}
                            </Fragment>
                          ) : (
                            <Fragment key={index2}>
                              <TableCell {...row2} />
                            </Fragment>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

function TableCell(props) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const fun_clickCity = (props) => {
    if (state.playerStep === "choose country") {
      //make table array add solider
      dispatch({ type: "change choose country to play", cell: props });
    }
    console.log(state);
  };

  return (
    <td
      colSpan="2"
      style={{
        width: 80,
        height: 80,
        position: "relative",
      }}
    >
      <div
        style={{
          width: 74,
          height: 74,
          position: "absolute",
          top: 3,
          left: 3,
          border: "1px solid black",
          background: props.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="cell"
      >
        {props.city ? (
          <div
            style={{ position: "absolute" }}
            onClick={() => fun_clickCity(props)}
          >
            <LocationCityIcon style={{ fontSize: "4.2rem" }} />
          </div>
        ) : null}
      </div>
    </td>
  );
}

export default App;