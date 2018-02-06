import {
  Component, OnInit,
  Input, Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  @Output() onDelete = new EventEmitter<number>();

  // @Input() 
  public openedConfirmDelete = false;

  constructor() { }

  ngOnInit() {
  }

  public open() {
    this.openedConfirmDelete = true;
  }
  public onDialogClose() {
    this.openedConfirmDelete = false;
    alert('No data deleted.');
  }

  public onDeleteData() {
    this.onDelete.emit();
    alert('Data deleted.');
  }

}
