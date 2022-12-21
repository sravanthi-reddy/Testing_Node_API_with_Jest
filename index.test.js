const supertest = require('supertest');
const { app } = require('./index');

let token  = ''
const loginCreds = {       
  "username": "Bret",
  "phone": "1-770-736-8031 x56442"
}

//check if the application is running 
describe("check if app is Running ", () => {
  test("get / " , async () => {
    await supertest(app).get('/')
            .expect(200)
            .then(response => {
              expect(response.text).toBe("Application is running !!")
            });
  })
})

//Login into application given valid credentials
describe( "login ino the application", () => {
  test("post /users/login",  async() => {
    const response = await supertest(app).post('/users/login')
                    .send(loginCreds)
    token = response.body.token;
  })
});


//1. should be able to retrieve my user entity

const userData = {"email": "Sincere@april.biz", "id": 1, "name": "Leanne Graham", "phone": "1-770-736-8031 x56442", "username": "Bret", "website": "hildegard.org"}
describe("get logged in user info ", () => {
    test("get /users/1 " , async () => {

    await supertest(app).get('/users/1')
    .set('Authorization', `Token ${token}`)
    .expect(200)
    .then(response => {
      expect(response.body.data).toEqual(userData)
  })
})
})

//2. should not be able to retrieve a different user entity and return appropriate error code

const unAuthorizedMes = "Not Authorized. Unable to fetch other user's profile";
describe("Access other user's information ", () => {
    test("get /users/2 " , async () => {
    await supertest(app).get('/users/2')
    .set('Authorization', `Token ${token}`)
    .expect(403)
    .then(response => {
      expect(JSON.parse(response.text).message).toBe(unAuthorizedMes)
  })
})
})

//3. should not be able to retrieve an entity if not authenticated and return appropriate error code

const unAuthenticatedMes = "Forbidden, Please login to access your information";
describe("access information without login", () => {
    test("get /users/1" , async () => {
    await supertest(app).get('/users/1')
    //.set('Authorization', `Token ${token}`)
    .expect(403)
    .then(response => {
      expect(JSON.parse(response.text).message).toBe(unAuthenticatedMes)
  })
})
})
