import "./index.scss";
import "styles/index.scss";
// import "@/fonts/aliFont/iconfont.js";
import { objectMerge } from "utils/index.js";
import { formatPrice } from "utils/format.js";
import "utils/subPageA.js";
// import Icon from "images/20191103183412_ucmoy.jpg";
// import "@/icons"
console.log(objectMerge,formatPrice);
function component() {
  const element = document.createElement("div");
  element.innerHTML = "Hello webpack";
  return element;
}

$(function () {
  // Add the image to our existing div.
  // const myIcon = new Image();
  // myIcon.src = Icon;
  // $("div").append(component()).append(myIcon);
});
