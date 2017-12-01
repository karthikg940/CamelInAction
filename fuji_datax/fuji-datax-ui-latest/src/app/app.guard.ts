import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

export interface IGuardDeactivateComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}


export class ConfirmDeactivateGuard implements CanDeactivate<IGuardDeactivateComponent> {

  canDeactivate(component: IGuardDeactivateComponent): boolean | Observable<boolean> {
    //if there are no pending changes, just allow deactivation; else confirm first
    const res = component.canDeactivate();
    if(res instanceof Observable){
      return res.first().map(x =>
      {
        console.log('isAdmin returned ' + x);
        if (!x) {
          console.log('canActivate = false');
          return false;
        } else {
          console.log('canActivate = true');
          return true;
        }
      });
    }
    return res;
  }
}
