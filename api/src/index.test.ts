import { TestFactory } from './testing/factory';

describe('GET /', () => {
  const factory: TestFactory = new TestFactory();

  beforeEach(async () => {
    await factory.init();
  });

  afterEach(async () => {
    await factory.close();
  });

  it('Health check API Request', async () => {
    const result = await factory.app.get('/');

    const value = { version: process.env.npm_package_version };

    expect(result.body).toEqual(value);

    expect(result.status).toEqual(200);
  });
});
