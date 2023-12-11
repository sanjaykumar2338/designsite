const productTypes = {
    t_shirt: "t_shirt",
};
const productType = productTypes.t_shirt;

const product_variant_ids = {
    t_shirt_black: 10286,
    t_shirt: 12634,
};

let product;

let t_shirtColours = {
    Red: { name: "Red", code: "#d80019" },
    White: { name: "White", code: "#fffefa" },
    Black: { name: "Black", code: "#141313" },
};
// {
//     Red: { name: "Red", code: "#d80019" },
//     Heather_Grey: { name: "Heather Grey", code: "#9a978e" },
//     Black: { name: "Black", code: "#141313" },
//     Maroon: { name: "Maroon", code: "#47001b" },
//     Navy: { name: "Navy", code: "#1a2330" },
//     Purple: { name: "Purple", code: "#48197d" },
//     Dark: { name: "Dark Chocolate", code: "#463b33" },
//     Cardinal: { name: "Cardinal", code: "#c21b3a" },
//     Royal: { name: "Royal", code: "#175ac7" },
//     Dark: { name: "Dark Heather", code: "#595959" },
//     Charcoal: { name: "Charcoal", code: "#6a6967" },
//     Military: { name: "Military Green", code: "#737a5f" },
//     Orange: { name: "Orange", code: "#ff5f2e" },
//     Brown: { name: "Brown Savana", code: "#9f8971" },
//     Irish: { name: "Irish Green", code: "#00ba69" },
//     Azalea: { name: "Azalea", code: "#ff98c6" },
//     Carolina: { name: "Carolina Blue", code: "#96bbff" },
//     Gold: { name: "Gold", code: "#ffb22d" },
//     Sport: { name: "Sport Grey", code: "#c4c0be" },
//     Sand: { name: "Sand", code: "#d6c0ab" },
//     Sky: { name: "Sky", code: "#8ee0ff" },
//     Natural: { name: "Natural", code: "#e8dacd" },
//     Light: { name: "Light Blue", code: "#d9efff" },
//     Ash: { name: "Ash", code: "#f3f3f3" },
//     White: { name: "White", code: "#fffefa" },
// };
const elements = {
    div_front: "div_front",
    div_back: "div_back",
    div_sleeve_left: "div_sleeve_left",
    div_sleeve_right: "div_sleeve_right",
    canvas_front: "canvas_front",
    canvas_back: "canvas_back",
    canvas_sleeve_left: "canvas_sleeve_left",
    canvas_sleeve_right: "canvas_sleeve_right",
};
const canvas_divs = {
    canvas_front: "div_front",
    canvas_back: "div_back",
    canvas_sleeve_left: "div_sleeve_left",
    canvas_sleeve_right: "div_sleeve_right",
};
const canvas_images = {
    canvas_front:
        "https://files.cdn.printful.com/m/ec1000/medium/onman/front/05_ec1000_onman_front_base_whitebg.png?v=1675420344",
    canvas_back:
        "https://files.cdn.printful.com/m/ec1000/medium/onman/back/05_ec1000_onman_back_base_whitebg.png?v=1676986615",
    canvas_sleeve_left:
        "https://files.cdn.printful.com/m/ec1000/medium/onman/left/zoomed/05_ec1000_onman_left_base_whitebg.png?v=1675420344",
    canvas_sleeve_right:
        "https://files.cdn.printful.com/m/ec1000/medium/onman/right/zoomed/05_ec1000_onman_right_base_whitebg.png?v=1675420344",
};
const canvases = {
    canvas_front: new fabric.Canvas(elements.canvas_front),
    canvas_back: new fabric.Canvas(elements.canvas_back),
    canvas_sleeve_left: new fabric.Canvas(elements.canvas_sleeve_left),
    canvas_sleeve_right: new fabric.Canvas(elements.canvas_sleeve_right),
};

var canvas = canvases.canvas_front;

let selectedObject;
let order;

let selected_variant;

function objectSelectedUpdated(_obj) {
    // console.log(_obj);
    if (!_obj.selected || !_obj.selected.length) return;
    const obj = _obj.selected[0];
    setSelectedObject(obj);
}
function setCanvasImage(url) {
    const img = `<img src='${url}' height='500px' style='position: absolute; height: 500px; width: 500px' alt='' id='canvasBg' />`;
    const canvasBgImage = getEl("canvasBgImage");
    canvasBgImage.innerHTML = img;
}
function setShowCanvas(name, bool) {
    [
        elements.canvas_front,
        elements.canvas_back,
        elements.canvas_sleeve_left,
        elements.canvas_sleeve_right,
    ].forEach((_name, i) => {
        const isHidden = name === _name ? !bool : true;

        const el = getEl(_name);
        el.hidden = isHidden;
        const elDiv = getEl(canvas_divs[_name]);
        elDiv.hidden = isHidden;
        if (!isHidden) {
            canvas = canvases[_name];
            setCanvasImage(canvas_images[_name]);
        }
    });
}
function setProductColoursUI() {
    let colourButtons = "";
    Object.values(t_shirtColours).forEach((v) => {
        colourButtons += ` <button class="border rounded-lg" style="height: 30px; width: 30px; background-color: ${v.code}" onclick="setProductColour('${v.code}')"></button>`;
    });
    const productColoursDiv = getEl("product-colours");
    productColoursDiv.innerHTML = colourButtons;
}
function init() {
    Object.values(canvases).forEach((c) => {
        c.selection = false;
        c.on("selection:created", function (obj) {
            objectSelectedUpdated(obj);
        });
        c.on("selection:updated", function (obj) {
            objectSelectedUpdated(obj);
        });
        c.on("selection:cleared", function (obj) {
            setSelectedObject(undefined);
        });
    });
    selected_variant = product_variants.find(
        (v) => v.color_code === t_shirtColours.White.code
    ).id;
    console.log(selected_variant, "selected_variant");
    setShowCanvas(elements.canvas_front, true);
    setProductColoursUI();
    setImages();
}

function setImage(url, position) {
    // url =
    //     (window.location.hostname.includes("127.0.0.1")
    //         ? "http://127.0.0.1:8000/"
    //         : `https://+${window.location.hostname}/`) + url;
    fabric.Image.fromURL(
        url,
        function (oImg) {
            if (oImg._element == null) {
                // alert(
                //     "Cant access the file! Please download the image and upload it from local storage"
                // );
                return;
            }
            const h = canvases[position].getHeight();
            const w = canvases[position].getWidth();
            // oImg.set("selectable", false);
            oImg.set("top", h / 4);
            oImg.set("left", w / 4);
            oImg.scaleToHeight(h / 2);
            oImg.scaleToWidth(w / 2);
            canvases[position].add(oImg);
        },
        { crossOrigin: "Anonymous" }
    );
}

function setImages() {
    var requestOptions = {
        method: "GET",
        headers: {},
        redirect: "follow",
    };

    fetch("/api/get_template", requestOptions)
        .then((response) => response.text())
        .then((_result) => {
            product = JSON.parse(_result);
            console.log(product);
            if (product.front_image)
                setImage(product.front_image, "canvas_front");
            if (product.back_image) setImage(product.back_image, "canvas_back");

            if (product.left_image)
                setImage(product.left_image, "canvas_sleeve_left");

            if (product.right_image)
                setImage(product.right_image, "canvas_sleeve_right");
        })
        .catch((error) => console.log("error", error));
}

function removeObject() {
    canvas.remove(canvas.getActiveObject());
}

