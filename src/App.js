import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
} from "react";
import "./App.css";
import { Fragment } from "react";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import amber from "@material-ui/core/colors/amber";
import green from "@material-ui/core/colors/green";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
const self_color = blue[500];
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
        runDownSetting: action.runDownSetting,
      };
    case "change choose country to play":
      return {
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
        playerStep: "play",
        army: action.army,
        table: action.table,
      };
    case "change rum down list":
      return {
        ...state,
        runDown: action.runDown,
      };
    case "cellMouseEventOver":
      return {
        ...state,
        mouseOverObj: { ...action.mouseOverObj, objType: "cell" },
      };
    case "cellMouseEventOut":
      let addObj = state.mouseOverObj;
      if (
        state.mouseOverObj.x === action.mouseOverObj.x &&
        state.mouseOverObj.y === action.mouseOverObj.y
      ) {
        addObj = { mouseOverObj: {} };
      }
      return {
        ...state,
        ...addObj,
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
/**
 *
 * @param {Integer} x
 * @param {Integer} y
 */
function positionReturn(x = 1, y = 1) {
  let element = document.querySelector(".x" + x + "_y" + y);
  let parent_element =
    element.parentElement.parentElement.parentElement.parentElement
      .parentElement;
  let px_x =
    element.getBoundingClientRect().x +
    window.scrollX +
    10 +
    (element.matches(":hover") ? 0 : -2) -
    parent_element.getBoundingClientRect().x;
  let px_y =
    element.getBoundingClientRect().y +
    window.scrollY -
    12 +
    (element.matches(":hover") ? 0 : -2);
  return {
    x: parseInt(px_x),
    y: parseInt(px_y),
  };
}
function App() {
  const [radius, setRadius] = useState(2); //2
  const [diameter, setDiameter] = useState(5); //radius*2+1
  const [rowCountry, setRowCountry] = useState(3); //3
  const [runDownSetting, setRunDownSetting] = useState("userFirst"); //userFirst,aiFirst,random
  const [state, dispatch] = useReducer(reducer, {
    playerStep: "enter game",
    country: [],
    table: [],
    people: [],
    army: [],
    runDown: [],
    mouseOverObj: {},
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
    "殷",
    "鄢",
    "密",
    "胡",
    "焦",
    "共",
    "凡",
    "葛",
    "謝",
    "申",
    "蓼",
    "潘",
    "弦",
    "偪",
    "光",
    "滑",
    "江",
    "邘",
    "蔣",
    "邶",
    "祭",
    "道",
    "柏",
    "胙",
    "雍",
    "項",
    "頓",
    "管",
    "檀",
    "房",
    "莘",
    "許",
    "韋",
  ]; //85
  const peopleFirstNameArray = [
    "姬",
    "嬴",
    "姒",
    "羋",
    "熊",
    "子",
    "姜",
    "田",
    "媯",
    "己",
    "姞",
    "蘇",
    "邵",
    "駱",
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
    "姚",
    "呂",
    "晏",
    "崔",
    "高",
    "郭",
    "莊",
    "張",
    "輔",
  ]; //36
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
    "伷",
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
    "仲",
    "傒",
    "朋",
    "虎",
    "巫",
    "燬",
    "固",
    "克",
    "牽",
    "蠆",
    "灶",
    "完",
    "乞",
    "山",
    "撝",
    "白",
    "盈",
  ]; //113
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
  const fun_clickArmy = (props) => {
    console.log(props, "test");
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
          own: {},
          color: "black",
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
            city: [{ x: j, y: i }],
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
            id: people.length,
          });

          //add control
          row_array_push = {
            ...row_array_push,
            control: [
              { name: country_push.name, id: country_push.id, number: 100 },
            ],
            own: { name: country_push.name, id: country_push.id },
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
          own: {},
          color: "black",
        });
      }
      table_array.push(row_array);
    }
    //to make table own,seen,control
    for (let k = 0; k < country.length; k++) {
      let insert_obj = { name: country[k].name, id: country[k].id };
      let table_own = [
        [country[k].firstCity.y - 1, country[k].firstCity.x - 2],
        [country[k].firstCity.y - 1, country[k].firstCity.x],
      ]; //left,right,top-left,top-right,down-left,down-right

      if (country[k].firstCity.y % 2 === 1) {
        table_own.push(
          ...[
            [country[k].firstCity.y - 2, country[k].firstCity.x - 1],
            [country[k].firstCity.y - 2, country[k].firstCity.x],
            [country[k].firstCity.y, country[k].firstCity.x - 1],
            [country[k].firstCity.y, country[k].firstCity.x],
          ]
        );
      } else {
        table_own.push(
          ...[
            [country[k].firstCity.y - 2, country[k].firstCity.x - 2],
            [country[k].firstCity.y - 2, country[k].firstCity.x - 1],
            [country[k].firstCity.y, country[k].firstCity.x - 2],
            [country[k].firstCity.y, country[k].firstCity.x - 1],
          ]
        );
      }
      for (let m = 0; m < table_own.length; m++) {
        table_array[table_own[m][0]][table_own[m][1]].own = insert_obj;
        table_array[table_own[m][0]][table_own[m][1]].control = [
          { ...insert_obj, number: 100 },
        ];
        table_array[table_own[m][0]][table_own[m][1]].seen = [k];
      }
    }

    dispatch({
      country: country,
      table: table_array,
      people: people,
      runDownSetting: runDownSetting,
      type: "change playerStep to choose country",
    });
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
                  padding: 10,
                  display: "table-cell",
                  verticalAlign: "middle",
                  position: "relative",
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
                {state.army.map((row, index) => (
                  <div
                    key={index}
                    className="army"
                    style={{
                      top: row.top,
                      left: row.left,
                      border: "5px solid " + row.color,
                      lineHeight: "48px",
                    }}
                    onClick={() => fun_clickArmy(row)}
                  >
                    {state.people[row.people_id].name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {typeof state.mouseOverObj.objType !== "undefined" ? (
            <div
              style={{
                width: "calc(100% - 4px)",
                background: "white",
                position: "fixed",
                bottom: 0,
                textAlign: "left",
                height: 100,
                border: "2px solid black",
              }}
            >
              <div style={{ padding: 16 }}>
                {
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={4}>
                      <div>
                        {state.mouseOverObj.objType === "cell"
                          ? state.mouseOverObj.city
                            ? "city :" + state.mouseOverObj.cityName
                            : "land"
                          : "army"}
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div>control</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div></div>
                    </Grid>
                  </Grid>
                }
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
  const stateRef = useRef(state);
  stateRef.current = state;

  const fun_cellMouseOut = (props) => {
    console.log(props, "out");
    dispatch({
      type: "cellMouseEventOut",
      mouseOverObj: props,
    });
  };

  const fun_cellMouseOver = (props) => {
    console.log(props, "over");
    dispatch({
      type: "cellMouseEventOver",
      mouseOverObj: props,
    });
  };

  const fun_clickCity = (props) => {
    if (state.playerStep === "choose country") {
      let army = [];
      //make table array add solider
      for (let i = 0; i < state.country.length; i++) {
        let army_position = positionReturn(
          state.country[i].firstCity.x,
          state.country[i].firstCity.y
        );
        army.push({
          id: army.length,
          people_id: army.length,
          x: state.country[i].firstCity.x,
          y: state.country[i].firstCity.y,
          top: army_position.y,
          left: army_position.x,
          color:
            state.country[state.people[army.length].countryId].firstCity.x ===
              props.x &&
            state.country[state.people[army.length].countryId].firstCity.y ===
              props.y
              ? self_color
              : "white",
        });
      }

      for (let i = 0; i < state.table.length; i++) {
        for (let j = 0; j < state.table[i].length; j++) {
          if (
            typeof state.table[i][j].own.id !== "undefined" &&
            state.table[i][j].own.id === props.own.id
          ) {
            state.table[i][j].color = self_color;
          } else if (typeof state.table[i][j].own.id !== "undefined") {
            state.table[i][j].color = "white";
          }
        }
      }

      dispatch({
        type: "change choose country to play",
        cell: props,
        army: army,
        table: state.table,
      });
      setTimeout(() => {
        runDownMaking();
      }, 0);
    } else {
      console.log(state);
    }
  };

  const runDownMaking = () => {
    let pre_country = [...stateRef.current.country];
    let user_index = pre_country.findIndex((element) => element.ai === false);
    if (stateRef.current.runDownSetting === "userFirst") {
      let removed = pre_country.splice(user_index, 1);
      pre_country = [...removed, ...shuffle(pre_country)];
    } else if (stateRef.current.runDownSetting === "aiFirst") {
      let removed = pre_country.splice(user_index, 1);
      pre_country = [...shuffle(pre_country), ...removed];
    } else if (stateRef.current.runDownSetting === "random") {
      pre_country = shuffle(pre_country);
    }
    dispatch({
      type: "change rum down list",
      runDown: pre_country,
    });
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
          border:
            props.color !== "black"
              ? "2px dashed " + props.color
              : "0.5px solid " + props.color,
          background: props.background,
        }}
        className={"cell x" + props.x + "_y" + props.y}
        onClick={() => (props.city ? fun_clickCity(props) : null)}
        onMouseOver={() => {
          fun_cellMouseOver(props);
        }}
        onMouseOut={() => {
          fun_cellMouseOut(props);
        }}
      >
        {props.city ? (
          <div style={{ position: "absolute" }}>
            <LocationCityIcon
              style={{
                ...{ fontSize: "4.2rem" },
                ...{
                  color: state.country[props.own["id"]].ai ? "" : self_color,
                },
              }}
            />
          </div>
        ) : null}
      </div>
    </td>
  );
}

export default App;
