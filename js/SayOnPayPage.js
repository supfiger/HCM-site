// CONSTANTS
const marketSlider = document.querySelector("#marketSlider");
const revenueSlider = document.querySelector("#revenueSlider");
const rangeStartInput = document.querySelector(".rangeStartInput");
const rangeEndInput = document.querySelector(".rangeEndInput");
const selectAllIndustriesButton = document.querySelector(".selectAllIndustriesButton");

// SLIDERS
noUiSlider.create(marketSlider, {
  start: [0, 300000],
  connect: true,
  behaviour: "drag-tap",
  range: {
    min: 0,
    max: 400000,
  },
});

noUiSlider.create(revenueSlider, {
  start: [0, 140],
  connect: true,
  behaviour: "drag-tap",
  range: {
    min: 0,
    max: 200,
  },
});

marketSlider.noUiSlider.on("update", (values, handle) => {
  const value = values[handle];
  const start = 0;
  const end = 1;

  if (handle === start) {
    rangeStartInput.value = value;
  }
  if (handle === end) {
    rangeEndInput.value = value;
  }
});

// DIAGRAMS
const diagram_percents_value = 75; // процент первой части диаграммы
const diagram_new_data = {
  a_part: {
    value: diagram_percents_value, // процент первой части диаграммы
    gradient_css: "linear-gradient(49.59deg, #165953 -40.47%, rgba(22, 89, 83, 0.24) 98.51%)", // css градиент, которой приходит с сервера
    classname: ".ct-series-a .ct-slice-donut",
    // градиент по умолчанию
    default_gradient: {
      angle: "rotate(49.59)",
      stop_1: {
        color: "#165953",
        offset: "-40.47%",
      },
      stop_2: {
        color: "rgba(22, 89, 83, 0.24)",
        offset: "98.51%",
      },
    },
  },
  b_part: {
    value: 100 - diagram_percents_value, // процент второй части диаграммы
    gradient_css: "radial-gradient(73.42% 78.4% at 28.13% 71.46%, #DCDCDC 0%, rgba(138, 138, 138, 0.85) 100%)", // css градиент, которой приходит с сервера
    // градиент по умолчанию
    default_gradient: {
      angle: "rotate(90)",
      stop_1: {
        color: "#DCDCDC",
        offset: "1.46%",
      },
      stop_2: {
        color: "rgba(138, 138, 138, 0.85)",
        offset: "100%",
      },
    },
    classname: ".ct-series-b .ct-slice-donut",
  },
};
const diagram_data = {
  series: [diagram_new_data.a_part.value, diagram_new_data.b_part.value],
};
const diagram_options = {
  donut: true,
  donutWidth: 22,
  startAngle: 240,
  total: 150,
  showLabel: false,
  width: 120,
  height: 120,
};
const diagrams = document.querySelectorAll(".diagramBlock");

// FUNCTIONS
function onClickSelectAllButton() {
  const text = selectAllIndustriesButton.innerText;

  if (text === "Select All") {
    dropdownListAllInputs.forEach((item) => (item.checked = true));
    selectAllIndustriesButton.innerText = "Unselect All";
  } else {
    dropdownListAllInputs.forEach((item) => (item.checked = false));
    selectAllIndustriesButton.innerText = "Select All";
  }
}

function onChangeRangeStart() {
  marketSlider.noUiSlider.set([this.value, null]);
}

function onChangeRangeEnd() {
  marketSlider.noUiSlider.set([null, this.value]);
}

function createDiagrams() {
  diagrams.forEach((item) => {
    const diagram = new Chartist.Pie(item, diagram_data, diagram_options);

    diagram.on("created", function () {
      Object.values(diagram_new_data).forEach((part, index) => {
        const { classname, gradient_css, default_gradient } = part;

        const svg_ns = "http://www.w3.org/2000/svg";

        const path = item.querySelector(classname);
        const svg = path.closest("svg");
        const g = path.closest("g");
        const defs = document.createElementNS(svg_ns, "defs");
        const linear_gradient = document.createElementNS(svg_ns, "linearGradient");
        const radial_gradient = document.createElementNS(svg_ns, "radialGradient");
        const stop_1 = document.createElementNS(svg_ns, "stop");
        const stop_2 = document.createElementNS(svg_ns, "stop");

        const id = `f${(+new Date()).toString(16)}-diagram-part-${index}`;

        // console.log("svg →", svg);
        // console.log("g →", g);
        // console.log("data →", data);
        // console.log("part →", part);
        // console.log("classname →", classname);
        // console.log("path →", path);

        const isLinear = gradient_css.includes("linear-gradient");
        const isRadial = gradient_css.includes("radial-gradient");

        switch (true) {
          case isLinear:
            // создание первого (линейного) градиента:
            // const regex_for_linear_gradient = /,(?![^(]*\))(?![^"']*["'](?:[^"']*["'][^"']*["'])*[^"']*$)/;
            // const new_gradient = gradient.substring(
            //   gradient.indexOf("(") + 1,
            //   gradient.lastIndexOf(")")
            // );
            // const gradient_values_array = new_gradient.split(
            //   regex_for_linear_gradient
            // );
            // const gradient_values_object = gradient_values_array.forEach(
            //   (item) => {}
            // );
            // console.log("gradient_values_array", gradient_values_array);

            linear_gradient.setAttribute("id", id);
            linear_gradient.setAttribute("gradientTransform", default_gradient.angle);
            stop_1.setAttribute("stop-color", `${default_gradient.stop_1.color}`);
            stop_1.setAttribute("offset", `${default_gradient.stop_1.offset}`);
            stop_2.setAttribute("stop-color", `${default_gradient.stop_2.color}`);
            stop_2.setAttribute("offset", `${default_gradient.stop_2.offset}`);

            path.style.stroke = `url(#${id})`;

            linear_gradient.appendChild(stop_1);
            linear_gradient.appendChild(stop_2);
            defs.appendChild(linear_gradient);
            svg.appendChild(defs);

            break;
          case isRadial:
            // создание второго (радиального) градиента:

            linear_gradient.setAttribute("id", id);
            linear_gradient.setAttribute("gradientTransform", default_gradient.angle);
            stop_1.setAttribute("stop-color", `${default_gradient.stop_1.color}`);
            stop_1.setAttribute("offset", `${default_gradient.stop_1.offset}`);
            stop_2.setAttribute("stop-color", `${default_gradient.stop_2.color}`);
            stop_2.setAttribute("offset", `${default_gradient.stop_2.offset}`);

            path.style.stroke = `url(#${id})`;

            linear_gradient.appendChild(stop_1);
            linear_gradient.appendChild(stop_2);

            svg.querySelector("defs").appendChild(linear_gradient);
            break;
          default:
            break;
        }
      });
    });
  });
}

createDiagrams();

// EVENT LISTENERS
rangeStartInput.addEventListener("change", onChangeRangeStart);
rangeEndInput.addEventListener("change", onChangeRangeEnd);
selectAllIndustriesButton.addEventListener("click", onClickSelectAllButton);