function setSelectedObject(obj) {
    selectedObject = obj;
    const el = getEl("editables");
    const deleteBtn = `<button   class="p-2 px-3 w-[200px] bg-red-500 text-white border rounded-lg"   onclick="removeObject()"  oninput="removeObject()" >Delete</button>`;
    let innerHTML = "";
    if (selectedObject) {
        innerHTML += deleteBtn;

        if (
            selectedObject.type === "textbox"
            // selectedObject.type === "line" ||
            // selectedObject.type === "circle" ||
            // selectedObject.type === "triangle" ||
            // selectedObject.type === "rect"
        ) {
            const fill = selectedObject.fill;
            innerHTML += `  <input   type="color"   id="colorpicker"   value="${fill}"   onchange="setTextColour()" />`;
        }
        if (selectedObject && selectedObject.type === "textbox") {
            // console.log("selectedObject.fontStyle", selectedObject.fontStyle);
            const isBold = selectedObject.fontWeight === "bold";
            const fontFamily = selectedObject.fontFamily;
            const isItalic = selectedObject.fontStyle === "italic";
            const underline = selectedObject.underline;
            const linethrough = selectedObject.linethrough;
            const overline = selectedObject.overline;
            innerHTML += `<label for="font-family" style="display: inline-block">
          Font family:
        </label>
        <select
          id="font-family"
          class="w-[130px] border"
          onchange="seFontFamily()"
        >
          <option value="arial" ${
              fontFamily === "arial" && "selected"
          }>Arial</option>
          <option value="Pacifico" ${
              fontFamily === "Pacifico" && "selected"
          }>Pacifico</option>
          <option value="helvetica" ${
              fontFamily === "helvetica" && "selected"
          }>Helvetica</option>
          <option value="myriad pro" ${
              fontFamily === "myriad pro" && "selected"
          }>Myriad Pro</option>
          <option value="verdana" ${
              fontFamily === "verdana" && "selected"
          }>Verdana</option>
          <option value="georgia" ${
              fontFamily === "georgia" && "selected"
          }>Georgia</option>
          <option value="courier" ${
              fontFamily === "courier" && "selected"
          }>Courier</option>
          <option value="comic sans ms" ${
              fontFamily === "comic sans ms" && "selected"
          }>Comic Sans MS</option>
          <option value="impact" ${
              fontFamily === "impact" && "selected"
          }>Impact</option>
          <option value="monaco" ${
              fontFamily === "monaco" && "selected"
          }>Monaco</option>
          <option value="optima" ${
              fontFamily === "optima" && "selected"
          }>Optima</option>
          <option value="hoefler text"  ${
              fontFamily === "hoefler text" && "selected"
          }>Hoefler Text</option>
          <option value="engagement" ${
              fontFamily === "engagement" && "selected"
          }>Engagement</option>
        </select>
        <label for="font-style" style="display: inline-block">
          Font style:
        </label>
        <div id="text-controls-additional" class="flex gap-2">
          <input
            type="checkbox"
            name="fonttype"
            id="text-bold"
            onclick="textBold()"
            ${isBold && "checked"}
            />
            Bold
            <input
            type="checkbox"
            name="fonttype"
            id="text-italic"
            onclick="textItalic()"
            ${isItalic && "checked"}
            />
            Italic
            <input
            type="checkbox"
            name="fonttype"
            id="text-underline"
            onclick="textUnderline()"
            ${underline && "checked"}
            />
            Underline
            <input
            type="checkbox"
            name="fonttype"
            id="text-linethrough"
            onclick="textLinethrough()"
            ${linethrough && "checked"}
            />
            Linethrough
            <input
            type="checkbox"
            name="fonttype"
            id="text-overline"
            onclick="textOverline()"
            ${overline && "checked"}
          />
          Overline
        </div>
      `;
        }
    }
    el.innerHTML = innerHTML;
}
function cleanForSelection() {
    getEl("canvasBg").remove();
}

function setSelected(selected) {
    cleanForSelection();
    let img;
    if (selected === 1) {
        img = ` <img   src="https://files.cdn.printful.com/m/ec1000/medium/onman/front/05_ec1000_onman_front_base_whitebg.png?v=1675420344"   height="500px"   style="position: absolute; height: 500px; width: 500px"   alt=""   id="canvasBg" />`;
        getEl("text-controls-additional").hidden = false;
    } else if (selected === 2) {
        img = ` <img    src="./../../poster.jpg"    style="position: absolute;top: 35px; left: 100px;height: 330px;width: 330px"    alt=""    id="canvasBg"  />`;
    } else if (selected === 3) {
        img = ` <img src="./../../signage.jpg" height="500px" style="position: absolute;left: 120px;top: 8px;height: 435px;width: 300px" alt="" id="canvasBg" />`;
    }
    if (selected !== 1) {
        //getEl("text-controls-additional").hidden = true;
    }
    const canvasBgImage = getEl("canvasBgImage");
    canvasBgImage.innerHTML += img;
}

function getEl(id) {
    return document.getElementById(id);
}

function addLine() {
    canvas.add(
        new fabric.Line([100, 100, 200, 200], {
            left: 80,
            top: 80,
            stroke: "red",
        })
    );
}
function addRect() {
    var rect = new fabric.Rect({
        left: 80,
        top: 80,
        fill: "red",
        width: 20,
        height: 20,
    });

    canvas.add(rect);
}

function addCircle() {
    var circle = new fabric.Circle({
        radius: 20,
        fill: "red",
        left: 100,
        top: 100,
    });

    canvas.add(circle);
}
function addTriangle() {
    var triangle = new fabric.Triangle({
        width: 20,
        height: 30,
        fill: "red",
        left: 50,
        top: 50,
    });

    canvas.add(triangle);
}

function setShowModal(bool) {
    const el = getEl("modal");
    el.style.display = bool ? "" : "none";
    el.hidden = !bool;
}
function setShowPaymentModal(bool) {
    const el = getEl("payment-modal");
    el.style.display = bool ? "" : "none";
    el.hidden = !bool;
}
function setIsLoading(bool) {
    const el = getEl("loader");
    el.style.display = bool ? "" : "none";
}
function submitImgUrl() {
    const el = getEl("imgUrl");
    console.log(el.value);
    addImage(el.value);
}

function addImage(imgUrl) {
    // const imgUrl =
    //   "https://cloudfour.com/examples/img-currentsrc/images/kitten-small.png";

    fabric.Image.fromURL(
        imgUrl,
        function (oImg) {
            if (oImg._element == null) {
                alert(
                    "Cant access the file! Please download the image and upload it from local storage"
                );
                // Toastify({
                //     text: "Please download the image and upload it from local storage",
                //     style: {
                //         background: "red",
                //     },
                // }).showToast();
                return;
            }
            oImg.scale(0.5);
            canvas.add(oImg);
        },
        { crossOrigin: "Anonymous" }
    );
    setShowModal(false);
}
function addObjectImage(imgUrl) {
    // const imgUrl =
    //   "https://cloudfour.com/examples/img-currentsrc/images/kitten-small.png";

    // let url = $("#site_url").val();
    // imgUrl = url + "/objects/" + imgUrl;
    fabric.loadSVGFromURL(
        imgUrl,
        function (objects, options) {
            var svgData = fabric.util.groupSVGElements(objects, options);
            svgData.top = 30;
            svgData.left = 30;
            svgData.scaleToWidth(100);
            svgData.scaleToHeight(100);
            canvas.add(svgData);
        }
        // { crossOrigin: "Anonymous" }
    );
    setShowModal(false);
}

function addText(text) {
    text = text ? text : "Sample_Text";
    var text = new fabric.Textbox(text, {
        width: 50,
        fontSize: 30,
        fontFamily: "arial",
    });
    canvas.add(text);
}
function setTextColour() {
    if (selectedObject) {
        const c = getEl("colorpicker").value;
        console.log(selectedObject);

        selectedObject.set("fill", c);
        canvas.renderAll();
    }
}
function seFontFamily() {
    const fontFamily = getEl("font-family").value;
    console.log("seFontFamily", selectedObject.set, fontFamily);
    if (selectedObject) {
        // console.log(selectedObject);
        selectedObject.set("fontFamily", fontFamily);
        canvas.renderAll();
    }
}

function textBold() {
    const checked = getEl("text-bold").checked;
    if (checked) selectedObject.set("fontWeight", "bold");
    else selectedObject.set("fontWeight", "normal");
    canvas.renderAll();
}
function textItalic() {
    const checked = getEl("text-italic").checked;
    if (checked) selectedObject.set("fontStyle", "italic");
    else selectedObject.set("fontStyle", "");
    canvas.renderAll();
}
function textUnderline() {
    const checked = getEl("text-underline").checked;
    if (checked) selectedObject.set("underline", true);
    else selectedObject.set("underline", false);
    canvas.renderAll();
}
function textLinethrough() {
    const checked = getEl("text-linethrough").checked;
    if (checked) selectedObject.set("linethrough", true);
    else selectedObject.set("linethrough", false);
    canvas.renderAll();
}
function textOverline() {
    const checked = getEl("text-overline").checked;
    if (checked) selectedObject.set("overline", true);
    else selectedObject.set("overline", false);
    canvas.renderAll();
}

