/** Defining variables */
const { assert } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);

/** Api Path */
const url = 'https://jsonplaceholder.typicode.com';
/** User ID used for testing */
const userid = 2;

/** Post Test Suite */

/**
 * Test #1
 * Enter a Post with the title and comment of a product
 * using POST method
 */
describe('Tests Posts: ', () => {
  it('Create a Post', (done) => {
    chai
      .request(url)
      .post('/posts')
      .send({
        title: 'Sony Headphones',
        body: 'They have a minimum coloration, they are comfortable and of durable material',
        userId: 1,
      })
      .end(function (err, res) {
        console.log(res.body);
        expect(res, 'Response failed').to.have.status(201);
        expect(
          res.body,
          'The value cannot be found in the Body'
        ).to.have.property('id');
        done();
      });
  });

  /**
   * Test #2
   * Get all posts
   * using GET method
   */
  it('Get All Posts', (done) => {
    chai
      .request(url)
      .get('/posts')
      .end(function (err, res) {
        console.log(res.body);
        expect(res, 'Response failed').to.have.status(200);
        assert.typeOf(res.body, 'array', 'The answer is not an array');
        done();
      });
  });

  /**
   * Test #3
   * Get all posts from a given user
   * using GET method
   */
  it("Get a user's Posts", (done) => {
    chai
      .request(url)
      .get(`/posts/${userid}/comments`)
      .end(function (err, res) {
        console.log(res.body);
        expect(res, 'Response failed').to.have.status(200);
        assert.lengthOf(res.body, 5, 'User does not have 5 Posts');
        done();
      });
  });

  /**
   * Test #4
   * Modify a Post (publication)
   * using PUT method
   */
  it("Modify a user's Post", (done) => {
    chai
      .request(url)
      .put(`/posts/${userid}`)
      .send({
        id: 2,
        title: 'Samsung s8',
        body: 'Resistant, good camera, bad battery',
        userId: userid,
      })
      .end(function (err, res) {
        console.log(res.body);
        expect(res, 'Response failed').to.have.status(200);
        assert.equal(
          res.body.title,
          'Samsung s8',
          "The user's post with id " + userid
        );
        done();
      });
  });

  /**
   * Test #5
   * Delete a Post (post)
   * using DELETE method
   */
  it('Delete a Post from a user', (done) => {
    chai
      .request(url)
      .delete(`/posts/${userid}`)
      .end(function (err, res) {
        console.log(res.body);
        expect(res, 'Response failed').to.have.status(200);
        assert.typeOf(res.body, 'object', 'The answer is not an object');
        done();
      });
  });
});
