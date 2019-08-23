
'use strict';

const {server} = require('../src/app.js');
const supergoose = require('./supergoose.js');
const mockRequest = supergoose(server);




describe('Products API', () => {
  test('Creating a new product. Should return 201 and the created object',
      () => {
        let testProduct = {
          name: 'Insomnia',
          description: 'An OK book',
          price: 10,
          category: 'books'
        };

        return mockRequest.post('/api/v1/products').
            send(testProduct).
            then(response => {
              expect(response.status).toEqual(200);
              expect(response.body.name).toEqual('Insomnia');
            });
      });
  test('Getting a new product. Should return 200 and the gotten object', () => {
    let testProduct = {
      name: 'Insomnia',
      description: 'An OK book',
      price: 10,
      category: 'books'
    };
    return mockRequest.get('/api/v1/products').
        send(testProduct).
        then(response => {
          expect(response.status).toEqual(200);
          expect(response.text).toContain('Insomnia');
        });
  });
  test('Updating an old product. Should return a 200 and the updated object',
      () => {
        let testProduct = {
          name: 'Insomnia',
          description: 'An OK book',
          price: 10,
          category: 'books'
        };
        return mockRequest.post('/api/v1/products').
            send(testProduct).
            send({name: "Heir to the Empire"}).
            then(response => {
              expect(response.status).toEqual(200);
              expect(response.text).toContain('Heir to the Empire');
            })
      });
  test('Deletes an old product. Should return a 200 and remove the object',
      () => {
        let testProduct = {
          name: 'Insomnia',
          description: 'An OK book',
          price: 10,
          category: 'books'
        };
        return mockRequest.post('/api/v1/products').
            send(testProduct).
            then(data => {
            console.log(data.body);
              return mockRequest.delete(`/api/v1/products/${data.body._id}`)
              .then(response => {
                    expect(response.status).toEqual(200);
                  })
            });
      });
});