async function placeOrder() {
    try {
        if (productType === productTypes.t_shirt) {
            const images = {};
            images.canvas_front = canvases.canvas_front.getObjects().length
                ? await htmltoCanvas(canvases.canvas_front)
                : undefined;
            images.canvas_back = canvases.canvas_back.getObjects().length
                ? await htmltoCanvas(canvases.canvas_back)
                : undefined;
            images.canvas_sleeve_left = canvases.canvas_sleeve_left.getObjects()
                .length
                ? await htmltoCanvas(canvases.canvas_sleeve_left)
                : undefined;
            images.canvas_sleeve_right =
                canvases.canvas_sleeve_right.getObjects().length
                    ? await htmltoCanvas(canvases.canvas_sleeve_right)
                    : undefined;

            const files = Object.keys(canvases)
                .map((key) => ({
                    url: images[key],
                    thumbnail_url: images[key],
                    type: key.replace("canvas_", ""),
                }))
                .filter((v) => v.thumbnail_url);
            console.log(files);
            createProduct(files);
        }
    } catch (error) {
        console.error(error);
    }
}

function htmltoCanvas(canvas) {
    return new Promise((resolve, reject) => {
        console.log("Canvas Objects: ");
        // canvas.getObjects().forEach((element, i) => {
        //     console.log(i, element);
        // });

        (obj) => obj.name === "test";
        // html2canvas(document.getElementById("canvasParent")).then((canvas) => {
        let dt = canvas.toDataURL({
            format: "png",
            multiplier: 5,
            // quality: 0.1,
            // width: 200,
            // height: 200,
        });

        // console.log(dt, "canvas.toDataURL");
        // dt = dt.replace(/^data:image\/[^;]*/, "data:application/octet-stream");
        // dt = dt.replace(
        //     /^data:application\/octet-stream/,
        //     "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png"
        // );

        // let a = document.createElement("a");
        // a.href = dt;
        // a.download = "canvas.png";
        // a.click();

        fetch(dt).then((base64Response) => {
            base64Response.blob().then((file) => {
                var formdata = new FormData();
                formdata.append("file", file, "test.jpg");

                var requestOptions = {
                    method: "POST",
                    body: formdata,
                    redirect: "follow",
                };
                Toastify({
                    text: "Uploading Image...",
                    className: "warn",
                }).showToast();
                setIsLoading(true);

                let url =
                    (window.location.hostname.includes("127.0.0.1")
                        ? "http://"
                        : "https://") +
                    window.location.hostname +
                    (window.location.hostname.includes("127.0.0.1")
                        ? ":8000"
                        : "") +
                    "/api/file";
                fetch(url, requestOptions)
                    .then((response) => response.text())
                    .then((result) => {
                        console.log("imageURL", result);
                        resolve(result);
                    })
                    .catch((error) => {
                        console.log("error", error);
                        reject(error);
                    });
            });
        });
    });

    // });
}

getEl("image-picker").onchange = function onImagePikked(e) {
    if (!e.target.files?.length) return;
    console.log(e.target.files[0]);
    addImageFromFile(e);
};
function addImageFromFile(e) {
    if (!e.target.files?.length) return;
    if (!fabric) return;
    var reader = new FileReader();
    reader.onload = function (event) {
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            var image = new fabric.Image(imgObj);
            // image.set({
            //   // angle: 0,
            //   // padding: 10,
            //   // cornersize: 10,
            //   // height: 110,
            //   // width: 110,
            //   scaleX: 0.1,
            //   scaleY: 0.1,
            // });
            canvas.centerObject(image);
            canvas.add(image);
            canvas.renderAll();
        };
    };
    reader.readAsDataURL(e.target.files[0]);
}

function calculateShippingRate() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "POST",
        body: "{}",
        headers: myHeaders,
        redirect: "follow",
    };
    fetch("/api/calculateShippingRate", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const data = JSON.parse(result);
            console.log(
                `Shipping Rate:  ${data.result[0].name} : ${data.result[0].rate}`
            );
        })
        .catch((error) => console.log("error", error));
}

function createProduct(files) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const product = JSON.stringify({
        sync_product: { name: "test", thumbnail: files[0].url },
        sync_variants: [
            {
                files,
                variant_id: selected_variant,
                retail_price: "20",
                currency: "USD",
                // color: selected,
            },
        ],
    });
    var requestOptions = {
        method: "POST",
        body: JSON.stringify({ jsonString: product }),
        headers: myHeaders,
        redirect: "follow",
    };
    fetch("/api/createProduct", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const data = JSON.parse(result);
            console.log("createProduct", data);
            getProduct(data.result.id);
            Toastify({
                text: "Product Created!",
                className: "info",
            }).showToast();
        })
        .catch((error) => {
            console.log("error", error);
            setIsLoading(false);
        });
}
function getProduct(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: myHeaders,
        redirect: "follow",
    };
    fetch("/api/getProduct", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log("getProduct", JSON.parse(result));
            createOrder(JSON.parse(result));
        })
        .catch((error) => console.log("error", error));
}

function createOrder(product) {
    calculateShippingRate();

    var jsonString = JSON.stringify({
        ...sampleOrderData,
        items: product.result.sync_variants,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "POST",
        body: JSON.stringify({ jsonString }),
        headers: myHeaders,
        redirect: "follow",
    };
    fetch("/api/createOrder", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            order = JSON.parse(result);
            console.log("createOrder", order);

            setShowPaymentModal(true);
            setTimeout(() => {
                setCost();
            }, 500);
            setIsLoading(false);
            Toastify({
                text: "Order Created",
                className: "success",
            }).showToast();
        })
        .catch((error) => {
            console.log("error", error);
            setIsLoading(false);
        });
}

function setCost() {
    getEl(
        "subtotal"
    ).innerHTML = `Subtotal: $${order.result.retail_costs.subtotal}`;
    getEl(
        "shipping"
    ).innerHTML = `Shipping: $${order.result.retail_costs.shipping}`;
    getEl("total").innerHTML = `Total: $${order.result.retail_costs.total}`;
}

function setProductColour(colourCode) {
    console.log(colourCode);
    const productDiv = getEl("canvasBgImage");
    productDiv.style.backgroundColor = colourCode;

    const productThumbnails = getEl("product-thumbnails").children;
    for (let i = 0; i < productThumbnails.length; i++) {
        productThumbnails[i].style.backgroundColor = colourCode;
    }
}

function submitPayment() {
    const formData = {
        name: getEl("payment-modal-name").value,
        email: getEl("payment-modal-email").value,
        phone: getEl("payment-modal-phone").value,
        address: getEl("payment-modal-address").value,
        card: getEl("payment-modal-card").value,
        year: getEl("payment-modal-year").value,
        month: getEl("payment-modal-month").value,
        cvc: getEl("payment-modal-cvc").value,
    };

    console.log(formData);
    const updateData = {
        recipient: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address1: formData.address,
        },
    };

    var jsonString = JSON.stringify(updateData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "POST",
        body: JSON.stringify({ jsonString }),
        headers: myHeaders,
        redirect: "follow",
    };
    setIsLoading(true);
    fetch(
        // `http://localhost:8000/api/updateOrder/99416078`,
        `/api/updateOrder/${order.result.id}`,
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => {
            order = JSON.parse(result);
            console.log("Submit Payment", order);
            setIsLoading(false);
            Toastify({
                text: "Payment Success!",
                className: "success",
            }).showToast();
            setShowPaymentModal(false);
        })
        .catch((error) => {
            console.log("error", error);
            setIsLoading(false);
        });
}

