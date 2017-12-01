import {Component, Input} from '@angular/core'

@Component({
  selector: 'study-details',
  templateUrl: './study-details.component.html',
})
export class StudyDetailsComponent {
  @Input() patientDetails:Object;
}
