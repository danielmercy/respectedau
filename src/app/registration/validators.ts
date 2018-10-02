import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber, PhoneNumberFormat as PNF } from 'google-libphonenumber';
import * as telInput from 'ng2-tel-input';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export function PhoneNumberValidator(regionCode: string = undefined): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let validNumber = false;
    try {
      const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        control.value, regionCode
      );

      validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    //   validNumber = phoneNumberUtil.format(phoneNumber, PNF.INTERNATIONAL);
    } catch (e) { }

    return validNumber ? null : { 'wrongNumber': { value: control.value } };
  }
}

export function ConfirmPasswordValidator(control: AbstractControl): {[key: string]: any} | null {
  if(control && (control.value !== null || control.value !== undefined)) {
    const confirmPass = control.value;
    const passControl = control.root.get('password');

    if(passControl) {
      const pass = passControl.value;

      if(pass !== confirmPass) {
        return {'notEqual' : true}
      }
    }
  }

  return null
}