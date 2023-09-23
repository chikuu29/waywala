import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  selectedFile: any;
  constructor(private http: HttpClient,private appservices:AppService) { }

  ngOnInit(): void {
  }


  uploadFile() {
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
  
    this.blockUI.start('Uploading ....')
    this.http.post<any>(`${this.appservices.getApipath()}/auth/upload_profile.php?email=${this.appservices.authStatus.email}`, uploadData).subscribe(
      (response: any) => {
       this.blockUI.stop()
        if(response.success){
          Swal.fire('Profile Updated successful',response.message,'success').then(()=>{
            location.reload()
          })
        }else{
          Swal.fire(response.message,'','success')
        }
        // console.log('Upload successful!', response);
        // Handle success response
      },
      (error: any) => {
        this.blockUI.stop()
        Swal.fire('Error occurred during file upload','','error')
        // console.error('Error occurred during file upload:', error);
        // Handle error response
      }
    );
  }


  imageUrls: string[] = [];
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file && allowedTypes.includes(file.type)) {
      this.selectedFile = file;
      console.log(this.selectedFile);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);

      console.log("imageUrls", this.imageUrls);

    } else {
      // Handle error - invalid file type
      Swal.fire('Invalid file type. Only JPG files are allowed.', '', 'error')
      // console.error('Invalid file type. Only JPG files are allowed.');
    }

  }

  remove(){
    this.selectedFile={}
    this.imageUrls=[]
  }

}
