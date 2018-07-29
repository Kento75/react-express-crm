const   chai = require('chai'),
        expect = require('chai').expect,
        chaiHttp = require('chai-http'),
        app = require('../../index'),
        models  = require('../../models/index');

chai.use(chaiHttp);

describe('Auth',  function() {
    
    let newUser = {email: 'test_'+Math.random().toString(36).substring(7)+'@test.com', password: 'password1'};

    after(() => {
        models.User.destroy({where: { email: newUser.email } });
    });
    describe('POST Signup', () => {
        it('Should not succeed with no paramaters', () => {
            return chai.request(app)
            .post('/auth/signup')
            .then((res) => {
               expect(res).to.have.status(400);
               expect(res.body.data).to.have.own.property('errors');
            });
        });
        it('Should not succeed with invalid paramaters', () => {
            return chai.request(app)
            .post('/auth/signup')
            .send({email: "email@email", password: "password"})
            .then((res) => {
               expect(res).to.have.status(400);
               expect(res.body.data).to.have.own.property('errors');
            });
        });
        it('Should succeed with valid paramaters', () => {
            return chai.request(app)
            .post('/auth/signup')
            .send(newUser)
            .then((res) => {
               expect(res).to.have.status(200);
               expect(res.body.data).to.have.own.property('token');
               expect(res.body.data).to.have.own.property('user');
               expect(res.body.data.user.email).to.equal(newUser.email);
            });
        });
    });
    describe('POST login', () => {
        it('Should not succeed with no paramaters', () => {
            return chai.request(app)
            .post('/auth/login')
            .then((res) => {
               expect(res).to.have.status(400);
               expect(res.body.data).to.have.own.property('errors');
            });
        });
        it('Should not succeed with invalid paramaters', () => {
            return chai.request(app)
            .post('/auth/login')
            .send({email: "email@email", password: "password"})
            .then((res) => {
               expect(res).to.have.status(400);
               expect(res.body.data).to.have.own.property('errors');
            });
        });
        it('Should not succeed with wrong paramaters', () => {
            return chai.request(app)
            .post('/auth/login')
            .send({email: newUser.email, password: newUser.password+'wrong'})
            .then((res) => {
               expect(res).to.have.status(400);
               expect(res.body).to.have.own.property('message');
               expect(res.body.message).to.equal('Incorrect email or password');
            });
        });
        it('Should succeed with valid paramaters', () => {
            return chai.request(app)
            .post('/auth/login')
            .send(newUser)
            .then((res) => {
               expect(res).to.have.status(200);
               expect(res.body.data).to.have.own.property('token');
               expect(res.body.data).to.have.own.property('user');
               expect(res.body.data.user.email).to.equal(newUser.email);
            });
        });
    });
});
