import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = UserDataBuilder({});
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

  it('Update method', () => {
    const newName = 'newName';
    sut.update(newName);
    expect(sut.name).toBe(newName);
  });

  it('UpdatePassword method', () => {
    const newPassword = 'newPassword';
    sut.updatePassword(newPassword);
    expect(sut.password).toBe(newPassword);
  });
});
