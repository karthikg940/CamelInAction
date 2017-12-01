import {Component, Input} from '@angular/core'

@Component({
  selector: 'viewerheader',
  templateUrl: './viewerheader.component.html',
})
export class ViewerHeaderComponent {
 @Input() isWorksheetOpen: boolean;
}
