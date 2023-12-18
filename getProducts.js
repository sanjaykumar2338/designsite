const allProducts = [];
class Product {
    product = undefined;
    variants = undefined;
    maxPrice = 0;
    priceList = [];
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
                // console.log(json.result);
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
                this.maxPrice = await this.getAllVariantDetail(
                    this.variants[this.variants.length - 1].id
                );
                // for await (const variant of this.variants) {
                //     await this.getAllVariantDetail(variant.id);
                //     if (this.maxPrice < variant.price)
                //         this.maxPrice = variant.price;
                // }
                // this.priceList.forEach((price) => {
                //     if (this.maxPrice < price) this.maxPrice = price;
                // });
                this.getVariantImages(variant.id);
            })
            .catch((error) => console.log("error", error));
    }

    getAllVariantDetail(id) {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append(
            "Authorization",
            "Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc"
        );
        myHeaders.append(
            "Cookie",
            "__cf_bm=wCcLDHfdwZtyA4tbd.HH13_adtnupz5oxw2IhqzLgVQ-1702877191-1-AegYo8L9OCWIbGnqmtNZU3NO5OuePf5gYHd8pxCCWCbD9N9SodgECoXgLV4uX32s8edvnKposAgVb3oxcJN6pco=; dsr_setting=%7B%22region%22%3A1%2C%22requirement%22%3Anull%7D"
        );

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        // return new Promise((resolve, reject) => {
        //     this.variants.forEach((variant, i) => {
        //         fetch(
        //             `https://api.printful.com/products/variant/${variant.id}`,
        //             requestOptions
        //         )
        //             .then(async (response) => {
        //                 const json = await response.json();
        //                 console.log(json);
        //                 if (!json.result) {
        //                 }
        //                 const price = +json.result.variant.price;
        //                 console.log("PRICE -> ", price);
        //                 this.priceList.push(price);
        //                 if (i + 1 === this.variants.length) resolve(price);
        //             })
        //             .catch((error) => {
        //                 reject(error);
        //                 console.log("error", error);
        //             });
        //     });
        // });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch(
                    `https://api.printful.com/products/variant/${id}`,
                    requestOptions
                )
                    .then(async (response) => {
                        const json = await response.json();
                        // if (json.code) console.log(json);
                        const price = +json.result.variant.price;
                        console.log("PRICE -> ", price);
                        resolve(price);
                    })
                    .catch((error) => {
                        reject(error);
                        console.log("error", error);
                    });
            }, 500);
        });
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
                        i.option_group === "Ghost" || i.option_group === "Men's"
                    );
                });
                const data = {
                    productName: this.productName,
                    price: this.maxPrice,
                    images,
                };
                // console.log(data);
                allProducts.push(data);
                if (allProducts.length === products.length) {
                    console.log(JSON.stringify(allProducts));
                }
            })
            .catch((error) => console.log("error", error));
    }
}

const products = [
    //Mens T-Shirts
    // new Product(1, "Unisex Performance Crew Neck T-Shirt | A4 N3142"),
    // new Product(1, "Unisex Tri-Blend T-Shirt | Bella + Canvas 3413"),
    // new Product(1, "Unisex V-Neck Tee | Bella + Canvas 3005"),
    // new Product(1, "Men's Premium Heavyweight Tee | Cotton Heritage MC1086"),
    // new Product(1, "Unisex Long Sleeve Tee | Bella + Canvas 3501"),
    // new Product(1, "Unisex Muscle Shirt | Bella + Canvas 3483"),
    // new Product(1, "Premium Polo Shirt | Port Authority K500", true),
    // Mens Hoodies
    // new Product(9, "Unisex Heavy Blend Hoodie | Gildan 18500"),
    // new Product(9, "Unisex Pullover Hoodie | Bella + Canvas 3719"),
    // new Product(9, "Unisex Lightweight Zip Hoodie | Bella + Canvas 3939"),
    // new Product(9, "Unisex Heavy Blend Zip Hoodie | Gildan 18600"),
    // mens Sweatshirts
    // new Product(9, "Unisex Premium Sweatshirt | Cotton Heritage M2480"),
    // new Product(9, "Unisex Fleece Pullover | Cotton Heritage M2475"),
    // mena Bottoms
    new Product(106, "Unisex Fleece Sweatpants | Cotton Heritage M7580"),
    new Product(
        106,
        "Unisex Pigment-Dyed Sweatpants | Independent Trading Co. PRM50PTPD"
    ),
    // womans t-shirt
    // new Product(2, "Women's Relaxed T-Shirt | Bella + Canvas 6400"),
    // new Product(2, "Women's Fashion Fit T-Shirt | Gildan 880"),
    // new Product(2, "Women's High-Waisted Tee | Cotton Heritage OW1086"),
    // new Product(2, "Women's Recycled V-Neck T-Shirt | District DT8001"),
    // new Product(2, "Unisex Long Sleeve Tee | Bella + Canvas 3501"),
    // new Product(2, "Unisex Hooded Long Sleeve Tee | Bella Canvas 3512"),
    // new Product(2, "Women's Muscle Tank | Bella + Canvas 8803"),
    // new Product(2, "Women's Pique Polo Shirt | Gildan 64800L"),

    // womans Hoodies
    // new Product(2, "Unisex Premium Hoodie | Cotton Heritage M2580"),
    // new Product(2, "Unisex Heavy Blend Hoodie | Gildan 18500"),
    // new Product(2, "Women's Cropped Hoodie | Bella + Canvas 7502"),
    // new Product(2, "Unisex Lightweight Zip Hoodie | Bella + Canvas 3939"),
];
