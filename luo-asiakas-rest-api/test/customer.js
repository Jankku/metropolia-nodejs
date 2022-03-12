const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index");
const query = require("../db/customers");
const should = chai.should();

chai.use(chaihttp);

const testCustomer = {
    firstname: "Mikko",
    lastname: "Mallikas",
    email: "mikko@mallikas.com",
    phone: "040123123",
};

describe("GET /api/customers", () => {
    it("Get all customers", (done) => {
        chai.request(app)
            .get("/api/customers")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe("POST /api/customers", () => {
    beforeEach((done) => {
        query.deleteAllCustomers();
        done();
    });

    it("Add new customer", (done) => {
        chai.request(app)
            .post("/api/customers")
            .set("Content-Type", "application/json")
            .send(JSON.stringify(testCustomer))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("firstname");
                res.body.should.have.property("lastname");
                res.body.should.have.property("email");
                res.body.should.have.property("phone");
                done();
            });
    });
});