const sampleOrderData = {
    shipping: "STANDARD",
    recipient: {
        name: "John Smith",
        company: "John Smith Inc",
        address1: "Mr John Smith. 132, My Street, Kingston, New York 12401",
        address2: "string",
        city: "New York",
        state_code: "NY",
        state_name: "New York",
        country_code: "US",
        country_name: "United States",
        zip: "12401",
        phone: "9090909090",
        email: "test@gmail.com",
    },
    items: [
        {
            id: 4158580919,
            external_id: "655c5518866953",
            sync_product_id: 327738717,
            name: "test - 18″×24″",
            synced: true,
            variant_id: 1,
            main_category_id: 55,
            warehouse_product_variant_id: null,
            retail_price: null,
            sku: null,
            currency: "USD",
            options: [],
            quantity: 1,
            price: "13.00",
            product: {
                variant_id: 1,
                product_id: 1,
                image: "https://files.cdn.printful.com/products/1/1_1527683474.jpg",
                name: "Enhanced Matte Paper Poster 18″×24″",
            },
            files: [
                {
                    id: 639790705,
                    type: "default",
                    hash: "7980a4057ebcfe4df05850e60ca32307",
                    url: "https://img.photographyblog.com/reviews/kodak_pixpro_fz201/photos/kodak_pixpro_fz201_01.jpg",
                    filename: "kodak_pixpro_fz201_01.jpg",
                    mime_type: "image/jpeg",
                    size: 4273221,
                    width: 4608,
                    height: 3456,
                    dpi: 72,
                    status: "ok",
                    created: 1700548905,
                    thumbnail_url:
                        "https://files.cdn.printful.com/files/798/7980a4057ebcfe4df05850e60ca32307_thumb.png",
                    preview_url:
                        "https://files.cdn.printful.com/files/798/7980a4057ebcfe4df05850e60ca32307_preview.png",
                    visible: true,
                    is_temporary: false,
                    stitch_count_tier: null,
                },
                {
                    id: 639793848,
                    type: "preview",
                    hash: "71221e908e9e26d50d3c888a6f246e43",
                    url: null,
                    filename:
                        "enhanced-matte-paper-poster-(in)-18x24-front-655c551c796fc.png",
                    mime_type: "image/png",
                    size: 577217,
                    width: 1000,
                    height: 1000,
                    dpi: null,
                    status: "ok",
                    created: 1700549917,
                    thumbnail_url:
                        "https://files.cdn.printful.com/files/712/71221e908e9e26d50d3c888a6f246e43_thumb.png",
                    preview_url:
                        "https://files.cdn.printful.com/files/712/71221e908e9e26d50d3c888a6f246e43_preview.png",
                    visible: false,
                    is_temporary: false,
                    stitch_count_tier: null,
                },
            ],
            discontinued: true,
            out_of_stock: true,
        },
    ],
    retail_costs: {
        currency: "USD",
        subtotal: "10.00",
        discount: "0.00",
        shipping: "5.00",
        tax: "0.00",
    },
    gift: {
        subject: "To John",
        message: "Have a nice day",
    },
    packing_slip: {},
};

