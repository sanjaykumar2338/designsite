const base_url = "http://127.0.0.1:8000";
// const base_url = "https://causestand.com";
function storeFile(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.blob()) // Gets the response and returns it as a blob
            .then((blob) => {
                var formdata = new FormData();
                formdata.append("file", blob);
                formdata.append("getDbUrl", "true");

                var requestOptions = {
                    method: "POST",
                    body: formdata,
                    redirect: "follow",
                };

                fetch(`${base_url}/api/file/`, requestOptions)
                    .then((response) => {
                        resolve(response.text());
                    })
                    .catch((error) => console.log("error", error));
            });
    });
}

async function _createProduct(data) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
    };
    return new Promise((resolve, reject) => {
        fetch(`${base_url}/api/storeViaApi`, requestOptions)
            .then((response) => {
                resolve(response.text());
            })
            .catch((error) => reject(console.log("error", error)));
    });
}

async function main() {
    for await (const p of accessories) {
        let front_image =
            p.images.find((i) => i.option === "Front")?.image_url || "";
        // if(!image) front_image = p.images.find((i) => i.option === "Front Left").image_url

        let back_image =
            p.images.find((i) => i.option === "Back")?.image_url || "";
        // if(!image) back_image = p.images.find((i) => i.option === "Front Left").image_url

        let right_image =
            p.images.find((i) => i.option === "Right")?.image_url || "";
        if (!right_image === "")
            right_image =
                p.images.find((i) => i.option === "Front Right")?.image_url ||
                "";

        let left_image =
            p.images.find((i) => i.option === "Right")?.image_url || "";
        if (!left_image === "")
            left_image =
                p.images.find((i) => i.option === "Front Left")?.image_url ||
                "";

        // if (front_image !== "") front_image = await storeFile(front_image);
        // if (back_image !== "") back_image = await storeFile(back_image);
        // if (right_image !== "") right_image = await storeFile(right_image);
        // if (left_image !== "") left_image = await storeFile(left_image);

        console.log(p.productName);
        console.log("front_image", front_image !== "");
        console.log("back_image", back_image !== "");
        console.log("right_image", right_image !== "");
        console.log("left_image", left_image !== "");

        var data = {
            product_name: p.productName,
            product_price: p.price,
            product_description: "",
            commission: 10,
            supporting_country: "Isreal",
            product_for: "Accessories",
            product_type: "Phone Cases",
            product_sub_type: "",
            front_image,
            front_image_price: 10,
            front_image_donation: "",
            back_image,
            back_image_price: 10,
            back_image_donation: "",
            right_image,
            left_image,
            seo_title: "",
            meta_description: "",
            meta_keyword: "",
            product_x_axis: "10",
            product_y_axis: "10",
            product_width: "10",
            product_height: "10",
        };
        const res = await _createProduct(data);
        console.log(res);
    }
}

