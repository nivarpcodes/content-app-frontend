import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { DelegateModel } from './dashboard.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  constructor(private formbuilder : FormBuilder,
    private api : ApiService) { }
  delegateModelObj : DelegateModel = new DelegateModel();
  delegateData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      govtID : ['']
    })
    this.getAllDelegate();
  }
  clickAddDelegate(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate =false;
  }
  postDelegateDetails(){
    this.delegateModelObj.firstName = this.formValue.value.firstName;
    this.delegateModelObj.lastName = this.formValue.value.lastName;
    this.delegateModelObj.email = this.formValue.value.email;
    this.delegateModelObj.mobile = this.formValue.value.mobile;
    this.delegateModelObj.govtID = this.formValue.value.govtID;

    this.api.postDelegate(this.delegateModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Delegate added successfully!!!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllDelegate();
    },
    err=>{
    alert("Something went wrong");
    })
  }
  getAllDelegate(){
    this.api.getDelegate()
    .subscribe(res=>{
      this.delegateData = res;
    })
  }
  deleteDelegate(row : any){
    this.api.deleteDelegate(row.id)
      .subscribe(res=>{
        alert("Delegate Deleted")
        this.getAllDelegate();
      })
    }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.delegateModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['govtID'].setValue(row.govtID);
  }
  updateDelegateDetails(){
    this.delegateModelObj.firstName = this.formValue.value.firstName;
    this.delegateModelObj.lastName = this.formValue.value.lastName;
    this.delegateModelObj.email = this.formValue.value.email;
    this.delegateModelObj.mobile = this.formValue.value.mobile;
    this.delegateModelObj.govtID = this.formValue.value.govtID;

    this.api.updateDelegate(this.delegateModelObj, this.delegateModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully!!!");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllDelegate();
    })
  }
}
