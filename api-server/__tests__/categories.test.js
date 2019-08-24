'use strict';

const {server} = require('../src/app.js');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);





describe('Categories API', () => {
  test(
    'Creating a new category. Should return 201 and the created object',
    () => {
      const testCategory = {
        name: 'Food',
        description: 'Soba',
      };

      return mockRequest.post('/categories')
        .send(testCategory)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('Food');
        });
    });
  test(
    'Getting a new category. Should return 200 and the gotten object',
    () => {
      let testCategory = {
        name: 'Food',
        description: 'Soba',
      };

      return mockRequest.get('/categories').
        send(testCategory).
        then(response => {
          expect(response.status).toEqual(200);
          expect(response.text).toContain('Food');
        });
    });
  test(
    'Updating an old category. Should return a 200 and the updated object',
    () => {
      let testCategory = {
        name: 'Food',
        description: 'Soba',
      };

      return mockRequest.post('/categories').
        send(testCategory)
        .send({description: 'Udon'})
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.text).toContain('Udon');
        });
    });
  test(
    'Deletes an old category. Should return a 200 and remove the object',
    () => {
      let testCategory = {
        name: 'Food',
        description: 'Soba',
      };

      return mockRequest.post('/categories').
        send(testCategory).
        then(data => {
          return mockRequest.delete(
            `/categories/${data.body._id}`).
            then(response => {
              expect(response.status).toEqual(200);
            });
        });
    });
});