const mens = {
    shirts: [
        {
            productName: "Premium Polo Shirt | Port Authority K500",
            price: 26.5,
            images: [
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/232-pok500/medium/onman/front/05_k500_onman_front_black_base_whitebg.png?v=1692601322",
                    background_color: "#0e0c0c",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/232-pok500/medium/onman/embroidery_chest_left/zoomed/05_k500_zoomedin_front_black_base_whitebg.png?v=1692601322",
                    background_color: "#0e0c0c",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/232-pok500/medium/onman/front/05_k500_onman_front_black_base_whitebg.png?v=1692601322",
                    background_color: "#0e0c0c",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/232-pok500/medium/onman/front/05_k500_onman_front_black_base_whitebg.png?v=1692601322",
                    background_color: "#0e0c0c",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/232-pok500/medium/onman/left/05_PortAuthorityK500_onman_left_base_whitebg.png?v=1692601322",
                    background_color: "#0e0c0c",
                    background_image: null,
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/232-pok500/medium/onman/right/05_PortAuthorityK500_onman_right_base_whitebg.png?v=1692601322",
                    background_color: "#0e0c0c",
                    background_image: null,
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/232-pok500/medium/onman/right/zoomed/05_PortAuthorityK500_onman_right_base_whitebg.png?v=1692601322",
                    background_color: "#0e0c0c",
                    background_image: null,
                    option: "Right Template",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/232-pok500/medium/onman/left/zoomed/05_PortAuthorityK500_onman_left_base_whitebg.png?v=1692601322",
                    background_color: "#0e0c0c",
                    background_image: null,
                    option: "Left Template",
                    option_group: "Men's",
                },
            ],
        },
        {
            productName: "Unisex Tri-Blend T-Shirt | Bella + Canvas 3413",
            price: 21.75,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/front/03_bc3413_onman_front_shadows_whitebg.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/front/01_bc3413_onman_front_aqua.png?v=1702297406",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/back/01_bc3413_onman_back_shadows_whitebg.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/back/01_bc3413_onman_back_aqua.png?v=1702297406",
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/left/zoomed/03_bc3413_onman_left_shadows.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/left/zoomed/01_bc3413_onman_left_aqua_triblend.png?v=1702297406",
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/right/zoomed/03_bc3413_onman_right_shadows.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/right/zoomed/01_bc3413_onman_right_aqua_triblend.png?v=1702297406",
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/left-front/03_bc3413_onman_left-front_shadows_whitebg.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/left-front/01_bc3413_onman_left-front_aqua.png?v=1702297406",
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/right-front/03_bc3413_onman_right-front_shadows_whitebg.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/right-front/01_bc3413_onman_right-front_aqua.png?v=1702297406",
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/embroidery_chest_left/zoomed/04_bc3413_onman_front_zoomed_shadows.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/embroidery_chest_left/zoomed/01_bc3413_onman_front_zoomed_aqua.png?v=1702297406",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/embroidery_chest_left/zoomed/04_bc3413_onman_front_zoomed_shadows.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/embroidery_chest_left/zoomed/01_bc3413_onman_front_zoomed_aqua.png?v=1702297406",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/05_BC_3413_XL_Ghost_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/back/05_BC_3413_XL_Ghost_back_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/right/05_BC_3413_XL_Ghost_right_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/left/05_BC_3413_XL_Ghost_left_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/zoomed/05_BC_3413_XL_Ghost_zoomed_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/embroidery/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/zoomed/05_BC_3413_XL_Ghost_zoomed_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/embroidery/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/05_BC_3413_XL_Ghost_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/05_BC_3413_XL_Ghost_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/left/zoomed/05_BC_3413_XL_Ghost_left_zoomed_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/embroidery/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/right/zoomed/05_BC_3413_XL_Ghost_right_zoomed_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/embroidery/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/back/05_BC_3413_XL_Ghost_back_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/05_BC_3413_XL_Ghost_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/05_BC_3413_XL_Ghost_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/05_BC_3413_XL_Ghost_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/back/01_bc3413_onman_back_shadows_whitebg.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/back/01_bc3413_onman_back_aqua.png?v=1702297406",
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/right/05_BC_3413_XL_Ghost_right_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/left/05_BC_3413_XL_Ghost_left_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/flat_lifestyle/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/right/zoomed/05_BC_3413_XL_Ghost_right_zoomed_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/embroidery/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/left/zoomed/05_BC_3413_XL_Ghost_left_zoomed_base_whitebg.png?v=1702297406",
                    background_color: "#33869f",
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/bgImages/embroidery/01_bc3413_aqua.jpg?v=1702297406",
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/front/03_bc3413_onman_front_shadows_whitebg.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/front/01_bc3413_onman_front_aqua.png?v=1702297406",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/front/03_bc3413_onman_front_shadows_whitebg.png?v=1702297406",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/onman/front/01_bc3413_onman_front_aqua.png?v=1702297406",
                    option: "Front",
                    option_group: "Men's",
                },
            ],
        },
        {
            productName: "Unisex V-Neck Tee | Bella + Canvas 3005",
            price: 18.75,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/front/05_bc3005_onman_front_base_whitebg.png?v=1663248725",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/back/05_bc3005_onman_back_base_whitebg.png?v=1677660415",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/frontright/05_bc3005_onman_frontright_base_whitebg.png?v=1663248725",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/frontleft/05_bc3005_onman_frontleft_base_whitebg.png?v=1663248725",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/front/05_bc3005_onman_front_base_whitebg.png?v=1663248725",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/front/05_bc3005_onman_front_base_whitebg.png?v=1663248725",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/front/embroidery/05_bc3005_onman_front_base_whitebg.png?v=1663248725",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/front/embroidery/05_bc3005_onman_front_base_whitebg.png?v=1663248725",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/84-bella-canvas-3005/medium/onman/back/05_bc3005_onman_back_base_whitebg.png?v=1678173438",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
            ],
        },
        {
            productName: "Unisex Performance Crew Neck T-Shirt | A4 N3142",
            price: 22.95,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/ghost/front/06_A4_N3142_ghost_mockup_front_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/ghost/back/06_A4_N3142_ghost_mockup_back_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/ghost/left/06_A4_N3142_ghost_mockup_left_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/ghost/right/06_A4_N3142_ghost_mockup_right_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/mens/front/06_A4_N3412_mens_mockup_front_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/mens/frontleft/06_A4_N3412_mens_mockup_frontleft_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/mens/back/06_A4_N3412_mens_mockup_back_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/ghost/left/zoomed/06_A4_N3142_ghost_mockup_left_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Left sleeve",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/Performance_tshirt_A4_N3142/medium/ghost/right/zoomed/06_A4_N3142_ghost_mockup_right_base_whitebg.png?v=1686834709",
                    background_color: "#191919",
                    background_image: null,
                    option: "Right sleeve",
                    option_group: "Ghost",
                },
            ],
        },
        {
            productName: "Unisex Long Sleeve Tee | Bella + Canvas 3501",
            price: 19.75,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/front/05_bc3501_onman_front_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/back/05_bc3501_onman_back_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/frontleft/05_bc3501_onman_frontleft_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/left/05_bc3501_onman_left_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/frontright/05_bc3501_onman_frontright_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/right/05_bc3501_onman_right_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/embroidery_chest_left/zoomed/05_bc3501_onman_front_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/zoomed/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/front/05_bc3501_onman_front_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/front/05_bc3501_onman_front_base_whitebg.png?v=1692944003",
                    background_color: "#b5b4b4",
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/embroidery_chest_left/zoomed/05_bc3501_onman_front_base_whitebg.png?v=1692944003",
                    background_color: "#b5b4b4",
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/zoomed/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/back/05_bc3501_onman_back_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/right/05_bc3501_onman_right_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onman/left/05_bc3501_onman_left_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Left",
                    option_group: "Men's",
                },
            ],
        },
        {
            productName: "Unisex Muscle Shirt | Bella + Canvas 3483",
            price: 17.95,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3483/medium/onman/front/05_bc3483_onman_front_base_whitebg.png?v=1676466575",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3483/medium/onman/back/05_bc3483_onman_back_base_whitebg.png?v=1676466575",
                    background_color: "#181818",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3483/medium/onman/embroidery_chest_left/zoomed/05_bc3483_onman_front_base_whitebg.png?v=1676466575",
                    background_color: "#181818",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3483/medium/onman/front/05_bc3483_onman_front_base_whitebg.png?v=1676466575",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3483/medium/onman/front/05_bc3483_onman_front_base_whitebg.png?v=1676466575",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3483/medium/onman/embroidery_chest_left/zoomed/05_bc3483_onman_front_base_whitebg.png?v=1676466575",
                    background_color: "#181818",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3483/medium/onman/back/05_bc3483_onman_back_base_whitebg.png?v=1676466575",
                    background_color: "#181818",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
            ],
        },
        {
            productName:
                "Men's Premium Heavyweight Tee | Cotton Heritage MC1086",
            price: 15.95,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_1/05_chmc1086_onman_front_1_base_whitebg.png?v=1687857208",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/back_1/05_chmc1086_onman_back_1_base_whitebg.png?v=1687857208",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/mens/frontright/05_chmc1086_onman_frontright_base_whitebg.png?v=1687857208",
                    background_color: "#151515",
                    background_image: null,
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/frontleft/05_chmc1086_onman_frontleft_base_whitebg.png?v=1687857208",
                    background_color: "#151515",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/zoomed/05_chmc1086_onman_zoomed_base_whitebg.png?v=1687857208",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 3",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_1/05_chmc1086_onman_front_1_base_whitebg.png?v=1687857208",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_1/05_chmc1086_onman_front_1_base_whitebg.png?v=1687857208",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_2/05_chmc1086_onman_front_2_base_whitebg.png?v=1687857208",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/back_2/05_chmc1086_onman_back_2_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back 2",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_1/embroidery/05_chmc1086_onman_front_1_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_2/embroidery/05_chmc1086_onman_front_2_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 2",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_2/05_chmc1086_onman_front_2_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_1/embroidery/05_chmc1086_onman_front_1_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_2/embroidery/05_chmc1086_onman_front_2_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 2",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/zoomed/05_chmc1086_onman_zoomed_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 3",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_2/05_chmc1086_onman_front_2_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/zoomed/05_chmc1086_onman_zoomed_base_whitebg.png?v=1687857209",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 3",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/back_1/05_chmc1086_onman_back_1_base_whitebg.png?v=1687857212",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/back_2/05_chmc1086_onman_back_2_base_whitebg.png?v=1687857212",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back 2",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_1/05_chmc1086_onman_front_1_base_whitebg.png?v=1687857213",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/zoomed/05_chmc1086_onman_zoomed_base_whitebg.png?v=1687857213",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 3",
                    option_group: "Men's",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/zoomed/05_chmc1086_onman_zoomed_base_whitebg.png?v=1687857214",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 3",
                    option_group: "Men's",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/zoomed/05_chmc1086_onman_zoomed_base_whitebg.png?v=1687857216",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 3",
                    option_group: "Men's",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/zoomed/05_chmc1086_onman_zoomed_base_whitebg.png?v=1687857218",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in 3",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/right/05_chmc1086_onman_right_base_whitebg.png?v=1687857219",
                    background_color: "#151515",
                    background_image: null,
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/left/05_chmc1086_onman_left_base_whitebg.png?v=1687857219",
                    background_color: "#151515",
                    background_image: null,
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/05_chmc1086_ghost_front_base_whitebg.png?v=1687857220",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/back/05_chmc1086_ghost_back_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/left/05_chmc1086_ghost_left_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/right/05_chmc1086_ghost_right_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/zoomed/05_chmc1086_ghost_front_base_whitebg.png?v=1673939666",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/zoomed/05_chmc1086_ghost_front_base_whitebg.png?v=1673939666",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/left/zoomed/05_chmc1086_ghost_left_base_whitebg.png?v=1673939666",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/right/zoomed/05_chmc1086_ghost_right_base_whitebg.png?v=1673939666",
                    background_color: "#151515",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/back/05_chmc1086_ghost_back_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/back/05_chmc1086_ghost_back_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/back/05_chmc1086_ghost_back_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/05_chmc1086_ghost_front_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/left/05_chmc1086_ghost_left_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/right/05_chmc1086_ghost_right_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/05_chmc1086_ghost_front_base_whitebg.png?v=1687857221",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/left/05_chmc1086_ghost_left_base_whitebg.png?v=1687857222",
                    background_color: "#151515",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/05_chmc1086_ghost_front_base_whitebg.png?v=1687857222",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/05_chmc1086_ghost_front_base_whitebg.png?v=1687857222",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/05_chmc1086_ghost_front_base_whitebg.png?v=1687857222",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "front_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/front/05_chmc1086_ghost_front_base_whitebg.png?v=1687857224",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "front_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/front_1/05_chmc1086_onman_front_1_base_whitebg.png?v=1687857224",
                    background_color: "#151515",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/back_1/05_chmc1086_onman_back_1_base_whitebg.png?v=1688025350",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "back_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/mens/back_2/05_chmc1086_onman_back_2_base_whitebg.png?v=1688025390",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back 2",
                    option_group: "Men's",
                },
                {
                    placement: "back_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/Cotton_Heritage_MC1086/medium/ghost/back/05_chmc1086_ghost_back_base_whitebg.png?v=1688025301",
                    background_color: "#151515",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
            ],
        },
    ],
    hoodies: [
        {
            productName: "Unisex Lightweight Zip Hoodie | Bella + Canvas 3939",
            price: 33.5,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/04_bc3939_onmodel_front_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/01_bc3939_onmodel_front_black.png?v=1696406294",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/back/04_bc3939_onmodel_back_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/back/01_bc3939_onmodel_back_black.png?v=1696406294",
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/04_bc3939_onmodel_front_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/01_bc3939_onmodel_front_black.png?v=1696406294",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/embroidery/05_bc3939_onman_front_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/embroidery/02_bc3939_onman_front_black.png?v=1696406294",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/04_bc3939_onmodel_front_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/01_bc3939_onmodel_front_black.png?v=1696406294",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/04_bc3939_onmodel_front_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/01_bc3939_onmodel_front_black.png?v=1696406294",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/embroidery/05_bc3939_onman_front_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/embroidery/02_bc3939_onman_front_black.png?v=1696406294",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/embroidery/05_bc3939_onman_front_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/front/embroidery/02_bc3939_onman_front_black.png?v=1696406294",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/back/04_bc3939_onmodel_back_base_whitebg.png?v=1696406294",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/man/back/01_bc3939_onmodel_back_black.png?v=1696406294",
                    option: "Back",
                    option_group: "Men's",
                },
            ],
        },
        {
            productName: "Unisex Pullover Hoodie | Bella + Canvas 3719",
            price: 32.45,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/front/05_bc3719_onmodel_front_base_whiteBG.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/back/05_bc3719_onmodel_back_base_whiteBG.png?v=1697799708",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/front/05_bc3719_onmodel_front_base_whiteBG.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/front/05_bc3719_onmodel_front_base_whiteBG.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/embroidery_chest_left/zoomed/05_bc3719_onman_front_base_whitebg.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/embroidery_chest_left/zoomed/05_bc3719_onman_front_base_whitebg.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/right/05_bc3719_onman_right_base_whitebg.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/left/05_bc3719_onman_left_base_whitebg.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/frontright/05_bc3719_onman_frontright_base_whitebg.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/frontleft/05_bc3719_onman_frontleft_base_whitebg.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/left/05_bc3719_onman_left_base_whitebg.png?v=1667820014",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/frontleft/05_bc3719_onman_frontleft_base_whitebg.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/right/05_bc3719_onman_right_base_whitebg.png?v=1667820025",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/frontright/05_bc3719_onman_frontright_base_whitebg.png?v=1665649578",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/back/05_bc3719_onmodel_back_base_whiteBG.png?v=1697800199",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/back/05_bc3719_onmodel_back_base_whiteBG.png?v=1697799754",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/186-bc3719/medium/onmodel/man/back/05_bc3719_onmodel_back_base_whiteBG.png?v=1697799763",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
            ],
        },
        {
            productName: "Unisex Heavy Blend Hoodie | Gildan 18500",
            price: 21.95,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/front/05_gildan18500_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/back/05_gildan18500_onman_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/frontleft/05_gildan18500_frontleft_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/left/05_gildan18500_left_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/frontright/05_gildan18500_frontright_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/right/05_gildan18500_right_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/embroidery_chest_left/zoomed/05_gildan18500_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/front/05_gildan18500_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/embroidery_chest_center/zoomed/05_gildan18500_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/front/05_gildan18500_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/onman/back/05_gildan18500_onman_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094386",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/zoomed/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/zoomed/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/left/zoomed/05_gildan18500_ghost_left_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/right/zoomed/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094387",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094387",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094389",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "front_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731683",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "long_sleeve_left_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094389",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "long_sleeve_right_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731761",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
            ],
        },
        {
            productName: "Unisex Heavy Blend Zip Hoodie | Gildan 18600",
            price: 29.75,
            images: [
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/back/05_gildan18600_ghost_back_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/front/05_gildan18600_ghost_front_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/left/05_gildan18600_ghost_left_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/right/05_gildan18600_ghost_right_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/front/05_gildan18600_ghost_front_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/front/embroidery/05_gildan18600_ghost_front_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/left/zoomed/05_gildan18600_ghost_left_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Left wrist",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/right/zoomed/05_gildan18600_ghost_right_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Right wrist",
                    option_group: "Ghost",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/back/05_gildan18600_ghost_back_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/left/05_gildan18600_ghost_left_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/right/05_gildan18600_ghost_right_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/front/05_gildan18600_mens_front_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/front/06_gildan18600_mens_front_strings_black.png?v=1692618905",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/back/05_gildan18600_mens_back_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/frontleft/05_gildan18600_mens_frontleft_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/frontleft/06_gildan18600_mens_frontleft_strings_black.png?v=1692618905",
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/frontleft/05_gildan18600_mens_frontleft_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/frontleft/06_gildan18600_mens_frontleft_strings_black.png?v=1692618905",
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/front/05_gildan18600_mens_front_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/mens/front/06_gildan18600_mens_front_strings_black.png?v=1692618905",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/front/template/05_gildan18600_ghost_front_black_base_whitebg.png?v=1692618905",
                    background_color: "#0b0b0b",
                    background_image:
                        "https://files.cdn.printful.com/m/unisex_heavy_blend_zip_hoodie_gildan_18600/medium/ghost/front/template/05_gildan18600_ghost_front_black_base.png?v=1692618905",
                    option: "Front",
                    option_group: "Ghost",
                },
            ],
        },
    ],
    sweatshirts: [
        {
            productName: "Unisex Fleece Pullover | Cotton Heritage M2475",
            price: 24.95,
            images: [
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/front/05_ghost_front_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/front/embroidrery/05_ghost_front_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/mens/front/05_m2475_onman_front_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/mens/back/05_m2475_onman_back_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/back/05_ghost_back_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/mens/front/embroidery/05_m2475_onman_front_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/front/05_ghost_front_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/mens/front/05_m2475_onman_front_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/mens/back/05_m2475_onman_back_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/front/05_ghost_front_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/mens/front/05_m2475_onman_front_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/mens/back/05_m2475_onman_back_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/back/05_ghost_back_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/back/05_ghost_back_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/right/zoomed/05_ghost_zoomed_right_black_base_whitebg.png?v=1701162528",
                    background_color: "#151515",
                    background_image: null,
                    option: "Right wrist",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/left/zoomed/05_ghost_zoomed_left_black_base_whitebg.png?v=1701162528",
                    background_color: "#151515",
                    background_image: null,
                    option: "Left wrist",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/left/05_ghost_left_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_fleece_pullover_cotton_heritage_m2475/medium/ghost/right/05_ghost_right_black_base_whitebg.png?v=1701162528",
                    background_color: null,
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
            ],
        },
        {
            productName: "Unisex Premium Sweatshirt | Cotton Heritage M2480",
            price: 26.5,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/front/05_chm2480_onman_front_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/back/05_chm2480_onman_back_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/frontleft/05_chm2480_onman_frontleft_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/left/05_chm2480_onman_left_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/frontright/05_chm2480_onman_frontright_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/right/05_chm2480_onman_right_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/embroidery_chest_left/zoomed/05_chm2480_onman_front_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/front/05_chm2480_onman_front_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/embroidery_chest_left/zoomed/05_chm2480_onman_front_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Zoomed-in",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/front/05_chm2480_onman_front_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/back/05_chm2480_onman_back_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/front/05_chm2480_onman_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/back/05_ghost_back_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/left/05_ghost_left_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/right/05_ghost_right_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/back/05_ghost_back_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/zoomed/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/zoomed/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/right/zoomed-in/05_ghost_right_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Right zoomed in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/left/zoomed-in/05_ghost_left_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Left zoomed in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/right/05_ghost_right_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/left/05_ghost_left_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/left/05_chm2480_onman_left_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/right/05_chm2480_onman_right_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/frontleft/05_chm2480_onman_frontleft_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/onman/frontright/05_chm2480_onman_frontright_base_whitebg.png?v=1702459598",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "long_sleeve_left_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/left/05_ghost_left_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "long_sleeve_right_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/right/05_ghost_right_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "front_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/back/05_ghost_back_base_whitebg.png?v=1702459598",
                    background_color: "#b2afaa",
                    background_image:
                        "https://files.cdn.printful.com/m/fleece_pullover/medium/bgImages/flat/01_chm2480_carbongrey.jpg?v=1702459598",
                    option: "Back",
                    option_group: "Ghost",
                },
            ],
        },
    ],
    bottomss: [
        {
            productName:
                "Unisex Pigment-Dyed Sweatpants | Independent Trading Co. PRM50PTPD",
            price: 47,
            images: [
                {
                    placement: "embroidery_apparel_front",
                    image_url:
                        "https://files.cdn.printful.com/m/PRM50PTPD/medium/mens/front/05_prm50Ptpd_onman_front_base_whitebg.png?v=1698756267",
                    background_color: "#566d58",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_apparel_front",
                    image_url:
                        "https://files.cdn.printful.com/m/PRM50PTPD/medium/mens/back/05_prm50Ptpd_onman_back_whitebg_whitebg.png?v=1698756267",
                    background_color: "#566d58",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_apparel_front",
                    image_url:
                        "https://files.cdn.printful.com/m/PRM50PTPD/medium/mens/frontleft/05_prm50Ptpd_onman_frontleft_base_whitebg.png?v=1698756267",
                    background_color: "#566d58",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_apparel_front",
                    image_url:
                        "https://files.cdn.printful.com/m/PRM50PTPD/medium/mens/lifestyle/05_prm50Ptpd_onman_lifestyle_base_whitebg.png?v=1698756267",
                    background_color: "#566d58",
                    background_image: null,
                    option: "Left Front 2",
                    option_group: "Men's",
                },
            ],
        },
        {
            productName: "Unisex Fleece Sweatpants | Cotton Heritage M7580",
            price: 29.95,
            images: [
                {
                    placement: "leg_front_left",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/front/05_chm7580_onman_front_base_whitebg.png?v=1646227809",
                    background_color: "#141414",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "leg_front_right",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/front/05_chm7580_onman_front_base_whitebg.png?v=1646227791",
                    background_color: "#141414",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
                {
                    placement: "leg_back_left",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/back/05_chm7580_onman_back_base_whitebg.png?v=1680250917",
                    background_color: "#141414",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "leg_back_right",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/back/05_chm7580_onman_back_base_whitebg.png?v=1680250926",
                    background_color: "#141414",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "pocket",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/back/05_chm7580_onman_back_base_whitebg.png?v=1680250905",
                    background_color: "#141414",
                    background_image: null,
                    option: "Back",
                    option_group: "Men's",
                },
                {
                    placement: "leg_front_left",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/left/05_chm7580_onman_left_base_whitebg.png?v=1646227700",
                    background_color: "#141414",
                    background_image: null,
                    option: "Left",
                    option_group: "Men's",
                },
                {
                    placement: "leg_back_right",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/right/05_chm7580_onman_right_base_whitebg.png?v=1680250954",
                    background_color: "#141414",
                    background_image: null,
                    option: "Right",
                    option_group: "Men's",
                },
                {
                    placement: "leg_front_right",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/frontright/05_chm7580_onman_frontright_base_whitebg.png?v=1680250960",
                    background_color: "#141414",
                    background_image: null,
                    option: "Right Front",
                    option_group: "Men's",
                },
                {
                    placement: "leg_front_left",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/frontleft/05_chm7580_onman_frontleft_base_whitebg.png?v=1646227727",
                    background_color: "#141414",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Men's",
                },
                {
                    placement: "embroidery_apparel_front",
                    image_url:
                        "https://files.cdn.printful.com/m/ch-m7580-sweatpants/medium/onman/front/05_chm7580_onman_front_base_whitebg.png?v=1646227824",
                    background_color: "#141414",
                    background_image: null,
                    option: "Front",
                    option_group: "Men's",
                },
            ],
        },
    ],
};

