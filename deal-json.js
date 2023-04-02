const fs = require('fs')
const { argv } = require('process')
const { json } = require('stream/consumers')
const yargs = require('yargs')

class FileJson {
    static writeJsonData = (fileName, data) => {
        fs.writeFileSync(fileName, JSON.stringify(data))
    }

    static readFileJson = (fileName) => {
        let res
        try {
            res = JSON.parse(fs.readFileSync(fileName))
            if (!Array.isArray(res)) throw new Error('not array')
        }
        catch (e) {
            res = []
        }
        return res
    }

}



class user {
    static userId = (argv) => {
        const arr = FileJson.readFileJson('user.json')
        console.log(arr)
        const use = arr.find(el => el.id == argv.id)
        console.log(use);
    }
}

class delUser {
    static del = (argv) => {
        const arr = FileJson.readFileJson('user.json')
        // console.log(argv.i);
        const x = arr.map((el) => { return el.name }).indexOf(argv.name)
        if (x >= 0) arr.splice(x, 1)
        const delUserel = FileJson
        delUserel.writeJsonData('user.json', arr)
    }

    static delAllUsers = (argv) => {
        const arr = FileJson.readFileJson('user.json')
        argv = arr.length
        arr.splice(0, argv)
        console.log(arr);
        const delUserel = FileJson
        delUserel.writeJsonData('user.json', arr)
    }

    static editUser = (argv) => {
        const arr = FileJson.readFileJson('user.json')
        const editUser = {}
        const header = ['id', 'name', 'age', 'email']
        arr.forEach((el) => {
            if (el.id == argv.id) {
                editUser.id = el.id
                header.forEach(h => { editUser[h] = argv[h] })
            }
            console.log(arr);
        })
        const x = arr.map(el => el.id).indexOf(argv.id)
        if (x >= 0) arr.splice(x, 1)
        arr.push(editUser)
        const delUserel = FileJson
        delUserel.writeJsonData('user.json', arr)
    }
}

module.exports = { FileJson, delUser, user }