//:::::::::::::::::::::::::::::::::::::::::::://
//::::             DB Moc                     //
//:::::::::::::::::::::::::::::::::::::::::::://
const createUsersAccountsDataBase = ()=>{
    let m_usersRecords = {};
    //^^^^^^^^^^^^^^^^^^^^^^
    const getRecord = (userAccountName)=>
    {
        return (m_usersRecords.hasOwnProperty(userAccountName))?(m_usersRecords[userAccountName]):(null);
    };
    //---------------------
    const createRecord = (userAccountName, pass, email) =>
    {
        let is_ok = true;

        is_ok = is_ok && (userAccountName);
        is_ok = is_ok && (!m_usersRecords.hasOwnProperty(userAccountName));

        if(is_ok){
            m_usersRecords[userAccountName] = {
                accountData: {
                    pass:  pass,
                    email: email
                },
                userData:{
                    fullName:   '<your full name>',
                    phoneNumber:'<your phone number>',
                    address:    '<your address>'
                }
            };
        };
        return is_ok;
    };
    //---------------------

    return {getRecord,
            createRecord};
};


const g_usersAccountsDataBase = createUsersAccountsDataBase();
//:::::::::::::::::::::::::::::::::::::::::::://





//:::::::::::::::::::::::::::::::::::::::::::://
//::::              JWT                       //
//:::::::::::::::::::::::::::::::::::::::::::://
const jwt  = require('jsonwebtoken');

const createJwtToolKit = (privateKey, issuer)=>
{

    //----------------------
    const makeToken = (subject, audience, expiresIn)=> {
        const signOptions = {
            issuer: issuer,
            subject: subject,
            audience: audience,
            expiresIn: expiresIn
        };

        const payload = {};
        const token = jwt.sign({}, privateKey, signOptions);

        return token;
    }
    //----------------------
    const isTrustyToken = (token, subject, audience, bIgnoreExpiration)=>{
        const verifyOptions = {
            issuer: issuer,
            subject: subject,
            audience: audience,
            ignoreExpiration: bIgnoreExpiration
        };

        let bIsTrustyToken = false;

        jwt.verify(token, privateKey, verifyOptions, (err, decoded)=>{ bIsTrustyToken = !err;});

        return bIsTrustyToken;
    };
    //----------------------
    return {
        makeToken,
        isTrustyToken
    };
};

const jwtToolKit = createJwtToolKit('j1234hx1l23k21jzl', 'bla-bla-issuer');
//:::::::::::::::::::::::::::::::::::::::::::://



//---------------------------------------------



//---------------------------------------------
function create_error_object(userMessage, internalMessage, more_info){
    return {"userMessage": userMessage,
        "internalMessage": internalMessage,
        "more_info": more_info};
}
//---------------------------------------------








//:::::::::::::::::::::::::::::::::::::::::::://
//::::              API                       //
//:::::::::::::::::::::::::::::::::::::::::::://

let express    = require('express');
let cors       = require('cors');
let bodyParser = require('body-parser');



let server = express();

server.use(cors());


server.use(bodyParser.json()); // for parsing application/json
//server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//et jsonParser = bodyParser.json();

//---------------------------------------------
server.post('/api/v1/users',
         (req, res)=>{
            let isValidBody  =    req.body.hasOwnProperty('userAccountName')
                               && req.body.hasOwnProperty('pass')
                               && req.body.hasOwnProperty('email');

            if(isValidBody)
            {
                if(g_usersAccountsDataBase.createRecord(req.body.userAccountName, req.body.pass, req.body.email)){
                    res.status(201).send({ 'href': 'api/v1/users/' + req.body.userAccountName } );
                }
                else{
                    res.status(400).send({error: create_error_object('creation error', 'unknown', JSON.stringify(req.body))});
                };
            }
            else
            {
                res.status(400).send({error: create_error_object('invalid json', 'invalid json')});
            };

        });

//---------------------------------------------
server.get('/api/v1/users/:userAccountName', (req, res) => {

    const record = g_usersAccountsDataBase.getRecord(req.params.userAccountName);

    if(null != record)
    {
        res.status(200).send({'userData':record.userData });
    }
    else
    {
        res.status(404).send({error: create_error_object('unknown user:' + req.params.userAccountName)});
    };
    //res.send('Hello World!');

});
//---------------------------------------------
server.post('/api/v1/users/:userAccountName/auth-tokens',
     (req, res)=>{
         let isValidBody  =
                  req.body.hasOwnProperty('pass')


         if(isValidBody)
         {
             let record = g_usersAccountsDataBase.getRecord(req.params.userAccountName);

             if(null != record){
                 if(req.body.pass === record.accountData.pass){
                     //---

                     const token = jwtToolKit.makeToken(req.params.userAccountName, record.accountData.email, "365d");
                    // const tokenValue = generate_random_string(16);
                     //const tokenName  = 'token_' + tokenValue;

                     //record.authorizationTokens[tokenName] = tokenValue;

                     res.status(201).send({ 'tokenValue': token} );
                     //---
                 }
                 else{
                     res.status(401).send({error: create_error_object('wrong password')});
                 }
             }
             else{
                 res.status(400).send({error: create_error_object('unknown user:' + req.params.userAccountName)});
             };
         }
         else
         {
             res.status(400).send({error: create_error_object('invalid json', 'invalid json')});
         };

     });

 //---------------------------------------------
server.put('/api/v1/users/:userAccountName', (req, res) => {


    const record = g_usersAccountsDataBase.getRecord(req.params.userAccountName);

    if(null != record){

        const auth_token = req.get('Authorization');

        if(auth_token){
            const b = jwtToolKit.isTrustyToken(auth_token, req.params.userAccountName, record.accountData.email, true);
            if(b){
                let updateResult = {};
                Object.getOwnPropertyNames(req.body).forEach(
                    (val) => {
                        if (record.userData.hasOwnProperty(val)) {
                            record.userData[val] = req.body[val];

                            updateResult[val] = record.userData[val];
                        }
                    });

                res.status(200).send(updateResult);
            }
            else{
                res.status(403).send({error: create_error_object('not trusty token')});
            };
        }
        else{
            res.status(403).send({error: create_error_object('authorization data is absent')});
        };
    }
    else{
        res.status(404).send({error: create_error_object('unknown user:' + req.params.userAccountName)});
    };


});
//----------------------------------------------



server.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});



