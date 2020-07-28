const {MongoClient} = require('mongodb');

describe('Check MongoDB Connection', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.ATLAS_URI, 
        {   useNewUrlParser: true, });
    db = await connection.db(global.DB_NAME);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});