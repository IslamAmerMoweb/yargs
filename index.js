const { argv } = require('process')
const yargs = require('yargs')
const myfile = require('./deal-json').FileJson
const user = require('./deal-json').user
const delEl = require('./deal-json').delUser


const userHeads = ["id", "name", "age", "email"]
const createObj = (data) => {
    const userData = {}
    userHeads.forEach(h => {
        if (h == "id") userData[h] = Date.now()
        else userData[h] = data[h]
    })
    return userData
}
class User {
    static addUser = (argv) => {
        const userData = createObj(argv)
        const data = myfile.readFileJson('user.json')
        data.push(userData)
        myfile.writeJsonData("user.json", data)
    }
}


yargs.command({
    command: 'user',
    builder: {
        name: { demadOption: true },
        age: { demadOption: true },
        email: { demadOption: true },
    },
    handler: (argv) => {
        User.addUser(argv)
    }
})

yargs.command({
    command: 'show',
    builder: {
        id: { demadOption: true }
    },
    handler: (argv) => { user.userId(argv) }
})

yargs.command({
    command: 'del',
    builder: {
        name: { demadOption: true }
    },
    handler: (argv) => { delEl.del(argv) }
})

yargs.command({
    command: 'deletUsers',
    builder: {
        deletUsers: { demadOption: true }
    },
    handler: (argv) => { delEl.delAllUsers(argv) }
})

yargs.command({
    command: 'edit',
    builder: {
        id: { demadOption: true },
        name: { demadOption: true },
        age: { demadOption: true },
        email: { demadOption: true },
    },
    handler: (argv) => { delEl.editUser(argv) }
})
yargs.argv