const womans = {
    TShirts: [
        {
            productName: "Women's Recycled V-Neck T-Shirt | District DT8001",
            price: 21.95,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front/05_districtDT8001_mockup_onwoman_front_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front/zoomed/05_districtDT8001_mockup_onwoman_front_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front template",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front/embroidery/front/05_districtDT8001_mockup_onwoman_front_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front/embroidery/front/05_districtDT8001_mockup_onwoman_front_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front/05_districtDT8001_mockup_onwoman_front_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front/05_districtDT8001_mockup_onwoman_front_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front2/05_districtDT8001_mockup_onwoman_front2_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front2/05_districtDT8001_mockup_onwoman_front2_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front2/05_districtDT8001_mockup_onwoman_front2_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front/embroidery/front2/05_districtDT8001_mockup_onwoman_front2_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Zoomed-in 2",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/front/embroidery/front2/05_districtDT8001_mockup_onwoman_front2_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Zoomed-in 2",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/back/05_districtDT8001_mockup_onwoman_back_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/back/zoomed/05_districtDT8001_mockup_onwoman_back_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Back template",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/back2/05_districtDT8001_mockup_onwoman_back_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Back 2",
                    option_group: "Women's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/frontleft/05_districtDT8001_mockup_onwoman_frontleft_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Women's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/Womens_Recycled_vneck_districtDT8001/medium/womens/frontright/05_districtDT8001_mockup_onwoman_frontright_base_whitebg.png?v=1669904803",
                    background_color: "#181818",
                    background_image: null,
                    option: "Right Front",
                    option_group: "Women's",
                },
            ],
        },
        {
            productName: "Women's High-Waisted Tee | Cotton Heritage OW1086",
            price: 13.95,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_tee_cotton_heritage_ow1086/medium/womens/front/05_chow1086_onwoman_front_base_whitebg.png?v=1691488750",
                    background_color: "#99a173",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_tee_cotton_heritage_ow1086/medium/womens/backleft/05_chow1086_onwoman_backleft_base_whitebg.png?v=1691488750",
                    background_color: "#99a173",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_tee_cotton_heritage_ow1086/medium/womens/frontleft/05_chow1086_onwoman_frontleft_base_whitebg.png?v=1691488750",
                    background_color: "#99a173",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_tee_cotton_heritage_ow1086/medium/womens/front/05_chow1086_onwoman_front_base_whitebg.png?v=1691488750",
                    background_color: "#99a173",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_tee_cotton_heritage_ow1086/medium/womens/frontleft/05_chow1086_onwoman_frontleft_base_whitebg.png?v=1691488750",
                    background_color: "#99a173",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_tee_cotton_heritage_ow1086/medium/womens/front/05_chow1086_onwoman_front_base_whitebg.png?v=1691488750",
                    background_color: "#99a173",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_tee_cotton_heritage_ow1086/medium/womens/frontleft/05_chow1086_onwoman_frontleft_base_whitebg.png?v=1691488750",
                    background_color: "#99a173",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_tee_cotton_heritage_ow1086/medium/womens/backleft/05_chow1086_onwoman_backleft_base_whitebg.png?v=1691488750",
                    background_color: "#99a173",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
            ],
        },
        {
            productName: "Women's Pique Polo Shirt | Gildan 64800L",
            price: 17.75,
            images: [
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/front/05_Womens_Pique_Polo_Shirt_placement_front_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/left/zoomed/05_Womens_Pique_Polo_Shirt_placement_left_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/right/zoomed/05_Womens_Pique_Polo_Shirt_placement_right_zoomed_base_whitebg.png?v=1680778277",
                    background_color: "#111111",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/left/05_Womens_Pique_Polo_Shirt_placement_left_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Left",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/right/05_Womens_Pique_Polo_Shirt_placement_right_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Right",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/front/zoomed/05_Womens_Pique_Polo_Shirt_placement_front_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/frontright/05_Womens_Pique_Polo_Shirt_basic_mockup_frontright_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/front/05_Womens_Pique_Polo_Shirt_placement_front_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_sleeve_left_top",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/frontright/05_Womens_Pique_Polo_Shirt_basic_mockup_frontright_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/front/05_Womens_Pique_Polo_Shirt_placement_front_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_sleeve_right_top",
                    image_url:
                        "https://files.cdn.printful.com/m/womens_pique_polo_shirt_gildan_64800l/medium/womens/frontright/05_Womens_Pique_Polo_Shirt_basic_mockup_frontright_base_whitebg.png?v=1680778230",
                    background_color: "#111111",
                    background_image: null,
                    option: "Front 2",
                    option_group: "Women's",
                },
            ],
        },
        {
            productName: "Women's Relaxed T-Shirt | Bella + Canvas 6400",
            price: 17.25,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/front/05_bc6400_onwoman_front_base_whitebg.png?v=1673947773",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1673947773",
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/back/05_bc6400_onwoman_back_base_whitebg.png?v=1673947773",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1673947773",
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/frontleft/05_bc6400_onwoman_frontleft_base_whitebg.png?v=1674543903",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1674543903",
                    option: "Left Front",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/left/zoomed/05_bc6400_onwoman_left_base_whitebg.png?v=1674543903",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1674543903",
                    option: "Left",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/frontright/05_bc6400_onwoman_frontright_base_whitebg.png?v=1674543907",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1674543907",
                    option: "Right Front",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/right/zoomed/05_bc6400_onwoman_right_base_whitebg.png?v=1674543904",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1674543904",
                    option: "Right",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/embroidery_chest_left/zoomed/05_bc6400_onwoman_front_base_whitebg.png?v=1673947773",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/zoomed/01_bc6400_bi_athletic-heather.jpg?v=1673947773",
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/front/05_bc6400_onwoman_front_base_whitebg.png?v=1673947773",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1673947773",
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/front/05_bc6400_onwoman_front_base_whitebg.png?v=1673947773",
                    background_color: "#b7b7b7",
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1673947773",
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/embroidery_chest_left/zoomed/05_bc6400_onwoman_front_base_whitebg.png?v=1673947773",
                    background_color: "#b7b7b7",
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/zoomed/01_bc6400_bi_athletic-heather.jpg?v=1673947773",
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/bc6400/medium/onwoman/back/05_bc6400_onwoman_back_base_whitebg.png?v=1674543901",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc6400/medium/bgImages/01_bc6400_bi_athletic-heather.jpg?v=1674543901",
                    option: "Back",
                    option_group: "Women's",
                },
            ],
        },
        {
            productName: "Unisex Hooded Long Sleeve Tee | Bella Canvas 3512",
            price: 22.95,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/front/05_bc3512_ghost_front_base_whitebg.png?v=1700740959",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/back/05_bc3512_ghost_back_base_whitebg.png?v=1700740518",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/left/05_bc3512_ghost_left_base_whitebg.png?v=1700740999",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/right/05_bc3512_ghost_right_base_whitebg.png?v=1700740518",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/back/05_bc3512_ghost_back_base_whitebg.png?v=1700740518",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/left/zoomed/05_bc3512_ghost_left_base_whitebg.png?v=1700740518",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/right/zoomed/05_bc3512_ghost_right_base_whitebg.png?v=1700741086",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/front/05_bc3512_ghost_front_base_whitebg.png?v=1700740959",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/front/05_bc3512_ghost_front_base_whitebg.png?v=1700740959",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/front/embroidery/05_bc3512_ghost_front_base_whitebg.png?v=1700741122",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/front/embroidery/05_bc3512_ghost_front_base_whitebg.png?v=1700741137",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/left/05_bc3512_ghost_left_base_whitebg.png?v=1700740999",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/ghost/right/05_bc3512_ghost_right_base_whitebg.png?v=1700740518",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/womens/front/05_bc3512_onwoman_front_base_whitebg.png?v=1700740518",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/womens/back/05_bc3512_onwoman_back_base_whitebg.png?v=1700741241",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/womens/back/05_bc3512_onwoman_back_base_whitebg.png?v=1700741242",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/womens/front/05_bc3512_onwoman_front_base_whitebg.png?v=1700740518",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/unisex_hooded_long_sleeve_tee_bella_canvas_3512/medium/womens/front/05_bc3512_onwoman_front_base_whitebg.png?v=1700740518",
                    background_color: "#0a0a0a",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
            ],
        },
        {
            productName: "Women's Fashion Fit T-Shirt | Gildan 880",
            price: 15.45,
            images: [
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/a880/medium/onwoman/embroidery_chest_left/zoomed/05_anvil880_onwoman_front_zoomed_base_whitebg.png?v=1685012183",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/a880/medium/onwoman/front/05_anvil880_onwoman_front_base_whitebg.png?v=1685012183",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/a880/medium/onwoman/front/05_anvil880_onwoman_front_base_whitebg.png?v=1685012183",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/a880/medium/onwoman/back/05_anvil880_onwoman_back_base_whitebg.png?v=1685012183",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/a880/medium/onwoman/front/05_anvil880_onwoman_front_base_whitebg.png?v=1685012183",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/a880/medium/onwoman/embroidery_chest_left/zoomed/05_anvil880_onwoman_front_zoomed_base_whitebg.png?v=1685012183",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/a880/medium/onwoman/back/05_anvil880_onwoman_back_base_whitebg.png?v=1685012183",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
            ],
        },
        {
            productName: "Women's Muscle Tank | Bella + Canvas 8803",
            price: 17.95,
            images: [],
        },
        {
            productName: "Unisex Long Sleeve Tee | Bella + Canvas 3501",
            price: 19.75,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/front/05_bc3501_onwoman_front_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/back/05_bc3501_onwoman_back_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/frontleft/05_bc3501_onwoman_frontleft_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Left Front",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/left/05_bc3501_onwoman_left_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Left",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/frontright/05_bc3501_onwoman_frontright_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Right Front",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/right/05_bc3501_onwoman_right_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Right",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/embroidery_chest_left/zoomed/05_bc3501_onwoman_front_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/zoomed/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/front/05_bc3501_onwoman_front_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/front/05_bc3501_onwoman_front_base_whitebg.png?v=1692944003",
                    background_color: "#b5b4b4",
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/embroidery_chest_left/zoomed/05_bc3501_onwoman_front_base_whitebg.png?v=1692944003",
                    background_color: "#b5b4b4",
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/zoomed/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/bc3501/medium/onwoman/back/05_bc3501_onwoman_back_base_whitebg.png?v=1692944003",
                    background_color: null,
                    background_image:
                        "https://files.cdn.printful.com/m/bc3501/medium/bgImages/01_bc3501_bi_athletic-heather.jpg?v=1692944003",
                    option: "Back",
                    option_group: "Women's",
                },
            ],
        },
    ],
    Hoodies: [
        // {
        //     productName: "Unisex Lightweight Zip Hoodie | Bella + Canvas 3939",
        //     price: 33.5,
        //     images: [
        //         {
        //             placement: "front",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/04_bc3939_onmodel_front_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/01_bc3939_onmodel_front_black.png?v=1696406294",
        //             option: "Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "back",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/back/04_bc3939_onmodel_back_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/back/01_bc3939_onmodel_back_black.png?v=1696406294",
        //             option: "Back",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/04_bc3939_onmodel_front_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/01_bc3939_onmodel_front_black.png?v=1696406294",
        //             option: "Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/embroidery/05_bc3939_onwoman_front_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/embroidery/02_bc3939_onwoman_front_solidblack.png?v=1696406294",
        //             option: "Zoomed-in",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/04_bc3939_onmodel_front_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/01_bc3939_onmodel_front_black.png?v=1696406294",
        //             option: "Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/04_bc3939_onmodel_front_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/01_bc3939_onmodel_front_black.png?v=1696406294",
        //             option: "Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/back/04_bc3939_onmodel_back_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/back/01_bc3939_onmodel_back_black.png?v=1696406294",
        //             option: "Back",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/back/04_bc3939_onmodel_back_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/back/01_bc3939_onmodel_back_black.png?v=1696406294",
        //             option: "Back",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/embroidery/05_bc3939_onwoman_front_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/embroidery/02_bc3939_onwoman_front_solidblack.png?v=1696406294",
        //             option: "Zoomed-in",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/embroidery/05_bc3939_onwoman_front_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/front/embroidery/02_bc3939_onwoman_front_solidblack.png?v=1696406294",
        //             option: "Zoomed-in",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "label_outside",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/back/04_bc3939_onmodel_back_base_whitebg.png?v=1696406294",
        //             background_color: null,
        //             background_image:
        //                 "https://files.cdn.printful.com/m/185-bella-canvas-3939/medium/onmodel/woman/back/01_bc3939_onmodel_back_black.png?v=1696406294",
        //             option: "Back",
        //             option_group: "Women's",
        //         },
        //     ],
        // },
        {
            productName: "Unisex Premium Hoodie | Cotton Heritage M2580",
            price: 29.45,
            images: [
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/back/05_chm2580_onwoman_back_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/frontleft/05_chm2580_onwoman_frontleft_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left Front",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/left/05_chm2580_onwoman_left_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/frontright/05_chm2580_onwoman_frontright_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right Front",
                    option_group: "Women's",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/right/05_chm2580_onwoman_right_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/embroidery_chest_left/zoomed/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/embroidery_chest_left/zoomed/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Zoomed-in",
                    option_group: "Women's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "label_outside",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/back/05_chm2580_onwoman_back_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Women's",
                },
                {
                    placement: "label_inside",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/left/05_chm2580_onwoman_left_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/right/05_chm2580_onwoman_right_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/onwoman/front/05_chm2580_onwoman_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Women's",
                },
                {
                    placement: "front",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/front/05_m2580_ghost_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "back",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/back/05_m2580_ghost_back_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/left/05_m2580_ghost_left_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "sleeve_right",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/right/05_m2580_ghost_right_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/front/05_m2580_ghost_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_chest_center",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/front/05_m2580_ghost_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_left",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/left/05_m2580_ghost_left_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "embroidery_wrist_right",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/right/05_m2580_ghost_right_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "long_sleeve_left_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/left/05_m2580_ghost_left_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Left",
                    option_group: "Ghost",
                },
                {
                    placement: "long_sleeve_right_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/right/05_m2580_ghost_right_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Right",
                    option_group: "Ghost",
                },
                {
                    placement: "back_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/back/05_m2580_ghost_back_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Back",
                    option_group: "Ghost",
                },
                {
                    placement: "front_dtf",
                    image_url:
                        "https://files.cdn.printful.com/m/m2580/medium/ghost/front/05_m2580_ghost_front_base_whitebg.png?v=1702304398",
                    background_color: "#ffffff",
                    background_image: null,
                    option: "Front",
                    option_group: "Ghost",
                },
            ],
        },
        // {
        //     productName: "Unisex Heavy Blend Hoodie | Gildan 18500",
        //     price: 21.95,
        //     images: [
        //         {
        //             placement: "front",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "back",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094386",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_center",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/zoomed/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Zoomed-in",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/zoomed/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Zoomed-in",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/left/zoomed/05_gildan18500_ghost_left_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Zoomed-in",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/right/zoomed/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Zoomed-in",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_center",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "label_outside",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_center",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094387",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_center",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094387",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094389",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "front_dtf",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731683",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "back_dtf",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "long_sleeve_left_dtf",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/left/05_gildan18500_ghost_left_base_whitebg.png?v=1701094389",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "long_sleeve_right_dtf",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/g18500/medium/ghost/right/05_gildan18500_ghost_right_base_whitebg.png?v=1700731761",
        //             background_color: "#ffffff",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //     ],
        // },
        // {
        //     productName: "Women's Cropped Hoodie | Bella + Canvas 7502",
        //     price: 34.5,
        //     images: [
        //         {
        //             placement: "front",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/front/04_bc7502_onwoman_front_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "back",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/back/04_bc7502_onwoman_back_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/front/04_bc7502_onwoman_front_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/embroidery_chest_left/zoomed/05_bc7502_onwoman_front_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Zoomed-in",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_chest_center",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/front/04_bc7502_onwoman_front_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_chest_center",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/embroidery_chest_left/zoomed/05_bc7502_onwoman_front_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Zoomed-in",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/left_template/05_bc7502_onwoman_left_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left Template",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/left/04_bc7502_onwoman_left_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/right_template/05_bc7502_onwoman_right_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right Template",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/right/04_bc7502_onwoman_right_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/frontleft/04_bc7502_onwoman_frontleft_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/frontright/04_bc7502_onwoman_frontright_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/left/04_bc7502_onwoman_left_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/frontleft/04_bc7502_onwoman_frontleft_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/right/04_bc7502_onwoman_right_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/onwoman/frontright/04_bc7502_onwoman_frontright_base_whitebg.png?v=1701956506",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right Front",
        //             option_group: "Women's",
        //         },
        //         {
        //             placement: "back",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/back/05_bc7502_ghost_back_base_whitebg.png?v=1702387391",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "front",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/front/05_bc7502_ghost_front_base_whitebg.png?v=1702387395",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/left/05_bc7502_ghost_left_base_whitebg.png?v=1702387398",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/right/05_bc7502_ghost_right_base_whitebg.png?v=1702387400",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/right/05_bc7502_ghost_right_base_whitebg.png?v=1702387400",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/left/05_bc7502_ghost_left_base_whitebg.png?v=1702387398",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/front/05_bc7502_ghost_front_base_whitebg.png?v=1702387395",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_chest_center",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/front/05_bc7502_ghost_front_base_whitebg.png?v=1702387395",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/back/05_bc7502_ghost_back_base_whitebg.png?v=1702387392",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/back/05_bc7502_ghost_back_base_whitebg.png?v=1702387392",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/back/05_bc7502_ghost_back_base_whitebg.png?v=1702387392",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/back/05_bc7502_ghost_back_base_whitebg.png?v=1702387392",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Back",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/front/05_bc7502_ghost_front_base_whitebg.png?v=1702387395",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "sleeve_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/front/05_bc7502_ghost_front_base_whitebg.png?v=1702387395",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_left",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/front/05_bc7502_ghost_front_base_whitebg.png?v=1702387395",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "embroidery_wrist_right",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/front/05_bc7502_ghost_front_base_whitebg.png?v=1702387395",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Front",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "front",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/left/05_bc7502_ghost_left_base_whitebg.png?v=1702387398",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "back",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/left/05_bc7502_ghost_left_base_whitebg.png?v=1702387398",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Left",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "back",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/right/05_bc7502_ghost_right_base_whitebg.png?v=1702387400",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //         {
        //             placement: "front",
        //             image_url:
        //                 "https://files.cdn.printful.com/m/bc7502/medium/ghost/right/05_bc7502_ghost_right_base_whitebg.png?v=1702387400",
        //             background_color: "#0d0d0d",
        //             background_image: null,
        //             option: "Right",
        //             option_group: "Ghost",
        //         },
        //     ],
        // },
    ],
};

