import {    Component,    Input, ViewChild,   OnInit} from '@angular/core';
import {    AppState } from '../app.service';
import {    UserPreferenceService} from './userpreference.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
declare var $j: any;

@Component({
	selector: 'app-userpreference',
	templateUrl: './userpreference.component.html',
	styleUrls: ['./userpreference.component.css'],
	providers: [UserPreferenceService]
})
export class UserpreferenceComponent implements OnInit {

private listTags: Object[] = [];
private personalTagsList: Object[] = [];
private loginUserId: String;
private addTags: Object[] = [];
private lst:Object[] = [];
public disableTags: boolean;
public examTags: object[] = [];
public savedvalue: object[] = []

private isDuplicate: boolean
public titleMsg: String;
public subMsg: String;

@ViewChild('infoPopUp')
infoPopUp: ModalComponent;

constructor(private appState: AppState, private userpreferenceservice: UserPreferenceService) {

}

ngOnInit() {
	this.appState.getUserName().subscribe(
			res => {
				this.loginUserId = res.id;
				this.userpreferenceservice.getAllPersonalTags(this.loginUserId).subscribe(
						response => {
							this.generateTagArray(response);
							this.personalTagsList = this.listTags;
							
						});
			});

}

addType() {
	this.isDuplicate = false;
	if (this.newPersonalTag) {
		for(let t of this.personalTagsList){
			if(t.name == this.newPersonalTag){
				this.isDuplicate = true;
				break;
			}
		}
		if(this.isDuplicate){
			this.titleMsg = 'Duplicate Personal Tag';
			this.subMsg = 'Tag already Exists!';
		this.infoPopUp.open();
		var that = this;
		setTimeout(function() { that.infoPopUp.close() }, 2000);
		}
		else{
			this.personalTagsList.push({name: this.newPersonalTag});
			this.newPersonalTag = '';
		}
		
	}
}

generateTagArray(tagsObject) {
	this.listTags = [];
	for (let len = tagsObject.length, pos = 0; pos < len; pos++) {
		this.listTags.push({
			id: tagsObject[pos].id,
			name: tagsObject[pos].name,
			type: tagsObject[pos].type
		})
	}
}

deleteType(index: number) {
	this.personalTagsList.splice(this.personalTagsList.indexOf(index), 1);

}
savePersonalTags() {
	this.userpreferenceservice.deleteAllTags(this.loginUserId).subscribe(function (resp) {
    });   
	if(this.personalTagsList.length > 0){
			    this.addTags = [];
			    for(let p of this.personalTagsList){
			      this.addTags.push({name: p.name})
			    }
		this.userpreferenceservice.savePersonalTags(this.loginUserId, this.addTags).subscribe(
				res => {
					this.titleMsg = 'Save Personal Tag';
						this.subMsg = 'Saved Successfully!';
					this.infoPopUp.open();
					var that = this;
					setTimeout(function() { that.infoPopUp.close() }, 2000);
				},
				err => {
					
				});
	}
}
clearAll() {
	this.userpreferenceservice.deleteAllTags(this.loginUserId).subscribe(
			resp => {
				this.titleMsg = 'Clear Personal Tag';
					this.subMsg = 'Deleted Successfully!';
				this.infoPopUp.open();
				var that = this;
				setTimeout(function() { that.infoPopUp.close() }, 2000);
				this.personalTagsList = [];
			});
  }
}
