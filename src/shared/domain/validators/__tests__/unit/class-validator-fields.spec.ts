import { ClassValidatorFields } from '../../class-validator-fields';
import * as classValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('ClassValidatorFields unit tests', () => {
  it('Should initialize errors as null', () => {
    const classValidatorFields = new StubClassValidatorFields();
    expect(classValidatorFields.errors).toBeNull();
  });

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync');

    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: {
          isRequired: 'Field is required',
        },
      },
    ]);

    const sut = new StubClassValidatorFields();

    expect(sut.validate({ field: '' })).toBe(false);
    expect(sut.errors).toEqual({ field: ['Field is required'] });
    expect(spyValidateSync).toHaveBeenCalledWith({ field: '' });
    expect(spyValidateSync).toHaveBeenCalledTimes(1);
  });

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(classValidator, 'validateSync');

    spyValidateSync.mockReturnValue([]);

    const sut = new StubClassValidatorFields();

    expect(sut.validate({ field: 'valid_field' })).toBe(true);
    expect(sut.errors).toBeNull();
    expect(spyValidateSync).toHaveBeenCalledWith({ field: 'valid_field' });
    expect(spyValidateSync).toHaveBeenCalledTimes(2);
  });
});
