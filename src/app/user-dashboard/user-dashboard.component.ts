import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../service/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  displayedColumns: string[] = ['user_id', 'user_name', 'user_email', 'user_phone_no','user_pwd','user_gender','user_reg_date','action'];
  dataSource!: MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http:HttpService, private dialog:MatDialog){

  }
  
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.http.getDataFromServer('').subscribe((responce:any)=>{
      if(responce && responce.status==1 && responce.data.length > 0){
        this.dataSource= new MatTableDataSource(responce.data );
        this.dataSource.paginator=this.paginator; 
        this.dataSource.sort = this.sort;
      }
    },
    error=>{

    })
  }

  onEdit(){
    let config = new MatDialogConfig();
    config.width = "800px";
     this.dialog.open(SignUpComponent);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
