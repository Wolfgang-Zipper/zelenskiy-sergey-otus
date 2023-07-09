let shopList = [["a", "b"], ["a", "c"], ["d", "e"]]
let association = [];

function maxItemAssociation() {
shopList.forEach(products => { //перебираем список покупок

    products.forEach(productsItem => { //перебираем покупку
 
        // if (!association.includes(productsItem)) { //проверяем, содержится ли товар в ассоциациях
        //     console.log(`${products} содержит ${productsItem}`) 

        //     association.push(productsItem)
        // }

        if (products.includes(productsItem)) { //проверяем, содержится ли товар в покупке
            console.log(`${products} содержит ${productsItem}`) 

            association.push(productsItem)
        }


    });

});

return association;
}

console.log(maxItemAssociation(shopList))


