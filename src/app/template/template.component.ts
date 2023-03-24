import { state } from '@angular/animations';
import { Component, Directive, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  states :any;
  division:any;
  district : any;
  taluka :any;
  village : any;
  name: any;
  arr :any;
  allRecords:any;
  records:any
  

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.showAll()

    this.records = new FormGroup({
      state: new FormControl(""),
      division: new FormControl(""),
      district: new FormControl(""),
      taluka: new FormControl(""),
      village: new FormControl("")
    });
  }

  showAll() {
    this.api.getdata("http://awsmaster.mahamining.com/master/states/GetState").subscribe((data: any) => {
      this.states = data;
      this.states = this.states.responseData;
      // console.log(this.states);
    });
  }

  filldivision(event:any)
  {
    let stateid = (<HTMLSelectElement>event.target).value;
    this.api.getdata("http://awsmaster.mahamining.com/master/divisions/" + stateid).subscribe((result:any)=>{     
      this.division = result.responseData;
      // alert("http://awsmaster.mahamining.com/master/divisions/" +stateid);

      console.log(this.division);
   })
  }

  filldistrict(event:any)
  {
    let DivisionId = (<HTMLSelectElement>event.target).value;
    console.log(DivisionId);
    
    this.api.getdata("http://awsmaster.mahamining.com/master/districts/GetDistrictByDivisionId?UserId=1&DivisionId=" +DivisionId).subscribe((result:any)=>{     
      console.log(result);
      
      this.district = result.responseData;
      // alert("http://awsmaster.mahamining.com/master/districts/GetDistrictByDivisionId?UserId=1&DivisionId=" +DivisionId);
      console.log(this.district);
   });
  }

  filltaluka(event:any){
    let districtid = (<HTMLSelectElement>event.target).value;
    console.log(districtid);
    this.api.getdata(" http://awsmaster.mahamining.com/master/talukas/GetTalukaByDistrictId/" +districtid).subscribe((result:any)=>{     
      console.log(result);
      
      this.taluka = result.responseData;
      console.log(this.taluka);
   });
    
  }

  fillvillage(event :any)
  {
    let talukaid =(<HTMLSelectElement>event.target).value;
    console.log(talukaid);

    this.api.getdata("http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/" +talukaid).subscribe((result:any)=>{     
    // alert("http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/" +talukaid);
      
      this.village = result.responseData;
      console.log(this.village);
   });
    
  }

  save() {
    // json-server --watch db.json
    // npm i -g json-server

    let stateSelect = <HTMLSelectElement>document.getElementById("state");
    let state = stateSelect.options[stateSelect.selectedIndex].text;

    let divisionselect = <HTMLSelectElement>document.getElementById("division");
    let division = divisionselect.options[divisionselect.selectedIndex].text;

    let districtselect = <HTMLSelectElement>document.getElementById("district");
    let district = districtselect.options[districtselect.selectedIndex].text;

    let talukaselect = <HTMLSelectElement>document.getElementById("taluka");
    let taluka = talukaselect.options[talukaselect.selectedIndex].text;

    let villageselect = <HTMLSelectElement>document.getElementById("village");
    let village = villageselect.options[villageselect.selectedIndex].text;

    let data = { state: state, stateid: stateSelect.value, division: division, divisionid: divisionselect.value, district: district, districtid: districtselect.value, taluka: taluka, talukaid: talukaselect.value, village: village, villageid: villageselect.value };
    // console.log(data);

    this.api.postRecord(data).subscribe((data: any) => {
      console.log(data);
      alert("data added")
      // window.location.href = "/posts";
    });

  }
  getRecord() {
    this.api.getdata("http://localhost:3000/posts/").subscribe((data: any) => {
      console.log(data);
      this.allRecords = data;
      console.log(this.allRecords);
      
    });
  }

 
}