const hats = [
    {
        productName: "5 Panel Cap | Yupoong 7005",
        price: 15.95,
        images: [
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/front/yupoong-7005-front-Black.png?v=1685431168",
                background_color: null,
                background_image: null,
                option: "Front",
                option_group: "Default",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/back/yupoong-7005-back-Black.png?v=1685431168",
                background_color: null,
                background_image: null,
                option: "Back",
                option_group: "Default",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/front/05_yupoong7005_flat_front_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/back/05_yupoong7005_flat_back_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Back",
                option_group: "Flat",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/left/05_yupoong7005_flat_left_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Left",
                option_group: "Flat",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/right/05_yupoong7005_flat_right_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Right",
                option_group: "Flat",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/frontright/05_yupoong7005_flat_frontright_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Right Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/frontleft/05_yupoong7005_flat_frontleft_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Left Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/front/05_yupoong7005_flat_front_base_greybg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/back/05_yupoong7005_flat_back_base_greybg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Back",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/left/05_yupoong7005_flat_left_base_greybg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Left",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/frontleft/05_yupoong7005_flat_frontleft_base_greybg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Left Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/frontright/05_yupoong7005_flat_frontright_base_greybg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Right Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/right/05_yupoong7005_flat_right_base_greybg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Right",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_lifestyle/05_yupoong7005_flat_front_base.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Front",
                option_group: "Flat Lifestyle 2",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/onman_lifestyle/front/05_yupoong7005_onman_front_base.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Front",
                option_group: "Men's Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/onwoman_lifestyle/front/05_yupoong7005_onwoman_front_base.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Front",
                option_group: "Women's Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/detail/05_yupoong7005_flat_detail_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/detail/05_yupoong7005_flat_detail_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/detail/05_yupoong7005_flat_detail_base_greybg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/flat_2/detail/05_yupoong7005_flat_detail_base_greybg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/mens/front/05_Yupoong_7005_Mockup_Man_front_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Front",
                option_group: "Men's",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/123-yupoong-7005/medium/mens/back/05_Yupoong_7005_Mockup_Man_back_base_whitebg.png?v=1685431168",
                background_color: "#262626",
                background_image: null,
                option: "Back",
                option_group: "Men's",
            },
        ],
    },
    {
        productName: "Snapback | Otto Cap 125-978",
        price: 14.75,
        images: [
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/default/front/01_oc125_978_front_Red.png?v=1694587551",
                background_color: null,
                background_image: null,
                option: "Front",
                option_group: "Default",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/default/back/01_oc125_978_back_Red.png?v=1694587546",
                background_color: null,
                background_image: null,
                option: "Back",
                option_group: "Default",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/default/left/01_oc125_978_left_Red.png?v=1694676351",
                background_color: null,
                background_image: null,
                option: "Left Side",
                option_group: "Default",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/default/right/01_oc125_978_right_Red.png?v=1694587560",
                background_color: null,
                background_image: null,
                option: "Right Side",
                option_group: "Default",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/front/05_ottocap125978_flat_front_red_base_whitebg.png?v=1694587579",
                background_color: null,
                background_image: null,
                option: "Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/back/05_ottocap125978_flat_back_red_base_whitebg.png?v=1694587576",
                background_color: null,
                background_image: null,
                option: "Back",
                option_group: "Flat",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/left/05_ottocap125978_flat_left_red_base_whitebg.png?v=1694587586",
                background_color: null,
                background_image: null,
                option: "Left Side",
                option_group: "Flat",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/right/05_ottocap125978_flat_right_red_base_whitebg.png?v=1694587591",
                background_color: null,
                background_image: null,
                option: "Right Side",
                option_group: "Flat",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/frontright/05_ottocap125978_flat_frontright_red_base_whitebg.png?v=1694587589",
                background_color: null,
                background_image: null,
                option: "Right Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/frontleft/05_ottocap125978_flat_frontleft_red_base_whitebg.png?v=1694587584",
                background_color: null,
                background_image: null,
                option: "Left Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/front/05_ottocap125978_flat_front_red_base_greybg.png?v=1694587606",
                background_color: "#c6142c",
                background_image: null,
                option: "Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/back/05_ottocap125978_flat_back_red_base_greybg.png?v=1694587603",
                background_color: "#c6142c",
                background_image: null,
                option: "Back",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/left/05_ottocap125978_flat_left_red_base_greybg.png?v=1694587614",
                background_color: "#c6142c",
                background_image: null,
                option: "Left Side",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/right/05_ottocap125978_flat_right_red_base_greybg.png?v=1694587619",
                background_color: "#c6142c",
                background_image: null,
                option: "Right Side",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/frontright/05_ottocap125978_flat_frontright_red_base_greybg.png?v=1694587616",
                background_color: "#c6142c",
                background_image: null,
                option: "Right Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/frontleft/05_ottocap125978_flat_frontleft_red_base_greybg.png?v=1694587611",
                background_color: "#c6142c",
                background_image: null,
                option: "Left Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/onman_lifestyle/05_ottocap125978_onman_lifestyle_red.jpg?v=1694587661",
                background_color: "#c6142c",
                background_image: null,
                option: "Front",
                option_group: "Men's Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/onwoman_lifestyle/05_ottocap125978_onwoman_lifestyle_red.jpg?v=1694587720",
                background_color: "#c6142c",
                background_image: null,
                option: "Front",
                option_group: "Women's Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_whitebg.png?v=1694589699",
                background_color: null,
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_whitebg.png?v=1694589696",
                background_color: null,
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_whitebg.png?v=1694589707",
                background_color: null,
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_whitebg.png?v=1694589704",
                background_color: null,
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_greybg.png?v=1694589711",
                background_color: "#c6142c",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_greybg.png?v=1694589709",
                background_color: "#c6142c",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_greybg.png?v=1694589719",
                background_color: "#c6142c",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_greybg.png?v=1694589716",
                background_color: "#c6142c",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/christmas/red/05_ottocap125978_flat_front_red_base.jpg?v=1694587631",
                background_color: "#c6142c",
                background_image: null,
                option: "Front",
                option_group: "Holiday season",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/christmas/white/05_ottocap125978_flat_front_red_base.jpg?v=1694587636",
                background_color: "#c6142c",
                background_image: null,
                option: "Front 2",
                option_group: "Holiday season",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/templates/medium/hats/snapback_left_2x1.png?v=1694586684",
                background_color: "#c6142c",
                background_image: null,
                option: "Left",
                option_group: "Template",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/templates/medium/hats/snapback_right_2x1.png?v=1694586684",
                background_color: "#c6142c",
                background_image: null,
                option: "Right",
                option_group: "Template",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/mens/frontleft/05_ottocap125978_onman_frontleft_red_base_whitebg.png?v=1694587656",
                background_color: null,
                background_image: null,
                option: "Front",
                option_group: "Men's",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/mens/backright/05_ottocap125978_onman_backright_red_base_whitebg.png?v=1694587654",
                background_color: null,
                background_image: null,
                option: "Back",
                option_group: "Men's",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/default/front/01_oc125_978_front_Red.png?v=1694587553",
                background_color: null,
                background_image: null,
                option: "Front",
                option_group: "Default",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/front/05_ottocap125978_flat_front_red_base_whitebg.png?v=1695106081",
                background_color: null,
                background_image: null,
                option: "Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/front/05_ottocap125978_flat_front_red_base_greybg.png?v=1694587609",
                background_color: "#c6142c",
                background_image: null,
                option: "Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/onman_lifestyle/05_ottocap125978_onman_lifestyle_red.jpg?v=1694587664",
                background_color: "#c6142c",
                background_image: null,
                option: "Front",
                option_group: "Men's Lifestyle",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/onwoman_lifestyle/05_ottocap125978_onwoman_lifestyle_red.jpg?v=1694587722",
                background_color: "#c6142c",
                background_image: null,
                option: "Front",
                option_group: "Women's Lifestyle",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_whitebg.png?v=1694589702",
                background_color: null,
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/flat_2/detail/05_ottocap125978_flat_detail_red_base_greybg.png?v=1694589713",
                background_color: "#c6142c",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/christmas/red/05_ottocap125978_flat_front_red_base.jpg?v=1694587634",
                background_color: "#c6142c",
                background_image: null,
                option: "Front",
                option_group: "Holiday season",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/christmas/white/05_ottocap125978_flat_front_red_base.jpg?v=1694587638",
                background_color: "#c6142c",
                background_image: null,
                option: "Front 2",
                option_group: "Holiday season",
            },
            {
                placement: "embroidery_front_large",
                image_url:
                    "https://files.cdn.printful.com/m/oc125_978/medium/mens/frontleft/05_ottocap125978_onman_frontleft_red_base_whitebg.png?v=1694587659",
                background_color: null,
                background_image: null,
                option: "Front",
                option_group: "Men's",
            },
        ],
    },
    {
        productName: "Classic Snapback | Yupoong 6089M",
        price: 14.95,
        images: [
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman/front/04_yupoong_6089m_front_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman/front/04_yupoong_6089m_front_black.png?v=1693821563",
                option: "Front",
                option_group: "Women's",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman/back/04_yupoong_6089m_back_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman/back/04_yupoong_6089m_back_black.png?v=1693821563",
                option: "Back",
                option_group: "Women's",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman/left/04_yupoong_6089m_left_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman/left/04_yupoong_6089m_left_black.png?v=1693821563",
                option: "Left Side",
                option_group: "Women's",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman/right/04_yupoong_6089m_right_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman/right/04_yupoong_6089m_right_black.png?v=1693821563",
                option: "Right Side",
                option_group: "Women's",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onman/front/04_yupoong_6089m_front_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/onman/front/04_yupoong_6089m_front_black.png?v=1693821563",
                option: "Front",
                option_group: "Men's",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onman/back/04_yupoong_6089m_back_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/onman/back/04_yupoong_6089m_back_black.png?v=1693821563",
                option: "Back",
                option_group: "Men's",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onman/left/04_yupoong_6089m_left_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/onman/left/04_yupoong_6089m_left_black.png?v=1693821563",
                option: "Left Side",
                option_group: "Men's",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onman/right/04_yupoong_6089m_right_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/onman/right/04_yupoong_6089m_right_black.png?v=1693821563",
                option: "Right Side",
                option_group: "Men's",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/default/front/04_yupoong_6089m_front_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/default/front/04_yupoong_6089m_front_black.png?v=1693821563",
                option: "Front",
                option_group: "Default",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/default/back/04_yupoong_6089m_back_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/default/back/04_yupoong_6089m_back_black.png?v=1693821563",
                option: "Back",
                option_group: "Default",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/default/left/04_yupoong_6089m_left_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/default/left/04_yupoong_6089m_left_black.png?v=1693821563",
                option: "Left Side",
                option_group: "Default",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/default/right/04_yupoong_6089m_right_black.png?v=1693821563",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/6089M/medium/default/right/04_yupoong_6089m_right_black.png?v=1693821563",
                option: "Right Side",
                option_group: "Default",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/front/03_yupoong6089m_flat_front_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/back/03_yupoong6089m_flat_back_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Back",
                option_group: "Flat",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/left/03_yupoong6089m_flat_left_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Left Side",
                option_group: "Flat",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/right/03_yupoong6089m_flat_right_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Right Side",
                option_group: "Flat",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/frontright/03_yupoong6089m_flat_frontright_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Right Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/frontleft/03_yupoong6089m_flat_frontleft_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Left Front",
                option_group: "Flat",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/front/03_yupoong6089m_flat_front_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/back/03_yupoong6089m_flat_back_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Back",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/right/03_yupoong6089m_flat_right_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Right Side",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/left/03_yupoong6089m_flat_left_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Left Side",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/frontleft/03_yupoong6089m_flat_frontleft_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Left Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_2/frontright/03_yupoong6089m_flat_frontright_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Right Front",
                option_group: "Flat Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/flat_lifestyle/yupoong6089m_flat_lifestyle_front_black.jpg?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Flat Lifestyle 2",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onman_2/yupoong6089m_onman_2_frontleft_black.jpg?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Men's Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman_2/yupoong6089m_onwoman_2_front_blak.jpg?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Women's Lifestyle",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/detail/05_yupoong6089m_detail_black_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/detail/05_yupoong6089m_detail_black_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/detail/05_yupoong6089m_detail_black_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/detail/05_yupoong6089m_detail_black_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Product details",
                option_group: "Product details",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/detail/05_yupoong6089m_detail_black_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/detail/05_yupoong6089m_detail_black_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/detail/05_yupoong6089m_detail_black_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/detail/05_yupoong6089m_detail_black_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Product details 2",
                option_group: "Product details",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/christmas/red/03_yupoong6089m_flat_front_base.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Holiday season",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/christmas/white/03_yupoong6089m_flat_front_base.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front 2",
                option_group: "Holiday season",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman_3/front/05_yupoong6089m_onwoman_front_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Women's 2",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman_3/frontright/05_yupoong6089m_onwoman_frontright_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Right Side",
                option_group: "Women's 2",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman_3/back/05_yupoong6089m_onwoman_back_base_whitebg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Back",
                option_group: "Women's 2",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman_3/front/05_yupoong6089m_onwoman_front_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Women's Lifestyle 2",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman_3/frontright/05_yupoong6089m_onwoman_frontright_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Right Side",
                option_group: "Women's Lifestyle 2",
            },
            {
                placement: "embroidery_back",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/onwoman_3/back/05_yupoong6089m_onwoman_back_base_greybg.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Back",
                option_group: "Women's Lifestyle 2",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/spring_summer/front/03_yupoong6089m_flat_front_base.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front",
                option_group: "Spring/summer vibes",
            },
            {
                placement: "embroidery_front",
                image_url:
                    "https://files.cdn.printful.com/m/6089M/medium/spring_summer/front_2/03_yupoong6089m_flat_front_base.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Front 2",
                option_group: "Spring/summer vibes",
            },
            {
                placement: "embroidery_left",
                image_url:
                    "https://files.cdn.printful.com/m/templates/medium/hats/snapback_left_2x1.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Left",
                option_group: "Template",
            },
            {
                placement: "embroidery_right",
                image_url:
                    "https://files.cdn.printful.com/m/templates/medium/hats/snapback_right_2x1.png?v=1693821563",
                background_color: "#2a2a2a",
                background_image: null,
                option: "Right",
                option_group: "Template",
            },
        ],
    },
];

