import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
@Component({
  selector: 'app-generate-query',
  templateUrl: './generate-query.component.html',
  styleUrls: ['./generate-query.component.scss']
})
export class GenerateQueryComponent implements OnInit {
 
  images: String[] = [];
  fileuploadForm = new FormGroup({
    desc: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  })
  constructor(private http: HttpClient,private loader:NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  public onFileChange(event: any) {
    this.loader.start();
    if (event.target.files && event.target.files[0]) {
      var noOfFileSelected = event.target.files.length;
      console.log("hi", noOfFileSelected);

      for (let index = 0; index < noOfFileSelected; index++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target);
          this.images.push(event.target.result);
          this.fileuploadForm.patchValue({
            fileSource:this.images as any
           
         });
        }
        reader.readAsDataURL(event.target.files[index]);

      }
      setTimeout(() => {
        console.log("image", this.images);
      }, 2000);
      this.loader.stop()



    }



  }
  public removefile(data:any){
    this.images.splice(data,1)
    

  }
  public submit() {
    console.log(this.fileuploadForm);
    console.log(this.fileuploadForm.value);
    
    if (this.fileuploadForm.valid && (this.fileuploadForm.value['fileSource'] && this.fileuploadForm.value['fileSource'].length>0)) {
     
      this.http.post('http://localhost/api/upload.php', this.fileuploadForm.value)
      .subscribe(res => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'Uploaded Successfully.',
          
        })
        
        this.fileuploadForm.reset();
        this.images=[]
      })
      
    }else{
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill Up All Input Field',
        
      })
      
    }
    
   



  }

}
