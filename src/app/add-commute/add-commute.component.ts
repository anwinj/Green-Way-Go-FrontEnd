import { Component } from '@angular/core';

@Component({
  selector: 'app-add-commute',
  templateUrl: './add-commute.component.html',
  styleUrls: ['./add-commute.component.css']
})
export class AddCommuteComponent {

  showModal = false;
  
  toggleModal(){
    this.showModal = !this.showModal;
  }

}
