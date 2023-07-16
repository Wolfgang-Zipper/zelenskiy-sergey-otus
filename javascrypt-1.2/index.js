let shopList = [
    ["q", "w", 'a'],
    ["a", "b"],
    ["a", "c"],
    ["q", "e"],
    ["q", "r"],
    ["q", "s"]
]

let association = {};
let associationMax = [];

function maxItemAssociation(shop) {

    shop.forEach(products => { //перебираем список покупок

        products.forEach(productsItem => { //перебираем покупку

            if (association.hasOwnProperty(productsItem)) { // подсчитываем количество повторений товара, тем самым получаем товар, встречающийся в максимальных рекоментациях
                association[productsItem] += 1
            } else {
                association[productsItem] = 1
                
            }

        });
    });

    for (let item of Object.keys(association)) { //перебираем обьект товаров с количеством

        if (association[item] >= 2) { // если количество всетрается 2 раза и больше, то

            shop.forEach(products => { //перебираем список покупок

                products.forEach(productsItem => { //перебираем покупку

                    if (products.some(e => e == item) && !associationMax.includes(productsItem)) {

                        associationMax.push(productsItem) // если покупка содержит товар, встречающийся в максимальных рекоментациях, добавляем в обьект 

                    }
                });

            });

        }
    }

    return associationMax.sort(); // сортируем
}

console.log(maxItemAssociation(shopList)) // ['a', 'b', 'c', 'e', 'q', 'r', 'w']