const product_variants = [
    {
        id: 11546,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Black / S)",
        size: "S",
        color: "Black",
        color_code: "#141313",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11546_1642678249.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11546",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11546/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11546/images",
            },
        },
    },
    {
        id: 11547,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Black / M)",
        size: "M",
        color: "Black",
        color_code: "#141313",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11547_1642678240.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11547",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11547/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11547/images",
            },
        },
    },
    {
        id: 11548,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Black / L)",
        size: "L",
        color: "Black",
        color_code: "#141313",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11548_1642678239.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11548",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11548/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11548/images",
            },
        },
    },
    {
        id: 11549,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Black / XL)",
        size: "XL",
        color: "Black",
        color_code: "#141313",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11549_1642678249.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11549",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11549/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11549/images",
            },
        },
    },
    {
        id: 11550,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Black / 2XL)",
        size: "2XL",
        color: "Black",
        color_code: "#141313",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11550_1642678229.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11550",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11550/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11550/images",
            },
        },
    },
    {
        id: 11556,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Natural / S)",
        size: "S",
        color: "Natural",
        color_code: "#e8dacd",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11556_1642678321.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11556",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11556/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11556/images",
            },
        },
    },
    {
        id: 11557,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Natural / M)",
        size: "M",
        color: "Natural",
        color_code: "#e8dacd",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11557_1642678312.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11557",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11557/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11557/images",
            },
        },
    },
    {
        id: 11558,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Natural / L)",
        size: "L",
        color: "Natural",
        color_code: "#e8dacd",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11558_1642678301.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11558",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11558/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11558/images",
            },
        },
    },
    {
        id: 11559,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Natural / XL)",
        size: "XL",
        color: "Natural",
        color_code: "#e8dacd",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11559_1642678321.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11559",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11559/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11559/images",
            },
        },
    },
    {
        id: 11560,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Natural / 2XL)",
        size: "2XL",
        color: "Natural",
        color_code: "#e8dacd",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11560_1642678300.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11560",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11560/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11560/images",
            },
        },
    },
    {
        id: 11561,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Navy / S)",
        size: "S",
        color: "Navy",
        color_code: "#1a2330",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11561_1642678343.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11561",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11561/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11561/images",
            },
        },
    },
    {
        id: 11562,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Navy / M)",
        size: "M",
        color: "Navy",
        color_code: "#1a2330",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11562_1642678342.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11562",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11562/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11562/images",
            },
        },
    },
    {
        id: 11563,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Navy / L)",
        size: "L",
        color: "Navy",
        color_code: "#1a2330",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11563_1642678342.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11563",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11563/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11563/images",
            },
        },
    },
    {
        id: 11564,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Navy / XL)",
        size: "XL",
        color: "Navy",
        color_code: "#1a2330",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11564_1642678353.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11564",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11564/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11564/images",
            },
        },
    },
    {
        id: 11565,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Navy / 2XL)",
        size: "2XL",
        color: "Navy",
        color_code: "#1a2330",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11565_1642678321.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11565",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11565/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11565/images",
            },
        },
    },
    {
        id: 11566,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Red / S)",
        size: "S",
        color: "Red",
        color_code: "#d80019",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11566_1642678363.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11566",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11566/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11566/images",
            },
        },
    },
    {
        id: 11567,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Red / M)",
        size: "M",
        color: "Red",
        color_code: "#d80019",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11567_1642678363.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11567",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11567/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11567/images",
            },
        },
    },
    {
        id: 11568,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Red / L)",
        size: "L",
        color: "Red",
        color_code: "#d80019",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11568_1642678354.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11568",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11568/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11568/images",
            },
        },
    },
    {
        id: 11569,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Red / XL)",
        size: "XL",
        color: "Red",
        color_code: "#d80019",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11569_1642678363.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11569",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11569/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11569/images",
            },
        },
    },
    {
        id: 11570,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Red / 2XL)",
        size: "2XL",
        color: "Red",
        color_code: "#d80019",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11570_1642678353.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11570",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11570/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11570/images",
            },
        },
    },
    {
        id: 11571,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sport Grey / S)",
        size: "S",
        color: "Sport Grey",
        color_code: "#c4c0be",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11571_1642678426.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "stocked_on_demand",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11571",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11571/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11571/images",
            },
        },
    },
    {
        id: 11572,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sport Grey / M)",
        size: "M",
        color: "Sport Grey",
        color_code: "#c4c0be",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11572_1642678426.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11572",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11572/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11572/images",
            },
        },
    },
    {
        id: 11573,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sport Grey / L)",
        size: "L",
        color: "Sport Grey",
        color_code: "#c4c0be",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11573_1642678415.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11573",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11573/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11573/images",
            },
        },
    },
    {
        id: 11574,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sport Grey / XL)",
        size: "XL",
        color: "Sport Grey",
        color_code: "#c4c0be",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11574_1642678426.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11574",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11574/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11574/images",
            },
        },
    },
    {
        id: 11575,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sport Grey / 2XL)",
        size: "2XL",
        color: "Sport Grey",
        color_code: "#c4c0be",
        color_code2: "",
        image: "https://files.cdn.printful.com/products/438/11575_1642678405.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "stocked_on_demand",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11575",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11575/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11575/images",
            },
        },
    },
    {
        id: 11576,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (White / S)",
        size: "S",
        color: "White",
        color_code: "#fffefa",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11576_1693310991.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11576",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11576/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11576/images",
            },
        },
    },
    {
        id: 11577,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (White / M)",
        size: "M",
        color: "White",
        color_code: "#fffefa",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11577_1693310981.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11577",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11577/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11577/images",
            },
        },
    },
    {
        id: 11578,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (White / L)",
        size: "L",
        color: "White",
        color_code: "#fffefa",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11578_1693310980.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11578",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11578/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11578/images",
            },
        },
    },
    {
        id: 11579,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (White / XL)",
        size: "XL",
        color: "White",
        color_code: "#fffefa",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11579_1693310991.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11579",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11579/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11579/images",
            },
        },
    },
    {
        id: 11580,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (White / 2XL)",
        size: "2XL",
        color: "White",
        color_code: "#fffefa",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/11580_1693310960.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Spain",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/11580",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/11580/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/11580/images",
            },
        },
    },
    {
        id: 12634,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Maroon / S)",
        size: "S",
        color: "Maroon",
        color_code: "#47001b",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12634_1642678290.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12634",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12634/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12634/images",
            },
        },
    },
    {
        id: 12635,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Maroon / M)",
        size: "M",
        color: "Maroon",
        color_code: "#47001b",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12635_1642678290.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12635",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12635/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12635/images",
            },
        },
    },
    {
        id: 12636,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Maroon / L)",
        size: "L",
        color: "Maroon",
        color_code: "#47001b",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12636_1642678282.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12636",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12636/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12636/images",
            },
        },
    },
    {
        id: 12637,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Maroon / XL)",
        size: "XL",
        color: "Maroon",
        color_code: "#47001b",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12637_1642678290.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12637",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12637/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12637/images",
            },
        },
    },
    {
        id: 12638,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Maroon / 2XL)",
        size: "2XL",
        color: "Maroon",
        color_code: "#47001b",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12638_1642678271.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12638",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12638/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12638/images",
            },
        },
    },
    {
        id: 12639,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sand / S)",
        size: "S",
        color: "Sand",
        color_code: "#d6c0ab",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12639_1642678384.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12639",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12639/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12639/images",
            },
        },
    },
    {
        id: 12640,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sand / M)",
        size: "M",
        color: "Sand",
        color_code: "#d6c0ab",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12640_1642678384.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12640",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12640/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12640/images",
            },
        },
    },
    {
        id: 12641,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sand / L)",
        size: "L",
        color: "Sand",
        color_code: "#d6c0ab",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12641_1642678374.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12641",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12641/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12641/images",
            },
        },
    },
    {
        id: 12642,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sand / XL)",
        size: "XL",
        color: "Sand",
        color_code: "#d6c0ab",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12642_1642678384.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12642",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12642/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12642/images",
            },
        },
    },
    {
        id: 12643,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sand / 2XL)",
        size: "2XL",
        color: "Sand",
        color_code: "#d6c0ab",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12643_1642678374.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12643",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12643/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12643/images",
            },
        },
    },
    {
        id: 12644,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Black / 3XL)",
        size: "3XL",
        color: "Black",
        color_code: "#141313",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12644_1642678228.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12644",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12644/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12644/images",
            },
        },
    },
    {
        id: 12645,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Black / 4XL)",
        size: "4XL",
        color: "Black",
        color_code: "#141313",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12645_1642678228.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12645",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12645/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12645/images",
            },
        },
    },
    {
        id: 12646,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Black / 5XL)",
        size: "5XL",
        color: "Black",
        color_code: "#141313",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12646_1642678239.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12646",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12646/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12646/images",
            },
        },
    },
    {
        id: 12647,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sport Grey / 3XL)",
        size: "3XL",
        color: "Sport Grey",
        color_code: "#c4c0be",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12647_1642678405.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12647",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12647/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12647/images",
            },
        },
    },
    {
        id: 12648,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sport Grey / 4XL)",
        size: "4XL",
        color: "Sport Grey",
        color_code: "#c4c0be",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12648_1642678415.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12648",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12648/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12648/images",
            },
        },
    },
    {
        id: 12649,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sport Grey / 5XL)",
        size: "5XL",
        color: "Sport Grey",
        color_code: "#c4c0be",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12649_1642678415.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12649",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12649/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12649/images",
            },
        },
    },
    {
        id: 12650,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (White / 3XL)",
        size: "3XL",
        color: "White",
        color_code: "#fffefa",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12650_1693310970.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12650",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12650/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12650/images",
            },
        },
    },
    {
        id: 12651,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (White / 4XL)",
        size: "4XL",
        color: "White",
        color_code: "#fffefa",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12651_1693310980.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12651",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12651/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12651/images",
            },
        },
    },
    {
        id: 12652,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (White / 5XL)",
        size: "5XL",
        color: "White",
        color_code: "#fffefa",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12652_1693310980.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12652",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12652/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12652/images",
            },
        },
    },
    {
        id: 12653,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Navy / 3XL)",
        size: "3XL",
        color: "Navy",
        color_code: "#1a2330",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12653_1642678332.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "Canada",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12653",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12653/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12653/images",
            },
        },
    },
    {
        id: 12668,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Navy / 4XL)",
        size: "4XL",
        color: "Navy",
        color_code: "#1a2330",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12668_1642678332.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12668",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12668/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12668/images",
            },
        },
    },
    {
        id: 12669,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Navy / 5XL)",
        size: "5XL",
        color: "Navy",
        color_code: "#1a2330",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/12669_1642678332.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Australia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/12669",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/12669/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/12669/images",
            },
        },
    },
    {
        id: 14965,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Orange / S)",
        size: "S",
        color: "Orange",
        color_code: "#ff5f2e",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14965_1652249527.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14965",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14965/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14965/images",
            },
        },
    },
    {
        id: 14966,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Orange / M)",
        size: "M",
        color: "Orange",
        color_code: "#ff5f2e",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14966_1652249527.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14966",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14966/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14966/images",
            },
        },
    },
    {
        id: 14967,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Orange / L)",
        size: "L",
        color: "Orange",
        color_code: "#ff5f2e",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14967_1652249527.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14967",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14967/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14967/images",
            },
        },
    },
    {
        id: 14968,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Orange / XL)",
        size: "XL",
        color: "Orange",
        color_code: "#ff5f2e",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14968_1652249538.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14968",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14968/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14968/images",
            },
        },
    },
    {
        id: 14969,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Orange / 2XL)",
        size: "2XL",
        color: "Orange",
        color_code: "#ff5f2e",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14969_1652249514.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14969",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14969/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14969/images",
            },
        },
    },
    {
        id: 14970,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Orange / 3XL)",
        size: "3XL",
        color: "Orange",
        color_code: "#ff5f2e",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14970_1652249516.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14970",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14970/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14970/images",
            },
        },
    },
    {
        id: 14971,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Orange / 4XL)",
        size: "4XL",
        color: "Orange",
        color_code: "#ff5f2e",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14971_1652249516.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14971",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14971/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14971/images",
            },
        },
    },
    {
        id: 14972,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Orange / 5XL)",
        size: "5XL",
        color: "Orange",
        color_code: "#ff5f2e",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14972_1652249516.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14972",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14972/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14972/images",
            },
        },
    },
    {
        id: 14973,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Ash / S)",
        size: "S",
        color: "Ash",
        color_code: "#f3f3f3",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14973_1652249482.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14973",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14973/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14973/images",
            },
        },
    },
    {
        id: 14974,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Ash / M)",
        size: "M",
        color: "Ash",
        color_code: "#f3f3f3",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14974_1652249482.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14974",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14974/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14974/images",
            },
        },
    },
    {
        id: 14975,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Ash / L)",
        size: "L",
        color: "Ash",
        color_code: "#f3f3f3",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14975_1652249475.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14975",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14975/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14975/images",
            },
        },
    },
    {
        id: 14976,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Ash / XL)",
        size: "XL",
        color: "Ash",
        color_code: "#f3f3f3",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14976_1652249487.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14976",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14976/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14976/images",
            },
        },
    },
    {
        id: 14977,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Ash / 2XL)",
        size: "2XL",
        color: "Ash",
        color_code: "#f3f3f3",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14977_1652249461.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14977",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14977/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14977/images",
            },
        },
    },
    {
        id: 14978,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Ash / 3XL)",
        size: "3XL",
        color: "Ash",
        color_code: "#f3f3f3",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14978_1652249464.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14978",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14978/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14978/images",
            },
        },
    },
    {
        id: 14979,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Ash / 4XL)",
        size: "4XL",
        color: "Ash",
        color_code: "#f3f3f3",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14979_1652249467.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14979",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14979/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14979/images",
            },
        },
    },
    {
        id: 14980,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Ash / 5XL)",
        size: "5XL",
        color: "Ash",
        color_code: "#f3f3f3",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14980_1652249471.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14980",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14980/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14980/images",
            },
        },
    },
    {
        id: 14981,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sky / S)",
        size: "S",
        color: "Sky",
        color_code: "#8ee0ff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14981_1652249559.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14981",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14981/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14981/images",
            },
        },
    },
    {
        id: 14982,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sky / M)",
        size: "M",
        color: "Sky",
        color_code: "#8ee0ff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14982_1652249559.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14982",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14982/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14982/images",
            },
        },
    },
    {
        id: 14983,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sky / L)",
        size: "L",
        color: "Sky",
        color_code: "#8ee0ff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14983_1652249552.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14983",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14983/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14983/images",
            },
        },
    },
    {
        id: 14984,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sky / XL)",
        size: "XL",
        color: "Sky",
        color_code: "#8ee0ff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14984_1652249563.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14984",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14984/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14984/images",
            },
        },
    },
    {
        id: 14985,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sky / 2XL)",
        size: "2XL",
        color: "Sky",
        color_code: "#8ee0ff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14985_1652249538.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14985",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14985/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14985/images",
            },
        },
    },
    {
        id: 14986,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sky / 3XL)",
        size: "3XL",
        color: "Sky",
        color_code: "#8ee0ff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14986_1652249548.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14986",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14986/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14986/images",
            },
        },
    },
    {
        id: 14987,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sky / 4XL)",
        size: "4XL",
        color: "Sky",
        color_code: "#8ee0ff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14987_1652249548.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14987",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14987/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14987/images",
            },
        },
    },
    {
        id: 14988,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sky / 5XL)",
        size: "5XL",
        color: "Sky",
        color_code: "#8ee0ff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/14988_1652249548.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/14988",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/14988/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/14988/images",
            },
        },
    },
    {
        id: 15807,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Brown Savana / S)",
        size: "S",
        color: "Brown Savana",
        color_code: "#9f8971",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15807_1661693873.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15807",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15807/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15807/images",
            },
        },
    },
    {
        id: 15808,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Brown Savana / M)",
        size: "M",
        color: "Brown Savana",
        color_code: "#9f8971",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15808_1661693873.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15808",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15808/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15808/images",
            },
        },
    },
    {
        id: 15809,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Brown Savana / L)",
        size: "L",
        color: "Brown Savana",
        color_code: "#9f8971",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15809_1661693873.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15809",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15809/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15809/images",
            },
        },
    },
    {
        id: 15810,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Brown Savana / XL)",
        size: "XL",
        color: "Brown Savana",
        color_code: "#9f8971",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15810_1661693873.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15810",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15810/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15810/images",
            },
        },
    },
    {
        id: 15811,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Brown Savana / 2XL)",
        size: "2XL",
        color: "Brown Savana",
        color_code: "#9f8971",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15811_1661693863.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15811",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15811/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15811/images",
            },
        },
    },
    {
        id: 15812,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Brown Savana / 3XL)",
        size: "3XL",
        color: "Brown Savana",
        color_code: "#9f8971",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15812_1661693863.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15812",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15812/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15812/images",
            },
        },
    },
    {
        id: 15813,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Azalea / S)",
        size: "S",
        color: "Azalea",
        color_code: "#ff98c6",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15813_1661693863.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15813",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15813/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15813/images",
            },
        },
    },
    {
        id: 15814,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Azalea / M)",
        size: "M",
        color: "Azalea",
        color_code: "#ff98c6",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15814_1661693852.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15814",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15814/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15814/images",
            },
        },
    },
    {
        id: 15815,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Azalea / L)",
        size: "L",
        color: "Azalea",
        color_code: "#ff98c6",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15815_1661693852.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15815",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15815/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15815/images",
            },
        },
    },
    {
        id: 15816,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Azalea / XL)",
        size: "XL",
        color: "Azalea",
        color_code: "#ff98c6",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15816_1661693863.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15816",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15816/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15816/images",
            },
        },
    },
    {
        id: 15817,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Azalea / 2XL)",
        size: "2XL",
        color: "Azalea",
        color_code: "#ff98c6",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15817_1661693852.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15817",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15817/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15817/images",
            },
        },
    },
    {
        id: 15818,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Azalea / 3XL)",
        size: "3XL",
        color: "Azalea",
        color_code: "#ff98c6",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15818_1661693852.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15818",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15818/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15818/images",
            },
        },
    },
    {
        id: 15819,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Cardinal / S)",
        size: "S",
        color: "Cardinal",
        color_code: "#c21b3a",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15819_1661693884.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15819",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15819/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15819/images",
            },
        },
    },
    {
        id: 15820,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Cardinal / M)",
        size: "M",
        color: "Cardinal",
        color_code: "#c21b3a",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15820_1661693884.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15820",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15820/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15820/images",
            },
        },
    },
    {
        id: 15821,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Cardinal / L)",
        size: "L",
        color: "Cardinal",
        color_code: "#c21b3a",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15821_1661693884.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15821",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15821/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15821/images",
            },
        },
    },
    {
        id: 15822,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Cardinal / XL)",
        size: "XL",
        color: "Cardinal",
        color_code: "#c21b3a",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15822_1661693884.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15822",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15822/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15822/images",
            },
        },
    },
    {
        id: 15823,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Cardinal / 2XL)",
        size: "2XL",
        color: "Cardinal",
        color_code: "#c21b3a",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15823_1661693873.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15823",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15823/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15823/images",
            },
        },
    },
    {
        id: 15824,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Cardinal / 3XL)",
        size: "3XL",
        color: "Cardinal",
        color_code: "#c21b3a",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15824_1661693884.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15824",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15824/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15824/images",
            },
        },
    },
    {
        id: 15825,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Carolina Blue / S)",
        size: "S",
        color: "Carolina Blue",
        color_code: "#96bbff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15825_1661693894.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15825",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15825/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15825/images",
            },
        },
    },
    {
        id: 15826,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Carolina Blue / M)",
        size: "M",
        color: "Carolina Blue",
        color_code: "#96bbff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15826_1661693894.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15826",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15826/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15826/images",
            },
        },
    },
    {
        id: 15827,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Carolina Blue / L)",
        size: "L",
        color: "Carolina Blue",
        color_code: "#96bbff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15827_1661693894.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15827",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15827/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15827/images",
            },
        },
    },
    {
        id: 15828,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Carolina Blue / XL)",
        size: "XL",
        color: "Carolina Blue",
        color_code: "#96bbff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15828_1661693905.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15828",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15828/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15828/images",
            },
        },
    },
    {
        id: 15829,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Carolina Blue / 2XL)",
        size: "2XL",
        color: "Carolina Blue",
        color_code: "#96bbff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15829_1661693894.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15829",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15829/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15829/images",
            },
        },
    },
    {
        id: 15830,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Carolina Blue / 3XL)",
        size: "3XL",
        color: "Carolina Blue",
        color_code: "#96bbff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15830_1661693894.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15830",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15830/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15830/images",
            },
        },
    },
    {
        id: 15831,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Charcoal / S)",
        size: "S",
        color: "Charcoal",
        color_code: "#6a6967",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15831_1661693915.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15831",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15831/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15831/images",
            },
        },
    },
    {
        id: 15832,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Charcoal / M)",
        size: "M",
        color: "Charcoal",
        color_code: "#6a6967",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15832_1661693915.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15832",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15832/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15832/images",
            },
        },
    },
    {
        id: 15833,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Charcoal / L)",
        size: "L",
        color: "Charcoal",
        color_code: "#6a6967",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15833_1661693915.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15833",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15833/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15833/images",
            },
        },
    },
    {
        id: 15834,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Charcoal / XL)",
        size: "XL",
        color: "Charcoal",
        color_code: "#6a6967",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15834_1661693915.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15834",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15834/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15834/images",
            },
        },
    },
    {
        id: 15835,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Charcoal / 2XL)",
        size: "2XL",
        color: "Charcoal",
        color_code: "#6a6967",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15835_1661693905.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15835",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15835/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15835/images",
            },
        },
    },
    {
        id: 15836,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Charcoal / 3XL)",
        size: "3XL",
        color: "Charcoal",
        color_code: "#6a6967",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15836_1661693905.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15836",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15836/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15836/images",
            },
        },
    },
    {
        id: 15837,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Chocolate / S)",
        size: "S",
        color: "Dark Chocolate",
        color_code: "#463b33",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15837_1661693936.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15837",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15837/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15837/images",
            },
        },
    },
    {
        id: 15838,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Chocolate / M)",
        size: "M",
        color: "Dark Chocolate",
        color_code: "#463b33",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15838_1661693926.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15838",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15838/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15838/images",
            },
        },
    },
    {
        id: 15839,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Chocolate / L)",
        size: "L",
        color: "Dark Chocolate",
        color_code: "#463b33",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15839_1661693926.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15839",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15839/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15839/images",
            },
        },
    },
    {
        id: 15840,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Chocolate / XL)",
        size: "XL",
        color: "Dark Chocolate",
        color_code: "#463b33",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15840_1661693936.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15840",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15840/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15840/images",
            },
        },
    },
    {
        id: 15841,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Chocolate / 2XL)",
        size: "2XL",
        color: "Dark Chocolate",
        color_code: "#463b33",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15841_1661693925.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15841",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15841/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15841/images",
            },
        },
    },
    {
        id: 15842,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Chocolate / 3XL)",
        size: "3XL",
        color: "Dark Chocolate",
        color_code: "#463b33",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15842_1661693925.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15842",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15842/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15842/images",
            },
        },
    },
    {
        id: 15843,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Heather / S)",
        size: "S",
        color: "Dark Heather",
        color_code: "#595959",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15843_1661693966.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15843",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15843/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15843/images",
            },
        },
    },
    {
        id: 15844,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Heather / M)",
        size: "M",
        color: "Dark Heather",
        color_code: "#595959",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15844_1661693966.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15844",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15844/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15844/images",
            },
        },
    },
    {
        id: 15845,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Heather / L)",
        size: "L",
        color: "Dark Heather",
        color_code: "#595959",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15845_1661693957.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15845",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15845/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15845/images",
            },
        },
    },
    {
        id: 15846,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Heather / XL)",
        size: "XL",
        color: "Dark Heather",
        color_code: "#595959",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15846_1661693966.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15846",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15846/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15846/images",
            },
        },
    },
    {
        id: 15847,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Heather / 2XL)",
        size: "2XL",
        color: "Dark Heather",
        color_code: "#595959",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15847_1661693946.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15847",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15847/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15847/images",
            },
        },
    },
    {
        id: 15848,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Dark Heather / 3XL)",
        size: "3XL",
        color: "Dark Heather",
        color_code: "#595959",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15848_1661693956.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15848",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15848/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15848/images",
            },
        },
    },
    {
        id: 15849,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Gold / S)",
        size: "S",
        color: "Gold",
        color_code: "#ffb22d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15849_1664355009.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15849",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15849/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15849/images",
            },
        },
    },
    {
        id: 15850,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Gold / M)",
        size: "M",
        color: "Gold",
        color_code: "#ffb22d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15850_1664355009.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15850",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15850/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15850/images",
            },
        },
    },
    {
        id: 15851,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Gold / L)",
        size: "L",
        color: "Gold",
        color_code: "#ffb22d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15851_1664355000.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15851",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15851/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15851/images",
            },
        },
    },
    {
        id: 15852,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Gold / XL)",
        size: "XL",
        color: "Gold",
        color_code: "#ffb22d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15852_1664355019.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15852",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15852/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15852/images",
            },
        },
    },
    {
        id: 15853,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Gold / 2XL)",
        size: "2XL",
        color: "Gold",
        color_code: "#ffb22d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15853_1664354988.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15853",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15853/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15853/images",
            },
        },
    },
    {
        id: 15854,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Gold / 3XL)",
        size: "3XL",
        color: "Gold",
        color_code: "#ffb22d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15854_1664354989.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15854",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15854/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15854/images",
            },
        },
    },
    {
        id: 15855,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Irish Green / S)",
        size: "S",
        color: "Irish Green",
        color_code: "#00ba69",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15855_1661693988.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15855",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15855/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15855/images",
            },
        },
    },
    {
        id: 15856,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Irish Green / M)",
        size: "M",
        color: "Irish Green",
        color_code: "#00ba69",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15856_1661693988.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15856",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15856/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15856/images",
            },
        },
    },
    {
        id: 15857,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Irish Green / L)",
        size: "L",
        color: "Irish Green",
        color_code: "#00ba69",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15857_1661693987.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15857",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15857/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15857/images",
            },
        },
    },
    {
        id: 15858,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Irish Green / XL)",
        size: "XL",
        color: "Irish Green",
        color_code: "#00ba69",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15858_1661693997.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15858",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15858/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15858/images",
            },
        },
    },
    {
        id: 15859,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Irish Green / 2XL)",
        size: "2XL",
        color: "Irish Green",
        color_code: "#00ba69",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15859_1661693987.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15859",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15859/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15859/images",
            },
        },
    },
    {
        id: 15860,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Irish Green / 3XL)",
        size: "3XL",
        color: "Irish Green",
        color_code: "#00ba69",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15860_1661693988.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15860",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15860/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15860/images",
            },
        },
    },
    {
        id: 15861,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Light Blue / S)",
        size: "S",
        color: "Light Blue",
        color_code: "#d9efff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15861_1661694008.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15861",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15861/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15861/images",
            },
        },
    },
    {
        id: 15862,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Light Blue / M)",
        size: "M",
        color: "Light Blue",
        color_code: "#d9efff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15862_1661693998.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15862",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15862/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15862/images",
            },
        },
    },
    {
        id: 15863,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Light Blue / L)",
        size: "L",
        color: "Light Blue",
        color_code: "#d9efff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15863_1661693998.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15863",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15863/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15863/images",
            },
        },
    },
    {
        id: 15864,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Light Blue / XL)",
        size: "XL",
        color: "Light Blue",
        color_code: "#d9efff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15864_1661694008.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15864",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15864/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15864/images",
            },
        },
    },
    {
        id: 15865,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Light Blue / 2XL)",
        size: "2XL",
        color: "Light Blue",
        color_code: "#d9efff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15865_1661693998.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15865",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15865/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15865/images",
            },
        },
    },
    {
        id: 15866,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Light Blue / 3XL)",
        size: "3XL",
        color: "Light Blue",
        color_code: "#d9efff",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15866_1661693998.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15866",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15866/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15866/images",
            },
        },
    },
    {
        id: 15867,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Military Green / S)",
        size: "S",
        color: "Military Green",
        color_code: "#737a5f",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15867_1661694019.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15867",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15867/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15867/images",
            },
        },
    },
    {
        id: 15868,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Military Green / M)",
        size: "M",
        color: "Military Green",
        color_code: "#737a5f",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15868_1661694019.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15868",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15868/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15868/images",
            },
        },
    },
    {
        id: 15869,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Military Green / L)",
        size: "L",
        color: "Military Green",
        color_code: "#737a5f",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15869_1661694018.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15869",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15869/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15869/images",
            },
        },
    },
    {
        id: 15870,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Military Green / XL)",
        size: "XL",
        color: "Military Green",
        color_code: "#737a5f",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15870_1661694019.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15870",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15870/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15870/images",
            },
        },
    },
    {
        id: 15871,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Military Green / 2XL)",
        size: "2XL",
        color: "Military Green",
        color_code: "#737a5f",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15871_1661694008.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15871",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15871/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15871/images",
            },
        },
    },
    {
        id: 15872,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Military Green / 3XL)",
        size: "3XL",
        color: "Military Green",
        color_code: "#737a5f",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15872_1661694018.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15872",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15872/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15872/images",
            },
        },
    },
    {
        id: 15873,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Purple / S)",
        size: "S",
        color: "Purple",
        color_code: "#48197d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15873_1661694030.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15873",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15873/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15873/images",
            },
        },
    },
    {
        id: 15874,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Purple / M)",
        size: "M",
        color: "Purple",
        color_code: "#48197d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15874_1661694029.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15874",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15874/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15874/images",
            },
        },
    },
    {
        id: 15875,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Purple / L)",
        size: "L",
        color: "Purple",
        color_code: "#48197d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15875_1661694029.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15875",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15875/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15875/images",
            },
        },
    },
    {
        id: 15876,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Purple / XL)",
        size: "XL",
        color: "Purple",
        color_code: "#48197d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15876_1661694030.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15876",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15876/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15876/images",
            },
        },
    },
    {
        id: 15877,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Purple / 2XL)",
        size: "2XL",
        color: "Purple",
        color_code: "#48197d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15877_1661694029.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15877",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15877/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15877/images",
            },
        },
    },
    {
        id: 15878,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Purple / 3XL)",
        size: "3XL",
        color: "Purple",
        color_code: "#48197d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15878_1661694029.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15878",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15878/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15878/images",
            },
        },
    },
    {
        id: 15879,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Royal / S)",
        size: "S",
        color: "Royal",
        color_code: "#175ac7",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15879_1661694050.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15879",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15879/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15879/images",
            },
        },
    },
    {
        id: 15880,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Royal / M)",
        size: "M",
        color: "Royal",
        color_code: "#175ac7",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15880_1661694050.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15880",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15880/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15880/images",
            },
        },
    },
    {
        id: 15881,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Royal / L)",
        size: "L",
        color: "Royal",
        color_code: "#175ac7",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15881_1661694039.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15881",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15881/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15881/images",
            },
        },
    },
    {
        id: 15882,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Royal / XL)",
        size: "XL",
        color: "Royal",
        color_code: "#175ac7",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15882_1661694050.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15882",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15882/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15882/images",
            },
        },
    },
    {
        id: 15883,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Royal / 2XL)",
        size: "2XL",
        color: "Royal",
        color_code: "#175ac7",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15883_1661694039.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15883",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15883/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15883/images",
            },
        },
    },
    {
        id: 15884,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Royal / 3XL)",
        size: "3XL",
        color: "Royal",
        color_code: "#175ac7",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/15884_1661694039.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
            {
                region: "United Kingdom",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/15884",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/15884/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/15884/images",
            },
        },
    },
    {
        id: 16246,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Natural / 3XL)",
        size: "3XL",
        color: "Natural",
        color_code: "#e8dacd",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16246_1663165041.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16246",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16246/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16246/images",
            },
        },
    },
    {
        id: 16247,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Maroon / 3XL)",
        size: "3XL",
        color: "Maroon",
        color_code: "#47001b",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16247_1663164958.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16247",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16247/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16247/images",
            },
        },
    },
    {
        id: 16248,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Maroon / 4XL)",
        size: "4XL",
        color: "Maroon",
        color_code: "#47001b",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16248_1663164959.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16248",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16248/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16248/images",
            },
        },
    },
    {
        id: 16249,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Maroon / 5XL)",
        size: "5XL",
        color: "Maroon",
        color_code: "#47001b",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16249_1663164969.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16249",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16249/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16249/images",
            },
        },
    },
    {
        id: 16250,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Red / 3XL)",
        size: "3XL",
        color: "Red",
        color_code: "#d80019",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16250_1663165051.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16250",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16250/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16250/images",
            },
        },
    },
    {
        id: 16251,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Red / 4XL)",
        size: "4XL",
        color: "Red",
        color_code: "#d80019",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16251_1663165053.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16251",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16251/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16251/images",
            },
        },
    },
    {
        id: 16252,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Red / 5XL)",
        size: "5XL",
        color: "Red",
        color_code: "#d80019",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16252_1663165057.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16252",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16252/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16252/images",
            },
        },
    },
    {
        id: 16253,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Military Green / 4XL)",
        size: "4XL",
        color: "Military Green",
        color_code: "#737a5f",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16253_1663165021.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16253",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16253/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16253/images",
            },
        },
    },
    {
        id: 16254,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Military Green / 5XL)",
        size: "5XL",
        color: "Military Green",
        color_code: "#737a5f",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16254_1663165031.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16254",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16254/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16254/images",
            },
        },
    },
    {
        id: 16255,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Sand / 3XL)",
        size: "3XL",
        color: "Sand",
        color_code: "#d6c0ab",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16255_1663165067.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
            {
                region: "Europe",
                status: "in_stock",
            },
            {
                region: "Latvia",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16255",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16255/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16255/images",
            },
        },
    },
    {
        id: 16256,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Irish Green / 4XL)",
        size: "4XL",
        color: "Irish Green",
        color_code: "#00ba69",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16256_1663164926.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16256",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16256/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16256/images",
            },
        },
    },
    {
        id: 16257,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Irish Green / 5XL)",
        size: "5XL",
        color: "Irish Green",
        color_code: "#00ba69",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16257_1663164937.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16257",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16257/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16257/images",
            },
        },
    },
    {
        id: 16285,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Gold / 4XL)",
        size: "4XL",
        color: "Gold",
        color_code: "#ffb22d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16285_1664354989.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16285",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16285/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16285/images",
            },
        },
    },
    {
        id: 16286,
        product_id: 438,
        name: "Gildan 5000 Men’s Classic Tee (Gold / 5XL)",
        size: "5XL",
        color: "Gold",
        color_code: "#ffb22d",
        color_code2: null,
        image: "https://files.cdn.printful.com/products/438/16286_1664354989.jpg",
        availability: [
            {
                region: "United States",
                status: "in_stock",
            },
        ],
        _links: {
            self: {
                href: "https://api.printful.com/v2/catalog-variants/16286",
            },
            product_details: {
                href: "https://api.printful.com/v2/catalog-products/438",
            },
            product_variants: {
                href: "https://api.printful.com/v2/catalog-products/438/catalog-variants",
            },
            variant_prices: {
                href: "https://api.printful.com/v2/catalog-variants/16286/prices",
            },
            variant_images: {
                href: "https://api.printful.com/v2/catalog-variants/16286/images",
            },
        },
    },
];

