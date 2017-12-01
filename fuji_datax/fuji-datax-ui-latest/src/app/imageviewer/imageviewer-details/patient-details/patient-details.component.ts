import {Component, Input} from '@angular/core'

@Component({
  selector: 'patient-details',
  templateUrl: './patient-details.component.html'
})
export class PatientDetailsComponent {
  	@Input() patientDetails:Object;
}
