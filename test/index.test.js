const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server= require('../app');


chai.use(chaiHttp);

describe('Node Server',()=>{
    it('(GET/) anasayfayı döndürür',done => {
        done();
    });
} );