const productTemplates = [
    {
        id: 61258390,
        product_id: 108,
        external_product_id: null,
        title: "Short Sleeve T-shirt copy <>  Isreal|Tshirt",
        available_variant_ids: [
            4872, 4873, 4874, 4875, 4876, 4877, 4878, 4879, 4880, 4881, 4882,
            4883, 4884, 4885, 5331, 5332, 5333, 5334, 5335, 5336, 5337,
        ],
        option_data: [
            {
                id: "text_thread_colors_front",
                value: [],
            },
            {
                id: "text_thread_colors_sleeve_left",
                value: [],
            },
            {
                id: "text_thread_colors_label_outside",
                value: [],
            },
        ],
        colors: [
            {
                color_name: "Red",
                color_codes: ["#d50732"],
            },
            {
                color_name: "Heather Grey",
                color_codes: ["#9a978e"],
            },
            {
                color_name: "White",
                color_codes: ["#ffffff"],
            },
        ],
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        mockup_file_url:
            "https://files.cdn.printful.com/upload/product-templates/77/77de35e09e4d0eba56798a3f7c3e688f_l",
        placements: [
            {
                placement: "front",
                display_name: "Front print",
                technique_key: "DTG",
                technique_display_name: "DTG printing",
                options: [],
            },
            {
                placement: "sleeve_left",
                display_name: "Left sleeve",
                technique_key: "DTG",
                technique_display_name: "DTG printing",
                options: [],
            },
            {
                placement: "label_outside",
                display_name: "Outside label",
                technique_key: "DTG",
                technique_display_name: "DTG printing",
                options: [],
            },
        ],
        created_at: 1701475954,
        updated_at: 1701514418,
        placement_option_data: [
            {
                type: "front",
                options: [],
            },
            {
                type: "sleeve_left",
                options: [],
            },
            {
                type: "label_outside",
                options: [],
            },
        ],
    },
];

// const _colours = [];
// product_variants.forEach((v) => {
//     if (!t_shirtColours[v.color]) {
//         t_shirtColours = {
//             ...t_shirtColours,
//             [v.color]: { name: v.color, code: v.color_code },
//         };
//     }
// });
console.log(t_shirtColours);

init();