const accessories = [
    {
        productName: "Tough Case for iPhone®",
        price: 16.5,
        images: [
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/flat/11/05_toughcase_iphone11_flat_base_whitebg.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Front",
                option_group: "Flat",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/product_spec/11/05_toughcase_iphone11_flat_base_whitebg.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Front",
                option_group: "Product specs",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/flat2/11/05_toughcase_iphone11_flat_base_whitebg.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Front",
                option_group: "Flat 2",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/lifestyle2/11/05_toughcase_iphone11_base_whitebg.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Right",
                option_group: "Lifestyle",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/template2/11.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Front",
                option_group: "Template",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/lifestyle_3/11/05_tough_iphone_11_lifestyle3_base.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Front",
                option_group: "Lifestyle 2",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/lifestyle_4/11/05_tough_iphone_11_lifestyle4_base.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Front",
                option_group: "Lifestyle 3",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/lifestyle_5/11/05_tough_iphone_11_lifestyle5_base.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Front",
                option_group: "Lifestyle 4",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/Tough_iPhone_case/medium/lifestyle_6/11/05_tough_iphone_11_lifestyle6_base.png?v=1694600424",
                background_color: "#ffffff",
                background_image: null,
                option: "Front",
                option_group: "Lifestyle 5",
            },
        ],
        variants: [
            {
                id: 15381,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 11)",
                size: "iPhone 11",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15381_1654239978.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15381",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15381/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15381/images",
                    },
                },
            },
            {
                id: 15382,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 11 Pro)",
                size: "iPhone 11 Pro",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15382_1654239978.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15382",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15382/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15382/images",
                    },
                },
            },
            {
                id: 15383,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 11 Pro Max)",
                size: "iPhone 11 Pro Max",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15383_1654239967.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15383",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15383/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15383/images",
                    },
                },
            },
            {
                id: 15384,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 12)",
                size: "iPhone 12",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15384_1654240008.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15384",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15384/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15384/images",
                    },
                },
            },
            {
                id: 15385,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 12 mini)",
                size: "iPhone 12 mini",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15385_1654239988.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15385",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15385/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15385/images",
                    },
                },
            },
            {
                id: 15386,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 12 Pro)",
                size: "iPhone 12 Pro",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15386_1654239998.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15386",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15386/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15386/images",
                    },
                },
            },
            {
                id: 15387,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 12 Pro Max)",
                size: "iPhone 12 Pro Max",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15387_1654239988.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15387",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15387/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15387/images",
                    },
                },
            },
            {
                id: 15388,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 13)",
                size: "iPhone 13",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15388_1654240110.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15388",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15388/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15388/images",
                    },
                },
            },
            {
                id: 15389,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 13 mini)",
                size: "iPhone 13 mini",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15389_1654240008.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15389",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15389/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15389/images",
                    },
                },
            },
            {
                id: 15390,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 13 Pro)",
                size: "iPhone 13 Pro",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15390_1654240019.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15390",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15390/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15390/images",
                    },
                },
            },
            {
                id: 15391,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 13 Pro Max)",
                size: "iPhone 13 Pro Max",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15391_1654240019.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15391",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15391/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15391/images",
                    },
                },
            },
            {
                id: 15392,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 11)",
                size: "iPhone 11",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15392_1654240710.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15392",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15392/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15392/images",
                    },
                },
            },
            {
                id: 15393,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 11 Pro)",
                size: "iPhone 11 Pro",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15393_1654240709.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15393",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15393/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15393/images",
                    },
                },
            },
            {
                id: 15394,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 11 Pro Max)",
                size: "iPhone 11 Pro Max",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15394_1654240029.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15394",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15394/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15394/images",
                    },
                },
            },
            {
                id: 15395,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 12)",
                size: "iPhone 12",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15395_1654240740.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15395",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15395/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15395/images",
                    },
                },
            },
            {
                id: 15396,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 12 mini)",
                size: "iPhone 12 mini",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15396_1654240710.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15396",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15396/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15396/images",
                    },
                },
            },
            {
                id: 15397,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 12 Pro)",
                size: "iPhone 12 Pro",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15397_1654240730.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15397",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15397/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15397/images",
                    },
                },
            },
            {
                id: 15398,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 12 Pro Max)",
                size: "iPhone 12 Pro Max",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15398_1654240720.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15398",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15398/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15398/images",
                    },
                },
            },
            {
                id: 15399,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 13)",
                size: "iPhone 13",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15399_1654240761.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15399",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15399/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15399/images",
                    },
                },
            },
            {
                id: 15400,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 13 mini)",
                size: "iPhone 13 mini",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15400_1654240740.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15400",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15400/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15400/images",
                    },
                },
            },
            {
                id: 15401,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 13 Pro)",
                size: "iPhone 13 Pro",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15401_1654240751.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15401",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15401/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15401/images",
                    },
                },
            },
            {
                id: 15402,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 13 Pro Max)",
                size: "iPhone 13 Pro Max",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/15402_1654240750.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/15402",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/15402/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/15402/images",
                    },
                },
            },
            {
                id: 16124,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 14)",
                size: "iPhone 14",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/16124_1663581883.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/16124",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/16124/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/16124/images",
                    },
                },
            },
            {
                id: 16125,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 14)",
                size: "iPhone 14",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/16125_1663581915.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/16125",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/16125/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/16125/images",
                    },
                },
            },
            {
                id: 16126,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 14 Pro)",
                size: "iPhone 14 Pro",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/16126_1663581883.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/16126",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/16126/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/16126/images",
                    },
                },
            },
            {
                id: 16127,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 14 Pro)",
                size: "iPhone 14 Pro",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/16127_1663581915.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/16127",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/16127/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/16127/images",
                    },
                },
            },
            {
                id: 16128,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 14 Plus)",
                size: "iPhone 14 Plus",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/16128_1663581873.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/16128",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/16128/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/16128/images",
                    },
                },
            },
            {
                id: 16129,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 14 Plus)",
                size: "iPhone 14 Plus",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/16129_1663581905.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/16129",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/16129/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/16129/images",
                    },
                },
            },
            {
                id: 16130,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 14 Pro Max)",
                size: "iPhone 14 Pro Max",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/16130_1663581877.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/16130",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/16130/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/16130/images",
                    },
                },
            },
            {
                id: 16131,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 14 Pro Max)",
                size: "iPhone 14 Pro Max",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/16131_1663581905.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/16131",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/16131/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/16131/images",
                    },
                },
            },
            {
                id: 17714,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 15)",
                size: "iPhone 15",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/17714_1694436355.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/17714",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/17714/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/17714/images",
                    },
                },
            },
            {
                id: 17715,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 15)",
                size: "iPhone 15",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/17715_1694436372.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/17715",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/17715/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/17715/images",
                    },
                },
            },
            {
                id: 17716,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 15 Plus)",
                size: "iPhone 15 Plus",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/17716_1694436350.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/17716",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/17716/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/17716/images",
                    },
                },
            },
            {
                id: 17717,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 15 Plus)",
                size: "iPhone 15 Plus",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/17717_1694436361.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/17717",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/17717/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/17717/images",
                    },
                },
            },
            {
                id: 17718,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 15 Pro)",
                size: "iPhone 15 Pro",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/17718_1694436354.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/17718",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/17718/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/17718/images",
                    },
                },
            },
            {
                id: 17719,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 15 Pro)",
                size: "iPhone 15 Pro",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/17719_1694436372.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/17719",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/17719/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/17719/images",
                    },
                },
            },
            {
                id: 17720,
                product_id: 601,
                name: "Tough iPhone Case (Glossy / iPhone 15 Pro Max)",
                size: "iPhone 15 Pro Max",
                color: "Glossy",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/17720_1694436351.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/17720",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/17720/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/17720/images",
                    },
                },
            },
            {
                id: 17721,
                product_id: 601,
                name: "Tough iPhone Case (Matte / iPhone 15 Pro Max)",
                size: "iPhone 15 Pro Max",
                color: "Matte",
                color_code: "#ffffff",
                color_code2: null,
                image: "https://files.cdn.printful.com/products/601/17721_1694436371.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/17721",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/601",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/601/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/17721/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/17721/images",
                    },
                },
            },
        ],
    },
    {
        productName: "Clear Case for Samsung®",
        price: 10.75,
        images: [
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/s10/05_samsung_s10_overlay.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/s10/02_samsung_s10_base.png?v=1647433821",
                option: "Case on phone",
                option_group: "Default",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/s10/off/05_samsung_s10_overlay.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/s10/off/02_samsung_s10_base.png?v=1647433821",
                option: "Case with phone",
                option_group: "Default",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/lifestyle_ver1/s10/02_samsung_s10_base.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/lifestyle_ver1/s10/02_samsung_s10_base.png?v=1647433821",
                option: "Lifestyle 1",
                option_group: "Lifestyle",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/lifestyle_ver2/s10/02_samsung_s10_base.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/lifestyle_ver2/s10/02_samsung_s10_base.png?v=1647433821",
                option: "Lifestyle 2",
                option_group: "Lifestyle",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/lifestyle_ver4/s10/02_samsung_s10_base.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/lifestyle_ver4/s10/02_samsung_s10_base.png?v=1647433821",
                option: "Lifestyle 4",
                option_group: "Lifestyle",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/halloween/dark/S10/03_samsung_s10_base.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/halloween/dark/S10/03_samsung_s10_base.png?v=1647433821",
                option: "Halloween",
                option_group: "Halloween",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/halloween/light/S10/03_samsung_s10_base.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/halloween/light/S10/03_samsung_s10_base.png?v=1647433821",
                option: "Halloween 2",
                option_group: "Halloween",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/Christmas/s10/03_s10_christmas_base.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/Christmas/s10/03_s10_christmas_base.png?v=1647433821",
                option: "Christmas",
                option_group: "Holiday season",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/spring-summer/s10/03_s10_summer_yellow_base.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/spring-summer/s10/03_s10_summer_yellow_base.png?v=1647433821",
                option: "Spring/Summer",
                option_group: "Spring/summer vibes",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/spring-summer/s10/03_s10_summer_light_base.png?v=1647433821",
                background_color: null,
                background_image:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/spring-summer/s10/03_s10_summer_light_base.png?v=1647433821",
                option: "Spring/Summer 2",
                option_group: "Spring/summer vibes",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/splash/s10/03_s10_lifestyle_white_base_whitebg.png?v=1647433821",
                background_color: null,
                background_image: null,
                option: "Case on phone",
                option_group: "Lifestyle 2",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/splash/s10/03_s10_lifestyle_blue_base_whitebg.png?v=1647433821",
                background_color: null,
                background_image: null,
                option: "Case on phone 2",
                option_group: "Lifestyle 2",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/splash/s10/03_s10_lifestyle_orange_base_whitebg.png?v=1647433821",
                background_color: null,
                background_image: null,
                option: "Case on phone 3",
                option_group: "Lifestyle 2",
            },
            {
                placement: "default",
                image_url:
                    "https://files.cdn.printful.com/m/163-samsung-cases/medium/lifestyle_3/s10/04_samsung_s10_inhand_base_whitebg.png?v=1647433821",
                background_color: null,
                background_image: null,
                option: "Case on phone",
                option_group: "Lifestyle 3",
            },
        ],
        variants: [
            {
                id: 9945,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S10)",
                size: "Samsung Galaxy S10",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/9945_1582201424.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/9945",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/9945/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/9945/images",
                    },
                },
            },
            {
                id: 9946,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S10e)",
                size: "Samsung Galaxy S10e",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/9946_1582201474.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/9946",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/9946/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/9946/images",
                    },
                },
            },
            {
                id: 9947,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S10+)",
                size: "Samsung Galaxy S10+",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/9947_1582201447.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/9947",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/9947/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/9947/images",
                    },
                },
            },
            {
                id: 11347,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S20)",
                size: "Samsung Galaxy S20",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/11347_1584528512.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/11347",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/11347/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/11347/images",
                    },
                },
            },
            {
                id: 11348,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S20 Plus)",
                size: "Samsung Galaxy S20 Plus",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/11348_1584528498.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/11348",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/11348/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/11348/images",
                    },
                },
            },
            {
                id: 11349,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S20 Ultra)",
                size: "Samsung Galaxy S20 Ultra",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/11349_1584528399.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/11349",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/11349/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/11349/images",
                    },
                },
            },
            {
                id: 12024,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S20 FE)",
                size: "Samsung Galaxy S20 FE",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/12024_1614239810.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/12024",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/12024/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/12024/images",
                    },
                },
            },
            {
                id: 12025,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S21)",
                size: "Samsung Galaxy S21",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/12025_1615296198.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "stocked_on_demand" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/12025",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/12025/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/12025/images",
                    },
                },
            },
            {
                id: 12026,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S21 Ultra)",
                size: "Samsung Galaxy S21 Ultra",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/12026_1615296332.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/12026",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/12026/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/12026/images",
                    },
                },
            },
            {
                id: 12027,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S21 Plus)",
                size: "Samsung Galaxy S21 Plus",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/12027_1615296293.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/12027",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/12027/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/12027/images",
                    },
                },
            },
            {
                id: 14633,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S22)",
                size: "Samsung Galaxy S22",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/14633_1645797555.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "supplier_out_of_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/14633",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/14633/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/14633/images",
                    },
                },
            },
            {
                id: 14634,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S22 Plus)",
                size: "Samsung Galaxy S22 Plus",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/14634_1645797547.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/14634",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/14634/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/14634/images",
                    },
                },
            },
            {
                id: 14635,
                product_id: 267,
                name: "Clear Case for Samsung® (Samsung Galaxy S22 Ultra)",
                size: "Samsung Galaxy S22 Ultra",
                color: null,
                color_code: null,
                color_code2: null,
                image: "https://files.cdn.printful.com/products/267/14635_1645797548.jpg",
                availability: [
                    { region: "United States", status: "in_stock" },
                    { region: "Europe", status: "in_stock" },
                    { region: "Latvia", status: "in_stock" },
                    { region: "Australia", status: "in_stock" },
                    { region: "United Kingdom", status: "in_stock" },
                ],
                _links: {
                    self: {
                        href: "https://api.printful.com/v2/catalog-variants/14635",
                    },
                    product_details: {
                        href: "https://api.printful.com/v2/catalog-products/267",
                    },
                    product_variants: {
                        href: "https://api.printful.com/v2/catalog-products/267/catalog-variants",
                    },
                    variant_prices: {
                        href: "https://api.printful.com/v2/catalog-variants/14635/prices",
                    },
                    variant_images: {
                        href: "https://api.printful.com/v2/catalog-variants/14635/images",
                    },
                },
            },
        ],
    },
    // {
    //     productName: "All-Over Print Tote",
    //     price: 17.75,
    //     images: [
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/03-allovertote-black-base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Default",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/template1/No_text_allovertote-template-simple.png?v=1679898197",
    //             background_color: null,
    //             background_image: null,
    //             option: null,
    //             option_group: null,
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/template/NO_text_tote_bag_mockup.png?v=1679898197",
    //             background_color: null,
    //             background_image: null,
    //             option: null,
    //             option_group: null,
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/03-allovertote-black-base.png?v=1679898197",
    //             background_color: null,
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Default",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/03-allovertote-black-base.png?v=1679898197",
    //             background_color: null,
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Default",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Lifestyle",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Lifestyle",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Lifestyle",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/flatlay/02_totebag_flatlay_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Flat Lifestyle",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/flatlay/02_totebag_flatlay_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat Lifestyle",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/flatlay/02_totebag_flatlay_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat Lifestyle",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle2/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Lifestyle 2",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle2/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Lifestyle 2",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle2/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Lifestyle 2",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle3/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Lifestyle 3",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle3/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Lifestyle 3",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle3/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Lifestyle 3",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle4/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Lifestyle 4",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle4/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Lifestyle 4",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/lifestyle4/02_totebag_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Lifestyle 4",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/halloween/dark/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Halloween",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/halloween/light/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Halloween",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/halloween/dark/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Halloween",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/halloween/light/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Halloween",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/halloween/dark/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Halloween",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/halloween/light/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Halloween",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/christmas/wood/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Holiday season",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/christmas/light/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Holiday season",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/christmas/wood/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Holiday season",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/christmas/light/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Holiday season",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/christmas/wood/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Holiday season",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/christmas/light/05_totebag_flat_black_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Holiday season",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/spring-summer/05_totebag_flat_black_yellow_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Spring/summer vibes",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/spring-summer/05_totebag_flat_black_yellow_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Spring/summer vibes",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/spring-summer/05_totebag_flat_black_light_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Spring/summer vibes",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/spring-summer/05_totebag_flat_black_light_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Spring/summer vibes",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/spring-summer/05_totebag_flat_black_yellow_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Spring/summer vibes",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/spring-summer/05_totebag_flat_black_light_base.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Mockup",
    //             option_group: "Spring/summer vibes",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/flat/05_aop_totebag_flat_black_base_whitebg.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/flat/05_aop_totebag_flat_black_base_whitebg.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/detail/05_aop_totebag_detail_black_base_whitebg.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/detail/05_aop_totebag_detail_black_base_whitebg.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/onhanger/05_aop_totebag_onhanger_black_base_whitebg.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "On Hanger",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/onhanger/05_aop_totebag_onhanger_black_base_whitebg.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "On Hanger",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/inhand/05_aop_totebag_inhand_black_base_whitebg.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Lifestyle 5",
    //         },
    //         {
    //             placement: "default",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-tote/medium/inhand/05_aop_totebag_inhand_black_base_whitebg.png?v=1679898197",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Lifestyle 5",
    //         },
    //     ],
    // },
    // {
    //     productName: "All-Over Print Minimalist Backpack",
    //     price: 35.25,
    //     images: [
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/template1/mockup_generator_template_front_No_text.png?v=1675853790",
    //             background_color: null,
    //             background_image: null,
    //             option: "Front",
    //             option_group: null,
    //         },
    //         {
    //             placement: "top",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/template1/mockup_generator_template_top_No_text.png?v=1675853790",
    //             background_color: null,
    //             background_image: null,
    //             option: "Top",
    //             option_group: null,
    //         },
    //         {
    //             placement: "bottom",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/template1/mockup_generator_template_bottom_No_text.png?v=1675853790",
    //             background_color: null,
    //             background_image: null,
    //             option: "Bottom",
    //             option_group: null,
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/default/front/05_premiumbackpack_front_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Default",
    //         },
    //         {
    //             placement: "top",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/default/back/05_premiumbackpack_back_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Default",
    //         },
    //         {
    //             placement: "bottom",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/default/bottom/05_premiumbackpack_bottom_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Bottom",
    //             option_group: "Default",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/default/frontleft/05_premiumbackpack_frontleft_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Default",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/default/frontright/05_premiumbackpack_frontright_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Default",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/lifestyle/front/05_premiumbackpack_lifestyle_onhanger_base.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Lifestyle 1",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/lifestyle_2/front/05_premiumbackpack_lifestyle_withplants_base.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Lifestyle 2",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/boys_lifestyle/frontright/05_premiumbackpack_onboy_lifestyle_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Boy's Lifestyle",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/boys_lifestyle/frontleft/05_premiumbackpack_onboy_lifestyle_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Boy's Lifestyle",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/boys_lifestyle/frontleft/zoomed/05_premiumbackpack_onboy_lifestyle_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Zoomed-in",
    //             option_group: "Boy's Lifestyle",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/boys_lifestyle/frontright/zoomed/05_premiumbackpack_onboy_lifestyle_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Zoomed-in",
    //             option_group: "Boy's Lifestyle",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/mens_lifestyle/front/05_premiumbackpack_onman_lifestyle_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Men's Lifestyle",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/mens_lifestyle/frontright/05_premiumbackpack_onman_lifestyle_base_whitebg.png?v=1675853790",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Men's Lifestyle",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/boys2/front/06_AOP_Minimalist_Backpack_Mockup_Boy_front_base_whitebg.png?v=1675856209",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Boy's Lifestyle 2",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/boys2/back/06_AOP_Minimalist_Backpack_Mockup_Boy_back_base_whitebg.png?v=1675856209",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Boy's Lifestyle 2",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/girls/front/06_AOP_Minimalist_Backpack_Mockup_Girl_base_whitebg.png?v=1675856213",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Girl's Lifestyle",
    //         },
    //         {
    //             placement: "front",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/all-over-backpack-minimalist/medium/girls/left/06_AOP_Minimalist_Backpack_Mockup_Girl_left_base_whitebg.png?v=1675856213",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Girl's Lifestyle",
    //         },
    //     ],
    // },
    // {
    //     productName: "Men's High Top Canvas Shoes",
    //     price: 45,
    //     images: [
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front/05_KinCustom_hightop_shoes_mockup_front_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template/Kincustom_shoe_left_leg_no_text-188.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left shoe",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template/Kincustom_shoe_right_leg_no_text-189.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right shoe",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template/Kincustom_shoe_right_leg_tongue_no_text.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right shoe tongue",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template/Kincustom_shoe_left_leg_tongue_no_text.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left shoe tongue",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template/Np_text_branding_shoes-191.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front/05_KinCustom_hightop_shoes_mockup_front_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front2/05_KinCustom_hightop_shoes_mockup_front2_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front2/05_KinCustom_hightop_shoes_mockup_front2_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front2/05_KinCustom_hightop_shoes_mockup_front2_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/back/05_KinCustom_hightop_shoes_mockup_back_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/back/05_KinCustom_hightop_shoes_mockup_back_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/back/05_KinCustom_hightop_shoes_mockup_back_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/backleft/05_KinCustom_hightop_shoes_mockup_backleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/backright/05_KinCustom_hightop_shoes_mockup_backright_base_whitebg-2.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/frontright/05_KinCustom_hightop_shoes_mockup_frontright_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/frontleft/05_KinCustom_hightop_shoes_mockup_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/leftfront/05_KinCustom_hightop_shoes_mockup_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/leftfront/05_KinCustom_hightop_shoes_mockup_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/frontright/05_KinCustom_hightop_shoes_mockup_frontright_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/frontright/05_KinCustom_hightop_shoes_mockup_frontright_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat2/left_outside/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat2/right_inside/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat2/right_outside/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat2/left_inside/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat4/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat4/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat_lifestyle/front/05_KinCustom_hightop_shoes_mockup_lifestyle_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat_lifestyle/front/05_KinCustom_hightop_shoes_mockup_lifestyle_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat Lifestyle",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens/frontleft/05_KinCustom_hightop_shoes_onman_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens/frontright/05_KinCustom_hightop_shoes_onman_frontright_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens/frontleft/05_KinCustom_hightop_shoes_onman_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens/frontright/05_KinCustom_hightop_shoes_onman_frontright_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens/back/05_KinCustom_hightop_shoes_onman_back_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens/back/05_KinCustom_hightop_shoes_onman_back_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle/left/05_KinCustom_hightop_shoes_onman_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Men's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle/left/05_KinCustom_hightop_shoes_onman_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Men's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle/left2/05_KinCustom_hightop_shoes_onman_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Men's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle/left2/05_KinCustom_hightop_shoes_onman_frontleft_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Men's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat5/front/05_KinCustom_hightop_shoes_mockup_front_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat5/front/05_KinCustom_hightop_shoes_mockup_front_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/leftfront/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left3/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/leftfront/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/leftfront/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/leftfront/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left3/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left3/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left3/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle2/right/05_hightop_shoes_onman_lifestyle_right_base.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle2/left/05_hightop_shoes_onman_lifestyle_left_base.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle2/right_2/05_hightop_shoes_onman_lifestyle_right2_base.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right 2",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle2/right/05_hightop_shoes_onman_lifestyle_right_base.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle2/right_2/05_hightop_shoes_onman_lifestyle_right2_base.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right 2",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/mens_lifestyle2/left/05_hightop_shoes_onman_lifestyle_left_base.png?v=1692783049",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //     ],
    // },
    // {
    //     productName: "Women's High Top Canvas Shoes",
    //     price: 45,
    //     images: [
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/templates/Np_text_branding_shoes.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template2/Kincustom_shoe_left_leg_no_text-188.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Shoe",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template/Kincustom_shoe_left_leg_tongue_no_text.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Shoe Tongue",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template1/Kincustom_shoe_right_leg_no_text.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Shoe",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/template/Kincustom_shoe_right_leg_tongue_no_text.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Shoe Tongue",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/back/05_KinCustom_hightop_shoes_mockup_back_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/back/05_KinCustom_hightop_shoes_mockup_back_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/back/05_KinCustom_hightop_shoes_mockup_back_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front/05_KinCustom_hightop_shoes_mockup_front_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front/05_KinCustom_hightop_shoes_mockup_front_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front2/05_KinCustom_hightop_shoes_mockup_front2_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front2/05_KinCustom_hightop_shoes_mockup_front2_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/front2/05_KinCustom_hightop_shoes_mockup_front2_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/backleft/05_KinCustom_hightop_shoes_mockup_backleft_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/leftfront/05_KinCustom_hightop_shoes_mockup_frontleft_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/leftfront/05_KinCustom_hightop_shoes_mockup_frontleft_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/leftfront/05_KinCustom_hightop_shoes_mockup_frontleft_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/backright/05_KinCustom_hightop_shoes_mockup_backright_base_whitebg-2.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/frontright/05_KinCustom_hightop_shoes_mockup_frontright_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/frontright/05_KinCustom_hightop_shoes_mockup_frontright_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat/frontright/05_KinCustom_hightop_shoes_mockup_frontright_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat2/left_inside/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat2/left_outside/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat2/right_inside/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat2/right_outside/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat3/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat4/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat4/right/05_KinCustom_hightop_shoes_mockup_right_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat5/front/05_KinCustom_hightop_shoes_mockup_front_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat5/front/05_KinCustom_hightop_shoes_mockup_front_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat_lifestyle/front/05_KinCustom_hightop_shoes_mockup_lifestyle_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/flat_lifestyle/front/05_KinCustom_hightop_shoes_mockup_lifestyle_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/1/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_details/2/05_KinCustom_hightop_shoes_mockup_details_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Product details 2",
    //             option_group: "Product details",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens/frontleft/05_KinCustom_hightop_shoes_onwoman_frontleft_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens/frontleft/05_KinCustom_hightop_shoes_onwoman_frontleft_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens/frontright/05_KinCustom_hightop_shoes_onwoman_frontright_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens/frontright/05_KinCustom_hightop_shoes_onwoman_frontright_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens/back/05_KinCustom_hightop_shoes_onwoman_back_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens/back/05_KinCustom_hightop_shoes_onwoman_back_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/2/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 2",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle/front/05_KinCustom_hightop_shoes_onwoman_front_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle/front/05_KinCustom_hightop_shoes_onwoman_front_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle/front/05_KinCustom_hightop_shoes_onwoman_front_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle/front/05_KinCustom_hightop_shoes_onwoman_front_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle/front2/05_KinCustom_hightop_shoes_onwoman_front2_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle/front2/05_KinCustom_hightop_shoes_onwoman_front2_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle/front2/05_KinCustom_hightop_shoes_onwoman_front2_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle/front2/05_KinCustom_hightop_shoes_onwoman_front2_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left2/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left3/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left2/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left2/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left2/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left3/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left3/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/product_specs/left3/05_KinCustom_hightop_shoes_mockup_left_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/1/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 1",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/3/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 3",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/branding/4/05_KinCustom_hightop_shoes_mockup_branding_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding 4",
    //             option_group: "Branding",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens2/left/05_base.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Women's 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle_2/right/05_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left",
    //             option_group: "Women's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle_2/left/05_base_whitebg.png?v=1692788970",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Women's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/KinCustom_canvas_shoes/medium/womens_lifestyle_3/front/05_base.png?v=1692789968",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle 3",
    //         },
    //     ],
    // },
    // {
    //     productName: "Men's Slip-On Canvas Shoes",
    //     price: 44,
    //     images: [
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/front/05_KinCustom_SlipOnShoes_flat_front_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/templates/right_leg_notext.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right shoe",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/templates/left_leg_notext.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left shoe",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/templates/branding_notext.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/front/05_KinCustom_SlipOnShoes_flat_front_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/front/05_KinCustom_SlipOnShoes_flat_front_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/frontleft/05_KinCustom_SlipOnShoes_flat_frontleft_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/frontright/05_KinCustom_SlipOnShoes_flat_frontright_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/inside/05_KinCustom_SlipOnShoes_flat_left_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/outside/05_KinCustom_SlipOnShoes_flat_right_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat2/frontleft/05_KinCustom_SlipOnShoes_flat2_frontleft_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat2/frontright/05_KinCustom_SlipOnShoes_flat2_frontright_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat3/front/05_KinCustom_SlipOnShoes_flat4_front_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/mens/front/05_KinCustom_SlipOnShoes_onman_front_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/mens/back/05_KinCustom_SlipOnShoes_onman_back_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/mens_lifestyle/frontleft/05_KinCustom_SlipOnShoes_onman2_lifestyle_frontleft_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Men's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/back/05_KinCustom_SlipOnShoes_flat_back_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/inside/05_KinCustom_SlipOnShoes_flat_left_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat/outside/05_KinCustom_SlipOnShoes_flat_right_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/flat4/front/05_KinCustom_SlipOnShoes_flat3_frontright_base_whitebg.png?v=1669272236",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/mens_lifestyle2/front_2/05_KinCustom_SlipOnShoes_onman_front2_base.png?v=1669627682",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/mens_lifestyle2/front_1/05_KinCustom_SlipOnShoes_onman_front1_base.png?v=1669627682",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/mens_lifestyle2/frontright/05_KinCustom_SlipOnShoes_onman_frontright_base.png?v=1669627682",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/mens_slip_on_shoes_kincustom/medium/mens_lifestyle2/right/05_KinCustom_SlipOnShoes_onman_right_base.png?v=1669627682",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //     ],
    // },
    // {
    //     productName: "Women's Slip-On Canvas Shoes",
    //     price: 44,
    //     images: [
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/front/05_KinCustom_SlipOnShoes_flat_front_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/templates/left_leg_notext.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left shoe",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/templates/right_leg_notext.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right shoe",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/templates/branding_notext.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding",
    //             option_group: "Template",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/front/05_KinCustom_SlipOnShoes_flat_front_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/front/05_KinCustom_SlipOnShoes_flat_front_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/frontleft/05_KinCustom_SlipOnShoes_flat_frontleft_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/frontright/05_KinCustom_SlipOnShoes_flat_frontright_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/inside/05_KinCustom_SlipOnShoes_flat_left_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/outside/05_KinCustom_SlipOnShoes_flat_right_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat2/frontleft/05_KinCustom_SlipOnShoes_flat2_frontleft_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat2/frontright/05_KinCustom_SlipOnShoes_flat2_frontright_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat3/front/05_KinCustom_SlipOnShoes_flat4_front_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/womens/left/05_KinCustom_SlipOnShoes_onwoman_left_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/womens/right/05_KinCustom_SlipOnShoes_onwoman_right_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/womens/back/05_KinCustom_SlipOnShoes_onwoman_back_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/womens_lifestyle/front/05_KinCustom_SlipOnShoes_onwoman2_lifestyle_front_base.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/back/05_KinCustom_SlipOnShoes_flat_back_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/inside/05_KinCustom_SlipOnShoes_flat_left_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat/outside/05_KinCustom_SlipOnShoes_flat_right_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/flat4/front/05_KinCustom_SlipOnShoes_flat3_frontright_base_whitebg.png?v=1671460266",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/womens_lifestyle_2/left/05_aop_womenscanvasshoes_base.png?v=1671529263",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Women's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/slip_on_shoes_kincustom/medium/womens_lifestyle_3/front/05_aop_womenscanvasshoes_base.png?v=1671529265",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle 3",
    //         },
    //     ],
    // },
    // {
    //     productName: "Women's Lace-Up Canvas Shoes",
    //     price: 45,
    //     images: [
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/front/05_KinCustomLaceUpShoes_flat_front_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/templates/branding_notext.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/templates/left_quarter_notext.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left shoe",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/templates/right_quarter_notext.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right shoe",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/templates/left_leg_vamp_tongue_notext.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left shoe front",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/templates/right_leg_vamp_tongue_notext.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right shoe front",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/front/05_KinCustomLaceUpShoes_flat_front_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/front/05_KinCustomLaceUpShoes_flat_front_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/front/05_KinCustomLaceUpShoes_flat_front_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/front/05_KinCustomLaceUpShoes_flat_front_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/frontleft/05_KinCustomLaceUpShoes_flat_frontleft_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/back/05_KinCustomLaceUpShoes_flat_back_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/left/05_KinCustomLaceUpShoes_flat_left_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/right/05_KinCustomLaceUpShoes_flat_right_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/left/05_KinCustomLaceUpShoes_flat_left_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Outside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/right/05_KinCustomLaceUpShoes_flat_right_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat2/05_KinCustomLaceUpShoes_flat2_front_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat3/05_KinCustomLaceUpShoes_flat3_frontleft_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/womens/back/05_KinCustomLaceUpShoes_onwoman_back_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Back",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/womens/frontright/05_KinCustomLaceUpShoes_onwoman_frontright_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/womens/frontleft/05_KinCustomLaceUpShoes_onwoman_frontleft_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat4/05_KinCustomLaceUpShoes_flat4_front_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/womens2/frontright/05_KinCustomLaceUpShoes_onwoman2_frontright_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/front2/05_KinCustomLaceUpShoes_flat_front2_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_tongue_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/frontleft2/05_KinCustomLaceUpShoes_flat_frontleft2_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/flat/frontright/05_KinCustomLaceUpShoes_flat_frontright_base_whitebg.png?v=1673965946",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/womes_lifestyle_2/front/05_lifestyle_2_base.png?v=1674031053",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_quarters_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/Womens_lifestyle_3/front/05_lifestyle_base_whitebg.png?v=1674031055",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle 3",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/womes_lifestyle_2/front/05_lifestyle_2_base.png?v=1674031053",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_quarters_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/womens_laceup_shoes/medium/Womens_lifestyle_3/front/05_lifestyle_base_whitebg.png?v=1674031055",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle 3",
    //         },
    //     ],
    // },
    // {
    //     productName: "Men's Slides",
    //     price: 32,
    //     images: [
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/template/right_shoe_notext.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right shoe",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/template/left_shoe_notext.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left shoe",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/template/branding.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat/top/05_slides_flat_top_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat/frontleft/05_slides_flat_frontleft_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat/frontright/05_slides_flat_frontright_black_base_whitebg.png?v=1698909600",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat2/right_inside/05_slides_flat_rightinside_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat2/left_inside/05_slides_flat_leftinside_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat3/front/05_slides_flat_front_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat4/front/05_slides_flat_side_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat5/front/05_slides_flat_levitating_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/mens/front/05_slides_onman_front_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Men's",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/mens_lifestyle/front/05_onman_lifestyle_front_black_base.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Men's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat/front2/05_slides_flat_top_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/product_specs/top/05_slides_specs_top_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/mens_lifestyle_2/lifestyle_3/05_lifestyle_3_black_base_witebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/mens_lifestyle_2/lifestyle_4/05_lifestyle_4_black_base_whitebg.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Men's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/mens_lifestyle_3/lifestyle_1/05_lifestyle_1_black_base.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Men's Lifestyle 3",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/mens_lifestyle_3/lifestyle_2/05_lifestyle_2_black_base.png?v=1698825583",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Men's Lifestyle 3",
    //         },
    //     ],
    // },
    // {
    //     productName: "Women's Slides",
    //     price: 32,
    //     images: [
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/template/right_shoe_notext.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right shoe",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/template/left_shoe_notext.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left shoe",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/template/branding.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Branding",
    //             option_group: "Templates",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat/top/05_slides_flat_top_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat/frontleft/05_slides_flat_frontleft_white_base_whitebg.png?v=1698825882",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "label_inside",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat/frontright/05_slides_flat_frontright_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right Front",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat2/right_inside/05_slides_flat_rightinside_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Right inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_left",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat2/left_inside/05_slides_flat_leftinside_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Left inside",
    //             option_group: "Flat 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat3/front/05_slides_flat_front_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 3",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat4/front/05_slides_flat_side_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 4",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat5/front/05_slides_flat_levitating_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Flat 5",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/womens/front/05_slides_onwoman_front_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/womens_lifestyle/05_slides_onwoman2_front_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/flat/front2/05_slides_flat_top_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Flat",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/product_specs/top/05_slides_specs_top_white_base_whitebg.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Product specs",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/womens_lifestyle_2/front/05_lifestyle_white_base.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/womens_lifestyle_2/front2/05_onwoman_lifestyle_2_white_base.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front 2",
    //             option_group: "Women's Lifestyle 2",
    //         },
    //         {
    //             placement: "shoe_right",
    //             image_url:
    //                 "https://files.cdn.printful.com/m/Kincustom_slides/medium/womens_lifestyle_3/front/05_onwoman_lifestyle_3_white_base.png?v=1698825770",
    //             background_color: "#ffffff",
    //             background_image: null,
    //             option: "Front",
    //             option_group: "Women's Lifestyle 3",
    //         },
    //     ],
    // },
];
main();
