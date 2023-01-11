let long = [
    {
        "username": "",
        "id": "70f6e84b-9934-4a99-b1cd-38a480140770",
        "password": null,
        "admin": true,
        "disabled": false,
        "email": "juanchorizo@hola.com",
        "name": ""
    },
    {
        "username": "asd",
        "id": "9f6d4dbd-26e8-432f-8556-8e7e9e2346eb",
        "password": null,
        "admin": true,
        "disabled": false,
        "email": "asd@asd.com",
        "name": "asd"
    },
    {
        "username": "",
        "id": "7b69935a-45fc-4886-91cb-3f3cb93c3eb6",
        "password": null,
        "admin": true,
        "disabled": false,
        "email": "ramiromonllor@gmail.com",
        "name": ""
    },
    {
        "username": "Rino",
        "id": "017f2f1c-92f0-492d-9e81-b4d59e0b1130",
        "password": null,
        "admin": false,
        "disabled": false,
        "email": "rodrigoappel_13@hotmail.com",
        "name": "Rodrigo"
    },
    {
        "username": "",
        "id": "9ca059ae-abd3-4c7d-b23e-2d35250d903e",
        "password": null,
        "admin": true,
        "disabled": false,
        "email": "juanputito@gmail.com",
        "name": ""
    },
    {
        "username": "",
        "id": "bf2b86b0-a016-4f51-a057-efce8e46e81e",
        "password": null,
        "admin": true,
        "disabled": false,
        "email": "sdafsadf@gmail.com",
        "name": ""
    },
    {
        "username": "",
        "id": "74cd6ecd-efb6-45e7-9a16-e58df8b20085",
        "password": null,
        "admin": false,
        "disabled": false,
        "email": "asd@asd.asd",
        "name": ""
    },
    {
        "username": "",
        "id": "71cb1016-c0e8-4fbf-a17c-04171cfc819a",
        "password": null,
        "admin": false,
        "disabled": false,
        "email": "holaaaangaaa@latanga.com",
        "name": ""
    },
    {
        "username": "",
        "id": "a2f4544a-e298-46fc-9090-e52d5aede064",
        "password": null,
        "admin": true,
        "disabled": false,
        "email": "hfhsakjdf@gmail.com",
        "name": ""
    },
    {
        "username": "",
        "id": "f4eb643b-ad00-4382-9162-e7742363fd7d",
        "password": null,
        "admin": false,
        "disabled": false,
        "email": "probando@again.com",
        "name": ""
    },
    {
        "username": "asd",
        "id": "dc4a975f-898e-457b-96c8-f2dbdfcd4b8e",
        "password": null,
        "admin": false,
        "disabled": true,
        "email": "asdasd@asd.com",
        "name": "as"
    },
    {
        "username": "",
        "id": "78dc4595-8690-4492-a5af-63118f135ab0",
        "password": null,
        "admin": false,
        "disabled": false,
        "email": "ramiimonllorrrrr@gmail.com",
        "name": ""
    },
    {
        "username": "",
        "id": "883ad3ac-fc42-4440-9e57-b59ea2b6014c",
        "password": null,
        "admin": false,
        "disabled": false,
        "email": "todox2cripssastos@gmail.com",
        "name": ""
    },
    {
        "username": "",
        "id": "036d7640-c85a-46ed-9d98-8f623d74a4e8",
        "password": null,
        "admin": false,
        "disabled": false,
        "email": "holapianoaaaa@gmail.com",
        "name": ""
    }
]

let short = [
    {
        "username": "asd",
        "id": "9f6d4dbd-26e8-432f-8556-8e7e9e2346eb",
        "password": null,
        "admin": true,
        "disabled": false,
        "email": "asd@asd.com",
        "name": "asd"
    },
    {
        "username": "",
        "id": "74cd6ecd-efb6-45e7-9a16-e58df8b20085",
        "password": null,
        "admin": false,
        "disabled": false,
        "email": "asd@asd.asd",
        "name": ""
    },
    {
        "username": "asd",
        "id": "dc4a975f-898e-457b-96c8-f2dbdfcd4b8e",
        "password": null,
        "admin": false,
        "disabled": true,
        "email": "asdasd@asd.com",
        "name": "as"
    }
]

let total = []

console.log(short.forEach(el => total.push((long.filter(e => el.id === e.id))[0])))
console.log(total)