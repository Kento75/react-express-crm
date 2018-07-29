const   chai = require('chai'),
        expect = require('chai').expect,
        chaiHttp = require('chai-http'),
        app = require('../../index'),
        models  = require('../../models/index');
        
chai.use(chaiHttp);

describe('API',  function() {
    
    let newUser = {email: 'test_'+Math.random().toString(36).substring(7)+'@test.com', password: 'password1'};
    
    before(() => {
        return chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .then((res) => {
            newUser.token = res.body.data.token;
        })
    })
    after(() => {
        models.User.destroy({where: { email: newUser.email } });
    });
    
    describe('Protected route', () => {
        it('Should not be accessible when unauthenticated', ()=> {
            return chai.request(app)
            .get('/api/protected')
            .then((res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.own.property('message');
                expect(res.body.message).to.equal('Unauthorized.');
            });
        });
        it('Should be accessible when authenticated', ()=> {
            return chai.request(app)
            .get('/api/protected')
            .set('Authorization', 'bearer '+newUser.token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.own.property('data');
                expect(res.body.data).to.have.own.property('secretMessage');
            });
        });
    });
    
    describe('User information', () => {
        it('Should not be accessible when unauthenticated', ()=> {
            return chai.request(app)
            .get('/api/me')
            .then((res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.own.property('message');
                expect(res.body.message).to.equal('Unauthorized.');
            });
        });
        it('Should be accessible when authenticated', ()=> {
            return chai.request(app)
            .get('/api/me')
            .set('Authorization', 'bearer '+newUser.token)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.own.property('data');
                expect(res.body.data).to.have.own.property('user');
                expect(res.body.data.token).to.equal(newUser.token);
                expect(res.body.data.user.email).to.equal(newUser.email);
            });
        });
    });
});
