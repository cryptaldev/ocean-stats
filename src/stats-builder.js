let moment = require('moment')

let gsheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GSHEET_ID}/values/${process.env.REACT_APP_GSHEET_TITLE}!A1:Z50?key=${process.env.REACT_APP_GSHEET_KEY}`
let aquariusBaseUrl = "https://aquarius.pacific.dev-ocean.com/api/v1/aquarius/assets/ddo/query"
let statsboardId = process.env.REACT_APP_STATSBOARD_ID
let txLimit = 600

async function getAllApps() {
    let resp = await fetch(gsheetURL)
    let data = await resp.json()
    console.log(data)
    data = data.values.splice(1, data.values.length)
    return data
}

async function getAllTxs() {
    //get all tx data
    let resp = await fetch(aquariusBaseUrl + `?text=${statsboardId}&offset=${txLimit}`)
    let data = await resp.json()
    console.log(data)
    return data
}

async function getTimebasedTxs(txs) {
    var txHistory = {
        labels: [
            "3:00AM",
            "6:00AM",
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM"
        ],
        series: []
    };

    var h3 = 0, h6 = 0, h9 = 0, h12 = 0, h15 = 0, h18 = 0, h21 = 0, h24 = 0
    let yesterday = moment.utc().subtract(24, "hours");
    await Promise.all(txs.map(tx => {
        let date = moment.utc(tx['created'])
        if (date.isAfter(yesterday)) {
            let hour = date.get('hour')
            if (hour >= 0 && hour < 3) {
                h3++
            } else if (hour >= 3 && hour < 6) {
                h6++
            } else if (hour >= 6 && hour < 9) {
                h9++
            } else if (hour >= 9 && hour < 12) {
                h12++
            } else if (hour >= 12 && hour < 15) {
                h15++
            } else if (hour >= 15 && hour < 18) {
                h18++
            } else if (hour >= 18 && hour < 21) {
                h21++
            } else if (hour >= 21 && hour <= 23) {
                h24++
            }
        }


    }))
    //push txs to time series
    txHistory['series'].push([h3, h6, h9, h12, h15, h18, h21, h24])

    return txHistory
}


export async function getStats() {
    let stats = {}
    let apps = await getAllApps()


    let results = await getAllTxs()

    //total txs
    stats.totalTxs = results['total_results']


    let users = await Promise.all(results['results'].map(res => {
        return res.publicKey[0].owner
    }))

    //total users
    stats.totalUsers = users.length

    let uniqueUsers = users.filter(onlyUnique)

    //unique users
    stats.uniqueUsers = uniqueUsers.length


    //app details
    stats.apps = await Promise.all(apps.map(async app => {
        let txCount = await getTxsPerApp(app[0], results['results'])
        return {
            id: app[0],
            name: app[1],
            homepage: app[2],
            txs: txCount
        }
    }))

    //total apps
    stats.totalApps = apps.length

    //get time based tx
    let chartData = await getTimebasedTxs(results['results'])
    stats.txChartData = chartData

    return stats
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


async function getTxsPerApp(appId, txs) {
    let filteredTxs = txs.filter(tx => {
        console.log(tx['service'][0])
        return tx['service'][0]['attributes']['additionalInformation']['appId'] == appId
    })
    return filteredTxs.length
}