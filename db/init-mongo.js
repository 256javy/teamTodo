db.createUser({
    user: 'comediante',
    pwd: 'comediante123',
    roles: [
        {
            role: 'readWrite',
            db: 'teamtodo'
        }
    ]
})