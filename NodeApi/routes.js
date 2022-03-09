
function routes(app, db, accounts, contactList) {
    app.get('/contacts', async (request, response) => {
        let cache = [];
        const COUNTER = await contactList.methods.count().call();

        for (let i = 1; i <= COUNTER; i++) {
            const contact = await contactList.methods.contacts(i).call();
            cache = [...cache, contact];
        }
        // console.log(response.json(cache));
        response.json(cache);
    });


    app.post('/addcontacts', async (request, response) => {
        let name = request.body.name;
        let tp = request.body.tp;

        //console.log(name, tp);

        if (name && tp) {

            contactList.methods
                .createContact(name, tp)
                .send({ from: accounts[0], gas: 3000000 }, function (err, res) {
                    if (err) {
                        console.log("An error occured", err)
                        return
                    }
                    console.log("Hash of the transaction: " + res)
                    
                    response.json("Hash of the transaction: " + res)
                })


        }

    });

}

module.exports = routes