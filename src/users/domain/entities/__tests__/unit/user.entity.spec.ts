import { faker } from '@faker-js/faker';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    sut = new UserEntity(props);
  });

  it('Constructor method', () => {
    expect(sut.props).toEqual({
      ...props,
      createdAt: expect.any(Date),
    });

    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Getters', () => {
    expect(sut.name).toBe(props.name);
    expect(sut.email).toBe(props.email);
    expect(sut.password).toBe(props.password);
    expect(sut.createdAt).toBe(sut.props.createdAt);
    expect(sut.createdAt).toBeInstanceOf(Date);
  });
});
