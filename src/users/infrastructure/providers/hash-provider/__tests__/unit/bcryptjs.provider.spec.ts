import { BcryptjsHashProvider } from '../../bcryptjs.provider';

describe('BcryptjsProvider', () => {
  let sut: BcryptjsHashProvider;

  beforeEach(() => {
    sut = new BcryptjsHashProvider();
  });

  it('should return encrypted password', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);

    expect(hash).toBeDefined();
  });

  it('should return true if password match', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);

    const match = await sut.compareHash(password, hash);

    expect(match).toBe(true);
  });
});
