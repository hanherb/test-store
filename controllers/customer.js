const customer = require('../models/customer')
const sequelize = require('../services/mysql');
const checker = require('../tools/checker');

exports.GetCustomers = async function(req, res) {
    let cust = await fetchCustomers()

    res.status(200).send(cust)
}

exports.PivotCustomers = async function(req, res) {
    let cust = await fetchCustomers()
    let item = await distinctItem()

    let arrData = await preparePivot(cust, item)
    arrData = await calculateQty(arrData, cust)

    res.status(200).send(arrData)
}

async function preparePivot(cust, item) {
    let arrData = []

    for (let i = 0; i < cust.length; i++) {
        let found = await checker.CheckFullName(arrData, cust[i].full_name)

        if (!found) {
            arrData.push({
                "full_name": cust[i].full_name,
                "email": cust[i].email
            })

            for (let j = 0; j < item.length; j++) {
                arrData[arrData.length-1][item[j].item] = 0
            }
        }
    }

    return arrData
}

async function calculateQty(arrData, cust) {
    for (let i = 0; i < arrData.length; i++) {
        for (let j = 0; j < cust.length; j++) {
            if (arrData[i].full_name == cust[j].full_name) {
                let objKey = Object.keys(arrData[i])

                for (let k = 0; k < objKey.length; k++) {
                    if (objKey[k] == cust[j].item) {
                        arrData[i][objKey[k]] += cust[j].qty
                    }
                }
            }
        }
    }

    return arrData
}

async function fetchCustomers() {
    let cust = await customer.findAll({
        attributes: [
            "id",
            [
                sequelize.fn("CONCAT",
                    sequelize.col("first_name"), " ",
                    sequelize.col("last_name")
                ),
                "full_name"
            ],
            "email",
            "item",
            "qty",
            "total_price"
        ]
    })

    return cust
}

async function distinctItem() {
    let item = await customer.findAll({
        attributes: [
            [
                sequelize.fn("DISTINCT", sequelize.col("item")), "item"
            ]
        ]
    });

    return item
}