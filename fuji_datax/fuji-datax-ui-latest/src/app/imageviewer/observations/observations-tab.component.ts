import { Component, Input } from '@angular/core';

@Component({
  selector: 'observations-tab',
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class ObservationsTabComponent {
  @Input('tabTitle') title: string;
  
  @Input() active = false;
}