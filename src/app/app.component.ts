import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Stylo } from './stylo';
import { StyloService } from './stylo.service';
import { FormsModule }   from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public stylos: Stylo[]  = new Array();
  constructor(private styloService: StyloService) { }

  ngOnInit(): void {
      this.getStylos();
  }

  public getStylos(): void {
    this.styloService.getStylos().subscribe (
      (response: Stylo[]) => {
        this.stylos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddStylo(addForm: NgForm): void {
    document.getElementById('add-stylo-form')?.click();
    this.styloService.addStylo(addForm.value).subscribe(
      (response: Stylo) => {
        console.log(response);
        this.getStylos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public searchStylos(key: string): void{
    console.log(key)
    const results: Stylo[] = [];
    for(const stylo of this.stylos){
      if (stylo.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||stylo.collection.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(stylo);
      }
    }
    this.stylos = results;
    if (results.length === 0 || !key) {
      this.getStylos();
    }
  }

  public onOpenModal(stylo: any, mode: String): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addStyloModal');
    }
    if(mode === 'edit') {
      button.setAttribute('data-target', '#updateStyloModal');
    }
    if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteStyloModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
