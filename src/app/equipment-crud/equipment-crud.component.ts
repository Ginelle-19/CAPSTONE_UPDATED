
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConsumableCrudComponent } from '../consumable-crud/consumable-crud.component';
// =============
import { CourseCrudComponent } from '../course-crud/course-crud.component';
import { DataService } from '../data.service';
// import { MatPaginatorModule} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-equipment-crud',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, CommonModule,AppComponent, FormsModule, RouterModule, ConsumableCrudComponent, CourseCrudComponent, NgxPaginationModule ],
  providers: [HttpClientModule, DatePipe],
  templateUrl: './equipment-crud.component.html',
  styleUrl: './equipment-crud.component.css'
})
export class EquipmentCrudComponent {

  EquipmentArray : any[] = [];
  CourseArray : any[] = [];
  
  SelectedCourseID: number | null = null;

  searchValue: string = "";
  searchResult : any[] = [];

  isResultLoaded = false;
  isUpdateFormActive = false;

  currentID = "";
  EquipmentName : string = "";
  Quantity : string = "";
  CourseID! : number;
  CalibrationSchedule : Date = new Date;

  minDate: string;

  p:number = 1;
  itemsPerPage: number = 10;



  constructor(private http: HttpClient, private dataService:DataService, private datePipe: DatePipe){

    this.getAllEquipments();

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit() : void{
    this.loadCourses();
  }

  getAllEquipments() {
    this.http.get("http://localhost:8085/api/equipments/")
    .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.EquipmentArray = resultData.data;
    });
  }

  register(){
    let bodyData = {
      "EquipmentName" : this.EquipmentName,
      "Quantity" : this.Quantity,
      "CalibrationSchedule" : this.datePipe.transform(this.CalibrationSchedule, 'yyyy-MM-dd'),
      "CourseID" : this.CourseID
    };

    this.http.post("http://localhost:8085/api/equipments/add", bodyData)
    .subscribe((resultData: any) => {
      console.log(resultData);
      alert("Equipment Added Successfully!")
      this.getAllEquipments();
    });
  }
//-------------------------------------------------
  // search(){
    // this.http.get("http://localhost:8085/api/equipments/")
    // .subscribe((resultData:any) => {
    //   console.log(resultData);
    //   this.getAllEquipments();
    // });
    // const apiUrl = `http://localhost:8085/api/equipments/?search=${this.searchValue.toUpperCase()}`;

    // this.http.get(apiUrl)
    //   .subscribe((resultData: any) => {
    //     console.log(resultData);
    //     this.searchResult = resultData;
    //     if (Array.isArray(resultData)) {
    //       this.searchResult = resultData; // If it's an array, directly assign
    //     } else {
    //       this.searchResult = [resultData]; // If it's an object, convert it to an array
    //     }
        // Process the filtered equipment data as needed
        // For example, you can assign the filtered data to a variable for display
        // this.filteredEquipments = resultData;
      // });
  // }
//---------------------------------------------------
  setUpdate (data: any){
    this.EquipmentName = data.EquipmentName;
    this.Quantity = data.Quantity;
    this.CalibrationSchedule = data.CalibirationSchedule;

    this.currentID = data.EquipmentID;
  }

  UpdateRecords(){
    let bodyData = {
      "EquipmentName" : this.EquipmentName,
      "Quantity" : this.Quantity,
      "CalibrationSchedule" : this.datePipe.transform(this.CalibrationSchedule, 'yyyy-MM-dd'),
      "CourseID" : this.CourseID

    };

    this.http.put("http://localhost:8085/api/equipments/update" + "/" + this.currentID, bodyData)
    .subscribe((resultData: any) =>{
      console.log(resultData);
      alert("Equipment Updated Successfully!")
      this.getAllEquipments();
    });
  }

  save(){
    if(this.currentID == ''){
      this.register();
    } else{
      this.UpdateRecords();
    }
  }

  setDelete (data: any){
    this.http.delete("http://localhost:8085/api/equipments/delete" + "/" + data.EquipmentID)
    .subscribe((resultData:any) =>{
      console.log(resultData);
      alert("Record Deleted")
      this.getAllEquipments();
    });
  }
  // get courses for dropdown
  loadCourses(): void {
    this.dataService.getCourses().subscribe(
      (response: any) => {
        this.CourseArray = response.data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  filterEquipments(): void{
    if (this.SelectedCourseID !== null){
      this.dataService.getEquipmentsByCourseId(this.SelectedCourseID)
      .subscribe((response: any) => {
        console.log(response);
        this.EquipmentArray = response.data;
      },
      (error) => {
        console.error('Error connecting to API: ', error)
      }
      )
    }
  }

  assignCourse(): void{
    if (this.SelectedCourseID !== null) {
      this.dataService.getEquipmentsByCourseId(this.SelectedCourseID)
        .subscribe((response: any) => {
          console.log(response);
          this.EquipmentArray = response.data;
        },
        (error) => {
          console.error('Error connecting to API: ', error);
        }
      );
    }
  }
}
