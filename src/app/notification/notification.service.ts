import { Injectable } from '@angular/core';
import { NgSwitchCase } from '@angular/common';
import { SwitchView } from '@angular/common/src/directives/ng_switch';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  ERROR_CODES = {
    NETWORK_FAILED: 'auth/network-request-failed'

  }
  constructor() { }

  open(type: any, data?: any) { 
    switch (type) {
      case ALERT_TYPES.SUCCESS:
        this.success(data.message)
        break;
      case ALERT_TYPES.ERROR:
        this.error(data.code, data.message)
        break;
      case ALERT_TYPES.INFO:
        this.info(data.message)
        break;
      case ALERT_TYPES.WARNING:
        this.warning(data.message)
        break;
      default:
        this.success(data.message)
        break;
    }
  }

  error(code: string, message: string) {
    if(code === this.ERROR_CODES.NETWORK_FAILED) {
      message = message || 'A network error (such as timeout, interrupted connection or unreachable host) has occurred'
      console.log(message);
    } // get other error codes
  }

  success(message) {
    console.log(message);
    
  }

  info(message) {
    console.log(message);
    
  }

  warning(message) {
    console.log(message);
    
  }
}

export enum ALERT_TYPES {
  INFO,
  SUCCESS,
  ERROR,
  WARNING
}


