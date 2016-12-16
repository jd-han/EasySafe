import {Injectable} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "./auth-service";
import {Observable} from "rxjs";

@Injectable()
export class ValidationService {


  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'idExists': 'ID already exists',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 8 characters long, and contain a number.',
      'notMatchPassword': 'Check your password',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }

  public static idExists(control ,authService: AuthService) {
    console.log("idExits start");
    let idInput = control.value;
    console.log('idInput : ' + idInput);
    setTimeout(() => {
      let promise = authService.idCheck(idInput);
      promise.subscribe(
        data => {
          console.log("in validation data : " + idInput + " is " + data);
          console.dir(data);
          if (data) {
            console.log("when data is true");
            //when data is true mean id existed so return error
            return {'idExists': true}
          }
          console.log("if(data) is not passed")
        }
      );
      return null;
    }, 3000);

    /*
    return (control: FormControl) => {
      console.log("in return");
      setTimeout(() => {
        let promise = authService.idCheck(idInput);
        promise.subscribe(
          data => {
            console.log("in validation data : " + data);
            if (data) {
              //when data is true mean id existed so return error
              return {idExists: true}
            }
          }
        );
        return null
      }, 3000);*/
    }

}
