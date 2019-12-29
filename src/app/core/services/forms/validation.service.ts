import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MessagingService} from '../messaging/messaging.service';
import {AppMessageType} from '../../../shared/models/app-message.class';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private readonly messagingService: MessagingService) {
  }

  public markFormGroupTouched(formGroup: FormGroup) {
    this.messagingService.clear();
    Object.keys(formGroup.controls)
      .map(controlName => formGroup.get(controlName))
      .forEach(
        control => {
          if (control instanceof FormControl) {
            control.markAsTouched({onlySelf: true});
            if (!control.valid) {
              this.messagingService.addControlMessage(this.getErrorMessage(control), control, AppMessageType.ERROR);
            } else {
              this.messagingService.addControlMessage(null, control, AppMessageType.SUCCESS);
            }
          } else if (control instanceof FormGroup) {
            this.markFormGroupTouched(control);
          }
        }
      );
  }

  public getValidatorErrorMessage(key: string, validatorValue: any = {}) {
    switch (key) {
      case 'email':
        return 'email-is-invalid';
      case 'maxlength':
        return 'maximum-length-reached';
      case 'minlength':
        return 'minimum-length-not-reached';
      case 'required':
        return 'field-is-required';
      case 'pattern':
        return 'pattern-is-invalid';
      default:
        return 'the form is invalid';
    }
  }

  public getErrorMessage(control: FormControl): string {
    for (const propertyName in control.errors) {
      if (control.errors.hasOwnProperty(propertyName) && control.touched) {
        return this.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
      }
    }

    return null;
  }
}
