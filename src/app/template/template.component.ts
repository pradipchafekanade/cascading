import { state } from '@angular/animations';
import { Component, Directive, OnInit } from '@angular/core';
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
  allRecords:any

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getdata("http://awsmaster.mahamining.com/master/states/GetState").subscribe((result:any)=>{
      console.log(result);
      
      this.states = result.responseData;
   })
  }

  filldivision(event:Event)
  {
    let stateid = (<HTMLSelectElement>event.target).value;
    this.api.getdata("http://awsmaster.mahamining.com/master/divisions/" + stateid).subscribe((result:any)=>{     
      this.division = result.responseData;
      alert("http://awsmaster.mahamining.com/master/divisions/" +stateid);

      console.log(this.division);
   })
  }

  filldistrict(event:Event)
  {
    let DivisionId = (<HTMLSelectElement>event.target).value;
    console.log(DivisionId);
    
    this.api.getdata("http://awsmaster.mahamining.com/master/districts/GetDistrictByDivisionId?UserId=1&DivisionId=" +DivisionId).subscribe((result:any)=>{     
      console.log(result);
      
      this.district = result.responseData;
      alert("http://awsmaster.mahamining.com/master/districts/GetDistrictByDivisionId?UserId=1&DivisionId=" +DivisionId);
      console.log(this.district);
   });
  }

  filltaluka(event:Event){
    let districtid = (<HTMLSelectElement>event.target).value;
    console.log(districtid);
    this.api.getdata(" http://awsmaster.mahamining.com/master/talukas/GetTalukaByDistrictId/" +districtid).subscribe((result:any)=>{     
      console.log(result);
      
      this.taluka = result.responseData;
      console.log(this.taluka);
   });
    
  }

  fillvillage(event :Event)
  {
    let talukaid =(<HTMLSelectElement>event.target).value;
    console.log(talukaid);

    this.api.getdata("http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/" +talukaid).subscribe((result:any)=>{     
    alert("http://awsmaster.mahamining.com/master/villages/GetVillagesByCriteria/" +talukaid);
      
      this.village = result.responseData;
      console.log(this.village);
   });
    
  }

  submit=()=>
  {
    let stateSelect = <HTMLSelectElement>document.getElementById("state");
    let state =  stateSelect.options[stateSelect.selectedIndex].text;
    // alert(state);
    let divisionselect = <HTMLSelectElement>document.getElementById("division");
    let division =  divisionselect.options[divisionselect.selectedIndex].text;
    // alert(division);
    let districtselect = <HTMLSelectElement>document.getElementById("district");
    let district =  districtselect.options[districtselect.selectedIndex].text;
    // alert(district)
    let talukaselect = <HTMLSelectElement>document.getElementById("taluka");
    let taluka =  divisionselect.options[talukaselect.selectedIndex].text;
    // alert(taluka);
    let villageselect = <HTMLSelectElement>document.getElementById("village"); 
    let village =  villageselect.options[villageselect.selectedIndex].text;
    // alert(village);
    console.log(state +" " +division + " " +district + " "+" "+taluka+" "+village);

        let data = { state: state, stateid: stateSelect.value, division: division, divisionid: divisionselect.value, district: district, districtid: districtselect.value, taluka: taluka, talukaid: talukaselect.value, village: village, villageid: villageselect.value };
       console.log(data);
       
    
  }

  // let data= {state :state, division :division}
}