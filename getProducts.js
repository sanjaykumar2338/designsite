const allProducts = [];
class Product {
    product = undefined;
    variants = undefined;
    constructor(variantId, productName, isLast = false) {
        this.productName = productName;

        this.getProducts(variantId);
        this.isLast = isLast;
    }

    getProducts(category) {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append(
            "Authorization",
            "Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc"
        );
        myHeaders.append(
            "Cookie",
            "__cf_bm=FMHIpQ9lQoZBi7uXiUdxgLGO0R7lmxVbabNuRhPpVgs-1702618698-1-AVOxyZjbagfeV/KqrmoLKC8rwyzlUy8QQA29HzTDf2TBdpDl2l330B2efRai/8P+8aZH5E/6axt6eXpugqTvXQE=; dsr_setting=%7B%22region%22%3A1%2C%22requirement%22%3Anull%7D"
        );

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(
            `https://api.printful.com/products?category_id=${category}`,
            requestOptions
        )
            .then(async (response) => {
                const json = await response.json();
                const product = json.result.find((v) => {
                    return v.title === this.productName;
                });
                this.product = product;
                this.getVariants(product.id);
            })
            .catch((error) => console.log("error", error));
    }

    getVariants(productId) {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc"
        );
        myHeaders.append(
            "Cookie",
            "__cf_bm=FMHIpQ9lQoZBi7uXiUdxgLGO0R7lmxVbabNuRhPpVgs-1702618698-1-AVOxyZjbagfeV/KqrmoLKC8rwyzlUy8QQA29HzTDf2TBdpDl2l330B2efRai/8P+8aZH5E/6axt6eXpugqTvXQE=; dsr_setting=%7B%22region%22%3A1%2C%22requirement%22%3Anull%7D"
        );

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(
            `https://api.printful.com/v2/catalog-products/${productId}/catalog-variants`,
            requestOptions
        )
            .then(async (response) => {
                const json = await response.json();
                this.variants = json.data;
                const variant = json.data[0];
                this.getVariantImages(variant.id);
            })
            .catch((error) => console.log("error", error));
    }

    getVariantImages(variantId) {
        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc"
        );
        myHeaders.append(
            "Cookie",
            "__cf_bm=FMHIpQ9lQoZBi7uXiUdxgLGO0R7lmxVbabNuRhPpVgs-1702618698-1-AVOxyZjbagfeV/KqrmoLKC8rwyzlUy8QQA29HzTDf2TBdpDl2l330B2efRai/8P+8aZH5E/6axt6eXpugqTvXQE=; dsr_setting=%7B%22region%22%3A1%2C%22requirement%22%3Anull%7D"
        );

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(
            `https://api.printful.com/v2/catalog-variants/${variantId}/images`,
            requestOptions
        )
            .then(async (response) => {
                const json = await response.json();
                const images = json.data.images.filter((i) => {
                    return (
                        i.option_group === "Ghost" ||
                        i.option_group === "Women's"
                    );
                });
                const data = { productName: this.productName, images };
                // console.log(data);
                allProducts.push(data);
                if (allProducts.length === products.length)
                    console.log(JSON.stringify(allProducts));
            })
            .catch((error) => console.log("error", error));
    }
}

// new Product(1, "Unisex Performance Crew Neck T-Shirt | A4 N3142");
// new Product(1, "Unisex Tri-Blend T-Shirt | Bella + Canvas 3413");
// new Product(1, "Unisex V-Neck Tee | Bella + Canvas 3005");
// new Product(1, "Men's Premium Heavyweight Tee | Cotton Heritage MC1086");
// new Product(1, "Unisex Long Sleeve Tee | Bella + Canvas 3501");
// new Product(1, "Unisex Muscle Shirt | Bella + Canvas 3483");
// new Product(1, "Premium Polo Shirt | Port Authority K500", true);

// new Product(9, "Unisex Heavy Blend Hoodie | Gildan 18500");
// new Product(9, "Unisex Pullover Hoodie | Bella + Canvas 3719");
// new Product(9, "Unisex Lightweight Zip Hoodie | Bella + Canvas 3939");
// new Product(9, "Unisex Heavy Blend Zip Hoodie | Gildan 18600");

const products = [
    // new Product(9, "Unisex Premium Sweatshirt | Cotton Heritage M2480"),
    // new Product(9, "Unisex Fleece Pullover | Cotton Heritage M2475"),
    // new Product(106, "Unisex Fleece Sweatpants | Cotton Heritage M7580"),
    // new Product(
    //     106,
    //     "Unisex Pigment-Dyed Sweatpants | Independent Trading Co. PRM50PTPD"
    // ),
    // new Product(2, "Women's Relaxed T-Shirt | Bella + Canvas 6400"),
    // new Product(2, "Women's Fashion Fit T-Shirt | Gildan 880"),
    // new Product(2, "Women's High-Waisted Tee | Cotton Heritage OW1086"),
    // new Product(2, "Women's Recycled V-Neck T-Shirt | District DT8001"),
    // new Product(2, "Unisex Long Sleeve Tee | Bella + Canvas 3501"),
    // new Product(2, "Unisex Hooded Long Sleeve Tee | Bella Canvas 3512"),
    // new Product(2, "Women's Muscle Tank | Bella + Canvas 8803"),
    // new Product(2, "Women's Pique Polo Shirt | Gildan 64800L"),
    new Product(2, "Unisex Premium Hoodie | Cotton Heritage M2580"),
    // new Product(2, "Unisex Heavy Blend Hoodie | Gildan 18500"),
    // new Product(2, "Women's Cropped Hoodie | Bella + Canvas 7502"),
    // new Product(2, "Unisex Lightweight Zip Hoodie | Bella + Canvas 3939"),
];
